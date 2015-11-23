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
        this.jumpTimer = 0;
        
        //adds the background into the game
        this.bg = game.add.image (0, 0,'background');
        this.bg.width = game.width;
        this.bg.height = game.height;
        
        // Create a game sprite from the bird image positioned
        // at the center of the game world
        this.character = game.add.sprite(game.world.centerX, game.world.centerY, 'mainCharac');
        
        this.character.scale.x = 0.2;
        this.character.scale.y = 0.2;
        
        //enables physics for the bird
        game.physics.enable(this.character);
        
        this.character.immovable = true;
        
        //sets gravity value for the bird
        game.physics.arcade.gravity.y = 2000;
        
        // Stop the bird from falling off the screen, for now
        this.character.body.collideWorldBounds = true;
        
        // keep space from scrolling the page
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        
        //adds the floor into the game
        this.floor = game.add.sprite(0, game.height - 30, 'floor');
        this.floor.height = 30;
        this.floor.width = game.width;
        
        this.enemy = game.add.sprite(5,5, 'zombieCharac');
                
        game.physics.enable(this.enemy);
        
        this.enemy.immovable = true;
        
        this.enemy.scale.x = 0.2;
        
        this.enemy.scale.y = 0.2;
        
        this.enemy.body.collideWorldBounds = true;
        
        //enables physics for the floor
        game.physics.enable(this.floor);
        
        //makes it so the floor won't move when the bird hits it
        this.floor.body.immovable = true;
        
        //makes it so the floor doesn't adhere to gravity
        this.floor.body.allowGravity = false;

    },
    update: function () {
        
        game.physics.arcade.collide(this.floor, this.character);
        game.physics.arcade.collide(this.enemy, this.floor);
        
        game.physics.arcade.collide(this.character, this.enemy, this.check);
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
           
            this.character.body.velocity.x = 500;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
           
            this.character.body.velocity.x = -500;
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
