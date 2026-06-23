/* ═══════════════════════════════════════════════════════════════
   DATA.JS — Courses, Lessons, Questions
   ═══════════════════════════════════════════════════════════════ */

// ── COURSES ──────────────────────────────────────────────────
window.MM_COURSES = [
  {
    id: 'aritmetica', name: 'Aritmética', icon: '🔢', color: '#F59E0B',
    gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)',
    description: 'Domina los números, operaciones y las bases del razonamiento numérico.',
    levels: [1, 2, 3],
    topics: ['Números', 'Operaciones', 'Fracciones', 'Decimales', 'Potencias y Raíces', 'Porcentajes', 'Proporciones']
  },
  {
    id: 'algebra', name: 'Álgebra', icon: '📐', color: '#8B5CF6',
    gradient: 'linear-gradient(135deg,#8B5CF6,#4F46E5)',
    description: 'Trabaja con variables, ecuaciones y expresa relaciones matemáticas.',
    levels: [2, 3, 4],
    topics: ['Expresiones', 'Ecuaciones', 'Sistemas', 'Inecuaciones', 'Polinomios', 'Factorización']
  },
  {
    id: 'geometria', name: 'Geometría', icon: '📏', color: '#10B981',
    gradient: 'linear-gradient(135deg,#10B981,#06B6D4)',
    description: 'Estudia formas, ángulos, áreas y volúmenes del mundo real.',
    levels: [1, 2, 3],
    topics: ['Ángulos', 'Triángulos', 'Cuadriláteros', 'Círculo', 'Áreas', 'Volúmenes']
  },
  {
    id: 'trigonometria', name: 'Trigonometría', icon: '📡', color: '#EF4444',
    gradient: 'linear-gradient(135deg,#EF4444,#F97316)',
    description: 'Razones trigonométricas, identidades y aplicaciones.',
    levels: [3, 4],
    topics: ['Razones trig.', 'Identidades', 'Aplicaciones']
  },
  {
    id: 'funciones', name: 'Funciones', icon: '📈', color: '#06B6D4',
    gradient: 'linear-gradient(135deg,#06B6D4,#8B5CF6)',
    description: 'Comprende relaciones entre variables y sus representaciones gráficas.',
    levels: [2, 3, 4],
    topics: ['Lineales', 'Cuadráticas', 'Exponenciales', 'Logarítmicas']
  },
  {
    id: 'calculo', name: 'Cálculo', icon: '∫', color: '#4F46E5',
    gradient: 'linear-gradient(135deg,#4F46E5,#06B6D4)',
    description: 'Límites, derivadas e integrales: las herramientas del cambio.',
    levels: [4],
    topics: ['Límites', 'Derivadas', 'Integrales']
  },
  {
    id: 'estadistica', name: 'Estadística', icon: '📊', color: '#EC4899',
    gradient: 'linear-gradient(135deg,#EC4899,#8B5CF6)',
    description: 'Analiza datos, calcula probabilidades y toma decisiones informadas.',
    levels: [1, 2, 3, 4],
    topics: ['Datos', 'Medidas', 'Probabilidad', 'Distribuciones']
  },
  {
    id: 'financiera', name: 'Matemática Financiera', icon: '💰', color: '#16A34A',
    gradient: 'linear-gradient(135deg,#16A34A,#065F46)',
    description: 'Interés, anualidades, créditos, inflación y evaluación de proyectos de inversión.',
    levels: [3, 4],
    topics: ['Interés Simple', 'Interés Compuesto', 'Anualidades', 'Amortización', 'CAE', 'VAN/TIR']
  },
  {
    id: 'paes', name: 'Preuniversitario PAES', icon: '🎓', color: '#7C3AED',
    gradient: 'linear-gradient(135deg,#7C3AED,#4F46E5)',
    description: 'Preparación integral para la PAES con preguntas tipo real y estrategias de examen.',
    levels: [3, 4],
    topics: ['Números', 'Álgebra', 'Funciones', 'Geometría', 'Probabilidad y Estadística', 'Simulacros']
  }
];

