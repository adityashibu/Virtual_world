class Segment {
    // Pass in the two points that need to be connected by the segment
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    /* METHOD
    Method to check if the given segment is the same as another segment
    */
    equals(seg) {
        // This would only be true if the x and y coordinates of the points are equal
        return this.includes(seg.p1) && this.includes(seg.p2);
    }

    /* METHOD
    Method to check if the given segment has a point that is the same as another point
    */
    includes(point) {
        // return true if this segment includes a point that is the same as p1 or p2
        return this.p1.equals(point) || this.p2.equals(point);
    }

    /* METHOD
    Method to draw the segment on canvas with the specified width and color
    */
    draw(ctx, width = 2, color = "black") {
        // Start drawing the segment
        ctx.beginPath();
        // Set the line width to the specified width
        ctx.lineWidth = width;
        // Set the stroke style to the specified color
        ctx.strokeStyle = color;
        // Move the pen to the first point
        ctx.moveTo(this.p1.x, this.p1.y);
        // Draw a line to the second point
        ctx.lineTo(this.p2.x, this.p2.y);
        // Stroke the line with the specified color
        ctx.stroke();
    }
}