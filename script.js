// Select DOM elements
const storyOutput = document.getElementById("story-output");
const commandInput = document.getElementById("commandInput");
const submitCommand = document.getElementById("submitCommand");
const commandList = document.getElementById("command-list");

// Initial game state
let gameState = {
    currentLocation: "forestEntrance",
    inventory: [],
};

// Story locations
const locations = {
    forestEntrance: {
        description: "You stand at the edge of the Forest of Healing. The trees loom tall, their canopies glowing faintly with light. Uncle Fatty's walking stick lies nearby, half-buried in moss.",
        actions: {
            "look around": "The air feels thick with magic. You see Uncle Fatty's walking stick on the ground.",
            "take stick": () => {
                gameState.inventory.push("walking stick");
                updateCommands(); // Update the commands list
                return "You pick up Uncle Fatty's walking stick. It's heavy and worn, like it's been here for ages.";
            },
            "enter forest": () => {
                gameState.currentLocation = "deepForest";
                updateLocation();
                return "You step into the forest. The air grows colder, and the trees seem to close in around you.";
            },
        },
    },
    deepForest: {
        description: "The forest is quiet except for the distant rustling of leaves. Shadows flicker, and the path splits ahead.",
        actions: {
            "look around": "The path splits into two: one leading left to a clearing, the other deeper into the forest.",
            "go left": () => {
                gameState.currentLocation = "clearing";
                updateLocation();
                return "You head toward the clearing, where sunlight breaks through the trees.";
            },
            "go right": () => {
                gameState.currentLocation = "darkPath";
                updateLocation();
                return "You take the darker path. The trees crowd together, blocking out most of the light.";
            },
        },
    },
    // Additional locations...
};

// Handle commands
function handleCommand(command) {
    const location = locations[gameState.currentLocation];
    const action = location.actions[command.toLowerCase()];

    if (typeof action === "string") {
        appendToStory(action);
    } else if (typeof action === "function") {
        appendToStory(action());
        updateCommands(); // Update available commands after executing an action
    } else {
        appendToStory("I don't understand that command.");
    }
}

// Update the list of available commands
function updateCommands() {
    const location = locations[gameState.currentLocation];
    commandList.innerHTML = ""; // Clear current commands
    Object.keys(location.actions).forEach((cmd) => {
        const li = document.createElement("li");
        li.textContent = cmd;
        commandList.appendChild(li);
    });
}

// Append text to the story output
function appendToStory(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    storyOutput.appendChild(paragraph);
    storyOutput.scrollTop = storyOutput.scrollHeight; // Scroll to the latest text
}

// Update location description and commands
function updateLocation() {
    const location = locations[gameState.currentLocation];
    appendToStory(location.description);
    updateCommands();
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

// Initial story and commands
updateLocation();
