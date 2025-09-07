# app.py
from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load your trained model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # Extract features
    try:
        features = [
            data['N'],
            data['P'],
            data['K'],
            data['temperature'],
            data['humidity'],
            data['ph'],
            data['rainfall']
        ]
    except KeyError as e:
        return jsonify({'error': f'Missing feature: {str(e)}'}), 400

    # Predict
    prediction = model.predict([features])[0]

    return jsonify({'prediction': prediction.item()})


if __name__ == '__main__':
    app.run(port=50001)
