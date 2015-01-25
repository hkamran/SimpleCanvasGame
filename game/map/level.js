/**
    This object represents the level, it's responsibility is to draw the lines, and handle the collisions
    of both boundaries.
    
    author: Houman Kamran
**/
var Level = function(context, width, height, y) {
    this.context = context;
    this.width = width;
    this.height = height;
    
    this.line1 = new Boundary(context);
    this.line2 = new Boundary(context);

    //Last generated x position
    this.lastX = 0;

    this.difficulty = 50;
    this.y = y;
    
    /**
        Generate a point for both boundaries at the given x position of the canvas.
    **/
    this._generatePoint = function(offsetX) {
        var viewX = 0 - offsetX;
    
        var pastScreenView = viewX + this.width;
        
        if(this.lastX < pastScreenView) {
            var newX = Math.floor((Math.random() * 20) + this.lastX + 50);
            var newY = Math.floor((Math.random() * this.difficulty) + this.y);
            this.line1.points.push(new Point(newX, newY));
            this.line2.points.push(new Point(newX, newY + 100));
            this.lastX = newX;
        }      
    };
    
    /**
        Draw both lines.
    **/    
    this.draw = function(offsetX) {
        this.line1.draw(offsetX);
        this.line2.draw(offsetX);             
    };
    
    /**
        Do game calculations.
    **/      
    this.tick = function(offsetX) {
        this.line1.tick();
        this.line1.tick();
        this._generatePoint(offsetX);
        
    };
    
    /**
        Check if the player is colliding with either boundaries of the map.
    **/  
    this.isColliding = function(player) {
        var topHit = this.line1.collision(player.getTopBoundary());
        var bottomHit = this.line2.collision(player.getBottomBoundary());

        if (topHit || bottomHit) {
            return true;
        }
        return false;
    };

};