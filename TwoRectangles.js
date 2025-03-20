function checkRectangles() {
    const width1 = parseInt(document.getElementById('width1').value);
    const height1 = parseInt(document.getElementById('height1').value);
    const width2 = parseInt(document.getElementById('width2').value);
    const height2 = parseInt(document.getElementById('height2').value);
    const unit = 30;
    const penWidth = 2;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font size for labels
    ctx.font = '20px Arial';

    // Draw rectangle 1
    ctx.strokeStyle = 'black';
    ctx.lineWidth = penWidth;
    ctx.strokeRect(20, 20, width1 * unit, height1 * unit);

    // Draw labels for vertices of rectangle 1
    ctx.fillText('A1', 20, 20);
    ctx.fillText('B1', 20 + width1 * unit, 20);
    ctx.fillText('C1', 20 + width1 * unit, 20 + height1 * unit);
    ctx.fillText('D1', 20, 20 + height1 * unit);

    if (width2 <= width1 && height2 <= height1) {
        document.getElementById('result').innerText = "Rectangle 2 could fit inside rectangle 1";
        // Draw rectangle 2 inside rectangle 1
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(20 + (width1 - width2) * unit / 2, 20 + (height1 - height2) * unit / 2, width2 * unit, height2 * unit);
        // Draw labels for vertices of rectangle 2
        ctx.fillText('A2', 20 + (width1 - width2) * unit / 2, 20 + (height1 - height2) * unit / 2);
        ctx.fillText('B2', 20 + (width1 + width2) * unit / 2, 20 + (height1 - height2) * unit / 2);
        ctx.fillText('C2', 20 + (width1 + width2) * unit / 2, 20 + (height1 + height2) * unit / 2);
        ctx.fillText('D2', 20 + (width1 - width2) * unit / 2, 20 + (height1 + height2) * unit / 2);
        return;
    }

    // Calculations for rotated rectangle
    const angle_CAB = Math.atan2(height2, width2);
    const AC = Math.sqrt(Math.pow(width2, 2) + Math.pow(height2, 2));
    const FC = Math.sqrt(Math.pow(AC, 2) - Math.pow(height1, 2));
    const angle_FAC = Math.atan2(FC, height1);
    const angle_FAB = angle_CAB + angle_FAC;
    const angle_BAE = Math.PI / 2 - angle_FAB;
    const GE = (height2 * Math.sin(angle_BAE) + width2 * Math.cos(angle_BAE)) * unit;

    if (GE <= width1 * unit) {
        document.getElementById('result').innerText = "Rectangle 2 could fit inside rectangle 1";
        // Draw rotated rectangle 2 inside rectangle 1
        const baseMidPointX = (20 + (20 + width1 * unit)) / 2;
        const baseMidPointY = 20 + height1 * unit;
        //ctx.fillText('M', baseMidPointX, baseMidPointY);
        ctx.beginPath();
        ctx.arc(baseMidPointX, baseMidPointY, 2.5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();

        const G = { x: baseMidPointX - GE / 2, y: baseMidPointY };
        const E = { x: baseMidPointX + GE / 2, y: baseMidPointY };
        const A = { x: G.x + Math.floor(height2 * unit * Math.cos(angle_FAB)), y: baseMidPointY };
        const D = { x: G.x, y: G.y - Math.floor(height2 * unit * Math.sin(angle_FAB)) };
        const B = { x: E.x, y: E.y - Math.floor(width2 * unit * Math.sin(angle_BAE)) };
        const C = { x: A.x + Math.floor(FC * unit), y: 20 };

        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(A.x, A.y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText('A', A.x, A.y);

        ctx.beginPath();
        ctx.arc(D.x, D.y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText('D', D.x, D.y);

        ctx.beginPath();
        ctx.arc(B.x, B.y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText('B', B.x, B.y);

        ctx.beginPath();
        ctx.arc(C.x, C.y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText('C', C.x, C.y);

        ctx.strokeStyle = 'green';
        ctx.lineWidth = penWidth;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(D.x, D.y);
        ctx.lineTo(C.x, C.y);
        ctx.lineTo(B.x, B.y);
        ctx.lineTo(A.x, A.y);
        ctx.stroke();
    } else {
        document.getElementById('result').innerText = "Rectangle 2 could not fit inside rectangle 1";
    }
}
