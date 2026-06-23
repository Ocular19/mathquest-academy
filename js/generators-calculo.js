/* ═══════════════════════════════════════════════════════
   GENERATORS-CALCULO.JS — 6 temas × 10 generadores
   Cálculo: límites, continuidad, derivadas, aplicaciones
            de derivadas, integrales, aplicaciones de int.
   ═══════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if(!window.MM_GENERATORS) window.MM_GENERATORS={};
  if(!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS={};
  const G=window.MM_GENERATORS;

  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const sp=n=>n<0?`${n}`:n===0?'':n===1?'+1':`+${n}`;
  const fmtPol=(a,b,c)=>{
    let s='';
    if(a!==0) s+=a===1?'x^2':a===-1?'-x^2':`${a}x^2`;
    if(b!==0) s+=b===1?(s?'+x':'x'):b===-1?(s?'-x':'-x'):(b>0&&s?`+${b}x`:`${b}x`);
    if(c!==0) s+=(c>0&&s?`+${c}`:`${c}`);
    return s||'0';
  };
  // Formato polinomio genérico grado n
  function monomial(coef,grade){
    if(grade===0) return `${coef}`;
    if(coef===0) return '';
    const x=grade===1?'x':`x^${grade}`;
    if(coef===1) return x;
    if(coef===-1) return `-${x}`;
    return `${coef}${x}`;
  }

  /* ═══════════════════════════════════════
     1. LÍMITES
  ═══════════════════════════════════════ */
  G['calc_lim_directo']=function(diff){
    // Limite directo por sustitución: lim_{x→a} (bx²+cx+d)
    const a=pick([1,2,3,-1,-2]);
    const b=pick([1,2,-1,0]), c=pick([0,1,2,-1,-2,3]), d=pick([0,1,2,3,-1,-2,-3]);
    const ans=b*a*a+c*a+d;
    const pol=fmtPol(b,c,d);
    return {question:`Calcula \\(\\lim_{x\\to${a}}(${pol})\\).`,
      answer:`${ans}`,hint:`Sustituye \\(x=${a}\\) directamente (el polinomio es continuo).`,
      explanation:`\\(\\lim_{x\\to${a}}(${pol})=${b*a*a}${sp(c*a)}${sp(d)}=${ans}\\)`,
      topic:'calc_limites',type:'directo'};
  };

  G['calc_lim_indeterminado']=function(diff){
    // lim_{x→a} (x²-a²)/(x-a) = 2a via factoring
    const a=pick([1,2,3,-1,-2,4]);
    const ans=2*a;
    return {question:`Calcula \\(\\lim_{x\\to${a}}\\dfrac{x^2-${a*a}}{x-${a}}\\).`,
      answer:`${ans}`,hint:`Factoriza: \\(\\frac{(x-${a})(x+${a})}{x-${a}}=x+${a}\\) para \\(x\\neq${a}\\)`,
      explanation:`\\(\\lim_{x\\to${a}}(x+${a})=${a}+${a}=${ans}\\)`,topic:'calc_limites',type:'indeterminado'};
  };

  G['calc_lim_infinito']=function(diff){
    // lim_{x→∞} (ax+b)/(cx+d) = a/c
    const a=pick([2,3,4,5,6]), c=pick([1,2,3,4]);
    const b=pick([0,1,2,-1,-2]), d=pick([0,1,2,-1,-2]);
    const numStr=`${a}x${sp(b)}`, denStr=`${c}x${sp(d)}`;
    const gcd_=(p,q)=>q===0?p:gcd_(q,p%q);
    const g=gcd_(a,c);
    const ansN=a/g, ansD=c/g;
    const ansStr=ansD===1?`${ansN}`:`${ansN}/${ansD}`;
    return {question:`Calcula \\(\\lim_{x\\to\\infty}\\dfrac{${numStr}}{${denStr}}\\).`,
      answer:ansStr,hint:'Divide numerador y denominador por \\(x\\). Los términos constantes desaparecen.',
      explanation:`\\(\\dfrac{${a}+${b}/x}{${c}+${d}/x}\\to\\dfrac{${a}}{${c}}=${ansStr}\\)`,
      topic:'calc_limites',type:'infinito'};
  };

  G['calc_lim_lateral']=function(diff){
    const a=pick([0,1,2,-1,-2,3]);
    const m=pick([2,3,4,-2,-3]);
    const b=pick([0,1,-1,2,-2]);
    const lim=m*a+b;
    return {question:`Halla \\(\\lim_{x\\to${a}^+}(${m}x${sp(b)})\\).`,
      answer:`${lim}`,hint:'Para funciones continuas, el límite lateral coincide con la sustitución.',
      explanation:`\\(\\lim_{x\\to${a}^+}(${m}x${sp(b)})=${m}(${a})${sp(b)}=${lim}\\)`,
      topic:'calc_limites',type:'lateral'};
  };

  G['calc_lim_constante']=function(diff){
    const k=pick([1,2,3,4,5,6,-1,-2,-3,7,8]);
    const a=pick([0,1,2,-1,-2,3]);
    return {question:`Calcula \\(\\lim_{x\\to${a}}${k}\\).`,
      answer:`${k}`,hint:'El límite de una constante es la constante misma.',
      explanation:`\\(\\lim_{x\\to${a}}${k}=${k}\\)`,topic:'calc_limites',type:'constante'};
  };

  G['calc_lim_polinomio']=function(diff){
    const a=pick([0,1,2,-1,-2]);
    const b=pick([1,2,-1,-2,3]), c=pick([0,1,2,-1,-2,3]);
    const n=pick([2,3,4]);
    const ans=b*Math.pow(a,n)+c;
    return {question:`Calcula \\(\\lim_{x\\to${a}}(${b}x^${n}${sp(c)})\\).`,
      answer:`${ans}`,hint:`Sustituye \\(x=${a}\\): \\(${b}(${a})^${n}${sp(c)}\\)`,
      explanation:`\\(${b}\\cdot${Math.pow(a,n)}${sp(c)}=${ans}\\)`,topic:'calc_limites',type:'polinomio'};
  };

  G['calc_lim_cuadrado']=function(diff){
    // lim (x²-9)/(x-3) = x+3 → 6
    const pairs=[[3,6],[4,8],[5,10],[2,4],[-3,-6]];
    const [a,ans]=pick(pairs);
    return {question:`Calcula \\(\\lim_{x\\to${a}}\\dfrac{x^2-${a*a}}{x-${a}}\\).`,
      answer:`${ans}`,hint:`Factoriza: \\((x-${a})(x+${a})\\) y simplifica.`,
      explanation:`\\(\\lim_{x\\to${a}}(x+${a})=${ans}\\)`,topic:'calc_limites',type:'cuadrado'};
  };

  G['calc_lim_existe']=function(diff){
    const casos=[
      {q:'\\lim_{x\\to0}\\frac{|x|}{x}',ans:'no existe',exp:'Límite por izquierda=-1, por derecha=+1'},
      {q:'\\lim_{x\\to2}(x^2-4)',ans:'0',exp:'Sustitución directa: 4-4=0'},
      {q:'\\lim_{x\\to\\infty}\\frac{1}{x}',ans:'0',exp:'1/x→0 cuando x→∞'},
    ];
    const c=pick(casos);
    return {question:`¿Existe el límite? \\(${c.q}\\)`,answer:c.ans,hint:c.exp,explanation:c.exp,
      topic:'calc_limites',type:'existe'};
  };

  G['calc_lim_suma_regla']=function(diff){
    const f=pick([2,3,4]), g=pick([1,2,3,-1]);
    const a=pick([1,2,-1,-2]);
    const sumF=f*a, sumG=g; // lim f(x)=fa, lim g(x)=ga
    return {question:`Si \\(\\lim_{x\\to${a}}f(x)=${f}\\) y \\(\\lim_{x\\to${a}}g(x)=${g}\\), ¿cuánto vale \\(\\lim_{x\\to${a}}[f(x)+g(x)]\\)?`,
      answer:`${f+g}`,hint:'Regla de la suma: el límite de una suma es la suma de los límites.',
      explanation:`\\(${f}+${g}=${f+g}\\)`,topic:'calc_limites',type:'suma_regla'};
  };

  G['calc_lim_producto_regla']=function(diff){
    const f=pick([2,3,4]), g=pick([1,2,3]);
    return {question:`Si \\(\\lim_{x\\to a}f(x)=${f}\\) y \\(\\lim_{x\\to a}g(x)=${g}\\), ¿cuánto vale \\(\\lim_{x\\to a}[f(x)\\cdot g(x)]\\)?`,
      answer:`${f*g}`,hint:'Regla del producto: límite de un producto = producto de los límites.',
      explanation:`\\(${f}\\cdot${g}=${f*g}\\)`,topic:'calc_limites',type:'producto_regla'};
  };

  window.MM_TOPIC_GENERATORS['calc_limites']=[
    'calc_lim_directo','calc_lim_indeterminado','calc_lim_infinito','calc_lim_lateral',
    'calc_lim_constante','calc_lim_polinomio','calc_lim_cuadrado','calc_lim_existe',
    'calc_lim_suma_regla','calc_lim_producto_regla'
  ];

  /* ═══════════════════════════════════════
     2. CONTINUIDAD
  ═══════════════════════════════════════ */
  G['calc_cont_polinomio']=function(diff){
    const n=pick([2,3,4]);
    const b=pick([1,2,-1,-2,3]);
    const a=pick([0,1,2,-1,-2]);
    return {question:`¿Es \\(f(x)=x^${n}${sp(b)}x\\) continua en \\(x=${a}\\)?`,
      answer:'sí',hint:'Los polinomios son continuos en todo \\(\\mathbb{R}\\).',
      explanation:`Todo polinomio es continuo. En particular en \\(x=${a}\\).`,
      topic:'calc_continuidad',type:'polinomio'};
  };

  G['calc_cont_racional']=function(diff){
    const a=pick([1,2,3,-1,-2]);
    return {question:`¿Es \\(f(x)=\\dfrac{1}{x-${a}}\\) continua en \\(x=${a}\\)?`,
      answer:'no',hint:'Una función racional es discontinua donde el denominador es cero.',
      explanation:`En \\(x=${a}\\), \\(f(${a})\\) no está definida → discontinuidad.`,
      topic:'calc_continuidad',type:'racional'};
  };

  G['calc_cont_tipo']=function(diff){
    const casos=[
      {f:'\\frac{x^2-4}{x-2}',a:2,tipo:'removible',exp:'Se puede eliminar simplificando: f→x+2'},
      {f:'\\frac{1}{x}',a:0,tipo:'esencial',exp:'f→∞ cuando x→0'},
      {f:'\\frac{x^2-1}{x-1}',a:1,tipo:'removible',exp:'Simplifica a x+1'},
    ];
    const c=pick(casos);
    return {question:`Clasifica la discontinuidad de \\(${c.f}\\) en \\(x=${c.a}\\).`,
      answer:c.tipo,hint:'Removible: se puede "rellenar". Esencial: la función diverge.',
      explanation:c.exp,topic:'calc_continuidad',type:'tipo'};
  };

  G['calc_cont_verificar']=function(diff){
    const a=pick([1,2,3,-1,-2]);
    const b=pick([1,2,-1,-2]);
    const fa=a*a+b; // f(a)=a²+b
    return {question:`Para \\(f(x)=x^2${sp(b)}\\), ¿es continua en \\(x=${a}\\)? ¿Cuánto vale \\(f(${a})\\)?`,
      answer:`sí, f(${a})=${fa}`,hint:'Verifica que f(a) existe, el límite existe y son iguales.',
      explanation:`\\(f(${a})=${a}^2${sp(b)}=${fa}\\). Límite: ${fa}. Son iguales → continua.`,
      topic:'calc_continuidad',type:'verificar'};
  };

  G['calc_cont_intervalo']=function(diff){
    const a=pick([1,2,3]), b=a+pick([1,2,3]);
    return {question:`¿Es \\(f(x)=x^3-${a}x\\) continua en el intervalo \\([${a},${b}]\\)?`,
      answer:'sí',hint:'Los polinomios son continuos en cualquier intervalo.',
      explanation:`Polinomio → continuo en todo \\(\\mathbb{R}\\) → continuo en \\([${a},${b}]\\)`,
      topic:'calc_continuidad',type:'intervalo'};
  };

  G['calc_cont_discontinuidad_racional']=function(diff){
    const a=pick([1,2,3,-1,-2,-3]);
    const b=pick([1,2,-1,-2]) ;
    return {question:`¿En qué punto es discontinua \\(f(x)=\\dfrac{x${sp(b)}}{x-${a}}\\)?`,
      answer:`x=${a}`,hint:'El denominador se hace cero en la discontinuidad.',
      explanation:`\\(x-${a}=0\\Rightarrow x=${a}\\)`,topic:'calc_continuidad',type:'encontrar_disc'};
  };

  G['calc_cont_extension']=function(diff){
    const a=pick([1,2,3]);
    return {question:`¿Qué valor debe tener \\(f(${a})\\) para que \\(f(x)=\\dfrac{x^2-${a*a}}{x-${a}}\\) sea continua en \\(x=${a}\\)?`,
      answer:`${2*a}`,hint:`Calcula el límite: \\(\\lim_{x\\to${a}}(x+${a})=${2*a}\\)`,
      explanation:`Definir \\(f(${a})=${2*a}\\) hace la función continua (elimina la discontinuidad removible).`,
      topic:'calc_continuidad',type:'extension'};
  };

  G['calc_cont_absoluta']=function(diff){
    const casos=[
      {f:'f(x)=|x|',a:0,cont:true,exp:'|x| es continua en todo ℝ, incluyendo x=0'},
      {f:'f(x)=\\frac{1}{|x|}',a:0,cont:false,exp:'|x|→0 cuando x→0, provoca discontinuidad'},
    ];
    const c=pick(casos);
    return {question:`¿Es \\(${c.f}\\) continua en \\(x=${c.a}\\)?`,
      answer:c.cont?'sí':'no',hint:'Evalúa si la función está definida y el límite coincide.',
      explanation:c.exp,topic:'calc_continuidad',type:'absoluta'};
  };

  G['calc_cont_condiciones']=function(diff){
    return {question:'¿Cuáles son las tres condiciones para que f sea continua en x=a?',
      answer:'f(a) existe, límite existe, son iguales',
      hint:'Piensa en la definición formal de continuidad.',
      explanation:'1) f(a) definida. 2) lim_{x→a}f(x) existe. 3) lim_{x→a}f(x)=f(a).',
      topic:'calc_continuidad',type:'definicion'};
  };

  G['calc_cont_teorema_valor_int']=function(diff){
    const a=pick([0,1,2]), b=a+pick([1,2,3]);
    const fa=a*a, fb=b*b; // f(x)=x², f(a)=a², f(b)=b²
    const mid=pick([fa+1,fa+2,Math.floor((fa+fb)/2)]);
    if(mid>=fb||mid<=fa) return G['calc_cont_polinomio'](diff);
    return {question:`Para \\(f(x)=x^2\\) en \\([${a},${b}]\\), el TVI garantiza un \\(c\\) tal que \\(f(c)=${mid}\\). ¿Por qué?`,
      answer:'porque f es continua y toma todos los valores intermedios',
      hint:'El Teorema del Valor Intermedio aplica a funciones continuas en intervalos cerrados.',
      explanation:`\\(f(${a})=${fa}\\leq${mid}\\leq${fb}=f(${b})\\). TVI garantiza tal \\(c\\).`,
      topic:'calc_continuidad',type:'tvi'};
  };

  window.MM_TOPIC_GENERATORS['calc_continuidad']=[
    'calc_cont_polinomio','calc_cont_racional','calc_cont_tipo','calc_cont_verificar',
    'calc_cont_intervalo','calc_cont_discontinuidad_racional','calc_cont_extension',
    'calc_cont_absoluta','calc_cont_condiciones','calc_cont_teorema_valor_int'
  ];

  /* ═══════════════════════════════════════
     3. DERIVADAS
  ═══════════════════════════════════════ */
  G['calc_der_potencia']=function(diff){
    const ns={easy:[2,3],medio:[3,4,5],dificil:[4,5,6],experto:[5,6,7,8]};
    const coefs={easy:[1,2,3],medio:[2,3,4],dificil:[3,4,5],experto:[4,5,6]};
    const n=pick(ns[diff]||ns.medio), a=pick(coefs[diff]||coefs.medio);
    const ans_a=a*n, ans_n=n-1;
    return {question:`Deriva \\(f(x)=${a===1?'':a}x^${n}\\).`,
      answer:`${ans_a}x^${ans_n}`,hint:`Regla de la potencia: \\(\\frac{d}{dx}[ax^n]=an\\cdot x^{n-1}\\)`,
      explanation:`\\(f'(x)=${a}\\cdot${n}\\cdot x^{${n}-1}=${ans_a}x^${ans_n}\\)`,
      topic:'calc_derivadas',type:'potencia'};
  };

  G['calc_der_constante']=function(diff){
    const k=pick([1,2,3,4,5,6,7,8,-1,-2,-3,10]);
    return {question:`¿Cuánto es \\(\\frac{d}{dx}[${k}]\\)?`,
      answer:'0',hint:'La derivada de cualquier constante es cero.',
      explanation:`\\(\\frac{d}{dx}[${k}]=0\\)`,topic:'calc_derivadas',type:'constante'};
  };

  G['calc_der_suma']=function(diff){
    const a=pick([2,3,4,5]), b=pick([1,2,3,-1,-2,-3]), c=pick([0,1,2,3,-1,-2]);
    return {question:`Deriva \\(f(x)=${fmtPol(a,b,c)}\\).`,
      answer:`${2*a}x${b!==0?sp(b):''}`,hint:`Deriva término a término. La constante desaparece.`,
      explanation:`\\(f'(x)=${2*a}x${b!==0?sp(b):''}\\)`,topic:'calc_derivadas',type:'suma'};
  };

  G['calc_der_cubica']=function(diff){
    const a=pick([1,2,3,-1,-2]), b=pick([0,1,2,-1,-2]), c=pick([0,1,-1,2,-2]);
    const da=3*a, db=2*b;
    return {question:`Deriva \\(f(x)=${a===1?'':a}x^3${fmtPol(0,b,c).replace('0','')}\\).`,
      answer:`${da}x^2${db!==0?sp(db)+'x':''}${c!==0?sp(c):''}`,
      hint:`\\(\\frac{d}{dx}[ax^3+bx^2+cx]=${da}x^2+${db}x+${c}\\)`,
      explanation:`\\(f'(x)=${da}x^2${db!==0?sp(db)+'x':''}${c!==0?sp(c):''}\\)`,
      topic:'calc_derivadas',type:'cubica'};
  };

  G['calc_der_evaluar_punto']=function(diff){
    const a=pick([1,2,3,-1,-2]), b=pick([0,1,-1,2,-2,3]);
    const x0=pick([0,1,2,-1,-2]);
    // f(x)=ax²+bx, f'(x)=2ax+b
    const fpx0=2*a*x0+b;
    return {question:`Para \\(f(x)=${fmtPol(a,b,0)}\\), halla \\(f'(${x0})\\).`,
      answer:`${fpx0}`,hint:`Primero deriva: \\(f'(x)=${2*a}x${sp(b)}\\). Luego evalúa en \\(x=${x0}\\).`,
      explanation:`\\(f'(x)=${2*a}x${sp(b)}\\). \\(f'(${x0})=${2*a}(${x0})${sp(b)}=${fpx0}\\)`,
      topic:'calc_derivadas',type:'evaluar_punto'};
  };

  G['calc_der_raiz']=function(diff){
    const a=pick([1,4,9,16,25]);
    const ans_n=Math.sqrt(a);
    return {question:`Deriva \\(f(x)=\\sqrt{x}\\) y evalúa \\(f'(${a})\\).`,
      answer:fr(1,2*ans_n),hint:`\\(\\sqrt{x}=x^{1/2}\\). Derivada: \\(\\frac{1}{2\\sqrt{x}}\\)`,
      explanation:`\\(f'(x)=\\frac{1}{2\\sqrt{x}}\\). \\(f'(${a})=\\frac{1}{2\\cdot${ans_n}}=\\frac{1}{${2*ans_n}}\\)`,
      topic:'calc_derivadas',type:'raiz'};

    function fr(n,d){const g=gcd(n,d);return d/g===1?`${n/g}`:`\\frac{${n/g}}{${d/g}}`;}
    function gcd(a,b){return b===0?a:gcd(b,a%b);}
  };

  G['calc_der_inversa_x']=function(diff){
    return {question:`Deriva \\(f(x)=\\dfrac{1}{x}\\).`,
      answer:'-1/x²',hint:`\\(\\frac{1}{x}=x^{-1}\\). Usa la regla de la potencia.`,
      explanation:`\\(\\frac{d}{dx}[x^{-1}]=-1\\cdot x^{-2}=-\\frac{1}{x^2}\\)`,
      topic:'calc_derivadas',type:'inversa_x'};
  };

  G['calc_der_constante_por_funcion']=function(diff){
    const k=pick([2,3,4,5,-2,-3]), n=pick([2,3,4]);
    return {question:`Deriva \\(f(x)=${k}x^${n}\\).`,
      answer:`${k*n}x^${n-1}`,hint:`Saca la constante: \\(${k}\\cdot\\frac{d}{dx}[x^${n}]=${k}\\cdot${n}x^{${n}-1}\\)`,
      explanation:`\\(f'(x)=${k}\\cdot${n}x^{${n}-1}=${k*n}x^${n-1}\\)`,
      topic:'calc_derivadas',type:'constante_por_funcion'};
  };

  G['calc_der_pendiente_tangente']=function(diff){
    const a=pick([1,2,-1,-2,3]), b=pick([0,1,-1,2,-2]);
    const x0=pick([0,1,2,-1,-2]);
    const m=2*a*x0+b; // f'(x0) for f(x)=ax²+bx
    return {question:`Para \\(f(x)=${fmtPol(a,b,0)}\\), ¿cuál es la pendiente de la tangente en \\(x=${x0}\\)?`,
      answer:`${m}`,hint:`La pendiente de la tangente es \\(f'(x_0)\\).`,
      explanation:`\\(f'(x)=${2*a}x${sp(b)}\\). \\(f'(${x0})=${m}\\)`,
      topic:'calc_derivadas',type:'pendiente_tangente'};
  };

  G['calc_der_interpretacion']=function(diff){
    const casos=[
      {ctx:'velocidad',f:'posición s(t)',fp:'velocidad v(t)=s\'(t)'},
      {ctx:'razón de cambio',f:'temperatura T(t)',fp:'tasa de cambio T\'(t)'},
      {ctx:'costo marginal',f:'costo C(q)',fp:'costo marginal C\'(q)'},
    ];
    const c=pick(casos);
    return {question:`¿Qué representa la derivada de la ${c.f}?`,
      answer:c.fp,hint:'La derivada mide la tasa de cambio instantánea.',
      explanation:`\\(${c.fp}\\): la ${c.ctx} instantánea.`,topic:'calc_derivadas',type:'interpretacion'};
  };

  window.MM_TOPIC_GENERATORS['calc_derivadas']=[
    'calc_der_potencia','calc_der_constante','calc_der_suma','calc_der_cubica',
    'calc_der_evaluar_punto','calc_der_raiz','calc_der_inversa_x',
    'calc_der_constante_por_funcion','calc_der_pendiente_tangente','calc_der_interpretacion'
  ];

  /* ═══════════════════════════════════════
     4. APLICACIONES DE DERIVADAS
  ═══════════════════════════════════════ */
  G['calc_apl_recta_tangente']=function(diff){
    const a=pick([1,2,-1,-2,3]), b=pick([0,1,-1,2,-2,3]);
    const c=pick([0,1,2,-1,-2]);
    const x0=pick([0,1,2,-1,-2]);
    // f(x)=ax²+bx+c, f'(x)=2ax+b
    const m=2*a*x0+b;
    const y0=a*x0*x0+b*x0+c;
    // Ecuación: y-y0=m(x-x0) → y=mx+(y0-m*x0)
    const n=y0-m*x0;
    return {question:`Para \\(f(x)=${fmtPol(a,b,c)}\\), halla la ecuación de la recta tangente en \\(x=${x0}\\).`,
      answer:`y=${m}x${sp(n)}`,hint:`Pendiente: \\(f'(${x0})=${m}\\). Punto: \\((${x0},${y0})\\). Ecuación: \\(y-${y0}=${m}(x-${x0})\\)`,
      explanation:`\\(y=${m}x${sp(n)}\\)`,topic:'calc_aplder',type:'tangente'};
  };

  G['calc_apl_puntos_criticos']=function(diff){
    // f(x)=ax²+bx+c → f'(x)=2ax+b=0 → x=-b/2a
    const pairs={easy:[[1,-4],[1,-6]],medio:[[2,-4],[1,-6]],dificil:[[2,-8],[3,-12]],experto:[[3,-6],[4,-8]]};
    const [a,b]=pick(pairs[diff]||pairs.medio);
    const xc=-b/(2*a);
    return {question:`Halla el punto crítico de \\(f(x)=${fmtPol(a,b,0)}\\).`,
      answer:`x=${xc}`,hint:`Deriva e iguala a cero: \\(f'(x)=${2*a}x${sp(b)}=0\\)`,
      explanation:`\\(${2*a}x=${-b}\\Rightarrow x=${xc}\\)`,topic:'calc_aplder',type:'puntos_criticos'};
  };

  G['calc_apl_clasificacion_critico']=function(diff){
    const a=pick([1,2,-1,-2]);
    const b=pick([-4,-6,-8,4,6,8]);
    const xc=-b/(2*a);
    const tipo=a>0?'mínimo local':'máximo local';
    return {question:`El punto crítico de \\(f(x)=${fmtPol(a,b,0)}\\) es un:`,
      answer:tipo,hint:'Si \\(a>0\\) (parábola hacia arriba): mínimo. Si \\(a<0\\): máximo.',
      explanation:`\\(a=${a}${a>0?'>0':'<0'}\\) → parábola ${a>0?'↑':'↓'} → ${tipo} en \\(x=${xc}\\)`,
      topic:'calc_aplder',type:'clasificacion'};
  };

  G['calc_apl_crecimiento']=function(diff){
    const a=pick([1,2,-1,-2]), b=pick([-4,-6,4,6]);
    const xc=-b/(2*a);
    const crece=a>0?`(${xc},+\\infty)`:`(-\\infty,${xc})`;
    const decrece=a>0?`(-\\infty,${xc})`:`(${xc},+\\infty)`;
    return {question:`¿En qué intervalo crece \\(f(x)=${fmtPol(a,b,0)}\\)?`,
      answer:crece.replace('\\infty','∞'),hint:`Punto crítico en \\(x=${xc}\\). Para \\(a=${a}\\): ${a>0?'crece después del mínimo':'crece antes del máximo'}.`,
      explanation:`\\(f'(x)=${2*a}x${sp(b)}>0\\) para \\(x\\in${crece}\\)`,
      topic:'calc_aplder',type:'crecimiento'};
  };

  G['calc_apl_razon_cambio']=function(diff){
    const k=pick([2,3,4,5]); // f(x)=kx², f'(x)=2kx
    const x=pick([1,2,3,-1,-2]);
    const ans=2*k*x;
    return {question:`Para \\(f(x)=${k}x^2\\), ¿cuál es la razón de cambio instantánea en \\(x=${x}\\)?`,
      answer:`${ans}`,hint:`Deriva: \\(f'(x)=${2*k}x\\). Evalúa en \\(x=${x}\\).`,
      explanation:`\\(f'(${x})=${2*k}\\cdot${x}=${ans}\\)`,topic:'calc_aplder',type:'razon_cambio'};
  };

  G['calc_apl_optimizacion']=function(diff){
    // Área máxima: rectángulo con perímetro fijo
    const P=pick([12,16,20,24,32]);
    const lado=P/4; // lado óptimo (cuadrado)
    const area=lado*lado;
    return {question:`Un rectángulo tiene perímetro ${P} m. ¿Cuál debe ser el largo para maximizar el área?`,
      answer:`${lado} m`,hint:'Para área máxima, el rectángulo debe ser un cuadrado: \\(l=P/4\\)',
      explanation:`Derivada del área en función del largo → máximo cuando \\(l=${P}/4=${lado}\\) m. Área máx: ${area} m².`,
      topic:'calc_aplder',type:'optimizacion'};
  };

  G['calc_apl_monotonia']=function(diff){
    const a=pick([1,2,-1,-2]), b=pick([-2,-4,2,4]);
    const xc=-b/(2*a);
    return {question:`Para \\(f(x)=${fmtPol(a,b,0)}\\), ¿es creciente o decreciente en \\(x>${xc+1}\\)?`,
      answer:a>0?'creciente':'decreciente',
      hint:`El punto crítico está en \\(x=${xc}\\). Para \\(x>${xc}\\): \\(f'(x)=${a>0?'>0':'<0'}\\)`,
      explanation:`En \\(x>${xc}\\): \\(f'(x)${a>0?'>':'<'}0\\) → f es ${a>0?'creciente':'decreciente'}.`,
      topic:'calc_aplder',type:'monotonia'};
  };

  G['calc_apl_segunda_derivada']=function(diff){
    const a=pick([1,2,3,-1,-2,-3]), b=pick([0,1,-1,2,-2]);
    // f=ax³, f'=3ax², f''=6ax
    const x0=pick([1,2,-1,-2]);
    const fpp=6*a*x0;
    return {question:`Para \\(f(x)=${a}x^3${sp(b)}x^2\\), halla \\(f''(${x0})\\).`,
      answer:`${fpp+4*b}`,hint:`\\(f'(x)=${3*a}x^2${sp(2*b)}x\\). \\(f''(x)=${6*a}x${sp(2*b)}\\). Evalúa en ${x0}.`,
      explanation:`\\(f''(${x0})=${6*a}(${x0})${sp(2*b)}=${6*a*x0}${sp(2*b)}=${6*a*x0+2*b}\\)`,
      topic:'calc_aplder',type:'segunda_derivada'};
  };

  G['calc_apl_normal']=function(diff){
    // Recta normal es perpendicular a la tangente
    const a=pick([1,2]), b=pick([0,1,-1]);
    const x0=pick([1,2,-1]);
    const m_tangente=2*a*x0+b;
    const m_normal=m_tangente!==0?`-1/${m_tangente}`:'0';
    return {question:`Para \\(f(x)=${fmtPol(a,b,0)}\\), la pendiente de la recta normal en \\(x=${x0}\\) es:`,
      answer:m_normal,hint:'La recta normal es perpendicular a la tangente: \\(m_n=-1/m_t\\)',
      explanation:`Tangente: \\(m_t=${m_tangente}\\). Normal: \\(m_n=${m_normal}\\)`,
      topic:'calc_aplder',type:'normal'};
  };

  G['calc_apl_velocidad']=function(diff){
    const v0=pick([5,10,15,20]), a=pick([-2,-3,-4,-5]);
    const t=pick([1,2,3]);
    // s(t)=v0*t+½a*t², v(t)=v0+at
    const vt=v0+a*t;
    return {question:`Un objeto tiene posición \\(s(t)=${v0}t${sp(a/2)}t^2\\) m. ¿Cuál es la velocidad en \\(t=${t}\\) s?`,
      answer:`${vt} m/s`,hint:`Velocidad: \\(v(t)=s'(t)=${v0}${sp(a)}t\\). Evalúa en \\(t=${t}\\).`,
      explanation:`\\(v(${t})=${v0}${sp(a)}(${t})=${vt}\\) m/s`,topic:'calc_aplder',type:'velocidad'};
  };

  window.MM_TOPIC_GENERATORS['calc_aplder']=[
    'calc_apl_recta_tangente','calc_apl_puntos_criticos','calc_apl_clasificacion_critico',
    'calc_apl_crecimiento','calc_apl_razon_cambio','calc_apl_optimizacion',
    'calc_apl_monotonia','calc_apl_segunda_derivada','calc_apl_normal','calc_apl_velocidad'
  ];

  /* ═══════════════════════════════════════
     5. INTEGRALES
  ═══════════════════════════════════════ */
  function fr(n,d){const g=gcd2(Math.abs(n),Math.abs(d));const sn=n/g,sd=d/g;return sd===1?`${sn}`:`\\frac{${sn<0?`(${sn})`:sn}}{${sd}}`;}
  function gcd2(a,b){return b===0?a:gcd2(b,a%b);}

  G['calc_int_potencia']=function(diff){
    const ns={easy:[1,2],medio:[2,3],dificil:[3,4],experto:[4,5,6]};
    const as={easy:[1,2],medio:[2,3],dificil:[3,4,5],experto:[4,5,6]};
    const n=pick(ns[diff]||ns.medio), a=pick(as[diff]||as.medio);
    const np1=n+1;
    const coef=fr(a,np1);
    return {question:`Calcula \\(\\int ${a===1?'':a}x^${n}\\,dx\\).`,
      answer:`${coef}x^${np1}+C`,hint:`Regla de la potencia: \\(\\int ax^n\\,dx=\\frac{a}{n+1}x^{n+1}+C\\)`,
      explanation:`\\(\\int ${a}x^${n}\\,dx=${coef}x^${np1}+C\\)`,topic:'calc_integrales',type:'potencia'};
  };

  G['calc_int_constante']=function(diff){
    const k=pick([1,2,3,4,5,-1,-2,-3,6,7]);
    return {question:`Calcula \\(\\int ${k}\\,dx\\).`,
      answer:`${k}x+C`,hint:`\\(\\int k\\,dx=kx+C\\)`,
      explanation:`\\(\\int ${k}\\,dx=${k}x+C\\)`,topic:'calc_integrales',type:'constante'};
  };

  G['calc_int_suma']=function(diff){
    const a=pick([2,3,4]), b=pick([1,2,-1,-2,3]);
    return {question:`Calcula \\(\\int (${a}x${sp(b)})\\,dx\\).`,
      answer:`${a/2===Math.floor(a/2)?a/2:a+'/2'}x^2${sp(b)}x+C`,
      hint:`Integra término a término: \\(\\int ${a}x\\,dx + \\int ${b}\\,dx\\)`,
      explanation:`\\(${fr(a,2)}x^2${sp(b)}x+C\\)`,topic:'calc_integrales',type:'suma'};
  };

  G['calc_int_polinomio']=function(diff){
    const a=pick([1,2,3]), b=pick([0,1,2,-1,-2]), c=pick([0,1,2,-1,-2,-3]);
    return {question:`Calcula \\(\\int (${fmtPol(a,b,c)})\\,dx\\).`,
      answer:`${fr(a,3)}x^3+${fr(b,2)}x^2${sp(c)}x+C`.replace('\\frac{0}{3}x^3+','').replace('\\frac{0}{2}x^2+',''),
      hint:`\\(\\int ax^2+bx+c\\,dx=\\frac{a}{3}x^3+\\frac{b}{2}x^2+cx+C\\)`,
      explanation:`\\(${fr(a,3)}x^3+${fr(b,2)}x^2${sp(c)}x+C\\)`,topic:'calc_integrales',type:'polinomio'};
  };

  G['calc_int_definida']=function(diff){
    const pairs={easy:[[0,1],[0,2]],medio:[[0,3],[1,3]],dificil:[[1,4],[0,4]],experto:[[1,5],[2,5]]};
    const [a,b]=pick(pairs[diff]||pairs.medio);
    // ∫_a^b x dx = [x²/2]_a^b = b²/2 - a²/2
    const ans=(b*b-a*a)/2;
    const ansStr=Number.isInteger(ans)?`${ans}`:`${ans}`;
    return {question:`Calcula \\(\\int_{${a}}^{${b}} x\\,dx\\).`,
      answer:ansStr,hint:`\\(\\int x\\,dx=\\frac{x^2}{2}+C\\). Evalúa entre ${a} y ${b}.`,
      explanation:`\\(\\left[\\frac{x^2}{2}\\right]_{${a}}^{${b}}=\\frac{${b}^2}{2}-\\frac{${a}^2}{2}=${ansStr}\\)`,
      topic:'calc_integrales',type:'definida'};
  };

  G['calc_int_cuadratica_definida']=function(diff){
    const a=pick([0,1]), b=pick([1,2,3]);
    const ans=(Math.pow(b,3)-Math.pow(a,3))/3;
    return {question:`Calcula \\(\\int_{${a}}^{${b}} x^2\\,dx\\).`,
      answer:`${ans}`,hint:`\\(\\int x^2\\,dx=\\frac{x^3}{3}+C\\). Evalúa entre ${a} y ${b}.`,
      explanation:`\\(\\left[\\frac{x^3}{3}\\right]_{${a}}^{${b}}=\\frac{${b**3}}{3}-\\frac{${a**3}}{3}=${ans}\\)`,
      topic:'calc_integrales',type:'definida_cuadratica'};
  };

  G['calc_int_verificar']=function(diff){
    const n=pick([2,3,4]), a=pick([1,2,3]);
    const np1=n+1;
    return {question:`Verifica que \\(F(x)=${fr(a,np1)}x^{${np1}}\\) es primitiva de \\(f(x)=${a}x^${n}\\).`,
      answer:`sí, F'(x)=${a}x^${n}`,hint:`Deriva \\(F(x)\\) y compara con \\(f(x)\\).`,
      explanation:`\\(F'(x)=${fr(a,np1)}\\cdot${np1}\\cdot x^{${n}}=${a}x^{${n}}=f(x)\\) ✓`,
      topic:'calc_integrales',type:'verificar'};
  };

  G['calc_int_propiedad_lineal']=function(diff){
    const k=pick([2,3,4,5]);
    const n=pick([1,2,3]);
    return {question:`¿Cuánto es \\(\\int ${k}x^${n}\\,dx\\)?`,
      answer:`${fr(k,n+1)}x^${n+1}+C`,hint:`La constante k puede salir de la integral: \\(${k}\\int x^${n}\\,dx\\)`,
      explanation:`\\(${k}\\cdot\\frac{x^{${n+1}}}{${n+1}}+C=${fr(k,n+1)}x^{${n+1}}+C\\)`,
      topic:'calc_integrales',type:'lineal'};
  };

  G['calc_int_tja']=function(diff){
    // Teorema fundamental del Cálculo
    const f=pick(['x^2','2x','3x^2','x']);
    const fLabel={x2:'x²','2x':'2x','3x^2':'3x²','x':'x'};
    const F={'x^2':'x³/3','2x':'x²','3x^2':'x³','x':'x²/2'};
    return {question:`El Teorema Fundamental del Cálculo dice que si \\(F'(x)=f(x)\\), entonces \\(\\int_a^b f(x)\\,dx = ?\\)`,
      answer:'F(b)-F(a)',hint:'El TFC conecta derivadas e integrales.',
      explanation:`\\(\\int_a^b f(x)\\,dx=F(b)-F(a)\\)`,topic:'calc_integrales',type:'tfc'};
  };

  G['calc_int_area_bajo_curva']=function(diff){
    const b=pick([1,2,3,4]);
    const ans=b*b/2; // ∫₀^b x dx = b²/2
    return {question:`¿Cuál es el área bajo \\(f(x)=x\\) desde \\(x=0\\) hasta \\(x=${b}\\)?`,
      answer:`${ans}`,hint:`\\(\\int_0^{${b}} x\\,dx=\\left[\\frac{x^2}{2}\\right]_0^{${b}}=\\frac{${b}^2}{2}\\)`,
      explanation:`Área = \\(${ans}\\) u²`,topic:'calc_integrales',type:'area_bajo_curva'};
  };

  window.MM_TOPIC_GENERATORS['calc_integrales']=[
    'calc_int_potencia','calc_int_constante','calc_int_suma','calc_int_polinomio',
    'calc_int_definida','calc_int_cuadratica_definida','calc_int_verificar',
    'calc_int_propiedad_lineal','calc_int_tja','calc_int_area_bajo_curva'
  ];

  /* ═══════════════════════════════════════
     6. APLICACIONES DE INTEGRALES
  ═══════════════════════════════════════ */
  G['calc_aplint_area_bajo_curva']=function(diff){
    const bs={easy:[1,2],medio:[2,3],dificil:[3,4],experto:[4,5]};
    const b=pick(bs[diff]||bs.medio);
    const ans=Math.pow(b,3)/3;
    return {question:`Halla el área bajo \\(f(x)=x^2\\) desde \\(x=0\\) hasta \\(x=${b}\\).`,
      answer:`${ans}`,hint:`\\(A=\\int_0^{${b}}x^2\\,dx=\\left[\\frac{x^3}{3}\\right]_0^{${b}}\\)`,
      explanation:`\\(A=\\frac{${b}^3}{3}=\\frac{${b**3}}{3}=${ans}\\) u²`,topic:'calc_aplint',type:'area'};
  };

  G['calc_aplint_area_entre_curvas']=function(diff){
    // Área entre y=x² y y=x: A = ∫₀¹(x-x²)dx = 1/2 - 1/3 = 1/6
    return {question:`Halla el área entre \\(f(x)=x\\) y \\(g(x)=x^2\\) (entre \\(x=0\\) y \\(x=1\\)).`,
      answer:'1/6',hint:'\\(A=\\int_0^1(x-x^2)\\,dx=\\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1\\)',
      explanation:`\\(A=\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}\\) u²`,topic:'calc_aplint',type:'entre_curvas'};
  };

  G['calc_aplint_valor_medio']=function(diff){
    // Valor medio de f(x)=x² en [0,b] = b²/3
    const b=pick([1,2,3,4]);
    const ans=b*b/3;
    const ansStr=Number.isInteger(ans)?`${ans}`:`${b*b}/3`;
    return {question:`Halla el valor promedio de \\(f(x)=x^2\\) en \\([0,${b}]\\).`,
      answer:ansStr,hint:`\\(\\bar{f}=\\frac{1}{${b}-0}\\int_0^{${b}}x^2\\,dx\\)`,
      explanation:`\\(\\bar{f}=\\frac{1}{${b}}\\cdot\\frac{${b}^3}{3}=\\frac{${b**3}}{${3*b}}=${ansStr}\\)`,
      topic:'calc_aplint',type:'valor_medio'};
  };

  G['calc_aplint_desplazamiento']=function(diff){
    // Desplazamiento: ∫₀^t v(t)dt = v₀t + ½at² con v(t)=v₀+at
    const v0=pick([5,10,15,20]), t=pick([2,3,4,5]);
    const despl=v0*t; // asumimos a=0 para simplicidad
    return {question:`Un móvil se desplaza con velocidad constante \\(v(t)=${v0}\\) m/s. ¿Cuánto se desplazó en \\(${t}\\) s?`,
      answer:`${despl} m`,hint:`Desplazamiento = \\(\\int_0^{${t}}${v0}\\,dt=${v0}\\cdot${t}\\)`,
      explanation:`\\(\\int_0^{${t}}${v0}\\,dt=[${v0}t]_0^{${t}}=${despl}\\) m`,
      topic:'calc_aplint',type:'desplazamiento'};
  };

  G['calc_aplint_acumulacion']=function(diff){
    const rates=[2,3,4,5,6];
    const r=pick(rates), t=pick([2,3,4,5]);
    const total=r*t*(t+1)/2; // aproximado ∫₀^t rx dt = r*t²/2
    const exact=r*t*t/2;
    return {question:`La tasa de cambio de una cantidad es \\(Q'(t)=${r}t\\). ¿Cuánto se acumula de \\(t=0\\) a \\(t=${t}\\)?`,
      answer:`${exact}`,hint:`\\(\\int_0^{${t}}${r}t\\,dt=\\left[${fr(r,2)}t^2\\right]_0^{${t}}\\)`,
      explanation:`\\(${fr(r,2)}\\cdot${t}^2=${r*t*t/2}\\)`,topic:'calc_aplint',type:'acumulacion'};
  };

  G['calc_aplint_area_parabola']=function(diff){
    // Área bajo y=x² desde x=-a hasta x=a: 2a³/3
    const a=pick([1,2,3]);
    const ans=2*Math.pow(a,3)/3;
    const ansStr=Number.isInteger(ans)?`${ans}`:`${2*a**3}/3`;
    return {question:`Calcula el área entre \\(y=x^2\\) y el eje \\(x\\) desde \\(x=-${a}\\) hasta \\(x=${a}\\).`,
      answer:ansStr,hint:`\\(A=\\int_{-${a}}^{${a}}x^2\\,dx=2\\int_0^{${a}}x^2\\,dx\\) (función par)`,
      explanation:`\\(2\\cdot\\frac{${a}^3}{3}=${ansStr}\\) u²`,topic:'calc_aplint',type:'area_parabola'};
  };

  G['calc_aplint_distancia']=function(diff){
    const v0=pick([10,15,20,25]), a=pick([2,3,4,5]), t=pick([2,3,4]);
    // s = v0*t + ½a*t²
    const s=v0*t+0.5*a*t*t;
    return {question:`Un cuerpo tiene velocidad \\(v(t)=${v0}${sp(a)}t\\) m/s. ¿Cuánto recorre en \\(${t}\\) s?`,
      answer:`${s} m`,hint:`\\(s=\\int_0^{${t}}(${v0}${sp(a)}t)\\,dt\\)`,
      explanation:`\\(s=[${v0}t+${fr(a,2)}t^2]_0^{${t}}=${v0*t}+${0.5*a*t*t}=${s}\\) m`,
      topic:'calc_aplint',type:'distancia'};
  };

  G['calc_aplint_tfc_aplicado']=function(diff){
    const F_expr='x³/3';
    const a=pick([0,1]), b=pick([1,2,3]);
    const ans=Math.pow(b,3)/3 - Math.pow(a,3)/3;
    return {question:`Si \\(F(x)=\\frac{x^3}{3}\\), evalúa \\(F(${b})-F(${a})\\).`,
      answer:`${ans}`,hint:'Aplica el Teorema Fundamental: sustituye los límites en la primitiva.',
      explanation:`\\(\\frac{${b}^3}{3}-\\frac{${a}^3}{3}=\\frac{${b**3}}{3}-\\frac{${a**3}}{3}=${ans}\\)`,
      topic:'calc_aplint',type:'tfc_aplicado'};
  };

  G['calc_aplint_area_rectangulo']=function(diff){
    // Comparar área exacta vs triángulo
    const b=pick([2,4,6,8]);
    const exacta=b*b/2; // ∫₀^b x dx
    const triangulo=exacta; // ½*base*altura = ½*b*b
    return {question:`El área bajo \\(f(x)=x\\) de \\(0\\) a \\(${b}\\) es igual al área del triángulo. ¿Cuánto vale?`,
      answer:`${exacta}`,hint:`Es la mitad de la base por la altura: \\(\\frac{1}{2}\\cdot${b}\\cdot${b}\\)`,
      explanation:`\\(\\int_0^{${b}}x\\,dx=\\frac{${b}^2}{2}=${exacta}\\) u² (coincide con triángulo rectángulo)`,
      topic:'calc_aplint',type:'triangulo'};
  };

  G['calc_aplint_positivo_negativo']=function(diff){
    // ∫₋₁¹ x dx = 0 (integral de función impar en intervalo simétrico)
    return {question:`¿Cuánto vale \\(\\int_{-1}^{1}x\\,dx\\)?`,
      answer:'0',hint:'\\(f(x)=x\\) es impar. En un intervalo simétrico, la integral es 0 (área positiva cancela la negativa).',
      explanation:`\\(\\left[\\frac{x^2}{2}\\right]_{-1}^{1}=\\frac{1}{2}-\\frac{1}{2}=0\\)`,
      topic:'calc_aplint',type:'simetria'};
  };

  window.MM_TOPIC_GENERATORS['calc_aplint']=[
    'calc_aplint_area_bajo_curva','calc_aplint_area_entre_curvas','calc_aplint_valor_medio',
    'calc_aplint_desplazamiento','calc_aplint_acumulacion','calc_aplint_area_parabola',
    'calc_aplint_distancia','calc_aplint_tfc_aplicado','calc_aplint_area_rectangulo',
    'calc_aplint_positivo_negativo'
  ];

  console.log('[MM] generators-calculo.js cargado. Temas:',
    Object.keys(window.MM_TOPIC_GENERATORS).filter(k=>k.startsWith('calc_')).length);
})();
