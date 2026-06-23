/* ═══════════════════════════════════════════════════════
   CONTENT-CALCULO.JS — 6 lecciones completas
   Cálculo: límites, continuidad, derivadas,
            aplicaciones der, integrales, aplicaciones int
   ═══════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const LESSONS=[
    /* ──────────────────────────────────────── */
    {
      id:'calc-limites', subject:'calculo', unit:'calc_u1',
      title:'Límites', icon:'→',
      concept:{
        what:'El límite \\(\\lim_{x\\to a}f(x)=L\\) describe el valor al que se aproxima \\(f(x)\\) cuando \\(x\\) se acerca a \\(a\\), sin importar si \\(f(a)\\) está definida. El límite no es el valor en \\(a\\), sino el comportamiento cerca de \\(a\\).',
        why:'Los límites son la base de todo el cálculo. Sin el concepto de límite no podemos definir derivadas ni integrales de forma rigurosa. También permiten estudiar comportamientos "en el infinito" y discontinuidades.',
        realLife:'Velocidad instantánea de un auto (es el límite de la velocidad promedio cuando el intervalo de tiempo tiende a cero). Concentración de un contaminante cuando la distancia a la fuente tiende a cero.',
        commonErrors:[
          '\\(\\lim_{x\\to a}f(x)=f(a)\\) NO siempre es verdad — solo cuando \\(f\\) es continua en \\(a\\).',
          'En formas indeterminadas \\(0/0\\), no se puede simplificar "cancelando" sin factorizar primero.',
          'El límite puede existir aunque la función no esté definida en \\(x=a\\).',
        ]
      },
      examples:[
        {title:'Sustitución directa',
         problem:'Calcula \\(\\lim_{x\\to3}(x^2-5x+6)\\).',
         steps:['El polinomio es continuo. Sustituye \\(x=3\\).',
                '\\(9-15+6=0\\).'],
         answer:'0', explanation:'Para polinomios, sustitución directa siempre funciona.'},
        {title:'Forma indeterminada 0/0',
         problem:'Calcula \\(\\lim_{x\\to2}\\dfrac{x^2-4}{x-2}\\).',
         steps:['Factoriza: \\(\\dfrac{(x-2)(x+2)}{x-2}=x+2\\) para \\(x\\neq2\\).',
                '\\(\\lim_{x\\to2}(x+2)=4\\).'],
         answer:'4', explanation:'Factorizar elimina la forma \\(0/0\\).'},
        {title:'Límite al infinito',
         problem:'Calcula \\(\\lim_{x\\to\\infty}\\dfrac{3x+1}{x-2}\\).',
         steps:['Divide por \\(x\\): \\(\\dfrac{3+1/x}{1-2/x}\\).','Cuando \\(x\\to\\infty\\): \\(1/x\\to0\\). Resultado: \\(3/1=3\\).'],
         answer:'3', explanation:'A mayor \\(x\\), los términos constantes se vuelven insignificantes.'},
      ],
      visual:{type:'calc-limit',config:{}},
      discovery:{
        title:'Acercándose a un punto',
        steps:[
          'Mueve el punto deslizante hacia \\(x=2\\) por la izquierda. ¿Hacia dónde tiende \\(f(x)\\)?',
          'Ahora acércate por la derecha. ¿Coincide el valor?',
          'Prueba con \\(f(x)=1/x\\) cuando \\(x\\to0\\). ¿Existe el límite?',
        ],
      },
      exercises:{topic:'calc_limites',generators:[]},
      advanced:{title:'Definición épsilon-delta',content:'Formalmente: \\(\\lim_{x\\to a}f(x)=L\\) significa que para todo \\(\\varepsilon>0\\) existe \\(\\delta>0\\) tal que si \\(0<|x-a|<\\delta\\), entonces \\(|f(x)-L|<\\varepsilon\\). Esta definición rigurosa, propuesta por Cauchy y Weierstrass, es la base del análisis real.'},
    },

    /* ──────────────────────────────────────── */
    {
      id:'calc-continuidad', subject:'calculo', unit:'calc_u2',
      title:'Continuidad', icon:'〰',
      concept:{
        what:'Una función es continua en \\(x=a\\) si: (1) \\(f(a)\\) existe, (2) \\(\\lim_{x\\to a}f(x)\\) existe, y (3) ambos son iguales. Informalmente: la gráfica puede trazarse sin levantar el lápiz.',
        why:'La continuidad garantiza comportamientos predecibles: el Teorema del Valor Intermedio (TVI) asegura que entre dos valores, la función pasa por todos los intermedios. Fundamental en análisis numérico y en garantizar que existen soluciones de ecuaciones.',
        realLife:'Una señal de audio continua vs. una digital (discreta). Temperatura de una habitación que cambia suavemente (sin saltos). Precio de un activo financiero en el mercado continuo.',
        commonErrors:[
          'Confundir "la función está definida en \\(a\\)" con "es continua en \\(a\\)" — son condiciones distintas.',
          'Asumir que todos los puntos donde el denominador es cero son asíntotas — pueden ser removibles.',
          'Creer que una función con "hueco" no tiene límite en ese punto — sí puede tenerlo.',
        ]
      },
      examples:[
        {title:'Verificar continuidad en un punto',
         problem:'¿Es \\(f(x)=x^2+1\\) continua en \\(x=2\\)?',
         steps:['\\(f(2)=5\\) (definida). \\(\\lim_{x\\to2}(x^2+1)=5\\).',
                'Ambos son 5: \\(\\lim=f(2)\\) ✓'],
         answer:'Sí, es continua', explanation:'Los polinomios son siempre continuos.'},
        {title:'Discontinuidad removible',
         problem:'¿Es continua \\(f(x)=\\dfrac{x^2-1}{x-1}\\) en \\(x=1\\)?',
         steps:['\\(f(1)\\) no está definida (denominador 0) → falla condición 1.',
                'Límite: \\(\\lim_{x\\to1}(x+1)=2\\). Discontinuidad removible: definir \\(f(1)=2\\) la hace continua.'],
         answer:'No, pero la discontinuidad es removible', explanation:'El hueco puede "rellenarse" con el valor del límite.'},
        {title:'Aplicación del TVI',
         problem:'Demuestra que \\(f(x)=x^3-x-2\\) tiene raíz en \\([1,2]\\).',
         steps:['\\(f(1)=1-1-2=-2<0\\). \\(f(2)=8-2-2=4>0\\).',
                'Por TVI, existe \\(c\\in(1,2)\\) con \\(f(c)=0\\).'],
         answer:'Sí existe raíz', explanation:'TVI garantiza paso por cero cuando f cambia de signo.'},
      ],
      visual:{type:'calc-continuity',config:{}},
      discovery:{
        title:'Tipos de discontinuidad',
        steps:[
          'Observa \\(f(x)=1/x\\) en \\(x=0\\). ¿Qué tipo de discontinuidad es?',
          'Ahora \\(f(x)=(x^2-1)/(x-1)\\) en \\(x=1\\). ¿Removible o esencial?',
          '¿Puede una función con discontinuidad tener igual límite por izquierda y derecha?',
        ],
      },
      exercises:{topic:'calc_continuidad',generators:[]},
      advanced:{title:'Continuidad uniforme',content:'Una función es uniformemente continua en un intervalo si para el mismo \\(\\varepsilon\\) puede usarse el mismo \\(\\delta\\) en cualquier punto. Todo función continua en un intervalo cerrado \\([a,b]\\) es uniformemente continua en él (Teorema de Heine-Cantor).'},
    },

    /* ──────────────────────────────────────── */
    {
      id:'calc-derivadas', subject:'calculo', unit:'calc_u3',
      title:'Derivadas', icon:"f'",
      concept:{
        what:'La derivada \\(f\'(x)\\) es la tasa de cambio instantánea de \\(f\\) en \\(x\\). Geométricamente, es la pendiente de la recta tangente a la curva en ese punto. Se calcula con \\(f\'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}\\).',
        why:'Las derivadas permiten encontrar máximos y mínimos, analizar crecimiento y decrecimiento, hallar rectas tangentes, y modelar tasas de cambio (velocidad, aceleración, crecimiento poblacional).',
        realLife:'Velocidad (derivada de posición). Aceleración (derivada de velocidad). Costo marginal (derivada del costo total). Temperatura máxima del día (donde la derivada es cero).',
        commonErrors:[
          'Derivar potencias: \\(\\frac{d}{dx}[x^n]=nx^{n-1}\\) — el exponente BAJA y se RESTA 1 al exponente.',
          'La constante desaparece: \\(\\frac{d}{dx}[c]=0\\) para cualquier constante \\(c\\).',
          'No confundir \\(f\'(a)\\) (número) con \\(f\'(x)\\) (función).',
        ]
      },
      examples:[
        {title:'Regla de la potencia',
         problem:'Deriva \\(f(x)=3x^4\\).',
         steps:['Regla de la potencia: \\(\\frac{d}{dx}[ax^n]=an\\cdot x^{n-1}\\).',
                '\\(f\'(x)=3\\cdot4\\cdot x^3=12x^3\\).'],
         answer:'\\(f\'(x)=12x^3\\)', explanation:'El coeficiente y el exponente se multiplican; el exponente baja en 1.'},
        {title:'Suma de funciones',
         problem:'Deriva \\(g(x)=5x^2-3x+7\\).',
         steps:['Deriva término a término: \\(5\\cdot2x - 3\\cdot1 + 0\\).',
                '\\(g\'(x)=10x-3\\).'],
         answer:'\\(g\'(x)=10x-3\\)', explanation:'La constante 7 se anula. La suma de derivadas.'},
        {title:'Evaluar la derivada en un punto',
         problem:'Para \\(f(x)=x^3-2x\\), halla \\(f\'(1)\\).',
         steps:['\\(f\'(x)=3x^2-2\\).','\\(f\'(1)=3(1)^2-2=3-2=1\\).'],
         answer:'\\(f\'(1)=1\\)', explanation:'La pendiente de la tangente en \\(x=1\\) es 1.'},
      ],
      visual:{type:'calc-derivative',config:{}},
      discovery:{
        title:'La tangente y la pendiente',
        steps:[
          'Mueve el punto a lo largo de la curva. ¿Cómo cambia la recta tangente?',
          'Encuentra los puntos donde la tangente es horizontal. ¿Qué significa \\(f\'(x)=0\\)?',
          'Compara la pendiente cuando la curva sube vs. cuando baja.',
        ],
      },
      exercises:{topic:'calc_derivadas',generators:[]},
      advanced:{title:'Regla del producto y la cadena',content:'Para productos: \\((fg)\'=f\'g+fg\'\\). Para composición: \\(\\frac{d}{dx}[f(g(x))]=f\'(g(x))\\cdot g\'(x)\\). Ejemplo: \\(\\frac{d}{dx}[(x^2+1)^5]=5(x^2+1)^4\\cdot2x=10x(x^2+1)^4\\).'},
    },

    /* ──────────────────────────────────────── */
    {
      id:'calc-aplicaciones-der', subject:'calculo', unit:'calc_u4',
      title:'Aplicaciones de Derivadas', icon:'📉',
      concept:{
        what:'Las derivadas permiten: (1) hallar dónde una función crece o decrece (según signo de \\(f\'\\)), (2) encontrar máximos y mínimos (donde \\(f\'=0\\)), (3) escribir rectas tangentes y (4) resolver problemas de optimización.',
        why:'Optimizar es fundamental en ingeniería, economía y ciencias. La derivada dice exactamente cuándo una función alcanza su valor máximo o mínimo, y si ese punto es mínimo o máximo usando la segunda derivada.',
        realLife:'Diseño de caja de volumen máximo con material mínimo. Precio que maximiza ganancia de una empresa. Ángulo óptimo de lanzamiento. Tasa máxima de reacción química.',
        commonErrors:[
          '\\(f\'(a)=0\\) NO implica máximo ni mínimo — puede ser un punto de inflexión.',
          'Confirmar con segunda derivada: \\(f\'\'(a)>0\\) = mínimo local, \\(f\'\'(a)<0\\) = máximo local.',
          'En optimización, siempre verificar también los extremos del intervalo (comparar candidatos).',
        ]
      },
      examples:[
        {title:'Recta tangente',
         problem:'Halla la tangente a \\(f(x)=x^2-3\\) en \\(x=2\\).',
         steps:['\\(f\'(x)=2x\\). Pendiente: \\(m=f\'(2)=4\\).',
                'Punto: \\((2, f(2))=(2,1)\\). Ecuación: \\(y-1=4(x-2)\\Rightarrow y=4x-7\\).'],
         answer:'\\(y=4x-7\\)', explanation:'Pendiente de la tangente = valor de la derivada.'},
        {title:'Máximo y mínimo',
         problem:'Halla los extremos de \\(f(x)=x^3-3x\\).',
         steps:['\\(f\'(x)=3x^2-3=0 \\Rightarrow x^2=1 \\Rightarrow x=\\pm1\\).',
                '\\(f\'\'(x)=6x\\). En \\(x=-1\\): \\(f\'\'=-6<0\\) (máximo). En \\(x=1\\): \\(f\'\'=6>0\\) (mínimo).'],
         answer:'Máximo local en \\(x=-1\\), mínimo en \\(x=1\\)', explanation:''},
        {title:'Optimización',
         problem:'Cortas el borde de una cartulina de 24 cm para maximizar el área de un cuadrado.',
         steps:['Si el cuadrado tiene lado \\(l\\), \\(4l=24 \\Rightarrow l=6\\) cm ya es fijo.',
                'Con perímetro \\(P\\) fijo, \\(A=l^2=(P/4)^2\\) se maximiza cuando el rectángulo es cuadrado.'],
         answer:'\\(l=6\\) cm', explanation:'Para perímetro fijo, el cuadrado tiene área máxima.'},
      ],
      visual:{type:'calc-derivative-apps',config:{}},
      discovery:{
        title:'Máximos, mínimos y puntos de inflexión',
        steps:[
          'Desliza el punto. ¿Dónde la tangente es horizontal?',
          'En esos puntos, ¿la función tiene un máximo o un mínimo?',
          '¿Puede haber \\(f\'=0\\) sin ser máximo ni mínimo?',
        ],
      },
      exercises:{topic:'calc_aplder',generators:[]},
      advanced:{title:'Teorema de la Media',content:'El Teorema del Valor Medio de Lagrange garantiza que si \\(f\\) es continua en \\([a,b]\\) y derivable en \\((a,b)\\), entonces existe \\(c\\) tal que \\(f\'(c)=\\frac{f(b)-f(a)}{b-a}\\). En palabras: siempre hay un punto donde la tangente es paralela a la secante.'},
    },

    /* ──────────────────────────────────────── */
    {
      id:'calc-integrales', subject:'calculo', unit:'calc_u5',
      title:'Integrales', icon:'∫',
      concept:{
        what:'La integral \\(\\int f(x)\\,dx\\) es la "anti-derivada" de \\(f\\): busca \\(F\\) tal que \\(F\'=f\\). Se escribe \\(F(x)+C\\) (constante de integración). La integral definida \\(\\int_a^b f(x)\\,dx=F(b)-F(a)\\) calcula el área bajo la curva de \\(a\\) a \\(b\\).',
        why:'Las integrales permiten calcular áreas, volúmenes, trabajo, masa, longitud de arco y muchas cantidades acumuladas. El Teorema Fundamental del Cálculo las conecta directamente con las derivadas.',
        realLife:'Distancia recorrida (integral de la velocidad). Trabajo mecánico (integral de la fuerza). Calor acumulado. Dosis de medicamento. Probabilidad acumulada (distribuciones estadísticas).',
        commonErrors:[
          'Olvidar \\(+C\\) en las integrales indefinidas — indica una familia de primitivas.',
          'Regla de la potencia: \\(\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C\\) — el exponente SUBE en 1.',
          '\\(\\int x^{-1}\\,dx=\\ln|x|+C\\) — no aplicar la regla de la potencia cuando \\(n=-1\\).',
        ]
      },
      examples:[
        {title:'Regla de la potencia',
         problem:'Calcula \\(\\int 3x^2\\,dx\\).',
         steps:['\\(\\int 3x^2\\,dx=3\\cdot\\frac{x^3}{3}+C\\).','\\(=x^3+C\\).'],
         answer:'\\(x^3+C\\)', explanation:'El exponente sube de 2 a 3; se divide por el nuevo exponente.'},
        {title:'Integral de una suma',
         problem:'Calcula \\(\\int(4x+5)\\,dx\\).',
         steps:['\\(\\int 4x\\,dx+\\int 5\\,dx=2x^2+5x+C\\).'],
         answer:'\\(2x^2+5x+C\\)', explanation:'Integra término a término.'},
        {title:'Integral definida',
         problem:'Calcula \\(\\int_1^3 x^2\\,dx\\).',
         steps:['Primitiva: \\(F(x)=\\frac{x^3}{3}\\).','\\(F(3)-F(1)=\\frac{27}{3}-\\frac{1}{3}=9-\\frac{1}{3}=\\frac{26}{3}\\).'],
         answer:'\\(\\frac{26}{3}\\approx8.67\\)', explanation:'Aplica el Teorema Fundamental: evalúa la primitiva en los extremos.'},
      ],
      visual:{type:'calc-integral',config:{}},
      discovery:{
        title:'Sumas de Riemann',
        steps:[
          'Con pocas barras (n pequeño), ¿la aproximación es buena?',
          'Aumenta n. ¿Las barras se acercan más a la curva?',
          'Con n→∞, ¿qué obtienes exactamente?',
        ],
      },
      exercises:{topic:'calc_integrales',generators:[]},
      advanced:{title:'Técnicas de integración',content:'Más allá de la regla de la potencia: sustitución \\(u=g(x)\\) (transforma la integral en más simple), integración por partes \\(\\int u\\,dv=uv-\\int v\\,du\\) (inverso del producto), fracciones parciales (racionales). Cada técnica corresponde a una regla de diferenciación invertida.'},
    },

    /* ──────────────────────────────────────── */
    {
      id:'calc-aplicaciones-int', subject:'calculo', unit:'calc_u6',
      title:'Aplicaciones de Integrales', icon:'📐',
      concept:{
        what:'La integral definida calcula: (1) el área bajo una curva, (2) el área entre dos curvas, (3) el valor promedio de una función, y (4) cantidades acumuladas como distancia, trabajo o masa. En física, si se conoce la velocidad, la integral da el desplazamiento total.',
        why:'Muchos problemas del mundo real requieren sumar infinitas cantidades infinitamente pequeñas — exactamente lo que hace la integral. Es la herramienta para "pasar de la tasa al total".',
        realLife:'Ingeniería: área de un perfil aerodinámico. Economía: excedente del consumidor. Física: energía cinética acumulada. Medicina: área bajo la curva de concentración de un fármaco (AUC).',
        commonErrors:[
          'El área siempre es positiva, pero \\(\\int_a^b f(x)\\,dx\\) puede ser negativa si \\(f<0\\) — usar \\(\\int_a^b|f(x)|\\,dx\\) para área real.',
          'Área entre dos curvas: \\(\\int_a^b[f(x)-g(x)]\\,dx\\) cuando \\(f\\geq g\\) en \\([a,b]\\).',
          'Olvidar encontrar los puntos de intersección antes de integrar entre curvas.',
        ]
      },
      examples:[
        {title:'Área bajo la curva',
         problem:'Halla el área bajo \\(f(x)=x^2\\) de \\(x=0\\) a \\(x=3\\).',
         steps:['\\(\\int_0^3 x^2\\,dx=\\left[\\frac{x^3}{3}\\right]_0^3\\).','\\(=\\frac{27}{3}-0=9\\) u².'],
         answer:'9 u²', explanation:'La integral definida da el área exacta.'},
        {title:'Área entre dos curvas',
         problem:'Halla el área entre \\(f(x)=x\\) y \\(g(x)=x^2\\) de 0 a 1.',
         steps:['\\(f(x)\\geq g(x)\\) en \\([0,1]\\) (verifica: \\(x\\geq x^2\\)).','\\(\\int_0^1(x-x^2)\\,dx=\\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1=\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}\\).'],
         answer:'\\(\\frac{1}{6}\\) u²', explanation:'Resta la curva inferior de la superior, integra en el intervalo.'},
        {title:'Distancia desde velocidad',
         problem:'Un cuerpo tiene \\(v(t)=3t^2\\) m/s. ¿Cuánto recorre en \\([0,4]\\) s?',
         steps:['\\(s=\\int_0^4 3t^2\\,dt=[t^3]_0^4=64\\) m.'],
         answer:'64 m', explanation:'La integral de la velocidad da la distancia (desplazamiento).'},
      ],
      visual:{type:'calc-integral-apps',config:{}},
      discovery:{
        title:'Área bajo la curva y entre curvas',
        steps:[
          'Calcula el área bajo \\(f(x)=x^2\\) de 0 a 2. ¿Coincide con la fórmula?',
          'Ahora calcula el área entre \\(f(x)=x^2\\) y \\(g(x)=x\\) (busca los puntos de intersección).',
          'Si \\(v(t)=t\\) es velocidad, ¿qué área representa la distancia recorrida de \\(t=0\\) a \\(t=3\\)?',
        ],
      },
      exercises:{topic:'calc_aplint',generators:[]},
      advanced:{title:'Volúmenes de revolución',content:'Rotando una región alrededor del eje \\(x\\), el volumen es \\(V=\\pi\\int_a^b[f(x)]^2\\,dx\\) (método del disco). Variante con agujero: \\(V=\\pi\\int_a^b\\left([f(x)]^2-[g(x)]^2\\right)\\,dx\\). Esto genera sólidos de revolución: esferas, conos, toros y formas más complejas.'},
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
  console.log('[MM] content-calculo.js cargado:',LESSONS.length,'lecciones');
})();
