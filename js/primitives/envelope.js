class Envelope {
    constructor(skeleton, width, roundness = 1) {
        this.skeleton = skeleton;
        this.poly = this.#generatePolygon(width, roundness);
    }

    /* METHOD
    Private method to create a polygon around the skeleton
    */
    #generatePolygon(width, roundness) {
        const { p1, p2 } = this.skeleton;

        // Get the radius of the envelope
        const radius = width / 2;
        // Get the angle between the two points
        const alpha = angle(subtract(p1, p2));
        // Get the points that are radius distance away from the skeleton in the clockwise direction
        const alpha_cw = alpha + Math.PI / 2;
        // Get the points that are radius distance away from the skeleton in the counter clockwise direction
        const alpha_ccw = alpha - Math.PI / 2;


        // Define an empty array to store the points
        const points = []
        // Create a step to create the envelope
        const step = Math.PI / Math.max(1, roundness);
        // Create an epsilon to avoid floating point errors
        const eps = step / 2;
        // Iterate over the angles to create the envelope
        for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
            points.push(translate(p1, i, radius));
        }
        // Iterate over the angles to create the envelope, but this time for p2
        for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
            points.push(translate(p2, Math.PI + i, radius));
        }

        return new Polygon(points);
    }

    /* METHOD
    Method to draw the envelope on the canvas
    */
    draw(ctx) {
        this.poly.draw(ctx);
    }
}