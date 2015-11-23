/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/


var mainState = {
    spritecreator: function(imagename,scale,initialx){
		var sprite = game.add.sprite(initialx, 50, imagename);
		game.physics.enable(sprite, Phaser.Physics.ARCADE);
		sprite.body.collideWorldBounds = true;
		sprite.scale.x = scale;
        sprite.scale.y = scale;
	   return sprite;
    },   
    // Here we add all the functions we need for our state
    // For this project we will just have 3 functions
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        game.load.image('background', 'assets/images/background.jpg');
        game.load.image('mainCharac', 'assets/images/mariopixel.png');
        game.load.image('zombieCharac', 'assets/images/zombie.png');
        game.load.image('floor', 'assets/images/floor.jpg');

		
    },

    create: function () {
        
        this.jumpTimer = 0;
        
        //adds the background into the game
        this.bg = game.add.image (0, 0,'background');
        this.bg.width = game.width;
        this.bg.height = game.height;
        
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 2000;
        
        //adds the floor into the game
        this.floor = game.add.sprite(0, game.height - 30, 'floor');
        this.floor.height = 30;
        this.floor.width = game.width;
        
        //enables physics for the floor
        game.physics.enable(this.floor);
        
        //makes it so the floor won't move when the bird hits it
        this.floor.body.immovable = true;
        
        //makes it so the floor doesn't adhere to gravity
        this.floor.body.allowGravity = false;
        
        this.character = this.spritecreator ('mainCharac',0.2,100);
        
        this.enemies = game.add.group();

		this.enemy = this.spritecreator('zombieCharac',0.2,20);
        
        this.enemies.add(this.enemy);

    },
    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic
        game.physics.arcade.collide(this.enemies, this.floor);
        game.physics.arcade.collide(this.character, this.floor);
        game.physics.arcade.collide(this.character, this.enemies, this.check);
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
           
            this.character.body.velocity.x = 300;
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
           
            this.character.body.velocity.x = -300;
        } else {
            this.character.body.velocity.x = 0;
        }
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP]);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.DOWN]);
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && game.time.now > this.jumpTimer)
        {        
            this.character.body.velocity.y = -700;
            this.jumpTimer = game.time.now + 750;     
        }
        
    },
    
    check: function(char, enemy) {
        if(char.body.touching.left) {
            enemy.kill();
        }
        
        if (char.body.touching.down) {
            enemy.body.y = game.height - 80;
        }
    }    
};

// Initialize Phaser
var game = new Phaser.Game(1200, 650, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
