class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;

        this.ctx = this.canvas.getContext("2d");

        this.selected = null;

        this.#addEventListeners();
    }

    /* FUNCTION
    Private function to add event listeners to the canvas
    */
    #addEventListeners() {
        // Add event listener to listen for a mouse down event
        this.canvas.addEventListener("mousedown", (evt) => {
            // On mouse down, store the coordinates of the mouse click to create a new point
            const mouse = new Point(evt.offsetX, evt.offsetY);
            // Now add a point at those coordinates
            this.graph.addPoint(mouse);
            // Set it as selected point
            this.selected = mouse;
        });
    }

    /* FUNCTION
    Function to display the graph editor
    */
    display() {
        this.graph.draw(this.ctx);
        if (this.selected) {
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}   