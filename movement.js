//keydown, i.e, till you have pressed the key
//keyup - will detect the key until the key is released after being pressed
//keypress - only for characters but not anything else


class KeyMovements { 
    constructor(){

        //this -> means the instance of the class KeyMovements
        this.movement = {}
        window.addEventListener("keydown", this.down.bind(this));
        window.addEventListener("keyup", this.up.bind(this));
    }

    //keyCode - the code for the specific key pressed
    //key - the specific key pressed
    isPressed(keyCode){
        return this.movement[keyCode] ? this.movement[keyCode] : false
    }
    down(e){
        if(this.movement[e.keyCode]) return;
        this.movement[e.keyCode] = true
        console.log("keydown: ", e.key, "keycode: ", e.keyCode);
    }
    up(e){
        // if(this.movement[e.keyCode]) return;
        this.movement[e.keyCode] = false
        console.log("keydown: ", e.key, "keycode: ", e.keyCode);
    }
}

const Movements = new KeyMovements()
export default Movements