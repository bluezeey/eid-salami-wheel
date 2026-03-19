const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const amountDisplay = document.getElementById('amount');
const resultCard = document.getElementById('resultCard');

const sectors = [
    { label: "২০ টাকা", color: "#FF5733" },
    { label: "২০ টাকা", color: "#C70039" },
    { label: "২০ টাকা", color: "#900C3F" },
    { label: "২০ টাকা", color: "#581845" },
    { label: "৫০ টাকা", color: "#2ECC71" },
    { label: "৫০ টাকা", color: "#27AE60" },
    { label: "৫০ টাকা", color: "#229954" },
    { label: "১০০ টাকা", color: "#3498DB" },
    { label: "১০০ টাকা", color: "#2980B9" },
    { label: "২০০ টাকা", color: "#F1C40F" }
];

const totalSectors = sectors.length;
const arc = 2 * Math.PI / totalSectors;

function drawWheel() {
    sectors.forEach((sector, i) => {
        const angle = i * arc;
        ctx.beginPath();
        ctx.fillStyle = sector.color;
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, angle, angle + arc);
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 22px Arial";
        ctx.fillText(sector.label, 230, 10);
        ctx.restore();
    });
}

drawWheel();

let currentRotation = 0;

spinBtn.onclick = () => {
    spinBtn.disabled = true;
    resultCard.style.display = 'none';

    // ম্যাজিক: ০ থেকে ৬ ইনডেক্স মানে ২০ বা ৫০ টাকা
    const winIdx = Math.floor(Math.random() * 7);
    const sectorAngle = 360 / totalSectors;
    
    // পয়েন্টার ঠিক উপরে থাকায় রেজাল্ট মিলানোর হিসাব
    const stopAt = 360 - (winIdx * sectorAngle) - (sectorAngle / 2);
    currentRotation += (360 * 5) + stopAt;

    canvas.style.transition = "transform 4s cubic-bezier(0.1, 0, 0.2, 1)";
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        amountDisplay.innerText = sectors[winIdx].label;
        resultCard.style.display = 'block';
        spinBtn.disabled = false;
    }, 4000);
};
