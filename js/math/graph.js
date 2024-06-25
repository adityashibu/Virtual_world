class Graph {
    // Pass in the points and segments that make up the graph
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    /* METHOD
    Method to handling the loading of graph from locally stored JSON Data
    */
    static load(info) {
        // Create an empty array to store the points
        const points = [];
        // Create an empty array to store the segments
        const segments = [];
        // For each pointInfo in the points in the JSON data
        for (const pointInfo of info.points) {
            // Create and push a new point with the coordinates of JSON data.x and JSON data.y
            points.push(new Point(pointInfo.x, pointInfo.y));
        }

        // Similarly for each segmentInfo in the segments in the JSON data
        for (const segInfo of info.segments) {
            segments.push(new Segment(segInfo.p1, segInfo.p2));
        }
        return new Graph(points, segments);
    }

    /*************************************************************
    * Points Implementation
    ************************************************************/
    /* METHOD
    Method to add a point to the points array
    */
    addPoint(point) {
        // Push the point into the points array
        this.points.push(point);
    }
    /* METHOD
    Method to remove a point from the points array
    */
    removePoint(point) {
        // Get all the segments that the point is a part of
        const segments = this.getSegmentsWithPoint(point);
        // Loop through each segment and remove it from the segments array
        for (const seg of segments) {
            this.removeSegment(seg);
        }

        // Remove 1 element from the index of the given segment, which would be the segment itself
        this.points.splice(this.points.indexOf(point), 1);
    }
    /* METHOD
    Method to try to add a point to the graph to make sure no duplicates are added
    */
    tryAddPoint(point) {
        // If this point is not already in the array, then add the point to the graph
        if (!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        }
        return false;
    }
    /* METHOD
    Method to check if a point with the same coordinates already exists in the array
    */
    containsPoint(point) {
        // Loop through each point p and check if it is equal to the point passed in
        return this.points.find((p) => p.equals(point));
    }


    /*************************************************************
    * Segments Implementation
    ************************************************************/
    /* METHOD
    Method to add a segment to the segments array
    */
    addSegment(seg) {
        // Push the segment into the segments array
        this.segments.push(seg);
    }
    /* METHOD
    Method to remove a segment from the segments array
    */
    removeSegment(seg) {
        // Remove 1 element from the index of the given segment, which would be the segment itself
        this.segments.splice(this.segments.indexOf(seg), 1);
    }
    /* METHOD
    Method to try to add a segment to the graph to make sure no duplicates are added
    */
    tryAddSegment(seg) {
        // If this segment is not already in the array, add it to the segments array and check if the points it's connecting are not the same to make sure it doesn't connect a point with itself
        if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
            this.addSegment(seg);
            return true;
        }
        return false;
    }
    /* METHOD
    Method to try to add a segment to the graph to make sure no duplicates are added
    */
    containsSegment(seg) {
        // Loop through each segment s and check if it is equal to the segment passed in
        return this.segments.find((s) => s.equals(seg));
    }
    /* METHOD
    Method to get all the segments that a point is a part of
    */
    getSegmentsWithPoint(point) {
        // Create an empty array to store the segments that include the point
        const segments = [];
        // Loop through each segment and check if it includes the point, if it does then push it to the empty array
        for (const seg of this.segments) {
            if (seg.includes(point)) {
                segments.push(seg);
            }
        }
        // return the array of segments that include the point
        return segments;
    }


    /*************************************************************
    * Visualization Implementation
    ************************************************************/
    /* METHOD
    Method to draw the graph on the canvas
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
    /* METHOD
    Method to clear the canvas
    */
    clear() {
        this.points.length = 0;
        this.segments.length = 0;
    }
}