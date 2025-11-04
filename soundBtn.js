<script src="https://w.soundcloud.com/player/api.js"></script>
/*
  <iframe 
  id="sc-player" 
  class="soundcloud-player" 
  allow="autoplay"
  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A482923884&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
  </ifram>
*/
document.addEventListener("DOMContentLoaded", () => {
    const iframeElement = document.getElementById('sc-player');
    const widget = SC.Widget(iframeElement);
    const button = document.getElementById('toggleMusic');
    let isPlaying = true;

    button.addEventListener('click', () => {
        if (isPlaying) {
            widget.pause();
            button.textContent = "🔊 Play";
        } else {
            widget.play();
            button.textContent = "🔇 Pause";
        }
        isPlaying = !isPlaying;
    });
});
