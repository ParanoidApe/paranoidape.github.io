// Select DOM elements
const storyOutput = document.getElementById("story-output");
const commandInput = document.getElementById("commandInput");
const submitCommand = document.getElementById("submitCommand");

// Game state
let gameState = {
    currentLocation: "void",
    inventory: [],
};

// Story locations
const locations = {
    void: {
        description: "You are in the endless void. Whispers surround you.",
        actions: {
            "look around": "The void stretches infinitely in all directions. You see a faint light to the north.",
            "go north": () => {
                gameState.currentLocation = "light";
                return "You move toward the light, and the void begins to dissolve.";
            },
        },
    },
    light: {
        description: "You stand before a radiant portal, humming with energy.",
        actions: {
            "enter portal": () => {
                gameState.currentLocation = "forest";
                return "You step through the portal and find yourself in a dense, mystical forest.";
            },
            "look around": "The portal pulsates with power, its light reflecting on the ground.",
        },
    },
    forest: {
        description: "You are in a dense forest. The air is thick with magic.",
        actions: {
            "look around": "The forest is alive with whispers. You notice a path to the east.",
            "go east": "You follow the path, deeper into the unknown.",
        },
    },
};

// Handle commands
function handleCommand(command) {
    const location = locations[gameState.currentLocation];
    const action = location.actions[command.toLowerCase()];

    if (typeof action === "string") {
        appendToStory(action);
    } else if (typeof action === "function") {
        appendToStory(action());
        updateLocation();
    } else {
        appendToStory("I don't understand that command.");
    }
}

// Append text to the story output
function appendToStory(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    storyOutput.appendChild(paragraph);
    storyOutput.scrollTop = storyOutput.scrollHeight; // Scroll to the latest text
}

// Update location description
function updateLocation() {
    const location = locations[gameState.currentLocation];
    appendToStory(location.description);
}

// Event listener for submitting commands
submitCommand.addEventListener("click", () => {
    const command = commandInput.value.trim();
    if (command) {
        appendToStory(`> ${command}`);
        handleCommand(command);
        commandInput.value = "";
    }
});

// Allow Enter key to submit commands
commandInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitCommand.click();
    }
});

// Initial story description
updateLocation();
