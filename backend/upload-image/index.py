import json
import boto3
import os
import base64
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Загружает файл (изображение или PDF) в S3 и возвращает CDN URL
    Args: event - dict с httpMethod, body (base64 file data, fileType)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с CDN URL файла
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
    
    # Проверяем, это base64 или бинарные данные
    is_base64_encoded = event.get('isBase64Encoded', False)
    body_raw = event.get('body', '')
    
    if is_base64_encoded:
        # Бинарные данные уже закодированы в base64 в теле запроса
        file_data = base64.b64decode(body_raw)
        file_type = event.get('headers', {}).get('x-file-type', 'document')
        content_type = event.get('headers', {}).get('content-type', 'application/pdf')
        
        if 'pdf' in content_type:
            file_extension = 'pdf'
        elif 'image' in content_type:
            file_extension = 'jpg'
            if file_data[:8] == b'\x89PNG\r\n\x1a\n':
                file_extension = 'png'
        else:
            file_extension = 'pdf'
    else:
        # JSON с base64 строкой внутри
        body_data = json.loads(body_raw)
        file_base64 = body_data.get('image', '')
        file_type = body_data.get('type', 'house')
        specified_file_type = body_data.get('fileType', 'image')
        
        if not file_base64:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'No file data provided'}),
                'isBase64Encoded': False
            }
        
        file_data = base64.b64decode(file_base64)
    
    if specified_file_type == 'pdf':
        file_extension = 'pdf'
        content_type = 'application/pdf'
    else:
        file_extension = 'jpg'
        if file_base64.startswith('iVBOR'):
            file_extension = 'png'
        elif file_base64.startswith('/9j/'):
            file_extension = 'jpg'
        content_type = f'image/{file_extension}'
    
    file_name = f"{file_type}-{uuid.uuid4()}.{file_extension}"
    
    s3 = boto3.client('s3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    
    s3.put_object(
        Bucket='files',
        Key=file_name,
        Body=file_data,
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