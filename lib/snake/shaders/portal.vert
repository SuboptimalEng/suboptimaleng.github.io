varying vec2 vUv;
varying vec3 pos;

void main() {
    vUv = uv;
    pos = position;
    gl_Position = projectionMatrix
      * modelViewMatrix
      * vec4(position.x, position.y, position.z, 1.0);
}