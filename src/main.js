const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getSteamGames } = require('./steam-library');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Specify preload script
      contextIsolation: true,  // This must be true for security
      enableRemoteModule: true,
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
