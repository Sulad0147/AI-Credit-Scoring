import numpy as np, joblib, os
from sklearn.ensemble import RandomForestClassifier

np.random.seed(42)
X = np.random.rand(500, 4)
y = (X.sum(axis=1) > 2).astype(int)

clf = RandomForestClassifier()
clf.fit(X, y)

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'model.pkl')
joblib.dump(clf, MODEL_PATH)
print(f"Model saved to {MODEL_PATH}")
