/**
    This object represents a line. 
    
    author: Houman Kamran
**/
var Line = function(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.slope = (y2 - y1) / (x2 - x1);
    this.b = y1 - (this.slope * x1); 
    
    /**
        Get the Y position of this line given an X position.
    **/
    this.getPoint = function (x) {
        return (this.slope * x) + this.b;
    };
    
    /**
        Check if a line intersects this line. Return true if it does, otherwise false.
    **/
    this.isColliding = function (line) {
        if (this.x1 <= line.x1 && this.x2 >= line.x2) {
            var mx = this.slope - line.slope;
            var b = line.b - this.b;


            var point = new Point(b/mx, this.getPoint(b/mx));

            var tolerance = 10;
            if ((point.x >= this.x1 && point.x <= this.x2) && (point.x >= line.x1 - tolerance && point.x <= line.x2 + tolerance)) {
                if (this.slope < 0 && point.y <= this.y1 && point.y >= this.y2) {
                    return true;
                } 
                if (this.slope >= 0 && point.y >= this.y1 && point.y <= this.y2) {
                    return true;
                } 
            }
            
        }
        return false;                
    };
};