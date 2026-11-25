(() => {
  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  ready(() => {
    const body = document.body;
    const root = document.documentElement;
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-list');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const mediaDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const reducedMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

    // Hero metadata follows the active highlight visual and the selected language.
    const syncHeroMeta = (slide, index, total) => {
      if (!slide) return;
      const language = body.dataset.lang === 'en' ? 'en' : 'id';
      const meta = document.querySelector('[data-hero-meta]');
      const indexNode = document.querySelector('[data-hero-meta-index]');
      const disciplineNode = document.querySelector('[data-hero-meta-discipline]');
      const focusNode = document.querySelector('[data-hero-meta-focus]');
      if (meta && !reducedMotion) meta.classList.add('is-refreshing');
      if (indexNode) indexNode.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
      if (disciplineNode) disciplineNode.textContent = slide.dataset[`metaDiscipline${language === 'en' ? 'En' : 'Id'}`] || '';
      if (focusNode) focusNode.textContent = slide.dataset[`metaFocus${language === 'en' ? 'En' : 'Id'}`] || '';
      if (meta && !reducedMotion) window.requestAnimationFrame(() => meta.classList.remove('is-refreshing'));
    };

    // System-following theme by default; a visitor's manual choice is remembered across pages.
    let themePreference = 'system';
    try { themePreference = localStorage.getItem('alf-theme') ? 'manual' : 'system'; } catch (_) {}
    const systemTheme = () => mediaDark && mediaDark.matches ? 'dark' : 'light';
    const currentTheme = () => root.dataset.theme === 'dark' ? 'dark' : 'light';
    const updateThemeControl = () => {
      if (!themeToggle) return;
      const dark = currentTheme() === 'dark';
      themeToggle.setAttribute('aria-pressed', String(dark));
      themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
    };
    const applyTheme = (theme) => {
      root.dataset.theme = theme;
      if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#202225' : '#e1e3e6');
      updateThemeControl();
    };
    applyTheme(root.dataset.theme || systemTheme());
    themeToggle?.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      themePreference = 'manual';
      try { localStorage.setItem('alf-theme', next); } catch (_) {}
      applyTheme(next);
    });
    const onSystemThemeChange = () => {
      if (themePreference === 'system') applyTheme(systemTheme());
    };
    if (mediaDark?.addEventListener) mediaDark.addEventListener('change', onSystemThemeChange);
    else if (mediaDark?.addListener) mediaDark.addListener(onSystemThemeChange);

    // WhatsApp links use the studio's configured contact number.
    const config = window.ALF_CONFIG || {};
    const rawNumber = String(config.whatsapp || '').replace(/\D/g, '');
    const validNumber = rawNumber.length >= 10 && rawNumber !== '6281234567890';
    const makeWhatsAppUrl = (message) => validNumber
      ? `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`
      : 'https://wa.me/';
    function updateWhatsAppLinks() {
      const language = body.dataset.lang === 'en' ? 'en' : 'id';
      document.querySelectorAll('[data-whatsapp]').forEach(link => {
        const message = language === 'en'
          ? (link.dataset.waEn || 'Hello ALF Studio, I would like to discuss a project.')
          : (link.dataset.waId || 'Halo ALF Studio, saya ingin berkonsultasi mengenai proyek.');
        link.href = makeWhatsAppUrl(message);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      });
    }

    // Language preference is shared by all pages.
    const languageToggle = document.querySelector('.lang-toggle');
    const setLanguage = (language) => {
      const next = language === 'en' ? 'en' : 'id';
      body.dataset.lang = next;
      document.documentElement.lang = next;
      if (languageToggle) {
        languageToggle.setAttribute('aria-label', next === 'id' ? 'Switch to English' : 'Beralih ke Bahasa Indonesia');
        languageToggle.innerHTML = next === 'id'
          ? '<span class="active-lang">ID</span><span class="slash">/</span><span>EN</span>'
          : '<span>ID</span><span class="slash">/</span><span class="active-lang">EN</span>';
      }
      try { localStorage.setItem('alf-language', next); } catch (_) {}
      updateWhatsAppLinks();
      const activeHeroSlide = document.querySelector('[data-hero-slide].is-active');
      if (activeHeroSlide) {
        const heroSlides = [...document.querySelectorAll('[data-hero-slide]')];
        syncHeroMeta(activeHeroSlide, Math.max(0, heroSlides.indexOf(activeHeroSlide)), heroSlides.length);
      }
      const selectedCaption = document.querySelector('[data-selected-caption]');
      const activeSelectedPanel = document.querySelector('[data-selected-panel].is-active');
      if (selectedCaption && activeSelectedPanel) {
        const categoryLabel = activeSelectedPanel.querySelector('.selected-panel-category .lang-' + next);
        if (categoryLabel) selectedCaption.textContent = `${next === 'en' ? 'Visual reference' : 'Visual referensi'} · ${categoryLabel.textContent.trim()}`;
      }
      const projectSearch = document.querySelector('#project-search');
      if (projectSearch) projectSearch.placeholder = next === 'en' ? 'Name, category or location' : 'Nama, kategori, atau lokasi';
      const projectCount = document.querySelector('[data-project-count]');
      if (projectCount) {
        const visible = document.querySelectorAll('.project-card:not(.is-hidden)').length;
        projectCount.textContent = `${String(visible).padStart(2, '0')} ${next === 'en' ? 'visual references' : 'referensi visual'}`;
      }
    };
    let preferredLanguage = 'id';
    try { preferredLanguage = localStorage.getItem('alf-language') || 'id'; } catch (_) {}
    setLanguage(preferredLanguage);
    languageToggle?.addEventListener('click', () => setLanguage(body.dataset.lang === 'en' ? 'id' : 'en'));

    // Accessible slide-in navigation on mobile.
    const closeMenu = () => {
      if (!menuToggle || !nav) return;
      nav.classList.remove('open');
      body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    };
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        body.classList.toggle('menu-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        if (isOpen) nav.querySelector('a')?.focus({ preventScroll: true });
      });
      nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('open')) {
          closeMenu();
          menuToggle.focus({ preventScroll: true });
        }
      });
      document.addEventListener('click', (event) => {
        if (nav.classList.contains('open') && !nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
      });
      window.addEventListener('resize', () => { if (window.innerWidth > 850) closeMenu(); }, { passive: true });
    }

    // Sticky header state and dynamic copyright year.
    const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

    // Scroll reveal and restrained parallax.
    if ('IntersectionObserver' in window && !reducedMotion) {
      body.classList.add('motion-ready');
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
      document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
    }
    const parallaxVisual = document.querySelector('[data-parallax]');
    if (parallaxVisual && !reducedMotion) {
      let ticking = false;
      const updateParallax = () => {
        const rect = parallaxVisual.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        parallaxVisual.style.setProperty('--parallax-y', `${Math.max(-12, Math.min(12, progress * -9))}px`);
        ticking = false;
      };
      window.addEventListener('scroll', () => {
        if (!ticking) { window.requestAnimationFrame(updateParallax); ticking = true; }
      }, { passive: true });
      updateParallax();
      parallaxVisual.addEventListener('pointermove', (event) => {
        if (event.pointerType === 'touch') return;
        const rect = parallaxVisual.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 14;
        parallaxVisual.style.setProperty('--pointer-x', `${x.toFixed(2)}px`);
      });
      parallaxVisual.addEventListener('pointerleave', () => parallaxVisual.style.setProperty('--pointer-x', '0px'));
    }

    // Homepage hero carousel: auto-advance, manual arrows/dots, pause on hover or hidden tab.
    const heroSlider = document.querySelector('[data-hero-slider]');
    if (heroSlider) {
      const slides = [...heroSlider.querySelectorAll('[data-hero-slide]')];
      const dots = [...document.querySelectorAll('[data-hero-dot]')];
      const count = document.querySelector('[data-hero-count]');
      const previous = document.querySelector('[data-hero-prev]');
      const next = document.querySelector('[data-hero-next]');
      let active = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
      let timer = null;
      let paused = false;
      const interval = 7200;
      const showSlide = (index) => {
        active = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => {
          const selected = i === active;
          slide.classList.toggle('is-active', selected);
          slide.setAttribute('aria-hidden', String(!selected));
        });
        dots.forEach((dot, i) => {
          const selected = i === active;
          dot.classList.toggle('is-active', selected);
          dot.setAttribute('aria-current', String(selected));
        });
        if (count) count.innerHTML = `${String(active + 1).padStart(2, '0')} <i>/</i> ${String(slides.length).padStart(2, '0')}`;
        syncHeroMeta(slides[active], active, slides.length);
      };
      const stopTimer = () => { if (timer) window.clearInterval(timer); timer = null; };
      const startTimer = () => {
        stopTimer();
        if (!reducedMotion && !paused && slides.length > 1 && !document.hidden) {
          timer = window.setInterval(() => showSlide(active + 1), interval);
        }
      };
      previous?.addEventListener('click', () => { showSlide(active - 1); startTimer(); });
      next?.addEventListener('click', () => { showSlide(active + 1); startTimer(); });
      dots.forEach(dot => dot.addEventListener('click', () => {
        const index = Number(dot.dataset.heroDot);
        if (Number.isFinite(index)) showSlide(index);
        startTimer();
      }));
      let touchStartX = null;
      heroSlider.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'touch') touchStartX = event.clientX;
      }, { passive: true });
      heroSlider.addEventListener('pointerup', (event) => {
        if (touchStartX === null || event.pointerType !== 'touch') return;
        const deltaX = event.clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(deltaX) > 48) {
          showSlide(active + (deltaX < 0 ? 1 : -1));
          startTimer();
        }
      }, { passive: true });
      heroSlider.addEventListener('pointercancel', () => { touchStartX = null; }, { passive: true });
      heroSlider.addEventListener('mouseenter', () => { paused = true; stopTimer(); });
      heroSlider.addEventListener('mouseleave', () => { paused = false; startTimer(); });
      heroSlider.addEventListener('focusin', () => { paused = true; stopTimer(); });
      heroSlider.addEventListener('focusout', () => { paused = false; startTimer(); });
      document.addEventListener('visibilitychange', startTimer);
      showSlide(active);
      startTimer();
    }

    // Portfolio filters, live search, and Gallery / List switch.
    const projectCards = [...document.querySelectorAll('.project-card')];
    const filterButtons = [...document.querySelectorAll('[data-filter]')];
    const search = document.querySelector('#project-search');
    const empty = document.querySelector('.project-empty');
    const count = document.querySelector('[data-project-count]');
    const list = document.querySelector('.project-list');
    const viewButtons = [...document.querySelectorAll('[data-view]')];
    let activeFilter = 'all';
    const applyFilters = () => {
      if (!projectCards.length) return;
      const term = (search?.value || '').trim().toLowerCase();
      let shown = 0;
      projectCards.forEach(card => {
        const categories = (card.dataset.category || '').toLowerCase().split(/\s+/);
        const categoryMatch = activeFilter === 'all' || categories.includes(activeFilter);
        const searchable = `${card.dataset.title || ''} ${card.dataset.location || ''} ${card.dataset.category || ''}`.toLowerCase();
        const visible = categoryMatch && (!term || searchable.includes(term));
        card.classList.toggle('is-hidden', !visible);
        if (visible) shown++;
      });
      if (empty) empty.style.display = shown ? 'none' : 'block';
      if (count) count.textContent = `${String(shown).padStart(2, '0')} ${body.dataset.lang === 'en' ? 'visual references' : 'referensi visual'}`;
    };
    filterButtons.forEach(button => button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      applyFilters();
    }));
    search?.addEventListener('input', applyFilters);
    viewButtons.forEach(button => button.addEventListener('click', () => {
      const view = button.dataset.view;
      viewButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      list?.classList.toggle('list-view', view === 'list');
    }));
    applyFilters();

    // Brand intro: play on the homepage every time it is entered, including BFCache returns.
    const preloader = document.querySelector('[data-preloader]');
    const homePath = location.pathname.toLowerCase();
    const isHomePage = homePath.endsWith('/') || homePath.endsWith('/index.html');
    if (preloader && !isHomePage) {
      preloader.remove();
    } else if (preloader && isHomePage) {
      let introTimer = 0;
      let hideTimer = 0;
      const restartAnimation = (node) => {
        if (!node) return;
        node.style.animation = 'none';
        void node.offsetWidth;
        node.style.animation = '';
      };
      const playHomeIntro = () => {
        window.clearTimeout(introTimer);
        window.clearTimeout(hideTimer);
        root.classList.remove('loader-seen');
        root.classList.add('loader-playing');
        preloader.classList.remove('is-leaving');
        restartAnimation(preloader.querySelector('.preloader-logo'));
        restartAnimation(preloader.querySelector('.preloader-studio'));
        restartAnimation(preloader.querySelector('.preloader-line span'));
        restartAnimation(preloader.querySelector('.preloader-content > p'));
        introTimer = window.setTimeout(() => {
          preloader.classList.add('is-leaving');
          root.classList.remove('loader-playing');
          hideTimer = window.setTimeout(() => root.classList.add('loader-seen'), reducedMotion ? 60 : 760);
        }, reducedMotion ? 280 : 1880);
      };
      playHomeIntro();
      window.addEventListener('pageshow', (event) => {
        if (event.persisted) playHomeIntro();
      });
    }

    // Selected Visuals: a single shared backdrop crossfades to the panel under the pointer.
    const selectedStage = document.querySelector('[data-selected-stage]');
    if (selectedStage) {
      const track = selectedStage.querySelector('[data-selected-track]');
      const panels = [...selectedStage.querySelectorAll('[data-selected-panel]')];
      const backgrounds = [...selectedStage.querySelectorAll('[data-selected-bg]')];
      const caption = selectedStage.querySelector('[data-selected-caption]');
      let frontLayer = Math.max(0, backgrounds.findIndex(layer => layer.classList.contains('is-active')));
      let currentImage = backgrounds[frontLayer]?.getAttribute('src') || '';
      let switchToken = 0;
      const getCaption = (panel) => {
        const label = panel.querySelector('.selected-panel-category .lang-' + (body.dataset.lang === 'en' ? 'en' : 'id'));
        return label?.textContent.trim() || 'Visual reference';
      };
      const changeBackdrop = (panel) => {
        const nextImage = panel.dataset.selectedImage || '';
        if (!nextImage || nextImage === currentImage || backgrounds.length < 2) return;
        const token = ++switchToken;
        const incomingIndex = frontLayer === 0 ? 1 : 0;
        const incoming = backgrounds[incomingIndex];
        incoming.classList.remove('is-active');
        let committed = false;
        const commitImage = () => {
          if (committed) return;
          committed = true;
          incoming.removeEventListener('load', commitImage);
          incoming.removeEventListener('error', failImage);
          if (token !== switchToken) return;
          backgrounds[frontLayer].classList.remove('is-active');
          incoming.classList.add('is-active');
          frontLayer = incomingIndex;
          currentImage = nextImage;
        };
        const failImage = () => {
          incoming.removeEventListener('load', commitImage);
          incoming.removeEventListener('error', failImage);
        };
        incoming.addEventListener('load', commitImage, { once: true });
        incoming.addEventListener('error', failImage, { once: true });
        incoming.src = nextImage;
        if (incoming.complete && incoming.naturalWidth > 0) commitImage();
      };
      const activatePanel = (panel) => {
        panels.forEach(item => {
          const active = item === panel;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        changeBackdrop(panel);
        if (caption) {
          const text = getCaption(panel);
          const idPrefix = body.dataset.lang === 'en' ? 'Visual reference' : 'Visual referensi';
          caption.textContent = `${idPrefix} · ${text}`;
        }
      };
      panels.forEach(panel => {
        panel.addEventListener('pointerenter', event => {
          if (event.pointerType === 'mouse' || event.pointerType === 'pen') activatePanel(panel);
        });
        panel.addEventListener('focus', () => activatePanel(panel));
        panel.addEventListener('click', () => {
          activatePanel(panel);
          if (window.matchMedia('(max-width: 850px)').matches) {
            panel.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
          }
        });
      });
      if ('IntersectionObserver' in window && track && window.matchMedia('(max-width: 850px)').matches) {
        const panelObserver = new IntersectionObserver(entries => {
          const mostVisible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (mostVisible && mostVisible.intersectionRatio > .48) activatePanel(mostVisible.target);
        }, { root: track, threshold: [.35, .5, .65, .8] });
        panels.forEach(panel => panelObserver.observe(panel));
      }
    }

    // The Studio Approach uses a sticky image plane while the narrative cards move over it.
    const approachSection = document.querySelector('.approach-pinned');
    const approachImage = approachSection?.querySelector('.approach-pinned-media img');
    if (approachSection && approachImage && !reducedMotion) {
      let approachTicking = false;
      const updateApproachDrift = () => {
        const rect = approachSection.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        const drift = (progress - .5) * -34;
        approachImage.style.setProperty('--approach-drift', `${drift.toFixed(1)}px`);
        approachTicking = false;
      };
      window.addEventListener('scroll', () => {
        if (!approachTicking) {
          window.requestAnimationFrame(updateApproachDrift);
          approachTicking = true;
        }
      }, { passive: true });
      updateApproachDrift();
    }

    // Scroll-driven workflow highlight: keep every stage visible and advance the active card by viewport.
    document.querySelectorAll('[data-workflow-sequence]').forEach(sequence => {
      const pin = sequence.querySelector('.workflow-pin');
      const cards = [...sequence.querySelectorAll('[data-workflow-card]')];
      const progressFill = sequence.querySelector('[data-workflow-progress-fill]');
      if (!pin || cards.length < 2) return;

      let headerHeight = header?.getBoundingClientRect().height || 82;
      let pinHeight = 0;
      let activeIndex = -1;
      let scrollFrame = 0;

      const activate = (index) => {
        const next = Math.max(0, Math.min(cards.length - 1, index));
        if (next === activeIndex) return;
        activeIndex = next;
        cards.forEach((card, i) => {
          const active = i === activeIndex;
          card.classList.toggle('is-active', active);
          card.setAttribute('aria-pressed', String(active));
          if (active) card.setAttribute('aria-current', 'step');
          else card.removeAttribute('aria-current');
        });
        if (progressFill) {
          const fraction = activeIndex / (cards.length - 1);
          progressFill.style.transform = `scaleX(${fraction})`;
        }
      };

      const updateFromScroll = () => {
        const rect = sequence.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sequenceStart = sectionTop - headerHeight;
        const delta = window.scrollY - sequenceStart;
        const index = pinHeight > 0 ? Math.floor(Math.max(0, delta) / pinHeight) : 0;
        activate(Math.min(cards.length - 1, index));
      };

      const measure = () => {
        headerHeight = header?.getBoundingClientRect().height || 82;
        // Match the sticky offset and panel height to the real rendered header/viewport.
        root.style.setProperty('--header-height', `${headerHeight}px`);
        pin.style.top = `${headerHeight}px`;
        pinHeight = Math.max(320, pin.getBoundingClientRect().height || (window.innerHeight - headerHeight));
        sequence.style.height = `${pinHeight * (cards.length + 1)}px`;
        sequence.style.minHeight = '0px';
        updateFromScroll();
      };

      const onScroll = () => {
        if (scrollFrame) return;
        scrollFrame = window.requestAnimationFrame(() => {
          scrollFrame = 0;
          updateFromScroll();
        });
      };

      cards.forEach(card => card.addEventListener('click', () => {
        const index = Number(card.dataset.workflowJump);
        if (!Number.isInteger(index)) return;
        const rect = sequence.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const clampedIndex = Math.max(0, Math.min(cards.length - 1, index));
        const target = sectionTop - headerHeight + clampedIndex * pinHeight;
        window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
      }));

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', measure, { passive: true });
      window.addEventListener('orientationchange', measure, { passive: true });
      measure();
    });

    // Services page: one full-screen visual workflow panel per scroll chapter.
    document.querySelectorAll('[data-workflow-panels]').forEach(sequence => {
      const pin = sequence.querySelector('.workflow-pin');
      const panels = [...sequence.querySelectorAll('[data-workflow-panel]')];
      const jumpButtons = [...sequence.querySelectorAll('[data-workflow-jump]')];
      const progressFill = sequence.querySelector('[data-workflow-progress-fill]');
      if (!pin || panels.length < 2) return;

      let headerHeight = header?.getBoundingClientRect().height || 82;
      let pinHeight = Math.max(320, window.innerHeight - headerHeight);
      let activeIndex = -1;
      let scrollFrame = 0;

      const activate = (index) => {
        const next = Math.max(0, Math.min(panels.length - 1, index));
        if (next === activeIndex) return;
        activeIndex = next;
        panels.forEach((panel, i) => {
          const active = i === activeIndex;
          panel.classList.toggle('is-active', active);
          panel.setAttribute('aria-hidden', String(!active));
        });
        jumpButtons.forEach((button, i) => {
          if (i === activeIndex) button.setAttribute('aria-current', 'step');
          else button.removeAttribute('aria-current');
          button.classList.toggle('is-active', i === activeIndex);
        });
        if (progressFill) progressFill.style.transform = `scaleX(${activeIndex / (panels.length - 1)})`;
      };

      const updateFromScroll = () => {
        const rect = sequence.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sequenceStart = sectionTop - headerHeight;
        const delta = window.scrollY - sequenceStart;
        const index = Math.floor((Math.max(0, delta) + 2) / pinHeight);
        activate(Math.min(panels.length - 1, index));
      };

      const measure = () => {
        headerHeight = header?.getBoundingClientRect().height || 82;
        root.style.setProperty('--header-height', `${headerHeight}px`);
        pinHeight = Math.max(320, window.innerHeight - headerHeight);
        sequence.style.height = `${pinHeight * (panels.length + 1)}px`;
        sequence.style.minHeight = '0px';
        pin.style.top = `${headerHeight}px`;
        pin.style.height = `${pinHeight}px`;
        updateFromScroll();
      };

      const onScroll = () => {
        if (scrollFrame) return;
        scrollFrame = window.requestAnimationFrame(() => {
          scrollFrame = 0;
          updateFromScroll();
        });
      };

      jumpButtons.forEach(button => button.addEventListener('click', () => {
        const index = Number(button.dataset.workflowJump);
        if (!Number.isInteger(index)) return;
        const rect = sequence.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const target = sectionTop - headerHeight + Math.max(0, Math.min(panels.length - 1, index)) * pinHeight;
        window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
      }));

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', measure, { passive: true });
      window.addEventListener('orientationchange', measure, { passive: true });
      measure();
    });

    // FAQ accordion.
    document.querySelectorAll('.faq-question').forEach(button => button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      const symbol = button.querySelector('[data-faq-symbol]');
      if (symbol) symbol.textContent = open ? '−' : '+';
    }));
  });
})();
