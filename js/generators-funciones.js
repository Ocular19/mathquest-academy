/* ═══════════════════════════════════════════════════════
   GENERATORS-FUNCIONES.JS — 6 temas × 10 generadores
   Funciones: lineal, afín, cuadrática, exponencial,
              logarítmica, racional
   ═══════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if(!window.MM_GENERATORS) window.MM_GENERATORS={};
  if(!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS={};
  const G=window.MM_GENERATORS;

  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const sp=n=>n<0?`${n}`:(n===0?'':n===1?'+1':`+${n}`);
  const fr=(n,d)=>{const g=gcd(Math.abs(n),d);return d/g===1?`${n/g}`:`\\frac{${n/g}}{${d/g}}`;};
  function gcd(a,b){return b===0?a:gcd(b,a%b);}
  const fmtPol=(a,b,c)=>{
    let s='';
    if(a!==0) s+=a===1?'x^2':a===-1?'-x^2':`${a}x^2`;
    if(b!==0) s+=b===1?(s?'+x':'x'):b===-1?(s?'-x':'-x'):(b>0&&s?`+${b}x`:`${b}x`);
    if(c!==0) s+=(c>0&&s?`+${c}`:`${c}`);
    return s||'0';
  };

  /* ═══════════════════════════════════════
     1. FUNCIÓN LINEAL  y = mx
  ═══════════════════════════════════════ */
  G['func_lin_evaluar']=function(diff){
    const tbl={easy:[2,3,4,5],medio:[6,7,8,-2,-3],dificil:[-4,-5,10,12],experto:[-6,-8,15,-10]};
    const xtbl={easy:[1,2,3,4],medio:[3,4,5,6],dificil:[5,6,7,8],experto:[6,7,8,9,10]};
    const m=pick(tbl[diff]||tbl.medio), x=pick(xtbl[diff]||xtbl.medio);
    const ans=m*x;
    return {question:`Si \\(f(x)=${m}x\\), halla \\(f(${x})\\).`,answer:`${ans}`,
      hint:`Sustituye \\(x=${x}\\): \\(f(${x})=${m}\\cdot${x}\\)`,
      explanation:`\\(f(${x})=${m}\\cdot${x}=${ans}\\)`,topic:'func_lineal',type:'evaluar'};
  };

  G['func_lin_pendiente_puntos']=function(diff){
    const xs={easy:[1,2],medio:[1,3],dificil:[2,4],experto:[3,5]};
    const [x1,x2]=xs[diff]||xs.medio;
    const ms={easy:[2,3,4],medio:[3,4,5],dificil:[-2,-3,-4],experto:[-5,6,-6]};
    const m=pick(ms[diff]||ms.medio);
    const y1=m*x1, y2=m*x2;
    return {question:`Halla la pendiente de la función que pasa por \\((${x1},${y1})\\) y \\((${x2},${y2})\\).`,
      answer:`${m}`, hint:`\\(m=\\frac{y_2-y_1}{x_2-x_1}=\\frac{${y2}-${y1}}{${x2}-${x1}}\\)`,
      explanation:`\\(m=\\frac{${y2-y1}}{${x2-x1}}=${m}\\)`,topic:'func_lineal',type:'pendiente'};
  };

  G['func_lin_proporcional']=function(diff){
    const ms={easy:[2,3,4],medio:[5,6,7],dificil:[8,9,10],experto:[11,12,13]};
    const m=pick(ms[diff]||ms.medio);
    const x1=pick([1,2,3]), x2=pick([4,5,6,7]);
    const y1=m*x1, ans=m*x2;
    return {question:`Si \\(f(x)\\) es proporcional a \\(x\\) y \\(f(${x1})=${y1}\\), ¿cuánto vale \\(f(${x2})\\)?`,
      answer:`${ans}`,hint:`Halla \\(m=\\frac{${y1}}{${x1}}=${m}\\). Luego \\(f(${x2})=${m}\\cdot${x2}\\)`,
      explanation:`\\(m=${m}\\Rightarrow f(${x2})=${m}\\cdot${x2}=${ans}\\)`,topic:'func_lineal',type:'proporcional'};
  };

  G['func_lin_inversa']=function(diff){
    const ms={easy:[2,3],medio:[4,5],dificil:[6,7],experto:[-3,-4]};
    const m=pick(ms[diff]||ms.medio);
    const ans=pick([2,3,4,5,6]);
    const y=m*ans;
    return {question:`Si \\(f(x)=${m}x\\) y \\(f(x)=${y}\\), ¿cuánto vale \\(x\\)?`,
      answer:`${ans}`,hint:`Despeja: \\(${m}x=${y}\\Rightarrow x=\\frac{${y}}{${m}}\\)`,
      explanation:`\\(x=\\frac{${y}}{${m}}=${ans}\\)`,topic:'func_lineal',type:'inversa'};
  };

  G['func_lin_razon_cambio']=function(diff){
    const ms={easy:[3,4],medio:[5,6,7],dificil:[8,9,10],experto:[11,12,-5]};
    const m=pick(ms[diff]||ms.medio);
    const ctx=pick([
      {ctx:'Por cada km extra que recorre un taxi, el precio sube $',unidad:'km'},
      {ctx:'Por cada hora trabajada, el salario crece $',unidad:'hora'},
    ]);
    return {question:`La función \\(f(x)=${m}x\\) representa un costo lineal. ¿Cuál es la razón de cambio por unidad?`,
      answer:`${m}`,hint:'La razón de cambio es la pendiente \\(m\\).',
      explanation:`En \\(f(x)=${m}x\\), la pendiente \\(m=${m}\\) es la razón de cambio.`,
      topic:'func_lineal',type:'razon_cambio'};
  };

  G['func_lin_creciente_decreciente']=function(diff){
    const m=pick([-5,-4,-3,-2,-1,1,2,3,4,5].filter(v=>v!==0));
    const resp=m>0?'creciente':'decreciente';
    return {question:`¿La función \\(f(x)=${m}x\\) es creciente o decreciente?`,
      answer:resp,hint:'Si \\(m>0\\), la función es creciente; si \\(m<0\\), decreciente.',
      explanation:`Como \\(m=${m}${m>0?'>0':'<0'}\\), la función es ${resp}.`,
      topic:'func_lineal',type:'creciente'};
  };

  G['func_lin_comparar']=function(diff){
    const m1=pick([2,3,4]), m2=pick([5,6,7]);
    const x=pick([2,3,4,5]);
    const y1=m1*x, y2=m2*x;
    const mayor=y1>y2?'f':'g';
    return {question:`Sean \\(f(x)=${m1}x\\) y \\(g(x)=${m2}x\\). En \\(x=${x}\\), ¿cuál función tiene mayor valor?`,
      answer:mayor,hint:`Evalúa \\(f(${x})=${y1}\\) y \\(g(${x})=${y2}\\).`,
      explanation:`\\(f(${x})=${y1}\\), \\(g(${x})=${y2}\\). Mayor: ${mayor}(x).`,
      topic:'func_lineal',type:'comparar'};
  };

  G['func_lin_formula_tabla']=function(diff){
    const m=pick([2,3,4,5]);
    const pairs=[[1,m],[2,2*m],[3,3*m]];
    return {question:`Dada la tabla de valores \\(x: 1,2,3\\) → \\(y: ${m},${2*m},${3*m}\\), escribe la fórmula \\(f(x)=\\)?`,
      answer:`${m}x`,hint:'Calcula el cociente \\(\\frac{y}{x}\\) para cada par.',
      explanation:`Razón constante: \\(\\frac{${m}}{1}=\\frac{${2*m}}{2}=\\frac{${3*m}}{3}=${m}\\). Luego \\(f(x)=${m}x\\).`,
      topic:'func_lineal',type:'formula_tabla'};
  };

  G['func_lin_dominio_imagen']=function(diff){
    const m=pick([2,3,4,-2,-3]);
    return {question:`Para \\(f(x)=${m}x\\), ¿cuáles son el dominio y el recorrido?`,
      answer:'todos los reales',hint:'Las funciones lineales están definidas para todo \\(x\\in\\mathbb{R}\\).',
      explanation:`Dominio: \\(\\mathbb{R}\\). Recorrido: \\(\\mathbb{R}\\) (para \\(m\\neq 0\\)).`,
      topic:'func_lineal',type:'dominio'};
  };

  G['func_lin_tabla_valores']=function(diff){
    const m=pick([2,3,4,5]);
    const x=pick([-2,-1,0,1,2]);
    const ans=m*x;
    return {question:`En \\(f(x)=${m}x\\), completa: \\(f(${x})=\\)?`,
      answer:`${ans}`,hint:`Multiplica: \\(${m}\\times(${x})\\)`,
      explanation:`\\(f(${x})=${m}\\cdot(${x})=${ans}\\)`,topic:'func_lineal',type:'tabla'};
  };

  window.MM_TOPIC_GENERATORS['func_lineal']=[
    'func_lin_evaluar','func_lin_pendiente_puntos','func_lin_proporcional',
    'func_lin_inversa','func_lin_razon_cambio','func_lin_creciente_decreciente',
    'func_lin_comparar','func_lin_formula_tabla','func_lin_dominio_imagen','func_lin_tabla_valores'
  ];

  /* ═══════════════════════════════════════
     2. FUNCIÓN AFÍN  y = mx + b
  ═══════════════════════════════════════ */
  G['func_af_evaluar']=function(diff){
    const ms={easy:[2,3],medio:[4,5],dificil:[-2,-3,6],experto:[-4,-5,7]};
    const bs={easy:[1,2,3],medio:[4,5,-1,-2],dificil:[-3,-4,6,7],experto:[-5,-6,8,-7]};
    const m=pick(ms[diff]||ms.medio), b=pick(bs[diff]||bs.medio);
    const x=pick([1,2,3,4,-1,-2]);
    const ans=m*x+b;
    const bStr=sp(b);
    return {question:`Si \\(f(x)=${m}x${bStr}\\), halla \\(f(${x})\\).`,
      answer:`${ans}`,hint:`Sustituye \\(x=${x}\\): \\(${m}(${x})${bStr}\\)`,
      explanation:`\\(f(${x})=${m}\\cdot${x}${bStr}=${m*x}${sp(b)}=${ans}\\)`,topic:'func_afin',type:'evaluar'};
  };

  G['func_af_cero']=function(diff){
    const ms={easy:[2,3],medio:[4,5,-2],dificil:[-3,6,-4],experto:[-5,7,-6]};
    const m=pick(ms[diff]||ms.medio);
    const ans=pick([1,2,3,4,-1,-2,-3]);
    const b=-m*ans;
    return {question:`Halla el cero (raíz) de \\(f(x)=${m}x${sp(b)}\\).`,
      answer:`${ans}`,hint:`Iguala a cero: \\(${m}x${sp(b)}=0\\)`,
      explanation:`\\(${m}x=-${b>=0?b:-b}\\Rightarrow x=${ans}\\)`,topic:'func_afin',type:'cero'};
  };

  G['func_af_intercepto_y']=function(diff){
    const ms=[2,3,4,-2,-3,5], bs=[1,2,3,4,-1,-2,-3,-4,5,-5];
    const m=pick(ms), b=pick(bs);
    return {question:`¿Cuál es el intercepto en \\(y\\) de \\(f(x)=${m}x${sp(b)}\\)?`,
      answer:`${b}`,hint:'El intercepto en \\(y\\) es el valor cuando \\(x=0\\).',
      explanation:`\\(f(0)=${m}(0)${sp(b)}=${b}\\). Intercepto: \\((0,${b})\\)`,topic:'func_afin',type:'intercepto_y'};
  };

  G['func_af_dos_puntos']=function(diff){
    const m=pick([2,3,-2,4,-3]), b=pick([1,2,-1,3,-2]);
    const x1=pick([0,1,2]), x2=x1+(pick([1,2]));
    const y1=m*x1+b, y2=m*x2+b;
    return {question:`Halla la ecuación de la recta que pasa por \\((${x1},${y1})\\) y \\((${x2},${y2})\\).`,
      answer:`${m}x${sp(b)}`,hint:`1) Pendiente \\(m=\\frac{${y2-y1}}{${x2-x1}}=${m}\\). 2) Usa \\(y-${y1}=${m}(x-${x1})\\)`,
      explanation:`\\(m=${m}\\). Con \\((${x1},${y1})\\): \\(y=${m}x${sp(b)}\\)`,topic:'func_afin',type:'dos_puntos'};
  };

  G['func_af_paralela']=function(diff){
    const m=pick([2,3,4,-2,-3]);
    return {question:`¿Cuál es la pendiente de toda recta paralela a \\(f(x)=${m}x+3\\)?`,
      answer:`${m}`,hint:'Las rectas paralelas tienen la misma pendiente.',
      explanation:`Rectas paralelas tienen igual pendiente: \\(m=${m}\\)`,topic:'func_afin',type:'paralela'};
  };

  G['func_af_perpendicular']=function(diff){
    const ms=[2,3,4,-2,-3,1];
    const m=pick(ms);
    const mp=-1/m; // pendiente perpendicular
    const mpStr=Number.isInteger(mp)?`${mp}`:`-\\frac{1}{${Math.abs(m)}}`;
    return {question:`La pendiente de una recta perpendicular a \\(f(x)=${m}x+1\\) es:`,
      answer:Number.isInteger(mp)?`${mp}`:`-1/${Math.abs(m)}`,
      hint:'Si la pendiente es \\(m\\), la perpendicular tiene pendiente \\(-\\frac{1}{m}\\).',
      explanation:`Perpendicular: \\(m_\\perp=${mpStr}\\)`,topic:'func_afin',type:'perpendicular'};
  };

  G['func_af_pertenece_punto']=function(diff){
    const m=pick([2,3,-2,4]), b=pick([1,-1,2,-2,3]);
    const x=pick([1,2,3,-1,-2]);
    const y=m*x+b;
    const yWrong=y+(pick([1,-1,2,-2]));
    const esCorr=pick([true,false]);
    const yUsado=esCorr?y:yWrong;
    const resp=esCorr?'sí':'no';
    return {question:`¿Pertenece el punto \\((${x},${yUsado})\\) a la recta \\(f(x)=${m}x${sp(b)}\\)?`,
      answer:resp,hint:`Evalúa \\(f(${x})=${m}(${x})${sp(b)}=${y}\\). Compara con \\(${yUsado}\\).`,
      explanation:`\\(f(${x})=${y}\\). Como \\(${y}${esCorr?'=':'\\neq'}${yUsado}\\), la respuesta es ${resp}.`,
      topic:'func_afin',type:'pertenece'};
  };

  G['func_af_pendiente_equation']=function(diff){
    const m=pick([2,3,4,-2,-3,5,-5]), b=pick([1,2,3,-1,-2,-3]);
    return {question:`¿Cuál es la pendiente de \\(f(x)=${m}x${sp(b)}\\)?`,
      answer:`${m}`,hint:'La pendiente es el coeficiente de \\(x\\).',
      explanation:`En \\(y=mx+b\\), \\(m=${m}\\)`,topic:'func_afin',type:'pendiente'};
  };

  G['func_af_suma_interceptos']=function(diff){
    const m=pick([2,3,-2,4]);
    const b=pick([2,4,6,-2,-4,6]);
    const xInt=-b/m; // cero
    const sum=xInt+b;
    return {question:`Para \\(f(x)=${m}x${sp(b)}\\), ¿cuánto es la suma del intercepto en \\(x\\) más el intercepto en \\(y\\)?`,
      answer:`${sum}`,hint:`Intercepto en \\(y\\): ${b}. Intercepto en \\(x\\): \\(${-b}/${m}=${xInt}\\).`,
      explanation:`Suma: \\(${xInt}+${b}=${sum}\\)`,topic:'func_afin',type:'suma_interceptos'};
  };

  G['func_af_imagen_desde_tabla']=function(diff){
    const m=pick([2,3,4,-2]), b=pick([1,-1,2,-2,3]);
    const x=pick([0,1,2,3,-1]);
    const ans=m*x+b;
    return {question:`Para \\(f(x)=${m}x${sp(b)}\\), halla \\(f(${x})\\).`,
      answer:`${ans}`,hint:`Reemplaza \\(x=${x}\\).`,
      explanation:`\\(${m}(${x})${sp(b)}=${m*x}${sp(b)}=${ans}\\)`,topic:'func_afin',type:'imagen'};
  };

  window.MM_TOPIC_GENERATORS['func_afin']=[
    'func_af_evaluar','func_af_cero','func_af_intercepto_y',
    'func_af_dos_puntos','func_af_paralela','func_af_perpendicular',
    'func_af_pertenece_punto','func_af_pendiente_equation',
    'func_af_suma_interceptos','func_af_imagen_desde_tabla'
  ];

  /* ═══════════════════════════════════════
     3. FUNCIÓN CUADRÁTICA  y = ax² + bx + c
  ═══════════════════════════════════════ */
  // Generamos desde raíces para garantizar resultados limpios
  function quadFromRoots(p,q,a=1){
    return {a,b:-a*(p+q),c:a*p*q};
  }

  G['func_cu_evaluar']=function(diff){
    const a=pick([1,1,1,2,-1]), b=pick([-3,-2,-1,0,1,2,3]), c=pick([0,1,2,3,-1,-2]);
    const x=pick([-2,-1,0,1,2,3]);
    const ans=a*x*x+b*x+c;
    return {question:`Si \\(f(x)=${fmtPol(a,b,c)}\\), halla \\(f(${x})\\).`,
      answer:`${ans}`,hint:`Sustituye \\(x=${x}\\): \\(${a}(${x})^2+${b}(${x})+${c}\\)`,
      explanation:`\\(${a*x*x}${sp(b*x)}${sp(c)}=${ans}\\)`,topic:'func_cuadratica',type:'evaluar'};
  };

  G['func_cu_vertice']=function(diff){
    const pairs={easy:[[1,-2],[2,-4]],medio:[[3,-6],[2,-3]],dificil:[[4,-8],[3,-3]],experto:[[5,-10],[4,-5]]};
    const [p,q]=pick(pairs[diff]||pairs.medio);
    const {a,b,c}=quadFromRoots(p,q,1);
    const h=-b/2, k=a*h*h+b*h+c;
    return {question:`Halla el vértice de \\(f(x)=${fmtPol(a,b,c)}\\).`,
      answer:`(${h},${k})`,hint:`El vértice es \\(h=-\\frac{b}{2a},\\;k=f(h)\\).`,
      explanation:`\\(h=-\\frac{${b}}{${2*a}}=${h}\\). \\(k=f(${h})=${k}\\). Vértice: \\((${h},${k})\\)`,
      topic:'func_cuadratica',type:'vertice'};
  };

  G['func_cu_discriminante']=function(diff){
    const pairs={easy:[[1,2],[2,3]],medio:[[1,-3],[2,5]],dificil:[[3,-4],[1,4]],experto:[[4,-5],[3,6]]};
    const [p,q]=pick(pairs[diff]||pairs.medio);
    const {a,b,c}=quadFromRoots(p,q,1);
    const D=b*b-4*a*c;
    return {question:`¿Cuánto es el discriminante de \\(f(x)=${fmtPol(a,b,c)}\\)?`,
      answer:`${D}`,hint:`\\(\\Delta=b^2-4ac=${b}^2-4(${a})(${c})\\)`,
      explanation:`\\(\\Delta=${b*b}-${4*a*c}=${D}\\)`,topic:'func_cuadratica',type:'discriminante'};
  };

  G['func_cu_raices']=function(diff){
    const pairsE={easy:[[1,2],[1,3],[2,3]],medio:[[1,-2],[2,-3],[-1,3]],dificil:[[-2,4],[-1,5],[2,6]],experto:[[-3,5],[-2,7],[3,-5]]};
    const [p,q]=pick(pairsE[diff]||pairsE.medio);
    const {a,b,c}=quadFromRoots(p,q,1);
    const rMin=Math.min(p,q), rMax=Math.max(p,q);
    return {question:`Halla las raíces de \\(f(x)=${fmtPol(a,b,c)}\\).`,
      answer:`${rMin} y ${rMax}`,hint:`Factoriza: \\((x-${p})(x-${q})=0\\)`,
      explanation:`\\((x-${p})(x-${q})=0\\Rightarrow x=${p}\\) o \\(x=${q}\\)`,
      topic:'func_cuadratica',type:'raices'};
  };

  G['func_cu_eje_simetria']=function(diff){
    const pairs={easy:[[1,3],[2,4]],medio:[[1,5],[3,5]],dificil:[[1,-3],[-2,4]],experto:[[1,-5],[3,-4]]};
    const [p,q]=pick(pairs[diff]||pairs.medio);
    const {a,b}=quadFromRoots(p,q,1);
    const h=-b/(2*a);
    return {question:`¿Cuál es el eje de simetría de \\(f(x)=${fmtPol(a,b,quadFromRoots(p,q,1).c)}\\)?`,
      answer:`x=${h}`,hint:`Eje de simetría: \\(x=-\\frac{b}{2a}=-\\frac{${b}}{${2*a}}\\)`,
      explanation:`\\(x=-\\frac{${b}}{${2}}=${h}\\)`,topic:'func_cuadratica',type:'eje_simetria'};
  };

  G['func_cu_max_min']=function(diff){
    const a=pick([-2,-1,1,2]);
    const p=pick([1,2,3]), q=pick([4,5,6]);
    const {b,c}=quadFromRoots(p,q,a);
    const h=-b/(2*a), k=a*h*h+b*h+c;
    const tipo=a>0?'mínimo':'máximo';
    return {question:`¿La función \\(f(x)=${fmtPol(a,b,c)}\\) tiene máximo o mínimo? ¿Cuánto vale?`,
      answer:`${tipo} ${k}`,hint:`Si \\(a>0\\): mínimo; si \\(a<0\\): máximo. Valor en el vértice.`,
      explanation:`\\(a=${a}${a>0?'>0':'<0'}\\): ${tipo} en \\(x=${h}\\), valor \\(${k}\\)`,
      topic:'func_cuadratica',type:'max_min'};
  };

  G['func_cu_suma_raices']=function(diff){
    const pairs={easy:[[1,3],[2,4]],medio:[[1,5],[2,6]],dificil:[[-1,4],[1,-3]],experto:[[-2,5],[-3,4]]};
    const [p,q]=pick(pairs[diff]||pairs.medio);
    const {a,b}=quadFromRoots(p,q,1);
    const suma=p+q;
    return {question:`Para \\(f(x)=${fmtPol(a,b,quadFromRoots(p,q).c)}\\), ¿cuánto es la suma de las raíces?`,
      answer:`${suma}`,hint:`Suma de raíces: \\(-\\frac{b}{a}=-\\frac{${b}}{${a}}\\)`,
      explanation:`\\(-\\frac{b}{a}=-\\frac{${b}}{1}=${suma}\\). Verificación: \\(${p}+${q}=${suma}\\)`,
      topic:'func_cuadratica',type:'suma_raices'};
  };

  G['func_cu_producto_raices']=function(diff){
    const pairs={easy:[[1,2],[2,3]],medio:[[1,4],[3,5]],dificil:[[-1,3],[2,-4]],experto:[[-2,5],[-3,4]]};
    const [p,q]=pick(pairs[diff]||pairs.medio);
    const {a,b,c}=quadFromRoots(p,q,1);
    const prod=p*q;
    return {question:`Para \\(f(x)=${fmtPol(1,b,c)}\\), ¿cuánto es el producto de las raíces?`,
      answer:`${prod}`,hint:`Producto de raíces: \\(\\frac{c}{a}=\\frac{${c}}{1}=${c}\\)`,
      explanation:`\\(\\frac{c}{a}=${c}\\). Verificación: \\(${p}\\cdot${q}=${prod}\\)`,
      topic:'func_cuadratica',type:'producto_raices'};
  };

  G['func_cu_numero_raices']=function(diff){
    const cases=[
      {a:1,b:-5,c:6,D:1,tipo:'dos raíces reales'},
      {a:1,b:-2,c:1,D:0,tipo:'una raíz doble'},
      {a:1,b:0,c:1,D:-4,tipo:'sin raíces reales'},
      {a:1,b:-6,c:8,D:4,tipo:'dos raíces reales'},
    ];
    const cs=pick(cases);
    return {question:`¿Cuántas raíces reales tiene \\(f(x)=${fmtPol(cs.a,cs.b,cs.c)}\\)?`,
      answer:cs.tipo,hint:`Calcula \\(\\Delta=b^2-4ac=${cs.D}\\). Si \\(\\Delta>0\\): 2 raíces; \\(=0\\): 1; \\(<0\\): 0.`,
      explanation:`\\(\\Delta=${cs.D}${cs.D>0?'>0':cs.D===0?'=0':'<0'}\\): ${cs.tipo}`,
      topic:'func_cuadratica',type:'numero_raices'};
  };

  G['func_cu_forma_vertice']=function(diff){
    const h=pick([-2,-1,1,2,3]), k=pick([-4,-1,0,1,4,9]);
    const fv=`(x${h<0?`+${-h}`:h>0?`-${h}`:''}${k>=0?`+${k}`:k<0?`${k}`:''})`; // simplified display
    return {question:`Escribe en forma de vértice la parábola con vértice \\((${h},${k})\\) y \\(a=1\\).`,
      answer:`(x-${h})^2+${k}`,hint:`Forma vértice: \\(f(x)=a(x-h)^2+k\\)`,
      explanation:`\\(f(x)=(x-${h})^2+${k}\\)`,topic:'func_cuadratica',type:'forma_vertice'};
  };

  window.MM_TOPIC_GENERATORS['func_cuadratica']=[
    'func_cu_evaluar','func_cu_vertice','func_cu_discriminante','func_cu_raices',
    'func_cu_eje_simetria','func_cu_max_min','func_cu_suma_raices',
    'func_cu_producto_raices','func_cu_numero_raices','func_cu_forma_vertice'
  ];

  /* ═══════════════════════════════════════
     4. FUNCIÓN EXPONENCIAL  y = a·bˣ
  ═══════════════════════════════════════ */
  G['func_exp_evaluar']=function(diff){
    const bs={easy:[2,3],medio:[2,3,4],dificil:[2,5,10],experto:[2,3,5]};
    const xs={easy:[1,2,3],medio:[2,3,4],dificil:[3,4,5],experto:[4,5,6]};
    const b=pick(bs[diff]||bs.medio), x=pick(xs[diff]||xs.medio);
    const ans=Math.pow(b,x);
    return {question:`Evalúa \\(f(x)=${b}^x\\) en \\(x=${x}\\).`,
      answer:`${ans}`,hint:`Calcula \\(${b}^{${x}}\\)`,
      explanation:`\\(${b}^{${x}}=${ans}\\)`,topic:'func_exponencial',type:'evaluar'};
  };

  G['func_exp_crecimiento_decaimiento']=function(diff){
    const casos=[
      {b:2,tipo:'crecimiento',razon:'base > 1'},
      {b:3,tipo:'crecimiento',razon:'base > 1'},
      {b:0.5,tipo:'decaimiento',razon:'0 < base < 1'},
      {b:0.25,tipo:'decaimiento',razon:'0 < base < 1'},
    ];
    const c=pick(casos);
    return {question:`¿La función \\(f(x)=${c.b}^x\\) representa crecimiento o decaimiento exponencial?`,
      answer:c.tipo,hint:'Si la base > 1: crecimiento. Si 0 < base < 1: decaimiento.',
      explanation:`Base = ${c.b}: ${c.razon} → ${c.tipo} exponencial.`,topic:'func_exponencial',type:'tipo'};
  };

  G['func_exp_duplicacion']=function(diff){
    const t=pick([1,2,5,10]);
    const P0=pick([100,200,500,1000]);
    const desps={easy:1,medio:2,dificil:3,experto:4};
    const n=desps[diff]||1;
    const ans=P0*Math.pow(2,n);
    return {question:`Una población de ${P0} se duplica cada ${t} años. ¿Cuántos habrá tras ${n*t} años?`,
      answer:`${ans}`,hint:`Número de duplicaciones: \\(\\frac{${n*t}}{${t}}=${n}\\). Total: \\(${P0}\\cdot2^{${n}}\\)`,
      explanation:`\\(${P0}\\cdot2^{${n}}=${ans}\\)`,topic:'func_exponencial',type:'duplicacion'};
  };

  G['func_exp_valor_inicial']=function(diff){
    const b=pick([2,3,4]);
    const x=pick([1,2,3]);
    const a=pick([1,2,5,10,100]);
    const ans=a*Math.pow(b,x);
    return {question:`Para \\(f(x)=${a}\\cdot${b}^x\\), halla \\(f(${x})\\).`,
      answer:`${ans}`,hint:`Evalúa: \\(${a}\\cdot${b}^{${x}}=${a}\\cdot${Math.pow(b,x)}\\)`,
      explanation:`\\(${a}\\cdot${Math.pow(b,x)}=${ans}\\)`,topic:'func_exponencial',type:'valor'};
  };

  G['func_exp_base_e']=function(diff){
    const xs=[0,1,2];
    const x=pick(xs);
    const vals={0:1,1:'e≈2.718',2:'e²≈7.389'};
    return {question:`¿Cuánto vale \\(e^{${x}}\\) (aproximado)?`,
      answer:String(vals[x]),hint:'Recuerda: \\(e^0=1\\), \\(e^1\\approx2.718\\), \\(e^2\\approx7.389\\)',
      explanation:`\\(e^{${x}}=${vals[x]}\\)`,topic:'func_exponencial',type:'base_e'};
  };

  G['func_exp_asintota']=function(diff){
    const b=pick([2,3,0.5]);
    return {question:`¿Cuál es la asíntota horizontal de \\(f(x)=${b}^x\\)?`,
      answer:'y=0',hint:'La función exponencial se aproxima a 0 cuando \\(x\\to-\\infty\\) (b>1).',
      explanation:`Asíntota horizontal: \\(y=0\\) (eje \\(x\\))`,topic:'func_exponencial',type:'asintota'};
  };

  G['func_exp_despejar_x']=function(diff){
    const b=pick([2,3,4,5]);
    const x=pick([2,3,4,5]);
    const ans=Math.pow(b,x);
    return {question:`Si \\(${b}^x=${ans}\\), ¿cuánto vale \\(x\\)?`,
      answer:`${x}`,hint:`\\(${b}^x=${ans}=${b}^{${x}}\\)`,
      explanation:`\\(${b}^x=${b}^{${x}}\\Rightarrow x=${x}\\)`,topic:'func_exponencial',type:'despejar'};
  };

  G['func_exp_comparar']=function(diff){
    const x=pick([1,2,3,4]);
    const b1=2, b2=3;
    const v1=Math.pow(b1,x), v2=Math.pow(b2,x);
    const mayor=v1>v2?`${b1}^x`:`${b2}^x`;
    return {question:`En \\(x=${x}\\), ¿cuál es mayor: \\(${b1}^x\\) o \\(${b2}^x\\)?`,
      answer:`${b2}^x`,hint:`Calcula \\(${b1}^{${x}}=${v1}\\) y \\(${b2}^{${x}}=${v2}\\)`,
      explanation:`\\(${v2}>${v1}\\), por lo tanto \\(${b2}^x\\) es mayor.`,topic:'func_exponencial',type:'comparar'};
  };

  G['func_exp_tasa']=function(diff){
    const tasas={easy:50,medio:25,dificil:20,experto:10};
    const t=tasas[diff]||25;
    const base=1+t/100;
    return {question:`Una inversión crece un ${t}% anual. ¿Cuál es la base de la función exponencial que la modela?`,
      answer:`${base}`,hint:`Tasa ${t}% → base = \\(1+\\frac{${t}}{100}=${base}\\)`,
      explanation:`\\(f(t)=P_0\\cdot${base}^t\\). Base: ${base}`,topic:'func_exponencial',type:'tasa'};
  };

  G['func_exp_dominio_imagen']=function(diff){
    const b=pick([2,3,0.5]);
    return {question:`¿Cuáles son el dominio y recorrido de \\(f(x)=${b}^x\\)?`,
      answer:'D=reales, R=positivos',hint:'El exponencial acepta cualquier x. La imagen siempre es positiva.',
      explanation:`Dominio: \\(\\mathbb{R}\\). Recorrido: \\((0,+\\infty)\\)`,topic:'func_exponencial',type:'dominio'};
  };

  window.MM_TOPIC_GENERATORS['func_exponencial']=[
    'func_exp_evaluar','func_exp_crecimiento_decaimiento','func_exp_duplicacion',
    'func_exp_valor_inicial','func_exp_base_e','func_exp_asintota',
    'func_exp_despejar_x','func_exp_comparar','func_exp_tasa','func_exp_dominio_imagen'
  ];

  /* ═══════════════════════════════════════
     5. FUNCIÓN LOGARÍTMICA
  ═══════════════════════════════════════ */
  G['func_log_evaluar']=function(diff){
    const bases={easy:[2,10],medio:[2,3,10],dificil:[2,3,5],experto:[2,3,5,7]};
    const b=pick(bases[diff]||bases.medio);
    const exp=pick([1,2,3,4]);
    const x=Math.pow(b,exp);
    return {question:`Evalúa \\(\\log_{${b}}(${x})\\).`,
      answer:`${exp}`,hint:`Pregunta: \\(${b}\\) elevado a ¿qué potencia da ${x}? \\(${b}^{${exp}}=${x}\\)`,
      explanation:`\\(\\log_{${b}}(${x})=${exp}\\) porque \\(${b}^{${exp}}=${x}\\)`,topic:'func_logaritmica',type:'evaluar'};
  };

  G['func_log_propiedad_producto']=function(diff){
    const b=pick([2,10]);
    const a1=pick([1,2,4,8]), a2=pick([1,2,4,8]);
    const prod=a1*a2;
    const v1=Math.log2(a1)/Math.log2(b), v2=Math.log2(a2)/Math.log2(b), vp=Math.log2(prod)/Math.log2(b);
    if(!Number.isInteger(v1)||!Number.isInteger(v2)) return G['func_log_evaluar'](diff);
    return {question:`Simplifica: \\(\\log_{${b}}(${a1})+\\log_{${b}}(${a2})\\).`,
      answer:`${vp}`,hint:`Propiedad del producto: \\(\\log_b(a)+\\log_b(c)=\\log_b(ac)\\)`,
      explanation:`\\(\\log_{${b}}(${a1}\\cdot${a2})=\\log_{${b}}(${prod})=${vp}\\)`,topic:'func_logaritmica',type:'producto'};
  };

  G['func_log_propiedad_potencia']=function(diff){
    const b=2, n=pick([2,3,4]);
    const x=pick([2,4,8]);
    const ans=n*Math.log2(x);
    if(!Number.isInteger(ans)) return G['func_log_evaluar'](diff);
    return {question:`Simplifica: \\(\\log_{${b}}(${x}^{${n}})\\).`,
      answer:`${ans}`,hint:`Propiedad: \\(\\log_b(a^n)=n\\cdot\\log_b(a)\\)`,
      explanation:`\\(${n}\\cdot\\log_{${b}}(${x})=${n}\\cdot${Math.log2(x)}=${ans}\\)`,topic:'func_logaritmica',type:'potencia'};
  };

  G['func_log_ecuacion_basica']=function(diff){
    const b=pick([2,3,10]);
    const c=pick([1,2,3,4]);
    const ans=Math.pow(b,c);
    return {question:`Resuelve: \\(\\log_{${b}}(x)=${c}\\).`,
      answer:`${ans}`,hint:`Convierte a exponencial: \\(${b}^{${c}}=x\\)`,
      explanation:`\\(x=${b}^{${c}}=${ans}\\)`,topic:'func_logaritmica',type:'ecuacion'};
  };

  G['func_log_natural']=function(diff){
    const casos=[
      {expr:'\\ln(1)',ans:'0',exp:'\\(\\ln(1)=0\\) porque \\(e^0=1\\)'},
      {expr:'\\ln(e)',ans:'1',exp:'\\(\\ln(e)=1\\) porque \\(e^1=e\\)'},
      {expr:'\\ln(e^2)',ans:'2',exp:'\\(\\ln(e^2)=2\\)'},
      {expr:'\\ln(e^3)',ans:'3',exp:'\\(\\ln(e^3)=3\\)'},
    ];
    const c=pick(casos);
    return {question:`Evalúa \\(${c.expr}\\).`,answer:c.ans,hint:'\\(\\ln=\\log_e\\)',
      explanation:c.exp,topic:'func_logaritmica',type:'natural'};
  };

  G['func_log_cambio_base']=function(diff){
    const pairs=[[8,2,3],[27,3,3],[16,2,4],[100,10,2],[9,3,2]];
    const [x,b,ans]=pick(pairs);
    return {question:`Halla \\(\\log_{${b}}(${x})\\) usando la definición.`,
      answer:`${ans}`,hint:`¿A qué potencia hay que elevar ${b} para obtener ${x}? \\(${b}^?=${x}\\)`,
      explanation:`\\(${b}^{${ans}}=${x}\\Rightarrow\\log_{${b}}(${x})=${ans}\\)`,topic:'func_logaritmica',type:'cambio_base'};
  };

  G['func_log_dominio']=function(diff){
    const a=pick([1,2,3,-1,-2]);
    const b=10;
    const dom=a>0?`x>0`:`x>${-a} (positivos)`;
    return {question:`¿Cuál es el dominio de \\(f(x)=\\log(x${sp(a)})\\)?`,
      answer:`x>${a>0?`-${a}`:0}`,hint:'El argumento del logaritmo debe ser positivo.',
      explanation:`\\(x${sp(a)}>0\\Rightarrow x>${a>0?`-${a}`:a<0?-a:0}\\)`,topic:'func_logaritmica',type:'dominio'};
  };

  G['func_log_simplificar']=function(diff){
    const casos=[
      {expr:'\\log_{10}(10)',ans:'1'},
      {expr:'\\log_{5}(1)',ans:'0'},
      {expr:'\\log_{3}(3^4)',ans:'4'},
      {expr:'\\log_{2}(2^5)',ans:'5'},
    ];
    const c=pick(casos);
    return {question:`Simplifica: \\(${c.expr}\\).`,answer:c.ans,
      hint:'Aplica: \\(\\log_b(b)=1\\), \\(\\log_b(1)=0\\), \\(\\log_b(b^n)=n\\)',
      explanation:`\\(${c.expr}=${c.ans}\\)`,topic:'func_logaritmica',type:'simplificar'};
  };

  G['func_log_cociente']=function(diff){
    const b=2;
    const a=pick([[8,4,1],[16,8,1],[32,16,1],[8,2,2]]);
    const [x,y,ans]=a;
    return {question:`Simplifica \\(\\log_{${b}}(${x})-\\log_{${b}}(${y})\\).`,
      answer:`${ans}`,hint:`Propiedad del cociente: \\(\\log_b(x)-\\log_b(y)=\\log_b\\left(\\frac{x}{y}\\right)\\)`,
      explanation:`\\(\\log_{${b}}\\left(\\frac{${x}}{${y}}\\right)=\\log_{${b}}(${x/y})=${ans}\\)`,
      topic:'func_logaritmica',type:'cociente'};
  };

  G['func_log_creciente']=function(diff){
    const b=pick([2,3,10]);
    return {question:`¿La función \\(f(x)=\\log_{${b}}(x)\\) es creciente o decreciente?`,
      answer:'creciente',hint:'Para base > 1, el logaritmo es creciente.',
      explanation:`Con base ${b}>1, \\(f(x)\\) es estrictamente creciente.`,topic:'func_logaritmica',type:'monotonia'};
  };

  window.MM_TOPIC_GENERATORS['func_logaritmica']=[
    'func_log_evaluar','func_log_propiedad_producto','func_log_propiedad_potencia',
    'func_log_ecuacion_basica','func_log_natural','func_log_cambio_base',
    'func_log_dominio','func_log_simplificar','func_log_cociente','func_log_creciente'
  ];

  /* ═══════════════════════════════════════
     6. FUNCIÓN RACIONAL  y = p(x)/q(x)
  ═══════════════════════════════════════ */
  G['func_rac_evaluar']=function(diff){
    const a=pick([1,2,3,-1,-2]), b=pick([1,2,3,-1,-2]), c=pick([1,2,-1,-2]);
    const x=pick([1,2,3,-1,-2,4]);
    const num=a*x+b, den=c*x+(pick([1,2,-1]));
    if(den===0) return G['func_rac_evaluar'](diff);
    const frac=fr(num,Math.abs(den));
    return {question:`Evalúa \\(f(x)=\\frac{${a}x+${b}}{${c}x+${c===1?2:1}}\\) en \\(x=${x}\\).`,
      answer:`${num/(c*x+(c===1?2:1))}`,hint:`Sustituye \\(x=${x}\\) en numerador y denominador.`,
      explanation:`\\(f(${x})=\\frac{${num}}{${c*x+(c===1?2:1)}}=${num/(c*x+(c===1?2:1))}\\)`,
      topic:'func_racional',type:'evaluar'};
  };

  G['func_rac_asintota_vertical']=function(diff){
    const a=pick([1,2,3,-1,-2,-3]);
    return {question:`Halla la asíntota vertical de \\(f(x)=\\frac{1}{x-${a}}\\).`,
      answer:`x=${a}`,hint:'La asíntota vertical es donde el denominador se hace cero.',
      explanation:`\\(x-${a}=0\\Rightarrow x=${a}\\)`,topic:'func_racional',type:'asintota_v'};
  };

  G['func_rac_asintota_horizontal']=function(diff){
    const casos=[
      {f:'\\frac{2x+1}{x-3}',ans:'y=2',exp:'Grados iguales: razón de coeficientes líderes: 2/1=2'},
      {f:'\\frac{3x}{x+1}',ans:'y=3',exp:'Grados iguales: 3/1=3'},
      {f:'\\frac{1}{x^2+1}',ans:'y=0',exp:'Grado numerador < denominador → y=0'},
      {f:'\\frac{x+1}{2x-1}',ans:'y=1/2',exp:'Grados iguales: 1/2'},
    ];
    const c=pick(casos);
    return {question:`¿Cuál es la asíntota horizontal de \\(${c.f}\\)?`,answer:c.ans,
      hint:'Si grados iguales: razón de coeficientes. Si gr(num)<gr(den): y=0.',
      explanation:c.exp,topic:'func_racional',type:'asintota_h'};
  };

  G['func_rac_dominio']=function(diff){
    const a=pick([1,2,3,-1,-2,-3,0]);
    return {question:`¿Cuál es el dominio de \\(f(x)=\\frac{x+1}{x-${a}}\\)?`,
      answer:`x≠${a}`,hint:'El denominador no puede ser cero.',
      explanation:`\\(x-${a}\\neq0\\Rightarrow x\\neq${a}\\). Dominio: \\(\\mathbb{R}\\setminus\\{${a}\\}\\)`,
      topic:'func_racional',type:'dominio'};
  };

  G['func_rac_ceros']=function(diff){
    const a=pick([1,2,3,-1,-2,-3]), b=pick([1,2,-1,-2]);
    return {question:`¿Cuál es el cero de \\(f(x)=\\frac{x-${a}}{x+${b}}\\)?`,
      answer:`x=${a}`,hint:'Los ceros son donde el numerador vale cero (y el denominador no).',
      explanation:`Numerador=0: \\(x-${a}=0\\Rightarrow x=${a}\\). Denominador: \\(${a}+${b}=${a+b}\\neq0\\) ✓`,
      topic:'func_racional',type:'ceros'};
  };

  G['func_rac_simplificar']=function(diff){
    const a=pick([1,2,3]);
    return {question:`Simplifica \\(f(x)=\\frac{x^2-${a*a}}{x-${a}}\\) (con \\(x\\neq${a}\\)).`,
      answer:`x+${a}`,hint:`Factoriza el numerador: \\((x-${a})(x+${a})\\)`,
      explanation:`\\(\\frac{(x-${a})(x+${a})}{x-${a}}=x+${a}\\)`,topic:'func_racional',type:'simplificar'};
  };

  G['func_rac_paridad']=function(diff){
    const casos=[
      {f:'\\frac{x}{x^2+1}',tipo:'impar',exp:'f(-x)=-f(x)'},
      {f:'\\frac{1}{x^2+1}',tipo:'par',exp:'f(-x)=f(x)'},
      {f:'\\frac{x+1}{x-1}',tipo:'ninguna',exp:'f(-x)≠f(x) y f(-x)≠-f(x)'},
    ];
    const c=pick(casos);
    return {question:`La función \\(${c.f}\\) es par, impar o ninguna?`,answer:c.tipo,
      hint:'Par: f(-x)=f(x). Impar: f(-x)=-f(x).',explanation:c.exp,
      topic:'func_racional',type:'paridad'};
  };

  G['func_rac_valor_en_infinito']=function(diff){
    const a=pick([2,3,4,-2,-3]);
    const b=pick([1,2,3,-1,-2]);
    return {question:`¿Hacia dónde tiende \\(\\frac{${a}x+1}{x+${b}}\\) cuando \\(x\\to\\infty\\)?`,
      answer:`${a}`,hint:'Los términos constantes se vuelven insignificantes: \\(\\frac{${a}x}{x}=${a}\\)',
      explanation:`\\(\\lim_{x\\to\\infty}\\frac{${a}x+1}{x+${b}}=${a}\\)`,topic:'func_racional',type:'limite_inf'};
  };

  G['func_rac_discontinuidad']=function(diff){
    const a=pick([1,2,3,-1,-2]);
    return {question:`¿Qué tipo de discontinuidad tiene \\(f(x)=\\frac{1}{x-${a}}\\) en \\(x=${a}\\)?`,
      answer:'esencial (infinita)',hint:'El denominador se hace cero y la función diverge.',
      explanation:`En \\(x=${a}\\), \\(f(x)\\to\\pm\\infty\\): discontinuidad esencial (asíntota vertical).`,
      topic:'func_racional',type:'discontinuidad'};
  };

  G['func_rac_paridad2']=function(diff){
    const n=pick([2,3,4,5,6]);
    return {question:`¿Cuántos ceros tiene \\(f(x)=\\frac{x^${n}-1}{x+2}\\)? (sin contar \\(x=-2\\))`,
      answer:n===1?'1':n%2===0?'2':'1',hint:`Los ceros son donde \\(x^${n}=1\\).`,
      explanation:`\\(x^${n}=1\\): ${n%2===0?'x=1 y x=-1 (2 raíces reales)':'solo x=1 (1 raíz real)'}`,
      topic:'func_racional',type:'num_ceros'};
  };

  window.MM_TOPIC_GENERATORS['func_racional']=[
    'func_rac_evaluar','func_rac_asintota_vertical','func_rac_asintota_horizontal',
    'func_rac_dominio','func_rac_ceros','func_rac_simplificar',
    'func_rac_paridad','func_rac_valor_en_infinito','func_rac_discontinuidad','func_rac_paridad2'
  ];

  console.log('[MM] generators-funciones.js cargado. Temas:',
    Object.keys(window.MM_TOPIC_GENERATORS).filter(k=>k.startsWith('func_')).length);
})();
