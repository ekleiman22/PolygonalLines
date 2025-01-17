function drawCircle(circle, color = 'black') {
    let center = circle.center;
    let radius = circle.radius;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    drawPoint(center, color);
}

// Draw a line segment
function drawLine(p1, p2, color = 'blue') {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
}
// Draw a segment
function drawSegment(p1, p2, color = 'blue') {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}
// Draw a ray extending from point1 through point2
function drawRay(p1, p2, color = 'green') {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const scale = 1000; // Extend the ray far enough
    const extended = { x: p1.x + dx * scale, y: p1.y + dy * scale };
    drawLine(p1, extended, color);
}

// Draw a point
function drawPoint(point, color = 'red') {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}
function drawPointWithLabel(x, y, label) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.fillText(label, x + 5, y - 5);
}
// Draw an arc
function drawArcTo(p1, p2, radius, color = 'green') {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.arcTo(p1.x, p1.y,p2.x,p2.y, radius );
    ctx.strokeStyle = color;
    ctx.stroke();
}
function drawArc(center, radius, sAngle, eAngle, color = 'green') {
    ctx.beginPath();
   
    ctx.arc(center.x, center.y, radius, sAngle, eAngle,true);
    ctx.strokeStyle = color;
    ctx.stroke();
}

