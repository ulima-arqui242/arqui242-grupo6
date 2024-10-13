# Testing automatizado con Appium y Python

Este repositorio demuestra cómo ejecutar pruebas de Appium Python para el caso de uso de testear el login de una aplicacion movil en BrowserStack App Automate.

## Configuracion

### Requerimientos

- Python 3.7+

- Package Manager pip

### Iniciar entorno virtual

  ```sh
  python -m venv env
  env\Scripts\activate
  ```

### Instalar dependencias

  ```sh
  pip install -r requirements.txt
  ```

### Ejecutar prueba

  ```sh
  browserstack-sdk python testing.py
  ```