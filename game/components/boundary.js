/**
    This object represents the boundary of the level. It is task with managing the points/lines in
    the boundary, as well as collisions with any lines.
    
    author: Houman Kamran
**/
var Boundary = function(context) {
    this.points = [];
    this.context = context;
    
    /**
        Draw all the points in the boundary (Creating a series of lines).
    **/
    this.draw = function() {
        this.context.beginPath();  
        for (var i = 0; i < this.points.length; i ++) {
            var point = this.points[i];  
            context.lineTo(point.x, point.y); 
            context.stroke();
        }     
        this.context.closePath();    
    };
    
    /**
        Do game calculations. (Particularly clear any points that are past the canvas screen)
    **/
    this.tick = function(offsetX) {
        var screenPosX = 0 - offsetX;
        var pastScreenX = screenPosX - 50;

        if (this.points.length > 0) {
            var point = this.points[0];

            if (point.x < pastScreenX) {
                this.points.shift(); 
            }
        }    
    };

    /**
        Check if any lines in the boundary hits a given line object. Return true if it hits
        otherwise false.
    **/
    this.collision = function(newLine) {
        for (var i = 0; i < this.points.length; i++) {
            if (i + 1 < this.points.length) {
                var point1 = this.points[i];
                var point2 = this.points[i + 1];
                
                var line = new Line(point1.x, point1.y, point2.x, point2.y);
                if (line.isColliding(newLine)) {
                    return true;
                }
            }
        }  

        return false;
    };
};