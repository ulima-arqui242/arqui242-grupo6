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

# Leer el mensaje desde SQS
response = sqs_client.receive_message(
    QueueUrl=queue_url,
    MaxNumberOfMessages=1
)

for message in response['Messages']:
    
    # Parsear el mensaje
    cuerpo_mensaje = json.loads(message['Body'])
    archivo_id = cuerpo_mensaje['archivo_id']
    s3_url = cuerpo_mensaje['s3_url']
    
    # Extraer solo el nombre del archivo sin la ruta
    archivo_nombre = './0/piero/trabajo2/prueba/gatodescargado.png'
    archivo_id = archivo_id.lstrip("./")


    print("Intentando descargar archivo con ID:", archivo_id)
    # Descargar el archivo desde S3 usando el nombre extraído
    s3_client.download_file(bucket_name, archivo_id, archivo_nombre)
    print(f"Archivo descargado: {archivo_nombre}")

    # Eliminar el mensaje de SQS después de procesarlo
    sqs_client.delete_message(
        QueueUrl=queue_url,
        ReceiptHandle=message['ReceiptHandle']
    )
    print("Mensaje procesado y eliminado de SQS.")