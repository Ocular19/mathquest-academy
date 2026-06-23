/* ═══════════════════════════════════════════════════════════════
   GENERATORS-TRIGONOMETRIA.JS — 48 generadores, 8 temarios
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if(!window.MM_GENERATORS) window.MM_GENERATORS={};
  if(!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS={};
  const G=window.MM_GENERATORS;

  function ri(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
  function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
  function r3(x){return Math.round(x*1000)/1000;}
  function r2(x){return Math.round(x*100)/100;}
  function diffCfg(d,c){const m={easy:0,medio:1,dificil:2,experto:3};return c[Math.min(m[d]||0,c.length-1)];}

  const PI=Math.PI;
  const PT=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]];
  const NOT=[
    {deg:30,sin:0.5,   cos:0.866,tan:0.577},
    {deg:45,sin:0.707, cos:0.707,tan:1},
    {deg:60,sin:0.866, cos:0.5,  tan:1.732},
  ];
  // Radian pairs for conversion
  const RAD_PAIRS=[
    {deg:30, rad:PI/6, radStr:'π/6'},  {deg:45, rad:PI/4, radStr:'π/4'},
    {deg:60, rad:PI/3, radStr:'π/3'},  {deg:90, rad:PI/2, radStr:'π/2'},
    {deg:120,rad:2*PI/3,radStr:'2π/3'},{deg:135,rad:3*PI/4,radStr:'3π/4'},
    {deg:150,rad:5*PI/6,radStr:'5π/6'},{deg:180,rad:PI, radStr:'π'},
    {deg:210,rad:7*PI/6,radStr:'7π/6'},{deg:240,rad:4*PI/3,radStr:'4π/3'},
    {deg:270,rad:3*PI/2,radStr:'3π/2'},{deg:300,rad:5*PI/3,radStr:'5π/3'},
    {deg:315,rad:7*PI/4,radStr:'7π/4'},{deg:330,rad:11*PI/6,radStr:'11π/6'},
    {deg:360,rad:2*PI, radStr:'2π'},
  ];

  // ══════════════════════════════════════════════════════════
  // 1. RAZONES TRIGONOMÉTRICAS
  // ══════════════════════════════════════════════════════════

  G['trig_raz_seno']=function(diff){
    const sc=diffCfg(diff,[1,2,3,4]);
    const [opp,adj,hyp]=pick(PT).map(x=>x*sc);
    const v=r3(opp/hyp);
    return{
      question:`En un triángulo rectángulo, el cateto opuesto al ángulo θ mide ${opp} y la hipotenusa mide ${hyp}. ¿Cuánto vale sen(θ)?`,
      answer:v,type:'number',
      hint:'sen(θ) = cateto opuesto / hipotenusa',
      solution:`sen(θ) = ${opp}/${hyp} = ${v}`,
      solutionSteps:[{step:`opuesto=${opp}, hip=${hyp}`,result:''},{step:'sen = opp / hip',result:`${opp}/${hyp} = ${v}`}],
      topic:'Razones trigonométricas',
      analyzeError(ua){
        const u=parseFloat(ua);
        if(Math.abs(u-adj/hyp)<0.02)return`Calculaste el coseno (adj/hip=${r3(adj/hyp)}). El seno usa el cateto OPUESTO.`;
        if(Math.abs(u-opp/adj)<0.02)return`Calculaste la tangente (opp/adj). El seno divide entre HIPOTENUSA.`;
        if(Math.abs(u-hyp/opp)<0.02)return`Invertiste la razón. Sen = opp/hip, no hip/opp.`;
        return'Recuerda SOH: Seno = Opuesto / Hipotenusa.';
      }
    };
  };

  G['trig_raz_coseno']=function(diff){
    const sc=diffCfg(diff,[1,2,3,4]);
    const [opp,adj,hyp]=pick(PT).map(x=>x*sc);
    const v=r3(adj/hyp);
    return{
      question:`En un triángulo rectángulo, el cateto adyacente al ángulo θ mide ${adj} y la hipotenusa mide ${hyp}. ¿Cuánto vale cos(θ)?`,
      answer:v,type:'number',
      hint:'cos(θ) = cateto adyacente / hipotenusa',
      solution:`cos(θ) = ${adj}/${hyp} = ${v}`,
      solutionSteps:[{step:`adj=${adj}, hip=${hyp}`,result:''},{step:'cos = adj / hip',result:`${adj}/${hyp} = ${v}`}],
      topic:'Razones trigonométricas',
      analyzeError(ua){
        const u=parseFloat(ua);
        if(Math.abs(u-opp/hyp)<0.02)return`Calculaste el seno (opp/hip). El coseno usa el cateto ADYACENTE.`;
        if(Math.abs(u-adj/opp)<0.02)return`Calculaste la cotangente (adj/opp). El coseno divide entre HIPOTENUSA.`;
        return'Recuerda CAH: Coseno = Adyacente / Hipotenusa.';
      }
    };
  };

  G['trig_raz_tangente']=function(diff){
    const sc=diffCfg(diff,[1,2,3,4]);
    const [opp,adj,hyp]=pick(PT).map(x=>x*sc);
    const v=r3(opp/adj);
    return{
      question:`En un triángulo rectángulo, el cateto opuesto mide ${opp} y el cateto adyacente mide ${adj}. ¿Cuánto vale tan(θ)?`,
      answer:v,type:'number',
      hint:'tan(θ) = cateto opuesto / cateto adyacente',
      solution:`tan(θ) = ${opp}/${adj} = ${v}`,
      solutionSteps:[{step:`opp=${opp}, adj=${adj}`,result:''},{step:'tan = opp / adj',result:`${opp}/${adj} = ${v}`}],
      topic:'Razones trigonométricas',
      analyzeError(ua){
        const u=parseFloat(ua);
        if(Math.abs(u-adj/opp)<0.02)return`Invertiste: tan = opp/adj, no adj/opp.`;
        if(Math.abs(u-opp/hyp)<0.02)return`Calculaste el seno. La tangente divide entre el CATETO adyacente, no la hipotenusa.`;
        return'Recuerda TOA: Tangente = Opuesto / Adyacente.';
      }
    };
  };

  G['trig_raz_cateto_desde_ratio']=function(diff){
    const sc=diffCfg(diff,[5,10,15,20]);
    const [opp,adj,hyp]=pick(PT).map(x=>x*sc);
    const sinV=r3(opp/hyp);
    const cosV=r3(adj/hyp);
    const ratio=pick(['sin','cos']);
    if(ratio==='sin'){
      return{
        question:`sen(θ) = ${sinV} y la hipotenusa mide ${hyp}. ¿Cuánto mide el cateto opuesto?`,
        answer:opp,type:'number',
        hint:'cateto opuesto = sen(θ) × hipotenusa',
        solution:`opp = ${sinV} × ${hyp} = ${opp}`,
        solutionSteps:[{step:'opp = sen × hip',result:`${sinV} × ${hyp} = ${opp}`}],
        topic:'Razones trigonométricas',
        analyzeError(){return'Despeja: opp = sen(θ) × hipotenusa.';}
      };
    } else {
      return{
        question:`cos(θ) = ${cosV} y la hipotenusa mide ${hyp}. ¿Cuánto mide el cateto adyacente?`,
        answer:adj,type:'number',
        hint:'cateto adyacente = cos(θ) × hipotenusa',
        solution:`adj = ${cosV} × ${hyp} = ${adj}`,
        solutionSteps:[{step:'adj = cos × hip',result:`${cosV} × ${hyp} = ${adj}`}],
        topic:'Razones trigonométricas',
        analyzeError(){return'Despeja: adj = cos(θ) × hipotenusa.';}
      };
    }
  };

  G['trig_raz_hipotenusa_desde_ratio']=function(diff){
    const sc=diffCfg(diff,[5,10,15,20]);
    const [opp,adj,hyp]=pick(PT).map(x=>x*sc);
    const sinV=r3(opp/hyp);
    return{
      question:`sen(θ) = ${sinV} y el cateto opuesto mide ${opp}. ¿Cuánto mide la hipotenusa?`,
      answer:hyp,type:'number',
      hint:'hipotenusa = cateto opuesto / sen(θ)',
      solution:`hip = ${opp} / ${sinV} = ${hyp}`,
      solutionSteps:[{step:'hip = opp / sen(θ)',result:`${opp} / ${sinV} = ${hyp}`}],
      topic:'Razones trigonométricas',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-opp*sinV)<1)return'Multiplicaste en lugar de dividir: hip = opp / sen(θ).';
        return'Despeja la hipotenusa: hip = cateto opuesto / sen(θ).';
      }
    };
  };

  G['trig_raz_pitagorica']=function(diff){
    const [opp,adj,hyp]=pick(PT);
    const sinV=r3(opp/hyp), cosV=r3(adj/hyp);
    const mode=pick(['cos2_from_sin','val_sin_from_cos']);
    if(mode==='cos2_from_sin'){
      const cos2=r3(1-sinV*sinV);
      return{
        question:`Si sen(θ) = ${sinV} y θ es agudo, usa sen²(θ)+cos²(θ)=1 para calcular cos²(θ).`,
        answer:cos2,type:'number',
        hint:'cos²(θ) = 1 − sen²(θ)',
        solution:`cos²(θ) = 1 − ${sinV}² = 1 − ${r3(sinV*sinV)} = ${cos2}`,
        solutionSteps:[{step:`sen²(θ)=${r3(sinV*sinV)}`,result:''},{step:'cos²=1−sen²',result:`${cos2}`}],
        topic:'Razones trigonométricas',
        analyzeError(){return'Aplica: cos²(θ) = 1 − sen²(θ).';}
      };
    } else {
      return{
        question:`Si cos(θ) = ${cosV} y θ es agudo, ¿cuánto vale sen(θ)? (Usa la identidad pitagórica y redondea a 3 decimales.)`,
        answer:sinV,type:'number',
        hint:'sen(θ) = √(1 − cos²(θ))',
        solution:`sen(θ) = √(1−${cosV}²) = √(1−${r3(cosV*cosV)}) = √${r3(1-cosV*cosV)} ≈ ${sinV}`,
        solutionSteps:[{step:`cos²=${r3(cosV*cosV)}`,result:''},{step:'sen=√(1−cos²)',result:`${sinV}`}],
        topic:'Razones trigonométricas',
        analyzeError(){return'sen(θ) = √(1 − cos²(θ)). Recuerda tomar la raíz positiva (θ agudo).';}
      };
    }
  };

  window.MM_TOPIC_GENERATORS['trig_razones']=['trig_raz_seno','trig_raz_coseno','trig_raz_tangente','trig_raz_cateto_desde_ratio','trig_raz_hipotenusa_desde_ratio','trig_raz_pitagorica'];

  // ══════════════════════════════════════════════════════════
  // 2. ÁNGULOS NOTABLES
  // ══════════════════════════════════════════════════════════

  G['trig_not_sin_valor']=function(diff){
    const a=pick(diffCfg(diff,[NOT.slice(0,2),NOT,NOT,NOT]));
    return{
      question:`¿Cuánto vale exactamente sen(${a.deg}°)? Da tu respuesta como decimal (3 cifras).`,
      answer:a.sin,type:'number',
      hint:`sen(30°)=0.5, sen(45°)≈0.707, sen(60°)≈0.866`,
      solution:`sen(${a.deg}°) = ${a.sin}`,
      solutionSteps:[{step:`Ángulo notable ${a.deg}°`,result:`sen=${a.sin}`}],
      topic:'Ángulos notables',
      analyzeError(ua){
        const u=parseFloat(ua);
        if(Math.abs(u-a.cos)<0.01)return`Confundiste seno con coseno. sen(${a.deg}°)=${a.sin}, cos(${a.deg}°)=${a.cos}.`;
        if(Math.abs(u-a.tan)<0.02)return`Calculaste la tangente. sen(${a.deg}°)=${a.sin}.`;
        return`Memoriza: sen(30°)=0.5, sen(45°)≈0.707, sen(60°)≈0.866.`;
      }
    };
  };

  G['trig_not_cos_valor']=function(diff){
    const a=pick(diffCfg(diff,[NOT.slice(0,2),NOT,NOT,NOT]));
    return{
      question:`¿Cuánto vale exactamente cos(${a.deg}°)? Da tu respuesta como decimal (3 cifras).`,
      answer:a.cos,type:'number',
      hint:`cos(30°)≈0.866, cos(45°)≈0.707, cos(60°)=0.5`,
      solution:`cos(${a.deg}°) = ${a.cos}`,
      solutionSteps:[{step:`Ángulo notable ${a.deg}°`,result:`cos=${a.cos}`}],
      topic:'Ángulos notables',
      analyzeError(ua){
        const u=parseFloat(ua);
        if(Math.abs(u-a.sin)<0.01)return`Confundiste coseno con seno. cos(${a.deg}°)=${a.cos}.`;
        return`Memoriza: cos(30°)≈0.866, cos(45°)≈0.707, cos(60°)=0.5.`;
      }
    };
  };

  G['trig_not_tan_valor']=function(diff){
    const a=pick(NOT.slice(0,3));
    return{
      question:`¿Cuánto vale tan(${a.deg}°)? Da tu respuesta como decimal.`,
      answer:a.tan,type:'number',
      hint:`tan(30°)≈0.577, tan(45°)=1, tan(60°)≈1.732`,
      solution:`tan(${a.deg}°) = sen(${a.deg}°)/cos(${a.deg}°) = ${a.sin}/${a.cos} = ${a.tan}`,
      solutionSteps:[{step:'tan = sen / cos',result:`${a.sin}/${a.cos} = ${a.tan}`}],
      topic:'Ángulos notables',
      analyzeError(ua){
        const u=parseFloat(ua);
        if(Math.abs(u-a.cos/a.sin)<0.02)return`Calculaste la cotangente (cos/sen). tan = sen/cos.`;
        return`tan(${a.deg}°) = sen/cos = ${a.sin}/${a.cos} = ${a.tan}.`;
      }
    };
  };

  G['trig_not_expresion']=function(diff){
    const ops=[
      ()=>{const a=pick([2,3,4]),b=pick([2,3]);const r=r2(a*0.5+b*0.866);return{q:`${a}·sen(30°) + ${b}·cos(30°)`,ans:r,sol:`${a}×0.5 + ${b}×0.866 = ${a*0.5} + ${r2(b*0.866)} = ${r}`};},
      ()=>{const r=r2(2*0.707*0.707);return{q:`2·sen(45°)·cos(45°)`,ans:r,sol:`2×0.707×0.707 = ${r}`};},
      ()=>{const r=r2(0.866*0.866-0.5*0.5);return{q:`cos²(30°) − sen²(30°)`,ans:r,sol:`0.866²−0.5²=0.750−0.250=${r}`};},
      ()=>{const a=pick([1,2]);const r=r2(a*(0.5+0.707));return{q:`${a}·(sen(30°) + sen(45°))`,ans:r,sol:`${a}×(0.5+0.707)=${r}`};},
      ()=>{const r=r2(0.866*0.5+0.5*0.866);return{q:`sen(60°)·cos(30°) + cos(60°)·sen(30°)`,ans:r,sol:`0.866×0.866+0.5×0.5=${r2(0.866*0.866)}+${r2(0.5*0.5)}=${r}`};},
    ];
    const op=pick(ops)();
    return{
      question:`Calcula la expresión: ${op.q}`,
      answer:op.ans,type:'number',
      hint:`Usa los valores exactos: sen(30°)=0.5, cos(30°)=0.866, sen(45°)=cos(45°)=0.707, sen(60°)=0.866, cos(60°)=0.5`,
      solution:op.sol,
      solutionSteps:[{step:'Sustituir valores notables',result:op.sol}],
      topic:'Ángulos notables',
      analyzeError(){return'Sustituye los valores notables y opera. sen(30°)=0.5, cos(60°)=0.5, sen(45°)=0.707.';}
    };
  };

  G['trig_not_lado_30_60_90']=function(diff){
    const hyp=pick(diffCfg(diff,[[2,4,6,8],[4,8,10,12],[6,10,14,20],[10,20,30,40]]));
    const side=pick(['opp30','adj30']);
    if(side==='opp30'){
      const opp=r2(hyp*0.5);
      return{
        question:`En un triángulo 30°–60°–90°, la hipotenusa mide ${hyp}. ¿Cuánto mide el cateto opuesto al ángulo de 30°?`,
        answer:opp,type:'number',
        hint:`En el triángulo 30-60-90: cateto opuesto a 30° = hipotenusa × sen(30°) = hipotenusa × 0.5`,
        solution:`cateto = ${hyp} × sen(30°) = ${hyp} × 0.5 = ${opp}`,
        solutionSteps:[{step:'cateto opp a 30° = hip × 0.5',result:`${hyp} × 0.5 = ${opp}`}],
        topic:'Ángulos notables',
        analyzeError(ua){if(Math.abs(parseFloat(ua)-hyp*0.866)<0.5)return'Eso es el cateto opuesto a 60°. El opuesto a 30° es la mitad de la hipotenusa.';return'cateto = hip × sen(30°) = hip × 0.5.';}
      };
    } else {
      const adj=r2(hyp*0.866);
      return{
        question:`En un triángulo 30°–60°–90°, la hipotenusa mide ${hyp}. ¿Cuánto mide el cateto adyacente al ángulo de 30°? (redondea a 2 decimales)`,
        answer:adj,type:'number',
        hint:`cateto adj a 30° = hipotenusa × cos(30°) = hipotenusa × 0.866`,
        solution:`cateto = ${hyp} × 0.866 = ${adj}`,
        solutionSteps:[{step:'cateto adj a 30° = hip × cos(30°)',result:`${hyp} × 0.866 = ${adj}`}],
        topic:'Ángulos notables',
        analyzeError(){return'cateto adj a 30° = hip × cos(30°) = hip × 0.866.';}
      };
    }
  };

  G['trig_not_lado_45_45_90']=function(diff){
    const hyp=pick(diffCfg(diff,[[2,4,6,8],[4,8,10,12],[10,14,20],[10,20,30]]));
    const cateto=r2(hyp*0.707);
    return{
      question:`En un triángulo 45°–45°–90°, la hipotenusa mide ${hyp}. ¿Cuánto mide cada cateto? (redondea a 2 decimales)`,
      answer:cateto,type:'number',
      hint:`cateto = hipotenusa × sen(45°) = hipotenusa × 0.707`,
      solution:`cateto = ${hyp} × 0.707 = ${cateto}`,
      solutionSteps:[{step:'cateto = hip × sen(45°)',result:`${hyp} × 0.707 = ${cateto}`}],
      topic:'Ángulos notables',
      analyzeError(ua){if(Math.abs(parseFloat(ua)-hyp*2)<1)return'Multiplicaste por 2 en vez de 0.707.';return'cateto = hip × 0.707 (sen 45° = cos 45° ≈ 0.707).';}
    };
  };

  window.MM_TOPIC_GENERATORS['trig_notables']=['trig_not_sin_valor','trig_not_cos_valor','trig_not_tan_valor','trig_not_expresion','trig_not_lado_30_60_90','trig_not_lado_45_45_90'];

  // ══════════════════════════════════════════════════════════
  // 3. CÍRCULO UNITARIO Y RADIANES
  // ══════════════════════════════════════════════════════════

  G['trig_cir_rad_to_deg']=function(diff){
    const pool=diffCfg(diff,[RAD_PAIRS.slice(0,5),RAD_PAIRS.slice(0,8),RAD_PAIRS,RAD_PAIRS]);
    const p=pick(pool);
    return{
      question:`¿Cuántos grados equivalen a ${p.radStr} radianes?`,
      answer:p.deg,type:'number',
      hint:`Usa: grados = radianes × (180/π)`,
      solution:`${p.radStr} × (180/π) = ${p.deg}°`,
      solutionSteps:[{step:'grados = rad × 180/π',result:`${p.deg}°`}],
      topic:'Círculo unitario y radianes',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-p.rad)<0.05)return`Diste el valor en radianes (${r3(p.rad)}). Multiplica por 180/π para obtener grados.`;
        return`Fórmula: grados = radianes × (180/π). ${p.radStr} = ${p.deg}°`;
      }
    };
  };

  G['trig_cir_deg_to_rad']=function(diff){
    const pool=diffCfg(diff,[RAD_PAIRS.slice(0,5),RAD_PAIRS.slice(0,8),RAD_PAIRS,RAD_PAIRS]);
    const p=pick(pool);
    const radDec=r3(p.rad);
    return{
      question:`¿Cuántos radianes son ${p.deg}°? Da tu respuesta como decimal (3 cifras).`,
      answer:radDec,type:'number',
      hint:`Usa: radianes = grados × (π/180). π ≈ 3.14159`,
      solution:`${p.deg}° × (π/180) = ${p.radStr} ≈ ${radDec} rad`,
      solutionSteps:[{step:'rad = grados × π/180',result:`${radDec}`}],
      topic:'Círculo unitario y radianes',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-p.deg)<1)return`Diste los grados en vez de radianes. Multiplica por π/180.`;
        return`rad = grados × π/180 = ${p.deg} × 0.01745 ≈ ${radDec}`;
      }
    };
  };

  G['trig_cir_cuadrante']=function(diff){
    const angles=[
      {a:45,q:1},{a:80,q:1},{a:20,q:1},
      {a:120,q:2},{a:150,q:2},{a:95,q:2},
      {a:200,q:3},{a:250,q:3},{a:220,q:3},
      {a:280,q:4},{a:320,q:4},{a:340,q:4},
    ];
    const pool=diffCfg(diff,[angles.slice(0,6),angles,angles,angles]);
    const {a,q}=pick(pool);
    return{
      question:`¿En qué cuadrante del círculo unitario se encuentra el ángulo de ${a}°?`,
      answer:q,type:'number',
      hint:`Q1: 0°–90°, Q2: 90°–180°, Q3: 180°–270°, Q4: 270°–360°`,
      solution:`${a}° está en el cuadrante ${q}`,
      solutionSteps:[{step:`${a}° pertenece al intervalo Q${q}`,result:`Cuadrante ${q}`}],
      topic:'Círculo unitario y radianes',
      analyzeError(ua){return`Q1:0–90°, Q2:90–180°, Q3:180–270°, Q4:270–360°. ${a}° → Q${q}.`;}
    };
  };

  G['trig_cir_coord_cos']=function(diff){
    const pool=diffCfg(diff,[RAD_PAIRS.slice(0,6),RAD_PAIRS.slice(0,10),RAD_PAIRS,RAD_PAIRS]);
    const p=pick(pool);
    const v=r3(Math.cos(p.rad));
    return{
      question:`En el círculo unitario, el punto P corresponde al ángulo ${p.deg}°. ¿Cuál es la coordenada x de P? (= cos ${p.deg}°)`,
      answer:v,type:'number',
      hint:`En el círculo unitario: P=(cos θ, sen θ). La coordenada x = cos(θ).`,
      solution:`x = cos(${p.deg}°) = ${v}`,
      solutionSteps:[{step:`x = cos(${p.deg}°)`,result:`${v}`}],
      topic:'Círculo unitario y radianes',
      analyzeError(ua){
        const sVal=r3(Math.sin(p.rad));
        if(Math.abs(parseFloat(ua)-sVal)<0.02)return`Diste la coordenada y (= sen). La coordenada x = cos(${p.deg}°)=${v}.`;
        return`En el círculo unitario: coordenada x = cos(${p.deg}°) = ${v}.`;
      }
    };
  };

  G['trig_cir_coord_sin']=function(diff){
    const pool=diffCfg(diff,[RAD_PAIRS.slice(0,6),RAD_PAIRS.slice(0,10),RAD_PAIRS,RAD_PAIRS]);
    const p=pick(pool);
    const v=r3(Math.sin(p.rad));
    return{
      question:`En el círculo unitario, el punto P corresponde al ángulo ${p.deg}°. ¿Cuál es la coordenada y de P? (= sen ${p.deg}°)`,
      answer:v,type:'number',
      hint:`En el círculo unitario: P=(cos θ, sen θ). La coordenada y = sen(θ).`,
      solution:`y = sen(${p.deg}°) = ${v}`,
      solutionSteps:[{step:`y = sen(${p.deg}°)`,result:`${v}`}],
      topic:'Círculo unitario y radianes',
      analyzeError(ua){
        const cVal=r3(Math.cos(p.rad));
        if(Math.abs(parseFloat(ua)-cVal)<0.02)return`Diste la coordenada x (= cos). La coordenada y = sen(${p.deg}°)=${v}.`;
        return`Coordenada y = sen(${p.deg}°) = ${v}.`;
      }
    };
  };

  G['trig_cir_angulo_ref']=function(diff){
    const refs=[
      {a:150,ref:30,q:2},{a:120,ref:60,q:2},{a:135,ref:45,q:2},
      {a:210,ref:30,q:3},{a:240,ref:60,q:3},{a:225,ref:45,q:3},
      {a:330,ref:30,q:4},{a:300,ref:60,q:4},{a:315,ref:45,q:4},
    ];
    const pool=diffCfg(diff,[refs.slice(0,3),refs.slice(0,6),refs,refs]);
    const {a,ref,q}=pick(pool);
    return{
      question:`¿Cuántos grados mide el ángulo de referencia del ángulo de ${a}°?`,
      answer:ref,type:'number',
      hint:`Q2: ref = 180°−θ | Q3: ref = θ−180° | Q4: ref = 360°−θ`,
      solution:`${a}° está en Q${q}. Ángulo de referencia = ${q===2?`180°−${a}°`:(q===3?`${a}°−180°`:`360°−${a}°`)} = ${ref}°`,
      solutionSteps:[{step:`Q${q}: fórmula correspondiente`,result:`${ref}°`}],
      topic:'Círculo unitario y radianes',
      analyzeError(){return`Q2: ref=180−θ | Q3: ref=θ−180 | Q4: ref=360−θ. Para ${a}°: ref=${ref}°.`;}
    };
  };

  window.MM_TOPIC_GENERATORS['trig_circulo']=['trig_cir_rad_to_deg','trig_cir_deg_to_rad','trig_cir_cuadrante','trig_cir_coord_cos','trig_cir_coord_sin','trig_cir_angulo_ref'];

  // ══════════════════════════════════════════════════════════
  // 4. FUNCIONES TRIGONOMÉTRICAS
  // ══════════════════════════════════════════════════════════

  G['trig_fun_sin_q2']=function(diff){
    const a=pick(NOT);
    const a2=180-a.deg;
    return{
      question:`¿Cuánto vale sen(${a2}°)? Usa la simetría del círculo unitario.`,
      answer:a.sin,type:'number',
      hint:`sen(180°−θ) = sen(θ). El seno es positivo en Q1 y Q2.`,
      solution:`sen(${a2}°) = sen(180°−${a.deg}°) = sen(${a.deg}°) = ${a.sin}`,
      solutionSteps:[{step:`sen(180°−θ)=sen(θ)`,result:`sen(${a.deg}°)=${a.sin}`}],
      topic:'Funciones trigonométricas',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)+a.sin)<0.01)return`El seno es POSITIVO en el segundo cuadrante. sen(${a2}°) = +${a.sin}.`;
        return`Usa la reducción: sen(180°−θ) = sen(θ). Entonces sen(${a2}°) = sen(${a.deg}°) = ${a.sin}.`;
      }
    };
  };

  G['trig_fun_cos_q2']=function(diff){
    const a=pick(NOT);
    const a2=180-a.deg;
    const v=r3(-a.cos);
    return{
      question:`¿Cuánto vale cos(${a2}°)?`,
      answer:v,type:'number',
      hint:`cos(180°−θ) = −cos(θ). El coseno es NEGATIVO en el segundo cuadrante.`,
      solution:`cos(${a2}°) = cos(180°−${a.deg}°) = −cos(${a.deg}°) = ${v}`,
      solutionSteps:[{step:'cos(180°−θ)=−cos(θ)',result:`−${a.cos} = ${v}`}],
      topic:'Funciones trigonométricas',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-a.cos)<0.01)return`El coseno es NEGATIVO en Q2. cos(${a2}°) = −${a.cos} = ${v}.`;
        return`Reducción: cos(180°−θ)=−cos(θ). cos(${a2}°)=${v}.`;
      }
    };
  };

  G['trig_fun_signo_cuad']=function(diff){
    const items=[
      {fn:'sen',q:1,sign:1},{fn:'cos',q:1,sign:1},{fn:'tan',q:1,sign:1},
      {fn:'sen',q:2,sign:1},{fn:'cos',q:2,sign:-1},{fn:'tan',q:2,sign:-1},
      {fn:'sen',q:3,sign:-1},{fn:'cos',q:3,sign:-1},{fn:'tan',q:3,sign:1},
      {fn:'sen',q:4,sign:-1},{fn:'cos',q:4,sign:1},{fn:'tan',q:4,sign:-1},
    ];
    const {fn,q,sign}=pick(items);
    return{
      question:`En el cuadrante ${q}, ¿cuál es el signo de ${fn}(θ)? Escribe 1 para positivo o −1 para negativo.`,
      answer:sign,type:'number',
      hint:`Regla CAST (o "Todos Son Tan Chéveres"): Q1=todos+, Q2=solo sen+, Q3=solo tan+, Q4=solo cos+`,
      solution:`En Q${q}, ${fn}(θ) es ${sign===1?'positivo (+1)':'negativo (−1)'}`,
      solutionSteps:[{step:`Q${q}: aplicar regla CAST`,result:`${fn} es ${sign>0?'+':'-'}`}],
      topic:'Funciones trigonométricas',
      analyzeError(){return`Q1:+++ | Q2:sen+ | Q3:tan+ | Q4:cos+. ${fn} en Q${q} = ${sign>0?'+':'-'}.`;}
    };
  };

  G['trig_fun_sin_negativo']=function(diff){
    const a=pick(NOT);
    const v=r3(-a.sin);
    return{
      question:`¿Cuánto vale sen(−${a.deg}°)?`,
      answer:v,type:'number',
      hint:`El seno es una función impar: sen(−θ) = −sen(θ)`,
      solution:`sen(−${a.deg}°) = −sen(${a.deg}°) = −${a.sin} = ${v}`,
      solutionSteps:[{step:'sen(−θ)=−sen(θ)',result:`−${a.sin}=${v}`}],
      topic:'Funciones trigonométricas',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-a.sin)<0.01)return`El seno de un ángulo negativo es negativo: sen(−${a.deg}°)=−${a.sin}.`;
        return'Recuerda: sen es función IMPAR → sen(−θ) = −sen(θ).';
      }
    };
  };

  G['trig_fun_periodo']=function(diff){
    const items=[
      {q:`¿Cuánto vale sen(30°+360°)?`,ans:0.5,sol:`sen es periódica con período 360°. sen(390°)=sen(30°)=0.5`},
      {q:`¿Cuánto vale cos(45°+360°)?`,ans:0.707,sol:`cos(405°)=cos(45°)=0.707`},
      {q:`¿Cuánto vale sen(60°+720°)?`,ans:0.866,sol:`720°=2 períodos completos. sen(60°+720°)=sen(60°)=0.866`},
      {q:`¿Cuánto vale tan(45°+180°)?`,ans:1,sol:`tan es periódica con período 180°. tan(225°)=tan(45°)=1`},
      {q:`¿Cuánto vale cos(60°−360°)?`,ans:0.5,sol:`cos(−300°)=cos(60°)=0.5 (período 360°)`},
      {q:`Si sen(x)=0.5 y x=30°, ¿cuál es el período de la función seno (en grados)?`,ans:360,sol:`La función seno tiene período 360°`},
      {q:`¿Cuál es el período de la función tangente (en grados)?`,ans:180,sol:`tan(θ) tiene período 180°`},
    ];
    const it=pick(items);
    return{
      question:it.q,answer:it.ans,type:'number',
      hint:`Periodo de sen y cos = 360°; periodo de tan = 180°`,
      solution:it.sol,solutionSteps:[{step:'Aplicar periodicidad',result:`${it.ans}`}],
      topic:'Funciones trigonométricas',
      analyzeError(){return'sen y cos tienen período 360°. tan tiene período 180°.';}
    };
  };

  G['trig_fun_cualq_angulo']=function(diff){
    const cases=[
      {a:210,fn:'sin',v:r3(-0.5),exp:`sen(210°)=sen(180°+30°)=−sen(30°)=−0.5`},
      {a:240,fn:'sin',v:r3(-0.866),exp:`sen(240°)=−sen(60°)=−0.866`},
      {a:300,fn:'cos',v:r3(0.5),exp:`cos(300°)=cos(360°−60°)=cos(60°)=0.5`},
      {a:315,fn:'cos',v:r3(0.707),exp:`cos(315°)=cos(360°−45°)=cos(45°)=0.707`},
      {a:225,fn:'tan',v:r3(1),exp:`tan(225°)=tan(180°+45°)=tan(45°)=1`},
      {a:330,fn:'sin',v:r3(-0.5),exp:`sen(330°)=−sen(30°)=−0.5`},
    ];
    const {a,fn,v,exp}=pick(cases);
    return{
      question:`Calcula ${fn==='sin'?'sen':'cos'}(${a}°) usando el ángulo de referencia.`,
      answer:v,type:'number',
      hint:`Halla el ángulo de referencia, evalúa en Q1, luego aplica el signo del cuadrante.`,
      solution:exp,solutionSteps:[{step:'Ángulo referencia + signo cuadrante',result:`${v}`}],
      topic:'Funciones trigonométricas',
      analyzeError(){return exp;}
    };
  };

  window.MM_TOPIC_GENERATORS['trig_funciones']=['trig_fun_sin_q2','trig_fun_cos_q2','trig_fun_signo_cuad','trig_fun_sin_negativo','trig_fun_periodo','trig_fun_cualq_angulo'];

  // ══════════════════════════════════════════════════════════
  // 5. IDENTIDADES TRIGONOMÉTRICAS
  // ══════════════════════════════════════════════════════════

  G['trig_id_cos_desde_sin']=function(diff){
    const [opp,adj,hyp]=pick(PT);
    const sinV=r3(opp/hyp),cosV=r3(adj/hyp);
    return{
      question:`Si sen(θ) = ${sinV} y θ es un ángulo del primer cuadrante, ¿cuánto vale cos(θ)? (Usa la identidad pitagórica)`,
      answer:cosV,type:'number',
      hint:`sen²(θ)+cos²(θ)=1 → cos(θ)=√(1−sen²(θ))`,
      solution:`cos(θ)=√(1−${sinV}²)=√(1−${r3(sinV*sinV)})=√${r3(1-sinV*sinV)}≈${cosV}`,
      solutionSteps:[{step:`1−sen²=${r3(1-sinV*sinV)}`,result:''},{step:'cos=√(...)',result:`${cosV}`}],
      topic:'Identidades trigonométricas',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-sinV)<0.01)return'Diste el valor del seno, no del coseno.';
        return`cos(θ)=√(1−sen²(θ))=√(1−${r3(sinV*sinV)})=${cosV}.`;
      }
    };
  };

  G['trig_id_sin_desde_cos']=function(diff){
    const [opp,adj,hyp]=pick(PT);
    const sinV=r3(opp/hyp),cosV=r3(adj/hyp);
    return{
      question:`Si cos(θ) = ${cosV} y θ es agudo, ¿cuánto vale sen(θ)?`,
      answer:sinV,type:'number',
      hint:`sen(θ)=√(1−cos²(θ))`,
      solution:`sen(θ)=√(1−${cosV}²)=√${r3(1-cosV*cosV)}≈${sinV}`,
      solutionSteps:[{step:`1−cos²=${r3(1-cosV*cosV)}`,result:''},{step:'sen=√(...)',result:`${sinV}`}],
      topic:'Identidades trigonométricas',
      analyzeError(){return`sen(θ)=√(1−cos²(θ))=√(1−${r3(cosV*cosV)})=${sinV}.`;}
    };
  };

  G['trig_id_tan_desde_sin_cos']=function(diff){
    const [opp,adj,hyp]=pick(PT);
    const sinV=r3(opp/hyp),cosV=r3(adj/hyp),tanV=r3(opp/adj);
    return{
      question:`Si sen(θ) = ${sinV} y cos(θ) = ${cosV}, ¿cuánto vale tan(θ)?`,
      answer:tanV,type:'number',
      hint:`tan(θ) = sen(θ) / cos(θ)`,
      solution:`tan(θ) = ${sinV}/${cosV} = ${tanV}`,
      solutionSteps:[{step:'tan = sen/cos',result:`${sinV}/${cosV} = ${tanV}`}],
      topic:'Identidades trigonométricas',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-cosV/sinV)<0.02)return`Invertiste la razón. tan = sen/cos, no cos/sen.`;
        return`tan = ${sinV}/${cosV} = ${tanV}.`;
      }
    };
  };

  G['trig_id_complemento']=function(diff){
    const base=pick([20,25,35,40,15,10,55]);
    const comp=90-base;
    const sinBase=r3(Math.sin(base*PI/180));
    return{
      question:`Sabiendo que sen(${base}°) ≈ ${sinBase}, ¿cuánto vale cos(${comp}°)?`,
      answer:sinBase,type:'number',
      hint:`Identidad de complemento: sen(θ) = cos(90°−θ)`,
      solution:`cos(${comp}°) = cos(90°−${base}°) = sen(${base}°) = ${sinBase}`,
      solutionSteps:[{step:`cos(90°−θ)=sen(θ)`,result:`sen(${base}°)=${sinBase}`}],
      topic:'Identidades trigonométricas',
      analyzeError(){return`Los ángulos ${base}° y ${comp}° son complementarios. cos(${comp}°)=sen(${base}°)=${sinBase}.`;}
    };
  };

  G['trig_id_doble_sin']=function(diff){
    const a=pick(NOT);
    const v=r3(2*a.sin*a.cos);
    return{
      question:`Usando sen(2θ) = 2·sen(θ)·cos(θ), calcula sen(${a.deg*2}°) si θ = ${a.deg}°.`,
      answer:v,type:'number',
      hint:`Sustituye: sen(${a.deg*2}°) = 2 × ${a.sin} × ${a.cos}`,
      solution:`sen(${a.deg*2}°) = 2 × ${a.sin} × ${a.cos} = ${v}`,
      solutionSteps:[{step:`2 × sen(${a.deg}°) × cos(${a.deg}°)`,result:`2 × ${a.sin} × ${a.cos} = ${v}`}],
      topic:'Identidades trigonométricas',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-2*a.sin)<0.01)return`Olvidaste multiplicar también por cos(${a.deg}°). sen(2θ)=2·sen(θ)·cos(θ).`;
        return`sen(${2*a.deg}°) = 2·sen(${a.deg}°)·cos(${a.deg}°) = 2×${a.sin}×${a.cos} = ${v}.`;
      }
    };
  };

  G['trig_id_doble_cos']=function(diff){
    const a=pick(NOT);
    const v=r3(a.cos*a.cos-a.sin*a.sin);
    return{
      question:`Usando cos(2θ) = cos²(θ) − sen²(θ), calcula cos(${a.deg*2}°) si θ = ${a.deg}°.`,
      answer:v,type:'number',
      hint:`Sustituye: cos²(${a.deg}°) = ${r3(a.cos*a.cos)}, sen²(${a.deg}°) = ${r3(a.sin*a.sin)}`,
      solution:`cos(${a.deg*2}°) = ${r3(a.cos*a.cos)} − ${r3(a.sin*a.sin)} = ${v}`,
      solutionSteps:[{step:`cos²−sen²`,result:`${r3(a.cos*a.cos)}−${r3(a.sin*a.sin)}=${v}`}],
      topic:'Identidades trigonométricas',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-r3(2*a.cos*a.cos-1))<0.01)return`Usaste cos(2θ)=2cos²(θ)−1, esa fórmula es equivalente pero verifica tus cálculos.`;
        return`cos(2θ)=cos²(θ)−sen²(θ)=${r3(a.cos*a.cos)}−${r3(a.sin*a.sin)}=${v}.`;
      }
    };
  };

  window.MM_TOPIC_GENERATORS['trig_identidades']=['trig_id_cos_desde_sin','trig_id_sin_desde_cos','trig_id_tan_desde_sin_cos','trig_id_complemento','trig_id_doble_sin','trig_id_doble_cos'];

  // ══════════════════════════════════════════════════════════
  // 6. SUMA Y DIFERENCIA DE ÁNGULOS
  // ══════════════════════════════════════════════════════════

  G['trig_sum_sin_suma']=function(diff){
    const pairs=[[30,60],[45,30],[45,45],[60,30],[30,45]];
    const [A,B]=pick(pairs);
    const v=r3(Math.sin((A+B)*PI/180));
    const sA=NOT.find(n=>n.deg===A)||{sin:r3(Math.sin(A*PI/180)),cos:r3(Math.cos(A*PI/180))};
    const sB=NOT.find(n=>n.deg===B)||{sin:r3(Math.sin(B*PI/180)),cos:r3(Math.cos(B*PI/180))};
    return{
      question:`Calcula sen(${A}°+${B}°) usando la fórmula de suma.`,
      answer:v,type:'number',
      hint:`sen(A+B) = sen(A)·cos(B) + cos(A)·sen(B)`,
      solution:`sen(${A+B}°) = sen(${A}°)·cos(${B}°) + cos(${A}°)·sen(${B}°) = ${sA.sin}×${sB.cos} + ${sA.cos}×${sB.sin} = ${r3(sA.sin*sB.cos)}+${r3(sA.cos*sB.sin)} = ${v}`,
      solutionSteps:[{step:'sen(A+B)=senA·cosB+cosA·senB',result:''},{step:`${sA.sin}×${sB.cos}+${sA.cos}×${sB.sin}`,result:`${v}`}],
      topic:'Suma y diferencia de ángulos',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-r3(sA.sin*sB.sin+sA.cos*sB.cos))<0.01)return`Usaste la fórmula de cos(A−B). Para sen(A+B): sen·cos + cos·sen.`;
        return`sen(A+B)=senA·cosB+cosA·senB. Sustituye los valores notables.`;
      }
    };
  };

  G['trig_sum_cos_suma']=function(diff){
    const pairs=[[45,45],[30,60],[45,30],[60,30]];
    const [A,B]=pick(pairs);
    const v=r3(Math.cos((A+B)*PI/180));
    const sA=NOT.find(n=>n.deg===A)||{sin:r3(Math.sin(A*PI/180)),cos:r3(Math.cos(A*PI/180))};
    const sB=NOT.find(n=>n.deg===B)||{sin:r3(Math.sin(B*PI/180)),cos:r3(Math.cos(B*PI/180))};
    return{
      question:`Calcula cos(${A}°+${B}°) usando la fórmula de suma.`,
      answer:v,type:'number',
      hint:`cos(A+B) = cos(A)·cos(B) − sen(A)·sen(B)`,
      solution:`cos(${A+B}°) = ${sA.cos}×${sB.cos} − ${sA.sin}×${sB.sin} = ${r3(sA.cos*sB.cos)}−${r3(sA.sin*sB.sin)} = ${v}`,
      solutionSteps:[{step:'cos(A+B)=cosA·cosB−senA·senB',result:''},{step:'Sustituir valores',result:`${v}`}],
      topic:'Suma y diferencia de ángulos',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-r3(sA.cos*sB.cos+sA.sin*sB.sin))<0.01)return`Sumaste en vez de restar. cos(A+B)=cosA·cosB − senA·senB.`;
        return`cos(A+B)=cosA·cosB−senA·senB.`;
      }
    };
  };

  G['trig_sum_sin_dif']=function(diff){
    const pairs=[[60,30],[45,30],[90,45],[90,60]];
    const [A,B]=pick(pairs);
    const v=r3(Math.sin((A-B)*PI/180));
    const sA=NOT.find(n=>n.deg===A)||{sin:r3(Math.sin(A*PI/180)),cos:r3(Math.cos(A*PI/180))};
    const sB=NOT.find(n=>n.deg===B)||{sin:r3(Math.sin(B*PI/180)),cos:r3(Math.cos(B*PI/180))};
    return{
      question:`Calcula sen(${A}°−${B}°) usando la fórmula de diferencia.`,
      answer:v,type:'number',
      hint:`sen(A−B) = sen(A)·cos(B) − cos(A)·sen(B)`,
      solution:`sen(${A-B}°) = ${sA.sin}×${sB.cos} − ${sA.cos}×${sB.sin} = ${r3(sA.sin*sB.cos)}−${r3(sA.cos*sB.sin)} = ${v}`,
      solutionSteps:[{step:'sen(A−B)=senA·cosB−cosA·senB',result:''},{step:'Sustituir',result:`${v}`}],
      topic:'Suma y diferencia de ángulos',
      analyzeError(){return`sen(A−B)=senA·cosB−cosA·senB. El signo es MENOS, no más.`;}
    };
  };

  G['trig_sum_cos_dif']=function(diff){
    const pairs=[[60,30],[90,30],[90,60],[45,30]];
    const [A,B]=pick(pairs);
    const v=r3(Math.cos((A-B)*PI/180));
    const sA=NOT.find(n=>n.deg===A)||{sin:r3(Math.sin(A*PI/180)),cos:r3(Math.cos(A*PI/180))};
    const sB=NOT.find(n=>n.deg===B)||{sin:r3(Math.sin(B*PI/180)),cos:r3(Math.cos(B*PI/180))};
    return{
      question:`Calcula cos(${A}°−${B}°) usando la fórmula de diferencia.`,
      answer:v,type:'number',
      hint:`cos(A−B) = cos(A)·cos(B) + sen(A)·sen(B)`,
      solution:`cos(${A-B}°) = ${sA.cos}×${sB.cos} + ${sA.sin}×${sB.sin} = ${r3(sA.cos*sB.cos)}+${r3(sA.sin*sB.sin)} = ${v}`,
      solutionSteps:[{step:'cos(A−B)=cosA·cosB+senA·senB',result:''},{step:'Sustituir',result:`${v}`}],
      topic:'Suma y diferencia de ángulos',
      analyzeError(){return`cos(A−B)=cosA·cosB+senA·senB. Aquí el signo es SUMA (diferencia del coseno).`;}
    };
  };

  G['trig_sum_doble_sin']=function(diff){
    const a=pick(NOT);
    const v=r3(2*a.sin*a.cos);
    const verif=r3(Math.sin(2*a.deg*PI/180));
    return{
      question:`Calcula sen(${2*a.deg}°) usando la fórmula del ángulo doble sen(2θ)=2sen(θ)cos(θ) con θ=${a.deg}°.`,
      answer:v,type:'number',
      hint:`sen(${2*a.deg}°) = 2 × sen(${a.deg}°) × cos(${a.deg}°) = 2 × ${a.sin} × ${a.cos}`,
      solution:`sen(${2*a.deg}°) = 2 × ${a.sin} × ${a.cos} = ${v}`,
      solutionSteps:[{step:`2×${a.sin}×${a.cos}`,result:`${v}`}],
      topic:'Suma y diferencia de ángulos',
      analyzeError(){return`sen(2θ)=2sen(θ)cos(θ)=2×${a.sin}×${a.cos}=${v}.`;}
    };
  };

  G['trig_sum_doble_cos']=function(diff){
    const a=pick(NOT);
    const v=r3(a.cos*a.cos-a.sin*a.sin);
    return{
      question:`Usa cos(2θ)=cos²(θ)−sen²(θ) para calcular cos(${2*a.deg}°) con θ=${a.deg}°.`,
      answer:v,type:'number',
      hint:`cos(${2*a.deg}°) = cos²(${a.deg}°) − sen²(${a.deg}°) = ${r3(a.cos*a.cos)} − ${r3(a.sin*a.sin)}`,
      solution:`cos(${2*a.deg}°) = ${r3(a.cos*a.cos)} − ${r3(a.sin*a.sin)} = ${v}`,
      solutionSteps:[{step:`cos²−sen²`,result:`${r3(a.cos*a.cos)}−${r3(a.sin*a.sin)}=${v}`}],
      topic:'Suma y diferencia de ángulos',
      analyzeError(){return`cos(2θ)=cos²(θ)−sen²(θ)=${r3(a.cos*a.cos)}−${r3(a.sin*a.sin)}=${v}.`;}
    };
  };

  window.MM_TOPIC_GENERATORS['trig_suma']=['trig_sum_sin_suma','trig_sum_cos_suma','trig_sum_sin_dif','trig_sum_cos_dif','trig_sum_doble_sin','trig_sum_doble_cos'];

  // ══════════════════════════════════════════════════════════
  // 7. ECUACIONES TRIGONOMÉTRICAS
  // ══════════════════════════════════════════════════════════

  const EC_SIN=[
    {val:0.5,q1:30,q2:150},{val:0.707,q1:45,q2:135},{val:0.866,q1:60,q2:120},
    {val:1,q1:90,q2:90},{val:0,q1:0,q2:180},
  ];
  const EC_COS=[
    {val:0.5,q1:60,q4:300},{val:0.707,q1:45,q4:315},{val:0.866,q1:30,q4:330},
    {val:-0.5,q2:120,q3:240},{val:-0.707,q2:135,q3:225},{val:0,q1:90,q4:270},
  ];
  const EC_TAN=[
    {val:1,q1:45,q3:225},{val:1.732,q1:60,q3:240},{val:0.577,q1:30,q3:210},
    {val:-1,q2:135,q4:315},{val:-1.732,q2:120,q4:300},
  ];

  G['trig_ec_sin_primera']=function(diff){
    const pool=diffCfg(diff,[EC_SIN.slice(0,2),EC_SIN.slice(0,4),EC_SIN,EC_SIN]);
    const {val,q1}=pick(pool);
    return{
      question:`Resuelve: sen(x) = ${val}, con x ∈ [0°, 360°]. ¿Cuál es la solución menor (en grados)?`,
      answer:q1,type:'number',
      hint:`x = arcsen(${val}) para la primera solución en Q1.`,
      solution:`x₁ = arcsen(${val}) = ${q1}°`,
      solutionSteps:[{step:`sen(x)=${val}`,result:''},{step:'Primera solución (Q1)',result:`x₁=${q1}°`}],
      topic:'Ecuaciones trigonométricas',
      analyzeError(ua){
        const u=parseFloat(ua);
        const {q2}=EC_SIN.find(e=>e.val===val)||{q2:180-q1};
        if(Math.abs(u-q2)<1)return`Diste la segunda solución (${q2}°). La menor es ${q1}°.`;
        return`Primera solución: x=arcsen(${val})=${q1}°.`;
      }
    };
  };

  G['trig_ec_sin_segunda']=function(diff){
    const pool=diffCfg(diff,[EC_SIN.slice(0,3),EC_SIN.slice(0,4),EC_SIN,EC_SIN]);
    const {val,q1,q2}=pick(pool);
    return{
      question:`Para sen(x) = ${val} en [0°,360°], la primera solución es x₁=${q1}°. ¿Cuál es la segunda solución?`,
      answer:q2,type:'number',
      hint:`La segunda solución del seno está en Q2: x₂ = 180° − x₁`,
      solution:`x₂ = 180° − ${q1}° = ${q2}°`,
      solutionSteps:[{step:'x₂ = 180° − x₁',result:`180°−${q1}°=${q2}°`}],
      topic:'Ecuaciones trigonométricas',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-q1)<1)return`Esa es la primera solución. La segunda es x₂=180°−${q1}°=${q2}°.`;
        return`Segunda solución del seno: x₂=180°−x₁=180°−${q1}°=${q2}°.`;
      }
    };
  };

  G['trig_ec_cos_primera']=function(diff){
    const pool=diffCfg(diff,[EC_COS.slice(0,3),EC_COS.slice(0,5),EC_COS,EC_COS]);
    const item=pick(pool);
    const first=item.q1||item.q2;
    const ans=first;
    return{
      question:`Resuelve: cos(x) = ${item.val}, con x ∈ [0°,360°]. ¿Cuál es la solución menor?`,
      answer:ans,type:'number',
      hint:`x = arccos(${item.val}). Para valor positivo → Q1. Para negativo → Q2.`,
      solution:`x₁ = arccos(${item.val}) = ${ans}°`,
      solutionSteps:[{step:`cos(x)=${item.val}`,result:''},{step:'x₁=arccos(valor)',result:`${ans}°`}],
      topic:'Ecuaciones trigonométricas',
      analyzeError(){return`Primera solución: arccos(${item.val})=${ans}°.`;}
    };
  };

  G['trig_ec_tan_primera']=function(diff){
    const pool=diffCfg(diff,[EC_TAN.slice(0,2),EC_TAN.slice(0,3),EC_TAN,EC_TAN]);
    const {val,q1}=pick(pool);
    return{
      question:`Resuelve: tan(x) = ${val}, con x ∈ [0°,360°]. ¿Cuál es la solución menor (en grados)?`,
      answer:q1,type:'number',
      hint:`x = arctan(${val}). La tangente positiva tiene solución en Q1; negativa en Q2.`,
      solution:`x₁ = arctan(${val}) = ${q1}°`,
      solutionSteps:[{step:`tan(x)=${val}`,result:''},{step:'x₁=arctan',result:`${q1}°`}],
      topic:'Ecuaciones trigonométricas',
      analyzeError(){return`arctan(${val})=${q1}°. La tangente se repite cada 180°.`;}
    };
  };

  G['trig_ec_doble_angulo']=function(diff){
    const cases=[
      {q:`sen(2x) = 1, x ∈ [0°,180°]. ¿Cuál es la solución?`,ans:45,sol:`2x=90° → x=45°`},
      {q:`cos(2x) = 1, x ∈ [0°,360°]. ¿Cuál es la solución menor?`,ans:0,sol:`2x=0° → x=0°`},
      {q:`sen(2x) = 0.866, x ∈ [0°,90°]. ¿Cuál es la solución?`,ans:30,sol:`2x=60° → x=30°`},
      {q:`cos(2x) = 0.5, x ∈ [0°,180°]. ¿Cuál es la solución menor?`,ans:30,sol:`2x=60° → x=30°`},
      {q:`sen(2x) = 0.5, x ∈ [0°,90°]. ¿Cuál es la solución?`,ans:15,sol:`2x=30° → x=15°`},
      {q:`tan(2x) = 1, x ∈ [0°,90°]. ¿Cuál es la solución?`,ans:22.5,sol:`2x=45° → x=22.5°`},
    ];
    const {q,ans,sol}=pick(cases);
    return{
      question:q,answer:ans,type:'number',
      hint:'Sustituye u=2x, resuelve para u, luego x=u/2.',
      solution:sol,solutionSteps:[{step:'Sea u=2x',result:''},{step:'Resuelve → x=u/2',result:`${ans}°`}],
      topic:'Ecuaciones trigonométricas',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-2*ans)<1)return`Encontraste 2x, no x. Divide entre 2: x=${ans}°.`;
        return sol;
      }
    };
  };

  G['trig_ec_cuantas_sol']=function(diff){
    const cases=[
      {q:`¿Cuántas soluciones tiene sen(x)=0.5 en [0°,360°)?`,ans:2,sol:'sin=0.5: x=30° y x=150° → 2 soluciones'},
      {q:`¿Cuántas soluciones tiene cos(x)=0 en [0°,360°)?`,ans:2,sol:'cos=0: x=90° y x=270° → 2 soluciones'},
      {q:`¿Cuántas soluciones tiene sen(x)=1 en [0°,360°)?`,ans:1,sol:'sin=1: solo x=90° → 1 solución'},
      {q:`¿Cuántas soluciones tiene sen(x)=2 en [0°,360°)?`,ans:0,sol:'|sen|≤1 siempre. No hay soluciones → 0'},
      {q:`¿Cuántas soluciones tiene tan(x)=1 en [0°,360°)?`,ans:2,sol:'tan=1: x=45° y x=225° → 2 soluciones'},
      {q:`¿Cuántas soluciones tiene cos(x)=−1 en [0°,360°)?`,ans:1,sol:'cos=−1: solo x=180° → 1 solución'},
    ];
    const {q,ans,sol}=pick(cases);
    return{
      question:q,answer:ans,type:'number',
      hint:'sen y cos están acotados entre −1 y 1. Cada valor (salvo ±1) tiene 2 soluciones en [0°,360°).',
      solution:sol,solutionSteps:[{step:'Analizar el rango',result:`${ans} solución(es)`}],
      topic:'Ecuaciones trigonométricas',
      analyzeError(){return sol;}
    };
  };

  window.MM_TOPIC_GENERATORS['trig_ecuaciones']=['trig_ec_sin_primera','trig_ec_sin_segunda','trig_ec_cos_primera','trig_ec_tan_primera','trig_ec_doble_angulo','trig_ec_cuantas_sol'];

  // ══════════════════════════════════════════════════════════
  // 8. APLICACIONES (LEY DE SENOS Y COSENOS)
  // ══════════════════════════════════════════════════════════

  G['trig_apl_elevacion']=function(diff){
    const cases=diffCfg(diff,[
      [{ang:45,dist:10,h:10},{ang:45,dist:20,h:20},{ang:45,dist:50,h:50}],
      [{ang:30,dist:20,h:r2(20*0.577)},{ang:60,dist:10,h:r2(10*1.732)},{ang:30,dist:30,h:r2(30*0.577)}],
      [{ang:60,dist:15,h:r2(15*1.732)},{ang:30,dist:40,h:r2(40*0.577)},{ang:45,dist:35,h:35}],
      [{ang:60,dist:25,h:r2(25*1.732)},{ang:30,dist:60,h:r2(60*0.577)},{ang:45,dist:100,h:100}],
    ]);
    const {ang,dist,h}=pick(cases);
    return{
      question:`Desde un punto a ${dist} m de la base de una torre, el ángulo de elevación es ${ang}°. ¿Cuánto mide la altura de la torre? (2 decimales)`,
      answer:h,type:'number',
      hint:`altura = distancia × tan(${ang}°) = ${dist} × ${NOT.find(n=>n.deg===ang)?.tan||r3(Math.tan(ang*PI/180))}`,
      solution:`h = ${dist} × tan(${ang}°) = ${dist} × ${r3(Math.tan(ang*PI/180))} = ${h}`,
      solutionSteps:[{step:'tan(θ) = altura / distancia',result:''},{step:'altura = dist × tan(θ)',result:`${dist} × ${r3(Math.tan(ang*PI/180))} = ${h}`}],
      topic:'Aplicaciones de trigonometría',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-dist/Math.tan(ang*PI/180))<1)return`Dividiste en vez de multiplicar. h = dist × tan(θ), no dist / tan(θ).`;
        return`h = distancia × tan(ángulo) = ${dist} × tan(${ang}°) = ${h}.`;
      }
    };
  };

  G['trig_apl_ley_sin_lado']=function(diff){
    const cases=diffCfg(diff,[
      [{a:10,A:30,B:90,b:20},{a:5,A:30,B:90,b:10}],
      [{a:8,A:30,B:60,b:r2(8*0.866/0.5)},{a:10,A:45,B:90,b:r2(10/0.707)}],
      [{a:7,A:30,B:45,b:r2(7*0.707/0.5)},{a:6,A:30,B:60,b:r2(6*0.866/0.5)}],
      [{a:9,A:45,B:60,b:r2(9*0.866/0.707)},{a:12,A:30,B:45,b:r2(12*0.707/0.5)}],
    ]);
    const {a,A,B,b}=pick(cases);
    return{
      question:`En un triángulo, el lado a=${a} es opuesto al ángulo A=${A}°. Usando la ley de senos, halla el lado b opuesto a B=${B}°. (2 decimales)`,
      answer:b,type:'number',
      hint:`Ley de senos: a/sen(A) = b/sen(B) → b = a × sen(B) / sen(A)`,
      solution:`b = ${a} × sen(${B}°)/sen(${A}°) = ${a} × ${r3(Math.sin(B*PI/180))}/${r3(Math.sin(A*PI/180))} = ${b}`,
      solutionSteps:[{step:'b = a × sen(B)/sen(A)',result:`${a} × ${r3(Math.sin(B*PI/180))}/${r3(Math.sin(A*PI/180))} = ${b}`}],
      topic:'Aplicaciones de trigonometría',
      analyzeError(){return`Ley de senos: b = a × sen(B)/sen(A) = ${a} × sen(${B}°)/sen(${A}°) = ${b}.`;}
    };
  };

  G['trig_apl_ley_cos_lado']=function(diff){
    const cases=diffCfg(diff,[
      [{a:10,b:10,C:60,c:10}],
      [{a:5,b:7,C:60,c:r2(Math.sqrt(25+49-70*0.5))}],
      [{a:8,b:6,C:90,c:10},{a:6,b:8,C:90,c:10}],
      [{a:7,b:8,C:60,c:r2(Math.sqrt(49+64-112*0.5))},{a:10,b:6,C:60,c:r2(Math.sqrt(100+36-120*0.5))}],
    ]);
    const {a,b,C,c}=pick(cases.flat());
    return{
      question:`En un triángulo, a=${a}, b=${b}, ángulo C=${C}°. Usa la ley de cosenos para hallar el lado c. (2 decimales)`,
      answer:c,type:'number',
      hint:`c² = a² + b² − 2ab·cos(C)`,
      solution:`c² = ${a}²+${b}²−2×${a}×${b}×cos(${C}°) = ${a*a}+${b*b}−${2*a*b}×${r3(Math.cos(C*PI/180))} = ${r2(a*a+b*b-2*a*b*Math.cos(C*PI/180))} → c=${c}`,
      solutionSteps:[{step:'c²=a²+b²−2ab·cos(C)',result:r2(a*a+b*b-2*a*b*Math.cos(C*PI/180))},{step:'c=√(c²)',result:`${c}`}],
      topic:'Aplicaciones de trigonometría',
      analyzeError(){return`c²=a²+b²−2ab·cos(C). Para C=${C}°: c²=${r2(a*a+b*b-2*a*b*Math.cos(C*PI/180))}, c=${c}.`;}
    };
  };

  G['trig_apl_ley_cos_angulo']=function(diff){
    const cases=[
      {a:5,b:8,c:7,C:60,check:`cos=(25+64−49)/(80)=0.5→60°`},
      {a:5,b:5,c:5,C:60,check:`Triángulo equilátero→todos 60°`},
      {a:3,b:5,c:7,C:120,check:`cos=(9+25−49)/30=−0.5→120°`},
      {a:6,b:8,c:10,C:90,check:`cos=(36+64−100)/96=0→90°`},
    ];
    const {a,b,c,C,check}=pick(cases);
    return{
      question:`En un triángulo con a=${a}, b=${b}, c=${c}, usa la ley de cosenos para hallar el ángulo C (opuesto a c), en grados.`,
      answer:C,type:'number',
      hint:`cos(C) = (a² + b² − c²) / (2ab)`,
      solution:`cos(C) = (${a*a}+${b*b}−${c*c})/(2×${a}×${b}) = ${r3((a*a+b*b-c*c)/(2*a*b))} → C = ${C}°`,
      solutionSteps:[{step:'cos(C)=(a²+b²−c²)/(2ab)',result:r3((a*a+b*b-c*c)/(2*a*b))},{step:'C=arccos(resultado)',result:`${C}°`}],
      topic:'Aplicaciones de trigonometría',
      analyzeError(){return check;}
    };
  };

  G['trig_apl_area_trig']=function(diff){
    const cases=diffCfg(diff,[
      [{a:10,b:8,C:30,area:20},{a:6,b:4,C:30,area:6}],
      [{a:8,b:6,C:90,area:24},{a:10,b:6,C:90,area:30},{a:10,b:8,C:30,area:20}],
      [{a:12,b:10,C:30,area:30},{a:14,b:6,C:30,area:21}],
      [{a:20,b:10,C:30,area:50},{a:16,b:12,C:90,area:96}],
    ]);
    const {a,b,C,area}=pick(cases.flat());
    const sinC=r3(Math.sin(C*PI/180));
    return{
      question:`Calcula el área del triángulo con lados a=${a}, b=${b} y ángulo incluido C=${C}°. Usa: Área = ½·a·b·sen(C).`,
      answer:area,type:'number',
      hint:`Área = (1/2) × ${a} × ${b} × sen(${C}°) = (1/2) × ${a} × ${b} × ${sinC}`,
      solution:`Área = ½ × ${a} × ${b} × ${sinC} = ${area}`,
      solutionSteps:[{step:'½·a·b·sen(C)',result:`½×${a}×${b}×${sinC}=${area}`}],
      topic:'Aplicaciones de trigonometría',
      analyzeError(ua){
        if(Math.abs(parseFloat(ua)-a*b*sinC)<1)return`Olvidaste el factor ½. Área = (1/2)×a×b×sen(C).`;
        return`Área = ½×${a}×${b}×sen(${C}°)=½×${a}×${b}×${sinC}=${area}.`;
      }
    };
  };

  G['trig_apl_altura_objeto']=function(diff){
    const cases=diffCfg(diff,[
      [{ang:45,dist:15,h:15},{ang:45,dist:25,h:25}],
      [{ang:60,dist:8,h:r2(8*1.732)},{ang:30,dist:30,h:r2(30*0.577)}],
      [{ang:60,dist:12,h:r2(12*1.732)},{ang:30,dist:50,h:r2(50*0.577)}],
      [{ang:60,dist:20,h:r2(20*1.732)},{ang:45,dist:80,h:80}],
    ]);
    const {ang,dist,h}=pick(cases.flat());
    const contexts=['un edificio','una montaña','una antena','un árbol grande','un monumento'];
    const ctx=pick(contexts);
    return{
      question:`Un observador está a ${dist} m de la base de ${ctx}. Mide un ángulo de elevación de ${ang}°. ¿Cuál es la altura de ${ctx}? (2 decimales)`,
      answer:h,type:'number',
      hint:`Dibuja el triángulo rectángulo. Cateto opuesto (altura) = ${dist} × tan(${ang}°)`,
      solution:`h = ${dist} × tan(${ang}°) = ${dist} × ${r3(Math.tan(ang*PI/180))} = ${h}`,
      solutionSteps:[{step:'tan(θ)=altura/distancia',result:''},{step:'h=dist×tan(θ)',result:`${h}`}],
      topic:'Aplicaciones de trigonometría',
      analyzeError(){return`h = dist × tan(ángulo) = ${dist} × tan(${ang}°) = ${h}.`;}
    };
  };

  window.MM_TOPIC_GENERATORS['trig_aplicaciones']=['trig_apl_elevacion','trig_apl_ley_sin_lado','trig_apl_ley_cos_lado','trig_apl_ley_cos_angulo','trig_apl_area_trig','trig_apl_altura_objeto'];

  console.log('[MM] generators-trigonometria.js cargado');
})();
