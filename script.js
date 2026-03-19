const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const spinButton = document.getElementById('spin');
const result = document.getElementById('result');

const segments = ["১০ টাকা", "৫০ টাকা", "১০০ টাকা", "৫০০ টাকা", "০ টাকা", "২০০ টাকা"];
const colors = ["#ffffff", "#eeeeee", "#dddddd", "#cccccc", "#bbbbbb", "#aaaaaa"];
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
        ctx.strokeStyle = "#000";
        ctx.stroke();

        ctx.save();
        ctx.translate(250,250);
        ctx.rotate(i*anglePerSegment + anglePerSegment/2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#000";
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
    result.innerText = "";
    const spins = 5 + Math.random() * 5;
    currentRotation += spins * 360;
    wheel.style.transition = "transform 4s cubic-bezier(0.1, 0, 0.2, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        const actualRotation = currentRotation % 360;
        const winningIndex = Math.floor((360 - actualRotation) / (360/numSegments)) % numSegments;
        result.innerText = "আপনি পেয়েছেন: " + segments[winningIndex] + " 🎉";
        spinning = false;
    }, 4000);
});

