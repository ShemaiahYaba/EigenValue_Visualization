from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Rotation Matrices
def rotation_matrix_x(angle):
    rad = np.radians(angle)
    return np.array([[1, 0, 0], [0, np.cos(rad), -np.sin(rad)], [0, np.sin(rad), np.cos(rad)]])

def rotation_matrix_y(angle):
    rad = np.radians(angle)
    return np.array([[np.cos(rad), 0, np.sin(rad)], [0, 1, 0], [-np.sin(rad), 0, np.cos(rad)]])

def rotation_matrix_z(angle):
    rad = np.radians(angle)
    return np.array([[np.cos(rad), -np.sin(rad), 0], [np.sin(rad), np.cos(rad), 0], [0, 0, 1]])

# Translation Matrix (for 3D Homogeneous Coordinates)
def translation_matrix(dx, dy, dz):
    return np.array([[1, 0, 0, dx], [0, 1, 0, dy], [0, 0, 1, dz], [0, 0, 0, 1]])

# Apply Transformation
@app.route("/transform", methods=["POST"])
def transform():
    data = request.json
    matrix = np.array(data["matrix"])  # User input matrix
    rotation = data.get("rotation", {"x": 0, "y": 0, "z": 0})
    translation = data.get("translation", {"x": 0, "y": 0, "z": 0})

    # Apply Rotations
    rot_x = rotation_matrix_x(rotation["x"])
    rot_y = rotation_matrix_y(rotation["y"])
    rot_z = rotation_matrix_z(rotation["z"])
    transformed = rot_x @ rot_y @ rot_z @ matrix

    # Apply Translation (if 4x4 matrix for homogeneous coordinates)
    if transformed.shape[0] == 3:
        transformed = np.vstack([transformed, np.ones((1, transformed.shape[1]))])
    translation_mat = translation_matrix(translation["x"], translation["y"], translation["z"])
    transformed = translation_mat @ transformed

    return jsonify({"transformed": transformed.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
