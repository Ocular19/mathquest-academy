/* ═══════════════════════════════════════════════════════════════
   GENERATORS-GEOMETRIA.JS — Generadores dinámicos
   Geometría: 13 unidades, 78+ generadores con análisis de errores
   ═══════════════════════════════════════════════════════════════ */
(function() {
  'use strict';
  if (!window.MM_GENERATORS) window.MM_GENERATORS = {};
  if (!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS = {};
  const G = window.MM_GENERATORS;

  // ── Helpers ──────────────────────────────────────────────────
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(arr) { return arr[ri(0, arr.length - 1)]; }
  function shuffle(a) { a = a.slice(); for (let i=a.length-1;i>0;i--){const j=ri(0,i);[a[i],a[j]]=[a[j],a[i]];} return a; }
  function diffCfg(d, c) { return c[Math.min({easy:0,medio:1,dificil:2,experto:3}[d]??0, c.length-1)]; }
  function r2(x) { return Math.round(x * 100) / 100; }
  const PI = Math.PI;
  const PYTH = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[20,21,29],[9,40,41]];

  // ══════════════════════════════════════════════════════════════
  // 1. ÁNGULOS
  // ══════════════════════════════════════════════════════════════
  G['geo_ang_tipo'] = function(diff) {
    const pairs = [
      [ri(1,89),'agudo',0],[90,'recto',1],[ri(91,179),'obtuso',2],[180,'llano',3]
    ];
    const [ang, tipo, idx] = pick(diffCfg(diff,[pairs.slice(0,2),pairs.slice(0,3),pairs,pairs]));
    const opts = ['Agudo (0°–90°)','Recto (90°)','Obtuso (90°–180°)','Llano (180°)'];
    return {
      question:`Un ángulo mide \\(${ang}°\\). ¿Cómo se clasifica?`,
      answer:String(idx), type:'multiple-choice', options:opts,
      hint:`Compara ${ang}° con 90° y 180°.`,
      solution:`\\(${ang}°\\) → ${opts[idx]}.`,
      topic:'geo_angulos',
      analyzeError:()=>({feedback:'Agudo < 90°, Recto = 90°, Obtuso entre 90° y 180°, Llano = 180°.'})
    };
  };

  G['geo_ang_complementario'] = function(diff) {
    const a = ri(1, diffCfg(diff,[45,70,80,88]));
    return {
      question:`Dos ángulos son complementarios. Uno mide \\(${a}°\\). ¿Cuánto mide el otro?`,
      answer:String(90-a), type:'numeric',
      hint:`Complementarios suman 90°: \\(${a}° + x = 90°\\).`,
      solution:`\\(x = 90° - ${a}° = ${90-a}°\\)`,
      topic:'geo_angulos',
      analyzeError:(ua)=>{ if(parseFloat(ua)===180-a) return{feedback:'Eso es el suplementario. Complementarios suman 90°, no 180°.'}; return{feedback:'Complementario = suma 90°. Resta: 90° − '+a+'° = '+(90-a)+'°.'}; }
    };
  };

  G['geo_ang_suplementario'] = function(diff) {
    const a = ri(diffCfg(diff,[10,5,2,1]), diffCfg(diff,[150,160,170,178]));
    return {
      question:`Dos ángulos son suplementarios. Uno mide \\(${a}°\\). ¿Cuánto mide el otro?`,
      answer:String(180-a), type:'numeric',
      hint:`Suplementarios suman 180°: \\(${a}° + x = 180°\\).`,
      solution:`\\(x = 180° - ${a}° = ${180-a}°\\)`,
      topic:'geo_angulos',
      analyzeError:(ua)=>{ if(parseFloat(ua)===90-a&&90-a>0) return{feedback:'Eso sería el complementario. Suplementarios suman 180°.'}; return{feedback:'Suplementario = suma 180°. Resta: 180° − '+a+'°.'}; }
    };
  };

  G['geo_ang_vertical'] = function(diff) {
    const a = ri(15, diffCfg(diff,[120,140,160,175]));
    return {
      question:`Dos rectas se cortan formando ángulos opuestos por el vértice. Si uno mide \\(${a}°\\), ¿cuánto mide el opuesto?`,
      answer:String(a), type:'numeric',
      hint:`Los ángulos opuestos por el vértice (verticales) son IGUALES.`,
      solution:`El ángulo opuesto también mide \\(${a}°\\).`,
      topic:'geo_angulos',
      analyzeError:(ua)=>{ if(parseFloat(ua)===180-a) return{feedback:'No los confundas: ángulos verticales son iguales. Los adyacentes (suplementarios) suman 180°.'}; return{feedback:'Ángulos opuestos por el vértice = iguales. Respuesta: '+a+'°.'}; }
    };
  };

  G['geo_ang_paralelas'] = function(diff) {
    const a = ri(30, 150);
    const tipo = pick(['alterno_interno','co_interno','correspondiente']);
    const [nombre, ans] = tipo==='alterno_interno' ? ['alterno interno',a] : tipo==='co_interno' ? ['co-interno',180-a] : ['correspondiente',a];
    return {
      question:`Dos rectas paralelas son cortadas por una transversal. Un ángulo mide \\(${a}°\\). ¿Cuánto mide el ángulo ${nombre}?`,
      answer:String(ans), type:'numeric',
      hint:tipo==='co_interno'?`Co-internos son suplementarios (suman 180°).`:`Ángulos ${nombre}s son iguales entre rectas paralelas.`,
      solution:`\\(${ans}°\\)`,
      topic:'geo_angulos',
      analyzeError:()=>({feedback:'Con paralelas: alternos=iguales, correspondientes=iguales, co-internos=suman 180°.'})
    };
  };

  G['geo_ang_en_figura'] = function(diff) {
    const a = ri(20, 80), b = ri(20, 80);
    const c = 180 - a - b;
    if (c <= 0 || c >= 180) return G['geo_ang_en_figura'](diff);
    return {
      question:`En un triángulo, dos ángulos miden \\(${a}°\\) y \\(${b}°\\). ¿Cuánto mide el tercero?`,
      answer:String(c), type:'numeric',
      hint:`La suma de ángulos de un triángulo es 180°: \\(${a}°+${b}°+x=180°\\).`,
      solution:`\\(x = 180°-${a}°-${b}° = ${c}°\\)`,
      topic:'geo_angulos',
      analyzeError:(ua)=>{if(parseFloat(ua)===360-a-b)return{feedback:'La suma en un triángulo es 180°, no 360°.'};return{feedback:`180° − ${a}° − ${b}° = ${c}°.`};}
    };
  };

  MM_TOPIC_GENERATORS['geo_angulos'] = ['geo_ang_tipo','geo_ang_complementario','geo_ang_suplementario','geo_ang_vertical','geo_ang_paralelas','geo_ang_en_figura'];

  // ══════════════════════════════════════════════════════════════
  // 2. TRIÁNGULOS
  // ══════════════════════════════════════════════════════════════
  G['geo_tri_suma_angulos'] = function(diff) {
    const a = ri(20, diffCfg(diff,[80,100,120,140]));
    const b = ri(20, 180-a-20);
    const c = 180-a-b;
    if(c<=0||c>=160) return G['geo_tri_suma_angulos'](diff);
    const missing = pick(['a','b','c']);
    const [q, ans] = missing==='c' ? [`\\(A=${a}°, B=${b}°\\)`,c] : missing==='b' ? [`\\(A=${a}°, C=${c}°\\)`,b] : [`\\(B=${b}°, C=${c}°\\)`,a];
    return {
      question:`En un triángulo con ${q}, ¿cuánto mide el ángulo restante?`,
      answer:String(ans), type:'numeric',
      hint:'La suma de los ángulos interiores de un triángulo es siempre 180°.',
      solution:`\\(${a}°+${b}°+${c}°=180°\\). El ángulo faltante mide \\(${ans}°\\).`,
      solutionSteps:[`Suma de ángulos = 180°`,`Ángulo faltante = 180° − ${180-ans}° = ${ans}°`],
      topic:'geo_triangulos',
      analyzeError:(ua)=>{if(parseFloat(ua)===360-a-b-c+ans)return{feedback:'En triángulos la suma es 180°, no 360°.'};return{feedback:'Suma en triángulo = 180°. Resta los ángulos conocidos.'}}
    };
  };

  G['geo_tri_angulo_exterior'] = function(diff) {
    const a = ri(20,80), b = ri(20,80);
    if(a+b>=180||a+b<=40) return G['geo_tri_angulo_exterior'](diff);
    const ext = a+b;
    return {
      question:`En un triángulo, dos ángulos interiores miden \\(${a}°\\) y \\(${b}°\\). ¿Cuánto mide el ángulo exterior no adyacente a ellos?`,
      answer:String(ext), type:'numeric',
      hint:`El ángulo exterior de un triángulo = suma de los dos ángulos interiores no adyacentes.`,
      solution:`\\(${a}°+${b}°=${ext}°\\)`,
      topic:'geo_triangulos',
      analyzeError:(ua)=>{if(parseFloat(ua)===180-a-b)return{feedback:'Eso sería el tercer ángulo interior. El EXTERIOR es la suma de los otros dos: '+a+'°+'+b+'°='+ext+'°.'};return{feedback:'Ángulo exterior = suma de los dos ángulos interiores no adyacentes.'}}
    };
  };

  G['geo_tri_clasificar_angulos'] = function(diff) {
    const tipos = [
      { a:[60,60,60], tipo:'Equilátero (y acutángulo)', idx:0 },
      { a:[90,45,45], tipo:'Rectángulo', idx:1 },
      { a:[120,40,20], tipo:'Obtusángulo', idx:2 },
      { a:[70,60,50], tipo:'Acutángulo', idx:3 }
    ];
    const t = pick(tipos);
    const opts = ['Acutángulo (todos <90°)','Rectángulo (un ángulo=90°)','Obtusángulo (un ángulo>90°)','Equilátero (60-60-60)'];
    return {
      question:`Un triángulo tiene ángulos \\(${t.a[0]}°,\\; ${t.a[1]}°,\\; ${t.a[2]}°\\). ¿Cómo se clasifica por sus ángulos?`,
      answer:String(t.idx), type:'multiple-choice', options:opts,
      hint:`Analiza si algún ángulo es ≥90° o si todos son <90°.`,
      solution:`Ángulos: ${t.a[0]}°, ${t.a[1]}°, ${t.a[2]}° → ${t.tipo}.`,
      topic:'geo_triangulos',
      analyzeError:()=>({feedback:'Rectángulo: un ángulo = 90°. Obtusángulo: un ángulo > 90°. Acutángulo: todos < 90°.'})
    };
  };

  G['geo_tri_clasificar_lados'] = function(diff) {
    const opts = ['Equilátero (3 lados iguales)','Isósceles (2 lados iguales)','Escaleno (todos diferentes)'];
    const t = pick([
      {lados:'5, 5, 5', idx:0},{lados:'7, 7, 4', idx:1},{lados:'3, 5, 7', idx:2},
      {lados:'10, 10, 10', idx:0},{lados:`${ri(3,9)}, ${ri(3,9)}, ${ri(3,9)}`.replace(/(\d+), \1, \1/,'$1, $1, $1'), idx:0}
    ]);
    // Regenerate cleaner
    const e = pick([5,6,7,8,9,10]);
    const iso = [ri(4,9),ri(4,9)]; const iso2 = iso[0]===iso[1]?[iso[0],iso[0]+1]:iso;
    const esc = [ri(3,6),ri(7,9),ri(10,14)];
    const tClean = pick([
      {lados:`${e}, ${e}, ${e}`, idx:0},
      {lados:`${iso2[0]}, ${iso2[0]}, ${ri(3,8)}`, idx:1},
      {lados:`${esc[0]}, ${esc[1]}, ${esc[2]}`, idx:2}
    ]);
    return {
      question:`Un triángulo tiene lados \\(${tClean.lados}\\) cm. ¿Cómo se clasifica por sus lados?`,
      answer:String(tClean.idx), type:'multiple-choice', options:opts,
      hint:`Compara los tres lados entre sí.`,
      solution:`Lados ${tClean.lados} → ${opts[tClean.idx]}.`,
      topic:'geo_triangulos',
      analyzeError:()=>({feedback:'3 iguales=equilátero, 2 iguales=isósceles, todos diferentes=escaleno.'})
    };
  };

  G['geo_tri_desigualdad'] = function(diff) {
    const a = ri(3, diffCfg(diff,[6,8,10,15]));
    const b = ri(3, diffCfg(diff,[6,8,10,15]));
    const cValid = ri(Math.abs(a-b)+1, a+b-1);
    const cInvalid = a+b + ri(1,5);
    const [c, valid] = pick([[cValid, true],[cInvalid, false]]);
    return {
      question:`¿Pueden ser \\(${a}\\), \\(${b}\\) y \\(${c}\\) los lados de un triángulo?`,
      answer: valid?'0':'1', type:'multiple-choice', options:['Sí, forman un triángulo','No, no forman un triángulo'],
      hint:`Comprueba la desigualdad triangular: la suma de dos lados debe ser mayor que el tercero.`,
      solution:`\\(${a}+${b}=${a+b}\\) ${valid?'>':'≤'} \\(${c}\\) → ${valid?'Sí forman triángulo':'No forman triángulo (la suma no supera al mayor lado)'}.`,
      topic:'geo_triangulos',
      analyzeError:()=>({feedback:`Desigualdad triangular: la suma de cualquier par de lados debe ser ESTRICTAMENTE MAYOR que el tercer lado.`})
    };
  };

  G['geo_tri_30_60_90'] = function(diff) {
    const n = ri(1, diffCfg(diff,[4,6,8,12]));
    const tipo = pick(['hipotenusa','cateto_largo','cateto_corto']);
    // In 30-60-90: sides are n, n√3, 2n
    const rt = Math.round(n*Math.sqrt(3)*100)/100;
    if (tipo==='hipotenusa') {
      return {question:`En un triángulo 30-60-90, el cateto corto mide \\(${n}\\) cm. ¿Cuánto mide la hipotenusa?`,
        answer:String(2*n), type:'numeric',
        hint:`En triángulo 30-60-90: hipotenusa = 2 × cateto corto.`,
        solution:`\\(h = 2 \\times ${n} = ${2*n}\\) cm`,
        topic:'geo_triangulos'};
    } else if (tipo==='cateto_largo') {
      return {question:`En un triángulo 45-45-90, el cateto mide \\(${n}\\) cm. ¿Cuánto mide la hipotenusa? (da la respuesta en forma simplificada, p.ej. "${n}√2")`,
        answer:String(r2(n*Math.sqrt(2))), type:'numeric',
        hint:`En triángulo 45-45-90: hipotenusa = cateto × \\(\\sqrt{2}\\) ≈ cateto × 1.414.`,
        solution:`\\(h = ${n}\\sqrt{2} \\approx ${r2(n*Math.sqrt(2))}\\) cm`,
        topic:'geo_triangulos'};
    } else {
      return {question:`En un triángulo 30-60-90, la hipotenusa mide \\(${2*n}\\) cm. ¿Cuánto mide el cateto corto?`,
        answer:String(n), type:'numeric',
        hint:`En triángulo 30-60-90: cateto corto = hipotenusa ÷ 2.`,
        solution:`\\(${2*n} \\div 2 = ${n}\\) cm`,
        topic:'geo_triangulos'};
    }
  };

  MM_TOPIC_GENERATORS['geo_triangulos'] = ['geo_tri_suma_angulos','geo_tri_angulo_exterior','geo_tri_clasificar_angulos','geo_tri_clasificar_lados','geo_tri_desigualdad','geo_tri_30_60_90'];

  // ══════════════════════════════════════════════════════════════
  // 3. CONGRUENCIA
  // ══════════════════════════════════════════════════════════════
  G['geo_cong_criterio'] = function(diff) {
    const casos = [
      { datos:'tres lados iguales (L-L-L)', crit:'LLL (SSS)', idx:0 },
      { datos:'dos lados y el ángulo comprendido iguales', crit:'LAL (SAS)', idx:1 },
      { datos:'un lado y los dos ángulos adyacentes iguales', crit:'ALA (ASA)', idx:2 },
      { datos:'dos ángulos y un lado no comprendido iguales', crit:'AAL (AAS)', idx:3 },
      { datos:'hipotenusa y un cateto iguales (triángulos rectángulos)', crit:'HC (RHS/HL)', idx:4 }
    ];
    const c = pick(diffCfg(diff,[casos.slice(0,3),casos.slice(0,4),casos,casos]));
    const opts = ['LLL – tres lados','LAL – dos lados y ángulo comprendido','ALA – un lado entre dos ángulos','AAL – dos ángulos y lado no comprendido','HC – hipotenusa y cateto (rect.)'];
    return {
      question:`Dos triángulos tienen ${c.datos}. ¿Qué criterio de congruencia se aplica?`,
      answer:String(c.idx), type:'multiple-choice', options:opts,
      hint:`Piensa qué partes (lados L y ángulos A) se conocen y en qué posición.`,
      solution:`Se aplica el criterio **${c.crit}**.`,
      topic:'geo_congruencia',
      analyzeError:()=>({feedback:'LLL=3 lados, LAL=2 lados+ángulo entre ellos, ALA=ángulo-lado-ángulo, AAL=2 ángulos+lado, HC=solo rectángulos.'})
    };
  };

  G['geo_cong_elemento_faltante'] = function(diff) {
    const a = ri(3,12), b = ri(3,12), angA = ri(30,100);
    return {
      question:`Si \\(\\triangle ABC \\cong \\triangle DEF\\), y \\(AB=${a}\\) cm, \\(BC=${b}\\) cm, \\(\\angle A=${angA}°\\). ¿Cuánto mide \\(DE\\)?`,
      answer:String(a), type:'numeric',
      hint:`En triángulos congruentes, los lados y ángulos correspondientes son iguales. AB corresponde a DE.`,
      solution:`\\(DE = AB = ${a}\\) cm (lados correspondientes en triángulos congruentes).`,
      topic:'geo_congruencia',
      analyzeError:(ua)=>{if(parseFloat(ua)===b)return{feedback:'EF=BC='+b+', no DE. Los lados AB y DE son los correspondientes (primer vértice con primer vértice).'};return{feedback:'En triángulos congruentes, el orden de los vértices indica la correspondencia: A↔D, B↔E, C↔F.'}}
    };
  };

  G['geo_cong_angulo_faltante'] = function(diff) {
    const a = ri(40,80), b = ri(40,80);
    if(a+b>=180) return G['geo_cong_angulo_faltante'](diff);
    const c = 180-a-b;
    return {
      question:`Si \\(\\triangle ABC \\cong \\triangle PQR\\), \\(\\angle A=${a}°\\) y \\(\\angle B=${b}°\\). ¿Cuánto mide \\(\\angle R\\)?`,
      answer:String(c), type:'numeric',
      hint:`El \\(\\angle R\\) corresponde a \\(\\angle C\\). Primero halla \\(\\angle C = 180°-${a}°-${b}°\\).`,
      solution:`\\(\\angle C = 180°-${a}°-${b}° = ${c}°\\). Como C↔R, \\(\\angle R = ${c}°\\).`,
      topic:'geo_congruencia'
    };
  };

  G['geo_cong_aplicar'] = function(diff) {
    const lados = [ri(4,10),ri(4,10),ri(4,10)];
    const opts = ['Sí, son congruentes (LLL)','No, no son congruentes','Falta información para determinarlo'];
    const caso = pick([0,0,1,2]);
    const ladosB = caso===0 ? [...lados].sort(()=>Math.random()-0.5) : caso===1 ? [lados[0]+1,lados[1],lados[2]] : [lados[0],lados[1]];
    const qLadosB = ladosB.join(', ');
    return {
      question:`Triángulo A tiene lados ${lados.join(', ')} cm. Triángulo B tiene lados ${qLadosB} cm. ¿Son congruentes?`,
      answer:String(caso), type:'multiple-choice', options:opts,
      hint:`Para LLL: todos los lados deben ser iguales (en cualquier orden).`,
      solution:caso===0?'Mismos lados → congruentes por LLL.':caso===1?'Los lados no coinciden → no congruentes.':'Solo 2 lados conocidos → falta información.',
      topic:'geo_congruencia'
    };
  };

  MM_TOPIC_GENERATORS['geo_congruencia'] = ['geo_cong_criterio','geo_cong_elemento_faltante','geo_cong_angulo_faltante','geo_cong_aplicar'];

  // ══════════════════════════════════════════════════════════════
  // 4. SEMEJANZA
  // ══════════════════════════════════════════════════════════════
  G['geo_sem_razon'] = function(diff) {
    const k = ri(2, diffCfg(diff,[3,4,6,8]));
    const a = ri(3,8), b = ri(3,8), c = ri(3,8);
    return {
      question:`Un triángulo tiene lados \\(${a}, ${b}, ${c}\\) cm y otro tiene lados \\(${a*k}, ${b*k}, ${c*k}\\) cm. ¿Cuál es la razón de semejanza?`,
      answer:String(k), type:'numeric',
      hint:`Razón = lado del triángulo mayor ÷ lado correspondiente del menor.`,
      solution:`\\(${a*k}/${a} = ${b*k}/${b} = ${c*k}/${c} = ${k}\\)`,
      topic:'geo_semejanza',
      analyzeError:(ua)=>{if(parseFloat(ua)===1/k)return{feedback:`La razón de semejanza del grande al pequeño es ${k} (no 1/${k}).`};return{feedback:`Divide lados correspondientes: ${a*k}/${a} = ${k}.`}}
    };
  };

  G['geo_sem_lado_faltante'] = function(diff) {
    const k = ri(2, diffCfg(diff,[3,4,6,8]));
    const a = ri(3,8), b = ri(3,8);
    const tipo = pick(['mayor','menor']);
    if(tipo==='mayor') {
      return {
        question:`Dos triángulos son semejantes con razón ${k}:1. El lado del menor mide \\(${a}\\) cm. ¿Cuánto mide el correspondiente del mayor?`,
        answer:String(a*k), type:'numeric',
        hint:`Lado mayor = lado menor × razón = ${a} × ${k}.`,
        solution:`\\(${a} \\times ${k} = ${a*k}\\) cm`,
        topic:'geo_semejanza'
      };
    } else {
      return {
        question:`Dos triángulos son semejantes con razón ${k}:1. El lado del mayor mide \\(${a*k}\\) cm. ¿Cuánto mide el correspondiente del menor?`,
        answer:String(a), type:'numeric',
        hint:`Lado menor = lado mayor ÷ razón = ${a*k} ÷ ${k}.`,
        solution:`\\(${a*k} \\div ${k} = ${a}\\) cm`,
        topic:'geo_semejanza'
      };
    }
  };

  G['geo_sem_razon_areas'] = function(diff) {
    const k = ri(2, diffCfg(diff,[3,4,5,6]));
    const a1 = ri(4,16);
    const a2 = a1*k*k;
    return {
      question:`Dos figuras semejantes tienen razón de semejanza \\(${k}\\). Si el área de la menor es \\(${a1}\\) cm², ¿cuánto es el área de la mayor?`,
      answer:String(a2), type:'numeric',
      hint:`La razón de áreas = (razón de semejanza)². Área mayor = ${a1} × ${k}².`,
      solution:`\\(${a1} \\times ${k}^2 = ${a1} \\times ${k*k} = ${a2}\\) cm²`,
      topic:'geo_semejanza',
      analyzeError:(ua)=>{if(parseFloat(ua)===a1*k)return{feedback:`Las áreas se escalan con el CUADRADO de la razón: ×${k}² = ×${k*k}, no ×${k}.`};return{feedback:`Razón de áreas = (razón lineal)² = ${k}² = ${k*k}.`}}
    };
  };

  G['geo_sem_sombra'] = function(diff) {
    const hPer = ri(150,200), shPer = ri(5,25);
    const hObj = ri(3, diffCfg(diff,[10,20,40,80]));
    const shObj = Math.round(shPer * hObj / hPer * 10) / 10;
    return {
      question:`Una persona de ${hPer} cm proyecta una sombra de ${shPer} cm. Un árbol proyecta una sombra de ${r2(shObj*hPer/shPer)} cm en las mismas condiciones. ¿Cuánto mide el árbol?`,
      answer:String(r2(shObj*hPer/shPer * hPer / (r2(shObj*hPer/shPer)))), type:'numeric',
      hint:`Por semejanza: altura/sombra es constante. \\(\\frac{h_{árbol}}{sombra_{árbol}} = \\frac{${hPer}}{${shPer}}\\).`,
      solution:`\\(h = \\frac{${hPer} \\times sombra_{árbol}}{${shPer}}\\)`,
      topic:'geo_semejanza'
    };
  };

  G['geo_sem_proporcional'] = function(diff) {
    const a = ri(3,8), b = ri(3,8);
    const k = ri(2,4);
    const c = a*k, d = b*k;
    const x = ri(3,8);
    const solx = Math.round(x * b / a * 10) / 10;
    return {
      question:`Si \\(\\frac{${a}}{${b}} = \\frac{${x}}{x}\\), ¿cuánto vale \\(x\\)?`,
      answer:String(r2(x*b/a)), type:'numeric',
      hint:`Proporciones: \\(a \\cdot x = b \\cdot ${x}\\) (producto cruzado). \\(x = \\frac{${b}\\times${x}}{${a}}\\).`,
      solution:`\\(x = \\frac{${b}\\times${x}}{${a}} = ${r2(x*b/a)}\\)`,
      topic:'geo_semejanza'
    };
  };

  MM_TOPIC_GENERATORS['geo_semejanza'] = ['geo_sem_razon','geo_sem_lado_faltante','geo_sem_razon_areas','geo_sem_sombra','geo_sem_proporcional'];

  // ══════════════════════════════════════════════════════════════
  // 5. TEOREMA DE PITÁGORAS
  // ══════════════════════════════════════════════════════════════
  G['geo_pit_hipotenusa'] = function(diff) {
    const [a,b,c] = pick(diffCfg(diff,[PYTH.slice(0,3),PYTH.slice(0,6),PYTH,PYTH]));
    return {
      question:`Un triángulo rectángulo tiene catetos \\(${a}\\) y \\(${b}\\) cm. ¿Cuánto mide la hipotenusa?`,
      answer:String(c), type:'numeric',
      hint:`Teorema de Pitágoras: \\(c = \\sqrt{a^2+b^2} = \\sqrt{${a*a}+${b*b}}\\).`,
      solution:`\\(c = \\sqrt{${a}^2+${b}^2} = \\sqrt{${a*a+b*b}} = ${c}\\) cm`,
      solutionSteps:[`\\(a^2+b^2 = ${a*a}+${b*b} = ${a*a+b*b}\\)`,`\\(c = \\sqrt{${a*a+b*b}} = ${c}\\) cm`],
      topic:'geo_pitagoras',
      analyzeError:(ua)=>{if(parseFloat(ua)===a+b)return{feedback:'¡No sumes los catetos! Debes calcular √(a²+b²), no a+b.'};if(parseFloat(ua)===a*a+b*b)return{feedback:'Falta aplicar la raíz cuadrada: c = √(a²+b²).'};return{feedback:`c² = ${a}²+${b}² = ${a*a+b*b}. Luego c = √${a*a+b*b} = ${c}.`}}
    };
  };

  G['geo_pit_cateto'] = function(diff) {
    const [a,b,c] = pick(diffCfg(diff,[PYTH.slice(0,3),PYTH.slice(0,6),PYTH,PYTH]));
    const [known, missing, ans] = pick([[b,a,a],[a,b,b]]);
    return {
      question:`Un triángulo rectángulo tiene cateto \\(${known}\\) cm e hipotenusa \\(${c}\\) cm. ¿Cuánto mide el otro cateto?`,
      answer:String(ans), type:'numeric',
      hint:`Despeja: \\(a = \\sqrt{c^2-b^2} = \\sqrt{${c*c}-${known*known}}\\).`,
      solution:`\\(a = \\sqrt{${c}^2-${known}^2} = \\sqrt{${c*c-known*known}} = ${ans}\\) cm`,
      topic:'geo_pitagoras',
      analyzeError:(ua)=>{if(parseFloat(ua)===Math.sqrt(c*c+known*known))return{feedback:'Para hallar un cateto: resta, no sumas. a = √(c²−b²).'};return{feedback:`a² = c²−b² = ${c*c}−${known*known} = ${c*c-known*known}. a = √${c*c-known*known} = ${ans}.`}}
    };
  };

  G['geo_pit_verificar'] = function(diff) {
    const [a,b,c] = pick(PYTH);
    const mult = ri(1, diffCfg(diff,[1,2,3,4]));
    const valido = pick([true,false]);
    const [qa,qb,qc] = valido ? [a*mult,b*mult,c*mult] : [a*mult,b*mult,c*mult+ri(1,4)];
    return {
      question:`¿Pueden \\(${qa}\\), \\(${qb}\\) y \\(${qc}\\) ser los lados de un triángulo rectángulo?`,
      answer:valido?'0':'1', type:'multiple-choice', options:['Sí, es un triángulo rectángulo','No, no forma triángulo rectángulo'],
      hint:`Comprueba si \\(${Math.max(qa,qb,qc)}^2 = ${qa===Math.max(qa,qb,qc)?qb+'^2+'+qc+'^2':qa+'^2+'+qb+'^2'}\\).`,
      solution:valido?`\\(${qa}^2+${qb}^2=${qa*qa+qb*qb}=${qc*qc}=${qc}^2\\) ✓`:`\\(${qa*qa}+${qb*qb}=${qa*qa+qb*qb}\\neq${qc*qc}=${qc}^2\\)`,
      topic:'geo_pitagoras'
    };
  };

  G['geo_pit_diagonal'] = function(diff) {
    const l = ri(3, diffCfg(diff,[8,10,15,20]));
    const w = ri(3, diffCfg(diff,[8,10,15,20]));
    const d = r2(Math.sqrt(l*l+w*w));
    return {
      question:`Un rectángulo mide \\(${l}\\) cm de largo y \\(${w}\\) cm de ancho. ¿Cuánto mide su diagonal?`,
      answer:String(d), type:'numeric',
      hint:`La diagonal es la hipotenusa del triángulo rectángulo formado: \\(d=\\sqrt{${l}^2+${w}^2}\\).`,
      solution:`\\(d=\\sqrt{${l*l}+${w*w}}=\\sqrt{${l*l+w*w}}\\approx${d}\\) cm`,
      topic:'geo_pitagoras'
    };
  };

  G['geo_pit_area_triangulo'] = function(diff) {
    const [a,b,c] = pick(PYTH.slice(0,5));
    const mult = ri(1, diffCfg(diff,[1,2,2,3]));
    const area = a*mult*b*mult/2;
    return {
      question:`Un triángulo rectángulo tiene catetos \\(${a*mult}\\) y \\(${b*mult}\\) cm. ¿Cuánto es su área?`,
      answer:String(area), type:'numeric',
      hint:`Área del triángulo rectángulo = \\(\\frac{cateto_1 \\times cateto_2}{2}\\).`,
      solution:`\\(A=\\frac{${a*mult}\\times${b*mult}}{2}=\\frac{${a*mult*b*mult}}{2}=${area}\\) cm²`,
      topic:'geo_pitagoras',
      analyzeError:(ua)=>{if(parseFloat(ua)===a*mult*b*mult)return{feedback:'Recuerda dividir por 2: el área del triángulo es la mitad del rectángulo de misma base y altura.'};return{feedback:`Área = (cateto₁ × cateto₂)/2 = (${a*mult}×${b*mult})/2 = ${area}.`}}
    };
  };

  G['geo_pit_3d'] = function(diff) {
    if(diff==='easy') return G['geo_pit_hipotenusa']('easy');
    const l=ri(3,8), w=ri(3,8), h=ri(3,8);
    const diag3d = r2(Math.sqrt(l*l+w*w+h*h));
    return {
      question:`Una caja mide \\(${l}×${w}×${h}\\) cm. ¿Cuánto mide la diagonal interior de la caja?`,
      answer:String(diag3d), type:'numeric',
      hint:`Diagonal 3D: \\(d=\\sqrt{l^2+w^2+h^2}=\\sqrt{${l*l}+${w*w}+${h*h}}\\).`,
      solution:`\\(d=\\sqrt{${l*l+w*w+h*h}}\\approx${diag3d}\\) cm`,
      topic:'geo_pitagoras'
    };
  };

  MM_TOPIC_GENERATORS['geo_pitagoras'] = ['geo_pit_hipotenusa','geo_pit_cateto','geo_pit_verificar','geo_pit_diagonal','geo_pit_area_triangulo','geo_pit_3d'];

  // ══════════════════════════════════════════════════════════════
  // 6. POLÍGONOS
  // ══════════════════════════════════════════════════════════════
  G['geo_pol_suma_angulos'] = function(diff) {
    const n = ri(3, diffCfg(diff,[5,7,9,12]));
    const suma = (n-2)*180;
    return {
      question:`¿Cuánto suman los ángulos interiores de un polígono de \\(${n}\\) lados?`,
      answer:String(suma), type:'numeric',
      hint:`Fórmula: \\((n-2)\\times180°\\). Con \\(n=${n}\\): \\((${n}-2)\\times180°\\).`,
      solution:`\\((${n}-2)\\times180°=${n-2}\\times180°=${suma}°\\)`,
      topic:'geo_poligonos',
      analyzeError:(ua)=>{if(parseFloat(ua)===n*180)return{feedback:`La fórmula es (n−2)×180°, no n×180°. El "−2" es esencial.`};return{feedback:`Suma = (n−2)×180° = (${n}−2)×180° = ${suma}°.`}}
    };
  };

  G['geo_pol_angulo_interior_regular'] = function(diff) {
    const n = ri(3, diffCfg(diff,[6,8,10,12]));
    const ang = (n-2)*180/n;
    return {
      question:`¿Cuánto mide cada ángulo interior de un polígono regular de \\(${n}\\) lados?`,
      answer:String(r2(ang)), type:'numeric',
      hint:`Ángulo interior = \\(\\frac{(n-2)\\times180°}{n} = \\frac{${(n-2)*180}°}{${n}}\\).`,
      solution:`\\(\\frac{(${n}-2)\\times180°}{${n}}=\\frac{${(n-2)*180}°}{${n}}=${r2(ang)}°\\)`,
      topic:'geo_poligonos',
      analyzeError:(ua)=>{if(parseFloat(ua)===(n-2)*180)return{feedback:'Eso es la SUMA total. Para cada ángulo divide por n: '+r2(ang)+'°.'};return{feedback:`Cada ángulo = suma total / n = ${(n-2)*180}°/${n} = ${r2(ang)}°.`}}
    };
  };

  G['geo_pol_angulo_exterior'] = function(diff) {
    const n = ri(3, diffCfg(diff,[6,8,10,12]));
    const ext = 360/n;
    return {
      question:`¿Cuánto mide cada ángulo exterior de un polígono regular de \\(${n}\\) lados?`,
      answer:String(r2(ext)), type:'numeric',
      hint:`La suma de ángulos exteriores de cualquier polígono convexo es siempre 360°. Divide entre ${n}.`,
      solution:`\\(\\frac{360°}{${n}}=${r2(ext)}°\\)`,
      topic:'geo_poligonos',
      analyzeError:()=>({feedback:'La suma de los ángulos EXTERIORES de cualquier polígono convexo es siempre 360°. Divide por n.'})
    };
  };

  G['geo_pol_diagonales'] = function(diff) {
    const n = ri(4, diffCfg(diff,[6,8,10,12]));
    const diag = n*(n-3)/2;
    return {
      question:`¿Cuántas diagonales tiene un polígono de \\(${n}\\) lados?`,
      answer:String(diag), type:'numeric',
      hint:`Número de diagonales = \\(\\frac{n(n-3)}{2}\\). Con \\(n=${n}\\).`,
      solution:`\\(\\frac{${n}(${n}-3)}{2}=\\frac{${n*(n-3)}}{2}=${diag}\\)`,
      topic:'geo_poligonos'
    };
  };

  G['geo_pol_lados_desde_suma'] = function(diff) {
    const n = ri(4, diffCfg(diff,[6,8,10,12]));
    const suma = (n-2)*180;
    return {
      question:`La suma de los ángulos interiores de un polígono es \\(${suma}°\\). ¿Cuántos lados tiene?`,
      answer:String(n), type:'numeric',
      hint:`Despeja n en \\((n-2)\\times180°=${suma}°\\). \\(n-2=\\frac{${suma}}{180}=${(suma/180).toFixed(0)}\\).`,
      solution:`\\(n-2=\\frac{${suma}}{180}=${suma/180}\\) → \\(n=${n}\\)`,
      topic:'geo_poligonos',
      analyzeError:(ua)=>{if(parseFloat(ua)===suma/180)return{feedback:`Eso es n−2 = ${suma/180}. Suma 2: n = ${suma/180+2} = ${n}.`};return{feedback:`(n−2)×180 = ${suma} → n−2 = ${suma/180} → n = ${n}.`}}
    };
  };

  G['geo_pol_clasificar'] = function(diff) {
    const polys = [
      {n:3,nom:'Triángulo'},{n:4,nom:'Cuadrilátero'},{n:5,nom:'Pentágono'},{n:6,nom:'Hexágono'},
      {n:7,nom:'Heptágono'},{n:8,nom:'Octágono'},{n:10,nom:'Decágono'},{n:12,nom:'Dodecágono'}
    ];
    const p = pick(diffCfg(diff,[polys.slice(0,4),polys.slice(0,6),polys,polys]));
    const opts = shuffle(polys.slice(0,6)).map(q=>q.nom).slice(0,4);
    if(!opts.includes(p.nom)) opts[0]=p.nom;
    const idx = opts.indexOf(p.nom);
    return {
      question:`¿Cómo se llama un polígono de \\(${p.n}\\) lados?`,
      answer:String(idx), type:'multiple-choice', options:opts,
      hint:`Recuerda: 3=triángulo, 4=cuadrilátero, 5=pentágono, 6=hexágono, 8=octágono.`,
      solution:`Un polígono de ${p.n} lados se llama **${p.nom}**.`,
      topic:'geo_poligonos'
    };
  };

  MM_TOPIC_GENERATORS['geo_poligonos'] = ['geo_pol_suma_angulos','geo_pol_angulo_interior_regular','geo_pol_angulo_exterior','geo_pol_diagonales','geo_pol_lados_desde_suma','geo_pol_clasificar'];

  // ══════════════════════════════════════════════════════════════
  // 7. PERÍMETRO
  // ══════════════════════════════════════════════════════════════
  G['geo_per_rectangulo'] = function(diff) {
    const l = ri(2, diffCfg(diff,[10,15,25,50])), w = ri(2, diffCfg(diff,[10,15,25,50]));
    const P = 2*(l+w);
    return {
      question:`Un rectángulo mide \\(${l}\\) cm de largo y \\(${w}\\) cm de ancho. ¿Cuál es su perímetro?`,
      answer:String(P), type:'numeric',
      hint:`\\(P = 2(l+w) = 2(${l}+${w})\\).`,
      solution:`\\(P = 2(${l}+${w}) = 2\\times${l+w} = ${P}\\) cm`,
      topic:'geo_perimetro',
      analyzeError:(ua)=>{if(parseFloat(ua)===l+w)return{feedback:'Solo sumaste l+w. El perímetro tiene 4 lados: P = 2(l+w).'};if(parseFloat(ua)===l*w)return{feedback:'Eso es el área, no el perímetro. P = 2(l+w).'};return{feedback:`P = 2×(${l}+${w}) = 2×${l+w} = ${P} cm.`}}
    };
  };

  G['geo_per_triangulo'] = function(diff) {
    const a=ri(3,12), b=ri(3,12), c=ri(Math.abs(a-b)+1,a+b-1);
    const P = a+b+c;
    return {
      question:`Un triángulo tiene lados \\(${a}\\), \\(${b}\\) y \\(${c}\\) cm. ¿Cuál es su perímetro?`,
      answer:String(P), type:'numeric',
      hint:`Perímetro = suma de todos los lados: \\(${a}+${b}+${c}\\).`,
      solution:`\\(P=${a}+${b}+${c}=${P}\\) cm`,
      topic:'geo_perimetro'
    };
  };

  G['geo_per_cuadrado'] = function(diff) {
    const l = ri(2, diffCfg(diff,[10,15,25,50]));
    const P = 4*l;
    return {
      question:`Un cuadrado tiene lado \\(${l}\\) cm. ¿Cuál es su perímetro?`,
      answer:String(P), type:'numeric',
      hint:`Cuadrado: 4 lados iguales. \\(P=4\\times${l}\\).`,
      solution:`\\(P=4\\times${l}=${P}\\) cm`,
      topic:'geo_perimetro',
      analyzeError:(ua)=>{if(parseFloat(ua)===l*l)return{feedback:'Eso es el área (l²). El perímetro es 4×l.'};return{feedback:`P = 4×${l} = ${P} cm.`}}
    };
  };

  G['geo_per_poligono_regular'] = function(diff) {
    const n = ri(3, diffCfg(diff,[6,8,10,12])), l = ri(2, diffCfg(diff,[8,12,15,20]));
    const P = n*l;
    return {
      question:`Un polígono regular de \\(${n}\\) lados tiene cada lado de \\(${l}\\) cm. ¿Cuánto mide su perímetro?`,
      answer:String(P), type:'numeric',
      hint:`Polígono regular: \\(P = n \\times l = ${n}\\times${l}\\).`,
      solution:`\\(P=${n}\\times${l}=${P}\\) cm`,
      topic:'geo_perimetro'
    };
  };

  G['geo_per_problema'] = function(diff) {
    const l = ri(4, diffCfg(diff,[10,15,20,30])), w = l-ri(1,3);
    const problemas = [
      { q:`Un jardín rectangular mide ${l} m de largo y ${w} m de ancho. ¿Cuántos metros de cerca se necesitan para rodearlo?`, a:2*(l+w) },
      { q:`Una piscina cuadrada tiene ${l} m de lado. ¿Cuántos metros de borde necesita?`, a:4*l }
    ];
    const p = pick(problemas);
    return {
      question:p.q, answer:String(p.a), type:'numeric',
      hint:`El borde/cerca corresponde al perímetro de la figura.`,
      solution:`Perímetro = ${p.a} m`,
      topic:'geo_perimetro'
    };
  };

  G['geo_per_lado_faltante'] = function(diff) {
    const P = ri(20, diffCfg(diff,[40,60,80,120]));
    const tipo = pick(['cuadrado','rectangulo']);
    if(tipo==='cuadrado') {
      return {
        question:`El perímetro de un cuadrado es \\(${P}\\) cm. ¿Cuánto mide cada lado?`,
        answer:String(P/4), type:'numeric',
        hint:`\\(P = 4l\\) → \\(l = P/4 = ${P}/4\\).`,
        solution:`\\(l=${P}/4=${P/4}\\) cm`,
        topic:'geo_perimetro'
      };
    } else {
      const w = ri(3,P/2-3);
      const l = P/2-w;
      if(l<=0||!Number.isInteger(l)) return G['geo_per_lado_faltante'](diff);
      return {
        question:`El perímetro de un rectángulo es \\(${P}\\) cm y el ancho mide \\(${w}\\) cm. ¿Cuánto mide el largo?`,
        answer:String(l), type:'numeric',
        hint:`\\(P=2(l+w)\\) → \\(l=P/2-w=${P}/2-${w}\\).`,
        solution:`\\(l=${P/2}-${w}=${l}\\) cm`,
        topic:'geo_perimetro'
      };
    }
  };

  MM_TOPIC_GENERATORS['geo_perimetro'] = ['geo_per_rectangulo','geo_per_triangulo','geo_per_cuadrado','geo_per_poligono_regular','geo_per_problema','geo_per_lado_faltante'];

  // ══════════════════════════════════════════════════════════════
  // 8. ÁREA
  // ══════════════════════════════════════════════════════════════
  G['geo_area_cuadrado'] = function(diff) {
    const l = ri(2, diffCfg(diff,[10,15,20,30]));
    return {
      question:`Un cuadrado tiene lado \\(${l}\\) cm. ¿Cuál es su área?`,
      answer:String(l*l), type:'numeric',
      hint:`\\(A=l^2=${l}^2\\).`,
      solution:`\\(A=${l}^2=${l*l}\\) cm²`,
      topic:'geo_area',
      analyzeError:(ua)=>{if(parseFloat(ua)===4*l)return{feedback:'Eso es el perímetro (4l). El área es l² = '+l*l+' cm².'};return{feedback:`A = l² = ${l}² = ${l*l} cm².`}}
    };
  };

  G['geo_area_rectangulo'] = function(diff) {
    const l=ri(2, diffCfg(diff,[10,15,20,40])), w=ri(2, diffCfg(diff,[10,15,20,40]));
    return {
      question:`Un rectángulo mide \\(${l}\\) cm de largo y \\(${w}\\) cm de ancho. ¿Cuál es su área?`,
      answer:String(l*w), type:'numeric',
      hint:`\\(A=l\\times w=${l}\\times${w}\\).`,
      solution:`\\(A=${l}\\times${w}=${l*w}\\) cm²`,
      topic:'geo_area',
      analyzeError:(ua)=>{if(parseFloat(ua)===2*(l+w))return{feedback:'Eso es el perímetro. El área es l×w = '+l*w+' cm².'};return{feedback:`A = l×w = ${l}×${w} = ${l*w} cm².`}}
    };
  };

  G['geo_area_triangulo'] = function(diff) {
    const b=ri(2, diffCfg(diff,[10,15,20,40])), h=ri(2, diffCfg(diff,[10,15,20,40]));
    const area=b*h/2;
    return {
      question:`Un triángulo tiene base \\(${b}\\) cm y altura \\(${h}\\) cm. ¿Cuál es su área?`,
      answer:String(area), type:'numeric',
      hint:`\\(A=\\frac{b\\times h}{2}=\\frac{${b}\\times${h}}{2}\\).`,
      solution:`\\(A=\\frac{${b}\\times${h}}{2}=\\frac{${b*h}}{2}=${area}\\) cm²`,
      topic:'geo_area',
      analyzeError:(ua)=>{if(parseFloat(ua)===b*h)return{feedback:'Olvidaste dividir por 2. El área del triángulo = (b×h)/2.'};return{feedback:`A = (${b}×${h})/2 = ${area} cm².`}}
    };
  };

  G['geo_area_paralelogramo'] = function(diff) {
    const b=ri(3, diffCfg(diff,[10,15,20,30])), h=ri(2, diffCfg(diff,[10,12,15,25]));
    return {
      question:`Un paralelogramo tiene base \\(${b}\\) cm y altura \\(${h}\\) cm. ¿Cuál es su área?`,
      answer:String(b*h), type:'numeric',
      hint:`\\(A=b\\times h\\). La altura es perpendicular a la base (no el lado oblicuo).`,
      solution:`\\(A=${b}\\times${h}=${b*h}\\) cm²`,
      topic:'geo_area'
    };
  };

  G['geo_area_trapecio'] = function(diff) {
    const b1=ri(3, diffCfg(diff,[8,12,16,25])), b2=ri(3, diffCfg(diff,[8,12,16,25])), h=ri(2, diffCfg(diff,[8,10,12,20]));
    const area=(b1+b2)*h/2;
    return {
      question:`Un trapecio tiene bases \\(${b1}\\) y \\(${b2}\\) cm, y altura \\(${h}\\) cm. ¿Cuál es su área?`,
      answer:String(area), type:'numeric',
      hint:`\\(A=\\frac{(b_1+b_2)\\times h}{2}=\\frac{(${b1}+${b2})\\times${h}}{2}\\).`,
      solution:`\\(A=\\frac{${b1+b2}\\times${h}}{2}=\\frac{${(b1+b2)*h}}{2}=${area}\\) cm²`,
      topic:'geo_area',
      analyzeError:(ua)=>{if(parseFloat(ua)===(b1+b2)*h)return{feedback:'Olvidaste dividir por 2. Área trapecio = (b₁+b₂)×h / 2.'};return{feedback:`A = (${b1}+${b2})×${h}/2 = ${area} cm².`}}
    };
  };

  G['geo_area_problema'] = function(diff) {
    const l=ri(4, diffCfg(diff,[10,15,20,30])), w=ri(3, l-1);
    const tipo = pick(['habitacion','terreno','pintar']);
    const problemas = [
      { q:`Una habitación rectangular mide ${l} m × ${w} m. ¿Cuántos m² de piso hay que cubrir?`, a:l*w, unidad:'m²' },
      { q:`Un terreno triangular tiene base ${l} m y altura ${w} m. ¿Cuántos m² ocupa?`, a:l*w/2, unidad:'m²' },
      { q:`Una pared rectangular de ${l} m × ${w} m se pintará. ¿Cuántos m² de pintura se necesitan?`, a:l*w, unidad:'m²' }
    ];
    const p = pick(problemas);
    return {
      question:p.q, answer:String(p.a), type:'numeric',
      hint:`Identifica la figura y aplica la fórmula de área correcta.`,
      solution:`Área = ${p.a} ${p.unidad}`,
      topic:'geo_area'
    };
  };

  G['geo_area_lado_desde_area'] = function(diff) {
    const tipo = pick(['cuadrado','rectangulo']);
    const area=ri(4, diffCfg(diff,[100,225,400,900]));
    if(tipo==='cuadrado') {
      const l=Math.round(Math.sqrt(area));
      if(l*l!==area) return G['geo_area_lado_desde_area'](diff);
      return {
        question:`El área de un cuadrado es \\(${area}\\) cm². ¿Cuánto mide su lado?`,
        answer:String(l), type:'numeric',
        hint:`\\(A=l^2\\) → \\(l=\\sqrt{${area}}\\).`,
        solution:`\\(l=\\sqrt{${area}}=${l}\\) cm`,
        topic:'geo_area'
      };
    } else {
      const w=ri(2,8);
      if(area%w!==0) return G['geo_area_lado_desde_area'](diff);
      const l=area/w;
      return {
        question:`Un rectángulo tiene área \\(${area}\\) cm² y ancho \\(${w}\\) cm. ¿Cuánto mide el largo?`,
        answer:String(l), type:'numeric',
        hint:`\\(A=l\\times w\\) → \\(l=${area}/${w}\\).`,
        solution:`\\(l=${area}/${w}=${l}\\) cm`,
        topic:'geo_area'
      };
    }
  };

  MM_TOPIC_GENERATORS['geo_area'] = ['geo_area_cuadrado','geo_area_rectangulo','geo_area_triangulo','geo_area_paralelogramo','geo_area_trapecio','geo_area_problema','geo_area_lado_desde_area'];

  // ══════════════════════════════════════════════════════════════
  // 9. CIRCUNFERENCIA (longitud y arcos)
  // ══════════════════════════════════════════════════════════════
  G['geo_circ_longitud'] = function(diff) {
    const r=ri(1, diffCfg(diff,[8,12,15,25]));
    const C=r2(2*PI*r);
    return {
      question:`Una circunferencia tiene radio \\(${r}\\) cm. ¿Cuánto mide su longitud? (usa \\(\\pi\\approx3.14159\\), redondea a 2 decimales)`,
      answer:String(C), type:'numeric',
      hint:`\\(C=2\\pi r=2\\times\\pi\\times${r}\\).`,
      solution:`\\(C=2\\times3.14159\\times${r}\\approx${C}\\) cm`,
      topic:'geo_circunferencia',
      analyzeError:(ua)=>{if(r2(parseFloat(ua))===r2(PI*r))return{feedback:`Usaste C=πr, pero la fórmula completa es C=2πr. Multiplica por 2.`};return{feedback:`C = 2πr = 2×π×${r} ≈ ${C} cm.`}}
    };
  };

  G['geo_circ_radio_de_longitud'] = function(diff) {
    const r=ri(1, diffCfg(diff,[8,10,12,20]));
    const C=r2(2*PI*r);
    return {
      question:`Una circunferencia mide \\(${C}\\) cm de longitud. ¿Cuánto mide su radio? (Redondea a 2 decimales)`,
      answer:String(r), type:'numeric',
      hint:`\\(r=\\frac{C}{2\\pi}=\\frac{${C}}{2\\pi}\\).`,
      solution:`\\(r=\\frac{${C}}{2\\times3.14159}\\approx${r}\\) cm`,
      topic:'geo_circunferencia'
    };
  };

  G['geo_circ_arco'] = function(diff) {
    const r=ri(2, diffCfg(diff,[8,10,15,20]));
    const ang=pick([30,45,60,90,120,135,150,180,270]);
    const arc=r2(2*PI*r*ang/360);
    return {
      question:`¿Cuánto mide un arco de \\(${ang}°\\) en una circunferencia de radio \\(${r}\\) cm?`,
      answer:String(arc), type:'numeric',
      hint:`\\(\\text{Arco}=\\frac{\\theta}{360°}\\times 2\\pi r=\\frac{${ang}}{360}\\times2\\pi\\times${r}\\).`,
      solution:`\\(\\frac{${ang}}{360}\\times2\\pi\\times${r}\\approx${arc}\\) cm`,
      topic:'geo_circunferencia',
      analyzeError:(ua)=>{if(r2(parseFloat(ua))===r2(2*PI*r))return{feedback:`Calculaste la circunferencia completa. Multiplica por ${ang}/360 para el arco.`};return{feedback:`Arco = (θ/360)×2πr = (${ang}/360)×2π×${r} ≈ ${arc} cm.`}}
    };
  };

  G['geo_circ_angulo_central'] = function(diff) {
    const ang=pick([30,45,60,90,120,150,180]);
    const r=ri(3,10);
    const arc=r2(2*PI*r*ang/360);
    return {
      question:`En una circunferencia de radio \\(${r}\\) cm, un arco mide \\(${arc}\\) cm. ¿Cuánto mide el ángulo central?`,
      answer:String(ang), type:'numeric',
      hint:`\\(\\theta=\\frac{\\text{arco}}{2\\pi r}\\times360°=\\frac{${arc}}{2\\pi\\times${r}}\\times360°\\).`,
      solution:`\\(\\theta=\\frac{${arc}}{2\\pi\\times${r}}\\times360°\\approx${ang}°\\)`,
      topic:'geo_circunferencia'
    };
  };

  G['geo_circ_angulo_inscrito'] = function(diff) {
    const inscrito=ri(15,80);
    const central=2*inscrito;
    return {
      question:`Un ángulo inscrito en una circunferencia mide \\(${inscrito}°\\). ¿Cuánto mide el ángulo central que subtiende el mismo arco?`,
      answer:String(central), type:'numeric',
      hint:`El ángulo central es el doble del ángulo inscrito que subtiende el mismo arco.`,
      solution:`\\(\\theta_{central}=2\\times${inscrito}°=${central}°\\)`,
      topic:'geo_circunferencia',
      analyzeError:(ua)=>{if(parseFloat(ua)===inscrito/2)return{feedback:'Es al revés: el ángulo CENTRAL es el doble del inscrito.'};return{feedback:`Ángulo central = 2 × ángulo inscrito = 2×${inscrito}° = ${central}°.`}}
    };
  };

  MM_TOPIC_GENERATORS['geo_circunferencia'] = ['geo_circ_longitud','geo_circ_radio_de_longitud','geo_circ_arco','geo_circ_angulo_central','geo_circ_angulo_inscrito'];

  // ══════════════════════════════════════════════════════════════
  // 10. CÍRCULO (área y sectores)
  // ══════════════════════════════════════════════════════════════
  G['geo_cir_area'] = function(diff) {
    const r=ri(1, diffCfg(diff,[8,12,15,25]));
    const A=r2(PI*r*r);
    return {
      question:`Un círculo tiene radio \\(${r}\\) cm. ¿Cuál es su área? (Redondea a 2 decimales)`,
      answer:String(A), type:'numeric',
      hint:`\\(A=\\pi r^2=\\pi\\times${r}^2=\\pi\\times${r*r}\\).`,
      solution:`\\(A=\\pi\\times${r*r}\\approx${A}\\) cm²`,
      topic:'geo_circulo',
      analyzeError:(ua)=>{if(r2(parseFloat(ua))===r2(2*PI*r))return{feedback:`Calculaste la circunferencia (2πr), no el área. El área es πr².`};if(r2(parseFloat(ua))===r2(PI*r))return{feedback:`Usaste πr en lugar de πr². Recuerda: área = π×r×r = π×${r*r}.`};return{feedback:`A = πr² = π×${r*r} ≈ ${A} cm².`}}
    };
  };

  G['geo_cir_diametro'] = function(diff) {
    const d=ri(2, diffCfg(diff,[14,20,26,40]))*2;
    const r=d/2;
    const tipo=pick(['area','circunferencia']);
    const ans=tipo==='area'?r2(PI*r*r):r2(PI*d);
    return {
      question:`Un círculo tiene diámetro \\(${d}\\) cm. ¿Cuál es su ${tipo==='area'?'área':'circunferencia'}? (Redondea a 2 decimales)`,
      answer:String(ans), type:'numeric',
      hint:`Radio = diámetro/2 = ${r}. ${tipo==='area'?'Área = πr²':'Circunferencia = πd = 2πr'}.`,
      solution:tipo==='area'?`\\(A=\\pi\\times${r}^2=\\pi\\times${r*r}\\approx${ans}\\) cm²`:`\\(C=\\pi\\times${d}\\approx${ans}\\) cm`,
      topic:'geo_circulo',
      analyzeError:(ua)=>{if(tipo==='area'&&r2(parseFloat(ua))===r2(PI*d*d))return{feedback:`Usaste πd² en vez de πr². El radio es la mitad del diámetro: r=${r}.`};return{feedback:`Primero halla el radio: r = ${d}/2 = ${r}.`}}
    };
  };

  G['geo_cir_sector'] = function(diff) {
    const r=ri(2, diffCfg(diff,[8,10,12,18]));
    const ang=pick([30,45,60,90,120,180]);
    const As=r2(PI*r*r*ang/360);
    return {
      question:`¿Cuál es el área del sector circular de radio \\(${r}\\) cm y ángulo central \\(${ang}°\\)? (Redondea a 2 decimales)`,
      answer:String(As), type:'numeric',
      hint:`\\(A_{sector}=\\frac{\\theta}{360°}\\times\\pi r^2=\\frac{${ang}}{360}\\times\\pi\\times${r*r}\\).`,
      solution:`\\(\\frac{${ang}}{360}\\times\\pi\\times${r*r}\\approx${As}\\) cm²`,
      topic:'geo_circulo',
      analyzeError:(ua)=>{if(r2(parseFloat(ua))===r2(PI*r*r))return{feedback:`Eso es el área completa del círculo. Para el sector multiplica por ${ang}/360.`};return{feedback:`A_sector = (θ/360)×πr² = (${ang}/360)×π×${r*r} ≈ ${As} cm².`}}
    };
  };

  G['geo_cir_radio_desde_area'] = function(diff) {
    const r=ri(2, diffCfg(diff,[8,10,12,16]));
    const A=r2(PI*r*r);
    return {
      question:`El área de un círculo es \\(${A}\\) cm². ¿Cuánto mide el radio? (Redondea a 2 decimales)`,
      answer:String(r), type:'numeric',
      hint:`\\(r=\\sqrt{\\frac{A}{\\pi}}=\\sqrt{\\frac{${A}}{\\pi}}\\).`,
      solution:`\\(r=\\sqrt{${A}/\\pi}\\approx${r}\\) cm`,
      topic:'geo_circulo'
    };
  };

  G['geo_cir_anillo'] = function(diff) {
    const r1=ri(2, diffCfg(diff,[5,6,8,10])), r2_=r1+ri(1, diffCfg(diff,[3,5,7,10]));
    const A=r2(PI*(r2_*r2_-r1*r1));
    return {
      question:`Una anilla tiene radio exterior \\(${r2_}\\) cm y radio interior \\(${r1}\\) cm. ¿Cuál es su área? (Redondea a 2 decimales)`,
      answer:String(A), type:'numeric',
      hint:`\\(A=\\pi(R^2-r^2)=\\pi(${r2_*r2_}-${r1*r1})\\).`,
      solution:`\\(A=\\pi\\times${r2_*r2_-r1*r1}\\approx${A}\\) cm²`,
      topic:'geo_circulo'
    };
  };

  MM_TOPIC_GENERATORS['geo_circulo'] = ['geo_cir_area','geo_cir_diametro','geo_cir_sector','geo_cir_radio_desde_area','geo_cir_anillo'];

  // ══════════════════════════════════════════════════════════════
  // 11. SÓLIDOS
  // ══════════════════════════════════════════════════════════════
  G['geo_sol_euler'] = function(diff) {
    // Euler: V - E + F = 2
    const solidos = [
      { nom:'Cubo', V:8, E:12, F:6 },
      { nom:'Tetraedro', V:4, E:6, F:4 },
      { nom:'Octaedro', V:6, E:12, F:8 },
      { nom:'Prisma triangular', V:6, E:9, F:5 },
      { nom:'Pirámide cuadrada', V:5, E:8, F:5 },
      { nom:'Prisma pentagonal', V:10, E:15, F:7 }
    ];
    const s = pick(diffCfg(diff,[solidos.slice(0,3),solidos.slice(0,4),solidos,solidos]));
    const dato = pick(['F','V','E']);
    const [q, ans] = dato==='F'?[`Vértices=${s.V}, Aristas=${s.E}`,String(s.F)]:dato==='V'?[`Aristas=${s.E}, Caras=${s.F}`,String(s.V)]:[`Vértices=${s.V}, Caras=${s.F}`,String(s.E)];
    return {
      question:`Usando la fórmula de Euler (\\(V-A+C=2\\)), en un ${s.nom} con ${q}. ¿Cuántos ${dato==='F'?'caras':dato==='V'?'vértices':'aristas'} tiene?`,
      answer:ans, type:'numeric',
      hint:`Fórmula de Euler: \\(V-A+C=2\\). Sustituye los valores conocidos y despeja.`,
      solution:`\\(${s.V}-${s.E}+${s.F}=${s.V-s.E+s.F}=2\\) ✓`,
      topic:'geo_solidos',
      analyzeError:()=>({feedback:'Euler: V (vértices) − A (aristas) + C (caras) = 2 para todo poliedro convexo.'})
    };
  };

  G['geo_sol_caras'] = function(diff) {
    const solidos = [
      { nom:'Cubo', V:8, A:12, C:6, tipo:'cubo' },
      { nom:'Pirámide triangular (tetraedro)', V:4, A:6, C:4, tipo:'piramide_tri' },
      { nom:'Pirámide cuadrada', V:5, A:8, C:5, tipo:'piramide_cuad' },
      { nom:'Prisma triangular', V:6, A:9, C:5, tipo:'prisma_tri' },
      { nom:'Prisma rectangular', V:8, A:12, C:6, tipo:'prisma_rect' }
    ];
    const s = pick(solidos);
    const dato = pick(['C','V','A']);
    return {
      question:`¿Cuántos ${dato==='C'?'caras':dato==='V'?'vértices':'aristas'} tiene un ${s.nom}?`,
      answer:String(dato==='C'?s.C:dato==='V'?s.V:s.A), type:'numeric',
      hint:`Dibuja o visualiza el sólido e identifica cada ${dato==='C'?'cara':dato==='V'?'vértice':'arista'}.`,
      solution:`Un ${s.nom} tiene ${s.V} vértices, ${s.A} aristas y ${s.C} caras.`,
      topic:'geo_solidos'
    };
  };

  G['geo_sol_area_cubo'] = function(diff) {
    const l=ri(2, diffCfg(diff,[8,12,15,20]));
    const A=6*l*l;
    return {
      question:`Un cubo tiene arista \\(${l}\\) cm. ¿Cuál es su área total?`,
      answer:String(A), type:'numeric',
      hint:`El cubo tiene 6 caras cuadradas iguales: \\(A=6l^2=6\\times${l}^2\\).`,
      solution:`\\(A=6\\times${l*l}=${A}\\) cm²`,
      topic:'geo_solidos',
      analyzeError:(ua)=>{if(parseFloat(ua)===l*l*l)return{feedback:'Eso es el VOLUMEN (l³). El área total del cubo es 6×l².'};return{feedback:`A = 6l² = 6×${l*l} = ${A} cm².`}}
    };
  };

  G['geo_sol_area_cilindro'] = function(diff) {
    const r=ri(2, diffCfg(diff,[6,8,10,15])), h=ri(3, diffCfg(diff,[10,15,20,30]));
    const A=r2(2*PI*r*(r+h));
    return {
      question:`Un cilindro tiene radio \\(${r}\\) cm y altura \\(${h}\\) cm. ¿Cuál es su área total? (Redondea a 2 decimales)`,
      answer:String(A), type:'numeric',
      hint:`\\(A=2\\pi r(r+h)=2\\pi\\times${r}\\times(${r}+${h})\\).`,
      solution:`\\(A=2\\pi\\times${r}\\times${r+h}\\approx${A}\\) cm²`,
      topic:'geo_solidos'
    };
  };

  G['geo_sol_identificar'] = function(diff) {
    const casos = [
      {desc:'tiene 6 caras rectangulares, 8 vértices y 12 aristas', nom:'Prisma rectangular (o cubo)', idx:0},
      {desc:'tiene 1 base circular y va terminando en punta', nom:'Cono', idx:1},
      {desc:'tiene 2 bases circulares paralelas y una superficie lateral curva', nom:'Cilindro', idx:2},
      {desc:'tiene 1 base cuadrada y 4 caras triangulares que se unen en un punto', nom:'Pirámide cuadrada', idx:3}
    ];
    const c = pick(casos);
    const opts = casos.map(x=>x.nom);
    return {
      question:`¿Qué sólido geométrico ${c.desc}?`,
      answer:String(c.idx), type:'multiple-choice', options:opts,
      hint:'Visualiza la figura: ¿tiene bases circulares? ¿Termina en punta? ¿Sus caras son planas?',
      solution:`Descripción correcta: ${c.nom}.`,
      topic:'geo_solidos'
    };
  };

  MM_TOPIC_GENERATORS['geo_solidos'] = ['geo_sol_euler','geo_sol_caras','geo_sol_area_cubo','geo_sol_area_cilindro','geo_sol_identificar'];

  // ══════════════════════════════════════════════════════════════
  // 12. VOLUMEN
  // ══════════════════════════════════════════════════════════════
  G['geo_vol_prisma_rect'] = function(diff) {
    const l=ri(2, diffCfg(diff,[8,12,15,20])), w=ri(2, diffCfg(diff,[8,12,15,20])), h=ri(2, diffCfg(diff,[8,12,15,20]));
    return {
      question:`Un prisma rectangular mide \\(${l}\\times${w}\\times${h}\\) cm. ¿Cuál es su volumen?`,
      answer:String(l*w*h), type:'numeric',
      hint:`\\(V=l\\times w\\times h=${l}\\times${w}\\times${h}\\).`,
      solution:`\\(V=${l}\\times${w}\\times${h}=${l*w*h}\\) cm³`,
      topic:'geo_volumen',
      analyzeError:(ua)=>{if(parseFloat(ua)===2*(l*w+l*h+w*h))return{feedback:'Eso es el área total. El volumen es l×w×h.'};return{feedback:`V = l×w×h = ${l}×${w}×${h} = ${l*w*h} cm³.`}}
    };
  };

  G['geo_vol_cubo'] = function(diff) {
    const l=ri(2, diffCfg(diff,[8,10,12,15]));
    return {
      question:`Un cubo tiene arista \\(${l}\\) cm. ¿Cuál es su volumen?`,
      answer:String(l*l*l), type:'numeric',
      hint:`\\(V=l^3=${l}^3\\).`,
      solution:`\\(V=${l}^3=${l*l*l}\\) cm³`,
      topic:'geo_volumen'
    };
  };

  G['geo_vol_cilindro'] = function(diff) {
    const r=ri(2, diffCfg(diff,[6,8,10,15])), h=ri(3, diffCfg(diff,[10,15,20,30]));
    const V=r2(PI*r*r*h);
    return {
      question:`Un cilindro tiene radio \\(${r}\\) cm y altura \\(${h}\\) cm. ¿Cuál es su volumen? (Redondea a 2 decimales)`,
      answer:String(V), type:'numeric',
      hint:`\\(V=\\pi r^2 h=\\pi\\times${r*r}\\times${h}\\).`,
      solution:`\\(V=\\pi\\times${r*r}\\times${h}\\approx${V}\\) cm³`,
      topic:'geo_volumen',
      analyzeError:(ua)=>{if(r2(parseFloat(ua))===r2(2*PI*r*h))return{feedback:'Usaste 2πrh (área lateral), no el volumen. V = πr²h.'};return{feedback:`V = πr²h = π×${r*r}×${h} ≈ ${V} cm³.`}}
    };
  };

  G['geo_vol_piramide'] = function(diff) {
    const b=ri(3, diffCfg(diff,[8,10,12,16])), h=ri(3, diffCfg(diff,[8,10,12,16]));
    const V=r2(b*b*h/3);
    return {
      question:`Una pirámide de base cuadrada tiene base \\(${b}\\) cm y altura \\(${h}\\) cm. ¿Cuál es su volumen?`,
      answer:String(V), type:'numeric',
      hint:`\\(V=\\frac{1}{3}B\\times h=\\frac{1}{3}\\times${b}^2\\times${h}\\).`,
      solution:`\\(V=\\frac{1}{3}\\times${b*b}\\times${h}=\\frac{${b*b*h}}{3}=${V}\\) cm³`,
      topic:'geo_volumen',
      analyzeError:(ua)=>{if(parseFloat(ua)===b*b*h)return{feedback:'Olvidaste dividir por 3. El volumen de la pirámide es (1/3)×B×h.'};return{feedback:`V = (1/3)×B×h = (1/3)×${b*b}×${h} = ${V} cm³.`}}
    };
  };

  G['geo_vol_cono'] = function(diff) {
    const r=ri(2, diffCfg(diff,[6,8,10,14])), h=ri(3, diffCfg(diff,[10,12,15,20]));
    const V=r2(PI*r*r*h/3);
    return {
      question:`Un cono tiene radio \\(${r}\\) cm y altura \\(${h}\\) cm. ¿Cuál es su volumen? (Redondea a 2 decimales)`,
      answer:String(V), type:'numeric',
      hint:`\\(V=\\frac{1}{3}\\pi r^2 h=\\frac{1}{3}\\times\\pi\\times${r*r}\\times${h}\\).`,
      solution:`\\(V=\\frac{\\pi\\times${r*r}\\times${h}}{3}\\approx${V}\\) cm³`,
      topic:'geo_volumen',
      analyzeError:(ua)=>{if(r2(parseFloat(ua))===r2(PI*r*r*h))return{feedback:'Olvidaste dividir por 3. El cono es (1/3) del cilindro equivalente.'};return{feedback:`V = πr²h/3 = π×${r*r}×${h}/3 ≈ ${V} cm³.`}}
    };
  };

  G['geo_vol_esfera'] = function(diff) {
    const r=ri(2, diffCfg(diff,[6,8,10,14]));
    const V=r2(4/3*PI*r*r*r);
    return {
      question:`Una esfera tiene radio \\(${r}\\) cm. ¿Cuál es su volumen? (Redondea a 2 decimales)`,
      answer:String(V), type:'numeric',
      hint:`\\(V=\\frac{4}{3}\\pi r^3=\\frac{4}{3}\\times\\pi\\times${r}^3\\).`,
      solution:`\\(V=\\frac{4}{3}\\times\\pi\\times${r*r*r}\\approx${V}\\) cm³`,
      topic:'geo_volumen',
      analyzeError:()=>({feedback:`Fórmula de la esfera: V = (4/3)πr³ ≈ 4.189×${r}³.`})
    };
  };

  MM_TOPIC_GENERATORS['geo_volumen'] = ['geo_vol_prisma_rect','geo_vol_cubo','geo_vol_cilindro','geo_vol_piramide','geo_vol_cono','geo_vol_esfera'];

  // ══════════════════════════════════════════════════════════════
  // 13. GEOMETRÍA ANALÍTICA
  // ══════════════════════════════════════════════════════════════
  G['geo_ana_distancia'] = function(diff) {
    const x1=ri(-diffCfg(diff,[4,6,8,12]),diffCfg(diff,[4,6,8,12]));
    const y1=ri(-diffCfg(diff,[4,6,8,12]),diffCfg(diff,[4,6,8,12]));
    const x2=ri(-diffCfg(diff,[4,6,8,12]),diffCfg(diff,[4,6,8,12]));
    const y2=ri(-diffCfg(diff,[4,6,8,12]),diffCfg(diff,[4,6,8,12]));
    const dx=x2-x1, dy=y2-y1;
    const d=r2(Math.sqrt(dx*dx+dy*dy));
    return {
      question:`¿Cuál es la distancia entre \\(A(${x1},${y1})\\) y \\(B(${x2},${y2})\\)? (Redondea a 2 decimales)`,
      answer:String(d), type:'numeric',
      hint:`\\(d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}=\\sqrt{${dx*dx}+${dy*dy}}\\).`,
      solution:`\\(d=\\sqrt{(${x2}-${x1})^2+(${y2}-${y1})^2}=\\sqrt{${dx*dx+dy*dy}}\\approx${d}\\)`,
      solutionSteps:[`\\(\\Delta x=${dx},\\; \\Delta y=${dy}\\)`,`\\(d=\\sqrt{${dx*dx}+${dy*dy}}=\\sqrt{${dx*dx+dy*dy}}\\approx${d}\\)`],
      topic:'geo_analitica',
      analyzeError:(ua)=>{if(r2(parseFloat(ua))===r2(Math.abs(dx)+Math.abs(dy)))return{feedback:'No sumes las diferencias directamente. Usa la fórmula: d = √((Δx)²+(Δy)²).'};return{feedback:`Δx=${dx}, Δy=${dy}. d = √(${dx*dx}+${dy*dy}) ≈ ${d}.`}}
    };
  };

  G['geo_ana_punto_medio'] = function(diff) {
    const x1=ri(-8,8), y1=ri(-8,8), x2=ri(-8,8), y2=ri(-8,8);
    const mx=r2((x1+x2)/2), my=r2((y1+y2)/2);
    const dato=pick(['x','y']);
    return {
      question:`¿Cuál es la coordenada ${dato==='x'?'x':'y'} del punto medio entre \\((${x1},${y1})\\) y \\((${x2},${y2})\\)?`,
      answer:String(dato==='x'?mx:my), type:'numeric',
      hint:`Punto medio: \\(M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)\\).`,
      solution:`\\(M=\\left(\\frac{${x1}+${x2}}{2},\\frac{${y1}+${y2}}{2}\\right)=(${mx},${my})\\)`,
      topic:'geo_analitica',
      analyzeError:()=>({feedback:'Punto medio = promedio de las coordenadas: Mx=(x₁+x₂)/2, My=(y₁+y₂)/2.'})
    };
  };

  G['geo_ana_pendiente'] = function(diff) {
    const x1=ri(-5,5), y1=ri(-5,5);
    let dx=ri(-4,4)||1, dy=ri(-4,4)||1;
    const x2=x1+dx, y2=y1+dy;
    if(dx===0) return G['geo_ana_pendiente'](diff);
    const m=r2(dy/dx);
    return {
      question:`¿Cuál es la pendiente de la recta que pasa por \\((${x1},${y1})\\) y \\((${x2},${y2})\\)?`,
      answer:String(m), type:'numeric',
      hint:`\\(m=\\frac{y_2-y_1}{x_2-x_1}=\\frac{${dy}}{${dx}}\\).`,
      solution:`\\(m=\\frac{${y2}-${y1}}{${x2}-${x1}}=\\frac{${dy}}{${dx}}=${m}\\)`,
      topic:'geo_analitica',
      analyzeError:(ua)=>{if(r2(parseFloat(ua))===r2(dx/dy))return{feedback:'Invertiste el cociente. Pendiente = Δy/Δx = (y₂−y₁)/(x₂−x₁).'};return{feedback:`m = (y₂−y₁)/(x₂−x₁) = ${dy}/${dx} = ${m}.`}}
    };
  };

  G['geo_ana_ecuacion_recta'] = function(diff) {
    const m=ri(-3,3)||1;
    const b=ri(-6,6);
    const x=ri(-5,5);
    const y=m*x+b;
    const tipo=pick(['punto','corte_y']);
    if(tipo==='punto') {
      return {
        question:`Una recta tiene pendiente \\(${m}\\) y pasa por \\((${x},${y})\\). ¿Cuál es la ordenada al origen (valor b en y=mx+b)?`,
        answer:String(b), type:'numeric',
        hint:`Usa \\(y=mx+b\\) → \\(${y}=${m}\\times${x}+b\\) → despeja b.`,
        solution:`\\(b=${y}-${m}\\times${x}=${y-m*x}=${b}\\)`,
        topic:'geo_analitica'
      };
    } else {
      return {
        question:`Una recta tiene ecuación \\(y=${m}x${b>=0?'+':''}${b}\\). ¿Cuánto vale \\(y\\) cuando \\(x=${x}\\)?`,
        answer:String(y), type:'numeric',
        hint:`Sustituye x=${x}: \\(y=${m}(${x})${b>=0?'+':''}${b}=${m*x}${b>=0?'+':''}${b}\\).`,
        solution:`\\(y=${m*x}${b>=0?'+':''}${b}=${y}\\)`,
        topic:'geo_analitica'
      };
    }
  };

  G['geo_ana_paralelas_perp'] = function(diff) {
    const m=ri(-3,3)||1;
    const tipo=pick(['paralela','perpendicular']);
    const mAns=tipo==='paralela'?m:-1/m;
    const opts=tipo==='paralela'?
      [String(m),String(-m),String(-1/m),String(1/m)]:
      [String(r2(-1/m)),String(r2(1/m)),String(m),String(-m)];
    const idx=0;
    return {
      question:`Una recta tiene pendiente \\(${m}\\). ¿Qué pendiente tiene una recta ${tipo==='paralela'?'paralela':'perpendicular'} a ella?`,
      answer:String(idx), type:'multiple-choice', options:opts.map(o=>`\\(m=${o}\\)`),
      hint:tipo==='paralela'?'Rectas paralelas tienen la misma pendiente.':'Rectas perpendiculares: sus pendientes son inversas con signo contrario (\\(m_1\\times m_2=-1\\)).',
      solution:tipo==='paralela'?`Paralela → misma pendiente = \\(${m}\\).`:`Perpendicular: \\(m_\\perp=-\\frac{1}{${m}}=${r2(-1/m)}\\).`,
      topic:'geo_analitica',
      analyzeError:()=>({feedback:tipo==='paralela'?'Paralelas = misma pendiente.':'Perpendiculares: m₁×m₂=−1. Despeja m₂=−1/m₁.'})
    };
  };

  G['geo_ana_colineal'] = function(diff) {
    const x1=ri(-4,4), y1=ri(-4,4), m=ri(-3,3)||1, b=ri(-4,4);
    const x2=x1+ri(1,3); const y2=m*x2+b;
    const x3=x1+ri(4,6);
    const [y3, colineal] = pick([[m*x3+b,true],[m*x3+b+ri(1,3),false]]);
    return {
      question:`¿Son colineales los puntos \\(A(${x1},${m*x1+b})\\), \\(B(${x2},${y2})\\) y \\(C(${x3},${y3})\\)?`,
      answer:colineal?'0':'1', type:'multiple-choice', options:['Sí, son colineales','No, no son colineales'],
      hint:`Calcula las pendientes AB y BC. Si son iguales, los puntos son colineales.`,
      solution:colineal?'Las pendientes AB y BC son iguales → colineales.':'Las pendientes AB y BC son diferentes → no colineales.',
      topic:'geo_analitica'
    };
  };

  MM_TOPIC_GENERATORS['geo_analitica'] = ['geo_ana_distancia','geo_ana_punto_medio','geo_ana_pendiente','geo_ana_ecuacion_recta','geo_ana_paralelas_perp','geo_ana_colineal'];

  console.log('[MM] generators-geometria.js cargado: 13 tópicos OK');
})();
