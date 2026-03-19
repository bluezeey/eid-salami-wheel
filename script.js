const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");
const nameInput = document.getElementById("name");

// 🔥 এলোমেলোভাবে সাজানো (একসাথে না)
const items = ["২০ টাকা","৫০ টাকা","১০ টাকা","২০০ টাকা","৪০ টাকা","১০০ টাকা"];
const colors = ["#f87171","#fb923c","#facc15","#4ade80","#60a5fa","#a78bfa"];

const total = items.length;
const angle = 2 * Math.PI / total;

// 🎡 Draw Wheel
function drawWheel() {
  for (let i = 0; i < total; i++) {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, i * angle, (i + 1) * angle);
    ctx.fillStyle = colors[i];
    ctx.fill();

    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(i * angle + angle / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "15px Arial";
    ctx.fillText(items[i], 120, 10);
    ctx.restore();
  }
}

drawWheel();

let spinning = false;
let rotation = 0;

spinBtn.onclick = function () {
  if (spinning) return;
  spinning = true;

  // 🎯 সবসময় ৫০ টাকা তে থামবে
  let targetIndex = items.indexOf("৫০ টাকা");

  let extraSpins = 5; // বেশি ঘুরবে
  let targetAngle = (360 / total) * targetIndex;

  let randomOffset = Math.random() * 20; // একটু random feel

  let randomDeg = 360 * extraSpins + (360 - targetAngle) - randomOffset;

  rotation += randomDeg;

  canvas.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    let name = nameInput.value.trim();

    if (name) {
      result.innerText = name + " পেয়েছেন: ৫০ টাকা";
    } else {
      result.innerText = "আপনি পেয়েছেন: ৫০ টাকা";
    }

    spinning = false;
  }, 5000);
};
