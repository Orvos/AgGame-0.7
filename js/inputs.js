let controllerIndex = null;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let bluePressed = false;
let redPressed = false;
let yellowPressed = false;
let greenPressed = false;
let whitePressed = false;
let white2Pressed = false;

window.addEventListener("gamepadconnected", (event)=>{
    controllerIndex = event.gamepad.index;
    console.log("Controller connected");
})

window.addEventListener("gamepaddisconnected", (event)=>{
    controllerIndex = null;
    console.log("Controller disconnected");
})

function controllerInput(){
    if(controllerIndex !== null){
        const gamepad = navigator.getGamepads()[controllerIndex];
        const buttons = gamepad.buttons;
        
        if(gamepad.axes[0] == -1){
            if(leftPressed == false){
                keyLeft();
            }
            leftPressed = true;
        }else{
            leftPressed = false;
        }

        if(gamepad.axes[0] == 1){
            if(rightPressed == false){
                keyRight();
            }
            rightPressed = true;
        }else{
            rightPressed = false;
        }


        if(gamepad.axes[1] == -1 ){
            if(upPressed == false){
                keyUp();
            }
            upPressed = true;
        }else{
            upPressed = false;
        }

        if(gamepad.axes[1] == 1){
            if(downPressed == false){
                keyDown();
            }
            downPressed = true;
        }else{
            downPressed = false;
        }


        if(buttons[0].value == 1){
            if(bluePressed == false){
                keyBlue();
            }
            bluePressed = true;
        }else{
            bluePressed = false;
        }

        if(buttons[1].value == 1){
            if(greenPressed == false){
                keyGreen();
            }
            greenPressed = true;
        }else{
            greenPressed = false;
        }


        if(buttons[2].value == 1){
            if(redPressed == false){
                keyRed();
            }
            redPressed = true;
        }else{
            redPressed = false;
        }


        if(buttons[3].value == 1){
            if(yellowPressed == false){
                keyYellow();
            }
            yellowPressed = true;
        }else{
            yellowPressed = false;
        }

        if(buttons[4].value == 1){
            if(whitePressed == false){
                keyWhite();
            }
            whitePressed = true;
        }else{
            whitePressed = false;
        }

        if(buttons[5].value == 1){
            if(white2Pressed == false){
                keyWhite2();
            }
            white2Pressed = true;
        }else{
            white2Pressed = false;
        }
    }
}

// Add event listener for keydown events
document.addEventListener("keydown", function(event) {
    const key = event.key;
    switch (key) {
        case "ArrowLeft":
        case "a":
            keyLeft();
            break;

        case "ArrowUp":
        case "w":
            keyUp();
            break;

        case "ArrowRight":
        case "d":
            keyRight();
            break;

        case "ArrowDown":
        case "s":
            keyDown();
            break;

        case "1":
            keyRed();

        case "2":
            keyBlue();

        case "3":
            keyGreen();

        case "4":
            keyYellow();

        case "Escape":
            keyWhite();
        
        default:
            break;
    }
});




function keyUp(){
    focusPrevious();
}

function keyDown(){
    focusNext();
}

function keyLeft(){

}

function keyRight(){
    document.activeElement.click();
}

function keyRed(){
    if(document.getElementById("currentAnswer1")!=null){
        document.getElementById("currentAnswer1").click();
    }else if(document.getElementById("currentTFAnswer1")!=null){
        document.getElementById("currentTFAnswer1").click();
    }
}

function keyBlue(){
    if(document.getElementById("currentAnswer2")!=null){
        document.getElementById("currentAnswer2").click();
    }else if(document.getElementById("currentTFAnswer2")!=null){
        document.getElementById("currentTFAnswer2").click();
    }
}

function keyGreen(){
    if(document.getElementById("currentAnswer3")!=null){
        document.getElementById("currentAnswer3").click();
    }else if(document.getElementById("currentTFAnswer1")!=null){
        document.getElementById("currentTFAnswer1").click();
    }
}

function keyYellow(){
    if(document.getElementById("currentAnswer4")!=null){
        document.getElementById("currentAnswer4").click();
    }else if(document.getElementById("currentTFAnswer2")!=null){
        document.getElementById("currentTFAnswer2").click();
    }
    
}

function keyWhite(){
    quiz = document.getElementById("quiz");
    if(quiz){
        home();
    }
}

function keyWhite2(){

}




function gameLoop(){
    controllerInput();
    requestAnimationFrame(gameLoop);
}
gameLoop();