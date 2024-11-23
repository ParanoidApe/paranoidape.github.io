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
                return "You pick up Uncle Fatty's walking stick. It's heavy and worn, like it's been here for ages.";
            },
            "enter forest": () => {
                gameState.currentLocation = "deepForest";
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
                return "You head toward the clearing, where sunlight breaks through the trees.";
            },
            "go right": () => {
                gameState.currentLocation = "darkPath";
                return "You take the darker path. The trees crowd together, blocking out most of the light.";
            },
        },
    },
    clearing: {
        description: "In the clearing, you see a small pond shimmering with light. A faint humming sound comes from the water.",
        actions: {
            "look around": "The pond looks peaceful, but something about the water seems unnatural.",
            "touch water": "The water feels warm and calming. Your fatigue melts away.",
            "search pond": "You find a small carved stone with Uncle Fatty's initials on it.",
        },
    },
    darkPath: {
        description: "The dark path is unsettling. The trees creak as if alive, and a faint voice whispers your name.",
        actions: {
            "look around": "Shadows move between the trees. You see faint footprints in the dirt.",
            "follow footprints": () => {
                gameState.currentLocation = "hiddenGrove";
                return "The footprints lead you to a hidden grove, where something glimmers faintly in the distance.";
            },
        },
    },
    hiddenGrove: {
        description: "The grove is silent and bathed in silver light. A figure sits on a stone, hunched and quiet.",
        actions: {
            "approach figure": "As you approach, you realize it’s Uncle Fatty. He looks weary but smiles when he sees you.",
            "talk to uncle": "Uncle Fatty tells you he’s been trapped here by the forest’s magic. He needs your help to leave.",
        },
    },
};
