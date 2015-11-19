/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/


var mainState = {
    spritecreator: function(imagename,scale,initialx){
		var sprite = game.add.sprite(initialx, 50, imagename);
		game.physics.enable(sprite, Phaser.Physics.ARCADE);
		sprite.body.collideWorldBounds = true;
		sprite.scale.x = scale;
        sprite.scale.y = scale;
        this.entities.add (sprite)
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
        
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 2000;
        
		var bg = game.add.image (0, 0,'background');
        this.platform = game.add.group ()
        this.platform.enableBody = true;
        this.floor = this.platform.create (0, game.world.height - 80, 'floor')
//        this.floor = game.add.sprite (0, game.world.height - 80, 'floor');
        this.floor.height = 80;
        this.floor.width = game.width;
//        game.physics.enable(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;
//        this.floor.body.collideWorldBounds = true;
        
        this.entities = game.add.group()
        
        this.character = this.spritecreator ('mainCharac',0.2,5);
		//this.character = {
		//	health: 0,
		//	sprite: game.add.sprite(400,50, 'mainCharac')
		//}
		
        // The position of the sprite should be based on the
        // center of the image (default is top-left)
        // Change background color to a gray color
        bg.width = game.width
        bg.height = game.height
        this.jumpTimer = 0
		

		this.character1 = this.spritecreator('zombieCharac',0.2,20);
		this.character1.body.bounce.x = 100;
		this.character1.body.bounce.y = 0;
				

        
        //this.entities.setAll ("body.immovable", true);
        
		this.direction = -1;
    },
    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic
        console.log(this.character1.body.checkCollision)
        game.physics.arcade.collide(this.entities, this.platform)
        game.physics.arcade.collide(this.entities, this.entities)
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
           
            this.character.x += 6;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
           
            this.character.x -= 6;
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
        
    }
};

// Initialize Phaser
var game = new Phaser.Game(1200, 650, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
