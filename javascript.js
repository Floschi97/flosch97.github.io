const steamUserId = "76561198050984911";
const steamApiKey = "25A55038C7298A720B0B951A1BE18030";

// Step 1: Retrieve the list of games in your Steam library
const getGamesUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamUserId}&format=json`;
fetch(getGamesUrl, {mode: 'no-cors'}) 
  .then(response => response.json())
  .then(data => {
	console.log(response.responseText)
    // Step 2: Display the list of games on your web app
    const gamesList = document.querySelector("#gamesList");
    data.response.games.forEach(game => {
      const gameElement = document.createElement("li");
      gameElement.innerHTML = game.name;
      gamesList.appendChild(gameElement);
      
      // Step 4: Retrieve the list of achievements for the game
      const getAchievementsUrl = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${game.appid}&key=${steamApiKey}&steamid=${steamUserId}&format=json`;
      fetch(getAchievementsUrl, {mode: 'no-cors'}) 
        .then(response => response.json())
        .then(data => {
		  console.log(response.responseText);
          // Step 5: Display the list of achievements on your web app
          const achievementsList = document.createElement("ul");
          gameElement.appendChild(achievementsList);
          data.playerstats.achievements.forEach(achievement => {
            const achievementElement = document.createElement("li");
            achievementElement.innerHTML = achievement.displayName;
            if (achievement.achieved) {
              achievementElement.classList.add("unlocked");
            } else {
              achievementElement.classList.add("locked");
            }
            achievementsList.appendChild(achievementElement);
          });
        });
    });
  });
