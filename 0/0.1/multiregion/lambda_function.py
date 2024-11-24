import jwt
import os

def lambda_handler(event, context):
    
    headers = event.get('headers')
    if not headers:
        return {
            "statusCode": 400,
            "body": "Missing headers in the request"
        }

    token = headers.get('Authorization', '').replace('Bearer ', '')
    
    if not token:
        return {
            "statusCode": 401,
            "body": "Token no proporcionado."
        }
        
    
    try:
        # Verifica el token usando la clave pública de Cognito
        decoded_token = jwt.decode(
            token,
            options={"verify_signature": False},  # Por simplicidad; en producción usa la clave pública de Cognito
            algorithms=["RS256"],
            audience=os.environ['COGNITO_APP_CLIENT_ID'],
            issuer=os.environ['COGNITO_ISSUER']
        )
        user_id = decoded_token['sub']
        
        # Transforma y envía la solicitud
        event['headers']['x-user-id'] = user_id
        return {
            "statusCode": 200,
            "body": "Token válido",
            "headers": event['headers']
        }
    except jwt.ExpiredSignatureError:
        return {
            "statusCode": 401,
            "body": "El token ha expirado."
        }
    except jwt.InvalidTokenError:
        return {
            "statusCode": 401,
            "body": "Token inválido."
        }
