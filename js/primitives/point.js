class Point {
    // Pass in the x and y coordinates of the point
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /* FUNCTION
    Function to check if the given point is the same as another point
    */
    equals(point) {
        // This would only be true if the x and y coordinates of the points are equal
        return this.x == point.x && this.y == point.y;
    }

    /* FUNCTION
    Function to draw the point on the canvas, with the specified size (default 18) and color (default black)
    */
    draw(ctx, { size = 18, color = "black", outline = false } = {}) {
        // Define the radius of the point, which would be half of the size of the point
        const rad = size / 2;
        // Begin drawing the point
        ctx.beginPath();
        // Set the fill style to the specified color
        ctx.fillStyle = color;
        // Draw the point as a circle with the specified radius, the function is used in radians, hence Math.PI * 2 for 360 degrees
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
        // Fill the point with the specified color
        ctx.fill();
        // If there is an outline parameter specified, then draw an outline for the point
        if (outline) {
            // Begin drawing the outline
            ctx.beginPath();
            // Set line width to 2
            ctx.lineWidth = 2;
            // Set the stroke style to black
            ctx.strokeStyle = "yellow";
            // Draw a new arc to create an outline for the point
            ctx.arc(this.x, this.y, rad * 0.5, 0, Math.PI * 2);
            // Stroke the outline with the specified color
            ctx.stroke();
        }
    }
}