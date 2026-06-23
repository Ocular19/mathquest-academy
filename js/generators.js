/* ═══════════════════════════════════════════════════════════════
   GENERATORS.JS — Generadores de ejercicios con análisis de errores
   ═══════════════════════════════════════════════════════════════ */

// ── Utilidades ───────────────────────────────────────────────────
function _rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function _pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function _gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while(b) { let t=b; b=a%b; a=t; } return a || 1; }
function _lcm(a, b) { return Math.abs(a * b) / _gcd(a, b); }
function _simplify(n, d) { const g = _gcd(Math.abs(n), Math.abs(d)); return [n/g, d/g]; }
function _fracStr(n, d) { const [sn,sd] = _simplify(n,d); return sd===1 ? `${sn}` : `${sn}/${sd}`; }
function _primes() { return [2,3,5,7,11,13]; }

const _FRACS_NICE = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,6],[5,6],[1,8],[3,8],[5,8],[7,8]];

// ── FRACCIONES ──────────────────────────────────────────────────
window.MM_GENERATORS = window.MM_GENERATORS || {};

// F1: Identificar fracción desde descripción verbal
MM_GENERATORS.frac_identificar = function() {
  const [n,d] = _pick(_FRACS_NICE);
  const shapes = ['pizza','chocolate','cinta','naranja','tarta'];
  const shape = _pick(shapes);
  return {
    question: `Si divides una ${shape} en \\(${d}\\) partes iguales y tomas \\(${n}\\), ¿qué fracción representa eso?`,
    answer: `${n}/${d}`,
    hint: 'La fracción es: partes tomadas / partes totales.',
    solution: `\\(\\frac{${n}}{${d}}\\) — numerador = partes tomadas, denominador = partes totales.`,
    solutionSteps: [`Partes totales = ${d} → denominador`, `Partes tomadas = ${n} → numerador`, `Fracción: \\(\\frac{${n}}{${d}}\\)`],
    type: 'fraction', topic: 'Fracciones', difficulty: 'easy',
    analyzeError(ua) {
      if (ua === `${d}/${n}`) return { errorType:'invertida', feedback:`Invertiste el numerador y el denominador. El denominador es el total de partes (${d}) y el numerador las partes tomadas (${n}).` };
      if (ua === `${n}`) return { errorType:'solo_numerador', feedback:`Escribiste solo ${n}. Una fracción necesita tanto el numerador como el denominador separados por "/".` };
      return { errorType:'otro', feedback:`La respuesta correcta es ${n}/${d}. Recuerda: fracción = partes tomadas / partes totales.` };
    }
  };
};

// F2: Simplificar fracción
MM_GENERATORS.frac_simplificar = function() {
  const k = _rnd(2,6);
  const [n,d] = _pick(_FRACS_NICE.filter(([a,b]) => b <= 8));
  const num = n*k, den = d*k;
  return {
    question: `Simplifica la fracción \\(\\frac{${num}}{${den}}\\) a su mínima expresión.`,
    answer: `${n}/${d}`,
    hint: `Divide numerador y denominador por su máximo común divisor (MCD).`,
    solution: `MCD(${num},${den}) = ${k}. Dividiendo: \\(\\frac{${num}÷${k}}{${den}÷${k}} = \\frac{${n}}{${d}}\\)`,
    solutionSteps: [`MCD(${num}, ${den}) = ${k}`, `${num} ÷ ${k} = ${n}`, `${den} ÷ ${k} = ${d}`, `Fracción simplificada: \\(\\frac{${n}}{${d}}\\)`],
    type: 'fraction', topic: 'Fracciones', difficulty: 'easy',
    analyzeError(ua) {
      const [un,ud] = (ua||'').split('/').map(Number);
      if (un === num && ud === den) return { errorType:'no_simplificó', feedback:`No simplificaste. ${num}/${den} y ${n}/${d} son equivalentes pero ${n}/${d} es la forma simplificada porque ${k} es su MCD.` };
      if (!isNaN(un) && !isNaN(ud)) {
        const g2 = _gcd(un,ud);
        if (g2 > 1) return { errorType:'parcial', feedback:`Simplificaste parcialmente. Todavía puedes dividir por ${g2}.` };
      }
      return { errorType:'otro', feedback:`La respuesta correcta es ${n}/${d}. Busca el MCD de ${num} y ${den}.` };
    }
  };
};

// F3: Fracciones equivalentes
MM_GENERATORS.frac_equivalente = function() {
  const [n,d] = _pick(_FRACS_NICE);
  const k = _rnd(2,5);
  const blank = _pick(['num','den']);
  if (blank === 'num') {
    return {
      question: `Completa la fracción equivalente: \\(\\frac{${n}}{${d}} = \\frac{?}{${d*k}}\\)`,
      answer: `${n*k}`,
      hint: `Si el denominador se multiplicó por ${k}, el numerador también debe multiplicarse por ${k}.`,
      solution: `${d} × ${k} = ${d*k}, entonces ${n} × ${k} = ${n*k}. Respuesta: \\(\\frac{${n*k}}{${d*k}}\\)`,
      solutionSteps: [`Factor: ${d*k} ÷ ${d} = ${k}`, `Numerador: ${n} × ${k} = ${n*k}`],
      type: 'numeric', topic: 'Fracciones', difficulty: 'easy',
      analyzeError(ua) {
        if (parseInt(ua) === n) return { errorType:'no_multiplicó', feedback:`Copiaste el numerador ${n} sin multiplicarlo. Si el denominador se multiplicó por ${k}, el numerador también debe multiplicarse por ${k}: ${n}×${k}=${n*k}.` };
        if (parseInt(ua) === n+k) return { errorType:'sumó_en_vez_multiplicar', feedback:`Sumaste ${k} en lugar de multiplicar. En fracciones equivalentes se multiplica (o divide) por el mismo factor.` };
        return { errorType:'otro', feedback:`Respuesta: ${n*k}. El factor es ${k} porque ${d}×${k}=${d*k}.` };
      }
    };
  } else {
    return {
      question: `Completa la fracción equivalente: \\(\\frac{${n*k}}{?} = \\frac{${n}}{${d}}\\)`,
      answer: `${d*k}`,
      hint: `Observa que ${n*k} = ${n} × ${k}. El denominador debe multiplicarse por el mismo factor.`,
      solution: `${n*k} ÷ ${n} = ${k}, entonces ${d} × ${k} = ${d*k}.`,
      solutionSteps: [`Factor: ${n*k} ÷ ${n} = ${k}`, `Denominador: ${d} × ${k} = ${d*k}`],
      type: 'numeric', topic: 'Fracciones', difficulty: 'easy',
      analyzeError(ua) {
        if (parseInt(ua) === d) return { errorType:'no_multiplicó', feedback:`Copiaste ${d} sin multiplicar. El numerador ya se multiplicó por ${k}, el denominador también debe multiplicarse.` };
        return { errorType:'otro', feedback:`Respuesta: ${d*k}. Factor = ${n*k}÷${n} = ${k}, luego ${d}×${k} = ${d*k}.` };
      }
    };
  }
};

// F4: Comparar fracciones (mismo denominador)
MM_GENERATORS.frac_comparar_mismo_den = function() {
  const d = _pick([4,6,8,10,12]);
  let n1 = _rnd(1, d-1), n2 = _rnd(1, d-1);
  while(n1 === n2) n2 = _rnd(1, d-1);
  const correct = n1 > n2 ? '>' : '<';
  return {
    question: `Compara: \\(\\frac{${n1}}{${d}}\\) ___ \\(\\frac{${n2}}{${d}}\\). ¿Qué símbolo va en el espacio? (>, < o =)`,
    answer: correct,
    hint: 'Cuando los denominadores son iguales, se comparan directamente los numeradores.',
    solution: `Como los denominadores son iguales (${d}), comparamos ${n1} y ${n2}. ${n1} ${correct} ${n2}, entonces \\(\\frac{${n1}}{${d}}\\) ${correct} \\(\\frac{${n2}}{${d}}\\).`,
    solutionSteps: [`Denominadores iguales: ${d}`, `Comparar numeradores: ${n1} vs ${n2}`, `${n1} ${correct} ${n2}`],
    type: 'text', topic: 'Fracciones', difficulty: 'easy',
    analyzeError(ua) {
      const opp = correct === '>' ? '<' : '>';
      if (ua === opp) return { errorType:'invertido', feedback:`Invertiste la comparación. Con igual denominador, ${n1} ${correct} ${n2}, por lo que \\(\\frac{${n1}}{${d}}\\) ${correct} \\(\\frac{${n2}}{${d}}\\).` };
      if (ua === '=') return { errorType:'igualdad_falsa', feedback:`Las fracciones no son iguales porque los numeradores son distintos (${n1} ≠ ${n2}).` };
      return { errorType:'otro', feedback:`Respuesta: ${correct}. Con igual denominador compara los numeradores: ${n1} ${correct} ${n2}.` };
    }
  };
};

