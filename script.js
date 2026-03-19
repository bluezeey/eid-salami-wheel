const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultCard = document.getElementById("resultCard");
const resultText = document.getElementById("resultText");
const spinSound = document.getElementById("spinSound");

const segments = [
  "২০ টাকা","২০ টাকা","২০ টাকা","২০ টাকা",
  "৫০ টাকা","৫০ টাকা","৫০ টাকা",
  "১০০ টাকা","১০০ টাকা",
  "২০০ টাকা"
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
    const startAngle = (i * anglePerSegment) * Math.PI / 180;
    const endAngle = ((i + 1) * anglePerSegment) * Math.PI / 180;

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, startAngle, endAngle);
    ctx.fillStyle = colors[i];
    ctx.fill();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(startAngle + (endAngle - startAngle) / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "14px sans-serif";
    ctx.fillText(segments[i], 130, 5);
    ctx.restore();
  }
}

drawWheel();

// Probability (80%)
function getWeightedIndex() {
  let rand = Math.random();
  if (rand < 0.8) {
    return Math.floor(Math.random() * 7); // ২০ & ৫০
  } else {
    return 7 + Math.floor(Math.random() * 3); // ১০০ & ২০০
  }
}

// Spin
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  resultCard.classList.add("hidden");

  const selectedIndex = getWeightedIndex();

  const segmentCenter = selectedIndex * anglePerSegment + anglePerSegment / 2;
  const targetAngle = 360 - segmentCenter + 90; // pointer fix

  const extraSpins = 360 * 6;
  const finalRotation = currentRotation + extraSpins + targetAngle;

  canvas.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
  canvas.style.transform = `rotate(${finalRotation}deg)`;

  // Play embedded sound
  spinSound.currentTime = 0;
  spinSound.play();

  currentRotation = finalRotation % 360;

  canvas.addEventListener("transitionend", function handler() {
    resultText.innerText = `আপনি পেয়েছেন: ${segments[selectedIndex]}`;
    resultCard.classList.remove("hidden");
    spinBtn.disabled = false;
    canvas.removeEventListener("transitionend", handler);
  });
});
