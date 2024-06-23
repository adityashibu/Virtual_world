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