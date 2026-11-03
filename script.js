document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. Portfolio Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    console.log('ALF Studio Website - Phase 2 (About & Portfolio) Loaded');
});
// Tambahkan di dalam document.addEventListener('DOMContentLoaded', () => { ... })

    // 3. Calculator Logic
    const calcType = document.getElementById('calc-type');
    const calcArea = document.getElementById('calc-area');
    const calcTier = document.getElementById('calc-tier');
    const calcOutput = document.getElementById('calc-output');
    const btnSendCalc = document.getElementById('btn-send-calc');

    function calculateCost() {
        if (!calcType || !calcArea || !calcTier || !calcOutput) return;

        const area = parseFloat(calcArea.value) || 0;
        const type = calcType.value;
        const tier = calcTier.value;

        let minRate = 0;
        let maxRate = 0;

        if (type === 'design') {
            minRate = tier === 'standard' ? 75000 : 120000;
            maxRate = tier === 'standard' ? 110000 : 180000;
        } else { // build
            minRate = tier === 'standard' ? 4500000 : 6500000;
            maxRate = tier === 'standard' ? 5500000 : 8500000;
        }

        const minTotal = Math.round(area * minRate);
        const maxTotal = Math.round(area * maxRate);

        const formatIDR = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

        calcOutput.textContent = `${formatIDR(minTotal)} - ${formatIDR(maxTotal)}`;
    }

    if (calcType && calcArea && calcTier) {
        calcType.addEventListener('change', calculateCost);
        calcArea.addEventListener('input', calculateCost);
        calcTier.addEventListener('change', calculateCost);
        calculateCost(); // initial call
    }

    if (btnSendCalc) {
        btnSendCalc.addEventListener('click', () => {
            const area = calcArea.value;
            const typeText = calcType.options[calcType.selectedIndex].text;
            const tierText = calcTier.options[calcTier.selectedIndex].text;
            const resultText = calcOutput.textContent;

            const message = `Halo ALF Studio, saya ingin berkonsultasi mengenai proyek dengan estimasi kalkulator website:%0A%0A- Tipe Layanan: ${typeText}%0A- Luas Bangunan: ${area} m²%0A- Spesifikasi: ${tierText}%0A- Perkiraan Biaya: ${resultText}%0A%0AMohon info ketersediaan jadwal diskusi. Terima kasih!`;
            
            // Ganti nomor WhatsApp studio kamu di sini (format 628...)
            const whatsappNumber = "6285399903567";
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    }

    console.log('ALF Studio Website - Phase 3 (Services, Pubs & Calculator) Loaded');
// 4. Direct WhatsApp Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('client-name').value;
            const location = document.getElementById('client-location').value;
            const service = document.getElementById('client-service').value;
            const messageText = document.getElementById('client-message').value;

            const fullMessage = `Halo ALF Studio, saya ingin mengajukan diskusi/inquiry proyek:%0A%0A- Nama: ${name}%0A- Lokasi Lahan: ${location}%0A- Layanan: ${service}%0A- Pesan/Kebutuhan: ${messageText}%0A%0AMohon informasi lebih lanjut. Terima kasih!`;
            
            // Masukkan nomor WA studio kamu di sini (format internasional 62...)
            const whatsappNumber = "6285399903567";
            window.open(`https://wa.me/${whatsappNumber}?text=${fullMessage}`, '_blank');
        });
    }

// Tambahkan baris ini di dalam document.addEventListener('DOMContentLoaded', () => { ... })

    // Auto Hide Intro Overlay setelah 2.2 Detik
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.classList.add('hide-intro');
            
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 1000);
        }, 3800); // 3.8 detik
    }
