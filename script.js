document.addEventListener('DOMContentLoaded', () => {

    // 1. MOTION INTRO OVERLAY (3.2 DETIK AUTO-HIDE)
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.classList.add('hide-intro');
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 1000);
        }, 2800);
    }

    // 2. HEADER SCROLL EFFECT
    const mainHeader = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (mainHeader) {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        }
    });

    // 3. MOBILE MENU TOGGLE
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 4. HERO SLIDER INTERAKSI
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-pagination .dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        dots.forEach((dot, idx) => dot.addEventListener('click', () => showSlide(idx)));

        sliderInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 6000);
    }

    // 5. THEME TOGGLE (LIGHT / DARK MODE)
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 6. INTERACTIVE SPATIAL LAYER & PERSPECTIVE EXPLORER (MOTION FEATURE)
    const spatialBtns = document.querySelectorAll('.spatial-btn');
    const spatialLayers = document.querySelectorAll('.spatial-layer-img');
    const hotspots = document.querySelectorAll('.hotspot');
    const panelTitle = document.getElementById('panelTitle');
    const panelDesc = document.getElementById('panelDesc');

    const spatialData = {
        structure: {
            title: "01. Struktur & Fasad Tropis",
            desc: "Kisi-kisi kayu tropis dan kantilever beton presisi meredam radiasi panas matahari sore Pekanbaru secara signifikan."
        },
        lighting: {
            title: "02. Orientasi Cahaya & Sirkulasi Angin",
            desc: "Courtyard terbuka di tengah hunian menghidupkan sirkulasi udara silang dan pencahayaan matahari alami sepanjang hari."
        },
        interior: {
            title: "03. Interior & Built-in Furniture",
            desc: "Perancangan interior kustom terintegrasi dengan material sintered stone dan pencahayaan warm ambient tersembunyi."
        }
    };

    if (spatialBtns.length > 0) {
        spatialBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const layer = btn.getAttribute('data-layer');
                spatialBtns.forEach(b => b.classList.remove('active'));
                spatialLayers.forEach(l => l.classList.remove('active'));

                btn.classList.add('active');
                const targetLayer = document.querySelector(`.layer-${layer}`);
                if (targetLayer) targetLayer.classList.add('active');

                if (spatialData[layer] && panelTitle && panelDesc) {
                    panelTitle.textContent = spatialData[layer].title;
                    panelDesc.textContent = spatialData[layer].desc;
                }
            });
        });

        hotspots.forEach(spot => {
            spot.addEventListener('click', () => {
                const info = spot.getAttribute('data-info');
                if (info && panelDesc) {
                    panelDesc.textContent = info;
                }
            });
        });
    }

    // 7. PORTOFOLIO FILTER & PENCARIAN HALAMAN KHUSUS (PROJECTS.HTML)
    const mainPills = document.querySelectorAll('.pill-btn');
    const subCapsules = document.querySelectorAll('.capsule-btn');
    const archCards = document.querySelectorAll('.arch-card');
    const projectSearch = document.getElementById('projectSearch');
    const visibleCount = document.getElementById('visible-count');

    function filterPortfolioPage() {
        if (archCards.length === 0) return;

        const activePill = document.querySelector('.pill-btn.active');
        const activeCapsule = document.querySelector('.capsule-btn.active');

        const mainVal = activePill ? activePill.getAttribute('data-main-filter') : 'all';
        const capsuleVal = activeCapsule ? activeCapsule.getAttribute('data-filter') : 'all';
        const searchVal = projectSearch ? projectSearch.value.toLowerCase().trim() : '';

        let count = 0;

        archCards.forEach(card => {
            const mainCat = card.getAttribute('data-main') || '';
            const subCat = card.getAttribute('data-sub') || '';
            const cardCat = card.getAttribute('data-category') || '';
            const title = card.getAttribute('data-title') || '';
            const city = card.getAttribute('data-city') || '';

            const matchesMain = (mainVal === 'all' || mainCat === mainVal);
            const matchesCapsule = (capsuleVal === 'all' || subCat === capsuleVal || cardCat === capsuleVal);
            const matchesSearch = (title.includes(searchVal) || city.includes(searchVal));

            if (matchesMain && matchesCapsule && matchesSearch) {
                card.classList.remove('hide');
                count++;
            } else {
                card.classList.add('hide');
            }
        });

        if (visibleCount) visibleCount.textContent = count;
    }

    if (mainPills.length > 0) {
        mainPills.forEach(pill => {
            pill.addEventListener('click', () => {
                mainPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                filterPortfolioPage();
            });
        });

        subCapsules.forEach(cap => {
            cap.addEventListener('click', () => {
                subCapsules.forEach(c => c.classList.remove('active'));
                cap.classList.add('active');
                filterPortfolioPage();
            });
        });

        if (projectSearch) {
            projectSearch.addEventListener('input', filterPortfolioPage);
        }
    }

    // 8. LOGIKA KALKULATOR RAB & WHATSAPP
    const calcType = document.getElementById('calc-type');
    const calcArea = document.getElementById('calc-area');
    const calcTier = document.getElementById('calc-tier');
    const calcOutput = document.getElementById('calc-output');
    const btnSendCalc = document.getElementById('btn-send-calc');

    function calculateRAB() {
        if (!calcArea || !calcOutput) return;

        const area = parseFloat(calcArea.value) || 0;
        const type = calcType ? calcType.value : 'design';
        const tier = calcTier ? calcTier.value : 'standard';

        let minRate = 0, maxRate = 0;

        if (type === 'design') {
            minRate = tier === 'standard' ? 75000 : 120000;
            maxRate = tier === 'standard' ? 110000 : 180000;
        } else {
            minRate = tier === 'standard' ? 4500000 : 6500000;
            maxRate = tier === 'standard' ? 5500000 : 8500000;
        }

        const minTotal = Math.round(area * minRate);
        const maxTotal = Math.round(area * maxRate);

        const formatIDR = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
        calcOutput.textContent = `${formatIDR(minTotal)} - ${formatIDR(maxTotal)}`;
    }

    if (calcArea) {
        if (calcType) calcType.addEventListener('change', calculateRAB);
        calcArea.addEventListener('input', calculateRAB);
        if (calcTier) calcTier.addEventListener('change', calculateRAB);
        calculateRAB();
    }

    if (btnSendCalc) {
        btnSendCalc.addEventListener('click', () => {
            const area = calcArea.value;
            const typeText = calcType.options[calcType.selectedIndex].text;
            const tierText = calcTier.options[calcTier.selectedIndex].text;
            const resultText = calcOutput.textContent;

            const message = `Halo ALF Studio, saya ingin berkonsultasi mengenai proyek dengan estimasi kalkulator website:%0A%0A- Tipe Layanan: ${typeText}%0A- Luas Bangunan: ${area} m²%0A- Spesifikasi: ${tierText}%0A- Perkiraan Biaya: ${resultText}%0A%0AMohon info ketersediaan jadwal diskusi. Terima kasih!`;
            window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
        });
    }

    // 9. LOGIKA FORM CONTACT WHATSAPP
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('client-name').value;
            const location = document.getElementById('client-location').value;
            const service = document.getElementById('client-service').value;
            const messageText = document.getElementById('client-message').value;

            const fullMessage = `Halo ALF Studio, saya ingin mengajukan diskusi/inquiry proyek:%0A%0A- Nama: ${name}%0A- Lokasi Lahan: ${location}%0A- Layanan: ${service}%0A- Pesan/Kebutuhan: ${messageText}%0A%0AMohon informasi lebih lanjut. Terima kasih!`;
            window.open(`https://wa.me/6281234567890?text=${fullMessage}`, '_blank');
        });
    }
});
