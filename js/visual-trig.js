/* ═══════════════════════════════════════════════════════════════
   VISUAL-TRIG.JS — Visualizaciones interactivas de Trigonometría
   Agrega al registro window.MM_GEO_VIS (ya parcheado en router.js)
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if(!window.MM_GEO_VIS) window.MM_GEO_VIS={};
  const V=window.MM_GEO_VIS;
  const PI=Math.PI;

  const C={
    red:'#EF4444',blue:'#3B82F6',green:'#10B981',
    amber:'#F59E0B',purple:'#8B5CF6',
  };

  function getTC(){
    const dark=document.documentElement.getAttribute('data-theme')==='dark';
    return{text:dark?'#E5E7EB':'#1F2937',grid:dark?'#374151':'#D1D5DB',panel:dark?'#1F2937':'#FFFFFF'};
  }

  function makeCanvas(container,w,h){
    container.style.cssText='display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px;';
    const cv=document.createElement('canvas');
    cv.width=w;cv.height=h;
    cv.style.cssText=`max-width:100%;border-radius:12px;touch-action:none;
      box-shadow:0 2px 12px rgba(0,0,0,.1);background:${getTC().panel}`;
    container.appendChild(cv);
    return cv;
  }
  function makeLabel(container,text){
    const d=document.createElement('div');
    d.style.cssText='font-size:13px;color:var(--text-2);text-align:center;max-width:420px;line-height:1.6;font-family:JetBrains Mono,monospace;';
    d.textContent=text;
    container.appendChild(d);
    return d;
  }
  function makeSlider(container,label,min,max,val,step,onChange){
    const wrap=document.createElement('div');
    wrap.style.cssText='display:flex;align-items:center;gap:8px;width:100%;max-width:400px;';
    const lbl=document.createElement('span');
    lbl.style.cssText='font-size:13px;color:var(--text-2);min-width:130px;';
    lbl.textContent=label+': '+val;
    const sl=document.createElement('input');
    sl.type='range';sl.min=min;sl.max=max;sl.value=val;sl.step=step;
    sl.style.cssText='flex:1;accent-color:'+C.red;
    sl.addEventListener('input',()=>{lbl.textContent=label+': '+sl.value;onChange(+sl.value);});
    wrap.appendChild(lbl);wrap.appendChild(sl);
    container.appendChild(wrap);
    return{el:sl,lbl};
  }

  function r3(x){return Math.round(x*1000)/1000;}
  function r2(x){return Math.round(x*100)/100;}

  // ──────────────────────────────────────────────────────────
  // 1. TRIG-RIGHT-TRIANGLE
  //    Triángulo rectángulo interactivo — slider de ángulo
  //    Muestra sen, cos, tan en tiempo real
  // ──────────────────────────────────────────────────────────
  V['trig-right-triangle']=function(container){
    const cv=makeCanvas(container,400,300);
    const ctx=cv.getContext('2d');
    const lbl=makeLabel(container,'');
    let theta=35;
    const {lbl:tLbl}=makeSlider(container,'Ángulo θ (°)',1,89,35,1,v=>{theta=v;draw();});

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,cv.width,cv.height);
      const rad=theta*PI/180;
      const OX=60,OY=250,HYP=200;
      const ax=OX+HYP*Math.cos(rad),ay=OY-HYP*Math.sin(rad);
      const bx=ax,by=OY;

      // Fill triangle
      ctx.beginPath();ctx.moveTo(OX,OY);ctx.lineTo(ax,ay);ctx.lineTo(bx,by);
      ctx.closePath();ctx.fillStyle='rgba(239,68,68,0.1)';ctx.fill();

      // Hypotenuse (red)
      ctx.beginPath();ctx.strokeStyle=C.red;ctx.lineWidth=2.5;
      ctx.moveTo(OX,OY);ctx.lineTo(ax,ay);ctx.stroke();

      // Opposite (blue)
      ctx.beginPath();ctx.strokeStyle=C.blue;ctx.lineWidth=2.5;
      ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.stroke();

      // Adjacent (green)
      ctx.beginPath();ctx.strokeStyle=C.green;ctx.lineWidth=2.5;
      ctx.moveTo(OX,OY);ctx.lineTo(bx,by);ctx.stroke();

      // Right angle mark
      const ms=12;
      ctx.strokeStyle=tc.text;ctx.lineWidth=1.5;
      ctx.strokeRect(bx-ms,by-ms,ms,ms);

      // Angle arc
      ctx.beginPath();ctx.strokeStyle=C.amber;ctx.lineWidth=2;
      ctx.arc(OX,OY,35,0,-rad,true);ctx.stroke();

      // Angle label
      ctx.fillStyle=C.amber;ctx.font='bold 14px Inter';ctx.textAlign='center';
      ctx.fillText(`θ=${theta}°`,OX+55*Math.cos(-rad/2),OY+55*Math.sin(-rad/2));

      // Side labels
      const sinV=r3(Math.sin(rad)),cosV=r3(Math.cos(rad)),tanV=r3(Math.tan(rad));
      ctx.font='12px Inter';ctx.textAlign='center';

      // Hypotenuse label
      ctx.fillStyle=C.red;
      ctx.fillText(`hip=1`,OX+(ax-OX)/2-12,OY-(ay-OY)/2-8);

      // Opposite label
      ctx.fillStyle=C.blue;ctx.textAlign='left';
      ctx.fillText(`opp≈${sinV}`,bx+6,(ay+by)/2);

      // Adjacent label
      ctx.fillStyle=C.green;ctx.textAlign='center';
      ctx.fillText(`adj≈${cosV}`,(OX+bx)/2,OY+18);

      // Values panel
      const px=240,py=30,pw=140,ph=90;
      ctx.fillStyle=tc.panel;
      ctx.beginPath();ctx.roundRect(px,py,pw,ph,8);ctx.fill();
      ctx.strokeStyle=C.red;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.roundRect(px,py,pw,ph,8);ctx.stroke();

      ctx.fillStyle=tc.text;ctx.font='bold 12px JetBrains Mono';ctx.textAlign='left';
      ctx.fillText(`sen(${theta}°) = ${sinV}`,px+8,py+22);
      ctx.fillStyle=C.blue;
      ctx.fillText(`cos(${theta}°) = ${cosV}`,px+8,py+44);
      ctx.fillStyle=C.green;
      ctx.fillText(`tan(${theta}°) = ${tanV}`,px+8,py+66);

      tLbl.textContent=`Ángulo θ (°): ${theta}`;
      lbl.textContent=`SOH: sen=${sinV} | CAH: cos=${cosV} | TOA: tan=${tanV}`;
    }
    draw();
  };

  // ──────────────────────────────────────────────────────────
  // 2. TRIG-UNIT-CIRCLE
  //    Círculo unitario interactivo — punto draggable o slider
  //    Muestra (cos θ, sen θ), ángulo en grados y radianes
  // ──────────────────────────────────────────────────────────
  V['trig-unit-circle']=function(container){
    const cv=makeCanvas(container,400,340);
    const ctx=cv.getContext('2d');
    const lbl=makeLabel(container,'');
    let angle=45;
    let drag=false;
    const {lbl:aLbl}=makeSlider(container,'Ángulo (°)',0,360,45,1,v=>{angle=v;draw();});

    const CX=200,CY=175,R=130;

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,cv.width,cv.height);

      // Grid axes
      ctx.strokeStyle=tc.grid;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(CX-R-20,CY);ctx.lineTo(CX+R+20,CY);ctx.stroke();
      ctx.beginPath();ctx.moveTo(CX,CY-R-20);ctx.lineTo(CX,CY+R+20);ctx.stroke();

      // Axis labels
      ctx.fillStyle=tc.text;ctx.font='13px Inter';ctx.textAlign='center';
      ctx.fillText('1',CX+R+12,CY-6);ctx.fillText('-1',CX-R-14,CY-6);
      ctx.fillText('1',CX+6,CY-R-10);ctx.fillText('-1',CX+6,CY+R+14);

      // Unit circle
      ctx.beginPath();ctx.arc(CX,CY,R,0,2*PI);
      ctx.strokeStyle=tc.grid;ctx.lineWidth=2;ctx.stroke();

      // Notable angle markers
      [0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330].forEach(a=>{
        const r=a*PI/180;
        const x=CX+R*Math.cos(-r),y=CY+R*Math.sin(-r);
        ctx.beginPath();ctx.arc(x,y,3,0,2*PI);
        ctx.fillStyle=tc.grid;ctx.fill();
      });

      const rad=angle*PI/180;
      const px=CX+R*Math.cos(-rad),py=CY+R*Math.sin(-rad);
      const cosV=r3(Math.cos(rad)),sinV=r3(Math.sin(rad));

      // Dashed lines to axes
      ctx.setLineDash([5,4]);ctx.lineWidth=1.5;
      ctx.strokeStyle=C.blue;
      ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px,CY);ctx.stroke();
      ctx.strokeStyle=C.red;
      ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(CX,py);ctx.stroke();
      ctx.setLineDash([]);

      // Radius line
      ctx.beginPath();ctx.strokeStyle=C.amber;ctx.lineWidth=2.5;
      ctx.moveTo(CX,CY);ctx.lineTo(px,py);ctx.stroke();

      // Angle arc
      ctx.beginPath();ctx.strokeStyle=C.amber;ctx.lineWidth=2;
      ctx.arc(CX,CY,30,0,-rad,angle>0);ctx.stroke();
      ctx.fillStyle=C.amber;ctx.font='bold 12px Inter';ctx.textAlign='center';
      const arcMid=-rad/2;
      ctx.fillText(`${angle}°`,CX+48*Math.cos(arcMid),CY+48*Math.sin(arcMid));

      // Point P
      ctx.beginPath();ctx.fillStyle=C.red;ctx.arc(px,py,7,0,2*PI);ctx.fill();
      ctx.beginPath();ctx.fillStyle='#fff';ctx.arc(px,py,3,0,2*PI);ctx.fill();

      // P label
      const offX=cosV>0?10:-50,offY=sinV>0?-14:18;
      ctx.fillStyle=C.red;ctx.font='bold 12px JetBrains Mono';ctx.textAlign='left';
      ctx.fillText(`P(${cosV},${sinV})`,px+offX,py+offY);

      // cos label on x-axis
      ctx.fillStyle=C.blue;ctx.font='12px Inter';ctx.textAlign='center';
      ctx.fillText(`cos`,px,(CY<py?CY-8:CY+16));

      // sin label on y-axis
      ctx.fillStyle=C.red;ctx.textAlign='right';
      ctx.fillText(`sin`,CX-6,(py+CY)/2);

      // Info box
      const radV=r3(angle*PI/180);
      lbl.textContent=`θ=${angle}° = ${radV} rad | cos(θ)=${cosV} | sen(θ)=${sinV} | tan(θ)=${cosV!==0?r3(sinV/cosV):'∞'}`;
      aLbl.textContent=`Ángulo (°): ${angle}`;
    }

    // Drag support
    function angleFromMouse(e){
      const rect=cv.getBoundingClientRect();
      const sx=cv.width/rect.width,sy=cv.height/rect.height;
      const mx=((e.clientX??e.touches[0].clientX)-rect.left)*sx-CX;
      const my=((e.clientY??e.touches[0].clientY)-rect.top)*sy-CY;
      let a=Math.round(-Math.atan2(my,mx)*180/PI);
      if(a<0)a+=360;
      return a;
    }
    cv.addEventListener('pointerdown',e=>{
      const a=angleFromMouse(e);
      const rad=a*PI/180;
      const px=CX+R*Math.cos(-rad),py=CY+R*Math.sin(-rad);
      const rect=cv.getBoundingClientRect();
      const sx=cv.width/rect.width,sy=cv.height/rect.height;
      const mx=((e.clientX??e.touches[0].clientX)-rect.left)*sx;
      const my=((e.clientY??e.touches[0].clientY)-rect.top)*sy;
      if(Math.hypot(mx-px,my-py)<25){drag=true;cv.setPointerCapture(e.pointerId);}
    });
    cv.addEventListener('pointermove',e=>{if(drag){angle=angleFromMouse(e);draw();}});
    cv.addEventListener('pointerup',()=>{drag=false;});

    draw();
  };

  // ──────────────────────────────────────────────────────────
  // 3. TRIG-WAVE
  //    Gráfica de sen(x) y cos(x) con sliders A, k, φ
  // ──────────────────────────────────────────────────────────
  V['trig-wave']=function(container){
    const cv=makeCanvas(container,420,260);
    const ctx=cv.getContext('2d');
    const lbl=makeLabel(container,'');
    let A=1,k=1,phase=0,showCos=false;

    makeSlider(container,'Amplitud A',1,3,1,0.5,v=>{A=v;draw();});
    makeSlider(container,'Frecuencia k',1,4,1,1,v=>{k=v;draw();});
    makeSlider(container,'Fase φ (°)',0,180,0,15,v=>{phase=v;draw();});

    // Toggle sin/cos
    const btnRow=document.createElement('div');
    btnRow.style.cssText='display:flex;gap:8px;';
    ['sen(x)','cos(x)'].forEach((label,i)=>{
      const b=document.createElement('button');
      b.textContent=label;
      b.style.cssText=`padding:5px 14px;border-radius:20px;border:2px solid ${i===0?C.red:C.blue};
        background:${(i===0&&!showCos)||(i===1&&showCos)?(i===0?C.red:C.blue):'transparent'};
        color:${(i===0&&!showCos)||(i===1&&showCos)?'#fff':(i===0?C.red:C.blue)};
        cursor:pointer;font-size:13px;font-family:Inter,sans-serif;`;
      b.addEventListener('click',()=>{showCos=i===1;btnRow.querySelectorAll('button').forEach((x,j)=>{
        const col=j===0?C.red:C.blue;
        x.style.background=(j===i)?col:'transparent';
        x.style.color=(j===i)?'#fff':col;
      });draw();});
      btnRow.appendChild(b);
    });
    container.appendChild(btnRow);

    const W=cv.width,H=cv.height;
    const OX=30,OY=H/2,scaleX=(W-60)/(2*PI),scaleY=(H/2-30);

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,W,H);

      // Grid
      ctx.strokeStyle=tc.grid;ctx.lineWidth=0.8;
      // Horizontal lines
      [-1,-0.5,0,0.5,1].forEach(y=>{
        const cy=OY-y*scaleY*A/A; // normalize for A
        ctx.beginPath();ctx.moveTo(OX,OY-y*scaleY);ctx.lineTo(W-30,OY-y*scaleY);ctx.stroke();
        if(y!==0){ctx.fillStyle=tc.grid;ctx.font='10px Inter';ctx.textAlign='right';
          ctx.fillText(y,OX-4,OY-y*scaleY+4);}
      });
      // Vertical lines at 0, π/2, π, 3π/2, 2π
      [0,0.5,1,1.5,2].forEach(t=>{
        const x=OX+t*PI*scaleX;
        ctx.beginPath();ctx.moveTo(x,30);ctx.lineTo(x,H-20);ctx.stroke();
        const labels=['0','π/2','π','3π/2','2π'];
        ctx.fillStyle=tc.text;ctx.font='11px Inter';ctx.textAlign='center';
        ctx.fillText(labels[t*2],x,H-6);
      });

      // Axes
      ctx.strokeStyle=tc.text;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(OX,OY);ctx.lineTo(W-30,OY);ctx.stroke();
      ctx.beginPath();ctx.moveTo(OX,20);ctx.lineTo(OX,H-20);ctx.stroke();

      // Amplitude labels
      ctx.fillStyle=tc.text;ctx.font='11px Inter';ctx.textAlign='right';
      ctx.fillText(A,OX-4,OY-scaleY+4);
      ctx.fillText(-A,OX-4,OY+scaleY+4);

      // Wave
      const fn=showCos?Math.cos:Math.sin;
      const phaseRad=phase*PI/180;
      ctx.beginPath();ctx.strokeStyle=showCos?C.blue:C.red;ctx.lineWidth=2.5;
      for(let px=0;px<=W-OX-30;px++){
        const x=px/scaleX;
        const y=A*fn(k*x+phaseRad);
        const cy=OY-y*scaleY;
        px===0?ctx.moveTo(OX+px,cy):ctx.lineTo(OX+px,cy);
      }
      ctx.stroke();

      // Period indicator
      const period=2*PI/k;
      ctx.strokeStyle=C.amber;ctx.lineWidth=1.5;ctx.setLineDash([6,3]);
      ctx.beginPath();ctx.moveTo(OX,30);ctx.lineTo(OX+period*scaleX,30);ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle=C.amber;ctx.font='11px Inter';ctx.textAlign='center';
      ctx.fillText(`T=${r2(360/k)}°`,OX+period*scaleX/2,25);

      const fnName=showCos?'cos':'sen';
      const phaseStr=phase>0?`+${phase}°`:'';
      lbl.textContent=`y = ${A}·${fnName}(${k}x${phaseStr}) | Amplitud=${A}, Período=${r2(360/k)}°, Fase=${phase}°`;
    }
    draw();
  };

  // ──────────────────────────────────────────────────────────
  // 4. TRIG-LAW-TRIANGLE
  //    Triángulo general para ley de senos y cosenos
  //    Vértices arrastrables con cálculo en tiempo real
  // ──────────────────────────────────────────────────────────
  V['trig-law-triangle']=function(container){
    const cv=makeCanvas(container,420,320);
    const ctx=cv.getContext('2d');
    const lbl=makeLabel(container,'');

    let pts=[{x:210,y:60},{x:80,y:270},{x:340,y:270}];
    let drag=-1;

    function dist(a,b){return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2);}
    function angleDeg(a,b,c){
      const ab=dist(a,b),bc=dist(b,c),ac=dist(a,c);
      const cos=(ab*ab+bc*bc-ac*ac)/(2*ab*bc);
      const clamped=Math.max(-1,Math.min(1,cos));
      return Math.round(Math.acos(clamped)*180/PI);
    }

    function draw(){
      const tc=getTC();
      ctx.clearRect(0,0,cv.width,cv.height);

      // Triangle fill
      ctx.beginPath();
      ctx.moveTo(pts[0].x,pts[0].y);ctx.lineTo(pts[1].x,pts[1].y);ctx.lineTo(pts[2].x,pts[2].y);
      ctx.closePath();ctx.fillStyle='rgba(239,68,68,0.08)';ctx.fill();

      // Sides with color
      const sideColors=[C.blue,C.green,C.red];
      [[0,1],[1,2],[2,0]].forEach(([i,j],k)=>{
        ctx.beginPath();ctx.strokeStyle=sideColors[k];ctx.lineWidth=2.5;
        ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();
      });

      // Vertices
      const VL=['A','B','C'];
      pts.forEach((p,i)=>{
        ctx.beginPath();ctx.fillStyle=i===drag?C.amber:C.red;
        ctx.arc(p.x,p.y,9,0,2*PI);ctx.fill();
        ctx.fillStyle='#fff';ctx.font='bold 11px Inter';ctx.textAlign='center';
        ctx.fillText(VL[i],p.x,p.y+4);
      });

      // Angles
      const A=angleDeg(pts[2],pts[0],pts[1]);
      const B=angleDeg(pts[0],pts[1],pts[2]);
      const Cv=180-A-B;
      const angles=[A,B,Cv];
      pts.forEach((p,i)=>{
        ctx.fillStyle=C.amber;ctx.font='bold 12px Inter';ctx.textAlign='center';
        const off=pts[i].y<100?20:pts[i].y>250?-18:pts[i].x<150?20:-20;
        ctx.fillText(`${angles[i]}°`,p.x+(i===0?0:(i===1?-16:16)),p.y+(i===0?-18:8));
      });

      // Side lengths
      const sides=[dist(pts[0],pts[1]),dist(pts[1],pts[2]),dist(pts[2],pts[0])];
      const sideLabels=['c','a','b'];
      [[0,1],[1,2],[2,0]].forEach(([i,j],k)=>{
        const mx=(pts[i].x+pts[j].x)/2,my=(pts[i].y+pts[j].y)/2;
        ctx.fillStyle=sideColors[k];ctx.font='bold 13px Inter';ctx.textAlign='center';
        const offN=k===0?-12:k===1?10:10;
        ctx.fillText(`${sideLabels[k]}=${Math.round(sides[k])}px`,mx+offN,my+offN);
      });

      // Law of sines check
      const a=sides[1],b=sides[2],c=sides[0];
      const aV=r2(a/Math.sin(A*PI/180)||0);
      const bV=r2(b/Math.sin(B*PI/180)||0);
      const cV=r2(c/Math.sin(Cv*PI/180)||0);

      lbl.textContent=`A=${A}°, B=${B}°, C=${Cv}° | Ley de senos: a/sen(A)=${aV} ≈ b/sen(B)=${bV} ≈ c/sen(C)=${cV}`;
    }

    function nearPt(e){
      const rect=cv.getBoundingClientRect();
      const sx=cv.width/rect.width,sy=cv.height/rect.height;
      const mx=((e.clientX??e.touches[0].clientX)-rect.left)*sx;
      const my=((e.clientY??e.touches[0].clientY)-rect.top)*sy;
      for(let i=0;i<pts.length;i++) if(Math.hypot(pts[i].x-mx,pts[i].y-my)<18)return i;
      return -1;
    }
    cv.addEventListener('pointerdown',e=>{drag=nearPt(e);if(drag>=0)cv.setPointerCapture(e.pointerId);draw();});
    cv.addEventListener('pointermove',e=>{
      if(drag<0)return;
      const rect=cv.getBoundingClientRect();
      const sx=cv.width/rect.width,sy=cv.height/rect.height;
      pts[drag].x=Math.max(15,Math.min(cv.width-15,((e.clientX??e.touches[0].clientX)-rect.left)*sx));
      pts[drag].y=Math.max(15,Math.min(cv.height-15,((e.clientY??e.touches[0].clientY)-rect.top)*sy));
      draw();
    });
    cv.addEventListener('pointerup',()=>{drag=-1;draw();});

    draw();
  };

  console.log('[MM] visual-trig.js cargado:',Object.keys(V).length,'visualizaciones totales');
})();
