document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById('output');
    const input = document.getElementById('commandInput');
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Room state for managing objects
    let roomState = {
        mirrorBroken: false,
        doorOpen: false,
        drawerOpen: false,
        keyFound: false,
    };

    // Draw the initial room state
    function drawRoom() {
        console.log("Drawing the room...");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Background color
        ctx.fillStyle = "#e800e8"; // Pink walls
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the desk
        ctx.fillStyle = "#8B4513"; // Brown color for the desk
        ctx.fillRect(100, 350, 150, 100); // Desk body

        // Draw the typewriter on the desk
        ctx.fillStyle = "#2F4F4F"; // Dark gray for the typewriter
        ctx.fillRect(130, 370, 90, 30); // Typewriter body

        // Draw the door or portal
        if (roomState.doorOpen) {
            // Draw portal
            ctx.fillStyle = "#00FF00"; // Bright green for the portal
            ctx.beginPath();
            ctx.arc(650, 300, 50, 0, Math.PI * 2, false); // Circular portal
            ctx.fill();
        } else {
            // Draw door
            ctx.fillStyle = "#654321"; // Brown color for the door
            ctx.fillRect(600, 200, 100, 200); // Door body
            ctx.fillStyle = "#FFD700"; // Gold for the door handle
            ctx.beginPath();
            ctx.arc(680, 300, 10, 0, Math.PI * 2, false); // Door handle
            ctx.fill();
        }

        // Draw the mirror
        if (!roomState.mirrorBroken) {
            ctx.fillStyle = "#C0C0C0"; // Silver color for the mirror frame
            ctx.fillRect(400, 100, 150, 150); // Mirror frame
            ctx.fillStyle = "#87CEEB"; // Light blue for the mirror glass
            ctx.fillRect(410, 110, 130, 130); // Mirror glass
        }
    }

    // Update room graphics when state changes
    function updateRoom() {
        drawRoom();
    }

    // Command responses
    const responses = {
        help: "Try commands like 'look', 'use [object]', or 'erase [object]'.",
        look: "You see a desk, a typewriter, a mirror, and a locked door.",
        "look at desk": "The desk has a single drawer, slightly ajar.",
        "use drawer": () => {
            if (!roomState.drawerOpen) {
                roomState.drawerOpen = true;
                roomState.keyFound = true;
                updateRoom(); // Update visuals
                return "You open the drawer and find a key.";
            } else {
                return "The drawer is already open.";
            }
        },
        "erase door": () => {
            if (roomState.keyFound) {
                roomState.doorOpen = true;
                updateRoom(); // Update visuals
                return "The door dissolves into nothingness, revealing a glowing portal.";
            } else {
                return "The door resists. Perhaps you need something first.";
            }
        },
        "erase mirror": () => {
            if (!roomState.mirrorBroken) {
                roomState.mirrorBroken = true;
                updateRoom(); // Update visuals
                return "The mirror shatters, revealing text: 'The floor is fragile...'";
            } else {
                return "The mirror is already broken.";
            }
        },
    };

    // Handle user input commands
    function handleCommand(command) {
        const response = responses[command];
        if (typeof response === 'function') {
            output.innerHTML += `<div>> ${command}</div><div>${response()}</div>`;
        } else if (response) {
            output.innerHTML += `<div>> ${command}</div><div>${response}</div>`;
        } else {
            output.innerHTML += `<div>> ${command}</div><div>Nothing happens.</div>`;
        }
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

    // Draw the initial state of the room
    drawRoom();
});
