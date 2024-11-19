"""
Created on Mon Nov 18 19:56:35 2024

@author: elva0
"""

# Importar bibliotecas necesarias
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from lime.lime_tabular import LimeTabularExplainer
import matplotlib.pyplot as plt

# 1. Cargar el dataset
from sklearn.datasets import load_iris
iris = load_iris()
X = pd.DataFrame(iris.data, columns=iris.feature_names)
y = iris.target

# Dividir en conjunto de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Entrenar un modelo de clasificación
model = RandomForestClassifier(random_state=42, n_estimators=100)
model.fit(X_train, y_train)

# 3. Seleccionar una instancia para explicar
instance_to_explain = X_test.iloc[0].values.reshape(1, -1)

# 4. Crear el explicador LIME
explainer = LimeTabularExplainer(
    training_data=X_train.values,  # Datos de entrenamiento
    feature_names=X.columns.tolist(),  # Nombres de las características
    class_names=iris.target_names.tolist(),  # Nombres de las clases
    mode="classification"  # Modo de clasificación
)

# Generar la explicación
explanation = explainer.explain_instance(
    data_row=instance_to_explain.flatten(),  # Instancia a explicar
    predict_fn=model.predict_proba  # Función de predicción
)

# 5. Visualizar la explicación
explanation.show_in_notebook(show_table=True)
explanation.as_pyplot_figure()
plt.show()

# 6. Imprimir el resultado textual
print("\n--- Explicación textual ---")
print(explanation.as_list())
