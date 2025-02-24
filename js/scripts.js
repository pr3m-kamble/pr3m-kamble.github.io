document.addEventListener('DOMContentLoaded', () => {
    // Terminal typing effect
    const terminal = document.getElementById('terminal');
    const text = "> SYSTEM STATUS: ONLINE\n> ENCRYPTION LEVEL: MAXIMUM\n> LAST UPDATE: 2077-11-23 \n> MADE BY _PR3M_";
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            terminal.innerHTML = text.substring(0, index) + '<span class="cursor"></span>';
            index++;
            setTimeout(typeText, 50);
        } else {
            terminal.innerHTML = text;
        }
    }
    typeText();

    // Glitch effect
    const glitchText = document.querySelector('.glitch-text');
    setInterval(() => {
        glitchText.style.textShadow = `
            ${Math.random() * 5}px ${Math.random() * 5}px ${Math.random() * 5}px rgba(0,255,0,0.9),
            ${Math.random() * -5}px ${Math.random() * -5}px ${Math.random() * 5}px rgba(255,0,255,0.9)
        `;
    }, 100);

    // Smooth scroll
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = document.getElementById(item.dataset.section);
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Skill bar animation
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.width;
                    }, index * 300);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.75 });

    skillsObserver.observe(skillsSection);

    // Random project card glitch
    document.querySelectorAll('.project-card').forEach(card => {
        setInterval(() => {
            if(Math.random() > 0.8) {
                card.style.transform = `translateX(${Math.random() * 5 - 2.5}px)`;
                setTimeout(() => {
                    card.style.transform = 'none';
                }, 50);
            }
        }, 1000);
    });

    // Gallery hover effect
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.filter = 'none';
        });
        img.addEventListener('mouseout', () => {
            img.style.filter = 'sepia(100%) hue-rotate(90deg)';
        });
    });
});