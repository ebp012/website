const canvas = document.getElementById("lakshmi");
const ctx = canvas.getContext("2d");
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const r = 160;
const letters = "H.Gr.P.A.T.M.°H.Vsh".split(".");
// Letters 1, 3, 5, 7 = red = base = hasta, pala, truti, hima
// Letters 2, 4, 6, 8 = odd = dimensionless = garami, ansha, matra, vishal

const points = [];

// Compute 8 points of the octagram
for (let i = 0; i < 8; i++) {
  const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
  const x = cx + r * Math.cos(angle);
  const y = cy + r * Math.sin(angle);
  points.push({ x, y });
}

// Draw radial lines to center (under main star)
ctx.strokeStyle = "#cccccc"; // light grey
ctx.lineWidth = 1;
ctx.beginPath();
for (let i = 0; i < 8; i++) {
  const { x, y } = points[i];
  ctx.moveTo(cx, cy);
  ctx.lineTo(x, y);
}
ctx.stroke();

// Draw the octagram (8/2 star)
ctx.strokeStyle = "gray";
ctx.lineWidth = 2;
ctx.beginPath();
for (let i = 0; i < 8; i++) {
  const from = points[i];
  const to = points[(i + 2) % 8];
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
}
ctx.stroke();

// Draw the node circles with letters
const colorA = "#FF6666"; // red-ish
const colorB = "#66B2FF"; // blue-ish
const radius = 18; // slightly smaller for tighter spacing

ctx.font = "16px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

for (let i = 0; i < 8; i++) {
  const { x, y } = points[i];
  const isA = i % 2 === 0;
  ctx.fillStyle = isA ? colorA : colorB;

  // Circle
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Letter
  ctx.fillStyle = "white";
  ctx.fillText(letters[i], x, y);
}

// Center circle with "60"
ctx.beginPath();
ctx.arc(cx, cy, 24, 0, Math.PI * 2);
ctx.fillStyle = "#734f96";
ctx.fill();

ctx.fillStyle = "white";
ctx.font = "18px sans-serif";
ctx.fillText("60", cx, cy);
