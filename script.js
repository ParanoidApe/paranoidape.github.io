const output = document.getElementById('output');
const input = document.getElementById('commandInput');

let roomState = {
    mirrorBroken: false,
    doorOpen: false,
    drawerOpen: false,
    keyFound: false,
};

const responses = {
    help: "Try commands like 'look', 'use [object]', or 'erase [object]'.",
    look: "You see a desk, a typewriter, a broken mirror, and a locked door.",
    "look at desk": "The desk has a single drawer, slightly ajar.",
    "use drawer": () => {
        if (!roomState.drawerOpen) {
            roomState.drawerOpen = true;
            roomState.keyFound = true;
            return "You open the drawer and find a key.";
        } else {
            return "The drawer is already open.";
        }
    },
    "erase door": () => {
        if (roomState.keyFound) {
            roomState.doorOpen = true;
            return "The door dissolves into nothingness, revealing a glowing portal.";
        } else {
            return "The door resists. Perhaps you need something first.";
        }
    },
    "erase mirror": () => {
        if (!roomState.mirrorBroken) {
            roomState.mirrorBroken = true;
            return "The mirror shatters, revealing text: 'The floor is fragile...'";
        } else {
            return "The mirror is already broken.";
        }
    },
};

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

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = input.value.toLowerCase().trim();
        handleCommand(command);
        input.value = '';
    }
});