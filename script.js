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

// Load images
const images = {
    desk: new Image(),
    door: new Image(),
    mirror: new Image(),
    typewriter: new Image(),
    portal: new Image(),
};

images.desk.src = './assets/desk.png';
images.door.src = './assets/door.png';
images.mirror.src = './assets/mirror.png';
images.typewriter.src = './assets/typewriter.png';
images.portal.src = './assets/portal.png'; // For when the portal appears

// Draw the initial room state
function drawRoom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Background color
    ctx.fillStyle = "#e800e8"; // Pink walls
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw objects
    ctx.drawImage(images.desk, 100, 350, 150, 100); // Desk
    ctx.drawImage(
        roomState.doorOpen ? images.portal : images.door,
        600,
        200,
        100,
        200
    ); // Door or portal
    ctx.drawImage(
        roomState.mirrorBroken ? null : images.mirror,
        400,
        100,
        150,
        150
    ); // Mirror (disappear if broken)
    ctx.drawImage(images.typewriter, 250, 350, 150, 100); // Typewriter
}

// Update room graphics when state changes
function updateRoom() {
    drawRoom();
}

// Command responses
const responses = {
    help: "Try commands like 'look', 'use [object]', or 'erase [object]'.",
    look: "You see a desk, a typewriter, a broken mirror, and a locked door.",
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

// Draw the initial state of the room when images are loaded
images.desk.onload = drawRoom;
