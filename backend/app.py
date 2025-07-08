from flask import Flask, request, jsonify, Response
from typing import Union, Tuple, Any
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://mlab-inky.vercel.app"])  # adjust as needed

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
def transform() -> Any:
    data = request.json
    if data is None:
        return jsonify({"error": "No data provided"}), 400
    
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

@app.route("/power-method", methods=["POST"])
def power_method() -> Any:
    data = request.json
    if data is None:
        return jsonify({"error": "No data provided"}), 400
    
    matrix = np.array(data["matrix"], dtype=float)
    n = matrix.shape[0]
    initial_vector = data.get("initial_vector", None)
    use_random = data.get("use_random", False)
    max_iter = int(data.get("max_iter", 10))
    tol = float(data.get("tol", 1e-8))

    # Input validation
    if matrix.ndim != 2 or matrix.shape[0] != matrix.shape[1]:
        return jsonify({"error": "Matrix must be square"}), 400

    if use_random or initial_vector is None:
        v0 = np.random.rand(n)
        v0 /= np.linalg.norm(v0)
    else:
        v0 = np.array(initial_vector, dtype=float)
        if v0.shape[0] != n:
            return jsonify({"error": "Initial vector size mismatch"}), 400

    vectors = []
    eigenvalues = []

    v = v0 / np.linalg.norm(v0)
    for i in range(max_iter):
        w = matrix @ v
        w_norm = np.linalg.norm(w)
        if w_norm == 0:
            break
        v_next = w / w_norm
        eigval = np.dot(v_next, matrix @ v_next) / np.dot(v_next, v_next)
        vectors.append(v_next.tolist())
        eigenvalues.append(eigval)
        if np.linalg.norm(v_next - v) < tol:
            break
        v = v_next

    # Compute true eigenvalues and find max
    true_eigenvalues = np.linalg.eigvals(matrix)
    max_true_eigenvalue = true_eigenvalues[np.argmax(np.abs(true_eigenvalues))].item()

    return jsonify({
        "vectors": vectors,
        "eigenvalues": eigenvalues,
        "true_max_eigenvalue": max_true_eigenvalue
    })


@app.route("/pca", methods=["POST"])
def pca() -> Any:
    data = request.json
    if data is None:
        return jsonify({"error": "No data provided"}), 400
    
    X = np.array(data["matrix"], dtype=float)  # shape: (n_samples, n_features)
    n_samples, n_features = X.shape

    # Center the data
    X_centered = X - np.mean(X, axis=0)

    # Covariance matrix
    cov = np.cov(X_centered, rowvar=False)

    # Eigen decomposition
    eigvals, eigvecs = np.linalg.eigh(cov)
    # Sort by descending eigenvalue
    idx = np.argsort(eigvals)[::-1]
    eigvals = eigvals[idx]
    eigvecs = eigvecs[:, idx]

    # Project data onto principal components
    projected = X_centered @ eigvecs

    # Explained variance ratio
    explained_variance_ratio = eigvals / np.sum(eigvals)

    return jsonify({
        "principal_components": eigvecs.tolist(),
        "explained_variance": eigvals.tolist(),
        "explained_variance_ratio": explained_variance_ratio.tolist(),
        "projected_data": projected.tolist()
    })

if __name__ == "__main__":
    app.run(debug=True)
