const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultCard = document.getElementById("resultCard");
const resultText = document.getElementById("resultText");
const spinSound = document.getElementById("spinSound");

// Wheel segments
const segments = [
  "২০ টাকা","1000 টাকা","500 টাকা","২০০ টাকা","2500 টাকা",
  "২০ টাকা","1200 টাকা","3000 টাকা","২০ টাকা","800 টাকা"
];

const colors = [
  "#ff4d4d","#ff9933","#ffcc00","#33cc33",
  "#3399ff","#9933ff","#ff66cc",
  "#00cccc","#ff6600","#cc0000"
];

const totalSegments = segments.length;
const anglePerSegment = 360 / totalSegments;
let currentRotation = 0;

// Draw Wheel
function drawWheel() {
  for (let i = 0; i < totalSegments; i++) {
    const startAngle = i * anglePerSegment * Math.PI/180;
    const endAngle = (i+1) * anglePerSegment * Math.PI/180;

    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.arc(150,150,150,startAngle,endAngle);
    ctx.fillStyle = colors[i];
    ctx.fill();

    ctx.save();
    ctx.translate(150,150);
    ctx.rotate(startAngle + (endAngle-startAngle)/2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "14px sans-serif";
    ctx.fillText(segments[i],130,5);
    ctx.restore();
  }
}

drawWheel();

// Spin
spinBtn.addEventListener("click", ()=>{
  spinBtn.disabled = true;
  resultCard.classList.add("hidden");

  // 20 টাকার একটি segment randomly pick
  let twentyIndexes = [];
  segments.forEach((s,i)=>{ if(s==="২০ টাকা") twentyIndexes.push(i); });
  const selectedIndex = twentyIndexes[Math.floor(Math.random()*twentyIndexes.length)];

  const segmentCenter = selectedIndex*anglePerSegment + anglePerSegment/2;
  const targetAngle = 360 - segmentCenter + 90;

  // ৪–৫ বার ঘুরবে
  const extraSpins = 360* (4 + Math.floor(Math.random()*2));

  const finalRotation = currentRotation + extraSpins + targetAngle;

  canvas.style.transition = "transform 4s cubic-bezier(0.33,1,0.68,1)";
  canvas.style.transform = `rotate(${finalRotation}deg)`;

  spinSound.currentTime = 0;
  spinSound.play();

  currentRotation = finalRotation % 360;

  canvas.addEventListener("transitionend", function handler(){
    resultText.innerText = `আপনি পেয়েছেন: ২০ টাকা`;
    resultCard.classList.remove("hidden");
    spinBtn.disabled = false;
    canvas.removeEventListener("transitionend", handler);
  });
});
