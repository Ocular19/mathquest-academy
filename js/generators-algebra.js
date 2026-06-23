/* ═══════════════════════════════════════════════════════════════
   GENERATORS-ALGEBRA.JS — Generadores dinámicos de ejercicios
   Álgebra: 11 unidades, 90+ generadores con análisis de errores
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';
  if (!window.MM_GENERATORS) window.MM_GENERATORS = {};
  if (!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS = {};

  const G = window.MM_GENERATORS;

  // ── Helpers ──────────────────────────────────────────────────────
  function ri(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }
  function pick(arr) { return arr[ri(0, arr.length - 1)]; }
  function shuffle(arr) { const a = arr.slice(); for (let i = a.length-1; i>0; i--) { const j = ri(0,i); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function nz(n) { return n === 0 ? 1 : n; }         // non-zero
  function sign(n) { return n >= 0 ? '+' : ''; }     // for display
  function coef(n, v) {                               // format coefficient×variable
    if (n === 1) return v;
    if (n === -1) return '-' + v;
    return n + v;
  }
  function diffCfg(diff, cfgs) {
    const m = { easy:0, medio:1, dificil:2, experto:3 };
    return cfgs[Math.min(m[diff] ?? 0, cfgs.length - 1)];
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while(b){[a,b]=[b,a%b];} return a; }

  // ══════════════════════════════════════════════════════════════
  // 1. EXPRESIONES ALGEBRAICAS
  // ══════════════════════════════════════════════════════════════

  // Evaluar expresión en un punto
  G['alg_evaluar_lineal'] = function(diff) {
    const a = ri(1, diffCfg(diff,[5,10,20,50]));
    const b = ri(-diffCfg(diff,[5,10,15,30]), diffCfg(diff,[5,10,15,30]));
    const x = ri(-diffCfg(diff,[3,5,8,15]), diffCfg(diff,[3,5,8,15]));
    const val = a*x + b;
    return {
      question: `Si \\(x = ${x}\\), calcula \\(${a}x ${sign(b)}${b}\\).`,
      answer: String(val), type: 'numeric',
      hint: `Sustituye \\(x = ${x}\\): \\(${a}(${x}) + (${b})\\).`,
      solution: `\\(${a}(${x}) + (${b}) = ${a*x} + ${b} = ${val}\\)`,
      solutionSteps: [`Sustituye: \\(${a}×${x} = ${a*x}\\)`, `Suma: \\(${a*x} + (${b}) = ${val}\\)`],
      topic: 'alg_expresiones',
      analyzeError: (ua) => {
        if (parseFloat(ua) === a*x) return { feedback: 'Sustituiste correctamente pero olvidaste sumar el término independiente.' };
        if (parseFloat(ua) === a+b) return { feedback: 'Parece que sumaste el coeficiente en vez de multiplicar: recuerda que 3x significa 3 × x.' };
        return { feedback: `Recuerda: sustituye primero (\\(${a}×${x}=${a*x}\\)) y luego suma el término constante (${b}).` };
      }
    };
  };

  G['alg_evaluar_cuadratica'] = function(diff) {
    const a = ri(1, diffCfg(diff,[3,5,8,10]));
    const b = ri(-5, 5);
    const c = ri(-10, 10);
    const x = ri(-diffCfg(diff,[2,3,5,8]), diffCfg(diff,[2,3,5,8]));
    const val = a*x*x + b*x + c;
    return {
      question: `Si \\(x = ${x}\\), calcula \\(${a}x^2 ${sign(b)}${coef(b,'x')} ${sign(c)}${c}\\).`,
      answer: String(val), type: 'numeric',
      hint: `Sustituye \\(x=${x}\\): \\(${a}(${x})^2 + ${b}(${x}) + ${c}\\).`,
      solution: `\\(${a}(${x})^2 + ${b}(${x}) + ${c} = ${a*x*x} + ${b*x} + ${c} = ${val}\\)`,
      solutionSteps: [
        `Potencia: \\((${x})^2 = ${x*x}\\)`,
        `Coeficiente: \\(${a} × ${x*x} = ${a*x*x}\\)`,
        `Término lineal: \\(${b} × ${x} = ${b*x}\\)`,
        `Suma total: \\(${a*x*x} + ${b*x} + ${c} = ${val}\\)`
      ],
      topic: 'alg_expresiones',
      analyzeError: (ua) => {
        if (parseFloat(ua) === a*x*x + b*x) return { feedback: 'Casi correcto: recuerda sumar también el término independiente.' };
        if (parseFloat(ua) === a*x + b*x + c) return { feedback: `¡Cuidado! \\(x^2\\) significa \\(x × x = ${x*x}\\), no \\(x × 2 = ${2*x}\\).` };
        return { feedback: 'Recuerda el orden: primero potencia, luego multiplica por el coeficiente, luego suma todo.' };
      }
    };
  };

  G['alg_traducir_expresion'] = function(diff) {
    const n = ri(2, diffCfg(diff,[5,10,15,20]));
    const m = ri(1, diffCfg(diff,[5,10,15,20]));
    const variants = [
      { frase: `El doble de un número más \\(${m}\\)`, expr: `2x + ${m}`, ans: String(2*5+m), eval: 5 },
      { frase: `\\(${n}\\) más que el triple de un número`, expr: `3x + ${n}`, ans: String(3*5+n), eval: 5 },
      { frase: `El cuadrado de un número menos \\(${m}\\)`, expr: `x² - ${m}`, ans: String(25-m), eval: 5 },
      { frase: `La mitad de un número más \\(${n}\\)`, expr: `x/2 + ${n}`, ans: String(5/2 + n), eval: 5 }
    ];
    const v = pick(diffCfg(diff,[variants.slice(0,2), variants.slice(0,3), variants, variants]));
    const opts = shuffle([v.expr, `${n}x - ${m}`, `x + ${n+m}`, `2x - ${m}`].filter((o,i,a)=>a.indexOf(o)===i)).slice(0,4);
    if (!opts.includes(v.expr)) opts[0] = v.expr;
    const idx = opts.indexOf(v.expr);
    return {
      question: `Traduce a expresión algebraica: "${v.frase}"`,
      answer: String(idx), type: 'multiple-choice', options: opts,
      hint: 'Identifica la operación y el número desconocido (llámalo x).',
      solution: `"${v.frase}" → \\(${v.expr}\\)`,
      topic: 'alg_expresiones',
      analyzeError: () => ({ feedback: 'Asocia cada palabra clave: "doble"=×2, "triple"=×3, "más que"=suma, "menos que"=resta.' })
    };
  };

  G['alg_grado_termino'] = function(diff) {
    const vars = ['x','y','a','n'];
    const v = pick(vars);
    const exp = ri(1, diffCfg(diff,[3,5,7,10]));
    const coef = ri(1,9);
    const tipos = [
      { q:`¿Cuál es el grado del monomio \\(${coef}${v}^{${exp}}\\)?`, ans: String(exp) },
      { q:`¿Cuál es el coeficiente de \\(${coef}${v}^{${exp}}\\)?`, ans: String(coef) }
    ];
    const t = pick(tipos);
    return {
      question: t.q, answer: t.ans, type: 'numeric',
      hint: 'El grado es el exponente de la variable; el coeficiente es el factor numérico.',
      solution: t.ans,
      topic: 'alg_expresiones',
      analyzeError: () => ({ feedback: 'El grado es el exponente de la variable, no el coeficiente. Ejemplo: en 5x³, grado=3, coeficiente=5.' })
    };
  };

  G['alg_evaluar_dos_variables'] = function(diff) {
    if (diff === 'easy') return G['alg_evaluar_lineal']('easy');
    const a = ri(1,5), b = ri(1,5), c = ri(-5,5);
    const x = ri(-3,3), y = ri(-3,3);
    const val = a*x + b*y + c;
    return {
      question: `Si \\(x = ${x}\\) e \\(y = ${y}\\), calcula \\(${a}x + ${b}y ${sign(c)}${c}\\).`,
      answer: String(val), type: 'numeric',
      hint: `Sustituye ambas variables: \\(${a}(${x}) + ${b}(${y}) + ${c}\\).`,
      solution: `\\(${a*x} + ${b*y} + ${c} = ${val}\\)`,
      topic: 'alg_expresiones'
    };
  };

  MM_TOPIC_GENERATORS['alg_expresiones'] = [
    'alg_evaluar_lineal','alg_evaluar_cuadratica','alg_traducir_expresion',
    'alg_grado_termino','alg_evaluar_dos_variables'
  ];

  // ══════════════════════════════════════════════════════════════
  // 2. REDUCCIÓN DE TÉRMINOS SEMEJANTES
  // ══════════════════════════════════════════════════════════════

  G['alg_reducir_lineal'] = function(diff) {
    const a = ri(1,10), b = ri(1,10), c = ri(-8,8), d = ri(-8,8);
    const coefX = a + b;
    const cte   = c + d;
    return {
      question: `Reduce: \\(${a}x + ${c} + ${b}x + ${d}\\)`,
      answer: cte === 0 ? `${coefX}x` : `${coefX}x ${sign(cte)}${cte}`,
      type: 'numeric',
      hint: `Agrupa términos con x y términos independientes por separado.`,
      solution: `\\((${a}+${b})x + (${c}+${d}) = ${coefX}x ${sign(cte)}${cte}\\)`,
      solutionSteps: [
        `Términos en x: \\(${a}x + ${b}x = ${coefX}x\\)`,
        `Términos independientes: \\(${c} + ${d} = ${cte}\\)`,
        `Resultado: \\(${coefX}x ${sign(cte)}${cte}\\)`
      ],
      topic: 'alg_reduccion',
      analyzeError: (ua) => {
        if (ua && ua.includes(`${a+c}`) && ua.includes(`${b+d}`)) return { feedback: 'Sumaste coeficientes con términos independientes. Solo se combinan términos del mismo tipo (misma variable y mismo exponente).' };
        return { feedback: 'Solo se pueden combinar términos semejantes (misma variable y mismo exponente).' };
      }
    };
  };

  G['alg_reducir_cuadratico'] = function(diff) {
    const a = ri(1,6), b = ri(1,6), c = ri(-5,5), d = ri(-5,5), e = ri(-5,5), f = ri(-5,5);
    const cx2 = a+b, cx = c+d, cte = e+f;
    return {
      question: `Reduce: \\(${a}x^2 + ${c}x + ${e} + ${b}x^2 + ${d}x + ${f}\\)`,
      answer: `${cx2}x2 ${sign(cx)}${cx}x ${sign(cte)}${cte}`.replace('x2','x²'),
      type: 'numeric',
      hint: 'Agrupa: términos en x², términos en x, y términos independientes.',
      solution: `\\(${cx2}x^2 ${sign(cx)}${cx}x ${sign(cte)}${cte}\\)`,
      topic: 'alg_reduccion',
      analyzeError: () => ({ feedback: 'Recuerda: x² y x son términos distintos, no se pueden combinar entre sí.' })
    };
  };

  G['alg_suma_polinomios'] = function(diff) {
    const a = ri(1,8), b = ri(-6,6), c = ri(-8,8);
    const d = ri(1,8), e = ri(-6,6), f = ri(-8,8);
    const rx2=a+d, rx=b+e, r0=c+f;
    return {
      question: `Suma: \\((${a}x^2 ${sign(b)}${b}x ${sign(c)}${c}) + (${d}x^2 ${sign(e)}${e}x ${sign(f)}${f})\\)`,
      answer: `${rx2}x² ${sign(rx)}${rx}x ${sign(r0)}${r0}`,
      type: 'numeric',
      hint: 'Combina los coeficientes del mismo grado.',
      solution: `\\(${rx2}x^2 ${sign(rx)}${rx}x ${sign(r0)}${r0}\\)`,
      topic: 'alg_reduccion'
    };
  };

  G['alg_resta_polinomios'] = function(diff) {
    const a = ri(2,8), b = ri(-5,5), c = ri(-8,8);
    const d = ri(1,6), e = ri(-5,5), f = ri(-8,8);
    const rx2=a-d, rx=b-e, r0=c-f;
    return {
      question: `Resta: \\((${a}x^2 ${sign(b)}${b}x ${sign(c)}${c}) - (${d}x^2 ${sign(e)}${e}x ${sign(f)}${f})\\)`,
      answer: `${rx2}x² ${sign(rx)}${rx}x ${sign(r0)}${r0}`,
      type: 'numeric',
      hint: 'Distribuye el signo negativo a TODOS los términos del segundo polinomio.',
      solution: `Al distribuir el negativo: \\(${rx2}x^2 ${sign(rx)}${rx}x ${sign(r0)}${r0}\\)`,
      solutionSteps: [
        `Distribuye el negativo: \\(-(${d}x^2 ${sign(e)}${e}x ${sign(f)}${f}) = ${-d}x^2 ${sign(-e)}${-e}x ${sign(-f)}${-f}\\)`,
        `Combina: \\((${a}${sign(-d)}${-d})x^2 + (${b}${sign(-e)}${-e})x + (${c}${sign(-f)}${-f})\\)`,
        `Resultado: \\(${rx2}x^2 ${sign(rx)}${rx}x ${sign(r0)}${r0}\\)`
      ],
      topic: 'alg_reduccion',
      analyzeError: (ua) => {
        const wrong = `${a+d}x² ${sign(b+e)}${b+e}x`;
        if (ua && ua.includes(String(a+d))) return { feedback: `¡Cuidado! Al restar, el signo negativo afecta a TODOS los términos del segundo polinomio. El término -${d}x² da ${a}-${d}=${a-d}, no ${a}+${d}.` };
        return { feedback: 'Distribuye el signo negativo a todos los términos del paréntesis antes de combinar.' };
      }
    };
  };

  G['alg_identificar_semejantes'] = function(diff) {
    const vars = [['x','x²','y','xy'], ['a','a²','b','ab'], ['n','n²','m','nm']];
    const [v1,v2,v3,v4] = pick(vars);
    const a = ri(2,8), b = ri(2,8), c = ri(2,8);
    const expr = `${a}${v1} + ${b}${v2} + ${c}${v1}`;
    const ans = `${a+c}${v1} + ${b}${v2}`;
    const opts = shuffle([ans, `${a+b+c}${v1}`, `${a+b}${v1} + ${c}${v2}`, `${a}${v1} + ${b+c}${v2}`]).slice(0,4);
    if (!opts.includes(ans)) opts[0] = ans;
    const idx = opts.indexOf(ans);
    return {
      question: `¿Cuál es la forma reducida de \\(${expr}\\)?`,
      answer: String(idx), type: 'multiple-choice', options: opts,
      hint: `Solo son semejantes los términos con exactamente la misma variable y exponente. \\(${v1}\\) y \\(${v2}\\) NO son semejantes.`,
      solution: `\\(${a}${v1} + ${c}${v1} = ${a+c}${v1}\\). El término \\(${b}${v2}\\) queda aparte. Resultado: \\(${ans}\\)`,
      topic: 'alg_reduccion',
      analyzeError: () => ({ feedback: `¡Atención! ${v1} y ${v2} son términos DISTINTOS (diferente exponente) y no pueden combinarse.` })
    };
  };

  MM_TOPIC_GENERATORS['alg_reduccion'] = [
    'alg_reducir_lineal','alg_reducir_cuadratico','alg_suma_polinomios',
    'alg_resta_polinomios','alg_identificar_semejantes'
  ];

  // ══════════════════════════════════════════════════════════════
  // 3. PRODUCTOS NOTABLES
  // ══════════════════════════════════════════════════════════════

  G['alg_cuad_suma'] = function(diff) {
    const a = ri(1, diffCfg(diff,[5,8,12,20]));
    const b = ri(1, diffCfg(diff,[5,8,12,20]));
    const r2 = a*a, r1 = 2*a*b, r0 = b*b;
    const opts = shuffle([
      `x²${sign(r1)}${r1}x${sign(r0)}${r0}`,
      `x²${sign(r0)}${r0}`,
      `x²${sign(2*a*b)}${2*a*b}x`,
      `x²${sign(r1)}${r1}x${sign(-r0)}${-r0}`
    ]);
    const ans = `x²${sign(r1)}${r1}x${sign(r0)}${r0}`;
    if (!opts.includes(ans)) opts[0] = ans;
    const idx = opts.indexOf(ans);
    return {
      question: `Desarrolla usando producto notable: \\((x + ${b})^2\\)`,
      answer: String(idx), type: 'multiple-choice',
      options: opts.map(o => `\\(${o}\\)`),
      hint: `\\((x+b)^2 = x^2 + 2bx + b^2\\). Con \\(b=${b}\\): \\(x^2 + ${2*b}x + ${b*b}\\).`,
      solution: `\\((x+${b})^2 = x^2 + 2(${b})x + ${b}^2 = x^2 + ${r1}x + ${r0}\\)`,
      solutionSteps: [
        `Primer término al cuadrado: \\(x^2\\)`,
        `Doble producto: \\(2 × x × ${b} = ${r1}x\\)`,
        `Segundo término al cuadrado: \\(${b}^2 = ${r0}\\)`
      ],
      topic: 'alg_productos',
      analyzeError: (ua) => {
        const uIdx = parseInt(ua);
        if (uIdx === opts.indexOf(`x²${sign(r0)}${r0}`)) return { feedback: `¡Falta el término medio! \\((x+${b})^2 ≠ x^2+${r0}\\). El término del medio es \\(2×x×${b} = ${r1}x\\).` };
        return { feedback: `Recuerda la fórmula completa: \\((a+b)^2 = a^2 + 2ab + b^2\\). No olvides el término \\(2ab\\).` };
      }
    };
  };

  G['alg_cuad_diferencia'] = function(diff) {
    const a = ri(1, diffCfg(diff,[5,8,12,20]));
    const b = ri(1, diffCfg(diff,[5,8,12,20]));
    const r1 = 2*a*b, r0 = b*b;
    return {
      question: `Desarrolla: \\((x - ${b})^2\\)`,
      answer: `x²-${r1}x+${r0}`, type: 'numeric',
      hint: `\\((x-b)^2 = x^2 - 2bx + b^2\\). Con \\(b=${b}\\).`,
      solution: `\\((x-${b})^2 = x^2 - ${r1}x + ${r0}\\)`,
      solutionSteps: [`\\(x^2\\)`, `\\(-2(${b})x = -${r1}x\\)`, `\\(${b}^2 = ${r0}\\)`],
      topic: 'alg_productos',
      analyzeError: (ua) => {
        if (ua && ua.includes(`+${r1}`)) return { feedback: `¡Cuidado con el signo! \\((x-${b})^2\\) tiene término medio NEGATIVO: \\(-${r1}x\\), no \\(+${r1}x\\).` };
        if (ua && ua.includes(`-${r0}`)) return { feedback: `El último término siempre es positivo en un cuadrado de binomio: \\((-${b})^2 = +${r0}\\).` };
        return { feedback: `Fórmula: \\((x-b)^2 = x^2 - 2bx + b^2\\). El signo del término medio siempre es negativo.` };
      }
    };
  };

  G['alg_prod_suma_dif'] = function(diff) {
    const a = ri(1, diffCfg(diff,[5,8,12,20]));
    const b = ri(1, diffCfg(diff,[5,8,12,20]));
    const r = b*b;
    return {
      question: `Desarrolla: \\((x + ${b})(x - ${b})\\)`,
      answer: `x²-${r}`, type: 'numeric',
      hint: `\\((a+b)(a-b) = a^2 - b^2\\). El término medio desaparece.`,
      solution: `\\((x+${b})(x-${b}) = x^2 - ${b}^2 = x^2 - ${r}\\)`,
      solutionSteps: [`Aplicar: \\(a^2 - b^2\\) con \\(a=x, b=${b}\\)`, `\\(x^2 - ${r}\\)`],
      topic: 'alg_productos',
      analyzeError: (ua) => {
        if (ua && ua.includes(`${2*b}x`)) return { feedback: `En el producto suma por diferencia, el término medio se cancela. No hay término con x.` };
        return { feedback: `Fórmula: \\((a+b)(a-b) = a^2 - b^2\\). El término del medio siempre se cancela.` };
      }
    };
  };

  G['alg_cubo_binomio'] = function(diff) {
    if (['easy','medio'].includes(diff)) return G['alg_cuad_suma'](diff);
    const b = ri(1, 6);
    const r3 = 1, r2 = 3*b, r1 = 3*b*b, r0 = b*b*b;
    return {
      question: `Desarrolla: \\((x + ${b})^3\\)`,
      answer: `x³+${r2}x²+${r1}x+${r0}`, type: 'numeric',
      hint: `\\((x+b)^3 = x^3 + 3x^2b + 3xb^2 + b^3\\).`,
      solution: `\\(x^3 + 3x^2(${b}) + 3x(${b})^2 + ${b}^3 = x^3 + ${r2}x^2 + ${r1}x + ${r0}\\)`,
      topic: 'alg_productos'
    };
  };

  G['alg_producto_binomios'] = function(diff) {
    const a = ri(1, diffCfg(diff,[4,6,8,12]));
    const b = ri(1, diffCfg(diff,[5,8,10,15]));
    const c = ri(1, diffCfg(diff,[4,6,8,12]));
    const d = ri(1, diffCfg(diff,[5,8,10,15]));
    // (ax + b)(cx + d) = acx² + (ad+bc)x + bd
    const r2 = a*c, r1 = a*d + b*c, r0 = b*d;
    return {
      question: `Multiplica: \\((${coef(a,'x')} + ${b})(${coef(c,'x')} + ${d})\\)`,
      answer: `${r2}x²+${r1}x+${r0}`, type: 'numeric',
      hint: `Aplica propiedad distributiva (FOIL): primeros, externos, internos, últimos.`,
      solution: `\\(${r2}x^2 + (${a}·${d}+${b}·${c})x + ${b}·${d} = ${r2}x^2 + ${r1}x + ${r0}\\)`,
      solutionSteps: [
        `Primeros: \\(${a}x · ${c}x = ${r2}x^2\\)`,
        `Externos: \\(${a}x · ${d} = ${a*d}x\\)`,
        `Internos: \\(${b} · ${c}x = ${b*c}x\\)`,
        `Últimos: \\(${b} · ${d} = ${r0}\\)`,
        `Suma: \\(${r2}x^2 + ${r1}x + ${r0}\\)`
      ],
      topic: 'alg_productos'
    };
  };

  G['alg_aplicar_notable_numerico'] = function(diff) {
    const n = ri(10, diffCfg(diff,[20,50,100,200]));
    const d = ri(1, diffCfg(diff,[3,5,8,10]));
    const tipo = pick(['suma_cuadrado','dif_cuadrado','prod_sd']);
    if (tipo === 'suma_cuadrado') {
      const val = (n+d)*(n+d);
      return {
        question: `Calcula \\(${n+d}^2\\) escribiéndolo como \\((${n}+${d})^2\\) y usando el producto notable.`,
        answer: String(val), type: 'numeric',
        hint: `\\((${n}+${d})^2 = ${n}^2 + 2·${n}·${d} + ${d}^2 = ${n*n} + ${2*n*d} + ${d*d}\\)`,
        solution: `\\(${n*n} + ${2*n*d} + ${d*d} = ${val}\\)`,
        topic: 'alg_productos'
      };
    } else if (tipo === 'dif_cuadrado') {
      const val = (n-d)*(n-d);
      return {
        question: `Calcula \\(${n-d}^2\\) escribiéndolo como \\((${n}-${d})^2\\).`,
        answer: String(val), type: 'numeric',
        hint: `\\((${n}-${d})^2 = ${n}^2 - 2·${n}·${d} + ${d}^2\\)`,
        solution: `\\(${n*n} - ${2*n*d} + ${d*d} = ${val}\\)`,
        topic: 'alg_productos'
      };
    } else {
      const val = (n+d)*(n-d);
      return {
        question: `Calcula \\(${n+d}·${n-d}\\) usando el producto suma por diferencia.`,
        answer: String(val), type: 'numeric',
        hint: `\\((${n}+${d})(${n}-${d}) = ${n}^2 - ${d}^2 = ${n*n} - ${d*d}\\)`,
        solution: `\\(${n*n} - ${d*d} = ${val}\\)`,
        topic: 'alg_productos'
      };
    }
  };

  MM_TOPIC_GENERATORS['alg_productos'] = [
    'alg_cuad_suma','alg_cuad_diferencia','alg_prod_suma_dif',
    'alg_cubo_binomio','alg_producto_binomios','alg_aplicar_notable_numerico'
  ];

  // ══════════════════════════════════════════════════════════════
  // 4. FACTORIZACIÓN
  // ══════════════════════════════════════════════════════════════

  G['alg_factor_comun'] = function(diff) {
    const f = ri(2, diffCfg(diff,[5,8,12,20]));
    const a = ri(1,6), b = ri(1,6);
    const p = f*a, q = f*b;
    const v = pick(['x','y','a','n']);
    return {
      question: `Factoriza extrayendo el factor común: \\(${p}${v} + ${q}\\)`,
      answer: `${f}(${a}${v}+${b})`, type: 'numeric',
      hint: `MCD(${p}, ${q}) = ${f}. Extrae ${f} como factor común.`,
      solution: `\\(${p}${v} + ${q} = ${f}(${a}${v} + ${b})\\)`,
      solutionSteps: [
        `MCD(${p}, ${q}) = ${f}`,
        `\\(${p}${v} ÷ ${f} = ${a}${v}\\)`,
        `\\(${q} ÷ ${f} = ${b}\\)`,
        `Resultado: \\(${f}(${a}${v} + ${b})\\)`
      ],
      topic: 'alg_factorizacion',
      analyzeError: (ua) => {
        if (ua && ua.includes(String(f+1))) return { feedback: `${f} no es el MCD correcto. Verifica: MCD(${p}, ${q}) = ${f}.` };
        return { feedback: `Para factorizar, encuentra el MCD de los coeficientes y divídelos: MCD(${p},${q})=${f}.` };
      }
    };
  };

  G['alg_factor_comun_variable'] = function(diff) {
    const f = ri(2, diffCfg(diff,[4,6,8,10]));
    const ep = ri(1, diffCfg(diff,[2,3,4,5]));
    const a = ri(1,5), b = ri(1,5);
    const v = pick(['x','y','a']);
    // f·v^(ep+1)·a + f·v^ep·b = f·v^ep·(a·v + b)
    return {
      question: `Factoriza: \\(${f*a}${v}^{${ep+1}} + ${f*b}${v}^{${ep}}\\)`,
      answer: `${f}${v}^${ep}(${a}${v}+${b})`, type: 'numeric',
      hint: `El factor común incluye el número (${f}) y la potencia de menor grado (\\(${v}^{${ep}}\\)).`,
      solution: `\\(${f}${v}^{${ep}}(${a}${v} + ${b})\\)`,
      topic: 'alg_factorizacion'
    };
  };

  G['alg_dif_cuadrados'] = function(diff) {
    const a = ri(1, diffCfg(diff,[4,7,10,15]));
    const b = ri(1, diffCfg(diff,[4,7,10,15]));
    const v = pick(['x','y','a']);
    return {
      question: `Factoriza: \\(${a*a}${v}^2 - ${b*b}\\)`,
      answer: `(${coef(a,v)}+${b})(${coef(a,v)}-${b})`, type: 'numeric',
      hint: `\\(A^2 - B^2 = (A+B)(A-B)\\). Aquí \\(A=${a}${v}\\) y \\(B=${b}\\).`,
      solution: `\\(${a*a}${v}^2 - ${b*b} = (${coef(a,v)}+${b})(${coef(a,v)}-${b})\\)`,
      topic: 'alg_factorizacion',
      analyzeError: (ua) => {
        if (ua && ua.includes('+') && !ua.includes('-')) return { feedback: `En diferencia de cuadrados uno de los factores lleva resta: \\((A+B)(A-B)\\), no dos sumas.` };
        return { feedback: `Identifica A y B: \\(${a*a}${v}^2 = (${a}${v})^2\\) y \\(${b*b} = ${b}^2\\). Aplica \\(A^2-B^2=(A+B)(A-B)\\).` };
      }
    };
  };

  G['alg_trinomio_perfecto'] = function(diff) {
    const a = ri(1, diffCfg(diff,[4,6,8,12]));
    const b = ri(1, diffCfg(diff,[4,6,8,12]));
    const v = 'x';
    const r2 = a*a, r1 = 2*a*b, r0 = b*b;
    const tipo = pick(['+','-']);
    const expr = tipo === '+' ? `${r2}${v}^2 + ${r1}${v} + ${r0}` : `${r2}${v}^2 - ${r1}${v} + ${r0}`;
    const factor = tipo === '+' ? `(${coef(a,v)}+${b})²` : `(${coef(a,v)}-${b})²`;
    return {
      question: `Factoriza el trinomio cuadrado perfecto: \\(${expr}\\)`,
      answer: factor, type: 'numeric',
      hint: `Verifica: \\(\\sqrt{${r2}${v}^2} = ${a}${v}\\), \\(\\sqrt{${r0}} = ${b}\\), término medio = \\(${tipo === '+' ? '' : '-'}2·${a}${v}·${b} = ${tipo}${r1}${v}\\). ✓`,
      solution: `\\(${expr} = (${coef(a,v)}${tipo}${b})^2\\)`,
      topic: 'alg_factorizacion',
      analyzeError: () => ({ feedback: `Un trinomio es cuadrado perfecto cuando el término medio = ±2·√primer_término·√último_término.` })
    };
  };

  G['alg_trinomio_x2bxc'] = function(diff) {
    const r1 = ri(-diffCfg(diff,[4,6,8,10]), diffCfg(diff,[4,6,8,10]));
    const r2 = ri(-diffCfg(diff,[4,6,8,10]), diffCfg(diff,[4,6,8,10]));
    if (r1 === 0 || r2 === 0 || r1 === r2) return G['alg_trinomio_x2bxc'](diff);
    const b = r1 + r2, c = r1 * r2;
    const bStr = b >= 0 ? `+${b}` : String(b);
    const cStr = c >= 0 ? `+${c}` : String(c);
    return {
      question: `Factoriza: \\(x^2 ${bStr}x ${cStr}\\)`,
      answer: `(x${r1>=0?'+':''}${r1})(x${r2>=0?'+':''}${r2})`, type: 'numeric',
      hint: `Busca dos números cuya suma sea ${b} y cuyo producto sea ${c}.`,
      solution: `\\(x^2 ${bStr}x ${cStr} = (x${r1>=0?'+':''}${r1})(x${r2>=0?'+':''}${r2})\\)`,
      solutionSteps: [
        `Necesito p+q=${b} y p·q=${c}`,
        `Pruebo: p=${r1}, q=${r2} → suma=${r1+r2}=${b} ✓, producto=${r1*r2}=${c} ✓`,
        `Factores: \\((x${r1>=0?'+':''}${r1})(x${r2>=0?'+':''}${r2})\\)`
      ],
      topic: 'alg_factorizacion',
      analyzeError: (ua) => {
        if (ua && ua.includes(String(b)) && ua.includes(String(c))) return { feedback: `Cuidado: los números en los factores son las raíces (${r1} y ${r2}), no los coeficientes b=${b} o c=${c}.` };
        return { feedback: `Busca dos números que SUMADOS den ${b} y MULTIPLICADOS den ${c}.` };
      }
    };
  };

  G['alg_factorizar_ax2bxc'] = function(diff) {
    if (['easy','medio'].includes(diff)) return G['alg_trinomio_x2bxc'](diff);
    const a = ri(2,4), p = ri(-5,5) || 1, q = ri(-5,5) || 1;
    if (p === 0 || q === 0) return G['alg_factorizar_ax2bxc'](diff);
    const b = a*(p+q), c = a*p*q;
    const bStr = b >= 0 ? `+${b}` : String(b);
    const cStr = c >= 0 ? `+${c}` : String(c);
    return {
      question: `Factoriza completamente: \\(${a}x^2 ${bStr}x ${cStr}\\)`,
      answer: `${a}(x${p>=0?'+':''}${p})(x${q>=0?'+':''}${q})`, type: 'numeric',
      hint: `Primero extrae el factor común ${a}, luego factoriza \\(x^2 ${sign(p+q)}${p+q}x ${sign(p*q)}${p*q}\\).`,
      solution: `\\(${a}(x^2 ${sign(p+q)}${p+q}x ${sign(p*q)}${p*q}) = ${a}(x${p>=0?'+':''}${p})(x${q>=0?'+':''}${q})\\)`,
      topic: 'alg_factorizacion'
    };
  };

  MM_TOPIC_GENERATORS['alg_factorizacion'] = [
    'alg_factor_comun','alg_factor_comun_variable','alg_dif_cuadrados',
    'alg_trinomio_perfecto','alg_trinomio_x2bxc','alg_factorizar_ax2bxc'
  ];

  // ══════════════════════════════════════════════════════════════
  // 5. POLINOMIOS
  // ══════════════════════════════════════════════════════════════

  G['alg_pol_grado'] = function(diff) {
    const grado = ri(1, diffCfg(diff,[3,4,6,8]));
    const terms = [];
    for (let i = grado; i >= 0; i--) {
      const cf = ri(-8,8) || 1;
      if (i > 1) terms.push(`${sign(cf)}${cf}x^{${i}}`);
      else if (i === 1) terms.push(`${sign(cf)}${cf}x`);
      else terms.push(`${sign(cf)}${cf}`);
    }
    const expr = terms.join(' ').replace(/^\+/,'').replace(/ \+/g,' +');
    return {
      question: `¿Cuál es el grado del polinomio \\(${expr}\\)?`,
      answer: String(grado), type: 'numeric',
      hint: 'El grado es el mayor exponente de la variable en el polinomio.',
      solution: `El mayor exponente es ${grado}. Grado = ${grado}.`,
      topic: 'alg_polinomios',
      analyzeError: () => ({ feedback: 'El grado de un polinomio es el mayor exponente que aparece, aunque no sea el primer término.' })
    };
  };

  G['alg_pol_valor'] = function(diff) {
    const a = ri(-4,4) || 1, b = ri(-5,5), c = ri(-8,8);
    const x = ri(-diffCfg(diff,[2,3,4,5]), diffCfg(diff,[2,3,4,5]));
    const val = a*x*x + b*x + c;
    return {
      question: `Evalúa el polinomio \\(P(x) = ${a}x^2 ${sign(b)}${b}x ${sign(c)}${c}\\) en \\(x=${x}\\).`,
      answer: String(val), type: 'numeric',
      hint: `Sustituye y opera: \\(${a}(${x})^2 + ${b}(${x}) + ${c}\\).`,
      solution: `\\(P(${x}) = ${a}(${x*x}) + ${b}(${x}) + ${c} = ${a*x*x} + ${b*x} + ${c} = ${val}\\)`,
      topic: 'alg_polinomios'
    };
  };

  G['alg_pol_division_monomio'] = function(diff) {
    const d = ri(2, diffCfg(diff,[3,5,8,12]));
    const a = ri(1,6)*d, b = ri(1,6)*d;
    const v = 'x';
    const exp = ri(2, diffCfg(diff,[3,4,5,6]));
    return {
      question: `Divide: \\(\\dfrac{${a}${v}^{${exp}} + ${b}${v}}{${d}${v}}\\)`,
      answer: `${a/d}x^${exp-1}+${b/d}`, type: 'numeric',
      hint: `Divide cada término por \\(${d}${v}\\) por separado.`,
      solution: `\\(\\dfrac{${a}${v}^{${exp}}}{${d}${v}} + \\dfrac{${b}${v}}{${d}${v}} = ${a/d}${v}^{${exp-1}} + ${b/d}\\)`,
      topic: 'alg_polinomios'
    };
  };

  G['alg_pol_ruffini'] = function(diff) {
    if (['easy','medio'].includes(diff)) return G['alg_pol_valor'](diff);
    const r = ri(-3,3) || 1;
    const a = ri(1,3), b = ri(-5,5), c = ri(-8,8);
    // P(x) = ax³ + bx² + cx + d where d = -r*(ax²+bx+c evaluated at x=r wouldn't work)
    // Instead: P(x) = a(x-r)(x²+px+q) = a*x³ + ...
    const p = ri(-3,3), q = ri(-5,5);
    // coefs: a, a*p-a*r, a*q-a*r*p, -a*r*q
    const A = a, B = a*(p-r), C = a*(q-r*p), D = -a*r*q;
    return {
      question: `Aplica Ruffini para verificar que \\(x = ${r}\\) es raíz de \\(P(x) = ${A}x^3 ${sign(B)}${B}x^2 ${sign(C)}${C}x ${sign(D)}${D}\\).\\n¿Cuál es el resto?`,
      answer: '0', type: 'numeric',
      hint: `Si x=${r} es raíz, entonces P(${r})=0 (el resto de Ruffini es cero).`,
      solution: `Al aplicar Ruffini con divisor x=${r}, el resto es 0 porque x=${r} es raíz del polinomio.`,
      topic: 'alg_polinomios'
    };
  };

  G['alg_pol_teorema_resto'] = function(diff) {
    if (diff === 'easy') return G['alg_pol_valor']('easy');
    const r = ri(-3,3) || 1;
    const a = ri(1,3), b = ri(-5,5), c = ri(-8,8), d = ri(-8,8);
    const rest = a*r*r*r + b*r*r + c*r + d;
    return {
      question: `Por el Teorema del Resto, el resto de dividir \\(${a}x^3 ${sign(b)}${b}x^2 ${sign(c)}${c}x ${sign(d)}${d}\\) entre \\((x - ${r})\\) es P(${r}). ¿Cuánto vale ese resto?`,
      answer: String(rest), type: 'numeric',
      hint: `P(${r}) = ${a}(${r})³ + ${b}(${r})² + ${c}(${r}) + ${d}.`,
      solution: `\\(P(${r}) = ${a*r*r*r} + ${b*r*r} + ${c*r} + ${d} = ${rest}\\)`,
      topic: 'alg_polinomios'
    };
  };

  MM_TOPIC_GENERATORS['alg_polinomios'] = [
    'alg_pol_grado','alg_pol_valor','alg_pol_division_monomio',
    'alg_pol_ruffini','alg_pol_teorema_resto'
  ];

  // ══════════════════════════════════════════════════════════════
  // 6. ECUACIONES DE PRIMER GRADO
  // ══════════════════════════════════════════════════════════════

  G['alg_ec1_simple'] = function(diff) {
    const a = ri(1, diffCfg(diff,[5,10,20,50]));
    const x = ri(-diffCfg(diff,[5,10,20,50]), diffCfg(diff,[5,10,20,50]));
    const b = ri(-10, 10);
    const rhs = a*x + b;
    return {
      question: `Resuelve: \\(${a}x ${sign(b)}${b} = ${rhs}\\)`,
      answer: String(x), type: 'numeric',
      hint: `Pasa ${b} al otro lado y divide por ${a}.`,
      solution: `\\(${a}x = ${rhs} - ${b} = ${rhs-b}\\) → \\(x = \\dfrac{${rhs-b}}{${a}} = ${x}\\)`,
      solutionSteps: [
        `Pasa el término independiente: \\(${a}x = ${rhs-b}\\)`,
        `Divide por ${a}: \\(x = ${x}\\)`
      ],
      topic: 'alg_ec1',
      analyzeError: (ua) => {
        if (parseFloat(ua) === rhs/a) return { feedback: `Dividiste ${rhs} entre ${a} sin antes mover el ${b}. Primero pasa ${b} al otro lado: \\(${a}x = ${rhs-b}\\).` };
        if (parseFloat(ua) === (rhs+b)/a) return { feedback: `Sumaste ${b} en vez de restarlo. Recuerda: al pasar un término al otro lado cambia de signo.` };
        return { feedback: `Aísla x: primero pasa ${b} al otro lado (cambia signo → ${-b}), luego divide por ${a}.` };
      }
    };
  };

  G['alg_ec1_parentesis'] = function(diff) {
    const a = ri(1, diffCfg(diff,[4,6,8,12]));
    const b = ri(-6,6);
    const c = ri(1, diffCfg(diff,[4,6,8,12]));
    const x = ri(-diffCfg(diff,[4,6,8,12]), diffCfg(diff,[4,6,8,12]));
    const lhs = a*(x + b);
    const rhs = c*x + lhs - c*x;
    // ax + ab = cx + rhs - cx → (a-c)x = rhs - ab
    // Let's fix rhs so it works cleanly
    const ab = a*b;
    const rhs2 = (a-c)*x + ab + c*x; // = ax + ab - cx + cx = ax + ab... hmm
    // Better: generate clean problem
    // (a)(x + b) = c*x + d  where d = a*x + a*b - c*x = (a-c)x + ab
    const d = a*(x+b) - c*x; // rhs constant part when c*x is moved
    // So equation: a(x+b) = cx + d
    if (a === c) return G['alg_ec1_parentesis'](diff);
    return {
      question: `Resuelve: \\(${a}(x ${sign(b)}${b}) = ${c}x ${sign(d)}${d}\\)`,
      answer: String(x), type: 'numeric',
      hint: `Primero distribuye: \\(${a}x ${sign(ab)}${ab} = ${c}x ${sign(d)}${d}\\).`,
      solution: `\\(${a}x ${sign(ab)}${ab} = ${c}x ${sign(d)}${d}\\) → \\(${a-c}x = ${d-ab}\\) → \\(x = ${x}\\)`,
      solutionSteps: [
        `Distribuye: \\(${a}x + ${ab} = ${c}x + ${d}\\)`,
        `Agrupa x: \\((${a}-${c})x = ${d} - ${ab} = ${d-ab}\\)`,
        `Divide: \\(x = ${d-ab}/${a-c} = ${x}\\)`
      ],
      topic: 'alg_ec1',
      analyzeError: (ua) => {
        if (parseFloat(ua) === (d-ab)) return { feedback: `Olvidaste dividir por el coeficiente. Después de \\(${a-c}x = ${d-ab}\\) hay que dividir por ${a-c}.` };
        return { feedback: `Primero distribuye el paréntesis, luego agrupa los términos con x a un lado y las constantes al otro.` };
      }
    };
  };

  G['alg_ec1_fracciones'] = function(diff) {
    if (diff === 'easy') return G['alg_ec1_simple']('easy');
    const d1 = pick([2,3,4,5,6]), d2 = pick([2,3,4,5,6].filter(v=>v!==d1));
    const x = ri(-8,8);
    const n1 = ri(1,5), n2 = ri(1,5), c = ri(-8,8);
    const lhs_val = n1*x / d1;
    const rhs_val = n2*x / d2 + c;
    // equation: (n1/d1)x = (n2/d2)x + c
    // Already set up as: solve for x with these values
    // Let's compute what c must be
    const realC = (n1/d1 - n2/d2)*x;
    if (!Number.isFinite(realC) || !Number.isInteger(realC*d1*d2)) return G['alg_ec1_fracciones'](diff);
    const lcd = d1*d2/gcd(d1,d2);
    return {
      question: `Resuelve: \\(\\dfrac{${n1}}{${d1}}x = \\dfrac{${n2}}{${d2}}x + ${realC}\\)`,
      answer: String(x), type: 'numeric',
      hint: `Multiplica todo por el MCM(${d1},${d2})=${lcd} para eliminar denominadores.`,
      solution: `Multiplico por ${lcd}: \\(${n1*lcd/d1}x = ${n2*lcd/d2}x + ${realC*lcd}\\) → \\(${(n1*lcd/d1 - n2*lcd/d2)}x = ${realC*lcd}\\) → \\(x = ${x}\\)`,
      topic: 'alg_ec1'
    };
  };

  G['alg_ec1_problema'] = function(diff) {
    const problems = [
      () => {
        const precio = ri(5,50)*10, desc = pick([10,15,20,25]);
        const final = precio * (1-desc/100);
        return { q:`El precio de un artículo con ${desc}% de descuento es $${final}. ¿Cuál era el precio original?`, x:precio, hint:`Precio×(1-${desc}/100) = ${final}. Despeja el precio.`, sol:`\\(x × ${(100-desc)/100} = ${final}\\) → \\(x = ${final/${(100-desc)/100}} = ${precio}\\)` };
      },
      () => {
        const n = ri(5,30);
        const sum = n + (n+2) + (n+4);
        return { q:`La suma de tres enteros consecutivos impares es ${sum}. ¿Cuál es el menor?`, x:n, hint:`Sea el menor n. Los tres son n, n+2, n+4. Suma = ${sum}.`, sol:`\\(n + n+2 + n+4 = ${sum}\\) → \\(3n + 6 = ${sum}\\) → \\(n = ${n}\\)` };
      },
      () => {
        const edad_hijo = ri(8,20), diff_e = ri(15,30);
        const edad_padre = edad_hijo + diff_e;
        return { q:`Un padre tiene ${diff_e} años más que su hijo. Juntos suman ${edad_hijo + edad_padre} años. ¿Qué edad tiene el hijo?`, x:edad_hijo, hint:`Sea hijo = x. Padre = x+${diff_e}. Suma = ${edad_hijo+edad_padre}.`, sol:`\\(x + x + ${diff_e} = ${edad_hijo+edad_padre}\\) → \\(2x = ${2*edad_hijo}\\) → \\(x = ${edad_hijo}\\)` };
      }
    ];
    const p = pick(problems)();
    return {
      question: p.q, answer: String(p.x), type: 'numeric',
      hint: p.hint, solution: p.sol,
      topic: 'alg_ec1'
    };
  };

  MM_TOPIC_GENERATORS['alg_ec1'] = [
    'alg_ec1_simple','alg_ec1_parentesis','alg_ec1_fracciones','alg_ec1_problema'
  ];

  // ══════════════════════════════════════════════════════════════
  // 7. ECUACIONES DE SEGUNDO GRADO
  // ══════════════════════════════════════════════════════════════

  G['alg_ec2_formula'] = function(diff) {
    const r1 = ri(-diffCfg(diff,[3,5,8,12]), diffCfg(diff,[3,5,8,12]));
    const r2 = ri(-diffCfg(diff,[3,5,8,12]), diffCfg(diff,[3,5,8,12]));
    if (r1 === r2) return G['alg_ec2_formula'](diff);
    const a = 1;
    const b = -(r1+r2), c = r1*r2;
    const bStr = b >= 0 ? `+${b}` : String(b);
    const cStr = c >= 0 ? `+${c}` : String(c);
    const disc = b*b - 4*a*c;
    const smaller = Math.min(r1,r2), larger = Math.max(r1,r2);
    return {
      question: `Resuelve: \\(x^2 ${bStr}x ${cStr} = 0\\)`,
      answer: `${smaller};${larger}`, type: 'numeric',
      hint: `Fórmula: \\(x = \\dfrac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\) con \\(a=1, b=${b}, c=${c}\\). Discriminante: \\(\\Delta=${disc}\\).`,
      solution: `\\(x = \\dfrac{${-b} \\pm \\sqrt{${disc}}}{2} = \\dfrac{${-b} \\pm ${Math.sqrt(disc)}}{2}\\) → \\(x_1=${smaller},\\; x_2=${larger}\\)`,
      solutionSteps: [
        `Identificar: \\(a=1, b=${b}, c=${c}\\)`,
        `Discriminante: \\(\\Delta = ${b}^2 - 4(1)(${c}) = ${b*b} - ${4*c} = ${disc}\\)`,
        `\\(x = \\dfrac{${-b} \\pm ${Math.sqrt(disc)}}{2}\\)`,
        `\\(x_1 = \\dfrac{${-b}+${Math.sqrt(disc)}}{2} = ${larger}\\)`,
        `\\(x_2 = \\dfrac{${-b}-${Math.sqrt(disc)}}{2} = ${smaller}\\)`
      ],
      topic: 'alg_ec2',
      analyzeError: (ua) => {
        if (ua && !ua.includes(';') && !ua.includes(',')) return { feedback: `Una ecuación de segundo grado generalmente tiene DOS soluciones. ¿Encontraste ambas? Sepáralas con ";"` };
        return { feedback: `Verifica el discriminante: \\(\\Delta = b^2 - 4ac = ${b}^2 - 4·${c} = ${disc}\\). Luego aplica la fórmula.` };
      }
    };
  };

  G['alg_ec2_factorizando'] = function(diff) {
    const r1 = ri(-diffCfg(diff,[4,6,8,10]), diffCfg(diff,[4,6,8,10]));
    const r2 = ri(-diffCfg(diff,[4,6,8,10]), diffCfg(diff,[4,6,8,10]));
    if (r1 === r2 || r1===0 || r2===0) return G['alg_ec2_factorizando'](diff);
    const b = -(r1+r2), c = r1*r2;
    const bStr = b >= 0 ? `+${b}` : String(b);
    const cStr = c >= 0 ? `+${c}` : String(c);
    return {
      question: `Factoriza para resolver: \\(x^2 ${bStr}x ${cStr} = 0\\)`,
      answer: `${Math.min(r1,r2)};${Math.max(r1,r2)}`, type: 'numeric',
      hint: `Busca p,q con p+q=${b} y p·q=${c}. Factoriza como \\((x-${r1})(x-${r2})=0\\).`,
      solution: `\\((x${-r1>=0?'+':''}${-r1})(x${-r2>=0?'+':''}${-r2}) = 0\\) → \\(x=${r1}\\) o \\(x=${r2}\\)`,
      topic: 'alg_ec2'
    };
  };

  G['alg_ec2_discriminante'] = function(diff) {
    const tipo = pick(['dos_reales','una_raiz','sin_reales']);
    const d = tipo === 'dos_reales' ? ri(1,20)*4 : tipo === 'una_raiz' ? 0 : -ri(1,15);
    const b = ri(-6,6), a = 1;
    // c so that disc = b²-4c = d → c = (b²-d)/4
    const c_num = b*b - d;
    if (c_num % 4 !== 0) return G['alg_ec2_discriminante'](diff);
    const c = c_num / 4;
    const cStr = c >= 0 ? `+${c}` : String(c);
    const bStr = b >= 0 ? `+${b}` : String(b);
    const opts = ['Dos raíces reales distintas','Una raíz real doble','Sin raíces reales'];
    const idx = tipo === 'dos_reales' ? 0 : tipo === 'una_raiz' ? 1 : 2;
    return {
      question: `Calcula el discriminante de \\(x^2 ${bStr}x ${cStr} = 0\\) y determina el tipo de soluciones.`,
      answer: String(idx), type: 'multiple-choice', options: opts,
      hint: `\\(\\Delta = b^2 - 4ac = ${b}^2 - 4(${c}) = ${d}\\). Si \\(\\Delta > 0\\): dos reales. Si \\(\\Delta = 0\\): una raíz doble. Si \\(\\Delta < 0\\): sin raíces reales.`,
      solution: `\\(\\Delta = ${d}\\). ${opts[idx]}.`,
      topic: 'alg_ec2',
      analyzeError: () => ({ feedback: `Discriminante Δ = b²-4ac. Δ>0 → 2 raíces reales distintas. Δ=0 → 1 raíz doble. Δ<0 → sin raíces reales.` })
    };
  };

  G['alg_ec2_problema'] = function(diff) {
    const n = ri(2, diffCfg(diff,[8,12,18,25]));
    const problems = [
      { q:`Un rectángulo tiene largo ${n} más que el ancho. Su área es ${n*(n-2) + (n-2)*(n-2)} cm². ¿Cuánto mide el ancho? (ancho positivo)`,
        // largo = ancho + n, area = w*(w+n) = w²+nw
        // Let's pick simpler: w*(w+n) = target
        ans: n-2, sol: `Sea ancho = x. Largo = x+${n}. Área: \\(x(x+${n}) = x^2+${n}x\\). Igualando y resolviendo.` }
    ];
    // Generate clean problem: w*(w+n) where w = ri(1,10)
    const w = ri(1, diffCfg(diff,[6,10,15,20]));
    const area = w*(w+n);
    return {
      question: `Un rectángulo tiene largo \\(${n}\\) cm más que su ancho y su área es \\(${area}\\) cm². ¿Cuánto mide el ancho?`,
      answer: String(w), type: 'numeric',
      hint: `Sea ancho = x. Entonces largo = x+${n}. Área = x(x+${n}) = ${area}. Despeja x.`,
      solution: `\\(x^2 + ${n}x - ${area} = 0\\). Raíces: x=${w} y x=${-(w+n)} (negativa rechazada). Ancho = ${w} cm.`,
      topic: 'alg_ec2'
    };
  };

  G['alg_ec2_vieta'] = function(diff) {
    if (['easy'].includes(diff)) return G['alg_ec2_formula']('easy');
    const r1 = ri(-6,6), r2 = ri(-6,6);
    const suma = r1+r2, prod = r1*r2;
    const tipo = pick(['suma','producto']);
    return {
      question: `Una ecuación \\(x^2 + bx + c = 0\\) tiene raíces \\(x_1=${r1}\\) y \\(x_2=${r2}\\). ${tipo==='suma'?'¿Cuánto vale \\(b\\)?':'¿Cuánto vale \\(c\\)?'}`,
      answer: tipo === 'suma' ? String(-suma) : String(prod),
      type: 'numeric',
      hint: `Por Vieta: \\(x_1+x_2 = -b\\) y \\(x_1·x_2 = c\\).`,
      solution: tipo === 'suma'
        ? `\\(x_1+x_2 = ${r1}+${r2} = ${suma} = -b\\) → \\(b = ${-suma}\\)`
        : `\\(x_1·x_2 = ${r1}·${r2} = ${prod} = c\\)`,
      topic: 'alg_ec2'
    };
  };

  MM_TOPIC_GENERATORS['alg_ec2'] = [
    'alg_ec2_formula','alg_ec2_factorizando','alg_ec2_discriminante',
    'alg_ec2_problema','alg_ec2_vieta'
  ];

  // ══════════════════════════════════════════════════════════════
  // 8. SISTEMAS DE ECUACIONES
  // ══════════════════════════════════════════════════════════════

  G['alg_sist_sustitucion'] = function(diff) {
    const x = ri(-diffCfg(diff,[4,6,8,12]), diffCfg(diff,[4,6,8,12]));
    const y = ri(-diffCfg(diff,[4,6,8,12]), diffCfg(diff,[4,6,8,12]));
    const a1 = ri(1,4), b1 = ri(1,4);
    const a2 = ri(1,4), b2 = ri(1,4);
    if (a1*b2 === a2*b1) return G['alg_sist_sustitucion'](diff);
    const c1 = a1*x + b1*y;
    const c2 = a2*x + b2*y;
    return {
      question: `Resuelve por sustitución:\n\\[\\begin{cases}${a1}x + ${b1}y = ${c1}\\\\${a2}x + ${b2}y = ${c2}\\end{cases}\\]\nEscribe la respuesta como "x;y"`,
      answer: `${x};${y}`, type: 'numeric',
      hint: `Despeja una variable de la primera ecuación y sustitúyela en la segunda.`,
      solution: `Solución: \\(x=${x},\\; y=${y}\\)`,
      solutionSteps: [
        `De ec.1: \\(x = \\dfrac{${c1} - ${b1}y}{${a1}}\\)`,
        `Sustituye en ec.2: \\(${a2}\\left(\\dfrac{${c1}-${b1}y}{${a1}}\\right) + ${b2}y = ${c2}\\)`,
        `Resuelve para y: \\(y = ${y}\\)`,
        `Sustituye y=${y} en ec.1: \\(x = ${x}\\)`
      ],
      topic: 'alg_sistemas',
      analyzeError: (ua) => {
        if (!ua || !ua.includes(';')) return { feedback: 'La solución debe tener dos valores: escríbela como "x;y", por ejemplo "3;-2".' };
        const [ux,uy] = ua.split(';').map(Number);
        if (ux===y && uy===x) return { feedback: '¡Invertiste x e y! Verifica cuál es cuál en la solución.' };
        return { feedback: 'Verifica tu solución sustituyendo x e y en ambas ecuaciones originales.' };
      }
    };
  };

  G['alg_sist_eliminacion'] = function(diff) {
    const x = ri(-diffCfg(diff,[4,6,8,12]), diffCfg(diff,[4,6,8,12]));
    const y = ri(-diffCfg(diff,[4,6,8,12]), diffCfg(diff,[4,6,8,12]));
    const a1 = ri(1,4), b1 = ri(1,4);
    const a2 = ri(1,4), b2 = ri(1,4);
    if (a1*b2 === a2*b1) return G['alg_sist_eliminacion'](diff);
    const c1 = a1*x + b1*y;
    const c2 = a2*x + b2*y;
    return {
      question: `Resuelve por eliminación (suma/resta):\n\\[\\begin{cases}${a1}x + ${b1}y = ${c1}\\\\${a2}x + ${b2}y = ${c2}\\end{cases}\\]\nEscribe "x;y"`,
      answer: `${x};${y}`, type: 'numeric',
      hint: `Multiplica las ecuaciones para que los coeficientes de una variable sean iguales y réstalas.`,
      solution: `Multiplica ec.1 por ${a2} y ec.2 por ${a1}, luego resta para eliminar x. Obtienes y=${y}, luego x=${x}.`,
      topic: 'alg_sistemas'
    };
  };

  G['alg_sist_clasificacion'] = function(diff) {
    const tipo = pick(['compatible_det','compatible_ind','incompatible']);
    let ec1, ec2, desc;
    if (tipo === 'compatible_det') {
      ec1 = '2x + y = 5'; ec2 = 'x - y = 1'; desc = 'Una solución única';
    } else if (tipo === 'compatible_ind') {
      ec1 = '2x + 4y = 8'; ec2 = 'x + 2y = 4'; desc = 'Infinitas soluciones (ecuaciones proporcionales)';
    } else {
      ec1 = '2x + y = 5'; ec2 = '2x + y = 3'; desc = 'Sin solución (paralelas)';
    }
    const opts = ['Una solución única','Infinitas soluciones','Sin solución'];
    const idx = opts.indexOf(desc.split(' (')[0].split('(')[0].trim());
    const safeIdx = ['compatible_det','compatible_ind','incompatible'].indexOf(tipo);
    return {
      question: `Clasifica el sistema:\n\\[\\begin{cases}${ec1}\\\\${ec2}\\end{cases}\\]`,
      answer: String(safeIdx), type: 'multiple-choice',
      options: ['Compatible determinado (1 solución)','Compatible indeterminado (∞ soluciones)','Incompatible (0 soluciones)'],
      hint: 'Compara las razones de los coeficientes: a1/a2, b1/b2, c1/c2.',
      solution: `${opts[safeIdx]}: ${tipo==='compatible_det'?'Las razones de coeficientes no son iguales.': tipo==='compatible_ind'?'Todas las razones son iguales (ecuaciones equivalentes).':'a1/a2=b1/b2≠c1/c2 (paralelas).'}`,
      topic: 'alg_sistemas',
      analyzeError: () => ({ feedback: 'Si a1/a2 ≠ b1/b2: 1 solución. Si a1/a2=b1/b2=c1/c2: infinitas. Si a1/a2=b1/b2≠c1/c2: sin solución.' })
    };
  };

  G['alg_sist_problema'] = function(diff) {
    const x = ri(2, diffCfg(diff,[10,20,30,50]));
    const y = ri(2, diffCfg(diff,[10,20,30,50]));
    const problems = [
      { q:`El doble de un número más otro es ${2*x+y}, y su diferencia es ${x-y}. ¿Cuáles son?`, a:`${x};${y}`, h:`Sea el mayor x, el menor y. Sistema: 2x+y=${2*x+y}, x-y=${x-y}.` },
      { q:`Dos artículos cuestan $${x+y} juntos y el primero cuesta $${x-y} más que el segundo. ¿Cuánto cuesta cada uno?`, a:`${x};${y}`, h:`x+y=${x+y} y x-y=${x-y}.` }
    ];
    const p = pick(problems);
    return {
      question: p.q, answer: p.a, type: 'numeric',
      hint: p.h,
      solution: `x=${x}, y=${y}`,
      topic: 'alg_sistemas'
    };
  };

  MM_TOPIC_GENERATORS['alg_sistemas'] = [
    'alg_sist_sustitucion','alg_sist_eliminacion','alg_sist_clasificacion','alg_sist_problema'
  ];

  // ══════════════════════════════════════════════════════════════
  // 9. INECUACIONES
  // ══════════════════════════════════════════════════════════════

  G['alg_ineq_lineal'] = function(diff) {
    const a = ri(1, diffCfg(diff,[4,6,8,12]));
    const b = ri(-10,10);
    const x0 = ri(-diffCfg(diff,[5,8,12,20]), diffCfg(diff,[5,8,12,20]));
    const rhs = a*x0 + b + ri(1,5)*pick([-1,1]); // rhs ≠ a*x0+b
    // a*x + b > rhs  →  x > (rhs-b)/a
    const lhs_at_x0 = a*x0 + b;
    const tipo = pick(['>','<','≥','≤']);
    const c = a*x0 + b + (tipo==='>'||tipo==='≥' ? -ri(1,5) : ri(1,5));
    const boundary = (c-b)/a;
    const intBoundary = Number.isInteger(boundary);
    if (!intBoundary) return G['alg_ineq_lineal'](diff);
    const sol = tipo === '>' ? `x > ${boundary}` : tipo === '<' ? `x < ${boundary}` : tipo === '≥' ? `x ≥ ${boundary}` : `x ≤ ${boundary}`;
    return {
      question: `Resuelve la inecuación: \\(${a}x ${sign(b)}${b} ${tipo} ${c}\\)`,
      answer: sol, type: 'numeric',
      hint: `Pasa ${b} al otro lado y divide por ${a} (signo ${a}>0: no cambia).`,
      solution: `\\(${a}x ${tipo} ${c-b}\\) → \\(x ${tipo} ${boundary}\\)`,
      solutionSteps: [
        `Pasa ${b}: \\(${a}x ${tipo} ${c-b}\\)`,
        `Divide por ${a}: \\(x ${tipo} ${boundary}\\)`,
        `Solución: \\(x ${tipo} ${boundary}\\) → intervalo: ${tipo==='>'?`(${boundary}, +∞)`: tipo==='<'?`(-∞, ${boundary})`: tipo==='≥'?`[${boundary}, +∞)`:`(-∞, ${boundary}]`}`
      ],
      topic: 'alg_inecuaciones',
      analyzeError: (ua) => {
        if (ua && (ua.includes('>') && (tipo==='<'||tipo==='≤')) || (ua.includes('<') && (tipo==='>'||tipo==='≥')))
          return { feedback: `El signo de la inecuación cambia SOLO si divides/multiplicas por un número NEGATIVO. Aquí dividiste por ${a} > 0, el signo no cambia.` };
        return { feedback: `Recuerda: el signo de la inecuación se invierte SOLO al multiplicar/dividir por un número negativo.` };
      }
    };
  };

  G['alg_ineq_doble'] = function(diff) {
    if (diff === 'easy') return G['alg_ineq_lineal']('easy');
    const a = ri(1, diffCfg(diff,[3,5,8,12]));
    const x1 = ri(-8,-1), x2 = ri(1,8);
    const L = a*x1 - ri(0,3), R = a*x2 + ri(0,3);
    // L < ax + b < R  →  (L-b)/a < x < (R-b)/a ... keep clean
    const b = ri(-5,5);
    const Lv = a*x1 + b, Rv = a*x2 + b;
    return {
      question: `Resuelve la inecuación doble: \\(${Lv} < ${a}x ${sign(b)}${b} < ${Rv}\\)`,
      answer: `${x1}<x<${x2}`, type: 'numeric',
      hint: `Resta ${b} en todos los miembros, luego divide por ${a}.`,
      solution: `\\(${Lv-b} < ${a}x < ${Rv-b}\\) → \\(${x1} < x < ${x2}\\)`,
      topic: 'alg_inecuaciones'
    };
  };

  G['alg_ineq_cuadratica'] = function(diff) {
    if (['easy','medio'].includes(diff)) return G['alg_ineq_lineal'](diff);
    const r1 = ri(-4,0), r2 = ri(1,5);
    const tipo = pick(['>','<']);
    // (x-r1)(x-r2) > 0 → x < r1 or x > r2
    // (x-r1)(x-r2) < 0 → r1 < x < r2
    const b = -(r1+r2), c = r1*r2;
    const bStr = b >= 0 ? `+${b}` : String(b);
    const cStr = c >= 0 ? `+${c}` : String(c);
    const sol = tipo === '>' ? `x<${r1} o x>${r2}` : `${r1}<x<${r2}`;
    return {
      question: `Resuelve: \\(x^2 ${bStr}x ${cStr} ${tipo} 0\\)`,
      answer: sol, type: 'numeric',
      hint: `Factoriza: \\((x${r1>=0?'-':'+'}${Math.abs(r1)})(x${r2>=0?'-':'+'}${Math.abs(r2)}) ${tipo} 0\\). Las raíces son \\(x=${r1}\\) y \\(x=${r2}\\).`,
      solution: tipo === '>'
        ? `Raíces: ${r1} y ${r2}. La parábola sube → mayor que 0 fuera del intervalo: \\(x<${r1}\\) o \\(x>${r2}\\).`
        : `Raíces: ${r1} y ${r2}. La parábola sube → menor que 0 entre las raíces: \\(${r1}<x<${r2}\\).`,
      topic: 'alg_inecuaciones'
    };
  };

  G['alg_ineq_intervalo'] = function(diff) {
    const a = ri(-5,5), b = ri(-5,5);
    const tipo = pick(['<','≤','>','≥']);
    const x0 = a + (tipo==='<'||tipo==='≤' ? -1 : 1);
    const opts = [
      tipo==='<'?`(-∞, ${a})`:tipo==='≤'?`(-∞, ${a}]`:tipo==='>'?`(${a}, +∞)`:`[${a}, +∞)`,
      tipo==='<'?`(${a}, +∞)`:tipo==='>'?`(-∞, ${a})`:`[${a}, +∞)`,
      `(-∞, +∞)`,
      tipo==='<'?`(-∞, ${a}]`:`(${a}, +∞)`
    ];
    const ans = opts[0];
    const shuffled = shuffle([...new Set(opts)]).slice(0,4);
    if (!shuffled.includes(ans)) shuffled[0] = ans;
    const idx = shuffled.indexOf(ans);
    return {
      question: `¿Cuál es el intervalo solución de \\(x ${tipo} ${a}\\)?`,
      answer: String(idx), type: 'multiple-choice', options: shuffled,
      hint: `Recuerda: \\(<\\) y \\(>\\) usan paréntesis (excluyen el extremo); \\(≤\\) y \\(≥\\) usan corchetes (incluyen el extremo).`,
      solution: ans,
      topic: 'alg_inecuaciones',
      analyzeError: () => ({ feedback: `Corchete "[" o "]" incluye el extremo (≤ o ≥). Paréntesis "(" o ")" excluye el extremo (< o >).` })
    };
  };

  MM_TOPIC_GENERATORS['alg_inecuaciones'] = [
    'alg_ineq_lineal','alg_ineq_doble','alg_ineq_cuadratica','alg_ineq_intervalo'
  ];

  // ══════════════════════════════════════════════════════════════
  // 10. FUNCIONES
  // ══════════════════════════════════════════════════════════════

  G['alg_func_evaluar'] = function(diff) {
    const a = ri(-4,4)||1, b = ri(-8,8);
    const x = ri(-diffCfg(diff,[3,5,8,12]), diffCfg(diff,[3,5,8,12]));
    const val = a*x + b;
    return {
      question: `Para \\(f(x) = ${a}x ${sign(b)}${b}\\), calcula \\(f(${x})\\).`,
      answer: String(val), type: 'numeric',
      hint: `Sustituye \\(x=${x}\\) en la función.`,
      solution: `\\(f(${x}) = ${a}(${x}) + ${b} = ${a*x} + ${b} = ${val}\\)`,
      topic: 'alg_funciones',
      analyzeError: (ua) => {
        if (parseFloat(ua) === a+b) return { feedback: `f(${x}) significa sustituir x por ${x}, no por 1. El resultado es ${a}×${x}+${b}=${val}.` };
        return { feedback: `Para evaluar f(${x}): reemplaza CADA "x" por ${x} en la expresión.` };
      }
    };
  };

  G['alg_func_evaluar_cuadratica'] = function(diff) {
    const a = ri(-3,3)||1, b = ri(-4,4), c = ri(-8,8);
    const x = ri(-diffCfg(diff,[2,3,4,6]), diffCfg(diff,[2,3,4,6]));
    const val = a*x*x + b*x + c;
    return {
      question: `Para \\(g(x) = ${a}x^2 ${sign(b)}${b}x ${sign(c)}${c}\\), calcula \\(g(${x})\\).`,
      answer: String(val), type: 'numeric',
      hint: `Sustituye \\(x=${x}\\): \\(${a}(${x})^2 + ${b}(${x}) + ${c}\\).`,
      solution: `\\(${a}(${x*x}) + ${b*x} + ${c} = ${val}\\)`,
      topic: 'alg_funciones'
    };
  };

  G['alg_func_lineal_pendiente'] = function(diff) {
    const m = ri(-5,5)||1, b = ri(-8,8);
    const tipos = [
      { q:`¿Cuál es la pendiente de \\(f(x) = ${m}x ${sign(b)}${b}\\)?`, a: String(m), h:'La pendiente es el coeficiente de x.' },
      { q:`¿Dónde corta al eje Y la función \\(f(x) = ${m}x ${sign(b)}${b}\\)?`, a: String(b), h:'La intersección con el eje Y es el término independiente.' },
      { q:`¿Dónde corta al eje X la función \\(f(x) = ${m}x ${sign(b)}${b}\\)?`, a: String(-b/m), h:'Igúala a 0 y despeja x.' }
    ];
    const t = pick(diffCfg(diff,[tipos.slice(0,2), tipos, tipos, tipos]));
    return {
      question: t.q, answer: t.a, type: 'numeric',
      hint: t.h,
      solution: `Respuesta: ${t.a}`,
      topic: 'alg_funciones',
      analyzeError: () => ({ feedback: 'En f(x)=mx+b: m es la pendiente (inclinación), b es la ordenada al origen (eje Y), y -b/m es la abscisa al origen (eje X).' })
    };
  };

  G['alg_func_compuesta'] = function(diff) {
    if (['easy','medio'].includes(diff)) return G['alg_func_evaluar'](diff);
    const a = ri(1,4), b = ri(-4,4);
    const c = ri(1,4), d = ri(-4,4);
    const x = ri(-3,3);
    const gx = c*x + d;      // g(x)
    const fgx = a*gx + b;    // f(g(x))
    return {
      question: `Sea \\(f(x) = ${a}x ${sign(b)}${b}\\) y \\(g(x) = ${c}x ${sign(d)}${d}\\). Calcula \\(f(g(${x}))\\).`,
      answer: String(fgx), type: 'numeric',
      hint: `Primero calcula \\(g(${x}) = ${c}(${x}) + ${d} = ${gx}\\), luego \\(f(${gx})\\).`,
      solution: `\\(g(${x}) = ${gx}\\). \\(f(${gx}) = ${a}(${gx}) + ${b} = ${a*gx} + ${b} = ${fgx}\\)`,
      topic: 'alg_funciones'
    };
  };

  G['alg_func_dominio'] = function(diff) {
    const n = ri(-8,8);
    const tipos = [
      { q:`¿Cuál es el dominio de \\(f(x) = \\sqrt{x ${sign(n)}${n}}\\)?`, a: n>=0?`x≥${-n}`:`x≥${-n}`, hint:`La raíz requiere que el radicando ≥ 0: \\(x+${n} \\geq 0\\).`, sol: n>=0?`x \\geq ${-n}`:`x \\geq ${-n}` },
      { q:`¿Cuál es el dominio de \\(f(x) = \\dfrac{1}{x ${sign(n)}${n}}\\)?`, a: `x≠${-n}`, hint:`El denominador no puede ser 0: \\(x+${n}\\neq 0\\) → \\(x\\neq ${-n}\\).`, sol:`x \\neq ${-n}` }
    ];
    const t = pick(diffCfg(diff,[tipos.slice(0,1), tipos, tipos, tipos]));
    return {
      question: t.q, answer: t.a, type: 'numeric',
      hint: t.hint, solution: `\\(${t.sol}\\)`,
      topic: 'alg_funciones',
      analyzeError: () => ({ feedback: 'Dominio de raíz cuadrada: radicando ≥ 0. Dominio de fracción: denominador ≠ 0.' })
    };
  };

  G['alg_func_imagen'] = function(diff) {
    const a = ri(1,4)||1, b = ri(-6,6);
    const y = ri(-8,8);
    const x = (y - b); // f(x) = x + b, then x = y-b... let's make it more interesting
    // f(x) = ax + b = y → x = (y-b)/a
    const xSol = (y-b)/a;
    if (!Number.isInteger(xSol)) return G['alg_func_imagen'](diff);
    return {
      question: `Para \\(f(x) = ${a}x ${sign(b)}${b}\\), ¿qué valor de x produce \\(f(x) = ${y}\\)?`,
      answer: String(xSol), type: 'numeric',
      hint: `Iguala la función a ${y} y despeja x: \\(${a}x + ${b} = ${y}\\).`,
      solution: `\\(${a}x = ${y-b}\\) → \\(x = ${xSol}\\)`,
      topic: 'alg_funciones'
    };
  };

  MM_TOPIC_GENERATORS['alg_funciones'] = [
    'alg_func_evaluar','alg_func_evaluar_cuadratica','alg_func_lineal_pendiente',
    'alg_func_compuesta','alg_func_dominio','alg_func_imagen'
  ];

  // ══════════════════════════════════════════════════════════════
  // 11. SUCESIONES Y PROGRESIONES
  // ══════════════════════════════════════════════════════════════

  G['alg_suc_aritmetica_termino'] = function(diff) {
    const a1 = ri(-5, diffCfg(diff,[10,20,50,100]));
    const d  = ri(1, diffCfg(diff,[5,8,12,20])) * pick([-1,1]);
    const n  = ri(3, diffCfg(diff,[8,12,18,25]));
    const an = a1 + (n-1)*d;
    return {
      question: `Una progresión aritmética tiene primer término \\(a_1 = ${a1}\\) y razón \\(d = ${d}\\). ¿Cuál es el término \\(a_{${n}}\\)?`,
      answer: String(an), type: 'numeric',
      hint: `Fórmula: \\(a_n = a_1 + (n-1)d\\). Con \\(n=${n}\\): \\(${a1} + (${n}-1)(${d})\\).`,
      solution: `\\(a_{${n}} = ${a1} + ${n-1}·(${d}) = ${a1} + ${(n-1)*d} = ${an}\\)`,
      topic: 'alg_sucesiones',
      analyzeError: (ua) => {
        if (parseFloat(ua) === a1 + n*d) return { feedback: `Usaste n en vez de (n-1). La fórmula es \\(a_n = a_1 + (n-1)d\\). El primer término (n=1) da \\(a_1+0·d = a_1\\).` };
        return { feedback: `Fórmula del término n: \\(a_n = a_1 + (n-1)·d\\). Sustituye n=${n}, a₁=${a1}, d=${d}.` };
      }
    };
  };

  G['alg_suc_aritmetica_suma'] = function(diff) {
    const a1 = ri(1, diffCfg(diff,[10,20,50,100]));
    const d  = ri(1, diffCfg(diff,[3,5,8,12]));
    const n  = ri(3, diffCfg(diff,[8,12,18,30]));
    const an = a1 + (n-1)*d;
    const S  = n*(a1+an)/2;
    return {
      question: `Calcula la suma de los primeros \\(${n}\\) términos de la progresión aritmética con \\(a_1=${a1}\\) y \\(d=${d}\\).`,
      answer: String(S), type: 'numeric',
      hint: `\\(S_n = \\dfrac{n(a_1+a_n)}{2}\\). Primero calcula \\(a_{${n}} = ${a1}+(${n}-1)(${d}) = ${an}\\).`,
      solution: `\\(a_{${n}}=${an}\\). \\(S_{${n}} = \\dfrac{${n}(${a1}+${an})}{2} = \\dfrac{${n}×${a1+an}}{2} = ${S}\\)`,
      topic: 'alg_sucesiones',
      analyzeError: (ua) => {
        if (parseFloat(ua) === n*(a1+d*(n-1))) return { feedback: `Eso es n×a_n, no la suma. La fórmula es S = n(a₁+aₙ)/2.` };
        return { feedback: `Suma de PA: \\(S_n = \\dfrac{n(a_1+a_n)}{2}\\). Necesitas calcular el último término aₙ primero.` };
      }
    };
  };

  G['alg_suc_geometrica_termino'] = function(diff) {
    const a1 = ri(1, diffCfg(diff,[4,6,8,10]));
    const r  = pick(diffCfg(diff,[[2,3],[2,3,-2,-3],[2,3,-2,-3,4,-4],[2,3,-2,-3,4,-4,5]]));
    const n  = ri(2, diffCfg(diff,[4,5,6,7]));
    const an = a1 * Math.pow(r, n-1);
    if (Math.abs(an) > 100000) return G['alg_suc_geometrica_termino'](diff);
    return {
      question: `Una progresión geométrica tiene \\(a_1=${a1}\\) y razón \\(q=${r}\\). ¿Cuál es \\(a_{${n}}\\)?`,
      answer: String(an), type: 'numeric',
      hint: `Fórmula: \\(a_n = a_1 \\cdot q^{n-1}\\). Con \\(n=${n}\\): \\(${a1} \\cdot ${r}^{${n-1}}\\).`,
      solution: `\\(a_{${n}} = ${a1} \\cdot ${r}^{${n-1}} = ${a1} \\cdot ${Math.pow(r,n-1)} = ${an}\\)`,
      topic: 'alg_sucesiones',
      analyzeError: (ua) => {
        if (parseFloat(ua) === a1*r*n) return { feedback: `En PG el término n es a₁×q^(n-1), no a₁×q×n.` };
        return { feedback: `Fórmula PG: \\(a_n = a_1·q^{n-1}\\). Aquí \\(q=${r}\\) se eleva a la potencia ${n}-1=${n-1}.` };
      }
    };
  };

  G['alg_suc_geometrica_suma'] = function(diff) {
    if (['easy'].includes(diff)) return G['alg_suc_aritmetica_termino']('easy');
    const a1 = ri(1,5);
    const r  = pick([2,3,-2]);
    const n  = ri(3, diffCfg(diff,[5,6,7,8]));
    const S  = Math.round(a1*(Math.pow(r,n)-1)/(r-1));
    if (Math.abs(S) > 1000000) return G['alg_suc_geometrica_suma'](diff);
    return {
      question: `Calcula la suma de los primeros \\(${n}\\) términos de la PG con \\(a_1=${a1}\\) y \\(q=${r}\\).`,
      answer: String(S), type: 'numeric',
      hint: `\\(S_n = a_1 \\cdot \\dfrac{q^n - 1}{q - 1}\\) (para \\(q \\neq 1\\)).`,
      solution: `\\(S_{${n}} = ${a1} \\cdot \\dfrac{${r}^{${n}}-1}{${r}-1} = ${a1} \\cdot \\dfrac{${Math.pow(r,n)}-1}{${r-1}} = ${S}\\)`,
      topic: 'alg_sucesiones'
    };
  };

  G['alg_suc_identificar'] = function(diff) {
    const tipo = pick(['aritmetica','geometrica','ni_una']);
    let seq, d_or_q, ans;
    if (tipo === 'aritmetica') {
      const a1 = ri(1,10), d = ri(1,8)*pick([-1,1]);
      seq = [a1, a1+d, a1+2*d, a1+3*d, a1+4*d];
      d_or_q = d; ans = 0;
    } else if (tipo === 'geometrica') {
      const a1 = ri(1,4), q = pick([2,3,-2,-3]);
      seq = [a1, a1*q, a1*q*q, a1*q*q*q, a1*q*q*q*q];
      d_or_q = q; ans = 1;
    } else {
      seq = [1,4,9,16,25]; ans = 2;
    }
    if (seq.some(v=>Math.abs(v)>1000)) return G['alg_suc_identificar'](diff);
    return {
      question: `Analiza la sucesión: \\(${seq.join(', ')}\\). ¿Qué tipo es?`,
      answer: String(ans), type: 'multiple-choice',
      options: ['Progresión aritmética (diferencia constante)','Progresión geométrica (razón constante)','Ninguna de las dos'],
      hint: `Comprueba diferencias: ${seq[1]-seq[0]}, ${seq[2]-seq[1]}, … y cocientes: ${seq[1]/seq[0]}, ${seq[2]/seq[1]}, …`,
      solution: tipo === 'aritmetica' ? `Las diferencias son siempre ${d_or_q}: es aritmética.`
               : tipo === 'geometrica' ? `Los cocientes son siempre ${d_or_q}: es geométrica.`
               : 'Ni las diferencias ni los cocientes son constantes.',
      topic: 'alg_sucesiones',
      analyzeError: () => ({ feedback: 'PA: diferencias constantes (restan). PG: cocientes constantes (dividen).' })
    };
  };

  G['alg_suc_formula_general'] = function(diff) {
    const tipo = pick(['aritmetica','geometrica']);
    if (tipo === 'aritmetica') {
      const a1 = ri(1,10), d = ri(1,8);
      // an = a1 + (n-1)d = (a1-d) + d*n
      const p = a1-d, q = d;
      const n = ri(5, diffCfg(diff,[8,12,18,25]));
      const an = a1 + (n-1)*d;
      return {
        question: `La fórmula general de una PA es \\(a_n = ${q}n + ${p}\\). ¿Cuál es el término \\(a_{${n}}\\)?`,
        answer: String(an), type: 'numeric',
        hint: `Sustituye \\(n=${n}\\): \\(${q}·${n}+${p}\\).`,
        solution: `\\(a_{${n}} = ${q}(${n}) + ${p} = ${q*n} + ${p} = ${an}\\)`,
        topic: 'alg_sucesiones'
      };
    } else {
      const a1 = ri(1,4), r = pick([2,3]);
      const n = ri(3, diffCfg(diff,[6,7,8,9]));
      const an = a1*Math.pow(r,n-1);
      if (an > 100000) return G['alg_suc_formula_general'](diff);
      return {
        question: `La fórmula general de una PG es \\(a_n = ${a1} \\cdot ${r}^{n-1}\\). Calcula \\(a_{${n}}\\).`,
        answer: String(an), type: 'numeric',
        hint: `Sustituye \\(n=${n}\\): \\(${a1} \\cdot ${r}^{${n}-1} = ${a1} \\cdot ${r}^{${n-1}}\\).`,
        solution: `\\(${a1} \\cdot ${Math.pow(r,n-1)} = ${an}\\)`,
        topic: 'alg_sucesiones'
      };
    }
  };

  MM_TOPIC_GENERATORS['alg_sucesiones'] = [
    'alg_suc_aritmetica_termino','alg_suc_aritmetica_suma','alg_suc_geometrica_termino',
    'alg_suc_geometrica_suma','alg_suc_identificar','alg_suc_formula_general'
  ];

  console.log('[MM] generators-algebra.js cargado:', [
    'alg_expresiones','alg_reduccion','alg_productos','alg_factorizacion','alg_polinomios',
    'alg_ec1','alg_ec2','alg_sistemas','alg_inecuaciones','alg_funciones','alg_sucesiones'
  ].filter(k=>MM_TOPIC_GENERATORS[k]).length, '/11 topics');

})();
