/* ═══════════════════════════════════════════════════════════════
   GAMIFICATION.JS — XP, Insignias, Rachas, Logros
   ═══════════════════════════════════════════════════════════════ */

window.Gamification = (() => {

  const BADGES = [
    { id: 'primera-leccion',  icon: '🌟', name: 'Primera Lección',    desc: 'Completaste tu primera lección.',          condition: p => p.completedLessons.length >= 1 },
    { id: 'cinco-lecciones',  icon: '📚', name: 'Lector Ávido',       desc: 'Completaste 5 lecciones.',                 condition: p => p.completedLessons.length >= 5 },
    { id: 'racha-3',          icon: '🔥', name: 'En Racha',           desc: 'Estudiaste 3 días seguidos.',              condition: p => p.streak >= 3 },
    { id: 'racha-7',          icon: '🌶️', name: 'Semana Perfecta',    desc: 'Estudiaste 7 días seguidos.',              condition: p => p.streak >= 7 },
    { id: 'racha-30',         icon: '👑', name: 'Dedicación Total',   desc: '30 días de estudio consecutivo.',          condition: p => p.streak >= 30 },
    { id: 'xp-500',           icon: '⚡', name: 'Electrizado',        desc: 'Acumulaste 500 XP.',                       condition: p => p.xp >= 500 },
    { id: 'xp-2000',          icon: '💎', name: 'Diamante',           desc: 'Acumulaste 2000 XP.',                      condition: p => p.xp >= 2000 },
    { id: 'nivel-3',          icon: '🎯', name: 'Apuntando Alto',     desc: 'Alcanzaste el nivel 3.',                   condition: p => p.level >= 3 },
    { id: 'nivel-5',          icon: '🚀', name: 'Despegando',         desc: 'Alcanzaste el nivel 5.',                   condition: p => p.level >= 5 },
    { id: 'practica-10',      icon: '💪', name: 'Practicando',        desc: 'Hiciste 10 ejercicios de práctica.',       condition: p => _totalPractice(p) >= 10 },
    { id: 'practica-50',      icon: '🏋️', name: 'Entrenador',         desc: 'Completaste 50 ejercicios.',               condition: p => _totalPractice(p) >= 50 },
    { id: 'perfecto',         icon: '🏅', name: 'Perfección',         desc: 'Obtuviste 100% en una sesión de práctica.', condition: p => _hadPerfectSession(p) },
    { id: 'matematico',       icon: '🧮', name: 'Matemático',         desc: 'Estudiaste 3 materias diferentes.',        condition: p => _uniqueSubjects(p) >= 3 },
    { id: 'hora-estudio',     icon: '⏰', name: 'Hora de Estudio',    desc: 'Acumulaste 60 minutos de estudio.',        condition: p => (p.totalMinutes||0) >= 60 },
    { id: 'explorador',       icon: '🔭', name: 'Explorador',         desc: 'Usaste el graficador por primera vez.',    condition: p => !!p.usedGrapher },
  ];

  function _totalPractice(p) {
    return Object.values(p.topicScores || {}).reduce((s, v) => s + (v.total||0), 0);
  }
  function _hadPerfectSession(p) {
    return (p.practiceHistory || []).some(h => h.total > 0 && h.correct === h.total && h.total >= 5);
  }
  function _uniqueSubjects(p) {
    const completed = p.completedLessons || [];
    const subjects = new Set();
    (window.MM_LESSONS || []).forEach(l => {
      if (completed.includes(l.id)) subjects.add(l.courseId);
    });
    return subjects.size;
  }

  // Check and award any newly earned badges
  function checkBadges(callback) {
    const profile = Student.get();
    const earned = profile.achievements || [];
    const newBadges = [];

    BADGES.forEach(b => {
      if (!earned.includes(b.id)) {
        try {
          if (b.condition(profile)) {
            earned.push(b.id);
            newBadges.push(b);
          }
        } catch(e) {}
      }
    });

    if (newBadges.length > 0) {
      Student.update({ achievements: earned });
      newBadges.forEach((b, i) => {
        setTimeout(() => showToast(b.icon, `¡Insignia desbloqueada!`, b.name), i * 2200);
        if (callback) callback(b);
      });
    }
    return newBadges;
  }

  function getAllBadges() {
    const profile = Student.get();
    const earned = profile.achievements || [];
    return BADGES.map(b => ({ ...b, earned: earned.includes(b.id) }));
  }

  // Award XP with display feedback
  function awardXP(amount, reason) {
    const result = Student.addXP(amount);
    updateNavXP();
    if (result.leveledUp) {
      setTimeout(() => {
        showToast('🎉', `¡Subiste al Nivel ${result.newLevel}!`, result.levelName);
        checkBadges();
      }, 300);
    }
    return result;
  }

  function updateNavXP() {
    const p = Student.get();
    const xpEl = document.getElementById('nav-xp');
    const streakEl = document.getElementById('nav-streak');
    const sxpFill = document.getElementById('sxp-fill');
    const sxpLevelName = document.getElementById('sxp-level-name');
    const sxpNext = document.getElementById('sxp-next');

    if (xpEl) xpEl.textContent = `${p.xp} XP`;
    if (streakEl) streakEl.textContent = p.streak || 0;

    const lvl = Student.getLevelInfo();
    if (sxpFill) sxpFill.style.width = `${lvl.progress}%`;
    if (sxpLevelName) sxpLevelName.textContent = `Nv.${lvl.number} · ${lvl.name}`;
    if (sxpNext) {
      sxpNext.textContent = lvl.xpNeeded > 0 ? `${lvl.xpNeeded} XP para el siguiente` : '¡Máximo nivel!';
    }
  }

  function showToast(icon, title, desc) {
    const toast = document.getElementById('toast');
    const toastIco = document.getElementById('toast-ico');
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');
    if (!toast) return;

    toastIco.textContent = icon;
    toastTitle.textContent = title;
    toastDesc.textContent = desc;
    toast.classList.add('show');

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // XP awards for different actions
  const XP_EVENTS = {
    lessonComplete: (lesson) => (lesson?.xpReward || 100),
    practiceCorrect: (difficulty) => ({ easy:5, medio:10, dificil:15, experto:25 }[difficulty] || 10),
    practiceSession: () => 20,
    perfectSession:  () => 50,
    grapherUsed:     () => 15,
    discovery:       () => 30
  };

  function onLessonComplete(lesson) {
    const xp = XP_EVENTS.lessonComplete(lesson);
    awardXP(xp, 'Lección completada');
    Student.markLessonDone(lesson.id);
    checkBadges();
    return xp;
  }

  function onCorrectAnswer(difficulty) {
    const xp = XP_EVENTS.practiceCorrect(difficulty);
    awardXP(xp, 'Respuesta correcta');
    return xp;
  }

  function onPracticeSession(correct, total) {
    Student.recordPractice(null, correct, total);
    let xp = XP_EVENTS.practiceSession();
    if (total > 0 && correct === total) xp += XP_EVENTS.perfectSession();
    awardXP(xp, 'Sesión de práctica');
    checkBadges();
    return xp;
  }

  function onGrapherUsed() {
    const p = Student.get();
    if (!p.usedGrapher) {
      Student.update({ usedGrapher: true });
      awardXP(XP_EVENTS.grapherUsed(), 'Graficador usado');
      checkBadges();
    }
  }

  return {
    checkBadges, getAllBadges, awardXP, updateNavXP, showToast,
    onLessonComplete, onCorrectAnswer, onPracticeSession, onGrapherUsed,
    BADGES
  };
})();
