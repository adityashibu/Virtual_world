class GraphEditor {
    constructor(viewport, graph) {
        this.viewport = viewport;
        this.canvas = viewport.canvas;
        this.graph = graph;

        this.ctx = this.canvas.getContext("2d");

        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;

        this.#addEventListeners();
    }

    /* METHOD
    Private method to add event listeners to the canvas
    */
    #addEventListeners() {
        /* EVENT
        Listener to remove or add point from the graph when clicked
        */
        // Add event listener to listen for a mouse down event, using bind to pass the context of the class
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));

        /* EVENT
        Listener to get the nearest point to the mouse click
        */
        // Add event listener to listen for a mouse move event
        this.canvas.addEventListener("mousemove", this.#handleMoveMove.bind(this));

        /* EVENT
        Listener to check if the context menu has opened
        */
        // Add event listener to listen for a mouse move event, in which case the context menu should not open
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());

        /* EVENT
        Listener to check if the mouse has been released
        */
        // Add event listener to listen for a mouse move event, in which case the context menu should not open
        this.canvas.addEventListener("mouseup", () => this.dragging = false);
    }

    /* METHOD
    Private method to handle a mouse down event
    */
    #handleMouseDown(evt) {
        // REMOVE POINT
        // Check if the right click was pressed
        if (evt.button == 2) {
            /// If the point is already selected then unselect it
            if (this.selected) {
                this.selected = null;
            }
            // If the point is hovered, then remove it
            else if (this.hovered) {
                this.#removePoint(this.hovered);
            }
        }

        // ADD POINT
        if (evt.button == 0) {
            // If the point is already selected then deselect, else select it
            if (this.hovered) {
                // If there is a selected point, then add a segment between the selected point and the hovered point
                this.#select(this.hovered);
                // If left clicked on a point, then allow dragging the point to reposition it
                this.dragging = true;
                return;
            }
            // Now add a point at those coordinates
            this.graph.addPoint(this.mouse);
            // If there was a previously selected point, then add a segment between the selected point and the new point
            this.#select(this.mouse);
            // Set it as the hovered point
            this.hovered = this.mouse;
        }
    }

    /* METHOD
    Private method to handle a mouse move event
    */
    #handleMoveMove(evt) {
        // On mouse down, store the coordinates of the mouse click to create a new point
        this.mouse = this.viewport.getMouse(evt);
        // Get the point that is closest to the mouse click
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 15 * this.viewport.zoom);
        // If dragging is true, then update the selected point to the mouse coordinates
        if (this.dragging == true) {
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }
    }

    /* METHOD
    Private method to select a point
    */
    #select(point) {
        if (this.selected) {
            this.graph.tryAddSegment(new Segment(this.selected, point))
        }
        this.selected = point;
    }

    /* METHOD
    Private method to remove a point (separate to account for point removal from segments)
    */
    #removePoint(point) {
        this.graph.removePoint(point);
        this.hovered = null;
        // If the selected point is the same as the point to be removed, then deselect it
        if (this.selected == point) {
            this.selected = null;
        }
    }

    /* METHOD
    Method to display the graph editor
    */
    display() {
        this.graph.draw(this.ctx);
        // If there is a hovered point, draw it with a fill
        if (this.hovered) {
            this.hovered.draw(this.ctx, { fill: true });
        }
        // If there is a selected point, draw it with an outline
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse;
            // If there is a selected point, then draw a segment between the selected point and the mouse
            new Segment(this.selected, intent).draw(ctx, { dash: [3, 3] });
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}   