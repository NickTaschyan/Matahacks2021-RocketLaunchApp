var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;
var currentMass = 1200, currentThrust = 25000, currentThrustTime = 20;
var acceleration, maxTime, currentSpeed = 0, currentDistance = 0;
var currentTime = 0;
let gravity = 9.81;
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
            rocketClouds.y = rocketClouds.y - 0.4;
        }
        if (rocket.y <= 120){
            drawFlames(rocketFlames, 0,0, rocketFire.width, rocketFire.height, rocketFire.x , rocketFire.y, rocketFire.width, rocketFire.height);
            rocketFire.y = rocketFire.y - 0.4;
        }
    rocket.y = rocket.y - 0.4; //slow rise
    }
}
animate();

function startAnimation(){
    startMath();
    rocket.moving = true;

}

function resetAnimation(){
    currentDistance = 0;
    currentSpeed = 0;
    acceleration = 0;
    maxSpeed = 0;   
    maxTime = 0;
    currentTime = 0;
    rocket.y = 225;
    rocketFire.y = 290;
    rocketClouds.y = 400;
    rocket.moving = false;
}

function startMath(){
    acceleration = (currentThrust - (currentMass * gravity)) / currentMass;
    console.log("Acceleration = ", acceleration);
    maxSpeed = acceleration * currentThrustTime;
    console.log("Max Speed = ", maxSpeed);

    maxTime = currentThrustTime + (maxSpeed / gravity);
    console.log("Max Time = ", maxTime);
    if (acceleration < 0 || acceleration > 100){
        results();
    }
    myVar = setInterval(distanceCalc, 1);

}

function distanceCalc(){
    currentTime++;
    if (currentTime <= currentThrustTime){
        currentSpeed = acceleration + currentSpeed;
    }
    if (currentTime >= currentThrustTime && currentSpeed >= 0){
        currentSpeed = currentSpeed - gravity;
    }
    if (currentSpeed <= 0){
        currentTime = maxTime;
    }
    currentDistance = currentSpeed + currentDistance;
    console.log(currentSpeed, currentDistance);
    if(currentTime >= maxTime){
        results();
        clearInterval(myVar);
        return;
    }
    if (acceleration >= 100){
        clearInterval(myVar);
        resetAnimation();
        return;
    }

}

function results(){
    if (acceleration < 0){
        alert("Not enough power to move the rocket!");
        resetAnimation();
    
    }
    if (acceleration > 100){
        alert("Catastrophic failure");
    }
    myInt = setInterval(finalResult, 7000);
}
function finalResult(){
    currentDistance = currentDistance / 1000;
    if (currentDistance > 100){
        alert("Wow!!! You sent that rocket to space!!"+"\nTotal Distance: " + currentDistance + "\nMax Speed: " + maxSpeed + "\nTotal Time: " + maxTime);
        clearInterval(myInt);
        resetAnimation();
        return;
    }
    if (currentDistance < 100){
        alert("Partial flight, try again to improve!"+"\nTotal Distance: " + currentDistance + "\nMax Speed: " + maxSpeed + "\nTotal Time: " + maxTime);
        clearInterval(myInt);
        resetAnimation();
        return;
    }

}

var mass = $('.mass-range'),
massvalue = $('.mass-value');
massvalue.html(mass.attr('value'));

mass.on('input', function(){
    massvalue.html(this.value);
    currentMass = this.value;
}); 

var thrust = $('.thrust-range'),
thrustvalue = $('.thrust-value');
thrustvalue.html(thrust.attr('value'));

thrust.on('input', function(){
    thrustvalue.html(this.value);
    currentThrust = this.value;
}); 

var thrusttime = $('.thrusttime-range'),
thrusttimevalue = $('.thrusttime-value');
thrusttimevalue.html(thrusttime.attr('value'));

thrusttime.on('input', function(){
    thrusttimevalue.html(this.value);
    currentThrustTime = this.value;
}); 

document.getElementById("playButton").addEventListener("click", startAnimation);
document.getElementById("resetButton").addEventListener("click", resetAnimation);