import * as THREE from 'three';

// note: we don't display stats or allow orbit controls
// import Stats from 'three/examples/jsm/libs/stats.module';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class SceneInit {
  canvasId: string;
  fov: number;
  nearPlane: number;
  farPlane: number;

  canvas: HTMLCanvasElement | null;
  onWindowResize: () => void;

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.Renderer;
  clock: THREE.Clock;

  // don't display stats
  // stats: Stats;
  // controls: OrbitControls;

  // lighting
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;

  // custom to frantic architect
  cameraRotationDepth: number;

  constructor(canvasId: string) {
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.y = 4;

    this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    // note: Anti-aliasing smooths out the edges.
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.cameraRotationDepth = 12;

    this.clock = new THREE.Clock();
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.stats = Stats();
    // document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    // setting up the window resize function like this makes it easy
    // to remove the event listener
    this.onWindowResize = () => {
      console.log('resize');
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', this.onWindowResize, false);
  }

  destroy() {
    // TODO: maybe clear this data?
    // this.fov = 5;
    // this.nearPlane = 1;
    // this.farPlane = 1000;
    // this.canvasId = canvasId;

    // remove all objects from the scene
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    this.scene.removeFromParent();
    this.camera.removeFromParent();

    // TODO: Figure out what to do with this data
    // this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    // this.renderer = new THREE.WebGLRenderer({
    //   canvas: this.canvas,
    //   // NOTE: Anti-aliasing smooths out the edges.
    //   antialias: true,
    // });
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(this.renderer.domElement);
    // this.clock = new THREE.Clock();
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    window.removeEventListener('resize', this.onWindowResize);
  }

  update() {
    // don't show stats or orbit controls
    // this.stats.update();
    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  udpateCameraPosition() {
    const sinX = Math.sin(0.25 * this.clock.getElapsedTime());
    const cosZ = Math.cos(0.25 * this.clock.getElapsedTime());
    this.camera.position.x = this.cameraRotationDepth * sinX;
    this.camera.position.z = this.cameraRotationDepth * cosZ;
    this.camera.lookAt(new THREE.Vector3(0, 2, 0));
  }
}

export { SceneInit };
