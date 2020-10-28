// const canvasArea = document.querySelector("#canvasArea");
// const startBtn = document.querySelector("#startBtn");

//for scoring
var greenPoints = 0;
var bluePoints = 0;
const maxPoints = 3;

//getting and displaying on canvas
const canvas = document.querySelector("#mycanvas");
const ctx = canvas.getContext("2d"); 


ballRadius = 10;
//start the ball from the middle of the canvas x=width/2 y=height/2
x = canvas.width/2;
y = (canvas.height / (Math.floor(Math.random() * 5) + 1))-15;

//how the ball will move
//dx is when the ball moves 2px to the right
//dy minus (-) is when the ball moves up (+) is down axis of y
//this must be random numbers
var randomDirectionX = [-3, 3];
var randomDirextionY = [-2, 2];
var dx=randomDirectionX[Math.floor(Math.random() * randomDirectionX.length)];
var dy=randomDirextionY[Math.floor(Math.random() * randomDirextionY.length)];


// Ball Shape
const drawBall = () =>{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //x,y the center of the ball. beginning is x,y above but will be updated in every rep.
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


//defining the padde
paddleHeight = 85;
paddleWidth = 15;
leftPaddleY = canvas.height/2-paddleHeight/2;
rightPaddleY = canvas.height/2-paddleHeight/2;
leftPaddleBase = 15;
rightPaddleBase = canvas.width-30;

//Left paddle shape
const drawPaddleLeft = ()=>{
    ctx.beginPath();
    ctx.rect(leftPaddleBase, leftPaddleY,paddleWidth,paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

//Right paddle shape
const drawPaddleRight = ()=>{
    ctx.beginPath();
    ctx.rect(rightPaddleBase, rightPaddleY,paddleWidth,paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

//score counting
const drawScoreGreenLeft = ()=>{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Green Player: "+greenPoints, 8,20);
}

const drawScoreBlueRight = ()=>{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Blue Player: "+bluePoints, canvas.width-120,20);
}

//-----------DISPLAYING THE CANVAS-----------
//rendering the canvas
const renderCanvas = ()=> {
    ctx.clearRect(0,0, canvas.width, canvas.height); //clear the whole canvas in every repetition#

    //in every repetition of the frames the x is moves +dx and y moves +dy pixes to give the ball a movement.
    x+=dx;
    y+=dy;

    //draw ball on the canvas
    drawBall();

    //BOUNCING BALL
    //change ball direction
    if(x>canvas.width-ballRadius/2){
        //game over if ball gets out of side lines
        greenPoints+=1;
        alert("Point for Green Player");
        leftPaddleY = canvas.height/2-paddleHeight/2;
        rightPaddleY = canvas.height/2-paddleHeight/2;        
        x = canvas.width/2;
        y = (canvas.height / (Math.floor(Math.random() * 5) + 1))-15;
        
        if(greenPoints===maxPoints){
            alert("Green Player is the winner");
            document.location.reload();
            clearInterval(interval);
        };
        
    }else if (x<0+ballRadius/2){
        bluePoints+=1;
        alert("Point for Blue Player");
        leftPaddleY = canvas.height/2-paddleHeight/2;
        rightPaddleY = canvas.height/2-paddleHeight/2;
        x = canvas.width/2;
        y = (canvas.height / (Math.floor(Math.random() * 5) + 1))-15;
        
        if(bluePoints===maxPoints){
            alert("Blue Player is the winner");
            document.location.reload();
            clearInterval(interval);
        };
    } else 
    //if y of ball is in middle of paddle and x of ball is on left paddle
    if(x<leftPaddleBase+ballRadius*2 && y>leftPaddleY && y<leftPaddleY+paddleHeight){
        dx=-dx;
    } else if(x>rightPaddleBase-ballRadius && y>rightPaddleY && y<rightPaddleY+paddleHeight){
        dx=-dx;
    };


    if(y<0+ballRadius/2 || y>canvas.height-ballRadius/2){
        dy = -dy;
    };

    //-------------------------------
    //display the left paddle
    drawPaddleLeft();

    //moving the paddle if wPressed or sPressed are true (from the below event listeners)
    if(wPressed) {
        leftPaddleY -= 7;
        if (leftPaddleY < 0){
        leftPaddleY = 0;
        };
    }
    else if(sPressed) {
        leftPaddleY += 7;
        if (leftPaddleY + paddleHeight > canvas.height){
        leftPaddleY = canvas.height-paddleHeight;
        };
    }


    //-------------------------------
    //display the right paddle
    drawPaddleRight();

    //moving the paddle if upPressed or downPressed are true (from the below event listeners)
    if(upPressed) {
        rightPaddleY -= 7;
        if (rightPaddleY < 0){
        rightPaddleY = 0;
        };
    }
    else if(downPressed) {
        rightPaddleY += 7;
        if (rightPaddleY + paddleHeight > canvas.height){
        rightPaddleY = canvas.height-paddleHeight;
        };
    }
    drawScoreGreenLeft();
    drawScoreBlueRight();
}
    //-------------------------------
    //-------------------------------   
    //-------------------------------

//-----------------------------------------------------------------------------------------------------
//paddle movement functions
// in every keydown and keyup of the keyboard we run LEFTkeyDownHandler and LEFTkeyUpHandler

//variables to move the paddles
//for left paddle
var wPressed = false;
var sPressed = false;
//for right paddle
var upPressed = false;
var downPressed = false;

//Event Listener for Left Player
document.addEventListener("keyup", LEFTkeyUpHandler, false);
document.addEventListener("keydown", LEFTkeyDownHandler, false); 

//Event Listener for Right Player
document.addEventListener("keyup", RIGHTkeyUpHandler, false);
document.addEventListener("keydown", RIGHTkeyDownHandler, false); 

//-----------LEFT PLAYER-----------------------------------------------------------
// if w or s is pressed (above event listener) then wPressed or sPressed become true
function LEFTkeyDownHandler(e) {
    if(e.key == "W" || e.key == "w") {
        wPressed = true;
    }
    else if(e.key == "S" || e.key == "s") {
        sPressed = true;
    }
}

// when we release the w or s buttons then the wPressed or sPressed become again false
function LEFTkeyUpHandler(e) {
    if(e.key == "W" || e.key == "w") {
        wPressed = false;
    }
    else if(e.key == "S" || e.key == "s") {
        sPressed = false;
    }
}

//-----------RIGHT PLAYER-----------------------------------------------------------
// if up arrow or down arrow is pressed (above event listener) then upPressed or downPressed become true
function RIGHTkeyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

// when we release the up arrow or down arrow then the upPressed or downPressed become again false
function RIGHTkeyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

//basically this renders the canvas
setInterval(renderCanvas, 15); //repeat the draw of canvas every 10miliseconds