// F5: Comparar fracciones (distinto denominador)
MM_GENERATORS.frac_comparar_dist_den = function() {
  const [n1,d1] = _pick(_FRACS_NICE);
  let [n2,d2] = _pick(_FRACS_NICE.filter(([a,b]) => b !== d1));
  const v1 = n1/d1, v2 = n2/d2;
  const correct = v1 > v2 ? '>' : v1 < v2 ? '<' : '=';
  const mcm = _lcm(d1, d2);
  const eq1 = n1*(mcm/d1), eq2 = n2*(mcm/d2);
  return {
    question: `Compara: \\(\\frac{${n1}}{${d1}}\\) ___ \\(\\frac{${n2}}{${d2}}\\). (>, < o =)`,
    answer: correct,
    hint: `Busca el MCM de ${d1} y ${d2} para igualar los denominadores.`,
    solution: `MCM(${d1},${d2}) = ${mcm}. Convirtiendo: \\(\\frac{${eq1}}{${mcm}}\\) vs \\(\\frac{${eq2}}{${mcm}}\\). Como ${eq1} ${correct} ${eq2}, la respuesta es ${correct}.`,
    solutionSteps: [`MCM(${d1}, ${d2}) = ${mcm}`, `\\(\\frac{${n1}}{${d1}} = \\frac{${eq1}}{${mcm}}\\)`, `\\(\\frac{${n2}}{${d2}} = \\frac{${eq2}}{${mcm}}\\)`, `${eq1} ${correct} ${eq2}`],
    type: 'text', topic: 'Fracciones', difficulty: 'medio',
    analyzeError(ua) {
      if (ua === '=' && correct !== '=') return { errorType:'falsa_igualdad', feedback:`No son iguales. Convirtiendo al denominador común ${mcm}: \\(\\frac{${eq1}}{${mcm}}\\) vs \\(\\frac{${eq2}}{${mcm}}\\). El correcto es ${correct}.` };
      return { errorType:'otro', feedback:`Respuesta: ${correct}. Usa MCM(${d1},${d2})=${mcm} para comparar.` };
    }
  };
};

// F6: Suma de fracciones mismo denominador
MM_GENERATORS.frac_suma_mismo_den = function() {
  const d = _pick([3,4,5,6,8,10]);
  const n1 = _rnd(1, d-2), n2 = _rnd(1, d-n1-1) || 1;
  const nr = n1+n2, [rs,rd] = _simplify(nr, d);
  return {
    question: `Calcula: \\(\\frac{${n1}}{${d}} + \\frac{${n2}}{${d}}\\)`,
    answer: `${rs}/${rd}`,
    hint: 'Con igual denominador, suma los numeradores y mantén el denominador.',
    solution: `\\(\\frac{${n1}}{${d}} + \\frac{${n2}}{${d}} = \\frac{${n1}+${n2}}{${d}} = \\frac{${nr}}{${d}}${rs!==nr||rd!==d?` = \\frac{${rs}}{${rd}}`:''}\\)`,
    solutionSteps: [`Denominadores iguales → sumar numeradores`, `${n1} + ${n2} = ${nr}`, `Resultado: \\(\\frac{${nr}}{${d}}\\)`, rs!==nr?`Simplificar: \\(\\frac{${rs}}{${rd}}\\)`:'Ya está simplificado'],
    type: 'fraction', topic: 'Fracciones', difficulty: 'easy',
    analyzeError(ua) {
      if (ua === `${n1+n2}/${d+d}`) return { errorType:'sumó_denominadores', feedback:`Sumaste también los denominadores. ¡Error clásico! Con igual denominador solo se suman los numeradores: (${n1}+${n2})/${d} = ${nr}/${d}.` };
      if (ua === `${nr}/${d}` && rs !== nr) return { errorType:'no_simplificó', feedback:`Tu suma es correcta pero no simplificaste. ${nr}/${d} = ${rs}/${rd} (divide por ${_gcd(nr,d)}).` };
      return { errorType:'otro', feedback:`Respuesta: ${rs}/${rd}. Suma los numeradores: ${n1}+${n2}=${nr}, mantén denominador ${d}.` };
    }
  };
};

// F7: Suma fracciones distinto denominador
MM_GENERATORS.frac_suma_dist_den = function() {
  let [n1,d1] = _pick(_FRACS_NICE.filter(([a,b]) => b <= 6));
  let [n2,d2] = _pick(_FRACS_NICE.filter(([a,b]) => b <= 6 && b !== d1));
  const mcm = _lcm(d1, d2);
  const nr = n1*(mcm/d1) + n2*(mcm/d2);
  const [rs,rd] = _simplify(nr, mcm);
  return {
    question: `Calcula: \\(\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}\\)`,
    answer: `${rs}/${rd}`,
    hint: `Primero iguala los denominadores usando el MCM de ${d1} y ${d2}.`,
    solution: `MCM(${d1},${d2})=${mcm}. \\(\\frac{${n1*(mcm/d1)}}{${mcm}} + \\frac{${n2*(mcm/d2)}}{${mcm}} = \\frac{${nr}}{${mcm}} = \\frac{${rs}}{${rd}}\\)`,
    solutionSteps: [`MCM(${d1},${d2}) = ${mcm}`, `Convertir: \\(\\frac{${n1}}{${d1}} = \\frac{${n1*(mcm/d1)}}{${mcm}}\\)`, `Convertir: \\(\\frac{${n2}}{${d2}} = \\frac{${n2*(mcm/d2)}}{${mcm}}\\)`, `Sumar: \\(\\frac{${n1*(mcm/d1)}+${n2*(mcm/d2)}}{${mcm}} = \\frac{${nr}}{${mcm}}\\)`, rs!==nr?`Simplificar: \\(\\frac{${rs}}{${rd}}\\)`:'Ya simplificado'],
    type: 'fraction', topic: 'Fracciones', difficulty: 'medio',
    analyzeError(ua) {
      if (ua === `${n1+n2}/${d1+d2}`) return { errorType:'sumó_todo', feedback:`Sumaste numeradores con numeradores Y denominadores con denominadores. Los denominadores se deben igualar usando el MCM(${d1},${d2})=${mcm}, no sumar.` };
      if (ua === `${n1+n2}/${d1}` || ua === `${n1+n2}/${d2}`) return { errorType:'ignoró_mcm', feedback:`Sumaste los numeradores bien pero no convertiste al denominador común. MCM(${d1},${d2})=${mcm}.` };
      return { errorType:'otro', feedback:`Respuesta: ${rs}/${rd}. MCM(${d1},${d2})=${mcm}, luego suma los numeradores ajustados.` };
    }
  };
};

// F8: Resta fracciones mismo denominador
MM_GENERATORS.frac_resta_mismo_den = function() {
  const d = _pick([4,5,6,8,10,12]);
  const n1 = _rnd(3, d-1), n2 = _rnd(1, n1-1);
  const nr = n1-n2;
  const [rs,rd] = _simplify(nr, d);
  return {
    question: `Calcula: \\(\\frac{${n1}}{${d}} - \\frac{${n2}}{${d}}\\)`,
    answer: `${rs}/${rd}`,
    hint: 'Con igual denominador, resta los numeradores y mantén el denominador.',
    solution: `\\(\\frac{${n1}-${n2}}{${d}} = \\frac{${nr}}{${d}} = \\frac{${rs}}{${rd}}\\)`,
    solutionSteps: [`Restar numeradores: ${n1}-${n2}=${nr}`, `Denominador se mantiene: ${d}`, `\\(\\frac{${nr}}{${d}}\\)`, rs!==nr?`Simplificar: ${rs}/${rd}`:''],
    type: 'fraction', topic: 'Fracciones', difficulty: 'easy',
    analyzeError(ua) {
      if (ua === `${n2-n1}/${d}` || ua === `-${nr}/${d}`) return { errorType:'orden_incorrecto', feedback:`Restaste al revés: hiciste ${n2}-${n1} en vez de ${n1}-${n2}. El orden importa en la resta.` };
      if (ua === `${nr}/${d}` && rs!==nr) return { errorType:'no_simplificó', feedback:`Correcto en la resta pero no simplificaste. \\(\\frac{${nr}}{${d}} = \\frac{${rs}}{${rd}}\\).` };
      return { errorType:'otro', feedback:`Respuesta: ${rs}/${rd}. Resta: (${n1}-${n2})/${d} = ${nr}/${d}.` };
    }
  };
};

// F9: Resta fracciones distinto denominador
MM_GENERATORS.frac_resta_dist_den = function() {
  let pairs = _FRACS_NICE.filter(([a,b]) => b<=8);
  let [n1,d1] = _pick(pairs), [n2,d2] = _pick(pairs.filter(([a,b]) => b!==d1));
  if (n1/d1 < n2/d2) { [n1,n2]=[n2,n1]; [d1,d2]=[d2,d1]; }
  const mcm = _lcm(d1,d2);
  const e1 = n1*(mcm/d1), e2 = n2*(mcm/d2);
  const nr = e1-e2;
  const [rs,rd] = _simplify(nr, mcm);
  return {
    question: `Calcula: \\(\\frac{${n1}}{${d1}} - \\frac{${n2}}{${d2}}\\)`,
    answer: `${rs}/${rd}`,
    hint: `Iguala los denominadores con MCM(${d1},${d2})=${mcm}.`,
    solution: `MCM=${mcm}. \\(\\frac{${e1}}{${mcm}} - \\frac{${e2}}{${mcm}} = \\frac{${nr}}{${mcm}} = \\frac{${rs}}{${rd}}\\)`,
    solutionSteps: [`MCM(${d1},${d2})=${mcm}`, `\\(\\frac{${n1}}{${d1}}=\\frac{${e1}}{${mcm}}\\)`, `\\(\\frac{${n2}}{${d2}}=\\frac{${e2}}{${mcm}}\\)`, `${e1}-${e2}=${nr}`, `\\(\\frac{${nr}}{${mcm}}=\\frac{${rs}}{${rd}}\\)`],
    type: 'fraction', topic: 'Fracciones', difficulty: 'medio',
    analyzeError(ua) {
      if (ua===`${n1-n2}/${d1-d2}`) return {errorType:'restó_todo', feedback:`Restaste numeradores Y denominadores. Solo se restan los numeradores al tener el mismo denominador común (${mcm}).`};
      return {errorType:'otro', feedback:`Respuesta: ${rs}/${rd}. MCM=${mcm}, resta: ${e1}-${e2}=${nr}.`};
    }
  };
};

