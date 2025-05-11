const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Specify preload script
            contextIsolation: true,  // Ensure security by isolating contexts
            enableRemoteModule: false, // Disable remote module for security reasons
        }
    });

    mainWindow.loadFile('index.html');  // Load the HTML page into the window
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

function getSteamGames() {
    const steamPath = path.join('C:', 'Program Files (x86)', 'Steam', 'steamapps'); // Default Steam path
    const games = [];

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
            console.log(`[DEBUG] (main.js:52:19) gameData`, gameData);
            const gameName = gameData.match(/"name"\s*"([^"]+)"/);
            if (gameName) {
                games.push(gameName[1]);
            }
        }
    });

    console.log(`[DEBUG] (main.js:60:12) games`, games);
    return games;
}


// Handle the request from the renderer process to get a random game
ipcMain.handle('get-random-game', () => {
    const games = getSteamGames();
    if (games.length > 0) {
        const randomGame = games[Math.floor(Math.random() * games.length)];
        return randomGame;
    } else {
        return 'No Steam games found.';
    }
});
