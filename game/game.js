/**
    This object represents the game, it's responsibility is to draw all game object, and 
    manage the state.
    
    author: Houman Kamran
**/
var Game = function(context, canvas) {
    this.context = context;
    this.canvas = canvas;
    this.isGameOver = false;
    
    this.level = new Level(context, this.canvas.width, this.canvas.height, 160);
    this.player = new Player(context, canvas, 60, 220);
    
    //starting X position for game.
    this.offsetX = 0;
    
    //Speed of the game moving the level.
    this.speed = 2;
    
    //These two variables dictate the speed at which the difficulty increases
    this._counter = 0;
    this.step = 100;
    
    /**
        Do any preliminary setup work for the game.
    **/
    this.setup = function() {
        this.player.setControls();
    };
    
    /**
        Draw all game objects.
    **/    
    this.draw = function() {
        this.context.save();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        //move context left
        this.context.translate(this.offsetX, 0);
        
        this.context.beginPath();
        this.context.font = "24px Arial";
        this.context.fillText("Difficulty: " + this.level.difficulty, 20 - this.offsetX, this.canvas.width - 20);
        this.context.closePath();

        this.level.draw(this.offsetX);
        this.player.draw(this.speed);
        
        if (this.isGameOver) {
            this.context.font = "24px Arial";
            this.context.fillText("Game Over!", 200 - this.offsetX, this.canvas.height/2);
            this.speed = 0;
            this.player.removeControls();
        }                           
        
        this.context.restore();                 
    };
    
    /**
        Do game calculations.
    **/
    this.tick = function() {
        this.level.tick(this.offsetX);
        this.offsetX = this.offsetX - this.speed;
        this.isGameOver = this.level.isColliding(this.player); 

        this._counter++;
        if (!this.isGameOver) {
            if (this._counter % this.step == 0) {
                if (this.level.difficulty < 200) {
                    this.level.difficulty++;
                }
                this._counter = 0;
            }
        }                    
    };
    
};