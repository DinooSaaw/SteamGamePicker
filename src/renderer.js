document.addEventListener("DOMContentLoaded", async () => {
  const randomGameButton = document.getElementById("random-game-button");
  const refreshButton = document.getElementById("refresh-button");
  const gameDisplay = document.getElementById("game-display");

  // Refresh the game list automatically when the page loads
  const refreshedGames = await window.electronAPI.refreshGameList();
  console.log("Game list refreshed:", refreshedGames);

  // Get a random game when the button is clicked
  randomGameButton.addEventListener("click", async () => {
    const randomGame = await window.electronAPI.getRandomGame();

    // Format the dates
    const lastPlayedFormatted = formatDate(randomGame.lastPlayed);
    const lastUpdatedFormatted = formatDate(randomGame.lastUpdated);

    // Display the game info with specific formatting
    gameDisplay.innerHTML = `
    <div id="game-name">${randomGame.name}</div>
    <img 
        src="https://cdn.cloudflare.steamstatic.com/steam/apps/${randomGame.appid}/header.jpg" 
        alt="${randomGame.name} Art" 
        class="game-header"
    />
    <div id="game-details">
        <div class="game-detail">Last Played: ${lastPlayedFormatted}</div>
        <div class="game-detail">Last Updated: ${lastUpdatedFormatted}</div>
    </div>
`;
  });

  // Refresh the game list when the refresh button is clicked
  refreshButton.addEventListener("click", async () => {
    const refreshedGames = await window.electronAPI.refreshGameList();
    console.log("Game list refreshed:", refreshedGames);
  });
});

// Format date function
function formatDate(date) {
  const options = {
    weekday: "long", // "Monday"
    year: "numeric", // "2025"
    month: "long", // "March"
    day: "numeric", // "17"
    hour: "2-digit", // "02"
    minute: "2-digit", // "20"
    second: "2-digit", // "51"
    hour12: true, // "AM/PM"
  };

  return new Date(date).toLocaleString("en-US", options);
}
