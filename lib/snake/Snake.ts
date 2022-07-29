import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

interface IPosition {
  x: number;
  y: number;
  z: number;
}

interface IPortal {
  x: number;
  y: number;
  z: number;
  color: string;
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

  portalPairPositions: Array<[IPortal, IPortal]>;

  constructor(portalPairPositions: Array<[IPortal, IPortal]>) {
    this.portalPairPositions = portalPairPositions;

    this.gg = new THREE.Group();
    this.clock = new THREE.Clock();
    this.clock.start();

    // snake body
    this.bodyPositions = [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 1, y: 2, z: 0 },
      { x: 1, y: 3, z: 0 },
      { x: 1, y: 4, z: 0 },
      { x: 1, y: 5, z: 0 },
      { x: 1, y: 6, z: 0 },
    ];

    // snake game settings
    this.timestep = 100;
    this.isMoving = false;

    this._initializeSnake();
  }

  _initializeSnake() {
    // create the entire snake
    this.bodyPositions.forEach((bodyPosition, index) => {
      let isHead = index === 0;
      this._createIndividualSnakePart(bodyPosition, isHead);
    });
  }

  _createIndividualSnakePart(coord: IPosition, isHead: boolean) {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    let boxMaterial;
    if (isHead) {
      boxMaterial = new THREE.MeshStandardMaterial({
        // transparent: true,
        // opacity: 0.5,
      });
    } else {
      boxMaterial = new THREE.MeshNormalMaterial();
    }
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = coord.x;
    boxMesh.position.y = coord.y;
    this.gg.add(boxMesh);
  }

  render() {
    // iterate through body position array and update snake
    for (let i = 0; i < this.bodyPositions.length; i++) {
      let { x, y, z } = this.bodyPositions[i];
      this.gg.children[i].position.set(x, y, z);
    }
  }

  // calculate distance between the head of the snake and a points
  // distance between two points - sqrt((x1 - x2)^2 + (y1 - y2)^2)
  _distanceFromPortal(bodyCoords: IPosition, portal: IPortal) {
    let dx2 = Math.pow(bodyCoords.x - portal.x, 2);
    let dy2 = Math.pow(bodyCoords.y - portal.y, 2);
    return Math.sqrt(dx2 + dy2);
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
        z: this.bodyPositions[i].z,
      };

      let newBodyCoords;
      if (i === 0) {
        // in the initial iteration, we may want to change the
        // direction of the head of the snake
        newBodyCoords = {
          x: this.bodyPositions[0].x + this.xSpeed,
          y: this.bodyPositions[0].y + this.ySpeed,
          z: this.bodyPositions[0].z,
        };

        // check if the head of the snake is entering any portal
        for (let i = 0; i < this.portalPairPositions.length; i++) {
          let portal1 = this.portalPairPositions[i][0];
          let portal2 = this.portalPairPositions[i][1];

          // if the distance from the head of the snake to the entrance
          // of the portal is small, then transport the head of the snake
          // to coordinates of the corresponding portal pair
          if (this._distanceFromPortal(newBodyCoords, portal1) < 0.1) {
            newBodyCoords.x = portal2.x + this.xSpeed;
            newBodyCoords.y = portal2.y + this.ySpeed;
          } else if (this._distanceFromPortal(newBodyCoords, portal2) < 0.1) {
            newBodyCoords.x = portal1.x + this.xSpeed;
            newBodyCoords.y = portal1.y + this.ySpeed;
          }
        }
      } else {
        // the rest of the coordinates can get updated as normal
        newBodyCoords = {
          x: this.bodyPositions[i - 1].x,
          y: this.bodyPositions[i - 1].y,
          z: this.bodyPositions[i - 1].z,
        };
      }

      // create a tween to animate the movement of the snake
      let tweenBody = new TWEEN.Tween(oldBodyCoords)
        .to(newBodyCoords, 500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => {
          this.bodyPositions[i].x = oldBodyCoords.x;
          this.bodyPositions[i].y = oldBodyCoords.y;
          this.bodyPositions[i].z = oldBodyCoords.z;
        });
      tweenBody.start();
    }
  }

  handleMovement(event: KeyboardEvent) {
    let validKeyPress = ['w', 'a', 's', 'd'];

    if (validKeyPress.includes(event.key)) {
      this.isMoving = true;
    } else {
      this.isMoving = false;
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
