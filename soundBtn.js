document.addEventListener('DOMContentLoaded', () => {

  const soundToggle = document.getElementById('soundToggle');
  const soundcloudWidget = document.getElementById('soundcloudPlayer');

    // Démarrage automatique de la musique (avec gestion des politiques autoplay)
  widget.bind(SC.Widget.Events.READY, () => {
    // Tenter de lancer la musique automatiquement
    widget.play();
    isPlaying = true;
    updateSoundButton(true);
  });

  // Gestion du bouton play/pause
  soundToggle.addEventListener('click', () => {
    if (isPlaying) {
      widget.pause();
      isPlaying = false;
      updateSoundButton(false);
    } else {
      widget.play();
      isPlaying = true;
      updateSoundButton(true);
    }
  });
  
  // Mise à jour visuelle du bouton son
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

/*
  <iframe 
  id="sc-player" 
  class="soundcloud-player" 
  allow="autoplay"
  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A482923884&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
  </ifram>*/