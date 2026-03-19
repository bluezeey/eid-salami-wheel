const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultCard = document.getElementById("resultCard");
const resultText = document.getElementById("resultText");

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
const anglePerSegment = (2 * Math.PI) / totalSegments;

let currentRotation = 0;

// Draw Wheel
function drawWheel() {
  for (let i = 0; i < totalSegments; i++) {
    const startAngle = i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, startAngle, endAngle);
    ctx.fillStyle = colors[i];
    ctx.fill();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(startAngle + anglePerSegment / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "16px sans-serif";
    ctx.fillText(segments[i], 140, 5);
    ctx.restore();
  }
}

drawWheel();

// Probability Logic (80% → 20 & 50)
function getWeightedIndex() {
  let rand = Math.random();

  if (rand < 0.8) {
    // choose from 20 & 50
    const pool = [];
    segments.forEach((val, i) => {
      if (val === "২০ টাকা" || val === "৫০ টাকা") {
        pool.push(i);
      }
    });
    return pool[Math.floor(Math.random() * pool.length)];
  } else {
    // choose from 100 & 200
    const pool = [];
    segments.forEach((val, i) => {
      if (val === "১০০ টাকা" || val === "২০০ টাকা") {
        pool.push(i);
      }
    });
    return pool[Math.floor(Math.random() * pool.length)];
  }
}

// Spin Logic
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  resultCard.classList.add("hidden");

  const selectedIndex = getWeightedIndex();

  // calculate exact stopping angle
  const stopAngle =
    (3 * Math.PI / 2) - (selectedIndex * anglePerSegment) - (anglePerSegment / 2);

  const extraSpins = 6 * 2 * Math.PI; // 6 full spins
  const finalRotation = currentRotation + extraSpins + stopAngle;

  canvas.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
  canvas.style.transform = `rotate(${finalRotation}rad)`;

  currentRotation = finalRotation % (2 * Math.PI);

  setTimeout(() => {
    resultText.innerText = `আপনি পেয়েছেন: ${segments[selectedIndex]}`;
    resultCard.classList.remove("hidden");
    spinBtn.disabled = false;
  }, 4000);
});
