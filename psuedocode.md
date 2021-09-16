# Bouncing Balls Psuedocode

## Start

>> Functionality - User is wanting to add an "evil circle" to the game.  User is wanting to control the circle.  User is wanting to make the balls disappear.  User is wanting to keep track of the amount of balls left.

## Objects/Data Structures

### Objects
* Evil Circle
* Balls
* User

### Variables
* Score Counter

### INIT
* CREATE Shape()
* CREATE Ball()
* CREATE EvilCircle()
* Adjust loop()

### Program
* evilCircle
* scoreCounter

### Functions
* draw()
    * draws evil circle on canvas
* checkBounds()
    * checks to make sure circle does not go off edge of screen
* setControls()
    * setting keys to control evilCircle
* collisionDetect()
    * method to detect when balls and evil circle collide

### Steps
1. Update Shape constructor - check
2. Add Ball constructor - check
3. Add evilCircle constructor - check
4. Add evilCircle methods
    * draw - check
    * checkbounds - check
    * setControls - check
    * collisionDetect - check
5. Update loop function
    * create evil circle object instance 
        * call setControls - check
    * loop every ball through draw, update, collisionDetect
    * call evil balls instances draw, checkBounds, collisionDetect
6. Add score counter
    * create variable to reference paragraph
    * keep a count of balls on screen
    * increment the count if added
    * decrement the count if eaten


## End
