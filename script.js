document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById('output');
    const input = document.getElementById('commandInput');
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Function to draw the initial room state
    function drawRoom() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Background color
        ctx.fillStyle = "#e800e8"; // Bright pink background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw walls with brick pattern
        drawBricks();

        // Draw doorway and outdoor view
        drawDoorway();

        // Draw torches on the walls
        drawTorches();
    }

    // Draw the brick walls
    function drawBricks() {
        ctx.strokeStyle = "#000000"; // Black for brick lines
        ctx.lineWidth = 2;

        // Draw vertical bricks
        for (let x = 0; x <= canvas.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height / 2);
            ctx.stroke();
        }

        // Draw horizontal bricks
        for (let y = 0; y <= canvas.height / 2; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    // Draw the doorway and the outside view
    function drawDoorway() {
        // Doorway background
        ctx.fillStyle = "#000000"; // Black for doorway frame
        ctx.fillRect(250, 100, 140, 180); // Doorway frame

        // Outdoor scene
        ctx.fillStyle = "#00FFFF"; // Bright cyan for sky
        ctx.fillRect(260, 110, 120, 160);

        // Sun in the sky
        ctx.fillStyle = "#FFFFFF"; // White for the sun
        ctx.beginPath();
        ctx.arc(320, 140, 10, 0, Math.PI * 2);
        ctx.fill();

        // Hills
        ctx.fillStyle = "#00FF00"; // Bright green for hills
        ctx.beginPath();
        ctx.moveTo(260, 170);
        ctx.lineTo(290, 150);
        ctx.lineTo(320, 170);
        ctx.lineTo(350, 150);
        ctx.lineTo(380, 170);
        ctx.fill();

        // Path leading out
        ctx.fillStyle = "#FFFF00"; // Yellow for path
        ctx.fillRect(310, 220, 20, 50);

        // Fence
        ctx.strokeStyle = "#000000"; // Black for fence lines
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(270, 180);
        ctx.lineTo(370, 180);
        ctx.stroke();

        // Fence posts
        for (let x = 270; x <= 370; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 180);
            ctx.lineTo(x, 200);
            ctx.stroke();
        }
    }

    // Draw torches on the walls
    function drawTorches() {
        ctx.fillStyle = "#000000"; // Black for torch holders
        ctx.fillRect(180, 150, 10, 30);
        ctx.fillRect(460, 150, 10, 30);

        // Flame on the torches
        ctx.fillStyle = "#FFA500"; // Orange for flame
        ctx.beginPath();
        ctx.moveTo(185, 140);
        ctx.lineTo(175, 130);
        ctx.lineTo(195, 130);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(465, 140);
        ctx.lineTo(455, 130);
        ctx.lineTo(475, 130);
        ctx.fill();
    }

    // Draw the initial state of the room
    drawRoom();

    // Command responses (simplified)
    const responses = {
        help: "Try commands like 'look around' or 'move north'.",
        look: "You see a small room with bright pink walls, a doorway leading outside, and two torches on the walls.",
    };

    // Handle user input commands
    function handleCommand(command) {
        const response = responses[command] || "Nothing happens.";
        output.innerHTML += `<div>> ${command}</div><div>${response}</div>`;
        output.scrollTop = output.scrollHeight;
    }

    // Listen for user input
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.toLowerCase().trim();
            handleCommand(command);
            input.value = '';
        }
    });
});
