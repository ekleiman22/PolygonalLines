// JavaScript program for drawing triangle features on a canvas

// Global variables for storing triangle vertices and lines
let vertices = [];
let lines = [];
let canvas, ctx;

window.onload = () => {
    canvas = document.getElementById('triangleCanvas');
    ctx = canvas.getContext('2d');

    // Event listener for mouse clicks to define triangle vertices
    canvas.addEventListener('click', handleCanvasClick);

    // Set up button event listeners
    document.getElementById('drawMedians').addEventListener('click', drawMedians);
    document.getElementById('drawBisectors').addEventListener('click', drawBisectors);
    document.getElementById('drawHeights').addEventListener('click', drawHeights);
    document.getElementById('clearLines').addEventListener('click', clearLines);
};

function handleCanvasClick(event) {
    if (vertices.length >= 3) return; // Only allow 3 vertices

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    vertices.push({ x, y });
    drawPointWithLabel(x, y, `P${vertices.length}`);

    if (vertices.length === 3) {
        drawTriangle();
    }
}



function drawTriangle() {
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    vertices.forEach((v, i) => {
        const next = vertices[(i + 1) % vertices.length];
        ctx.lineTo(next.x, next.y);       
    });
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawMedians() {
    clearLines();
    const centroid = calculateCentroid();
    //This code draw medians until centroid only
    //vertices.forEach(v => {
    //    drawLine(v, centroid, 'blue');
    //});
    //So I replaced by the following code
    for (let i = 0; i < 3; i++) {
        let u = vertices[i];
        let v = vertices[(i + 1) % 3];
        let w = vertices[(i + 2) % 3];
        let m = midpoint(v, w);
        drawLine(u, m, 'blue');
    }
    drawPointWithLabel(centroid.x, centroid.y, 'Centroid');
}

function drawBisectors() {
    clearLines();
    vertices.forEach((v, i) => {
        const angleVertex = v;
        const side1 = vertices[(i + 1) % 3];
        const side2 = vertices[(i + 2) % 3];
        const bisectorPoint = calculateAngleBisector(angleVertex, side1, side2);
        drawLine(angleVertex, bisectorPoint, 'green');
    });
}

function drawHeights() {
    clearLines();
    const orthocenter = calculateOrthocenter();
    vertices.forEach((v, i) => {
        const base1 = vertices[(i + 1) % 3];
        const base2 = vertices[(i + 2) % 3];
        const height = calculatePerpendicular(v, base1, base2);
        drawLine(v, height, 'red');
    });
    drawPointWithLabel(orthocenter.x, orthocenter.y, 'Orthocenter');
}

function clearLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTriangle();
    for (var i = 0; i < 3; i++) {
        drawPointWithLabel(vertices[i].x, vertices[i].y, `P${i+1}`);
    }
}



function calculateCentroid() {
    const x = (vertices[0].x + vertices[1].x + vertices[2].x) / 3;
    const y = (vertices[0].y + vertices[1].y + vertices[2].y) / 3;
    return { x, y };
}

function calculateAngleBisector(vertex, side1, side2) {
    const circleRadius = distance(vertex, side1) / 2; // Radius is half the side length

    // Circle c1 centered at the angle vertex
    const m = calculatePointOnLine(vertex, side1, circleRadius);
    const n = calculatePointOnLine(vertex, side2, circleRadius);

    // Midpoint of segment MN
    const p = midpoint(m, n);

    // Extend ray from vertex through P to find intersection Q with opposite side
    const oppositeSide = [side1, side2];
    const q = extendRayToIntersect(vertex, p, oppositeSide);

    return q;
}

function calculatePointOnLine(p1, p2, distance) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;
    return { x: p1.x + unitX * distance, y: p1.y + unitY * distance };
}

function calculatePerpendicular(point, base1, base2) {
    const dx = base2.x - base1.x;
    const dy = base2.y - base1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;
    const projection = ((point.x - base1.x) * unitX + (point.y - base1.y) * unitY);
    return { x: base1.x + projection * unitX, y: base1.y + projection * unitY };
}

function calculateOrthocenter() {
    const height1 = calculatePerpendicular(vertices[0], vertices[1], vertices[2]);
    const height2 = calculatePerpendicular(vertices[1], vertices[0], vertices[2]);
    return findIntersection(vertices[0], height1, vertices[1], height2);
}



function extendRayToIntersect(p1, p2, side) {
    const [s1, s2] = side;
    return findIntersection(p1, p2, s1, s2);
}



