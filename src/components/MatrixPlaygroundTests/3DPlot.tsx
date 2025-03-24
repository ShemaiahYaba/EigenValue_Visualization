import * as THREE from "three";

// Create Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Axes Helper (Red = X, Green = Y, Blue = Z)
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Position Camera
camera.position.z = 5;

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
