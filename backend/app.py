from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://mlab-inky.vercel.app"])  # adjust frontend origin

def rotation_matrix_x(angle):
    rad = np.radians(angle)
    return np.array([
        [1, 0, 0, 0],
        [0, np.cos(rad), -np.sin(rad), 0],
        [0, np.sin(rad),  np.cos(rad), 0],
        [0, 0, 0, 1]
    ])

def rotation_matrix_y(angle):
    rad = np.radians(angle)
    return np.array([
        [np.cos(rad), 0, np.sin(rad), 0],
        [0, 1, 0, 0],
        [-np.sin(rad), 0, np.cos(rad), 0],
        [0, 0, 0, 1]
    ])

def rotation_matrix_z(angle):
    rad = np.radians(angle)
    return np.array([
        [np.cos(rad), -np.sin(rad), 0, 0],
        [np.sin(rad),  np.cos(rad), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])

def create_translation_matrix(tx, ty, tz):
    return np.array([
        [1, 0, 0, tx],
        [0, 1, 0, ty],
        [0, 0, 1, tz],
        [0, 0, 0, 1]
    ])

@app.route("/transform", methods=["POST"])
def transform():
    data = request.json
    matrix = np.array(data["matrix"])
    rotation = data.get("rotation", {"x": 0, "y": 0, "z": 0})
    translation = data.get("translation", {"x": 0, "y": 0, "z": 0})

    # Validate matrix is square and size 2,3 or 4
    if matrix.ndim != 2 or matrix.shape[0] != matrix.shape[1]:
        return jsonify({"error": "Matrix must be square"}), 400

    size = matrix.shape[0]
    if size not in [2, 3, 4]:
        return jsonify({"error": "Matrix size must be 2x2, 3x3, or 4x4"}), 400

    # For 2x2: just return the matrix (or apply 2D rotation if you want)
    if size == 2:
        # Example: apply 2D rotation to matrix itself (linear operator)
        angle = rotation.get("z", 0)  # Only Z rotation relevant for 2D
        rad = np.radians(angle)
        rot = np.array([
            [np.cos(rad), -np.sin(rad)],
            [np.sin(rad),  np.cos(rad)]
        ])
        transformed = rot @ matrix
        return jsonify({"transformed": transformed.tolist()})

    # For 3x3 and 4x4: assume matrix is in homogeneous coords if 4x4
    # Compose rotation matrices (4x4 for uniformity)
    if size == 3:
        # Pad to 4x4 for homogeneous transformations
        padded = np.eye(4)
        padded[:3, :3] = matrix

        rot_x = rotation_matrix_x(rotation.get("x", 0))
        rot_y = rotation_matrix_y(rotation.get("y", 0))
        rot_z = rotation_matrix_z(rotation.get("z", 0))
        rotation_matrix_combined = rot_z @ rot_y @ rot_x

        translation_matrix = create_translation_matrix(
            translation.get("x", 0),
            translation.get("y", 0),
            translation.get("z", 0),
        )

        transformed = translation_matrix @ rotation_matrix_combined @ padded
        # Return the 3x3 part only (upper-left) or full 4x4 if you want
        return jsonify({"transformed": transformed[:3, :3].tolist()})

    if size == 4:
        rot_x = rotation_matrix_x(rotation.get("x", 0))
        rot_y = rotation_matrix_y(rotation.get("y", 0))
        rot_z = rotation_matrix_z(rotation.get("z", 0))
        rotation_matrix_combined = rot_z @ rot_y @ rot_x

        translation_matrix = create_translation_matrix(
            translation.get("x", 0),
            translation.get("y", 0),
            translation.get("z", 0),
        )

        transformed = translation_matrix @ rotation_matrix_combined @ matrix
        return jsonify({"transformed": transformed.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
