document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 4px 24px #00c6ff88';
        card.style.transform = 'scale(1.04)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        card.style.transform = '';
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progressBar = document.getElementById('progress');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 18 + 7; 
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.style.opacity = '1';
                }, 400);
            }, 350);
        }
    }, 120);
});
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        const targetId = e.target.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            window.scrollTo({
                top: targetSection.offsetTop - 40,
                behavior: 'smooth'
            });
        }
    }
});
const sections = document.querySelectorAll('main section');
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY || document.documentElement.scrollTop;
    sections.forEach(section => {
        const offset = section.offsetTop - 120;
        const height = section.offsetHeight;
        if (scrollPos >= offset && scrollPos < offset + height) {
            section.style.boxShadow = '0 6px 32px #00c6ff55';
            section.style.transform = 'scale(1.02)';
        } else {
            section.style.boxShadow = '';
            section.style.transform = '';
        }
    });
});