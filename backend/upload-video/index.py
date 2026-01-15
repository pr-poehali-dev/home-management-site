import json
import boto3
import os
import base64
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Загружает видеофайл в S3 и возвращает CDN URL
    Args: event - dict с httpMethod, body (base64 video data, contentType)
          context - объект с атрибутами request_id
    Returns: HTTP response dict с CDN URL видео
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
    video_base64 = body_data.get('video', '')
    content_type = body_data.get('contentType', 'video/mp4')
    
    if not video_base64:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'No video data provided'}),
            'isBase64Encoded': False
        }
    
    video_data = base64.b64decode(video_base64)
    
    if 'mp4' in content_type:
        extension = 'mp4'
    elif 'webm' in content_type:
        extension = 'webm'
    elif 'quicktime' in content_type or 'mov' in content_type:
        extension = 'mov'
    else:
        extension = 'mp4'
    
    file_name = f"video-{uuid.uuid4()}.{extension}"
    
    s3 = boto3.client('s3',
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
        'body': json.dumps({
            'url': cdn_url,
            'fileName': file_name
        }),
        'isBase64Encoded': False
    }
