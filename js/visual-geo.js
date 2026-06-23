/* ═══════════════════════════════════════════════════════════════
   VISUAL-GEO.JS — Visualizaciones interactivas de Geometría
   Exporta window.MM_GEO_VIS con 8 visualizaciones Canvas2D
   ═══════════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  if (!window.MM_GEO_VIS) window.MM_GEO_VIS = {};
  const V = window.MM_GEO_VIS;

  const COLORS = {
    primary:   '#10B981',
    secondary: '#3B82F6',
    accent:    '#F59E0B',
    danger:    '#EF4444',
    text:      '#1F2937',
    light:     '#E5E7EB',
    bg:        '#F9FAFB',
    grid:      '#D1D5DB'
  };

  function getThemeColors() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      text:  dark ? '#E5E7EB' : '#1F2937',
      grid:  dark ? '#374151' : '#D1D5DB',
      bg:    dark ? '#1F2937' : '#F9FAFB',
      panel: dark ? '#111827' : '#FFFFFF'
    };
  }

  function makeCanvas(container, w, h) {
    container.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px;';
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    cv.style.cssText = `max-width:100%;border-radius:12px;touch-action:none;cursor:crosshair;
      box-shadow:0 2px 12px rgba(0,0,0,0.1);background:${getThemeColors().panel}`;
    container.appendChild(cv);
    return cv;
  }

  function makeLabel(container, text) {
    const d = document.createElement('div');
    d.style.cssText = 'font-size:13px;color:var(--text-2);text-align:center;max-width:360px;line-height:1.5;';
    d.textContent = text;
    container.appendChild(d);
    return d;
  }

  function makeSlider(container, label, min, max, val, step, onChange) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;align-items:center;gap:8px;width:100%;max-width:360px;';
    const lbl = document.createElement('span');
    lbl.style.cssText = 'font-size:13px;color:var(--text-2);min-width:100px;';
    lbl.textContent = label + ': ' + val;
    const sl = document.createElement('input');
    sl.type = 'range'; sl.min = min; sl.max = max; sl.value = val; sl.step = step;
    sl.style.cssText = 'flex:1;accent-color:' + COLORS.primary;
    sl.addEventListener('input', () => { lbl.textContent = label + ': ' + sl.value; onChange(+sl.value); });
    wrap.appendChild(lbl); wrap.appendChild(sl);
    container.appendChild(wrap);
    return { el: sl, lbl };
  }

  // ──────────────────────────────────────────────────────────────
  // 1. GEO-ANGLES — Ángulo draggable con clasificación
  // ──────────────────────────────────────────────────────────────
  V['geo-angles'] = function(container) {
    const cv = makeCanvas(container, 380, 300);
    const ctx = cv.getContext('2d');
    const lbl = makeLabel(container, 'Arrastra el punto azul para cambiar el ángulo.');

    let angle = 60;
    const cx = 190, cy = 200, r = 140;

    function classify(a) {
      if (a === 0) return 'Nulo (0°)';
      if (a < 90)  return 'Agudo';
      if (a === 90) return 'Recto (90°)';
      if (a < 180) return 'Obtuso';
      if (a === 180) return 'Llano (180°)';
      return 'Mayor de 180°';
    }

    function draw() {
      const tc = getThemeColors();
      ctx.clearRect(0, 0, cv.width, cv.height);
      const rad = (angle * Math.PI) / 180;
      const bx = cx + r * Math.cos(-rad), by = cy + r * Math.sin(-rad);

      // base ray (horizontal right)
      ctx.beginPath(); ctx.strokeStyle = COLORS.primary; ctx.lineWidth = 3;
      ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy); ctx.stroke();

      // movable ray
      ctx.beginPath(); ctx.strokeStyle = COLORS.secondary;
      ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();

      // arc
      ctx.beginPath(); ctx.strokeStyle = COLORS.accent; ctx.lineWidth = 2;
      ctx.arc(cx, cy, 50, -rad, 0); ctx.stroke();

      // angle label
      const midA = -rad / 2;
      ctx.fillStyle = COLORS.accent; ctx.font = 'bold 16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(angle + '°', cx + 75 * Math.cos(midA), cy + 75 * Math.sin(midA));

      // vertex dot
      ctx.beginPath(); ctx.fillStyle = COLORS.text;
      ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();

      // draggable point
      ctx.beginPath(); ctx.fillStyle = COLORS.secondary;
      ctx.arc(bx, by, 9, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.fillStyle = '#fff';
      ctx.arc(bx, by, 4, 0, Math.PI * 2); ctx.fill();

      lbl.textContent = `Ángulo: ${angle}° → ${classify(angle)}`;
    }

    function pointerAngle(e) {
      const rect = cv.getBoundingClientRect();
      const scaleX = cv.width / rect.width;
      const scaleY = cv.height / rect.height;
      const px = ((e.clientX ?? e.touches[0].clientX) - rect.left) * scaleX - cx;
      const py = ((e.clientY ?? e.touches[0].clientY) - rect.top)  * scaleY - cy;
      let a = Math.round(-Math.atan2(py, px) * 180 / Math.PI);
      if (a < 0) a += 360;
      return Math.min(359, Math.max(1, a));
    }

    let drag = false;
    cv.addEventListener('pointerdown', e => { drag = true; angle = pointerAngle(e); draw(); });
    cv.addEventListener('pointermove', e => { if (drag) { angle = pointerAngle(e); draw(); } });
    cv.addEventListener('pointerup', () => { drag = false; });
    cv.addEventListener('pointerleave', () => { drag = false; });

    draw();
  };

  // ──────────────────────────────────────────────────────────────
  // 2. GEO-TRIANGLE — Triángulo de vértices arrastrables
  // ──────────────────────────────────────────────────────────────
  V['geo-triangle'] = function(container) {
    const cv = makeCanvas(container, 380, 320);
    const ctx = cv.getContext('2d');
    const infoEl = makeLabel(container, '');

    let pts = [{x:190,y:60},{x:80,y:270},{x:300,y:270}];
    let drag = -1;

    function dist(a,b){ return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2); }
    function angleDeg(a,b,c){
      const ab=dist(a,b), bc=dist(b,c), ac=dist(a,c);
      return Math.round(Math.acos((ab*ab+bc*bc-ac*ac)/(2*ab*bc))*180/Math.PI);
    }
    function area(p){ return Math.abs((p[1].x-p[0].x)*(p[2].y-p[0].y)-(p[2].x-p[0].x)*(p[1].y-p[0].y))/2; }

    function draw() {
      const tc = getThemeColors();
      ctx.clearRect(0, 0, cv.width, cv.height);

      // fill
      ctx.beginPath();
      ctx.moveTo(pts[0].x,pts[0].y); ctx.lineTo(pts[1].x,pts[1].y); ctx.lineTo(pts[2].x,pts[2].y);
      ctx.closePath(); ctx.fillStyle = 'rgba(16,185,129,0.12)'; ctx.fill();

      // sides
      ctx.strokeStyle = COLORS.primary; ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(pts[0].x,pts[0].y); ctx.lineTo(pts[1].x,pts[1].y);
      ctx.lineTo(pts[2].x,pts[2].y); ctx.closePath(); ctx.stroke();

      // vertices
      const labels = ['A','B','C'];
      pts.forEach((p,i) => {
        ctx.beginPath(); ctx.fillStyle = i===drag ? COLORS.accent : COLORS.secondary;
        ctx.arc(p.x,p.y,9,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font='bold 11px Inter'; ctx.textAlign='center';
        ctx.fillText(labels[i],p.x,p.y+4);
      });

      // angles at each vertex
      const aA = angleDeg(pts[2],pts[0],pts[1]);
      const aB = angleDeg(pts[0],pts[1],pts[2]);
      const aC = 180-aA-aB;
      const angInfo = [aA,aB,aC];
      pts.forEach((p,i) => {
        ctx.fillStyle = COLORS.accent; ctx.font = '13px Inter'; ctx.textAlign='center';
        const ox = (p.x < 50) ? 20 : (p.x > 330) ? -20 : 0;
        const oy = (p.y < 50) ? 20 : (p.y > 300) ? -20 : (i===0 ? -16 : 20);
        ctx.fillText(`${angInfo[i]}°`, p.x+ox, p.y+oy);
      });

      // side lengths
      const sides = [dist(pts[0],pts[1]).toFixed(0), dist(pts[1],pts[2]).toFixed(0), dist(pts[2],pts[0]).toFixed(0)];
      [[0,1],[1,2],[2,0]].forEach(([i,j],k) => {
        const mx = (pts[i].x+pts[j].x)/2, my = (pts[i].y+pts[j].y)/2;
        ctx.fillStyle = COLORS.text; ctx.font='12px Inter'; ctx.textAlign='center';
        ctx.fillText(sides[k]+'px', mx, my-8);
      });

      const Ar = area(pts).toFixed(0);
      infoEl.textContent = `Ángulos: ${aA}°, ${aB}°, ${aC}° | Suma: ${aA+aB+aC}° | Área: ${Ar} px²`;
    }

    function nearPt(e) {
      const rect = cv.getBoundingClientRect();
      const sx = cv.width/rect.width, sy = cv.height/rect.height;
      const mx = ((e.clientX??e.touches[0].clientX)-rect.left)*sx;
      const my = ((e.clientY??e.touches[0].clientY)-rect.top)*sy;
      for(let i=0;i<pts.length;i++) if(Math.hypot(pts[i].x-mx,pts[i].y-my)<18) return i;
      return -1;
    }
    function moveEvt(e) {
      if(drag<0) return;
      const rect=cv.getBoundingClientRect();
      const sx=cv.width/rect.width, sy=cv.height/rect.height;
      pts[drag].x = Math.max(10, Math.min(cv.width-10, ((e.clientX??e.touches[0].clientX)-rect.left)*sx));
      pts[drag].y = Math.max(10, Math.min(cv.height-10, ((e.clientY??e.touches[0].clientY)-rect.top)*sy));
      draw();
    }

    cv.addEventListener('pointerdown', e => { drag=nearPt(e); if(drag>=0) { cv.setPointerCapture(e.pointerId); draw(); } });
    cv.addEventListener('pointermove', moveEvt);
    cv.addEventListener('pointerup', () => { drag=-1; draw(); });

    draw();
  };

  // ──────────────────────────────────────────────────────────────
  // 3. GEO-PYTHAGOREAN — Demostración visual de a²+b²=c²
  // ──────────────────────────────────────────────────────────────
  V['geo-pythagorean'] = function(container) {
    const cv = makeCanvas(container, 380, 300);
    const ctx = cv.getContext('2d');
    const lbl = makeLabel(container, '');
    let a=3, b=4;

    const {el: saEl, lbl: saLbl} = makeSlider(container,'Cateto a',1,12,3,1,v=>{a=v;draw();});
    const {el: sbEl, lbl: sbLbl} = makeSlider(container,'Cateto b',1,12,4,1,v=>{b=v;draw();});

    function draw() {
      const tc = getThemeColors();
      ctx.clearRect(0, 0, cv.width, cv.height);
      const c = Math.sqrt(a*a+b*b);
      const sc = Math.min(22, Math.floor(260 / Math.max(a+b+2, b+c+2, a+c+2)));

      // origin at bottom-left of triangle
      const ox = 50, oy = cv.height - 50;
      const ax = ox + a*sc, ay = oy;
      const bx = ox, by = oy - b*sc;

      // Draw triangle
      ctx.beginPath(); ctx.strokeStyle = COLORS.primary; ctx.lineWidth = 3;
      ctx.moveTo(ox,oy); ctx.lineTo(ax,ay); ctx.lineTo(bx,by); ctx.closePath();
      ctx.fillStyle = 'rgba(16,185,129,0.15)'; ctx.fill(); ctx.stroke();

      // Right angle mark
      const ms = 12;
      ctx.strokeStyle = COLORS.text; ctx.lineWidth = 1.5;
      ctx.strokeRect(ox, oy-ms, ms, ms);

      // Square on a (below)
      ctx.fillStyle = 'rgba(245,158,11,0.25)'; ctx.strokeStyle = COLORS.accent; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(ox, oy, a*sc, a*sc);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = COLORS.accent; ctx.font='bold 14px Inter'; ctx.textAlign='center';
      ctx.fillText(`a²=${a*a}`, ox+a*sc/2, oy+a*sc/2+6);

      // Square on b (left)
      ctx.fillStyle='rgba(59,130,246,0.25)'; ctx.strokeStyle=COLORS.secondary;
      ctx.beginPath(); ctx.rect(ox-b*sc, oy-b*sc, b*sc, b*sc);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle=COLORS.secondary; ctx.font='bold 14px Inter'; ctx.textAlign='center';
      ctx.fillText(`b²=${b*b}`, ox-b*sc/2, oy-b*sc/2+6);

      // Square on c (hypotenuse - just a colored label on the hyp.)
      ctx.strokeStyle=COLORS.danger; ctx.lineWidth=3;
      ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
      ctx.fillStyle=COLORS.danger; ctx.font='bold 15px Inter'; ctx.textAlign='center';
      const mx=(ax+bx)/2, my=(ay+by)/2;
      ctx.fillText(`c=${c.toFixed(2)}`, mx+18, my);

      saLbl.textContent = `Cateto a: ${a}`;
      sbLbl.textContent = `Cateto b: ${b}`;
      lbl.textContent = `${a}² + ${b}² = ${c.toFixed(2)}²   →   ${a*a} + ${b*b} = ${(c*c).toFixed(0)}  ✓`;
    }

    draw();
  };

  // ──────────────────────────────────────────────────────────────
  // 4. GEO-POLYGON — Polígono regular con n lados
  // ──────────────────────────────────────────────────────────────
  V['geo-polygon'] = function(container) {
    const cv = makeCanvas(container, 380, 300);
    const ctx = cv.getContext('2d');
    const lbl = makeLabel(container, '');
    let n=6;

    makeSlider(container,'Lados (n)',3,12,6,1,v=>{n=v;draw();});

    const NAMES = {3:'Triángulo',4:'Cuadrado',5:'Pentágono',6:'Hexágono',7:'Heptágono',8:'Octógono',9:'Nonágono',10:'Decágono',11:'Hendecágono',12:'Dodecágono'};

    function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const cx=190, cy=155, r=120;

      // polygon fill
      ctx.beginPath();
      for(let i=0;i<n;i++){
        const a=(2*Math.PI*i/n)-Math.PI/2;
        const x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
        i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.fillStyle='rgba(16,185,129,0.15)'; ctx.fill();
      ctx.strokeStyle=COLORS.primary; ctx.lineWidth=2.5; ctx.stroke();

      // vertices
      for(let i=0;i<n;i++){
        const a=(2*Math.PI*i/n)-Math.PI/2;
        const x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
        ctx.beginPath(); ctx.fillStyle=COLORS.secondary; ctx.arc(x,y,5,0,Math.PI*2); ctx.fill();
      }

      const intAngle = ((n-2)*180/n).toFixed(1);
      const extAngle = (360/n).toFixed(1);
      const diagCount = n*(n-3)/2;

      ctx.fillStyle=COLORS.text; ctx.font='bold 14px Inter'; ctx.textAlign='center';
      ctx.fillText(NAMES[n]||`${n}-gono`, cx, cy);
      ctx.font='12px Inter';
      ctx.fillText(`Ángulo int: ${intAngle}°`, cx, cy+22);
      ctx.fillText(`Diagonales: ${diagCount}`, cx, cy+40);

      lbl.textContent = `Suma ángulos interiores: (${n}−2)×180 = ${(n-2)*180}° | Ángulo exterior: ${extAngle}°`;
    }

    draw();
  };

  // ──────────────────────────────────────────────────────────────
  // 5. GEO-AREA — Figura con dimensiones ajustables y área en tiempo real
  // ──────────────────────────────────────────────────────────────
  V['geo-area'] = function(container) {
    const cv = makeCanvas(container, 380, 260);
    const ctx = cv.getContext('2d');
    const lbl = makeLabel(container, '');

    let shape='rect', base=8, height=5;

    // Shape selector
    const sel = document.createElement('div');
    sel.style.cssText='display:flex;gap:8px;flex-wrap:wrap;justify-content:center;';
    const shapes=[['rect','Rectángulo'],['tri','Triángulo'],['trap','Trapecio']];
    shapes.forEach(([val,name])=>{
      const b=document.createElement('button');
      b.textContent=name; b.dataset.shape=val;
      b.style.cssText=`padding:6px 14px;border-radius:20px;border:2px solid ${COLORS.primary};
        background:${val===shape?COLORS.primary:'transparent'};color:${val===shape?'#fff':COLORS.primary};
        cursor:pointer;font-size:13px;font-family:Inter,sans-serif;`;
      b.addEventListener('click',()=>{
        shape=val; sel.querySelectorAll('button').forEach(x=>{
          x.style.background=x.dataset.shape===val?COLORS.primary:'transparent';
          x.style.color=x.dataset.shape===val?'#fff':COLORS.primary;
        }); draw();
      });
      sel.appendChild(b);
    });
    container.appendChild(sel);

    const {lbl: bLbl} = makeSlider(container,'Base (unidades)',1,16,8,1,v=>{base=v;draw();});
    const {lbl: hLbl} = makeSlider(container,'Altura (unidades)',1,12,5,1,v=>{height=v;draw();});
    let b2=4;
    const {el: b2El, lbl: b2Lbl} = makeSlider(container,'Base 2 (trapecio)',1,16,4,1,v=>{b2=v;draw();});

    function draw() {
      ctx.clearRect(0,0,cv.width,cv.height);
      const sc = Math.min(20, Math.floor(200/Math.max(base,height,b2)));
      const ox=50, oy=cv.height-30;
      let areaVal;

      ctx.fillStyle='rgba(16,185,129,0.2)'; ctx.strokeStyle=COLORS.primary; ctx.lineWidth=2.5;

      if(shape==='rect') {
        ctx.beginPath(); ctx.rect(ox, oy-height*sc, base*sc, height*sc);
        ctx.fill(); ctx.stroke();
        areaVal=base*height;
        // dimension arrows
        ctx.fillStyle=COLORS.secondary; ctx.font='13px Inter'; ctx.textAlign='center';
        ctx.fillText(`${base}`, ox+base*sc/2, oy+18);
        ctx.save(); ctx.translate(ox-18, oy-height*sc/2); ctx.rotate(-Math.PI/2);
        ctx.fillText(`${height}`, 0, 0); ctx.restore();
      } else if(shape==='tri') {
        const tx=ox+base*sc/2;
        ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ox+base*sc,oy); ctx.lineTo(tx,oy-height*sc);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        // height dashed line
        ctx.setLineDash([4,4]); ctx.strokeStyle=COLORS.accent; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(tx,oy); ctx.lineTo(tx,oy-height*sc); ctx.stroke();
        ctx.setLineDash([]);
        areaVal=(base*height)/2;
        ctx.fillStyle=COLORS.secondary; ctx.font='13px Inter'; ctx.textAlign='center';
        ctx.fillText(`${base}`, ox+base*sc/2, oy+18);
        ctx.fillText(`h=${height}`, tx+22, oy-height*sc/2);
      } else {
        // trapecio
        const offset=(base-b2)*sc/2;
        ctx.beginPath();
        ctx.moveTo(ox,oy); ctx.lineTo(ox+base*sc,oy);
        ctx.lineTo(ox+base*sc-offset,oy-height*sc); ctx.lineTo(ox+offset,oy-height*sc);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.setLineDash([4,4]); ctx.strokeStyle=COLORS.accent; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(ox+base*sc/2,oy); ctx.lineTo(ox+base*sc/2,oy-height*sc); ctx.stroke();
        ctx.setLineDash([]);
        areaVal=((base+b2)*height)/2;
        ctx.fillStyle=COLORS.secondary; ctx.font='13px Inter'; ctx.textAlign='center';
        ctx.fillText(`b1=${base}`, ox+base*sc/2, oy+18);
        ctx.fillText(`b2=${b2}`, ox+base*sc/2, oy-height*sc-10);
        ctx.fillText(`h=${height}`, ox+base*sc/2+25, oy-height*sc/2);
      }

      bLbl.textContent=`Base (unidades): ${base}`;
      hLbl.textContent=`Altura (unidades): ${height}`;
      b2Lbl.textContent=`Base 2 (trapecio): ${b2}`;
      b2El.style.display = shape==='trap' ? 'block' : 'none';

      const formulas = {rect:`${base}×${height}`,tri:`(${base}×${height})/2`,trap:`((${base}+${b2})×${height})/2`};
      lbl.textContent = `Área = ${formulas[shape]} = ${areaVal.toFixed(2)} u²`;
    }

    b2El.parentElement.style.display='none'; // hide b2 slider initially
    draw();
  };

  // ──────────────────────────────────────────────────────────────
  // 6. GEO-CIRCLE — Radio ajustable, circunferencia y área en tiempo real
  // ──────────────────────────────────────────────────────────────
  V['geo-circle'] = function(container) {
    const cv = makeCanvas(container, 380, 300);
    const ctx = cv.getContext('2d');
    const lbl = makeLabel(container, '');
    let radius=80, showSector=false, sectorAngle=90;

    makeSlider(container,'Radio (px)',20,130,80,5,v=>{radius=v;draw();});
    makeSlider(container,'Sector (°)',10,360,90,5,v=>{sectorAngle=v;draw();});

    function draw() {
      ctx.clearRect(0,0,cv.width,cv.height);
      const cx=190, cy=160;
      const r=radius;
      const PI2=Math.PI*2;
      const secRad=sectorAngle*Math.PI/180;

      // full circle
      ctx.beginPath(); ctx.arc(cx,cy,r,0,PI2);
      ctx.fillStyle='rgba(16,185,129,0.15)'; ctx.fill();
      ctx.strokeStyle=COLORS.primary; ctx.lineWidth=2.5; ctx.stroke();

      // sector highlight
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+secRad);
      ctx.closePath(); ctx.fillStyle='rgba(59,130,246,0.3)'; ctx.fill();
      ctx.strokeStyle=COLORS.secondary; ctx.lineWidth=2; ctx.stroke();

      // center point
      ctx.beginPath(); ctx.fillStyle=COLORS.text; ctx.arc(cx,cy,4,0,PI2); ctx.fill();

      // radius line
      ctx.beginPath(); ctx.strokeStyle=COLORS.accent; ctx.lineWidth=2; ctx.setLineDash([6,3]);
      ctx.moveTo(cx,cy); ctx.lineTo(cx+r,cy); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle=COLORS.accent; ctx.font='13px Inter'; ctx.textAlign='center';
      ctx.fillText(`r = ${r}px`, cx+r/2, cy-8);

      // sector angle label
      const midAngle = -Math.PI/2+secRad/2;
      ctx.fillStyle=COLORS.secondary; ctx.font='bold 13px Inter';
      ctx.fillText(`${sectorAngle}°`, cx+Math.cos(midAngle)*(r*0.55), cy+Math.sin(midAngle)*(r*0.55));

      const circ = (2*Math.PI*r).toFixed(1);
      const areaFull = (Math.PI*r*r).toFixed(1);
      const sectorArea = (Math.PI*r*r*sectorAngle/360).toFixed(1);
      const arcLen = (2*Math.PI*r*sectorAngle/360).toFixed(1);

      lbl.textContent = `C = 2π×${r} = ${circ}px | Área total = ${areaFull}px² | Sector ${sectorAngle}°: área=${sectorArea}px², arco=${arcLen}px`;
    }

    draw();
  };

  // ──────────────────────────────────────────────────────────────
  // 7. GEO-VOLUME — Sólidos 3D (proyección) con dimensiones ajustables
  // ──────────────────────────────────────────────────────────────
  V['geo-volume'] = function(container) {
    const cv = makeCanvas(container, 380, 300);
    const ctx = cv.getContext('2d');
    const lbl = makeLabel(container, '');
    let shape='cube', w=5, h=5, d=5;

    const sel = document.createElement('div');
    sel.style.cssText='display:flex;gap:6px;flex-wrap:wrap;justify-content:center;';
    const shapes=[['cube','Cubo'],['prism','Prisma'],['cyl','Cilindro'],['sphere','Esfera']];
    shapes.forEach(([val,name])=>{
      const b=document.createElement('button');
      b.textContent=name; b.dataset.shape=val;
      b.style.cssText=`padding:5px 12px;border-radius:20px;border:2px solid ${COLORS.secondary};
        background:${val===shape?COLORS.secondary:'transparent'};color:${val===shape?'#fff':COLORS.secondary};
        cursor:pointer;font-size:12px;font-family:Inter,sans-serif;`;
      b.addEventListener('click',()=>{
        shape=val; sel.querySelectorAll('button').forEach(x=>{
          x.style.background=x.dataset.shape===val?COLORS.secondary:'transparent';
          x.style.color=x.dataset.shape===val?'#fff':COLORS.secondary;
        }); draw();
      });
      sel.appendChild(b);
    });
    container.appendChild(sel);

    makeSlider(container,'Ancho',1,12,5,1,v=>{w=v;draw();});
    makeSlider(container,'Alto',1,12,5,1,v=>{h=v;draw();});
    makeSlider(container,'Prof.',1,12,5,1,v=>{d=v;draw();});

    function isoPoint(x,y,z,sc,ox,oy){
      const ax=0.866, ay=0.5;
      return { x: ox + (x-z)*ax*sc, y: oy - y*sc + (x+z)*ay*sc };
    }

    function draw() {
      ctx.clearRect(0,0,cv.width,cv.height);
      const sc=15, ox=190, oy=240;
      let vol='', formula='';

      if(shape==='cube'||shape==='prism') {
        // Draw isometric box
        const [W,H,D]=[w,h,d];
        const p=(x,y,z)=>isoPoint(x,y,z,sc,ox,oy);
        const pts={
          a:p(0,0,0),b:p(W,0,0),c:p(W,H,0),d:p(0,H,0),
          e:p(0,0,D),f:p(W,0,D),g:p(W,H,D),hh:p(0,H,D)
        };
        // bottom face
        ctx.beginPath(); [pts.a,pts.b,pts.c,pts.d].forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
        ctx.closePath(); ctx.fillStyle='rgba(59,130,246,0.2)'; ctx.fill();
        ctx.strokeStyle=COLORS.secondary; ctx.lineWidth=2; ctx.stroke();
        // top face
        ctx.beginPath(); [pts.e,pts.f,pts.g,pts.hh].forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
        ctx.closePath(); ctx.fillStyle='rgba(16,185,129,0.3)'; ctx.fill();
        ctx.strokeStyle=COLORS.primary; ctx.lineWidth=2; ctx.stroke();
        // vertical edges
        [[pts.a,pts.e],[pts.b,pts.f],[pts.c,pts.g],[pts.d,pts.hh]].forEach(([p1,p2])=>{
          ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y);
          ctx.strokeStyle=COLORS.text; ctx.lineWidth=1.5; ctx.stroke();
        });
        vol=(w*h*d).toFixed(0); formula=`${w}×${h}×${d}`;
      } else if(shape==='cyl') {
        const sc2=Math.min(16,Math.floor(100/h)), rx=w*8, ry=rx*0.35;
        const cy2=oy-h*sc2;
        // bottom ellipse
        ctx.beginPath(); ctx.ellipse(ox,oy,rx,ry,0,0,Math.PI*2);
        ctx.fillStyle='rgba(59,130,246,0.2)'; ctx.fill();
        ctx.strokeStyle=COLORS.secondary; ctx.lineWidth=2; ctx.stroke();
        // sides
        ctx.beginPath(); ctx.moveTo(ox-rx,oy); ctx.lineTo(ox-rx,cy2);
        ctx.moveTo(ox+rx,oy); ctx.lineTo(ox+rx,cy2);
        ctx.strokeStyle=COLORS.primary; ctx.lineWidth=2; ctx.stroke();
        // top ellipse
        ctx.beginPath(); ctx.ellipse(ox,cy2,rx,ry,0,0,Math.PI*2);
        ctx.fillStyle='rgba(16,185,129,0.35)'; ctx.fill();
        ctx.strokeStyle=COLORS.primary; ctx.lineWidth=2; ctx.stroke();
        vol=(Math.PI*w*w*h).toFixed(1); formula=`π×${w}²×${h}`;
      } else {
        // sphere
        const sr=Math.min(w,h)*10;
        ctx.beginPath(); ctx.arc(ox,oy-sr,sr,0,Math.PI*2);
        ctx.fillStyle='rgba(16,185,129,0.25)'; ctx.fill();
        ctx.strokeStyle=COLORS.primary; ctx.lineWidth=2.5; ctx.stroke();
        // equator ellipse
        ctx.beginPath(); ctx.ellipse(ox,oy-sr,sr,sr*0.3,0,0,Math.PI*2);
        ctx.setLineDash([4,4]); ctx.strokeStyle=COLORS.secondary; ctx.lineWidth=1.5; ctx.stroke();
        ctx.setLineDash([]);
        vol=(4/3*Math.PI*w*w*w).toFixed(1); formula=`(4/3)×π×${w}³`;
      }

      ctx.fillStyle=COLORS.text; ctx.font='bold 13px Inter'; ctx.textAlign='center';
      lbl.textContent = `Volumen = ${formula} = ${vol} u³`;
    }

    draw();
  };

  // ──────────────────────────────────────────────────────────────
  // 8. GEO-ANALYTIC — Dos puntos arrastrables en plano cartesiano
  // ──────────────────────────────────────────────────────────────
  V['geo-analytic'] = function(container) {
    const cv = makeCanvas(container, 380, 320);
    const ctx = cv.getContext('2d');
    const lbl = makeLabel(container, '');

    const GRID=30, OX=190, OY=160, RANGE=6;
    let pts=[{gx:-3,gy:2},{gx:3,gy:-2}];
    let drag=-1;

    function toCanvas(gx,gy){return{x:OX+gx*GRID, y:OY-gy*GRID};}
    function toGrid(cx,cy){return{gx:Math.round((cx-OX)/GRID),gy:Math.round((OY-cy)/GRID)};}

    function draw(){
      const tc=getThemeColors();
      ctx.clearRect(0,0,cv.width,cv.height);

      // Grid
      ctx.strokeStyle=tc.grid; ctx.lineWidth=0.8;
      for(let g=-RANGE;g<=RANGE;g++){
        const cx=OX+g*GRID, cy=OY-g*GRID;
        ctx.beginPath(); ctx.moveTo(cx,10); ctx.lineTo(cx,cv.height-10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(10,cy); ctx.lineTo(cv.width-10,cy); ctx.stroke();
      }

      // Axes
      ctx.strokeStyle=tc.text; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(10,OY); ctx.lineTo(cv.width-10,OY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(OX,10); ctx.lineTo(OX,cv.height-10); ctx.stroke();

      // Axis labels
      ctx.fillStyle=tc.text; ctx.font='11px JetBrains Mono,monospace'; ctx.textAlign='center';
      for(let g=-RANGE;g<=RANGE;g+=1){
        if(g!==0){
          ctx.fillText(g,OX+g*GRID,OY+16);
          ctx.fillText(g,OX-16,OY-g*GRID+4);
        }
      }
      ctx.font='bold 13px Inter'; ctx.fillText('x',cv.width-12,OY-6); ctx.fillText('y',OX+8,12);

      // Segment line
      const [P,Q]=[pts[0],pts[1]].map(p=>toCanvas(p.gx,p.gy));
      ctx.beginPath(); ctx.strokeStyle=COLORS.primary; ctx.lineWidth=2.5; ctx.setLineDash([6,4]);
      ctx.moveTo(P.x,P.y); ctx.lineTo(Q.x,Q.y); ctx.stroke(); ctx.setLineDash([]);

      // Midpoint
      const mx=(pts[0].gx+pts[1].gx)/2, my=(pts[0].gy+pts[1].gy)/2;
      const mC=toCanvas(mx,my);
      ctx.beginPath(); ctx.fillStyle=COLORS.accent; ctx.arc(mC.x,mC.y,6,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=COLORS.accent; ctx.font='11px Inter'; ctx.textAlign='left';
      ctx.fillText(`M(${mx},${my})`,mC.x+8,mC.y-4);

      // Points
      ['A','B'].forEach((lp,i)=>{
        const c=toCanvas(pts[i].gx,pts[i].gy);
        ctx.beginPath(); ctx.fillStyle=i===drag?COLORS.danger:COLORS.secondary; ctx.arc(c.x,c.y,9,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='#fff'; ctx.font='bold 11px Inter'; ctx.textAlign='center';
        ctx.fillText(lp,c.x,c.y+4);
        ctx.fillStyle=COLORS.text; ctx.font='11px Inter';
        const offY=pts[i].gy>0?-16:16;
        ctx.fillText(`(${pts[i].gx},${pts[i].gy})`,c.x,c.y+offY);
      });

      // Calculations
      const dx=pts[1].gx-pts[0].gx, dy=pts[1].gy-pts[0].gy;
      const dist=Math.sqrt(dx*dx+dy*dy).toFixed(2);
      const slope=dx!==0?(dy/dx).toFixed(2):'∞';
      lbl.textContent = `d(A,B)=√(${dx}²+${dy}²)=${dist} | M=(${mx},${my}) | m=${slope}`;
    }

    function nearPt(e){
      const rect=cv.getBoundingClientRect();
      const sx=cv.width/rect.width, sy=cv.height/rect.height;
      const mx=((e.clientX??e.touches[0].clientX)-rect.left)*sx;
      const my=((e.clientY??e.touches[0].clientY)-rect.top)*sy;
      for(let i=0;i<pts.length;i++){
        const c=toCanvas(pts[i].gx,pts[i].gy);
        if(Math.hypot(c.x-mx,c.y-my)<18) return i;
      }
      return -1;
    }

    cv.addEventListener('pointerdown',e=>{drag=nearPt(e);if(drag>=0){cv.setPointerCapture(e.pointerId);}});
    cv.addEventListener('pointermove',e=>{
      if(drag<0) return;
      const rect=cv.getBoundingClientRect();
      const sx=cv.width/rect.width, sy=cv.height/rect.height;
      const cx=((e.clientX??e.touches[0].clientX)-rect.left)*sx;
      const cy=((e.clientY??e.touches[0].clientY)-rect.top)*sy;
      const g=toGrid(cx,cy);
      pts[drag].gx=Math.max(-RANGE,Math.min(RANGE,g.gx));
      pts[drag].gy=Math.max(-RANGE,Math.min(RANGE,g.gy));
      draw();
    });
    cv.addEventListener('pointerup',()=>{drag=-1;});

    draw();
  };

  // ── Alias fallbacks for visual types used in content-geometria.js
  V['geo-congruencia'] = V['geo-triangle'];
  V['geo-semejanza']   = V['geo-triangle'];

  console.log('[MM] visual-geo.js cargado:', Object.keys(V).length, 'visualizaciones');
})();
