const canvas = document.querySelector('.am-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
let halfWidth = width / 2;
let halfHeight = height / 2;
let stars = [];

const STAR_COUNT = 1000;
const MAX_DEPTH = 1000;
const SPEED = 3;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  halfWidth = width / 2;
  halfHeight = height / 2;

  canvas.width = width;
  canvas.height = height;

  generateStars();
}

function generateStars() {
  stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * MAX_DEPTH
  }));
}

function drawStars() {
  ctx.fillStyle = '#0001';
  ctx.fillRect(0, 0, width, height);

  for (const star of stars) {
    star.z += SPEED;
    if (star.z >= MAX_DEPTH) star.z = 0;

    const scale = MAX_DEPTH / star.z;
    const x = (star.x - halfWidth) * scale + halfWidth;
    const y = (star.y - halfHeight) * scale + halfHeight;
    const dist = Math.hypot(x - halfWidth, y - halfHeight);

    ctx.beginPath();
    ctx.arc(x, y, scale, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${dist % 360}, 100%, 50%)`;
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();
window.addEventListener('resize', resizeCanvas);
