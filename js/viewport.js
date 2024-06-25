class ViewPort {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.zoom = 1;
        this.center = new Point(canvas.width / 2, canvas.height / 2);
        this.offset = scale(this.center, -1);

        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        }

        this.#addEventListeners();
    }

    /* METHOD
    Method to reset the viewport
    */
    reset() {
        this.ctx.restore();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.center.x, this.center.y);
        this.ctx.scale(1 / this.zoom, 1 / this.zoom);
        const offset = this.getOffset();
        this.ctx.translate(offset.x, offset.y);
    }


    /* METHOD
    Private method to get mouse information
    */
    getMouse(evt, subtractDragOffSet = false) {
        const p = new Point(
            // Get the x and y coordinates of the mouse and scale them based on the zoom and offset, considering the center of the canvas
            (evt.offsetX - this.center.x) * this.zoom - this.offset.x,
            (evt.offsetY - this.center.y) * this.zoom - this.offset.y,
        );
        // If subtractDragOffSet is true, then subtract the offset of the drag
        return subtractDragOffSet ? subtract(p, this.drag.offset) : p;
    }

    /* METHOD
    Private method to get offset information
    */
    getOffset(evt) {
        return add(this.offset, this.drag.offset);
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
        /* EVENT
        Listener to zoom in or out of the canvas
        */
        // Add event listener to listen for a mouse down event
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        /* EVENT
        Listener to zoom in or out of the canvas
        */
        // Add event listener to listen for a mouse move event
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        /* EVENT
        Listener to zoom in or out of the canvas
        */
        // Add event listener to listen for a mouse up event
        this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
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

    /* METHOD
    Private method to handle a mouse down event
    */
    #handleMouseDown(evt) {
        // Check if it's the middle mouse button that is being clicks
        if (evt.button == 1) { // Middle button
            // Set the start point of the drag to the current mouse position
            this.drag.start = this.getMouse(evt);
            // Set the drag is active flag to true
            this.drag.active = true;
        }
    }

    /* METHOD
    Private method to handle a mouse move event
    */
    #handleMouseMove(evt) {
        if (this.drag.active) {
            // Set the end point of the drag to the current mouse position
            this.drag.end = this.getMouse(evt);
            // Calculate the offset of the drag
            this.drag.offset = subtract(this.drag.end, this.drag.start);
        }
    }

    /* METHOD
    Private method to handle a mouse up event
    */
    #handleMouseUp(evt) {
        // If the screen is being dragged then
        if (this.drag.active) {
            // Add the offset of the drag to the current offset
            this.offset = add(this.offset, this.drag.offset);
            this.drag = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false
            }
        }
    }
}
