# Steam Game Picker

A desktop application built with **Electron** that randomly selects a Steam game from your installed games, with features to launch the game, blacklist it, or skip it for the session.

## Features

* **Random Game Selection**: Select a random game from your installed Steam library.
* **Game Launch**: Launch the selected game using Steam's internal `steam://` protocol.
* **Blacklist Game**: Permanently blacklist a game so it won't appear again.
* **Skip Game**: Skip the current game for the session, so it won’t appear again until you refresh the list.
* **Game Metadata**: Displays the name, last played, and last updated information for each game.
* **Game Art**: Displays the game’s header art.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/steam-game-picker.git
   cd steam-game-picker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build and run the application:

   ```bash
   npm start
   ```

## Usage

* When you launch the app, the game list will automatically refresh.
* **Get Random Game**: Click the "Get Random Game" button to see a randomly selected game.
* **Launch Game**: Press the "Launch Game" button to start the game via Steam.
* **Blacklist Game**: Click the "Black List Game" button to permanently add the game to the blacklist.
* **Skip Game**: Press the "Skip Game" button to exclude the current game for the session. It won’t appear again until you refresh the game list.

## How It Works

1. **Game Data Extraction**: The app scans the `steamapps` folder in your Steam directory for `.acf` files, which contain metadata about each installed game (e.g., name, appid, last played).
2. **Blacklist**: Blacklisted games are saved in a `blacklist.json` file. These games will not appear in the random selection.
3. **Random Selection**: A random game is selected from the remaining list (not blacklisted or skipped).
4. **Skip Feature**: Skipped games are tracked in the session, so they won’t be shown again until the list is refreshed.

## Files

* **`index.html`**: The HTML template for the app's main interface.
* **`renderer.js`**: Handles user interactions, game selection, and displaying game information.
* **`style.css`**: The stylesheet for the app's UI.
* **`main.js`**: Contains the Electron main process logic, such as loading games and managing the blacklist.
* **`blacklist.json`**: Stores the blacklisted games.
* **`gameList.json`**: Stores the list of available games on refresh.

## Known Issues

* If all games are blacklisted or skipped, the app may not be able to select a game and will show a "No more games available" message.
* The `steam://` protocol works only if Steam is installed and set as the default for opening `steam://` links.

## Contributing

If you'd like to contribute to this project, feel free to open a pull request or raise an issue for any bugs or feature requests.
