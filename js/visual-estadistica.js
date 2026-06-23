/* ═══════════════════════════════════════════════════════
   VISUAL-ESTADISTICA.JS — Visualizaciones interactivas
   Registra en window.MM_GEO_VIS:
     est-bar-chart, est-pie-chart, est-histogram,
     est-boxplot, est-probability, est-normal-dist,
     est-frequency-table, est-central-tendency,
     est-dispersion-vis
   ═══════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if(!window.MM_GEO_VIS) window.MM_GEO_VIS={};
  var V=window.MM_GEO_VIS;

  /* ── helpers ── */
  function mkCanvas(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;c.style.cssText='display:block;max-width:100%;border-radius:8px;';return c;}
  function mkBtn(label,style){var b=document.createElement('button');b.textContent=label;b.style.cssText='padding:6px 14px;border:none;border-radius:6px;font-size:13px;cursor:pointer;margin:3px;'+style;return b;}
  function mkSlider(min,max,val,step){var s=document.createElement('input');s.type='range';s.min=min;s.max=max;s.value=val;s.step=step||1;s.style.cssText='width:140px;cursor:pointer;vertical-align:middle;';return s;}
  function mkLabel(txt){var l=document.createElement('label');l.textContent=txt;l.style.cssText='font-size:12px;color:var(--fg-muted,#6b7280);margin-right:6px;';return l;}
  function mkRow(){var d=document.createElement('div');d.style.cssText='display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:8px 0;';return d;}
  function mkStat(label,val){var d=document.createElement('div');d.innerHTML='<strong>'+label+'</strong>: <span style="color:#4F46E5">'+val+'</span>';d.style.cssText='font-size:13px;padding:4px 10px;background:var(--bg-card,#f9fafb);border-radius:6px;';return d;}

  function hexToRgba(hex,a){var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return 'rgba('+r+','+g+','+b+','+a+')';}

  const COLORS=['#4F46E5','#EC4899','#10B981','#F59E0B','#EF4444','#06B6D4','#8B5CF6','#F97316'];
  const r2=x=>Math.round(x*100)/100;

  /* ══════════════════════════════════════════
     1. GRÁFICO DE BARRAS INTERACTIVO
  ══════════════════════════════════════════ */
  V['est-bar-chart']=function(container){
    var labels=['Lunes','Martes','Miércoles','Jueves','Viernes'];
    var vals=[32,45,28,55,40];
    var W=500,H=280,PAD={l:50,r:20,t:30,b:60};

    var wrap=document.createElement('div');
    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');

    function draw(){
      ctx.clearRect(0,0,W,H);
      var bw=H-PAD.t-PAD.b, bh=W-PAD.l-PAD.r;
      var maxV=Math.max(...vals)+5;
      var step=(W-PAD.l-PAD.r)/labels.length;
      var bWidth=step*0.6;

      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);

      // gridlines
      ctx.strokeStyle='#e5e7eb';ctx.lineWidth=1;
      for(var i=0;i<=5;i++){
        var y=PAD.t+(H-PAD.t-PAD.b)*i/5;
        ctx.beginPath();ctx.moveTo(PAD.l,y);ctx.lineTo(W-PAD.r,y);ctx.stroke();
        var v=Math.round(maxV*(5-i)/5);
        ctx.fillStyle='#6b7280';ctx.font='11px Inter,sans-serif';
        ctx.textAlign='right';ctx.fillText(v,PAD.l-5,y+4);
      }

      // bars
      labels.forEach(function(lbl,i){
        var x=PAD.l+i*step+(step-bWidth)/2;
        var barH=(vals[i]/maxV)*(H-PAD.t-PAD.b);
        var y=H-PAD.b-barH;
        ctx.fillStyle=COLORS[i%COLORS.length];
        ctx.fillRect(x,y,bWidth,barH);
        // value label
        ctx.fillStyle='#1f2937';ctx.font='bold 12px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(vals[i],x+bWidth/2,y-5);
        // x-axis label
        ctx.fillStyle='#374151';ctx.font='12px Inter,sans-serif';
        ctx.fillText(lbl,x+bWidth/2,H-PAD.b+18);
      });

      // axis
      ctx.strokeStyle='#374151';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(PAD.l,PAD.t);ctx.lineTo(PAD.l,H-PAD.b);ctx.lineTo(W-PAD.r,H-PAD.b);ctx.stroke();

      // title
      ctx.fillStyle='#111827';ctx.font='bold 13px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Ventas por Día',W/2,PAD.t-8);
    }

    // click to randomize
    var btnR=mkBtn('🔀 Datos aleatorios','background:#4F46E5;color:white;');
    btnR.onclick=function(){vals=labels.map(()=>Math.floor(Math.random()*60)+10);draw();};

    var info=document.createElement('p');
    info.textContent='Haz clic en el botón para generar nuevos datos.';
    info.style.cssText='font-size:12px;color:#6b7280;margin:4px 0;';

    wrap.appendChild(cvs);
    var row=mkRow();row.appendChild(btnR);wrap.appendChild(row);wrap.appendChild(info);
    container.appendChild(wrap);
    draw();
  };

  /* ══════════════════════════════════════════
     2. GRÁFICO CIRCULAR INTERACTIVO
  ══════════════════════════════════════════ */
  V['est-pie-chart']=function(container){
    var cats=['Matemática','Lenguaje','Historia','Ciencias','Arte'];
    var vals=[35,25,20,15,5];
    var W=460,H=280;

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var cx=160,cy=140,rad=120;

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);
      var total=vals.reduce((a,b)=>a+b,0);
      var angle=-Math.PI/2;
      cats.forEach(function(cat,i){
        var slice=vals[i]/total*2*Math.PI;
        ctx.beginPath();ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,rad,angle,angle+slice);
        ctx.closePath();
        ctx.fillStyle=COLORS[i%COLORS.length];ctx.fill();
        ctx.strokeStyle='white';ctx.lineWidth=2;ctx.stroke();
        // label inside
        var mid=angle+slice/2;
        var lx=cx+Math.cos(mid)*(rad*0.65), ly=cy+Math.sin(mid)*(rad*0.65);
        var pct=Math.round(vals[i]/total*100);
        ctx.fillStyle='white';ctx.font='bold 11px Inter,sans-serif';ctx.textAlign='center';
        if(pct>5) ctx.fillText(pct+'%',lx,ly+4);
        angle+=slice;
      });

      // legend
      var lx=310, ly=60;
      ctx.font='13px Inter,sans-serif';ctx.textAlign='left';
      cats.forEach(function(cat,i){
        ctx.fillStyle=COLORS[i%COLORS.length];
        ctx.fillRect(lx,ly+i*28-10,14,14);
        ctx.fillStyle='#374151';
        ctx.fillText(cat+': '+vals[i],lx+20,ly+i*28+2);
      });

      // title
      ctx.fillStyle='#111827';ctx.font='bold 13px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Materias Preferidas',cx,22);
    }

    var btnR=mkBtn('🔀 Randomizar','background:#EC4899;color:white;');
    btnR.onclick=function(){
      var n=vals.length, total=100, rem=total;
      vals=vals.map((_,i)=>{if(i===n-1)return rem;var v=Math.floor(Math.random()*rem*0.5)+1;rem-=v;return v;});
      draw();
    };

    container.appendChild(cvs);
    var row=mkRow();row.appendChild(btnR);container.appendChild(row);
    draw();
  };

  /* ══════════════════════════════════════════
     3. HISTOGRAMA INTERACTIVO
  ══════════════════════════════════════════ */
  V['est-histogram']=function(container){
    var W=500,H=280,PAD={l:50,r:20,t:35,b:50};
    var bins=7;
    var rawData=Array.from({length:100},()=>Math.round(40+30*Math.random()+20*Math.random()));

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');

    function build(b){
      var mn=Math.min(...rawData),mx=Math.max(...rawData);
      var amp=(mx-mn)/b;
      var counts=Array(b).fill(0);
      rawData.forEach(v=>{var i=Math.min(Math.floor((v-mn)/amp),b-1);counts[i]++;});
      return {mn,mx,amp,counts};
    }

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);
      var {mn,mx,amp,counts}=build(bins);
      var maxC=Math.max(...counts)+1;
      var aw=W-PAD.l-PAD.r, ah=H-PAD.t-PAD.b;
      var bw=aw/bins;

      // grid
      ctx.strokeStyle='#e5e7eb';ctx.lineWidth=1;
      for(var i=0;i<=5;i++){
        var y=PAD.t+ah*i/5;
        ctx.beginPath();ctx.moveTo(PAD.l,y);ctx.lineTo(W-PAD.r,y);ctx.stroke();
        ctx.fillStyle='#6b7280';ctx.font='11px Inter,sans-serif';ctx.textAlign='right';
        ctx.fillText(Math.round(maxC*(5-i)/5),PAD.l-4,y+4);
      }

      counts.forEach(function(c,i){
        var x=PAD.l+i*bw;
        var bh=c/maxC*ah;
        var y=PAD.t+ah-bh;
        ctx.fillStyle=hexToRgba(COLORS[0],0.85);
        ctx.fillRect(x+1,y,bw-2,bh);
        ctx.strokeStyle='#4F46E5';ctx.lineWidth=1;
        ctx.strokeRect(x+1,y,bw-2,bh);
        // x tick
        var li=Math.round(mn+i*amp), ls=Math.round(mn+(i+1)*amp);
        ctx.fillStyle='#374151';ctx.font='10px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(li,x,H-PAD.b+14);
      });
      ctx.fillStyle='#374151';ctx.font='10px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText(Math.round(mx),PAD.l+bins*bw,H-PAD.b+14);

      // axes
      ctx.strokeStyle='#374151';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(PAD.l,PAD.t);ctx.lineTo(PAD.l,H-PAD.b);ctx.lineTo(W-PAD.r,H-PAD.b);ctx.stroke();

      ctx.fillStyle='#111827';ctx.font='bold 13px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Histograma — '+bins+' clases, n='+rawData.length,W/2,PAD.t-12);
    }

    var slBins=mkSlider(2,20,bins);
    slBins.oninput=function(){bins=parseInt(this.value);draw();};
    var btnR=mkBtn('🔀 Nuevos datos','background:#10B981;color:white;');
    btnR.onclick=function(){rawData=Array.from({length:100},()=>Math.round(40+30*Math.random()+20*Math.random()));draw();};

    container.appendChild(cvs);
    var row=mkRow();
    row.appendChild(mkLabel('Clases:'));row.appendChild(slBins);
    row.appendChild(btnR);
    container.appendChild(row);
    draw();
  };

  /* ══════════════════════════════════════════
     4. DIAGRAMA DE CAJA (BOXPLOT)
  ══════════════════════════════════════════ */
  V['est-boxplot']=function(container){
    var W=500,H=220,PAD={l:60,r:30,t:30,b:40};
    var datasets={
      'Clase A':[45,50,55,60,62,65,66,68,70,72,75,78,80,82,85,90,95],
      'Clase B':[30,40,55,60,65,65,67,70,72,78,80,85,90,92,95,98,99]
    };
    var current='Clase A';

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var statsDiv=document.createElement('div');
    statsDiv.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;';

    function sorted(a){return [...a].sort((x,y)=>x-y);}
    function Q(a,q){var s=sorted(a),n=s.length,pos=(q/4)*(n-1),lo=Math.floor(pos),hi=Math.ceil(pos);return s[lo]+(s[hi]-s[lo])*(pos-lo);}

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);
      var data=datasets[current];
      var mn=Math.min(...data),mx=Math.max(...data);
      var q1=Q(data,1),q2=Q(data,2),q3=Q(data,3);
      var ric=q3-q1;
      var whisLo=Math.max(mn,q1-1.5*ric), whisHi=Math.min(mx,q3+1.5*ric);
      var outliers=data.filter(v=>v<whisLo||v>whisHi);

      var range=mx-mn+10, off=mn-5;
      var toX=v=>PAD.l+(v-off)/range*(W-PAD.l-PAD.r);
      var midY=H/2+5;

      // grid lines
      [20,30,40,50,60,70,80,90,100].forEach(function(v){
        var x=toX(v);if(x<PAD.l||x>W-PAD.r)return;
        ctx.strokeStyle='#e5e7eb';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(x,PAD.t);ctx.lineTo(x,H-PAD.b);ctx.stroke();
        ctx.fillStyle='#9ca3af';ctx.font='10px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(v,x,H-PAD.b+14);
      });

      // whiskers
      ctx.strokeStyle='#374151';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(toX(whisLo),midY);ctx.lineTo(toX(q1),midY);ctx.stroke();
      ctx.beginPath();ctx.moveTo(toX(q3),midY);ctx.lineTo(toX(whisHi),midY);ctx.stroke();
      // end caps
      [whisLo,whisHi].forEach(function(v){
        ctx.beginPath();ctx.moveTo(toX(v),midY-8);ctx.lineTo(toX(v),midY+8);ctx.stroke();
      });

      // box
      ctx.fillStyle=hexToRgba(COLORS[0],0.3);
      ctx.fillRect(toX(q1),midY-20,toX(q3)-toX(q1),40);
      ctx.strokeStyle=COLORS[0];ctx.lineWidth=2;
      ctx.strokeRect(toX(q1),midY-20,toX(q3)-toX(q1),40);

      // median
      ctx.strokeStyle='#EC4899';ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(toX(q2),midY-20);ctx.lineTo(toX(q2),midY+20);ctx.stroke();

      // outliers
      outliers.forEach(function(v){
        ctx.fillStyle='#EF4444';
        ctx.beginPath();ctx.arc(toX(v),midY,5,0,2*Math.PI);ctx.fill();
      });

      // labels
      ctx.fillStyle='#374151';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';
      [[q1,'Q1'],[q2,'Q2'],[q3,'Q3']].forEach(function(pair){
        ctx.fillText(pair[1]+'='+r2(pair[0]),toX(pair[0]),midY-28);
      });

      ctx.fillStyle='#111827';ctx.font='bold 13px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText(current,W/2,20);

      // stats
      statsDiv.innerHTML='';
      [['Mín',mn],['Q1',r2(q1)],['Mediana',r2(q2)],['Q3',r2(q3)],['Máx',mx],['RIC',r2(ric)]].forEach(function(p){
        statsDiv.appendChild(mkStat(p[0],p[1]));
      });
    }

    var btnA=mkBtn('Clase A','background:#4F46E5;color:white;');
    var btnB=mkBtn('Clase B','background:#6b7280;color:white;');
    btnA.onclick=function(){current='Clase A';draw();};
    btnB.onclick=function(){current='Clase B';draw();};

    container.appendChild(cvs);
    var row=mkRow();row.appendChild(btnA);row.appendChild(btnB);container.appendChild(row);
    container.appendChild(statsDiv);
    draw();
  };

  /* ══════════════════════════════════════════
     5. PROBABILIDAD — ESPACIO MUESTRAL
  ══════════════════════════════════════════ */
  V['est-probability']=function(container){
    var W=500,H=280;
    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');

    var modes=['Dado','Monedas','Bolas'];
    var mode=modes[0];

    function drawDado(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);
      var faces=[1,2,3,4,5,6];
      var events=[
        {label:'Par {2,4,6}',set:new Set([2,4,6]),color:'#10B981'},
        {label:'Primo {2,3,5}',set:new Set([2,3,5]),color:'#4F46E5'},
        {label:'>3 {4,5,6}',set:new Set([4,5,6]),color:'#EC4899'},
      ];
      var sz=60, gap=10, startX=40, y=80;

      faces.forEach(function(f,i){
        var x=startX+i*(sz+gap);
        var inEvent=events.filter(ev=>ev.set.has(f));
        var bg=inEvent.length>0?inEvent[0].color+'33':'#e5e7eb';
        ctx.fillStyle=bg;ctx.strokeStyle='#374151';ctx.lineWidth=2;
        ctx.beginPath();ctx.roundRect(x,y,sz,sz,8);ctx.fill();ctx.stroke();
        ctx.fillStyle='#111827';ctx.font='bold 24px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText('⚀⚁⚂⚃⚄⚅'[f-1]||f,x+sz/2,y+sz/2+8);
      });

      // title
      ctx.fillStyle='#111827';ctx.font='bold 14px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Dado: espacio muestral Ω = {1,2,3,4,5,6}',W/2,50);

      // events
      events.forEach(function(ev,i){
        var p=r2(ev.set.size/6);
        ctx.fillStyle=ev.color;ctx.font='13px Inter,sans-serif';ctx.textAlign='left';
        ctx.fillText('● '+ev.label+' → P='+ev.set.size+'/6≈'+p, 30, 180+i*28);
      });
    }

    function drawMonedas(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);
      var outcomes=['CC','CS','SC','SS'];
      var sz=80, gap=15, startX=30, y=70;

      ctx.fillStyle='#111827';ctx.font='bold 14px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Dos monedas: 4 resultados igualmente posibles',W/2,45);

      outcomes.forEach(function(oc,i){
        var x=startX+i*(sz+gap);
        var isCC=oc==='CC';
        ctx.fillStyle=isCC?'#4F46E533':'#f3f4f6';
        ctx.strokeStyle=isCC?'#4F46E5':'#d1d5db';ctx.lineWidth=2;
        ctx.beginPath();ctx.roundRect(x,y,sz,sz,8);ctx.fill();ctx.stroke();
        ctx.fillStyle='#111827';ctx.font='20px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(oc[0]==='C'?'🪙':'🎴',x+sz/2,y+28);
        ctx.fillText(oc[1]==='C'?'🪙':'🎴',x+sz/2,y+58);
        ctx.fillStyle='#374151';ctx.font='11px Inter,sans-serif';
        ctx.fillText(oc,x+sz/2,y+sz+15);
      });

      ctx.fillStyle='#111827';ctx.font='13px Inter,sans-serif';ctx.textAlign='left';
      ctx.fillText('P(2 caras) = 1/4 = 0.25',30,200);
      ctx.fillText('P(≥1 cara) = 3/4 = 0.75',30,225);
      ctx.fillText('P(0 caras) = 1/4 = 0.25',30,250);
    }

    function drawBolas(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);
      var rojas=4, azules=3, verdes=2;
      var total=rojas+azules+verdes;
      var cols=['#EF4444','#4F46E5','#10B981'];
      var counts=[rojas,azules,verdes];
      var names=['Roja','Azul','Verde'];
      var cx=W/2, cy=150, r=110;

      ctx.fillStyle='#111827';ctx.font='bold 14px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Bolsa: '+rojas+' rojas, '+azules+' azules, '+verdes+' verdes (total='+total+')',W/2,40);

      var angle=0;
      counts.forEach(function(n,i){
        var slice=n/total*2*Math.PI;
        ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,angle,angle+slice);ctx.closePath();
        ctx.fillStyle=cols[i];ctx.fill();ctx.strokeStyle='white';ctx.lineWidth=2;ctx.stroke();
        var mid=angle+slice/2;
        ctx.fillStyle='white';ctx.font='bold 13px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(names[i]+'\n'+n+'/'+total,cx+Math.cos(mid)*r*0.65,cy+Math.sin(mid)*r*0.65+5);
        angle+=slice;
      });
    }

    function draw(){
      if(mode==='Dado') drawDado();
      else if(mode==='Monedas') drawMonedas();
      else drawBolas();
    }

    var btns=modes.map(function(m){
      var b=mkBtn(m,'background:'+(m===mode?'#4F46E5':'#6b7280')+';color:white;');
      b.onclick=function(){mode=m;btns.forEach(function(bb,i){bb.style.background=modes[i]===m?'#4F46E5':'#6b7280';});draw();};
      return b;
    });

    container.appendChild(cvs);
    var row=mkRow();btns.forEach(function(b){row.appendChild(b);});container.appendChild(row);
    draw();
  };

  /* ══════════════════════════════════════════
     6. DISTRIBUCIÓN NORMAL INTERACTIVA
  ══════════════════════════════════════════ */
  V['est-normal-dist']=function(container){
    var W=500,H=280,PAD={l:50,r:20,t:40,b:50};
    var mu=100, sigma=15;

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var statsDiv=document.createElement('div');
    statsDiv.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;';

    function normalPDF(x,m,s){return Math.exp(-0.5*((x-m)/s)**2)/(s*Math.sqrt(2*Math.PI));}

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);

      var xMin=mu-4*sigma, xMax=mu+4*sigma;
      var aw=W-PAD.l-PAD.r, ah=H-PAD.t-PAD.b;
      var maxPDF=normalPDF(mu,mu,sigma);

      var toX=function(x){return PAD.l+(x-xMin)/(xMax-xMin)*aw;};
      var toY=function(p){return PAD.t+ah*(1-p/maxPDF*0.9);};

      // shade regions
      var regions=[
        {lo:mu-sigma,hi:mu+sigma,color:'rgba(79,70,229,0.25)',label:'68%'},
        {lo:mu-2*sigma,hi:mu-sigma,color:'rgba(16,185,129,0.20)',label:''},
        {lo:mu+sigma,hi:mu+2*sigma,color:'rgba(16,185,129,0.20)',label:'95%'},
        {lo:mu-3*sigma,hi:mu-2*sigma,color:'rgba(245,158,11,0.20)',label:''},
        {lo:mu+2*sigma,hi:mu+3*sigma,color:'rgba(245,158,11,0.20)',label:'99.7%'},
      ];
      regions.forEach(function(reg){
        ctx.beginPath();
        var steps=80;
        for(var s=0;s<=steps;s++){
          var x=reg.lo+(reg.hi-reg.lo)*s/steps;
          var y=toY(normalPDF(x,mu,sigma));
          s===0?ctx.moveTo(toX(x),toY(0)):ctx.lineTo(toX(x),y);
        }
        ctx.lineTo(toX(reg.hi),toY(0));ctx.closePath();
        ctx.fillStyle=reg.color;ctx.fill();
      });

      // curve
      ctx.beginPath();ctx.strokeStyle='#4F46E5';ctx.lineWidth=3;
      for(var xi=0;xi<=aw;xi++){
        var x=xMin+(xMax-xMin)*xi/aw;
        var y=toY(normalPDF(x,mu,sigma));
        xi===0?ctx.moveTo(toX(x),y):ctx.lineTo(toX(x),y);
      }
      ctx.stroke();

      // σ lines
      [-3,-2,-1,0,1,2,3].forEach(function(k){
        var x=mu+k*sigma;
        ctx.strokeStyle=k===0?'#EF4444':'#9ca3af';ctx.lineWidth=k===0?2:1;
        ctx.setLineDash(k===0?[]:[4,4]);
        ctx.beginPath();ctx.moveTo(toX(x),PAD.t);ctx.lineTo(toX(x),H-PAD.b);ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle='#374151';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(k===0?'μ':(k>0?'+':'')+k+'σ',toX(x),H-PAD.b+16);
      });

      // x-axis values
      [-3,-2,-1,0,1,2,3].forEach(function(k){
        var x=mu+k*sigma;
        ctx.fillStyle='#6b7280';ctx.font='10px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(Math.round(x),toX(x),H-PAD.b+30);
      });

      // title
      ctx.fillStyle='#111827';ctx.font='bold 13px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Distribución Normal N(μ='+mu+', σ='+sigma+')',W/2,PAD.t-15);

      // region labels
      ctx.font='bold 12px Inter,sans-serif';ctx.textAlign='center';
      var labs=[{x:mu,pct:'68%',c:'#4F46E5'},{x:mu+1.5*sigma,pct:'95%',c:'#10B981'}];
      // stats
      statsDiv.innerHTML='';
      [['μ',mu],['σ',sigma],['μ−σ',r2(mu-sigma)],['μ+σ',r2(mu+sigma)],['μ−2σ',r2(mu-2*sigma)],['μ+2σ',r2(mu+2*sigma)]].forEach(function(p){
        statsDiv.appendChild(mkStat(p[0],p[1]));
      });
    }

    var slMu=mkSlider(50,200,mu,5);
    var slSigma=mkSlider(5,40,sigma,1);
    slMu.oninput=function(){mu=parseInt(this.value);draw();};
    slSigma.oninput=function(){sigma=parseInt(this.value);draw();};

    container.appendChild(cvs);
    var row1=mkRow();
    row1.appendChild(mkLabel('μ:'));row1.appendChild(slMu);
    row1.appendChild(mkLabel('σ:'));row1.appendChild(slSigma);
    container.appendChild(row1);
    container.appendChild(statsDiv);
    draw();
  };

  /* ══════════════════════════════════════════
     7. TABLA DE FRECUENCIAS INTERACTIVA
  ══════════════════════════════════════════ */
  V['est-frequency-table']=function(container){
    var W=500,H=270;
    var rawData=[5,6,7,7,4,6,7,5,6,7,4,5,6,7,5];
    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);

      // compute
      var freq={};
      rawData.forEach(function(v){freq[v]=(freq[v]||0)+1;});
      var keys=Object.keys(freq).map(Number).sort((a,b)=>a-b);
      var n=rawData.length;

      // header
      ctx.fillStyle='#4F46E5';ctx.fillRect(20,30,460,30);
      ctx.fillStyle='white';ctx.font='bold 12px Inter,sans-serif';ctx.textAlign='center';
      ['Valor','F. Abs.','F. Rel.','F. Rel. %','F. Acum.'].forEach(function(h,i){
        ctx.fillText(h,20+i*92+46,50);
      });

      var acc=0;
      keys.forEach(function(k,i){
        var fa=freq[k];
        var fr=(fa/n).toFixed(2);
        var pct=(fa/n*100).toFixed(1)+'%';
        acc+=fa;
        var y=65+i*30;
        ctx.fillStyle=i%2===0?'#f9fafb':'white';
        ctx.fillRect(20,y,460,30);
        ctx.fillStyle='#111827';ctx.font='13px Inter,sans-serif';ctx.textAlign='center';
        [k,fa,fr,pct,acc].forEach(function(val,ci){
          ctx.fillText(val,20+ci*92+46,y+18);
        });
      });

      // total row
      var y=65+keys.length*30;
      ctx.fillStyle='#e0e7ff';ctx.fillRect(20,y,460,28);
      ctx.fillStyle='#1e40af';ctx.font='bold 12px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('TOTAL',20+46,y+18);ctx.fillText(n,20+92+46,y+18);
      ctx.fillText('1.00',20+184+46,y+18);ctx.fillText('100%',20+276+46,y+18);
      ctx.fillText(n,20+368+46,y+18);

      ctx.fillStyle='#111827';ctx.font='bold 13px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Datos: '+rawData.join(', ')+' (n='+n+')',W/2,18);
    }

    var btnR=mkBtn('🔀 Nuevos datos','background:#4F46E5;color:white;');
    btnR.onclick=function(){rawData=Array.from({length:Math.floor(Math.random()*8)+8},()=>Math.floor(Math.random()*5)+3);draw();};

    container.appendChild(cvs);
    var row=mkRow();row.appendChild(btnR);container.appendChild(row);
    draw();
  };

  /* ══════════════════════════════════════════
     8. TENDENCIA CENTRAL VISUAL
  ══════════════════════════════════════════ */
  V['est-central-tendency']=function(container){
    var W=500,H=260,PAD={l:50,r:20,t:40,b:60};
    var data=[3,7,5,12,9,4,8,5,6,11,5];

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var statsDiv=document.createElement('div');
    statsDiv.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;';

    function r2l(x){return Math.round(x*100)/100;}
    function calcMedian(arr){var s=[...arr].sort((a,b)=>a-b),n=s.length;return n%2===0?(s[n/2-1]+s[n/2])/2:s[Math.floor(n/2)];}
    function calcMode(arr){var f={},mx=0;arr.forEach(v=>{f[v]=(f[v]||0)+1;if(f[v]>mx)mx=f[v];});return Object.keys(f).filter(k=>f[k]===mx).map(Number).sort((a,b)=>a-b);}

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);

      var mn=Math.min(...data)-1, mx=Math.max(...data)+1;
      var range=mx-mn;
      var aw=W-PAD.l-PAD.r;
      var toX=v=>PAD.l+(v-mn)/range*aw;

      // plot data points
      data.forEach(function(v){
        ctx.fillStyle='#4F46E5';ctx.globalAlpha=0.7;
        ctx.beginPath();ctx.arc(toX(v),H/2+10,7,0,2*Math.PI);ctx.fill();
      });
      ctx.globalAlpha=1;

      // axis
      ctx.strokeStyle='#374151';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(PAD.l,H/2+22);ctx.lineTo(W-PAD.r,H/2+22);ctx.stroke();

      // tick marks
      for(var v=Math.ceil(mn);v<=Math.floor(mx);v++){
        var x=toX(v);
        ctx.strokeStyle='#9ca3af';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(x,H/2+18);ctx.lineTo(x,H/2+28);ctx.stroke();
        ctx.fillStyle='#6b7280';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(v,x,H/2+42);
      }

      var mean_v=data.reduce((a,b)=>a+b,0)/data.length;
      var median_v=calcMedian(data);
      var modes=calcMode(data);

      // mean line
      ctx.strokeStyle='#EC4899';ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(toX(mean_v),PAD.t);ctx.lineTo(toX(mean_v),H/2+22);ctx.stroke();
      ctx.fillStyle='#EC4899';ctx.font='bold 12px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Media='+r2l(mean_v),toX(mean_v),PAD.t-5);

      // median line
      ctx.strokeStyle='#10B981';ctx.lineWidth=3;ctx.setLineDash([6,3]);
      ctx.beginPath();ctx.moveTo(toX(median_v),PAD.t+20);ctx.lineTo(toX(median_v),H/2+22);ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='#10B981';ctx.font='bold 12px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Med='+r2l(median_v),toX(median_v),PAD.t+15);

      // mode markers
      modes.forEach(function(mo){
        ctx.fillStyle='#F59E0B';
        ctx.beginPath();ctx.arc(toX(mo),H/2+10,10,0,2*Math.PI);
        ctx.strokeStyle='#F59E0B';ctx.lineWidth=3;ctx.stroke();
      });

      ctx.fillStyle='#111827';ctx.font='bold 13px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('Medidas de tendencia central',W/2,18);

      // stats
      statsDiv.innerHTML='';
      [['Media',r2l(mean_v)],['Mediana',r2l(median_v)],['Moda',modes.join(', ')],['n',data.length]].forEach(function(p){
        statsDiv.appendChild(mkStat(p[0],p[1]));
      });
    }

    var btnR=mkBtn('🔀 Nuevos datos','background:#4F46E5;color:white;');
    btnR.onclick=function(){data=Array.from({length:Math.floor(Math.random()*6)+8},()=>Math.floor(Math.random()*15)+1);draw();};
    var btnOut=mkBtn('+ Outlier','background:#EF4444;color:white;');
    btnOut.onclick=function(){data=[...data,Math.floor(Math.random()*20)+25];draw();};

    container.appendChild(cvs);
    var row=mkRow();row.appendChild(btnR);row.appendChild(btnOut);container.appendChild(row);
    container.appendChild(statsDiv);
    draw();
  };

  /* ══════════════════════════════════════════
     9. DISPERSIÓN VISUAL
  ══════════════════════════════════════════ */
  V['est-dispersion-vis']=function(container){
    var W=500,H=260,PAD={l:50,r:20,t:50,b:60};
    var datasets={
      'Homogéneo':[48,50,52,49,51,50,48,53,47,51],
      'Heterogéneo':[20,35,50,65,80,30,70,45,55,90],
      'Con outlier':[50,52,48,51,49,50,48,52,49,200]
    };
    var current='Homogéneo';

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var statsDiv=document.createElement('div');
    statsDiv.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;';

    function calcStats(arr){
      var n=arr.length, m=arr.reduce((a,b)=>a+b,0)/n;
      var v=arr.map(x=>(x-m)**2).reduce((a,b)=>a+b,0)/n;
      return {mean:r2(m),sigma:r2(Math.sqrt(v)),min:Math.min(...arr),max:Math.max(...arr),rango:Math.max(...arr)-Math.min(...arr)};
    }

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f8f9fa)';ctx.fillRect(0,0,W,H);
      var data=datasets[current];
      var st=calcStats(data);
      var mn=st.min-10, mx=st.max+10;
      var range=mx-mn;
      var aw=W-PAD.l-PAD.r;
      var toX=v=>PAD.l+(v-mn)/range*aw;
      var midY=H/2+10;

      // μ±σ region
      var x1=toX(st.mean-st.sigma), x2=toX(st.mean+st.sigma);
      ctx.fillStyle='rgba(79,70,229,0.12)';
      ctx.fillRect(Math.max(PAD.l,x1),PAD.t,Math.min(x2,W-PAD.r)-Math.max(PAD.l,x1),H-PAD.t-PAD.b);

      // axis
      ctx.strokeStyle='#9ca3af';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(PAD.l,midY+20);ctx.lineTo(W-PAD.r,midY+20);ctx.stroke();

      // data points
      data.forEach(function(v,i){
        ctx.fillStyle=COLORS[i%COLORS.length];ctx.globalAlpha=0.8;
        ctx.beginPath();ctx.arc(toX(v),midY,8,0,2*Math.PI);ctx.fill();
      });
      ctx.globalAlpha=1;

      // mean line
      ctx.strokeStyle='#EC4899';ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(toX(st.mean),PAD.t);ctx.lineTo(toX(st.mean),H-PAD.b);ctx.stroke();
      ctx.fillStyle='#EC4899';ctx.font='bold 12px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText('μ='+st.mean,toX(st.mean),PAD.t-8);

      // sigma brackets
      if(toX(st.mean+st.sigma)<W-PAD.r){
        ctx.strokeStyle='#4F46E5';ctx.lineWidth=2;ctx.setLineDash([4,4]);
        [st.mean-st.sigma,st.mean+st.sigma].forEach(function(v){
          ctx.beginPath();ctx.moveTo(toX(v),PAD.t+10);ctx.lineTo(toX(v),H-PAD.b);ctx.stroke();
        });
        ctx.setLineDash([]);
        ctx.fillStyle='#4F46E5';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText('σ='+st.sigma,toX(st.mean+st.sigma),PAD.t+5);
      }

      ctx.fillStyle='#111827';ctx.font='bold 13px Inter,sans-serif';ctx.textAlign='center';
      ctx.fillText(current+' — dispersión',W/2,22);

      statsDiv.innerHTML='';
      [['Media',st.mean],['σ',st.sigma],['Rango',st.rango],['Mín',st.min],['Máx',st.max]].forEach(function(p){
        statsDiv.appendChild(mkStat(p[0],p[1]));
      });
    }

    var btns=Object.keys(datasets).map(function(k){
      var b=mkBtn(k,'background:'+(k===current?'#4F46E5':'#6b7280')+';color:white;');
      b.onclick=function(){current=k;btns.forEach(function(bb,i){bb.style.background=Object.keys(datasets)[i]===k?'#4F46E5':'#6b7280';});draw();};
      return b;
    });

    container.appendChild(cvs);
    var row=mkRow();btns.forEach(function(b){row.appendChild(b);});container.appendChild(row);
    container.appendChild(statsDiv);
    draw();
  };

  // Aliases
  V['est-central-tendency']=V['est-central-tendency']||V['est-frequency-table'];

  console.log('[MM] visual-estadistica.js cargado. Visualizaciones:',
    Object.keys(V).filter(k=>k.startsWith('est-')).length);
})();
