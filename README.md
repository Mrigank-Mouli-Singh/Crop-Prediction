# 🌱 Machine Learning-Based Crop Prediction and Recommendation System

A full-stack, machine learning-powered web application designed to empower farmers with **data-driven insights**.  
By analyzing soil nutrients and environmental parameters, the system recommends optimal crops and forecasts potential yields—helping farmers optimize harvests, reduce waste, and support sustainable agriculture.

---

## 📖 Introduction

This project combines **machine learning** with a **responsive web interface** to provide crop recommendations and yield forecasting.  
It leverages environmental and soil data to minimize risks and maximize profitability, promoting sustainability in agriculture.

---

## 🚀 Features

- **Intelligent Crop Recommendation**: Recommends optimal crops based on soil (N, P, K, pH) and climate data (temperature, humidity, rainfall).  
- **Yield Forecasting**: Predicts approximate crop yield for informed resource planning.  
- **Data-Driven Decision Making**: Enables farmers to make smarter planting choices using historical and real-time data.  
- **Lightweight and Accessible**: Minimal UI and streamlined architecture for easy access, even on low-resource devices.

---

## 🛠️ Technology Stack

###  Backend / ML
- **Python**: Core language for data processing and machine learning.  
- **Scikit-learn, Pandas, NumPy**: Tools for data preparation and model training.  

###  API Layer
- **Flask**: Serves the machine learning model via RESTful endpoints.

###  Frontend
- **HTML, CSS, JavaScript**: Simple frontend for user input and result display; built for clarity and responsiveness.

###  Data & Models
- **Crop_recommendation.csv**: Dataset containing soil and climate features.  
- **model.ipynb**: Jupyter notebook for data exploration and model training.  
- **model.pkl**: Pickled ML model ready for inference.  
- **label.json**: Maps prediction outputs to crop names.

---
##  Project Structure

```
Crop-Prediction/
│
├── backend/ # Node.js + Express.js backend
│ ├── routes/ # API routes
│ ├── models/ # Data schemas or ML model integration
│ ├── server.js # Backend entry point
│ └── package.json # Backend dependencies
│
├── frontend/ # React.js frontend
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Main pages
│ │ ├── App.js # Root React component
│ │ └── index.js # React entry point
│ └── package.json # Frontend dependencies
│
├── ml/ # Machine learning scripts
│ ├── crop_prediction.py # ML training and prediction script
│ ├── model.pkl # Trained ML model (saved)
│ └── requirements.txt # Python dependencies
│
├── .gitignore # Git ignore rules
├── README.md # Project documentation
```

---

##  Methodology

1. **Data Ingestion & Cleaning**: Used soil and climate data to prepare the model input.  
2. **Model Training**: Built and evaluated supervised learning models (like Random Forest / Decision Tree).  
3. **API Wrapping**: Wrapped the model in a Flask API to serve real-time predictions.  
4. **User Interface**: Created a minimal frontend to allow farmers to submit data and view predictions.

---

## ⚙️ Installation & Usage

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Bhaveshkhokhar/Crop-Prediction.git
cd Crop-Prediction
```

### 2️⃣ Install Dependencies
Backend (Node.js):

```bash
cd backend
npm install
```

Machine Learning (Python):

```bash
cd ml
pip install -r requirements.txt
```

### 3️⃣ Run the Application
Start the backend server:

```bash
npm run server
```

Start the frontend:

```bash
npm start
```

Run the ML training script if needed:

```bash
python crop_prediction.py
```

4️⃣ Access the Application
Open your browser and visit:

arduino
```
http://localhost:3000
```


## 🌍 Future Enhancements
1.Integration with real-time weather APIs.

2.Support for multiple ML models with comparative analysis.

3.Full deployment on Netlify/Vercel (frontend) + Render/Heroku (backend).

4.Multi-language support for farmers across regions.


## 🤝 Contributing
1.Contributions are welcome!

2.Fork the repo

3.Create a branch (feature/your-feature)

4.Commit changes

5.Push and open a Pull Request

## 👤 Author

Mrigank Mouli Singh

GitHub: [Mrigank-Mouli-Singh](https://github.com/Mrigank-Mouli-Singh)

LinkedIn: [Mrigank Mouli Singh](https://www.linkedin.com/in/mrigank-mouli-singh/)

