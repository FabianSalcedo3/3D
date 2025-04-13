import * as THREE from 'three';
import { color } from 'three/tsl';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d110c); // Imposto lo sfondo della scena
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1); // Creo una geometria cubica

camera.position.z = 4;

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

const cubes = [
  makeInstance(geometry, 0x44aa88, 0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844, 2),
];

function animate() {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  cubes.forEach((cube, index) => {
    cube.rotation.x += index * 0.002 + 0.008;
    cube.rotation.y += index * 0.001 + 0.008;
  });
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
