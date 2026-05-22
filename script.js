/* ══════════════════════════════════════════════════════════════
   ATELIER LUNE — Luxury Wedding Invitation
   script.js
   ══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── CONFIG ─────────────────────────────────────────────────── */
const SECTIONS = ['#hero', '#details', '#rsvp'];
const REVEAL_CLASS = 'in-view';

/* ─── DOM REFERENCES ─────────────────────────────────────────── */
const navDots = document.querySelectorAll('.nav-dot');
const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade:not(.hero .reveal-fade)');
const submitBtn = document.getElementById('rsvp-submit');
const formContainer = document.getElementById('form-container');
const successMsg = document.getElementById('success-message');

/* ══════════════════════════════════════════════════════════════
   1. INTERSECTION OBSERVER — Scroll Reveal
   ══════════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(REVEAL_CLASS);
        // Don't unobserve — allow the element to stay visible
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════════════════════════════
   2. NAVIGATION DOTS — Active State
   ══════════════════════════════════════════════════════════════ */
const sectionEls = SECTIONS.map(sel => document.querySelector(sel)).filter(Boolean);

function updateActiveDot() {
  const scrollY = window.scrollY;
  const windowH = window.innerHeight;

  let activeIndex = 0;
  sectionEls.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= windowH * 0.45) activeIndex = i;
  });

  navDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}

// Dot click — smooth scroll to section
navDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const target = sectionEls[i];
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ══════════════════════════════════════════════════════════════
   3. SCROLL LISTENER (throttled)
   ══════════════════════════════════════════════════════════════ */
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveDot();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Initial call
updateActiveDot();

/* ══════════════════════════════════════════════════════════════
   4. VIDEO — Ensure smooth playback on mobile
   ══════════════════════════════════════════════════════════════ */
const heroVideo = document.querySelector('.hero__video');

/* Update poster based on viewport width */
function updateVideoPoster() {
  if (!heroVideo) return;
  const isMobile = window.innerWidth <= 768;
  const posterUrl = isMobile 
    ? 'assets/images/hero-poster-phone.jpg' 
    : 'assets/images/hero-poster.jpg';
  heroVideo.poster = posterUrl;
  // Also update background fallback
  heroVideo.closest('.hero__video-wrap').style.backgroundImage =
    `url('${posterUrl}')`;
}

updateVideoPoster();
window.addEventListener('resize', updateVideoPoster);

if (heroVideo) {
  // Force play if autoplay was blocked (common on iOS)
  const playPromise = heroVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay blocked — video will play on user interaction
    });
  }

  // Pause video when not in viewport to save battery
  const videoObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        heroVideo.play().catch(() => { });
      } else {
        heroVideo.pause();
      }
    },
    { threshold: 0.01 }
  );
  videoObserver.observe(heroVideo);
}

/* ══════════════════════════════════════════════════════════════
   5. RSVP FORM — Validation & Submission
   ══════════════════════════════════════════════════════════════ */
function getFormData() {
  return {
    name: document.getElementById('guest-name')?.value.trim(),
    nickname: document.getElementById('guest-nickname')?.value.trim(),
    phone: document.getElementById('phone')?.value.trim(),
    attendance: document.querySelector('input[name="attendance"]:checked')?.value,
    guests: document.getElementById('guest-count')?.value,
    followName: document.getElementById('guest-follow')?.value.trim(),
    notes: document.getElementById('notes')?.value.trim(),
  };
}

function showFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;

  // Remove existing error
  const existing = input.parentNode.querySelector('.field-error');
  if (existing) existing.remove();

  input.style.borderBottomColor = '#c0392b';

  const err = document.createElement('p');
  err.className = 'field-error';
  err.textContent = message;
  err.style.cssText = `
    color: #c0392b;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 0.08em;
    margin-top: 6px;
  `;
  input.parentNode.appendChild(err);

  // Clear on input
  input.addEventListener('input', () => {
    input.style.borderBottomColor = '';
    err.remove();
  }, { once: true });
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(e => e.remove());
  document.querySelectorAll('.form-input').forEach(i => {
    i.style.borderBottomColor = '';
  });
}

