import * as THREE from 'three';
import * as CANNON from 'cannon-es';

class FranticArchitect {
  x: number;
  y: number;
  z: number;
  phantomX: number;
  phantomY: number;
  phantomZ: number;
  groundX: number;
  groundY: number;
  groundZ: number;

  size: number;
  mass: number;

  existingBlocks: Array<{
    x: number;
    y: number;
    z: number;
  }>;
  phantomBlockAccepted: boolean;

  gameLoopLength: number;
  currentLoopLength: number;

  // TODO: Remove this carefully
  phantomShape: CANNON.Box | undefined;
  phantomMesh: THREE.Mesh | undefined;
  phantomGroup: THREE.Group;
  world: CANNON.World;

  gg: THREE.Group;
  compoundBody: CANNON.Body | undefined;
  compoundShapeGroup: THREE.Group;

  constructor() {
    // cube coordinates
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.phantomX = 0;
    this.phantomY = 0;
    this.phantomZ = 0;

    // ground coordinates
    this.groundX = 0;
    this.groundY = -1;
    this.groundZ = 0;

    // compound body settings
    this.size = 1;
    this.mass = 10;
    this.existingBlocks = [];
    this.phantomBlockAccepted = false;

    // game loop settings
    this.gameLoopLength = 0.5;
    this.currentLoopLength = 0;

    this.phantomShape = undefined;
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -10, 0),
    });
    this._addGround();
    this._addCompoundBody();

    this.gg = new THREE.Group();

    this._initGame();

    // set up compound shape group
    this.compoundShapeGroup = new THREE.Group();
    const initialBlockGeometry = new THREE.BoxGeometry(1, 1, 1);
    const initialBlockMaterial = new THREE.MeshPhongMaterial({
      color: 0xfafafa,
    });
    const initialBlockMesh = new THREE.Mesh(
      initialBlockGeometry,
      initialBlockMaterial
    );
    this.compoundShapeGroup.add(initialBlockMesh);
    this.gg.add(this.compoundShapeGroup);

    // set up phantom block
    this.phantomGroup = new THREE.Group();
    this.gg.add(this.phantomGroup);
  }

  update(dt: number) {
    this.world.fixedStep();
    this.currentLoopLength += dt;
    if (this.currentLoopLength > this.gameLoopLength) {
      this.currentLoopLength = 0;
      this._displayPhantomBlock();
    }
    this._animatePhantomGroup();
    this._animateCompoundShapeGroup();
  }

  _updateCenterOfMass() {
    // first calculate the center of mass
    const com = new CANNON.Vec3();
    // console.log(com);
    // debugger;

    // TODO: REMOVE THIS.
    if (this.compoundBody === undefined) {
      return;
    }

    this.compoundBody.shapeOffsets.forEach(function (offset) {
      com.vadd(offset, com);
    });
    // console.log(com);
    com.scale(1 / this.compoundBody.shapes.length, com);
    // console.log(com);
    // move the shapes so the body origin is at the COM
    this.compoundBody.shapeOffsets.forEach(function (offset) {
      // console.log(offset);
      offset.vsub(com, offset);
    });
    // now move the body so the shapes' net displacement is 0
    const worldCOM = new CANNON.Vec3();
    this.compoundBody.vectorToWorldFrame(com, worldCOM);
    this.compoundBody.position.vadd(worldCOM, this.compoundBody.position);
  }

  _randomizePhantomXYZ() {
    this._updatePhantomXYZ();
    const r = () => {
      const axis = Math.floor(Math.random() * 3);
      const direction = Math.floor(Math.random() * 2);
      const delta = direction === 0 ? 1 : -1;
      if (axis === 0) {
        this.phantomX += delta;
      } else if (axis === 1) {
        if (this.y <= 0.1) {
          this.phantomY = 1;
        } else {
          this.phantomY += delta;
        }
      } else {
        this.phantomZ += delta;
      }
    };
    r();
    const blockAlreadyExists = () => {
      return this.existingBlocks.some((block) => {
        return (
          block.x === this.phantomX &&
          block.y === this.phantomY &&
          block.z === this.phantomZ
        );
      });
    };
    while (blockAlreadyExists()) {
      this._updatePhantomXYZ();
      r();
    }
  }

  addBlockToScene(x: number, y: number, z: number) {
    const geometery = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometery, material);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    this.compoundShapeGroup.add(mesh);
  }

  _addPhantomBlock(x: number, y: number, z: number) {
    const geometery = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x61dbfb,
      transparent: true,
      opacity: 0.5,
    });
    this.phantomMesh = new THREE.Mesh(geometery, material);

    // TODO: REMOVE THIS.
    if (this.compoundBody === undefined) {
      return;
    }

    const xOffset = this.compoundBody.shapeOffsets[0].x;
    const yOffset = this.compoundBody.shapeOffsets[0].y;
    const zOffset = this.compoundBody.shapeOffsets[0].z;
    this.phantomMesh.position.x = x + xOffset;
    this.phantomMesh.position.y = y + yOffset;
    this.phantomMesh.position.z = z + zOffset;
    this.phantomGroup.add(this.phantomMesh);
  }

  _displayPhantomBlock() {
    this._randomizePhantomXYZ();

    if (this.phantomBlockAccepted) {
      this.phantomBlockAccepted = false;
      this.addBlockToScene(this.x, this.y, this.z);
      console.log(this.compoundBody?.shapeOffsets);
    } else {
      // NOTE: This fails with a warning on the first run.
      if (this.compoundBody !== undefined && this.phantomShape !== undefined) {
        this.compoundBody.removeShape(this.phantomShape);
      }
    }

    this.phantomShape = new CANNON.Box(
      new CANNON.Vec3(this.size * 0.5, this.size * 0.5, this.size * 0.5)
    );

    // TODO: REMOVE THIS.
    if (this.compoundBody === undefined) {
      return;
    }

    // NOTE: When we update the center of mass of the compound body,
    // the shape offset of each child object changes. All of them have the
    // same offset, so when we create the phantom block, we add this offset
    // to the block as well.
    const xOffset = this.compoundBody.shapeOffsets[0].x;
    const yOffset = this.compoundBody.shapeOffsets[0].y;
    const zOffset = this.compoundBody.shapeOffsets[0].z;

    this.compoundBody.addShape(
      this.phantomShape,
      new CANNON.Vec3(
        this.phantomX * this.size + xOffset,
        this.phantomY * this.size + yOffset,
        this.phantomZ * this.size + zOffset
      )
    );

    if (this.phantomMesh !== undefined) {
      this.phantomGroup.remove(this.phantomMesh);
    }
    this._addPhantomBlock(this.phantomX, this.phantomY, this.phantomZ);
  }

  _updatePhantomXYZ() {
    this.phantomX = this.x;
    this.phantomY = this.y;
    this.phantomZ = this.z;
  }

  _updateXYZ() {
    this.x = this.phantomX;
    this.y = this.phantomY;
    this.z = this.phantomZ;
  }

  acceptPhantomBlock() {
    this._updateXYZ();
    this._addExistingBlock();
    this._updateCenterOfMass();
    this.phantomBlockAccepted = true;
    this.currentLoopLength = this.gameLoopLength + 1;
  }

  _addExistingBlock() {
    this.existingBlocks.push({ x: this.x, y: this.y, z: this.z });
  }

  _animatePhantomGroup() {
    // TODO: REMOVE THIS.
    if (this.compoundBody === undefined) {
      return;
    }

    // TODO: REMOVE THIS.
    this.phantomGroup.position.copy(this.compoundBody.position as any);
    this.phantomGroup.quaternion.copy(this.compoundBody.quaternion as any);

    // this.phantomGroup.children.forEach((mesh, i) => {
    //   const offset = this.compoundBody.shapeOffsets[i];
    //   const orientation = this.compoundBody.shapeOrientations[i];
    //   console.log(offset, orientation);
    //   mesh.position.copy(offset);
    //   mesh.quaternion.copy(orientation);
    // });
  }

  _animateCompoundShapeGroup() {
    // TODO: REMOVE THIS CHECK
    if (this.compoundBody === undefined) {
      return;
    }

    // TODO: REMOVE THIS.
    this.compoundShapeGroup.position.copy(this.compoundBody.position as any);
    this.compoundShapeGroup.quaternion.copy(
      this.compoundBody.quaternion as any
    );

    // NOTE: https://github.dev/pmndrs/cannon-es/blob/master/examples/compound.html
    this.compoundShapeGroup.children.forEach((mesh, i) => {
      // TODO: Remove this.
      if (this.compoundBody !== undefined) {
        const offset = this.compoundBody.shapeOffsets[i];
        const orientation = this.compoundBody.shapeOrientations[i];
        mesh.position.copy(offset as any);
        mesh.quaternion.copy(orientation as any);
      }
    });
  }

  _addCompoundBody() {
    const shape = new CANNON.Box(
      new CANNON.Vec3(this.size * 0.5, this.size * 0.5, this.size * 0.5)
    );
    const slipperyMaterial = new CANNON.Material('slippery');
    slipperyMaterial.friction = 0.01;

    this.compoundBody = new CANNON.Body({
      mass: this.mass,
      material: slipperyMaterial,
    });
    this.compoundBody.position.set(0, 0, 0);
    this.compoundBody.quaternion.setFromEuler(0, 0, 0);

    this.compoundBody.addShape(shape, new CANNON.Vec3(this.x, this.y, this.z));
    this._addExistingBlock();
    // this.compoundBody.addShape(shape, new CANNON.Vec3(-size, 0, 0));
    // this.compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -size));
    // this.compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -2 * size));
    // this.compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -3 * size));
    // this.compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -4 * size));

    this.world.addBody(this.compoundBody);
  }

  _addGround() {
    const groundMaterial = new CANNON.Material('ground');
    groundMaterial.friction = 0.5;
    const groundShape = new CANNON.Box(new CANNON.Vec3(1.5, 0.5, 1.5));
    const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromEuler(0, 0, 0);
    groundBody.position.set(this.groundX, this.groundY, this.groundZ);
    this.world.addBody(groundBody);
  }

  _initGame() {
    const boxGeometry = new THREE.BoxGeometry(3, 1, 3);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x218200 });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.y = -1;
    this.gg.add(boxMesh);
  }
}

export { FranticArchitect };
