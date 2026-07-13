// ── scroll progress + nav shrink ──
const progressBar = document.getElementById('progressBar');
const nav = document.getElementById('mainNav');
 
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  nav.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', onScroll, { passive: true });
 
// ── scroll reveal (for hero-sub, hero-actions, hero-stats) ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
 
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
// ── smooth anchor links (nav links to sections that don't exist yet do nothing safely) ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
 
// ── lightweight ambient particle field ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
const PARTICLE_COUNT = window.innerWidth < 768 ? 35 : 70;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
 
function makeParticle() {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.3 + 0.3,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    a: Math.random() * 0.5 + 0.1,
    hue: Math.random() > 0.7 ? 195 : 265,
  };
}
for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(makeParticle());
 
function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) Object.assign(p, makeParticle());
    ctx.globalAlpha = p.a;
    ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}
if (!reduceMotion) requestAnimationFrame(drawParticles);

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    emailjs.send(
        "service_fzw43ro",
        "template_x5710yq",
        {
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            message: document.getElementById("message").value
        }
    )
    .then(function () {
        alert("Message sent successfully!");
        contactForm.reset();
    })
    .catch(function (error) {
        alert("Failed to send message.");
        console.log(error);
    });
});
