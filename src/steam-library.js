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

// Function to extract the required game data from an .acf file
function parseGameData(filePath) {
    const gameData = fs.readFileSync(filePath, 'utf-8');
    const appidMatch = gameData.match(/"appid"\s*"(\d+)"/);
    const nameMatch = gameData.match(/"name"\s*"([^"]+)"/);
    const lastUpdatedMatch = gameData.match(/"lastupdated"\s*"([^"]+)"/);
    const lastPlayedMatch = gameData.match(/"LastPlayed"\s*"([^"]+)"/);

    if (appidMatch && nameMatch) {
        const appid = appidMatch[1];
        return {
            appid,
            name: nameMatch[1],
            lastUpdated: lastUpdatedMatch ? new Date(parseInt(lastUpdatedMatch[1]) * 1000) : null,
            lastPlayed: lastPlayedMatch ? new Date(parseInt(lastPlayedMatch[1]) * 1000) : null,
            iconUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`
        };
    }
    return null;
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
            const gameData = parseGameData(path.join(steamPath, file));
            if (gameData && !blacklist.includes(gameData.name)) {
                games.push(gameData);
            }
        }
    });

    return games;
}

// Function to refresh the game list
function refreshGameList() {
    const games = getSteamGames();
    fs.writeFileSync(path.join(__dirname, 'gameList.json'), JSON.stringify(games, null, 2));
    return games;
}

module.exports = { getSteamGames, refreshGameList };
