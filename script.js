document.addEventListener('DOMContentLoaded', () => {
    const roseBox = document.getElementById('roseBox');
    const secretMsg = document.getElementById('secret-message');
    const musicBtn = document.getElementById('musicBtn');
    const audio = document.getElementById('bgMusic');
    const cardParticles = document.getElementById('cardParticles');

    // 1. Create Internal Floating Emojis
    function createCardAmbient() {
        const emojis = ['💖', '✨', '🌸', '🍬'];
        for (let i = 0; i < 12; i++) {
            const span = document.createElement('span');
            span.className = 'floating-emoji';
            span.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            span.style.left = Math.random() * 90 + '%';
            span.style.top = Math.random() * 90 + '%';
            span.style.setProperty('--duration', (Math.random() * 5 + 5) + 's');
            span.style.animationDelay = (Math.random() * 5) + 's';
            cardParticles.appendChild(span);
        }
    }
    createCardAmbient();

    // 2. Music Toggle Function
    function toggleMusic() {
        if (audio.paused) {
            audio.play().then(() => {
                musicBtn.innerHTML = '🎵';
            }).catch(err => console.log("Playback blocked: ", err));
        } else {
            audio.pause();
            musicBtn.innerHTML = '🔇';
        }
    }

    // 3. Rose Click: Explosion + Message + Start Music
    roseBox.addEventListener('click', (e) => {
        if (audio.paused) {
            toggleMusic();
        }
        for (let i = 0; i < 20; i++) {
            spawnHeart(e.clientX, e.clientY, true);
        }
        secretMsg.classList.add('show');
        setTimeout(() => secretMsg.classList.remove('show'), 5000);
    });

    // 4. Music Button Fix
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents clicking button from triggering roseBox click
        toggleMusic();
    });

    // 5. Ambient Sparkles
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.94) {
            spawnHeart(e.clientX, e.clientY, false);
        }
    });

    function spawnHeart(x, y, isBig) {
        const heart = document.createElement('div');
        const emojis = ['💖', '🌸', '✨', '☁️', '🍬'];
        heart.className = 'heart-particle';
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 60;
        
        heart.style.left = (x + offsetX) + 'px';
        heart.style.top = (y + offsetY) + 'px';
        heart.style.fontSize = isBig ? '32px' : '18px';
        
        document.body.appendChild(heart);

        const angle = Math.random() * Math.PI * 2;
        const velocity = isBig ? Math.random() * 250 + 150 : Math.random() * 60 + 30;
        const destX = Math.cos(angle) * velocity;
        const destY = Math.sin(angle) * velocity;

        heart.animate([
            { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
            { transform: `translate(${destX}px, ${destY}px) scale(0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: isBig ? 2000 : 1500,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            fill: 'forwards'
        });

        setTimeout(() => heart.remove(), 2000);
    }

    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 50;
        spawnHeart(x, y, false);
    }, 1200);
});
