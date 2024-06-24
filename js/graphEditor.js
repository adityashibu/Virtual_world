class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;

        this.ctx = this.canvas.getContext("2d");

        this.selected = null;
        this.hovered = null;
        this.dragging = false;

        this.#addEventListeners();
    }

    /* METHOD
    Private method to add event listeners to the canvas
    */
    #addEventListeners() {
        /* EVENT
        Listener to remove or add point from the graph when clicked
        */
        // Add event listener to listen for a mouse down event
        this.canvas.addEventListener("mousedown", (evt) => {
            // REMOVE POINT
            // Check if the right click was pressed
            if (evt.button == 2) {
                if (this.hovered) {
                    this.#removePoint(this.hovered);
                }
            }

            // ADD POINT
            if (evt.button == 0) {
                // On mouse down, store the coordinates of the mouse click to create a new point
                const mouse = new Point(evt.offsetX, evt.offsetY);
                // If the point is already selected then deselect, else select it
                if (this.hovered) {
                    this.selected = this.hovered;
                    // If left clicked on a point, then allow dragging the point to reposition it
                    this.dragging = true;
                    return;
                }
                // Now add a point at those coordinates
                this.graph.addPoint(mouse);
                // Set it as selected point
                this.selected = mouse;
                // Set it as the hovered point
                this.hovered = mouse;
            }
        });

        /* EVENT
        Listener to get the nearest point to the mouse click
        */
        // Add event listener to listen for a mouse move event
        this.canvas.addEventListener("mousemove", (evt) => {
            // On mouse down, store the coordinates of the mouse click to create a new point
            const mouse = new Point(evt.offsetX, evt.offsetY);
            // Get the point that is closest to the mouse click
            this.hovered = getNearestPoint(mouse, this.graph.points, 15);
            // If dragging is true, then update the selected point to the mouse coordinates
            if (this.dragging == true) {
                this.selected.x = mouse.x;
                this.selected.y = mouse.y;
            }
        });

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
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}   