// F10: Multiplicación de fracciones
MM_GENERATORS.frac_multiplicar = function() {
  const [n1,d1] = _pick(_FRACS_NICE);
  const [n2,d2] = _pick(_FRACS_NICE);
  const nr = n1*n2, dr = d1*d2;
  const [rs,rd] = _simplify(nr, dr);
  return {
    question: `Calcula: \\(\\frac{${n1}}{${d1}} \\times \\frac{${n2}}{${d2}}\\)`,
    answer: `${rs}/${rd}`,
    hint: 'Multiplica numerador × numerador y denominador × denominador.',
    solution: `\\(\\frac{${n1}×${n2}}{${d1}×${d2}} = \\frac{${nr}}{${dr}} = \\frac{${rs}}{${rd}}\\)`,
    solutionSteps: [`Numerador: ${n1}×${n2}=${nr}`, `Denominador: ${d1}×${d2}=${dr}`, `\\(\\frac{${nr}}{${dr}}\\)`, rs!==nr?`Simplificar: \\(\\frac{${rs}}{${rd}}\\)`:''],
    type: 'fraction', topic: 'Fracciones', difficulty: 'medio',
    analyzeError(ua) {
      if (ua===`${n1+n2}/${d1+d2}`) return {errorType:'sumó_en_vez_multiplicar', feedback:`Sumaste en vez de multiplicar. En multiplicación de fracciones: numerador×numerador y denominador×denominador.`};
      if (ua===`${n1*d2}/${d1*n2}`) return {errorType:'cruzado', feedback:`Multiplicaste en cruz. Eso se hace en proporciones, no en multiplicación de fracciones.`};
      return {errorType:'otro', feedback:`Respuesta: ${rs}/${rd}. Multiplica: (${n1}×${n2})/(${d1}×${d2}) = ${nr}/${dr} = ${rs}/${rd}.`};
    }
  };
};

// F11: División de fracciones
MM_GENERATORS.frac_dividir = function() {
  const [n1,d1] = _pick(_FRACS_NICE);
  const [n2,d2] = _pick(_FRACS_NICE);
  const nr = n1*d2, dr = d1*n2;
  const [rs,rd] = _simplify(nr, dr);
  return {
    question: `Calcula: \\(\\frac{${n1}}{${d1}} ÷ \\frac{${n2}}{${d2}}\\)`,
    answer: `${rs}/${rd}`,
    hint: `Divide multiplicando por la fracción inversa: \\(\\frac{${n1}}{${d1}} × \\frac{${d2}}{${n2}}\\)`,
    solution: `\\(\\frac{${n1}}{${d1}} × \\frac{${d2}}{${n2}} = \\frac{${nr}}{${dr}} = \\frac{${rs}}{${rd}}\\)`,
    solutionSteps: [`Invertir segunda fracción: \\(\\frac{${n2}}{${d2}} → \\frac{${d2}}{${n2}}\\)`, `Multiplicar: \\(\\frac{${n1}×${d2}}{${d1}×${n2}}\\)`, `= \\(\\frac{${nr}}{${dr}}\\)`, `Simplificar: \\(\\frac{${rs}}{${rd}}\\)`],
    type: 'fraction', topic: 'Fracciones', difficulty: 'medio',
    analyzeError(ua) {
      if (ua===`${n1*n2}/${d1*d2}`) return {errorType:'multiplicó_en_vez_dividir', feedback:`Multiplicaste en vez de dividir. Al dividir fracciones debes invertir la segunda fracción: \\(\\frac{${n2}}{${d2}}\\) se convierte en \\(\\frac{${d2}}{${n2}}\\) y luego se multiplica.`};
      if (ua===`${n1}/${d1}`) return {errorType:'no_operó', feedback:`No realizaste la operación. Debes multiplicar \\(\\frac{${n1}}{${d1}}\\) por la inversa de \\(\\frac{${n2}}{${d2}}\\) que es \\(\\frac{${d2}}{${n2}}\\).`};
      return {errorType:'otro', feedback:`Respuesta: ${rs}/${rd}. Regla: a/b ÷ c/d = a/b × d/c.`};
    }
  };
};

// F12: Número mixto a fracción impropia
MM_GENERATORS.frac_mixto_a_impropia = function() {
  const w = _rnd(1,5), d = _pick([2,3,4,5,6,8]), n = _rnd(1,d-1);
  const num = w*d + n;
  return {
    question: `Convierte el número mixto \\(${w}\\frac{${n}}{${d}}\\) a fracción impropia.`,
    answer: `${num}/${d}`,
    hint: `Multiplica el entero por el denominador y suma el numerador: (${w}×${d})+${n}.`,
    solution: `\\(${w}\\frac{${n}}{${d}} = \\frac{${w}×${d}+${n}}{${d}} = \\frac{${num}}{${d}}\\)`,
    solutionSteps: [`${w} × ${d} = ${w*d}`, `${w*d} + ${n} = ${num}`, `Denominador se mantiene: ${d}`, `Fracción impropia: \\(\\frac{${num}}{${d}}\\)`],
    type: 'fraction', topic: 'Fracciones', difficulty: 'medio',
    analyzeError(ua) {
      if (ua===`${w+n}/${d}`) return {errorType:'sumó_entero', feedback:`Sumaste el entero al numerador (${w}+${n}=${w+n}) en vez de hacer ${w}×${d}+${n}=${num}. El entero debe multiplicarse por el denominador primero.`};
      if (ua===`${n}/${d}`) return {errorType:'ignoró_entero', feedback:`Olvidaste el entero ${w}. Debes hacer: (${w}×${d})+${n} = ${num}, así que la fracción impropia es ${num}/${d}.`};
      return {errorType:'otro', feedback:`Respuesta: ${num}/${d}. Fórmula: (entero×denominador)+numerador / denominador = (${w}×${d}+${n})/${d}.`};
    }
  };
};

// F13: Fracción impropia a número mixto
MM_GENERATORS.frac_impropia_a_mixto = function() {
  const d = _pick([3,4,5,6,7,8]);
  const w = _rnd(1,4), n = _rnd(1,d-1);
  const num = w*d + n;
  return {
    question: `Convierte la fracción impropia \\(\\frac{${num}}{${d}}\\) a número mixto.`,
    answer: `${w} ${n}/${d}`,
    hint: `Divide ${num} ÷ ${d}. El cociente es el entero y el resto es el nuevo numerador.`,
    solution: `${num} ÷ ${d} = ${w} con resto ${n}. Número mixto: \\(${w}\\frac{${n}}{${d}}\\)`,
    solutionSteps: [`${num} ÷ ${d} = ${w} (cociente) resto ${n}`, `Entero: ${w}`, `Fracción: \\(\\frac{${n}}{${d}}\\)`, `Número mixto: \\(${w}\\frac{${n}}{${d}}\\)`],
    type: 'text', topic: 'Fracciones', difficulty: 'medio',
    analyzeError(ua) {
      return {errorType:'otro', feedback:`Respuesta: ${w} ${n}/${d}. Divide ${num}÷${d}: cociente ${w}, resto ${n}.`};
    }
  };
};

// F14: Problema verbal con suma de fracciones
MM_GENERATORS.frac_problema_suma = function() {
  const [n1,d1] = _pick([[1,4],[1,3],[2,5],[1,6],[3,8]]);
  const [n2,d2] = _pick([[1,4],[1,3],[2,5],[1,6],[3,8]].filter(([a,b])=>b!==d1));
  const mcm = _lcm(d1,d2);
  const nr = n1*(mcm/d1)+n2*(mcm/d2);
  const [rs,rd] = _simplify(nr,mcm);
  const objects = ['pizza','pastel','cinta de tela','bolsa de harina','botella de jugo'];
  const obj = _pick(objects);
  return {
    question: `Valentina comió \\(\\frac{${n1}}{${d1}}\\) de una ${obj} y luego \\(\\frac{${n2}}{${d2}}\\) más. ¿Qué fracción de la ${obj} comió en total?`,
    answer: `${rs}/${rd}`,
    hint: `Suma las dos fracciones buscando el MCM de ${d1} y ${d2}.`,
    solution: `\\(\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}} = \\frac{${n1*(mcm/d1)}+${n2*(mcm/d2)}}{${mcm}} = \\frac{${nr}}{${mcm}} = \\frac{${rs}}{${rd}}\\)`,
    solutionSteps: [`Identificar: ${n1}/${d1} + ${n2}/${d2}`, `MCM(${d1},${d2})=${mcm}`, `Resultado: ${rs}/${rd}`],
    type: 'fraction', topic: 'Fracciones', difficulty: 'medio',
    analyzeError(ua) {
      return {errorType:'otro', feedback:`Respuesta: ${rs}/${rd}. Suma: ${n1}/${d1} + ${n2}/${d2}, MCM=${mcm}.`};
    }
  };
};

// F15: Problema verbal con resta
MM_GENERATORS.frac_problema_resta = function() {
  const [n1,d1] = _pick([[3,4],[2,3],[4,5],[5,6],[7,8]]);
  const [n2,d2] = _pick([[1,4],[1,3],[1,5],[1,6],[1,8]].filter(([a,b])=>b===d1));
  const nr = n1-n2;
  const [rs,rd] = _simplify(nr,d1);
  return {
    question: `Una botella tenía \\(\\frac{${n1}}{${d1}}\\) de litro. Se usó \\(\\frac{${n2}}{${d1}}\\) de litro. ¿Cuánto queda?`,
    answer: `${rs}/${rd}`,
    hint: 'Resta las dos fracciones. Como tienen el mismo denominador, solo resta los numeradores.',
    solution: `\\(\\frac{${n1}}{${d1}} - \\frac{${n2}}{${d1}} = \\frac{${nr}}{${d1}} = \\frac{${rs}}{${rd}}\\)`,
    solutionSteps: [`Identificar: ${n1}/${d1} - ${n2}/${d1}`, `Mismo denominador → restar numeradores: ${n1}-${n2}=${nr}`, `\\(\\frac{${nr}}{${d1}} = \\frac{${rs}}{${rd}}\\)`],
    type: 'fraction', topic: 'Fracciones', difficulty: 'easy',
    analyzeError(ua) {
      return {errorType:'otro', feedback:`Respuesta: ${rs}/${rd}. Resta: (${n1}-${n2})/${d1}=${nr}/${d1}.`};
    }
  };
};

