const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getRandomGame: () => ipcRenderer.invoke('get-random-game'),
  refreshGameList: () => ipcRenderer.invoke('refresh-game-list'),
  launchGame: (appid) => ipcRenderer.invoke('launch-game', appid)
});
