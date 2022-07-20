import * as THREE from 'three';

interface IPosition {
  x: number;
  y: number;
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

class Snake {
  group: THREE.Group;
  boxMesh: THREE.Mesh;

  head: IPosition;
  body: Array<IPosition>;

  // default initalization
  speed: number = 0.05;
  xSpeed: number = 0;
  ySpeed: number = 0;
  direction: Direction = Direction.Up;

  constructor() {
    this.group = new THREE.Group();

    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const boxMaterial = new THREE.MeshNormalMaterial();
    this.boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    this.head = { x: 1, y: 2 };
    this.body = [
      { x: 1, y: 1 },
      { x: 0, y: 0 },
    ];

    this.group.add(this.boxMesh);
  }

  handleMovement(event: KeyboardEvent) {
    if (event.key === 'w') {
      this.direction = Direction.Up;
      this.xSpeed = 0;
      this.ySpeed = this.speed;
    } else if (event.key === 'a') {
      this.direction = Direction.Left;
      this.xSpeed = -this.speed;
      this.ySpeed = 0;
    } else if (event.key === 's') {
      this.direction = Direction.Down;
      this.xSpeed = 0;
      this.ySpeed = -this.speed;
    } else if (event.key === 'd') {
      this.direction = Direction.Right;
      this.xSpeed = this.speed;
      this.ySpeed = 0;
    }
  }

  update() {
    this._updatePosition();
  }

  _updatePosition() {
    this.boxMesh.position.x += this.xSpeed;
    this.boxMesh.position.y += this.ySpeed;
  }
}

export { Snake };