// ── LESSONS ──────────────────────────────────────────────────
window.MM_LESSONS = [

  /* ══════════════════════════════════════
     ARITMÉTICA — Fracciones
  ══════════════════════════════════════ */
  {
    id: 'fracciones-intro',
    courseId: 'aritmetica',
    topic: 'Fracciones',
    title: '¿Qué es una Fracción?',
    level: 1, grades: '3° – 5° Básico',
    duration: 15, xpReward: 100,
    icon: '🍕', color: '#F59E0B',

    concept: {
      what: 'Una fracción representa una o más partes de un todo que ha sido dividido en partes iguales. Se escribe como \\(\\frac{a}{b}\\), donde <strong>a</strong> (numerador) indica cuántas partes tomamos y <strong>b</strong> (denominador) indica en cuántas partes iguales está dividido el todo.',
      why: 'Las fracciones nos permiten expresar cantidades que están entre dos números enteros, o repartir cosas de manera precisa.',
      realLife: [
        { icon: '🍕', text: 'Repartir una pizza entre amigos' },
        { icon: '💧', text: 'Llenar una botella hasta la mitad: ½' },
        { icon: '⏰', text: 'Cuarto de hora = ¼ de una hora = 15 minutos' },
        { icon: '🏪', text: 'Descuentos: 1/3 de descuento' }
      ],
      commonErrors: [
        'Pensar que ½ > ¾ porque 2 > 4. El denominador mayor significa partes más pequeñas.',
        'Sumar denominadores: ½ + ½ ≠ 2⁄4. La respuesta correcta es 1.',
        'Creer que una fracción siempre es menor que 1. Las fracciones impropias (3/2) son mayores que 1.'
      ]
    },

    visual: { type: 'fraction-pizza' },

    discovery: [
      {
        title: 'Paso 1: Divide el todo',
        text: 'Imagina que tienes una pizza entera. Si la divides en 4 partes iguales, cada parte es una fracción del total.',
        question: '¿Cómo se llama el número que indica en cuántas partes dividimos la pizza?'
      },
      {
        title: 'Paso 2: Toma partes',
        text: 'Si tu amigo come 1 de esas 4 partes, come "una cuarta parte". Si tú comes 3 de esas 4 partes, comes "tres cuartas partes".',
        question: '¿Cómo se llama el número que indica cuántas partes tomamos?'
      },
      {
        title: 'Paso 3: Escribe la fracción',
        text: 'La fracción tiene dos números: el de arriba (numerador) dice cuántas partes tomamos, y el de abajo (denominador) dice en cuántas partes está dividido el todo.',
        question: '¿Cómo escribirías "tres de cuatro partes" como fracción?'
      }
    ],

    examples: [
      {
        title: 'Identificar una fracción',
        problem: 'Una pizza se cortó en 8 partes iguales. Juan comió 3 porciones. ¿Qué fracción de la pizza comió Juan?',
        steps: [
          { action: 'Identificar el denominador', why: 'El denominador es el total de partes iguales en que se dividió la pizza.', formula: '\\text{Denominador} = 8', result: '' },
          { action: 'Identificar el numerador', why: 'El numerador es cuántas partes tomó Juan.', formula: '\\text{Numerador} = 3', result: '' },
          { action: 'Escribir la fracción', why: 'El numerador va arriba y el denominador abajo.', formula: '\\frac{3}{8}', result: 'Juan comió \\(\\frac{3}{8}\\) de la pizza.' }
        ]
      },
      {
        title: 'Fracciones equivalentes',
        problem: '¿Son iguales ½ y 2/4?',
        steps: [
          { action: 'Visualizar ½', why: 'Divide un rectángulo en 2 partes iguales y toma 1.', formula: '\\frac{1}{2}', result: '' },
          { action: 'Visualizar 2/4', why: 'Divide el mismo rectángulo en 4 partes iguales y toma 2.', formula: '\\frac{2}{4}', result: '' },
          { action: 'Comparar', why: 'Ambas fracciones cubren exactamente la misma área.', formula: '\\frac{1}{2} = \\frac{2}{4} = 0.5', result: 'Sí, son fracciones equivalentes.' }
        ]
      }
    ],

    exploration: null,

    summary: 'Una fracción \\(\\frac{a}{b}\\) representa <em>a partes de un todo dividido en b partes iguales</em>. El denominador (abajo) nunca puede ser 0. Las fracciones equivalentes tienen el mismo valor aunque parezcan distintas.',
    keyPoints: ['Numerador = partes tomadas', 'Denominador = total de partes iguales', 'Fracciones equivalentes representan la misma cantidad']
  },

  /* ══════════════════════════════════════
     ARITMÉTICA — Suma de Fracciones
  ══════════════════════════════════════ */
  {
    id: 'fracciones-suma',
    courseId: 'aritmetica',
    topic: 'Fracciones',
    title: 'Suma y Resta de Fracciones',
    level: 1, grades: '4° – 6° Básico',
    duration: 20, xpReward: 120,
    icon: '➕', color: '#F59E0B',

    concept: {
      what: 'Para sumar fracciones debemos asegurarnos de que tengan el <strong>mismo denominador</strong> (denominador común). Si ya lo tienen, sumamos solo los numeradores. Si no, buscamos el mínimo común múltiplo.',
      why: 'No podemos sumar partes de tamaños distintos directamente, igual que no podemos sumar manzanas con naranjas sin convertirlas a la misma unidad.',
      realLife: [
        { icon: '🍕', text: 'Comiste ¼ de pizza por la mañana y ⅓ al mediodía. ¿Cuánto comiste en total?' },
        { icon: '📏', text: 'Una tabla mide ½ metro y otra ¾ metro. ¿Cuánto miden juntas?' }
      ],
      commonErrors: [
        '¼ + ¼ = 2/8. ERROR: cuando el denominador es igual, solo se suman los numeradores: ¼ + ¼ = 2/4 = ½',
        'Sumar directamente denominadores distintos: ½ + ⅓ ≠ 2/5'
      ]
    },

    visual: { type: 'fraction-sum' },

    discovery: [
      {
        title: 'Mismo denominador',
        text: 'Si tienes ¼ de pizza y te dan otro ¼, ¿cuánto tienes? Cada trozo es del mismo tamaño, así que puedes contar: 1 trozo + 1 trozo = 2 trozos de los 4. Es decir, 2/4.',
        question: '¿Por qué no cambia el denominador cuando las fracciones tienen el mismo denominador?'
      },
      {
        title: 'Distinto denominador',
        text: 'Ahora tienes ½ pizza y ⅓ pizza. Una está cortada en 2 partes, la otra en 3. ¿Puedes sumarlas directamente? No, porque las partes son de distinto tamaño. Necesitas cortarlas en partes iguales.',
        question: '¿Cuál es el número más pequeño que es múltiplo tanto de 2 como de 3?'
      }
    ],

    examples: [
      {
        title: 'Mismo denominador',
        problem: '\\(\\frac{2}{7} + \\frac{3}{7} = ?\\)',
        steps: [
          { action: 'Verificar denominadores', why: 'Ambas fracciones tienen denominador 7: son del mismo tamaño de parte.', formula: '\\text{denom}_1 = 7,\\quad \\text{denom}_2 = 7', result: '' },
          { action: 'Sumar numeradores', why: 'Cuando el denominador es igual, solo sumamos cuántas partes tenemos.', formula: '\\frac{2+3}{7} = \\frac{5}{7}', result: '' },
          { action: 'Simplificar si es posible', why: '5 y 7 no tienen factores comunes, ya está simplificada.', formula: '\\frac{5}{7}', result: 'Resultado: \\(\\frac{5}{7}\\)' }
        ]
      },
      {
        title: 'Distinto denominador',
        problem: '\\(\\frac{1}{2} + \\frac{1}{3} = ?\\)',
        steps: [
          { action: 'Encontrar el MCM', why: 'Necesitamos que ambas fracciones tengan el mismo denominador. El mínimo común múltiplo de 2 y 3 es 6.', formula: '\\text{MCM}(2,3) = 6', result: '' },
          { action: 'Convertir ½', why: 'Multiplicamos numerador y denominador por 3 para obtener denominador 6.', formula: '\\frac{1}{2} = \\frac{1 \\times 3}{2 \\times 3} = \\frac{3}{6}', result: '' },
          { action: 'Convertir ⅓', why: 'Multiplicamos numerador y denominador por 2 para obtener denominador 6.', formula: '\\frac{1}{3} = \\frac{1 \\times 2}{3 \\times 2} = \\frac{2}{6}', result: '' },
          { action: 'Sumar', why: 'Ahora sí podemos sumar porque el denominador es igual.', formula: '\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}', result: 'Resultado: \\(\\frac{5}{6}\\)' }
        ]
      }
    ],

    exploration: null,
    summary: 'Para sumar fracciones: si tienen igual denominador, suma solo los numeradores. Si tienen distinto denominador, busca el MCM y convierte ambas fracciones antes de sumar.',
    keyPoints: ['Mismo denom: suma numeradores', 'Distinto denom: busca el MCM', 'Simplifica siempre el resultado']
  },

  /* ══════════════════════════════════════
     ÁLGEBRA — Ecuaciones Lineales
  ══════════════════════════════════════ */
  {
    id: 'ecuaciones-lineales',
    courseId: 'algebra',
    topic: 'Ecuaciones',
    title: 'Ecuaciones de Primer Grado',
    level: 2, grades: '7° Básico – 1° Medio',
    duration: 25, xpReward: 150,
    icon: '⚖️', color: '#8B5CF6',

    concept: {
      what: 'Una ecuación de primer grado es una igualdad que contiene una variable (generalmente \\(x\\)) elevada a la potencia 1. Tiene la forma \\(ax + b = c\\). Resolver la ecuación significa encontrar el valor de \\(x\\) que hace verdadera la igualdad.',
      why: 'Las ecuaciones son la herramienta para encontrar valores desconocidos a partir de condiciones conocidas.',
      realLife: [
        { icon: '🛒', text: 'Si un producto cuesta $x y compraste 3 unidades pagando $150, entonces 3x = 150, así x = $50.' },
        { icon: '🚗', text: 'Si un auto recorre 60 km/h durante t horas y recorrió 240 km, entonces 60t = 240.' },
        { icon: '⚖️', text: 'Una balanza en equilibrio: lo que sumas a un lado, debes sumarlo al otro.' }
      ],
      commonErrors: [
        'Al pasar un término al otro lado, olvidar cambiar el signo: 2x + 5 = 15 → 2x = 15 + 5. ERROR: 2x = 15 − 5 = 10',
        'Dividir solo el primer término: 2x = 10 → x = 2 + 10. ERROR: x = 10/2 = 5'
      ]
    },

    visual: { type: 'equation-balance' },

    discovery: [
      {
        title: 'La ecuación como una balanza',
        text: 'Imagina una balanza perfectamente equilibrada. Si tienes x + 3 = 8, la balanza está equilibrada. Para encontrar x, debes "despejar" la variable sin desequilibrar la balanza.',
        question: '¿Qué debes hacer en ambos lados para eliminar el "+3" del lado izquierdo?'
      },
      {
        title: 'El principio de equivalencia',
        text: 'Si realizas la misma operación en ambos lados de la ecuación, la igualdad se mantiene. Esto es como agregar el mismo peso a los dos platos de una balanza.',
        question: 'Si restas 3 a ambos lados de x + 3 = 8, ¿qué obtienes?'
      },
      {
        title: 'Despejar la variable',
        text: 'El objetivo es dejar la variable sola en un lado. Usamos operaciones inversas: la inversa de sumar es restar, la inversa de multiplicar es dividir.',
        question: 'Si tienes 2x = 10, ¿qué operación debes aplicar en ambos lados para dejar x sola?'
      }
    ],

    examples: [
      {
        title: 'Ecuación simple',
        problem: 'Resolver: \\(2x + 5 = 15\\)',
        steps: [
          { action: 'Identificar la ecuación', why: 'Tenemos una ecuación con variable x. Queremos encontrar su valor.', formula: '2x + 5 = 15', result: '' },
          { action: 'Restar 5 en ambos lados', why: 'Para eliminar el +5 del lado izquierdo usamos la operación inversa: restamos 5 en ambos lados.', formula: '2x + 5 - 5 = 15 - 5', result: '' },
          { action: 'Simplificar', why: '+5 y −5 se cancelan a la izquierda, y 15−5=10 a la derecha.', formula: '2x = 10', result: '' },
          { action: 'Dividir por 2 en ambos lados', why: 'Para eliminar el coeficiente 2, dividimos ambos lados por 2.', formula: '\\frac{2x}{2} = \\frac{10}{2}', result: '' },
          { action: 'Resultado', why: 'x queda sola con su valor.', formula: 'x = 5', result: 'La solución es \\(x = 5\\)' }
        ]
      },
      {
        title: 'Con variables en ambos lados',
        problem: 'Resolver: \\(3x - 4 = x + 8\\)',
        steps: [
          { action: 'Estado inicial', why: 'Hay variables en ambos lados. Debemos reunirlas en un solo lado.', formula: '3x - 4 = x + 8', result: '' },
          { action: 'Restar x en ambos lados', why: 'Para llevar todas las x al lado izquierdo.', formula: '3x - x - 4 = x - x + 8', result: '' },
          { action: 'Simplificar', why: '3x − x = 2x; x − x = 0.', formula: '2x - 4 = 8', result: '' },
          { action: 'Sumar 4 en ambos lados', why: 'Para eliminar el −4 del lado izquierdo.', formula: '2x = 12', result: '' },
          { action: 'Dividir por 2', why: 'Para despejar x.', formula: 'x = 6', result: 'La solución es \\(x = 6\\)' }
        ]
      }
    ],

    exploration: null,
    summary: 'Para resolver una ecuación de primer grado: aplica las operaciones inversas en ambos lados para despejar la variable. El principio clave: lo que haces a un lado, lo haces al otro.',
    keyPoints: ['Principio de equivalencia: misma op. en ambos lados', 'Operaciones inversas para despejar', 'Verificar: sustituir x en la ecuación original']
  },

  /* ══════════════════════════════════════
     FUNCIONES — Función Cuadrática
  ══════════════════════════════════════ */
  {
    id: 'funcion-cuadratica',
    courseId: 'funciones',
    topic: 'Cuadráticas',
    title: 'La Función Cuadrática',
    level: 3, grades: '2° – 3° Medio',
    duration: 30, xpReward: 180,
    icon: '🌊', color: '#06B6D4',

    concept: {
      what: 'Una función cuadrática tiene la forma \\(f(x) = ax^2 + bx + c\\) con \\(a \\neq 0\\). Su gráfica es una <strong>parábola</strong>, una curva simétrica en forma de U (o ∩).',
      why: 'Las funciones cuadráticas describen movimientos parabólicos, áreas, y muchos fenómenos naturales y de ingeniería.',
      realLife: [
        { icon: '⚽', text: 'La trayectoria de un balón pateado sigue una parábola.' },
        { icon: '🌉', text: 'Los cables de los puentes colgantes forman una parábola.' },
        { icon: '📡', text: 'Las antenas parabólicas concentran señales en el foco.' },
        { icon: '💡', text: 'Los reflectores usan la propiedad reflexiva de la parábola.' }
      ],
      commonErrors: [
        'Confundir el vértice: no siempre está en el origen.',
        'Si a < 0 la parábola abre hacia abajo (forma ∩), no hacia arriba.',
        'El eje de simetría es x = −b/2a, no x = b/2a.'
      ]
    },

    visual: { type: 'parabola-interactive' },

    discovery: [
      {
        title: 'El papel del coeficiente "a"',
        text: 'Compara f(x) = x², f(x) = 2x² y f(x) = ½x². Prueba distintos valores de "a" en el explorador.',
        question: '¿Qué le pasa a la parábola cuando "a" es mayor? ¿Cuándo es negativo?'
      },
      {
        title: 'El vértice',
        text: 'El vértice es el punto más bajo (o más alto) de la parábola. Para f(x) = x², el vértice está en (0,0). Para f(x) = (x−2)², el vértice se movió a (2,0).',
        question: '¿En qué posición está el vértice de f(x) = x² + 3?'
      }
    ],

    examples: [
      {
        title: 'Encontrar el vértice',
        problem: 'Dada \\(f(x) = 2x^2 - 8x + 6\\), encuentra el vértice.',
        steps: [
          { action: 'Identificar a, b, c', why: 'Comparando con ax² + bx + c.', formula: 'a = 2,\\quad b = -8,\\quad c = 6', result: '' },
          { action: 'Calcular x del vértice', why: 'La fórmula del eje de simetría es x = −b/(2a).', formula: 'x_v = \\frac{-(-8)}{2 \\cdot 2} = \\frac{8}{4} = 2', result: '' },
          { action: 'Calcular y del vértice', why: 'Sustituimos xᵥ en la función.', formula: 'f(2) = 2(4) - 8(2) + 6 = 8 - 16 + 6 = -2', result: '' },
          { action: 'Vértice encontrado', why: 'El vértice es el punto (xᵥ, yᵥ).', formula: 'V = (2,\\; -2)', result: 'El vértice es (2, −2). Como a > 0, la parábola abre hacia arriba y este es el mínimo.' }
        ]
      }
    ],

    exploration: {
      type: 'quadratic',
      sliders: [
        { id: 'a', label: 'a', min: -3, max: 3, step: 0.5, default: 1 },
        { id: 'b', label: 'b', min: -5, max: 5, step: 1,   default: 0 },
        { id: 'c', label: 'c', min: -5, max: 5, step: 1,   default: 0 }
      ],
      fn: (a,b,c) => `${a}*x*x + ${b}*x + (${c})`
    },

    summary: 'La función cuadrática \\(f(x) = ax^2 + bx + c\\): si \\(a > 0\\) la parábola abre ↑; si \\(a < 0\\) abre ↓. El vértice está en \\(x = -b/(2a)\\). El eje de simetría es vertical y pasa por el vértice.',
    keyPoints: ['a determina apertura y orientación', 'Vértice: x = −b/2a', 'Si a > 0: mínimo; si a < 0: máximo']
  },

  /* ══════════════════════════════════════
     GEOMETRÍA — Área de Triángulo
  ══════════════════════════════════════ */
  {
    id: 'area-triangulo',
    courseId: 'geometria',
    topic: 'Triángulos',
    title: 'Área del Triángulo',
    level: 2, grades: '5° Básico – 1° Medio',
    duration: 20, xpReward: 130,
    icon: '📐', color: '#10B981',

    concept: {
      what: 'El área de un triángulo es la cantidad de superficie plana que encierra. La fórmula es \\(A = \\frac{b \\cdot h}{2}\\), donde <strong>b</strong> es la base y <strong>h</strong> es la altura perpendicular a esa base.',
      why: 'La fórmula del triángulo surge de que un triángulo siempre es exactamente la mitad de un paralelogramo de igual base y altura.',
      realLife: [
        { icon: '🏠', text: 'Calcular la pintura necesaria para un techo triangular.' },
        { icon: '🌲', text: 'Estimar el área de un terreno triangular.' },
        { icon: '⛵', text: 'Diseñar una vela triangular para un barco.' }
      ],
      commonErrors: [
        'Usar un lado oblicuo como altura. La altura DEBE ser perpendicular a la base.',
        'Olvidar dividir por 2: el área del triángulo es MITAD del rectángulo base×altura.'
      ]
    },

    visual: { type: 'triangle-area' },

    discovery: [
      {
        title: 'Triángulo como mitad de un rectángulo',
        text: 'Dibuja un triángulo. Ahora complétalo hasta formar un rectángulo. ¿Cuántas copias del triángulo caben en ese rectángulo?',
        question: '¿Qué relación tiene el área del triángulo con el área del rectángulo?'
      },
      {
        title: 'La altura perpendicular',
        text: 'La altura no es necesariamente un lado del triángulo. Es la distancia perpendicular desde un vértice hasta la base (o su prolongación). En un triángulo rectángulo, la altura puede coincidir con uno de sus catetos.',
        question: '¿Por qué usamos la altura perpendicular y no un lado oblicuo?'
      }
    ],

    examples: [
      {
        title: 'Triángulo con base y altura conocidas',
        problem: 'Un triángulo tiene base \\(b = 8\\) cm y altura \\(h = 5\\) cm. ¿Cuál es su área?',
        steps: [
          { action: 'Escribir la fórmula', why: 'El área del triángulo siempre es base por altura dividido dos.', formula: 'A = \\frac{b \\cdot h}{2}', result: '' },
          { action: 'Sustituir valores', why: 'Reemplazamos b = 8 y h = 5.', formula: 'A = \\frac{8 \\cdot 5}{2}', result: '' },
          { action: 'Calcular', why: '8 × 5 = 40, y 40/2 = 20.', formula: 'A = \\frac{40}{2} = 20 \\text{ cm}^2', result: 'El área es 20 cm².' }
        ]
      }
    ],

    exploration: {
      type: 'triangle',
      sliders: [
        { id: 'base', label: 'Base (b)', min: 1, max: 10, step: 0.5, default: 6 },
        { id: 'height', label: 'Altura (h)', min: 1, max: 10, step: 0.5, default: 4 }
      ]
    },

    summary: '\\(A_{\\triangle} = \\frac{b \\times h}{2}\\). La base puede ser cualquier lado. La altura es siempre <strong>perpendicular</strong> a la base elegida. El triángulo es siempre la mitad de un paralelogramo de igual base y altura.',
    keyPoints: ['A = (b × h) / 2', 'Altura = perpendicular a la base', 'Unidades: siempre al cuadrado (cm², m²)']
  },

  /* ══════════════════════════════════════
     ESTADÍSTICA — Probabilidad
  ══════════════════════════════════════ */
  {
    id: 'probabilidad-intro',
    courseId: 'estadistica',
    topic: 'Probabilidad',
    title: 'Introducción a la Probabilidad',
    level: 2, grades: '7° – 8° Básico',
    duration: 20, xpReward: 130,
    icon: '🎲', color: '#EC4899',

    concept: {
      what: 'La probabilidad mide qué tan posible es que ocurra un evento. Se expresa como un número entre 0 y 1: \\(P(A) = \\frac{\\text{casos favorables}}{\\text{casos posibles}}\\). Probabilidad 0 = imposible; probabilidad 1 = seguro.',
      why: 'La probabilidad nos ayuda a tomar decisiones racionales ante la incertidumbre: en seguros, medicina, juegos, meteorología y finanzas.',
      realLife: [
        { icon: '🎲', text: 'Probabilidad de sacar un 6 en un dado: 1/6 ≈ 16.7%.' },
        { icon: '🌦️', text: 'El pronóstico del tiempo indica 70% de lluvia: P = 0.7.' },
        { icon: '🃏', text: 'Sacar un As de una baraja de 52 cartas: P = 4/52 = 1/13.' }
      ],
      commonErrors: [
        'Confundir probabilidad con porcentaje: P = 0.25 equivale a 25%, no a 25.',
        'Creer que si algo no ha pasado, tiene más probabilidad de ocurrir (falacia del jugador).',
        'Olvidar que los casos posibles deben ser equiprobables.'
      ]
    },

    visual: { type: 'probability-dice' },

    discovery: [
      {
        title: 'Experimento: lanzar una moneda',
        text: 'Lanzas una moneda al aire. Hay dos resultados posibles: cara o sello. Ambos son igualmente probables.',
        question: '¿Qué fracción del total de posibilidades representa "cara"?'
      },
      {
        title: 'Escala de probabilidad',
        text: 'P = 0 significa que algo es imposible (sacar un 7 de un dado de 6 caras). P = 1 significa que algo es seguro (sacar un número < 7 de ese dado). Todo lo demás está entre 0 y 1.',
        question: '¿Qué probabilidad tiene sacar un número par en un dado de 6 caras?'
      }
    ],

    examples: [
      {
        title: 'Probabilidad con un dado',
        problem: 'Se lanza un dado de 6 caras. ¿Cuál es la probabilidad de sacar un número mayor que 4?',
        steps: [
          { action: 'Identificar el espacio muestral', why: 'El espacio muestral contiene todos los resultados posibles.', formula: '\\Omega = \\{1, 2, 3, 4, 5, 6\\}', result: '' },
          { action: 'Identificar los casos favorables', why: 'Los números mayores que 4 son el 5 y el 6.', formula: 'A = \\{5, 6\\}', result: '' },
          { action: 'Calcular la probabilidad', why: 'Dividimos los casos favorables entre el total de casos posibles.', formula: 'P(A) = \\frac{2}{6} = \\frac{1}{3} \\approx 0.33', result: 'La probabilidad es ⅓ ≈ 33.3%.' }
        ]
      }
    ],

    exploration: null,
    summary: '\\(P(A) = \\dfrac{\\text{casos favorables}}{\\text{casos posibles}}\\). Siempre \\(0 \\leq P(A) \\leq 1\\). La suma de probabilidades de todos los resultados posibles siempre es 1.',
    keyPoints: ['0 ≤ P(A) ≤ 1', 'Casos favorables / casos totales', 'P(seguro) = 1, P(imposible) = 0']
  },

  /* ══════════════════════════════════════
     CÁLCULO — Derivadas
  ══════════════════════════════════════ */
  {
    id: 'derivadas-intro',
    courseId: 'calculo',
    topic: 'Derivadas',
    title: '¿Qué es una Derivada?',
    level: 4, grades: '4° Medio – Universidad',
    duration: 35, xpReward: 200,
    icon: '📉', color: '#4F46E5',

    concept: {
      what: 'La derivada de una función \\(f(x)\\) en un punto mide la <strong>tasa instantánea de cambio</strong> de la función en ese punto, es decir, la pendiente de la recta tangente a la curva. Formalmente: \\(f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}\\)',
      why: 'La derivada es la herramienta fundamental para analizar cómo cambian las cosas: velocidad (derivada de posición), aceleración (derivada de velocidad), y para optimizar.',
      realLife: [
        { icon: '🚀', text: 'La velocidad de un cohete es la derivada de su posición respecto al tiempo.' },
        { icon: '💹', text: 'La tasa de cambio de precio de una acción es su derivada.' },
        { icon: '💊', text: 'La velocidad a la que se absorbe un medicamento en sangre.' }
      ],
      commonErrors: [
        'Confundir derivada con la función original: la derivada de x² es 2x, no x².',
        'Olvidar la regla de la cadena: (f∘g)\' = f\'(g(x))·g\'(x)',
        'La derivada de una constante es 0, no la constante misma.'
      ]
    },

    visual: { type: 'derivative-tangent' },

    discovery: [
      {
        title: 'Velocidad media vs. instantánea',
        text: 'Si un auto recorre 100 km en 2 horas, su velocidad media es 50 km/h. Pero en cada instante puede ir más rápido o más lento. La derivada captura esa velocidad en cada instante.',
        question: '¿Cómo calcularías la velocidad en un instante exacto, si solo tienes posición y tiempo?'
      },
      {
        title: 'La secante se convierte en tangente',
        text: 'La pendiente entre dos puntos cercanos de una curva se acerca a la pendiente de la tangente cuando los puntos se juntan. La derivada es ese límite.',
        question: '¿Qué pasa con la recta secante cuando los dos puntos se acercan infinitamente?'
      }
    ],

    examples: [
      {
        title: 'Regla de la potencia',
        problem: 'Calcular \\(f\'(x)\\) si \\(f(x) = x^3\\)',
        steps: [
          { action: 'Identificar la forma', why: 'Tenemos una potencia de x. Aplicamos la regla: si f(x) = xⁿ entonces f\'(x) = n·xⁿ⁻¹.', formula: 'f(x) = x^3 \\implies n = 3', result: '' },
          { action: 'Aplicar la regla', why: 'Bajamos el exponente como coeficiente y reducimos el exponente en 1.', formula: 'f\'(x) = 3 \\cdot x^{3-1}', result: '' },
          { action: 'Simplificar', why: '3−1 = 2.', formula: 'f\'(x) = 3x^2', result: 'La derivada de x³ es 3x².' }
        ]
      },
      {
        title: 'Función polinómica',
        problem: 'Calcular \\(f\'(x)\\) si \\(f(x) = 4x^3 - 2x^2 + 5x - 7\\)',
        steps: [
          { action: 'Derivar término a término', why: 'La derivada de una suma es la suma de las derivadas.', formula: 'f\'(x) = \\frac{d}{dx}(4x^3) - \\frac{d}{dx}(2x^2) + \\frac{d}{dx}(5x) - \\frac{d}{dx}(7)', result: '' },
          { action: 'Aplicar regla de potencia a cada término', why: 'Término 1: 4·3x² = 12x². Término 2: 2·2x = 4x. Término 3: 5. Término 4: constante → 0.', formula: 'f\'(x) = 12x^2 - 4x + 5 - 0', result: '' },
          { action: 'Resultado final', why: 'Unificamos.', formula: 'f\'(x) = 12x^2 - 4x + 5', result: 'La derivada es \\(12x^2 - 4x + 5\\).' }
        ]
      }
    ],

    exploration: {
      type: 'derivative',
      sliders: [
        { id: 'a', label: 'a (coef. x²)', min: -3, max: 3, step: 0.5, default: 1 },
        { id: 'b', label: 'b (coef. x)', min: -4, max: 4, step: 1, default: 0 },
        { id: 'c', label: 'c (constante)', min: -4, max: 4, step: 1, default: 0 }
      ],
      fn: (a,b,c) => `${a}*x*x + ${b}*x + (${c})`
    },

    summary: 'La derivada \\(f\'(x)\\) es la pendiente de la tangente y mide el cambio instantáneo. Reglas clave: potencia \\(\\frac{d}{dx}x^n = nx^{n-1}\\), constante \\(\\frac{d}{dx}c = 0\\), suma \\((f+g)\' = f\'+g\'\\).',
    keyPoints: ['Derivada = pendiente de la tangente', 'Regla de la potencia: d/dx(xⁿ) = nxⁿ⁻¹', 'Derivada de constante = 0']
  },

  /* ══════════════════════════════════════
     ARITMÉTICA — Porcentajes
  ══════════════════════════════════════ */
  {
    id: 'porcentajes',
    courseId: 'aritmetica',
    topic: 'Porcentajes',
    title: 'Porcentajes',
    level: 2, grades: '6° Básico – 1° Medio',
    duration: 20, xpReward: 120,
    icon: '%', color: '#F59E0B',

    concept: {
      what: 'Un porcentaje es una fracción con denominador 100. "Por ciento" significa "por cada cien". \\(n\\% = \\frac{n}{100}\\). Para calcular el n% de una cantidad, multiplicamos la cantidad por n/100.',
      why: 'Los porcentajes unifican comparaciones entre cantidades de distinta magnitud, facilitando el análisis.',
      realLife: [
        { icon: '🛍️', text: '30% de descuento en una tienda.' },
        { icon: '🏦', text: 'Interés bancario anual del 5%.' },
        { icon: '📊', text: 'El 72% de los estudiantes aprobó el examen.' },
        { icon: '🧪', text: 'Solución al 0.9% de cloruro de sodio (suero fisiológico).' }
      ],
      commonErrors: [
        'Confundir el porcentaje de aumento con el total: si algo sube 20%, el nuevo valor es 120%, no 20%.',
        'No reconocer que el % se calcula sobre la base original, no sobre el nuevo valor.'
      ]
    },

    visual: { type: 'percentage-bar' },

    discovery: [
      {
        title: 'Porcentaje como fracción de 100',
        text: 'Si tienes 100 cuadraditos y coloreas 30, ¿qué fracción coloreaste? ¿Cómo se escribe eso como porcentaje?',
        question: '¿Qué significa 50%? ¿Y 100%? ¿Puede existir un porcentaje mayor que 100%?'
      }
    ],

    examples: [
      {
        title: 'Calcular un porcentaje',
        problem: '¿Cuánto es el 15% de $8.000?',
        steps: [
          { action: 'Convertir porcentaje a decimal', why: 'Dividimos 15 entre 100.', formula: '15\\% = \\frac{15}{100} = 0.15', result: '' },
          { action: 'Multiplicar por la cantidad', why: 'Calculamos el porcentaje de la cantidad dada.', formula: '0.15 \\times 8000 = 1200', result: 'El 15% de $8.000 es $1.200.' }
        ]
      },
      {
        title: 'Precio con descuento',
        problem: 'Un par de zapatillas cuesta $60.000 y tiene un 25% de descuento. ¿Cuál es el precio final?',
        steps: [
          { action: 'Calcular el descuento', why: '25% de $60.000.', formula: '0.25 \\times 60000 = 15000', result: '' },
          { action: 'Restar el descuento', why: 'El precio final es el original menos el descuento.', formula: '60000 - 15000 = 45000', result: 'Precio final: $45.000.' }
        ]
      }
    ],

    exploration: null,
    summary: '\\(n\\% \\text{ de } X = \\frac{n}{100} \\times X\\). Para aumentos: nuevo valor = X × (1 + n/100). Para descuentos: nuevo valor = X × (1 − n/100).',
    keyPoints: ['% a decimal: ÷ 100', 'n% de X = 0.0n × X', 'Aumento de n%: × (1 + n/100)']
  }

];

