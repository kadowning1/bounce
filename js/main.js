// setup canvas

const canvas = document.querySelector('canvas'); // sets up canvas on html
const ctx = canvas.getContext('2d'); // object directly representing drawing area on canvas

const width = canvas.width = window.innerWidth; //setting width to size of viewport
const height = canvas.height = window.innerHeight; //setting height to size of viewport

const x = document.getElementById("myP").innerHTML; //reference to paragraph

count = '0'; //keeping count of number of balls

//if (ball[j].exists) {
//increment
//decrement


// function to generate random number. takes two numbers and returns a random in the range

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Ball constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x; //coordinates where the ball starts on the screen
  this.y = y; //coordinates where the ball starts on the screen
  this.velX = velX; //velocity of each ball on Xaxis
  this.velY = velY; //velocity of each ball on Xaxis
  this.exists = exists; //track whether the ball exists
}

// added Ball constructor inherit
function Ball(x, y, velX, velY, color, size, exists) {
  Shape.call(x, y, velX, velY, exists); //inheriting from Shape
  this.color = color; //each ball gets a color
  this.size = size; //each ball gets a size -- radius in pixels
}

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath(); //state we want to draw a shape
  ctx.fillStyle = this.color; //set to the color property to fill color
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //specify the start and end of degrees
  ctx.fill(); //finish drawing path
};

// define ball update method

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX); // if x is greater than width
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX); //if x is less than width
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY); //if y is greater than width
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY); // if y is less than width
  }

  this.x += this.velX; // adds velocity value to x coordinate
  this.y += this.velY; // adds velocity value to y coordinate
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) { //check to see if every ball has collided with another
    if (!(this === balls[j])) { //code runs if not the same ball using !
      const dx = this.x - balls[j].x; //collision of two circles algorithm
      const dy = this.y - balls[j].y; //collision of two circles algorithm
      const distance = Math.sqrt(dx * dx + dy * dy); //collision of two circles algorithm

      if (distance < this.size + balls[j].size) { //if collision is detected, change color of the ball
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        //count++;
      }
    }
  }
};

//added EvilCircle constructor
function EvilCircle(x, y, velX, velY, exists) {
  Shape.call(this, x, y, 20, 20, exists); //inherit from Shape
  this.color = 'red'; // changing color of evilCircle
  this.size = 50; // changing size of evilCircle
}
//define evilCircle draw method

EvilCircle.prototype.draw = function() {
  ctx.beginPath(); //state we want to draw a shape
  ctx.strokeStyle = this.color; //set to the stroke property to not fill
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.lineWidth = 3; //width of the line of the circle
  ctx.stroke(); //state we want an unfilled stroke path of the arc above
  ctx.fill(); //finish drawing path
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
    if (e.key === 'a') { //controls for the game
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
    if (balls[j].exists) { //code runs if ball exists
      const dx = this.x - balls[j].x; //collision alogorithm
      const dy = this.y - balls[j].y; //collision alogorithm
      const distance = Math.sqrt(dx * dx + dy * dy); //collision alogorithm

      if (distance < this.size + balls[j].size)//{
        balls[j].exists = false;
        //count--;
        //if (count === 0) {
          //balls[j].exists = false
        //}
      }
    }
};

// define array to store balls and populate it
let balls = [];

while (balls.length < 25) { //creates instance using random values through random function
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
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; //sets canvas color to semi black
  ctx.fillRect(0, 0, width, height); //draws rectangle

  //creating evilCircle instance
  //let testCircle = new evilCircle (50, 100, 4, 4, 'blue', 10); 
  // setControls();
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw(); //loops through draw function
    balls[i].update(); //loops through update method
    balls[i].collisionDetect(); //loops through collisionDetect method
  }
  //testCircle.draw(); // call evilCircle (says Ball on instructions)
  //testCircle.checkBounds();
  //testCircle.collisionDetect();

  requestAnimationFrame(loop); //running function loop over and over again
}

loop(); //calling loop function to start animation
