document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('annee');
  if (year) year.textContent = new Date().getFullYear();

  const tw = document.querySelector('.tw');
  const text = tw ? tw.getAttribute('data-text') || '' : '';
  let i = 0;

  function typeNext() {
    if (!tw) return;
    tw.textContent = text.slice(0, i++);
    if (i <= text.length) {
      const delay = Math.random() * 90 + 30;
      setTimeout(typeNext, delay);
    } else {
      tw.classList.add('flicker');
      const title = document.getElementById('first-title');
      title?.classList.add('shake');
      setTimeout(() => title?.classList.remove('shake'), 900);
    }
  }
  typeNext();

  const audio = document.getElementById('ambience');
  const soundBtn = document.getElementById('soundToggle');
  const enterBtn = document.getElementById('enterBtn');
  let started = false;

  function startAudioSoft() {
    if (!audio || started) return;
    started = true;
    audio.volume = 0;
    audio.play().catch(() => {});
    const target = 0.35;
    const step = 0.02;
    const iv = setInterval(() => {
      audio.volume = Math.min(target, audio.volume + step);
      if (audio.volume >= target) clearInterval(iv);
    }, 120);
    if (soundBtn) {
      soundBtn.setAttribute('aria-pressed', 'true');
      soundBtn.textContent = '🔈';
    }
  }

  function toggleSound() {
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => {
        if (soundBtn) {
          soundBtn.setAttribute('aria-pressed', 'true');
          soundBtn.textContent = '🔈';
        }
      }).catch(() => {});
    } else {
      audio.pause();
      if (soundBtn) {
        soundBtn.setAttribute('aria-pressed', 'false');
        soundBtn.textContent = '🔇';
      }
    }
  }

  enterBtn?.addEventListener('click', startAudioSoft);
  soundBtn?.addEventListener('click', toggleSound);
});
