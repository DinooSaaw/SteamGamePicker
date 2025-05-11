document.getElementById('randomGameBtn').addEventListener('click', async () => {
    const game = await window.electron.getRandomGame();
    document.getElementById('gameName').innerText = game;
});

