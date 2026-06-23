/* ═══════════════════════════════════════════════════════════════
   ROUTER.JS — Enrutador SPA y renderizado de páginas
   ═══════════════════════════════════════════════════════════════ */

window.Router = (() => {

  let _currentRoute = null;

  // ── Route matching ───────────────────────────────────────────
  function init() {
    window.addEventListener('hashchange', () => navigate());
    navigate();
  }

  function navigate(path) {
    if (path) { window.location.hash = '#' + path; return; }
    const hash = window.location.hash.replace('#', '') || '/';
    _currentRoute = hash;
    _updateNav(hash);
    _render(hash);
  }

  function _updateNav(hash) {
    document.querySelectorAll('.sn-item[data-r]').forEach(el => {
      el.classList.remove('active');
      const r = el.getAttribute('data-r');
      if (r === hash || hash.startsWith(r) && r !== '/') el.classList.add('active');
      if (r === '/' && hash === '/') el.classList.add('active');
    });
  }

  function _render(hash) {
    const main = document.getElementById('main-content');
    if (!main) return;
    main.scrollTop = 0;

    if (hash === '/')                         return _renderDashboard(main);
    if (hash === '/courses')                  return _renderCourses(main);
    if (hash.startsWith('/course/'))          return _renderCourse(main, hash.replace('/course/', ''));
    if (hash.startsWith('/lesson/'))          return _renderLesson(main, hash.replace('/lesson/', ''));
    if (hash === '/practice')                 return _renderPractice(main);
    if (hash.startsWith('/practice/'))        return _renderPractice(main, hash.replace('/practice/', ''));
    if (hash === '/grapher')                  return _renderGrapher(main);
    if (hash === '/progress')                 return _renderProgress(main);
    if (hash === '/settings')                 return _renderSettings(main);

    // ── Currículum jerárquico ────────────────────────────────
    // /materia/:subjectId/unidad/:unitId/tema/:topicId
    const temaMatch = hash.match(/^\/materia\/([^/]+)\/unidad\/([^/]+)\/tema\/(.+)$/);
    if (temaMatch) return _renderTema(main, temaMatch[1], temaMatch[2], temaMatch[3]);

    // /materia/:subjectId/unidad/:unitId
    const unidadMatch = hash.match(/^\/materia\/([^/]+)\/unidad\/([^/]+)$/);
    if (unidadMatch) return _renderUnidad(main, unidadMatch[1], unidadMatch[2]);

    // /materia/:subjectId
    const materiaMatch = hash.match(/^\/materia\/([^/]+)$/);
    if (materiaMatch) return _renderMateria(main, materiaMatch[1]);

    // ── PAES Simulacro (motor dedicado) ─────────────────────
    if (hash === '/paes/simulacro')           return _renderPaesSimulacro(main, null);
    const paesSimMatch = hash.match(/^\/paes\/simulacro\/(\d+)$/);
    if (paesSimMatch) return _renderPaesSimulacro(main, paesSimMatch[1]);

    // ── Modos de práctica curricular ─────────────────────────
    if (hash === '/practica/debiles')         return _renderPracticaDebiles(main);
    if (hash === '/practica/pendientes')      return _renderPracticaPendientes(main);
    if (hash === '/practica/simulacro')       return _renderSimulacro(main, null);
    const simMatch = hash.match(/^\/practica\/simulacro\/([^/]+)$/);
    if (simMatch)  return _renderSimulacro(main, simMatch[1]);
    const tpMatch  = hash.match(/^\/practica\/tema\/([^/]+)$/);
    if (tpMatch)   return _renderPracticaTema(main, tpMatch[1]);
    const upMatch  = hash.match(/^\/practica\/unidad\/([^/]+)$/);
    if (upMatch)   return _renderPracticaUnidad(main, upMatch[1]);
    const mpMatch  = hash.match(/^\/practica\/materia\/([^/]+)$/);
    if (mpMatch)   return _renderPracticaMateria(main, mpMatch[1]);

    // 404
    main.innerHTML = `<div class="empty-state"><div class="es-icon">🔍</div><div class="es-title">Página no encontrada</div><a href="#/" class="btn btn-primary mt-4">Ir al inicio</a></div>`;
  }

  // ══════════════════════════════════════════════════════════════
  // DASHBOARD
  // ══════════════════════════════════════════════════════════════
  function _renderDashboard(main) {
    const p = Student.get();
    const stats = Student.getStats();
    const lvl = stats.level;
    const recent = (window.MM_LESSONS || []).filter(l => p.completedLessons.includes(l.id)).slice(-3).reverse();
    const recommended = (window.MM_LESSONS || []).filter(l => !p.completedLessons.includes(l.id)).slice(0, 4);
    const dueReviews = Progress.getDueReviews().slice(0, 3);

    main.innerHTML = `
      <div class="welcome-banner">
        <div class="wb-text">
          <div class="wb-title">Hola, ${p.name} 👋</div>
          <div class="wb-sub">Continúa donde lo dejaste. ¡El conocimiento te espera!</div>
        </div>
        <div class="wb-stats">
          <div class="wb-stat"><div class="wb-stat-n">${stats.streak}</div><div class="wb-stat-l">🔥 Racha</div></div>
          <div class="wb-stat"><div class="wb-stat-n">${stats.lessonsCompleted}</div><div class="wb-stat-l">📚 Lecciones</div></div>
          <div class="wb-stat"><div class="wb-stat-n">${p.xp}</div><div class="wb-stat-l">⚡ XP Total</div></div>
        </div>
      </div>

      <div class="level-card">
        <div class="level-badge">${lvl.number}</div>
        <div class="level-info">
          <div class="level-name">Nivel ${lvl.number} — ${lvl.name}</div>
          <div class="level-prog">
            <span>${p.xp} XP</span>
            <span>${lvl.xpNeeded > 0 ? `${lvl.xpNeeded} XP para el siguiente nivel` : '¡Nivel máximo!'}</span>
          </div>
          <div class="level-bar"><div class="level-fill" style="width:${lvl.progress}%"></div></div>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-value">${stats.percentComplete}%</div><div class="stat-label">Completado</div></div>
        <div class="stat-card"><div class="stat-icon">⏱️</div><div class="stat-value">${Math.floor((p.totalMinutes||0)/60)}h ${(p.totalMinutes||0)%60}m</div><div class="stat-label">Tiempo estudiado</div></div>
        <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-value">${stats.lessonsCompleted}</div><div class="stat-label">Lecciones</div></div>
        <div class="stat-card"><div class="stat-icon">🏅</div><div class="stat-value">${(p.achievements||[]).length}</div><div class="stat-label">Insignias</div></div>
      </div>

      ${dueReviews.length ? `
      <div class="mb-6">
        <div class="section-title">⏰ Repasos pendientes</div>
        <div class="lesson-list">
          ${dueReviews.map(r => `
            <div class="lesson-item card-clickable" onclick="Router.navigate('/lesson/${r.lesson.id}')">
              <div class="li-icon" style="background:${_courseColor(r.lesson.courseId)}22;color:${_courseColor(r.lesson.courseId)}">${r.lesson.icon}</div>
              <div class="li-info"><div class="li-title">${r.lesson.title}</div><div class="li-meta">${r.lesson.grades} · Repaso</div></div>
              <div class="li-status"><span class="badge-new">Repasar</span></div>
            </div>`).join('')}
        </div>
      </div>` : ''}

      <div class="grid-2 mb-6">
        <div>
          <div class="section-title">📖 Continuar aprendiendo</div>
          ${recommended.length ? `<div class="lesson-list">
            ${recommended.map(l => `
              <div class="lesson-item card-clickable" onclick="Router.navigate('/lesson/${l.id}')">
                <div class="li-icon" style="background:${_courseColor(l.courseId)}22;color:${_courseColor(l.courseId)}">${l.icon}</div>
                <div class="li-info">
                  <div class="li-title">${l.title}</div>
                  <div class="li-meta">${l.grades} · ⚡ ${l.xpReward} XP · ⏱️ ${l.duration} min</div>
                </div>
                <div class="li-status"><span class="badge-new">Nuevo</span></div>
              </div>`).join('')}
          </div>` : `<div class="empty-state" style="padding:30px"><div class="es-icon">🎉</div><div class="es-title">¡Todo completado!</div></div>`}
        </div>
        <div>
          <div class="section-title">✅ Recién completadas</div>
          ${recent.length ? `<div class="lesson-list">
            ${recent.map(l => `
              <div class="lesson-item card-clickable" onclick="Router.navigate('/lesson/${l.id}')">
                <div class="li-icon" style="background:${_courseColor(l.courseId)}22;color:${_courseColor(l.courseId)}">${l.icon}</div>
                <div class="li-info">
                  <div class="li-title">${l.title}</div>
                  <div class="li-meta">${l.grades}</div>
                </div>
                <div class="li-status"><span class="badge-done">✓ Hecho</span></div>
              </div>`).join('')}
          </div>` : `<p style="color:var(--text-3);font-size:14px;padding:10px">Aún no has completado lecciones. ¡Empieza ahora!</p>`}
          <a href="#/courses" class="btn btn-secondary w-full mt-4" style="justify-content:center">Ver todos los cursos →</a>
        </div>
      </div>

      <div class="mb-6">
        <div class="section-title">⚡ Modos de práctica</div>
        <div class="stats-row" style="grid-template-columns:repeat(auto-fill,minmax(140px,1fr));">
          <div class="stat-card card-clickable" onclick="Router.navigate('/practica/debiles')" style="cursor:pointer;">
            <div class="stat-icon">🎯</div><div class="stat-value" style="font-size:0.9rem;">Puntos débiles</div>
          </div>
          <div class="stat-card card-clickable" onclick="Router.navigate('/practica/pendientes')" style="cursor:pointer;">
            <div class="stat-icon">📋</div><div class="stat-value" style="font-size:0.9rem;">Pendientes</div>
          </div>
          <div class="stat-card card-clickable" onclick="Router.navigate('/practica/simulacro')" style="cursor:pointer;">
            <div class="stat-icon">📝</div><div class="stat-value" style="font-size:0.9rem;">Simulacro</div>
          </div>
          <div class="stat-card card-clickable" onclick="Router.navigate('/materia/paes')" style="cursor:pointer;">
            <div class="stat-icon">🎓</div><div class="stat-value" style="font-size:0.9rem;">PAES</div>
          </div>
          <div class="stat-card card-clickable" onclick="Router.navigate('/paes/simulacro')" style="cursor:pointer;">
            <div class="stat-icon">🏆</div><div class="stat-value" style="font-size:0.9rem;">Simulacro PAES</div>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <div class="section-title">🏅 Mis insignias</div>
        <div class="badge-grid" style="grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:10px">
          ${Gamification.getAllBadges().slice(0,12).map(b => `
            <div class="badge-item" title="${b.name}: ${b.desc}">
              <div class="bi-icon ${b.earned ? 'earned' : ''}">${b.icon}</div>
              <div class="bi-name">${b.name}</div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  // COURSES
  // ══════════════════════════════════════════════════════════════
  function _renderCourses(main) {
    const levels = ['Todos','Básico (1-6)','Secundario (7-8)','Enseñanza Media','Universidad'];
    main.innerHTML = `
      <div class="page-title">Cursos</div>
      <div class="page-subtitle">Elige una materia para empezar a aprender</div>
      <div class="level-tabs" id="level-tabs">
        ${levels.map((l,i) => `<button class="ltab ${i===0?'active':''}" data-level="${i}">${l}</button>`).join('')}
      </div>
      <div class="grid-auto" id="courses-grid">
        ${(window.MM_COURSES||[]).map(c => _courseCard(c)).join('')}
      </div>`;

    main.querySelectorAll('.ltab').forEach(tab => {
      tab.addEventListener('click', () => {
        main.querySelectorAll('.ltab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const lvl = parseInt(tab.dataset.level);
        main.querySelectorAll('.course-card-wrap').forEach(card => {
          const cardLvl = parseInt(card.dataset.level);
          card.style.display = (lvl === 0 || cardLvl === lvl) ? '' : 'none';
        });
      });
    });
  }

  function _courseCard(c) {
    const prog = Progress.getCourseProgress(c.id);
    return `
      <div class="course-card-wrap card course-card" data-level="1" onclick="Router.navigate('/course/${c.id}')">
        <div class="cc-header" style="background:${c.gradient}">
          <div class="cc-icon">${c.icon}</div>
          <div class="cc-name">${c.name}</div>
          <div class="cc-desc">${c.description}</div>
        </div>
        <div class="cc-body">
          <div class="cc-prog">
            <span class="cc-prog-label">${prog.done}/${prog.total} lecciones</span>
            <span class="cc-prog-pct">${prog.percent}%</span>
          </div>
          <div class="cc-bar"><div class="cc-fill" style="background:${c.color};width:${prog.percent}%"></div></div>
          <div class="cc-topics">${(c.topics||[]).slice(0,4).map(t=>`<span class="cc-topic">${t}</span>`).join('')}</div>
        </div>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  // COURSE DETAIL
  // ══════════════════════════════════════════════════════════════
  function _renderCourse(main, courseId) {
    const course = (window.MM_COURSES||[]).find(c => c.id === courseId);
    if (!course) { main.innerHTML = `<p>Curso no encontrado.</p>`; return; }

    const lessons = (window.MM_LESSONS||[]).filter(l => l.courseId === courseId);
    const prog = Progress.getCourseProgress(courseId);

    main.innerHTML = `
      <div style="border-radius:var(--r-xl);background:${course.gradient};color:#fff;padding:28px;margin-bottom:24px;">
        <a href="#/courses" style="color:rgba(255,255,255,.7);font-size:13px;display:inline-block;margin-bottom:12px">← Todos los cursos</a>
        <div style="font-size:36px;margin-bottom:8px">${course.icon}</div>
        <div style="font-size:28px;font-weight:800;margin-bottom:6px">${course.name}</div>
        <div style="opacity:.85;font-size:15px;margin-bottom:16px">${course.description}</div>
        <div style="background:rgba(255,255,255,.15);border-radius:var(--r-full);height:8px;margin-bottom:6px;overflow:hidden">
          <div style="height:100%;background:#fff;border-radius:var(--r-full);width:${prog.percent}%;transition:width .6s"></div>
        </div>
        <div style="font-size:13px;opacity:.8">${prog.done} de ${prog.total} lecciones completadas · ${prog.percent}%</div>
      </div>

      <div class="section-title">Lecciones disponibles</div>
      <div class="lesson-list">
        ${lessons.length ? lessons.map(l => {
          const done = Progress.isLessonComplete(l.id);
          return `
            <div class="lesson-item card-clickable" onclick="Router.navigate('/lesson/${l.id}')">
              <div class="li-icon" style="background:${l.color}22;color:${l.color}">${l.icon}</div>
              <div class="li-info">
                <div class="li-title">${l.title}</div>
                <div class="li-meta">${l.grades} · ⚡ ${l.xpReward} XP · ⏱️ ${l.duration} min</div>
              </div>
              <div class="li-status">
                ${done ? '<span class="badge-done">✓ Completada</span>' : '<span class="badge-new">Empezar</span>'}
              </div>
            </div>`;
        }).join('') : `<div class="empty-state"><div class="es-icon">${course.icon}</div><div class="es-title">Próximamente</div><div class="es-desc">Estamos preparando las lecciones de ${course.name}.</div></div>`}
      </div>

      <div style="margin-top:24px;padding:20px;background:var(--brand-50);border-radius:var(--r-lg);border:1px solid var(--brand-200)">
        <div style="font-weight:700;margin-bottom:6px;color:var(--brand-700)">💪 ¡Practica ${course.name}!</div>
        <p style="font-size:14px;color:var(--text-2);margin-bottom:12px">Pon a prueba tus conocimientos con ejercicios aleatorios.</p>
        <a href="#/practice/${courseId}" class="btn btn-primary">Ir a Práctica →</a>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  // LESSON VIEW
  // ══════════════════════════════════════════════════════════════
  function _renderLesson(main, lessonId) {
    const lesson = (window.MM_LESSONS||[]).find(l => l.id === lessonId);
    if (!lesson) { main.innerHTML = `<p>Lección no encontrada.</p>`; return; }

    const course = (window.MM_COURSES||[]).find(c => c.id === lesson.courseId);
    const saved = Student.getLessonProgress(lessonId);
    const activeTab = saved.activeTab || 'concepto';

    const tabs = [
      { id:'concepto',   label:'💡 Concepto' },
      { id:'visual',     label:'👁️ Visual' },
      { id:'descubre',   label:'🔍 Descubre' },
      { id:'ejemplos',   label:'📝 Ejemplos' },
      ...(lesson.exploration ? [{ id:'explora', label:'🎛️ Explora' }] : []),
      { id:'resumen',    label:'✅ Resumen' },
      ...(lesson.exercises ? [{ id:'ejercicios', label:'✏️ Ejercicios' }] : []),
      ...(lesson.advanced ? [{ id:'avanzado', label:'🏆 Avanzado' }] : [])
    ];

    const done = Progress.isLessonComplete(lessonId);

    main.innerHTML = `
      <div class="lesson-wrap">
        <div class="lesson-header">
          <div class="lh-breadcrumb">
            <a href="#/courses">Cursos</a>
            <span>›</span>
            <a href="#/course/${lesson.courseId}">${course ? course.name : lesson.courseId}</a>
            <span>›</span>
            <span>${lesson.topic}</span>
          </div>
          <div class="lh-top">
            <div class="lh-info">
              <div class="lh-title">${lesson.title}</div>
              <div class="lh-meta">
                <span class="lh-tag">📚 ${lesson.grades}</span>
                <span class="lh-tag">⏱️ ${lesson.duration} min</span>
                <span class="lh-xp">⚡ +${lesson.xpReward} XP</span>
                ${done ? '<span class="badge-done">✓ Completada</span>' : ''}
              </div>
            </div>
          </div>
        </div>

        <div class="lesson-tabs" id="lesson-tabs" role="tablist">
          ${tabs.map(t => {
            const isDone = saved[`tab_done_${t.id}`];
            return `<button class="ltb ${t.id === activeTab ? 'active' : ''} ${isDone ? 'ltb-done' : ''}"
              role="tab" aria-selected="${t.id===activeTab}" data-tab="${t.id}">${t.label}</button>`;
          }).join('')}
        </div>

        <div id="lesson-tab-content" class="lesson-section"></div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:24px;padding-top:16px;border-top:1px solid var(--border)">
          <button class="btn btn-secondary" id="prev-tab">← Anterior</button>
          <button class="btn btn-primary" id="next-tab">Siguiente →</button>
        </div>
      </div>`;

    _renderLessonTab(lesson, activeTab, tabs);

    // Tab switching
    main.querySelectorAll('.ltb').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        main.querySelectorAll('.ltb').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
        btn.classList.add('active'); btn.setAttribute('aria-selected','true');
        _renderLessonTab(lesson, tab, tabs);
        Student.saveLessonProgress(lessonId, { activeTab: tab });
      });
    });

    // Prev/Next tab navigation
    main.querySelector('#prev-tab').addEventListener('click', () => _navTab(lesson, tabs, -1));
    main.querySelector('#next-tab').addEventListener('click', () => _navTab(lesson, tabs, 1));
  }

  function _navTab(lesson, tabs, dir) {
    const active = document.querySelector('.ltb.active');
    if (!active) return;
    const idx = tabs.findIndex(t => t.id === active.dataset.tab);
    const next = idx + dir;
    if (next >= 0 && next < tabs.length) {
      document.querySelectorAll('.ltb')[next].click();
    } else if (next >= tabs.length) {
      // Complete lesson
      _completeLesson(lesson);
    }
  }

  function _completeLesson(lesson) {
    if (!Progress.isLessonComplete(lesson.id)) {
      const xp = Gamification.onLessonComplete(lesson);
      Progress.scheduleSR(lesson.id);
      Student.saveLessonProgress(lesson.id, { completed: true });
      setTimeout(() => {
        Gamification.showToast('🎉', '¡Lección completada!', `+${xp} XP ganados`);
        Gamification.checkBadges();
      }, 300);
      // Update badge on header
      const done = document.querySelector('.lh-meta');
      if (done) {
        const existing = done.querySelector('.badge-done');
        if (!existing) done.insertAdjacentHTML('beforeend', '<span class="badge-done ml-2">✓ Completada</span>');
      }
    } else {
      Gamification.showToast('✅', 'Lección repasada', '¡Bien hecho!');
    }
  }

  function _renderLessonTab(lesson, tabId, tabs) {
    const content = document.getElementById('lesson-tab-content');
    if (!content) return;
    content.innerHTML = '';
    content.className = 'lesson-section';

    switch (tabId) {
      case 'concepto':   _renderConcept(content, lesson); break;
      case 'visual':     _renderVisual(content, lesson); break;
      case 'descubre':   _renderDiscovery(content, lesson); break;
      case 'ejemplos':   _renderExamples(content, lesson); break;
      case 'explora':    _renderExploration(content, lesson); break;
      case 'resumen':    _renderSummary(content, lesson, tabs); break;
      case 'ejercicios': _renderEjercicios(content, lesson); break;
      case 'avanzado':   _renderAvanzado(content, lesson); break;
    }

    Assessment.renderKatex(content);

    // Mark tab as visited
    Student.saveLessonProgress(lesson.id, { [`tab_done_${tabId}`]: true });
    const tabBtn = document.querySelector(`.ltb[data-tab="${tabId}"]`);
    if (tabBtn && !tabBtn.classList.contains('ltb-done')) tabBtn.classList.add('ltb-done');
  }

  function _md(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  function _renderConcept(el, lesson) {
    const c = lesson.concept;
    // realLife: old format = [{icon,text}], new format = HTML string
    let realLifeHtml = '';
    if (c.realLife) {
      if (typeof c.realLife === 'string') {
        realLifeHtml = c.realLife;
      } else if (Array.isArray(c.realLife)) {
        realLifeHtml = c.realLife.map(r => `<p style="margin-bottom:6px">${r.icon || ''} ${_md(r.text || r)}</p>`).join('');
      }
    }
    // commonErrors: old format = [string], new format = [{title,description}]
    let errorsHtml = '';
    if (c.commonErrors?.length) {
      errorsHtml = c.commonErrors.map(e => {
        if (typeof e === 'string') return `<p style="margin-bottom:8px">• ${_md(e)}</p>`;
        return `<p style="margin-bottom:8px"><strong>⚡ ${e.title}:</strong> ${_md(e.description)}</p>`;
      }).join('');
    }
    el.innerHTML = `
      <div class="info-box fact"><div class="info-box-title">¿Qué es?</div><p class="concept-what">${_md(c.what)}</p></div>
      <div class="info-box tip"><div class="info-box-title">¿Para qué sirve?</div><p>${_md(c.why)}</p></div>
      ${realLifeHtml ? `
        <div class="info-box real">
          <div class="info-box-title">🌍 En la vida real</div>
          ${realLifeHtml}
        </div>` : ''}
      ${errorsHtml ? `
        <div class="info-box error">
          <div class="info-box-title">⚠️ Errores comunes</div>
          ${errorsHtml}
        </div>` : ''}`;
  }

  function _renderVisual(el, lesson) {
    const vtype = lesson.visual?.type;
    el.innerHTML = `<div class="visual-container" id="vis-container"></div>`;
    const container = el.querySelector('#vis-container');

    setTimeout(() => {
      switch(vtype) {
        case 'fraction-pizza':    _visFractionPizza(container); break;
        case 'fraction-sum':      _visFractionSum(container); break;
        case 'equation-balance':  _visEquationBalance(container); break;
        case 'parabola-interactive': _visParabola(container); break;
        case 'triangle-area':     _visTriangle(container); break;
        case 'probability-dice':  _visProbabilityDice(container); break;
        case 'derivative-tangent':_visDerivative(container); break;
        case 'percentage-bar':    _visPercentageBar(container); break;
        default:
          if (window.MM_GEO_VIS && window.MM_GEO_VIS[vtype]) {
            window.MM_GEO_VIS[vtype](container);
          } else {
            container.innerHTML = `<p style="color:var(--text-3)">Visualización interactiva disponible próximamente.</p>`;
          }
      }
    }, 100);
  }

  // ── Visual components ────────────────────────────────────────

  function _visFractionPizza(el) {
    el.innerHTML = `
      <div style="text-align:center">
        <p style="color:var(--text-2);margin-bottom:16px;font-size:15px">Divide la pizza y selecciona porciones para ver la fracción</p>
        <div style="display:flex;gap:20px;align-items:center;justify-content:center;flex-wrap:wrap">
          <div>
            <label style="font-size:14px;font-weight:600;display:block;margin-bottom:8px">Partes totales</label>
            <input type="range" min="2" max="12" value="4" id="pizza-denom" style="width:100%;max-width:200px">
            <span id="pizza-denom-val" style="margin-left:8px;font-weight:700;color:var(--brand-600)">4</span>
          </div>
          <div>
            <label style="font-size:14px;font-weight:600;display:block;margin-bottom:8px">Porciones tomadas</label>
            <input type="range" min="0" max="4" value="1" id="pizza-numer" style="width:100%;max-width:200px">
            <span id="pizza-numer-val" style="margin-left:8px;font-weight:700;color:var(--brand-600)">1</span>
          </div>
        </div>
        <canvas id="pizza-canvas" width="260" height="260" style="margin:20px auto;display:block"></canvas>
        <div style="font-size:28px;font-weight:800;color:var(--brand-600)" id="pizza-fraction">1/4</div>
        <div style="color:var(--text-2);font-size:14px;margin-top:4px" id="pizza-decimal">= 0.25</div>
      </div>`;

    const canvas = el.querySelector('#pizza-canvas');
    const ctx = canvas.getContext('2d');
    const denomInput = el.querySelector('#pizza-denom');
    const numerInput = el.querySelector('#pizza-numer');

    function drawPizza() {
      const d = parseInt(denomInput.value);
      const n = Math.min(parseInt(numerInput.value), d);
      const cx = 130, cy = 130, r = 110;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0,0,260,260);

      for (let i = 0; i < d; i++) {
        const a1 = (i/d)*Math.PI*2 - Math.PI/2;
        const a2 = ((i+1)/d)*Math.PI*2 - Math.PI/2;
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,r,a1,a2);
        ctx.closePath();
        if (i < n) {
          ctx.fillStyle = '#F59E0B';
          const grd = ctx.createRadialGradient(cx,cy,0,cx,cy,r);
          grd.addColorStop(0,'#FCD34D'); grd.addColorStop(1,'#D97706');
          ctx.fillStyle = grd;
        } else {
          ctx.fillStyle = isDark ? '#334155' : '#FEF3C7';
        }
        ctx.fill();
        ctx.strokeStyle = isDark ? '#0F172A' : '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      // Circle outline
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.strokeStyle = isDark ? '#64748B' : '#D97706';
      ctx.lineWidth = 3; ctx.stroke();

      el.querySelector('#pizza-denom-val').textContent = d;
      el.querySelector('#pizza-numer-val').textContent = n;
      const g = window.mmGcd(n,d);
      el.querySelector('#pizza-fraction').textContent = n===0?'0':n===d?'1 (todo)':`${n/g}/${d/g}`;
      el.querySelector('#pizza-decimal').textContent = `= ${(n/d).toFixed(4).replace(/\.?0+$/,'')}`;
      numerInput.max = d;
    }

    denomInput.addEventListener('input', drawPizza);
    numerInput.addEventListener('input', drawPizza);
    drawPizza();
  }

  function _visFractionSum(el) {
    el.innerHTML = `
      <div style="text-align:center;max-width:500px;margin:0 auto">
        <p style="margin-bottom:16px;font-size:15px;color:var(--text-2)">Visualiza la suma de dos fracciones con el mismo denominador</p>
        <div style="display:flex;gap:12px;justify-content:center;margin-bottom:16px">
          <div><label style="font-size:13px">Numerador 1</label><br><input type="range" min="0" max="8" value="1" id="fs-n1" style="width:120px"><span id="fs-n1v" style="margin-left:6px;font-weight:700;color:var(--brand-600)">1</span></div>
          <div><label style="font-size:13px">Numerador 2</label><br><input type="range" min="0" max="8" value="2" id="fs-n2" style="width:120px"><span id="fs-n2v" style="margin-left:6px;font-weight:700;color:var(--brand-600)">2</span></div>
          <div><label style="font-size:13px">Denominador</label><br><input type="range" min="2" max="10" value="5" id="fs-d" style="width:120px"><span id="fs-dv" style="margin-left:6px;font-weight:700;color:var(--brand-600)">5</span></div>
        </div>
        <canvas id="fs-canvas" width="460" height="120" style="margin:0 auto;display:block;max-width:100%"></canvas>
        <div style="font-size:20px;font-weight:700;color:var(--brand-600);margin-top:12px" id="fs-result"></div>
      </div>`;

    const canvas = el.querySelector('#fs-canvas');
    const ctx = canvas.getContext('2d');
    function draw(){
      const n1=parseInt(el.querySelector('#fs-n1').value),
            n2=parseInt(el.querySelector('#fs-n2').value),
            d=parseInt(el.querySelector('#fs-d').value);
      el.querySelector('#fs-n1v').textContent=n1;
      el.querySelector('#fs-n2v').textContent=n2;
      el.querySelector('#fs-dv').textContent=d;
      const w=460,h=120,bh=32,pad=30,bw=w-2*pad;
      const isDark=document.documentElement.getAttribute('data-theme')==='dark';
      ctx.clearRect(0,0,w,h);
      function drawBar(y,num,col,label){
        const cellW=bw/d;
        for(let i=0;i<d;i++){
          ctx.fillStyle = i<num ? col : (isDark?'#334155':'#F1F5F9');
          ctx.fillRect(pad+i*cellW+1,y,cellW-2,bh);
          ctx.strokeStyle=isDark?'#475569':'#D1D5DB';
          ctx.lineWidth=1;
          ctx.strokeRect(pad+i*cellW+1,y,cellW-2,bh);
        }
        ctx.fillStyle=isDark?'#94A3B8':'#64748B';
        ctx.font='bold 12px Inter,sans-serif';
        ctx.textAlign='left';
        ctx.fillText(label,pad,y+bh+14);
      }
      drawBar(8,n1,'#4F46E5',`${n1}/${d}`);
      drawBar(8+bh+22,n2,'#06B6D4',`${n2}/${d}`);
      const total=n1+n2;
      const g=window.mmGcd(total,d);
      const frac=total===0?'0':total===d?'1':`${total/g}/${d/g}`;
      el.querySelector('#fs-result').innerHTML=`${n1}/${d} + ${n2}/${d} = ${total}/${d} = <strong>${frac}</strong>`;
    }
    ['#fs-n1','#fs-n2','#fs-d'].forEach(id=>el.querySelector(id).addEventListener('input',draw));
    draw();
  }

  function _visEquationBalance(el) {
    el.innerHTML = `
      <div style="text-align:center;max-width:500px;margin:0 auto">
        <p style="margin-bottom:16px;font-size:15px;color:var(--text-2)">Una ecuación es como una balanza: ambos lados deben ser iguales</p>
        <canvas id="balance-canvas" width="460" height="200" style="display:block;margin:0 auto;max-width:100%"></canvas>
        <div style="display:flex;gap:20px;justify-content:center;margin-top:16px;flex-wrap:wrap">
          <div><label style="font-size:13px">Coeficiente a</label><br><input type="range" min="1" max="5" value="2" id="eq-a" style="width:120px"> <span id="eq-av" style="font-weight:700;color:var(--brand-600)">2</span></div>
          <div><label style="font-size:13px">Suma b</label><br><input type="range" min="0" max="10" value="5" id="eq-b" style="width:120px"> <span id="eq-bv" style="font-weight:700;color:var(--brand-600)">5</span></div>
          <div><label style="font-size:13px">Resultado c</label><br><input type="range" min="1" max="20" value="15" id="eq-c" style="width:120px"> <span id="eq-cv" style="font-weight:700;color:var(--brand-600)">15</span></div>
        </div>
        <div style="font-size:16px;font-weight:700;margin-top:12px;color:var(--brand-600)" id="eq-equation"></div>
        <div style="font-size:14px;color:var(--success);margin-top:4px" id="eq-solution"></div>
      </div>`;

    const canvas = el.querySelector('#balance-canvas');
    const ctx = canvas.getContext('2d');
    function draw(){
      const a=parseInt(el.querySelector('#eq-a').value),
            b=parseInt(el.querySelector('#eq-b').value),
            c=parseInt(el.querySelector('#eq-c').value);
      el.querySelector('#eq-av').textContent=a;
      el.querySelector('#eq-bv').textContent=b;
      el.querySelector('#eq-cv').textContent=c;
      const x=(c-b)/a;
      const balanced=Math.abs(a*x+b-c)<0.001;
      const isDark=document.documentElement.getAttribute('data-theme')==='dark';
      ctx.clearRect(0,0,460,200);
      // Base
      ctx.fillStyle=isDark?'#475569':'#94A3B8';
      ctx.fillRect(200,180,60,14); ctx.fillRect(225,80,10,100);
      // Arm
      const tilt=balanced?0:Math.min(Math.max((a*x+b-c)*3,-25),25);
      ctx.save(); ctx.translate(230,80);
      ctx.rotate(tilt*Math.PI/180);
      ctx.fillStyle=isDark?'#64748B':'#94A3B8';
      ctx.fillRect(-120,-4,240,8);
      // Left pan (left side = ax+b)
      ctx.fillStyle=isDark?'#334155':'#EEF2FF';
      ctx.fillRect(-130,10,70,50);
      ctx.strokeStyle=isDark?'#818CF8':'#4F46E5';
      ctx.lineWidth=2; ctx.strokeRect(-130,10,70,50);
      ctx.fillStyle=isDark?'#818CF8':'#4F46E5';
      ctx.font='bold 13px Inter,sans-serif'; ctx.textAlign='center';
      ctx.fillText(`${a}x + ${b}`, -95, 40);
      // Right pan (= c)
      ctx.fillStyle=isDark?'#334155':'#F0FDF4';
      ctx.fillRect(60,10,70,50);
      ctx.strokeStyle=isDark?'#34D399':'#10B981';
      ctx.lineWidth=2; ctx.strokeRect(60,10,70,50);
      ctx.fillStyle=isDark?'#34D399':'#10B981';
      ctx.fillText(`${c}`, 95, 40);
      ctx.restore();
      el.querySelector('#eq-equation').textContent=`${a}x + ${b} = ${c}`;
      if(x===Math.round(x)&&c-b>0){
        el.querySelector('#eq-solution').textContent=`Solución: x = ${x}  ✓`;
      } else {
        el.querySelector('#eq-solution').textContent=`x = ${x.toFixed(2)}`;
      }
    }
    ['#eq-a','#eq-b','#eq-c'].forEach(id=>el.querySelector(id).addEventListener('input',draw));
    draw();
  }

  function _visParabola(el) {
    el.innerHTML = `
      <p style="margin-bottom:12px;font-size:15px;color:var(--text-2)">Mueve los parámetros para ver cómo cambia la parábola</p>
      <canvas id="par-canvas" width="440" height="300" style="display:block;margin:0 auto;max-width:100%;border-radius:var(--r-md)"></canvas>
      <div style="display:flex;gap:16px;justify-content:center;margin-top:14px;flex-wrap:wrap">
        ${[['a','a',-3,3,0.5,1],['b','b',-5,5,1,0],['c','c',-5,5,1,0]].map(([id,lbl,mn,mx,st,def])=>
          `<div><label style="font-size:13px;font-weight:600">${lbl}</label><br><input type="range" min="${mn}" max="${mx}" step="${st}" value="${def}" id="par-${id}" style="width:110px"> <span id="par-${id}v" style="font-weight:700;color:var(--brand-600)">${def}</span></div>`).join('')}
      </div>
      <div style="font-size:15px;font-weight:700;color:var(--brand-600);text-align:center;margin-top:10px" id="par-fn"></div>
      <div style="font-size:13px;color:var(--text-2);text-align:center;margin-top:4px" id="par-info"></div>`;

    const canvas = el.querySelector('#par-canvas');
    function draw(){
      const a=parseFloat(el.querySelector('#par-a').value),
            b=parseFloat(el.querySelector('#par-b').value),
            c=parseFloat(el.querySelector('#par-c').value);
      ['a','b','c'].forEach(id=>el.querySelector(`#par-${id}v`).textContent=el.querySelector(`#par-${id}`).value);
      Grapher.miniGraph(canvas,`${a}*x*x + ${b}*x + (${c})`,{xMin:-7,xMax:7,yMin:-8,yMax:8});
      const vx=-b/(2*a)||0, vy=a*vx*vx+b*vx+c;
      el.querySelector('#par-fn').textContent=`f(x) = ${a}x² + ${b}x + ${c}`;
      el.querySelector('#par-info').textContent=`Vértice: (${vx.toFixed(2)}, ${vy.toFixed(2)}) · Abre: ${a>0?'↑ (mínimo)':'↓ (máximo)'}`;
    }
    ['par-a','par-b','par-c'].forEach(id=>el.querySelector(`#${id}`).addEventListener('input',draw));
    draw();
  }

  function _visTriangle(el) {
    el.innerHTML = `
      <div style="text-align:center;max-width:480px;margin:0 auto">
        <p style="margin-bottom:14px;font-size:15px;color:var(--text-2)">El triángulo es exactamente la mitad del rectángulo</p>
        <canvas id="tri-canvas" width="460" height="250" style="display:block;margin:0 auto;max-width:100%"></canvas>
        <div style="display:flex;gap:20px;justify-content:center;margin-top:14px">
          <div><label style="font-size:13px">Base</label><br><input type="range" min="1" max="10" step=".5" value="6" id="tri-b" style="width:120px"> <span id="tri-bv" style="font-weight:700;color:var(--success)">6</span></div>
          <div><label style="font-size:13px">Altura</label><br><input type="range" min="1" max="10" step=".5" value="4" id="tri-h" style="width:120px"> <span id="tri-hv" style="font-weight:700;color:var(--brand-600)">4</span></div>
        </div>
        <div style="font-size:18px;font-weight:800;color:var(--brand-600);margin-top:12px" id="tri-area"></div>
      </div>`;

    const canvas = el.querySelector('#tri-canvas');
    const ctx = canvas.getContext('2d');
    function draw(){
      const b=parseFloat(el.querySelector('#tri-b').value),h=parseFloat(el.querySelector('#tri-h').value);
      el.querySelector('#tri-bv').textContent=b;
      el.querySelector('#tri-hv').textContent=h;
      const isDark=document.documentElement.getAttribute('data-theme')==='dark';
      ctx.clearRect(0,0,460,250);
      const scale=Math.min(380/b,180/h),ox=40,oy=220;
      const bPx=b*scale,hPx=h*scale;
      // Rectangle (faded)
      ctx.fillStyle=isDark?'rgba(99,102,241,.15)':'rgba(99,102,241,.08)';
      ctx.fillRect(ox,oy-hPx,bPx,hPx);
      ctx.strokeStyle=isDark?'#6366F1':'#A5B4FC';
      ctx.setLineDash([6,4]); ctx.lineWidth=1.5;
      ctx.strokeRect(ox,oy-hPx,bPx,hPx);
      ctx.setLineDash([]);
      // Triangle
      ctx.beginPath();
      ctx.moveTo(ox,oy); ctx.lineTo(ox+bPx,oy); ctx.lineTo(ox,oy-hPx); ctx.closePath();
      const grd=ctx.createLinearGradient(ox,oy-hPx,ox+bPx,oy);
      grd.addColorStop(0,isDark?'#6366F1':'#4F46E5');
      grd.addColorStop(1,isDark?'#06B6D4':'#0891B2');
      ctx.fillStyle=grd; ctx.fill();
      ctx.strokeStyle=isDark?'#818CF8':'#3730A3'; ctx.lineWidth=2; ctx.stroke();
      // Height indicator
      ctx.strokeStyle=isDark?'#34D399':'#10B981';
      ctx.setLineDash([4,3]); ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ox,oy-hPx); ctx.stroke();
      ctx.setLineDash([]);
      // Labels
      ctx.fillStyle=isDark?'#94A3B8':'#64748B';
      ctx.font='bold 13px Inter,sans-serif'; ctx.textAlign='center';
      ctx.fillText(`b = ${b} cm`,ox+bPx/2,oy+18);
      ctx.textAlign='right';
      ctx.fillText(`h = ${h} cm`,ox-8,oy-hPx/2);
      el.querySelector('#tri-area').textContent=`Área = (${b} × ${h}) / 2 = ${b*h/2} cm²`;
    }
    ['tri-b','tri-h'].forEach(id=>el.querySelector(`#${id}`).addEventListener('input',draw));
    draw();
  }

  function _visProbabilityDice(el) {
    el.innerHTML = `
      <div style="text-align:center;max-width:500px;margin:0 auto">
        <p style="margin-bottom:16px;font-size:15px;color:var(--text-2)">Haz clic en "Lanzar" para simular lanzamientos del dado</p>
        <div style="display:flex;gap:20px;justify-content:center;align-items:center;margin-bottom:16px;flex-wrap:wrap">
          <div style="font-size:80px;line-height:1;transition:transform .2s" id="dice-face">🎲</div>
          <div>
            <button class="btn btn-primary" id="roll-btn">🎲 Lanzar</button>
            <div style="margin-top:10px;font-size:24px;font-weight:800;color:var(--brand-600)" id="roll-result">-</div>
          </div>
        </div>
        <canvas id="dice-canvas" width="420" height="140" style="display:block;margin:0 auto;max-width:100%"></canvas>
        <div style="margin-top:10px;font-size:13px;color:var(--text-2)" id="dice-stats">Lanza el dado para ver estadísticas</div>
      </div>`;

    const faces=['⚀','⚁','⚂','⚃','⚄','⚅'];
    const counts=[0,0,0,0,0,0];
    let total=0;

    function draw(){
      const canvas=el.querySelector('#dice-canvas'), ctx=canvas.getContext('2d');
      const isDark=document.documentElement.getAttribute('data-theme')==='dark';
      ctx.clearRect(0,0,420,140);
      const bw=50,gap=14,ox=20,oy=90;
      const maxCount=Math.max(...counts,1);
      counts.forEach((c,i)=>{
        const bh=total?(c/maxCount)*80:0;
        const grd=ctx.createLinearGradient(0,oy-bh,0,oy);
        grd.addColorStop(0,isDark?'#818CF8':'#4F46E5');
        grd.addColorStop(1,isDark?'#06B6D4':'#0891B2');
        ctx.fillStyle=grd;
        ctx.fillRect(ox+i*(bw+gap),oy-bh,bw,bh);
        ctx.fillStyle=isDark?'#94A3B8':'#64748B';
        ctx.font='12px Inter,sans-serif'; ctx.textAlign='center';
        ctx.fillText(i+1, ox+i*(bw+gap)+bw/2, oy+14);
        ctx.fillText(c, ox+i*(bw+gap)+bw/2, oy-bh-5);
      });
    }

    el.querySelector('#roll-btn').addEventListener('click',()=>{
      const r=Math.floor(Math.random()*6);
      counts[r]++;total++;
      const face=el.querySelector('#dice-face');
      face.textContent=faces[r];
      face.style.transform='scale(1.3)';
      setTimeout(()=>face.style.transform='',200);
      el.querySelector('#roll-result').textContent=`Resultado: ${r+1}`;
      const pcts=counts.map(c=>total?(c/total*100).toFixed(1)+'%':'0%');
      el.querySelector('#dice-stats').textContent=`Total lanzamientos: ${total} · Frecuencias: ${pcts.join(', ')}`;
      draw();
    });
    draw();
  }

  function _visDerivative(el) {
    el.innerHTML = `
      <div style="text-align:center;max-width:480px;margin:0 auto">
        <p style="margin-bottom:12px;font-size:15px;color:var(--text-2)">Mueve el punto para ver la tangente en cada punto de la función</p>
        <canvas id="der-canvas" width="440" height="280" style="display:block;margin:0 auto;max-width:100%;border-radius:var(--r-md)"></canvas>
        <div style="display:flex;gap:16px;justify-content:center;margin-top:12px;align-items:center">
          <label style="font-size:13px;font-weight:600">Punto x:</label>
          <input type="range" min="-4" max="4" step="0.1" value="1" id="der-x" style="width:100%;max-width:200px">
          <span id="der-xv" style="font-weight:700;color:var(--brand-600)">1</span>
        </div>
        <div style="font-size:15px;font-weight:700;color:var(--brand-600);margin-top:10px" id="der-info"></div>
      </div>`;

    const canvas=el.querySelector('#der-canvas');
    function draw(){
      const xVal=parseFloat(el.querySelector('#der-x').value);
      el.querySelector('#der-xv').textContent=xVal.toFixed(1);
      const fn=x=>x*x*x/3-x;
      const dfn=x=>x*x-1;
      Grapher.miniGraph(canvas,`x*x*x/3 - x`,{xMin:-5,xMax:5,yMin:-4,yMax:4});
      // Draw tangent
      const ctx=canvas.getContext('2d');
      const w=canvas.width,h=canvas.height;
      const view={xMin:-5,xMax:5,yMin:-4,yMax:4};
      function toS(mx,my){return{x:((mx-view.xMin)/(view.xMax-view.xMin))*w,y:h-((my-view.yMin)/(view.yMax-view.yMin))*h};}
      const slope=dfn(xVal), yp=fn(xVal);
      const x1=-6, y1=yp+slope*(x1-xVal);
      const x2=6,  y2=yp+slope*(x2-xVal);
      const p1=toS(x1,y1), p2=toS(x2,y2);
      ctx.strokeStyle='#EF4444'; ctx.lineWidth=2; ctx.setLineDash([6,4]);
      ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.stroke();
      ctx.setLineDash([]);
      const pt=toS(xVal,yp);
      ctx.beginPath(); ctx.arc(pt.x,pt.y,5,0,Math.PI*2);
      ctx.fillStyle='#EF4444'; ctx.fill();
      ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke();
      el.querySelector('#der-info').textContent=`f(${xVal.toFixed(1)}) = ${yp.toFixed(3)} · f'(${xVal.toFixed(1)}) = ${slope.toFixed(3)} (pendiente)`;
    }
    el.querySelector('#der-x').addEventListener('input',draw);
    draw();
  }

  function _visPercentageBar(el){
    el.innerHTML=`
      <div style="text-align:center;max-width:480px;margin:0 auto">
        <p style="margin-bottom:14px;font-size:15px;color:var(--text-2)">Visualiza qué significa un porcentaje de una cantidad</p>
        <div style="display:flex;gap:16px;justify-content:center;margin-bottom:16px;flex-wrap:wrap">
          <div><label style="font-size:13px">Porcentaje</label><br><input type="range" min="0" max="100" value="30" id="pct-p" style="width:140px"> <span id="pct-pv" style="font-weight:700;color:var(--brand-600)">30</span>%</div>
          <div><label style="font-size:13px">Cantidad base</label><br><input type="range" min="100" max="10000" step="100" value="5000" id="pct-base" style="width:140px"> <span id="pct-bv" style="font-weight:700;color:var(--brand-600)">5000</span></div>
        </div>
        <canvas id="pct-canvas" width="440" height="80" style="display:block;margin:0 auto;max-width:100%"></canvas>
        <div style="font-size:20px;font-weight:800;color:var(--brand-600);margin-top:12px" id="pct-result"></div>
      </div>`;
    const canvas=el.querySelector('#pct-canvas'), ctx=canvas.getContext('2d');
    function draw(){
      const p=parseInt(el.querySelector('#pct-p').value),base=parseInt(el.querySelector('#pct-base').value);
      el.querySelector('#pct-pv').textContent=p; el.querySelector('#pct-bv').textContent=base;
      const isDark=document.documentElement.getAttribute('data-theme')==='dark';
      ctx.clearRect(0,0,440,80);
      ctx.fillStyle=isDark?'#334155':'#F1F5F9';
      ctx.beginPath(); ctx.roundRect(20,20,400,40,8); ctx.fill();
      const grd=ctx.createLinearGradient(20,0,420,0);
      grd.addColorStop(0,isDark?'#818CF8':'#4F46E5');
      grd.addColorStop(1,isDark?'#06B6D4':'#0891B2');
      ctx.fillStyle=grd;
      ctx.beginPath(); ctx.roundRect(20,20,400*(p/100),40,8); ctx.fill();
      ctx.fillStyle=isDark?'#F1F5F9':'#0F172A';
      ctx.font='bold 14px Inter,sans-serif'; ctx.textAlign='center';
      if(p>15) ctx.fillText(`${p}%`,20+400*(p/100)/2,45);
      el.querySelector('#pct-result').textContent=`${p}% de ${base} = ${(p/100*base).toFixed(2)}`;
    }
    ['#pct-p','#pct-base'].forEach(id=>el.querySelector(id).addEventListener('input',draw));
    draw();
  }

  // ── Discovery ────────────────────────────────────────────────
  function _renderDiscovery(el, lesson) {
    if (!lesson.discovery?.length) {
      el.innerHTML = `<p style="color:var(--text-3);font-size:15px">Este tema no tiene sección de descubrimiento.</p>`; return;
    }
    el.innerHTML = `
      <div class="info-box tip" style="margin-bottom:20px">
        <div class="info-box-title">🔍 Aprende por descubrimiento</div>
        <p>Sigue los pasos y responde las preguntas guiadas. ¡Tú mismo vas a descubrir la regla matemática!</p>
      </div>
      <div class="discovery-steps">
        ${lesson.discovery.map((step, i) => `
          <div class="disc-step">
            <div class="disc-step-header" onclick="this.parentElement.classList.toggle('open')">
              <div style="display:flex;align-items:center">
                <div class="disc-step-num">${i+1}</div>
                ${step.title}
              </div>
              <span>▼</span>
            </div>
            <div class="disc-step-body" ${i>0?'style="display:none"':''}>
              <p style="margin-bottom:12px">${step.text}</p>
              ${step.question ? `<div class="disc-q">💭 ${step.question}</div>` : ''}
            </div>
          </div>`).join('')}
      </div>`;

    // Toggle open/close
    el.querySelectorAll('.disc-step-header').forEach(h => {
      h.addEventListener('click', () => {
        const body = h.nextElementSibling;
        const isOpen = h.parentElement.classList.contains('open');
        body.style.display = isOpen ? 'none' : 'block';
        h.querySelector('span').textContent = isOpen ? '▼' : '▲';
      });
    });
    // Open first
    const first = el.querySelector('.disc-step');
    if (first) { first.classList.add('open'); first.querySelector('.disc-step-body').style.display='block'; first.querySelector('span').textContent='▲'; }
  }

  // ── Examples ────────────────────────────────────────────────
  // Wraps raw LaTeX in \(...\) so renderMathInElement processes it.
  // Leaves alone: already-delimited strings (start with \( or \[),
  // and plain-text formulas (no backslash, ^, or _).
  function _fmtFormula(s) {
    if (!s) return '';
    if (/^\\[\(\[]/.test(s)) return s;
    if (/[\\^_]/.test(s)) return `\\(${s}\\)`;
    return s;
  }

  function _renderExamples(el, lesson) {
    if (!lesson.examples?.length) {
      el.innerHTML = `<p style="color:var(--text-3)">No hay ejemplos disponibles.</p>`; return;
    }

    let activeEx = 0, activeStep = 0;

    function render() {
      const ex = lesson.examples[activeEx];
      const isLastStep = activeStep >= ex.steps.length - 1;
      const isLastEx   = activeEx >= lesson.examples.length - 1;
      const nextLabel  = !isLastStep ? 'Siguiente →'
        : !isLastEx   ? 'Siguiente ejemplo →'
        : '🏋️ Ir a Ejercicios →';

      el.innerHTML = `
        ${lesson.examples.length > 1 ? `
          <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
            ${lesson.examples.map((e,i) => `<button class="btn btn-sm ${i===activeEx?'btn-primary':'btn-secondary'}" data-ex="${i}">${e.title}</button>`).join('')}
          </div>` : ''}
        <div class="example-header">📝 ${ex.title}</div>
        <div class="example-problem">${ex.problem}</div>
        <div class="step-list" id="step-list">
          ${ex.steps.map((s,i) => `
            <div class="step-item ${i<=activeStep?'visible':''} ${i===activeStep?'current':''}">
              <div class="step-num">${i+1}</div>
              <div class="step-content">
                <div class="step-action">${s.action}</div>
                ${s.why ? `<div class="step-why">${s.why}</div>` : ''}
                <div class="step-math">${_fmtFormula(s.formula)}</div>
                ${s.result && i<=activeStep ? `<div style="color:var(--success);font-weight:600;font-size:14px;margin-top:6px">✓ ${s.result}</div>` : ''}
              </div>
            </div>`).join('')}
        </div>
        <div class="step-nav">
          <button class="btn btn-secondary btn-sm" id="step-prev" ${activeStep===0?'disabled':''}>← Anterior</button>
          <div class="step-prog">Paso ${activeStep+1} de ${ex.steps.length}</div>
          <button class="btn btn-primary btn-sm" id="step-next">${nextLabel}</button>
        </div>`;

      Assessment.renderKatex(el);

      el.querySelectorAll('[data-ex]').forEach(btn => btn.addEventListener('click', () => { activeEx=parseInt(btn.dataset.ex); activeStep=0; render(); }));
      const prevBtn = el.querySelector('#step-prev');
      const nextBtn = el.querySelector('#step-next');
      if (prevBtn) prevBtn.addEventListener('click', () => { if(activeStep>0){activeStep--;render();} });
      if (nextBtn) nextBtn.addEventListener('click', () => {
        if (activeStep < ex.steps.length - 1) {
          activeStep++; render();
        } else if (activeEx < lesson.examples.length - 1) {
          activeEx++; activeStep = 0; render();
        } else {
          const ejercTab = document.querySelector('.lt-tab[data-tab="ejercicios"]');
          if (ejercTab) ejercTab.click();
        }
      });
    }
    render();
  }

  // ── Exploration ──────────────────────────────────────────────
  function _renderExploration(el, lesson) {
    const exp = lesson.exploration;
    if (!exp) { el.innerHTML = `<p style="color:var(--text-3)">No hay modo exploración para esta lección.</p>`; return; }

    el.innerHTML = `
      <div class="info-box tip" style="margin-bottom:18px">
        <div class="info-box-title">🎛️ Modo exploración</div>
        <p>Modifica los parámetros y observa cómo cambia la gráfica en tiempo real.</p>
      </div>
      <div class="explorer-wrap">
        <canvas id="exp-canvas" width="340" height="280" style="border-radius:var(--r-md);border:1px solid var(--border)"></canvas>
        <div class="explorer-controls" id="exp-controls">
          ${exp.sliders.map(s => `
            <div class="slider-group">
              <div class="slider-label">
                <span>${s.label}</span>
                <span id="val-${s.id}">${s.default}</span>
              </div>
              <input type="range" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.default}" id="sl-${s.id}">
            </div>`).join('')}
          <div class="explorer-info" id="exp-info"></div>
        </div>
      </div>`;

    const canvas = el.querySelector('#exp-canvas');
    function getVals(){ return exp.sliders.map(s=>parseFloat(el.querySelector(`#sl-${s.id}`).value)); }
    function update(){
      const vals = getVals();
      exp.sliders.forEach((s,i) => el.querySelector(`#val-${s.id}`).textContent = vals[i]);
      let fnStr;
      if (exp.type === 'quadratic' || exp.type === 'derivative') {
        const [a,b,c] = vals;
        fnStr = `${a}*x*x + ${b}*x + (${c})`;
        const vx = b!==0?(-b/(2*a)).toFixed(2):'0';
        const vy = (a*parseFloat(vx)**2 + b*parseFloat(vx) + c).toFixed(2);
        el.querySelector('#exp-info').innerHTML = `
          f(x) = ${a}x² + ${b}x + ${c}<br>
          Vértice: (${vx}, ${vy})<br>
          Abre: ${a>0?'↑ mínimo':'↓ máximo'}<br>
          Eje de simetría: x = ${vx}`;
      } else if (exp.type === 'triangle') {
        const [base, height] = vals;
        fnStr = null;
        const area = base*height/2;
        el.querySelector('#exp-info').innerHTML = `A = (${base} × ${height}) / 2 = <strong>${area}</strong> cm²`;
        _visTriangleExp(canvas, base, height);
        return;
      }
      if (fnStr) Grapher.miniGraph(canvas, fnStr, {xMin:-8,xMax:8,yMin:-8,yMax:8});
    }

    exp.sliders.forEach(s => el.querySelector(`#sl-${s.id}`).addEventListener('input', update));
    update();
  }

  function _visTriangleExp(canvas, base, height){
    const ctx=canvas.getContext('2d');
    const isDark=document.documentElement.getAttribute('data-theme')==='dark';
    const w=canvas.width,h=canvas.height;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle=isDark?'#1E293B':'#F8FAFC';
    ctx.fillRect(0,0,w,h);
    const scale=Math.min((w-60)/base,(h-60)/height);
    const bPx=base*scale, hPx=height*scale;
    const ox=(w-bPx)/2, oy=h-30;
    ctx.fillStyle=isDark?'rgba(99,102,241,.2)':'rgba(99,102,241,.1)';
    ctx.fillRect(ox,oy-hPx,bPx,hPx);
    ctx.strokeStyle=isDark?'#818CF8':'#A5B4FC';
    ctx.setLineDash([5,4]); ctx.lineWidth=1.5;
    ctx.strokeRect(ox,oy-hPx,bPx,hPx);
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ox+bPx,oy); ctx.lineTo(ox,oy-hPx); ctx.closePath();
    const grd=ctx.createLinearGradient(ox,oy-hPx,ox+bPx,oy);
    grd.addColorStop(0,'#4F46E5'); grd.addColorStop(1,'#06B6D4');
    ctx.fillStyle=grd; ctx.fill();
    ctx.strokeStyle='#3730A3'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle=isDark?'#94A3B8':'#64748B';
    ctx.font='bold 13px Inter,sans-serif'; ctx.textAlign='center';
    ctx.fillText(`b = ${base}`,ox+bPx/2,oy+18);
    ctx.textAlign='right';
    ctx.fillText(`h = ${height}`,ox-6,oy-hPx/2);
  }

  // ── Summary ──────────────────────────────────────────────────
  function _renderSummary(el, lesson, tabs) {
    const done = Progress.isLessonComplete(lesson.id);
    el.innerHTML = `
      <div class="info-box fact" style="margin-bottom:20px">
        <div class="info-box-title">✅ Resumen de la lección</div>
        <p class="concept-what">${lesson.summary}</p>
      </div>
      ${lesson.keyPoints?.length ? `
        <div style="margin-bottom:20px">
          <div class="section-title">Puntos clave</div>
          ${lesson.keyPoints.map(k => `
            <div style="display:flex;gap:10px;align-items:center;padding:10px;border:1px solid var(--border);border-radius:var(--r-md);margin-bottom:8px;background:var(--bg-card)">
              <span style="color:var(--success);font-size:18px">✓</span>
              <span style="font-size:15px">${k}</span>
            </div>`).join('')}
        </div>` : ''}
      <div style="text-align:center;padding:24px;background:${done?'#F0FDF4':'var(--brand-50)'};border-radius:var(--r-xl);border:2px solid ${done?'var(--success)':'var(--brand-300)'}">
        ${done ? `
          <div style="font-size:40px;margin-bottom:8px">🎉</div>
          <div style="font-size:18px;font-weight:800;color:var(--success)">¡Lección completada!</div>
          <div style="font-size:14px;color:var(--text-2);margin-top:4px">Esta lección ha sido guardada en tu progreso.</div>
          <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap">
            <a href="#/practice" class="btn btn-success">💪 Practicar</a>
            <a href="#/courses" class="btn btn-secondary">← Ver cursos</a>
          </div>` : `
          <div style="font-size:40px;margin-bottom:8px">🚀</div>
          <div style="font-size:18px;font-weight:800;color:var(--brand-700)">¿Listo para marcar esta lección?</div>
          <div style="font-size:14px;color:var(--text-2);margin-top:4px">Ganarás ⚡ ${lesson.xpReward} XP al completarla.</div>
          <button class="btn btn-primary btn-lg" style="margin-top:16px" id="complete-btn">
            ✅ Marcar como completada (+${lesson.xpReward} XP)
          </button>`}
      </div>`;

    if (!done) {
      el.querySelector('#complete-btn').addEventListener('click', () => {
        _completeLesson(lesson);
        _renderSummary(el, lesson, tabs);
      });
    }
    Assessment.renderKatex(el);
  }

  // ══════════════════════════════════════════════════════════════
  // PRACTICE
  // ══════════════════════════════════════════════════════════════
  function _renderPractice(main, courseId) {
    const topic = courseId || 'general';

    main.innerHTML = `
      <div class="practice-wrap">
        <div class="page-title">Práctica</div>
        <div class="page-subtitle">Pon a prueba tu conocimiento con ejercicios aleatorios</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
          <div>
            <div class="label">Materia</div>
            <select id="topic-select" style="width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:var(--r-md);background:var(--bg-card);color:var(--text);font-size:14px;outline:none">
              <option value="general">General (todas)</option>
              <option value="fracciones" ${topic==='fracciones'?'selected':''}>Fracciones</option>
              <option value="ecuaciones" ${topic==='algebra'||topic==='ecuaciones'?'selected':''}>Ecuaciones</option>
              <option value="porcentajes">Porcentajes</option>
              <option value="geometria">Geometría</option>
              <option value="estadistica">Estadística</option>
            </select>
          </div>
          <div>
            <div class="label">Dificultad</div>
            <select id="diff-select" style="width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:var(--r-md);background:var(--bg-card);color:var(--text);font-size:14px;outline:none">
              <option value="easy">Fácil</option>
              <option value="medio" selected>Medio</option>
              <option value="dificil">Difícil</option>
              <option value="experto">Experto</option>
            </select>
          </div>
        </div>
        <div id="practice-area">
          <div style="text-align:center;padding:40px">
            <div style="font-size:48px;margin-bottom:12px">💪</div>
            <div style="font-size:18px;font-weight:700;margin-bottom:6px">¿Listo para practicar?</div>
            <p style="color:var(--text-2);margin-bottom:20px">Selecciona una materia y nivel, luego inicia la sesión.</p>
            <button class="btn btn-primary btn-lg" id="start-btn">Iniciar Práctica →</button>
          </div>
        </div>
      </div>`;

    main.querySelector('#start-btn').addEventListener('click', () => {
      const t = main.querySelector('#topic-select').value;
      const d = main.querySelector('#diff-select').value;
      _startPracticeSession(main.querySelector('#practice-area'), t, d);
    });
  }

  function _startPracticeSession(area, topic, difficulty) {
    const COUNT = 10;
    Assessment.startSession(topic, difficulty, COUNT);
    let questionIdx = 0;

    function renderNext() {
      if (!Assessment.isSessionActive()) {
        const result = Assessment.finishSession();
        area.innerHTML = _renderSessionResult(result);
        Assessment.renderKatex(area);
        area.querySelector('#practice-again')?.addEventListener('click', () => {
          _startPracticeSession(area, topic, difficulty);
        });
        return;
      }

      const prog = Assessment.getSessionProgress();
      const q = Assessment.getQuestion();
      const pctDone = Math.round((prog.current/prog.total)*100);

      area.innerHTML = `
        <div class="practice-header">
          <div class="practice-progress-bar"><div class="ppb-fill" style="width:${pctDone}%"></div></div>
          <div class="practice-counter">${prog.current+1}/${prog.total}</div>
          <div class="practice-xp">⚡ ${prog.correct * 10} XP</div>
        </div>
        <div id="q-render"></div>
        <div id="practice-nav" style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" id="skip-btn">Omitir →</button>
        </div>`;

      Assessment.renderQuestion(q, area.querySelector('#q-render'), (result) => {
        Assessment.submitAnswer(result.userAnswer);
        // Add error analysis for wrong answers
        if (!result.isCorrect && result.question?.analyzeError) {
          const analysis = result.question.analyzeError(result.userAnswer);
          if (analysis?.feedback) {
            const fbArea = area.querySelector('#feedback-area');
            if (fbArea) {
              fbArea.insertAdjacentHTML('beforeend',
                `<div style="margin-top:8px;padding:8px;background:var(--bg-2);border-radius:6px;font-size:0.85rem;">
                  <strong>🔍 Análisis del error:</strong> ${analysis.feedback}
                </div>`);
              Assessment.renderKatex(fbArea);
            }
          }
        }
        // Replace nav area with Siguiente button (user controls advance)
        const nav = area.querySelector('#practice-nav');
        if (nav) {
          nav.innerHTML = `<button class="btn btn-primary" id="next-q-btn">Siguiente pregunta →</button>`;
          nav.querySelector('#next-q-btn').addEventListener('click', renderNext);
        }
      });

      area.querySelector('#skip-btn').addEventListener('click', () => {
        Assessment.submitAnswer('__skipped__');
        renderNext();
      });
    }

    renderNext();
  }

  function _renderSessionResult(result) {
    const pct = result.percent;
    const emoji = pct>=90?'🏆':pct>=70?'🌟':pct>=50?'👍':'💪';
    const msg = pct>=90?'¡Excelente trabajo!':pct>=70?'¡Muy bien!':pct>=50?'Buen intento':' ¡Sigue practicando!';
    return `
      <div style="text-align:center;padding:32px">
        <div style="font-size:56px;margin-bottom:12px">${emoji}</div>
        <div style="font-size:24px;font-weight:800;margin-bottom:6px">${msg}</div>
        <div style="font-size:48px;font-weight:800;color:${pct>=70?'var(--success)':'var(--brand-600)'}">${pct}%</div>
        <div style="color:var(--text-2);font-size:15px;margin-bottom:20px">${result.correct} correctas de ${result.total} preguntas</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" id="practice-again">🔄 Practicar de nuevo</button>
          <a href="#/progress" class="btn btn-secondary">Ver mi progreso</a>
        </div>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  // GRAPHER
  // ══════════════════════════════════════════════════════════════
  function _renderGrapher(main) {
    main.innerHTML = `
      <div class="page-title">Graficador de Funciones</div>
      <div class="grapher-wrap">
        <div class="grapher-canvas-wrap">
          <canvas id="grapher-canvas"></canvas>
        </div>
        <div class="grapher-panel">
          <div class="gp-card">
            <div class="gp-title">Funciones</div>
            <div id="fn-list">
              <div class="fn-input-row" style="flex-wrap:wrap;gap:4px;">
                <div class="fn-color" style="background:#4F46E5" title="Color"></div>
                <select class="fn-mode" title="Modo" style="font-size:11px;padding:2px 4px;border:1px solid var(--border);border-radius:6px;background:var(--bg-2);color:var(--text-1);cursor:pointer;">
                  <option value="y">y =</option>
                  <option value="x">x =</option>
                </select>
                <input type="text" class="fn-input" id="fn-0" value="x^2" placeholder="Ej: sin(x), x^2+1…" style="flex:1;min-width:80px;">
                <button class="fn-del" onclick="this.parentElement.remove(); Grapher.setFunctions(getFunctions())">✕</button>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm w-full mt-3" id="add-fn">+ Añadir función</button>
            <button class="btn btn-primary btn-sm w-full mt-2" id="plot-btn">📈 Graficar</button>
            <div style="font-size:11px;color:var(--text-3);margin-top:8px;line-height:1.5;">
              <strong>y =</strong> grafica y en función de x<br>
              <strong>x =</strong> grafica x en función de y (curvas verticales)
            </div>
          </div>
          <div class="gp-card">
            <div class="gp-title">Controles</div>
            <div class="grapher-controls">
              <button class="gc-btn" onclick="Grapher.zoom(0.8)">+ Zoom</button>
              <button class="gc-btn" onclick="Grapher.zoom(1.25)">− Zoom</button>
              <button class="gc-btn" onclick="Grapher.reset()">⌂ Reset</button>
            </div>
          </div>
          <div class="gp-card">
            <div class="gp-title">Funciones de ejemplo</div>
            <div style="font-size:11px;color:var(--text-3);margin-bottom:6px;">y = f(x)</div>
            <div style="display:flex;flex-direction:column;gap:6px" id="examples-list">
              ${[['Parábola','x^2','y'],['Seno','sin(x)','y'],['Coseno','cos(x)','y'],['Cúbica','x^3','y'],['Exponencial','exp(x)','y'],['Raíz','sqrt(x)','y'],['Logaritmo','ln(x)','y'],['Recta','2*x+1','y']].map(([n,f,m])=>
                `<button class="gc-btn" onclick="loadExample('${f}','${m}')">${n}: <em>${f}</em></button>`).join('')}
            </div>
            <div style="font-size:11px;color:var(--text-3);margin:8px 0 6px;">x = f(y) — curvas en y</div>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${[['Parábola horiz.','y^2','x'],['Raíz horiz.','sqrt(y)','x'],['Seno horiz.','sin(y)','x'],['Recta horiz.','2*y+1','x']].map(([n,f,m])=>
                `<button class="gc-btn" onclick="loadExample('${f}','${m}')">${n}: <em>x=${f}</em></button>`).join('')}
            </div>
          </div>
          <div class="gp-card" id="info-card">
            <div class="gp-title">Información</div>
            <div class="grapher-info" id="graph-info"><p style="color:var(--text-3);font-size:13px">Grafica una función para ver sus propiedades.</p></div>
          </div>
          <div class="gp-card">
            <div class="gp-title">Tabla de valores</div>
            <div id="table-wrap" style="font-size:12px;max-height:180px;overflow-y:auto"></div>
          </div>
        </div>
      </div>`;

    setTimeout(() => {
      Grapher.init('grapher-canvas', {
        onInfo: (info) => {
          const el = document.getElementById('graph-info');
          if (!el) return;
          el.innerHTML = `
            <div class="gi-row"><span class="gi-key">Función</span><span class="gi-val">${info.fn}</span></div>
            <div class="gi-row"><span class="gi-key">Ceros (x)</span><span class="gi-val">${info.zeros?.length ? info.zeros.join(', ') : 'Ninguno visible'}</span></div>
            <div class="gi-row"><span class="gi-key">Intersec. Y</span><span class="gi-val">${info.yIntercept}</span></div>
            <div class="gi-row"><span class="gi-key">Dominio (vista)</span><span class="gi-val">${info.domain}</span></div>`;
          // Table of values
          const tbl = document.getElementById('table-wrap');
          if (tbl) {
            const rows = Grapher.getTableOfValues(-5, 5, 10);
            tbl.innerHTML = `<table style="width:100%;border-collapse:collapse">
              <tr><th style="text-align:left;padding:3px 6px;border-bottom:1px solid var(--border)">x</th><th style="text-align:right;padding:3px 6px;border-bottom:1px solid var(--border)">f(x)</th></tr>
              ${rows.map(r=>`<tr><td style="padding:3px 6px;font-family:var(--mono)">${r.x}</td><td style="padding:3px 6px;text-align:right;font-family:var(--mono)">${r.y}</td></tr>`).join('')}
            </table>`;
          }
        }
      });

      Grapher.setFunctions(['x^2']);
      Gamification.onGrapherUsed();
    }, 100);

    // Expose helpers to inline onclick
    window.getFunctions = () => {
      const colors = ['#4F46E5','#EF4444','#10B981','#F59E0B','#EC4899','#06B6D4'];
      return Array.from(document.querySelectorAll('.fn-input-row')).map((row, i) => {
        const inp   = row.querySelector('.fn-input');
        const mSel  = row.querySelector('.fn-mode');
        return { expr: inp ? inp.value : '', color: colors[i % 6], mode: mSel ? mSel.value : 'y' };
      }).filter(f => f.expr.trim());
    };
    window.loadExample = (fn, mode) => {
      const row = document.querySelector('#fn-list .fn-input-row');
      if (!row) return;
      const inp  = row.querySelector('.fn-input');
      const mSel = row.querySelector('.fn-mode');
      if (inp)  inp.value = fn;
      if (mSel) mSel.value = mode || 'y';
      document.getElementById('plot-btn').click();
    };

    main.querySelector('#plot-btn').addEventListener('click', () => {
      Grapher.setFunctions(window.getFunctions());
    });
    main.querySelector('#add-fn').addEventListener('click', () => {
      const list = main.querySelector('#fn-list');
      const idx = list.children.length;
      const colors = ['#4F46E5','#EF4444','#10B981','#F59E0B','#EC4899','#06B6D4'];
      const div = document.createElement('div');
      div.className = 'fn-input-row';
      div.style.cssText = 'flex-wrap:wrap;gap:4px;';
      div.innerHTML = `<div class="fn-color" style="background:${colors[idx%6]}"></div>
        <select class="fn-mode" style="font-size:11px;padding:2px 4px;border:1px solid var(--border);border-radius:6px;background:var(--bg-2);color:var(--text-1);cursor:pointer;">
          <option value="y">y =</option>
          <option value="x">x =</option>
        </select>
        <input type="text" class="fn-input" id="fn-${idx}" placeholder="Ingresa una función…" style="flex:1;min-width:80px;">
        <button class="fn-del" onclick="this.parentElement.remove()">✕</button>`;
      list.appendChild(div);
      div.querySelector('input').focus();
    });
  }

  // ══════════════════════════════════════════════════════════════
  // PROGRESS
  // ══════════════════════════════════════════════════════════════
  function _renderProgress(main) {
    const p = Student.get();
    const stats = Student.getStats();
    const lvl = stats.level;
    const breakdown = Progress.getSubjectBreakdown();
    const topicStats = Progress.getTopicStats();
    const weekly = Progress.getWeeklyActivity();
    const due = Progress.getDueReviews();
    const upcoming = Progress.getUpcomingReviews();
    const badges = Gamification.getAllBadges();

    main.innerHTML = `
      <div class="page-title">Mi Progreso</div>
      <div class="progress-grid">
        <div>
          <!-- Level -->
          <div class="card mb-6">
            <div style="display:flex;align-items:center;gap:16px">
              <div style="width:56px;height:56px;border-radius:var(--r-lg);background:linear-gradient(135deg,var(--brand-500),var(--purple));color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800">${lvl.number}</div>
              <div style="flex:1">
                <div style="font-weight:700;font-size:16px">Nivel ${lvl.number} — ${lvl.name}</div>
                <div class="level-prog"><span>${p.xp} XP</span><span>${lvl.xpNeeded?`${lvl.xpNeeded} XP para el siguiente`:''}</span></div>
                <div class="level-bar"><div class="level-fill" style="width:${lvl.progress}%"></div></div>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="stats-row mb-6">
            <div class="stat-card"><div class="stat-icon">📚</div><div class="stat-value">${stats.lessonsCompleted}</div><div class="stat-label">Lecciones</div></div>
            <div class="stat-card"><div class="stat-icon">🔥</div><div class="stat-value">${stats.streak}</div><div class="stat-label">Racha</div></div>
            <div class="stat-card"><div class="stat-icon">⏱️</div><div class="stat-value">${Math.floor((p.totalMinutes||0)/60)}h</div><div class="stat-label">Estudiado</div></div>
            <div class="stat-card"><div class="stat-icon">⚡</div><div class="stat-value">${p.xp}</div><div class="stat-label">XP Total</div></div>
          </div>

          <!-- Weekly activity -->
          <div class="card mb-6">
            <div class="section-title">Actividad semanal</div>
            <div style="display:flex;align-items:flex-end;gap:6px;height:80px;margin-top:8px">
              ${weekly.map(d => {
                const h = Math.max(4, d.exercises * 6);
                return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
                  <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;width:100%">
                    <div style="background:var(--brand-500);border-radius:3px 3px 0 0;height:${h}px;opacity:${d.exercises?1:.25};width:100%"></div>
                  </div>
                  <span style="font-size:10px;color:var(--text-3)">${d.label}</span>
                </div>`;
              }).join('')}
            </div>
          </div>

          <!-- Subjects -->
          <div class="card">
            <div class="section-title">Progreso por materia</div>
            ${breakdown.map(s => `
              <div class="prog-subject">
                <div class="ps-header">
                  <div class="ps-name"><span>${s.icon}</span>${s.name}</div>
                  <div class="ps-pct">${s.percent}%</div>
                </div>
                <div class="ps-bar"><div class="ps-fill" style="width:${s.percent}%;background:${s.color}"></div></div>
                <div style="font-size:11px;color:var(--text-3);margin-top:4px">${s.done}/${s.total} lecciones${s.accuracy!==null?` · ${s.accuracy}% precisión`:''}</div>
              </div>`).join('')}
          </div>
        </div>

        <div>
          <!-- Badges -->
          <div class="card mb-6">
            <div class="section-title">🏅 Insignias</div>
            <div class="badge-grid">
              ${badges.map(b => `
                <div class="badge-item" title="${b.name}: ${b.desc}">
                  <div class="bi-icon ${b.earned?'earned':''}">${b.icon}</div>
                  <div class="bi-name">${b.name}</div>
                </div>`).join('')}
            </div>
          </div>

          <!-- Due reviews -->
          ${due.length?`
          <div class="card mb-6">
            <div class="section-title">⏰ Repasos pendientes</div>
            ${due.map(r=>`
              <div class="review-item" onclick="Router.navigate('/lesson/${r.lesson.id}')">
                <div class="ri-dot" style="background:${r.daysOverdue>3?'#EF4444':'#F59E0B'}"></div>
                <div class="ri-info">
                  <div class="ri-title">${r.lesson.title}</div>
                  <div class="ri-due">Vencido hace ${r.daysOverdue} día(s)</div>
                </div>
              </div>`).join('')}
          </div>`:''}

          <!-- Upcoming reviews -->
          ${upcoming.length?`
          <div class="card mb-6">
            <div class="section-title">📅 Próximos repasos</div>
            ${upcoming.slice(0,5).map(r=>`
              <div class="review-item" onclick="Router.navigate('/lesson/${r.lesson.id}')">
                <div class="ri-dot" style="background:var(--success)"></div>
                <div class="ri-info">
                  <div class="ri-title">${r.lesson.title}</div>
                  <div class="ri-due">${r.reviewDate.toLocaleDateString('es-CL',{weekday:'short',month:'short',day:'numeric'})}</div>
                </div>
              </div>`).join('')}
          </div>`:''}

          <!-- Topic stats -->
          ${topicStats.length?`
          <div class="card">
            <div class="section-title">📊 Estadísticas por tema</div>
            ${topicStats.map(t=>`
              <div style="margin-bottom:10px">
                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                  <span style="font-weight:600">${t.topic}</span>
                  <span style="color:${t.accuracy>=70?'var(--success)':'var(--warning)'}">${t.accuracy}% · ${t.correct}/${t.total}</span>
                </div>
                <div style="height:4px;background:var(--bg-hover);border-radius:var(--r-full);overflow:hidden">
                  <div style="height:100%;background:${t.accuracy>=70?'var(--success)':'var(--warning)'};width:${t.accuracy}%;border-radius:var(--r-full)"></div>
                </div>
              </div>`).join('')}
          </div>`:''}
        </div>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  // SETTINGS
  // ══════════════════════════════════════════════════════════════
  function _renderSettings(main) {
    const p = Student.get();
    const s = p.settings || {};

    main.innerHTML = `
      <div class="settings-wrap">
        <div class="page-title">Configuración</div>

        <div class="settings-section">
          <div class="section-title">👤 Perfil</div>
          <div class="card">
            <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
              <div style="width:56px;height:56px;border-radius:50%;background:var(--brand-600);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800">${p.avatar||'?'}</div>
              <div>
                <div style="font-weight:700;font-size:16px">${p.name}</div>
                <div style="color:var(--text-3);font-size:13px">Nivel ${p.level} · ${p.xp} XP</div>
              </div>
            </div>
            <label style="font-size:14px;font-weight:500;display:block;margin-bottom:6px">Nombre</label>
            <div style="display:flex;gap:8px">
              <input type="text" id="name-input" value="${p.name}" maxlength="30"
                style="flex:1;padding:9px 12px;border:1px solid var(--border);border-radius:var(--r-md);background:var(--bg);color:var(--text);font-size:14px;outline:none">
              <button class="btn btn-primary" id="save-name">Guardar</button>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="section-title">🎨 Apariencia</div>
          <div class="card">
            <div class="settings-row">
              <div><div class="sr-label">Tema oscuro</div><div class="sr-desc">Activa el modo nocturno</div></div>
              <label class="toggle-sw">
                <input type="checkbox" id="dark-toggle" ${document.documentElement.getAttribute('data-theme')==='dark'?'checked':''}>
                <span class="toggle-track"></span>
              </label>
            </div>
            <div class="settings-row">
              <div><div class="sr-label">Tamaño de texto</div><div class="sr-desc">Ajusta el tamaño de la fuente</div></div>
              <div class="font-ctrl">
                <button id="font-sm">A-</button>
                <span id="font-size-label">${s.fontSize||'normal'}</span>
                <button id="font-lg">A+</button>
              </div>
            </div>
            <div class="settings-row">
              <div><div class="sr-label">Alto contraste</div><div class="sr-desc">Mejora la visibilidad</div></div>
              <label class="toggle-sw">
                <input type="checkbox" id="hc-toggle" ${s.highContrast?'checked':''}>
                <span class="toggle-track"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="section-title">♿ Accesibilidad</div>
          <div class="card">
            <div class="settings-row">
              <div><div class="sr-label">Lector de texto</div><div class="sr-desc">Lee en voz alta el contenido</div></div>
              <label class="toggle-sw">
                <input type="checkbox" id="tts-toggle" ${s.tts?'checked':''}>
                <span class="toggle-track"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="section-title">💾 Progreso</div>
          <div class="card">
            <div class="settings-row">
              <div><div class="sr-label">Exportar progreso</div><div class="sr-desc">Descarga un archivo JSON con todo tu avance</div></div>
              <button class="btn btn-secondary btn-sm" id="export-btn">Exportar</button>
            </div>
            <div class="settings-row" style="margin-top:12px;">
              <div><div class="sr-label">Importar progreso</div><div class="sr-desc">Restaura tu progreso desde un archivo JSON</div></div>
              <button class="btn btn-secondary btn-sm" id="import-btn">Importar</button>
              <input type="file" id="import-file" accept=".json" style="display:none;">
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="section-title">⚠️ Datos</div>
          <div class="card">
            <div class="settings-row">
              <div><div class="sr-label">Restablecer progreso completo</div><div class="sr-desc">Borra todo el progreso, XP, dominio e insignias guardadas</div></div>
              <button class="btn btn-danger btn-sm" id="reset-btn">Restablecer</button>
            </div>
          </div>
        </div>
      </div>`;

    main.querySelector('#save-name').addEventListener('click', () => {
      const name = main.querySelector('#name-input').value.trim();
      if (name) { Student.setName(name); Gamification.showToast('✅', 'Nombre guardado', name); }
    });

    main.querySelector('#dark-toggle').addEventListener('change', e => {
      App.setTheme(e.target.checked ? 'dark' : 'light');
    });

    const fontSizes = ['small','normal','large','xlarge'];
    const fontLabels = { small:'Pequeño', normal:'Normal', large:'Grande', xlarge:'Muy grande' };
    let curFontIdx = fontSizes.indexOf(s.fontSize||'normal');
    main.querySelector('#font-sm').addEventListener('click', () => {
      curFontIdx = Math.max(0, curFontIdx-1);
      const fs = fontSizes[curFontIdx];
      document.documentElement.setAttribute('data-fontsize', fs);
      main.querySelector('#font-size-label').textContent = fontLabels[fs];
      Student.update({ settings: { ...Student.get().settings, fontSize: fs } });
    });
    main.querySelector('#font-lg').addEventListener('click', () => {
      curFontIdx = Math.min(fontSizes.length-1, curFontIdx+1);
      const fs = fontSizes[curFontIdx];
      document.documentElement.setAttribute('data-fontsize', fs);
      main.querySelector('#font-size-label').textContent = fontLabels[fs];
      Student.update({ settings: { ...Student.get().settings, fontSize: fs } });
    });

    main.querySelector('#hc-toggle').addEventListener('change', e => {
      document.documentElement.classList.toggle('high-contrast', e.target.checked);
      Student.update({ settings: { ...Student.get().settings, highContrast: e.target.checked } });
    });

    main.querySelector('#tts-toggle').addEventListener('change', e => {
      Student.update({ settings: { ...Student.get().settings, tts: e.target.checked } });
    });

    main.querySelector('#export-btn').addEventListener('click', () => {
      Student.exportProgress();
      Gamification.showToast('💾', 'Progreso exportado', 'El archivo JSON se ha descargado.');
    });

    main.querySelector('#import-btn').addEventListener('click', () => {
      main.querySelector('#import-file').click();
    });

    main.querySelector('#import-file').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = Student.importProgress(ev.target.result);
        if (result.ok) {
          Gamification.updateNavXP();
          Gamification.showToast('✅', 'Progreso importado', 'Tu avance ha sido restaurado correctamente.');
          setTimeout(() => Router.navigate('/settings'), 800);
        } else {
          Gamification.showToast('❌', 'Error al importar', 'El archivo no es válido.');
        }
      };
      reader.readAsText(file);
    });

    main.querySelector('#reset-btn').addEventListener('click', () => {
      if (confirm('¿Estás seguro? Se borrarán TODOS los datos: progreso, XP, dominio de temarios e insignias.')) {
        Student.reset();
        Gamification.updateNavXP();
        Gamification.showToast('🔄', 'Progreso restablecido', 'Todo el avance ha sido eliminado.');
        Router.navigate('/');
      }
    });
  }

  // ── Ejercicios interactivos ──────────────────────────────────
  function _renderEjercicios(el, lesson) {
    const ex = lesson.exercises;
    if (!ex) { el.innerHTML = '<div class="info-box error"><p>No hay ejercicios configurados para esta lección.</p></div>'; return; }

    const gens = ex.generators || (window.MM_TOPIC_GENERATORS && window.MM_TOPIC_GENERATORS[ex.topic]) || [];
    if (!gens.length) {
      el.innerHTML = '<div class="info-box error"><p>No se encontraron generadores de ejercicios para este tema.</p></div>';
      return;
    }

    const diffLabels = { easy:'Fácil', medio:'Medio', dificil:'Difícil' };
    let state = { diff: 'easy', genIdx: -1, q: null, correct: 0, total: 0 };

    function pickGen() {
      state.genIdx = (state.genIdx + 1) % gens.length;
      const fn = window.MM_GENERATORS && window.MM_GENERATORS[gens[state.genIdx]];
      if (!fn) return null;
      try { const q = fn(); q.difficulty = state.diff; return q; } catch(e) { return null; }
    }

    function _checkAnswer(ua, q) {
      const u = String(ua||'').trim().toLowerCase();
      const c = String(q.answer||'').trim().toLowerCase();
      if (q.type === 'multiple-choice') return u === c;
      const uN = parseFloat(u.replace(',', '.'));
      const cN = parseFloat(c.replace(',', '.').replace(/[^\d.\-/]/g, ''));
      if (!isNaN(uN) && !isNaN(cN)) {
        if (cN === 0) return Math.abs(uN) < 0.001;
        return Math.abs(uN - cN) / Math.abs(cN) < 0.01;
      }
      if (u.includes('/') && c.includes('/')) {
        const [un, ud] = u.split('/').map(Number);
        const [cn, cd] = c.split('/').map(Number);
        if (!isNaN(un)&&!isNaN(ud)&&!isNaN(cn)&&!isNaN(cd)&&ud&&cd)
          return Math.abs((un/ud)-(cn/cd)) < 0.001;
      }
      return u === c;
    }

    function loadNew() {
      state.q = pickGen();
      renderQuestion();
    }

    function renderQuestion() {
      const q = state.q;
      if (!q) {
        el.innerHTML = '<div class="info-box error"><p>Error al generar ejercicio. Intenta cambiar la dificultad.</p></div>';
        return;
      }

      const isMC = q.type === 'multiple-choice' && Array.isArray(q.options);
      const diffBtns = Object.entries(diffLabels).map(([d,lbl]) =>
        `<button class="btn btn-sm ${state.diff===d?'btn-primary':'btn-secondary'} ej-diff" data-d="${d}">${lbl}</button>`
      ).join('');

      el.innerHTML = `
        <div class="ejercicio-wrap">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:18px;">
            <span style="font-size:0.85rem;font-weight:600;color:var(--text-2);">Dificultad:</span>
            ${diffBtns}
            <span style="margin-left:auto;font-size:0.85rem;color:var(--text-3);">✅ ${state.correct}/${state.total} correctas</span>
          </div>

          <div class="question-card">
            <div class="q-meta">
              <span class="tag" style="background:${lesson.color||'var(--brand-600)'}22;color:${lesson.color||'var(--brand-600)'}">${q.topic || lesson.topic || 'Matemáticas'}</span>
              <span class="tag q-diff-${q.difficulty||'easy'}">${diffLabels[q.difficulty||'easy']||''}</span>
            </div>
            <div class="question-text" id="ej-qtext">${q.question}</div>

            ${isMC ? `
              <div class="mc-options" id="ej-mc">
                ${q.options.map((opt,i) => `
                  <div class="mc-opt" data-idx="${i}" role="radio" tabindex="0"
                    aria-label="Opción ${String.fromCharCode(65+i)}: ${opt}">
                    <span class="mc-letter">${String.fromCharCode(65+i)}</span>${opt}
                  </div>`).join('')}
              </div>` : `
              <div class="answer-input-wrap">
                <input type="text" id="ej-input" class="answer-input"
                  placeholder="Tu respuesta…" autocomplete="off">
              </div>`}

            <div id="ej-feedback"></div>

            <div id="ej-btns" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;">
              <button class="btn btn-secondary btn-sm" id="ej-hint">💡 Ver pista</button>
              <button class="btn btn-primary" id="ej-submit">Comprobar</button>
            </div>
          </div>
        </div>`;

      Assessment.renderKatex(el);

      // Difficulty buttons
      el.querySelectorAll('.ej-diff').forEach(btn => btn.addEventListener('click', () => {
        state.diff = btn.dataset.d;
        state.q = null;
        loadNew();
      }));

      // Hint
      el.querySelector('#ej-hint').addEventListener('click', () => {
        const fb = el.querySelector('#ej-feedback');
        fb.innerHTML = `<div class="feedback-box hint"><div class="fb-title">💡 Pista</div><div class="fb-text">${q.hint||'Sin pista disponible.'}</div></div>`;
        Assessment.renderKatex(fb);
      });

      // MC selection
      if (isMC) {
        el.querySelectorAll('.mc-opt').forEach(opt => {
          opt.addEventListener('click', () => {
            el.querySelectorAll('.mc-opt').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
          });
          opt.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') opt.click(); });
        });
      } else {
        const inp = el.querySelector('#ej-input');
        if (inp) { inp.focus(); inp.addEventListener('keydown', e => { if (e.key==='Enter') el.querySelector('#ej-submit').click(); }); }
      }

      // Submit
      el.querySelector('#ej-submit').addEventListener('click', () => _handleSubmit(q, isMC));
    }

    function _handleSubmit(q, isMC) {
      let userAnswer;
      if (isMC) {
        const sel = el.querySelector('.mc-opt.selected');
        if (!sel) { Gamification.showToast('⚠️', 'Selecciona una opción', 'Elige una respuesta antes de comprobar.'); return; }
        userAnswer = sel.dataset.idx;
      } else {
        const inp = el.querySelector('#ej-input');
        userAnswer = inp ? inp.value.trim() : '';
        if (!userAnswer) { Gamification.showToast('⚠️', 'Escribe tu respuesta', 'El campo de respuesta está vacío.'); return; }
      }

      const isCorrect = _checkAnswer(userAnswer, q);
      state.total++;
      if (isCorrect) { state.correct++; Gamification.onCorrectAnswer(state.diff); }

      // Disable input
      const inp = el.querySelector('#ej-input');
      if (inp) { inp.disabled = true; inp.classList.add(isCorrect ? 'correct' : 'wrong'); }
      if (isMC) {
        el.querySelectorAll('.mc-opt').forEach((opt, i) => {
          if (i === parseInt(q.answer)) opt.classList.add('correct');
          else if (opt.classList.contains('selected')) opt.classList.add('wrong');
        });
      }

      // Build feedback
      const fb = el.querySelector('#ej-feedback');
      let errorAnalysis = '';
      if (!isCorrect && q.analyzeError) {
        const analysis = q.analyzeError(userAnswer);
        if (analysis?.feedback) {
          errorAnalysis = `<div style="margin-top:8px;padding:10px;background:var(--bg-2);border-radius:8px;font-size:0.9rem;">
            <strong>🔍 ¿Qué ocurrió?</strong> ${analysis.feedback}
          </div>`;
        }
      }

      if (isCorrect) {
        const msgs = ['¡Excelente! Respuesta correcta.','¡Perfecto! Bien hecho.','¡Correcto! Sigue así.','¡Muy bien!','¡Genial!'];
        fb.innerHTML = `
          <div class="feedback-box correct">
            <div class="fb-title">✅ ${msgs[state.total % msgs.length]}</div>
            ${q.solution ? `<div class="fb-solution" style="margin-top:8px;"><strong>Solución:</strong> ${q.solution}</div>` : ''}
          </div>`;
      } else {
        fb.innerHTML = `
          <div class="feedback-box wrong">
            <div class="fb-title">❌ No es correcto</div>
            ${errorAnalysis}
            ${q.hint ? `<div class="fb-text" style="margin-top:8px;">💡 <strong>Pista:</strong> ${q.hint}</div>` : ''}
          </div>`;
      }
      Assessment.renderKatex(fb);

      // Replace buttons
      const btns = el.querySelector('#ej-btns');
      if (isCorrect) {
        btns.innerHTML = `<button class="btn btn-primary" id="ej-next">➡ Siguiente ejercicio</button>`;
        btns.querySelector('#ej-next').addEventListener('click', () => { state.q = null; loadNew(); });
      } else {
        btns.innerHTML = `
          <button class="btn btn-secondary btn-sm" id="ej-retry">🔄 Reintentar</button>
          <button class="btn btn-secondary btn-sm" id="ej-solution">✅ Ver solución</button>
          <button class="btn btn-primary" id="ej-next">➡ Siguiente ejercicio</button>`;

        btns.querySelector('#ej-retry').addEventListener('click', () => {
          renderQuestion(); // re-render same question, user tries again
        });

        btns.querySelector('#ej-solution').addEventListener('click', () => {
          const existingFb = fb.querySelector('.feedback-box');
          if (!existingFb) return;
          const already = existingFb.querySelector('.fb-solution');
          if (already) return;
          let solHtml = `<div class="fb-solution" style="margin-top:10px;"><strong>Solución completa:</strong> ${q.solution||q.answer}</div>`;
          if (q.solutionSteps?.length) {
            solHtml += `<div style="margin-top:8px;">` +
              q.solutionSteps.filter(Boolean).map((s,i) =>
                `<div style="padding:4px 0;font-size:0.88rem;border-bottom:1px solid var(--border);padding-bottom:4px;">
                  <strong>Paso ${i+1}:</strong> ${s}</div>`
              ).join('') + `</div>`;
          }
          existingFb.insertAdjacentHTML('beforeend', solHtml);
          Assessment.renderKatex(existingFb);
        });

        btns.querySelector('#ej-next').addEventListener('click', () => { state.q = null; loadNew(); });
      }
    }

    loadNew();
  }

  // ── Avanzado / Desafíos ──────────────────────────────────────
  function _renderAvanzado(el, lesson) {
    const adv = lesson.advanced;
    if (!adv) { el.innerHTML = '<p>No hay desafíos avanzados para esta lección.</p>'; return; }

    const challenges = adv.challenges || [];
    el.innerHTML = `
      <div class="info-box fact" style="margin-bottom:20px;">
        <div class="info-box-title">🏆 ${adv.title || 'Desafíos Avanzados'}</div>
        <p style="color:var(--text-2)">Estos problemas van más allá del nivel estándar. Intenta resolverlos antes de ver la solución.</p>
      </div>
      ${challenges.map((ch, i) => `
        <div class="example-card" style="margin-bottom:18px;border:1px solid var(--border);border-radius:12px;overflow:hidden;">
          <div style="background:var(--brand-600);color:white;padding:12px 16px;font-weight:600;">
            🧩 Desafío ${i+1}: ${ch.title}
          </div>
          <div style="padding:16px;">
            <div class="question-text" style="margin-bottom:12px;">${ch.problem}</div>
            <details style="margin-top:8px;">
              <summary style="cursor:pointer;color:var(--brand-600);font-weight:500;">💡 Ver pista</summary>
              <div style="margin-top:8px;padding:10px;background:var(--bg-2);border-radius:8px;font-size:0.9rem;">${ch.hint}</div>
            </details>
            <details style="margin-top:8px;">
              <summary style="cursor:pointer;color:var(--green-500,#10B981);font-weight:500;">✅ Ver solución completa</summary>
              <div style="margin-top:8px;padding:12px;background:var(--bg-2);border-radius:8px;">${ch.solution}</div>
            </details>
          </div>
        </div>`).join('')}`;

    Assessment.renderKatex(el);
  }

  // ══════════════════════════════════════════════════════════════
  // VISTA MATERIA (overview de una materia con sus unidades)
  // ══════════════════════════════════════════════════════════════
  function _renderMateria(main, subjectId) {
    const subject = MM_CURRICULUM.getSubject(subjectId);
    if (!subject) { main.innerHTML = `<div class="empty-state"><div class="es-icon">❓</div><div class="es-title">Materia no encontrada</div><a href="#/courses" class="btn btn-primary mt-4">Ver cursos</a></div>`; return; }

    const stats = Student.getSubjectMasteryStats(subjectId);
    const mastered    = stats.byLevel[3];
    const competent   = stats.byLevel[2];
    const learning    = stats.byLevel[1];
    const pct = stats.total > 0 ? Math.round(((mastered + competent) / stats.total) * 100) : 0;

    const recommendation = window.Adaptive ? Adaptive.getNextRecommendation(subjectId) : null;

    let html = `
      <div class="subject-banner" style="background:${subject.color}18;border-left:4px solid ${subject.color};padding:20px 24px;border-radius:12px;margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          <div style="font-size:2.5rem;">${subject.icon}</div>
          <div style="flex:1;">
            <div style="font-size:1.4rem;font-weight:700;color:var(--text-1);">${subject.name}</div>
            <div style="color:var(--text-2);font-size:0.9rem;margin-top:2px;">${subject.level} · ${stats.total} temarios</div>
            <div style="color:var(--text-2);font-size:0.85rem;margin-top:4px;">${subject.description}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.6rem;font-weight:700;color:${subject.color};">${pct}%</div>
            <div style="font-size:0.8rem;color:var(--text-2);">completado</div>
          </div>
        </div>
        <div style="margin-top:14px;">
          <div style="height:8px;background:var(--bg-3);border-radius:99px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${subject.color};border-radius:99px;transition:width .4s;"></div>
          </div>
          <div style="display:flex;gap:16px;margin-top:8px;font-size:0.8rem;color:var(--text-2);">
            <span>● Dominado: ${mastered}</span>
            <span>◑ Competente: ${competent}</span>
            <span>◔ Aprendiendo: ${learning}</span>
            <span>○ Sin iniciar: ${stats.byLevel[0]}</span>
          </div>
        </div>
      </div>

      <div class="practice-modes" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px;">
        <button class="btn btn-primary btn-sm" onclick="Router.navigate('/practica/materia/${subjectId}')">▶ Practicar materia</button>
        ${subjectId === 'paes' ? `
        <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/paes/simulacro/20')">📝 Simulacro 20</button>
        <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/paes/simulacro/40')">📝 Simulacro 40</button>
        <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/paes/simulacro/65')">🎓 Simulacro 65</button>
        ` : `<button class="btn btn-secondary btn-sm" onclick="Router.navigate('/practica/simulacro/${subjectId}')">📝 Simulacro</button>`}
        <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/practica/debiles')">🎯 Puntos débiles</button>
        <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/practica/pendientes')">📋 Pendientes</button>
      </div>

      ${recommendation ? `
        <div class="info-box tip" style="margin-bottom:20px;cursor:pointer;" onclick="Router.navigate('/materia/${recommendation.topic.subjectId}/unidad/${recommendation.topic.unitId}/tema/${recommendation.topic.id}')">
          <div class="info-box-title">💡 Recomendado: ${recommendation.reason}</div>
          <div style="font-size:0.9rem;color:var(--text-2);">${recommendation.topic.name}</div>
        </div>` : ''}

      <div class="section-title">Unidades</div>`;

    subject.units.forEach(unit => {
      const unitTopics = unit.topics;
      const unitMastery = unitTopics.map(t => Student.getTopicProgress(t.id).mastery || 0);
      const unitDone = unitMastery.filter(m => m >= 2).length;
      const unitPct  = unitTopics.length > 0 ? Math.round((unitDone / unitTopics.length) * 100) : 0;

      html += `
        <div class="unit-card card-clickable" style="border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px;cursor:pointer;"
             onclick="Router.navigate('/materia/${subjectId}/unidad/${unit.id}')">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="flex:1;">
              <div style="font-weight:600;color:var(--text-1);">${unit.name}</div>
              <div style="font-size:0.8rem;color:var(--text-2);margin-top:2px;">${unit.level} · ${unitTopics.length} temarios</div>
            </div>
            <div style="text-align:right;min-width:60px;">
              <div style="font-weight:700;color:${subject.color};">${unitPct}%</div>
              <div style="font-size:0.75rem;color:var(--text-2);">${unitDone}/${unitTopics.length}</div>
            </div>
            <div style="color:var(--text-3);">›</div>
          </div>
          <div style="margin-top:10px;height:4px;background:var(--bg-3);border-radius:99px;overflow:hidden;">
            <div style="height:100%;width:${unitPct}%;background:${subject.color};border-radius:99px;"></div>
          </div>
          <div style="display:flex;gap:4px;margin-top:8px;flex-wrap:wrap;">
            ${unitTopics.map(t => {
              const m = Student.getTopicProgress(t.id).mastery || 0;
              const col = Adaptive ? Adaptive.getMasteryColor(m) : '#94A3B8';
              return `<div title="${t.name}" style="width:10px;height:10px;border-radius:50%;background:${col};"></div>`;
            }).join('')}
          </div>
        </div>`;
    });

    html += `<div style="height:32px;"></div>`;
    main.innerHTML = html;
  }

  // ══════════════════════════════════════════════════════════════
  // VISTA UNIDAD (lista de temarios con estado de dominio)
  // ══════════════════════════════════════════════════════════════
  function _renderUnidad(main, subjectId, unitId) {
    const subject = MM_CURRICULUM.getSubject(subjectId);
    const unit    = MM_CURRICULUM.getUnit(unitId);
    if (!subject || !unit) { main.innerHTML = `<div class="empty-state"><div class="es-icon">❓</div><div class="es-title">Unidad no encontrada</div><a href="#/materia/${subjectId}" class="btn btn-primary mt-4">Volver</a></div>`; return; }

    let html = `
      <div style="margin-bottom:20px;">
        <nav style="font-size:0.82rem;color:var(--text-2);margin-bottom:12px;">
          <a href="#/materia/${subjectId}" style="color:${subject.color};">${subject.name}</a> › ${unit.name}
        </nav>
        <div style="font-size:1.3rem;font-weight:700;color:var(--text-1);">${unit.name}</div>
        <div style="color:var(--text-2);font-size:0.85rem;">${unit.level}</div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm" onclick="Router.navigate('/practica/unidad/${unitId}')">▶ Practicar unidad</button>
        <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/practica/simulacro/${subjectId}')">📝 Simulacro</button>
      </div>
      <div class="section-title">Temarios</div>`;

    unit.topics.forEach((topic, i) => {
      const prog    = Student.getTopicProgress(topic.id);
      const mastery = prog.mastery || 0;
      const mLabel  = Adaptive ? Adaptive.getMasteryLabel(mastery) : 'No iniciado';
      const mColor  = Adaptive ? Adaptive.getMasteryColor(mastery) : '#94A3B8';
      const mIcon   = Adaptive ? Adaptive.getMasteryIcon(mastery)  : '○';
      const acc     = prog.attempts > 0 ? Math.round((prog.correct / prog.attempts) * 100) : null;

      // Check if prerequisites are met
      const prereqsMet = (topic.prerequisites || []).every(pid => {
        const p = Student.getTopicProgress(pid);
        return (p.mastery || 0) >= 1 || !p.attempts === false;
      });
      // Always allow access (just show locked visual hint)

      html += `
        <div class="topic-row card-clickable" style="display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--border);border-radius:10px;margin-bottom:8px;cursor:pointer;"
             onclick="Router.navigate('/materia/${subjectId}/unidad/${unitId}/tema/${topic.id}')">
          <div style="font-size:1.2rem;color:${mColor};flex-shrink:0;">${mIcon}</div>
          <div style="flex:1;">
            <div style="font-weight:500;color:var(--text-1);">${i+1}. ${topic.name}</div>
            <div style="font-size:0.78rem;color:${mColor};margin-top:2px;">${mLabel}${acc !== null ? ` · ${acc}% aciertos` : ''}</div>
          </div>
          ${prog.attempts > 0 ? `<div style="font-size:0.8rem;color:var(--text-2);">${prog.correct}/${prog.attempts}</div>` : ''}
          ${topic.generatorKey || (topic.lessonIds && topic.lessonIds.length) ? `<div title="Ejercicios disponibles" style="font-size:0.75rem;background:${subject.color}22;color:${subject.color};padding:2px 7px;border-radius:99px;">ejercicios</div>` : ''}
          <div style="color:var(--text-3);">›</div>
        </div>`;
    });

    html += `<div style="height:32px;"></div>`;
    main.innerHTML = html;
  }

  // ══════════════════════════════════════════════════════════════
  // VISTA TEMA (página principal de aprendizaje de un temario)
  // ══════════════════════════════════════════════════════════════
  function _renderTema(main, subjectId, unitId, topicId) {
    const subject = MM_CURRICULUM.getSubject(subjectId);
    const unit    = MM_CURRICULUM.getUnit(unitId);
    const topic   = MM_CURRICULUM.getTopic(topicId);
    if (!subject || !unit || !topic) {
      main.innerHTML = `<div class="empty-state"><div class="es-icon">❓</div><div class="es-title">Tema no encontrado</div><a href="#/materia/${subjectId}" class="btn btn-primary mt-4">Volver</a></div>`;
      return;
    }

    const prog    = Student.getTopicProgress(topicId);
    const mastery = prog.mastery || 0;
    const mLabel  = Adaptive ? Adaptive.getMasteryLabel(mastery) : 'No iniciado';
    const mColor  = Adaptive ? Adaptive.getMasteryColor(mastery) : '#94A3B8';
    const mIcon   = Adaptive ? Adaptive.getMasteryIcon(mastery)  : '○';
    const recDiff = Adaptive ? Adaptive.getRecommendedDifficulty(topicId) : 'easy';

    // Check if there's linked lesson content — fall back to unit's lessonIds if topic has none
    const lessonIds = (topic.lessonIds && topic.lessonIds.length)
      ? topic.lessonIds
      : (unit.lessonIds && unit.lessonIds.length ? unit.lessonIds : null);
    const linkedLesson = lessonIds
      ? (window.MM_LESSONS || []).find(l => lessonIds.includes(l.id))
      : null;

    const masteryDots = [0,1,2,3].map(i =>
      `<span style="color:${i < mastery ? mColor : 'var(--border)'}">●</span>`).join('');

    main.innerHTML = `
      <div style="margin-bottom:16px;">
        <nav style="font-size:0.82rem;color:var(--text-2);margin-bottom:12px;">
          <a href="#/materia/${subjectId}" style="color:${subject.color};">${subject.name}</a> ›
          <a href="#/materia/${subjectId}/unidad/${unitId}" style="color:${subject.color};">${unit.name}</a> ›
          ${topic.name}
        </nav>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="flex:1;">
            <div style="font-size:1.25rem;font-weight:700;color:var(--text-1);">${topic.name}</div>
            <div style="font-size:0.82rem;color:var(--text-2);margin-top:2px;">${unit.name} · ${unit.level}</div>
          </div>
          <div style="background:${mColor}22;border-radius:8px;padding:6px 12px;text-align:center;">
            <div style="font-size:1.1rem;">${masteryDots}</div>
            <div style="font-size:0.72rem;color:${mColor};font-weight:600;">${mLabel}</div>
          </div>
        </div>
      </div>

      <div class="lesson-tabs" id="tema-tabs" style="margin-bottom:20px;">
        <button class="lt-tab active" data-tab="teoria">📖 Teoría</button>
        <button class="lt-tab" data-tab="ejemplos">✏️ Ejemplos</button>
        <button class="lt-tab" data-tab="ejercicios">🏋️ Ejercicios</button>
        <button class="lt-tab" data-tab="errores">⚠️ Errores comunes</button>
        <button class="lt-tab" data-tab="desafio">🏆 Desafío</button>
      </div>

      <div id="tema-content"></div>`;

    // Wire tabs
    const tabsEl   = main.querySelector('#tema-tabs');
    const contentEl = main.querySelector('#tema-content');

    const TAB_ORDER  = ['teoria','ejemplos','ejercicios','errores','desafio'];
    const TAB_LABELS = { teoria:'📖 Teoría', ejemplos:'✏️ Ejemplos', ejercicios:'🏋️ Ejercicios', errores:'⚠️ Errores', desafio:'🏆 Desafío' };

    function showTab(name) {
      tabsEl.querySelectorAll('.lt-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
      _renderTemaTab(contentEl, name, topic, linkedLesson, subjectId, recDiff);

      // Append prev/next nav at bottom of tab content
      const idx = TAB_ORDER.indexOf(name);
      const nav = document.createElement('div');
      nav.style.cssText = 'display:flex;justify-content:space-between;gap:10px;margin-top:28px;padding-top:16px;border-top:1px solid var(--border);';
      const prevName = idx > 0 ? TAB_ORDER[idx - 1] : null;
      const nextName = idx < TAB_ORDER.length - 1 ? TAB_ORDER[idx + 1] : null;
      nav.innerHTML =
        (prevName ? `<button class="btn btn-secondary btn-sm" id="tab-prev">← ${TAB_LABELS[prevName]}</button>` : '<span></span>') +
        (nextName ? `<button class="btn btn-primary btn-sm" id="tab-next">${TAB_LABELS[nextName]} →</button>` : '<span></span>');
      contentEl.appendChild(nav);
      if (prevName) nav.querySelector('#tab-prev').addEventListener('click', () => showTab(prevName));
      if (nextName) nav.querySelector('#tab-next').addEventListener('click', () => showTab(nextName));
    }

    tabsEl.querySelectorAll('.lt-tab').forEach(tab => {
      tab.addEventListener('click', () => showTab(tab.dataset.tab));
    });

    showTab('teoria');
  }

  function _renderTemaTab(el, tabName, topic, linkedLesson, subjectId, recDiff) {
    const subject = MM_CURRICULUM.getSubject(subjectId);
    const color   = subject ? subject.color : '#4F46E5';

    if (tabName === 'teoria') {
      if (linkedLesson) {
        _renderConcept(el, linkedLesson);
      } else {
        el.innerHTML = _placeholderContent(topic, 'Teoría', color,
          `La teoría de "<strong>${topic.name}</strong>" estará disponible próximamente. Por ahora puedes practicar con los ejercicios.`);
      }
      Assessment.renderKatex(el);
      return;
    }

    if (tabName === 'ejemplos') {
      if (linkedLesson && linkedLesson.examples && linkedLesson.examples.length) {
        _renderExamples(el, linkedLesson);
      } else {
        el.innerHTML = _placeholderContent(topic, 'Ejemplos resueltos', color,
          'Los ejemplos paso a paso estarán disponibles próximamente.');
        Assessment.renderKatex(el);
      }
      return;
    }

    if (tabName === 'ejercicios') {
      _renderTemaEjercicios(el, topic, linkedLesson, subjectId, recDiff);
      return;
    }

    if (tabName === 'errores') {
      const errors = linkedLesson && linkedLesson.concept && linkedLesson.concept.commonErrors;
      if (errors && errors.length) {
        el.innerHTML = `<div class="info-box error">
          <div class="info-box-title">⚠️ Errores comunes en ${topic.name}</div>
          ${errors.map(e => typeof e === 'string'
            ? `<p style="margin-bottom:10px;">• ${e}</p>`
            : `<p style="margin-bottom:10px;"><strong>⚡ ${e.title}:</strong> ${e.description}</p>`
          ).join('')}
        </div>`;
      } else {
        el.innerHTML = _placeholderContent(topic, 'Errores comunes', color,
          'La guía de errores frecuentes estará disponible próximamente.');
      }
      Assessment.renderKatex(el);
      return;
    }

    if (tabName === 'desafio') {
      if (linkedLesson && linkedLesson.advanced) {
        _renderAvanzado(el, linkedLesson);
      } else {
        el.innerHTML = _placeholderContent(topic, 'Desafío final', color,
          'Los desafíos avanzados para este temario estarán disponibles próximamente.');
        Assessment.renderKatex(el);
      }
      return;
    }
  }

  function _renderTemaEjercicios(el, topic, linkedLesson, subjectId, recDiff) {
    const subject  = MM_CURRICULUM.getSubject(subjectId);
    const unit     = topic.unitId ? MM_CURRICULUM.getUnit(topic.unitId) : null;
    const color    = subject ? subject.color : '#4F46E5';
    const genKey   = topic.generatorKey
      || (unit && unit.generatorKey)
      || (linkedLesson && linkedLesson.exercises && linkedLesson.exercises.topic)
      || (linkedLesson && linkedLesson.exercises && linkedLesson.exercises.generators && linkedLesson.exercises.generators[0]);
    const gens     = (genKey && window.MM_TOPIC_GENERATORS && window.MM_TOPIC_GENERATORS[genKey])
      || (linkedLesson && linkedLesson.exercises && linkedLesson.exercises.generators) || [];
    const hasGen   = gens.length > 0;

    if (!hasGen) {
      el.innerHTML = _placeholderContent(topic, 'Ejercicios', color,
        `Los ejercicios dinámicos de "<strong>${topic.name}</strong>" están en desarrollo y se publicarán pronto con mínimo 100 ejercicios generados aleatoriamente.`);
      return;
    }

    const DIFF_LABELS = { easy:'Fácil', medio:'Medio', dificil:'Difícil', experto:'Experto' };
    const DIFFICULTIES = ['easy', 'medio', 'dificil', 'experto'];

    el.innerHTML = `
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;align-items:center;">
        <span style="font-size:0.85rem;color:var(--text-2);">Dificultad:</span>
        ${DIFFICULTIES.map(d => `
          <button class="btn btn-sm tema-diff-btn ${d === recDiff ? 'btn-primary' : 'btn-secondary'}"
                  data-diff="${d}">${DIFF_LABELS[d]}</button>`).join('')}
      </div>
      <div id="tema-ex-area"></div>`;

    let activeDiff = recDiff;
    let genIdx = -1;
    let correctCount = 0, totalCount = 0;

    function pickQuestion() {
      genIdx = (genIdx + 1) % gens.length;
      const fn = window.MM_GENERATORS && window.MM_GENERATORS[gens[genIdx]];
      if (!fn) return null;
      try { const q = fn(activeDiff); q.difficulty = activeDiff; return q; } catch(e) { return null; }
    }

    function _checkAns(ua, q) {
      const u = String(ua||'').trim().toLowerCase().replace(/\s+/g,'');
      const c = String(q.answer||'').trim().toLowerCase().replace(/\s+/g,'');
      // PAES generators: type='opcion_multiple', correctIndex is authoritative
      if (q.type === 'opcion_multiple') return parseInt(u) === q.correctIndex;
      if (q.type === 'multiple-choice') return u === c;
      // Numeric comparison (tolerant ±1%)
      const uN = parseFloat(u.replace(',','.'));
      const cN = parseFloat(c.replace(',','.'));
      if (!isNaN(uN) && !isNaN(cN)) {
        if (cN === 0) return Math.abs(uN) < 0.001;
        return Math.abs(uN - cN) / Math.abs(cN) < 0.011;
      }
      // Fraction comparison: 3/4 == 6/8
      if (u.includes('/') && c.includes('/')) {
        const [un,ud] = u.split('/').map(Number);
        const [cn,cd] = c.split('/').map(Number);
        if (!isNaN(un)&&!isNaN(ud)&&!isNaN(cn)&&!isNaN(cd)&&ud&&cd)
          return Math.abs((un/ud)-(cn/cd)) < 0.001;
      }
      // Ratio comparison: 2:3 == 2:3
      if (u.includes(':') && c.includes(':')) {
        const [ua2,ub2] = u.split(':').map(Number);
        const [ca2,cb2] = c.split(':').map(Number);
        if (!isNaN(ua2)&&!isNaN(ub2)&&!isNaN(ca2)&&!isNaN(cb2)&&ub2&&cb2)
          return Math.abs((ua2/ub2)-(ca2/cb2)) < 0.001;
      }
      // Fraction user writes decimal equivalent
      if (c.includes('/') && !isNaN(uN)) {
        const [cn2,cd2] = c.split('/').map(Number);
        if (cd2) return Math.abs(uN - cn2/cd2) < 0.001;
      }
      return u === c;
    }

    function loadExercise() {
      const q = pickQuestion();
      const area = el.querySelector('#tema-ex-area');
      if (!q || !area) return;
      const isMC = (q.type === 'multiple-choice' || q.type === 'opcion_multiple') && Array.isArray(q.options);

      area.innerHTML = `
        <div class="question-card">
          <div class="q-meta">
            <span class="tag" style="background:${color}22;color:${color};">${topic.name}</span>
            <span class="tag q-diff-${activeDiff}">${DIFF_LABELS[activeDiff]}</span>
            <span style="margin-left:auto;font-size:0.8rem;color:var(--text-3);">✅ ${correctCount}/${totalCount}</span>
          </div>
          <div class="question-text">${q.question}</div>
          ${isMC ? `<div class="mc-options" id="ej-mc">${q.options.map((o,i) =>
            `<div class="mc-opt" data-idx="${i}" role="radio" tabindex="0"><span class="mc-letter">${String.fromCharCode(65+i)}</span>${o}</div>`).join('')}</div>`
          : `<div class="answer-input-wrap"><input type="text" id="ej-input" class="answer-input" placeholder="Tu respuesta…" autocomplete="off"></div>`}
          <div id="ej-feedback"></div>
          <div id="ej-btns" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;">
            <button class="btn btn-secondary btn-sm" id="ej-hint">💡 Pista</button>
            <button class="btn btn-primary" id="ej-submit">Comprobar</button>
          </div>
        </div>`;

      Assessment.renderKatex(area);

      if (isMC) {
        area.querySelectorAll('.mc-opt').forEach(opt => {
          opt.addEventListener('click', () => { area.querySelectorAll('.mc-opt').forEach(o=>o.classList.remove('selected')); opt.classList.add('selected'); });
          opt.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') opt.click(); });
        });
      } else {
        const inp = area.querySelector('#ej-input');
        if (inp) { inp.focus(); inp.addEventListener('keydown', e => { if(e.key==='Enter') area.querySelector('#ej-submit').click(); }); }
      }

      area.querySelector('#ej-hint').addEventListener('click', () => {
        const fb = area.querySelector('#ej-feedback');
        fb.innerHTML = `<div class="feedback-box hint"><div class="fb-title">💡 Pista</div><div class="fb-text">${q.hint||'Revisa el procedimiento paso a paso.'}</div></div>`;
        Assessment.renderKatex(fb);
      });

      area.querySelector('#ej-submit').addEventListener('click', () => {
        let userAnswer;
        if (isMC) {
          const sel = area.querySelector('.mc-opt.selected');
          if (!sel) { Gamification.showToast('⚠️','Selecciona una opción','Elige una respuesta antes de comprobar.'); return; }
          userAnswer = sel.dataset.idx;
        } else {
          const inp = area.querySelector('#ej-input');
          userAnswer = inp ? inp.value.trim() : '';
          if (!userAnswer) { Gamification.showToast('⚠️','Escribe tu respuesta','El campo está vacío.'); return; }
        }

        const isCorrect = _checkAns(userAnswer, q);
        totalCount++; if (isCorrect) { correctCount++; Gamification.onCorrectAnswer(activeDiff); }

        // Adaptive tracking
        const advice = window.Adaptive ? Adaptive.processAnswer(topic.id, isCorrect) : null;

        const inp = area.querySelector('#ej-input');
        if (inp) { inp.disabled = true; inp.classList.add(isCorrect?'correct':'wrong'); }
        if (isMC) {
          const correctIdx = q.correctIndex !== undefined ? q.correctIndex : parseInt(q.answer);
          area.querySelectorAll('.mc-opt').forEach((opt,i) => {
            if (i === correctIdx) opt.classList.add('correct');
            else if (opt.classList.contains('selected')) opt.classList.add('wrong');
          });
        }

        const fb = area.querySelector('#ej-feedback');
        let errorHtml = '';
        if (!isCorrect && q.analyzeError) {
          const ae = q.analyzeError(userAnswer);
          if (ae && ae.feedback) errorHtml = `<div style="margin-top:8px;padding:10px;background:var(--bg-2);border-radius:8px;font-size:0.9rem;"><strong>🔍 ¿Qué ocurrió?</strong> ${ae.feedback}</div>`;
        }
        let adviceHtml = '';
        if (advice && advice.message && (advice.showMoreExamples || advice.unlockChallenge)) {
          adviceHtml = `<div style="margin-top:8px;padding:8px;background:${color}11;border-radius:8px;font-size:0.85rem;color:${color};">💡 ${advice.message}</div>`;
          if (advice.recommendPrerequisites && advice.recommendPrerequisites.length) {
            const links = advice.recommendPrerequisites.map(pid => {
              const pt = MM_CURRICULUM.getTopic(pid);
              return pt ? `<a href="#/materia/${pt.subjectId}/unidad/${pt.unitId}/tema/${pt.id}" style="color:${color};">${pt.name}</a>` : '';
            }).filter(Boolean).join(', ');
            if (links) adviceHtml += `<div style="font-size:0.82rem;margin-top:4px;">Revisar: ${links}</div>`;
          }
        }

        if (isCorrect) {
          const msgs = ['¡Excelente!','¡Perfecto!','¡Correcto!','¡Muy bien!','¡Genial!'];
          fb.innerHTML = `<div class="feedback-box correct"><div class="fb-title">✅ ${msgs[totalCount%msgs.length]}</div>
            ${q.solution ? `<div class="fb-solution" style="margin-top:8px;"><strong>Solución:</strong> ${q.solution}</div>` : ''}
            ${adviceHtml}</div>`;
        } else {
          fb.innerHTML = `<div class="feedback-box wrong"><div class="fb-title">❌ No es correcto</div>
            ${errorHtml}${q.hint ? `<div class="fb-text" style="margin-top:8px;">💡 <strong>Pista:</strong> ${q.hint}</div>` : ''}${adviceHtml}</div>`;
        }
        Assessment.renderKatex(fb);

        // Update difficulty buttons if adaptive changed difficulty
        if (advice && advice.currentDifficulty && advice.currentDifficulty !== activeDiff) {
          activeDiff = advice.currentDifficulty;
          el.querySelectorAll('.tema-diff-btn').forEach(b => {
            b.classList.toggle('btn-primary',   b.dataset.diff === activeDiff);
            b.classList.toggle('btn-secondary', b.dataset.diff !== activeDiff);
          });
        }

        const btns = area.querySelector('#ej-btns');
        if (isCorrect) {
          btns.innerHTML = `<button class="btn btn-primary" id="ej-next">➡ Siguiente ejercicio</button>`;
          btns.querySelector('#ej-next').addEventListener('click', loadExercise);
        } else {
          btns.innerHTML = `
            <button class="btn btn-secondary btn-sm" id="ej-retry">🔄 Reintentar</button>
            <button class="btn btn-secondary btn-sm" id="ej-solution">✅ Ver solución</button>
            <button class="btn btn-primary" id="ej-next">➡ Siguiente</button>`;
          btns.querySelector('#ej-retry').addEventListener('click', loadExercise);
          btns.querySelector('#ej-next').addEventListener('click', loadExercise);
          btns.querySelector('#ej-solution').addEventListener('click', () => {
            const box = fb.querySelector('.feedback-box');
            if (!box || box.querySelector('.fb-solution')) return;
            let solHtml = `<div class="fb-solution" style="margin-top:10px;"><strong>Solución:</strong> ${q.solution||q.answer}</div>`;
            if (q.solutionSteps && q.solutionSteps.length) {
              solHtml += '<div style="margin-top:8px;">' + q.solutionSteps.map((s,i) =>
                `<div style="padding:4px 0;font-size:0.88rem;border-bottom:1px solid var(--border);"><strong>Paso ${i+1}:</strong> ${s}</div>`
              ).join('') + '</div>';
            }
            box.insertAdjacentHTML('beforeend', solHtml);
            Assessment.renderKatex(box);
          });
        }
      });
    }

    // Difficulty switcher
    el.querySelectorAll('.tema-diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeDiff = btn.dataset.diff;
        genIdx = -1;
        el.querySelectorAll('.tema-diff-btn').forEach(b => {
          b.classList.toggle('btn-primary',   b.dataset.diff === activeDiff);
          b.classList.toggle('btn-secondary', b.dataset.diff !== activeDiff);
        });
        loadExercise();
      });
    });

    loadExercise();
  }

  function _placeholderContent(topic, sectionName, color, message) {
    return `
      <div style="text-align:center;padding:48px 24px;">
        <div style="font-size:3rem;margin-bottom:16px;">📚</div>
        <div style="font-size:1.1rem;font-weight:600;color:var(--text-1);margin-bottom:8px;">${sectionName} — En desarrollo</div>
        <div style="color:var(--text-2);max-width:420px;margin:0 auto;line-height:1.6;">${message}</div>
        ${topic.lessonIds && topic.lessonIds.length ? `
          <div style="margin-top:16px;">
            <a href="#/lesson/${topic.lessonIds[0]}" class="btn btn-secondary btn-sm">Ver lección relacionada</a>
          </div>` : ''}
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  // PRÁCTICA POR TEMARIO
  // ══════════════════════════════════════════════════════════════
  function _renderPracticaTema(main, topicId) {
    const topic   = MM_CURRICULUM.getTopic(topicId);
    if (!topic) { main.innerHTML = `<div class="empty-state"><div class="es-icon">❓</div><div class="es-title">Tema no encontrado</div></div>`; return; }
    const subject = MM_CURRICULUM.getSubject(topic.subjectId);
    const unit    = MM_CURRICULUM.getUnit(topic.unitId);

    main.innerHTML = `
      <div style="margin-bottom:16px;">
        <nav style="font-size:0.82rem;color:var(--text-2);margin-bottom:8px;">
          <a href="#/materia/${topic.subjectId}" style="color:${subject.color};">${subject.name}</a> ›
          <a href="#/materia/${topic.subjectId}/unidad/${topic.unitId}" style="color:${subject.color};">${unit.name}</a> ›
          Práctica: ${topic.name}
        </nav>
        <div style="font-size:1.2rem;font-weight:700;">🏋️ Práctica — ${topic.name}</div>
      </div>
      <div id="practica-tema-content"></div>`;

    const linkedLesson = (topic.lessonIds && topic.lessonIds.length)
      ? (window.MM_LESSONS || []).find(l => topic.lessonIds.includes(l.id))
      : null;
    const recDiff = window.Adaptive ? Adaptive.getRecommendedDifficulty(topicId) : 'easy';
    _renderTemaEjercicios(main.querySelector('#practica-tema-content'), topic, linkedLesson, topic.subjectId, recDiff);
  }

  // ══════════════════════════════════════════════════════════════
  // PRÁCTICA POR UNIDAD
  // ══════════════════════════════════════════════════════════════
  function _renderPracticaUnidad(main, unitId) {
    const unit = MM_CURRICULUM.getUnit(unitId);
    if (!unit) { main.innerHTML = `<div class="empty-state"><div class="es-icon">❓</div><div class="es-title">Unidad no encontrada</div></div>`; return; }
    const subject = MM_CURRICULUM.getSubject(unit.subjectId);

    const topicsWithContent = unit.topics.filter(t =>
      t.generatorKey || (t.lessonIds && t.lessonIds.length)
    );

    if (!topicsWithContent.length) {
      main.innerHTML = `
        <div style="margin-bottom:16px;"><div style="font-size:1.2rem;font-weight:700;">📋 Práctica — ${unit.name}</div></div>
        ${_placeholderContent(unit, 'Ejercicios de unidad', subject.color, 'Los ejercicios para esta unidad estarán disponibles pronto.')}`;
      return;
    }

    let topicIdx = 0;
    main.innerHTML = `
      <div style="margin-bottom:16px;">
        <nav style="font-size:0.82rem;color:var(--text-2);margin-bottom:8px;">
          <a href="#/materia/${unit.subjectId}" style="color:${subject.color};">${subject.name}</a> ›
          Práctica: ${unit.name}
        </nav>
        <div style="font-size:1.2rem;font-weight:700;">🏋️ Práctica — ${unit.name}</div>
        <div style="font-size:0.85rem;color:var(--text-2);margin-top:4px;" id="unit-topic-indicator">Temario 1 de ${topicsWithContent.length}</div>
      </div>
      <div id="unit-ex-area"></div>`;

    function loadNextTopic() {
      if (topicIdx >= topicsWithContent.length) {
        main.querySelector('#unit-ex-area').innerHTML = `
          <div class="info-box tip"><div class="info-box-title">✅ ¡Completaste la práctica de la unidad!</div>
          <a href="#/materia/${unit.subjectId}/unidad/${unitId}" class="btn btn-primary btn-sm" style="margin-top:10px;">Ver resultados</a></div>`;
        return;
      }
      const t = topicsWithContent[topicIdx++];
      const ind = main.querySelector('#unit-topic-indicator');
      if (ind) ind.textContent = `Temario ${topicIdx} de ${topicsWithContent.length}: ${t.name}`;
      const linkedLesson = (t.lessonIds && t.lessonIds.length)
        ? (window.MM_LESSONS || []).find(l => t.lessonIds.includes(l.id))
        : null;
      const recDiff = window.Adaptive ? Adaptive.getRecommendedDifficulty(t.id) : 'easy';
      _renderTemaEjercicios(main.querySelector('#unit-ex-area'), t, linkedLesson, unit.subjectId, recDiff);
    }
    loadNextTopic();
  }

  // ══════════════════════════════════════════════════════════════
  // PRÁCTICA POR MATERIA
  // ══════════════════════════════════════════════════════════════
  function _renderPracticaMateria(main, subjectId) {
    const subject = MM_CURRICULUM.getSubject(subjectId);
    if (!subject) { main.innerHTML = `<div class="empty-state"><div class="es-icon">❓</div><div class="es-title">Materia no encontrada</div></div>`; return; }

    const allTopics = MM_CURRICULUM.getSubjectTopics(subjectId).filter(t =>
      t.generatorKey || (t.lessonIds && t.lessonIds.length)
    );

    if (!allTopics.length) {
      main.innerHTML = `
        <div style="margin-bottom:16px;"><div style="font-size:1.2rem;font-weight:700;">📋 Práctica — ${subject.name}</div></div>
        ${_placeholderContent({}, 'Ejercicios de materia', subject.color, 'Los ejercicios para esta materia estarán disponibles pronto.')}`;
      return;
    }

    // Shuffle for variety
    const shuffled = allTopics.slice().sort(() => Math.random() - 0.5);
    let idx = 0;

    main.innerHTML = `
      <div style="margin-bottom:16px;">
        <div style="font-size:1.2rem;font-weight:700;">🏋️ Práctica — ${subject.name}</div>
        <div style="font-size:0.85rem;color:var(--text-2);margin-top:4px;" id="mat-topic-ind">Cargando…</div>
      </div>
      <div id="mat-ex-area"></div>`;

    function loadNext() {
      if (idx >= shuffled.length) {
        main.querySelector('#mat-ex-area').innerHTML = `
          <div class="info-box tip"><div class="info-box-title">✅ ¡Completaste la práctica de ${subject.name}!</div>
          <a href="#/materia/${subjectId}" class="btn btn-primary btn-sm" style="margin-top:10px;">Ver progreso</a></div>`;
        return;
      }
      const t = shuffled[idx++];
      const ind = main.querySelector('#mat-topic-ind');
      if (ind) ind.textContent = `Temario ${idx}/${shuffled.length}: ${t.name}`;
      const linkedLesson = (t.lessonIds && t.lessonIds.length)
        ? (window.MM_LESSONS || []).find(l => t.lessonIds.includes(l.id))
        : null;
      const recDiff = window.Adaptive ? Adaptive.getRecommendedDifficulty(t.id) : 'easy';
      _renderTemaEjercicios(main.querySelector('#mat-ex-area'), t, linkedLesson, subjectId, recDiff);
    }
    loadNext();
  }

  // ══════════════════════════════════════════════════════════════
  // PRÁCTICA — PUNTOS DÉBILES
  // ══════════════════════════════════════════════════════════════
  function _renderPracticaDebiles(main) {
    const weakTopics = window.Adaptive ? Adaptive.getWeakTopics(30) : [];

    if (!weakTopics.length) {
      main.innerHTML = `
        <div style="margin-bottom:16px;"><div style="font-size:1.2rem;font-weight:700;">🎯 Puntos débiles</div></div>
        <div class="info-box tip">
          <div class="info-box-title">¡Sin puntos débiles detectados!</div>
          <div style="font-size:0.9rem;color:var(--text-2);">Practica más temarios para que el sistema identifique dónde necesitas refuerzo.</div>
        </div>`;
      return;
    }

    main.innerHTML = `
      <div style="margin-bottom:20px;">
        <div style="font-size:1.2rem;font-weight:700;">🎯 Puntos débiles — ${weakTopics.length} temarios para reforzar</div>
        <div style="font-size:0.85rem;color:var(--text-2);margin-top:4px;">Ordenados de mayor a menor dificultad para ti.</div>
      </div>
      <div class="lesson-list">
        ${weakTopics.map(t => {
          const prog = Student.getTopicProgress(t.id);
          const acc  = prog.attempts > 0 ? Math.round((prog.correct / prog.attempts) * 100) : 0;
          const sub  = MM_CURRICULUM.getSubject(t.subjectId);
          return `
            <div class="lesson-item card-clickable" onclick="Router.navigate('/practica/tema/${t.id}')">
              <div class="li-icon" style="background:${sub.color}22;color:${sub.color};font-size:1.2rem;">${sub.icon}</div>
              <div class="li-info">
                <div class="li-title">${t.name}</div>
                <div class="li-meta">${sub.name} · ${acc}% aciertos (${prog.attempts} intentos)</div>
              </div>
              <div style="font-size:0.8rem;color:var(--text-3);">Practicar ›</div>
            </div>`;
        }).join('')}
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  // PRÁCTICA — CONCEPTOS PENDIENTES
  // ══════════════════════════════════════════════════════════════
  function _renderPracticaPendientes(main) {
    const pending = window.Adaptive ? Adaptive.getPendingTopics(null, 40) : [];

    main.innerHTML = `
      <div style="margin-bottom:20px;">
        <div style="font-size:1.2rem;font-weight:700;">📋 Conceptos pendientes</div>
        <div style="font-size:0.85rem;color:var(--text-2);margin-top:4px;">Temarios que aún no has comenzado y están disponibles para ti.</div>
      </div>`;

    if (!pending.length) {
      main.innerHTML += `<div class="info-box tip"><div class="info-box-title">¡No hay pendientes!</div>Has comenzado todos los temarios disponibles.</div>`;
      return;
    }

    const bySubject = {};
    pending.forEach(t => {
      if (!bySubject[t.subjectId]) bySubject[t.subjectId] = [];
      bySubject[t.subjectId].push(t);
    });

    Object.entries(bySubject).forEach(([sid, topics]) => {
      const sub = MM_CURRICULUM.getSubject(sid);
      main.innerHTML += `<div class="section-title" style="margin-top:16px;">${sub.icon} ${sub.name}</div>
        <div class="lesson-list">
          ${topics.map(t => `
            <div class="lesson-item card-clickable" onclick="Router.navigate('/materia/${t.subjectId}/unidad/${t.unitId}/tema/${t.id}')">
              <div class="li-icon" style="background:${sub.color}22;color:${sub.color};">○</div>
              <div class="li-info">
                <div class="li-title">${t.name}</div>
                <div class="li-meta">${MM_CURRICULUM.getUnit(t.unitId).name}</div>
              </div>
              <div style="font-size:0.8rem;color:var(--text-3);">Iniciar ›</div>
            </div>`).join('')}
        </div>`;
    });
  }

  // ══════════════════════════════════════════════════════════════
  // SIMULACRO
  // ══════════════════════════════════════════════════════════════
  function _renderSimulacro(main, subjectId) {
    const subject = subjectId ? MM_CURRICULUM.getSubject(subjectId) : null;
    const title   = subject ? `Simulacro — ${subject.name}` : 'Simulacro Mixto';

    const topics  = window.Adaptive ? Adaptive.buildTestSession(subjectId, 20) : [];
    const topicsWithContent = topics.filter(t =>
      t.generatorKey || (t.lessonIds && t.lessonIds.length)
    );

    if (!topicsWithContent.length) {
      main.innerHTML = `
        <div style="margin-bottom:16px;"><div style="font-size:1.2rem;font-weight:700;">📝 ${title}</div></div>
        <div class="info-box tip">
          <div class="info-box-title">No hay suficiente contenido disponible aún</div>
          <div style="font-size:0.9rem;">Practica algunos temarios primero para habilitar los simulacros.</div>
        </div>`;
      return;
    }

    let qIdx = 0, correct = 0, total = 0;
    const startTime = Date.now();

    main.innerHTML = `
      <div style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="font-size:1.2rem;font-weight:700;">📝 ${title}</div>
          <div style="margin-left:auto;font-size:0.85rem;color:var(--text-2);" id="sim-progress">Pregunta 1 / ${topicsWithContent.length}</div>
        </div>
        <div style="height:4px;background:var(--bg-3);border-radius:99px;margin-top:8px;overflow:hidden;">
          <div id="sim-bar" style="height:100%;width:0%;background:var(--brand-600);border-radius:99px;transition:width .3s;"></div>
        </div>
      </div>
      <div id="sim-area"></div>`;

    function loadNextSim() {
      if (qIdx >= topicsWithContent.length) {
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        const pct = Math.round((correct / total) * 100);
        main.querySelector('#sim-area').innerHTML = `
          <div style="text-align:center;padding:32px 0;">
            <div style="font-size:2.5rem;margin-bottom:12px;">${pct >= 70 ? '🎉' : pct >= 50 ? '📈' : '💪'}</div>
            <div style="font-size:1.4rem;font-weight:700;margin-bottom:6px;">Simulacro finalizado</div>
            <div style="font-size:1.1rem;color:var(--text-2);">Resultado: <strong>${correct}/${total}</strong> — <strong>${pct}%</strong></div>
            <div style="font-size:0.85rem;color:var(--text-2);margin-top:4px;">Tiempo: ${Math.floor(elapsed/60)}m ${elapsed%60}s</div>
            <div style="display:flex;gap:10px;justify-content:center;margin-top:20px;flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="Router.navigate('/practica/simulacro${subjectId ? '/'+subjectId : ''}')">Repetir simulacro</button>
              <button class="btn btn-secondary" onclick="Router.navigate('/practica/debiles')">Ver puntos débiles</button>
            </div>
          </div>`;
        Gamification.onPracticeSession(correct, total);
        return;
      }

      const t = topicsWithContent[qIdx++];
      const bar  = main.querySelector('#sim-bar');
      const prog = main.querySelector('#sim-progress');
      if (bar)  bar.style.width  = `${Math.round((qIdx / topicsWithContent.length) * 100)}%`;
      if (prog) prog.textContent = `Pregunta ${qIdx} / ${topicsWithContent.length} · ${t.name}`;

      const genKey = t.generatorKey || 'fracciones';
      Assessment.startSession(genKey, 'medio', 1);
      const q = Assessment.getQuestion(0);
      if (!q) { loadNextSim(); return; }

      const area = main.querySelector('#sim-area');
      Assessment.renderQuestion(q, area, (result) => {
        total++;
        if (result.isCorrect) correct++;
        if (window.Adaptive) Adaptive.processAnswer(t.id, result.isCorrect);

        const nextBtn = area.querySelector('#ej-next');
        if (nextBtn) nextBtn.addEventListener('click', () => loadNextSim(), { once: true });
      });
    }

    loadNextSim();
  }

  // ══════════════════════════════════════════════════════════════
  // PAES SIMULACRO — delegado al motor PAESSimulacro
  // ══════════════════════════════════════════════════════════════
  function _renderPaesSimulacro(main, size) {
    if (window.PAESSimulacro) {
      PAESSimulacro.render(main, size);
    } else {
      main.innerHTML = `<div class="empty-state"><div class="es-icon">⚠️</div>
        <div class="es-title">Motor de simulacro no disponible</div>
        <div class="es-sub">Recarga la página e intenta de nuevo.</div></div>`;
    }
  }

  // ── Helpers ──────────────────────────────────────────────────
  function _courseColor(courseId) {
    const c = (window.MM_COURSES||[]).find(c => c.id === courseId);
    return c ? c.color : '#4F46E5';
  }

  return { init, navigate };
})();
