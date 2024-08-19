from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load the data
data = pd.read_csv('PeacePulse.csv')

# Split data into features and target
X = data[['sr', 'rr', 't', 'lm', 'bo', 'rem', 'sh', 'hr']]
y_stress_level = data['sl']  # Stress level

# We categorize into three categories based on stress level
y_category = pd.cut(y_stress_level, bins=[-1, 1, 3, 4], labels=[0, 1, 2])  # 0: Not Stressed, 1: Stressed, 2: Overly Stressed

# Now, split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y_stress_level, test_size=0.2, random_state=42)
_, _, y_cat_train, y_cat_test = train_test_split(X, y_category, test_size=0.2, random_state=42)

# Train the Random Forest Regressor for stress level prediction
rf_model = RandomForestRegressor()
rf_model.fit(X_train, y_train)

# Train the SVM model for stress categorization
svm_model = SVC()
svm_model.fit(X_train, y_cat_train)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        print(data)
        features = np.array([data['sr'], data['rr'], data['t'], data['lm'], data['bo'], data['rem'], data['sh'], data['hr']]).reshape(1, -1)
        
        # Predict stress level
        predicted_stress_level = rf_model.predict(features)[0]
        
        # Predict stress category
        stress_category = svm_model.predict(features)[0]
        
        response = {
            'predicted_stress_level': predicted_stress_level,
            'stress_category': int(stress_category)
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
