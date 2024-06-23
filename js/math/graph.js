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
    Function to check if a point with the same coordinates already exists in the array
    */
    containsPoint(point) {
        // Loop through each point p and check if it is equal to the point passed in
        return this.points.find((p) => p.equals(point));
    }

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