// ── PORCENTAJES ─────────────────────────────────────────────────

// P1: Fracción a porcentaje
MM_GENERATORS.porc_fraccion_a_pct = function() {
  const fracs = [[1,2,50],[1,4,25],[3,4,75],[1,5,20],[2,5,40],[3,5,60],[4,5,80],[1,10,10],[3,10,30],[7,10,70],[1,8,12.5],[3,8,37.5]];
  const [n,d,pct] = _pick(fracs);
  return {
    question: `Convierte la fracción \\(\\frac{${n}}{${d}}\\) a porcentaje.`,
    answer: `${pct}`,
    hint: 'Multiplica la fracción por 100: (numerador ÷ denominador) × 100.',
    solution: `\\(\\frac{${n}}{${d}} × 100 = ${n*100/d}\\% = ${pct}\\%\\)`,
    solutionSteps: [`Dividir: ${n} ÷ ${d} = ${n/d}`, `Multiplicar por 100: ${n/d} × 100 = ${pct}`, `Respuesta: ${pct}%`],
    type: 'numeric', topic: 'Porcentajes', difficulty: 'easy',
    analyzeError(ua) {
      if (parseFloat(ua)===n/d) return {errorType:'olvidó_×100', feedback:`Calculaste ${n}÷${d}=${n/d} pero olvidaste multiplicar por 100. El porcentaje es ${pct}%.`};
      if (parseFloat(ua)===n*d) return {errorType:'multiplicó_mal', feedback:`Multiplicaste numerador×denominador. Para convertir a porcentaje: (${n}÷${d})×100 = ${pct}%.`};
      return {errorType:'otro', feedback:`Respuesta: ${pct}%. Fórmula: (${n}÷${d})×100 = ${pct}.`};
    }
  };
};

// P2: Porcentaje a fracción
MM_GENERATORS.porc_pct_a_fraccion = function() {
  const pairs = [[25,'1/4'],[50,'1/2'],[75,'3/4'],[20,'1/5'],[40,'2/5'],[60,'3/5'],[80,'4/5'],[10,'1/10'],[30,'3/10'],[70,'7/10']];
  const [pct, frac] = _pick(pairs);
  const [n,d] = frac.split('/').map(Number);
  return {
    question: `Expresa \\(${pct}\\%\\) como fracción simplificada.`,
    answer: frac,
    hint: `Escribe ${pct}/100 y luego simplifica dividiendo por el MCD.`,
    solution: `\\(${pct}\\% = \\frac{${pct}}{100} = \\frac{${n}}{${d}}\\)`,
    solutionSteps: [`${pct}% = ${pct}/100`, `MCD(${pct},100) = ${_gcd(pct,100)}`, `Simplificar: ${pct}/${100} = ${n}/${d}`],
    type: 'fraction', topic: 'Porcentajes', difficulty: 'easy',
    analyzeError(ua) {
      if (ua===`${pct}/100`) return {errorType:'no_simplificó', feedback:`Convertiste correctamente ${pct}% a ${pct}/100, pero no simplificaste. MCD(${pct},100)=${_gcd(pct,100)}, así que ${pct}/100 = ${frac}.`};
      return {errorType:'otro', feedback:`Respuesta: ${frac}. Escribe como ${pct}/100 y simplifica.`};
    }
  };
};

// P3: Calcular X% de N
MM_GENERATORS.porc_calcular_pct_de_n = function() {
  const pcts = [10,15,20,25,30,40,50,60,75];
  const pct = _pick(pcts);
  const n = _pick([20,40,50,60,80,100,120,150,200,250,300,400,500]);
  const result = pct*n/100;
  return {
    question: `¿Cuánto es el \\(${pct}\\%\\) de \\(${n}\\)?`,
    answer: `${result}`,
    hint: `Multiplica: ${n} × ${pct} ÷ 100, o también: ${n} × ${pct/100}.`,
    solution: `\\(${n} × \\frac{${pct}}{100} = ${n} × ${pct/100} = ${result}\\)`,
    solutionSteps: [`Fórmula: N × (porcentaje/100)`, `${n} × (${pct}/100)`, `${n} × ${pct/100} = ${result}`],
    type: 'numeric', topic: 'Porcentajes', difficulty: 'easy',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===pct) return {errorType:'confundió_valores', feedback:`Escribiste el porcentaje (${pct}) en vez del resultado. El ${pct}% de ${n} = ${n}×${pct}/100 = ${result}.`};
      if (Math.abs(uv-n*pct)<0.1) return {errorType:'olvidó_dividir_100', feedback:`Multiplicaste ${n}×${pct}=${n*pct} pero olvidaste dividir por 100. El resultado es ${result}.`};
      if (uv===n/pct) return {errorType:'dividió_en_vez_multiplicar', feedback:`Dividiste ${n}÷${pct}. Para calcular el ${pct}% de ${n} debes multiplicar: ${n}×${pct}/100 = ${result}.`};
      return {errorType:'otro', feedback:`Respuesta: ${result}. Operación: ${n} × ${pct}/100 = ${result}.`};
    }
  };
};

// P4: ¿Qué porcentaje es X de N?
MM_GENERATORS.porc_qué_pct = function() {
  const bases = [50,100,200,80,40,25,500];
  const base = _pick(bases);
  const pcts = [10,20,25,30,40,50,60,75,80];
  const pct = _pick(pcts);
  const part = base*pct/100;
  return {
    question: `\\(${part}\\) es ¿qué porcentaje de \\(${base}\\)?`,
    answer: `${pct}`,
    hint: `Fórmula: (parte / total) × 100 = (${part} / ${base}) × 100.`,
    solution: `\\(\\frac{${part}}{${base}} × 100 = ${part/base} × 100 = ${pct}\\%\\)`,
    solutionSteps: [`Fórmula: (parte/total)×100`, `${part}/${base} = ${part/base}`, `${part/base} × 100 = ${pct}%`],
    type: 'numeric', topic: 'Porcentajes', difficulty: 'medio',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===part/base) return {errorType:'olvidó_×100', feedback:`Calculaste ${part}/${base}=${part/base} pero olvidaste multiplicar por 100. El porcentaje es ${pct}%.`};
      if (uv===base/part*100) return {errorType:'invertido', feedback:`Invertiste la fórmula. Es (parte/total)×100 = (${part}/${base})×100, no al revés.`};
      return {errorType:'otro', feedback:`Respuesta: ${pct}%. Fórmula: (${part}/${base})×100 = ${pct}.`};
    }
  };
};

// P5: Encontrar el total dado un porcentaje
MM_GENERATORS.porc_encontrar_total = function() {
  const pcts = [10,20,25,40,50];
  const pct = _pick(pcts);
  const total = _pick([40,60,80,100,120,150,200,250]);
  const part = total*pct/100;
  return {
    question: `Si el \\(${pct}\\%\\) de un número es \\(${part}\\), ¿cuál es el número?`,
    answer: `${total}`,
    hint: `Despeja el total: total = parte ÷ (porcentaje/100) = ${part} ÷ ${pct/100}.`,
    solution: `\\(\\text{Total} = \\frac{${part}}{${pct}/100} = \\frac{${part}}{${pct/100}} = ${total}\\)`,
    solutionSteps: [`Fórmula: Total = Parte ÷ (Porcentaje/100)`, `Total = ${part} ÷ ${pct/100}`, `Total = ${total}`],
    type: 'numeric', topic: 'Porcentajes', difficulty: 'medio',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===part*pct/100) return {errorType:'calculó_parte_de_parte', feedback:`Calculaste otro porcentaje de la parte. Debes despejar: total = ${part} ÷ (${pct}/100) = ${total}.`};
      if (uv===part-pct) return {errorType:'restó', feedback:`Restaste en vez de dividir. Total = ${part} ÷ ${pct/100} = ${total}.`};
      return {errorType:'otro', feedback:`Respuesta: ${total}. Total = ${part} ÷ ${pct/100} = ${total}.`};
    }
  };
};

// P6: Descuento
MM_GENERATORS.porc_descuento = function() {
  const pcts = [10,15,20,25,30,40,50];
  const pct = _pick(pcts);
  const prices = [40,50,60,80,100,120,150,200,250,400];
  const price = _pick(prices);
  const discount = price*pct/100;
  const final = price-discount;
  return {
    question: `Un artículo cuesta $${price} y tiene un descuento del ${pct}%. ¿Cuál es el precio final?`,
    answer: `${final}`,
    hint: `Calcula el descuento: $${price} × ${pct}% = $${discount}. Luego réstalo: $${price} - $${discount}.`,
    solution: `Descuento: $${price} × ${pct/100} = $${discount}. Precio final: $${price} - $${discount} = $${final}.`,
    solutionSteps: [`Descuento: ${price} × ${pct}/100 = ${discount}`, `Precio final: ${price} - ${discount} = ${final}`],
    type: 'numeric', topic: 'Porcentajes', difficulty: 'medio',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===discount) return {errorType:'calculó_descuento', feedback:`Calculaste el descuento ($${discount}) pero no lo restaste al precio. Precio final = $${price} - $${discount} = $${final}.`};
      if (uv===price+discount) return {errorType:'sumó_descuento', feedback:`Sumaste el descuento en vez de restarlo. Un descuento reduce el precio: $${price} - $${discount} = $${final}.`};
      if (uv===price*pct) return {errorType:'olvidó_÷100', feedback:`Olvidaste dividir por 100. Descuento = ${price}×${pct}/100 = ${discount}, precio final = ${final}.`};
      return {errorType:'otro', feedback:`Respuesta: $${final}. Descuento: ${price}×${pct}%=${discount}, luego ${price}-${discount}=${final}.`};
    }
  };
};

