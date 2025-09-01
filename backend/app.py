from fastapi import FastAPI
from pydantic import BaseModel
import joblib, os, numpy as np

app = FastAPI()
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')

try:
    model = joblib.load(MODEL_PATH)
except:
    model = None

class PredictRequest(BaseModel):
    monthly_income: float
    mobile_txn_count: int
    utility_on_time_pct: float
    months_active: int

@app.get('/')
def root():
    return {"message": "AI Credit Scoring API"}

@app.post('/predict')
def predict(req: PredictRequest):
    if not model:
        return {"error": "Model not found. Run train_model.py first."}
    X = np.array([[req.monthly_income, req.mobile_txn_count, req.utility_on_time_pct, req.months_active]])
    pred = model.predict(X)[0]
    proba = model.predict_proba(X)[0][1]
    return {"eligible": bool(pred), "repayment_probability": round(float(proba), 3)}
