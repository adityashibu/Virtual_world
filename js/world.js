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
        this.envelopes.length = 0;
        for (const seg of this.graph.segments) {
            this.envelopes.push(
                new Envelope(seg, this.roadWidth, this.roadRoundness)
            );
        }
    }

    /* METHOD
    Method to draw out the world on the canvas
    */
    draw() {
        for (const env of this.envelopes) {
            env.draw(ctx);
        }
    }
}