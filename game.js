/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3 functions
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        game.load.image('background', 'assets/images/background.jpg');
        game.load.image('mainCharac', 'assets/images/mariopixel.png');
        game.load.image('zombieCharac', 'assets/images/zombie.png');
		
    },

    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        // Create a game sprite from the logo image positioned
        // at the center of the game world
		var bg = game.add.image (0, 0,'background');
        this.character = game.add.sprite(25,50, 'mainCharac');
        this.character.scale.x = 0.5;
        this.character.scale.y = 0.5;
        // The position of the sprite should be based on the
        // center of the image (default is top-left)
        // Change background color to a gray color
        bg.width = game.width
        bg.height = game.height
		
    },
    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
           
            this.character.x += 5;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
           
            this.character.x -= 5;
        }
        
        
        // Rotate the sprite by 1 degrees

    }
};

// Initialize Phaser
var game = new Phaser.Game(1200, 650, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
