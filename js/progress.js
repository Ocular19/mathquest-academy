/* ═══════════════════════════════════════════════════════════════
   PROGRESS.JS — Seguimiento de progreso y repaso espaciado
   ═══════════════════════════════════════════════════════════════ */

window.Progress = (() => {

  // Intervalos de repaso espaciado (días)
  const SR_INTERVALS = [1, 3, 7, 14, 30, 60, 120];

  // ── Completion tracking ──────────────────────────────────────

  function isLessonComplete(lessonId) {
    const p = Student.get();
    return p.completedLessons.includes(lessonId);
  }

  function getCourseProgress(courseId) {
    const p = Student.get();
    const lessons = (window.MM_LESSONS || []).filter(l => l.courseId === courseId);
    if (!lessons.length) return { done: 0, total: 0, percent: 0 };
    const done = lessons.filter(l => p.completedLessons.includes(l.id)).length;
    return { done, total: lessons.length, percent: Math.round((done/lessons.length)*100) };
  }

  function getOverallProgress() {
    const p = Student.get();
    const total = (window.MM_LESSONS || []).length;
    const done  = p.completedLessons.length;
    return { done, total, percent: total ? Math.round((done/total)*100) : 0 };
  }

  function getSubjectBreakdown() {
    return (window.MM_COURSES || []).map(c => {
      const prog = getCourseProgress(c.id);
      const acc  = getSubjectAccuracy(c.id);
      return { ...c, ...prog, accuracy: acc };
    });
  }

  function getSubjectAccuracy(courseId) {
    const p = Student.get();
    const lessons = (window.MM_LESSONS || []).filter(l => l.courseId === courseId);
    const topics = [...new Set(lessons.map(l => l.topic.toLowerCase()))];
    let correct = 0, total = 0;
    topics.forEach(t => {
      const sc = p.topicScores[t];
      if (sc) { correct += sc.correct; total += sc.total; }
    });
    return total > 0 ? Math.round((correct/total)*100) : null;
  }

  // ── Spaced Repetition ────────────────────────────────────────

  function scheduleSR(lessonId) {
    const p = Student.get();
    const srData = p.srSchedule || {};
    const entry = srData[lessonId] || { stage: 0, nextReview: null };
    const stage = Math.min(entry.stage, SR_INTERVALS.length - 1);
    const days = SR_INTERVALS[stage];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + days);
    srData[lessonId] = { stage: stage + 1, nextReview: nextDate.toISOString() };
    Student.update({ srSchedule: srData });
  }

  function getDueReviews() {
    const p = Student.get();
    const srData = p.srSchedule || {};
    const now = new Date();
    const due = [];
    Object.entries(srData).forEach(([lessonId, entry]) => {
      if (entry.nextReview && new Date(entry.nextReview) <= now) {
        const lesson = (window.MM_LESSONS || []).find(l => l.id === lessonId);
        if (lesson) {
          due.push({ lesson, daysOverdue: Math.floor((now - new Date(entry.nextReview)) / (1000*60*60*24)) });
        }
      }
    });
    return due.sort((a,b) => b.daysOverdue - a.daysOverdue);
  }

  function getUpcomingReviews(days = 7) {
    const p = Student.get();
    const srData = p.srSchedule || {};
    const now = new Date();
    const future = new Date(); future.setDate(future.getDate() + days);
    const upcoming = [];
    Object.entries(srData).forEach(([lessonId, entry]) => {
      if (entry.nextReview) {
        const reviewDate = new Date(entry.nextReview);
        if (reviewDate > now && reviewDate <= future) {
          const lesson = (window.MM_LESSONS || []).find(l => l.id === lessonId);
          if (lesson) upcoming.push({ lesson, reviewDate });
        }
      }
    });
    return upcoming.sort((a,b) => a.reviewDate - b.reviewDate);
  }

  function markReviewed(lessonId, score) {
    const p = Student.get();
    const srData = p.srSchedule || {};
    const entry = srData[lessonId] || { stage: 0 };
    if (score >= 0.8) {
      entry.stage = Math.min((entry.stage || 0) + 1, SR_INTERVALS.length - 1);
    } else {
      entry.stage = Math.max(0, (entry.stage || 0) - 1);
    }
    const days = SR_INTERVALS[entry.stage];
    const next = new Date();
    next.setDate(next.getDate() + days);
    entry.nextReview = next.toISOString();
    srData[lessonId] = entry;
    Student.update({ srSchedule: srData });
  }

  // ── Study time tracking ──────────────────────────────────────

  let _sessionStart = null;
  let _minuteInterval = null;

  function startSession() {
    _sessionStart = Date.now();
    _minuteInterval = setInterval(() => {
      Student.addMinutes(1);
    }, 60000);
  }

  function endSession() {
    if (_sessionStart) {
      const mins = Math.round((Date.now() - _sessionStart) / 60000);
      if (mins > 0) Student.addMinutes(mins);
      _sessionStart = null;
    }
    if (_minuteInterval) {
      clearInterval(_minuteInterval);
      _minuteInterval = null;
    }
  }

  // ── Stats helpers ────────────────────────────────────────────

  function getWeeklyActivity() {
    const p = Student.get();
    const history = p.practiceHistory || [];
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toDateString();
      const dayHistory = history.filter(h => new Date(h.date).toDateString() === dateStr);
      days.push({
        label: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][d.getDay()],
        exercises: dayHistory.reduce((s, h) => s + (h.total||0), 0),
        correct:   dayHistory.reduce((s, h) => s + (h.correct||0), 0)
      });
    }
    return days;
  }

  function getTopicStats() {
    const p = Student.get();
    return Object.entries(p.topicScores || {}).map(([topic, scores]) => ({
      topic,
      correct: scores.correct,
      total: scores.total,
      accuracy: scores.total > 0 ? Math.round((scores.correct/scores.total)*100) : 0
    })).sort((a,b) => b.total - a.total);
  }

  return {
    isLessonComplete, getCourseProgress, getOverallProgress,
    getSubjectBreakdown, getSubjectAccuracy,
    scheduleSR, getDueReviews, getUpcomingReviews, markReviewed,
    startSession, endSession,
    getWeeklyActivity, getTopicStats
  };
})();
