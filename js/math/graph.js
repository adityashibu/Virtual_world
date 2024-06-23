class Graph {
    // Pass in the points and segments that make up the graph
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    /* FUNCTION
    Function to add a point to the graph
    */
    addPoint(point) {
        // Push the point into the points array
        this.points.push(point);
    }

    /* FUNCTION
    Function to try to add a point to the graph to make sure no duplicates are added
    */
    tryAddPoint(point) {
        // If this point is not already in the array, then add the point to the graph
        if (!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        }
        return false;
    }

    /* FUNCTION
    Function to check if a point with the same coordinates already exists in the array
    */
    containsPoint(point) {
        // Loop through each point p and check if it is equal to the point passed in
        return this.points.find((p) => p.equals(point));
    }

    /* FUNCTION
    Function to draw the graph on the canvas
    */
    draw(ctx) {
        // Loop through the segments array and draw it out
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        // Loop through the points array and draw it out
        for (const point of this.points) {
            point.draw(ctx);
        }
    }
}