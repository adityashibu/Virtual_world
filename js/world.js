class World {
    constructor(graph, roadWidth = 100, roadRoundness = 3) {
        this.graph = graph;
        this.roadWidth = roadWidth;
        this.roadRoundness = roadRoundness;

        this.envelopes = [];

        this.generate();
    }

    /* METHOD
    Method to generate the envelopes for the world
    */
    generate() {
        // Clear the envelopes
        this.envelopes.length = 0;
        // Iterate over the segments to create the envelopes
        for (const seg of this.graph.segments) {
            // Create a new envelope for the segment
            this.envelopes.push(
                // Create a new envelope for the segment
                new Envelope(seg, this.roadWidth, this.roadRoundness)
            );
        }

        // Create the intersections
        this.intersections = Polygon.break(
            this.envelopes[0].poly,
            this.envelopes[1].poly
        );
    }

    /* METHOD
    Method to draw out the world on the canvas
    */
    draw() {
        // Iterate over the envelopes to draw them
        for (const env of this.envelopes) {
            env.draw(ctx);
        }
        // Iterate over the intersections to draw them
        for (const int of this.intersections) {
            int.draw(ctx);
        }
    }
}