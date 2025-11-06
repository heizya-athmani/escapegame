document.addEventListener('DOMContentLoaded', () => {

  const soundToggle = document.getElementById('soundToggle');
  const audioElement = document.getElementById('ambience');
  let isPlaying = false;

  // Tentative de lecture automatique
  const tryAutoplay = async () => {
    try {
      await audioElement.play();
      isPlaying = true;
      updateSoundButton(true);
    } catch (err) {
      console.log('Autoplay bloqué');
      isPlaying = false;
      updateSoundButton(false);
    }
  };

  tryAutoplay();

  // Gestion du bouton play/pause
  soundToggle.addEventListener('click', () => {
    if (isPlaying) {
      audioElement.pause(); 
      isPlaying = false;
      updateSoundButton(false);
    } else {
      audioElement.play();
      isPlaying = true;
      updateSoundButton(true);
    }
  });

  function updateSoundButton(playing) {
    if (playing) {
      soundToggle.textContent = '🔊';
      soundToggle.setAttribute('aria-label', 'Désactiver le son');
      soundToggle.setAttribute('aria-pressed', 'true');
    } else {
      soundToggle.textContent = '🔇';
      soundToggle.setAttribute('aria-label', 'Activer le son');
      soundToggle.setAttribute('aria-pressed', 'false');
    }
  }
});
