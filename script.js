// সব প্রয়োজনীয় উপাদান ধরে নিন
const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const spinButton = document.getElementById('spin');
const resultCard = document.createElement('div'); // ফলাফল কার্ডের জন্য HTML উপাদান তৈরি
resultCard.id = 'result-card'; // CSS এর সাথে মিলানোর জন্য ID
resultCard.innerHTML = `
    <p class="title">🎉 অভিনন্দন! আপনি পেয়েছেন:</p>
    <p class="amount" id="result-amount"></p>
`;
document.body.appendChild(resultCard); // কার্ডটি পেজে যোগ করুন
const resultAmountDisplay = document.getElementById('result-amount');

// সালামির অংক এবং কালার সেটআপ
// আধুনিক প্যাস্টেল কালার প্যালেট
const colors = ["#ff9f43", "#10ac84", "#2e86de", "#574b90", "#ee5253", "#c8d6e5"];
const segments = ["১০ টাকা", "৫০ টাকা", "১০০ টাকা", "৫০০ টাকা", "০ টাকা", "২০০ টাকা"];
const numSegments = segments.length;
const anglePerSegment = (2 * Math.PI) / numSegments;

// চাকা আঁকার ফাংশন (কোনো টেক্সট থাকবে না, শুধু কালার সেগমেন্ট)
function drawWheel() {
    ctx.clearRect(0, 0, wheel.width, wheel.height);
    for(let i=0; i<numSegments; i++){
        ctx.beginPath();
        ctx.moveTo(250,250);
        ctx.arc(250,250,250,i*anglePerSegment,(i+1)*anglePerSegment);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.strokeStyle = "#fff"; // সাদা বর্ডার
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}

drawWheel(); // পেজ লোড হলেই চাকা এঁকে ফেলুন

let spinning = false; // হুইল কি ঘুরছে?
let currentRotation = 0; // চাকার বর্তমান কোণ

spinButton.addEventListener('click', () => {
    if(spinning) return; // ঘুরলে আর কাজ করবে না
    spinning = true;
    
    // ফলাফল কার্ডটি লুকিয়ে ফেলুন এবং লেখা মুছে দিন
    resultCard.classList.remove('show');
    resultAmountDisplay.innerText = "";
    
    // ঘোরা শুরু
    const spins = 5 + Math.random() * 5; // ৫ থেকে ১০ বার ঘুরবে
    const degrees = spins * 360;
    currentRotation += degrees;

    wheel.style.transition = "transform 4s cubic-bezier(0.1, 0, 0.2, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // ৪ সেকেন্ড পর ঘোরা থামলে ফলাফল গণনা
    setTimeout(() => {
        const actualRotation = currentRotation % 360; // ৩৬০ এর ভেতরের কোণ বের করুন
        // কোন সেগমেন্ট পয়েন্টারের নিচে তা গণনা করুন
        const winningIndex = Math.floor((360 - actualRotation) / (360/numSegments)) % numSegments;
        
        // ফলাফল কার্ডে দেখিয়ে ফেলুন
        resultAmountDisplay.innerText = segments[winningIndex];
        resultCard.classList.add('show'); // কার্ডটি দেখান (CSS অ্যানিমেশন হবে)
        
        spinning = false; // আবার ঘুরানোর জন্য প্রস্তুত
    }, 4000); // ৪ সেকেন্ডের ট্রানজিশনের সাথে মেলাতে
});
