import json
import os
import boto3
import base64
import uuid
import psycopg2
from typing import Dict, Any

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        if method == 'GET':
            conn = get_db_connection()
            cur = conn.cursor()
            
            cur.execute("""
                SELECT image_key, title, location, url, file_size, updated_at
                FROM site_images
                ORDER BY updated_at DESC
            """)
            rows = cur.fetchall()
            
            images_list = []
            for row in rows:
                images_list.append({
                    'id': row[0],
                    'title': row[1],
                    'location': row[2],
                    'url': row[3],
                    'file_size': row[4],
                    'updated_at': row[5].isoformat() if row[5] else None
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'images': images_list}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            image_data = body_data.get('image_data')
            title = body_data.get('title', 'Untitled')
            location = body_data.get('location', 'Новое изображение')
            mime_type = body_data.get('mime_type', 'image/jpeg')
            
            if not image_data:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing image data'}),
                    'isBase64Encoded': False
                }
            
            image_bytes = base64.b64decode(image_data)
            file_ext = mime_type.split('/')[-1]
            file_name = f"admin-upload/{uuid.uuid4()}.{file_ext}"
            
            s3 = boto3.client('s3',
                endpoint_url='https://bucket.poehali.dev',
                aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
            )
            
            s3.put_object(
                Bucket='files',
                Key=file_name,
                Body=image_bytes,
                ContentType=mime_type
            )
            
            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_name}"
            
            conn = get_db_connection()
            cur = conn.cursor()
            
            image_key = f"upload_{uuid.uuid4().hex[:8]}"
            
            cur.execute("""
                INSERT INTO site_images (image_key, title, location, url, file_size, mime_type)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (image_key, title, location, cdn_url, len(image_bytes), mime_type))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'url': cdn_url,
                    'image_key': image_key
                }),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
