/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3 functions
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        game.load.image('background', 'assets/images/background.jpg');
        game.load.image('floor', 'assets/images/floor.jpg');
        
    },
    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        // Create a game sprite from the logo image positioned
        // at the center of the game world
        this.bg = game.add.image (0, 0,'background');
        this.bg.width = game.width;
        this.bg.height = game.height;
        // The position of the sprite should be based on the
        // center of the image (default is top-left)
        //this.sprite.anchor.setTo(0.5, 0.5);
        // Change background color to a gray color
        this.floor = game.add.image (0, game.world.height - 80, 'floor');
        this.floor.height = 80;
        this.floor.width = game.width;
        game.physics.enable(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    
    },
    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic
        
        // Rotate the sprite by 1 degrees
       
    }
};

// Initialize Phaser
var game = new Phaser.Game(1200, 650, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
