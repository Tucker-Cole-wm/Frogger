// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = -101;
    this.y = 62 + (85.5 * (Math.floor(Math.random() * 3)));
    this.speed = (Math.random() * 800) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 505) {
        this.x = -101;
        this.y = 62 + (85.5 * (Math.floor(Math.random() * 3)));
        this.speed = (Math.random() * 800) + 100;
    } else {
        this.x += dt * this.speed;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (URL, x, y) {
    this.sprite = URL || '';

    this.x = x || 202;
    this.y = y || 404;
    this.score = 0;
};

Player.prototype.update = function () {
    /*If player has reach the water, reset his location to the origin and
    *increment runs completed counter by one
    */
    if (this.y <= 0) {
        this.score += 1;
        this.y = 404;
        bonus = new Bonus();
    };

    //Prevent the player from moving outside of the gride
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.x >= 404) {
        this.x = 404;
    }
    if (this.y >= 404) {
        this.y = 404;
    };
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    var direction = {
        'left': [-101, 0],
        'up': [0, -85.5],
        'right': [101, 0],
        'down': [0, 85.5],
        'enter': [0,0]
    };

    this.x += direction[key][0];
    this.y += direction[key][1];
};

var Bonus = function () {
    var sprites = [
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png'
    ];

    this.value = Math.floor(Math.random() * 3)
    this.sprite = sprites[this.value];
    this.multiplier = 5 * (this.value + 1);

    this.x = 0 + (101 * Math.floor(Math.random() * 5));
    this.y = 62 + (85.5 * (Math.floor(Math.random() * 3)));
}

Bonus.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Selector = function () {
    this.sprite = 'images/Star.png';

    this.x = 0;
    this.y = 202;
}

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Selector.prototype.update = function() {
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.x >= 404) {
        this.x = 404;
    }
    if (this.y >= 404) {
        this.y = 404;
    };
}

Selector.prototype.handleInput = function(key) {
    var direction = {
        'left' || 'a': [-101, 0],
        'up' || 'w': [0, -85.5],
        'right' || 'd': [101, 0],
        'down' || 's': [0, 85.5],
        'enter': [0,0]
    };

    this.x += direction[key][0];
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var selector = new Selector();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    selector.handleInput(allowedKeys[e.keyCode]);
});
