class Envelope {
    constructor(skeleton, width) {
        this.skeleton = skeleton;
        this.poly = this.#generatePolygon(width);
    }

    /* METHOD
    Private method to create a polygon around the skeleton
    */
    #generatePolygon(width) {
        const { p1, p2 } = this.skeleton;

        // Get the radius of the envelope
        const radius = width / 2;
        // Get the angle between the two points
        const alpha = angle(subtract(p1, p2));
        // Get the points that are radius distance away from the skeleton in the clockwise direction
        const alpha_cw = alpha + Math.PI / 2;
        // Get the points that are radius distance away from the skeleton in the counter clockwise direction
        const alpha_ccw = alpha - Math.PI / 2;

        // Define some test points
        const p1_ccw = translate(p1, alpha_ccw, radius);
        const p2_ccw = translate(p2, alpha_ccw, radius);
        const p2_cw = translate(p2, alpha_cw, radius);
        const p1_cw = translate(p1, alpha_cw, radius);

        // Create a step to create the envelope
        const step = Math.PI / 3;
        // Define an empty array to store the points
        const points = []
        // Iterate over the angles to create the envelope
        for (let i = alpha_ccw; i <= alpha_cw; i += step) {
            points.push(translate(p1, i, radius));
        }

        return new Polygon([p1_ccw, p2_ccw, p2_cw, p1_cw]);
    }

    /* METHOD
    Method to draw the envelope on the canvas
    */
    draw(ctx) {
        this.poly.draw(ctx);
    }
}