const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const spinButton = document.getElementById('spin');
const resultCard = document.getElementById('result-card');
const resultAmountDisplay = document.getElementById('result-amount');

// আপনার দেওয়া লিস্ট অনুযায়ী ১০টি সেগমেন্ট (৪টি ২০, ৩টি ৫০, ২টি ১০০, ১টি ২০০)
const segments = [
    "২০ টাকা", "২০ টাকা", "২০ টাকা", "২০ টাকা", 
    "৫০ টাকা", "৫০ টাকা", "৫০ টাকা", 
    "১০০ টাকা", "১০০ টাকা", 
    "২০০ টাকা"
];

// আধুনিক কালার প্যালেট
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

        // টাকার অংক আঁকা
        ctx.translate(250, 250);
        ctx.rotate(i * anglePerSegment + anglePerSegment / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px Arial";
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
    resultCard.classList.remove('show');

    // --- ম্যাজিক ট্রিক শুরু ---
    // ২০ এবং ৫০ টাকার ইনডেক্সগুলো খুঁজে বের করা (০ থেকে ৬ পর্যন্ত)
    const riggedIndexes = [0, 1, 2, 3, 4, 5, 6]; 
    const forcedWinningIndex = riggedIndexes[Math.floor(Math.random() * riggedIndexes.length)];
    
    // এমন একটি কোণ (Angle) বের করা যা সবসময় ঐ ইনডেক্সেই থামবে
    const segmentAngle = 360 / numSegments;
    const stopAt = 360 - (forcedWinningIndex * segmentAngle) - (segmentAngle / 2);
    
    // ৫ থেকে ১০ বার ফুল স্পিন হবে তারপর নির্দিষ্ট জায়গায় থামবে
    const extraSpins = (5 + Math.floor(Math.random() * 5)) * 360;
    currentRotation = extraSpins + stopAt;
    // --- ম্যাজিক ট্রিক শেষ ---

    wheel.style.transition = "transform 5s cubic-bezier(0.15, 0, 0.15, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        resultAmountDisplay.innerText = segments[forcedWinningIndex];
        resultCard.classList.add('show');
        spinning = false;
    }, 5000);
});
