import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export class SceneInit {
  canvasId: string;
  fov: number;
  nearPlane: number;
  farPlane: number;

  uniforms: any;
  onWindowResize: () => void;
  onMouseMove: (e: MouseEvent) => void;

  canvas: HTMLCanvasElement | null;

  // three.js variables
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.Renderer;
  clock: THREE.Clock;

  stats: Stats;
  // controls: OrbitControls;

  // lighting
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;

  constructor(canvasId: string) {
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;
    this.uniforms = {
      u_time: {
        type: 'f',
        value: 0.0,
      },
      u_resolution: new THREE.Uniform(
        new THREE.Vector2(window.innerWidth, window.innerHeight)
      ),
      u_mouse: new THREE.Uniform(new THREE.Vector2(0, 0)),
    };

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera();

    // this.camera.position.x = 0;
    // this.camera.position.y = 0;
    this.camera.position.z = 10;

    this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // NOTE: Additional components.
    this.clock = new THREE.Clock();
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 4, 10);
    this.scene.add(this.directionalLight);

    // setting up the window resize function like this makes it easy
    // to remove the event listener
    this.onWindowResize = () => {
      console.log('resize');
      this.camera.updateProjectionMatrix();
      this.uniforms.u_resolution.value.x = window.innerWidth;
      this.uniforms.u_resolution.value.y = window.innerHeight;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    this.onMouseMove = (e: any) => {
      this.uniforms.u_mouse.value.x = e.pageX / window.innerWidth;
      this.uniforms.u_mouse.value.y = e.pageY / window.innerHeight;
      // console.log(this.uniforms.u_mouse.value);
    };

    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('mousemove', this.onMouseMove);
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

    // remove the stats element
    document.body.removeChild(this.stats.dom);

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
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  update() {
    // NOTE: Window is implied.
    // NOTE: Remove request animation frame?
    // requestAnimationFrame(this.update.bind(this));
    // window.requestAnimationFrame(this.update.bind(this));
    this.render();
    this.stats.update();
    // don't allow for orbit control
    // this.controls.update();
  }

  render() {
    // NOTE: Update uniform data on each render.
    this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }
}
