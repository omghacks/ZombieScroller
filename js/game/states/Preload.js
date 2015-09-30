Template.preload = function() {
    this.ready=false

};

Template.preload.prototype = {
    preload: function() {
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
        this.splash.anchor.setTo(0.5);
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+ 128, "preloadBar");
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);
        
        // here you load all the game images and what not
        

       
        
        //sprite hseets are dofferent
        //(monicer, path,width og each image, heigh of image, how many in sprite sheet
       
        
        
        // now lets load music
        // (monicer,[array of music so that web browser will decide which to play)
        
    
        
        // loading bitmap fonts
        
       
        //event fire once it has loaded everythign
        //in phaser call  callback... nededsuper importnt yas 
        this.load.onLoadComplete.add(this.onLoadComplete, this);
        
    },
    create: function() {
        this.preloadBar.cropEnabled = false;   
    },
    
    update: function() {
            this.state.start('mainMenu');
    },
    onLoadComplete: function(){
        this.ready = true;
    }
};