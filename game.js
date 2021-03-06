/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var isfacingright = true;

var time = 0;

var time2 = 0;

var time9 = 0;

var timeLim = 60;

var score1 = 0;

var tempScore;

var style = {font: '80px Arial', fill:'#FFFFFF', align: 'center'};

var scoreText;

var mainState = {
    spritecreator: function(imagename,scale,initialx){
		var sprite = game.add.sprite(initialx, 50, imagename);
		game.physics.enable(sprite, Phaser.Physics.ARCADE);
		sprite.body.collideWorldBounds = true;
		sprite.scale.x = scale;
        sprite.scale.y = scale;
	   return sprite;
    },   
    preload: function () {
        game.load.image('background', 'assets/images/background.jpg');
        game.load.image('mainCharac', 'assets/images/mariopixel.png');
        game.load.image('zombieCharac', 'assets/images/zombie.png');
        game.load.image('floor', 'assets/images/floor.jpg');
        game.load.image('sword', 'assets/images/sword.png')
        game.load.image('heart', 'assets/images/heart.png')
		
    },

    create: function () {
        
        this.jumpTimer = 0;
        
        this.bg = game.add.image (0, 0,'background');
        this.bg.width = game.width;
        this.bg.height = game.height;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 2000;
        
        this.floor = game.add.sprite(0, game.height - 50, 'floor');
        this.floor.height = 50;
        this.floor.width = game.width;
        
        game.physics.enable(this.floor);
        
        this.floor.body.immovable = true;
        
        this.floor.body.allowGravity = false;
        
        this.character = this.spritecreator ('mainCharac',0.2,100);
        
        this.enemies = game.add.group();

		this.enemy = this.spritecreator('zombieCharac',0.2,200);
        
        this.enemy.body.velocity.x = 200;
        
        this.enemies.add(this.enemy);
        
        scoreLab = game.add.text(50,100, "Score:", style);
        scoreText = game.add.text(300,100, score1.toString(), style);
        
        timeLab = game.add.text(750,100, "Time:", style);
        timeText = game.add.text(960,100, timeLim.toString(), style);

    },
    update: function () {
        game.physics.arcade.collide(this.enemies, this.floor);
        game.physics.arcade.collide(this.character, this.floor);
        game.physics.arcade.collide(this.character, this.enemies, this.check);
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.character.anchor.setTo(.5, 1); //so it flips around its middle
            this.character.scale.x = -0.2; //facing default direction
            this.character.scale.x = 0.2; //flipped
            isfacingright = true;
           
            this.character.body.velocity.x = 300 + score1 * 0.5;
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            this.character.anchor.setTo(.5, 1); //so it flips around its middle
            this.character.scale.x = 0.2; //facing default direction
            this.character.scale.x = -0.2; //flipped
            isfacingright = false;
           
            this.character.body.velocity.x = -300 - score1 * 0.5;
        } else {
            //is.character.body.velocity.x = 0;
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
        
        if (time > 30) {
            for (var i = 0; i < this.enemies.length; i++) {
                 this.zombie = this.enemies.getChildAt(i);
                 this.zombie.body.velocity.x = this.zombie.body.velocity.x * (Math.round(Math.random()) * 2 - 1);
            }
            time = 0;
        } else {
            time++;
        }
        
        for (var i = 0; i < this.enemies.length; i++) {
            this.zombie = this.enemies.getChildAt(i);
            if (this.zombie.body.velocity.x === 0){
                this.zombie.body.velocity.x =  (150 + score1 * 2) * (Math.round(Math.random()) * 2 - 1);
            }
        }
        
        if (score1 > 118) {
            tempScore = 118;
        } else {
            tempScore = score1; 
        }
        
        
        if (time2 > 60 - tempScore * 0.6) {
            this.temp = this.spritecreator('zombieCharac',0.2, Math.random() * 1000 - 0);
            this.temp.body.velocity.x = 150 + score1 * 2;
            this.enemies.add(this.temp);
            time2 = 0;        
        } else {
            time2++;
        }
                
    
        for (var i = 0; i < this.enemies.length; i++) {
            this.zombie = this.enemies.getChildAt(i);
            if (this.zombie.body.y < 300){
            this.zombie.body.y--;
            }
        }
        if (time9 <= 60){
            time9 ++;
        } else {
            time9 = 0;
            timeLim --;
            timeText.text = timeLim;
        }
    },
    
    check: function(char, enemy) {
        if(char.body.touching.left && isfacingright)  {
            char.kill();
            enemy.kill();
        }
        if(char.body.touching.left && !isfacingright) {
            score1++;
            scoreText.text = score1.toString();
            char.body.velocity.x = -300 - score1 * 0.5;
            enemy.kill();
        }
        if(char.body.touching.right && isfacingright) {
            score1++;
            scoreText.text = score1.toString();
            char.body.velocity.x = 300 + score1 * 0.5;
            enemy.kill();
        }
        if(char.body.touching.right && !isfacingright) {
            char.kill();
            enemy.kill();
        }
        
        if (char.body.touching.down && enemy.body.touching.up) {
            char.kill();
            enemy.body.y = game.height - 100;
        }
        if (char.body.touching.up) {
            char.body.y = game.height - 50 - char.height;
        }
        if (timeLim <= 0){
            char.kill();
            timeLim = 0;
        }
    }
    
};