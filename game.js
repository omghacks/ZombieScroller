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
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 200;
        
		var bg = game.add.image (0, 0,'background');
        this.character = game.add.sprite(400,50, 'mainCharac');
        game.physics.enable(this.character, Phaser.Physics.ARCADE);
        this.character.scale.x = 0.2;
        this.character.scale.y = 0.2;
        this.character.body.collideWorldBounds = true;
        // The position of the sprite should be based on the
        // center of the image (default is top-left)
        // Change background color to a gray color
        bg.width = game.width
        bg.height = game.height
        this.jumpTimer = 0
		
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
        
       


        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.character.body.onFloor() && game.time.now > this.jumpTimer)
        {
            this.character.body.velocity.y = -250;
            this.jumpTimer = game.time.now + 750;
        }
       
        // Rotate the sprite by 1 degrees

    }
};

// Initialize Phaser
var game = new Phaser.Game(1200, 650, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
