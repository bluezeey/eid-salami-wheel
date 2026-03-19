const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const spinButton = document.getElementById('spin');
const resultBox = document.getElementById('result-box');
const resultAmount = document.getElementById('result-amount');

const segments = ["২০ টাকা", "২০ টাকা", "২০ টাকা", "২০ টাকা", "৫০ টাকা", "৫০ টাকা", "৫০ টাকা", "১০০ টাকা", "১০০ টাকা", "২০০ টাকা"];
const colors = ["#FF5733", "#C70039", "#900C3F", "#581845", "#2ECC71", "#27AE60", "#229954", "#3498DB", "#2980B9", "#F1C40F"];
const numSegments = segments.length;
const anglePerSegment = (2 * Math.PI) / numSegments;

function drawWheel() {
    ctx.clearRect(0, 0, wheel.width, wheel.height);
    for(let i=0; i<numSegments; i++){
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(250,250);
        ctx.arc(250,250,250,i*anglePerSegment,(i+1)*anglePerSegment);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.stroke();

        ctx.translate(250, 250);
        ctx.rotate(i * anglePerSegment + anglePerSegment / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 24px Arial";
        ctx.fillText(segments[i], 230, 10);
        ctx.restore();
    }
}
drawWheel();

let spinning = false;
let currentRotation = 0;

spinButton.addEventListener('click', () => {
    if(spinning) return;
    spinning = true;
    resultBox.style.display = "none";

    // ম্যাজিক: ০ থেকে ৬ ইনডেক্স মানে ২০ বা ৫০ টাকা
    const riggedIndexes = [0, 1, 2, 3, 4, 5, 6];
    const winningIndex = riggedIndexes[Math.floor(Math.random() * riggedIndexes.length)];
    
    const stopAt = 360 - (winningIndex * (360/numSegments)) - (180/numSegments);
    const extraSpins = 3600; // ১০ বার পূর্ণ ঘুরবে
    currentRotation += extraSpins + stopAt;

    wheel.style.transition = "transform 4s cubic-bezier(0.15, 0, 0.15, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        resultBox.style.display = "block";
        resultAmount.innerText = segments[winningIndex];
        spinning = false;
    }, 4000);
});
