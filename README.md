ALF STUDIO — WEBSITE REDESIGN
============================

Design direction
- Monochrome dark-grey / light-grey visual system.
- Editorial contemporary typography: Manrope + DM Sans + Instrument Serif accent.
- Balanced motion: scroll reveal, subtle hero parallax, hover image zoom, and a three-slide featured visual carousel with slow Ken Burns zoom.
- Minimal geometric details: hairline rules, dot field, small crosshair marks, and project numbering.
- Bilingual interface (Bahasa Indonesia / English), with language preference remembered in the browser.

Portfolio
- Category filters: Residential, Commercial, Hospitality, Office, Mixed-Use.
- Search across project title, category, and location text.
- Gallery / List view switch.
- Reference images are explicitly labelled as visual references. Replace them with ALF Studio-owned project photos and renders before publishing. No client names or unsupported project facts are shown.

WhatsApp
- Official contact number supplied by the studio: 0853 9990 3567.
- Stored in international format in site-config.js: 6285399903567.
- All primary calls to action open WhatsApp directly with a prefilled message in the selected website language.

Quick start
1. Extract this ZIP to a folder.
2. Open index.html in a modern browser, or upload the folder contents to a static web host.
3. To update the WhatsApp number later, edit ALF_CONFIG.whatsapp in site-config.js (digits only; international format).
4. Replace temporary Unsplash visual references with original ALF Studio renders, progress photos, and completed project photography.
5. Update project titles, categories, location, and metadata only after the corresponding project information is confirmed.
6. Review the bilingual copy before publishing and add the official Instagram URL / email in site-config.js when ready.

Technical notes
- Static website: no backend, database, or CMS is included.
- Gallery filters, search, bilingual toggle, FAQ accordion, mobile navigation, and WhatsApp links run in the browser.
- Theme follows the visitor's device preference by default; the Sun/Moon toggle stores a manual choice across pages.
- Mobile navigation uses an accessible slide-in side drawer.
- Hero visual carousel auto-advances, pauses on hover/focus or hidden tabs, and respects reduced-motion settings.
- The site respects the user's reduced-motion accessibility preference.
- Google Fonts and temporary Unsplash images require an internet connection.

Files
- index.html: homepage
- projects.html: searchable/filterable Gallery and List portfolio
- services.html: services, process, and FAQ
- about.html: studio introduction and design principles
- contact.html: direct WhatsApp contact routes
- style.css: monochrome visual system, responsive layouts, and motion
- script.js: navigation, language toggle, motion, portfolio controls, FAQ, and WhatsApp routing
- site-config.js: central studio contact details


Latest visual refinements
- Homepage hero is sized against the desktop viewport so the complete image frame, slide caption, and adjacent copy are visible without an initial scroll. Mobile hero remains in normal page flow.
- Homepage hero carousel imagery and the Studio feature image are displayed in full colour.
- Portfolio intro spacing is reduced by removing compounded section and inner padding.
- Service workflow step numbers, titles, and descriptions have a clearer typographic hierarchy; headings use the active theme's primary text colour for contrast.
- Portfolio metadata labels and values now show only the selected language (ID or EN), without duplicated bilingual lines.


Latest signature motion update
- Selected Visuals is now a five-panel interactive composition inspired by the reference: the five project labels sit over one full-width image; desktop hover/focus highlights a panel and crossfades the shared background to that visual. Touch screens use horizontal swipe / tap interaction.
- The Studio Approach section has a sticky background image plane. Narrative content moves over the pinned image while the section scrolls. A restrained scroll drift adds depth.
- A short brand intro presents the ALF logo and the Architecture · Interior · Build tagline on every entry to the homepage; secondary pages skip the intro.
- Reduced-motion preferences are respected.
- Selected Visual panels are clearly marked as visual references until replaced with ALF Studio-owned project imagery.


## Scroll chapters update
- Selected Visuals is compacted into one viewport panel on desktop and mobile.
- Homepage and Services workflows are pinned, full-viewport sequences: each viewport of native scrolling advances one stage.
- Workflow stage markers are clickable for direct navigation.
- Studio Approach spacing is reduced while keeping the pinned background treatment.
- Reduced-motion preferences are respected; normal page scroll remains native and accessible.

## Scroll experience refinement
- The homepage Studio Approach section has a tighter vertical rhythm; the first principle now follows the opening statement without the previous oversized gap.
- Selected Visuals is laid out as a single viewport-height composition, with a compact section heading and image panel.
- Homepage and Services workflow sections are now pinned scroll chapters. Each stage occupies the available viewport; normal scrolling advances through stages 01–04, and the numbered controls can jump directly to a stage.
- The sequence uses native document scrolling with eased panel transitions rather than hijacking wheel or touch input.
- Responsive layouts are adjusted for desktop and mobile widths, and reduced-motion preferences disable transition effects.


## Latest precision update
- Homepage hero metadata now follows the active slideshow and selected language.
- The discipline band stays directly under the sticky header only while the Studio Approach scene is in view.
- Selected Visuals returns to a large image-led showcase, with responsive stage heights and no forced image stretching.
- Homepage and Services workflows use four visible columns/cards; scrolling changes only the active/highlighted stage.
- Mobile workflow uses a two-by-two grid; mobile Selected Visuals retains horizontal panel swiping.

## Latest precision update
- Hero metadata fields (slide index, discipline, and visual focus) now update with the active hero slide and selected language.
- The Approach discipline strip is sticky directly below the site header and remains scoped to the Approach wrapper; the pinned image begins directly beneath the strip.
- Selected Visuals uses a taller, image-led presentation similar to the reference scale while preserving image proportions with `object-fit: cover`.
- Homepage and Services keep all four workflow steps visible. Native scrolling changes only the active step highlight, and clicking a stage marker navigates to that stage.
- Workflow measurements use the actual rendered header and pinned panel heights to improve alignment across desktop, tablet, Android, and iPhone viewport sizes.


## November 25 refinement
- Services, Studio, Contact, and Portfolio pages now share the same top intro spacing and title scale.
- The Services workflow uses four full-screen photographic panels with individual monochrome images and a directional vignette; scrolling or the 01–04 controls changes the active stage.
- The homepage brand intro plays every time the homepage is entered, including browser back/forward cache returns; secondary pages skip the intro.
- Studio Approach removes excessive trailing scroll distance after principle 03 while keeping the pinned background.
- Subtle grid, line, and dot geometry has been added to page intros, service details, the contact banner, and footer, using theme-aware grayscale variables.
- Responsive rules keep the workflow panel and typography proportionate on mobile.
