const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');

async function generateStoreIcon() {
  const canvas = createCanvas(512, 512);
  const ctx = canvas.getContext('2d');

  // Rounded square clip
  ctx.beginPath();
  ctx.roundRect(0, 0, 512, 512, 90);
  ctx.clip();

  // Sky gradient background
  const sky = ctx.createLinearGradient(0, 0, 0, 512);
  sky.addColorStop(0, '#1E90FF');
  sky.addColorStop(0.6, '#56C8F5');
  sky.addColorStop(1, '#AEE8FF');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 512, 512);

  // Sun
  ctx.fillStyle = '#FFD740';
  ctx.beginPath();
  ctx.arc(400, 100, 52, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFE566';
  ctx.beginPath();
  ctx.arc(400, 100, 42, 0, Math.PI * 2);
  ctx.fill();
  // Sun rays
  ctx.strokeStyle = '#FFE066';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(400 + Math.cos(a) * 58, 100 + Math.sin(a) * 58);
    ctx.lineTo(400 + Math.cos(a) * 74, 100 + Math.sin(a) * 74);
    ctx.stroke();
  }

  // Back hill
  ctx.fillStyle = '#A5D6A7';
  ctx.beginPath();
  ctx.moveTo(0, 512);
  ctx.bezierCurveTo(128, 260, 384, 260, 512, 512);
  ctx.closePath();
  ctx.fill();

  // Mid hill
  ctx.fillStyle = '#66BB6A';
  ctx.beginPath();
  ctx.moveTo(0, 512);
  ctx.bezierCurveTo(80, 310, 280, 290, 400, 360);
  ctx.bezierCurveTo(450, 390, 490, 350, 512, 512);
  ctx.closePath();
  ctx.fill();

  // Front hill
  ctx.fillStyle = '#43A047';
  ctx.beginPath();
  ctx.moveTo(0, 512);
  ctx.bezierCurveTo(100, 380, 240, 360, 320, 390);
  ctx.bezierCurveTo(400, 420, 460, 370, 512, 400);
  ctx.lineTo(512, 512);
  ctx.closePath();
  ctx.fill();

  // Owl body
  const ox = 200, oy = 290;
  // Body
  ctx.fillStyle = '#795548';
  ctx.beginPath();
  ctx.ellipse(ox, oy + 60, 52, 68, 0, 0, Math.PI * 2);
  ctx.fill();
  // Belly
  ctx.fillStyle = '#D7CCC8';
  ctx.beginPath();
  ctx.ellipse(ox, oy + 70, 34, 48, 0, 0, Math.PI * 2);
  ctx.fill();
  // Left ear tuft
  ctx.fillStyle = '#795548';
  ctx.beginPath();
  ctx.moveTo(ox - 28, oy + 10);
  ctx.lineTo(ox - 18, oy - 20);
  ctx.lineTo(ox - 8, oy + 10);
  ctx.fill();
  // Right ear tuft
  ctx.beginPath();
  ctx.moveTo(ox + 8, oy + 10);
  ctx.lineTo(ox + 18, oy - 20);
  ctx.lineTo(ox + 28, oy + 10);
  ctx.fill();
  // Left eye
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(ox - 18, oy + 28, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1565C0';
  ctx.beginPath();
  ctx.arc(ox - 18, oy + 28, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(ox - 18, oy + 28, 5, 0, Math.PI * 2);
  ctx.fill();
  // Right eye
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(ox + 18, oy + 28, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1565C0';
  ctx.beginPath();
  ctx.arc(ox + 18, oy + 28, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(ox + 18, oy + 28, 5, 0, Math.PI * 2);
  ctx.fill();
  // Beak
  ctx.fillStyle = '#FFB300';
  ctx.beginPath();
  ctx.moveTo(ox, oy + 42);
  ctx.lineTo(ox - 10, oy + 54);
  ctx.lineTo(ox + 10, oy + 54);
  ctx.closePath();
  ctx.fill();

  // "Wonce World" text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,50,140,0.4)';
  ctx.shadowBlur = 8;
  ctx.fillText('Wonce World', 256, 468);
  ctx.shadowBlur = 0;

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(assetsDir, 'store-icon-512.png'), buffer);
  console.log('Created store-icon-512.png (512x512)');
}

async function generateFeatureGraphic() {
  const canvas = createCanvas(1024, 500);
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 1024, 500);
  gradient.addColorStop(0, '#667EEA');
  gradient.addColorStop(1, '#764BA2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1024, 500);

  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.beginPath();
  ctx.arc(800, 100, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(150, 400, 150, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 100px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Wonce World', 512, 210);

  ctx.font = '44px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText('Bilingual Learning for Kids', 512, 310);

  ctx.font = '32px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.fillText('English • Spanish • Interactive • Fun', 512, 390);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(assetsDir, 'feature-graphic-1024x500.png'), buffer);
  console.log('Created feature-graphic-1024x500.png (1024x500)');
}

(async () => {
  await generateStoreIcon();
  await generateFeatureGraphic();
  console.log('Done! Find files in the assets/ folder.');
})();
