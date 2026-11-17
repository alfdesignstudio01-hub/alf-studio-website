document.addEventListener('DOMContentLoaded', () => {
    // 1. MOTION INTRO OVERLAY
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.classList.add('hide-intro');
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 1000);
        }, 3200);
    }

    // 2. HEADER SCROLL EFFECT & MOBILE MENU TOGGLE
    const header = document.getElementById('main-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 3. LANGUAGE SWITCH (EN / ID)
    const langOptions = document.querySelectorAll('.lang-option');
    const translatableLinks = document.querySelectorAll('.nav-link[data-id][data-en]');

    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.getAttribute('data-lang');
            langOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');

            translatableLinks.forEach(link => {
                const text = link.getAttribute(`data-${lang}`);
                if (text) link.textContent = text;
            });
        });
    });

    // 4. THEME TOGGLE (DARK / LIGHT)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
        });
    }

    // 5. HERO SLIDER (SMOOTH SLOW ZOOM + CROSSFADE TANPA SENTAKAN)
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-pagination .dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        const prevIndex = currentSlide;
        currentSlide = (index + slides.length) % slides.length;

        if (prevIndex !== currentSlide) {
            // Biarkan slide sebelumnya tetap melanjutkan zoom saat memudar keluar agar tidak patah
            slides[prevIndex].classList.remove('active');
            slides[prevIndex].classList.add('is-zooming');
            setTimeout(() => {
                slides[prevIndex].classList.remove('is-zooming');
            }, 1300);
        }

        slides[currentSlide].classList.remove('is-zooming');
        slides[currentSlide].classList.add('active');

        dots.forEach((d, idx) => {
            d.classList.toggle('active', idx === currentSlide);
        });
    }

    function startSliderAutoplay() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 6200);
    }

    if (slides.length > 0) {
        startSliderAutoplay();

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
                startSliderAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
                startSliderAutoplay();
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                if (idx !== currentSlide) {
                    showSlide(idx);
                    startSliderAutoplay();
                }
            });
        });
    }

    // 6. INTERACTIVE SPATIAL EXPERIENCE
    const spatialBtns = document.querySelectorAll('.spatial-btn');
    const spatialImgs = document.querySelectorAll('.spatial-img');
    const spatialTitle = document.getElementById('spatialDetailTitle');
    const spatialDesc = document.getElementById('spatialDetailDesc');

    const spatialData = [
        {
            title: 'Struktur & Fasad Tropis',
            desc: 'Aksen Fasad Tropis — Kisi-kisi kayu dan kantilever beton terukur untuk meredam radiasi panas sekaligus menciptakan estetika arsitektural yang tegas.'
        },
        {
            title: 'Courtyard & Ventilasi Silang',
            desc: 'Taman Dalam & Sirkulasi Udara — Bukaan kaca lebar yang terhubung langsung ke courtyard hijau untuk memaksimalkan pencahayaan alami dan aliran udara segar.'
        },
        {
            title: 'Custom Built-in Joinery',
            desc: 'Presisi Furnitur & Material Interior — Perpaduan panel kayu hangat, pencahayaan tersembunyi (indirect lighting), dan furnitur kustom menyatu dengan dinding.'
        }
    ];

    spatialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-layer'), 10);
            spatialBtns.forEach(b => b.classList.remove('active'));
            spatialImgs.forEach(img => img.classList.remove('active'));

            btn.classList.add('active');
            if (spatialImgs[idx]) spatialImgs[idx].classList.add('active');
            if (spatialData[idx] && spatialTitle && spatialDesc) {
                spatialTitle.textContent = spatialData[idx].title;
                spatialDesc.textContent = spatialData[idx].desc;
            }
        });
    });
});
