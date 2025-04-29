from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Rotation Matrices for 2D
def rotation_matrix_x(angle):
    rad = np.radians(angle)
    return np.array([[np.cos(rad), -np.sin(rad)], [np.sin(rad), np.cos(rad)]])  # 2x2 rotation matrix

# Apply Transformation
@app.route("/transform", methods=["POST"])
def transform():
    data = request.json
    matrix = np.array(data["matrix"])  # User input matrix (2x2)
    rotation = data.get("rotation", {"x": 0})  # Rotation only around Z-axis in 2D
    translation = data.get("translation", {"x": 0, "y": 0})  # Translation in 2D

    # Apply Rotation (2D)
    rot = rotation_matrix_x(rotation["x"])
    transformed = rot @ matrix  # Perform matrix multiplication

    # Apply Translation: Adding translation to the result
    # Since we're using 2x2 matrices, translation is done separately
    transformed[0, :] += translation["x"]
    transformed[1, :] += translation["y"]

    return jsonify({"transformed": transformed.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
