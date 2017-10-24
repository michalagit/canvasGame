let canvas = document.getElementById('game');
let width = canvas.width;
let height = canvas.height;
let canvasContext = canvas.getContext('2d');
let ballX = width/2;
let ballSpeedX= 2;
let ballY = height/2;
let ballSpeedY = 2;
const paddleHeight = 100;
const paddleWidth = 10;
let paddle1Y = 250;
let paddle2Y = 250;
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
    //Draw right player 
    colorRect(width-paddleWidth,paddle2Y, paddleWidth, paddleHeight, 'white');
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
function ballReset(){
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}
function moveEverything(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX > width){
        if ( ballY > paddle2Y && ballY < paddle2Y + paddleHeight){
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    } else if (ballX < 0){
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight){
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
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
            paddle1Y = height - paddleHeight;
        } else {
            paddle1Y = mousePos.y - (paddleHeight/2);
        }
       
    })

};
