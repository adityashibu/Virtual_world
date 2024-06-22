class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    // For checking duplicate points
    addPoint(point) {
        this.points.push(point);
    }

    containsPoint(point) {
        return this.points.find((p) => p.equals(point));
    }

    tryAddPoint(point) {
        if (!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        } else {
            return false;
        }
    }

    // For checking duplicate segments
    addSegment(seg) {
        this.segments.push(seg);
    }

    containsSegment(seg) {
        return this.segments.find((s) => s.equals(seg));
    }

    tryAddSegment(seg) {
        if (!this.containsSegment) {
            this.addSegment(seg);
            return true;
        } else {
            return false;
        }
    }

    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx);
        }
    }
}