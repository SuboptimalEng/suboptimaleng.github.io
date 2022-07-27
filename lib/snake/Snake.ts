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

  render() {
    this.gg.children[0].position.x = this.headPosition.x;
    this.gg.children[0].position.y = this.headPosition.y;
  }

  update(t: number) {
    TWEEN.update(t);

    if (!this.isMoving) {
      return;
    }

    this.render();

    if (this.clock.getElapsedTime() < 0.5) {
      return;
    }

    // reset the clock
    this.clock.start();

    let oldCoords = {
      x: this.headPosition.x,
      y: this.headPosition.y,
    };
    let newCoords = {
      x: this.headPosition.x + this.xSpeed,
      y: this.headPosition.y + this.ySpeed,
    };

    let tween = new TWEEN.Tween(oldCoords)
      .to(newCoords, 500)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(({ x, y }) => {
        // console.log(oldCoords);
        this.headPosition.x = oldCoords.x;
        this.headPosition.y = oldCoords.y;
        // this.gg.children[0].position.x = oldCoords.x;
        // this.gg.children[0].position.y = oldCoords.y;
      })
      .start();

    // for (let i = 0; i < this.bodyPositions.length; i++) {
    //   let bodyOldCoords = {
    //     x: this.bodyPositions[i].x,
    //     y: this.bodyPositions[i].y,
    //   };
    //   let bodyNewCoords = {
    //     x: oldCoords.x,
    //     y: oldCoords.y,
    //   };

    //   let tween2 = new TWEEN.Tween(bodyOldCoords)
    //     .to(bodyNewCoords, 500)
    //     .easing(TWEEN.Easing.Cubic.InOut)
    //     .onUpdate(() => {
    //       this.bodyPositions[i].x = bodyOldCoords.x;
    //       this.bodyPositions[i].y = bodyOldCoords.y;
    //       this.gg.children[i + 1].position.x = bodyOldCoords.x;
    //       this.gg.children[i + 1].position.y = bodyOldCoords.y;
    //     })
    //     .start();
    // }

    // update internal state
    // this.headPosition.x = newCoords.x;
    // this.headPosition.y = newCoords.y;

    // for (let i = 0; i < this.bodyPositions.length; i++) {
    //   let tmpX = this.bodyPositions[i].x;
    //   let tmpY = this.bodyPositions[i].y;
    //   this.bodyPositions[i].x = oldCoords.x;
    //   this.bodyPositions[i].y = oldCoords.y;
    //   oldCoords = { x: tmpX, y: tmpY };
    // }

    // update snake render
    // console.log(this.gg);
    // debugger;
    // let headBodyArr = [this.headPosition, ...this.bodyPositions];
    // for (let i = 0; i < headBodyArr.length; i++) {
    //   this.gg.children[i].position.x = headBodyArr[i].x;
    //   this.gg.children[i].position.y = headBodyArr[i].y;
    // }
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
