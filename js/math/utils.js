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

// Calculate angle between two points
function angle(p) {
    return Math.atan2(p.y, p.x);
}