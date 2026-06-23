/* ═══════════════════════════════════════════════════════════════
   GENERATORS-ARITMETICA.JS — Generadores dinámicos de ejercicios
   Aritmética: 15 unidades, 90+ generadores
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';
  if (!window.MM_GENERATORS) window.MM_GENERATORS = {};
  if (!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS = {};

  const G = window.MM_GENERATORS;

  // ── Helpers ──────────────────────────────────────────────────────
  function ri(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }
  function rf(min, max, dec) {
    const v = min + Math.random() * (max - min);
    return parseFloat(v.toFixed(dec));
  }
  function pick(arr) { return arr[ri(0, arr.length - 1)]; }
  function shuffle(arr) { const a = arr.slice(); for (let i = a.length-1; i>0; i--) { const j = ri(0,i); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
  function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }
  function sieve(n) {
    const p = Array(n+1).fill(true); p[0]=p[1]=false;
    for (let i=2; i*i<=n; i++) if (p[i]) for (let j=i*i; j<=n; j+=i) p[j]=false;
    return p.reduce((acc,v,i)=>{ if(v) acc.push(i); return acc; }, []);
  }
  const PRIMES_100 = sieve(100);

  function diffCfg(diff, cfgs) {
    const map = { easy: 0, medio: 1, dificil: 2, experto: 3 };
    return cfgs[Math.min(map[diff] ?? 0, cfgs.length - 1)];
  }

  // ── 1. NÚMEROS NATURALES ─────────────────────────────────────────

  G['nat_valor_posicional'] = function(diff) {
    const cfg = diffCfg(diff, [
      { max: 999, ask: 'unidades' },
      { max: 9999, ask: pick(['centenas','decenas','unidades']) },
      { max: 99999, ask: pick(['unidades de mil','centenas','decenas']) },
      { max: 9999999, ask: pick(['millones','centenas de mil','decenas de mil']) }
    ]);
    const n = ri(100, cfg.max);
    const s = String(n);
    const PLACE = {
      'unidades': [0, 1],
      'decenas': [1, 10],
      'centenas': [2, 100],
      'unidades de mil': [3, 1000],
      'decenas de mil': [4, 10000],
      'centenas de mil': [5, 100000],
      'millones': [6, 1000000]
    };
    const place = cfg.ask;
    const [pos, mult] = PLACE[place] || [0, 1];
    const digit = parseInt(s[s.length - 1 - pos]) || 0;
    const answer = String(digit * mult);
    return {
      question: `En el número \\(${n.toLocaleString('es-CL')}\\), ¿cuánto vale el dígito en la posición de las <strong>${place}</strong>?`,
      answer,
      type: 'numeric',
      hint: `Identifica el dígito en la posición de las ${place} y multiplícalo por su valor posicional.`,
      solution: `El dígito en la posición de las ${place} es ${digit}, y su valor es \\(${digit} \\times ${mult} = ${answer}\\).`,
      solutionSteps: [
        `Escribimos el número: ${n}`,
        `La posición de las ${place} corresponde a la posición ${pos+1} desde la derecha.`,
        `El dígito en esa posición es ${digit}.`,
        `Valor posicional: \\(${digit} \\times ${mult} = ${answer}\\)`
      ],
      topic: 'naturales'
    };
  };

  G['nat_comparar'] = function(diff) {
    const max = diffCfg(diff, [100, 10000, 999999, 9999999]);
    const a = ri(1, max), b = ri(1, max);
    if (a === b) return G['nat_comparar'](diff);
    const mayor = Math.max(a, b);
    const opciones = shuffle([
      `${mayor}`,
      `${Math.min(a,b)}`,
      `${ri(1,max)}`,
      'Son iguales'
    ].filter((v,i,arr)=>arr.indexOf(v)===i)).slice(0,4);
    if (!opciones.includes(String(mayor))) opciones[0] = String(mayor);
    const idx = opciones.indexOf(String(mayor));
    return {
      question: `¿Cuál es el mayor entre \\(${a.toLocaleString('es-CL')}\\) y \\(${b.toLocaleString('es-CL')}\\)?`,
      answer: String(idx),
      type: 'multiple-choice',
      options: opciones,
      hint: 'Compara dígito a dígito de izquierda a derecha.',
      solution: `\\(${mayor.toLocaleString('es-CL')}\\) es mayor porque tiene más ${a > b ? 'unidades' : 'valor'}.`,
      topic: 'naturales'
    };
  };

  G['nat_ordenar_asc'] = function(diff) {
    const max = diffCfg(diff, [50, 999, 9999, 99999]);
    const nums = [];
    while (nums.length < 4) { const n = ri(1, max); if (!nums.includes(n)) nums.push(n); }
    const sorted = nums.slice().sort((a,b)=>a-b);
    return {
      question: `Ordena de menor a mayor: \\(${nums.join(',\\; ')}\\)\nEscribe el menor número.`,
      answer: String(sorted[0]),
      type: 'numeric',
      hint: 'Primero busca el número más pequeño.',
      solution: `Orden: \\(${sorted.join(' < ')}\\). El menor es \\(${sorted[0]}\\).`,
      topic: 'naturales'
    };
  };

  G['nat_redondear'] = function(diff) {
    const cfgs = [
      { max: 999, to: 10, label: 'decena más cercana' },
      { max: 9999, to: pick([10,100]), label: 'centena más cercana' },
      { max: 99999, to: pick([100,1000]), label: 'unidad de mil más cercana' },
      { max: 999999, to: pick([1000,10000]), label: 'decena de mil más cercana' }
    ];
    const cfg = cfgs[Math.min(['easy','medio','dificil','experto'].indexOf(diff||'easy'), 3)];
    const n = ri(1, cfg.max);
    const rounded = Math.round(n / cfg.to) * cfg.to;
    return {
      question: `Redondea \\(${n.toLocaleString('es-CL')}\\) a la ${cfg.label}.`,
      answer: String(rounded),
      type: 'numeric',
      hint: `Mira el dígito inmediatamente inferior a la posición de redondeo. Si es ≥5 sube, si es <5 baja.`,
      solution: `\\(${n}\\) redondeado a la ${cfg.label} = \\(${rounded}\\).`,
      topic: 'naturales'
    };
  };

  G['nat_sumar_grandes'] = function(diff) {
    const max = diffCfg(diff, [99, 999, 9999, 99999]);
    const a = ri(Math.floor(max/2), max), b = ri(Math.floor(max/2), max);
    return {
      question: `Calcula: \\(${a.toLocaleString('es-CL')} + ${b.toLocaleString('es-CL')} = ?\\)`,
      answer: String(a + b),
      type: 'numeric',
      hint: 'Suma columna por columna de derecha a izquierda, llevando cuando sea necesario.',
      solution: `\\(${a} + ${b} = ${a+b}\\)`,
      topic: 'naturales'
    };
  };

  G['nat_restar_grandes'] = function(diff) {
    const max = diffCfg(diff, [99, 999, 9999, 99999]);
    const b = ri(1, max), a = ri(b, max + b);
    return {
      question: `Calcula: \\(${a.toLocaleString('es-CL')} - ${b.toLocaleString('es-CL')} = ?\\)`,
      answer: String(a - b),
      type: 'numeric',
      hint: 'Resta columna a columna de derecha a izquierda, tomando prestado cuando sea necesario.',
      solution: `\\(${a} - ${b} = ${a-b}\\)`,
      topic: 'naturales'
    };
  };

  G['nat_multiplicar'] = function(diff) {
    const [ra, rb] = diffCfg(diff, [[2,9],[2,99],[2,999],[11,999]]);
    const a = ri(ra, rb), b = ri(2, diffCfg(diff,[9,99,99,999]));
    return {
      question: `Calcula: \\(${a} \\times ${b} = ?\\)`,
      answer: String(a * b),
      type: 'numeric',
      hint: `Multiplica cada cifra de ${a} por ${b} y suma los acarreos.`,
      solution: `\\(${a} \\times ${b} = ${a*b}\\)`,
      topic: 'naturales'
    };
  };

  G['nat_dividir'] = function(diff) {
    const b = diffCfg(diff, [ri(2,9), ri(2,12), ri(2,25), ri(2,99)]);
    const q = ri(2, diffCfg(diff,[9,99,999,9999]));
    const a = b * q;
    return {
      question: `Calcula: \\(${a.toLocaleString('es-CL')} \\div ${b} = ?\\)`,
      answer: String(q),
      type: 'numeric',
      hint: `Piensa: ¿cuántas veces cabe ${b} en ${a}?`,
      solution: `\\(${a} \\div ${b} = ${q}\\) porque \\(${b} \\times ${q} = ${a}\\).`,
      topic: 'naturales'
    };
  };

  MM_TOPIC_GENERATORS['naturales'] = [
    'nat_valor_posicional','nat_comparar','nat_ordenar_asc','nat_redondear',
    'nat_sumar_grandes','nat_restar_grandes','nat_multiplicar','nat_dividir'
  ];

  // ── 2. NÚMEROS ENTEROS ──────────────────────────────────────────

  G['ent_comparar'] = function(diff) {
    const max = diffCfg(diff, [10, 50, 500, 5000]);
    const a = ri(-max, max), b = ri(-max, max);
    if (a === b) return G['ent_comparar'](diff);
    const mayor = Math.max(a, b);
    const opts = shuffle([String(mayor), String(Math.min(a,b)), String(ri(-max, max))]).slice(0,3);
    if (!opts.includes(String(mayor))) opts[0] = String(mayor);
    const idx = opts.indexOf(String(mayor));
    return {
      question: `¿Cuál es el mayor entre \\(${a}\\) y \\(${b}\\)?`,
      answer: String(idx), type: 'multiple-choice', options: opts,
      hint: 'En la recta numérica, los números más a la derecha son mayores.',
      solution: `\\(${mayor}\\) es el mayor, ya que ${mayor} > ${Math.min(a,b)}.`,
      topic: 'enteros'
    };
  };

  G['ent_sumar'] = function(diff) {
    const max = diffCfg(diff, [10, 50, 200, 1000]);
    const a = ri(-max, max), b = ri(-max, max);
    return {
      question: `Calcula: \\((${a}) + (${b}) = ?\\)`,
      answer: String(a + b), type: 'numeric',
      hint: a < 0 && b < 0 ? 'Ambos negativos: suma los valores absolutos y pon signo negativo.'
           : a < 0 || b < 0 ? 'Signos distintos: resta los valores absolutos y usa el signo del mayor.' : 'Ambos positivos: suma normalmente.',
      solution: `\\((${a}) + (${b}) = ${a+b}\\)`,
      solutionSteps: a < 0 && b < 0
        ? [`Ambos negativos: -(${Math.abs(a)} + ${Math.abs(b)}) = -${Math.abs(a)+Math.abs(b)}`]
        : [`Signos ${a*b<0?'distintos':'iguales'}: resultado = ${a+b}`],
      topic: 'enteros'
    };
  };

  G['ent_restar'] = function(diff) {
    const max = diffCfg(diff, [10, 50, 200, 1000]);
    const a = ri(-max, max), b = ri(-max, max);
    return {
      question: `Calcula: \\((${a}) - (${b}) = ?\\)`,
      answer: String(a - b), type: 'numeric',
      hint: `Restar ${b} es lo mismo que sumar ${-b}.`,
      solution: `\\((${a}) - (${b}) = ${a} + (${-b}) = ${a-b}\\)`,
      topic: 'enteros'
    };
  };

  G['ent_multiplicar'] = function(diff) {
    const max = diffCfg(diff, [9, 20, 50, 100]);
    const a = ri(-max, max) || 1, b = ri(-max, max) || 1;
    return {
      question: `Calcula: \\((${a}) \\times (${b}) = ?\\)`,
      answer: String(a * b), type: 'numeric',
      hint: a*b > 0 ? 'Signos iguales → resultado positivo.' : 'Signos distintos → resultado negativo.',
      solution: `\\((${a}) \\times (${b}) = ${a*b}\\). Regla de signos: ${a<0?'(−)':'(+)'} × ${b<0?'(−)':'(+)'} = ${a*b>=0?'(+)':'(−)'}`,
      topic: 'enteros'
    };
  };

  G['ent_dividir'] = function(diff) {
    const max = diffCfg(diff, [5, 12, 25, 50]);
    const b = (ri(-max, max) || 1);
    const q = (ri(-max, max) || 1);
    const a = b * q;
    return {
      question: `Calcula: \\((${a}) \\div (${b}) = ?\\)`,
      answer: String(q), type: 'numeric',
      hint: a*b > 0 ? 'Signos iguales → resultado positivo.' : 'Signos distintos → resultado negativo.',
      solution: `\\((${a}) \\div (${b}) = ${q}\\) porque \\(${b} \\times ${q} = ${a}\\).`,
      topic: 'enteros'
    };
  };

  G['ent_valor_absoluto'] = function(diff) {
    const max = diffCfg(diff, [20, 100, 500, 5000]);
    const a = ri(-max, max);
    const b = ri(-max, max);
    const question = pick([
      { q: `\\(|${a}|\\)`, ans: String(Math.abs(a)) },
      { q: `\\(|${a}| + |${b}|\\)`, ans: String(Math.abs(a)+Math.abs(b)) },
      { q: `\\(|${a} - ${b}|\\)`, ans: String(Math.abs(a-b)) }
    ]);
    return {
      question: `Calcula: ${question.q} = ?`,
      answer: question.ans, type: 'numeric',
      hint: 'El valor absoluto es la distancia al cero, siempre positivo.',
      solution: `${question.q} = ${question.ans}`,
      topic: 'enteros'
    };
  };

  G['ent_recta_numerica'] = function(diff) {
    const max = diffCfg(diff, [10, 20, 50, 100]);
    const start = ri(-max, 0);
    const step = ri(1, diffCfg(diff,[3,5,8,12]));
    const steps = ri(2, 5);
    const end = start + step * steps;
    return {
      question: `En una recta numérica comienzo en \\(${start}\\) y avanzo \\(${steps}\\) pasos de \\(${step}\\) unidades hacia la derecha. ¿En qué número llego?`,
      answer: String(end), type: 'numeric',
      hint: `Suma: ${start} + (${steps} × ${step}).`,
      solution: `\\(${start} + ${steps} \\times ${step} = ${start} + ${steps*step} = ${end}\\)`,
      topic: 'enteros'
    };
  };

  MM_TOPIC_GENERATORS['enteros'] = [
    'ent_comparar','ent_sumar','ent_restar','ent_multiplicar','ent_dividir',
    'ent_valor_absoluto','ent_recta_numerica'
  ];

  // ── 3. OPERACIONES COMBINADAS ───────────────────────────────────

  G['op_jerarquia_basica'] = function(diff) {
    const a = ri(1,10), b = ri(1,10), c = ri(1,5);
    const expr = diffCfg(diff, [
      { tex: `${a} + ${b} \\times ${c}`, val: a + b*c },
      { tex: `${a} \\times ${b} - ${c} \\times ${ri(1,5)}`, val: () => { const d=ri(1,5); return { tex:`${a} \\times ${b} - ${c} \\times ${d}`, val: a*b - c*d }; } },
      { tex: `(${a} + ${b}) \\times ${c} - ${ri(1,10)}`, val: () => { const d=ri(1,10); return { tex:`(${a}+${b})\\times${c}-${d}`, val:(a+b)*c-d }; } },
      { tex: `${a}^2 + ${b} \\times ${c}`, val: a*a + b*c }
    ]);
    const item = typeof expr.val === 'function' ? expr.val() : expr;
    const result = typeof item.val === 'number' ? item.val : item.val;
    return {
      question: `Calcula respetando la jerarquía de operaciones: \\(${item.tex || expr.tex}\\)`,
      answer: String(result), type: 'numeric',
      hint: 'Recuerda PEMDAS: Paréntesis, Exponentes, Multiplicación/División, Suma/Resta.',
      solution: `\\(${item.tex || expr.tex} = ${result}\\)`,
      topic: 'operaciones'
    };
  };

  G['op_parentesis'] = function(diff) {
    const a = ri(2,10), b = ri(2,8), c = ri(2,6), d = ri(2,5);
    const variants = [
      { tex: `(${a} + ${b}) \\times (${c} - 1)`, val: (a+b)*(c-1) },
      { tex: `${a} \\times (${b} + ${c}) - ${d}`, val: a*(b+c)-d },
      { tex: `(${a} - ${b < a ? b : 1}) \\div ${c > a ? 1 : c} + ${d}`, val: (a - (b < a ? b : 1)) / (c > a ? 1 : c) + d },
      { tex: `${a} + ${b} \\times (${c} - ${d < c ? d : 1})`, val: a + b*(c - (d < c ? d : 1)) }
    ];
    const v = diffCfg(diff, variants);
    if (!Number.isInteger(v.val)) return G['op_parentesis'](diff);
    return {
      question: `Calcula: \\(${v.tex} = ?\\)`,
      answer: String(v.val), type: 'numeric',
      hint: 'Primero resuelve lo que está dentro del paréntesis.',
      solution: `\\(${v.tex} = ${v.val}\\)`,
      topic: 'operaciones'
    };
  };

  G['op_combinada_completa'] = function(diff) {
    const a = ri(2,8), b = ri(2,6), c = ri(2,5), d = ri(1,4);
    const variants = [
      { tex: `${a}^2 - (${b} + ${c}) \\times ${d}`, val: a*a - (b+c)*d },
      { tex: `\\sqrt{${b*b}} + ${a} \\times ${c} - ${d}`, val: b + a*c - d },
      { tex: `${a} + ${b} \\times ${c}^2 \\div ${d === 0 ? 1 : d}`, val: a + b*c*c/(d||1) },
      { tex: `(${a}^2 + ${b}) \\div (${c} - ${d < c ? d : 0})`, val: (a*a + b) / (c - (d < c ? d : 0)) }
    ];
    const v = diffCfg(diff, variants);
    if (!Number.isInteger(v.val) || !isFinite(v.val)) return G['op_combinada_completa'](diff);
    return {
      question: `Resuelve: \\(${v.tex} = ?\\)`,
      answer: String(v.val), type: 'numeric',
      hint: 'PEMDAS: Paréntesis → Exponentes/Raíces → × ÷ → + −',
      solution: `\\(${v.tex} = ${v.val}\\)`,
      topic: 'operaciones'
    };
  };

  G['op_identificar_error'] = function(diff) {
    const a = ri(2,8), b = ri(2,6), c = ri(2,5);
    const correcto = a + b * c;
    const incorrecto = (a + b) * c;
    const opts = shuffle([String(correcto), String(incorrecto), String(a*b+c), String(a+b+c)]).slice(0,4);
    if (!opts.includes(String(correcto))) opts[0] = String(correcto);
    const idx = opts.indexOf(String(correcto));
    return {
      question: `¿Cuál es el resultado correcto de \\(${a} + ${b} \\times ${c}\\)?`,
      answer: String(idx), type: 'multiple-choice', options: opts,
      hint: `La multiplicación se realiza antes que la suma.`,
      solution: `\\(${a} + ${b} \\times ${c} = ${a} + ${b*c} = ${correcto}\\)`,
      topic: 'operaciones'
    };
  };

  MM_TOPIC_GENERATORS['operaciones'] = [
    'op_jerarquia_basica','op_parentesis','op_combinada_completa','op_identificar_error'
  ];

  // ── 4. POTENCIAS ────────────────────────────────────────────────

  G['pot_calcular'] = function(diff) {
    const [bMax, eMax] = diffCfg(diff, [[5,4],[10,5],[20,4],[100,3]]);
    const b = ri(2, bMax), e = ri(2, eMax);
    const val = Math.pow(b, e);
    if (!Number.isInteger(val) || val > 1e9) return G['pot_calcular'](diff);
    return {
      question: `Calcula: \\(${b}^{${e}} = ?\\)`,
      answer: String(val), type: 'numeric',
      hint: `\\(${b}^{${e}}\\) significa multiplicar ${b} por sí mismo ${e} veces.`,
      solution: `\\(${b}^{${e}} = ${Array(e).fill(b).join(' \\times ')} = ${val}\\)`,
      solutionSteps: Array.from({length:e}, (_,i) => `Paso ${i+1}: ${Array(i+2).fill(b).join(' × ')} = ${Math.pow(b,i+2)}`),
      topic: 'potencias'
    };
  };

  G['pot_base_negativa'] = function(diff) {
    const b = ri(2, diffCfg(diff,[5,8,12,20]));
    const e = ri(2, diffCfg(diff,[3,4,5,6]));
    const val = Math.pow(-b, e);
    if (Math.abs(val) > 1e8) return G['pot_base_negativa'](diff);
    return {
      question: `Calcula: \\((-${b})^{${e}} = ?\\)`,
      answer: String(val), type: 'numeric',
      hint: e % 2 === 0 ? 'Base negativa con exponente par → resultado positivo.' : 'Base negativa con exponente impar → resultado negativo.',
      solution: `\\((-${b})^{${e}} = ${val}\\). Exponente ${e % 2 === 0 ? 'par → positivo' : 'impar → negativo'}.`,
      topic: 'potencias'
    };
  };

  G['pot_propiedades'] = function(diff) {
    const b = ri(2, 8), e1 = ri(1, 4), e2 = ri(1, 4);
    const variants = diffCfg(diff, [
      { tex: `${b}^{${e1}} \\times ${b}^{${e2}}`, ans: String(Math.pow(b, e1+e2)), sol: `Base igual, suma exponentes: \\(${b}^{${e1}+${e2}} = ${b}^{${e1+e2}} = ${Math.pow(b,e1+e2)}\\)` },
      { tex: `${b}^{${e1+e2}} \\div ${b}^{${e2}}`, ans: String(Math.pow(b, e1)), sol: `Base igual, resta exponentes: \\(${b}^{${e1+e2}-${e2}} = ${b}^{${e1}} = ${Math.pow(b,e1)}\\)` },
      { tex: `(${b}^{${e1}})^{${e2}}`, ans: String(Math.pow(b, e1*e2)), sol: `Potencia de potencia: \\(${b}^{${e1}\\times${e2}} = ${b}^{${e1*e2}} = ${Math.pow(b,e1*e2)}\\)` },
      { tex: `${b}^{${e1}} \\times ${b}^{${e2}} \\div ${b}^{${e2}}`, ans: String(Math.pow(b, e1)), sol: `\\(${b}^{${e1}+${e2}-${e2}} = ${b}^{${e1}} = ${Math.pow(b,e1)}\\)` }
    ]);
    if (!Number.isInteger(parseFloat(variants.ans)) || parseFloat(variants.ans) > 1e8) return G['pot_propiedades'](diff);
    return {
      question: `Simplifica usando propiedades: \\(${variants.tex} = ?\\)`,
      answer: variants.ans, type: 'numeric',
      hint: 'Recuerda: \\(a^m \\cdot a^n = a^{m+n}\\), \\(a^m \\div a^n = a^{m-n}\\), \\((a^m)^n = a^{m\\cdot n}\\).',
      solution: variants.sol,
      topic: 'potencias'
    };
  };

  G['pot_exponente_cero'] = function(diff) {
    const b = ri(1, diffCfg(diff,[10,100,1000,9999]));
    const opts = ['1', '0', String(b), String(-b)].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4);
    while (opts.length < 4) opts.push(String(ri(2,20)));
    const idx = opts.indexOf('1') !== -1 ? opts.indexOf('1') : 0;
    if (idx === -1) { opts[0] = '1'; }
    return {
      question: `¿Cuánto vale \\(${b}^{0}\\)?`,
      answer: String(opts.indexOf('1')), type: 'multiple-choice', options: opts,
      hint: 'Cualquier número (distinto de cero) elevado a 0 es 1.',
      solution: `\\(${b}^0 = 1\\). Esta es una propiedad fundamental de las potencias.`,
      topic: 'potencias'
    };
  };

  G['pot_notacion_cientifica'] = function(diff) {
    if (['easy','medio'].includes(diff)) return G['pot_calcular'](diff);
    const coef = rf(1, 9.9, 1);
    const exp = ri(3, 8);
    const val = coef * Math.pow(10, exp);
    return {
      question: `Expresa \\(${coef} \\times 10^{${exp}}\\) como número entero (sin potencias).`,
      answer: String(Math.round(val)),
      type: 'numeric',
      hint: `Multiplica ${coef} por \\(10^{${exp}}\\) moviendo la coma decimal ${exp} lugares a la derecha.`,
      solution: `\\(${coef} \\times 10^{${exp}} = ${Math.round(val).toLocaleString('es-CL')}\\)`,
      topic: 'potencias'
    };
  };

  MM_TOPIC_GENERATORS['potencias'] = [
    'pot_calcular','pot_base_negativa','pot_propiedades','pot_exponente_cero','pot_notacion_cientifica'
  ];

  // ── 5. RAÍCES ───────────────────────────────────────────────────

  G['raiz_cuadrada_exacta'] = function(diff) {
    const maxBase = diffCfg(diff, [12, 20, 30, 50]);
    const b = ri(2, maxBase);
    const n = b * b;
    return {
      question: `Calcula: \\(\\sqrt{${n}} = ?\\)`,
      answer: String(b), type: 'numeric',
      hint: `¿Qué número multiplicado por sí mismo da ${n}?`,
      solution: `\\(\\sqrt{${n}} = ${b}\\) porque \\(${b}^2 = ${n}\\)`,
      topic: 'raices'
    };
  };

  G['raiz_cubica'] = function(diff) {
    const maxBase = diffCfg(diff, [5, 8, 12, 20]);
    const b = ri(2, maxBase);
    const n = b * b * b;
    return {
      question: `Calcula: \\(\\sqrt[3]{${n}} = ?\\)`,
      answer: String(b), type: 'numeric',
      hint: `¿Qué número elevado al cubo da ${n}?`,
      solution: `\\(\\sqrt[3]{${n}} = ${b}\\) porque \\(${b}^3 = ${n}\\)`,
      topic: 'raices'
    };
  };

  G['raiz_simplificar'] = function(diff) {
    if (['easy'].includes(diff)) return G['raiz_cuadrada_exacta'](diff);
    const a = ri(2, 8), k = ri(2, 6);
    const n = a * a * k;
    return {
      question: `Simplifica: \\(\\sqrt{${n}}\\) (deja en forma \\(a\\sqrt{b}\\) con \\(b\\) sin cuadrados perfectos)`,
      answer: `${a}√${k}`,
      type: 'numeric',
      hint: `Factoriza ${n} buscando cuadrados perfectos: \\(${n} = ${a*a} \\times ${k}\\).`,
      solution: `\\(\\sqrt{${n}} = \\sqrt{${a*a} \\cdot ${k}} = ${a}\\sqrt{${k}}\\)`,
      solutionSteps: [
        `Factorizo: \\(${n} = ${a}^2 \\times ${k}\\)`,
        `Aplico propiedad: \\(\\sqrt{${a*a} \\cdot ${k}} = \\sqrt{${a*a}} \\cdot \\sqrt{${k}}\\)`,
        `Resultado: \\(${a}\\sqrt{${k}}\\)`
      ],
      topic: 'raices'
    };
  };

  G['raiz_comparar'] = function(diff) {
    const a = ri(2, diffCfg(diff,[5,10,15,25]));
    const b = ri(a+1, a+diffCfg(diff,[3,5,8,15]));
    const opts = [String(b), String(a), `${b-1}`, `${a+b}`];
    const shuffled = shuffle(opts.filter((v,i,arr)=>arr.indexOf(v)===i));
    const idx = shuffled.indexOf(String(b));
    return {
      question: `¿Cuál es mayor: \\(\\sqrt{${b*b}}\\) o \\(\\sqrt{${a*a}}\\)? Escribe el mayor valor.`,
      answer: String(b), type: 'numeric',
      hint: `Calcula cada raíz y compara.`,
      solution: `\\(\\sqrt{${b*b}} = ${b}\\) y \\(\\sqrt{${a*a}} = ${a}\\). El mayor es ${b}.`,
      topic: 'raices'
    };
  };

  G['raiz_irracionales'] = function(diff) {
    if (['easy','medio'].includes(diff)) return G['raiz_cuadrada_exacta'](diff);
    const nonSquares = [2,3,5,6,7,8,10,11,12,13,14,15];
    const n = pick(nonSquares);
    const approx = Math.sqrt(n).toFixed(2);
    const opts = [approx, String(Math.round(Math.sqrt(n))), String(Math.floor(Math.sqrt(n))), `${Math.ceil(Math.sqrt(n))}.00`];
    const shuffled = shuffle([...new Set(opts)]).slice(0,4);
    if (!shuffled.includes(approx)) shuffled[0] = approx;
    const idx = shuffled.indexOf(approx);
    return {
      question: `¿Aproximadamente cuánto vale \\(\\sqrt{${n}}\\)? (2 decimales)`,
      answer: String(idx), type: 'multiple-choice', options: shuffled,
      hint: `\\(\\sqrt{${n}}\\) está entre \\(${Math.floor(Math.sqrt(n))}\\) y \\(${Math.ceil(Math.sqrt(n))}\\).`,
      solution: `\\(\\sqrt{${n}} \\approx ${approx}\\)`,
      topic: 'raices'
    };
  };

  MM_TOPIC_GENERATORS['raices'] = [
    'raiz_cuadrada_exacta','raiz_cubica','raiz_simplificar','raiz_comparar','raiz_irracionales'
  ];

  // ── 6. DIVISIBILIDAD ────────────────────────────────────────────

  G['div_criterio'] = function(diff) {
    const divisores = diffCfg(diff, [[2,3,5],[2,3,5,9,10],[2,3,4,5,6,8,9,10],[2,3,4,5,6,7,8,9,10,11]]);
    const d = pick(divisores);
    const multiple = d * ri(10, diffCfg(diff,[99,999,9999,99999]));
    const noMultiple = multiple + pick([1,2,3,4,5].filter(x=>x!==d&&x!==0));
    const isDiv = pick([true, false]);
    const n = isDiv ? multiple : noMultiple;
    return {
      question: `¿Es \\(${n.toLocaleString('es-CL')}\\) divisible entre \\(${d}\\)?`,
      answer: isDiv ? '0' : '1', type: 'multiple-choice',
      options: ['Sí', 'No'],
      hint: d === 2 ? 'Un número es divisible por 2 si termina en cifra par.'
          : d === 3 ? 'Un número es divisible por 3 si la suma de sus dígitos es múltiplo de 3.'
          : d === 5 ? 'Un número es divisible por 5 si termina en 0 o 5.'
          : d === 9 ? 'Un número es divisible por 9 si la suma de sus dígitos es múltiplo de 9.'
          : d === 10 ? 'Un número es divisible por 10 si termina en 0.'
          : `Prueba dividir ${n} ÷ ${d}.`,
      solution: `\\(${n} ÷ ${d} = ${n/d}\\) → ${isDiv ? `Sí, es divisible (exacto)` : `No, queda resto ${n % d}`}.`,
      topic: 'divisibilidad'
    };
  };

  G['div_primo'] = function(diff) {
    const max = diffCfg(diff, [20, 50, 100, 200]);
    const n = ri(2, max);
    const isPrime = PRIMES_100.includes(n) || (n > 100 && (() => {
      for (let i=2; i<=Math.sqrt(n); i++) if(n%i===0) return false;
      return true;
    })());
    return {
      question: `¿Es \\(${n}\\) un número primo?`,
      answer: isPrime ? '0' : '1', type: 'multiple-choice',
      options: ['Sí, es primo', 'No, es compuesto'],
      hint: 'Un número primo tiene exactamente 2 divisores: 1 y él mismo.',
      solution: isPrime
        ? `\\(${n}\\) es primo. Sus únicos divisores son 1 y ${n}.`
        : `\\(${n}\\) no es primo. Por ejemplo, ${n} ÷ ${(() => { for(let i=2;i<=n;i++) if(n%i===0) return i; })() || 2} es exacto.`,
      topic: 'divisibilidad'
    };
  };

  G['div_factorizar'] = function(diff) {
    const primes = [2,3,5,7,11,13];
    const p1 = pick(primes), p2 = pick(primes);
    const p3 = diffCfg(diff, [null, null, pick(primes), pick(primes)]);
    const n = p3 ? p1 * p2 * p3 : p1 * p2;
    if (n > 10000) return G['div_factorizar'](diff);
    const factors = [];
    let tmp = n;
    for (const p of [2,3,5,7,11,13,17,19]) { while (tmp%p===0) { factors.push(p); tmp/=p; } }
    if (tmp > 1) factors.push(tmp);
    const ansStr = factors.join(' × ');
    return {
      question: `Descompón \\(${n}\\) en factores primos. ¿Cuántos factores primos tiene (contando repetidos)?`,
      answer: String(factors.length), type: 'numeric',
      hint: `Divide ${n} sucesivamente entre números primos: 2, 3, 5, 7, …`,
      solution: `\\(${n} = ${factors.join(' \\times ')}\\). Total: ${factors.length} factores.`,
      solutionSteps: factors.map((f,i,arr) => `÷${f} → ${arr.slice(i+1).reduce((a,b)=>a*b, 1)}`),
      topic: 'divisibilidad'
    };
  };

  G['div_multiplos'] = function(diff) {
    const d = ri(2, diffCfg(diff,[9,15,25,50]));
    const start = ri(1, 10) * d;
    const count = ri(3, 6);
    const sequence = Array.from({length:count}, (_,i) => start + i*d);
    const next = sequence[sequence.length - 1] + d;
    return {
      question: `Los primeros ${count} múltiplos de \\(${d}\\) son: \\(${sequence.join(', ')}\\). ¿Cuál sería el siguiente?`,
      answer: String(next), type: 'numeric',
      hint: `Cada múltiplo es ${d} más que el anterior.`,
      solution: `\\(${sequence[sequence.length-1]} + ${d} = ${next}\\)`,
      topic: 'divisibilidad'
    };
  };

  MM_TOPIC_GENERATORS['divisibilidad'] = [
    'div_criterio','div_primo','div_factorizar','div_multiplos'
  ];

  // ── 7. MCD (MÁXIMO COMÚN DIVISOR) ──────────────────────────────

  G['mcd_calcular'] = function(diff) {
    const [aMax, bMax] = diffCfg(diff, [[20,20],[100,100],[500,500],[9999,9999]]);
    const g = ri(2, Math.floor(aMax/3));
    const a = g * ri(2, Math.floor(aMax/g)), b = g * ri(2, Math.floor(bMax/g));
    const result = gcd(a, b);
    return {
      question: `Calcula el MCD de \\(${a}\\) y \\(${b}\\).`,
      answer: String(result), type: 'numeric',
      hint: 'Usa el algoritmo de Euclides: divide el mayor entre el menor y repite con el resto.',
      solution: `MCD(${a}, ${b}) = ${result}`,
      solutionSteps: (() => {
        const steps = []; let x = Math.max(a,b), y = Math.min(a,b);
        while (y) { steps.push(`${x} = ${Math.floor(x/y)} × ${y} + ${x%y}`); [x,y] = [y, x%y]; }
        steps.push(`MCD = ${result}`);
        return steps;
      })(),
      topic: 'mcd'
    };
  };

  G['mcd_tres_numeros'] = function(diff) {
    if (diff === 'easy') return G['mcd_calcular']('easy');
    const g = ri(2, 10);
    const a = g * ri(2,8), b = g * ri(2,8), c = g * ri(2,8);
    const result = gcd(gcd(a,b), c);
    return {
      question: `Calcula el MCD de \\(${a}\\), \\(${b}\\) y \\(${c}\\).`,
      answer: String(result), type: 'numeric',
      hint: 'Calcula primero MCD(a, b) y luego MCD del resultado con c.',
      solution: `MCD(${a},${b},${c}) = MCD(MCD(${a},${b}), ${c}) = MCD(${gcd(a,b)}, ${c}) = ${result}`,
      topic: 'mcd'
    };
  };

  G['mcd_aplicacion'] = function(diff) {
    const g = ri(2, diffCfg(diff,[6,12,20,40]));
    const a = g * ri(2, 8), b = g * ri(2, 8);
    const result = gcd(a, b);
    const contexts = [
      { q: `Tienes \\(${a}\\) manzanas y \\(${b}\\) naranjas. Quieres hacer grupos iguales con el mayor número posible de frutas. ¿Cuántas frutas habrá en cada grupo?`, ans: result },
      { q: `Dos correas de \\(${a}\\) cm y \\(${b}\\) cm deben cortarse en trozos iguales del mayor tamaño posible sin desperdiciar. ¿De qué largo son los trozos?`, ans: result }
    ];
    const ctx = pick(contexts);
    return {
      question: ctx.q,
      answer: String(ctx.ans), type: 'numeric',
      hint: `Calcula el MCD(${a}, ${b}).`,
      solution: `MCD(${a}, ${b}) = ${result}. Cada grupo/trozo tendrá ${result} frutas/cm.`,
      topic: 'mcd'
    };
  };

  MM_TOPIC_GENERATORS['mcd'] = ['mcd_calcular','mcd_tres_numeros','mcd_aplicacion'];

  // ── 8. MCM (MÍNIMO COMÚN MÚLTIPLO) ─────────────────────────────

  G['mcm_calcular'] = function(diff) {
    const [aMax, bMax] = diffCfg(diff, [[8,8],[15,15],[50,50],[100,100]]);
    const a = ri(2, aMax), b = ri(2, bMax);
    if (a === b) return G['mcm_calcular'](diff);
    const result = lcm(a, b);
    if (result > 10000) return G['mcm_calcular'](diff);
    return {
      question: `Calcula el MCM de \\(${a}\\) y \\(${b}\\).`,
      answer: String(result), type: 'numeric',
      hint: `MCM(a,b) = (a × b) ÷ MCD(a,b). También puedes listar múltiplos de ambos.`,
      solution: `MCM(${a}, ${b}) = ${a} × ${b} ÷ MCD(${a},${b}) = ${a*b} ÷ ${gcd(a,b)} = ${result}`,
      topic: 'mcm'
    };
  };

  G['mcm_aplicacion_semaforos'] = function(diff) {
    const a = pick([2,3,4,5,6,8,10,12,15,20,24,30]);
    const b = pick([2,3,4,5,6,8,10,12,15,20,24,30].filter(x=>x!==a));
    const result = lcm(a, b);
    if (result > 3600) return G['mcm_aplicacion_semaforos'](diff);
    const contexts = [
      `Dos autobuses parten de la misma parada. El primero sale cada \\(${a}\\) minutos y el segundo cada \\(${b}\\) minutos. ¿Cada cuántos minutos coinciden en la parada?`,
      `Una lámpara parpadea cada \\(${a}\\) segundos y otra cada \\(${b}\\) segundos. Si parten juntas, ¿cuántos segundos pasan hasta que vuelven a parpadear al mismo tiempo?`
    ];
    return {
      question: pick(contexts),
      answer: String(result), type: 'numeric',
      hint: `Calcula el MCM(${a}, ${b}).`,
      solution: `MCM(${a}, ${b}) = ${result}. Coinciden cada ${result} ${diff==='easy'?'minutos':'unidades de tiempo'}.`,
      topic: 'mcm'
    };
  };

  G['mcm_tres_numeros'] = function(diff) {
    if (diff === 'easy') return G['mcm_calcular']('easy');
    const a = ri(2,10), b = ri(2,10), c = ri(2,10);
    const result = lcm(lcm(a,b), c);
    if (result > 10000) return G['mcm_tres_numeros'](diff);
    return {
      question: `Calcula el MCM de \\(${a}\\), \\(${b}\\) y \\(${c}\\).`,
      answer: String(result), type: 'numeric',
      hint: 'Calcula MCM(a,b) primero y luego MCM del resultado con c.',
      solution: `MCM(${a},${b},${c}) = MCM(MCM(${a},${b}), ${c}) = MCM(${lcm(a,b)}, ${c}) = ${result}`,
      topic: 'mcm'
    };
  };

  MM_TOPIC_GENERATORS['mcm'] = ['mcm_calcular','mcm_aplicacion_semaforos','mcm_tres_numeros'];

  // ── 9. FRACCIONES ───────────────────────────────────────────────

  G['frac_simplificar'] = function(diff) {
    const g = ri(2, diffCfg(diff,[5,10,20,50]));
    const n = ri(1,8) * g, d = ri(2,10) * g;
    if (gcd(n,d) === 1) return G['frac_simplificar'](diff);
    const g2 = gcd(n,d);
    const nr = n/g2, dr = d/g2;
    return {
      question: `Simplifica la fracción \\(\\dfrac{${n}}{${d}}\\).`,
      answer: `${nr}/${dr}`, type: 'numeric',
      hint: `Divide numerador y denominador por su MCD. MCD(${n},${d}) = ${g2}.`,
      solution: `\\(\\dfrac{${n}}{${d}} = \\dfrac{${n}÷${g2}}{${d}÷${g2}} = \\dfrac{${nr}}{${dr}}\\)`,
      topic: 'fracciones'
    };
  };

  G['frac_sumar'] = function(diff) {
    const d1 = ri(2, diffCfg(diff,[6,12,20,30]));
    const d2 = ri(2, diffCfg(diff,[6,12,20,30]));
    const n1 = ri(1, d1-1), n2 = ri(1, d2-1);
    const denom = lcm(d1, d2);
    const numTotal = n1*(denom/d1) + n2*(denom/d2);
    const g = gcd(numTotal, denom);
    const nr = numTotal/g, dr = denom/g;
    return {
      question: `Calcula: \\(\\dfrac{${n1}}{${d1}} + \\dfrac{${n2}}{${d2}} = ?\\)\n(Simplifica el resultado)`,
      answer: `${nr}/${dr}`, type: 'numeric',
      hint: `MCM(${d1},${d2}) = ${denom}. Expresa ambas fracciones con ese denominador.`,
      solution: `\\(\\dfrac{${n1}}{${d1}} + \\dfrac{${n2}}{${d2}} = \\dfrac{${n1*(denom/d1)}+${n2*(denom/d2)}}{${denom}} = \\dfrac{${numTotal}}{${denom}} = \\dfrac{${nr}}{${dr}}\\)`,
      topic: 'fracciones'
    };
  };

  G['frac_restar'] = function(diff) {
    const d1 = ri(2, diffCfg(diff,[6,12,20,30]));
    const d2 = ri(2, diffCfg(diff,[6,12,20,30]));
    const n1 = ri(2, d1), n2 = ri(1, d2-1);
    const denom = lcm(d1, d2);
    const numTotal = n1*(denom/d1) - n2*(denom/d2);
    if (numTotal <= 0) return G['frac_restar'](diff);
    const g = gcd(numTotal, denom);
    const nr = numTotal/g, dr = denom/g;
    return {
      question: `Calcula: \\(\\dfrac{${n1}}{${d1}} - \\dfrac{${n2}}{${d2}} = ?\\)\n(Simplifica el resultado)`,
      answer: `${nr}/${dr}`, type: 'numeric',
      hint: `MCM(${d1},${d2}) = ${denom}. Iguala denominadores antes de restar.`,
      solution: `\\(\\dfrac{${n1}}{${d1}} - \\dfrac{${n2}}{${d2}} = \\dfrac{${n1*(denom/d1)}-${n2*(denom/d2)}}{${denom}} = \\dfrac{${numTotal}}{${denom}} = \\dfrac{${nr}}{${dr}}\\)`,
      topic: 'fracciones'
    };
  };

  G['frac_multiplicar'] = function(diff) {
    const a = ri(1, diffCfg(diff,[5,8,12,20])), b = ri(2, diffCfg(diff,[5,8,12,20]));
    const c = ri(1, diffCfg(diff,[5,8,12,20])), d = ri(2, diffCfg(diff,[5,8,12,20]));
    const nr = a*c, dr = b*d;
    const g = gcd(nr, dr);
    return {
      question: `Calcula: \\(\\dfrac{${a}}{${b}} \\times \\dfrac{${c}}{${d}} = ?\\) (Simplifica)`,
      answer: `${nr/g}/${dr/g}`, type: 'numeric',
      hint: 'Multiplica numeradores entre sí y denominadores entre sí.',
      solution: `\\(\\dfrac{${a}}{${b}} \\times \\dfrac{${c}}{${d}} = \\dfrac{${a}\\times${c}}{${b}\\times${d}} = \\dfrac{${nr}}{${dr}} = \\dfrac{${nr/g}}{${dr/g}}\\)`,
      topic: 'fracciones'
    };
  };

  G['frac_dividir'] = function(diff) {
    const a = ri(1, diffCfg(diff,[5,8,12,20])), b = ri(2, diffCfg(diff,[5,8,12,20]));
    const c = ri(1, diffCfg(diff,[5,8,12,20])), d = ri(2, diffCfg(diff,[5,8,12,20]));
    const nr = a*d, dr = b*c;
    const g = gcd(nr, dr);
    return {
      question: `Calcula: \\(\\dfrac{${a}}{${b}} \\div \\dfrac{${c}}{${d}} = ?\\) (Simplifica)`,
      answer: `${nr/g}/${dr/g}`, type: 'numeric',
      hint: `Dividing fractions: \\(\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}\\)`,
      solution: `\\(\\dfrac{${a}}{${b}} \\div \\dfrac{${c}}{${d}} = \\dfrac{${a}}{${b}} \\times \\dfrac{${d}}{${c}} = \\dfrac{${nr}}{${dr}} = \\dfrac{${nr/g}}{${dr/g}}\\)`,
      topic: 'fracciones'
    };
  };

  G['frac_comparar'] = function(diff) {
    const d = ri(3, diffCfg(diff,[8,12,20,30]));
    const n1 = ri(1, d-1), n2 = ri(1, d-1);
    if (n1 === n2) return G['frac_comparar'](diff);
    const mayor = n1 > n2 ? `${n1}/${d}` : `${n2}/${d}`;
    const opts = shuffle([`${n1}/${d}`, `${n2}/${d}`, `${n1+1}/${d}`, `${n2+1}/${d}`].filter((v,i,a)=>a.indexOf(v)===i)).slice(0,4);
    if (!opts.includes(mayor)) opts[0] = mayor;
    const idx = opts.indexOf(mayor);
    return {
      question: `¿Cuál fracción es mayor: \\(\\dfrac{${n1}}{${d}}\\) o \\(\\dfrac{${n2}}{${d}}\\)?`,
      answer: String(idx), type: 'multiple-choice', options: opts.map(o=>`\\(${o.replace('/',`/`)}\\)`),
      hint: 'Con el mismo denominador, la mayor es la que tiene mayor numerador.',
      solution: `\\(\\dfrac{${Math.max(n1,n2)}}{${d}} > \\dfrac{${Math.min(n1,n2)}}{${d}}\\) porque ${Math.max(n1,n2)} > ${Math.min(n1,n2)}.`,
      topic: 'fracciones'
    };
  };

  G['frac_de_cantidad'] = function(diff) {
    const d = ri(2, diffCfg(diff,[5,8,12,15]));
    const n = ri(1, d-1);
    const total = d * ri(2, diffCfg(diff,[10,20,50,100]));
    const result = (n/d) * total;
    return {
      question: `Calcula \\(\\dfrac{${n}}{${d}}\\) de \\(${total}\\).`,
      answer: String(result), type: 'numeric',
      hint: `Multiplica: \\(${total} \\times \\dfrac{${n}}{${d}} = \\dfrac{${total} \\times ${n}}{${d}}\\)`,
      solution: `\\(\\dfrac{${n}}{${d}} \\times ${total} = \\dfrac{${n*total}}{${d}} = ${result}\\)`,
      topic: 'fracciones'
    };
  };

  MM_TOPIC_GENERATORS['fracciones'] = [
    'frac_simplificar','frac_sumar','frac_restar','frac_multiplicar',
    'frac_dividir','frac_comparar','frac_de_cantidad'
  ];

  // ── 10. DECIMALES ───────────────────────────────────────────────

  G['dec_valor_posicional'] = function(diff) {
    const decimals = diffCfg(diff, [1, 2, 3, 4]);
    const n = parseFloat((ri(1,99) + Math.random()).toFixed(decimals));
    const places = ['décimas','centésimas','milésimas','diezmilésimas'];
    const place = places[ri(0, decimals-1)];
    const placeIdx = places.indexOf(place);
    const digits = String(n).split('.')[1] || '0000';
    const digit = parseInt(digits[placeIdx]) || 0;
    return {
      question: `En el número \\(${n}\\), ¿cuál es el dígito en la posición de las <strong>${place}</strong>?`,
      answer: String(digit), type: 'numeric',
      hint: `Las ${place} están en la posición ${placeIdx+1} después de la coma decimal.`,
      solution: `En \\(${n}\\), el dígito en las ${place} es \\(${digit}\\).`,
      topic: 'decimales'
    };
  };

  G['dec_sumar'] = function(diff) {
    const dec = diffCfg(diff, [1, 2, 3, 3]);
    const a = rf(0.1, 99, dec), b = rf(0.1, 99, dec);
    const result = parseFloat((a + b).toFixed(dec));
    return {
      question: `Calcula: \\(${a} + ${b} = ?\\)`,
      answer: String(result), type: 'numeric',
      hint: 'Alinea las comas decimales y suma normalmente.',
      solution: `\\(${a} + ${b} = ${result}\\)`,
      topic: 'decimales'
    };
  };

  G['dec_restar'] = function(diff) {
    const dec = diffCfg(diff, [1, 2, 3, 3]);
    const b = rf(0.1, 50, dec), a = rf(b+0.1, 99, dec);
    const result = parseFloat((a - b).toFixed(dec));
    return {
      question: `Calcula: \\(${a} - ${b} = ?\\)`,
      answer: String(result), type: 'numeric',
      hint: 'Alinea las comas decimales y resta normalmente.',
      solution: `\\(${a} - ${b} = ${result}\\)`,
      topic: 'decimales'
    };
  };

  G['dec_multiplicar'] = function(diff) {
    const dec = diffCfg(diff, [1, 2, 2, 3]);
    const a = rf(0.1, 20, dec), b = ri(2, diffCfg(diff,[5,15,50,100]));
    const result = parseFloat((a * b).toFixed(dec));
    return {
      question: `Calcula: \\(${a} \\times ${b} = ?\\)`,
      answer: String(result), type: 'numeric',
      hint: `Multiplica ignorando la coma, luego coloca ${dec} decimales en el resultado.`,
      solution: `\\(${a} \\times ${b} = ${result}\\)`,
      topic: 'decimales'
    };
  };

  G['dec_dividir'] = function(diff) {
    const dec = diffCfg(diff, [1, 2, 2, 3]);
    const b = ri(2, diffCfg(diff,[5,12,25,50]));
    const q = rf(0.1, 20, dec);
    const a = parseFloat((q * b).toFixed(dec+1));
    const result = parseFloat((a / b).toFixed(dec));
    return {
      question: `Calcula: \\(${a} \\div ${b} = ?\\)`,
      answer: String(result), type: 'numeric',
      hint: `Divide normalmente y coloca la coma en el resultado.`,
      solution: `\\(${a} \\div ${b} = ${result}\\)`,
      topic: 'decimales'
    };
  };

  G['dec_frac_conversion'] = function(diff) {
    const conversions = [
      { frac: '1/2', dec: '0.5' }, { frac: '1/4', dec: '0.25' }, { frac: '3/4', dec: '0.75' },
      { frac: '1/5', dec: '0.2' }, { frac: '2/5', dec: '0.4' }, { frac: '3/5', dec: '0.6' },
      { frac: '1/8', dec: '0.125' }, { frac: '1/10', dec: '0.1' }, { frac: '3/10', dec: '0.3' },
      { frac: '1/3', dec: '0.333' }, { frac: '2/3', dec: '0.667' }
    ];
    const conv = pick(diffCfg(diff, [
      conversions.slice(0,4), conversions.slice(0,6), conversions.slice(0,9), conversions
    ]));
    const toFrac = pick([true, false]);
    return {
      question: toFrac
        ? `Convierte \\(${conv.dec}\\) a fracción simplificada.`
        : `Convierte \\(\\dfrac{${conv.frac.replace('/','{')}}${conv.frac.includes('/')?'}':''}\\) a decimal.`,
      answer: toFrac ? conv.frac : conv.dec,
      type: 'numeric',
      hint: toFrac ? 'Escribe el decimal como fracción con el denominador correspondiente (10, 100, etc.) y simplifica.'
                   : `Divide el numerador entre el denominador: ${conv.frac}.`,
      solution: toFrac ? `${conv.dec} = ${conv.frac}` : `${conv.frac} = ${conv.dec}`,
      topic: 'decimales'
    };
  };

  MM_TOPIC_GENERATORS['decimales'] = [
    'dec_valor_posicional','dec_sumar','dec_restar','dec_multiplicar','dec_dividir','dec_frac_conversion'
  ];

  // ── 11. RAZONES ─────────────────────────────────────────────────

  G['razon_simplificar'] = function(diff) {
    const g = ri(2, diffCfg(diff,[5,10,20,40]));
    const a = ri(1,6)*g, b = ri(1,6)*g;
    const gc = gcd(a,b);
    return {
      question: `Simplifica la razón \\(${a} : ${b}\\).`,
      answer: `${a/gc}:${b/gc}`, type: 'numeric',
      hint: `Divide ambos términos por su MCD. MCD(${a},${b}) = ${gc}.`,
      solution: `\\(${a} : ${b} = ${a/gc} : ${b/gc}\\)`,
      topic: 'razones'
    };
  };

  G['razon_calcular'] = function(diff) {
    const a = ri(1, diffCfg(diff,[10,20,50,100]));
    const b = ri(1, diffCfg(diff,[10,20,50,100]));
    const gc = gcd(a,b);
    const tipos = ['a:b', 'b:a'];
    const t = pick(tipos);
    const [num, den] = t === 'a:b' ? [a,b] : [b,a];
    const nr = num/gc, dr = den/gc;
    return {
      question: `Si hay \\(${a}\\) niñas y \\(${b}\\) niños en una clase, ¿cuál es la razón ${t==='a:b'?'niñas':'niños'} a ${t==='a:b'?'niños':'niñas'} simplificada?`,
      answer: `${nr}:${dr}`, type: 'numeric',
      hint: `Forma la razón y simplifica dividiendo por MCD(${num},${den}) = ${gc}.`,
      solution: `Razón = \\(${num} : ${den} = ${nr} : ${dr}\\)`,
      topic: 'razones'
    };
  };

  G['razon_faltante'] = function(diff) {
    const a = ri(1, diffCfg(diff,[6,10,20,30]));
    const b = ri(1, diffCfg(diff,[6,10,20,30]));
    const k = ri(2, diffCfg(diff,[4,8,15,30]));
    const ask = pick(['a', 'b']);
    if (ask === 'b') {
      return {
        question: `Si la razón es \\(${a} : ${b}\\) y el primer término es \\(${a*k}\\), ¿cuál es el segundo término?`,
        answer: String(b*k), type: 'numeric',
        hint: `Multiplica el segundo término por el mismo factor que el primero: × ${k}.`,
        solution: `Factor: ${k}. Segundo término: \\(${b} \\times ${k} = ${b*k}\\)`,
        topic: 'razones'
      };
    } else {
      return {
        question: `Si la razón es \\(${a} : ${b}\\) y el segundo término es \\(${b*k}\\), ¿cuál es el primer término?`,
        answer: String(a*k), type: 'numeric',
        hint: `Calcula el factor: ${b*k} ÷ ${b} = ${k}. Luego multiplica el primer término.`,
        solution: `Factor: ${b*k}÷${b}=${k}. Primer término: \\(${a} \\times ${k} = ${a*k}\\)`,
        topic: 'razones'
      };
    }
  };

  MM_TOPIC_GENERATORS['razones'] = ['razon_simplificar','razon_calcular','razon_faltante'];

  // ── 12. PROPORCIONES ────────────────────────────────────────────

  G['prop_cuarto_proporcional'] = function(diff) {
    const a = ri(1, diffCfg(diff,[6,12,20,50]));
    const b = ri(1, diffCfg(diff,[6,12,20,50]));
    const c = ri(1, diffCfg(diff,[6,12,20,50])) * (a % gcd(a,b) === 0 ? 1 : gcd(a,b));
    const d = (b * c) / a;
    if (!Number.isInteger(d) || d <= 0) return G['prop_cuarto_proporcional'](diff);
    const ask = pick(['a','b','c','d']);
    const vals = { a, b, c, d };
    const askVal = vals[ask];
    const remaining = Object.entries(vals).filter(([k])=>k!==ask);
    return {
      question: `En la proporción \\(${ask==='a'?'?':a} : ${ask==='b'?'?':b} = ${ask==='c'?'?':c} : ${ask==='d'?'?':d}\\), halla el valor desconocido.`,
      answer: String(askVal), type: 'numeric',
      hint: 'En una proporción: producto de extremos = producto de medios.',
      solution: `\\(${a} \\times ${d} = ${b} \\times ${c}\\) → \\(${a*d} = ${b*c}\\) → El valor buscado es ${askVal}.`,
      topic: 'proporciones'
    };
  };

  G['prop_directa'] = function(diff) {
    const precio = ri(2, diffCfg(diff,[10,20,50,100]));
    const cant1 = ri(2, diffCfg(diff,[5,10,20,50]));
    const cant2 = ri(1, diffCfg(diff,[5,10,20,50]));
    const total1 = precio * cant1;
    const total2 = precio * cant2;
    return {
      question: `Si \\(${cant1}\\) cuadernos cuestan \\(\\$${total1}\\), ¿cuánto cuestan \\(${cant2}\\) cuadernos?`,
      answer: String(total2), type: 'numeric',
      hint: `Precio unitario: ${total1} ÷ ${cant1} = ${precio}. Luego multiplica por ${cant2}.`,
      solution: `Precio unitario: \\(${total1} ÷ ${cant1} = ${precio}\\). Total: \\(${precio} \\times ${cant2} = ${total2}\\).`,
      topic: 'proporciones'
    };
  };

  G['prop_inversa'] = function(diff) {
    if (diff === 'easy') return G['prop_directa']('easy');
    const obreros1 = ri(2, diffCfg(diff,[5,8,12,20]));
    const dias1 = ri(2, diffCfg(diff,[5,10,15,30]));
    const obreros2 = ri(2, diffCfg(diff,[5,8,12,20]));
    const dias2 = (obreros1 * dias1) / obreros2;
    if (!Number.isInteger(dias2) || dias2 <= 0) return G['prop_inversa'](diff);
    return {
      question: `Si \\(${obreros1}\\) obreros terminan una obra en \\(${dias1}\\) días, ¿cuántos días tardarán \\(${obreros2}\\) obreros?`,
      answer: String(dias2), type: 'numeric',
      hint: 'Proporción inversa: al aumentar los obreros, disminuyen los días. k = obreros × días.',
      solution: `\\(${obreros1} \\times ${dias1} = ${obreros2} \\times x\\) → \\(x = \\dfrac{${obreros1 * dias1}}{${obreros2}} = ${dias2}\\)`,
      topic: 'proporciones'
    };
  };

  MM_TOPIC_GENERATORS['proporciones'] = ['prop_cuarto_proporcional','prop_directa','prop_inversa'];

  // ── 13. PORCENTAJES ─────────────────────────────────────────────

  G['porc_calcular'] = function(diff) {
    const pcts = diffCfg(diff, [[5,10,20,25,50],[5,10,12,15,20,25,30,40,50,75],[1,2,5,10,12,15,20,25,30,33,40,50,60,75],[1,2,3,5,7,10,12,15,17,20,22,25,30,33,37,40,45,50,55,60,66,75,80,90]]);
    const pct = pick(pcts);
    const total = ri(2, diffCfg(diff,[20,100,500,1000])) * (100/gcd(pct,100));
    const result = (pct/100) * total;
    if (!Number.isInteger(result)) return G['porc_calcular'](diff);
    return {
      question: `Calcula el \\(${pct}\\%\\) de \\(${total}\\).`,
      answer: String(result), type: 'numeric',
      hint: `\\(${pct}\\% = \\dfrac{${pct}}{100}\\). Multiplica: \\(${total} \\times \\dfrac{${pct}}{100}\\).`,
      solution: `\\(${total} \\times \\dfrac{${pct}}{100} = \\dfrac{${total*pct}}{100} = ${result}\\)`,
      topic: 'porcentajes'
    };
  };

  G['porc_que_porcentaje'] = function(diff) {
    const total = ri(2, diffCfg(diff,[10,50,200,500])) * 10;
    const part = ri(1, total-1);
    const pct = parseFloat(((part/total)*100).toFixed(1));
    return {
      question: `¿Qué porcentaje representa \\(${part}\\) de \\(${total}\\)?`,
      answer: String(pct), type: 'numeric',
      hint: `Fórmula: \\(\\dfrac{\\text{parte}}{\\text{total}} \\times 100\\)`,
      solution: `\\(\\dfrac{${part}}{${total}} \\times 100 = ${pct}\\%\\)`,
      topic: 'porcentajes'
    };
  };

  G['porc_descuento'] = function(diff) {
    const pct = pick([5,10,15,20,25,30,40,50]);
    const precio = ri(2, diffCfg(diff,[20,50,200,1000])) * (100/gcd(pct,100));
    const descuento = (pct/100) * precio;
    const final = precio - descuento;
    return {
      question: `Un artículo cuesta \\(\\$${precio}\\) y tiene un descuento del \\(${pct}\\%\\). ¿Cuánto se paga?`,
      answer: String(final), type: 'numeric',
      hint: `Descuento = \\(${precio} \\times \\dfrac{${pct}}{100} = ${descuento}\\). Precio final = precio − descuento.`,
      solution: `Descuento: \\(${descuento}\\). Precio final: \\(${precio} - ${descuento} = ${final}\\)`,
      topic: 'porcentajes'
    };
  };

  G['porc_aumento'] = function(diff) {
    const pct = pick([5,10,12,15,20,25,30,50]);
    const base = ri(2, diffCfg(diff,[20,50,200,500])) * (100/gcd(pct,100));
    const aumento = (pct/100) * base;
    const final = base + aumento;
    return {
      question: `Un sueldo de \\(\\$${base}\\) tiene un aumento del \\(${pct}\\%\\). ¿Cuánto será el nuevo sueldo?`,
      answer: String(final), type: 'numeric',
      hint: `Aumento = base × ${pct}/100. Nuevo = base + aumento.`,
      solution: `Aumento: \\(${aumento}\\). Nuevo sueldo: \\(${base} + ${aumento} = ${final}\\)`,
      topic: 'porcentajes'
    };
  };

  G['porc_encontrar_total'] = function(diff) {
    if (diff === 'easy') return G['porc_calcular']('easy');
    const pct = pick([10,20,25,50,5,40]);
    const result = ri(1, diffCfg(diff,[10,50,200,1000])) * gcd(pct,100);
    const total = (result * 100) / pct;
    if (!Number.isInteger(total)) return G['porc_encontrar_total'](diff);
    return {
      question: `El \\(${pct}\\%\\) de un número es \\(${result}\\). ¿Cuál es ese número?`,
      answer: String(total), type: 'numeric',
      hint: `Despeja: \\(\\text{total} = \\dfrac{${result} \\times 100}{${pct}}\\)`,
      solution: `\\(x = \\dfrac{${result} \\times 100}{${pct}} = ${total}\\)`,
      topic: 'porcentajes'
    };
  };

  MM_TOPIC_GENERATORS['porcentajes'] = [
    'porc_calcular','porc_que_porcentaje','porc_descuento','porc_aumento','porc_encontrar_total'
  ];

  // ── 14. REGLA DE TRES ───────────────────────────────────────────

  G['r3_directa'] = function(diff) {
    const contexts = [
      () => { const pu = ri(2,diffCfg(diff,[10,20,50,100])); const c1 = ri(2,10); const c2 = ri(2,10); return { q:`Si \\(${c1}\\) kg de manzanas cuestan \\(\\$${c1*pu}\\), ¿cuánto cuestan \\(${c2}\\) kg?`, ans:c2*pu, sol:`Precio/kg = ${pu}. Total = ${c2} × ${pu} = ${c2*pu}` }; },
      () => { const vel = ri(30,120); const h = ri(1,8); const h2 = ri(1,8); return { q:`Si un auto recorre \\(${vel*h}\\) km en \\(${h}\\) horas a velocidad constante, ¿cuánto recorre en \\(${h2}\\) horas?`, ans:vel*h2, sol:`Vel = ${vel} km/h. Dist = ${vel} × ${h2} = ${vel*h2}` }; },
      () => { const rate = ri(2,20); const t1 = ri(2,8); const t2 = ri(2,8); return { q:`Una máquina produce \\(${rate*t1}\\) piezas en \\(${t1}\\) horas. ¿Cuántas produce en \\(${t2}\\) horas?`, ans:rate*t2, sol:`Tasa = ${rate} piezas/h. Total = ${rate} × ${t2} = ${rate*t2}` }; }
    ];
    const ctx = pick(contexts)();
    return {
      question: ctx.q, answer: String(ctx.ans), type: 'numeric',
      hint: 'Regla de tres directa: si una magnitud aumenta, la otra también aumenta.',
      solution: ctx.sol, topic: 'reglatres'
    };
  };

  G['r3_inversa'] = function(diff) {
    if (diff === 'easy') return G['r3_directa']('easy');
    const trab = ri(2, diffCfg(diff,[5,8,12,20]));
    const dias = ri(2, diffCfg(diff,[5,10,15,30]));
    const trab2 = ri(2, diffCfg(diff,[5,8,12,20]));
    const dias2 = (trab * dias) / trab2;
    if (!Number.isInteger(dias2) || dias2 <= 0) return G['r3_inversa'](diff);
    return {
      question: `\\(${trab}\\) trabajadores construyen un muro en \\(${dias}\\) días. ¿Cuántos días tardarán \\(${trab2}\\) trabajadores?`,
      answer: String(dias2), type: 'numeric',
      hint: 'Regla de tres inversa: más trabajadores → menos días.',
      solution: `\\(${trab} \\times ${dias} = ${trab2} \\times x\\) → \\(x = ${dias2}\\)`,
      topic: 'reglatres'
    };
  };

  G['r3_compuesta'] = function(diff) {
    if (['easy','medio'].includes(diff)) return G['r3_directa'](diff);
    const obreros1 = ri(3,10), horas1 = ri(4,10), dias1 = ri(2,6);
    const obra = obreros1 * horas1 * dias1;
    const obreros2 = ri(2,10), horas2 = ri(4,10);
    const dias2 = obra / (obreros2 * horas2);
    if (!Number.isInteger(dias2) || dias2 <= 0) return G['r3_compuesta'](diff);
    return {
      question: `\\(${obreros1}\\) obreros trabajando \\(${horas1}\\) h/día terminan en \\(${dias1}\\) días. ¿Cuántos días tardarán \\(${obreros2}\\) obreros trabajando \\(${horas2}\\) h/día?`,
      answer: String(dias2), type: 'numeric',
      hint: 'Regla de tres compuesta: obreros1 × horas1 × días1 = obreros2 × horas2 × días2',
      solution: `\\(${obreros1}×${horas1}×${dias1} = ${obreros2}×${horas2}×x\\) → \\(x = ${dias2}\\)`,
      topic: 'reglatres'
    };
  };

  MM_TOPIC_GENERATORS['reglatres'] = ['r3_directa','r3_inversa','r3_compuesta'];

  // ── 15. PROBLEMAS APLICADOS ─────────────────────────────────────

  G['aplic_mezcla'] = function(diff) {
    const cant1 = ri(2, diffCfg(diff,[5,10,20,50]));
    const precio1 = ri(2, diffCfg(diff,[10,20,50,100]));
    const cant2 = ri(2, diffCfg(diff,[5,10,20,50]));
    const precio2 = ri(precio1+1, diffCfg(diff,[20,40,80,200]));
    const total = cant1 * precio1 + cant2 * precio2;
    const cantTotal = cant1 + cant2;
    const precioMedio = parseFloat((total / cantTotal).toFixed(2));
    return {
      question: `Se mezclan \\(${cant1}\\) kg de café a \\(\\$${precio1}\\)/kg con \\(${cant2}\\) kg a \\(\\$${precio2}\\)/kg. ¿Cuál es el precio promedio de la mezcla (en $/kg)?`,
      answer: String(precioMedio), type: 'numeric',
      hint: `Precio promedio = (costo total) ÷ (cantidad total).`,
      solution: `Costo: \\(${cant1}×${precio1} + ${cant2}×${precio2} = ${cant1*precio1} + ${cant2*precio2} = ${total}\\). Precio/kg: \\(${total} ÷ ${cantTotal} = ${precioMedio}\\)`,
      topic: 'aplicados'
    };
  };

  G['aplic_movimiento'] = function(diff) {
    const vel1 = ri(30, diffCfg(diff,[80,120,180,250]));
    const vel2 = ri(20, diffCfg(diff,[60,100,150,200]));
    const t = ri(1, diffCfg(diff,[4,6,8,10]));
    const tipo = pick(['encuentro','mismo_sentido']);
    if (tipo === 'encuentro') {
      const dist = (vel1 + vel2) * t;
      return {
        question: `Dos trenes parten de ciudades que distan \\(${dist}\\) km. Uno va a \\(${vel1}\\) km/h y el otro a \\(${vel2}\\) km/h. ¿En cuántas horas se encuentran?`,
        answer: String(t), type: 'numeric',
        hint: `Velocidad de acercamiento = ${vel1} + ${vel2}. Tiempo = distancia ÷ velocidad.`,
        solution: `\\(t = \\dfrac{${dist}}{${vel1}+${vel2}} = \\dfrac{${dist}}{${vel1+vel2}} = ${t}\\) h`,
        topic: 'aplicados'
      };
    } else {
      const dist = (vel1 - vel2) * t;
      if (dist <= 0) return G['aplic_movimiento'](diff);
      return {
        question: `Dos ciclistas salen en el mismo sentido: uno a \\(${vel1}\\) km/h y otro a \\(${vel2}\\) km/h. Después de \\(${t}\\) h, ¿cuántos km los separan?`,
        answer: String(dist), type: 'numeric',
        hint: `Diferencia de velocidades = ${vel1} − ${vel2} = ${vel1-vel2} km/h.`,
        solution: `\\((${vel1}-${vel2}) \\times ${t} = ${vel1-vel2} \\times ${t} = ${dist}\\) km`,
        topic: 'aplicados'
      };
    }
  };

  G['aplic_edades'] = function(diff) {
    const edadA = ri(10, diffCfg(diff,[20,40,60,80]));
    const diff_edades = ri(1, 15);
    const edadB = edadA + diff_edades;
    const tipo = pick(['suma','doble','hace_n']);
    if (tipo === 'suma') {
      return {
        question: `La suma de edades de A y B es \\(${edadA+edadB}\\). B es \\(${diff_edades}\\) años mayor que A. ¿Cuántos años tiene A?`,
        answer: String(edadA), type: 'numeric',
        hint: `Sea A = x. Entonces B = x + ${diff_edades}. Forma la ecuación: x + (x + ${diff_edades}) = ${edadA+edadB}.`,
        solution: `\\(2x + ${diff_edades} = ${edadA+edadB}\\) → \\(x = ${edadA}\\)`,
        topic: 'aplicados'
      };
    } else {
      const n = ri(3, 10);
      return {
        question: `A tiene \\(${edadA}\\) años. En \\(${n}\\) años, B tendrá el doble de la edad actual de A. ¿Cuántos años tiene B ahora?`,
        answer: String(2*edadA - n), type: 'numeric',
        hint: `B en ${n} años = 2 × ${edadA}. B ahora = 2 × ${edadA} − ${n}.`,
        solution: `B ahora = \\(2 \\times ${edadA} - ${n} = ${2*edadA-n}\\)`,
        topic: 'aplicados'
      };
    }
  };

  G['aplic_trabajo'] = function(diff) {
    const t1 = ri(2, diffCfg(diff,[6,10,15,24]));
    const t2 = ri(t1+1, diffCfg(diff,[8,12,20,30]));
    const lcmT = lcm(t1, t2);
    const work = (lcmT/t1 + lcmT/t2);
    const g = gcd(lcmT, work);
    const tJunto = lcmT / work;
    if (!Number.isInteger(lcmT / work) && lcmT % work !== 0) {
      const tJuntoFrac = `${lcmT/g}/${work/g}`;
      return {
        question: `A termina un trabajo en \\(${t1}\\) horas y B en \\(${t2}\\) horas. Trabajando juntos, ¿cuántas horas tardan?`,
        answer: tJuntoFrac, type: 'numeric',
        hint: `Trabajo por hora: A hace 1/${t1}, B hace 1/${t2}. Juntos: 1/${t1} + 1/${t2} = trabajo/hora.`,
        solution: `\\(\\dfrac{1}{${t1}} + \\dfrac{1}{${t2}} = \\dfrac{${lcmT/t1}+${lcmT/t2}}{${lcmT}} = \\dfrac{${work}}{${lcmT}}\\) → tiempo = \\(\\dfrac{${lcmT}}{${work}} = \\dfrac{${lcmT/g}}{${work/g}}\\) h`,
        topic: 'aplicados'
      };
    }
    return {
      question: `A termina un trabajo en \\(${t1}\\) horas y B en \\(${t2}\\) horas. Trabajando juntos, ¿cuántas horas tardan?`,
      answer: String(Math.round(lcmT / work * 100)/100), type: 'numeric',
      hint: `1/${t1} + 1/${t2} por hora juntos.`,
      solution: `\\(\\dfrac{1}{${t1}} + \\dfrac{1}{${t2}} = \\dfrac{${work}}{${lcmT}}\\) → tiempo ≈ ${Math.round(lcmT/work*100)/100} h`,
      topic: 'aplicados'
    };
  };

  G['aplic_geometria'] = function(diff) {
    const formas = diffCfg(diff, [
      [
        { nombre:'rectángulo', fn:()=>{const l=ri(2,15),a=ri(2,15);return{q:`Un rectángulo mide \\(${l}\\) m de largo y \\(${a}\\) m de ancho. ¿Cuál es su área?`,ans:l*a,sol:`Área = largo × ancho = ${l} × ${a} = ${l*a} m²`};} },
        { nombre:'cuadrado', fn:()=>{const l=ri(2,20);return{q:`Un cuadrado tiene lado \\(${l}\\) m. ¿Cuál es su perímetro?`,ans:4*l,sol:`Perímetro = 4 × ${l} = ${4*l} m`};} }
      ],
      [
        { nombre:'triángulo', fn:()=>{const b=ri(3,20),h=ri(2,15);return{q:`Un triángulo tiene base \\(${b}\\) m y altura \\(${h}\\) m. ¿Cuál es su área?`,ans:b*h/2,sol:`Área = (${b} × ${h}) / 2 = ${b*h/2} m²`};} },
        { nombre:'trapecio', fn:()=>{const B=ri(5,20),b=ri(2,B-1),h=ri(2,12);return{q:`Un trapecio tiene bases \\(${B}\\) m y \\(${b}\\) m, y altura \\(${h}\\) m. ¿Cuál es su área?`,ans:(B+b)*h/2,sol:`Área = (${B}+${b})×${h}/2 = ${(B+b)*h/2} m²`};} }
      ],
      [
        { nombre:'círculo', fn:()=>{const r=ri(1,10);return{q:`Un círculo tiene radio \\(${r}\\) cm. ¿Cuál es su área? (usa \\(\\pi \\approx 3.14\\))`,ans:parseFloat((3.14*r*r).toFixed(2)),sol:`Área = π × ${r}² = 3.14 × ${r*r} = ${parseFloat((3.14*r*r).toFixed(2))} cm²`};} }
      ],
      [
        { nombre:'compuesta', fn:()=>{const l=ri(5,20),a=ri(3,15),r=ri(1,Math.floor(Math.min(l,a)/2));return{q:`Una figura tiene forma de rectángulo (\\(${l}\\)×\\(${a}\\)) con un semicírculo de radio \\(${r}\\) encima. ¿Cuál es el área total? (\\(\\pi\\approx3.14\\))`,ans:parseFloat((l*a+3.14*r*r/2).toFixed(2)),sol:`Rect: ${l*a}. Semicírculo: 3.14×${r}²/2=${parseFloat((3.14*r*r/2).toFixed(2))}. Total=${parseFloat((l*a+3.14*r*r/2).toFixed(2))}`};} }
      ]
    ]);
    const forma = pick(formas);
    const data = forma.fn();
    return {
      question: data.q, answer: String(data.ans), type: 'numeric',
      hint: `Recuerda la fórmula de área del ${forma.nombre}.`,
      solution: data.sol, topic: 'aplicados'
    };
  };

  G['aplic_porcentaje_compuesto'] = function(diff) {
    if (['easy','medio'].includes(diff)) return G['porc_descuento'](diff);
    const precio = ri(100, diffCfg(diff,[500,1000,5000,10000]));
    const p1 = pick([5,10,15,20,25]);
    const p2 = pick([5,10,15,20,25]);
    const tras1 = precio * (1 - p1/100);
    const tras2 = tras1 * (1 - p2/100);
    const total = Math.round(tras2);
    return {
      question: `Un artículo de \\(\\$${precio}\\) tiene dos descuentos sucesivos: \\(${p1}\\%\\) y luego \\(${p2}\\%\\). ¿Cuánto se paga al final?`,
      answer: String(total), type: 'numeric',
      hint: `Aplica primero el ${p1}%, luego el ${p2}% sobre el precio ya reducido.`,
      solution: `Tras ${p1}%: \\(${precio}×0.${100-p1}=${tras1.toFixed(2)}\\). Tras ${p2}%: \\(${tras1.toFixed(2)}×0.${100-p2}≈${total}\\)`,
      topic: 'aplicados'
    };
  };

  MM_TOPIC_GENERATORS['aplicados'] = [
    'aplic_mezcla','aplic_movimiento','aplic_edades','aplic_trabajo',
    'aplic_geometria','aplic_porcentaje_compuesto'
  ];

  console.log('[MM] generators-aritmetica.js cargado:', Object.keys(MM_TOPIC_GENERATORS).filter(k =>
    ['naturales','enteros','operaciones','potencias','raices','divisibilidad','mcd','mcm','fracciones','decimales','razones','proporciones','porcentajes','reglatres','aplicados'].includes(k)
  ).length, 'topics');

})();
