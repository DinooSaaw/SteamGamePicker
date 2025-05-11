// steamGames.js
const fs = require('fs');
const path = require('path');

// Function to load the blacklist from the JSON file
function loadBlacklist() {
    try {
        const blacklistPath = path.join(__dirname, 'blacklist.json');
        const data = fs.readFileSync(blacklistPath, 'utf-8');
        const json = JSON.parse(data);
        return json.blacklist || []; // Return the blacklist or an empty array if not found
    } catch (error) {
        console.error('Error loading blacklist:', error);
        return []; // Return an empty array if there's an error
    }
}

// Function to get the list of installed Steam games
function getSteamGames() {
    const steamPath = path.join('C:', 'Program Files (x86)', 'Steam', 'steamapps'); // Default Steam path
    const games = [];

    // Load the blacklist from the JSON file
    const blacklist = loadBlacklist();

    // Check if the directory exists
    if (!fs.existsSync(steamPath)) {
        console.error(`Steam directory not found at: ${steamPath}`);
        return [];
    }

    const files = fs.readdirSync(steamPath);
    files.forEach(file => {
        if (file.endsWith('.acf')) {
            // Each .acf file corresponds to a game
            const gameData = fs.readFileSync(path.join(steamPath, file), 'utf-8');
            const gameName = gameData.match(/"name"\s*"([^"]+)"/);
            if (gameName) {
                const name = gameName[1];

                // Check if the game is in the blacklist and exclude it if it is
                if (!blacklist.includes(name)) {
                    games.push(name);
                }
            }
        }
    });

    return games;
}

module.exports = { getSteamGames };
