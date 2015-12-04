var TitleScreen = {
    
    preload : function() {
        game.load.image('mainCharac', 'assets/images/mariopixel.png');
        game.load.image('zombieCharac', 'assets/images/zombie.png');
    },
    
    create: function () {
        this.add.button(100, 100, 'mainCharac', this.mode1, this);
        this.add.button(350, 350, 'zombieCharac', this.mode2, this);
        game.stage.backgroundColor = '#66ffcc';
    },
    
    mode1: function () {
        //begins the Options state
        this.state.start('main');
    },

    mode2: function() {
        this.state.start('main2');
    }
    
};

// Initialize Phaser
var game = new Phaser.Game(1200, 650, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('title', TitleScreen)
game.state.add('main', mainState);
game.state.add('main2', secondState);
game.state.start('title');