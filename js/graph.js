/* ═══════════════════════════════════════════════════════════════
   GRAPH.JS — Motor de graficado de funciones (Canvas)
   ═══════════════════════════════════════════════════════════════ */

window.Grapher = (() => {

  // ── State ────────────────────────────────────────────────────
  let _canvas = null, _ctx = null;
  let _view = { xMin:-10, xMax:10, yMin:-8, yMax:8 };
  let _fns = [];       // [{ expr, color, compiled }]
  let _mousePos = null;
  let _isDragging = false, _dragStart = null, _viewAtDrag = null;
  let _infoCallback = null;
  let _animFrame = null;

  const COLORS = ['#4F46E5','#EF4444','#10B981','#F59E0B','#EC4899','#06B6D4'];

  // ── Init ─────────────────────────────────────────────────────
  function init(canvasId, opts = {}) {
    _canvas = document.getElementById(canvasId);
    if (!_canvas) return false;
    _ctx = _canvas.getContext('2d');
    if (opts.view) _view = { ..._view, ...opts.view };
    if (opts.onInfo) _infoCallback = opts.onInfo;

    _resize();
    _attachEvents();
    _render();
    return true;
  }

  function _resize() {
    if (!_canvas) return;
    const rect = _canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    _canvas.width  = rect.width  * dpr;
    _canvas.height = rect.height * dpr;
    _canvas.style.width  = rect.width  + 'px';
    _canvas.style.height = rect.height + 'px';
    _ctx.scale(dpr, dpr);
    // Adjust y range to maintain aspect
    const w = rect.width, h = rect.height;
    const xRange = _view.xMax - _view.xMin;
    const yRange = xRange * (h / w);
    const yCentre = (_view.yMax + _view.yMin) / 2;
    _view.yMin = yCentre - yRange/2;
    _view.yMax = yCentre + yRange/2;
  }

  // ── Coordinate math ─────────────────────────────────────────
  function _W() { return parseFloat(_canvas.style.width) || _canvas.width; }
  function _H() { return parseFloat(_canvas.style.height) || _canvas.height; }

  function _toScreen(mx, my) {
    const w = _W(), h = _H();
    return {
      x: ((mx - _view.xMin) / (_view.xMax - _view.xMin)) * w,
      y: h - ((my - _view.yMin) / (_view.yMax - _view.yMin)) * h
    };
  }
  function _toMath(sx, sy) {
    const w = _W(), h = _H();
    return {
      x: _view.xMin + (sx / w) * (_view.xMax - _view.xMin),
      y: _view.yMin + ((h - sy) / h) * (_view.yMax - _view.yMin)
    };
  }

  // ── Function compiler ────────────────────────────────────────
  function _preprocess(expr) {
    return expr.trim()
      .replace(/\^/g, '**')
      .replace(/(\d)([xy])/g, '$1*$2')
      .replace(/\bpi\b/gi, 'Math.PI')
      .replace(/\be\b/g, 'Math.E')
      .replace(/\bsin\b/g, 'Math.sin')
      .replace(/\bcos\b/g, 'Math.cos')
      .replace(/\btan\b/g, 'Math.tan')
      .replace(/\bsqrt\b/g, 'Math.sqrt')
      .replace(/\babs\b/g, 'Math.abs')
      .replace(/\blog\b/g, 'Math.log10')
      .replace(/\bln\b/g, 'Math.log')
      .replace(/\bexp\b/g, 'Math.exp');
  }

  // Compile y = f(x)  → variable is x
  function _compile(expr) {
    if (!expr || !expr.trim()) return null;
    try {
      const e = _preprocess(expr);
      const fn = new Function('x', `"use strict"; try { return ${e}; } catch(e){ return NaN; }`);
      fn(0); // test
      return fn;
    } catch (e) {
      return null;
    }
  }

  // Compile x = f(y)  → variable is y
  function _compileY(expr) {
    if (!expr || !expr.trim()) return null;
    try {
      const e = _preprocess(expr);
      const fn = new Function('y', `"use strict"; try { return ${e}; } catch(e){ return NaN; }`);
      fn(0); // test
      return fn;
    } catch (e) {
      return null;
    }
  }

  // ── Function management ──────────────────────────────────────
  function setFunctions(list) {
    _fns = list.map((item, i) => {
      const expr  = typeof item === 'string' ? item : item.expr;
      const color = (typeof item === 'object' && item.color) ? item.color : COLORS[i % COLORS.length];
      const mode  = (typeof item === 'object' && item.mode === 'x') ? 'x' : 'y'; // 'y'=y=f(x), 'x'=x=f(y)
      const compiled = mode === 'x' ? _compileY(expr) : _compile(expr);
      return { expr, color, mode, compiled };
    }).filter(f => f.compiled);
    _render();
    _reportInfo();
  }

  function addFunction(expr, color, mode) {
    const c = color || COLORS[_fns.length % COLORS.length];
    const m = mode === 'x' ? 'x' : 'y';
    const compiled = m === 'x' ? _compileY(expr) : _compile(expr);
    if (compiled) {
      _fns.push({ expr, color: c, mode: m, compiled });
      _render();
      _reportInfo();
    }
    return !!compiled;
  }

  function clearFunctions() {
    _fns = [];
    _render();
  }

  // ── Rendering ────────────────────────────────────────────────
  function _render() {
    if (!_ctx || !_canvas) return;
    const w = _W(), h = _H();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Background
    _ctx.fillStyle = isDark ? '#1E293B' : '#FFFFFF';
    _ctx.fillRect(0, 0, w, h);

    _drawGrid(isDark);
    _drawAxes(isDark);
    _fns.forEach(f => _drawFunction(f));
    _drawAxisLabels(isDark);
    if (_mousePos) _drawCrosshair(_mousePos, isDark);
  }

  function _drawGrid(isDark) {
    const w = _W(), h = _H();
    _ctx.strokeStyle = isDark ? '#334155' : '#E2E8F0';
    _ctx.lineWidth = 1;
    const step = _gridStep();

    // Vertical lines
    const xStart = Math.ceil(_view.xMin / step) * step;
    for (let x = xStart; x <= _view.xMax; x += step) {
      const sx = _toScreen(x, 0).x;
      _ctx.beginPath();
      _ctx.moveTo(sx, 0);
      _ctx.lineTo(sx, h);
      _ctx.stroke();
    }
    // Horizontal lines
    const yStart = Math.ceil(_view.yMin / step) * step;
    for (let y = yStart; y <= _view.yMax; y += step) {
      const sy = _toScreen(0, y).y;
      _ctx.beginPath();
      _ctx.moveTo(0, sy);
      _ctx.lineTo(w, sy);
      _ctx.stroke();
    }
  }

  function _drawAxes(isDark) {
    const w = _W(), h = _H();
    _ctx.strokeStyle = isDark ? '#64748B' : '#94A3B8';
    _ctx.lineWidth = 2;

    // X axis
    const yAxis = _toScreen(0, 0).y;
    if (yAxis >= 0 && yAxis <= h) {
      _ctx.beginPath();
      _ctx.moveTo(0, yAxis);
      _ctx.lineTo(w, yAxis);
      _ctx.stroke();
      // Arrow
      _ctx.fillStyle = isDark ? '#64748B' : '#94A3B8';
      _ctx.beginPath();
      _ctx.moveTo(w-2, yAxis);
      _ctx.lineTo(w-10, yAxis-5);
      _ctx.lineTo(w-10, yAxis+5);
      _ctx.fill();
    }
    // Y axis
    const xAxis = _toScreen(0, 0).x;
    if (xAxis >= 0 && xAxis <= w) {
      _ctx.beginPath();
      _ctx.moveTo(xAxis, h);
      _ctx.lineTo(xAxis, 0);
      _ctx.stroke();
      _ctx.beginPath();
      _ctx.moveTo(xAxis, 2);
      _ctx.lineTo(xAxis-5, 10);
      _ctx.lineTo(xAxis+5, 10);
      _ctx.fill();
    }
  }

  function _drawAxisLabels(isDark) {
    const w = _W(), h = _H();
    const step = _gridStep();
    _ctx.fillStyle = isDark ? '#94A3B8' : '#64748B';
    _ctx.font = '11px Inter, sans-serif';
    _ctx.textAlign = 'center';

    const xStart = Math.ceil(_view.xMin / step) * step;
    const yZero = _toScreen(0, 0).y;
    const yPos = Math.min(Math.max(yZero + 14, 12), h - 4);

    for (let x = xStart; x <= _view.xMax; x += step) {
      if (Math.abs(x) < step * 0.1) continue;
      const sx = _toScreen(x, 0).x;
      if (sx > 6 && sx < w - 6) {
        const lbl = Number.isInteger(x) ? x : x.toFixed(1);
        _ctx.fillText(lbl, sx, yPos);
      }
    }

    _ctx.textAlign = 'right';
    const xZero = _toScreen(0, 0).x;
    const xPos = Math.max(Math.min(xZero - 4, w - 6), 28);
    const yStart = Math.ceil(_view.yMin / step) * step;

    for (let y = yStart; y <= _view.yMax; y += step) {
      if (Math.abs(y) < step * 0.1) continue;
      const sy = _toScreen(0, y).y;
      if (sy > 12 && sy < h - 4) {
        const lbl = Number.isInteger(y) ? y : y.toFixed(1);
        _ctx.fillText(lbl, xPos, sy + 4);
      }
    }
  }

  function _gridStep() {
    const range = _view.xMax - _view.xMin;
    const target = range / 10;
    const mag = Math.pow(10, Math.floor(Math.log10(target)));
    const norm = target / mag;
    let step;
    if (norm < 1.5) step = mag;
    else if (norm < 3.5) step = 2 * mag;
    else if (norm < 7.5) step = 5 * mag;
    else step = 10 * mag;
    return step;
  }

  function _drawFunction(f) {
    if (!f.compiled) return;
    if (f.mode === 'x') { _drawFunctionOfY(f); return; }

    const w = _W();
    const steps = Math.min(w * 2, 2000);
    const dx = (_view.xMax - _view.xMin) / steps;

    _ctx.strokeStyle = f.color;
    _ctx.lineWidth = 2.5;
    _ctx.lineJoin = 'round';
    _ctx.lineCap = 'round';
    _ctx.beginPath();

    let penDown = false;
    let prevY = null;

    for (let i = 0; i <= steps; i++) {
      const mx = _view.xMin + i * dx;
      const my = f.compiled(mx);

      if (!isFinite(my) || isNaN(my)) { penDown = false; prevY = null; continue; }
      if (prevY !== null && Math.abs(my - prevY) > (_view.yMax - _view.yMin) * 2) penDown = false;

      const p = _toScreen(mx, my);
      if (!penDown) { _ctx.moveTo(p.x, p.y); penDown = true; }
      else _ctx.lineTo(p.x, p.y);
      prevY = my;
    }
    _ctx.stroke();
  }

  // Draw x = f(y): iterate over y, compute x
  function _drawFunctionOfY(f) {
    const h = _H();
    const steps = Math.min(h * 2, 2000);
    const dy = (_view.yMax - _view.yMin) / steps;

    _ctx.strokeStyle = f.color;
    _ctx.lineWidth = 2.5;
    _ctx.lineJoin = 'round';
    _ctx.lineCap = 'round';
    _ctx.beginPath();

    let penDown = false;
    let prevX = null;

    for (let i = 0; i <= steps; i++) {
      const my = _view.yMin + i * dy;
      const mx = f.compiled(my);

      if (!isFinite(mx) || isNaN(mx)) { penDown = false; prevX = null; continue; }
      if (prevX !== null && Math.abs(mx - prevX) > (_view.xMax - _view.xMin) * 2) penDown = false;

      const p = _toScreen(mx, my);
      if (!penDown) { _ctx.moveTo(p.x, p.y); penDown = true; }
      else _ctx.lineTo(p.x, p.y);
      prevX = mx;
    }
    _ctx.stroke();
  }

  function _drawCrosshair(pos, isDark) {
    const w = _W(), h = _H();
    _ctx.setLineDash([5, 4]);
    _ctx.strokeStyle = isDark ? 'rgba(148,163,184,.5)' : 'rgba(100,116,139,.4)';
    _ctx.lineWidth = 1;
    _ctx.beginPath();
    _ctx.moveTo(pos.sx, 0); _ctx.lineTo(pos.sx, h);
    _ctx.moveTo(0, pos.sy); _ctx.lineTo(w, pos.sy);
    _ctx.stroke();
    _ctx.setLineDash([]);

    // Dot on each function
    _fns.forEach(f => {
      if (!f.compiled) return;
      const y = f.compiled(pos.mx);
      if (isFinite(y)) {
        const p = _toScreen(pos.mx, y);
        _ctx.beginPath();
        _ctx.arc(p.x, p.y, 5, 0, Math.PI*2);
        _ctx.fillStyle = f.color;
        _ctx.fill();
        _ctx.strokeStyle = isDark ? '#1E293B' : '#fff';
        _ctx.lineWidth = 2;
        _ctx.stroke();
      }
    });

    // Coordinates label
    _ctx.fillStyle = isDark ? '#F1F5F9' : '#0F172A';
    _ctx.font = 'bold 12px Inter, sans-serif';
    _ctx.textAlign = 'left';
    const lx = pos.sx + 10, ly = pos.sy - 10;
    const label = `(${pos.mx.toFixed(2)}, ${_fns.length && _fns[0].compiled ? _fns[0].compiled(pos.mx).toFixed(2) : pos.my.toFixed(2)})`;
    _ctx.fillStyle = isDark ? 'rgba(30,41,59,.85)' : 'rgba(255,255,255,.9)';
    const tw = _ctx.measureText(label).width;
    _ctx.fillRect(lx-3, ly-14, tw+6, 18);
    _ctx.fillStyle = isDark ? '#F1F5F9' : '#0F172A';
    _ctx.fillText(label, lx, ly);
  }

  // ── Key point analysis ───────────────────────────────────────
  function _reportInfo() {
    if (!_infoCallback || !_fns.length) return;
    const f = _fns[0];
    if (!f || !f.compiled) return;

    const info = { fn: f.expr };

    // Find zeros (x-intercepts)
    const zeros = [];
    const steps = 2000;
    const dx = (_view.xMax - _view.xMin) / steps;
    let prev = { x: _view.xMin, y: f.compiled(_view.xMin) };
    for (let i = 1; i <= steps; i++) {
      const x = _view.xMin + i * dx;
      const y = f.compiled(x);
      if (isFinite(prev.y) && isFinite(y) && prev.y * y < 0) {
        // Bisection
        let lo = prev.x, hi = x, mid;
        for (let j = 0; j < 30; j++) {
          mid = (lo + hi) / 2;
          const ym = f.compiled(mid);
          if (!isFinite(ym)) break;
          if (Math.abs(ym) < 1e-8) break;
          if (f.compiled(lo) * ym < 0) hi = mid; else lo = mid;
        }
        if (zeros.length < 5) zeros.push(parseFloat(((lo+hi)/2).toFixed(4)));
      }
      prev = { x, y };
    }
    info.zeros = zeros;

    // Y-intercept
    const yi = f.compiled(0);
    info.yIntercept = isFinite(yi) ? parseFloat(yi.toFixed(4)) : '—';

    // Domain estimate
    info.domain = `[${_view.xMin}, ${_view.xMax}]`;

    _infoCallback(info);
  }

  // ── Zoom & Pan ───────────────────────────────────────────────
  function zoom(factor, centerX, centerY) {
    const cx = centerX !== undefined ? centerX : (_view.xMin + _view.xMax) / 2;
    const cy = centerY !== undefined ? centerY : (_view.yMin + _view.yMax) / 2;
    // Prevent over-zooming in or out
    const newXRange = (_view.xMax - _view.xMin) * factor;
    if (newXRange < 0.001 || newXRange > 100000) return;
    _view.xMin = cx - newXRange / 2; _view.xMax = cx + newXRange / 2;
    const newYRange = (_view.yMax - _view.yMin) * factor;
    _view.yMin = cy - newYRange / 2; _view.yMax = cy + newYRange / 2;
    _render(); _reportInfo();
  }

  function pan(dx, dy) {
    _view.xMin += dx; _view.xMax += dx;
    _view.yMin += dy; _view.yMax += dy;
    _render();
  }

  function reset() {
    _view = { xMin:-10, xMax:10, yMin:-8, yMax:8 };
    _resize();
    _render(); _reportInfo();
  }

  // ── Events ───────────────────────────────────────────────────
  function _attachEvents() {
    if (!_canvas) return;

    window.addEventListener('resize', () => { _resize(); _render(); });

    // Mouse move → crosshair
    _canvas.addEventListener('mousemove', e => {
      const rect = _canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const mp = _toMath(sx, sy);

      if (_isDragging && _dragStart) {
        const ddx = (_dragStart.mx - mp.x);
        const ddy = (_dragStart.my - mp.y);
        _view.xMin = _viewAtDrag.xMin + ddx;
        _view.xMax = _viewAtDrag.xMax + ddx;
        _view.yMin = _viewAtDrag.yMin + ddy;
        _view.yMax = _viewAtDrag.yMax + ddy;
      }
      _mousePos = { sx, sy, mx: mp.x, my: mp.y };
      if (_animFrame) cancelAnimationFrame(_animFrame);
      _animFrame = requestAnimationFrame(_render);
    });

    _canvas.addEventListener('mouseleave', () => {
      _mousePos = null;
      _render();
    });

    // Drag to pan
    _canvas.addEventListener('mousedown', e => {
      const rect = _canvas.getBoundingClientRect();
      const mp = _toMath(e.clientX - rect.left, e.clientY - rect.top);
      _isDragging = true;
      _dragStart = mp;
      _viewAtDrag = { ..._view };
      _canvas.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', () => {
      _isDragging = false;
      _dragStart = null;
      if (_canvas) _canvas.style.cursor = 'crosshair';
      _reportInfo();
    });

    // Scroll to zoom — normalized so trackpads and mice feel similar
    _canvas.addEventListener('wheel', e => {
      e.preventDefault();
      const rect = _canvas.getBoundingClientRect();
      const mp = _toMath(e.clientX - rect.left, e.clientY - rect.top);
      // Normalize: cap at ±1 regardless of device delta magnitude
      const norm = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 100) / 100;
      const factor = Math.pow(1.25, norm); // 1.25× per "full tick"
      zoom(factor, mp.x, mp.y);
    }, { passive: false });

    // Touch support
    let _lastTouchDist = null;
    _canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        _lastTouchDist = Math.sqrt(dx*dx + dy*dy);
      } else if (e.touches.length === 1) {
        const rect = _canvas.getBoundingClientRect();
        const mp = _toMath(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
        _isDragging = true;
        _dragStart = mp;
        _viewAtDrag = { ..._view };
      }
    }, { passive: false });

    _canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (_lastTouchDist && dist > 0) {
          // Use ratio but damp it so pinch feels controlled
          const raw = _lastTouchDist / dist;
          const factor = Math.pow(raw, 0.5); // square-root dampens aggressive pinch
          zoom(factor);
        }
        _lastTouchDist = dist;
      } else if (e.touches.length === 1 && _isDragging && _dragStart) {
        const rect = _canvas.getBoundingClientRect();
        const mp = _toMath(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
        const ddx = _dragStart.x - mp.x;
        const ddy = _dragStart.y - mp.y;
        _view.xMin = _viewAtDrag.xMin + ddx;
        _view.xMax = _viewAtDrag.xMax + ddx;
        _view.yMin = _viewAtDrag.yMin + ddy;
        _view.yMax = _viewAtDrag.yMax + ddy;
        _render();
      }
    }, { passive: false });

    _canvas.addEventListener('touchend', () => {
      _isDragging = false; _lastTouchDist = null;
    });
  }

  // ── Table of values ──────────────────────────────────────────
  function getTableOfValues(xMin, xMax, steps = 10) {
    if (!_fns.length) return [];
    const f = _fns[0];
    if (!f.compiled) return [];
    const rows = [];
    const dx = (xMax - xMin) / steps;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * dx;
      const y = f.compiled(x);
      rows.push({ x: parseFloat(x.toFixed(3)), y: isFinite(y) ? parseFloat(y.toFixed(4)) : '—' });
    }
    return rows;
  }

  // ── Mini grapher for lesson visualizations ───────────────────
  function miniGraph(canvasEl, fnStr, viewOpt) {
    const ctx = canvasEl.getContext('2d');
    const view = Object.assign({ xMin:-6, xMax:6, yMin:-5, yMax:5 }, viewOpt);
    const fn = _compile(fnStr);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const w = canvasEl.width, h = canvasEl.height;

    ctx.fillStyle = isDark ? '#1E293B' : '#F8FAFC';
    ctx.fillRect(0,0,w,h);

    function toS(mx,my){ return { x:((mx-view.xMin)/(view.xMax-view.xMin))*w, y:h-((my-view.yMin)/(view.yMax-view.yMin))*h }; }

    // Grid
    ctx.strokeStyle = isDark ? '#334155' : '#E2E8F0';
    ctx.lineWidth = 0.8;
    for (let x=-10;x<=10;x++){ const p=toS(x,0); ctx.beginPath(); ctx.moveTo(p.x,0); ctx.lineTo(p.x,h); ctx.stroke(); }
    for (let y=-10;y<=10;y++){ const p=toS(0,y); ctx.beginPath(); ctx.moveTo(0,p.y); ctx.lineTo(w,p.y); ctx.stroke(); }

    // Axes
    ctx.strokeStyle = isDark ? '#64748B' : '#94A3B8';
    ctx.lineWidth = 1.5;
    const ax = toS(0,0); const ay = toS(0,0);
    ctx.beginPath(); ctx.moveTo(0,ax.y); ctx.lineTo(w,ax.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ay.x,0); ctx.lineTo(ay.x,h); ctx.stroke();

    // Function
    if (fn) {
      ctx.strokeStyle = '#4F46E5';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let first = true, prevY = null;
      const steps = w * 2;
      for (let i = 0; i <= steps; i++) {
        const mx = view.xMin + (i/steps)*(view.xMax-view.xMin);
        const my = fn(mx);
        if (!isFinite(my)||isNaN(my)){ first=true; prevY=null; continue; }
        if (prevY!==null && Math.abs(my-prevY) > (view.yMax-view.yMin)*1.5){ first=true; }
        const p = toS(mx,my);
        if (first){ ctx.moveTo(p.x,p.y); first=false; } else ctx.lineTo(p.x,p.y);
        prevY = my;
      }
      ctx.stroke();
    }
  }

  function rerender() { _render(); }

  return {
    init, setFunctions, addFunction, clearFunctions,
    zoom, pan, reset, rerender,
    getTableOfValues, miniGraph,
    get view() { return { ..._view }; }
  };
})();
