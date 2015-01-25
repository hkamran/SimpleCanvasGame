/**
    This object represents the player, it's responsibility is to draw and manage the
    player movements/controls.
    
    author: Houman Kamran
**/
var Player = function(context, canvas, xpos, ypos) {
    this._xpos = xpos;
    this._ypos = ypos;
    
    this.canvas = canvas;
    this.context = context;
    this.moveSpeed = 5;
    
    /**
        Given a keyboard event, move the player to the appropriate position.
    **/
    this.controls = function(e) {
        if (e.keyCode === 37) { // left
            this._ypos = this._ypos - this.moveSpeed;
        } else if (e.keyCode === 39) { // right
            this._ypos = this._ypos + this.moveSpeed;
        }
    };
    
    /**
        Draw the player on the canvas given the speed at which the level moves.
    **/
    this.draw = function(speed) {
        this.context.beginPath();
        this.context.rect(this._xpos, this._ypos, 20, 20);
        this.context.fillStyle = "black";
        this.context.fill();
        this.context.strokeStyle = 'black';
        this.context.stroke();    
        this.context.closePath();
        this._xpos = this._xpos + speed;
    };
    
    /**
        Get the top boundary of the player (to be used for collision).
    **/    
    this.getTopBoundary = function() {
        return new Line(this._xpos, this._ypos, this._xpos + 20, this._ypos);
    };
    
    /**
        Get the bottom boundary of the player (to be used for collision).
    **/     
    this.getBottomBoundary = function() {
        return new Line(this._xpos, this._ypos + 20, this._xpos + 20, this._ypos + 20);
    };

    /**
        Set the controller listener for the player.
    **/ 
    this.setControls = function () {
        var player = this;
        this.canvas.addEventListener('keydown', function(event) {
            player.controls(event);
        }, false);      

    };
    
    /**
        Disable controls.
    **/     
    this.removeControls = function() {
        this.moveSpeed = 0;  
    };
};