class Polygon {
    constructor(points) {
        this.points = points;
        this.segments = [];
        for (let i = 0; i <= points.length; i++) {
            this.segments.push(
                new Segment(points[i - 1], points[i % points.length])
            );
        }
    }

    /* METHOD
    Static method that take two polygons and returns the intersection of the two polygons
    */
    static break(poly1, poly2) {
        // Get the segments of the polygons
        const segs1 = poly1.segments;
        const segs2 = poly2.segments;
        // Define an empty array to store the intersections
        const intersections = [];

        // Iterate over the segments of the first polygon
        for (let i = 0; i < segs1.length; i++) {
            // Iterate over the segments of the second polygon
            for (let j = 0; j < segs2.length; j++) {
                // Get the intersection of the two segments
                const int = getIntersection(
                    segs1[i].p1, segs1[i].p2, segs2[j].p1, segs2[j].p2
                );

                // If the intersection is not null and the offset is not 0 or 1
                if (int && int.offset != 1 && int.offset != 0) {
                    // Create a new Point at that intersection
                    const point = new Point(int.x, int.y);
                    // Push the point to the intersections array
                    intersections.push(point);
                }
            }
        }

        return intersections;
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