/* ====== EDIT YOUR EVENT DETAILS HERE ====== */
const EVENT = {
  date: new Date('2026-10-07T09:30:00'),   // year-month-dayTHH:MM:SS
  dateText: 'Sat, 7 October 2026',
  timeText: '9:30 PM onwards',
  venue: 'Main Auditorium'
};
/* ========================================== */

const $ = id => document.getElementById(id);
$('dDate').textContent = EVENT.dateText;
$('dTime').textContent = EVENT.timeText;
$('dVenue').textContent = EVENT.venue;

// Stagger index for card content reveal
[...$('card').children].forEach((el, i) => el.style.setProperty('--i', i));

// Falling flower petals (marigold, rose, saffron)
const colors = ['#f5a623', '#e8590c', '#d6336c', '#ffd43b', '#c92a2a'];
const box = $('petals');
for (let i = 0; i < 26; i++) {
  const p = document.createElement('span');
  const s = 10 + Math.random() * 14;
  p.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s * 1.2}px;` +
    `background:${colors[i % colors.length]};--sway:${(Math.random() - .5) * 140}px;` +
    `animation-duration:${9 + Math.random() * 9}s;animation-delay:${-Math.random() * 14}s`;
  box.appendChild(p);
}

// Door opening
$('openBtn').addEventListener('click', () => {
  const front = $('front');
  front.classList.add('opening');
  document.body.classList.add('opened');
  $('invite').setAttribute('aria-hidden', 'false');
  setTimeout(() => { front.style.transition = 'opacity .8s'; front.style.opacity = 0; }, 2200);
  setTimeout(() => front.remove(), 3100);
});

// Soft 3D tilt on the card (desktop pointer only)
const tilt = $('tilt');
if (matchMedia('(hover:hover)').matches) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / innerWidth - .5) * 6, y = (e.clientY / innerHeight - .5) * -6;
    tilt.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
}

// Countdown
const pad = n => String(n).padStart(2, '0');
function tick() {
  const s = Math.floor(Math.max(0, EVENT.date - new Date()) / 1000);
  $('cd').textContent = pad(Math.floor(s / 86400));
  $('ch').textContent = pad(Math.floor(s % 86400 / 3600));
  $('cm').textContent = pad(Math.floor(s % 3600 / 60));
  $('cs').textContent = pad(s % 60);
}
tick(); setInterval(tick, 1000);
