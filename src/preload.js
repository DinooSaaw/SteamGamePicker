const { contextBridge, ipcRenderer } = require('electron');

// Expose the random game fetch function to the renderer
contextBridge.exposeInMainWorld('electron', {
    getRandomGame: () => ipcRenderer.invoke('get-random-game')
});
