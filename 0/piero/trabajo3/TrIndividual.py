import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import matplotlib.pyplot as plt

# Cargar el dataset preprocesado
file_path = 'DepressionStudentDataset.csv' 
data = pd.read_csv(file_path)

# Codificacion de variables categoricas
from sklearn.preprocessing import LabelEncoder

label_cols = ['Gender', 'Sleep Duration', 'Dietary Habits',
              'Have you ever had suicidal thoughts ?', 'Family History of Mental Illness', 'Depression']
le = LabelEncoder()
for col in label_cols:
    data[col] = le.fit_transform(data[col])

X = data.drop(columns=['Depression'])
y = data['Depression']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Escalado de variables numericos
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# --- Modelo 1: XGBoost ---
print("\nXGBoost:")
xgb_model = XGBClassifier(eval_metric='logloss', random_state=42)
xgb_model.fit(X_train, y_train)
xgb_predictions = xgb_model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, xgb_predictions))
print("Confusion Matrix:\n", confusion_matrix(y_test, xgb_predictions))
print("Classification Report:\n", classification_report(y_test, xgb_predictions))

# --- Modelo 2: SVM ---
print("\nSVM:")
svm_model = SVC(kernel='linear', random_state=42)
svm_model.fit(X_train_scaled, y_train)
svm_predictions = svm_model.predict(X_test_scaled)

print("Accuracy:", accuracy_score(y_test, svm_predictions))
print("Confusion Matrix:\n", confusion_matrix(y_test, svm_predictions))
print("Classification Report:\n", classification_report(y_test, svm_predictions))

'''

# SHAP global
import shap

# XGBoost
explainer_xgb = shap.TreeExplainer(xgb_model)
shap_values_xgb = explainer_xgb.shap_values(X_test)  
shap.summary_plot(shap_values_xgb, X_test, feature_names=X_test.columns, max_display=10) 

# SVM
explainer_svm = shap.KernelExplainer(svm_model.predict, X_train_scaled)
shap_values_svm = explainer_svm.shap_values(X_test_scaled) 
shap.summary_plot(shap_values_svm, X_test_scaled, feature_names=X.columns, max_display=10)

'''

# SHAP local
import shap
instance=1
print(X_test.iloc[instance])

indice_10 = X_test[X_test['Academic Pressure'] == 1].index[0]
indice_11 = X_test[X_test['Academic Pressure'] == 2].index[0]
indice_12 = X_test[X_test['Academic Pressure'] == 3].index[0]
indice_13 = X_test[X_test['Academic Pressure'] == 4].index[0]
indice_14 = X_test[X_test['Academic Pressure'] == 5].index[0]

# XGBoost
explainer_xgb = shap.TreeExplainer(xgb_model)
shap_values_xgb = explainer_xgb(X)
for instance in [indice_10, indice_11, indice_12, indice_13, indice_14]:
    shap.plots.waterfall(shap_values_xgb[instance], max_display=10)
    plt.show()