function validateForm(data) {
  let valid = true;
  clearErrors();

  if (!data.name) {
    showFieldError('guest-name', 'กรุณากรอกชื่อ-นามสกุล');
    valid = false;
  }

  if (!data.nickname) {
    showFieldError('guest-nickname', 'กรุณากรอกชื่อเล่น');
    valid = false;
  }

  if (!data.phone) {
    showFieldError('phone', 'กรุณากรอกเบอร์โทรศัพท์');
    valid = false;
  }

  if (!data.attendance) {
    // Highlight radio group
    const radioGroup = document.querySelector('.radio-group');
    if (radioGroup) {
      const existing = radioGroup.parentNode.querySelector('.field-error');
      if (!existing) {
        const err = document.createElement('p');
        err.className = 'field-error';
        err.textContent = 'กรุณาเลือกการเข้าร่วมงาน';
        err.style.cssText = `
          color: #c0392b;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.08em;
          margin-top: 8px;
        `;
        radioGroup.parentNode.appendChild(err);
      }
    }
    valid = false;
  }

  if (!data.guests) {
    showFieldError('guest-count', 'กรุณาเลือกจำนวนผู้เข้าร่วม');
    valid = false;
  } else if (parseInt(data.guests) > 1 && !data.followName) {
    showFieldError('guest-follow', 'กรุณากรอกชื่อผู้ติดตาม');
    valid = false;
  }

  return valid;
}

function setButtonLoading(loading) {
  if (!submitBtn) return;
  const text = submitBtn.querySelector('.btn-text');
  const icon = submitBtn.querySelector('.btn-icon');

  if (loading) {
    submitBtn.disabled = true;
    if (text) text.textContent = 'กำลังส่ง…';
    if (icon) icon.textContent = '↻';
    submitBtn.style.opacity = '0.75';
  } else {
    submitBtn.disabled = false;
    if (text) text.textContent = 'ส่ง RSVP';
    if (icon) icon.textContent = '→';
    submitBtn.style.opacity = '';
  }
}

function showSuccess() {
  if (!formContainer || !successMsg) return;

  // Fade out form
  formContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  formContainer.style.opacity = '0';
  formContainer.style.transform = 'translateY(-10px)';

  setTimeout(() => {
    formContainer.style.display = 'none';
    successMsg.classList.add('visible');
  }, 500);
}

// ใส่ URL ของ Google Apps Script Web App ที่ได้จากการ Deploy ที่นี่
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxpxfpaDLb9x2kCjJZqmkClLCc4uMoyl3T89mfQe1JMV0aQ9vWFsDbhXRsHt2fBnwrTpA/exec';

if (submitBtn) {
  submitBtn.addEventListener('click', async () => {
    const data = getFormData();
    if (!validateForm(data)) return;

    setButtonLoading(true);

    // เตรียมข้อมูลสำหรับส่งไป Google Sheet
    const formData = new FormData();
    // เก็บวันที่และเวลาปัจจุบัน (รูปแบบไทย)
    formData.append('timestamp', new Date().toLocaleString('th-TH'));
    formData.append('name', data.name || '');
    formData.append('nickname', data.nickname || '');
    formData.append('phone', data.phone || '');
    formData.append('attendance', data.attendance || '');
    formData.append('guests', data.guests || '');
    formData.append('followName', data.followName || '');
    formData.append('notes', data.notes || '');

    try {
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE') {
        // ถ้ายังไม่ได้ใส่ URL ให้จำลองการส่งข้อมูล (เอาไว้ทดสอบ)
        await new Promise(resolve => setTimeout(resolve, 1400));
        console.log('RSVP Submitted (Mock):', Object.fromEntries(formData));
      } else {
        // ส่งข้อมูลจริง
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors' // สำคัญ: เพื่อไม่ให้ติดปัญหา CORS
        });
      }

      setButtonLoading(false);
      showSuccess();
    } catch (error) {
      console.error('Error!', error.message);
      setButtonLoading(false);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   6. SMOOTH SCROLL — for any anchor links
   ══════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ══════════════════════════════════════════════════════════════
   7. CURSOR GLOW — Subtle gold cursor trail on desktop
   ══════════════════════════════════════════════════════════════ */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.35s ease, opacity 0.3s ease;
    opacity: 0;
    will-change: transform;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let rafId;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.10;
    glowY += (mouseY - glowY) * 0.10;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    rafId = requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

/* ══════════════════════════════════════════════════════════════
   8. PAGE LOAD — Minimal splash
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});