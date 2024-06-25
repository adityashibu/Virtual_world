class Polygon {
    constructor(points) {
        this.points = points;
    }

    /* METHOD
    Method to draw the polygon on canvas with the specified width, color and design
    */
    draw(ctx, { stroke = "blue", lineWidth = 2, fill = "rgba(0, 0, 255, 0.3)" } = {}) {
        // Start drawing the polygon
        ctx.beginPath();
        // Set the fill style to the given fill
        ctx.fillStyle = fill;
        // Set the stroke style to the given stroke
        ctx.strokeStyle = stroke;
        // Set the line width to the given line width
        ctx.lineWidth = lineWidth;
        // Move the pen to the first point
        ctx.moveTo(this.points[0].x, this.points[0].y);
        // Loop through each point and draw a line to it
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        // Close the path
        ctx.closePath();
        // Fill the polygon
        ctx.fill();
        // Stroke the polygon
        ctx.stroke();
    }
}