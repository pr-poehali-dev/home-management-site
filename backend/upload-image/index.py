import json
import boto3
import os
import base64
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Загружает изображение в S3 и возвращает CDN URL
    Args: event - dict с httpMethod, body (base64 image data)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с CDN URL изображения
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
    image_base64 = body_data.get('image', '')
    image_type = body_data.get('type', 'house')
    
    if not image_base64:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'No image data provided'}),
            'isBase64Encoded': False
        }
    
    image_data = base64.b64decode(image_base64)
    
    file_extension = 'jpg'
    if image_base64.startswith('iVBOR'):
        file_extension = 'png'
    elif image_base64.startswith('/9j/'):
        file_extension = 'jpg'
    
    file_name = f"{image_type}-{uuid.uuid4()}.{file_extension}"
    
    s3 = boto3.client('s3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    
    content_type = f'image/{file_extension}'
    s3.put_object(
        Bucket='files',
        Key=file_name,
        Body=image_data,
        ContentType=content_type
    )
    
    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_name}"
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'url': cdn_url,
            'fileName': file_name
        }),
        'isBase64Encoded': False
    }
