// Look for min distance
function getNearestPoint(loc, points, threshold = Number.MAX_VALUE) {
    // Initialize minDist to the maximum possible value
    let minDist = Number.MAX_SAFE_INTEGER;
    // Initialize the nearest point to null
    let nearest = null;

    // Loop through each point in the points array
    for (const point of points) {
        // Calculate the distance between the current point and the location
        const dist = distance(point, loc);
        // If the distance is less than the minimum distance, then update the minimum distance and the nearest point and make sure the click is within the threshold 
        if (dist < minDist && dist < threshold) {
            minDist = dist;
            nearest = point;
        }
    }
    return nearest;
}

// Function to calculate the distance between two points
function distance(p1, p2) {
    // Use the Pythagorean theorem to calculate the distance between two points
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

// Function to add vectors
function add(p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
}

// Function to subtract vectors
function subtract(p1, p2) {
    return new Point(p1.x - p2.x, p1.y - p2.y);
}

// Function to scale a vector
function scale(p, scalar) {
    return new Point(p.x * scalar, p.y * scalar);
}

// Function to translate a point by a distance and an angle
function translate(loc, angle, offset) {
    return new Point(
        loc.x + Math.cos(angle) * offset,
        loc.y + Math.sin(angle) * offset
    );
}

// Function to calculate angle between two points
function angle(p) {
    return Math.atan2(p.y, p.x);
}

// Function to get intersection between A, B, C, D which are points
function getIntersection(A, B, C, D) {
    if (!A || !B || !C || !D) {
        return null;
    }
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t,
            };
        }
    }

    return null;
}

// Function to linearly interpolate between two values
function lerp(a, b, t) {
    return a + (b - a) * t;
}