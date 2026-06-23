/* ═══════════════════════════════════════════════════════
   CONTENT-FUNCIONES.JS — 6 lecciones completas
   Funciones: lineal, afín, cuadrática, exponencial,
              logarítmica, racional
   ═══════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const LESSONS=[
    /* ──────────────────────────────────────── */
    {
      id:'func-lineal', subject:'funciones', unit:'func_u1',
      title:'Función Lineal', icon:'📐',
      concept:{
        what:'Una función lineal \\(f(x)=mx\\) describe una relación de proporcionalidad directa entre dos variables. Su gráfica es una recta que pasa por el origen \\((0,0)\\). La pendiente \\(m\\) indica cuánto cambia \\(y\\) por cada unidad que avanza \\(x\\).',
        why:'Las funciones lineales son el bloque fundamental de todo el álgebra y el cálculo. Modelan situaciones donde una variable cambia a tasa constante: velocidad uniforme, precio proporcional, conversión de unidades.',
        realLife:'Conversión de monedas (1 USD = 950 CLP), consumo de combustible (km por litro), temperatura (°C = 5/9 · (°F−32) simplificado sin traslación).',
        commonErrors:[
          'Confundir f(x)=mx con f(x)=mx+b — la lineal pasa por el origen.',
          'Creer que "pendiente negativa" significa función decreciente de todo (no: sí lo es, pero la función sigue siendo lineal).',
          'Olvidar que la pendiente es adimensional: debe tener las mismas unidades que Δy/Δx.',
        ]
      },
      examples:[
        {title:'Evaluar una función lineal',
         problem:'Si \\(f(x)=3x\\), halla \\(f(4)\\).',
         steps:['Sustituye \\(x=4\\): \\(f(4)=3\\cdot4\\).','Calcula: \\(3\\cdot4=12\\).'],
         answer:'\\(f(4)=12\\)',explanation:'Multiplica la pendiente por el valor de \\(x\\).'},
        {title:'Encontrar la pendiente desde dos puntos',
         problem:'Halla \\(m\\) si la recta pasa por \\((2,6)\\) y \\((5,15)\\).',
         steps:['Fórmula: \\(m=\\frac{y_2-y_1}{x_2-x_1}=\\frac{15-6}{5-2}\\).','Calcula: \\(\\frac{9}{3}=3\\).'],
         answer:'\\(m=3\\)', explanation:'Cada punto cumple \\(y=3x\\).'},
        {title:'Problema de proporcionalidad',
         problem:'Si \\(f(2)=10\\), ¿cuánto vale \\(f(7)\\)?',
         steps:['Halla \\(m=\\frac{10}{2}=5\\). Luego \\(f(x)=5x\\).','\\(f(7)=5\\cdot7=35\\).'],
         answer:'\\(f(7)=35\\)', explanation:'La razón \\(y/x=5\\) es constante.'},
      ],
      visual:{type:'func-linear',config:{showLinear:true}},
      discovery:{
        title:'Explora la pendiente',
        steps:['Mueve el slider de pendiente. ¿Qué pasa cuando \\(m>0\\)?','Prueba \\(m<0\\). ¿La recta sube o baja?','¿Qué pasa exactamente cuando \\(m=0\\)?'],
      },
      exercises:{topic:'func_lineal',generators:[]},
      advanced:{title:'Razón de cambio',content:'La pendiente de una función lineal equivale a su derivada: \\(f\'(x)=m\\) (constante). Por eso estas funciones tienen tasa de cambio constante — la base de la diferenciación.'},
    },

    /* ──────────────────────────────────────── */
    {
      id:'func-afin', subject:'funciones', unit:'func_u2',
      title:'Función Afín', icon:'📏',
      concept:{
        what:'Una función afín \\(f(x)=mx+b\\) es una recta con pendiente \\(m\\) e intercepto \\(b\\) (donde corta al eje \\(y\\)). A diferencia de la lineal pura, no necesariamente pasa por el origen.',
        why:'La función afín aparece en todo modelado lineal: costo fijo más costo variable, temperatura de una habitación con calefactor, movimiento con velocidad y posición inicial.',
        realLife:'Costo de taxi: $500 de banderazo (b) + $150/km (m). Temperatura del horno: empieza a 20°C y sube 10°C por minuto.',
        commonErrors:[
          'Intercambiar la pendiente y el intercepto: en \\(y=mx+b\\), \\(m\\) es la pendiente y \\(b\\) el intercepto en \\(y\\).',
          'Calcular el cero (raíz) olvidando despejar: \\(0=mx+b \\Rightarrow x=-b/m\\).',
          'Creer que dos rectas paralelas son la misma función.',
        ]
      },
      examples:[
        {title:'Evaluar y encontrar el cero',
         problem:'Para \\(f(x)=2x-6\\), halla \\(f(0)\\) y la raíz.',
         steps:['\\(f(0)=2(0)-6=-6\\). Intercepto en \\(y\\): \\((0,-6)\\).','Raíz: \\(2x-6=0 \\Rightarrow x=3\\).'],
         answer:'\\(f(0)=-6\\); raíz en \\(x=3\\)',explanation:'El cero está donde la recta cruza el eje \\(x\\).'},
        {title:'Ecuación desde dos puntos',
         problem:'Halla la ecuación si pasa por \\((1,5)\\) y \\((3,11)\\).',
         steps:['\\(m=\\frac{11-5}{3-1}=\\frac{6}{2}=3\\).','Con punto \\((1,5)\\): \\(5=3(1)+b \\Rightarrow b=2\\).'],
         answer:'\\(f(x)=3x+2\\)', explanation:'Primero pendiente, luego intercepto.'},
        {title:'Rectas paralelas y perpendiculares',
         problem:'¿Qué recta es paralela a \\(y=4x-1\\) y pasa por \\((0,3)\\)?',
         steps:['Paralela tiene misma pendiente: \\(m=4\\).','Pasa por \\((0,3)\\): \\(b=3\\).'],
         answer:'\\(y=4x+3\\)', explanation:'Paralelas comparten pendiente, difieren en intercepto.'},
      ],
      visual:{type:'func-linear',config:{showAffine:true}},
      discovery:{
        title:'Interceptos y pendiente',
        steps:['Cambia \\(b\\) con el slider: ¿la recta se desplaza o gira?','Cambia \\(m\\) y observa la inclinación.','¿Qué ocurre cuando \\(b=0\\)? ¿Es una función lineal?'],
      },
      exercises:{topic:'func_afin',generators:[]},
      advanced:{title:'Sistema de dos ecuaciones',content:'Dos funciones afines \\(f(x)=m_1x+b_1\\) y \\(g(x)=m_2x+b_2\\) se intersectan cuando \\(m_1x+b_1=m_2x+b_2\\), es decir en \\(x=\\frac{b_2-b_1}{m_1-m_2}\\) (si \\(m_1\\neq m_2\\)).'},
    },

    /* ──────────────────────────────────────── */
    {
      id:'func-cuadratica', subject:'funciones', unit:'func_u3',
      title:'Función Cuadrática', icon:'∩',
      concept:{
        what:'Una función cuadrática \\(f(x)=ax^2+bx+c\\) tiene como gráfica una parábola. Si \\(a>0\\) abre hacia arriba (mínimo); si \\(a<0\\) abre hacia abajo (máximo). El vértice es el punto más alto o más bajo, y el eje de simetría es \\(x=-b/(2a)\\).',
        why:'Las parábolas aparecen en física (trayectoria de proyectiles), economía (beneficio máximo) y diseño (arcos y antenas parabólicas).',
        realLife:'Lanzamiento de pelota: altura \\(h(t)=v_0t-\\frac{g}{2}t^2\\). Área de un rectángulo con perímetro fijo: \\(A(l)=l(P/2-l)\\).',
        commonErrors:[
          'Invertir el signo del vértice: \\(h=-b/(2a)\\), no \\(b/(2a)\\).',
          'Confundir "discriminante negativo" con "sin solución" en el contexto real (es correcto, pero en complejos hay 2 soluciones).',
          'No verificar que la parábola está bien orientada (signo de \\(a\\)).',
        ]
      },
      examples:[
        {title:'Encontrar el vértice',
         problem:'Halla el vértice de \\(f(x)=x^2-4x+3\\).',
         steps:['\\(h=-\\frac{-4}{2(1)}=2\\).','\\(k=f(2)=4-8+3=-1\\).'],
         answer:'Vértice: \\((2,-1)\\)', explanation:'El vértice es el mínimo (\\(a=1>0\\)).'},
        {title:'Encontrar las raíces',
         problem:'Resuelve \\(x^2-5x+6=0\\).',
         steps:['Factoriza: \\((x-2)(x-3)=0\\).','\\(x=2\\) o \\(x=3\\).'],
         answer:'\\(x=2\\) y \\(x=3\\)', explanation:'Raíces = valores donde la parábola corta al eje \\(x\\).'},
        {title:'Máximo con contexto',
         problem:'Una pelota sube con \\(h(t)=-5t^2+20t\\). ¿Cuál es la altura máxima?',
         steps:['\\(t_{\\max}=-20/(2\\cdot(-5))=2\\) s.','\\(h(2)=-5(4)+20(2)=-20+40=20\\) m.'],
         answer:'20 m en \\(t=2\\) s', explanation:'El vértice de la parábola da el instante y valor máximo.'},
      ],
      visual:{type:'func-quadratic',config:{}},
      discovery:{
        title:'Explora la parábola',
        steps:['Cambia \\(a\\): ¿cuándo abre hacia arriba o abajo?','Mueve \\(b\\): ¿cómo se desplaza el eje de simetría?','Cambia \\(c\\): ¿qué pasa con el intercepto en \\(y\\)?'],
      },
      exercises:{topic:'func_cuadratica',generators:[]},
      advanced:{title:'Forma canónica y suma/producto de raíces',content:'Si \\(x_1, x_2\\) son raíces: \\(x_1+x_2=-b/a\\) y \\(x_1\\cdot x_2=c/a\\). Esto permite construir cuadráticas a partir de sus raíces sin necesidad de la fórmula general.'},
    },

    /* ──────────────────────────────────────── */
    {
      id:'func-exponencial', subject:'funciones', unit:'func_u4',
      title:'Función Exponencial', icon:'📈',
      concept:{
        what:'Una función exponencial tiene la forma \\(f(x)=a\\cdot b^x\\) con \\(b>0, b\\neq1\\). Si \\(b>1\\), la función crece sin límite (crecimiento exponencial). Si \\(0<b<1\\), decrece hacia cero (decaimiento). El factor \\(a\\) es el valor inicial \\(f(0)=a\\).',
        why:'El crecimiento exponencial describe fenómenos naturales donde la tasa de cambio es proporcional al valor actual: poblaciones, virus, interés compuesto, radiación.',
        realLife:'COVID-19 en fase inicial (dobles cada N días), cuenta bancaria con interés compuesto, carbono-14 en arqueología (decaimiento), inflación acumulada.',
        commonErrors:[
          'Confundir \\(f(x)=x^2\\) (potencia, polinomial) con \\(f(x)=2^x\\) (exponencial): la variable en el exponente es la clave.',
          'Usar base negativa: \\((-2)^x\\) no está bien definida para \\(x\\) irracional.',
          'Olvidar que el dominio es \\(\\mathbb{R}\\) pero la imagen es siempre positiva.',
        ]
      },
      examples:[
        {title:'Evaluar y reconocer crecimiento',
         problem:'Para \\(f(x)=2^x\\), calcula \\(f(-1), f(0), f(2), f(4)\\).',
         steps:['\\(f(-1)=2^{-1}=0.5\\). \\(f(0)=1\\).','\\(f(2)=4\\). \\(f(4)=16\\).'],
         answer:'0.5 → 1 → 4 → 16', explanation:'La función se duplica con cada unidad de \\(x\\).'},
        {title:'Modelo de crecimiento',
         problem:'Una bacteria se duplica cada hora. Si hay 100 al inicio, ¿cuántas hay en 5 horas?',
         steps:['\\(f(t)=100\\cdot2^t\\).','\\(f(5)=100\\cdot2^5=100\\cdot32=3200\\).'],
         answer:'3200 bacterias', explanation:'Crecimiento exponencial con base 2 y valor inicial 100.'},
        {title:'Modelo de decaimiento',
         problem:'Una sustancia radiactiva pierde la mitad cada año. Si hay 80 g, ¿cuánto queda en 3 años?',
         steps:['\\(f(t)=80\\cdot(1/2)^t=80\\cdot0.5^t\\).','\\(f(3)=80/8=10\\) g.'],
         answer:'10 g', explanation:'Decaimiento: base \\(0.5<1\\) → la función decrece.'},
      ],
      visual:{type:'func-exponential',config:{}},
      discovery:{
        title:'Crecimiento vs. decaimiento',
        steps:['Pon la base mayor que 1. ¿La función crece o decrece?','Pon la base entre 0 y 1. ¿Qué pasa?','¿Qué ocurre exactamente en \\(x=0\\) para cualquier base?'],
      },
      exercises:{topic:'func_exponencial',generators:[]},
      advanced:{title:'La base natural e',content:'El número \\(e\\approx2.718\\) aparece de forma natural cuando el crecimiento es "continuo". La función \\(f(x)=e^x\\) es su propia derivada: \\(\\frac{d}{dx}[e^x]=e^x\\). Esta propiedad única la hace esencial en cálculo y física.'},
    },

    /* ──────────────────────────────────────── */
    {
      id:'func-logaritmica', subject:'funciones', unit:'func_u5',
      title:'Función Logarítmica', icon:'㏒',
      concept:{
        what:'El logaritmo \\(\\log_b(x)\\) es la función inversa de \\(b^x\\): pregunta "¿a qué potencia hay que elevar \\(b\\) para obtener \\(x\\)?". Dominio: \\(x>0\\). Imagen: todos los reales. Gráfica: crece lentamente, corta el eje \\(x\\) en \\((1,0)\\).',
        why:'Los logaritmos "comprimen" escalas multiplicativas en aditivas. Son la única manera de "deshacer" exponentes, por eso resuelven ecuaciones como \\(2^x=1000\\).',
        realLife:'Escala Richter (terremotos), decibelios (sonido), pH (acidez), tiempo de duplicación bacteriana, crecimiento de inversiones.',
        commonErrors:[
          '\\(\\log(a+b) \\neq \\log(a)+\\log(b)\\). La propiedad del producto dice \\(\\log(a\\cdot b)=\\log(a)+\\log(b)\\).',
          'El dominio: \\(\\log(-5)\\) no está definido (no se puede calcular el log de un número negativo o cero).',
          'Confundir \\(\\log\\) (base 10) con \\(\\ln\\) (base \\(e\\)).',
        ]
      },
      examples:[
        {title:'Evaluar un logaritmo',
         problem:'¿Cuánto vale \\(\\log_2(32)\\)?',
         steps:['Pregunta: \\(2^?=32\\).','\\(2^5=32\\), por lo tanto \\(\\log_2(32)=5\\).'],
         answer:'5', explanation:'Siempre pregunta: "¿a qué potencia?"'},
        {title:'Propiedades del logaritmo',
         problem:'Simplifica \\(\\log_3(9)+\\log_3(27)\\).',
         steps:['\\(\\log_3(9)=2\\), \\(\\log_3(27)=3\\).','Suma: \\(2+3=5\\). Verifica: \\(\\log_3(9\\cdot27)=\\log_3(243)=5\\). ✓'],
         answer:'5', explanation:'Prop. del producto: \\(\\log_b(a)+\\log_b(c)=\\log_b(ac)\\).'},
        {title:'Resolver ecuación exponencial',
         problem:'Resuelve \\(3^x=81\\).',
         steps:['Aplica \\(\\log_3\\) a ambos lados: \\(\\log_3(3^x)=\\log_3(81)\\).','\\(x=\\log_3(81)=4\\) (pues \\(3^4=81\\)).'],
         answer:'\\(x=4\\)', explanation:'El logaritmo es el "inverso" del exponente.'},
      ],
      visual:{type:'func-logarithmic',config:{}},
      discovery:{
        title:'Inversa de la exponencial',
        steps:['Compara las gráficas de \\(2^x\\) y \\(\\log_2(x)\\). ¿Son simétricas respecto a qué recta?','¿Por qué \\(\\log_b(1)=0\\) siempre?','Prueba \\(\\log_b(b)\\). ¿Qué obtienes?'],
      },
      exercises:{topic:'func_logaritmica',generators:[]},
      advanced:{title:'Logaritmo natural y cálculo',content:'La derivada de \\(\\ln(x)\\) es \\(1/x\\), y la integral de \\(1/x\\) es \\(\\ln|x|+C\\). Estos son resultados fundamentales del cálculo que conectan logaritmos con tasas de cambio inversamente proporcionales.'},
    },

    /* ──────────────────────────────────────── */
    {
      id:'func-racional', subject:'funciones', unit:'func_u6',
      title:'Función Racional', icon:'÷',
      concept:{
        what:'Una función racional es el cociente de dos polinomios: \\(f(x)=\\frac{p(x)}{q(x)}\\). Tiene asíntotas verticales donde \\(q(x)=0\\) (si \\(p(x)\\neq0\\) allí), asíntotas horizontales determinadas por los grados de \\(p\\) y \\(q\\), y el dominio excluye los ceros del denominador.',
        why:'Modelan situaciones con "límites físicos": velocidad máxima, concentración de un medicamento, curvas de oferta/demanda con saturación.',
        realLife:'Concentración de un fármaco (aumenta rápido, luego decae). Ley de Ohm: \\(I=V/R\\). Costo promedio por unidad producida: \\(\\bar{C}(q)=\\frac{C_{fijo}+C_{var}\\cdot q}{q}\\).',
        commonErrors:[
          'Declarar asíntota vertical en un punto que puede simplificarse (discontinuidad removible).',
          'Olvidar que el dominio debe excluir TODOS los ceros del denominador, incluso los que se simplifican.',
          'No comprobar si hay discontinuidades removibles antes de graficar.',
        ]
      },
      examples:[
        {title:'Dominio y asíntota vertical',
         problem:'Para \\(f(x)=\\frac{x+2}{x-3}\\), halla el dominio y la asíntota vertical.',
         steps:['Denominador cero: \\(x-3=0 \\Rightarrow x=3\\).','Dominio: \\(\\mathbb{R}\\setminus\\{3\\}\\). Asíntota: \\(x=3\\).'],
         answer:'Dominio: \\(x\\neq3\\); asíntota: \\(x=3\\)', explanation:''},
        {title:'Asíntota horizontal',
         problem:'¿Cuál es la asíntota horizontal de \\(f(x)=\\frac{3x+1}{x-2}\\)?',
         steps:['Grados iguales (ambos grado 1). Razón de coeficientes líderes: \\(\\frac{3}{1}=3\\).','Asíntota: \\(y=3\\).'],
         answer:'\\(y=3\\)', explanation:'Con grados iguales: razón de coeficientes líderes.'},
        {title:'Simplificación y discontinuidad removible',
         problem:'Simplifica \\(f(x)=\\frac{x^2-4}{x-2}\\).',
         steps:['Factoriza: \\(\\frac{(x-2)(x+2)}{x-2}=x+2\\) para \\(x\\neq2\\).','Discontinuidad removible en \\(x=2\\) (hueco en la gráfica).'],
         answer:'\\(f(x)=x+2\\) (con \\(x\\neq2\\))', explanation:'El factor común crea un hueco, no una asíntota.'},
      ],
      visual:{type:'func-rational',config:{}},
      discovery:{
        title:'Asíntotas y comportamiento',
        steps:['Acerca el slider de \\(x\\) a la asíntota vertical. ¿Qué pasa con \\(y\\)?','Mueve \\(x\\) a valores muy grandes. ¿Hacia dónde se dirige \\(f(x)\\)?','Cambia el numerador: ¿cómo afecta a los ceros de la función?'],
      },
      exercises:{topic:'func_racional',generators:[]},
      advanced:{title:'Fracciones parciales',content:'Una función racional con denominador factorizable puede descomponerse en fracciones parciales: \\(\\frac{1}{(x-1)(x+1)}=\\frac{A}{x-1}+\\frac{B}{x+1}\\). Esto es clave para integrar funciones racionales en Cálculo.'},
    },
  ];

  if(!window.MM_LESSONS) window.MM_LESSONS=[];
  LESSONS.forEach(lesson=>{
    if(lesson.exercises && lesson.exercises.topic && window.MM_TOPIC_GENERATORS){
      const gens=window.MM_TOPIC_GENERATORS[lesson.exercises.topic];
      if(gens && gens.length) lesson.exercises.generators=gens;
    }
    const idx=window.MM_LESSONS.findIndex(l=>l.id===lesson.id);
    if(idx!==-1) window.MM_LESSONS.splice(idx,1);
    window.MM_LESSONS.push(lesson);
  });
  if(!window.MM_LESSON_MAP) window.MM_LESSON_MAP={};
  LESSONS.forEach(l=>{window.MM_LESSON_MAP[l.id]=l;});
  console.log('[MM] content-funciones.js cargado:',LESSONS.length,'lecciones');
})();
