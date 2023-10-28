import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { PDBLoader } from 'three/addons/loaders/PDBLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import * as pdb1 from '../models/caffeine.pdb'
import axios from 'axios';

const Molecules = () => {
  const [file, setFile] = useState(null);
  const [outputMessage, setOutputMessage] = useState('');
  const containerRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const MOLECULES = {
    Caffeine: 'converted.pdb',
  };

  const [fileContent, setFileContent] = useState('');

  const params = {
    molecule: 'converted.pdb',
  };

  let camera, scene, renderer, labelRenderer;
  let controls;
  let root;

  const loader = new PDBLoader();
  const offset = new THREE.Vector3();

  useEffect(() => {
    init();
    animate();
  });

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/upload_and_convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setOutputMessage(`File converted successfully: ${response.data.success}`);
      } else {
        setOutputMessage(`Error: ${response.data.error}`);
      }
    } catch (error) {
      setOutputMessage('An error occurred while uploading and converting the file.');
    }
  };

  // function init() {
  //   const visualizer = CrystVis('#molecule', 800, 600)
  //   var loaded = visualizer.loadModels(fileContent);
  //   console.log('Models loaded: ', loaded);
  //   visualizer.displayModel(loaded[0])
  // }

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1000;
    scene.add(camera);

    const light1 = new THREE.DirectionalLight(0xffffff, 2.5);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(-1, -1, 1);
    scene.add(light2);

    root = new THREE.Group();
    scene.add(root);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.getElementById('container').appendChild(labelRenderer.domElement);

    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 2000;

    loadMolecule(params.molecule);

    window.addEventListener('resize', onWindowResize);

    const gui = new GUI();
    gui.add(params, 'molecule', MOLECULES).onChange(loadMolecule);
    gui.open();
  }

  function loadMolecule(model) {
    const url = 'models/' + model;

    while (root.children.length > 0) {
      const object = root.children[0];
      object.parent.remove(object);
    }

    loader.load(url, (pdb) => {
      const geometryAtoms = pdb.geometryAtoms;
      const geometryBonds = pdb.geometryBonds;
      const json = pdb.json;

      const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
      const sphereGeometry = new THREE.IcosahedronGeometry(1, 3);

      geometryAtoms.computeBoundingBox();
      geometryAtoms.boundingBox.getCenter(offset).negate();

      geometryAtoms.translate(offset.x, offset.y, offset.z);
      geometryBonds.translate(offset.x, offset.y, offset.z);

      let positions = geometryAtoms.getAttribute('position');
      const colors = geometryAtoms.getAttribute('color');

      const position = new THREE.Vector3();
      const color = new THREE.Color();

      for (let i = 0; i < positions.count; i++) {
        position.x = positions.getX(i);
        position.y = positions.getY(i);
        position.z = positions.getZ(i);

        color.r = colors.getX(i);
        color.g = colors.getY(i);
        color.b = colors.getZ(i);

        const material = new THREE.MeshPhongMaterial({ color: color });

        const object = new THREE.Mesh(sphereGeometry, material);
        object.position.copy(position);
        object.position.multiplyScalar(75);
        object.scale.multiplyScalar(25);
        root.add(object);

        const atom = json.atoms[i];

        const text = document.createElement('div');
        text.className = 'label';
        text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
        text.textContent = atom[4];

        const label = new CSS2DObject(text);
        label.position.copy(object.position);
        root.add(label);
      }

      positions = geometryBonds.getAttribute('position');

      const start = new THREE.Vector3();
      const end = new THREE.Vector3();

      for (let i = 0; i < positions.count; i += 2) {
        start.x = positions.getX(i);
        start.y = positions.getY(i);
        start.z = positions.getZ(i);

        end.x = positions.getX(i + 1);
        end.y = positions.getY(i + 1);
        end.z = positions.getZ(i + 1);

        start.multiplyScalar(75);
        end.multiplyScalar(75);

        const object = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial(0xffffff));
        object.position.copy(start);
        object.position.lerp(end, 0.5);
        object.scale.set(5, 5, start.distanceTo(end));
        object.lookAt(end);
        root.add(object);
      }

      render();
    });
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);

    render();
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    const time = Date.now() * 0.0004;
    root.rotation.x = time;
    root.rotation.y = time * 0.7;
    render();
  }

  function render() {
    renderer.render(scene, camera);
    // labelRenderer.render(scene, camera);
  }

  return (
    <>
      <div id="info">
        <a href="https://threejs.org" target="_blank" rel="noopener noreferrer">
          three.js webgl
        </a>{' '}
        - molecules
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">File Upload</h3>
                <div className="form-group">
                  <input type="file" className="form-control-file" onChange={handleFileUpload} />
                </div>
                {fileContent && (
                  <div className="form-group">
                    <h5>File Content:</h5>
                    <pre>{fileContent}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="container"></div>
    </>
  );
};

export default Molecules;
