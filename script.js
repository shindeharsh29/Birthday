/* =========================================================
   THE MUSEUM OF MY LOVE — main script
   Sections: floating hearts, scroll reveal, carousel,
   music toggle, envelope letter + typewriter,
   confetti, fireworks
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. FLOATING HEARTS (generated, randomized)
  ========================================================= */
  (function floatingHearts() {
    const wrap = document.getElementById('floatingHearts');
    if (!wrap) return;
    const count = 14;
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.textContent = '❤';
      span.style.left = Math.random() * 100 + 'vw';
      const duration = 14 + Math.random() * 12;
      span.style.animationDuration = duration + 's';
      span.style.animationDelay = (Math.random() * duration) + 's';
      span.style.fontSize = (14 + Math.random() * 18) + 'px';
      wrap.appendChild(span);
    }
  })();

  /* =========================================================
     2. SCROLL REVEAL
  ========================================================= */
  (function scrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = (idx % 4) * 120;
          setTimeout(() => el.classList.add('in-view'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(el => observer.observe(el));
  })();

  /* =========================================================
     3. MUSIC TOGGLE
  ========================================================= */
  (function music() {
    const btn = document.getElementById('musicBtn');
    const audio = document.getElementById('bgMusic');
    if (!btn || !audio) return;

    let playing = false;

    btn.addEventListener('click', () => {
      if (!playing) {
        audio.play().then(() => {
          playing = true;
          btn.textContent = '🔊';
          btn.classList.add('playing');
        }).catch(() => {
          // No audio file present yet, or browser blocked autoplay.
          btn.textContent = '🎵';
          alert('Add your song at music/birthday.mp3 to enable music.');
        });
      } else {
        audio.pause();
        playing = false;
        btn.textContent = '🎵';
        btn.classList.remove('playing');
      }
    });
  })();

  /* =========================================================
     4. CAROUSEL (ENHANCED FOR PHONE FRAME)
  ========================================================= */
  (function carousel() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel .prev');
    const nextBtn = document.querySelector('.carousel .next');
    if (!slides.length) return;

    let current = 0;
    let autoTimer = null;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current] && dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current] && dots[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    nextBtn && nextBtn.addEventListener('click', () => { next(); resetAuto(); });
    prevBtn && prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.index, 10));
        resetAuto();
      });
    });

    function startAuto() {
      autoTimer = setInterval(next, 4500);
    }
    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }
    startAuto();

    // Pause autoplay on mouse hover over the phone screen
    const track = document.querySelector('.slides');
    if (track) {
      track.addEventListener('mouseenter', () => clearInterval(autoTimer));
      track.addEventListener('mouseleave', () => startAuto());

      // Touch Swipe Support (Horizontal & Vertical gestures)
      let startX = 0;
      let startY = 0;

      track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive: true });

      track.addEventListener('touchend', e => {
        const diffX = e.changedTouches[0].clientX - startX;
        const diffY = e.changedTouches[0].clientY - startY;

        // Trigger on horizontal swipe or upward vertical swipe
        if (Math.abs(diffX) > 35) {
          diffX > 0 ? prev() : next();
          resetAuto();
        } else if (Math.abs(diffY) > 50 && diffY < 0) {
          next(); // Swipe up advances to next photo
          resetAuto();
        }
      });
    }

    // Keyboard Arrow Navigation for Gallery
    document.addEventListener('keydown', e => {
      const gallerySection = document.getElementById('gallery');
      if (!gallerySection) return;
      const rect = gallerySection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom >= 0;

      if (inView) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          next();
          resetAuto();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          prev();
          resetAuto();
        }
      }
    });
  })();

  /* =========================================================
     5. ENVELOPE + TYPEWRITER LETTER
  ========================================================= */
  (function letter() {
    const envelope = document.getElementById('envelope');
    const paper = document.getElementById('letterPaper');
    const overlay = document.getElementById('letterOverlay');
    const closeBtn = document.getElementById('closeLetter');
    const typedEl = document.getElementById('typedText');
    if (!envelope || !paper) return;

    const message =
`My love,
Almost a year has gone by for us , and somehow you keep finding new ways to make me go on and have a motivation to love you more and work harder .

I don't have grand words for how much you mean to me — just a quiet, constant feeling that you exist, and that I got to know you and love you. You are my favorite person and all i want is to see you happy in your life and spend every moment with you .

So today, of all days, I hope you feel exactly how loved you are. I wish i could be there with you to celebrate and im sorry i love you mwah . We would never let anything come between us and we will have the spark more and again and never let it go , help me with that my love to stay by my side and never let go of me .

Happy birthday My Honeypie Love . I love you, endlessly.`;

    let typed = false;

    function typeMessage() {
      if (typed) return;
      typed = true;
      typedEl.textContent = '';
      let i = 0;
      const speed = 22;
      (function step() {
        if (i <= message.length) {
          typedEl.textContent = message.slice(0, i);
          i++;
          setTimeout(step, speed);
        }
      })();
    }

    function openLetter() {
      envelope.classList.add('open');
      overlay.classList.add('visible');
      setTimeout(() => {
        paper.classList.add('visible');
        typeMessage();
      }, 350);
    }

    function closeLetter() {
      paper.classList.remove('visible');
      overlay.classList.remove('visible');
      setTimeout(() => envelope.classList.remove('open'), 200);
    }

    envelope.addEventListener('click', openLetter);
    closeBtn && closeBtn.addEventListener('click', closeLetter);
    overlay && overlay.addEventListener('click', closeLetter);
  })();

  /* =========================================================
     6. CONFETTI
  ========================================================= */
  const confettiCanvas = document.getElementById('confetti');
  const confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  let confettiPieces = [];
  let confettiRunning = false;

  function resizeConfetti() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeConfetti);
  resizeConfetti();

  const confettiColors = ['#ff5f94', '#ff9dbb', '#ffd166', '#c084fc', '#7dd3fc', '#ffffff'];

  function launchConfetti() {
    if (!confettiCtx) return;
    const count = 160;
    confettiPieces = [];
    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: Math.random() * confettiCanvas.width,
        y: -20 - Math.random() * confettiCanvas.height * 0.5,
        w: 6 + Math.random() * 6,
        h: 10 + Math.random() * 8,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speed: 2 + Math.random() * 3.5,
        drift: -1.5 + Math.random() * 3,
        rotation: Math.random() * 360,
        spin: -6 + Math.random() * 12,
        life: 0,
        maxLife: 260 + Math.random() * 120
      });
    }
    if (!confettiRunning) {
      confettiRunning = true;
      requestAnimationFrame(animateConfetti);
    }
  }

  function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;

    confettiPieces.forEach(p => {
      if (p.life > p.maxLife || p.y > confettiCanvas.height + 30) return;
      alive = true;
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += p.spin;
      p.life++;

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confettiCtx.restore();
    });

    if (alive) {
      requestAnimationFrame(animateConfetti);
    } else {
      confettiRunning = false;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  /* =========================================================
     7. FIREWORKS
  ========================================================= */
  const fireworksLayer = document.getElementById('fireworks');
  const fireworkColors = ['#ff5f94', '#ffd166', '#c084fc', '#7dd3fc', '#ff9dbb', '#a3e635'];

  function launchFirework(x, y) {
    if (!fireworksLayer) return;
    const particleCount = 26;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'firework-particle';
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 60 + Math.random() * 70;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

      particle.style.background = color;
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.boxShadow = `0 0 8px 2px ${color}`;
      particle.style.transition = 'transform 900ms cubic-bezier(.15,.6,.4,1), opacity 900ms ease';

      fireworksLayer.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${dx}px, ${dy}px)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => particle.remove(), 950);
    }
  }

  function fireworksShow(bursts) {
    let done = 0;
    const timer = setInterval(() => {
      const x = window.innerWidth * (0.2 + Math.random() * 0.6);
      const y = window.innerHeight * (0.15 + Math.random() * 0.4);
      launchFirework(x, y);
      done++;
      if (done >= bursts) clearInterval(timer);
    }, 420);
  }

  /* =========================================================
     8. CELEBRATE BUTTON
  ========================================================= */
  const celebrateBtn = document.getElementById('celebrate');
  celebrateBtn && celebrateBtn.addEventListener('click', () => {
    launchConfetti();
    fireworksShow(6);
  });

});