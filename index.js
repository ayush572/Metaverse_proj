import Movements from './movement.js';
import polygon from './src/abi/web3.js';
import abi from './src/abi/abi.json' assert {type: "json"}
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
// const geometry = new THREE.BoxGeometry( 10, 10, 10 ); //L,B,H

// //MeshBasicMaterial to tap onto the properties of the object
// const material = new THREE.MeshPhongMaterial( { color: 0xff00ff } );

// //A mesh is an object that takes a geometry, and applies a 
// //material to it, which we then can insert to our scene, and 
// //move freely around.
// const cube = new THREE.Mesh( geometry, material );

// // By default, when we call scene.add(), the thing we add 
// // will be added to the coordinates (0,0,0)
// scene.add( cube );

// const geometry_cyl = new THREE.CylinderGeometry( 5, 5, 20, 32 );
// const material_cyl = new THREE.MeshPhongMaterial( {color: "yellow"} );
// const cylinder = new THREE.Mesh( geometry_cyl, material_cyl );
// scene.add( cylinder );

// const geometry_cone = new THREE.ConeGeometry( 5, 20, 3 );
// const material_cone = new THREE.MeshPhongMaterial( {color: "blue"} );
// const cone = new THREE.Mesh( geometry_cone, material_cone );
// scene.add( cone );

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

    // cube.rotation.x += 0.03;
    // cube.rotation.y += 0.03;
    // cube.rotation.z += 0.03;

    // cube.position.y = 7

    // cylinder.position.x = -20
    // cylinder.position.y = 10

    // cylinder.rotation.y += 0.03
    // cylinder.rotation.x += 0.03

    // cone.position.x = 20
    // cone.position.y = 10

    // cone.rotation.y += 0.03
    // cone.rotation.x += 0.03
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

const btn = document.querySelector('#mint');
btn.addEventListener('click', mint);
async function mint(){
    //here tapping into the values of the nft's 
    let nft_nm = document.querySelector("#nft_name").value;
    let nft_w = document.querySelector("#nft_width").value;
    let nft_h = document.querySelector("#nft_height").value;
    let nft_d = document.querySelector("#nft_depth").value;
    let nft_x = document.querySelector("#nft_x").value;
    let nft_y = document.querySelector("#nft_y").value;
    let nft_z = document.querySelector("#nft_z").value;


    if(typeof(window.ethereum) == "undefined"){
        rej("You should install metamask");
    }

    // create a new web3 instance using the injected ethereum provider
    // here the injected web3 provider is Metamask
    // you are telling the constructor to use the injected Web3 provider 
    // to interact with the Ethereum blockchain.
    let web3 = new Web3(window.ethereum);
    // create a contract instance
    let contract = new web3.eth.Contract(abi, "0x1Eaa826Eb33A48c8f6e8b5bE2A57d6EE4ff96b66");

    // const etherValue = '0.0000000000000001';
    // const weiValue = web3.utils.toWei(etherValue, 'ether');
    
    //to see to which acc the metamask is connected to
    let accs = await web3.eth.requestAccounts()
    console.log(accs[0]); //gives array of acc
    contract.methods.mintNFT(nft_nm, nft_w, nft_h, nft_d, nft_x, nft_y, nft_z)
    //using the send method because now we are sending the data to the
    //smart contract rather than taking the data from it. So, send()
    //method will send the value from frontend to the smart contract
    .send({
        from : accs[0],
        value: "10"
    }).then((data)=>{
        console.log("NFT Minted")
    })
    ; //gives array of acc
    

}

polygon.then((result)=>{

    //looping through the array and printing everying in the array
    result.nft.forEach((obj,i)=>{
        //all the nft's in the array will be displayed on the screen
        const geometry = new THREE.ConeGeometry( obj.w, obj.h, obj.d );
        const material = new THREE.MeshPhongMaterial( {color: "blue"} );
        const nft = new THREE.Mesh( geometry, material );
        scene.add( nft );
        nft.position.set(obj.x, obj.y, obj.z)
    })
})