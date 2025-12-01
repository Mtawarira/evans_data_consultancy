// Select the canvas and set up context
const canvas = document.getElementById('moving-dots');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create an array of dots
const dots = [];
const dotCount = 50; // Number of dots
const maxVelocity = 2; // Speed of dots

// Initialize dots with random positions and velocities
for (let i = 0; i < dotCount; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * maxVelocity,
        vy: (Math.random() - 0.5) * maxVelocity,
        radius: Math.random() * 3 + 1, // Random radius between 1 and 4
    });
}

// Draw a single dot
function drawDot(dot) {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    ctx.closePath();
}

// Update the position of a dot and handle boundary collisions
function updateDot(dot) {
    dot.x += dot.vx;
    dot.y += dot.vy;

    // Reverse velocity if hitting canvas edges
    if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
    if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
}

// Main animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    dots.forEach((dot) => {
        drawDot(dot);
        updateDot(dot);
    });

    requestAnimationFrame(animate); // Recursive call to keep animating
}

// Start the animation
animate();
