function Cube( gl ) {

    // Initialize the shader pipeline for this object using either shader ids
    // declared in the application's HTML header, or use the default names.
    var program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");

    if ( program < 0 ) {
        alert( "Error: cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }
    
    // Initialize arrays for the Cube's indices and vertex positions
 
    // var positions = [1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1 ]
    var positions = [0, 0, 0,
                     1, 0, 0,
                     1, 1, 0,
                     0, 1, 0,
                     0, 0, 1,
                     1, 0, 1,
                     1, 1, 1,
                     0, 1, 1];

    var indices = [0, 1, 2, 0, 2, 3, // front
        3, 0, 4, 3, 4, 7, // left
            7, 3, 2, 7, 2, 6, //top
        7, 6, 5, 5, 7, 4, // back
        5, 4, 0, 5, 0, 1,
        5, 1, 2, 2, 5, 6];
    
    //  var edges = [
    //     0, 1,  // "Front" face edges
    //     1, 2,
    //     2, 3,
    //     3, 0,
    //     4, 5,  // "Back" face edges
    //     5, 6,
    //     6, 7,
    //     7, 4,
    //     0, 4,  // "Side" edges
    //     1, 5,
    //     2, 6,
    //     3, 7
    // ];
    
    positions.numComponents = 3;
   
    
    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    // edges.buffer = gl.createBuffer();
    // gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
    // gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW );

    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );

    MV = gl.getUniformLocation(program, "MV");
    P = gl.getUniformLocation(program, "P");
    T = gl.getUniformLocation(program, "T");

    this.MV = mat4();
    this.P = mat4();
    this.T = vec4();

    this.render = function () {
        gl.useProgram( program );

        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer(positions.aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0 );
        gl.uniformMatrix4fv(MV, false, flatten(this.MV));
        gl.uniformMatrix4fv(P, false, flatten(this.P));
        gl.uniform4fv(T, this.T);
       
         // Render the wireframe version of the cube
        // gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
        // gl.drawElements( gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0 );

        // Render the solid version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }
};
