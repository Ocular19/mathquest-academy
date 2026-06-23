/* ═══════════════════════════════════════════════════════════════
   ASSESSMENT.JS — Generador de ejercicios y evaluación
   ═══════════════════════════════════════════════════════════════ */

window.Assessment = (() => {

  // ── Session state ────────────────────────────────────────────
  let _session = null;

  const DIFFICULTY = ['easy', 'medio', 'dificil', 'experto'];
  const DIFFICULTY_LABELS = { easy:'Fácil', medio:'Medio', dificil:'Difícil', experto:'Experto' };

  // ── Session management ───────────────────────────────────────
  function startSession(topic, difficulty, count = 10) {
    _session = {
      topic,
      difficulty,
      count,
      current: 0,
      correct: 0,
      questions: [],
      answers: [],
      startTime: Date.now()
    };
    // Pre-generate questions
    for (let i = 0; i < count; i++) {
      _session.questions.push(_generateQuestion(topic, difficulty, i));
    }
    return _session;
  }

  function getQuestion(index) {
    if (!_session) return null;
    const idx = index !== undefined ? index : _session.current;
    return _session.questions[idx] || null;
  }

  function submitAnswer(userAnswer) {
    if (!_session) return null;
    const q = _session.questions[_session.current];
    if (!q) return null;

    const isCorrect = _checkAnswer(userAnswer, q);
    const feedback = _generateFeedback(q, userAnswer, isCorrect);

    _session.answers.push({ answer: userAnswer, correct: isCorrect, time: Date.now() });
    if (isCorrect) _session.correct++;
    _session.current++;

    // Award XP
    if (isCorrect) Gamification.onCorrectAnswer(_session.difficulty);

    return { isCorrect, feedback, question: q };
  }

  function finishSession() {
    if (!_session) return null;
    const duration = Math.round((Date.now() - _session.startTime) / 1000);
    const result = {
      topic: _session.topic,
      difficulty: _session.difficulty,
      correct: _session.correct,
      total: _session.current,
      percent: _session.current > 0 ? Math.round((_session.correct/_session.current)*100) : 0,
      duration
    };
    Student.recordPractice(_session.topic, result.correct, result.total);
    Gamification.onPracticeSession(result.correct, result.total);
    const sess = _session;
    _session = null;
    return result;
  }

  function isSessionActive() { return !!_session && _session.current < _session.count; }
  function getSessionProgress() {
    if (!_session) return null;
    return { current: _session.current, total: _session.count, correct: _session.correct };
  }

  // ── Question generation ──────────────────────────────────────
  function _generateQuestion(topic, difficulty, idx) {
    const genMap = window.MM_TOPIC_GENERATORS || {};
    let gens = genMap[topic] || genMap['general'] || [];

    // Filter by difficulty (harder questions use more complex generators)
    const diffIdx = DIFFICULTY.indexOf(difficulty);

    // Cycle through generators
    const genName = gens[idx % gens.length];
    const genFn = (window.MM_GENERATORS || {})[genName];
    if (!genFn) return _fallbackQuestion();

    try {
      const q = genFn(difficulty || 'easy');
      q.difficulty = difficulty;
      q.id = `q_${Date.now()}_${idx}`;
      return q;
    } catch(e) {
      return _fallbackQuestion();
    }
  }

  function _fallbackQuestion() {
    const a = 1 + Math.floor(Math.random()*9);
    const b = 1 + Math.floor(Math.random()*9);
    return {
      question: `¿Cuánto es \\(${a} + ${b}\\)?`,
      answer: `${a+b}`,
      hint: 'Suma los dos números.',
      solution: `${a} + ${b} = ${a+b}`,
      type: 'numeric',
      difficulty: 'easy'
    };
  }

  // ── Answer checking ──────────────────────────────────────────
  function _checkAnswer(userAnswer, question) {
    const ua = String(userAnswer || '').trim().toLowerCase();
    const ca = String(question.answer || '').trim().toLowerCase();

    // PAES generators: type='opcion_multiple', correctIndex is authoritative
    if (question.type === 'opcion_multiple') {
      return parseInt(ua) === question.correctIndex;
    }
    if (question.type === 'multiple-choice') {
      return ua === ca;
    }

    // Numeric comparison with tolerance
    const uNum = parseFloat(ua.replace(',', '.'));
    const cNum = parseFloat(ca.replace(',', '.').replace(/[^\d.\-/]/g, ''));

    if (!isNaN(uNum) && !isNaN(cNum)) {
      if (cNum === 0) return Math.abs(uNum) < 0.001;
      return Math.abs(uNum - cNum) / Math.abs(cNum) < 0.01;
    }

    // Fraction comparison
    if (ua.includes('/') && ca.includes('/')) {
      const [un, ud] = ua.split('/').map(Number);
      const [cn, cd] = ca.split('/').map(Number);
      if (!isNaN(un) && !isNaN(ud) && !isNaN(cn) && !isNaN(cd) && ud && cd) {
        return Math.abs((un/ud) - (cn/cd)) < 0.001;
      }
    }

    // String exact match
    return ua === ca;
  }

  // ── Feedback generation (intelligent tutor) ─────────────────
  function _generateFeedback(question, userAnswer, isCorrect) {
    if (isCorrect) {
      const messages = [
        '¡Excelente! Tu respuesta es correcta.',
        '¡Perfecto! Bien hecho.',
        '¡Correcto! Sigue así.',
        '¡Muy bien! Ese es el resultado.',
        '¡Genial! Lo resolviste perfectamente.'
      ];
      return {
        type: 'correct',
        message: messages[Math.floor(Math.random() * messages.length)],
        solution: question.solution,
        xpEarned: { easy:5, medio:10, dificil:15, experto:25 }[question.difficulty] || 10
      };
    }

    // Wrong answer - intelligent tutor hints instead of just "incorrecto"
    const wrongMessages = _getTutorHint(question, userAnswer);
    return {
      type: 'wrong',
      message: wrongMessages.message,
      hint: wrongMessages.hint,
      solution: question.solution
    };
  }

  function _getTutorHint(question, userAnswer) {
    // Analyze the type of error
    const ua = String(userAnswer || '').trim();
    const ca = String(question.answer || '').trim();
    const uNum = parseFloat(ua);
    const cNum = parseFloat(ca);

    // Off by small amount
    if (!isNaN(uNum) && !isNaN(cNum)) {
      if (Math.abs(uNum - cNum) <= 1) {
        return { message: 'Casi lo tienes, estás muy cerca del resultado correcto.', hint: question.hint };
      }
      if (uNum === cNum * 2) {
        return { message: 'Tu resultado parece el doble del esperado. ¿Dividiste por el denominador?', hint: question.hint };
      }
      if (uNum === -cNum) {
        return { message: 'Revisa el signo de tu resultado. El valor es correcto pero el signo no.', hint: question.hint };
      }
    }

    // Generic hints by topic
    const hints = [
      'Observa el problema paso a paso. ¿En qué momento crees que puede estar el error?',
      question.hint,
      '¿Verificaste tu resultado sustituyendo en la expresión original?',
      'Intenta resolver el problema de nuevo, más despacio.'
    ].filter(Boolean);

    return {
      message: 'Revisemos esto juntos. ' + hints[0],
      hint: question.hint
    };
  }

  // ── Diagnostic assessment ────────────────────────────────────
  function generateDiagnostic() {
    const questions = [];
    const topics = Object.keys(window.MM_TOPIC_GENERATORS || {}).filter(t => t !== 'general');
    topics.slice(0, 6).forEach(topic => {
      const q = _generateQuestion(topic, 'easy', 0);
      if (q) questions.push({ ...q, topic });
    });
    return questions;
  }

  // ── Utility: render a single question ───────────────────────
  function renderQuestion(q, container, onAnswer) {
    if (!q || !container) return;

    const diffLabel = DIFFICULTY_LABELS[q.difficulty] || q.difficulty || '';

    let html = `
      <div class="question-card">
        <div class="q-meta">
          <span class="q-topic tag">${q.topic || 'Matemáticas'}</span>
          <span class="q-diff-${q.difficulty || 'easy'} tag">${diffLabel}</span>
        </div>
        <div class="question-text">${q.question}</div>`;

    if ((q.type === 'multiple-choice' || q.type === 'opcion_multiple') && q.options) {
      html += `<div class="mc-options" id="mc-opts">`;
      q.options.forEach((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        html += `<div class="mc-opt" data-idx="${i}" role="radio" tabindex="0" aria-label="Opción ${letter}: ${opt}">
          <span class="mc-letter">${letter}</span>${opt}</div>`;
      });
      html += `</div>`;
    } else {
      html += `
        <div class="answer-input-wrap">
          <input type="text" class="answer-input" id="answer-input"
            placeholder="Tu respuesta…" autocomplete="off"
            aria-label="Campo de respuesta">
        </div>`;
    }

    html += `
        <div id="feedback-area"></div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" id="hint-btn">💡 Pista</button>
          <button class="btn btn-primary" id="submit-btn">Comprobar</button>
        </div>
      </div>`;

    container.innerHTML = html;
    renderKatex(container);

    // Events
    if (q.type === 'multiple-choice' || q.type === 'opcion_multiple') {
      container.querySelectorAll('.mc-opt').forEach(opt => {
        opt.addEventListener('click', () => {
          container.querySelectorAll('.mc-opt').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          opt._selected = true;
        });
        opt.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') opt.click(); });
      });
    } else {
      const inp = container.querySelector('#answer-input');
      if (inp) {
        inp.focus();
        inp.addEventListener('keydown', e => {
          if (e.key === 'Enter') container.querySelector('#submit-btn').click();
        });
      }
    }

    container.querySelector('#hint-btn').addEventListener('click', () => {
      const fb = container.querySelector('#feedback-area');
      fb.innerHTML = `<div class="feedback-box hint"><div class="fb-title">💡 Pista</div><div class="fb-text">${q.hint}</div></div>`;
      renderKatex(fb);
    });

    container.querySelector('#submit-btn').addEventListener('click', () => {
      let answer;
      if (q.type === 'multiple-choice' || q.type === 'opcion_multiple') {
        const sel = container.querySelector('.mc-opt.selected');
        if (!sel) { Gamification.showToast('⚠️', 'Selecciona una opción', 'Elige una de las opciones disponibles.'); return; }
        answer = sel.dataset.idx;
        const correctIdx = q.correctIndex !== undefined ? q.correctIndex : parseInt(q.answer);
        container.querySelectorAll('.mc-opt').forEach((opt, i) => {
          if (i === correctIdx) opt.classList.add('correct');
          else if (opt.classList.contains('selected') && i !== correctIdx) opt.classList.add('wrong');
        });
      } else {
        const inp = container.querySelector('#answer-input');
        answer = inp ? inp.value : '';
        const isC = _checkAnswer(answer, q);
        if (inp) { inp.classList.add(isC ? 'correct' : 'wrong'); inp.disabled = true; }
      }

      const result = { isCorrect: _checkAnswer(answer, q), question: q, userAnswer: answer };
      result.feedback = _generateFeedback(q, answer, result.isCorrect);

      const fb = container.querySelector('#feedback-area');
      const fbType = result.isCorrect ? 'correct' : 'wrong';
      const fbIcon = result.isCorrect ? '✅' : '❌';
      fb.innerHTML = `
        <div class="feedback-box ${fbType}">
          <div class="fb-title">${fbIcon} ${result.feedback.message}</div>
          ${!result.isCorrect && result.feedback.hint ? `<div class="fb-text">${result.feedback.hint}</div>` : ''}
          ${result.feedback.solution ? `<div class="fb-solution"><strong>Solución:</strong> ${result.feedback.solution}</div>` : ''}
        </div>`;
      renderKatex(fb);

      container.querySelector('#submit-btn').disabled = true;
      container.querySelector('#hint-btn').disabled = true;

      if (onAnswer) onAnswer(result);
    });
  }

  function renderKatex(el) {
    if (!el) return;
    function doRender() {
      if (!el.isConnected) return;
      try {
        renderMathInElement(el, {
          delimiters: [
            { left:'$$', right:'$$', display:true },
            { left:'$',  right:'$',  display:false },
            { left:'\\(', right:'\\)', display:false },
            { left:'\\[', right:'\\]', display:true }
          ],
          throwOnError: false
        });
      } catch(e) {}
    }
    if (window._katexReady && typeof renderMathInElement === 'function') {
      doRender();
    } else {
      (window._katexPending = window._katexPending || []).push(doRender);
    }
  }

  return {
    startSession, getQuestion, submitAnswer, finishSession,
    isSessionActive, getSessionProgress,
    generateDiagnostic, renderQuestion, renderKatex,
    DIFFICULTY, DIFFICULTY_LABELS
  };
})();
