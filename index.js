import Movements from './movement.js';
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xff0000)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//to make an object more appealing by change of lightning
//ambient lightning / directional lightning
const ambient_light = new THREE.AmbientLight(0x404040)

//gets added in the z direction where the viewer is viewing from
const directional_light = new THREE.DirectionalLight(0xff00ff,1)
ambient_light.add(directional_light);
scene.add(ambient_light)




//creating the area over which the objects will be getting placed
const geometry_area = new THREE.BoxGeometry(100,0,100)
const material_area = new THREE.MeshPhongMaterial({color: "white"})
const area = new THREE.Mesh(geometry_area, material_area);
scene.add(area);

//To create a cube, we need a BoxGeometry. This is an object that 
//contains all the points (vertices) and fill (faces) of the cube.
const geometry = new THREE.BoxGeometry( 10, 10, 10 ); //L,B,H

//MeshBasicMaterial to tap onto the properties of the object
const material = new THREE.MeshPhongMaterial( { color: 0xff00ff } );

//A mesh is an object that takes a geometry, and applies a 
//material to it, which we then can insert to our scene, and 
//move freely around.
const cube = new THREE.Mesh( geometry, material );

// By default, when we call scene.add(), the thing we add 
// will be added to the coordinates (0,0,0)
scene.add( cube );

const geometry_cyl = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material_cyl = new THREE.MeshPhongMaterial( {color: "yellow"} );
const cylinder = new THREE.Mesh( geometry_cyl, material_cyl );
scene.add( cylinder );

const geometry_cone = new THREE.ConeGeometry( 5, 20, 3 );
const material_cone = new THREE.MeshPhongMaterial( {color: "blue"} );
const cone = new THREE.Mesh( geometry_cone, material_cone );
scene.add( cone );

camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 50;



function animate() {

    //This will create a loop that causes the renderer to draw the scene 
    //every time the screen is refreshed (on a typical screen this 
    //means 60 times per second)

    //Why not to use setInterval instead?
    //most important thing : when the user navigates to another browser 
    //tab, hence not wasting their precious processing power and battery.
    requestAnimationFrame( animate ); //rerenders 60times in 1 sec

    cube.rotation.x += 0.03;
    cube.rotation.y += 0.03;
    cube.rotation.z += 0.03;

    cube.position.y = 7

    cylinder.position.x = -20
    cylinder.position.y = 10

    cylinder.rotation.y += 0.03
    cylinder.rotation.x += 0.03

    cone.position.x = 20
    cone.position.y = 10

    cone.rotation.y += 0.03
    cone.rotation.x += 0.03
    // cylinder.rotation.z += 0.03

    //to move the cube
    // camera.position.x +=0.01 // cube moves to left side
    // camera.position.x -= 0.01 //cube moves to right side
    // camera.position.y -= 0.01 //cube moves up
    // camera.position.y += 0.01 //cube moves dowm
    // camera.position.z -= 0.1  //cube comes forward towards camera

    //now, we will be seeing the if someone presses a certain key on the keyboard
    //then what to do in that case?--->arrow keys
    if(Movements.isPressed(37)){ //left key pressed
        camera.position.x -= 0.5;
    }
    if(Movements.isPressed(38)){ //top key pressed
        camera.position.y += 0.5;
        camera.position.x += 0.5
    }
    if(Movements.isPressed(39)){ //right key pressed
        camera.position.x += 0.5;
    }
    if(Movements.isPressed(40)){ //down key pressed
        camera.position.y -= 0.5;
        camera.position.x -= 0.5
    }

    camera.lookAt(area.position)
    renderer.render( scene, camera );
}

animate();