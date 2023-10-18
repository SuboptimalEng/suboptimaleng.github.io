uniform float u_time;

varying vec2 vUv;
varying vec3 pos;

float circle(float radius, vec2 uv) {
    float value = distance(vec2(uv.x,
            // uv.x + 0.025*cos((10.*uv.y + u_time)*4.),
    uv.y + 0.025 * sin((10. * uv.x + u_time) * 4.)), vec2(0.5));
    return 1. - step(radius, value);
}

float circle2(float radius, vec2 uv) {
    float value = distance(vec2(
            // uv.x,
    uv.x + 0.025 * cos((5. * uv.y + u_time) * 4.), uv.y + 0.025 * sin((5. * uv.x + u_time) * 2.)), vec2(0.5));
    return step(radius, value);
}

void main() {
    // vec2 uv = gl_FragCoord.xy/u_resolution;
    float alpha = 0.9;
    vec3 white = vec3(1.0);
    vec3 black = vec3(0.0);
    vec3 red = vec3(1.0, 0.0, 0.0);
    vec3 color = white;
    float radius = 0.45;
    color = mix(color, red, 1. - circle(radius, vUv));
    color = mix(color, black, 1. - circle2(radius - 0.05, vUv));
    if (pos.z > .49 || pos.z < -0.49) {
        gl_FragColor = vec4(red, alpha);
    } else {
        gl_FragColor = vec4(color, alpha);
    }
}
