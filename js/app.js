/* ═══════════════════════════════════════════════════════════════
   APP.JS — Inicializador principal
   ═══════════════════════════════════════════════════════════════ */

window.App = (() => {

  // ── Boot sequence ────────────────────────────────────────────
  async function init() {
    const bar = document.getElementById('loading-bar');
    const label = document.getElementById('loading-label');

    function progress(pct, text) {
      if (bar)   bar.style.width = pct + '%';
      if (label) label.textContent = text;
    }

    progress(10, 'Cargando datos…');
    await _tick();

    // Load student profile
    Student.load();
    progress(30, 'Cargando perfil…');
    await _tick();

    // Apply saved settings
    const p = Student.get();
    const s = p.settings || {};
    if (s.theme) setTheme(s.theme, false);
    if (s.fontSize) document.documentElement.setAttribute('data-fontsize', s.fontSize);
    if (s.highContrast) document.documentElement.classList.add('high-contrast');
    progress(50, 'Aplicando configuración…');
    await _tick();

    // Start progress tracking
    Progress.startSession();
    progress(70, 'Iniciando sesión…');
    await _tick();

    // Setup UI
    _setupEventListeners();
    progress(90, 'Preparando la interfaz…');
    await _tick();

    // Init router
    Router.init();
    progress(100, '¡Listo!');
    await _tick(300);

    // Show app
    const loading = document.getElementById('loading-screen');
    const app = document.getElementById('app');
    if (loading) loading.classList.add('fade-out');
    if (app)     app.classList.remove('hidden');

    // Update gamification UI
    Gamification.updateNavXP();
    Gamification.checkBadges();

    // Welcome new user
    if (!p.lastStudyDate) {
      setTimeout(() => Gamification.showToast('👋', `¡Bienvenido, ${p.name}!`, 'Empieza seleccionando un curso.'), 800);
    } else {
      setTimeout(() => {
        const due = Progress.getDueReviews();
        if (due.length) Gamification.showToast('⏰', `${due.length} repaso(s) pendiente(s)`, 'Revisa tu progreso.');
      }, 1200);
    }

    // Save every 5 minutes
    setInterval(() => Student.save(), 300000);
  }

  function _tick(ms = 50) {
    return new Promise(r => setTimeout(r, ms));
  }

  // ── Theme ────────────────────────────────────────────────────
  function setTheme(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) Student.update({ settings: { ...Student.get().settings, theme } });
    // Re-render grapher if active
    if (window.Grapher) Grapher.rerender && Grapher.rerender();
  }

  // ── Event listeners ──────────────────────────────────────────
  function _setupEventListeners() {

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    // Sidebar toggle (mobile)
    const menuBtn  = document.getElementById('menu-toggle');
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebar-overlay');

    function toggleSidebar(force) {
      const isOpen = sidebar.classList.contains('open');
      const open = force !== undefined ? force : !isOpen;
      sidebar.classList.toggle('open', open);
      overlay.classList.toggle('visible', open);
      overlay.classList.toggle('hidden', !open);
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open);
    }

    if (menuBtn) menuBtn.addEventListener('click', () => toggleSidebar());
    if (overlay) overlay.addEventListener('click', () => toggleSidebar(false));

    // Close sidebar on nav item click (mobile)
    document.querySelectorAll('.sn-item').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth < 768) toggleSidebar(false);
      });
    });

    // Close sidebar on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) toggleSidebar(false);
    });

    // Modal
    const modalClose = document.getElementById('modal-close');
    const modalBg    = document.getElementById('modal-bg');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBg)    modalBg.addEventListener('click', e => { if (e.target === modalBg) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // Global search
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    if (searchInput && searchResults) {
      searchInput.addEventListener('input', () => _handleSearch(searchInput.value, searchResults));
      searchInput.addEventListener('focus', () => {
        if (searchInput.value) searchResults.classList.remove('hidden');
      });
      document.addEventListener('click', e => {
        if (!e.target.closest('.search-wrap')) searchResults.classList.add('hidden');
      });
    }

    // Keyboard nav
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) { searchInput.focus(); searchInput.select(); }
      }
    });
  }

  // ── Search ───────────────────────────────────────────────────
  function _handleSearch(query, resultsEl) {
    query = query.trim().toLowerCase();
    if (!query) { resultsEl.classList.add('hidden'); return; }

    const results = [];
    // Search lessons
    (window.MM_LESSONS || []).forEach(l => {
      if (l.title.toLowerCase().includes(query) || l.topic.toLowerCase().includes(query)) {
        results.push({ type:'Lección', label: l.title, sub: l.topic, href: `#/lesson/${l.id}`, color: l.color });
      }
    });
    // Search courses
    (window.MM_COURSES || []).forEach(c => {
      if (c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)) {
        results.push({ type:'Curso', label: c.name, sub: c.description, href: `#/course/${c.id}`, color: c.color });
      }
    });

    if (!results.length) {
      resultsEl.innerHTML = `<div class="sr-item" style="color:var(--text-3)">Sin resultados para "${query}"</div>`;
    } else {
      resultsEl.innerHTML = results.slice(0,8).map(r => `
        <a class="sr-item" href="${r.href}" onclick="document.getElementById('global-search').value=''">
          <span class="sr-badge" style="background:${r.color}22;color:${r.color}">${r.type}</span>
          <span>${r.label}</span>
        </a>`).join('');
    }
    resultsEl.classList.remove('hidden');
  }

  // ── Modal helpers ────────────────────────────────────────────
  function openModal(html) {
    const bg   = document.getElementById('modal-bg');
    const body = document.getElementById('modal-body');
    if (bg && body) {
      body.innerHTML = html;
      bg.classList.remove('hidden');
      Assessment.renderKatex(body);
    }
  }

  function closeModal() {
    const bg = document.getElementById('modal-bg');
    if (bg) bg.classList.add('hidden');
  }

  // ── Text-to-speech ───────────────────────────────────────────
  function speak(text) {
    const p = Student.get();
    if (!p.settings?.tts) return;
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'es-ES';
      speechSynthesis.speak(utt);
    }
  }

  // ── Expose to window ─────────────────────────────────────────
  window.openModal  = openModal;
  window.closeModal = closeModal;

  // ── Start ────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init, setTheme, openModal, closeModal, speak };
})();
