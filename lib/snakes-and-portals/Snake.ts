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
  snackGroup: THREE.Group;

  bodyPositions: Array<IPosition>;

  // snake game settings
  speed: number = 1;
  xSpeed: number = 0;
  ySpeed: number = 0;
  timeStep: number = 300;
  snackStep: number = 150;
  elaplsedTime: number = 0.3;
  isMoving: boolean = false;

  // a little hacky, but add the snack in this class
  snack: IPosition;

  boardSize: number;
  portalPairPositions: Array<[IPortal, IPortal]>;

  constructor(
    boardSize: number,
    portalPairPositions: Array<[IPortal, IPortal]>
  ) {
    this.boardSize = boardSize;
    this.snack = { x: 0, y: 0, z: 0 };
    this.portalPairPositions = portalPairPositions;

    this.gg = new THREE.Group();
    this.clock = new THREE.Clock();
    this.snackGroup = new THREE.Group();
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

    this._initializeSnake();

    this._initializeSnack();
  }

  _randomizeSnackCoordinates() {
    let x =
      Math.floor(Math.random() * this.boardSize) -
      Math.floor(this.boardSize / 2);
    let y =
      Math.floor(Math.random() * this.boardSize) -
      Math.floor(this.boardSize / 2);
    let z = 0;
    return { x, y, z };
  }

  // iterate through all snake points and portal points
  // and add a snack where the snake does not exist
  _initializeSnack() {
    // min + max x,y,z coordinates
    let xyzPair = this._randomizeSnackCoordinates();

    let insideSnake = (xyzPair: IPosition) => {
      return this.bodyPositions.some((bodyPosition) => {
        return this._distance(bodyPosition, xyzPair) < 0.1;
      });
    };

    let insidePortal = (xyzPair: IPosition) => {
      let allPortals: Array<IPortal> = [];
      this.portalPairPositions.forEach((portalPair) => {
        allPortals.push(portalPair[0]);
        allPortals.push(portalPair[1]);
      });
      return allPortals.some((portalPosition) => {
        return this._distance(xyzPair, portalPosition) < 0.1;
      });
    };

    while (true) {
      if (insideSnake(xyzPair)) {
        xyzPair = this._randomizeSnackCoordinates();
      } else if (insidePortal(xyzPair)) {
        xyzPair = this._randomizeSnackCoordinates();
      } else {
        break;
      }
    }

    this.snack = xyzPair;
    this._renderSnack();
  }

  _renderSnack() {
    // render the snack mid-way after snake eats old one
    setTimeout(() => {
      this.snackGroup.children.forEach((child) => {
        this.snackGroup.remove(child);
      });
      const sphereGeometry = new THREE.SphereGeometry(0.5);
      const sphereMaterial = new THREE.MeshNormalMaterial();
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphereMesh.position.x = this.snack.x;
      sphereMesh.position.y = this.snack.y;
      sphereMesh.position.z = this.snack.z;
      this.snackGroup.add(sphereMesh);
    }, 100);
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
      boxMaterial = new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 0.5,
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
  _distance(bodyCoords: IPosition, portal: IPortal | IPosition) {
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

    if (this.clock.getElapsedTime() < this.elaplsedTime) {
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
          if (this._distance(newBodyCoords, portal1) < 0.1) {
            newBodyCoords.x = portal2.x + this.xSpeed;
            newBodyCoords.y = portal2.y + this.ySpeed;
          } else if (this._distance(newBodyCoords, portal2) < 0.1) {
            newBodyCoords.x = portal1.x + this.xSpeed;
            newBodyCoords.y = portal1.y + this.ySpeed;
          }
        }

        // check if head is intersecting with the snack
        if (this._distance(newBodyCoords, this.snack) < 0.1) {
          this._initializeSnack();
          // make snake bigger
          let lastChild = this.gg.children[this.gg.children.length - 1];

          let coords = {
            x: Math.round(lastChild.position.x),
            y: Math.round(lastChild.position.y),
            z: 0,
          };
          this.bodyPositions.push({
            x: Math.round(lastChild.position.x),
            y: Math.round(lastChild.position.y),
            z: 0,
          });
          this._createIndividualSnakePart(coords, false);
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
        .to(newBodyCoords, this.timeStep)
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
