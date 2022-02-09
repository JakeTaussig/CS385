function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(0.35, 0.73, 0.19, 1.0);
    cone = new Cone(gl, 20);
    render(cone);
}

function render(cone) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    cone.render();
}
window.onload = init;