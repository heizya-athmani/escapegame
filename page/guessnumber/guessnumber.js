
(() => {
  const form = document.getElementById("guessForm");
  const input = document.getElementById("guessInput");
  const feedback = document.getElementById("feedback");
  const attemptsText = document.getElementById("attemptsText");
  const restartBtn = document.getElementById("restartBtn");

  const MIN = 1;
  const MAX = 100;
  const MAX_ATTEMPTS = 5;

  let nombreMystere;
  let essaisRestants;
  let trouve;

  function demarrer() {
    nombreMystere = Math.floor(Math.random() * 100) + 1; 
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
      feedback.textContent = "Entre un nombre valide entre 1 et 100.";
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
    } else {
      input.select();
    }
  });

  restartBtn.addEventListener("click", demarrer);

  demarrer();
})();





