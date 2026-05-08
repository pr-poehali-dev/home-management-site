import json
import boto3
import os
import base64
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Принимает видеофайл как бинарные данные (Content-Type: video/*),
    загружает в S3 и возвращает CDN URL. v2
    """
    method: str = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Video-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    content_type = event.get('headers', {}).get('content-type') or event.get('headers', {}).get('Content-Type', 'video/mp4')

    body = event.get('body', '')
    is_base64 = event.get('isBase64Encoded', False)

    if is_base64:
        video_data = base64.b64decode(body)
    else:
        video_data = body.encode('latin-1') if isinstance(body, str) else body

    if 'mp4' in content_type:
        ext = 'mp4'
    elif 'webm' in content_type:
        ext = 'webm'
    elif 'quicktime' in content_type or 'mov' in content_type:
        ext = 'mov'
    else:
        ext = 'mp4'

    file_name = f"header-video-{uuid.uuid4()}.{ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    s3.put_object(
        Bucket='files',
        Key=file_name,
        Body=video_data,
        ContentType=content_type
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_name}"

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'url': cdn_url, 'fileName': file_name})
    }