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
    this.bodyPositions = [
      { x: 0, y: 0 },
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
    // create the entire snake
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
    // iterate through body position array and update snake
    for (let i = 0; i < this.bodyPositions.length; i++) {
      let { x, y } = this.bodyPositions[i];
      this.gg.children[i].position.set(x, y, 0);
    }
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

    // update the rest of the snake
    for (let i = 0; i < this.bodyPositions.length; i++) {
      let oldBodyCoords = {
        x: this.bodyPositions[i].x,
        y: this.bodyPositions[i].y,
      };

      let newBodyCoords;
      if (i === 0) {
        // in the initial iteration, we may want to change the
        // direction of the head of the snake
        newBodyCoords = {
          x: this.bodyPositions[0].x + this.xSpeed,
          y: this.bodyPositions[0].y + this.ySpeed,
        };
      } else {
        // the rest of the coordinates can get updated as normal
        newBodyCoords = {
          x: this.bodyPositions[i - 1].x,
          y: this.bodyPositions[i - 1].y,
        };
      }

      // create a tween to animate the movement of the snake
      let tweenBody = new TWEEN.Tween(oldBodyCoords)
        .to(newBodyCoords, 500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => {
          this.bodyPositions[i].x = oldBodyCoords.x;
          this.bodyPositions[i].y = oldBodyCoords.y;
        });
      tweenBody.start();
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
