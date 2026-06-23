/* ═══════════════════════════════════════════════════════════════
   STUDENT.JS — Perfil y persistencia del estudiante
   ═══════════════════════════════════════════════════════════════ */

window.Student = (() => {
  const KEY = 'mm_student_v2';

  const DEFAULTS = {
    name: 'Estudiante',
    avatar: '?',
    level: 1,
    xp: 0,
    xpToNext: 200,
    streak: 0,
    lastStudyDate: null,
    totalMinutes: 0,
    completedLessons: [],
    lessonProgress: {},    // lessonId → { tab, step, done }
    topicScores: {},       // topicId → { correct, total }
    topicProgress: {},     // topicId → { attempts, correct, consecutiveCorrect, consecutiveWrong, mastery, currentDifficulty, lastPracticed }
    practiceHistory: [],   // [{ date, topic, correct, total }]
    achievements: [],
    settings: {
      theme: 'light',
      fontSize: 'normal',
      tts: false,
      highContrast: false
    }
  };

  const LEVELS = [
    { name: 'Principiante',   min: 0,    max: 200  },
    { name: 'Aprendiz',       min: 200,  max: 500  },
    { name: 'Explorador',     min: 500,  max: 1000 },
    { name: 'Estudiante',     min: 1000, max: 2000 },
    { name: 'Avanzado',       min: 2000, max: 3500 },
    { name: 'Experto',        min: 3500, max: 5500 },
    { name: 'Maestro',        min: 5500, max: 8000 },
    { name: 'Gran Maestro',   min: 8000, max: Infinity }
  ];

  let _profile = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        _profile = Object.assign({}, DEFAULTS, JSON.parse(raw));
        _profile.settings      = Object.assign({}, DEFAULTS.settings, _profile.settings);
        _profile.topicProgress = _profile.topicProgress || {};
      } else {
        _profile = JSON.parse(JSON.stringify(DEFAULTS));
      }
    } catch(e) {
      _profile = JSON.parse(JSON.stringify(DEFAULTS));
    }
    _checkStreak();
    return _profile;
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(_profile));
    } catch(e) {
      console.warn('No se pudo guardar el perfil:', e);
    }
  }

  function get() {
    if (!_profile) load();
    return _profile;
  }

  function update(partial) {
    if (!_profile) load();
    Object.assign(_profile, partial);
    save();
  }

  // Add XP and handle level-up, returns { gained, leveledUp, newLevel }
  function addXP(amount) {
    if (!_profile) load();
    _profile.xp += amount;
    let leveledUp = false;
    let newLevel = _profile.level;

    while (_profile.level < LEVELS.length) {
      const lvl = LEVELS[_profile.level - 1];
      if (_profile.xp >= lvl.max && _profile.level < LEVELS.length) {
        _profile.level++;
        newLevel = _profile.level;
        leveledUp = true;
      } else break;
    }

    const lvl = LEVELS[Math.min(_profile.level - 1, LEVELS.length - 1)];
    _profile.xpToNext = lvl.max === Infinity ? null : lvl.max - _profile.xp;
    save();
    return { gained: amount, leveledUp, newLevel, levelName: getLevelInfo().name };
  }

  function getLevelInfo() {
    if (!_profile) load();
    const idx = Math.min(_profile.level - 1, LEVELS.length - 1);
    const lvl = LEVELS[idx];
    const prevMin = idx > 0 ? LEVELS[idx-1].min : 0;
    const rangeSize = lvl.max === Infinity ? 5000 : lvl.max - prevMin;
    const progress = Math.min(100, Math.round(((_profile.xp - prevMin) / rangeSize) * 100));
    return {
      number: _profile.level,
      name: lvl.name,
      progress,
      xpInLevel: _profile.xp - prevMin,
      xpNeeded: lvl.max === Infinity ? 0 : lvl.max - _profile.xp
    };
  }

  function markLessonDone(lessonId) {
    if (!_profile) load();
    if (!_profile.completedLessons.includes(lessonId)) {
      _profile.completedLessons.push(lessonId);
      _recordStudyToday();
    }
    save();
  }

  function saveLessonProgress(lessonId, data) {
    if (!_profile) load();
    _profile.lessonProgress[lessonId] = Object.assign(
      _profile.lessonProgress[lessonId] || {},
      data
    );
    save();
  }

  function getLessonProgress(lessonId) {
    if (!_profile) load();
    return _profile.lessonProgress[lessonId] || {};
  }

  function recordPractice(topic, correct, total) {
    if (!_profile) load();
    const topicKey = topic || 'general';
    if (!_profile.topicScores[topicKey]) {
      _profile.topicScores[topicKey] = { correct: 0, total: 0 };
    }
    _profile.topicScores[topicKey].correct += correct;
    _profile.topicScores[topicKey].total   += total;
    _profile.practiceHistory.unshift({
      date: new Date().toISOString(), topic: topicKey, correct, total
    });
    if (_profile.practiceHistory.length > 100) {
      _profile.practiceHistory = _profile.practiceHistory.slice(0, 100);
    }
    _recordStudyToday();
    save();
  }

  function getTopicAccuracy(topicId) {
    if (!_profile) load();
    const s = _profile.topicScores[topicId];
    if (!s || s.total === 0) return null;
    return Math.round((s.correct / s.total) * 100);
  }

  function addMinutes(mins) {
    if (!_profile) load();
    _profile.totalMinutes = (_profile.totalMinutes || 0) + mins;
    save();
  }

  function _checkStreak() {
    if (!_profile.lastStudyDate) return;
    const last = new Date(_profile.lastStudyDate);
    const today = new Date();
    const diffDays = Math.floor((today - last) / (1000*60*60*24));
    if (diffDays > 1) {
      _profile.streak = 0;
      save();
    }
  }

  function _recordStudyToday() {
    const today = new Date().toDateString();
    const lastDate = _profile.lastStudyDate
      ? new Date(_profile.lastStudyDate).toDateString()
      : null;

    if (lastDate !== today) {
      if (lastDate) {
        const diff = Math.floor((new Date() - new Date(_profile.lastStudyDate)) / (1000*60*60*24));
        if (diff === 1) _profile.streak++;
        else if (diff > 1) _profile.streak = 1;
        else _profile.streak++;
      } else {
        _profile.streak = 1;
      }
      _profile.lastStudyDate = new Date().toISOString();
      save();
    }
  }

  // ── Topic mastery tracking ───────────────────────────────────
  function getTopicProgress(topicId) {
    if (!_profile) load();
    if (!_profile.topicProgress[topicId]) {
      _profile.topicProgress[topicId] = {
        attempts: 0, correct: 0,
        consecutiveCorrect: 0, consecutiveWrong: 0,
        mastery: 0, currentDifficulty: 'easy',
        lastPracticed: null
      };
    }
    return _profile.topicProgress[topicId];
  }

  function saveTopicProgress(topicId, data) {
    if (!_profile) load();
    _profile.topicProgress[topicId] = data;
    _recordStudyToday();
    save();
  }

  function getSubjectMasteryStats(subjectId) {
    if (!window.MM_CURRICULUM) return { total: 0, byLevel: [0,0,0,0] };
    const topics = MM_CURRICULUM.getSubjectTopics(subjectId);
    const byLevel = [0, 0, 0, 0];
    topics.forEach(t => {
      const p = getTopicProgress(t.id);
      byLevel[p.mastery || 0]++;
    });
    return { total: topics.length, byLevel };
  }

  // ── Export / Import progress ─────────────────────────────────
  function exportProgress() {
    if (!_profile) load();
    const data = JSON.stringify({ version: 2, profile: _profile, exportedAt: new Date().toISOString() });
    const blob = new Blob([data], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `matematica-maestra-progreso-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importProgress(jsonText) {
    try {
      const parsed = JSON.parse(jsonText);
      const data   = parsed.profile || parsed;
      _profile = Object.assign({}, DEFAULTS, data);
      _profile.settings      = Object.assign({}, DEFAULTS.settings, _profile.settings || {});
      _profile.topicProgress = _profile.topicProgress || {};
      save();
      return { ok: true };
    } catch(e) {
      return { ok: false, error: e.message };
    }
  }

  function setName(name) {
    update({ name: name.trim() || 'Estudiante', avatar: name.trim()[0]?.toUpperCase() || '?' });
  }

  function getStats() {
    if (!_profile) load();
    const totalLessons = (window.MM_LESSONS || []).length;
    const done = _profile.completedLessons.length;
    return {
      lessonsCompleted: done,
      lessonsTotal: totalLessons,
      percentComplete: totalLessons ? Math.round((done/totalLessons)*100) : 0,
      streak: _profile.streak || 0,
      totalMinutes: _profile.totalMinutes || 0,
      xp: _profile.xp,
      level: getLevelInfo()
    };
  }

  function reset() {
    localStorage.removeItem(KEY);
    _profile = JSON.parse(JSON.stringify(DEFAULTS));
    save();
    return _profile;
  }

  return { load, get, update, save, addXP, getLevelInfo, markLessonDone,
           saveLessonProgress, getLessonProgress, recordPractice,
           getTopicAccuracy, addMinutes, setName, getStats, reset,
           getTopicProgress, saveTopicProgress, getSubjectMasteryStats,
           exportProgress, importProgress,
           get profile(){ return get(); } };
})();
