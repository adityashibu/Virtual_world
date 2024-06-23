class Point {
    // Pass in the x and y coordinates of the point
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Draw the point on the canvas, with the specified size (default 18) and color (default black)
    draw(ctx, size = 18, color = "black") {
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
    }
}