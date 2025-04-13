import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);

const loader = new GLTFLoader();

loader.load(
  '/fancy_old_tiled_floor.glb',
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