// P7: Aumento porcentual
MM_GENERATORS.porc_aumento = function() {
  const pcts = [5,10,15,20,25,30,50];
  const pct = _pick(pcts);
  const base = _pick([40,80,100,120,200,250,400,500]);
  const increase = base*pct/100;
  const final = base+increase;
  return {
    question: `Un precio de $${base} aumenta un ${pct}%. ¿Cuál es el nuevo precio?`,
    answer: `${final}`,
    hint: `Calcula el aumento: $${base} × ${pct}% = $${increase}. Luego suma: $${base} + $${increase}.`,
    solution: `Aumento: $${base} × ${pct/100} = $${increase}. Nuevo precio: $${base} + $${increase} = $${final}.`,
    solutionSteps: [`Aumento: ${base} × ${pct}/100 = ${increase}`, `Nuevo precio: ${base} + ${increase} = ${final}`],
    type: 'numeric', topic: 'Porcentajes', difficulty: 'medio',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===increase) return {errorType:'calculó_aumento', feedback:`Calculaste el aumento ($${increase}) pero no lo sumaste. Nuevo precio = $${base} + $${increase} = $${final}.`};
      if (uv===base-increase) return {errorType:'restó_en_vez_sumar', feedback:`Restaste en vez de sumar. Un aumento incrementa el precio: $${base} + $${increase} = $${final}.`};
      return {errorType:'otro', feedback:`Respuesta: $${final}. Aumento = ${base}×${pct}%=${increase}, nuevo precio = ${base}+${increase}=${final}.`};
    }
  };
};

// P8: Variación porcentual
MM_GENERATORS.porc_variacion = function() {
  const inicial = _pick([50,80,100,200,250,500]);
  const pcts = [10,20,25,50];
  const pct = _pick(pcts);
  const tipo = _pick(['aumentó','disminuyó']);
  const final = tipo==='aumentó' ? inicial*(1+pct/100) : inicial*(1-pct/100);
  return {
    question: `Un valor pasó de ${inicial} a ${final}. ¿Cuál fue la variación porcentual?`,
    answer: `${pct}`,
    hint: `Fórmula: ((valor final - valor inicial) / valor inicial) × 100.`,
    solution: `\\(\\frac{|${final}-${inicial}|}{${inicial}} × 100 = \\frac{${Math.abs(final-inicial)}}{${inicial}} × 100 = ${pct}\\%\\)`,
    solutionSteps: [`Diferencia: |${final}-${inicial}| = ${Math.abs(final-inicial)}`, `Dividir por valor inicial: ${Math.abs(final-inicial)}/${inicial} = ${Math.abs(final-inicial)/inicial}`, `×100 = ${pct}%`],
    type: 'numeric', topic: 'Porcentajes', difficulty: 'dificil',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===Math.abs(final-inicial)) return {errorType:'olvidó_dividir_y_×100', feedback:`Calculaste la diferencia absoluta (${Math.abs(final-inicial)}) pero no dividiste por el valor inicial ni multiplicaste por 100.`};
      return {errorType:'otro', feedback:`Respuesta: ${pct}%. Fórmula: |${final}-${inicial}|/${inicial}×100 = ${pct}%.`};
    }
  };
};

// P9: Interés simple
MM_GENERATORS.porc_interes_simple = function() {
  const capital = _pick([1000,2000,5000,500,800]);
  const tasas = [5,10,8,12,15,20];
  const tasa = _pick(tasas);
  const años = _rnd(1,4);
  const interes = capital*tasa/100*años;
  return {
    question: `Se invierten $${capital} al ${tasa}% anual de interés simple por ${años} año${años>1?'s':''}. ¿Cuánto interés se gana?`,
    answer: `${interes}`,
    hint: `Interés simple: I = Capital × Tasa × Tiempo = ${capital} × ${tasa/100} × ${años}.`,
    solution: `I = $${capital} × ${tasa/100} × ${años} = $${interes}`,
    solutionSteps: [`I = C × r × t`, `I = ${capital} × ${tasa/100} × ${años}`, `I = $${interes}`],
    type: 'numeric', topic: 'Porcentajes', difficulty: 'dificil',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===capital*tasa/100) return {errorType:'olvidó_tiempo', feedback:`Calculaste el interés de 1 año ($${capital*tasa/100}) pero olvidaste multiplicar por ${años} año${años>1?'s':''}. Total: $${interes}.`};
      return {errorType:'otro', feedback:`Respuesta: $${interes}. I = ${capital} × ${tasa/100} × ${años} = $${interes}.`};
    }
  };
};

// P10: Problema porcentaje con contexto real
MM_GENERATORS.porc_problema_real = function() {
  const total = _pick([30,40,50,60,80,100,200]);
  const pct = _pick([10,20,25,30,40,50]);
  const part = total*pct/100;
  const contexts = [
    {q:`En un curso de ${total} estudiantes, el ${pct}% aprobó el examen. ¿Cuántos aprobaron?`, unit:'estudiantes'},
    {q:`De ${total} preguntas en un test, el ${pct}% fueron respondidas correctamente. ¿Cuántas preguntas correctas hubo?`, unit:'preguntas'},
    {q:`Una empresa tiene ${total} empleados y el ${pct}% trabaja de forma remota. ¿Cuántos trabajan remotamente?`, unit:'empleados'},
  ];
  const ctx = _pick(contexts);
  return {
    question: ctx.q,
    answer: `${part}`,
    hint: `Calcula: ${total} × ${pct}/100.`,
    solution: `${total} × ${pct}/100 = ${total} × ${pct/100} = ${part} ${ctx.unit}.`,
    solutionSteps: [`Identificar: total=${total}, porcentaje=${pct}%`, `Calcular: ${total}×${pct/100}=${part}`],
    type: 'numeric', topic: 'Porcentajes', difficulty: 'easy',
    analyzeError(ua) {
      return {errorType:'otro', feedback:`Respuesta: ${part}. Operación: ${total} × ${pct}/100 = ${part}.`};
    }
  };
};

// ── ECUACIONES LINEALES ─────────────────────────────────────────

// E1: ax = b
MM_GENERATORS.ecua_ax_eq_b = function() {
  const a = _rnd(2,9), b = a * _rnd(1,10);
  const x = b/a;
  return {
    question: `Resuelve: \\(${a}x = ${b}\\)`,
    answer: `${x}`,
    hint: `Divide ambos lados por ${a}: \\(x = \\frac{${b}}{${a}}\\)`,
    solution: `\\(${a}x = ${b} \\Rightarrow x = \\frac{${b}}{${a}} = ${x}\\)`,
    solutionSteps: [`Dividir ambos lados por ${a}`, `\\(x = \\frac{${b}}{${a}} = ${x}\\)`],
    type: 'numeric', topic: 'Ecuaciones', difficulty: 'easy',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===a*b) return {errorType:'multiplicó', feedback:`Multiplicaste ${a}×${b}=${a*b} en vez de dividir. Para despejar x en ${a}x=${b}, divide: x=${b}/${a}=${x}.`};
      if (uv===b-a) return {errorType:'restó', feedback:`Restaste ${b}-${a}=${b-a} en vez de dividir. Para despejar x: divide ${b}÷${a}=${x}.`};
      return {errorType:'otro', feedback:`Respuesta: ${x}. Divide ambos lados por ${a}: x=${b}/${a}=${x}.`};
    }
  };
};

// E2: x ± b = c
MM_GENERATORS.ecua_x_pm_b_eq_c = function() {
  const x = _rnd(1,15);
  const b = _rnd(1,10);
  const tipo = _pick(['+','-']);
  const c = tipo==='+' ? x+b : x-b;
  return {
    question: `Resuelve: \\(x ${tipo} ${b} = ${c}\\)`,
    answer: `${x}`,
    hint: tipo='+' ? `Resta ${b} en ambos lados.` : `Suma ${b} en ambos lados.`,
    solution: tipo='+' ? `\\(x + ${b} = ${c} \\Rightarrow x = ${c} - ${b} = ${x}\\)` : `\\(x - ${b} = ${c} \\Rightarrow x = ${c} + ${b} = ${x}\\)`,
    solutionSteps: tipo='+' ? [`Restar ${b} en ambos lados`, `x = ${c} - ${b} = ${x}`] : [`Sumar ${b} en ambos lados`, `x = ${c} + ${b} = ${x}`],
    type: 'numeric', topic: 'Ecuaciones', difficulty: 'easy',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===c) return {errorType:'ignoró_término', feedback:`Escribiste ${c} sin operar. Debes ${tipo==='+'?'restar':'sumar'} ${b}: x = ${c}${tipo==='+'?'-':'+'}${b} = ${x}.`};
      if (tipo==='+' && uv===c+b) return {errorType:'sumó_en_vez_restar', feedback:`Sumaste ${b} en vez de restarlo. Al pasar el +${b} al otro lado, se convierte en -${b}: x=${c}-${b}=${x}.`};
      if (tipo==='-' && uv===c-b) return {errorType:'restó_en_vez_sumar', feedback:`Restaste ${b} en vez de sumarlo. Al pasar el -${b} al otro lado, se convierte en +${b}: x=${c}+${b}=${x}.`};
      return {errorType:'otro', feedback:`Respuesta: ${x}. ${tipo==='+'?`x+${b}=${c} → x=${c}-${b}=${x}`:`x-${b}=${c} → x=${c}+${b}=${x}`}`};
    }
  };
};

