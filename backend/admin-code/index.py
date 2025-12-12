import json
import os
import base64
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Управление файлами проекта через админ-панель
    Args: event - HTTP запрос с параметрами, context - контекст выполнения
    Returns: HTTP ответ с данными файлов или результатом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    project_root = '/function/code'
    allowed_dirs = ['src', 'backend']
    
    def is_allowed_path(path: str) -> bool:
        for allowed_dir in allowed_dirs:
            if path.startswith(allowed_dir + '/') or path == allowed_dir:
                return True
        return False
    
    def get_file_list() -> List[Dict[str, str]]:
        files = []
        for allowed_dir in allowed_dirs:
            dir_path = os.path.join(project_root, allowed_dir)
            if os.path.exists(dir_path):
                for root, dirs, filenames in os.walk(dir_path):
                    rel_root = os.path.relpath(root, project_root)
                    for filename in filenames:
                        if filename.endswith(('.tsx', '.ts', '.py', '.json', '.css')):
                            file_path = os.path.join(rel_root, filename)
                            files.append({
                                'path': file_path.replace('\\', '/'),
                                'type': 'file'
                            })
        return files
    
    try:
        if method == 'GET':
            query_params = event.get('queryStringParameters', {})
            file_path = query_params.get('path') if query_params else None
            
            if file_path:
                if not is_allowed_path(file_path):
                    return {
                        'statusCode': 403,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Access denied'}),
                        'isBase64Encoded': False
                    }
                
                full_path = os.path.join(project_root, file_path)
                if os.path.exists(full_path) and os.path.isfile(full_path):
                    with open(full_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'content': content, 'path': file_path}),
                        'isBase64Encoded': False
                    }
                else:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'File not found'}),
                        'isBase64Encoded': False
                    }
            else:
                files = get_file_list()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'files': files}),
                    'isBase64Encoded': False
                }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            file_path = body_data.get('path')
            content = body_data.get('content')
            
            if not file_path or content is None:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing path or content'}),
                    'isBase64Encoded': False
                }
            
            if not is_allowed_path(file_path):
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Access denied'}),
                    'isBase64Encoded': False
                }
            
            full_path = os.path.join(project_root, file_path)
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'File saved', 'path': file_path}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            file_path = body_data.get('path')
            content = body_data.get('content', '')
            file_type = body_data.get('type', 'file')
            
            if not file_path:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing path'}),
                    'isBase64Encoded': False
                }
            
            if not is_allowed_path(file_path):
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Access denied'}),
                    'isBase64Encoded': False
                }
            
            full_path = os.path.join(project_root, file_path)
            
            if os.path.exists(full_path):
                return {
                    'statusCode': 409,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'File already exists'}),
                    'isBase64Encoded': False
                }
            
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            if file_type == 'function' and file_path.startswith('backend/'):
                tests_path = os.path.join(os.path.dirname(full_path), 'tests.json')
                if not os.path.exists(tests_path):
                    with open(tests_path, 'w', encoding='utf-8') as f:
                        json.dump({
                            'tests': [{
                                'name': 'Test GET request',
                                'method': 'GET',
                                'path': '/',
                                'expectedStatus': 200,
                                'bodyMatcher': 'partial'
                            }]
                        }, f, indent=2)
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'File created', 'path': file_path}),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {})
            file_path = query_params.get('path') if query_params else None
            
            if not file_path:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing path'}),
                    'isBase64Encoded': False
                }
            
            if not is_allowed_path(file_path):
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Access denied'}),
                    'isBase64Encoded': False
                }
            
            full_path = os.path.join(project_root, file_path)
            
            if os.path.exists(full_path) and os.path.isfile(full_path):
                os.remove(full_path)
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'message': 'File deleted'}),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'File not found'}),
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
