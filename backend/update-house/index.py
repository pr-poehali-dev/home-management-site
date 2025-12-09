import json
import psycopg2
import os
from typing import Dict, Any, Optional

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обновляет данные дома (изображения, документы и информацию)
    Args: event - dict с httpMethod, body (house_id, image, managerPhoto, protocolOss, managementAgreement)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с результатом обновления
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    house_id: str = body_data.get('house_id', '')
    image_url: Optional[str] = body_data.get('image')
    manager_photo_url: Optional[str] = body_data.get('managerPhoto')
    protocol_oss = body_data.get('protocolOss')
    management_agreement = body_data.get('managementAgreement')
    
    if not house_id:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'house_id is required'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    try:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS houses (
                id TEXT PRIMARY KEY,
                image TEXT,
                manager_photo TEXT,
                protocol_oss TEXT,
                management_agreement TEXT
            )
        """)
        
        cur.execute("SELECT id FROM houses WHERE id = %s", (house_id,))
        exists = cur.fetchone()
        
        if exists:
            update_fields = []
            update_values = []
            
            if image_url:
                update_fields.append("image = %s")
                update_values.append(image_url)
            
            if manager_photo_url:
                update_fields.append("manager_photo = %s")
                update_values.append(manager_photo_url)
            
            if protocol_oss is not None:
                update_fields.append("protocol_oss = %s")
                update_values.append(json.dumps(protocol_oss) if isinstance(protocol_oss, list) else protocol_oss)
            
            if management_agreement is not None:
                update_fields.append("management_agreement = %s")
                update_values.append(json.dumps(management_agreement) if isinstance(management_agreement, list) else management_agreement)
            
            if update_fields:
                update_values.append(house_id)
                query = f"UPDATE houses SET {', '.join(update_fields)} WHERE id = %s"
                cur.execute(query, update_values)
        else:
            cur.execute(
                "INSERT INTO houses (id, image, manager_photo, protocol_oss, management_agreement) VALUES (%s, %s, %s, %s, %s)",
                (house_id, image_url, manager_photo_url, 
                 json.dumps(protocol_oss) if isinstance(protocol_oss, list) else protocol_oss,
                 json.dumps(management_agreement) if isinstance(management_agreement, list) else management_agreement)
            )
        
        conn.commit()
        
        result = {
            'success': True,
            'house_id': house_id,
            'updated': {
                'image': image_url if image_url else None,
                'managerPhoto': manager_photo_url if manager_photo_url else None,
                'protocolOss': protocol_oss if protocol_oss is not None else None,
                'managementAgreement': management_agreement if management_agreement is not None else None
            }
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()