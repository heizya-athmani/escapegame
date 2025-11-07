
(() => {
  const form = document.getElementById("guessForm");
  const input = document.getElementById("guessInput");
  const feedback = document.getElementById("feedback");
  const attemptsText = document.getElementById("attemptsText");
  const restartBtn = document.getElementById("restartBtn");
  const subtitle = document.querySelector(".subtitle");
  const select = document.getElementById("difficulty");


  const MIN = 1;
  let MAX = 100;
  let MAX_ATTEMPTS = 5;

  let nombreMystere;
  let essaisRestants;
  let trouve;

  function applyDifficulty(diff) {
    if (diff === "facile") {
      MAX = 10;
      MAX_ATTEMPTS = 5;
    } else if (diff === "moyen") {
      MAX = 50;
      MAX_ATTEMPTS = 4;
    } else if (diff === "difficile") {
      MAX = 100;
      MAX_ATTEMPTS = 3;
    }
    input.max = MAX;
    subtitle.textContent = `(Entre ${MIN} et ${MAX})`;
  }


  function demarrer() {
    nombreMystere = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    essaisRestants = MAX_ATTEMPTS;
    trouve = false;

    input.value = "";
    input.disabled = false;
    feedback.textContent = "Devine le nombre !";
    majEssais();
    input.focus();
  }

  function majEssais() {
    attemptsText.textContent = `${essaisRestants} ${essaisRestants > 1 ? "essais restants" : "essai restant"}`;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (trouve || essaisRestants <= 0) return;

    const valeur = Number(input.value);

    if (Number.isNaN(valeur) || valeur < MIN || valeur > MAX) {
      feedback.textContent = `Entre un nombre valide entre 1 et ${MAX}.`;
      return;
    }

    if (valeur === nombreMystere) {
      feedback.textContent = ` Bravo ! Tu as trouvé ${nombreMystere} !`;
      trouve = true;
      input.disabled = true;
      return;
    }

    essaisRestants--;

    if (valeur < nombreMystere) {
      feedback.textContent = "Le nombre mystère est plus grand.";
    } else {
      feedback.textContent = "Le nombre mystère est plus petit.";
    }

    majEssais();

    if (essaisRestants <= 0 && !trouve) {
      feedback.textContent = ` Perdu ! Le nombre mystère était ${nombreMystere}.`;
      input.disabled = true;
      createScreamer();
    } else {
      input.select();
    }
  });

  restartBtn.addEventListener("click", demarrer);

  select.addEventListener("change", () => {
    applyDifficulty(select.value);
    demarrer();
  });

  applyDifficulty(select.value);
  demarrer();

  demarrer();
})();
// Images de screamers (à remplacer par vos propres images)
const screamerImages = [
  "/assets/images/screamer1.gif",
  "/assets/images/screamer2.gif",
  "/assets/images/screamer3.webp"
];

// Son du screamer (un seul son)
const screamerSound = '/assets/sound/jumpscaresound.mp3';

function createScreamer() {
  // Créer l'overlay du screamer
  const screamer = document.createElement('div');
  screamer.className = 'screamer';

  // Image aléatoire
  const randomImage = screamerImages[Math.floor(Math.random() * screamerImages.length)];

  screamer.innerHTML = `
        <div class="screamer-content">
            <img src="${randomImage}" alt="Screamer" />
        </div>
    `

  try {
    const audio = new Audio(screamerSound);
    audio.volume = 0.7;
    audio.play().catch(e => console.log('Audio:', e));
  } catch (e) {
    console.log('Audio non disponible');
  }

  document.body.appendChild(screamer);

  // Retirer le screamer après 2 secondes
  setTimeout(() => {
    screamer.classList.add('fade-out');
    setTimeout(() => screamer.remove(), 500);
  }, 500);
}


