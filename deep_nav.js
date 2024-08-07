// Grab the canvas.nav
const canvasNav = document.querySelector(".nav");

const mn = canvasNav.getContext("2d");

// Set canvas dimensions
canvasNav.width = 300;
canvasNav.height = 300;

// Calculate center point
const centerX = canvasNav.width / 2;
const centerY = canvasNav.height / 2;

// Line length (adjust as needed)
const lineLength = 100;
let isHorizontal = false;

// Draw the first line (diagonal from top-left to bottom-right)
function drawLines() {
  mn.clearRect(0, 0, canvasNav.width, canvasNav.height);

  if (isHorizontal) {
    // Draw horizontal lines
    mn.beginPath();
    mn.moveTo(centerX - lineLength, centerY);
    mn.lineTo(centerX + lineLength, centerY);
    mn.stroke();

    mn.beginPath();
    mn.moveTo(centerX - lineLength, centerY + 10);
    mn.lineTo(centerX + lineLength, centerY + 10);
    mn.stroke();
  } else {
    // Draw diagonal lines
    mn.beginPath();
    mn.moveTo(centerX - lineLength, centerY - lineLength);
    mn.lineTo(centerX + lineLength, centerY + lineLength);
    mn.stroke();

    mn.beginPath();
    mn.moveTo(centerX + lineLength, centerY - lineLength);
    mn.lineTo(centerX - lineLength, centerY + lineLength);
    mn.stroke();
  }
}

drawLines();

canvasNav.addEventListener('click', () => {
  isHorizontal = !isHorizontal;
  drawLines();
});