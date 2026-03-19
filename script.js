const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const spinButton = document.getElementById('spin');
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
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        ctx.translate(250, 250);
        ctx.rotate(i * anglePerSegment + anglePerSegment / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 22px Arial";
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
    resultAmount.innerText = "...";

    // ম্যাজিক ট্রিক: ০ থেকে ৬ ইনডেক্সের মধ্যে (২০ ও ৫০ টাকা) থামবে
    const riggedIndexes = [0, 1, 2, 3, 4, 5, 6];
    const winningIndex = riggedIndexes[Math.floor(Math.random() * riggedIndexes.length)];
    
    const segmentAngle = 360 / numSegments;
    const stopAt = 360 - (winningIndex * segmentAngle) - (segmentAngle / 2);
    const extraSpins = (5 + Math.floor(Math.random() * 5)) * 360;
    currentRotation += extraSpins + stopAt;

    wheel.style.transition = "transform 4s cubic-bezier(0.15, 0, 0.15, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        resultAmount.innerText = segments[winningIndex];
        spinning = false;
    }, 4000);
});
