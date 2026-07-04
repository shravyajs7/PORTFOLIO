// ============================================================
// YEAR
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// NAV SCROLL STATE + PROGRESS
// ============================================================
const nav = document.getElementById('nav');
const progressFill = document.getElementById('progressFill');

function onScroll(){
  nav.classList.toggle('scrolled', window.scrollY > 20);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  progressFill.style.width = progress + '%';
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

// ============================================================
// MOBILE MENU
// ============================================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================================
// TYPED ROLE ROTATOR
// ============================================================
const typeTarget = document.getElementById('typeTarget');
const phrases = [
  'Java & Spring',
  'React & Node.js',
  'IoT & Embedded Systems',
  'Full‑Stack Web Apps',
  'Clean, Scalable Code'
];

let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = phrases[phraseIndex];

  if(!deleting){
    charIndex++;
    typeTarget.textContent = current.slice(0, charIndex);
    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typeTarget.textContent = current.slice(0, charIndex);
    if(charIndex === 0){
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// ============================================================
// COUNT-UP STATS
// ============================================================
const statNums = document.querySelectorAll('.stat__num');

function animateCount(el){
  const target = parseFloat(el.dataset.count);
  const isDecimal = String(target).includes('.');
  const duration = 1200;
  const start = performance.now();

  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = isDecimal ? value.toFixed(2) : Math.round(value);
    if(progress < 1) requestAnimationFrame(tick);
    else el.textContent = isDecimal ? target.toFixed(2) : target;
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

// ============================================================
// AMBIENT CIRCUIT-NODE CANVAS (signature background element)
// ============================================================
const canvas = document.getElementById('circuit');
const ctx = canvas.getContext('2d');
let w, h, nodes;
const NODE_COUNT_BASE = 5000; // px^2 per node, scales with viewport

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  const count = Math.min(60, Math.floor((w * h) / (NODE_COUNT_BASE * 24)));
  nodes = Array.from({length: count}, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
  }));
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function draw(){
  ctx.clearRect(0, 0, w, h);
  const linkDist = 150;

  for(const n of nodes){
    n.x += n.vx; n.y += n.vy;
    if(n.x < 0 || n.x > w) n.vx *= -1;
    if(n.y < 0 || n.y > h) n.vy *= -1;
  }

  for(let i = 0; i < nodes.length; i++){
    for(let j = i + 1; j < nodes.length; j++){
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < linkDist){
        ctx.strokeStyle = `rgba(124,92,255,${0.12 * (1 - dist / linkDist)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for(const n of nodes){
    ctx.fillStyle = 'rgba(201,169,97,0.55)';
    ctx.beginPath();
    ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  if(!prefersReducedMotion) requestAnimationFrame(draw);
}

resize();
window.addEventListener('resize', resize);
if(!prefersReducedMotion){
  requestAnimationFrame(draw);
} else {
  draw();
}
