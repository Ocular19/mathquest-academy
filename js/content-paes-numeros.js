/* content-paes-numeros.js
   6 lecciones PAES — Eje Números
   Temarios: Números · Fracciones · Razones · Porcentajes · Potencias · Raíces
*/
(function(){
'use strict';

if(!window.MM_LESSONS) window.MM_LESSONS=[];
if(!window.MM_LESSON_MAP) window.MM_LESSON_MAP={};
if(!window.MM_GEO_VIS) window.MM_GEO_VIS={};

/* ── visual compartida: tarjeta de referencia PAES ── */
window.MM_GEO_VIS['paes-numeros-ref']=function(container){
  container.innerHTML='';
  var temas=[
    {titulo:'Valor Absoluto',regla:'|a| = a si a≥0; |a| = −a si a<0',ej:'|−7| = 7'},
    {titulo:'Fracciones — División',regla:'a/b ÷ c/d = a/b × d/c',ej:'2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6'},
    {titulo:'Proporción Directa',regla:'a/b = c/x → x = b×c/a',ej:'3/9 = 5/x → x = 15'},
    {titulo:'Porcentaje',regla:'p% de N = N × p/100',ej:'30% de 200 = 60'},
    {titulo:'Aumento/Descuento',regla:'nuevo = orig × (1±p/100)',ej:'+20%: ×1,2; −15%: ×0,85'},
    {titulo:'Potencias — Leyes',regla:'a^m×a^n=a^(m+n); (a^m)^n=a^(mn); a^0=1',ej:'2³×2²=2⁵=32'},
    {titulo:'Raíz Cuadrada',regla:'√(ab)=√a×√b; √(a/b)=√a/√b',ej:'√72=√(36×2)=6√2'},
    {titulo:'Racionalización',regla:'1/√a = √a/a',ej:'1/√5 = √5/5'},
  ];
  var d=document.createElement('div');
  d.style.cssText='display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;padding:8px;';
  temas.forEach(function(t){
    var card=document.createElement('div');
    card.style.cssText='background:var(--bg-card,#f9fafb);border-left:3px solid #7C3AED;border-radius:8px;padding:10px 12px;';
    card.innerHTML='<div style="font-weight:700;color:#7C3AED;font-size:12px;margin-bottom:4px;">'+t.titulo+'</div>'
      +'<div style="font-size:12px;color:#374151;margin-bottom:3px;">'+t.regla+'</div>'
      +'<div style="font-size:11px;color:#6b7280;font-style:italic;">Ej: '+t.ej+'</div>';
    d.appendChild(card);
  });
  container.appendChild(d);
};

window.MM_GEO_VIS['paes-fracciones-ref']=function(container){
  container.innerHTML='';
  var steps=[
    ['Suma/Resta','MCM(b,d) → amplicar → operar numeradores'],
    ['Multiplicación','(a×c)/(b×d) y simplificar'],
    ['División','a/b ÷ c/d = a/b × d/c (invertir y multiplicar)'],
    ['Simplificación','÷ MCD(num,den)'],
    ['Fracción de N','N × (a/b)'],
    ['Comparar','Convertir a decimales o usar denominador común'],
  ];
  var d=document.createElement('div');d.style.cssText='padding:10px;';
  var title=document.createElement('h4');title.textContent='Estrategia PAES — Fracciones';
  title.style.cssText='color:#7C3AED;margin-bottom:10px;font-size:14px;';
  d.appendChild(title);
  steps.forEach(function(s){
    var row=document.createElement('div');
    row.style.cssText='display:flex;gap:12px;align-items:flex-start;margin-bottom:8px;padding:8px;background:var(--bg-card,#f9fafb);border-radius:6px;';
    row.innerHTML='<span style="min-width:120px;font-weight:600;color:#4F46E5;font-size:12px;">'+s[0]+'</span>'
      +'<span style="font-size:12px;color:#374151;">'+s[1]+'</span>';
    d.appendChild(row);
  });
  container.appendChild(d);
};

window.MM_GEO_VIS['paes-porcentajes-ref']=function(container){
  container.innerHTML='';
  var W=480,H=200;
  var cvs=document.createElement('canvas');cvs.width=W;cvs.height=H;
  cvs.style.cssText='display:block;max-width:100%;border-radius:8px;background:#f9fafb;';
  var ctx=cvs.getContext('2d');
  var ops=[
    {op:'X% de N',f:'N × X/100',ej:'25% de 400 = 100',y:40,c:'#4F46E5'},
    {op:'Aumento X%',f:'N × (1+X/100)',ej:'$500 +20% = $600',y:80,c:'#10B981'},
    {op:'Descuento X%',f:'N × (1−X/100)',ej:'$500 −20% = $400',y:120,c:'#EC4899'},
    {op:'Precio original',f:'Final ÷ (1±X/100)',ej:'$400 ÷ 0,8 = $500',y:160,c:'#F59E0B'},
  ];
  ctx.font='bold 13px Inter,sans-serif';ctx.fillStyle='#374151';
  ctx.fillText('Fórmulas de Porcentaje — PAES',12,20);
  ops.forEach(function(o){
    ctx.fillStyle=o.c;ctx.font='bold 11px Inter,sans-serif';ctx.fillText(o.op,12,o.y);
    ctx.fillStyle='#374151';ctx.font='11px Inter,sans-serif';ctx.fillText(o.f,140,o.y);
    ctx.fillStyle='#6b7280';ctx.font='italic 10px Inter,sans-serif';ctx.fillText(o.ej,290,o.y);
    ctx.strokeStyle='#e5e7eb';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(12,o.y+8);ctx.lineTo(W-12,o.y+8);ctx.stroke();
  });
  container.appendChild(cvs);
};

window.MM_GEO_VIS['paes-potencias-ref']=function(container){
  container.innerHTML='';
  var leyes=[
    ['a^m × a^n = a^(m+n)','Producto — SUMA exponentes','2³×2⁴ = 2⁷ = 128'],
    ['a^m ÷ a^n = a^(m-n)','Cociente — RESTA exponentes','5⁶÷5² = 5⁴ = 625'],
    ['(a^m)^n = a^(m×n)','Potencia de potencia — MULTIPLICA','(3²)³ = 3⁶ = 729'],
    ['a^0 = 1','Exponente cero','7⁰ = 1'],
    ['a^(−n) = 1/a^n','Exponente negativo','2⁻³ = 1/8'],
    ['a^(1/n) = ⁿ√a','Exponente fraccionario','9^(1/2) = √9 = 3'],
  ];
  var d=document.createElement('div');d.style.cssText='padding:10px;';
  leyes.forEach(function(l,i){
    var row=document.createElement('div');
    row.style.cssText='display:grid;grid-template-columns:180px 1fr 120px;gap:8px;padding:8px;border-radius:6px;margin-bottom:6px;background:'+(i%2?'var(--bg-card,#f9fafb)':'white')+';';
    row.innerHTML='<span style="font-family:monospace;font-weight:700;color:#7C3AED;font-size:12px;">'+l[0]+'</span>'
      +'<span style="font-size:11px;color:#374151;">'+l[1]+'</span>'
      +'<span style="font-size:11px;color:#6b7280;">'+l[2]+'</span>';
    d.appendChild(row);
  });
  container.appendChild(d);
};

window.MM_GEO_VIS['paes-raices-ref']=function(container){
  container.innerHTML='';
  var props=[
    ['√(a×b) = √a × √b','√12 = √(4×3) = 2√3'],
    ['√(a/b) = √a / √b','√(9/25) = 3/5'],
    ['√a × √a = a','√7 × √7 = 7'],
    ['(√a)² = a','(√5)² = 5'],
    ['1/√a = √a/a','1/√3 = √3/3'],
    ['√(a²) = |a|','√((-4)²) = 4'],
  ];
  var cuadrados=[1,4,9,16,25,36,49,64,81,100,121,144,169,196,225];
  var d=document.createElement('div');d.style.cssText='padding:10px;';
  var t1=document.createElement('h4');t1.textContent='Propiedades de Raíces';t1.style.cssText='color:#7C3AED;font-size:13px;margin-bottom:8px;';
  d.appendChild(t1);
  props.forEach(function(p){
    var row=document.createElement('div');
    row.style.cssText='display:flex;gap:16px;padding:6px 8px;border-bottom:1px solid #f3f4f6;';
    row.innerHTML='<span style="min-width:160px;font-family:monospace;font-weight:600;color:#4F46E5;font-size:12px;">'+p[0]+'</span>'
      +'<span style="font-size:12px;color:#6b7280;">'+p[1]+'</span>';
    d.appendChild(row);
  });
  var t2=document.createElement('h4');t2.textContent='Cuadrados perfectos hasta 225';t2.style.cssText='color:#7C3AED;font-size:13px;margin:10px 0 6px;';
  d.appendChild(t2);
  var row2=document.createElement('div');row2.style.cssText='display:flex;flex-wrap:wrap;gap:4px;';
  cuadrados.forEach(function(c){
    var chip=document.createElement('span');
    chip.textContent=c;chip.style.cssText='padding:2px 8px;background:#EDE9FE;color:#7C3AED;border-radius:4px;font-size:12px;font-weight:600;';
    row2.appendChild(chip);
  });
  d.appendChild(row2);
  container.appendChild(d);
};

window.MM_GEO_VIS['paes-razones-ref']=function(container){
  container.innerHTML='';
  var tipos=[
    {nombre:'Proporción Directa',formula:'a/b = c/x → x = b·c/a',when:'Más de uno → más del otro',color:'#10B981'},
    {nombre:'Proporción Inversa',formula:'a·b = c·x → x = a·b/c',when:'Más de uno → menos del otro',color:'#EC4899'},
    {nombre:'Reparto',formula:'Parte = Total × razón_propia / suma_razones',when:'Repartir en razón a:b',color:'#4F46E5'},
    {nombre:'Escala',formula:'real = medida_plano × factor_escala',when:'Mapas, planos, maquetas',color:'#F59E0B'},
    {nombre:'Trabajo conjunto',formula:'1/t = 1/tA + 1/tB',when:'Dos personas/máquinas juntas',color:'#7C3AED'},
  ];
  var d=document.createElement('div');d.style.cssText='padding:10px;display:grid;gap:8px;';
  tipos.forEach(function(t){
    var card=document.createElement('div');
    card.style.cssText='padding:10px 12px;border-left:3px solid '+t.color+';background:var(--bg-card,#f9fafb);border-radius:8px;';
    card.innerHTML='<div style="font-weight:700;color:'+t.color+';font-size:12px;">'+t.nombre+'</div>'
      +'<div style="font-family:monospace;font-size:12px;color:#374151;margin:2px 0;">'+t.formula+'</div>'
      +'<div style="font-size:11px;color:#6b7280;">'+t.when+'</div>';
    d.appendChild(card);
  });
  container.appendChild(d);
};

/* ══════════════════════════════════════════════════════
   LECCIÓN 1 — NÚMEROS Y OPERACIONES
══════════════════════════════════════════════════════ */
var lesson_numeros={
  id:'paes-numeros',subject:'paes',unit:'paes_n_u1',
  title:'Números y Operaciones — PAES',
  visual:{type:'paes-numeros-ref'},
  concept:`
<h3>Conjuntos Numéricos</h3>
<p>La PAES evalúa tu comprensión del sistema numérico:</p>
<ul>
  <li><strong>ℕ (Naturales):</strong> 0, 1, 2, 3, … (para contar)</li>
  <li><strong>ℤ (Enteros):</strong> …, −3, −2, −1, 0, 1, 2, 3, … (incluye negativos)</li>
  <li><strong>ℚ (Racionales):</strong> cualquier número expresable como p/q con q ≠ 0. Incluyen decimales finitos y periódicos.</li>
  <li><strong>𝕀 (Irracionales):</strong> no se pueden escribir como fracción: π, √2, √3, e, √5…</li>
</ul>
<h3>Valor Absoluto</h3>
<p>|a| es la distancia de a al origen: siempre es ≥ 0.</p>
<p>|a| = a si a ≥ 0 &nbsp; | &nbsp; |a| = −a si a &lt; 0</p>
<p><em>Error frecuente:</em> confundir |−5| = 5 con −|5| = −5 (opuesto del absoluto)</p>
<h3>Regla de Signos</h3>
<table style="border-collapse:collapse;font-size:13px;width:100%;">
<tr style="background:#EDE9FE;"><th style="padding:4px 8px;">Operación</th><th>Signos iguales</th><th>Signos distintos</th></tr>
<tr><td style="padding:4px 8px;"><strong>× y ÷</strong></td><td style="color:#10B981;">Positivo (+)</td><td style="color:#EF4444;">Negativo (−)</td></tr>
<tr style="background:#f9fafb;"><td style="padding:4px 8px;"><strong>+</strong></td><td>Suma valores absolutos</td><td>Resta; signo del mayor</td></tr>
</table>
<h3>Orden de Operaciones (PAPOM)</h3>
<p><strong>P</strong>aréntesis → <strong>A</strong>cumulado (potencias) → <strong>P</strong>roducto/División → <strong>S</strong>uma/Resta</p>
<p>2 + 3 × 4² = 2 + 3 × 16 = 2 + 48 = 50 &nbsp;(NO 5 × 16)</p>`,
  examples:[
    {title:'¿Es √5 racional o irracional?',
     steps:[
       {text:'Intenta escribirlo como fracción p/q.',formula:'√5 ≈ 2,2360679...'},
       {text:'El decimal no tiene período ni termina.',formula:'No existe p/q tal que (p/q)² = 5'},
       {text:'Conclusión.',formula:'√5 es irracional'}
     ]
    },
    {title:'Calcula: (−3) × (−4) + (−2)',
     steps:[
       {text:'Primero la multiplicación: (−)(−) = positivo.',formula:'(−3) × (−4) = 12'},
       {text:'Luego la suma.',formula:'12 + (−2) = 10'}
     ]
    },
    {title:'¿Cuánto es |−8 + 3|?',
     steps:[
       {text:'Resuelve dentro del valor absoluto.',formula:'−8 + 3 = −5'},
       {text:'Aplica valor absoluto.',formula:'|−5| = 5'}
     ]
    }
  ],
  discovery:{
    title:'Explora la recta numérica',
    description:'Ubica −7, −3, 0, 4, 9 en la recta. ¿Qué número está más a la derecha? ¿Cuál tiene mayor valor absoluto?',
    steps:[
      {text:'Regla clave:',formula:'a < b si y sólo si a está a la izquierda de b en la recta'},
      {text:'Un número negativo siempre es menor que cualquier positivo.',formula:'−100 < 0 < 1'},
      {text:'Valor absoluto ≠ valor del número.',formula:'|−7| = 7 pero −7 < 0'}
    ]
  },
  exercises:[
    {q:'¿Es −3/7 racional?',a:'Sí, es racional (es una fracción de enteros con denominador ≠ 0).'},
    {q:'Calcula: −5 + (−3) × 2',a:'−5 + (−6) = −11 (primero la multiplicación).'},
    {q:'¿Cuánto es |−4 + (−3)|?',a:'|−7| = 7.'}
  ],
  advanced:[
    {q:'Si |x − 3| = 5, ¿cuáles son los posibles valores de x?',a:'x − 3 = 5 → x = 8; o x − 3 = −5 → x = −2.'},
    {q:'¿Cuántos enteros satisfacen |n| < 4?',a:'n ∈ {−3, −2, −1, 0, 1, 2, 3} → 7 enteros.'}
  ]
};

/* ══════════════════════════════════════════════════════
   LECCIÓN 2 — FRACCIONES
══════════════════════════════════════════════════════ */
var lesson_fracciones={
  id:'paes-fracciones',subject:'paes',unit:'paes_n_u2',
  title:'Fracciones — PAES',
  visual:{type:'paes-fracciones-ref'},
  concept:`
<h3>Tipos de Fracciones</h3>
<ul>
  <li><strong>Propia:</strong> |numerador| &lt; |denominador| → valor entre 0 y 1. Ej: 3/5</li>
  <li><strong>Impropia:</strong> |numerador| ≥ |denominador|. Ej: 7/4 = 1 3/4 (número mixto)</li>
</ul>
<h3>Operaciones Fundamentales</h3>
<table style="border-collapse:collapse;font-size:13px;width:100%;">
<tr style="background:#EDE9FE;"><th style="padding:4px 8px;">Operación</th><th>Método</th><th>Ejemplo</th></tr>
<tr><td style="padding:4px 8px;"><strong>Suma/Resta</strong></td><td>MCM de denominadores</td><td>1/3 + 1/4 = 4/12 + 3/12 = 7/12</td></tr>
<tr style="background:#f9fafb;"><td style="padding:4px 8px;"><strong>Multiplicación</strong></td><td>num×num / den×den</td><td>2/3 × 3/4 = 6/12 = 1/2</td></tr>
<tr><td style="padding:4px 8px;"><strong>División</strong></td><td>×recíproco de la 2ª</td><td>2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6</td></tr>
</table>
<h3>Errores Frecuentes en PAES</h3>
<ul>
  <li>❌ 1/2 + 1/3 = 2/5 → ✅ 1/2 + 1/3 = 3/6 + 2/6 = 5/6</li>
  <li>❌ 2/3 ÷ 4/5 = 2/3 × 4/5 → ✅ 2/3 ÷ 4/5 = 2/3 × 5/4 (invertir el divisor)</li>
  <li>❌ 2/3 de 90 = 90/3 = 30 → ✅ 2/3 × 90 = 60</li>
</ul>`,
  examples:[
    {title:'Calcula 3/4 + 2/3',
     steps:[
       {text:'MCM(4,3) = 12. Amplifica.',formula:'3/4 = 9/12 y 2/3 = 8/12'},
       {text:'Suma numeradores.',formula:'9/12 + 8/12 = 17/12'},
       {text:'Convierte a mixto.',formula:'17/12 = 1 5/12'}
     ]
    },
    {title:'¿Cuánto es 5/8 de 240?',
     steps:[
       {text:'Fracción de cantidad = multiplicación.',formula:'240 × 5/8'},
       {text:'Simplifica primero: 240/8 = 30.',formula:'30 × 5 = 150'}
     ]
    },
    {title:'Calcula 5/6 ÷ 5/9',
     steps:[
       {text:'Divide = multiplica por el recíproco.',formula:'5/6 × 9/5'},
       {text:'Simplifica (5 con 5, 9 con 6).',formula:'= 1/6 × 9/1 = 9/6 = 3/2'}
     ]
    }
  ],
  discovery:{
    title:'¿Cuál es mayor: 7/9 o 5/7?',
    description:'Compara fracciones usando denominador común o decimales.',
    steps:[
      {text:'Método 1: Decimales.',formula:'7/9 ≈ 0,778 y 5/7 ≈ 0,714'},
      {text:'Conclusión:',formula:'7/9 > 5/7'},
      {text:'Método 2: Productos cruzados.',formula:'7×7=49 y 9×5=45. Como 49>45, 7/9 > 5/7 ✓'}
    ]
  },
  exercises:[
    {q:'Simplifica 24/36.',a:'MCD(24,36) = 12. Resultado: 2/3.'},
    {q:'Calcula 5/6 − 1/4.',a:'MCM(6,4)=12. 10/12 − 3/12 = 7/12.'},
    {q:'Convierte 3 2/5 a fracción impropia.',a:'(3×5+2)/5 = 17/5.'}
  ],
  advanced:[
    {q:'Si 3/x = 5/12, ¿cuánto es x?',a:'Productos cruzados: 3×12 = 5×x → x = 36/5 = 7,2.'},
    {q:'Calcula (2/3 + 1/4) ÷ (5/6 − 1/3).',a:'Numerador: 8/12+3/12=11/12. Denominador: 5/6−2/6=3/6=1/2. Resultado: (11/12)÷(1/2)=11/6.'}
  ]
};

/* ══════════════════════════════════════════════════════
   LECCIÓN 3 — RAZONES Y PROPORCIONES
══════════════════════════════════════════════════════ */
var lesson_razones={
  id:'paes-razones',subject:'paes',unit:'paes_n_u3',
  title:'Razones y Proporciones — PAES',
  visual:{type:'paes-razones-ref'},
  concept:`
<h3>Razón</h3>
<p>La razón entre a y b es a:b = a/b. Se simplifica dividiendo por el MCD.</p>
<h3>Proporción y Productos Cruzados</h3>
<p>a/b = c/d es una proporción si y sólo si <strong>a × d = b × c</strong> (productos cruzados iguales).</p>
<h3>Proporción Directa vs Inversa</h3>
<table style="border-collapse:collapse;font-size:13px;width:100%;">
<tr style="background:#EDE9FE;"><th style="padding:4px 8px;">Tipo</th><th>Cuándo</th><th>Fórmula</th></tr>
<tr><td style="padding:4px 8px;"><strong>Directa</strong></td><td>Más de A → más de B</td><td>x = b × c / a</td></tr>
<tr style="background:#f9fafb;"><td style="padding:4px 8px;"><strong>Inversa</strong></td><td>Más de A → menos de B</td><td>x = a × b / c</td></tr>
</table>
<h3>Reparto Proporcional</h3>
<p>Total se reparte en razón a:b. Suma = a+b partes totales. Cada parte = Total × proporción/suma.</p>
<h3>Trabajo Conjunto</h3>
<p>Si A tarda tA días y B tarda tB días solos: juntos tardan t = tA × tB / (tA + tB) días.</p>
<h3>Error Frecuente PAES</h3>
<p>❌ Confundir directa e inversa. Pregúntate: «Si uno sube, ¿el otro sube o baja?»</p>`,
  examples:[
    {title:'6 personas pintan en 8 días. ¿Cuánto tardan 4 personas?',
     steps:[
       {text:'Más personas → menos días: proporción inversa.',formula:'6 × 8 = 4 × x'},
       {text:'Despeja x.',formula:'x = 48 / 4 = 12 días'}
     ]
    },
    {title:'Se reparten $480 en razón 3:5. ¿Cuánto recibe cada parte?',
     steps:[
       {text:'Suma de razones: 3+5 = 8 partes.',formula:'Parte A = $480 × 3/8 = $180'},
       {text:'',formula:'Parte B = $480 × 5/8 = $300'},
       {text:'Verifica: $180 + $300 = $480 ✓',formula:''}
     ]
    },
    {title:'En un plano 1:500, una sala mide 6 cm. ¿Cuánto mide en la realidad?',
     steps:[
       {text:'1 cm plano = 500 cm real = 5 m.',formula:'6 cm × 500 = 3000 cm = 30 m'}
     ]
    }
  ],
  discovery:{
    title:'¿Es proporción? Usa productos cruzados.',
    description:'Determina si 4/6 = 10/15 son proporcionales.',
    steps:[
      {text:'Productos cruzados:',formula:'4 × 15 = 60 y 6 × 10 = 60'},
      {text:'Son iguales → sí forman proporción.',formula:'4/6 = 10/15 = 2/3 ✓'}
    ]
  },
  exercises:[
    {q:'Si 5 kg cuestan $3.500, ¿cuánto cuestan 8 kg?',a:'Directa: x = 3500 × 8/5 = $5.600.'},
    {q:'A hace una tarea en 6 días, B en 4 días. ¿Juntos cuánto tardan?',a:'t = 6×4/(6+4) = 24/10 = 2,4 días.'},
    {q:'Simplifica la razón 45:60.',a:'MCD(45,60)=15. Razón simplificada: 3:4.'}
  ],
  advanced:[
    {q:'Tres socios invierten en razón 2:3:5. Si el tercer socio recibió $450, ¿cuánto invirtió en total?',a:'Parte 3 = 5/10 del total. $450 = 5/10 × total → total = $900.'},
    {q:'Un grifo llena un estanque en 4 h y otro en 6 h. Con un desagüe lo vacía en 12 h. ¿En cuánto se llena con ambos grifos y el desagüe abierto?',a:'1/t = 1/4 + 1/6 − 1/12 = 3/12 + 2/12 − 1/12 = 4/12 = 1/3 → t = 3 horas.'}
  ]
};

/* ══════════════════════════════════════════════════════
   LECCIÓN 4 — PORCENTAJES
══════════════════════════════════════════════════════ */
var lesson_porcentajes={
  id:'paes-porcentajes',subject:'paes',unit:'paes_n_u4',
  title:'Porcentajes — PAES',
  visual:{type:'paes-porcentajes-ref'},
  concept:`
<h3>Fórmulas Clave</h3>
<ul>
  <li><strong>X% de N:</strong> N × X/100</li>
  <li><strong>Aumento del X%:</strong> N × (1 + X/100)</li>
  <li><strong>Descuento del X%:</strong> N × (1 − X/100)</li>
  <li><strong>Precio original (dado precio con descuento):</strong> P_final ÷ (1 − X/100)</li>
  <li><strong>Variación %:</strong> ((nuevo − viejo) / viejo) × 100</li>
  <li><strong>IVA 19%:</strong> precio neto × 1,19</li>
</ul>
<h3>Descuentos/Aumentos Sucesivos</h3>
<p>No se suman los porcentajes. Se aplica uno tras otro:</p>
<p>$1000 con −20% y luego −10%: $1000 × 0,8 × 0,9 = $720 (no $700)</p>
<h3>Errores Frecuentes PAES</h3>
<ul>
  <li>❌ «Un precio sube 20% y baja 20%: queda igual» → ✅ 100 × 1,2 × 0,8 = 96 (pierde 4%)</li>
  <li>❌ «10% + 10% = 20%» sucesivos → ✅ × 1,1 × 1,1 = × 1,21 (21% total)</li>
</ul>`,
  examples:[
    {title:'Un computador vale $350.000 con 30% de descuento. ¿Precio original?',
     steps:[
       {text:'precio_final = original × (1 − 0,30) = original × 0,70',formula:'$350.000 = original × 0,70'},
       {text:'Despeja el original.',formula:'original = $350.000 / 0,70 = $500.000'}
     ]
    },
    {title:'¿Qué porcentaje de 240 es 60?',
     steps:[
       {text:'Porcentaje = (parte / total) × 100',formula:'(60 / 240) × 100 = 0,25 × 100 = 25%'}
     ]
    },
    {title:'Descuentos sucesivos 15% y 10% sobre $2.000',
     steps:[
       {text:'Primer descuento.',formula:'$2.000 × 0,85 = $1.700'},
       {text:'Segundo descuento sobre el resultado.',formula:'$1.700 × 0,90 = $1.530'},
       {text:'Error frecuente: NO es $2.000 × 0,75 = $1.500',formula:'Diferencia: $30'}
     ]
    }
  ],
  discovery:{
    title:'¿Por qué +20% y luego −20% no vuelve al precio original?',
    description:'Prueba con $100.',
    steps:[
      {text:'+20%:',formula:'$100 × 1,2 = $120'},
      {text:'−20% sobre $120:',formula:'$120 × 0,8 = $96'},
      {text:'Conclusión:',formula:'No vuelve a $100 porque el 20% se calcula sobre bases distintas.'}
    ]
  },
  exercises:[
    {q:'¿Cuánto es el 35% de $1.200?',a:'$1.200 × 35/100 = $420.'},
    {q:'Un sueldo de $800.000 aumenta un 12%. ¿Cuánto queda?',a:'$800.000 × 1,12 = $896.000.'},
    {q:'Un precio pasó de $500 a $650. ¿Cuál fue la variación porcentual?',a:'(650−500)/500 × 100 = 150/500 × 100 = 30%.'}
  ],
  advanced:[
    {q:'Un producto tiene primero un aumento del 25% y luego un descuento del 20%. ¿Qué ocurrió al precio original?',a:'× 1,25 × 0,80 = × 1,00. El precio vuelve al original.'},
    {q:'Si el precio con IVA de 19% es $7.140, ¿cuál es el precio neto?',a:'Precio neto = $7.140 / 1,19 = $6.000.'}
  ]
};

/* ══════════════════════════════════════════════════════
   LECCIÓN 5 — POTENCIAS
══════════════════════════════════════════════════════ */
var lesson_potencias={
  id:'paes-potencias',subject:'paes',unit:'paes_n_u5',
  title:'Potencias — PAES',
  visual:{type:'paes-potencias-ref'},
  concept:`
<h3>Leyes de Exponentes</h3>
<table style="border-collapse:collapse;font-size:13px;width:100%;">
<tr style="background:#EDE9FE;"><th style="padding:4px 8px;">Ley</th><th>Fórmula</th><th>Ejemplo</th></tr>
<tr><td style="padding:4px 8px;">Producto</td><td>a^m × a^n = a^(m+n)</td><td>2³×2⁴ = 2⁷ = 128</td></tr>
<tr style="background:#f9fafb;"><td style="padding:4px 8px;">Cociente</td><td>a^m ÷ a^n = a^(m−n)</td><td>5⁶÷5² = 5⁴ = 625</td></tr>
<tr><td style="padding:4px 8px;">Potencia de potencia</td><td>(a^m)^n = a^(m×n)</td><td>(2³)⁴ = 2¹² = 4096</td></tr>
<tr style="background:#f9fafb;"><td style="padding:4px 8px;">Exponente 0</td><td>a⁰ = 1 (a≠0)</td><td>7⁰ = 1; 999⁰ = 1</td></tr>
<tr><td style="padding:4px 8px;">Exponente negativo</td><td>a^(−n) = 1/aⁿ</td><td>2^(−3) = 1/8</td></tr>
<tr style="background:#f9fafb;"><td style="padding:4px 8px;">Exp. fraccionario</td><td>a^(1/n) = ⁿ√a</td><td>8^(1/3) = ∛8 = 2</td></tr>
</table>
<h3>Base Negativa</h3>
<ul>
  <li>(−a)^par = positivo: (−3)² = 9</li>
  <li>(−a)^impar = negativo: (−3)³ = −27</li>
</ul>
<h3>Error Frecuente PAES</h3>
<p>❌ 2³ × 2⁴ = 4⁷ → ✅ 2³ × 2⁴ = 2⁷ (no se multiplican las bases)</p>
<p>❌ (a³)⁴ = a⁷ → ✅ (a³)⁴ = a¹² (se multiplican los exponentes)</p>`,
  examples:[
    {title:'Simplifica: 3⁵ × 3³ ÷ 3⁴',
     steps:[
       {text:'Aplica leyes de exponentes.',formula:'3^(5+3−4) = 3⁴'},
       {text:'Evalúa.',formula:'3⁴ = 81'}
     ]
    },
    {title:'¿Cuánto es (2³)² × 2⁰?',
     steps:[
       {text:'Potencia de potencia.',formula:'(2³)² = 2⁶ = 64'},
       {text:'Exponente 0.',formula:'2⁰ = 1'},
       {text:'Multiplica.',formula:'64 × 1 = 64'}
     ]
    },
    {title:'Resuelve 3^x = 81',
     steps:[
       {text:'Escribe 81 como potencia de 3.',formula:'81 = 3⁴'},
       {text:'Iguala exponentes.',formula:'3^x = 3⁴ → x = 4'}
     ]
    }
  ],
  discovery:{
    title:'Explora el crecimiento exponencial',
    description:'Una bacteria se duplica cada hora. ¿Cuántas habrá en 10 horas si empiezan siendo 1?',
    steps:[
      {text:'Duplicar = multiplicar por 2 cada hora.',formula:'Cantidad = 2^n (n = horas)'},
      {text:'A las 10 horas:',formula:'2^10 = 1024 bacterias'},
      {text:'A las 20 horas:',formula:'2^20 = 1.048.576 (más de un millón)'}
    ]
  },
  exercises:[
    {q:'¿Cuánto es 5⁰ + 2^(−1)?',a:'1 + 1/2 = 3/2 = 1,5.'},
    {q:'Simplifica (x⁴)³ ÷ x⁵.',a:'x^(4×3) ÷ x⁵ = x¹² ÷ x⁵ = x⁷.'},
    {q:'¿Cuánto es 4^(1/2)?',a:'4^(1/2) = √4 = 2.'}
  ],
  advanced:[
    {q:'Si 2^(x+1) = 32, ¿cuánto es x?',a:'32 = 2⁵ → 2^(x+1) = 2⁵ → x+1=5 → x=4.'},
    {q:'Simplifica: (a²b³)² ÷ (ab)⁴',a:'a⁴b⁶ ÷ a⁴b⁴ = b².'}
  ]
};

/* ══════════════════════════════════════════════════════
   LECCIÓN 6 — RAÍCES Y RADICALES
══════════════════════════════════════════════════════ */
var lesson_raices={
  id:'paes-raices',subject:'paes',unit:'paes_n_u6',
  title:'Raíces y Radicales — PAES',
  visual:{type:'paes-raices-ref'},
  concept:`
<h3>Propiedades de Raíces</h3>
<table style="border-collapse:collapse;font-size:13px;width:100%;">
<tr style="background:#EDE9FE;"><th style="padding:4px 8px;">Propiedad</th><th>Ejemplo</th></tr>
<tr><td style="padding:4px 8px;">√(a × b) = √a × √b</td><td>√12 = √4 × √3 = 2√3</td></tr>
<tr style="background:#f9fafb;"><td style="padding:4px 8px;">√(a/b) = √a / √b</td><td>√(9/25) = 3/5</td></tr>
<tr><td style="padding:4px 8px;">√a × √a = a</td><td>√7 × √7 = 7</td></tr>
<tr style="background:#f9fafb;"><td style="padding:4px 8px;">√(a²) = |a|</td><td>√((-3)²) = 3</td></tr>
<tr><td style="padding:4px 8px;">1/√a = √a/a (racionalizar)</td><td>1/√5 = √5/5</td></tr>
</table>
<h3>Simplificación de Raíces</h3>
<p>Busca el mayor cuadrado perfecto que divide al radicando:</p>
<p>√72 = √(36×2) = 6√2 &nbsp;|&nbsp; √50 = √(25×2) = 5√2</p>
<h3>Suma de Raíces Semejantes</h3>
<p>Solo se pueden sumar raíces con el <em>mismo radicando</em>:</p>
<p>3√5 + 7√5 = 10√5 &nbsp;|&nbsp; 3√5 + 7√3 = no se simplifica</p>
<h3>Errores Frecuentes PAES</h3>
<ul>
  <li>❌ √(a+b) = √a + √b → ✅ √(9+16) = √25 = 5 ≠ 3+4 = 7</li>
  <li>❌ √(−4) existe en ℝ → ✅ No existe raíz cuadrada de negativos en ℝ</li>
</ul>`,
  examples:[
    {title:'Simplifica √48',
     steps:[
       {text:'Busca el mayor cuadrado perfecto que divide a 48.',formula:'48 = 16 × 3'},
       {text:'Aplica la propiedad.',formula:'√48 = √(16×3) = √16 × √3 = 4√3'}
     ]
    },
    {title:'Calcula 2√3 + 5√3 − √3',
     steps:[
       {text:'Mismos radicandos → suma coeficientes.',formula:'(2 + 5 − 1)√3 = 6√3'}
     ]
    },
    {title:'Racionaliza 3/√5',
     steps:[
       {text:'Multiplica por √5/√5.',formula:'3/√5 × √5/√5 = 3√5/(√5)²'},
       {text:'Simplifica.',formula:'= 3√5/5'}
     ]
    }
  ],
  discovery:{
    title:'¿Por qué √(a+b) ≠ √a + √b?',
    description:'Prueba con a=9, b=16.',
    steps:[
      {text:'Lado izquierdo:',formula:'√(9+16) = √25 = 5'},
      {text:'Lado derecho:',formula:'√9 + √16 = 3 + 4 = 7'},
      {text:'Conclusión:',formula:'5 ≠ 7 → La propiedad NO se aplica para suma/resta bajo la raíz'}
    ]
  },
  exercises:[
    {q:'Simplifica √200.',a:'√200 = √(100×2) = 10√2.'},
    {q:'Calcula √18 + √8.',a:'3√2 + 2√2 = 5√2.'},
    {q:'Si √x = 7, ¿cuánto es x?',a:'x = 7² = 49.'}
  ],
  advanced:[
    {q:'Simplifica (√3 + √2)(√3 − √2).',a:'Diferencia de cuadrados: (√3)² − (√2)² = 3 − 2 = 1.'},
    {q:'Racionaliza 4/(√6 + √2).',a:'Multiplica por (√6−√2)/(√6−√2): 4(√6−√2)/(6−2) = 4(√6−√2)/4 = √6−√2.'}
  ]
};

/* ── Registro ── */
var lessons=[lesson_numeros,lesson_fracciones,lesson_razones,lesson_porcentajes,lesson_potencias,lesson_raices];
lessons.forEach(function(l){
  var idx=window.MM_LESSONS.findIndex(function(x){return x.id===l.id;});
  if(idx>=0) window.MM_LESSONS.splice(idx,1,l);
  else window.MM_LESSONS.push(l);
  window.MM_LESSON_MAP[l.id]=l;
});

console.log('[MM] content-paes-numeros.js: 6 lecciones cargadas.');
})();