// ── QUESTION GENERATORS ──────────────────────────────────────
// Each generator returns { question, answer, hint, solution, type, options? }
window.MM_GENERATORS = {

  'fracciones-simple': () => {
    const denoms = [2,3,4,5,6,8,10];
    const d = denoms[Math.floor(Math.random()*denoms.length)];
    const n1 = 1 + Math.floor(Math.random()*(d-1));
    const n2 = 1 + Math.floor(Math.random()*(d-1));
    const ansNum = n1 + n2;
    const simplified = simplifyFraction(ansNum, d);
    return {
      question: `\\(\\dfrac{${n1}}{${d}} + \\dfrac{${n2}}{${d}} = ?\\)`,
      answer: simplified[0] === simplified[1] ? '1' : `${simplified[0]}/${simplified[1]}`,
      hint: 'Cuando los denominadores son iguales, suma solo los numeradores.',
      solution: `Mismo denominador (${d}): suma numeradores → ${n1}+${n2} = ${ansNum}. Fracción: ${ansNum}/${d} → simplificada: ${simplified[0]}/${simplified[1]}`,
      type: 'numeric'
    };
  },

  'fracciones-diferentes': () => {
    const pairs = [[2,3],[3,4],[2,5],[3,5],[4,5],[2,7],[3,7]];
    const [d1,d2] = pairs[Math.floor(Math.random()*pairs.length)];
    const n1 = 1 + Math.floor(Math.random()*(d1-1));
    const n2 = 1 + Math.floor(Math.random()*(d2-1));
    const mcm = lcm(d1,d2);
    const num = n1*(mcm/d1) + n2*(mcm/d2);
    const simplified = simplifyFraction(num, mcm);
    return {
      question: `\\(\\dfrac{${n1}}{${d1}} + \\dfrac{${n2}}{${d2}} = ?\\)`,
      answer: simplified[0] === simplified[1] ? '1' : `${simplified[0]}/${simplified[1]}`,
      hint: `Encuentra el MCM de ${d1} y ${d2}. MCM = ${mcm}.`,
      solution: `MCM(${d1},${d2}) = ${mcm}. Convertir: ${n1*(mcm/d1)}/${mcm} + ${n2*(mcm/d2)}/${mcm} = ${num}/${mcm} = ${simplified[0]}/${simplified[1]}`,
      type: 'numeric'
    };
  },

  'ecuacion-lineal': () => {
    const a = 1 + Math.floor(Math.random()*5);
    const x = 1 + Math.floor(Math.random()*10);
    const b = Math.floor(Math.random()*15);
    const c = a*x + b;
    return {
      question: `Resuelve: \\(${a}x + ${b} = ${c}\\)`,
      answer: `${x}`,
      hint: `Primero resta ${b} en ambos lados, luego divide por ${a}.`,
      solution: `${a}x + ${b} = ${c} → ${a}x = ${c-b} → x = ${c-b}/${a} = ${x}`,
      type: 'numeric'
    };
  },

  'ecuacion-dos-lados': () => {
    const a = 2 + Math.floor(Math.random()*4);
    const b = 1 + Math.floor(Math.random()*4);
    const x = 1 + Math.floor(Math.random()*8);
    const left_const = Math.floor(Math.random()*8);
    const right_const = (a-b)*x + left_const;
    return {
      question: `Resuelve: \\(${a}x - ${left_const} = ${b}x + ${right_const - left_const - (b*x - b*x)}\\)`,
      answer: `${x}`,
      hint: `Pasa todos los términos con x al lado izquierdo y los números al derecho.`,
      solution: `${a}x − ${b}x = ${right_const} + ${left_const} → ${a-b}x = ${(a-b)*x} → x = ${x}`,
      type: 'numeric'
    };
  },

  'porcentaje-de': () => {
    const pcts = [5,10,15,20,25,30,40,50,75];
    const p = pcts[Math.floor(Math.random()*pcts.length)];
    const base = (1+Math.floor(Math.random()*19))*100;
    const ans = (p/100)*base;
    return {
      question: `¿Cuánto es el ${p}% de ${base}?`,
      answer: `${ans}`,
      hint: `Convierte el porcentaje a decimal: ${p}% = ${p/100}. Luego multiplica.`,
      solution: `${p}/100 × ${base} = ${p/100} × ${base} = ${ans}`,
      type: 'numeric'
    };
  },

  'area-triangulo': () => {
    const b = 2 + Math.floor(Math.random()*14);
    const h = 2 + Math.floor(Math.random()*14);
    const area = (b*h)/2;
    return {
      question: `Un triángulo tiene base = ${b} cm y altura = ${h} cm. ¿Cuál es su área?`,
      answer: `${area}`,
      hint: 'Usa la fórmula A = (base × altura) / 2.',
      solution: `A = (${b} × ${h}) / 2 = ${b*h}/2 = ${area} cm²`,
      type: 'numeric'
    };
  },

  'probabilidad-dado': () => {
    const targets = [
      { cond: 'par', fav: 3, desc: 'par (2,4,6)' },
      { cond: 'impar', fav: 3, desc: 'impar (1,3,5)' },
      { cond: 'mayor que 3', fav: 3, desc: 'mayor que 3 (4,5,6)' },
      { cond: 'menor que 3', fav: 2, desc: 'menor que 3 (1,2)' },
      { cond: 'mayor que 4', fav: 2, desc: 'mayor que 4 (5,6)' },
      { cond: 'igual a 1', fav: 1, desc: 'igual a 1' }
    ];
    const t = targets[Math.floor(Math.random()*targets.length)];
    const frac = simplifyFraction(t.fav, 6);
    const ansStr = frac[1]===1 ? '1' : `${frac[0]}/${frac[1]}`;
    return {
      question: `Se lanza un dado de 6 caras. ¿Cuál es la probabilidad de obtener un número ${t.cond}?`,
      answer: ansStr,
      hint: 'P = casos favorables / casos posibles (6 en total).',
      solution: `Casos favorables: ${t.desc} → ${t.fav} casos. P = ${t.fav}/6 = ${ansStr}`,
      type: 'numeric'
    };
  },

  'multiple-choice-fracciones': () => {
    const qs = [
      { q:'¿Cuál fracción es mayor?', opts:['1/2','1/3','1/4','1/8'], correct:0, expl:'Entre más pequeño el denominador (con numerador 1), más grande es la fracción.' },
      { q:'¿Cuánto es 1/4 + 2/4?', opts:['3/8','3/4','2/4','1/2'], correct:1, expl:'Mismo denominador: 1+2=3, denominador sigue siendo 4. 3/4.' },
      { q:'¿Qué fracción equivale a 1/2?', opts:['2/3','4/8','3/5','2/5'], correct:1, expl:'4/8 = 1/2 porque 4÷4=1 y 8÷4=2.' },
      { q:'¿Cuánto es 3/5 de 20?', opts:['12','15','10','6'], correct:0, expl:'3/5 × 20 = 60/5 = 12.' }
    ];
    const q = qs[Math.floor(Math.random()*qs.length)];
    return { question: q.q, answer: `${q.correct}`, options: q.opts, hint: 'Piensa en el significado de cada fracción.', solution: q.expl, type: 'multiple-choice' };
  },

  'multiple-choice-algebra': () => {
    const qs = [
      { q:'Si 3x = 12, ¿cuánto vale x?', opts:['2','4','3','6'], correct:1, expl:'x = 12/3 = 4.' },
      { q:'Simplifica: 2(x + 3)', opts:['2x+3','2x+6','x+6','2x+5'], correct:1, expl:'Distributiva: 2·x + 2·3 = 2x + 6.' },
      { q:'¿Cuánto vale x en x − 7 = 5?', opts:['2','12','−2','7'], correct:1, expl:'x = 5 + 7 = 12.' },
      { q:'¿Cuál es el coeficiente de x en 5x + 2?', opts:['2','5','7','1'], correct:1, expl:'El coeficiente es el número que multiplica a x: 5.' }
    ];
    const q = qs[Math.floor(Math.random()*qs.length)];
    return { question: q.q, answer: `${q.correct}`, options: q.opts, hint: 'Aplica las propiedades básicas del álgebra.', solution: q.expl, type: 'multiple-choice' };
  }
};

// Topic → generator mapping
window.MM_TOPIC_GENERATORS = {
  'fracciones': ['fracciones-simple','fracciones-diferentes','multiple-choice-fracciones'],
  'ecuaciones': ['ecuacion-lineal','ecuacion-dos-lados','multiple-choice-algebra'],
  'porcentajes': ['porcentaje-de'],
  'geometria':  ['area-triangulo'],
  'estadistica':['probabilidad-dado'],
  'general':    ['fracciones-simple','ecuacion-lineal','porcentaje-de','area-triangulo','probabilidad-dado','multiple-choice-fracciones']
};

// ── HELPERS ──────────────────────────────────────────────────
function gcd(a,b){ return b===0?a:gcd(b,a%b); }
function lcm(a,b){ return (a*b)/gcd(a,b); }
function simplifyFraction(n,d){
  const g=gcd(Math.abs(n),Math.abs(d));
  return [n/g, d/g];
}
window.mmGcd = gcd;
window.mmLcm = lcm;
window.mmSimplify = simplifyFraction;
