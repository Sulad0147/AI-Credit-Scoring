# API Docs

POST /predict

Request JSON:
```
{"monthly_income": 50000, "mobile_txn_count": 20, "utility_on_time_pct": 0.9, "months_active": 18}
```

Response JSON:
```
{"eligible": true, "repayment_probability": 0.82}
```
