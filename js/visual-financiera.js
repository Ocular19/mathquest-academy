/* ═══════════════════════════════════════════════════════
   VISUAL-FINANCIERA.JS — 9 simuladores interactivos
   Registra en window.MM_GEO_VIS:
     fin-interes-simple, fin-interes-compuesto,
     fin-anualidades, fin-amortizacion, fin-ahorro,
     fin-inflacion, fin-van-tir,
     fin-porcentajes-vis, fin-equivalencia-vis,
     fin-comparacion-vis
   ═══════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if(!window.MM_GEO_VIS) window.MM_GEO_VIS={};
  var V=window.MM_GEO_VIS;

  /* ── utilidades comunes ── */
  function clp(n){return '$'+Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
  function pct(r){return(Math.round(r*10000)/100)+'%';}
  function r2(x){return Math.round(x*100)/100;}
  function r4(x){return Math.round(x*10000)/10000;}

  function mkCanvas(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;c.style.cssText='display:block;max-width:100%;border-radius:8px;';return c;}
  function mkSlider(min,max,val,step){var s=document.createElement('input');s.type='range';s.min=min;s.max=max;s.value=val;s.step=step||1;s.style.cssText='width:150px;cursor:pointer;vertical-align:middle;';return s;}
  function mkLabel(txt,id){var l=document.createElement('label');l.textContent=txt;l.style.cssText='font-size:12px;color:var(--fg-muted,#6b7280);margin-right:4px;';if(id)l.htmlFor=id;return l;}
  function mkSpan(txt,color){var s=document.createElement('span');s.textContent=txt;s.style.cssText='font-size:13px;font-weight:600;color:'+(color||'#4F46E5')+';margin-left:6px;';return s;}
  function mkRow(gap){var d=document.createElement('div');d.style.cssText='display:flex;flex-wrap:wrap;align-items:center;gap:'+(gap||'8px')+';margin:6px 0;';return d;}
  function mkCard(html,bg){var d=document.createElement('div');d.innerHTML=html;d.style.cssText='padding:8px 14px;background:'+(bg||'var(--bg-card,#f9fafb)')+';border-radius:8px;font-size:13px;margin:4px 2px;';return d;}
  function mkBtn(txt,color){var b=document.createElement('button');b.textContent=txt;b.style.cssText='padding:6px 14px;border:none;border-radius:6px;font-size:12px;cursor:pointer;background:'+(color||'#4F46E5')+';color:white;';return b;}

  var COLORS=['#4F46E5','#10B981','#EC4899','#F59E0B','#EF4444','#06B6D4'];

  function drawAxes(ctx,W,H,PAD,xLabel,yLabel){
    ctx.strokeStyle='#374151';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(PAD,PAD);ctx.lineTo(PAD,H-PAD);ctx.lineTo(W-PAD/2,H-PAD);ctx.stroke();
    if(xLabel){ctx.fillStyle='#374151';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';ctx.fillText(xLabel,W/2,H-4);}
    if(yLabel){ctx.save();ctx.translate(12,H/2);ctx.rotate(-Math.PI/2);ctx.fillStyle='#374151';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';ctx.fillText(yLabel,0,0);ctx.restore();}
  }

  function gridAndTicks(ctx,W,H,PAD,xVals,yMax,nGridY){
    nGridY=nGridY||5;
    ctx.strokeStyle='#e5e7eb';ctx.lineWidth=1;
    for(var i=0;i<=nGridY;i++){
      var y=H-PAD-(H-2*PAD)*i/nGridY;
      ctx.beginPath();ctx.moveTo(PAD,y);ctx.lineTo(W-PAD/2,y);ctx.stroke();
      var val=Math.round(yMax*i/nGridY);
      ctx.fillStyle='#9ca3af';ctx.font='10px Inter,sans-serif';ctx.textAlign='right';
      ctx.fillText(val>=1000000?r2(val/1000000)+'M':val>=1000?Math.round(val/1000)+'K':val,PAD-4,y+4);
    }
    if(xVals){
      var step=Math.max(1,Math.ceil(xVals.length/6));
      xVals.forEach(function(v,i){
        if(i%step!==0&&i!==xVals.length-1) return;
        var x=PAD+(W-PAD*1.5)*i/(xVals.length-1);
        ctx.fillStyle='#9ca3af';ctx.font='10px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(v,x,H-PAD+14);
      });
    }
  }

  function plotLine(ctx,points,W,H,PAD,yMax,color,lw){
    if(!points.length) return;
    ctx.strokeStyle=color||'#4F46E5';ctx.lineWidth=lw||2.5;
    ctx.beginPath();
    points.forEach(function(p,i){
      var x=PAD+(W-PAD*1.5)*i/(points.length-1);
      var y=H-PAD-(H-2*PAD)*p/yMax;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.stroke();
  }

  /* ══════════════════════════════════════════
     1. SIMULADOR INTERÉS SIMPLE
  ══════════════════════════════════════════ */
  V['fin-interes-simple']=function(container){
    var W=500,H=260,PAD=50;
    var P=1000000, r_anual=10, t_anos=5;

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var resultsDiv=document.createElement('div');
    resultsDiv.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin:8px 0;';

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f9fafb)';ctx.fillRect(0,0,W,H);

      var r=r_anual/100;
      var pts_IS=[], pts_IC=[];
      var nPts=Math.max(t_anos*12,24);
      for(var i=0;i<=nPts;i++){
        var t=t_anos*i/nPts;
        pts_IS.push(P*(1+r*t));
        pts_IC.push(P*Math.pow(1+r,t));
      }
      var yMax=Math.max(...pts_IC)*1.05;
      var xLabels=[];
      for(var y=0;y<=t_anos;y++) xLabels.push(y+'a');

      gridAndTicks(ctx,W,H,PAD,xLabels,yMax,5);
      plotLine(ctx,pts_IS,W,H,PAD,yMax,'#4F46E5',2.5);
      plotLine(ctx,pts_IC,W,H,PAD,yMax,'#10B981',2.5);

      // legend
      ctx.font='11px Inter,sans-serif';ctx.textAlign='left';
      [[COLORS[0],'Interés Simple'],[COLORS[1],'Interés Compuesto']].forEach(function(p,i){
        ctx.fillStyle=p[0];ctx.fillRect(PAD+10,PAD+8+i*18,12,10);
        ctx.fillStyle='#374151';ctx.fillText(p[1],PAD+26,PAD+17+i*18);
      });

      drawAxes(ctx,W,H,PAD,'Tiempo (años)','Monto ($)');

      var I_IS=P*r*t_anos, M_IS=P+I_IS;
      var M_IC=P*Math.pow(1+r,t_anos), I_IC=M_IC-P;

      resultsDiv.innerHTML='';
      [
        ['Capital','#374151',clp(P)],
        ['IS: Interés','#4F46E5',clp(I_IS)],
        ['IS: Monto','#4F46E5',clp(M_IS)],
        ['IC: Monto','#10B981',clp(Math.round(M_IC))],
        ['IC extra vs IS','#10B981',clp(Math.round(M_IC-M_IS))]
      ].forEach(function(d){resultsDiv.appendChild(mkCard('<b style="color:'+d[1]+'">'+d[0]+':</b> '+d[2]));});
    }

    var slP=mkSlider(100000,10000000,P,100000);
    var slR=mkSlider(1,30,r_anual,1);
    var slT=mkSlider(1,30,t_anos,1);
    var spP=mkSpan(clp(P));var spR=mkSpan(r_anual+'%');var spT=mkSpan(t_anos+' años');

    slP.oninput=function(){P=parseInt(this.value);spP.textContent=clp(P);draw();};
    slR.oninput=function(){r_anual=parseInt(this.value);spR.textContent=r_anual+'%';draw();};
    slT.oninput=function(){t_anos=parseInt(this.value);spT.textContent=t_anos+' años';draw();};

    container.appendChild(cvs);
    var r1=mkRow();r1.appendChild(mkLabel('Capital:'));r1.appendChild(slP);r1.appendChild(spP);container.appendChild(r1);
    var r2=mkRow();r2.appendChild(mkLabel('Tasa anual:'));r2.appendChild(slR);r2.appendChild(spR);container.appendChild(r2);
    var r3=mkRow();r3.appendChild(mkLabel('Plazo:'));r3.appendChild(slT);r3.appendChild(spT);container.appendChild(r3);
    container.appendChild(resultsDiv);
    draw();
  };

  /* ══════════════════════════════════════════
     2. SIMULADOR INTERÉS COMPUESTO
  ══════════════════════════════════════════ */
  V['fin-interes-compuesto']=function(container){
    var W=500,H=270,PAD=55;
    var P=1000000, r_anual=8, anos=10;
    var frecs={Anual:1,Semestral:2,Trimestral:4,Mensual:12,Diaria:365};
    var freq='Mensual';

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var infoDiv=document.createElement('div');
    infoDiv.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin:6px 0;';

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f9fafb)';ctx.fillRect(0,0,W,H);

      var r=r_anual/100;
      var m=frecs[freq];
      var rm=r/m;
      var nTotal=anos*m;

      var pts=[], ptsSimple=[];
      for(var i=0;i<=anos*12;i++){
        var t=i/12;
        pts.push(P*Math.pow(1+rm,t*m));
        ptsSimple.push(P*(1+r*t));
      }
      var yMax=Math.max(...pts)*1.05;
      var xLabels=Array.from({length:anos+1},(_,i)=>i+'a');

      gridAndTicks(ctx,W,H,PAD,xLabels,yMax,5);
      plotLine(ctx,ptsSimple,W,H,PAD,yMax,'#9ca3af',1.5);
      plotLine(ctx,pts,W,H,PAD,yMax,'#10B981',3);

      // año por año markers
      var r_pts=Math.pow(1+rm,m);
      for(var y=0;y<=anos;y++){
        var xp=PAD+(W-PAD*1.5)*y/anos;
        var val=P*Math.pow(r_pts,y);
        var yp=H-PAD-(H-2*PAD)*val/yMax;
        ctx.fillStyle='#10B981';ctx.beginPath();ctx.arc(xp,yp,4,0,2*Math.PI);ctx.fill();
      }

      ctx.font='11px Inter,sans-serif';ctx.textAlign='left';
      ctx.fillStyle='#9ca3af';ctx.fillRect(PAD+8,PAD+6,10,8);ctx.fillStyle='#374151';ctx.fillText('Simple',PAD+22,PAD+14);
      ctx.fillStyle='#10B981';ctx.fillRect(PAD+80,PAD+6,10,8);ctx.fillStyle='#374151';ctx.fillText('Compuesto ('+freq+')',PAD+94,PAD+14);

      drawAxes(ctx,W,H,PAD,'Años','Monto ($)');

      var M=Math.round(P*Math.pow(1+rm,nTotal));
      var TEA=r4(Math.pow(1+rm,m)-1);

      infoDiv.innerHTML='';
      [
        ['Capital inicial',clp(P),'#374151'],
        ['TEA efectiva',pct(TEA),'#4F46E5'],
        ['Monto final',clp(M),'#10B981'],
        ['Intereses ganados',clp(M-P),'#10B981'],
        ['Factor de crecimiento',r2(M/P)+'x','#EC4899'],
      ].forEach(function(d){infoDiv.appendChild(mkCard('<b style="color:'+d[2]+'">'+d[0]+':</b> '+d[1]);});
    }

    var slP=mkSlider(100000,10000000,P,100000);
    var slR=mkSlider(1,25,r_anual,0.5);
    var slA=mkSlider(1,40,anos,1);
    var spP=mkSpan(clp(P));var spR=mkSpan(r_anual+'%');var spA=mkSpan(anos+' años');

    slP.oninput=function(){P=parseInt(this.value);spP.textContent=clp(P);draw();};
    slR.oninput=function(){r_anual=parseFloat(this.value);spR.textContent=r_anual+'%';draw();};
    slA.oninput=function(){anos=parseInt(this.value);spA.textContent=anos+' años';draw();};

    var freqBtns={};
    Object.keys(frecs).forEach(function(f){
      var b=mkBtn(f,f===freq?'#10B981':'#6b7280');
      b.style.padding='4px 8px';b.style.fontSize='11px';
      b.onclick=function(){freq=f;Object.keys(freqBtns).forEach(function(k){freqBtns[k].style.background=k===f?'#10B981':'#6b7280';});draw();};
      freqBtns[f]=b;
    });

    container.appendChild(cvs);
    var r1=mkRow();r1.appendChild(mkLabel('Capital:'));r1.appendChild(slP);r1.appendChild(spP);container.appendChild(r1);
    var r2=mkRow();r2.appendChild(mkLabel('Tasa anual:'));r2.appendChild(slR);r2.appendChild(spR);container.appendChild(r2);
    var r3=mkRow();r3.appendChild(mkLabel('Plazo:'));r3.appendChild(slA);r3.appendChild(spA);container.appendChild(r3);
    var r4div=mkRow();r4div.appendChild(mkLabel('Capitalización:'));Object.values(freqBtns).forEach(function(b){r4div.appendChild(b);});container.appendChild(r4div);
    container.appendChild(infoDiv);
    draw();
  };

  /* ══════════════════════════════════════════
     3. SIMULADOR ANUALIDADES
  ══════════════════════════════════════════ */
  V['fin-anualidades']=function(container){
    var W=500,H=250,PAD=50;
    var PMT=100000, r_mensual=1.0, n_meses=24;

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var infoDiv=document.createElement('div');
    infoDiv.style.cssText='display:flex;flex-wrap:wrap;gap:8px;margin:6px 0;';

    function calcVF(){var r=r_mensual/100;return PMT*(Math.pow(1+r,n_meses)-1)/r;}
    function calcVP(){var r=r_mensual/100;return PMT*(1-Math.pow(1+r,-n_meses))/r;}

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f9fafb)';ctx.fillRect(0,0,W,H);

      var r=r_mensual/100;
      var pts=[];
      for(var i=0;i<=n_meses;i++) pts.push(PMT*(Math.pow(1+r,i)-1)/r);
      var yMax=calcVF()*1.05;

      gridAndTicks(ctx,W,H,PAD,Array.from({length:n_meses+1},(_,i)=>i%6===0||i===n_meses?i:null).filter(v=>v!==null).map(String),yMax,5);
      plotLine(ctx,pts,W,H,PAD,yMax,'#4F46E5',2.5);

      // accumulated contribution line (no interest)
      var contrib=[];for(var i=0;i<=n_meses;i++) contrib.push(PMT*i);
      plotLine(ctx,contrib,W,H,PAD,yMax,'#9ca3af',1.5);

      ctx.font='11px Inter,sans-serif';ctx.textAlign='left';
      [[COLORS[0],'Con interés'],[COLORS[5],'Sin interés']].forEach(function(p,i){
        var color=i===0?COLORS[0]:'#9ca3af';
        ctx.fillStyle=color;ctx.fillRect(PAD+8,PAD+6+i*16,10,8);
        ctx.fillStyle='#374151';ctx.fillText(p[1],PAD+22,PAD+14+i*16);
      });

      drawAxes(ctx,W,H,PAD,'Meses','Valor acumulado');

      var VF=calcVF(),VP=calcVP();
      var aportado=PMT*n_meses,ganado=VF-aportado;

      infoDiv.innerHTML='';
      [
        ['Cuota mensual',clp(PMT),'#374151'],
        ['VF (Valor Futuro)',clp(Math.round(VF)),'#4F46E5'],
        ['VP (Valor Presente)',clp(Math.round(VP)),'#EC4899'],
        ['Total aportado',clp(aportado),'#6b7280'],
        ['Ganado por intereses',clp(Math.round(ganado)),'#10B981'],
      ].forEach(function(d){infoDiv.appendChild(mkCard('<b style="color:'+d[2]+'">'+d[0]+':</b> '+d[1]);});
    }

    var slPMT=mkSlider(10000,500000,PMT,10000);
    var slR=mkSlider(0.1,5,r_mensual,0.1);
    var slN=mkSlider(6,120,n_meses,6);
    var spPMT=mkSpan(clp(PMT));var spR=mkSpan(r_mensual+'%/mes');var spN=mkSpan(n_meses+' meses');

    slPMT.oninput=function(){PMT=parseInt(this.value);spPMT.textContent=clp(PMT);draw();};
    slR.oninput=function(){r_mensual=parseFloat(this.value);spR.textContent=r_mensual+'%/mes';draw();};
    slN.oninput=function(){n_meses=parseInt(this.value);spN.textContent=n_meses+' meses';draw();};

    container.appendChild(cvs);
    var r1=mkRow();r1.appendChild(mkLabel('Cuota:'));r1.appendChild(slPMT);r1.appendChild(spPMT);container.appendChild(r1);
    var r2=mkRow();r2.appendChild(mkLabel('Tasa mensual:'));r2.appendChild(slR);r2.appendChild(spR);container.appendChild(r2);
    var r3=mkRow();r3.appendChild(mkLabel('Meses:'));r3.appendChild(slN);r3.appendChild(spN);container.appendChild(r3);
    container.appendChild(infoDiv);
    draw();
  };

  /* ══════════════════════════════════════════
     4. SIMULADOR AMORTIZACIÓN (tabla + gráfico)
  ══════════════════════════════════════════ */
  V['fin-amortizacion']=function(container){
    var VP=5000000, r_mensual=1.0, n_cuotas=24;

    var chartDiv=document.createElement('div');
    var tableWrap=document.createElement('div');
    tableWrap.style.cssText='overflow-x:auto;max-height:200px;overflow-y:auto;font-size:12px;margin-top:8px;';

    var infoDiv=document.createElement('div');
    infoDiv.style.cssText='display:flex;flex-wrap:wrap;gap:6px;margin:4px 0;';

    var W=500,H=220,PAD=50;
    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');

    function cuota(pv,r,n){return pv*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}

    function buildTable(){
      var r=r_mensual/100;
      var pmt=cuota(VP,r,n_cuotas);
      var rows=[],saldo=VP;
      for(var k=1;k<=n_cuotas;k++){
        var int_k=saldo*r, amort_k=pmt-int_k;
        saldo-=amort_k;
        rows.push({k,int:int_k,amort:amort_k,saldo:Math.max(0,saldo)});
      }
      return {pmt,rows};
    }

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f9fafb)';ctx.fillRect(0,0,W,H);

      var r=r_mensual/100;
      var {pmt,rows}=buildTable();

      // stacked bar: interés vs amortización
      var bw=(W-PAD*1.5)/n_cuotas;
      var yMax=pmt*1.1;

      gridAndTicks(ctx,W,H,PAD,null,yMax,4);

      rows.forEach(function(row,i){
        var x=PAD+i*bw;
        var h_int=(row.int/yMax)*(H-2*PAD);
        var h_am=(row.amort/yMax)*(H-2*PAD);
        var y_base=H-PAD;
        ctx.fillStyle='#EC4899';ctx.fillRect(x,y_base-h_int,bw-1,h_int);
        ctx.fillStyle='#4F46E5';ctx.fillRect(x,y_base-h_int-h_am,bw-1,h_am);
      });

      // saldo line
      var saldoPts=rows.map(r=>r.saldo);
      var yMaxSaldo=VP;
      ctx.strokeStyle='#10B981';ctx.lineWidth=2;ctx.setLineDash([4,4]);
      ctx.beginPath();
      saldoPts.forEach(function(s,i){
        var x=PAD+i*bw+bw/2;
        var y=H-PAD-(H-2*PAD)*s/yMaxSaldo;
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      });
      ctx.stroke();ctx.setLineDash([]);

      ctx.font='10px Inter,sans-serif';ctx.textAlign='left';
      ctx.fillStyle='#EC4899';ctx.fillRect(PAD+5,PAD+5,10,8);ctx.fillStyle='#374151';ctx.fillText('Interés',PAD+18,PAD+13);
      ctx.fillStyle='#4F46E5';ctx.fillRect(PAD+75,PAD+5,10,8);ctx.fillStyle='#374151';ctx.fillText('Amortiz.',PAD+88,PAD+13);
      ctx.fillStyle='#10B981';ctx.fillRect(PAD+158,PAD+5,10,4);ctx.fillStyle='#374151';ctx.fillText('Saldo',PAD+172,PAD+13);

      drawAxes(ctx,W,H,PAD,'Cuota N°','Monto ($)');

      // Info summary
      var total=pmt*n_cuotas, intereses=total-VP;
      infoDiv.innerHTML='';
      [
        ['Cuota fija',clp(Math.round(pmt)),'#4F46E5'],
        ['Total pagado',clp(Math.round(total)),'#374151'],
        ['Intereses totales',clp(Math.round(intereses)),'#EC4899'],
        ['Interés sobre capital',r2(intereses/VP*100)+'%','#EC4899'],
      ].forEach(function(d){infoDiv.appendChild(mkCard('<b style="color:'+d[2]+'">'+d[0]+':</b> '+d[1]);});

      // Table
      tableWrap.innerHTML='';
      var tbl=document.createElement('table');
      tbl.style.cssText='border-collapse:collapse;width:100%;';
      var thead=tbl.createTHead();
      var hrow=thead.insertRow();
      ['N°','Cuota','Interés','Amort.','Saldo'].forEach(function(h){
        var th=document.createElement('th');th.textContent=h;
        th.style.cssText='padding:4px 8px;background:#4F46E5;color:white;font-size:11px;text-align:right;position:sticky;top:0;';
        hrow.appendChild(th);
      });
      var tbody=tbl.createTBody();
      var {rows:rows2,pmt:pmt2}=buildTable();
      rows2.forEach(function(row){
        var tr=tbody.insertRow();
        tr.style.background=row.k%2===0?'#f9fafb':'white';
        [row.k,clp(Math.round(pmt2)),clp(Math.round(row.int)),clp(Math.round(row.amort)),clp(Math.round(row.saldo))].forEach(function(v,ci){
          var td=tr.insertCell();td.textContent=v;
          td.style.cssText='padding:3px 8px;font-size:11px;text-align:right;color:'+(ci===2?'#EC4899':ci===3?'#4F46E5':'#374151')+';';
        });
      });
      tableWrap.appendChild(tbl);
    }

    var slVP=mkSlider(500000,50000000,VP,500000);
    var slR=mkSlider(0.1,5,r_mensual,0.1);
    var slN=mkSlider(6,360,n_cuotas,6);
    var spVP=mkSpan(clp(VP));var spR=mkSpan(r_mensual+'%/mes');var spN=mkSpan(n_cuotas+' cuotas');

    slVP.oninput=function(){VP=parseInt(this.value);spVP.textContent=clp(VP);draw();};
    slR.oninput=function(){r_mensual=parseFloat(this.value);spR.textContent=r_mensual+'%/mes';draw();};
    slN.oninput=function(){n_cuotas=parseInt(this.value);spN.textContent=n_cuotas+' cuotas';draw();};

    container.appendChild(cvs);
    var r1=mkRow();r1.appendChild(mkLabel('Monto:'));r1.appendChild(slVP);r1.appendChild(spVP);container.appendChild(r1);
    var r2=mkRow();r2.appendChild(mkLabel('Tasa mensual:'));r2.appendChild(slR);r2.appendChild(spR);container.appendChild(r2);
    var r3=mkRow();r3.appendChild(mkLabel('Cuotas:'));r3.appendChild(slN);r3.appendChild(spN);container.appendChild(r3);
    container.appendChild(infoDiv);
    container.appendChild(tableWrap);
    draw();
  };

  /* ══════════════════════════════════════════
     5. SIMULADOR AHORRO / INVERSIÓN PERIÓDICA
  ══════════════════════════════════════════ */
  V['fin-ahorro']=function(container){
    var W=500,H=250,PAD=55;
    var PMT=100000, r_anual=6, anos=20;

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var infoDiv=document.createElement('div');
    infoDiv.style.cssText='display:flex;flex-wrap:wrap;gap:6px;margin:6px 0;';

    function calcVF_anualidad(pmt,rm,n){return pmt*(Math.pow(1+rm,n)-1)/rm;}

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f9fafb)';ctx.fillRect(0,0,W,H);

      var rm=Math.pow(1+r_anual/100,1/12)-1;
      var n_total=anos*12;

      var pts_vf=[], pts_contrib=[];
      for(var i=0;i<=n_total;i++){
        pts_vf.push(calcVF_anualidad(PMT,rm,i));
        pts_contrib.push(PMT*i);
      }

      var VF=pts_vf[n_total];
      var yMax=VF*1.05;
      var xLabels=Array.from({length:anos+1},(_,i)=>i%5===0||i===anos?i+'a':null).filter(Boolean);

      gridAndTicks(ctx,W,H,PAD,xLabels,yMax,5);
      plotLine(ctx,pts_contrib,W,H,PAD,yMax,'#9ca3af',1.5);
      plotLine(ctx,pts_vf,W,H,PAD,yMax,'#10B981',3);

      // fill area between
      ctx.beginPath();
      pts_vf.forEach(function(v,i){
        var x=PAD+(W-PAD*1.5)*i/(pts_vf.length-1);
        var y=H-PAD-(H-2*PAD)*v/yMax;
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      });
      pts_contrib.slice().reverse().forEach(function(v,i){
        var ri=pts_contrib.length-1-i;
        var x=PAD+(W-PAD*1.5)*ri/(pts_contrib.length-1);
        var y=H-PAD-(H-2*PAD)*v/yMax;
        ctx.lineTo(x,y);
      });
      ctx.closePath();
      ctx.fillStyle='rgba(16,185,129,0.15)';ctx.fill();

      ctx.font='11px Inter,sans-serif';ctx.textAlign='left';
      ctx.fillStyle='#9ca3af';ctx.fillRect(PAD+8,PAD+6,10,8);ctx.fillStyle='#374151';ctx.fillText('Aportado',PAD+22,PAD+14);
      ctx.fillStyle='#10B981';ctx.fillRect(PAD+88,PAD+6,10,8);ctx.fillStyle='#374151';ctx.fillText('Con interés',PAD+102,PAD+14);

      drawAxes(ctx,W,H,PAD,'Años','Valor acumulado');

      var aportado=PMT*n_total, ganado=VF-aportado;
      var TEA=Math.pow(1+rm,12)-1;

      infoDiv.innerHTML='';
      [
        ['Cuota mensual',clp(PMT),'#374151'],
        ['TEA real',pct(r4(TEA)),'#4F46E5'],
        ['Acumulado final',clp(Math.round(VF)),'#10B981'],
        ['Total aportado',clp(aportado),'#6b7280'],
        ['Ganado (interés)',clp(Math.round(ganado)),'#10B981'],
        ['Multiplicador',r2(VF/aportado)+'x','#EC4899'],
      ].forEach(function(d){infoDiv.appendChild(mkCard('<b style="color:'+d[2]+'">'+d[0]+':</b> '+d[1]);});
    }

    var slPMT=mkSlider(10000,1000000,PMT,10000);
    var slR=mkSlider(1,20,r_anual,0.5);
    var slA=mkSlider(1,40,anos,1);
    var spPMT=mkSpan(clp(PMT));var spR=mkSpan(r_anual+'%/año');var spA=mkSpan(anos+' años');

    slPMT.oninput=function(){PMT=parseInt(this.value);spPMT.textContent=clp(PMT);draw();};
    slR.oninput=function(){r_anual=parseFloat(this.value);spR.textContent=r_anual+'%/año';draw();};
    slA.oninput=function(){anos=parseInt(this.value);spA.textContent=anos+' años';draw();};

    container.appendChild(cvs);
    var r1=mkRow();r1.appendChild(mkLabel('Cuota mensual:'));r1.appendChild(slPMT);r1.appendChild(spPMT);container.appendChild(r1);
    var r2=mkRow();r2.appendChild(mkLabel('Rentabilidad anual:'));r2.appendChild(slR);r2.appendChild(spR);container.appendChild(r2);
    var r3=mkRow();r3.appendChild(mkLabel('Plazo:'));r3.appendChild(slA);r3.appendChild(spA);container.appendChild(r3);
    container.appendChild(infoDiv);
    draw();
  };

  /* ══════════════════════════════════════════
     6. SIMULADOR INFLACIÓN Y PODER ADQUISITIVO
  ══════════════════════════════════════════ */
  V['fin-inflacion']=function(container){
    var W=500,H=240,PAD=55;
    var capital=1000000, inf_anual=4, anos=20;
    var uf_hoy=38000;

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var infoDiv=document.createElement('div');
    infoDiv.style.cssText='display:flex;flex-wrap:wrap;gap:6px;margin:6px 0;';

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f9fafb)';ctx.fillRect(0,0,W,H);

      var inf=inf_anual/100;
      var pts_nominal=[], pts_real=[];
      for(var i=0;i<=anos;i++){
        pts_nominal.push(capital);
        pts_real.push(capital/Math.pow(1+inf,i));
      }
      var yMax=capital*1.05;
      var xLabels=Array.from({length:anos+1},(_,i)=>i%5===0||i===anos?i+'a':null).filter(Boolean);

      gridAndTicks(ctx,W,H,PAD,xLabels,yMax,5);
      plotLine(ctx,pts_nominal,W,H,PAD,yMax,'#9ca3af',1.5);
      plotLine(ctx,pts_real,W,H,PAD,yMax,'#EF4444',3);

      ctx.font='11px Inter,sans-serif';ctx.textAlign='left';
      ctx.fillStyle='#9ca3af';ctx.fillRect(PAD+8,PAD+6,10,8);ctx.fillStyle='#374151';ctx.fillText('Nominal',PAD+22,PAD+14);
      ctx.fillStyle='#EF4444';ctx.fillRect(PAD+88,PAD+6,10,8);ctx.fillStyle='#374151';ctx.fillText('Poder adquisitivo real',PAD+102,PAD+14);

      drawAxes(ctx,W,H,PAD,'Años','Valor real');

      var valReal=Math.round(capital/Math.pow(1+inf,anos));
      var perdida=capital-valReal;
      var uf_futura=r2(uf_hoy*Math.pow(1+inf,anos));

      infoDiv.innerHTML='';
      [
        ['Capital nominal',clp(capital),'#374151'],
        ['Inflación anual',inf_anual+'%','#EF4444'],
        ['Poder adquisitivo en '+anos+'a',clp(valReal),'#EF4444'],
        ['Pérdida de poder',clp(perdida)+' ('+r2(perdida/capital*100)+'%)','#EF4444'],
        ['UF hoy → en '+anos+'a',clp(uf_hoy)+' → '+clp(uf_futura),'#4F46E5'],
      ].forEach(function(d){infoDiv.appendChild(mkCard('<b style="color:'+d[2]+'">'+d[0]+':</b> '+d[1]);});
    }

    var slC=mkSlider(100000,10000000,capital,100000);
    var slI=mkSlider(1,20,inf_anual,0.5);
    var slA=mkSlider(1,40,anos,1);
    var spC=mkSpan(clp(capital));var spI=mkSpan(inf_anual+'%/año');var spA=mkSpan(anos+' años');

    slC.oninput=function(){capital=parseInt(this.value);spC.textContent=clp(capital);draw();};
    slI.oninput=function(){inf_anual=parseFloat(this.value);spI.textContent=inf_anual+'%/año';draw();};
    slA.oninput=function(){anos=parseInt(this.value);spA.textContent=anos+' años';draw();};

    container.appendChild(cvs);
    var r1=mkRow();r1.appendChild(mkLabel('Capital:'));r1.appendChild(slC);r1.appendChild(spC);container.appendChild(r1);
    var r2=mkRow();r2.appendChild(mkLabel('Inflación anual:'));r2.appendChild(slI);r2.appendChild(spI);container.appendChild(r2);
    var r3=mkRow();r3.appendChild(mkLabel('Años:'));r3.appendChild(slA);r3.appendChild(spA);container.appendChild(r3);
    container.appendChild(infoDiv);
    draw();
  };

  /* ══════════════════════════════════════════
     7. SIMULADOR VAN Y TIR
  ══════════════════════════════════════════ */
  V['fin-van-tir']=function(container){
    var W=500,H=260,PAD=50;
    var I0=10000000;
    var flujos=[3000000,4000000,4000000,5000000,3000000];

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var infoDiv=document.createElement('div');
    infoDiv.style.cssText='display:flex;flex-wrap:wrap;gap:6px;margin:6px 0;';

    function calcVAN(r){
      var van=-I0;
      flujos.forEach(function(fc,i){van+=fc/Math.pow(1+r,i+1);});
      return van;
    }

    function bisectTIR(){
      var lo=0,hi=10,van_lo=calcVAN(lo),van_hi=calcVAN(hi);
      if(van_lo<0) return null;
      if(van_hi>0) return hi;
      for(var i=0;i<50;i++){
        var mid=(lo+hi)/2,van_mid=calcVAN(mid);
        if(Math.abs(van_mid)<1) return mid;
        if(van_mid>0) lo=mid; else hi=mid;
      }
      return (lo+hi)/2;
    }

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f9fafb)';ctx.fillRect(0,0,W,H);

      var rates=[];for(var i=0;i<=100;i++) rates.push(i/100*0.5);
      var vans=rates.map(calcVAN);
      var yMin=Math.min(...vans)*1.1, yMax=Math.max(...vans)*1.1;
      var yRange=yMax-yMin;

      ctx.strokeStyle='#e5e7eb';ctx.lineWidth=1;
      [0,25,50].forEach(function(pct_r){
        var x=PAD+(W-PAD*1.5)*pct_r/50;
        ctx.beginPath();ctx.moveTo(x,PAD);ctx.lineTo(x,H-PAD);ctx.stroke();
        ctx.fillStyle='#9ca3af';ctx.font='10px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(pct_r+'%',x,H-PAD+14);
      });

      for(var g=0;g<=4;g++){
        var v=yMin+yRange*g/4;
        var y=H-PAD-(H-2*PAD)*(v-yMin)/yRange;
        ctx.beginPath();ctx.moveTo(PAD,y);ctx.lineTo(W-PAD/2,y);ctx.stroke();
        ctx.fillStyle='#9ca3af';ctx.font='10px Inter,sans-serif';ctx.textAlign='right';
        ctx.fillText(Math.abs(v)>=1000000?(v>=0?'':'-')+r2(Math.abs(v)/1000000)+'M':(v>=0?'':'-')+r2(Math.abs(v)/1000)+'K',PAD-4,y+4);
      }

      // zero line
      var y0=H-PAD-(H-2*PAD)*(-yMin)/yRange;
      ctx.strokeStyle='#374151';ctx.lineWidth=1.5;ctx.setLineDash([4,4]);
      ctx.beginPath();ctx.moveTo(PAD,y0);ctx.lineTo(W-PAD/2,y0);ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='#374151';ctx.font='10px Inter,sans-serif';ctx.textAlign='right';
      ctx.fillText('VAN=0',PAD-4,y0);

      // VAN curve
      ctx.strokeStyle='#4F46E5';ctx.lineWidth=3;
      ctx.beginPath();
      vans.forEach(function(v,i){
        var x=PAD+(W-PAD*1.5)*i/(vans.length-1);
        var y=H-PAD-(H-2*PAD)*(v-yMin)/yRange;
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      });
      ctx.stroke();

      // TIR marker
      var tir=bisectTIR();
      if(tir!==null&&tir<=0.5){
        var x_tir=PAD+(W-PAD*1.5)*tir/0.5;
        ctx.strokeStyle='#EC4899';ctx.lineWidth=2;ctx.setLineDash([6,3]);
        ctx.beginPath();ctx.moveTo(x_tir,PAD);ctx.lineTo(x_tir,H-PAD);ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle='#EC4899';ctx.font='bold 11px Inter,sans-serif';ctx.textAlign='left';
        ctx.fillText('TIR='+r2(tir*100)+'%',x_tir+4,PAD+20);
      }

      drawAxes(ctx,W,H,PAD,'Tasa de descuento (%)','VAN ($)');

      var van_10=Math.round(calcVAN(0.10));
      var van_15=Math.round(calcVAN(0.15));

      infoDiv.innerHTML='';
      [
        ['Inversión inicial',clp(I0),'#374151'],
        ['Flujos anuales',flujos.map((f,i)=>'Año '+(i+1)+': '+clp(f)).join(' | '),'#6b7280'],
        ['VAN al 10%',clp(van_10),van_10>0?'#10B981':'#EF4444'],
        ['VAN al 15%',clp(van_15),van_15>0?'#10B981':'#EF4444'],
        ['TIR estimada',tir?r2(tir*100)+'%':'no encontrada','#EC4899'],
      ].forEach(function(d){infoDiv.appendChild(mkCard('<b style="color:'+d[2]+'">'+d[0]+':</b> '+d[1]);});
    }

    // Flujo editors
    var flujoInputs=flujos.map(function(f,i){
      var sl=mkSlider(0,10000000,f,500000);
      sl.oninput=function(){flujos[i]=parseInt(this.value);draw();};
      return sl;
    });

    var slI0=mkSlider(1000000,50000000,I0,1000000);
    var spI0=mkSpan(clp(I0));
    slI0.oninput=function(){I0=parseInt(this.value);spI0.textContent=clp(I0);draw();};

    container.appendChild(cvs);
    var r0=mkRow();r0.appendChild(mkLabel('Inversión inicial:'));r0.appendChild(slI0);r0.appendChild(spI0);container.appendChild(r0);
    flujoInputs.forEach(function(sl,i){
      var row=mkRow();var sp=mkSpan(clp(flujos[i]));
      sl.oninput=function(){flujos[i]=parseInt(this.value);sp.textContent=clp(flujos[i]);draw();};
      row.appendChild(mkLabel('Año '+(i+1)+':'));row.appendChild(sl);row.appendChild(sp);
      container.appendChild(row);
    });
    container.appendChild(infoDiv);
    draw();
  };

  /* ══════════════════════════════════════════
     8. PORCENTAJES — VISUAL
  ══════════════════════════════════════════ */
  V['fin-porcentajes-vis']=function(container){
    var W=500,H=220;
    var precio=200000, d1=30, d2=20;

    var cvs=mkCanvas(W,H);
    var ctx=cvs.getContext('2d');
    var infoDiv=document.createElement('div');
    infoDiv.style.cssText='display:flex;flex-wrap:wrap;gap:6px;margin:6px 0;';

    function draw(){
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle='var(--bg-card,#f9fafb)';ctx.fillRect(0,0,W,H);

      var p1=precio*(1-d1/100), p2=p1*(1-d2/100);
      var equiv=r2(100-(1-d1/100)*(1-d2/100)*100);
      var addDesc=r2(d1+d2);

      var vals=[precio,p1,p2];
      var labels=['Precio original','Tras '+d1+'% desc.','Tras +'+d2+'% desc.'];
      var colors=['#374151','#4F46E5','#10B981'];
      var barW=120, gap=20, startX=30;
      var maxH=160, barY=H-40;

      vals.forEach(function(v,i){
        var bh=v/precio*maxH;
        var x=startX+i*(barW+gap);
        ctx.fillStyle=colors[i];
        ctx.fillRect(x,barY-bh,barW,bh);
        ctx.fillStyle='#374151';ctx.font='11px Inter,sans-serif';ctx.textAlign='center';
        ctx.fillText(clp(Math.round(v)),x+barW/2,barY-bh-6);
        ctx.fillText(labels[i],x+barW/2,H-20);
      });

      infoDiv.innerHTML='';
      [
        ['Precio original',clp(precio),'#374151'],
        [d1+'%+'+d2+'% equiv.',equiv+'%','#EC4899'],
        ['vs suma',addDesc+'%','#9ca3af'],
        ['Precio final',clp(Math.round(p2)),'#10B981'],
        ['IVA incluido',clp(Math.round(p2*1.19)),'#4F46E5'],
      ].forEach(function(d){infoDiv.appendChild(mkCard('<b style="color:'+d[2]+'">'+d[0]+':</b> '+d[1]);});
    }

    var slP=mkSlider(10000,2000000,precio,10000);
    var slD1=mkSlider(0,50,d1,5);
    var slD2=mkSlider(0,50,d2,5);
    var spP=mkSpan(clp(precio));var spD1=mkSpan(d1+'%');var spD2=mkSpan(d2+'%');

    slP.oninput=function(){precio=parseInt(this.value);spP.textContent=clp(precio);draw();};
    slD1.oninput=function(){d1=parseInt(this.value);spD1.textContent=d1+'%';draw();};
    slD2.oninput=function(){d2=parseInt(this.value);spD2.textContent=d2+'%';draw();};

    container.appendChild(cvs);
    var r1=mkRow();r1.appendChild(mkLabel('Precio:'));r1.appendChild(slP);r1.appendChild(spP);container.appendChild(r1);
    var r2=mkRow();r2.appendChild(mkLabel('1er descuento:'));r2.appendChild(slD1);r2.appendChild(spD1);container.appendChild(r2);
    var r3=mkRow();r3.appendChild(mkLabel('2do descuento:'));r3.appendChild(slD2);r3.appendChild(spD2);container.appendChild(r3);
    container.appendChild(infoDiv);
    draw();
  };

  /* ── aliases ── */
  V['fin-equivalencia-vis']=V['fin-interes-compuesto'];
  V['fin-comparacion-vis']=V['fin-amortizacion'];

  console.log('[MM] visual-financiera.js cargado. Simuladores financieros:',
    Object.keys(V).filter(k=>k.startsWith('fin-')).length);
})();
