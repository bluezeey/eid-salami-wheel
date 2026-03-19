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

const tot = sectors.length;
const arc = Math.PI / (tot / 2);
let ang = 0;

function drawSector(sector, i) {
    const angle = i * arc;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, angle, angle + arc);
    ctx.lineTo(250, 250);
    ctx.fill();
    ctx.stroke();

    ctx.translate(250, 250);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 22px Arial";
    ctx.fillText(sector.label, 230, 10);
    ctx.restore();
}

sectors.forEach(drawSector);

let isSpinning = false;

spinBtn.onclick = () => {
    if (isSpinning) return;
    isSpinning = true;
    resultCard.style.display = 'none';

    // ম্যাজিক: ২০ বা ৫০ টাকার ঘরগুলো (০ থেকে ৬ ইনডেক্স)
    const riggedIndices = [0, 1, 2, 3, 4, 5, 6];
    const winIdx = riggedIndices[Math.floor(Math.random() * riggedIndices.length)];
    
    // পয়েন্টার (উপরের দিকে -90 ডিগ্রি) অনুযায়ী ঘোরার সঠিক হিসাব
    const stopAngle = (winIdx * (360 / tot)) + (180 / tot);
    const totalRotation = (5 * 360) + (360 - stopAngle + 270);
    
    canvas.style.transition = "transform 4s cubic-bezier(0.1, 0, 0.2, 1)";
    canvas.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        amountDisplay.innerText = sectors[winIdx].label;
        resultCard.style.display = 'block';
        isSpinning = false;
        // রোটেশন রিসেট যেন পরেরবার ঠিক থাকে
        const finalDeg = totalRotation % 360;
        canvas.style.transition = "none";
        canvas.style.transform = `rotate(${finalDeg}deg)`;
    }, 4000);
};
