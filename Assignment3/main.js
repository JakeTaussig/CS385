angle = 0;
function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(0, 0, 0, 0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    cube = new Cube(gl);
    render(cube);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    angle += 1;
    cube.MV = rotate(angle, [1, 1, 1]);
    // wasn't sure how to determine these vec4 values. 
    fovy = vec4(0.62, 0, 0, 0);
    aspect = vec4(0, 0.62, 0, 0);
    n = vec4(0, 0, -9, -8);
    f = vec4(0, 0, -1, 0);
    ps = perspective(fovy, aspect, n, f);
    // cube.P = ps; Perspective transformation is working, just makes cube not visible, I tried calculating but not sure what fov/near/far should be.
    cube.T = vec4(- 0.5, -0.5, -0.5, 0); // this view transform moves the cube's center to the origin. 

    cube.render();

    requestAnimationFrame(render);
}
window.onload = init;W