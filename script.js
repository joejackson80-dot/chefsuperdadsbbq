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

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // --- Smooth Scroll for All Anchors ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // --- GLightbox Initialization ---
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });

    // --- View All Gallery Toggle ---
    const viewAllBtn = document.getElementById('view-all-gallery');
    const hiddenItems = document.querySelectorAll('.hidden-item');
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            hiddenItems.forEach(item => {
                item.style.display = 'inline-block';
                // Trigger a slight delay for animation
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            });
            viewAllBtn.style.display = 'none';
            // Refresh GLightbox to include new items
            lightbox.reload();
        });
    }

    // --- Scroll Animations ---
    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .service-card, .testimonial-card, .masonry-item, .menu-item').forEach(el => {
        revealObserver.observe(el);
    });
});
