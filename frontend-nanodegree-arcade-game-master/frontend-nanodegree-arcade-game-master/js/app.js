// Enemies our player must avoid
let Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    //this determines the speed of the enemy bug and the x and y axis.
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += this.speed * dt;
    // which will ensure the game runs at the same speed for
    // all computers.

    //if statement to show the enemy at the beginning of the board and if it exceeds the ending it should return back
    if (this.x > 505){
        this.x = -50;
    }

     //produces the enemies at the beginning of the canvas and randomly shuffles
     
     var gameSpeed = Math.floor(Math.random() * 400);
     this.speed = 150 + gameSpeed;

     //Idea from Ben
     //Code that resets the player if it collides with the enemy
    if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
        alert('Try Again');
        player.resetPosition();
    };
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
  const Player = function (){
      this.x = 202;
      this.y = 405;
      this.sprite = 'images/char-boy.png';
  }
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function (dt) {

};

Player.prototype.resetPosition = function(){
    this.x = 202;
    this.y = 405;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
    //Allows users to move left to each tile
    if (direction == 'left' && this.x > 0) {
        this.x -= 101;
    };
    // Allows users to move right to each tile
    if (direction == 'right' && this.x < 400) {
        this.x += 101;
    };
    // Allows users to move up on each tile
    if (direction == 'up' && this.y > 0) {
        this.y -= 83;
    };

    // Allows users to move down on each tile
    if (direction == 'down' && this.y < 405) {
        this.y += 83;
    };

    // Once the player gets to the water, the user is instantly reset to the starting position
    if (this.y < 0) {
        setTimeout(() => {
            alert('You won, now try again');
            this.resetPosition();
        }, 500);
    };
};

const players = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

const Selector = function (){
    this.image = 'images/Selector.png';

    this.x = 0;
    this.y = 405;
}

Selector.prototype.update = function (dt) {

};

Selector.prototype.render = function Selector() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};


Selector.prototype.changePlayer = function(){

    if (player.x > this.x - 40 && player.x < this.x + 40 && player.y > this.y - 40 && player.y < this.y + 40) {
        player.sprite = players[Math.floor(Math.random() * players.length)];
        player.resetPosition();
    };
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
window.allEnemies = [];
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 250);
    allEnemies.push(enemy);
});


// Place the player object in a variable called player
// Placed the selector object in a variable called selector
let player = new Player();
let selector = new Selector();

// For each enemy located on the y axis from 0 on the x axis move at a speed of 200 
// Until randomly regenerated in the enemy update function above

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
