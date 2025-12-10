import json
import boto3
import os
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Генерирует presigned URL для прямой загрузки больших файлов в S3
    Args: event - dict с httpMethod, body (fileType, contentType)
          context - объект с атрибутами request_id
    Returns: HTTP response dict с presigned URL для загрузки
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
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
    file_type = body_data.get('type', 'document')
    content_type = body_data.get('contentType', 'application/pdf')
    
    # Определяем расширение по content type
    extension = 'pdf' if 'pdf' in content_type else 'jpg'
    file_name = f"{file_type}-{uuid.uuid4()}.{extension}"
    
    s3 = boto3.client('s3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    
    # Генерируем presigned URL для загрузки (действует 15 минут)
    presigned_url = s3.generate_presigned_url(
        'put_object',
        Params={
            'Bucket': 'files',
            'Key': file_name,
            'ContentType': content_type
        },
        ExpiresIn=900  # 15 минут
    )
    
    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_name}"
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'uploadUrl': presigned_url,
            'cdnUrl': cdn_url,
            'fileName': file_name
        }),
        'isBase64Encoded': False
    }
