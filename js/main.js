// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const x = document.getElementById("myP").innerHTML; //

count = '0';
//if (ball[j].exists) {
    //increment
    //decrement


// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Ball constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// added Ball constructor inherit
function Ball(x, y, velX, velY, color, size, exists) {
  Shape.call(x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

//added EvilCircle constructor
function EvilCircle(x, y, velX, velY, exists) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = 'red';
  this.size = 10;
}

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) { //check to see if every ball has collided with another
    if (!(this === balls[j])) { //code runs if not the same ball
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) { //if collision is detected, change color of the ball
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        count++;
    }
    }
  }
};

//define evilCircle draw method

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.stroke();
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
  ctx.lineWidth = 3;
};

//define EvilCircle check bounds method.  this keeps the evilCircle on the screen

EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x = -(this.size); // if x is greater than width
  }

  if ((this.x - this.size) <= 0) {
    this.x = -(this.size); //if x is less than width
  }

  if ((this.y + this.size) >= height) {
    this.y = -(this.size); //if y is greater than width
  }

  if ((this.y - this.size) <= 0) {
    this.y = -(this.size); // if y is less than width
  }

};


// define setControls method for evilCircle


EvilCircle.prototype.setControls = function() {
  let _this = this; //private function - would think this is showing the the keys used to control the circle are private
  window.onkeydown = function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }
  }
};

//define collision detection for evilCircle

EvilCircle.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        count--;
      if (count === 0){
          balls[j].exists = false
      }  
      }
    }
  }
};

// define array to store balls and populate it
let balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    size
  );
  balls.push(ball);
}

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  //creating evilCircle instance
    let testCircle = new evilCircle (50, 100, 4, 4, 'blue', 10); 
    setControls();
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  testCircle.draw(); // call evilCircle (says Ball on instructions)
  testCircle.checkBounds();
  testCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();
