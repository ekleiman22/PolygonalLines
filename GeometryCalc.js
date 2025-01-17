class Circle {
    constructor(center, r) {
        this.center = center;
        this.radius = r;
        if (typeof circles !== "undefined")
        this.id = circles.length;
    }
}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }
}
// Function to calculate distance between two points
function distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}
// Find the midpoint of two points
function midpoint(p1, p2) {
    return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
}
// Find intersection of two circles
function circleIntersections(c1, c2) {
    let r1 = c1.radius;
    let r2 = c2.radius;
    let cnt1 = c1.center;
    let cnt2 = c2.center;
    const d = distance(c1.center, c2.center);
    if (d > r1 + r2 || d < Math.abs(r1 - r2)) return []; // No intersection

    const a = (r1 ** 2 - r2 ** 2 + d ** 2) / (2 * d);
    const h = Math.sqrt(r1 ** 2 - a ** 2);
    const p2 = {
        x: cnt1.x + a * (cnt2.x - cnt1.x) / d,
        y: cnt1.y + a * (cnt2.y - cnt1.y) / d,
    };

    return [
        { x: p2.x + h * (cnt2.y - cnt1.y) / d, y: p2.y - h * (cnt2.x - cnt1.x) / d },
        { x: p2.x - h * (cnt2.y - cnt1.y) / d, y: p2.y + h * (cnt2.x - cnt1.x) / d },
    ];
}
function findIntersection(p1, p2, q1, q2) {
    const a1 = p2.y - p1.y;
    const b1 = p1.x - p2.x;
    const c1 = a1 * p1.x + b1 * p1.y;

    const a2 = q2.y - q1.y;
    const b2 = q1.x - q2.x;
    const c2 = a2 * q1.x + b2 * q1.y;

    const determinant = a1 * b2 - a2 * b1;

    if (Math.abs(determinant) < 1e-10) {
        return null; // Lines are parallel or coincident
    }

    const x = (b2 * c1 - b1 * c2) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;
    return { x, y };
}
function intersectCircleWithAxis(circle,axis,delta) {
    let x = 0;
    let y = 0;
    if (axis == 'x') {
        x = circle.center.x + Math.sqrt(circle.radius ** 2 - (circle.center.y - delta) ** 2);
        y = delta;
    }
    else {
        y = circle.center.y + Math.sqrt(circle.radius ** 2 - (circle.center.x - delta) ** 2);
        x = delta;
    }
    let p = new Point(x, y);
    return p;
}





