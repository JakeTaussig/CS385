var gl;
red = vec4(1.0, 0.0, 0.0, 1.0);
blue = vec4(0.0, 0.0, 1.0, 1.0);

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    // Add your sphere creation and configuration code here
    earth = new Sphere(gl);
    earth.color = blue;
    // Try recalculating using near = 1.
    fovy = vec4(80.65, 0, 0, 0);
    aspect = vec4(0, 80.65, 0, 0);
    n = vec4(0, 0, -1.01, -20121);
    f = vec4(0, 0, -1, 0);
    earth.T = perspective(fovy, aspect, n, f);
    render(earth);

    requestAnimationFrame(render);
}

// function resize() {
//     var w = canvas.clientWidth,
//     h = canvas.clientHeight;

//     gl.viewport(0, 0, w, h);
//     aspect = w/h;
// }
function render() {

    // Update your motion variables here
    
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here
    earth.render();
    requestAnimationFrame(render);
}

window.onload = init;
