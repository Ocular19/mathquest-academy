/* ═══════════════════════════════════════════════════════════════
   ADAPTIVE.JS — Motor de aprendizaje adaptativo
   ═══════════════════════════════════════════════════════════════ */

window.Adaptive = (() => {

  // Thresholds for mastery state transitions
  const MASTERY_THRESHOLDS = {
    LEARNING:   { minAttempts: 1 },
    COMPETENT:  { minAttempts: 8,  minAccuracy: 0.70 },
    MASTERED:   { minAttempts: 20, minAccuracy: 0.85, minConsecutive: 5 }
  };

  // Consecutive answers before difficulty shifts
  const DIFFICULTY_UP   = 4;  // correct in a row → go harder
  const DIFFICULTY_DOWN = 3;  // wrong in a row   → go easier

  const DIFFICULTIES = ['easy', 'medio', 'dificil', 'experto'];

  // ── Process a single answer ───────────────────────────────────
  function processAnswer(topicId, isCorrect) {
    const prog = Student.getTopicProgress(topicId);
    prog.attempts++;
    if (isCorrect) {
      prog.correct++;
      prog.consecutiveCorrect++;
      prog.consecutiveWrong = 0;
    } else {
      prog.consecutiveWrong++;
      prog.consecutiveCorrect = 0;
    }
    prog.lastPracticed = new Date().toISOString();

    // Adjust difficulty
    const oldDiff = prog.currentDifficulty;
    if (prog.consecutiveCorrect >= DIFFICULTY_UP) {
      prog.currentDifficulty = _raiseDifficulty(prog.currentDifficulty);
      if (prog.currentDifficulty !== oldDiff) prog.consecutiveCorrect = 0;
    } else if (prog.consecutiveWrong >= DIFFICULTY_DOWN) {
      prog.currentDifficulty = _lowerDifficulty(prog.currentDifficulty);
      if (prog.currentDifficulty !== oldDiff) prog.consecutiveWrong = 0;
    }

    // Update mastery
    prog.mastery = _computeMastery(prog);

    Student.saveTopicProgress(topicId, prog);
    return _buildAdvice(topicId, prog, isCorrect);
  }

  // ── Compute mastery state (0-3) ───────────────────────────────
  function _computeMastery(prog) {
    if (!prog.attempts) return 0; // NOT_STARTED
    const acc = prog.attempts > 0 ? prog.correct / prog.attempts : 0;
    const T = MASTERY_THRESHOLDS;
    if (
      prog.attempts >= T.MASTERED.minAttempts &&
      acc >= T.MASTERED.minAccuracy &&
      prog.consecutiveCorrect >= T.MASTERED.minConsecutive
    ) return 3; // MASTERED
    if (
      prog.attempts >= T.COMPETENT.minAttempts &&
      acc >= T.COMPETENT.minAccuracy
    ) return 2; // COMPETENT
    return 1; // LEARNING
  }

  // ── Build advice object returned after each answer ─────────────
  function _buildAdvice(topicId, prog, isCorrect) {
    const advice = {
      mastery: prog.mastery,
      currentDifficulty: prog.currentDifficulty,
      showMoreExamples: false,
      recommendPrerequisites: [],
      unlockChallenge: false,
      skipRepetitive: false,
      message: null
    };

    if (!isCorrect && prog.consecutiveWrong >= DIFFICULTY_DOWN) {
      advice.showMoreExamples = true;
      advice.message = 'Repasemos los conceptos clave antes de continuar.';

      // Check if prerequisites might be the issue
      const topic = MM_CURRICULUM.getTopic(topicId);
      if (topic && topic.prerequisites && prog.consecutiveWrong >= 4) {
        advice.recommendPrerequisites = topic.prerequisites.slice(0, 2);
        advice.message = 'Puede ser útil repasar los temas anteriores primero.';
      }
    }

    if (prog.mastery === 3) {
      advice.unlockChallenge = true;
      advice.skipRepetitive  = true;
      advice.message = '¡Tema dominado! Puedes pasar al siguiente temario o intentar el desafío.';
    } else if (prog.mastery === 2 && prog.consecutiveCorrect >= DIFFICULTY_UP) {
      advice.message = '¡Excelente racha! Subiendo la dificultad.';
    }

    return advice;
  }

  // ── Get current recommended difficulty for a topic ────────────
  function getRecommendedDifficulty(topicId) {
    const prog = Student.getTopicProgress(topicId);
    return prog.currentDifficulty || 'easy';
  }

  // ── Compute mastery for any topic (read-only) ─────────────────
  function getMastery(topicId) {
    const prog = Student.getTopicProgress(topicId);
    return _computeMastery(prog);
  }

  // ── Get weak topics (mastery=1 with significant attempts) ──────
  function getWeakTopics(limit = 20) {
    const allTopics = MM_CURRICULUM.getAllTopics();
    return allTopics
      .map(t => ({ topic: t, prog: Student.getTopicProgress(t.id) }))
      .filter(({ prog }) => prog.attempts >= 5 && _computeMastery(prog) === 1)
      .sort((a, b) => {
        const accA = a.prog.correct / a.prog.attempts;
        const accB = b.prog.correct / b.prog.attempts;
        return accA - accB; // weakest first
      })
      .slice(0, limit)
      .map(({ topic }) => topic);
  }

  // ── Get pending topics (not started or mastery=0) ─────────────
  function getPendingTopics(subjectId, limit = 20) {
    let topics = subjectId
      ? MM_CURRICULUM.getSubjectTopics(subjectId)
      : MM_CURRICULUM.getAllTopics();

    return topics
      .filter(t => {
        const prog = Student.getTopicProgress(t.id);
        return !prog.attempts;
      })
      .filter(t => _prerequisitesMet(t))
      .slice(0, limit);
  }

  function _prerequisitesMet(topic) {
    if (!topic.prerequisites || !topic.prerequisites.length) return true;
    return topic.prerequisites.every(pid => {
      const prog = Student.getTopicProgress(pid);
      return _computeMastery(prog) >= 1; // at least LEARNING
    });
  }

  // ── Build a test/simulacro question set ───────────────────────
  function buildTestSession(subjectId, count = 20) {
    let topics = subjectId
      ? MM_CURRICULUM.getSubjectTopics(subjectId)
      : MM_CURRICULUM.getAllTopics();

    // Prefer topics with generators or lessons
    const withContent = topics.filter(t => t.generatorKey || (t.lessonIds && t.lessonIds.length));
    const pool = withContent.length >= count ? withContent : topics;

    // Shuffle and pick
    const shuffled = pool.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // ── Suggest what to study next ────────────────────────────────
  function getNextRecommendation(subjectId) {
    const topics = subjectId
      ? MM_CURRICULUM.getSubjectTopics(subjectId)
      : MM_CURRICULUM.getAllTopics();

    // 1. Resume in-progress (mastery=1, attempted)
    const inProgress = topics.find(t => {
      const p = Student.getTopicProgress(t.id);
      return p.attempts > 0 && _computeMastery(p) < 2;
    });
    if (inProgress) return { topic: inProgress, reason: 'Continuar donde lo dejaste' };

    // 2. Next unlocked pending topic
    const nextPending = topics.find(t => {
      const p = Student.getTopicProgress(t.id);
      return !p.attempts && _prerequisitesMet(t);
    });
    if (nextPending) return { topic: nextPending, reason: 'Siguiente tema disponible' };

    // 3. Weakest competent topic to push toward mastery
    const toImprove = topics
      .filter(t => _computeMastery(Student.getTopicProgress(t.id)) === 2)
      .sort((a, b) => {
        const pA = Student.getTopicProgress(a.id);
        const pB = Student.getTopicProgress(b.id);
        return (pA.correct / pA.attempts) - (pB.correct / pB.attempts);
      })[0];
    if (toImprove) return { topic: toImprove, reason: 'Reforzar para dominar' };

    return null;
  }

  // ── Difficulty helpers ─────────────────────────────────────────
  function _raiseDifficulty(d) {
    const i = DIFFICULTIES.indexOf(d);
    return DIFFICULTIES[Math.min(i + 1, DIFFICULTIES.length - 1)];
  }

  function _lowerDifficulty(d) {
    const i = DIFFICULTIES.indexOf(d);
    return DIFFICULTIES[Math.max(i - 1, 0)];
  }

  // ── Mastery label helpers ──────────────────────────────────────
  const MASTERY_LABELS = ['No iniciado', 'En aprendizaje', 'Competente', 'Dominado'];
  const MASTERY_COLORS = ['#94A3B8', '#F59E0B', '#3B82F6', '#10B981'];
  const MASTERY_ICONS  = ['○', '◔', '◑', '●'];

  function getMasteryLabel(level) { return MASTERY_LABELS[level] || 'No iniciado'; }
  function getMasteryColor(level) { return MASTERY_COLORS[level] || '#94A3B8'; }
  function getMasteryIcon(level)  { return MASTERY_ICONS[level]  || '○'; }

  return {
    processAnswer,
    getRecommendedDifficulty,
    getMastery,
    getWeakTopics,
    getPendingTopics,
    buildTestSession,
    getNextRecommendation,
    getMasteryLabel,
    getMasteryColor,
    getMasteryIcon,
    MASTERY_LABELS,
    MASTERY_COLORS,
    DIFFICULTIES
  };
})();
