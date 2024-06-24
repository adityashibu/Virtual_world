class ViewPort {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.zoom = 1;

        this.#addEventListeners();
    }

    /* METHOD
    Private method to get mouse information
    */
    getMouse(evt) {
        return new Point(
            evt.offsetX * this.zoom,
            evt.offsetY * this.zoom,
        )
    }

    /* METHOD
    Private method to add event listeners to the canvas
    */
    #addEventListeners() {
        /* EVENT
        Listener to zoom in or out of the canvas
        */
        // Add event listener to listen for a mouse wheel event
        this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
    }

    /* METHOD
    Private method to handle a mouse wheel event
    */
    #handleMouseWheel(evt) {
        // Get the direction of the scroll, positive for zoom in and negative for zoom out
        const dir = Math.sign(evt.deltaY);
        // Set the step for zooming, to slow down the zoom
        const step = 0.1;
        // Clamp the zoom between 1 and 5 points
        this.zoom = Math.max(1, Math.min(5, this.zoom));
        // Increase or decrease the zoom based on the direction of the scroll
        this.zoom += dir * step;
    }
}
