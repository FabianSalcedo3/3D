import * as THREE from 'three';
import { color } from 'three/tsl';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d110c); // Imposto lo sfondo della scena
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new THREE.BoxGeometry(1, 1, 1); // Creo una geometria cubica
const icosahedron = new THREE.IcosahedronGeometry(0.7, 0); // Creo una geometria icosaedrica
const dodecahedron = new THREE.DodecahedronGeometry(0.7, 0); // Creo una geometria dodecaedrica

camera.position.z = 5;

// Aggiungo una luce alla scena
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-2, 5, 6);
scene.add(light);

function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
}

const objects = [
  makeInstance(cube, 0x44aa88, 0),
  makeInstance(icosahedron, 0x8844aa, -2),
  makeInstance(dodecahedron, 0xaa8844, 2),
];

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function animate() {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  objects.forEach((object, index) => {
    object.rotation.x += index * 0.002 + 0.008;
    object.rotation.y += index * 0.001 + 0.008;
  });
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
