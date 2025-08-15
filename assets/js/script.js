// small helpers & initial setup
document.getElementById('year').textContent = new Date().getFullYear();

// PARALLAX: avatar + speech bubble follows mouse relative to hero area
(function(){
  const hero = document.querySelector('.hero');
  const avatarWrap = document.getElementById('avatarWrap');
  const speech = document.getElementById('speech');
  const pow = document.getElementById('pow');

  // limit movement
  const maxTranslate = 12;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // avatar tilts & translates
    const ax = x * maxTranslate;
    const ay = y * maxTranslate * -1;
    avatarWrap.style.transform = `translate(${ax}px, ${ay}px) rotate(${x * 4}deg)`;

    // speech bubble moves opposite a little
    speech.style.transform = `translate(${(-x * 18).toFixed(2)}px, ${(-y * 10).toFixed(2)}px) rotate(${x * 2}deg)`;
    speech.style.transition = 'transform .08s linear';

  });

  hero.addEventListener('mouseleave', () => {
    avatarWrap.style.transform = '';
    speech.style.transform = '';
  });

  // POW animation on avatar click
  avatarWrap.addEventListener('click', () => {
    // show pow
    pow.style.visibility = 'visible';
    pow.style.opacity = '1';
    pow.style.transform = 'scale(1.12) translateY(-6px)';
    pow.animate([
      { transform: 'scale(.6) translateY(0)', opacity: 0 },
      { transform: 'scale(1.18) translateY(-18px)', opacity: 1 },
      { transform: 'scale(.9) translateY(-6px)', opacity: 0 }
    ], { duration: 2000, easing: 'cubic-bezier(.2,.9,.3,1)'});

    // auto hide
    setTimeout(() => {
      pow.style.opacity = 0;
      pow.style.visibility = 'hidden';
    }, 700);
  });
})();


// SCROLL REVEAL: reveal elements when they enter viewport
(function(){
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: .15});

  reveals.forEach(r => obs.observe(r));
})();


// Tiny accessible keyboard focus: focus avatar with keyboard to trigger pow
(function(){
  const avatarWrap = document.getElementById('avatarWrap');
  avatarWrap.setAttribute('tabindex', '0');
  avatarWrap.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      avatarWrap.click();
      e.preventDefault();
    }
  });
})();

// Mobile Menu Toggle with smooth animation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function() {
  navLinks.classList.toggle('show');
});

