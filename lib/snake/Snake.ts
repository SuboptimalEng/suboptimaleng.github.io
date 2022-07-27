import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

interface IPosition {
  x: number;
  y: number;
}

class Snake {
  gg: THREE.Group;
  clock: THREE.Clock;

  timestep: number;
  isMoving: boolean;
  headPosition: IPosition;
  bodyPositions: Array<IPosition>;

  // default initalization
  speed: number = 1;
  xSpeed: number = 0;
  ySpeed: number = 0;

  constructor() {
    this.gg = new THREE.Group();
    this.clock = new THREE.Clock();
    this.clock.start();

    // snake body
    this.headPosition = { x: 0, y: 0 };
    this.bodyPositions = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
      { x: 1, y: 6 },
    ];

    // snake game settings
    this.timestep = 100;
    this.isMoving = false;

    this._initializeSnake();
  }

  _initializeSnake() {
    // create head of the snake
    this._createIndividualSnakePart(this.headPosition);

    // create body of the snake
    this.bodyPositions.forEach((bodyPosition) => {
      this._createIndividualSnakePart(bodyPosition);
    });
  }

  _createIndividualSnakePart(coord: IPosition) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = coord.x;
    boxMesh.position.y = coord.y;
    this.gg.add(boxMesh);
  }

  update() {
    if (!this.isMoving) {
      return;
    }
    if (this.clock.getElapsedTime() < 0.5) {
      return;
    } else {
      this.clock.start();
    }
    // console.log(this.clock.getElapsedTime());

    let newX = this.headPosition.x;
    let newY = this.headPosition.y;

    // update internal state
    this.headPosition.x += this.xSpeed;
    this.headPosition.y += this.ySpeed;

    for (let i = 0; i < this.bodyPositions.length; i++) {
      let tmpX = this.bodyPositions[i].x;
      let tmpY = this.bodyPositions[i].y;

      this.bodyPositions[i].x = newX;
      this.bodyPositions[i].y = newY;

      newX = tmpX;
      newY = tmpY;
    }

    // update snake render
    // console.log(this.gg);
    // debugger;
    let headBodyArr = [this.headPosition, ...this.bodyPositions];
    for (let i = 0; i < headBodyArr.length; i++) {
      this.gg.children[i].position.x = headBodyArr[i].x;
      this.gg.children[i].position.y = headBodyArr[i].y;
    }
  }

  handleMovement(event: KeyboardEvent) {
    let validKeyPress = ['w', 'a', 's', 'd'];

    if (validKeyPress.includes(event.key)) {
      this.isMoving = true;
    }

    if (event.key === 'w') {
      this.xSpeed = 0;
      this.ySpeed = this.speed;
    } else if (event.key === 'a') {
      this.xSpeed = -this.speed;
      this.ySpeed = 0;
    } else if (event.key === 's') {
      this.xSpeed = 0;
      this.ySpeed = -this.speed;
    } else if (event.key === 'd') {
      this.xSpeed = this.speed;
      this.ySpeed = 0;
    }
  }
}

export { Snake };
