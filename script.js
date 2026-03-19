const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const spinButton = document.getElementById('spin');
const resultAmountDisplay = document.getElementById('result-amount');

// ১০টি সেগমেন্ট আপনার রিকোয়েস্ট অনুযায়ী
const segments = ["২০ টাকা", "২০ টাকা", "২০ টাকা", "২০ টাকা", "৫০ টাকা", "৫০ টাকা", "৫০ টাকা", "১০০ টাকা", "১০০ টাকা", "২০০ টাকা"];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A1", "#33FFF3", "#FF8C00", "#8A2BE2", "#00CED1", "#FFD700"];
const numSegments = segments.length;
const anglePerSegment = (2 * Math.PI) / numSegments;

function drawWheel() {
    ctx.clearRect(0, 0, wheel.width, wheel.height);
    for(let i=0; i<numSegments; i++){
        ctx.beginPath();
        ctx.moveTo(250,250);
        ctx.arc(250,250,250,i*anglePerSegment,(i+1)*anglePerSegment);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        ctx.save();
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

    // ম্যাজিক ট্রিক: ২০ ও ৫০ টাকার ইনডেক্স (০ থেকে ৬)
    const riggedIndexes = [0, 1, 2, 3, 4, 5, 6];
    const forcedWinningIndex = riggedIndexes[Math.floor(Math.random() * riggedIndexes.length)];
    
    const segmentAngle = 360 / numSegments;
    const stopAt = 360 - (forcedWinningIndex * segmentAngle) - (segmentAngle / 2);
    const extraSpins = (5 + Math.floor(Math.random() * 5)) * 360;
    currentRotation += extraSpins + stopAt;

    wheel.style.transition = "transform 4s cubic-bezier(0.15, 0, 0.15, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        resultAmountDisplay.innerText = segments[forcedWinningIndex];
        spinning = false;
    }, 4000);
});
