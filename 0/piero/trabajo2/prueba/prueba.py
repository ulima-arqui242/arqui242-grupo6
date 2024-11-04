import boto3
import json
import os


# Inicializar el cliente de S3 y SQS
s3_client = boto3.client(
    's3',
    region_name='us-east-2',
    aws_access_key_id=os.getenv('ACCESS_KEY'),
    aws_secret_access_key=os.getenv('SECRET_KEY')
)
sqs_client = boto3.client(
    'sqs',
    region_name='us-east-2',
    aws_access_key_id=os.getenv('ACCESS_KEY'),
    aws_secret_access_key=os.getenv('SECRET_KEY')
)

# Configuración de bucket de S3 y URL de cola de SQS
bucket_name = 'krystalprueba'
queue_url = 'https://sqs.us-east-2.amazonaws.com/160885283788/kristalcola'

# Nombre del archivo
archivo = './0/piero/trabajo2/prueba/gato.png'
archivo_key = 'gato.png'

# Subir el archivo a S3
s3_client.upload_file(archivo, bucket_name,archivo_key)

# Generar la URL del archivo en S3
archivo_url = f"https://{bucket_name}.s3.amazonaws.com/{archivo_key}"

# Crear el mensaje de referencia y enviarlo a SQS
mensaje = {
    'archivo_id': archivo_key,
    's3_url': archivo_url,
}

sqs_client.send_message(
    QueueUrl=queue_url,
    MessageBody=json.dumps(mensaje)
)

print("Mensaje enviado a SQS con referencia a S3.")