// E3: ax + b = c
MM_GENERATORS.ecua_ax_plus_b_eq_c = function() {
  const a = _rnd(2,6), x = _rnd(1,8), b = _rnd(1,10);
  const c = a*x+b;
  return {
    question: `Resuelve: \\(${a}x + ${b} = ${c}\\)`,
    answer: `${x}`,
    hint: `Paso 1: Resta ${b} en ambos lados. Paso 2: Divide por ${a}.`,
    solution: `\\(${a}x + ${b} = ${c} \\Rightarrow ${a}x = ${c-b} \\Rightarrow x = \\frac{${c-b}}{${a}} = ${x}\\)`,
    solutionSteps: [`Restar ${b}: ${a}x = ${c}-${b} = ${c-b}`, `Dividir por ${a}: x = ${c-b}/${a} = ${x}`],
    type: 'numeric', topic: 'Ecuaciones', difficulty: 'easy',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===(c-b)/a && Math.abs(uv-x)>0.01) return {errorType:'calculó_mal', feedback:`Casi correcto. Verifica la aritmética: ${c}-${b}=${c-b}, luego ${c-b}/${a}=${x}.`};
      if (uv===c/a) return {errorType:'ignoró_b', feedback:`Dividiste ${c}/${a} ignorando el ${b}. Primero resta ${b}: ${c}-${b}=${c-b}, luego divide: ${c-b}/${a}=${x}.`};
      if (uv===(c+b)/a) return {errorType:'sumó_b', feedback:`Sumaste ${b} en vez de restarlo. Al pasar +${b} al otro lado se convierte en -${b}: x=(${c}-${b})/${a}=${x}.`};
      return {errorType:'otro', feedback:`Respuesta: ${x}. Pasos: ${a}x=${c}-${b}=${c-b}, x=${c-b}/${a}=${x}.`};
    }
  };
};

// E4: ax - b = c
MM_GENERATORS.ecua_ax_minus_b_eq_c = function() {
  const a = _rnd(2,6), x = _rnd(1,8), b = _rnd(1,10);
  const c = a*x-b;
  return {
    question: `Resuelve: \\(${a}x - ${b} = ${c}\\)`,
    answer: `${x}`,
    hint: `Paso 1: Suma ${b} en ambos lados. Paso 2: Divide por ${a}.`,
    solution: `\\(${a}x - ${b} = ${c} \\Rightarrow ${a}x = ${c+b} \\Rightarrow x = \\frac{${c+b}}{${a}} = ${x}\\)`,
    solutionSteps: [`Sumar ${b}: ${a}x = ${c}+${b} = ${c+b}`, `Dividir por ${a}: x = ${c+b}/${a} = ${x}`],
    type: 'numeric', topic: 'Ecuaciones', difficulty: 'easy',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===c/a) return {errorType:'ignoró_b', feedback:`Dividiste ${c}/${a} ignorando el -${b}. Primero suma ${b}: ${c}+${b}=${c+b}, luego divide: ${c+b}/${a}=${x}.`};
      if (uv===(c-b)/a) return {errorType:'restó_b', feedback:`Restaste ${b} en vez de sumarlo. Al pasar -${b} al otro lado se convierte en +${b}: x=(${c}+${b})/${a}=${x}.`};
      return {errorType:'otro', feedback:`Respuesta: ${x}. Pasos: ${a}x=${c}+${b}=${c+b}, x=${c+b}/${a}=${x}.`};
    }
  };
};

// E5: Variables en ambos lados
MM_GENERATORS.ecua_ambos_lados = function() {
  const x = _rnd(1,10);
  const a = _rnd(3,8), b = _rnd(2, a-1);
  const c = _rnd(1,15);
  const rhs = (a-b)*x + c;
  return {
    question: `Resuelve: \\(${a}x = ${b}x + ${rhs}\\)`,
    answer: `${x}`,
    hint: `Resta ${b}x en ambos lados para agrupar las variables.`,
    solution: `\\(${a}x - ${b}x = ${rhs} \\Rightarrow ${a-b}x = ${rhs} \\Rightarrow x = \\frac{${rhs}}{${a-b}} = ${x}\\)`,
    solutionSteps: [`Restar ${b}x: (${a}-${b})x = ${rhs}`, `${a-b}x = ${rhs}`, `x = ${rhs}/${a-b} = ${x}`],
    type: 'numeric', topic: 'Ecuaciones', difficulty: 'medio',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===rhs/(a+b)) return {errorType:'sumó_coeficientes', feedback:`Sumaste los coeficientes (${a}+${b}=${a+b}) en vez de restarlos. Al pasar ${b}x al otro lado: (${a}-${b})x=${a-b}x.`};
      return {errorType:'otro', feedback:`Respuesta: ${x}. Agrupa: ${a}x-${b}x=${a-b}x=${rhs}, x=${x}.`};
    }
  };
};

// E6: Con paréntesis
MM_GENERATORS.ecua_parentesis = function() {
  const x = _rnd(1,8), a = _rnd(2,4), b = _rnd(1,5);
  const rhs = a*(x+b);  // a(x+b) = rhs, solve for x
  return {
    question: `Resuelve: \\(${a}(x + ${b}) = ${rhs}\\)`,
    answer: `${x}`,
    hint: `Distribuye el ${a}: ${a}×x + ${a}×${b} = ${rhs}.`,
    solution: `\\(${a}x + ${a*b} = ${rhs} \\Rightarrow ${a}x = ${rhs-a*b} \\Rightarrow x = ${x}\\)`,
    solutionSteps: [`Distribuir: ${a}x + ${a*b} = ${rhs}`, `${a}x = ${rhs} - ${a*b} = ${rhs-a*b}`, `x = ${rhs-a*b}/${a} = ${x}`],
    type: 'numeric', topic: 'Ecuaciones', difficulty: 'medio',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===rhs/a - b) return {errorType:'división_primero', feedback:`Dividiste ${rhs}÷${a} primero y luego restaste ${b}. El resultado es correcto si la aritmética está bien: ${rhs}/${a}=${rhs/a}, ${rhs/a}-${b}=${x}.`};
      if (uv===rhs/a) return {errorType:'olvidó_restar_b', feedback:`Dividiste bien (${rhs}/${a}=${rhs/a}) pero olvidaste restar ${b}. x=${rhs/a}-${b}=${x}.`};
      if (uv===(rhs-b)/a) return {errorType:'no_distribuyó', feedback:`No distribuiste el ${a}. Debes hacer: ${a}×x + ${a}×${b} = ${a}x+${a*b}, no solo x+${b}.`};
      return {errorType:'otro', feedback:`Respuesta: ${x}. Distribuir: ${a}x+${a*b}=${rhs}, ${a}x=${rhs-a*b}, x=${x}.`};
    }
  };
};

// E7: Ecuación con fracciones
MM_GENERATORS.ecua_con_fraccion = function() {
  const d = _pick([2,3,4,5]);
  const x = d * _rnd(1,5);
  const b = _rnd(1,8);
  const rhs = x/d + b;
  return {
    question: `Resuelve: \\(\\frac{x}{${d}} + ${b} = ${rhs}\\)`,
    answer: `${x}`,
    hint: `Resta ${b} primero, luego multiplica por ${d}.`,
    solution: `\\(\\frac{x}{${d}} = ${rhs} - ${b} = ${rhs-b} \\Rightarrow x = ${rhs-b} × ${d} = ${x}\\)`,
    solutionSteps: [`Restar ${b}: x/${d} = ${rhs}-${b} = ${rhs-b}`, `Multiplicar por ${d}: x = ${rhs-b}×${d} = ${x}`],
    type: 'numeric', topic: 'Ecuaciones', difficulty: 'medio',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===(rhs+b)*d) return {errorType:'sumó_y_multiplicó', feedback:`Sumaste ${b} en vez de restarlo. Primero resta: x/${d}=${rhs}-${b}=${rhs-b}, luego multiplica: x=${rhs-b}×${d}=${x}.`};
      if (uv===rhs-b) return {errorType:'olvidó_multiplicar', feedback:`Restaste correctamente (${rhs}-${b}=${rhs-b}) pero olvidaste multiplicar por ${d}. x=(${rhs-b})×${d}=${x}.`};
      return {errorType:'otro', feedback:`Respuesta: ${x}. x/${d}=${rhs}-${b}=${rhs-b}, x=${rhs-b}×${d}=${x}.`};
    }
  };
};

// E8: Problema verbal ecuación
MM_GENERATORS.ecua_problema_verbal = function() {
  const x = _rnd(5,20);
  const tipo = _rnd(0,2);
  if (tipo===0) {
    const triple = 3*x, sum = x+triple;
    return {
      question: `El triple de un número sumado con ese mismo número da ${sum}. ¿Cuál es el número?`,
      answer: `${x}`,
      hint: `Sea n el número. Traduce: 3n + n = ${sum}.`,
      solution: `3n + n = ${sum} → 4n = ${sum} → n = ${sum}/4 = ${x}`,
      solutionSteps: [`Plantear: 3n + n = ${sum}`, `Simplificar: 4n = ${sum}`, `n = ${sum}/4 = ${x}`],
      type: 'numeric', topic: 'Ecuaciones', difficulty: 'medio',
      analyzeError(ua) {
        const uv = parseFloat(ua);
        if (uv===sum/3) return {errorType:'solo_triple', feedback:`Dividiste por 3 pero la ecuación es 3n+n=4n=${sum}, no 3n=${sum}.`};
        return {errorType:'otro', feedback:`Respuesta: ${x}. Ecuación: 4n=${sum}, n=${x}.`};
      }
    };
  } else if (tipo===1) {
    const c = _rnd(3,8);
    const rhs = 2*x + c;
    return {
      question: `Un número más ${c} da el doble de ese número menos ${rhs - 2*x - c + c}... Hmm, reformulando: un número aumentado en ${c} es igual a ${x+c}. ¿Cuál es el número?`,
      answer: `${x}`,
      hint: `Sea n el número. Ecuación: n + ${c} = ${x+c}.`,
      solution: `n + ${c} = ${x+c} → n = ${x+c} - ${c} = ${x}`,
      solutionSteps: [`Plantear: n + ${c} = ${x+c}`, `Restar ${c}: n = ${x+c} - ${c} = ${x}`],
      type: 'numeric', topic: 'Ecuaciones', difficulty: 'easy',
      analyzeError(ua) {
        return {errorType:'otro', feedback:`Respuesta: ${x}. n + ${c} = ${x+c}, n = ${x}.`};
      }
    };
  } else {
    const a = _rnd(2,5), b = _rnd(1,6);
    const total = a*x + b;
    return {
      question: `Se compran ${a} lápices y un cuaderno que cuesta $${b}. El total es $${total}. ¿Cuánto cuesta cada lápiz?`,
      answer: `${x}`,
      hint: `Plantea: ${a}x + ${b} = ${total}, donde x es el precio del lápiz.`,
      solution: `${a}x + ${b} = ${total} → ${a}x = ${total-b} → x = ${(total-b)/a} = $${x}`,
      solutionSteps: [`Ecuación: ${a}x + ${b} = ${total}`, `${a}x = ${total} - ${b} = ${total-b}`, `x = ${total-b}/${a} = ${x}`],
      type: 'numeric', topic: 'Ecuaciones', difficulty: 'medio',
      analyzeError(ua) {
        const uv = parseFloat(ua);
        if (uv===total/a) return {errorType:'ignoró_b', feedback:`Dividiste ${total}/${a} ignorando el costo del cuaderno ($${b}). Primero resta: ${total}-${b}=${total-b}, luego ${total-b}/${a}=${x}.`};
        return {errorType:'otro', feedback:`Respuesta: ${x}. ${a}x+${b}=${total}, x=(${total}-${b})/${a}=${x}.`};
      }
    };
  }
};

