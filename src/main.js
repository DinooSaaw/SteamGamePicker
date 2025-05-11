const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { getSteamGames, refreshGameList } = require("./steam-library");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadFile("index.html"); // Load the HTML page into the window

  mainWindow.webContents.on("did-finish-load", async () => {
    await refreshGameList(); // Refresh game list as soon as the window is ready
    console.log("Game list refreshed on startup");
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Handle the request to get a random game from the updated list
ipcMain.handle("get-random-game", () => {
  const games = JSON.parse(
    fs.readFileSync(path.join(__dirname, "gameList.json"), "utf-8")
  );
  if (games.length > 0) {
    const randomGame = games[Math.floor(Math.random() * games.length)];
    return randomGame;
  } else {
    return "No Steam games found.";
  }
});

// Handle the request to refresh the game list
ipcMain.handle("refresh-game-list", () => {
  const games = refreshGameList();
  return games;
});
