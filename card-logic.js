/* ══════════════════════════════════════════════════════════════
   ATELIER LUNE — Personalized Landing Card
   card-logic.js
   ══════════════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════════════
   1. DYNAMIC GUEST NAME
   Reads  ?name=John+Doe  or  ?name=สมชาย+ใจดี  from the URL
   and injects it into #displayGuestName.

   Usage examples:
     card.html?name=John+Doe
     card.html?name=สมชาย%20ใจดี
     card.html?name=คุณวีระ+และครอบครัว
   ══════════════════════════════════════════════════════════════ */
(function injectGuestName() {
  const nameEl = document.getElementById('displayGuestName');
  if (!nameEl) return;

  try {
    // URLSearchParams handles all percent-encoding, including Thai UTF-8
    const params   = new URLSearchParams(window.location.search);
    const rawName  = params.get('name');

    if (rawName && rawName.trim() !== '') {
      // Sanitise: strip HTML tags to prevent XSS
      const safeName = rawName.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
      nameEl.textContent = safeName;

      // Dynamic font-size scaling for very long names (Thai names can be long)
      if (safeName.length > 28) {
        nameEl.style.fontSize = 'clamp(20px, 4.5vw, 34px)';
      } else if (safeName.length > 18) {
        nameEl.style.fontSize = 'clamp(26px, 5.5vw, 44px)';
      }

      // Update page <title> for a polished touch
      document.title = `You Are Invited — ${safeName}`;

    } else {
      // No name param — show elegant fallback
      nameEl.textContent  = 'Honoured Guest';
      nameEl.classList.add('card__name--fallback');
    }

  } catch (err) {
    // Malformed URL — fail gracefully
    nameEl.textContent = 'Honoured Guest';
    nameEl.classList.add('card__name--fallback');
    console.warn('[card-logic] Could not parse guest name from URL:', err);
  }
})();


/* ══════════════════════════════════════════════════════════════
   1.5 VIDEO POSTER — Responsive based on viewport
   ══════════════════════════════════════════════════════════════ */
(function updateVideoPoster() {
  const video = document.getElementById('card-video');
  if (!video) return;

  function setPoster() {
    const isMobile = window.innerWidth <= 768;
    const posterUrl = isMobile 
      ? 'assets/images/hero-poster-phone.jpg' 
      : 'assets/images/hero-poster.jpg';
    video.poster = posterUrl;
    // Also update background fallback for autoplay blocked case
    video.closest('.video-bg').style.backgroundImage = `url('${posterUrl}')`;
  }

  setPoster();
  window.addEventListener('resize', setPoster);
})();


/* ══════════════════════════════════════════════════════════════
   2. PARTICLE CANVAS — Floating gold dust
   ══════════════════════════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  // Skip on reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  const PARTICLE_COUNT = window.innerWidth < 600 ? 38 : 72;
  const GOLD = [212, 175, 55];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x     = Math.random() * W;
      this.y     = initial ? Math.random() * H : H + 10;
      this.size  = Math.random() * 1.8 + 0.4;
      this.speedY = Math.random() * 0.4 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha  = 0;
      this.maxAlpha = Math.random() * 0.55 + 0.1;
      this.fadeIn  = true;
      this.drift   = (Math.random() - 0.5) * 0.008; // gentle horizontal drift
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * this.drift) * 0.4;

      if (this.fadeIn) {
        this.alpha += 0.008;
        if (this.alpha >= this.maxAlpha) this.fadeIn = false;
      }

      // Fade out as particle nears top
      if (this.y < H * 0.25) {
        this.alpha -= 0.006;
      }

      if (this.alpha <= 0 || this.y < -10) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => {
      if (p.x > W) p.x = Math.random() * W;
      if (p.y > H) p.y = Math.random() * H;
    });
  });

  init();
  loop();
})();


/* ══════════════════════════════════════════════════════════════
   3. VIDEO — Mobile-safe autoplay
   ══════════════════════════════════════════════════════════════ */
(function initVideo() {
  const video = document.querySelector('.video-bg__film');
  if (!video) return;

  const playAttempt = video.play();
  if (playAttempt !== undefined) {
    playAttempt.catch(() => {
      // Autoplay blocked → poster image already shown via HTML attribute
      video.style.display = 'none';
    });
  }

  // Pause when tab is hidden to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  });
})();


/* ══════════════════════════════════════════════════════════════
   4. HELPER — Generate shareable personalised URLs
   Call from browser console:
     CardShare.link("สมชาย ใจดี")
     // → "https://yoursite.com/card.html?name=สมชาย%20ใจดี"
   ══════════════════════════════════════════════════════════════ */
window.CardShare = {
  link(guestName) {
    const base = window.location.origin + window.location.pathname;
    const url  = new URL(base);
    url.searchParams.set('name', guestName.trim());
    return url.toString();
  },

  // Copy to clipboard
  copy(guestName) {
    const url = this.link(guestName);
    navigator.clipboard.writeText(url)
      .then(() => console.log(`✓ Copied: ${url}`))
      .catch(() => console.log(`Link: ${url}`));
    return url;
  }
};