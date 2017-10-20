let canvas = document.getElementById('game');
let width = canvas.width;
let height = canvas.height;
let canvasContext = canvas.getContext('2d');
let ballX = width/2;
let ballSpeedX= 5;
let ballY = height/2;
let ballSpeedY = 5;
const paddleHeight = 100;
const paddleWidth = 10;
let paddle1Y = 250;
function getMousePos(canvas, evt){
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    return {
        x: evt.clientX - rect.left - root.scrollLeft,
        y: evt.clientY - rect.top - root.scrollTop
    };
}
function drawEverything(){
    //Draw canvas
    colorRect(0,0, width, height, 'black');
    //Draw left player
    colorRect(0,paddle1Y, paddleWidth, paddleHeight, 'white');
    //Draw ball
    drawBall(ballX, ballY, 10, 'white');
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width, height);
}
function drawBall(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}
function moveEverything(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX > width){
        ballSpeedX = -ballSpeedX;
    } else if (ballX < 0){
        ballSpeedX = -ballSpeedX;
    }

    if (ballY > height){
        ballSpeedY = -ballSpeedY;
    } else if ( ballY < 0){
        ballSpeedY = -ballSpeedY;
    }

}

function callBoth(){
    moveEverything();
    drawEverything();
   
}
window.onload = function(){
    let framesPerSecond = 30;
    setInterval(callBoth, 1000/frameElement);
    canvas.addEventListener('mousemove', function(e){
        let mousePos = getMousePos(canvas, e);
        if(mousePos.y > (height - paddleHeight/2)){
            mousePos.y = height - paddleHeight/2;
        } else {
            paddle1Y = mousePos.y - (paddleHeight/2);
        }
       
    })

};
