var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;

const rocket = {
    x: 150,           // 150, 225 = defualt position
    y: 225,
    width: 121,
    height: 208,
    moving: false,
}

const rocketFire = {
    x: 175,           // 175, 290 = defualt position
    y: 290,
    width: 70,
    height: 124,
}
const rocketClouds = {
    x: 39,           // 175, 290 = defualt position
    y: 395,
    width: 350,
    height: 151,
    moving: false,
}

const rocketImg = new Image();
rocketImg.src = "/assets/img/spaceship.png"
const background = new Image();
background.src = "/assets/img/Rocket\ Launchpad.jpg";
const rocketSmoke = new Image();
rocketSmoke.src = "/assets/img/rocket-fire-blast.png"
const rocketFlames = new Image();
rocketFlames.src = "/assets/img/rocket-fire.png"
function drawRocket(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function drawFlames(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function drawSmoke(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    drawRocket(rocketImg, 0,0, rocket.width, rocket.height, rocket.x , rocket.y, rocket.width, rocket.height);
    if (rocket.moving == true){
        if (rocket.y >= 160){
            drawSmoke(rocketSmoke, 0,0, rocketClouds.width, rocketClouds.height, rocketClouds.x , rocketClouds.y, rocketClouds.width, rocketClouds.height);
            rocketClouds.y = rocketClouds.y - 0.2;
        }
        if (rocket.y <= 120){
            drawFlames(rocketFlames, 0,0, rocketFire.width, rocketFire.height, rocketFire.x , rocketFire.y, rocketFire.width, rocketFire.height);
            rocketFire.y = rocketFire.y - 0.2;
        }
    rocket.y = rocket.y - 0.2; //slow rise
    }
}
animate();

function startAnimation(){
    rocket.moving = true;

}

function resetAnimation(){
  
    rocket.y = 225;
    rocketFire.y = 290;
    rocketClouds.y = 400;
    rocket.moving = false;
}



document.getElementById("playButton").addEventListener("click", startAnimation);
document.getElementById("resetButton").addEventListener("click", resetAnimation);