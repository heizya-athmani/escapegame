  const tw = document.querySelector('.tw');
  const text = tw ? tw.getAttribute('data-text') || '' : '';
  let i = 0; /* tt ça c'est le trait gris qui clignote, donc on peut retirer aussi*/

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
  typeNext(); /* tt ça c'est le trait gris qui clignote, et l'effet un peu tapper à la machine on peut retirer mais si on peut garder c'est sympa*/



  
