/* ═══════════════════════════════════════════════════════════════
   PAES-SIMULACRO.JS — Motor de Simulacros PAES Matemática
   Modalidades: 20 / 40 / 65 preguntas
   ═══════════════════════════════════════════════════════════════ */

window.PAESSimulacro = (function () {
  'use strict';

  /* ── Distribución de preguntas por eje ─────────────────────── */
  const DIST = {
    20: { paes_n: 5, paes_a: 6, paes_g: 5, paes_e: 4 },
    40: { paes_n: 10, paes_a: 12, paes_g: 11, paes_e: 7 },
    65: { paes_n: 16, paes_a: 20, paes_g: 18, paes_e: 11 }
  };

  /* ── Ejes PAES ──────────────────────────────────────────────── */
  const EJES = {
    paes_n: { name: 'Números y Operaciones', short: 'Números',  color: '#F59E0B', icon: '🔢' },
    paes_a: { name: 'Álgebra y Funciones',   short: 'Álgebra',  color: '#8B5CF6', icon: '📐' },
    paes_g: { name: 'Geometría',             short: 'Geometría',color: '#10B981', icon: '📏' },
    paes_e: { name: 'Probabilidad y Estadística', short: 'Estadística', color: '#EC4899', icon: '📊' }
  };

  /* ── Tiempos por modalidad (segundos) ──────────────────────── */
  const TIME_LIMITS = { 20: 30 * 60, 40: 60 * 60, 65: 90 * 60 };

  /* ── Generadores de preguntas ──────────────────────────────── */
  function _getGenKeysForPrefix(prefix) {
    return Object.keys(window.MM_TOPIC_GENERATORS || {}).filter(k => k.startsWith(prefix));
  }

  function _buildQuestion(prefix) {
    const keys = _getGenKeysForPrefix(prefix);
    if (!keys.length) return null;
    const T = window.MM_TOPIC_GENERATORS || {};
    const G = window.MM_GENERATORS || {};
    // Pick a random key and a random generator within it
    const key = keys[Math.floor(Math.random() * keys.length)];
    const gens = T[key] || [];
    if (!gens.length) return null;
    const genName = gens[Math.floor(Math.random() * gens.length)];
    const genFn = G[genName];
    if (!genFn) return null;
    try {
      const q = genFn('medio');
      q._eje = prefix;
      q._key = key;
      return q;
    } catch (e) { return null; }
  }

  function buildExam(size) {
    const dist = DIST[size];
    if (!dist) return [];
    const questions = [];
    Object.keys(dist).forEach(function (prefix) {
      var count = dist[prefix];
      var attempts = 0;
      var added = 0;
      while (added < count && attempts < count * 6) {
        attempts++;
        var q = _buildQuestion(prefix);
        if (q) { questions.push(q); added++; }
      }
    });
    // Fisher-Yates shuffle
    for (var i = questions.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = questions[i]; questions[i] = questions[j]; questions[j] = tmp;
    }
    return questions;
  }

  /* ── Cálculo de puntaje PAES (150–850) ─────────────────────── */
  function calcScore(correct, total) {
    if (total === 0) return 150;
    var raw = correct / total;
    // Curva calibrada: 0%→150, 30%→350, 50%→500, 70%→650, 90%→790, 100%→850
    var score = Math.round(150 + Math.pow(raw, 0.72) * 700);
    return Math.min(850, Math.max(150, score));
  }

  /* ── Análisis de resultados ─────────────────────────────────── */
  function analyzeResults(answers, questions) {
    var byEje = {};
    Object.keys(EJES).forEach(function (k) {
      byEje[k] = { correct: 0, total: 0, name: EJES[k].name, short: EJES[k].short,
                   color: EJES[k].color, icon: EJES[k].icon };
    });
    answers.forEach(function (ans, i) {
      var q = questions[i];
      if (!q || !q._eje || !byEje[q._eje]) return;
      byEje[q._eje].total++;
      if (ans && ans.correct) byEje[q._eje].correct++;
    });
    Object.keys(byEje).forEach(function (k) {
      var e = byEje[k];
      e.pct = e.total > 0 ? Math.round((e.correct / e.total) * 100) : null;
    });
    var ejeList = Object.values(byEje).filter(function (e) { return e.total > 0; });
    ejeList.sort(function (a, b) { return (b.pct || 0) - (a.pct || 0); });
    return {
      byEje: byEje,
      ejeList: ejeList,
      strengths:  ejeList.filter(function (e) { return e.pct !== null && e.pct >= 70; }),
      weaknesses: ejeList.filter(function (e) { return e.pct !== null && e.pct < 50;  })
    };
  }

  /* ── Recomendaciones automáticas ────────────────────────────── */
  function getRecommendations(analysis, score) {
    var recs = [];

    // Fortalezas
    analysis.strengths.forEach(function (s) {
      recs.push({ type: 'strength', icon: '⭐',
        title: 'Fortaleza: ' + s.short,
        desc: 'Dominas bien este eje (' + s.pct + '%). Mantén la práctica para no perder el nivel.' });
    });

    // Debilidades
    analysis.weaknesses.forEach(function (w) {
      var link = '/materia/paes';
      recs.push({ type: 'weakness', icon: '🎯',
        title: 'Reforzar: ' + w.short,
        desc: 'Respondiste correctamente el ' + w.pct + '% en ' + w.name + '. Practica más ejercicios de este eje.',
        link: link });
    });

    // Puntaje global
    if (score < 450) {
      recs.push({ type: 'info', icon: '📚',
        title: 'Revisa la teoría base',
        desc: 'Un puntaje bajo sugiere brechas conceptuales. Lee las lecciones de cada unidad antes de practicar más.',
        link: '/materia/paes' });
    } else if (score >= 600) {
      recs.push({ type: 'info', icon: '🚀',
        title: '¡Buen puntaje! Apunta más alto',
        desc: 'Estás por encima del promedio. Enfócate en los errores específicos para superar los 700 puntos.' });
    }

    // Velocidad
    recs.push({ type: 'info', icon: '⏱️',
      title: 'Trabaja la velocidad',
      desc: 'En la PAES real tienes ~83 segundos por pregunta. Practica resolución rápida sin perder precisión.' });

    // Simulacro adicional
    recs.push({ type: 'action', icon: '🔄',
      title: 'Repite el simulacro',
      desc: 'Cada simulacro genera preguntas diferentes. Practica con variedad hasta estabilizar tu puntaje.',
      link: '/paes/simulacro' });

    return recs;
  }

  /* ══════════════════════════════════════════════════════════════
     RENDER: Pantalla de selección
  ══════════════════════════════════════════════════════════════ */
  function _renderSelector(main) {
    main.innerHTML =
      '<div class="page-header" style="margin-bottom:24px;">' +
        '<div style="font-size:1.5rem;font-weight:800;color:var(--text-1);">🎓 Simulacro PAES Matemática</div>' +
        '<div style="color:var(--text-2);font-size:0.9rem;margin-top:4px;">Elige la modalidad de tu simulacro</div>' +
      '</div>' +
      '<div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));margin-bottom:32px;">' +
        _modeCard(20, '30 min', 'Diagnóstico rápido por eje. Ideal para práctica diaria.',
          'paes_n:5, paes_a:6, paes_g:5, paes_e:4') +
        _modeCard(40, '60 min', 'Simulacro intermedio. Cubre todos los ejes con profundidad.',
          'paes_n:10, paes_a:12, paes_g:11, paes_e:7') +
        _modeCard(65, '90 min', 'Simulacro oficial completo. Réplica exacta de la prueba real.',
          'paes_n:16, paes_a:20, paes_g:18, paes_e:11') +
      '</div>' +
      '<div style="background:var(--bg-2);border-radius:12px;padding:20px;font-size:0.875rem;color:var(--text-2);">' +
        '<strong style="color:var(--text-1);">¿Cómo funciona el simulacro?</strong><br>' +
        '<ul style="margin:8px 0 0 16px;line-height:1.9;">' +
          '<li>Preguntas de opción múltiple (A–E) generadas aleatoriamente de todos los ejes PAES.</li>' +
          '<li>Cronómetro regresivo — el examen se cierra cuando se acaba el tiempo.</li>' +
          '<li>Puedes navegar libremente entre preguntas durante el examen.</li>' +
          '<li>Al finalizar: puntaje estimado 150–850, análisis por eje, fortalezas, debilidades y recomendaciones personalizadas.</li>' +
        '</ul>' +
      '</div>';
  }

  function _modeCard(size, time, desc, dist) {
    return '<div class="stat-card card-clickable" style="cursor:pointer;padding:24px;border-radius:14px;" ' +
      'onclick="PAESSimulacro.render(document.getElementById(\'main-content\'),' + size + ')">' +
      '<div style="font-size:2rem;font-weight:800;color:var(--brand-600,#4F46E5);">' + size + '</div>' +
      '<div style="font-size:1rem;font-weight:700;color:var(--text-1);margin:4px 0;">preguntas</div>' +
      '<div style="font-size:0.8rem;color:var(--text-2);margin-bottom:12px;">⏱ ' + time + '</div>' +
      '<div style="font-size:0.85rem;color:var(--text-2);margin-bottom:14px;line-height:1.5;">' + desc + '</div>' +
      '<div style="font-size:0.75rem;color:var(--text-3);font-family:monospace;">' + dist + '</div>' +
      '<button class="btn btn-primary" style="width:100%;margin-top:16px;">Iniciar →</button>' +
    '</div>';
  }

  /* ══════════════════════════════════════════════════════════════
     RENDER: Pantalla de examen
  ══════════════════════════════════════════════════════════════ */
  function _renderExam(main, size) {
    var questions = buildExam(size);
    if (!questions.length) {
      main.innerHTML = '<div class="empty-state"><div class="es-icon">⚠️</div>' +
        '<div class="es-title">No hay generadores disponibles</div>' +
        '<div class="es-sub">Asegúrate de que los archivos de generadores PAES estén cargados.</div>' +
        '<a href="#/paes/simulacro" class="btn btn-primary mt-4">Volver</a></div>';
      return;
    }

    var current = 0;
    var answers  = new Array(questions.length).fill(null); // null | {correct, selected}
    var startTime = Date.now();
    var timeLimit = TIME_LIMITS[size];
    var remaining = timeLimit;
    var timerEl, progEl, progBar, navGrid, qArea;
    var finished = false;

    /* ── Layout principal ─────────────────────────────── */
    main.innerHTML =
      '<div id="psim-wrap" style="display:flex;flex-direction:column;gap:0;">' +

        /* Header */
        '<div id="psim-header" style="' +
          'display:flex;align-items:center;gap:10px;flex-wrap:wrap;' +
          'background:var(--bg-2);border-radius:12px;padding:14px 18px;margin-bottom:14px;">' +
          '<div style="font-size:1rem;font-weight:700;">📝 Simulacro PAES — ' + size + ' preguntas</div>' +
          '<div style="margin-left:auto;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">' +
            '<span id="psim-prog" style="font-size:0.85rem;color:var(--text-2);">Pregunta 1/' + size + '</span>' +
            '<span id="psim-timer" style="font-size:1rem;font-weight:700;font-family:monospace;' +
              'background:var(--bg-3);padding:4px 12px;border-radius:8px;">--:--</span>' +
          '</div>' +
        '</div>' +

        /* Barra de progreso */
        '<div style="height:5px;background:var(--bg-3);border-radius:99px;margin-bottom:16px;overflow:hidden;">' +
          '<div id="psim-bar" style="height:100%;width:0%;background:var(--brand-600,#4F46E5);' +
            'border-radius:99px;transition:width .3s;"></div>' +
        '</div>' +

        /* Grid: pregunta + navegación */
        '<div class="psim-exam-grid" id="psim-grid">' +

          /* Área pregunta */
          '<div id="psim-q-area" style="min-width:0;"></div>' +

          /* Panel lateral */
          '<div style="display:flex;flex-direction:column;gap:12px;">' +
            '<div style="background:var(--bg-2);border-radius:10px;padding:12px;">' +
              '<div style="font-size:0.75rem;font-weight:600;color:var(--text-2);' +
                'text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;">Navegación</div>' +
              '<div id="psim-nav" style="display:flex;flex-wrap:wrap;gap:5px;"></div>' +
            '</div>' +
            '<button id="psim-finish-btn" class="btn btn-primary" style="width:100%;font-size:0.85rem;" ' +
              'onclick="PAESSimulacro._finishExam()">Finalizar examen</button>' +
            '<div style="font-size:0.75rem;color:var(--text-3);text-align:center;" id="psim-answered-count">' +
              '0/' + size + ' respondidas</div>' +
          '</div>' +

        '</div>' +

        /* Prev/Next */
        '<div style="display:flex;gap:10px;margin-top:14px;justify-content:space-between;" id="psim-nav-btns">' +
          '<button id="psim-prev" class="btn btn-secondary" onclick="PAESSimulacro._navigate(-1)">← Anterior</button>' +
          '<button id="psim-next" class="btn btn-secondary" onclick="PAESSimulacro._navigate(1)">Siguiente →</button>' +
        '</div>' +

      '</div>';

    /* ── Referencias DOM ──────────────────────────────── */
    timerEl  = document.getElementById('psim-timer');
    progEl   = document.getElementById('psim-prog');
    progBar  = document.getElementById('psim-bar');
    navGrid  = document.getElementById('psim-nav');
    qArea    = document.getElementById('psim-q-area');

    /* ── Navegación lateral ──────────────────────────── */
    function buildNav() {
      if (!navGrid) return;
      var html = '';
      for (var i = 0; i < questions.length; i++) {
        var ans = answers[i];
        var isC = i === current;
        var bg = isC ? 'var(--brand-600,#4F46E5)' :
                 ans !== null ? (ans.correct !== null ? '#10B981' : '#6b7280') : 'var(--bg-3)';
        var fg = (isC || ans !== null) ? '#fff' : 'var(--text-2)';
        html += '<div onclick="PAESSimulacro._jumpTo(' + i + ')" title="Pregunta ' + (i + 1) + '" ' +
          'style="width:28px;height:28px;border-radius:6px;background:' + bg + ';color:' + fg + ';' +
          'font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;' +
          'cursor:pointer;transition:background .15s;">' + (i + 1) + '</div>';
      }
      navGrid.innerHTML = html;
    }

    function updateAnsweredCount() {
      var el = document.getElementById('psim-answered-count');
      if (el) {
        var n = answers.filter(function (a) { return a !== null; }).length;
        el.textContent = n + '/' + size + ' respondidas';
      }
    }

    /* ── Renderizar pregunta ─────────────────────────── */
    function renderQuestion(idx) {
      if (!qArea) return;
      var q = questions[idx];
      var eje = EJES[q._eje] || { name: q._eje, color: '#4F46E5', icon: '📝' };
      var answered = answers[idx];

      var html =
        '<div style="background:var(--bg-1,#fff);border:1px solid var(--border);' +
          'border-radius:12px;padding:20px 22px;">' +

          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">' +
            '<span style="font-size:1rem;">' + eje.icon + '</span>' +
            '<span style="font-size:0.8rem;font-weight:600;color:' + eje.color + ';' +
              'background:' + eje.color + '18;padding:3px 10px;border-radius:99px;">' + eje.short + '</span>' +
            '<span style="font-size:0.8rem;color:var(--text-3);margin-left:auto;">Pregunta ' + (idx + 1) + ' de ' + size + '</span>' +
          '</div>' +

          '<div style="font-size:1rem;line-height:1.65;margin-bottom:18px;color:var(--text-1);">' + q.question + '</div>' +

          '<div id="psim-options" style="display:flex;flex-direction:column;gap:8px;">';

      var letters = ['A', 'B', 'C', 'D', 'E'];
      (q.options || []).forEach(function (opt, i) {
        var sel = answered && answered.selected === i;
        var cor = answered && i === q.correctIndex;
        var bg = !answered ? 'var(--bg-2)' :
                 cor ? '#dcfce7' : sel ? '#fee2e2' : 'var(--bg-2)';
        var border = !answered ? '1px solid var(--border)' :
                     cor ? '1px solid #22c55e' : sel ? '1px solid #ef4444' : '1px solid var(--border)';
        var cursor = answered ? 'default' : 'pointer';
        var tick = '';
        if (answered) { tick = cor ? ' ✓' : sel ? ' ✗' : ''; }
        html += '<div class="psim-opt" data-idx="' + i + '" ' +
          'style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;' +
          'background:' + bg + ';border:' + border + ';border-radius:8px;cursor:' + cursor + ';' +
          'transition:background .15s;' + (sel ? 'font-weight:600;' : '') + '">' +
          '<span style="min-width:24px;height:24px;border-radius:50%;' +
            'background:var(--brand-600,#4F46E5);color:#fff;' +
            'display:flex;align-items:center;justify-content:center;' +
            'font-size:0.75rem;font-weight:700;flex-shrink:0;">' + letters[i] + '</span>' +
          '<span style="font-size:0.9rem;line-height:1.5;">' + opt + tick + '</span>' +
        '</div>';
      });

      html += '</div>';

      if (answered && q.explanation) {
        html += '<div style="margin-top:14px;background:var(--bg-2);border-radius:8px;' +
          'padding:12px 14px;font-size:0.85rem;color:var(--text-2);border-left:3px solid ' + eje.color + ';">' +
          '<strong>Explicación:</strong> ' + q.explanation + '</div>';
      }

      html += '</div>';
      qArea.innerHTML = html;
      Assessment.renderKatex(qArea);

      /* Click options (solo si no respondida) */
      if (!answered) {
        qArea.querySelectorAll('.psim-opt').forEach(function (el) {
          el.addEventListener('mouseover', function () {
            el.style.background = 'var(--bg-3)';
          });
          el.addEventListener('mouseout', function () {
            el.style.background = 'var(--bg-2)';
          });
          el.addEventListener('click', function () {
            var idx2 = parseInt(el.getAttribute('data-idx'));
            var isCorrect = idx2 === questions[current].correctIndex;
            answers[current] = { selected: idx2, correct: isCorrect };
            updateAnsweredCount();
            buildNav();
            renderQuestion(current);
            /* Auto-avance a la siguiente sin responder (500ms delay) */
            var nextUnanswered = -1;
            for (var k = current + 1; k < questions.length; k++) {
              if (answers[k] === null) { nextUnanswered = k; break; }
            }
            if (nextUnanswered !== -1) {
              setTimeout(function () {
                _jumpTo(nextUnanswered);
              }, 600);
            }
          });
        });
      }

      /* Botones prev/next */
      var prevBtn = document.getElementById('psim-prev');
      var nextBtn = document.getElementById('psim-next');
      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === questions.length - 1;

      /* Barra de progreso */
      if (progBar) {
        var done = answers.filter(function (a) { return a !== null; }).length;
        progBar.style.width = Math.round((done / questions.length) * 100) + '%';
      }
      if (progEl) progEl.textContent = 'Pregunta ' + (idx + 1) + '/' + size;
    }

    /* ── Timer ───────────────────────────────────────── */
    function formatTime(s) {
      var m = Math.floor(s / 60);
      var ss = s % 60;
      return (m < 10 ? '0' : '') + m + ':' + (ss < 10 ? '0' : '') + ss;
    }

    function startTimer() {
      if (timerEl) timerEl.textContent = formatTime(remaining);
      var iv = setInterval(function () {
        if (finished) { clearInterval(iv); return; }
        remaining--;
        if (timerEl) {
          timerEl.textContent = formatTime(remaining);
          if (remaining <= 300) timerEl.style.color = '#ef4444'; // last 5 min
          if (remaining <= 60)  timerEl.style.fontWeight = '900';
        }
        if (remaining <= 0) {
          clearInterval(iv);
          _doFinish();
        }
      }, 1000);
      PAESSimulacro._activeTimer = iv;
    }

    /* ── API pública de instancia ────────────────────── */
    PAESSimulacro._navigate = function (dir) {
      var next = current + dir;
      if (next < 0 || next >= questions.length) return;
      current = next;
      buildNav();
      renderQuestion(current);
    };

    PAESSimulacro._jumpTo = function (idx) {
      current = idx;
      buildNav();
      renderQuestion(current);
    };

    PAESSimulacro._finishExam = function () {
      var unanswered = answers.filter(function (a) { return a === null; }).length;
      if (unanswered > 0) {
        var msg = '¿Finalizar el examen? Quedan ' + unanswered + ' pregunta(s) sin responder (se contarán como incorrectas).';
        if (!window.confirm(msg)) return;
      }
      _doFinish();
    };

    function _doFinish() {
      if (finished) return;
      finished = true;
      if (PAESSimulacro._activeTimer) clearInterval(PAESSimulacro._activeTimer);
      var elapsed = Math.round((Date.now() - startTime) / 1000);
      /* Marcar no respondidas como incorrectas */
      for (var i = 0; i < answers.length; i++) {
        if (answers[i] === null) answers[i] = { selected: -1, correct: false };
      }
      _renderResults(main, questions, answers, elapsed, size);
    }

    /* ── Init ────────────────────────────────────────── */
    buildNav();
    renderQuestion(0);
    startTimer();
  }

  /* ══════════════════════════════════════════════════════════════
     RENDER: Pantalla de resultados
  ══════════════════════════════════════════════════════════════ */
  function _renderResults(main, questions, answers, elapsed, size) {
    var correct = answers.filter(function (a) { return a && a.correct; }).length;
    var total = answers.length;
    var score = calcScore(correct, total);
    var pct = Math.round((correct / total) * 100);
    var analysis = analyzeResults(answers, questions);
    var recs = getRecommendations(analysis, score);

    var elapsedMin = Math.floor(elapsed / 60);
    var elapsedSec = elapsed % 60;

    /* Emoji + mensaje según puntaje */
    var emoji, msg;
    if (score >= 700)     { emoji = '🏆'; msg = '¡Excelente resultado!'; }
    else if (score >= 550) { emoji = '📈'; msg = '¡Buen trabajo! Sigue mejorando.'; }
    else if (score >= 400) { emoji = '💪'; msg = 'Vas bien, con práctica llegarás más alto.'; }
    else                   { emoji = '📚'; msg = 'Aún hay mucho por aprender. ¡Tú puedes!'; }

    /* Color del puntaje */
    var scoreColor = score >= 700 ? '#10B981' : score >= 550 ? '#F59E0B' : score >= 400 ? '#8B5CF6' : '#EF4444';

    /* Barra de progreso por eje */
    function ejeBar(e) {
      if (e.pct === null) return '';
      var col = e.pct >= 70 ? '#10B981' : e.pct >= 50 ? '#F59E0B' : '#EF4444';
      return '<div style="margin-bottom:14px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">' +
          '<span style="font-size:0.9rem;font-weight:500;">' + e.icon + ' ' + e.name + '</span>' +
          '<span style="font-size:0.85rem;font-weight:700;color:' + col + ';">' +
            e.pct + '% (' + e.correct + '/' + e.total + ')' +
          '</span>' +
        '</div>' +
        '<div style="height:8px;background:var(--bg-3);border-radius:99px;overflow:hidden;">' +
          '<div style="height:100%;width:' + e.pct + '%;background:' + col + ';' +
            'border-radius:99px;transition:width .5s;"></div>' +
        '</div>' +
      '</div>';
    }

    /* Revisión de respuestas */
    function reviewHtml() {
      var h = '<div style="margin-top:8px;">';
      var letters = ['A','B','C','D','E'];
      questions.forEach(function (q, i) {
        var ans = answers[i];
        var isCorrect = ans && ans.correct;
        var eje = EJES[q._eje] || { icon:'📝', color:'#4F46E5', short:'PAES' };
        var bg = isCorrect ? '#f0fdf4' : '#fff1f2';
        var border = isCorrect ? '#22c55e' : '#ef4444';
        var icon = isCorrect ? '✅' : '❌';
        h += '<div style="background:' + bg + ';border:1px solid ' + border + ';' +
          'border-radius:10px;padding:14px 16px;margin-bottom:10px;">' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">' +
            '<span>' + icon + '</span>' +
            '<span style="font-size:0.8rem;font-weight:600;color:' + eje.color + ';">' +
              eje.icon + ' ' + eje.short + '</span>' +
            '<span style="font-size:0.8rem;color:var(--text-3);margin-left:auto;">Pregunta ' + (i+1) + '</span>' +
          '</div>' +
          '<div style="font-size:0.9rem;color:var(--text-1);margin-bottom:10px;">' + q.question + '</div>';

        if (q.options) {
          q.options.forEach(function (opt, j) {
            var isCor = j === q.correctIndex;
            var isSel = ans && ans.selected === j;
            var style = '';
            if (isCor) style = 'background:#dcfce7;border-color:#22c55e;font-weight:600;';
            else if (isSel) style = 'background:#fee2e2;border-color:#ef4444;';
            h += '<div style="display:flex;gap:8px;align-items:flex-start;padding:7px 10px;' +
              'border-radius:6px;border:1px solid var(--border);margin-bottom:4px;font-size:0.85rem;' + style + '">' +
              '<span style="font-weight:700;color:var(--brand-600,#4F46E5);min-width:18px;">' + letters[j] + ')</span>' +
              '<span>' + opt + (isCor ? ' ✓' : isSel ? ' ✗' : '') + '</span>' +
            '</div>';
          });
        }

        if (q.explanation) {
          h += '<div style="margin-top:8px;font-size:0.82rem;color:var(--text-2);' +
            'border-left:3px solid ' + eje.color + ';padding-left:8px;">' +
            '<strong>Explicación:</strong> ' + q.explanation + '</div>';
        }
        h += '</div>';
      });
      h += '</div>';
      return h;
    }

    main.innerHTML =
      /* ── Score hero ── */
      '<div style="text-align:center;padding:28px 20px 20px;background:var(--bg-2);' +
        'border-radius:16px;margin-bottom:20px;">' +
        '<div style="font-size:2.5rem;margin-bottom:8px;">' + emoji + '</div>' +
        '<div style="font-size:1.2rem;font-weight:700;margin-bottom:4px;">' + msg + '</div>' +
        '<div style="font-size:3.5rem;font-weight:900;color:' + scoreColor + ';line-height:1;margin:16px 0 4px;">' + score + '</div>' +
        '<div style="font-size:0.9rem;color:var(--text-2);">Puntaje estimado PAES (150–850)</div>' +
        '<div style="display:flex;gap:24px;justify-content:center;margin-top:18px;flex-wrap:wrap;">' +
          '<div><div style="font-size:1.3rem;font-weight:700;">' + correct + '/' + total + '</div>' +
            '<div style="font-size:0.8rem;color:var(--text-2);">Correctas</div></div>' +
          '<div><div style="font-size:1.3rem;font-weight:700;">' + pct + '%</div>' +
            '<div style="font-size:0.8rem;color:var(--text-2);">Precisión</div></div>' +
          '<div><div style="font-size:1.3rem;font-weight:700;">' + elapsedMin + 'm ' + elapsedSec + 's</div>' +
            '<div style="font-size:0.8rem;color:var(--text-2);">Tiempo</div></div>' +
        '</div>' +
        /* Barra de score 150-850 */
        '<div style="margin:18px auto 0;max-width:400px;">' +
          '<div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-3);margin-bottom:4px;">' +
            '<span>150</span><span>400</span><span>600</span><span>850</span></div>' +
          '<div style="height:10px;background:var(--bg-3);border-radius:99px;overflow:hidden;position:relative;">' +
            '<div style="position:absolute;left:0;top:0;height:100%;border-radius:99px;' +
              'background:linear-gradient(90deg,#ef4444 0%,#f59e0b 40%,#22c55e 70%,#10b981 100%);' +
              'width:100%;opacity:.3;"></div>' +
            '<div style="position:absolute;left:0;top:0;height:100%;border-radius:99px;' +
              'width:' + Math.round(((score-150)/700)*100) + '%;background:' + scoreColor + ';"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* ── Rendimiento por eje ── */
      '<div style="background:var(--bg-1,#fff);border:1px solid var(--border);border-radius:14px;padding:20px;margin-bottom:16px;">' +
        '<div style="font-size:1rem;font-weight:700;margin-bottom:16px;">📊 Rendimiento por Eje</div>' +
        analysis.ejeList.map(ejeBar).join('') +
      '</div>' +

      /* ── Fortalezas / Debilidades ── */
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">' +
        '<div style="background:var(--bg-1,#fff);border:1px solid var(--border);border-radius:14px;padding:16px;">' +
          '<div style="font-size:0.95rem;font-weight:700;margin-bottom:10px;color:#10B981;">⭐ Fortalezas</div>' +
          (analysis.strengths.length
            ? analysis.strengths.map(function (s) {
                return '<div style="font-size:0.85rem;padding:6px 0;border-bottom:1px solid var(--border);">' +
                  s.icon + ' <strong>' + s.short + '</strong> — ' + s.pct + '%</div>';
              }).join('')
            : '<div style="font-size:0.85rem;color:var(--text-3);">Sigue practicando para identificar tus fortalezas.</div>') +
        '</div>' +
        '<div style="background:var(--bg-1,#fff);border:1px solid var(--border);border-radius:14px;padding:16px;">' +
          '<div style="font-size:0.95rem;font-weight:700;margin-bottom:10px;color:#EF4444;">⚠️ A reforzar</div>' +
          (analysis.weaknesses.length
            ? analysis.weaknesses.map(function (w) {
                return '<div style="font-size:0.85rem;padding:6px 0;border-bottom:1px solid var(--border);">' +
                  w.icon + ' <strong>' + w.short + '</strong> — ' + w.pct + '%</div>';
              }).join('')
            : '<div style="font-size:0.85rem;color:var(--text-3);">¡Excelente! No tienes ejes críticos.</div>') +
        '</div>' +
      '</div>' +

      /* ── Recomendaciones ── */
      '<div style="background:var(--bg-1,#fff);border:1px solid var(--border);border-radius:14px;padding:20px;margin-bottom:16px;">' +
        '<div style="font-size:1rem;font-weight:700;margin-bottom:14px;">💡 Recomendaciones</div>' +
        recs.map(function (r) {
          var bg = r.type === 'strength' ? '#f0fdf4' : r.type === 'weakness' ? '#fff1f2' : 'var(--bg-2)';
          var border = r.type === 'strength' ? '#bbf7d0' : r.type === 'weakness' ? '#fecaca' : 'var(--border)';
          return '<div style="display:flex;gap:12px;align-items:flex-start;padding:12px 14px;' +
            'background:' + bg + ';border:1px solid ' + border + ';border-radius:10px;margin-bottom:8px;">' +
            '<span style="font-size:1.2rem;flex-shrink:0;">' + r.icon + '</span>' +
            '<div>' +
              '<div style="font-size:0.9rem;font-weight:600;margin-bottom:2px;">' + r.title + '</div>' +
              '<div style="font-size:0.83rem;color:var(--text-2);">' + r.desc + '</div>' +
              (r.link ? '<a href="#' + r.link + '" style="font-size:0.82rem;color:var(--brand-600,#4F46E5);' +
                'text-decoration:none;display:inline-block;margin-top:4px;">Ir a practicar →</a>' : '') +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +

      /* ── Botones de acción ── */
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;">' +
        '<button class="btn btn-primary" onclick="PAESSimulacro.render(document.getElementById(\'main-content\'),' + size + ')">🔄 Repetir simulacro</button>' +
        '<button class="btn btn-secondary" onclick="PAESSimulacro.render(document.getElementById(\'main-content\'),null)">↩ Cambiar modalidad</button>' +
        '<button class="btn btn-secondary" onclick="Router.navigate(\'/materia/paes\')">🎓 Ir a PAES</button>' +
      '</div>' +

      /* ── Revisión de respuestas (colapsable) ── */
      '<details style="background:var(--bg-1,#fff);border:1px solid var(--border);border-radius:14px;padding:16px 20px;margin-bottom:32px;">' +
        '<summary style="font-size:0.95rem;font-weight:700;cursor:pointer;list-style:none;display:flex;' +
          'align-items:center;justify-content:space-between;">🔍 Revisar todas las respuestas' +
          '<span style="font-size:0.8rem;color:var(--text-2);font-weight:400;">' + correct + ' correctas / ' + (total - correct) + ' incorrectas</span>' +
        '</summary>' +
        '<div id="review-section">' + reviewHtml() + '</div>' +
      '</details>';

    Assessment.renderKatex(main);

    /* Guardar resultado en historial del estudiante */
    if (window.Student) {
      Student.recordPractice('paes_simulacro', correct, total);
    }
    if (window.Gamification) {
      Gamification.onPracticeSession(correct, total);
    }
  }

  /* ══════════════════════════════════════════════════════════════
     ENTRY POINT
  ══════════════════════════════════════════════════════════════ */
  function render(main, size) {
    if (PAESSimulacro._activeTimer) {
      clearInterval(PAESSimulacro._activeTimer);
      PAESSimulacro._activeTimer = null;
    }
    PAESSimulacro._navigate = function () {};
    PAESSimulacro._jumpTo  = function () {};
    PAESSimulacro._finishExam = function () {};

    var sizeInt = parseInt(size);
    if (!sizeInt || ![20, 40, 65].includes(sizeInt)) {
      _renderSelector(main);
    } else {
      _renderExam(main, sizeInt);
    }
  }

  /* Inicializar propiedades de instancia */
  var pub = {
    render: render,
    buildExam: buildExam,
    calcScore: calcScore,
    analyzeResults: analyzeResults,
    getRecommendations: getRecommendations,
    _activeTimer: null,
    _navigate: function () {},
    _jumpTo: function () {},
    _finishExam: function () {}
  };

  return pub;
})();
