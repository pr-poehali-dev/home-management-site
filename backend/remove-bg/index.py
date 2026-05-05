"""Удаляет белый фон из PNG-изображения и сохраняет результат в S3"""
import os
import boto3
import urllib.request
import io
import uuid
from PIL import Image


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    image_url = "https://cdn.poehali.dev/projects/fe9589b6-f411-4b39-b21e-3be97169a177/bucket/29507a18-dd7f-40f4-a1ef-3bcfeef4cca4.png"

    with urllib.request.urlopen(image_url) as resp:
        img_data = resp.read()

    img = Image.open(io.BytesIO(img_data)).convert("RGBA")
    pixels = img.load()

    width, height = img.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # Удаляем только чисто белый/серый фон: все каналы высокие и почти равны
            max_ch = max(r, g, b)
            min_ch = min(r, g, b)
            if max_ch > 240 and (max_ch - min_ch) < 20:
                pixels[x, y] = (r, g, b, 0)

    out = io.BytesIO()
    img.save(out, format="PNG")
    out.seek(0)

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    key = f"logo-transparent-{uuid.uuid4().hex}.png"
    s3.put_object(Bucket='files', Key=key, Body=out.read(), ContentType='image/png')

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': f'{{"url": "{cdn_url}"}}'
    }