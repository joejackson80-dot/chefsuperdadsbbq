/* JS for Chef SuperDad's BBQ - Redesign Edition */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // --- Ember Particle Effect ---
    const canvas = document.getElementById('ember-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        class Particle {
            constructor() {
                this.init();
            }
            init() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100;
                this.size = Math.random() * 2 + 1;
                this.speedY = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.8 + 0.2;
                this.color = Math.random() > 0.5 ? '#ff9d00' : '#d32f2f';
            }
            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                this.opacity -= 0.003;
                if (this.opacity <= 0) this.init();
            }
            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        for (let i = 0; i < 80; i++) particles.push(new Particle());
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- Carousel Logic ---
    const track = document.getElementById('carousel-track');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    
    if (track) {
        let index = 0;
        const slides = track.children;
        
        function updateCarousel() {
            const slideWidth = slides[0].getBoundingClientRect().width + 20; // 20 is the gap
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        nextBtn.addEventListener('click', () => {
            const visibleCount = window.innerWidth > 992 ? 3 : (window.innerWidth > 576 ? 2 : 1);
            if (index < slides.length - visibleCount) {
                index++;
                updateCarousel();
            } else {
                index = 0; // Loop
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateCarousel();
            }
        });

        window.addEventListener('resize', updateCarousel);
    }

    // --- Text Reveal & Scroll Animations ---
    const observerOptions = { threshold: 0.2 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .menu-grid-layout, .carousel-slide').forEach(el => {
        revealObserver.observe(el);
    });

    // Add styles for the animations
    const style = document.createElement('style');
    style.textContent = `
        .reveal-text { opacity: 0; transform: translateY(30px); transition: all 1s ease-out; }
        .reveal-text.active { opacity: 1; transform: translateY(0); }
        .menu-grid-layout { opacity: 0; transform: scale(0.95); transition: all 1s ease-out; }
        .menu-grid-layout.active { opacity: 1; transform: scale(1); }
    `;
    document.head.appendChild(style);
});
