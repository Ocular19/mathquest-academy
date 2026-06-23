/* ══════════════════════════════════════════════════════════════
   VISUAL-FUNCIONES-CALCULO.JS
   Graficador interactivo con sliders y tablas de valores
   para Funciones y Cálculo. Agrega a window.MM_GEO_VIS.
   ══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if(!window.MM_GEO_VIS) window.MM_GEO_VIS={};
  const V=window.MM_GEO_VIS;
  const C={red:'#EF4444',blue:'#3B82F6',green:'#10B981',amber:'#F59E0B',purple:'#8B5CF6',cyan:'#06B6D4'};
  const PI=Math.PI;

  function getTC(){
    const d=document.documentElement.getAttribute('data-theme')==='dark';
    return{text:d?'#E5E7EB':'#1F2937',grid:d?'#374151':'#D1D5DB',
           bg:d?'#111827':'#FFFFFF',panel:d?'#1F2937':'#F9FAFB',sub:d?'#6B7280':'#9CA3AF'};
  }
  function r3(x){return Math.round(x*1000)/1000;}
  function r2(x){return Math.round(x*100)/100;}

  function makeContainer(container){
    container.style.cssText='display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px;';
    return container;
  }
  function makeCanvas(container,w,h){
    const cv=document.createElement('canvas');
    cv.width=w; cv.height=h;
    cv.style.cssText=`max-width:100%;border-radius:10px;touch-action:none;`;
    container.appendChild(cv);
    return cv;
  }
  function makeSlider(container,label,min,max,val,step,onCh){
    const wrap=document.createElement('div');
    wrap.style.cssText='display:flex;align-items:center;gap:8px;width:100%;max-width:440px;';
    const lbl=document.createElement('span');
    lbl.style.cssText='font-size:12px;color:var(--text-2);min-width:120px;font-family:JetBrains Mono,monospace;';
    lbl.textContent=`${label}: ${val}`;
    const sl=document.createElement('input');
    sl.type='range'; sl.min=min; sl.max=max; sl.value=val; sl.step=step;
    sl.style.cssText='flex:1;accent-color:'+C.red;
    sl.addEventListener('input',()=>{lbl.textContent=`${label}: ${Number(sl.value)}`; onCh(Number(sl.value));});
    wrap.appendChild(lbl); wrap.appendChild(sl);
    container.appendChild(wrap);
    return{sl,lbl};
  }
  function makeInfoRow(container){
    const d=document.createElement('div');
    d.style.cssText='font-size:12px;color:var(--text-2);text-align:center;max-width:440px;line-height:1.7;font-family:JetBrains Mono,monospace;';
    container.appendChild(d);
    return d;
  }
  function makeTable(container,headers,rows){
    const t=document.createElement('table');
    t.style.cssText='border-collapse:collapse;font-size:12px;font-family:JetBrains Mono,monospace;';
    const thead=document.createElement('thead');
    const hrow=document.createElement('tr');
    headers.forEach(h=>{const th=document.createElement('th');th.textContent=h;
      th.style.cssText='padding:4px 10px;border-bottom:2px solid var(--border);color:var(--text-1);text-align:right;';hrow.appendChild(th);});
    thead.appendChild(hrow); t.appendChild(thead);
    const tbody=document.createElement('tbody');
    rows.forEach(row=>{const tr=document.createElement('tr');
      row.forEach((v,i)=>{const td=document.createElement('td');td.textContent=v;
        td.style.cssText=`padding:3px 10px;border-bottom:1px solid var(--border);color:${i===0?'var(--text-2)':C.red};text-align:right;`;
        tr.appendChild(td);});tbody.appendChild(tr);});
    t.appendChild(tbody); container.appendChild(t); return t;
  }

  /* ─────── Grapher helper: draws axes + grid ─────── */
  function drawAxes(ctx,W,H,ox,oy,scX,scY,tc){
    ctx.strokeStyle=tc.grid; ctx.lineWidth=0.8;
    // vertical gridlines
    for(let gx=-10;gx<=10;gx++){
      const px=ox+gx*scX;
      if(px<0||px>W) continue;
      ctx.beginPath(); ctx.moveTo(px,0); ctx.lineTo(px,H); ctx.stroke();
      if(gx!==0){ctx.fillStyle=tc.sub;ctx.font='10px Inter';ctx.textAlign='center';
        ctx.fillText(gx,px,oy+14);}
    }
    // horizontal gridlines
    for(let gy=-10;gy<=10;gy++){
      const py=oy-gy*scY;
      if(py<0||py>H) continue;
      ctx.beginPath(); ctx.moveTo(0,py); ctx.lineTo(W,py); ctx.stroke();
      if(gy!==0){ctx.fillStyle=tc.sub;ctx.font='10px Inter';ctx.textAlign='right';
        ctx.fillText(gy,ox-4,py+4);}
    }
    // axes
    ctx.strokeStyle=tc.text; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(0,oy); ctx.lineTo(W,oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox,0); ctx.lineTo(ox,H); ctx.stroke();
    ctx.fillStyle=tc.text; ctx.font='11px Inter';
    ctx.fillText('x',W-12,oy-6); ctx.fillText('y',ox+6,12);
  }
  function plotFn(ctx,fn,W,ox,oy,scX,scY,color,lw=2){
    ctx.strokeStyle=color; ctx.lineWidth=lw;
    ctx.beginPath(); let first=true;
    for(let px=0;px<=W;px+=0.8){
      const x=(px-ox)/scX;
      try{
        const y=fn(x);
        if(!isFinite(y)||Math.abs(y)>1e6){first=true;continue;}
        const py=oy-y*scY;
        if(first){ctx.moveTo(px,py);first=false;}else ctx.lineTo(px,py);
      }catch(e){first=true;}
    }
    ctx.stroke();
  }
  function tableRows(fn,xs){return xs.map(x=>{try{const y=fn(x);return[x,isFinite(y)?r3(y):'—'];}catch{return[x,'—'];}});}

  /* ══════════════════════════════════════════════════
     1. func-linear — y = mx + b (lin + afín)
  ════════════════════════════════════════════════════ */
  V['func-linear']=function(container){
    makeContainer(container);
    const cv=makeCanvas(container,420,260);
    const ctx=cv.getContext('2d');
    const info=makeInfoRow(container);
    let m=1, b=0;

    const tbl=document.createElement('div');
    tbl.style.cssText='overflow:hidden;';
    container.appendChild(tbl);

    makeSlider(container,'Pendiente m',-5,5,1,0.5,v=>{m=v;draw();});
    makeSlider(container,'Intercepto b',-5,5,0,0.5,v=>{b=v;draw();});

    const W=cv.width,H=cv.height,ox=W/2,oy=H/2,scX=30,scY=30;

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,W,H);
      drawAxes(ctx,W,H,ox,oy,scX,scY,tc);
      const fn=x=>m*x+b;
      plotFn(ctx,fn,W,ox,oy,scX,scY,C.red);

      // Intercepts
      if(m!==0){
        const xi=-b/m, xi_px=ox+xi*scX, oy_px=oy;
        ctx.beginPath(); ctx.fillStyle=C.blue; ctx.arc(xi_px,oy_px,5,0,2*PI); ctx.fill();
        ctx.fillStyle=C.blue; ctx.font='11px Inter'; ctx.textAlign='center';
        ctx.fillText(`(${r2(xi)},0)`,xi_px,oy_px-10);
      }
      const yi_px=oy-b*scY;
      ctx.beginPath(); ctx.fillStyle=C.green; ctx.arc(ox,yi_px,5,0,2*PI); ctx.fill();
      ctx.fillStyle=C.green; ctx.font='11px Inter'; ctx.textAlign='left';
      ctx.fillText(`(0,${r2(b)})`,ox+8,yi_px-4);

      // equation
      const eq=`f(x) = ${m}x ${b>=0?'+':'-'} ${Math.abs(b)}`;
      ctx.fillStyle=C.red; ctx.font='bold 13px JetBrains Mono'; ctx.textAlign='left';
      ctx.fillText(eq,8,18);

      // info
      const cero=m!==0?r2(-b/m):'∞';
      info.textContent=`Pendiente: ${m} | Intercepto y: ${b} | Cero (raíz): x=${cero} | ${m>0?'↑ Creciente':m<0?'↓ Decreciente':'→ Constante'}`;

      // table
      tbl.innerHTML='';
      const xs=[-2,-1,0,1,2,3];
      makeTable(tbl,['x','f(x)'],tableRows(fn,xs));
    }
    draw();
  };

  /* ══════════════════════════════════════════════════
     2. func-quadratic — y = ax² + bx + c
  ════════════════════════════════════════════════════ */
  V['func-quadratic']=function(container){
    makeContainer(container);
    const cv=makeCanvas(container,420,260);
    const ctx=cv.getContext('2d');
    const info=makeInfoRow(container);
    let a=1,b=-2,c=-3;

    const tbl=document.createElement('div');
    container.appendChild(tbl);

    makeSlider(container,'a (apertura)',-3,3,1,0.5,v=>{a=v||0.01;draw();});
    makeSlider(container,'b (despl. horiz.)',-6,6,-2,1,v=>{b=v;draw();});
    makeSlider(container,'c (intercepto y)',-6,6,-3,1,v=>{c=v;draw();});

    const W=cv.width,H=cv.height,ox=W/2,oy=H/2,scX=28,scY=22;

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,W,H);
      drawAxes(ctx,W,H,ox,oy,scX,scY,tc);
      const fn=x=>a*x*x+b*x+c;
      plotFn(ctx,fn,W,ox,oy,scX,scY,C.red);

      // Vertex
      const h=-b/(2*a), k=fn(h);
      const vx=ox+h*scX, vy=oy-k*scY;
      ctx.beginPath(); ctx.fillStyle=C.amber; ctx.arc(vx,vy,6,0,2*PI); ctx.fill();
      ctx.fillStyle=C.amber; ctx.font='11px Inter'; ctx.textAlign='center';
      ctx.fillText(`V(${r2(h)},${r2(k)})`,vx,vy-10);

      // Axis of symmetry
      ctx.strokeStyle=C.amber; ctx.lineWidth=1.2; ctx.setLineDash([5,4]);
      ctx.beginPath(); ctx.moveTo(vx,0); ctx.lineTo(vx,H); ctx.stroke();
      ctx.setLineDash([]);

      // Roots (if real)
      const D=b*b-4*a*c;
      if(D>=0){
        const r1=(-b-Math.sqrt(D))/(2*a), r2v=(-b+Math.sqrt(D))/(2*a);
        [r1,r2v].forEach(r=>{
          const rx=ox+r*scX;
          ctx.beginPath(); ctx.fillStyle=C.blue; ctx.arc(rx,oy,5,0,2*PI); ctx.fill();
          ctx.fillStyle=C.blue; ctx.font='10px Inter'; ctx.textAlign='center';
          ctx.fillText(`(${r2(r)},0)`,rx,oy+16);
        });
      }

      // Equation
      const bStr=b>=0?`+${b}`:`${b}`, cStr=c>=0?`+${c}`:`${c}`;
      ctx.fillStyle=C.red; ctx.font='bold 12px JetBrains Mono'; ctx.textAlign='left';
      ctx.fillText(`f(x)=${a}x²${bStr}x${cStr}`,6,16);

      const tipo=a>0?'↑ Mínimo':'↓ Máximo';
      const rootInfo=D>0?`Raíces: ${r2((-b-Math.sqrt(D))/(2*a))} y ${r2((-b+Math.sqrt(D))/(2*a))}`:D===0?`Raíz doble: ${r2(-b/(2*a))}`:'Sin raíces reales';
      info.textContent=`Vértice:(${r2(h)},${r2(k)}) | Δ=${r2(D)} | ${rootInfo} | ${tipo}`;

      tbl.innerHTML='';
      const xs=[-3,-2,-1,0,1,2,3];
      makeTable(tbl,['x','f(x)'],tableRows(fn,xs));
    }
    draw();
  };

  /* ══════════════════════════════════════════════════
     3. func-exponential — y = a · bˣ
  ════════════════════════════════════════════════════ */
  V['func-exponential']=function(container){
    makeContainer(container);
    const cv=makeCanvas(container,420,260);
    const ctx=cv.getContext('2d');
    const info=makeInfoRow(container);
    let base=2, amp=1;

    const tbl=document.createElement('div');
    container.appendChild(tbl);

    makeSlider(container,'Base b',0.1,4,2,0.1,v=>{base=v===1?1.001:v;draw();});
    makeSlider(container,'Amplitud a',-3,5,1,0.5,v=>{amp=v;draw();});

    const W=cv.width,H=cv.height,ox=W/2+60,oy=H/2+60,scX=35,scY=20;

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,W,H);
      drawAxes(ctx,W,H,ox,oy,scX,scY,tc);

      // Asymptote
      ctx.strokeStyle=C.amber; ctx.lineWidth=1.5; ctx.setLineDash([6,4]);
      ctx.beginPath(); ctx.moveTo(0,oy); ctx.lineTo(W,oy); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle=C.amber; ctx.font='10px Inter';
      ctx.fillText('y = 0 (asíntota)',4,oy-6);

      const fn=x=>amp*Math.pow(base,x);
      plotFn(ctx,fn,W,ox,oy,scX,scY,C.red);

      // y-intercept
      const yi=amp;
      ctx.beginPath(); ctx.fillStyle=C.green; ctx.arc(ox,oy-yi*scY,5,0,2*PI); ctx.fill();
      ctx.fillStyle=C.green; ctx.font='10px Inter'; ctx.textAlign='left';
      ctx.fillText(`(0,${r2(yi)})`,ox+6,oy-yi*scY-4);

      const tipo=base>1?'Crecimiento exponencial':'Decaimiento exponencial';
      ctx.fillStyle=C.red; ctx.font='bold 12px JetBrains Mono'; ctx.textAlign='left';
      ctx.fillText(`f(x)=${amp}·${r2(base)}ˣ`,6,16);

      info.textContent=`Valor inicial f(0)=${r2(amp)} | Base: ${r2(base)} | ${tipo} | Asíntota: y=0`;

      tbl.innerHTML='';
      const xs=[-3,-2,-1,0,1,2,3];
      makeTable(tbl,['x','f(x)'],tableRows(fn,xs));
    }
    draw();
  };

  /* ══════════════════════════════════════════════════
     4. func-logarithmic — y = log_b(x)
  ════════════════════════════════════════════════════ */
  V['func-logarithmic']=function(container){
    makeContainer(container);
    const cv=makeCanvas(container,420,260);
    const ctx=cv.getContext('2d');
    const info=makeInfoRow(container);
    let base=2;

    const tbl=document.createElement('div');
    container.appendChild(tbl);

    makeSlider(container,'Base b',1.1,10,2,0.1,v=>{base=v;draw();});

    const W=cv.width,H=cv.height,ox=100,oy=H/2,scX=40,scY=35;

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,W,H);
      drawAxes(ctx,W,H,ox,oy,scX,scY,tc);

      // Asymptote x=0
      ctx.strokeStyle=C.amber; ctx.lineWidth=1.5; ctx.setLineDash([6,4]);
      ctx.beginPath(); ctx.moveTo(ox,0); ctx.lineTo(ox,H); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle=C.amber; ctx.font='10px Inter'; ctx.textAlign='left';
      ctx.fillText('x=0 (asíntota)',ox+4,16);

      const fn=x=>x>0?Math.log(x)/Math.log(base):-999;
      plotFn(ctx,fn,W,ox,oy,scX,scY,C.red);

      // Key point (1,0)
      ctx.beginPath(); ctx.fillStyle=C.blue; ctx.arc(ox+1*scX,oy,5,0,2*PI); ctx.fill();
      ctx.fillStyle=C.blue; ctx.font='10px Inter'; ctx.textAlign='left';
      ctx.fillText('(1,0)',ox+1*scX+6,oy-8);

      // Key point (b,1)
      const bpx=ox+base*scX, bpy=oy-1*scY;
      if(bpx<W){
        ctx.beginPath(); ctx.fillStyle=C.green; ctx.arc(bpx,bpy,5,0,2*PI); ctx.fill();
        ctx.fillStyle=C.green; ctx.font='10px Inter'; ctx.textAlign='left';
        ctx.fillText(`(${r2(base)},1)`,bpx+6,bpy-4);
      }

      ctx.fillStyle=C.red; ctx.font='bold 12px JetBrains Mono'; ctx.textAlign='left';
      ctx.fillText(`f(x)=log${r2(base)}(x)`,6,16);

      const creciente=base>1;
      info.textContent=`log${r2(base)}(1)=0 | log${r2(base)}(${r2(base)})=1 | Dominio: x>0 | ${creciente?'↑ Creciente':'↓ Decreciente'}`;

      tbl.innerHTML='';
      const xs=[0.25,0.5,1,2,4,8];
      makeTable(tbl,['x','f(x)'],tableRows(fn,xs));
    }
    draw();
  };

  /* ══════════════════════════════════════════════════
     5. func-rational — y = k / (x - a) + b
  ════════════════════════════════════════════════════ */
  V['func-rational']=function(container){
    makeContainer(container);
    const cv=makeCanvas(container,420,260);
    const ctx=cv.getContext('2d');
    const info=makeInfoRow(container);
    let k=2, a=1, bv=0;

    const tbl=document.createElement('div');
    container.appendChild(tbl);

    makeSlider(container,'Numerador k',-4,4,2,0.5,v=>{k=v||0.01;draw();});
    makeSlider(container,'Asíntota vert. a',-3,3,1,0.5,v=>{a=v;draw();});
    makeSlider(container,'Asíntota horiz. b',-3,3,0,0.5,v=>{bv=v;draw();});

    const W=cv.width,H=cv.height,ox=W/2,oy=H/2,scX=30,scY=30;

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,W,H);
      drawAxes(ctx,W,H,ox,oy,scX,scY,tc);

      // Asymptotes
      const av_px=ox+a*scX, ah_py=oy-bv*scY;
      ctx.strokeStyle=C.amber; ctx.lineWidth=1.5; ctx.setLineDash([6,4]);
      ctx.beginPath(); ctx.moveTo(av_px,0); ctx.lineTo(av_px,H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,ah_py); ctx.lineTo(W,ah_py); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle=C.amber; ctx.font='10px Inter';
      ctx.fillText(`x=${r2(a)}`,av_px+4,16);
      ctx.fillText(`y=${r2(bv)}`,W-50,ah_py-6);

      const fn=x=>{const d=x-a;if(Math.abs(d)<0.01)return null;return k/d+bv;};
      plotFn(ctx,fn,W,ox,oy,scX,scY,C.red);

      ctx.fillStyle=C.red; ctx.font='bold 12px JetBrains Mono'; ctx.textAlign='left';
      ctx.fillText(`f(x)=${k}/(x-${a})+${bv}`,6,16);

      info.textContent=`Asíntota vertical: x=${r2(a)} | Asíntota horizontal: y=${r2(bv)} | Dominio: x≠${r2(a)}`;

      tbl.innerHTML='';
      const xs=[-2,-1,0,2,3,4,5].filter(x=>Math.abs(x-a)>0.3);
      makeTable(tbl,['x','f(x)'],tableRows(fn,xs));
    }
    draw();
  };

  /* ══════════════════════════════════════════════════
     6. calc-limit — Animación de aproximación al límite
  ════════════════════════════════════════════════════ */
  V['calc-limit']=function(container){
    makeContainer(container);
    const cv=makeCanvas(container,420,260);
    const ctx=cv.getContext('2d');
    const info=makeInfoRow(container);
    let xApproach=1.5; // acercándose al límite en x=2

    const a=2; // punto al que tendemos
    const fn=x=>(x*x-4)/(x-2); // (x²-4)/(x-2) → (x+2), límite en x=2 es 4
    const fnSimpl=x=>x+2;

    makeSlider(container,'Acercar x a 2',0,3.9,1.5,0.01,v=>{xApproach=v;draw();});

    const W=cv.width,H=cv.height,ox=W/2-40,oy=H/2+60,scX=60,scY=25;

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,W,H);
      drawAxes(ctx,W,H,ox,oy,scX,scY,tc);

      // Draw the simplified fn (line with hole)
      ctx.strokeStyle=C.red; ctx.lineWidth=2.5;
      ctx.beginPath(); let first=true;
      for(let px=0;px<=W;px+=1){
        const x=(px-ox)/scX;
        const y=fnSimpl(x);
        const py=oy-y*scY;
        if(Math.abs(x-a)<0.05){first=true;continue;}
        if(first){ctx.moveTo(px,py);first=false;}else ctx.lineTo(px,py);
      }
      ctx.stroke();

      // Hole at (2,4)
      const hx=ox+a*scX, hy=oy-fnSimpl(a)*scY;
      ctx.beginPath(); ctx.strokeStyle=C.red; ctx.lineWidth=2;
      ctx.arc(hx,hy,5,0,2*PI); ctx.stroke();
      ctx.fillStyle=tc.bg; ctx.fill();

      // Moving point
      const px=ox+xApproach*scX;
      const fy=fnSimpl(xApproach);
      const py=oy-fy*scY;
      ctx.beginPath(); ctx.fillStyle=C.blue; ctx.arc(px,py,6,0,2*PI); ctx.fill();

      // Vertical dashed line from point to x-axis
      ctx.strokeStyle=C.blue; ctx.lineWidth=1.2; ctx.setLineDash([4,3]);
      ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(px,oy); ctx.stroke();
      ctx.strokeStyle=C.green; ctx.beginPath(); ctx.moveTo(0,py); ctx.lineTo(px,py); ctx.stroke();
      ctx.setLineDash([]);

      // Labels
      ctx.fillStyle=C.blue; ctx.font='11px JetBrains Mono'; ctx.textAlign='center';
      ctx.fillText(`x=${r3(xApproach)}`,px,oy+16);
      ctx.fillStyle=C.green; ctx.textAlign='right';
      ctx.fillText(`f(x)=${r3(fy)}`,ox-4,py+4);

      ctx.fillStyle=C.red; ctx.font='bold 12px JetBrains Mono'; ctx.textAlign='left';
      ctx.fillText('f(x)=(x²-4)/(x-2)',6,16);
      ctx.fillStyle=C.amber; ctx.font='bold 12px JetBrains Mono';
      ctx.fillText('lím x→2 = 4',6,32);

      const dist=r3(Math.abs(xApproach-a));
      info.textContent=`x=${r3(xApproach)} → f(x)=${r3(fy)} | Distancia a x=2: ${dist} | límite = 4`;
    }
    draw();
  };

  // Alias continuidad usa la misma base visual
  V['calc-continuity']=V['calc-limit'];

  /* ══════════════════════════════════════════════════
     7. calc-derivative — Recta tangente deslizante
  ════════════════════════════════════════════════════ */
  V['calc-derivative']=function(container){
    makeContainer(container);
    const cv=makeCanvas(container,420,260);
    const ctx=cv.getContext('2d');
    const info=makeInfoRow(container);
    let x0=1, a=1, b=0, c=-3; // f(x)=ax²+bx+c

    const tbl=document.createElement('div');
    container.appendChild(tbl);

    makeSlider(container,'Punto x₀',-4,4,1,0.1,v=>{x0=v;draw();});
    makeSlider(container,'a (parábola)',-2,2,1,0.5,v=>{a=v||0.1;draw();});
    makeSlider(container,'b (parábola)',-4,4,0,1,v=>{b=v;draw();});

    const W=cv.width,H=cv.height,ox=W/2,oy=H/2+40,scX=35,scY=20;
    const fn=x=>a*x*x+b*x+c;
    const dfn=x=>2*a*x+b;

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,W,H);
      drawAxes(ctx,W,H,ox,oy,scX,scY,tc);

      // Parabola
      plotFn(ctx,fn,W,ox,oy,scX,scY,C.blue);

      // Tangent line at x0
      const m=dfn(x0), y0=fn(x0);
      const tangent=x=>m*(x-x0)+y0;
      ctx.strokeStyle=C.red; ctx.lineWidth=2;
      ctx.setLineDash([6,3]);
      plotFn(ctx,tangent,W,ox,oy,scX,scY,C.red,2);
      ctx.setLineDash([]);

      // Point of tangency
      const px=ox+x0*scX, py=oy-y0*scY;
      ctx.beginPath(); ctx.fillStyle=C.red; ctx.arc(px,py,6,0,2*PI); ctx.fill();
      ctx.fillStyle=C.red; ctx.font='11px JetBrains Mono'; ctx.textAlign='left';
      ctx.fillText(`(${r2(x0)},${r2(y0)})`,px+8,py-6);

      // Equations
      ctx.fillStyle=C.blue; ctx.font='bold 11px JetBrains Mono'; ctx.textAlign='left';
      const bStr=b>=0?`+${b}`:`${b}`;
      ctx.fillText(`f(x)=${a}x²${bStr}x${c>=0?`+${c}`:c}`,6,16);
      ctx.fillStyle=C.red;
      ctx.fillText(`f'(${r2(x0)})=${r2(m)}`,6,32);

      const signM=m>0?'↑ Creciente':m<0?'↓ Decreciente':'→ Estacionario';
      info.textContent=`Tangente en x=${r2(x0)}: pendiente=${r2(m)}, punto(${r2(x0)},${r2(y0)}) | ${signM}`;

      tbl.innerHTML='';
      const xs=[-3,-2,-1,0,1,2,3];
      makeTable(tbl,['x','f(x)','f\'(x)'],xs.map(x=>[x,r2(fn(x)),r2(dfn(x))]));
    }
    draw();
  };

  V['calc-derivative-apps']=V['calc-derivative'];

  /* ══════════════════════════════════════════════════
     8. calc-integral — Sumas de Riemann interactivas
  ════════════════════════════════════════════════════ */
  V['calc-integral']=function(container){
    makeContainer(container);
    const cv=makeCanvas(container,420,260);
    const ctx=cv.getContext('2d');
    const info=makeInfoRow(container);
    let n=4, aLim=0, bLim=3, useQuad=true;

    const tbl=document.createElement('div');
    container.appendChild(tbl);

    makeSlider(container,'Número de barras n',1,50,4,1,v=>{n=v;draw();});
    makeSlider(container,'Límite inferior a',-3,3,0,0.5,v=>{aLim=v;if(aLim>=bLim)bLim=aLim+0.5;draw();});
    makeSlider(container,'Límite superior b',0,6,3,0.5,v=>{bLim=v;if(bLim<=aLim)aLim=bLim-0.5;draw();});

    // Toggle función
    const btnRow=document.createElement('div');
    btnRow.style.cssText='display:flex;gap:8px;margin:4px 0;';
    ['f(x)=x²','f(x)=x'].forEach((label,i)=>{
      const b=document.createElement('button');
      b.textContent=label;
      b.style.cssText=`padding:4px 12px;border-radius:16px;border:2px solid ${i===0?C.red:C.blue};
        background:${i===0?C.red:'transparent'};color:${i===0?'#fff':C.blue};cursor:pointer;font-size:12px;`;
      b.addEventListener('click',()=>{useQuad=i===0;
        btnRow.querySelectorAll('button').forEach((x,j)=>{
          const col=j===0?C.red:C.blue;
          x.style.background=j===i?col:'transparent';
          x.style.color=j===i?'#fff':col;
        });draw();});
      btnRow.appendChild(b);
    });
    container.appendChild(btnRow);

    const W=cv.width,H=cv.height,ox=50,oy=H-30,scX=50,scY=25;
    const fn=x=>useQuad?x*x:x;
    const exactArea=useQuad?(Math.pow(bLim,3)-Math.pow(aLim,3))/3:(bLim*bLim-aLim*aLim)/2;

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,W,H);

      // Axes
      ctx.strokeStyle=tc.grid; ctx.lineWidth=0.8;
      for(let gx=0;gx<=8;gx++){ctx.beginPath();ctx.moveTo(ox+gx*scX,0);ctx.lineTo(ox+gx*scX,H);ctx.stroke();}
      for(let gy=0;gy<=8;gy++){ctx.beginPath();ctx.moveTo(0,oy-gy*scY);ctx.lineTo(W,oy-gy*scY);ctx.stroke();}
      ctx.strokeStyle=tc.text; ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(0,oy);ctx.lineTo(W,oy);ctx.stroke();
      ctx.beginPath();ctx.moveTo(ox,0);ctx.lineTo(ox,H);ctx.stroke();
      for(let gx=0;gx<=6;gx++){ctx.fillStyle=tc.sub;ctx.font='10px Inter';ctx.textAlign='center';
        ctx.fillText(gx,ox+gx*scX,oy+14);}
      for(let gy=1;gy<=8;gy++){ctx.fillStyle=tc.sub;ctx.font='10px Inter';ctx.textAlign='right';
        ctx.fillText(gy,ox-4,oy-gy*scY+4);}

      // Riemann rectangles
      const dx=(bLim-aLim)/n;
      let sumArea=0;
      for(let i=0;i<n;i++){
        const xi=aLim+i*dx;
        const fxi=fn(xi+dx/2); // midpoint rule
        sumArea+=fxi*dx;
        const rx=ox+xi*scX, ry=oy-Math.max(fxi,0)*scY;
        const rw=dx*scX, rh=Math.abs(fxi)*scY;
        ctx.fillStyle='rgba(239,68,68,0.25)';
        ctx.fillRect(rx,fxi>=0?ry:oy,rw,rh);
        ctx.strokeStyle=C.red; ctx.lineWidth=1;
        ctx.strokeRect(rx,fxi>=0?ry:oy,rw,rh);
      }

      // Exact curve (on top)
      ctx.strokeStyle=C.blue; ctx.lineWidth=2.5;
      ctx.beginPath(); let first=true;
      for(let px=0;px<=W;px+=1){
        const x=(px-ox)/scX;
        const y=fn(x); const py=oy-y*scY;
        if(py<0||py>H){first=true;continue;}
        first?ctx.moveTo(px,py):ctx.lineTo(px,py);first=false;
      }
      ctx.stroke();

      const exact=(useQuad?(Math.pow(bLim,3)-Math.pow(aLim,3))/3:(bLim*bLim-aLim*aLim)/2);
      const err=Math.abs(sumArea-exact)/Math.abs(exact||1)*100;

      ctx.fillStyle=C.red; ctx.font='bold 11px JetBrains Mono'; ctx.textAlign='left';
      ctx.fillText(`f(x)=${useQuad?'x²':'x'}`,6,16);
      ctx.fillStyle=C.blue; ctx.font='11px JetBrains Mono';
      ctx.fillText(`Área exacta=${r2(exact)}`,6,30);
      ctx.fillStyle=C.red;
      ctx.fillText(`Riemann≈${r2(sumArea)}`,6,44);

      info.textContent=`n=${n} barras | Suma Riemann≈${r2(sumArea)} | Área exacta=${r2(exact)} | Error=${r2(err)}%`;

      tbl.innerHTML='';
      const xs=[0,1,2,3,4,5].filter(x=>x>=aLim-0.5&&x<=bLim+0.5);
      makeTable(tbl,['x','f(x)'],tableRows(fn,xs));
    }
    draw();
  };

  V['calc-integral-apps']=V['calc-integral'];

  console.log('[MM] visual-funciones-calculo.js cargado:',
    Object.keys(V).filter(k=>k.startsWith('func-')||k.startsWith('calc-')).length,'visualizaciones');
})();
