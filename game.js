/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3 functions
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        game.load.image('background', 'assets/images/background.jpg');
        game.load.image('logo', 'assets/images/missionbit.png');
        
    },
    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        // Create a game sprite from the logo image positioned
        // at the center of the game world
        var bg = game.add.image (0, 0,'background');
        bg.width = game.width
        bg.height = game.height
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        // The position of the sprite should be based on the
        // center of the image (default is top-left)
        this.sprite.anchor.setTo(0.5, 0.5);
        // Change background color to a gray color
    },
    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic
        
        // Rotate the sprite by 1 degrees
        this.sprite.angle += 180.15;
    }
};

// Initialize Phaser
var game = new Phaser.Game(1200, 650, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
