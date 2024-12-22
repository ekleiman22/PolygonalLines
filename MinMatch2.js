/**
 * Helper: Calculate Euclidean distance between two points
 */
function euclideanDistance(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

/**
 * Helper: Check if two segments intersect
 */
function segmentsIntersect(p1, q1, p2, q2) {
    function orientation(p, q, r) {
        const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
        if (val === 0) return 0; // Collinear
        return val > 0 ? 1 : 2; // Clockwise or Counterclockwise
    }

    const o1 = orientation(p1, q1, p2);
    const o2 = orientation(p1, q1, q2);
    const o3 = orientation(p2, q2, p1);
    const o4 = orientation(p2, q2, q1);

    // General case
    if (o1 !== o2 && o3 !== o4) return true;

    return false; // Doesn't intersect
}

/**
 * Step 1: Greedy Matching to Minimize Total Edge Length
 */
function greedyMatching(redPoints, bluePoints) {
    const pairs = [];
    const usedRed = new Set();
    const usedBlue = new Set();

    for (let i = 0; i < redPoints.length; i++) {
        let bestMatch = null;
        let minDistance = Infinity;

        for (let j = 0; j < bluePoints.length; j++) {
            if (usedBlue.has(j)) continue;

            const distance = euclideanDistance(redPoints[i], bluePoints[j]);
            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = j;
            }
        }

        if (bestMatch !== null) {
            pairs.push([redPoints[i], bluePoints[bestMatch]]);
            usedRed.add(i);
            usedBlue.add(bestMatch);
        }
    }

    return pairs;
}

/**
 * Step 2: Resolve Intersections
 */
function resolveIntersections(pairs) {
    let hasIntersections = true;

    while (hasIntersections) {
        hasIntersections = false;

        for (let i = 0; i < pairs.length; i++) {
            for (let j = i + 1; j < pairs.length; j++) {
                const [p1, q1] = pairs[i];
                const [p2, q2] = pairs[j];

                if (segmentsIntersect(p1, q1, p2, q2)) {
                    // Swap endpoints to try resolving
                    pairs[j] = [p2, q1];
                    pairs[i] = [p1, q2];
                    hasIntersections = true;
                }
            }
        }
    }

    return pairs;
}

/**
 * Main Function: Generate Points and Match
 */
function generateAndMatch(k) {
    const width = 800, height = 600; // Canvas size
    const redPoints = [];
    const bluePoints = [];

    // Generate random points
    for (let i = 0; i < k; i++) {
        redPoints.push([Math.random() * width, Math.random() * height]);
        bluePoints.push([Math.random() * width, Math.random() * height]);
    }

    // Step 1: Greedy Matching
    let pairs = greedyMatching(redPoints, bluePoints);

    // Step 2: Resolve Intersections
    pairs = resolveIntersections(pairs);

    return { redPoints, bluePoints, pairs };
}

/**
 * Visualization Function
 */
function visualize(redPoints, bluePoints, pairs) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw points
    redPoints.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    });

    bluePoints.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    });

    // Draw segments
    pairs.forEach(([red, blue]) => {
        ctx.beginPath();
        ctx.moveTo(red[0], red[1]);
        ctx.lineTo(blue[0], blue[1]);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
    });
}

/**
 * Main Execution
 */
document.getElementById('generateButton').addEventListener('click', () => {
    const k = parseInt(document.getElementById('numPoints').value, 10);
    const { redPoints, bluePoints, pairs } = generateAndMatch(k);
    visualize(redPoints, bluePoints, pairs);
});