// E9: Ecuación con valor negativo de x
MM_GENERATORS.ecua_solucion_negativa = function() {
  const x = -_rnd(1,8);
  const a = _rnd(2,5), b = _rnd(1,10);
  const c = a*x + b;
  return {
    question: `Resuelve: \\(${a}x + ${b} = ${c}\\)`,
    answer: `${x}`,
    hint: `${b} pasa restando: ${a}x = ${c} - ${b} = ${c-b}. Luego divide.`,
    solution: `\\(${a}x = ${c-b} \\Rightarrow x = \\frac{${c-b}}{${a}} = ${x}\\)`,
    solutionSteps: [`${a}x = ${c} - ${b} = ${c-b}`, `x = ${c-b}/${a} = ${x}`],
    type: 'numeric', topic: 'Ecuaciones', difficulty: 'medio',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===-x) return {errorType:'signo_incorrecto', feedback:`Obtuviste el valor correcto (${-x}) pero con signo equivocado. ${c-b}/${a} = ${x} (negativo porque ${c-b} es negativo).`};
      return {errorType:'otro', feedback:`Respuesta: ${x}. ${a}x=${c-b}, x=${c-b}/${a}=${x}.`};
    }
  };
};

// E10: Ecuación con decimales
MM_GENERATORS.ecua_decimales = function() {
  const x = _rnd(2,10)*0.5;
  const a = _pick([2,4,5,10]);
  const b = _rnd(1,5);
  const c = a*x + b;
  return {
    question: `Resuelve: \\(${a}x + ${b} = ${c}\\)`,
    answer: `${x}`,
    hint: `${a}x = ${c} - ${b} = ${c-b}. Luego x = ${c-b} ÷ ${a} = ${x}.`,
    solution: `${a}x = ${c-b}, x = ${c-b}/${a} = ${x}`,
    solutionSteps: [`${a}x = ${c}-${b} = ${c-b}`, `x = ${c-b}/${a} = ${x}`],
    type: 'numeric', topic: 'Ecuaciones', difficulty: 'medio',
    analyzeError(ua) {
      return {errorType:'otro', feedback:`Respuesta: ${x}. ${a}x=${c-b}, x=${c-b}/${a}=${x}.`};
    }
  };
};

// ── FUNCIÓN CUADRÁTICA ──────────────────────────────────────────

// Q1: Evaluar f(x) = ax² + bx + c
MM_GENERATORS.quad_evaluar = function() {
  const a = _rnd(1,3), b = _rnd(-4,4), c = _rnd(-5,5);
  const xval = _rnd(-3,3);
  const result = a*xval*xval + b*xval + c;
  return {
    question: `Dada \\(f(x) = ${a}x^2 ${b>=0?'+'+b:b}x ${c>=0?'+'+c:c}\\), calcula \\(f(${xval})\\).`,
    answer: `${result}`,
    hint: `Sustituye x = ${xval}: f(${xval}) = ${a}(${xval})² ${b>=0?'+':''} ${b}(${xval}) ${c>=0?'+':''} ${c}`,
    solution: `f(${xval}) = ${a}(${xval})² + ${b}(${xval}) + ${c} = ${a*xval*xval} + ${b*xval} + ${c} = ${result}`,
    solutionSteps: [`Sustituir x=${xval}`, `${a}×(${xval})² = ${a}×${xval*xval} = ${a*xval*xval}`, `${b}×${xval} = ${b*xval}`, `Sumar: ${a*xval*xval} + ${b*xval} + ${c} = ${result}`],
    type: 'numeric', topic: 'Función Cuadrática', difficulty: 'easy',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===a*xval+b*xval+c) return {errorType:'no_elevó_cuadrado', feedback:`No elevaste al cuadrado. (${xval})² = ${xval*xval}, no ${xval}. Entonces ${a}×${xval*xval}=${a*xval*xval}.`};
      if (uv===a*xval*xval+b+c) return {errorType:'olvidó_multiplicar_b', feedback:`Olvidaste multiplicar ${b}×${xval}. Es ${b}×${xval}=${b*xval}, no solo ${b}.`};
      return {errorType:'otro', feedback:`Respuesta: ${result}. f(${xval}) = ${a}(${xval*xval}) + ${b*xval} + ${c} = ${result}.`};
    }
  };
};

// Q2: Identificar a, b, c
MM_GENERATORS.quad_identificar_coeficientes = function() {
  const a = _pick([-3,-2,-1,1,2,3]);
  const b = _rnd(-5,5);
  const c = _rnd(-6,6);
  const asked = _pick(['a','b','c']);
  const vals = {a,b,c};
  return {
    question: `En la función \\(f(x) = ${a===1?'':a===- 1?'-':a}x^2 ${b>=0?'+'+b:b}x ${c>=0?'+'+c:c}\\), ¿cuánto vale \\(${asked}\\)?`,
    answer: `${vals[asked]}`,
    hint: `La forma estándar es f(x) = ax² + bx + c. Identifica el coeficiente de cada término.`,
    solution: `a=${a}, b=${b}, c=${c}. El valor de ${asked} es ${vals[asked]}.`,
    solutionSteps: [`Forma estándar: ax² + bx + c`, `a = coeficiente de x² = ${a}`, `b = coeficiente de x = ${b}`, `c = término independiente = ${c}`, `${asked} = ${vals[asked]}`],
    type: 'numeric', topic: 'Función Cuadrática', difficulty: 'easy',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      const otrasKeys = ['a','b','c'].filter(k=>k!==asked);
      for (const k of otrasKeys) {
        if (uv===vals[k]) return {errorType:'confundió_coeficiente', feedback:`Diste el valor de ${k}=${vals[k]}, no de ${asked}. En f(x)=${a}x²${b>=0?'+':''}${b}x${c>=0?'+':''}${c}: a=${a}, b=${b}, c=${c}.`};
      }
      return {errorType:'otro', feedback:`Respuesta: ${vals[asked]}. a=${a}, b=${b}, c=${c}.`};
    }
  };
};

// Q3: Vértice de la parábola
MM_GENERATORS.quad_vertice = function() {
  const a = _pick([-2,-1,1,2,3]);
  const h = _rnd(-4,4), k = _rnd(-6,6);
  const b = -2*a*h;
  const c = a*h*h + k;
  return {
    question: `Encuentra el vértice de \\(f(x) = ${a}x^2 ${b>=0?'+'+b:b}x ${c>=0?'+'+c:c}\\).`,
    answer: `(${h},${k})`,
    hint: `El vértice está en \\(x_v = \\frac{-b}{2a} = \\frac{${-b}}{${2*a}}\\). Luego calcula \\(f(x_v)\\).`,
    solution: `\\(x_v = \\frac{-${b}}{2×${a}} = \\frac{${-b}}{${2*a}} = ${h}\\). \\(y_v = f(${h}) = ${k}\\). Vértice: \\((${h}, ${k})\\)`,
    solutionSteps: [`Fórmula: xv = -b/(2a) = ${-b}/(${2*a}) = ${h}`, `Calcular yv: f(${h}) = ${a}(${h})² + ${b}(${h}) + ${c} = ${k}`, `Vértice: (${h}, ${k})`],
    type: 'text', topic: 'Función Cuadrática', difficulty: 'medio',
    analyzeError(ua) {
      if (ua===`(${-h},${k})` || ua===`(${-h}, ${k})`) return {errorType:'signo_h', feedback:`El signo de la coordenada x del vértice es incorrecto. xv = -b/(2a) = -${b}/(2×${a}) = ${-b}/${2*a} = ${h} (no ${-h}).`};
      if (ua===`(${h},${-k})` || ua===`(${h}, ${-k})`) return {errorType:'signo_k', feedback:`La coordenada y del vértice es incorrecta. Calcula f(${h}) = ${a}(${h})² + ${b}(${h}) + ${c} = ${k}.`};
      return {errorType:'otro', feedback:`Respuesta: (${h},${k}). xv=-b/(2a)=${-b}/${2*a}=${h}, yv=f(${h})=${k}.`};
    }
  };
};

