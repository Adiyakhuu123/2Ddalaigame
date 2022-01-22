var canvas = document.getElementById("Canva");

var ctx = canvas.getContext("2d");

var x = Math.floor(Math.random()*canvas.width) ;
var y = canvas.height-30;
var r = 10;
var dx = 2;
var dy = -2;

var ph = 10;
var pw = 80;
var px = canvas.width / 2 - pw / 2;
var py = canvas.height - ph;

var leftPressed = false;
var rightPressed = false;

document.addEventListener("keydown", keyDownFunction);
document.addEventListener("keyup", keyUpFunction);

function keyDownFunction(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 39) {
    rightPressed = true;
  }
}

function keyUpFunction(e) {
  console.log(e);
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(px, py, pw, ph);
  ctx.fill();
  ctx.closePath();

  if (px > 6 && leftPressed) {
    px = px - 5;
  }
  if (px < canvas.width - pw && rightPressed) {
    px = px + 5;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = "purple";
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  x = x + dx;
  y = y + dy;
  if (x >= canvas.width - r) {
    dx = -dx;
  }
  if (x <= 0 + r) {
    dx = -dx;
  }
  if (y >= canvas.height - r - ph) {
    if (x + r >= px && x + r <= px + pw) {
      dy = -dy;
    } else {
      document.location.reload();
    }
  }
  if (y <= 0 + r) {
    dy = -dy;
  }
}

class Blocks {
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    collision() {

      return(this.x < x + r &&
        this.x + this.w > x &&
        this.y < y + r &&
        this.h + this.y > y)
    } 

    oih(){
      if(this.x+this.h>x+r){
        dx = -dx
      }
    }
}

const blocks = [];
for(let i = 20 ; i < 720 ; i = i + 100){
  for(let c = 20; c < 120 ; c = c + 30){
    const block = new Blocks(i, c, 80, 20)
    blocks.push(block)
  }
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  blocks.forEach((block,index)=>{
      block.draw()
      const coll = block.collision()
      block.oih()
      if(coll== true)  {
        blocks.splice(index,1)
      }    

  })
}

setInterval(draw, 10);
