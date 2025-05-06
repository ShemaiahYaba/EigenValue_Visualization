from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://mlab-inky.vercel.app"])  # Replace with your actual frontend domain in prod

# 2D Rotation Matrix
def rotation_matrix(angle):
    rad = np.radians(angle)
    return np.array([
        [np.cos(rad), -np.sin(rad)],
        [np.sin(rad), np.cos(rad)]
    ])

def rotation_matrix_x(angle):
    rad = np.radians(angle)
    return np.array([
        [1, 0, 0],
        [0, np.cos(rad), -np.sin(rad)],
        [0, np.sin(rad),  np.cos(rad)]
    ])

def rotation_matrix_y(angle):
    rad = np.radians(angle)
    return np.array([
        [np.cos(rad), 0, np.sin(rad)],
        [0, 1, 0],
        [-np.sin(rad), 0, np.cos(rad)]
    ])

def rotation_matrix_z(angle):
    rad = np.radians(angle)
    return np.array([
        [np.cos(rad), -np.sin(rad), 0],
        [np.sin(rad),  np.cos(rad), 0],
        [0, 0, 1]
    ])


@app.route("/transform", methods=["POST"])
def transform():
    data = request.json
    matrix = np.array(data["matrix"])  # Expected shape: 3xN
    rotation = data.get("rotation", {"x": 0, "y": 0, "z": 0})
    translation = data.get("translation", {"x": 0, "y": 0, "z": 0})

    # Validate shape
    if matrix.shape[0] != 3:
        return jsonify({"error": "Matrix must have 3 rows for 3D transformation"}), 400

    # Create composite rotation matrix
    rot_x = rotation_matrix_x(rotation["x"])
    rot_y = rotation_matrix_y(rotation["y"])
    rot_z = rotation_matrix_z(rotation["z"])

    rotation_matrix_combined = rot_z @ rot_y @ rot_x  # Note: Order matters

    # Apply rotation
    transformed = rotation_matrix_combined @ matrix  # Shape: 3xN

    # Apply translation
    transformed[0, :] += translation["x"]
    transformed[1, :] += translation["y"]
    transformed[2, :] += translation["z"]

    return jsonify({"transformed": transformed.tolist()})


if __name__ == "__main__":
    app.run(debug=True)
