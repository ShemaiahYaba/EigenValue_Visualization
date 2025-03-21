from fastapi import FastAPI, WebSocket
from pydantic import BaseModel
import numpy as np
import plotly.graph_objects as go
import json

app = FastAPI()

class MatrixInput(BaseModel):
    matrix: list[list[float]]

# Compute eigenvalues and eigenvectors
def compute_eigen(matrix):
    try:
        A = np.array(matrix)

        # Ensure the matrix is square
        rows, cols = A.shape
        if rows != cols or rows < 2 or rows > 4:
            raise ValueError("Matrix must be square (2x2, 3x3, or 4x4).")

        eigenvalues, eigenvectors = np.linalg.eig(A)
        return eigenvalues.tolist(), eigenvectors.tolist()
    except Exception as e:
        return {"error": str(e)}

# Generate an interactive Plotly visualization
def generate_plot(eigenvectors):
    fig = go.Figure()

    for i in range(len(eigenvectors[0])):  # Number of eigenvectors
        fig.add_trace(go.Scatter(
            x=[0, eigenvectors[0][i]], 
            y=[0, eigenvectors[1][i]], 
            mode="lines", 
            name=f"Eigenvector {i+1}"
        ))

    fig.update_layout(
        title="Eigenvectors Visualization", 
        xaxis=dict(range=[-2, 2]), 
        yaxis=dict(range=[-2, 2])
    )

    return fig.to_json()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        matrix_data = json.loads(data)

        result = compute_eigen(matrix_data["matrix"])
        
        if "error" in result:
            await websocket.send_json({"error": result["error"]})
        else:
            eigenvalues, eigenvectors = result
            plot_json = generate_plot(eigenvectors)
            
            await websocket.send_json({
                "eigenvalues": eigenvalues,
                "eigenvectors": eigenvectors,
                "plot": plot_json
            })