// Q4: Discriminante y tipo de raíces
MM_GENERATORS.quad_discriminante = function() {
  const tipos = [
    () => { const h=_rnd(-3,3),a=_pick([1,2]); return {a,b:-2*a*h,c:a*h*h,tipo:'una_raiz',disc:0}; },
    () => { const a=_pick([1,2]),b=_rnd(-5,5),c=-_rnd(1,5)*a; return {a,b,c,tipo:'dos_reales',disc:b*b-4*a*c}; },
    () => { const a=_pick([1,2,3]),b=0,c=_rnd(1,5)*a; return {a,b,c,tipo:'sin_reales',disc:-4*a*c}; }
  ];
  const {a,b,c,tipo,disc} = _pick(tipos)();
  const tipoStr = disc>0?'Dos raíces reales distintas':disc===0?'Una raíz real (doble)':'Sin raíces reales';
  return {
    question: `Calcula el discriminante de \\(f(x) = ${a}x^2 ${b>=0?'+'+b:b}x ${c>=0?'+'+c:c}\\) e indica el tipo de raíces.`,
    answer: `${disc}`,
    hint: `Discriminante: \\(\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c})\\)`,
    solution: `\\(\\Delta = (${b})^2 - 4(${a})(${c}) = ${b*b} - ${4*a*c} = ${disc}\\). ${tipoStr}.`,
    solutionSteps: [`b²=${b}²=${b*b}`, `4ac=4×${a}×${c}=${4*a*c}`, `Δ=${b*b}-${4*a*c}=${disc}`, tipoStr],
    type: 'numeric', topic: 'Función Cuadrática', difficulty: 'medio',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===b*b+4*a*c) return {errorType:'sumó_4ac', feedback:`Sumaste 4ac en vez de restarlo. Discriminante = b²-4ac = ${b*b}-${4*a*c} = ${disc}.`};
      if (uv===2*a*b-4*c) return {errorType:'fórmula_incorrecta', feedback:`Usaste la fórmula incorrecta. El discriminante es Δ = b²-4ac, donde b=${b}, a=${a}, c=${c}.`};
      return {errorType:'otro', feedback:`Respuesta: ${disc}. Δ=(${b})²-4(${a})(${c})=${b*b}-${4*a*c}=${disc}.`};
    }
  };
};

// Q5: Raíces por fórmula cuadrática
MM_GENERATORS.quad_formula = function() {
  const h1 = _rnd(-4,4), h2 = _rnd(-4,4);
  if (h1===h2) return MM_GENERATORS.quad_formula();
  const a = 1;
  const b = -(h1+h2), c = h1*h2;
  return {
    question: `Encuentra las raíces de \\(x^2 ${b>=0?'+'+b:b}x ${c>=0?'+'+c:c} = 0\\) usando la fórmula cuadrática.`,
    answer: `${Math.min(h1,h2)},${Math.max(h1,h2)}`,
    hint: `\\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\) con a=1, b=${b}, c=${c}.`,
    solution: `\\(x = \\frac{${-b} \\pm \\sqrt{${b*b-4*c}}}{2} = \\frac{${-b} \\pm ${Math.sqrt(b*b-4*c)}}{2}\\). x₁=${h1}, x₂=${h2}.`,
    solutionSteps: [`a=1, b=${b}, c=${c}`, `Δ=${b*b}-4(${c})=${b*b-4*c}`, `√Δ=${Math.sqrt(b*b-4*c)}`, `x=(${-b}±${Math.sqrt(b*b-4*c)})/2`, `x₁=${h1}, x₂=${h2}`],
    type: 'text', topic: 'Función Cuadrática', difficulty: 'dificil',
    analyzeError(ua) {
      const parts = ua.split(',').map(v=>parseFloat(v.trim()));
      if (parts.length===2 && parts.includes(h1) && !parts.includes(h2)) return {errorType:'una_raiz', feedback:`Encontraste una raíz (${h1}) pero falta la otra (${h2}). Usa ±: x=(${-b}±${Math.sqrt(b*b-4*c)})/2.`};
      return {errorType:'otro', feedback:`Respuesta: x₁=${h1}, x₂=${h2}. x=(${-b}±${Math.sqrt(b*b-4*c)})/2.`};
    }
  };
};

// Q6: Parábola abre hacia arriba o abajo
MM_GENERATORS.quad_concavidad = function() {
  const a = _pick([-3,-2,-1,1,2,3]);
  const b = _rnd(-3,3), c = _rnd(-4,4);
  const dir = a>0 ? 'arriba' : 'abajo';
  return {
    question: `¿La parábola \\(f(x) = ${a}x^2 ${b>=0?'+'+b:b}x ${c>=0?'+'+c:c}\\) abre hacia arriba o hacia abajo?`,
    answer: dir,
    hint: `El coeficiente principal (a) determina la apertura: a>0 → arriba, a<0 → abajo.`,
    solution: `a = ${a}. Como a ${a>0?'> 0':'< 0'}, la parábola abre hacia ${dir}.`,
    solutionSteps: [`Identificar a: a = ${a}`, `a ${a>0?'> 0 → abre arriba':'< 0 → abre abajo'}`],
    type: 'text', topic: 'Función Cuadrática', difficulty: 'easy',
    analyzeError(ua) {
      return {errorType:'otro', feedback:`Respuesta: ${dir}. a=${a}, ${a>0?'a>0 → arriba':'a<0 → abajo'}.`};
    }
  };
};

// Q7: Intersección con eje Y
MM_GENERATORS.quad_interseccion_y = function() {
  const a = _rnd(1,3), b = _rnd(-4,4), c = _rnd(-8,8);
  return {
    question: `¿Dónde intersecta la parábola \\(f(x) = ${a}x^2 ${b>=0?'+'+b:b}x ${c>=0?'+'+c:c}\\) al eje Y?`,
    answer: `(0,${c})`,
    hint: `La intersección con el eje Y ocurre en x=0. Calcula f(0).`,
    solution: `f(0) = ${a}(0)² + ${b}(0) + ${c} = ${c}. Punto: (0, ${c}).`,
    solutionSteps: [`Sustituir x=0`, `f(0) = 0 + 0 + ${c} = ${c}`, `Punto: (0, ${c})`],
    type: 'text', topic: 'Función Cuadrática', difficulty: 'easy',
    analyzeError(ua) {
      if (ua===`${c}` || ua===`(${c},0)`) return {errorType:'formato', feedback:`El valor de c=${c} es correcto pero el punto es (0,${c}), no (${c},0). Las intersecciones con el eje Y tienen x=0.`};
      return {errorType:'otro', feedback:`Respuesta: (0,${c}). En x=0: f(0)=${c}.`};
    }
  };
};

// Q8: Forma vértice
MM_GENERATORS.quad_forma_vertice = function() {
  const a = _pick([1,-1,2,-2]);
  const h = _rnd(-3,3), k = _rnd(-4,4);
  const xval = _rnd(-4,4);
  const result = a*(xval-h)*(xval-h) + k;
  return {
    question: `Dada \\(f(x) = ${a}(x ${h>=0?`- ${h}`:`+ ${-h}`})^2 ${k>=0?`+ ${k}`:k}\\), calcula \\(f(${xval})\\).`,
    answer: `${result}`,
    hint: `Sustituye x=${xval}: f(${xval}) = ${a}(${xval}${h>=0?`-${h}`:`+${-h}`})² ${k>=0?`+${k}`:k}.`,
    solution: `f(${xval}) = ${a}(${xval-h})² + ${k} = ${a*(xval-h)*(xval-h)} + ${k} = ${result}`,
    solutionSteps: [`Sustituir x=${xval}`, `(${xval}-${h}) = ${xval-h}`, `(${xval-h})² = ${(xval-h)*(xval-h)}`, `${a}×${(xval-h)*(xval-h)} = ${a*(xval-h)*(xval-h)}`, `${a*(xval-h)*(xval-h)} + ${k} = ${result}`],
    type: 'numeric', topic: 'Función Cuadrática', difficulty: 'medio',
    analyzeError(ua) {
      const uv = parseFloat(ua);
      if (uv===a*(xval-h)+k) return {errorType:'no_elevó_cuadrado', feedback:`Multiplicaste en vez de elevar al cuadrado. (${xval-h})² = ${(xval-h)*(xval-h)}, no ${xval-h}.`};
      return {errorType:'otro', feedback:`Respuesta: ${result}. f(${xval})=${a}(${xval-h})²+${k}=${a*(xval-h)*(xval-h)}+${k}=${result}.`};
    }
  };
};

// ── Registrar topic generators ───────────────────────────────────
window.MM_TOPIC_GENERATORS = window.MM_TOPIC_GENERATORS || {};

window.MM_TOPIC_GENERATORS['fracciones'] = [
  'frac_identificar','frac_simplificar','frac_equivalente','frac_comparar_mismo_den',
  'frac_comparar_dist_den','frac_suma_mismo_den','frac_suma_dist_den',
  'frac_resta_mismo_den','frac_resta_dist_den','frac_multiplicar','frac_dividir',
  'frac_mixto_a_impropia','frac_impropia_a_mixto','frac_problema_suma','frac_problema_resta'
];

window.MM_TOPIC_GENERATORS['porcentajes'] = [
  'porc_fraccion_a_pct','porc_pct_a_fraccion','porc_calcular_pct_de_n',
  'porc_qué_pct','porc_encontrar_total','porc_descuento','porc_aumento',
  'porc_variacion','porc_interes_simple','porc_problema_real'
];

window.MM_TOPIC_GENERATORS['ecuaciones'] = [
  'ecua_ax_eq_b','ecua_x_pm_b_eq_c','ecua_ax_plus_b_eq_c','ecua_ax_minus_b_eq_c',
  'ecua_ambos_lados','ecua_parentesis','ecua_con_fraccion','ecua_problema_verbal',
  'ecua_solucion_negativa','ecua_decimales'
];

window.MM_TOPIC_GENERATORS['cuadratica'] = [
  'quad_evaluar','quad_identificar_coeficientes','quad_vertice','quad_discriminante',
  'quad_formula','quad_concavidad','quad_interseccion_y','quad_forma_vertice'
];
