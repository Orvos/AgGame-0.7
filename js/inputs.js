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
                console.log("left");
            }
            leftPressed = true;
        }else{
            leftPressed = false;
        }

        if(gamepad.axes[0] == 1){
            if(rightPressed == false){
                console.log("right");
                document.activeElement.click();
            }
            rightPressed = true;
        }else{
            rightPressed = false;
        }


        if(gamepad.axes[1] == -1 ){
            if(upPressed == false){
                console.log("up");
                focusPrevious();
            }
            upPressed = true;
        }else{
            upPressed = false;
        }

        if(gamepad.axes[1] == 1){
            if(downPressed == false){
                console.log("down");
                focusNext();
            }
            downPressed = true;
        }else{
            downPressed = false;
        }


        if(buttons[0].value == 1){
            if(bluePressed == false){
                console.log("blue");
                document.activeElement.click();
            }
            bluePressed = true;
        }else{
            bluePressed = false;
        }

        if(buttons[1].value == 1){
            if(greenPressed == false){
                console.log("green");
                document.activeElement.click();
            }
            greenPressed = true;
        }else{
            greenPressed = false;
        }


        if(buttons[2].value == 1){
            if(redPressed == false){
                console.log("red");
                document.activeElement.click();
            }
            redPressed = true;
        }else{
            redPressed = false;
        }


        if(buttons[3].value == 1){
            if(yellowPressed == false){
                console.log("yellow");
                document.activeElement.click();
            }
            yellowPressed = true;
        }else{
            yellowPressed = false;
        }

        if(buttons[4].value == 1){
            if(whitePressed == false){
                console.log("white");
            }
            whitePressed = true;
        }else{
            whitePressed = false;
        }

        if(buttons[5].value == 1){
            if(white2Pressed == false){
                console.log("white 2");
            }
            white2Pressed = true;
        }else{
            white2Pressed = false;
        }
    }
}



function gameLoop(){
    controllerInput();
    requestAnimationFrame(gameLoop);
}
gameLoop();