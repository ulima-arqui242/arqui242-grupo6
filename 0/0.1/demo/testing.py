from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json

# Crear driver
options = UiAutomator2Options().load_capabilities({})
driver = webdriver.Remote("http://127.0.0.1:4723/wd/hub", options=options)

# Ingresar usuario
usuario_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((AppiumBy.XPATH, "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]"))
)
usuario_input.click()
usuario_input.send_keys("david")

# Ingresar contrasenia
contrasenia_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((AppiumBy.XPATH, "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]"))
)
contrasenia_input.click()
contrasenia_input.send_keys("123")

# Clickear login
login_button = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((AppiumBy.XPATH, "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button"))
)
login_button.click()

# Leer respuesta
time.sleep(5)
message_element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((AppiumBy.XPATH, "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]"))
)
message = message_element.text

# Verificar exito o fracaso. 
expected = "" # Se espera que las credenciales arrojen un login erroneo
if message == expected:
    status = "passed"
    reason = "Login test passed successfully"
else:
    status = "failed"
    reason = "Login test failed: unexpected message"

executor_object = {
    'action': 'setSessionStatus',
    'arguments': {
        'status': status,
        'reason': reason
    }
}
browserstack_executor = 'browserstack_executor: {}'.format(json.dumps(executor_object))
driver.execute_script(browserstack_executor)

# Terminar prueba
driver.quit()
