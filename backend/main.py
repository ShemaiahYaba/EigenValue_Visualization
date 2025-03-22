from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class MatrixInput(BaseModel):
    matrix: list

@app.post("/compute-eigen")
def compute_eigen(input_data: MatrixInput):
    mat = np.array(input_data.matrix)
    eigvals, eigvecs = np.linalg.eig(mat)
    return {"eigenvalues": eigvals.tolist(), "eigenvectors": eigvecs.tolist()}

# Run server: uvicorn main:app --reload
