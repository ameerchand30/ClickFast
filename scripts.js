// Variables globales
let score = 0;          // Score actuel
let isGameActive = false; // État du jeu
let timerInterval;       // Intervalle pour le timer

// Sélectionner les éléments du DOM
const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('resetButton');
const usernameInput = document.getElementById('username');
const scoreboardContainer = document.getElementById('scoreboard');

/**
 * Récupère le nom d'utilisateur depuis l'input.
 * @returns {string} Le nom d'utilisateur.
 */
function getUsername() {
  return usernameInput.value.trim() || "Anonymous";
}

/**
 * Envoie le score à l'API.
 * @param {string} username - Le nom d'utilisateur.
 * @param {number} score - Le score à envoyer.
 */
const postScore = async (username, score) => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  const data = {
    createdAt: new Date().toISOString(),
    username: username,
    avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
    score: score,
    website_url: "onyj.github.io/ClickFast",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du score");
    }

    const result = await response.json();
    console.log("Score envoyé avec succès:", result);
    fetchScoresAndDisplay(); // Rafraîchir le scoreboard après l'envoi
  } catch (error) {
    console.error("Erreur lors de l'envoi du score:", error);
    scoreboardContainer.innerHTML += "<p class='error'>Erreur lors de l'envoi du score.</p>";
  }
};

/**
 * Récupère et affiche les scores depuis l'API.
 */
const fetchScoresAndDisplay = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des scores");
    }

    const scoresData = await response.json();
    scoresData.sort((a, b) => b.score - a.score); // Trier par score décroissant

    displayScores(scoresData);
  } catch (error) {
    console.error("Erreur lors de la récupération des scores:", error);
    scoreboardContainer.innerHTML = "<p class='error'>Erreur lors du chargement du scoreboard.</p>";
  }
};

/**
 * Affiche les scores dans le conteneur du scoreboard.
 * @param {Array<Object>} scores - Le tableau des scores à afficher.
 */
const displayScores = (scores) => {
  scoreboardContainer.innerHTML = '<h2>Scoreboard</h2>';
  const scoresList = document.createElement('ol');
  scores.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.textContent = `${entry.username}: ${entry.score}`;
    scoresList.appendChild(listItem);
  });
  scoreboardContainer.appendChild(scoresList);
};

/**
 * Démarre le jeu avec un compte à rebours.
 */
function startGame() {
  if (isGameActive) return; // Empêcher de redémarrer le jeu si déjà actif

  isGameActive = true;
  resetScore(false); // Réinitialiser le score sans réinitialiser l'affichage initial

  let timeLeft = 5; // Temps imparti en secondes
  timerDisplay.textContent = `Temps restant : ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Temps restant : ${timeLeft}s`;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

/**
 * Termine le jeu, envoie le score et affiche un message.
 */
function endGame() {
  clearInterval(timerInterval); // Arrêter le chrono
  isGameActive = false; // Désactiver le jeu
  timerDisplay.textContent = "Temps écoulé !";
  const finalScore = score;
  const playerName = getUsername();
  postScore(playerName, finalScore);
}

/**
 * Incrémente le score et met à jour l'affichage.
 */
function updateScore() {
  if (isGameActive) {
    score++;
    scoreDisplay.textContent = score;
  }
}

/**
 * Réinitialise le score et met à jour l'affichage.
 * @param {boolean} resetTimerText - Indique si le texte du timer doit être réinitialisé.
 */
function resetScore(resetTimerText = true) {
  score = 0;
  scoreDisplay.textContent = score;
  if (resetTimerText) {
    timerDisplay.textContent = "Cliquez pour commencer";
  }
  isGameActive = false;
  clearInterval(timerInterval);
}

// Ajouter un écouteur d'événement pour détecter les clics
if (clickButton) {
  clickButton.addEventListener('click', () => {
    if (!isGameActive) {
      startGame();
    } else {
      updateScore();
    }
  });
}

// Ajouter un écouteur d'événement pour le bouton de réinitialisation
if (resetButton) {
  resetButton.addEventListener('click', resetScore);
}

// Charger les scores au chargement de la page
fetchScoresAndDisplay();