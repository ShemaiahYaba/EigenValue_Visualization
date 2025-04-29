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

@app.route("/transform", methods=["POST"])
def transform():
    data = request.json
    matrix = np.array(data["matrix"])  # Expected shape: 2xN (points as columns)
    rotation = data.get("rotation", {}).get("x", 0)  # Rotation in degrees
    translation = data.get("translation", {"x": 0, "y": 0})

    # Apply rotation
    rot = rotation_matrix(rotation)
    transformed = rot @ matrix  # shape: 2xN

    # Apply translation
    transformed[0, :] += translation["x"]
    transformed[1, :] += translation["y"]

    return jsonify({"transformed": transformed.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
