/* ═══════════════════════════════════════════════════════════════
   CONTENT-ALGEBRA.JS — Contenido educativo completo
   Álgebra: 11 unidades con teoría, ejemplos, errores y ejercicios
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  const LESSONS = [

    // ════════════════════════════════════════════════
    // 1. EXPRESIONES ALGEBRAICAS
    // ════════════════════════════════════════════════
    {
      id: 'alg-expresiones',
      courseId: 'algebra',
      topic: 'Expresiones Algebraicas',
      title: 'Del lenguaje cotidiano al lenguaje algebraico',
      level: 1,
      grades: '6°–8° Básico',
      duration: 30,
      xpReward: 120,
      icon: '🔤',
      color: '#8B5CF6',
      summary: 'Aprende a representar situaciones con variables y evaluar expresiones algebraicas.',
      keyPoints: [
        'Una variable es un símbolo que representa cantidades desconocidas o cambiantes',
        'Un monomio es un solo término: \\(5x^2\\)',
        'Un polinomio es una suma de monomios: \\(3x^2 - 2x + 1\\)',
        'El grado de un polinomio es el mayor exponente de la variable'
      ],
      concept: {
        what: 'Una **expresión algebraica** combina números, variables y operaciones para representar una cantidad de manera general. Donde antes escribíamos "un número más 5", ahora escribimos \\(x + 5\\).',
        why: 'El álgebra nos permite resolver miles de problemas con una sola fórmula, en lugar de resolver cada caso por separado.',
        realLife: [
          { icon: '🛒', text: 'El costo de comprar x artículos a $8 cada uno: \\(8x\\).' },
          { icon: '🚗', text: 'Distancia recorrida a v km/h en t horas: \\(vt\\).' },
          { icon: '📐', text: 'Área de un cuadrado de lado ℓ: \\(\\ell^2\\).' },
          { icon: '💰', text: 'Precio con 15% de descuento: \\(0.85p\\).' }
        ],
        commonErrors: [
          {
            title: '3x no significa 3+x',
            description: '\\(3x\\) significa \\(3 \\times x\\). Si \\(x=5\\) entonces \\(3x=15\\), no 8.'
          },
          {
            title: 'Confundir exponente con multiplicación',
            description: '\\(x^2\\) significa \\(x \\times x\\), NO \\(x \\times 2\\). Si \\(x=4\\): \\(x^2=16\\), no 8.'
          },
          {
            title: 'Error al sustituir negativos',
            description: 'Si \\(x=-3\\) y evaluamos \\(x^2\\): resultado es \\((-3)^2 = 9\\), no \\(-9\\).'
          },
          {
            title: 'No usar paréntesis al sustituir',
            description: 'Siempre pon paréntesis: \\(f(-3) = 2(-3)^2\\), no \\(2-3^2\\).'
          }
        ]
      },
      examples: [
        {
          title: 'Evaluar una expresión lineal',
          problem: 'Si \\(x = 4\\), calcula \\(3x - 7\\).',
          steps: [
            { action: 'Escribe la expresión', why: 'Punto de partida', formula: '3x - 7', result: '' },
            { action: 'Sustituye x por 4', why: 'Reemplaza la variable', formula: '3(4) - 7', result: '' },
            { action: 'Multiplica', why: 'Orden de operaciones: primero multiplicación', formula: '12 - 7', result: '' },
            { action: 'Resta', why: 'Última operación', formula: '', result: '5' }
          ]
        },
        {
          title: 'Evaluar con valor negativo',
          problem: 'Si \\(x = -2\\), calcula \\(x^2 + 3x - 1\\).',
          steps: [
            { action: 'Sustituye (con paréntesis)', why: 'Los paréntesis evitan errores con negativos', formula: '(-2)^2 + 3(-2) - 1', result: '' },
            { action: 'Calcula la potencia', why: 'Exponente tiene prioridad', formula: '4 + 3(-2) - 1', result: '' },
            { action: 'Multiplica', why: '3 × (-2) = -6', formula: '4 - 6 - 1', result: '' },
            { action: 'Suma algebraica', why: 'Combina todos los términos', formula: '', result: '-3' }
          ]
        },
        {
          title: 'Traducir al lenguaje algebraico',
          problem: 'Traduce: "El triple de un número disminuido en 8".',
          steps: [
            { action: 'Identifica la cantidad desconocida', why: 'Asigna una variable', formula: 'Sea el número = x', result: '' },
            { action: '"El triple de un número"', why: 'Triple = ×3', formula: '3x', result: '' },
            { action: '"disminuido en 8"', why: 'Disminuido en = restar 8', formula: '3x - 8', result: '' },
            { action: 'Expresión final', why: 'Completa', formula: '', result: '3x - 8' }
          ]
        }
      ],
      visual: { type: 'balance_scale' },
      discovery: [
        {
          title: '¿Por qué necesitamos variables?',
          text: 'Imagina que vendes limonadas a $3 cada una. ¿Cuánto ganas si vendes 5? Fácil: 15. ¿Y si vendes 47? ¿Y si vendes n limonadas?',
          question: 'Con la expresión \\(3n\\), ¿cuánto ganas si vendes 100 limonadas?'
        },
        {
          title: 'La diferencia entre 2x y x²',
          text: 'Construye un cuadrado de lado x. Su área es x·x = x². Si duplicas el lado, el área se cuadruplica. Si sumas 2 al lado: área = (x+2)², muy diferente a x²+2.',
          question: 'Si x=5, ¿cuánto mide x² y cuánto 2x? ¿Son iguales?'
        }
      ],
      exercises: { topic: 'alg_expresiones', generators: [] },
      advanced: {
        title: 'Desafíos con expresiones algebraicas',
        challenges: [
          {
            title: 'La expresión del perímetro',
            problem: 'Un triángulo tiene lados \\(x\\), \\(2x-3\\) y \\(x+5\\). Escribe y simplifica la expresión del perímetro. Luego calcúlalo cuando \\(x=7\\).',
            hint: 'Suma los tres lados y reduce términos semejantes.',
            solution: '\\(x + 2x-3 + x+5 = 4x+2\\). Con \\(x=7\\): \\(4(7)+2=30\\).'
          },
          {
            title: 'Temperatura y unidades',
            problem: 'La fórmula \\(F = \\frac{9}{5}C + 32\\) convierte Celsius a Fahrenheit. ¿A cuántos °F equivalen 25°C y 100°C?',
            hint: 'Sustituye C por 25 y luego por 100.',
            solution: '25°C: \\(\\frac{9}{5}(25)+32=45+32=77°F\\). 100°C: \\(\\frac{9}{5}(100)+32=180+32=212°F\\).'
          }
        ]
      }
    },

    // ════════════════════════════════════════════════
    // 2. REDUCCIÓN DE TÉRMINOS SEMEJANTES
    // ════════════════════════════════════════════════
    {
      id: 'alg-reduccion',
      courseId: 'algebra',
      topic: 'Reducción de Términos Semejantes',
      title: 'Simplificar para ver con claridad',
      level: 2,
      grades: '6°–8° Básico',
      duration: 25,
      xpReward: 110,
      icon: '➕',
      color: '#8B5CF6',
      summary: 'Combina términos semejantes para simplificar expresiones y realizar operaciones con polinomios.',
      keyPoints: [
        'Términos semejantes tienen la misma variable con el mismo exponente',
        'Solo se combinan los coeficientes de términos semejantes',
        '\\(x^2\\) y \\(x\\) NO son semejantes (diferente exponente)',
        'Al restar un polinomio: el negativo afecta a TODOS sus términos'
      ],
      concept: {
        what: 'Dos términos son **semejantes** si tienen exactamente la misma parte literal (misma variable, mismo exponente). Solo los términos semejantes se pueden sumar o restar.',
        why: 'Reducir simplifica expresiones complejas a formas más manejables, esencial para resolver ecuaciones y aplicar fórmulas.',
        realLife: [
          { icon: '🍎', text: '3 manzanas + 5 manzanas = 8 manzanas. Pero 3 manzanas + 5 naranjas no se puede simplificar.' },
          { icon: '📦', text: 'Inventario: si tienes \\(3x\\) cajas de tipo A y recibes \\(2x\\) más, tienes \\(5x\\) cajas de tipo A.' },
          { icon: '💶', text: 'Ganancias de dos negocios: \\(4x - 200 + 3x + 150 = 7x - 50\\) pesos.' }
        ],
        commonErrors: [
          {
            title: 'Combinar términos no semejantes',
            description: '\\(3x^2 + 2x \\neq 5x^3\\) ni \\(5x^2\\). Son distintos: uno es cuadrático, el otro lineal.'
          },
          {
            title: 'Error al distribuir el negativo',
            description: '\\((x^2+3x)-(2x^2-x) = x^2+3x-2x^2+x = -x^2+4x\\). El "-" afecta a \\(-x\\) → \\(+x\\).'
          },
          {
            title: 'Olvidar el término sin variable',
            description: 'Los términos independientes (constantes) también son semejantes entre sí: \\(7x+3+2x+5 = 9x+8\\).'
          }
        ]
      },
      examples: [
        {
          title: 'Reducir expresión con una variable',
          problem: 'Simplifica: \\(5x^2 - 3x + 2 + 2x^2 + 7x - 8\\)',
          steps: [
            { action: 'Identifica grupos de semejantes', why: 'Organiza antes de operar', formula: '(5x²+2x²) + (-3x+7x) + (2-8)', result: '' },
            { action: 'Suma coeficientes de x²', why: '5+2=7', formula: '7x²', result: '' },
            { action: 'Suma coeficientes de x', why: '-3+7=4', formula: '+4x', result: '' },
            { action: 'Suma constantes', why: '2-8=-6', formula: '', result: '7x² + 4x - 6' }
          ]
        },
        {
          title: 'Resta de polinomios',
          problem: 'Calcula: \\((4x^2 - 2x + 5) - (x^2 + 3x - 1)\\)',
          steps: [
            { action: 'Distribuye el signo negativo', why: 'El - afecta a TODOS los términos del segundo paréntesis', formula: '4x²-2x+5 - x²-3x+1', result: '' },
            { action: 'Agrupa semejantes', why: 'Ordena', formula: '(4x²-x²) + (-2x-3x) + (5+1)', result: '' },
            { action: 'Reduce', why: 'Opera cada grupo', formula: '', result: '3x² - 5x + 6' }
          ]
        }
      ],
      visual: { type: 'algebra_tiles' },
      discovery: [
        {
          title: 'Semejantes y no semejantes',
          text: 'Tienes 3 manzanas, 5 peras, y te dan 2 manzanas más. ¿Cuántas tienes de cada tipo? En álgebra: \\(3a + 5p + 2a = 5a + 5p\\).',
          question: '¿Puedes reducir \\(5a + 5p\\) más? ¿Por qué sí o no?'
        }
      ],
      exercises: { topic: 'alg_reduccion', generators: [] },
      advanced: {
        title: 'Desafíos con polinomios',
        challenges: [
          {
            title: 'El perímetro como polinomio',
            problem: 'Un polígono tiene lados \\(3x+1\\), \\(2x-3\\), \\(x+4\\) y \\(4x-2\\). Expresa el perímetro simplificado y calcula para \\(x=3\\).',
            hint: 'Suma todos los lados y reduce.',
            solution: '\\((3x+1)+(2x-3)+(x+4)+(4x-2) = 10x\\). Con x=3: 30 unidades.'
          }
        ]
      }
    },

    // ════════════════════════════════════════════════
    // 3. PRODUCTOS NOTABLES
    // ════════════════════════════════════════════════
    {
      id: 'alg-productos',
      courseId: 'algebra',
      topic: 'Productos Notables',
      title: 'Atajos algebraicos que todo matemático conoce',
      level: 3,
      grades: '7°–1° Medio',
      duration: 35,
      xpReward: 140,
      icon: '⭐',
      color: '#8B5CF6',
      summary: 'Aprende las identidades algebraicas fundamentales para expandir y multiplicar polinomios con rapidez.',
      keyPoints: [
        '\\((a+b)^2 = a^2 + 2ab + b^2\\) — cuadrado de suma',
        '\\((a-b)^2 = a^2 - 2ab + b^2\\) — cuadrado de diferencia',
        '\\((a+b)(a-b) = a^2 - b^2\\) — suma por diferencia',
        'El término \\(2ab\\) (término cruzado) es el que más se olvida'
      ],
      concept: {
        what: 'Los **productos notables** son multiplicaciones de polinomios tan frecuentes que tienen fórmulas especiales. Conocerlas te permite expandir en segundos lo que tardarías minutos calculando.',
        why: 'Son la base de la factorización, el cálculo diferencial, y permiten calcular cuadrados de números grandes mentalmente.',
        realLife: [
          { icon: '🧮', text: '\\(99^2 = (100-1)^2 = 10000 - 200 + 1 = 9801\\). ¡Sin calculadora!' },
          { icon: '📐', text: 'El área de un cuadrado con lado \\(a+b\\) demuestra geométricamente \\((a+b)^2\\).' },
          { icon: '💡', text: 'La fórmula \\((a+b)(a-b)=a^2-b^2\\) se usa en circuitos electrónicos y física.' }
        ],
        commonErrors: [
          {
            title: '(a+b)² ≠ a²+b²',
            description: 'El error más clásico del álgebra. \\((a+b)^2 = a^2 + 2ab + b^2\\). El término \\(2ab\\) NUNCA se puede omitir.'
          },
          {
            title: 'Olvidar el signo en (a-b)²',
            description: '\\((a-b)^2 = a^2 - 2ab + b^2\\). El último término \\(b^2\\) es POSITIVO aunque haya una resta.'
          },
          {
            title: 'Confundir (a-b)² con a²-b²',
            description: '\\((a-b)^2 \\neq a^2-b^2\\). La diferencia de cuadrados es \\((a+b)(a-b)\\), NO un cuadrado de binomio.'
          }
        ]
      },
      examples: [
        {
          title: 'Cuadrado de suma',
          problem: 'Desarrolla \\((x+5)^2\\)',
          steps: [
            { action: 'Identifica a y b', why: 'Necesitamos los dos términos', formula: 'a = x, b = 5', result: '' },
            { action: 'Aplica la fórmula', why: '\\((a+b)^2 = a^2+2ab+b^2\\)', formula: 'x² + 2(x)(5) + 5²', result: '' },
            { action: 'Simplifica', why: 'Calcula cada término', formula: '', result: 'x² + 10x + 25' }
          ]
        },
        {
          title: 'Aplicación numérica — calcular 98²',
          problem: 'Calcula \\(98^2\\) usando un producto notable.',
          steps: [
            { action: 'Reescribe', why: '98 = 100 - 2', formula: '(100-2)²', result: '' },
            { action: 'Aplica \\((a-b)^2 = a^2-2ab+b^2\\)', why: '', formula: '100² - 2(100)(2) + 2²', result: '' },
            { action: 'Calcula', why: '', formula: '10000 - 400 + 4', result: '9604' }
          ]
        },
        {
          title: 'Suma por diferencia',
          problem: 'Calcula \\(103 × 97\\)',
          steps: [
            { action: 'Identifica la forma', why: '103=100+3 y 97=100-3', formula: '(100+3)(100-3)', result: '' },
            { action: 'Aplica \\((a+b)(a-b) = a^2-b^2\\)', why: '', formula: '100² - 3²', result: '' },
            { action: 'Calcula', why: '', formula: '10000 - 9', result: '9991' }
          ]
        }
      ],
      visual: { type: 'geometric_square' },
      discovery: [
        {
          title: 'Comprobación geométrica de (a+b)²',
          text: 'Dibuja un cuadrado de lado (a+b). Al dividirlo en 4 partes obtienes: un cuadrado de lado a (área a²), un cuadrado de lado b (área b²), y DOS rectángulos de lados a y b (área 2ab cada uno).',
          question: '¿Por qué el término 2ab aparece multiplicado por 2 en la fórmula?'
        }
      ],
      exercises: { topic: 'alg_productos', generators: [] },
      advanced: {
        title: 'Productos notables avanzados',
        challenges: [
          {
            title: 'Cubo de binomio',
            problem: 'Desarrolla \\((x+2)^3\\) usando \\((a+b)^3 = a^3+3a^2b+3ab^2+b^3\\).',
            hint: 'Con a=x y b=2: sustituye directamente en la fórmula.',
            solution: '\\(x^3 + 3x^2(2) + 3x(4) + 8 = x^3 + 6x^2 + 12x + 8\\)'
          },
          {
            title: 'Simplificación con productos notables',
            problem: 'Simplifica: \\(\\dfrac{(x+3)^2 - (x-3)^2}{12}\\)',
            hint: 'Desarrolla cada cuadrado y resta. Verás que muchos términos se cancelan.',
            solution: '\\((x^2+6x+9)-(x^2-6x+9) = 12x\\). Entonces \\(\\frac{12x}{12} = x\\).'
          }
        ]
      }
    },

    // ════════════════════════════════════════════════
    // 4. FACTORIZACIÓN
    // ════════════════════════════════════════════════
    {
      id: 'alg-factorizacion',
      courseId: 'algebra',
      topic: 'Factorización',
      title: 'Descomponer para conquistar',
      level: 4,
      grades: '8°–2° Medio',
      duration: 40,
      xpReward: 160,
      icon: '🔑',
      color: '#8B5CF6',
      summary: 'Aprende a escribir expresiones algebraicas como productos de factores más simples.',
      keyPoints: [
        'Factor común: \\(ax+ay = a(x+y)\\)',
        'Diferencia de cuadrados: \\(a^2-b^2 = (a+b)(a-b)\\)',
        'Trinomio cuadrado perfecto: \\(a^2 \\pm 2ab+b^2 = (a \\pm b)^2\\)',
        'Trinomio tipo \\(x^2+bx+c\\): busca p,q con p+q=b y p·q=c'
      ],
      concept: {
        what: '**Factorizar** es el proceso inverso de expandir: en vez de multiplicar factores, descomponemos una expresión en el producto de factores más simples.',
        why: 'Factorizar permite resolver ecuaciones de segundo grado, simplificar fracciones algebraicas, y encontrar raíces de polinomios.',
        realLife: [
          { icon: '📐', text: 'El área \\(x^2+5x+6 = (x+2)(x+3)\\) representa un rectángulo de lados (x+2) y (x+3).' },
          { icon: '🔬', text: 'En física: la diferencia de cuadrados aparece en fórmulas de energía cinética \\(v_f^2 - v_i^2\\).' },
          { icon: '💹', text: 'En finanzas: factorizar \\(A^2-B^2\\) permite calcular diferencias de rendimiento.' }
        ],
        commonErrors: [
          {
            title: 'Factor común incompleto',
            description: 'En \\(6x^2+9x\\), el MCD es \\(3x\\), no solo 3. Resultado: \\(3x(2x+3)\\), no \\(3(2x^2+3x)\\).'
          },
          {
            title: 'Confundir suma de cuadrados con diferencia',
            description: '\\(a^2+b^2\\) NO se puede factorizar en los reales. Solo \\(a^2-b^2 = (a+b)(a-b)\\).'
          },
          {
            title: 'Signos equivocados en trinomio',
            description: 'En \\(x^2-5x+6 = (x-2)(x-3)\\), ambos factores llevan menos. Verifica: \\((-2)(-3)=6>0\\) y \\(-2-3=-5\\). ✓'
          },
          {
            title: 'No verificar la factorización',
            description: 'Siempre expande el resultado para verificar que sea igual a la expresión original.'
          }
        ]
      },
      examples: [
        {
          title: 'Factor común monomio',
          problem: 'Factoriza: \\(12x^3 - 8x^2 + 4x\\)',
          steps: [
            { action: 'Encuentra el MCD de coeficientes', why: 'MCD(12,8,4) = 4', formula: '', result: '4' },
            { action: 'Encuentra la menor potencia de x', why: 'x¹ está en todos los términos', formula: '', result: 'x' },
            { action: 'Factor común = 4x', why: '', formula: '4x(? - ? + ?)', result: '' },
            { action: 'Divide cada término', why: '12x³÷4x=3x², 8x²÷4x=2x, 4x÷4x=1', formula: '', result: '4x(3x² - 2x + 1)' }
          ]
        },
        {
          title: 'Diferencia de cuadrados',
          problem: 'Factoriza: \\(9x^2 - 16\\)',
          steps: [
            { action: 'Identifica si es diferencia de cuadrados', why: '9x² = (3x)² y 16 = 4²', formula: 'A = 3x, B = 4', result: '' },
            { action: 'Aplica \\(A^2-B^2 = (A+B)(A-B)\\)', why: '', formula: '', result: '(3x+4)(3x-4)' },
            { action: 'Verifica expandiendo', why: '= 9x²-12x+12x-16 = 9x²-16 ✓', formula: '', result: '✓' }
          ]
        },
        {
          title: 'Trinomio de la forma x²+bx+c',
          problem: 'Factoriza: \\(x^2 + 7x + 12\\)',
          steps: [
            { action: 'Busca p, q donde p+q=7 y p·q=12', why: 'Técnica de trinomio', formula: 'Pruebo: 3 y 4 → 3+4=7 ✓, 3×4=12 ✓', result: '' },
            { action: 'Escribe los factores', why: '\\(x^2+bx+c = (x+p)(x+q)\\)', formula: '', result: '(x+3)(x+4)' }
          ]
        }
      ],
      visual: { type: 'factor_tree' },
      discovery: [
        {
          title: 'La conexión con los productos notables',
          text: 'La factorización es el proceso inverso de los productos notables. Si \\((x+3)^2 = x^2+6x+9\\), entonces \\(x^2+6x+9\\) factoriza como \\((x+3)^2\\).',
          question: 'Factoriza \\(x^2+10x+25\\). ¿Reconoces el patrón?'
        }
      ],
      exercises: { topic: 'alg_factorizacion', generators: [] },
      advanced: {
        title: 'Desafíos de factorización',
        challenges: [
          {
            title: 'Factorización completa por etapas',
            problem: 'Factoriza completamente: \\(2x^3 - 8x\\)',
            hint: 'Primero extrae factor común, luego busca diferencia de cuadrados.',
            solution: '\\(2x(x^2-4) = 2x(x+2)(x-2)\\)'
          },
          {
            title: 'Factorización con agrupación',
            problem: 'Factoriza: \\(x^3 + x^2 - 4x - 4\\)',
            hint: 'Agrupa los primeros dos términos y los últimos dos. Busca el factor común en cada grupo.',
            solution: '\\(x^2(x+1) - 4(x+1) = (x^2-4)(x+1) = (x+2)(x-2)(x+1)\\)'
          }
        ]
      }
    },

    // ════════════════════════════════════════════════
    // 5. POLINOMIOS
    // ════════════════════════════════════════════════
    {
      id: 'alg-polinomios',
      courseId: 'algebra',
      topic: 'Polinomios',
      title: 'Las expresiones más versátiles del álgebra',
      level: 5,
      grades: '8°–2° Medio',
      duration: 35,
      xpReward: 150,
      icon: '📊',
      color: '#8B5CF6',
      summary: 'Aprende operaciones avanzadas con polinomios: división, el teorema del resto y la regla de Ruffini.',
      keyPoints: [
        'El grado de un polinomio es el mayor exponente de la variable',
        'Teorema del Resto: P(a) es el resto de dividir P(x) entre (x-a)',
        'Si P(a) = 0, entonces (x-a) es factor de P(x)',
        'Regla de Ruffini: método rápido de división sintética'
      ],
      concept: {
        what: 'Un **polinomio** es una suma de monomios. Tienen grado (máximo exponente), coeficientes, y se pueden sumar, restar, multiplicar y dividir.',
        why: 'Los polinomios modelan desde parábolas hasta curvas de crecimiento económico y perfiles de ingeniería.',
        realLife: [
          { icon: '🚀', text: 'La trayectoria de un proyectil es un polinomio de grado 2: \\(h(t) = -4.9t^2 + v_0t + h_0\\).' },
          { icon: '📈', text: 'Modelos económicos de costo-beneficio suelen ser polinomios cúbicos.' },
          { icon: '🎮', text: 'Los gráficos de videojuegos usan curvas de Bézier, que son polinomios paramétricos.' }
        ],
        commonErrors: [
          {
            title: 'Confundir grado y número de términos',
            description: '\\(3x^5 - x + 7\\) tiene grado 5 (no 3 términos = grado 3). El grado es el mayor exponente.'
          },
          {
            title: 'Error en el Teorema del Resto',
            description: 'Para dividir entre \\((x-3)\\), se evalúa P(3), no P(-3). Cuidado con el signo.'
          }
        ]
      },
      examples: [
        {
          title: 'Teorema del Resto',
          problem: 'Halla el resto de dividir \\(P(x) = x^3 - 2x^2 + x - 5\\) entre \\((x-2)\\).',
          steps: [
            { action: 'Identifica el divisor', why: 'División entre (x-2): evaluamos en x=2', formula: '', result: '' },
            { action: 'Calcula P(2)', why: 'El Teorema del Resto dice que el resto = P(a)', formula: 'P(2) = 2³ - 2(2²) + 2 - 5', result: '' },
            { action: 'Opera', why: '', formula: '8 - 8 + 2 - 5', result: '-3' }
          ]
        },
        {
          title: 'Verificar una raíz con Ruffini',
          problem: 'Verifica que \\(x=3\\) es raíz de \\(P(x) = x^3 - 4x^2 + x + 6\\).',
          steps: [
            { action: 'Configura la tabla de Ruffini', why: 'Coeficientes: 1, -4, 1, 6; divisor: 3', formula: '1 | -4 | 1 | 6', result: '' },
            { action: 'Opera fila por fila', why: 'Baja el 1, multiplica por 3, suma...', formula: '1 → 1·3=3 → -4+3=-1 → -1·3=-3 → 1-3=-2 → -2·3=-6 → 6-6=0', result: 'Resto = 0 ✓' },
            { action: 'Conclusión', why: 'Resto 0 confirma que x=3 es raíz', formula: '', result: '\\(x=3\\) es raíz de P(x)' }
          ]
        }
      ],
      visual: { type: 'polynomial_graph' },
      discovery: [
        {
          title: 'La conexión raíz-factor',
          text: 'Si P(3) = 0, entonces P(x) se puede escribir como (x-3)·Q(x). Esto es como decir que "3 divide exactamente a P(x)".',
          question: '¿Cuántas raíces puede tener un polinomio de grado 3? ¿Puede tener más que su grado?'
        }
      ],
      exercises: { topic: 'alg_polinomios', generators: [] },
      advanced: {
        title: 'División y raíces de polinomios',
        challenges: [
          {
            title: 'Factorización con Ruffini',
            problem: '\\(P(x) = x^3 - 6x^2 + 11x - 6\\). Verifica que \\(x=1\\) es raíz y luego factoriza completamente.',
            hint: 'Aplica Ruffini con x=1 para obtener el cociente cuadrático, luego factoriza ese trinomio.',
            solution: 'P(1)=0. Cociente: x²-5x+6=(x-2)(x-3). Factorización: (x-1)(x-2)(x-3).'
          }
        ]
      }
    },

    // ════════════════════════════════════════════════
    // 6. ECUACIONES DE PRIMER GRADO
    // ════════════════════════════════════════════════
    {
      id: 'alg-ec1',
      courseId: 'algebra',
      topic: 'Ecuaciones de Primer Grado',
      title: 'Encontrar lo desconocido',
      level: 6,
      grades: '7°–8° Básico',
      duration: 30,
      xpReward: 130,
      icon: '⚖️',
      color: '#8B5CF6',
      summary: 'Aprende a plantear y resolver ecuaciones lineales, incluyendo casos con paréntesis y fracciones.',
      keyPoints: [
        'Una ecuación es un balance: lo que haces de un lado, lo haces del otro',
        'Objetivo: aislar la variable (x sola de un lado)',
        'Los términos cambian de signo al pasar al otro miembro',
        'Al multiplicar/dividir por negativo: el signo de desigualdad NO cambia (en ecuaciones)'
      ],
      concept: {
        what: 'Una **ecuación de primer grado** es una igualdad que contiene una variable con exponente 1. Resolver la ecuación es encontrar el valor que hace verdadera la igualdad.',
        why: 'Resolver ecuaciones es la habilidad algebraica más usada: desde calcular precios hasta determinar tiempos y distancias.',
        realLife: [
          { icon: '💸', text: 'Si ganas $x y gastas $320, te quedan $180: \\(x - 320 = 180\\), por lo tanto \\(x = 500\\).' },
          { icon: '🏃', text: 'A 8 km/h, ¿cuántas horas para llegar a 52 km? \\(8t = 52\\), \\(t = 6.5\\) horas.' },
          { icon: '🎂', text: '"Tengo el doble de años que tú. Juntos sumamos 48." \\(x + 2x = 48\\), \\(x = 16\\).' }
        ],
        commonErrors: [
          {
            title: 'No operar en ambos lados',
            description: 'Si sumas algo a un lado debes sumarlo al otro: la ecuación es una balanza. \\(x+3=7\\) → \\(x=7-3=4\\).'
          },
          {
            title: 'Error al distribuir paréntesis con negativo',
            description: '\\(2(x-3) = 2x-6\\), NO \\(2x-3\\). El coeficiente multiplica a TODOS los términos.'
          },
          {
            title: 'Dividir solo el numerador en fracciones',
            description: 'Para eliminar \\(\\frac{x}{3}=5\\), multiplica ambos lados por 3: \\(x=15\\).'
          }
        ]
      },
      examples: [
        {
          title: 'Ecuación simple',
          problem: 'Resuelve: \\(3x - 7 = 14\\)',
          steps: [
            { action: 'Pasa el término independiente', why: 'Aísla el término con x', formula: '3x = 14 + 7 = 21', result: '' },
            { action: 'Divide por el coeficiente', why: 'Para dejar x sola', formula: 'x = 21 ÷ 3', result: 'x = 7' },
            { action: 'Verifica', why: 'Sustituye: 3(7)-7=21-7=14 ✓', formula: '', result: '✓' }
          ]
        },
        {
          title: 'Ecuación con paréntesis',
          problem: 'Resuelve: \\(2(x+4) = 3x - 1\\)',
          steps: [
            { action: 'Distribuye el paréntesis', why: '2×x + 2×4', formula: '2x + 8 = 3x - 1', result: '' },
            { action: 'Agrupa x en un lado', why: 'Pasa 3x al lado izquierdo', formula: '2x - 3x = -1 - 8', result: '' },
            { action: 'Simplifica', why: '', formula: '-x = -9', result: 'x = 9' }
          ]
        },
        {
          title: 'Problema verbal',
          problem: 'El triple de un número menos 5 es igual al doble de ese número más 8. ¿Cuál es el número?',
          steps: [
            { action: 'Define la variable', why: 'Sea el número = n', formula: '', result: '' },
            { action: 'Plantea la ecuación', why: 'Traduce la oración', formula: '3n - 5 = 2n + 8', result: '' },
            { action: 'Resuelve', why: 'Agrupa y despeja', formula: 'n = 13', result: 'El número es 13' }
          ]
        }
      ],
      visual: { type: 'balance_scale' },
      discovery: [
        {
          title: 'La balanza y la igualdad',
          text: 'Una ecuación es como una balanza en equilibrio. Si agregas o quitas algo de un platillo, debes hacer lo mismo en el otro para mantener el equilibrio.',
          question: 'Si \\(x+5=12\\), ¿qué operación quitas de la balanza para descubrir x?'
        }
      ],
      exercises: { topic: 'alg_ec1', generators: [] },
      advanced: {
        title: 'Ecuaciones avanzadas',
        challenges: [
          {
            title: 'Ecuación con fracciones',
            problem: 'Resuelve: \\(\\dfrac{x+2}{3} - \\dfrac{x-1}{4} = 1\\)',
            hint: 'Multiplica toda la ecuación por MCM(3,4)=12 para eliminar denominadores.',
            solution: '\\(4(x+2) - 3(x-1) = 12\\) → \\(4x+8-3x+3=12\\) → \\(x=1\\)'
          }
        ]
      }
    },

    // ════════════════════════════════════════════════
    // 7. ECUACIONES DE SEGUNDO GRADO
    // ════════════════════════════════════════════════
    {
      id: 'alg-ec2',
      courseId: 'algebra',
      topic: 'Ecuaciones de Segundo Grado',
      title: 'Cuándo la incógnita aparece al cuadrado',
      level: 7,
      grades: '8°–2° Medio',
      duration: 40,
      xpReward: 170,
      icon: '📈',
      color: '#8B5CF6',
      summary: 'Domina tres métodos para resolver ecuaciones cuadráticas y aprende a interpretar el discriminante.',
      keyPoints: [
        'Forma estándar: \\(ax^2 + bx + c = 0\\)',
        'Fórmula general: \\(x = \\dfrac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)',
        'Discriminante \\(\\Delta = b^2-4ac\\): determina el tipo de soluciones',
        'Teorema de Vieta: \\(x_1+x_2 = -b/a\\) y \\(x_1 \\cdot x_2 = c/a\\)'
      ],
      concept: {
        what: 'Una **ecuación cuadrática** tiene la forma \\(ax^2+bx+c=0\\) con \\(a\\neq 0\\). Puede tener 0, 1 o 2 soluciones reales dependiendo del discriminante.',
        why: 'Las ecuaciones cuadráticas modelan parábolas, caída libre, geometría de áreas y decenas de situaciones reales.',
        realLife: [
          { icon: '🏀', text: 'La altura de un balón lanzado: \\(h(t)=-5t^2+10t+2=0\\) da el tiempo de aterrizaje.' },
          { icon: '🏗️', text: 'Calcular dimensiones de estructuras rectangulares con área conocida.' },
          { icon: '💡', text: 'En electricidad, las ecuaciones cuadráticas aparecen en circuitos RLC.' }
        ],
        commonErrors: [
          {
            title: 'No llevar a forma estándar primero',
            description: 'Antes de aplicar la fórmula, la ecuación DEBE estar en la forma \\(ax^2+bx+c=0\\) con todo en un lado.'
          },
          {
            title: 'Error de signo en la fórmula',
            description: 'En \\(x=\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}\\) es \\(-b\\), no \\(b\\). Si \\(b=-4\\) entonces \\(-b=+4\\).'
          },
          {
            title: 'Olvidar las DOS soluciones',
            description: 'El ± da dos soluciones: \\(x_1\\) con + y \\(x_2\\) con -. Una ecuación cuadrática con Δ>0 siempre tiene DOS raíces.'
          },
          {
            title: 'Error al calcular el discriminante',
            description: '\\(\\Delta = b^2 - 4ac\\), NO \\(b^2-4c\\). El coeficiente \\(a\\) siempre está presente.'
          }
        ]
      },
      examples: [
        {
          title: 'Método por fórmula general',
          problem: 'Resuelve: \\(2x^2 - 5x - 3 = 0\\)',
          steps: [
            { action: 'Identifica a, b, c', why: '', formula: 'a=2, b=-5, c=-3', result: '' },
            { action: 'Calcula el discriminante', why: '\\(\\Delta = b^2-4ac\\)', formula: '(-5)²-4(2)(-3) = 25+24', result: 'Δ = 49' },
            { action: 'Aplica la fórmula', why: '', formula: 'x = (5 ± √49) / 4 = (5±7)/4', result: '' },
            { action: 'Obtén las dos soluciones', why: '', formula: 'x₁=(5+7)/4=3', result: 'x₁=3, x₂=-1/2' }
          ]
        },
        {
          title: 'Análisis del discriminante',
          problem: 'Determina el tipo de soluciones de \\(x^2 + 2x + 5 = 0\\).',
          steps: [
            { action: 'Calcula Δ', why: '', formula: 'Δ = 2²-4(1)(5) = 4-20', result: 'Δ = -16 < 0' },
            { action: 'Interpreta', why: 'Δ < 0 → sin raíces reales', formula: '', result: 'No tiene soluciones reales' }
          ]
        }
      ],
      visual: { type: 'parabola' },
      discovery: [
        {
          title: 'El discriminante como "brújula"',
          text: 'Antes de resolver, el discriminante te dice cuántas soluciones esperar: Δ>0 → dos, Δ=0 → una, Δ<0 → ninguna real.',
          question: '¿Por qué cuando Δ=0 obtenemos UNA sola raíz? Observa que ±0 da el mismo resultado.'
        }
      ],
      exercises: { topic: 'alg_ec2', generators: [] },
      advanced: {
        title: 'Ecuaciones cuadráticas avanzadas',
        challenges: [
          {
            title: 'Construir ecuación desde las raíces',
            problem: 'Construye una ecuación cuadrática con raíces \\(x_1=3\\) y \\(x_2=-5\\).',
            hint: 'Usa el Teorema de Vieta: suma=3+(-5)=-2, producto=3·(-5)=-15.',
            solution: '\\(x^2-(-2)x+(-15) = 0\\) → \\(x^2+2x-15=0\\)'
          }
        ]
      }
    },

    // ════════════════════════════════════════════════
    // 8. SISTEMAS DE ECUACIONES
    // ════════════════════════════════════════════════
    {
      id: 'alg-sistemas',
      courseId: 'algebra',
      topic: 'Sistemas de Ecuaciones',
      title: 'Resolver lo que una ecuación no puede',
      level: 8,
      grades: '8°–2° Medio',
      duration: 40,
      xpReward: 160,
      icon: '🔗',
      color: '#8B5CF6',
      summary: 'Aprende tres métodos para resolver sistemas de ecuaciones lineales e interpreta sus soluciones.',
      keyPoints: [
        'Sustitución: despeja una variable y sustituye en la otra ecuación',
        'Eliminación (Gauss): multiplica y suma/resta para cancelar una variable',
        'Gráfico: la solución es la intersección de las dos rectas',
        'Clasificación: compatible determinado / indeterminado / incompatible'
      ],
      concept: {
        what: 'Un **sistema de ecuaciones** es un conjunto de ecuaciones que deben satisfacerse simultáneamente. Buscamos los valores que sean solución de TODAS las ecuaciones a la vez.',
        why: 'Los sistemas modelan situaciones con múltiples condiciones simultáneas: precios, velocidades, mezclas, circuitos eléctricos.',
        realLife: [
          { icon: '☕', text: 'Mezcla de cafés: 200g de mezcla A ($12/kg) y B ($18/kg) cuesta $15/kg. ¿Cuánto de cada uno?' },
          { icon: '🚂', text: 'Dos trenes que parten y se encuentran: dos ecuaciones de velocidad simultáneas.' },
          { icon: '💼', text: 'Precio de 3 bolígrafos + 2 cuadernos = $850. 1 bolígrafo + 4 cuadernos = $700.' }
        ],
        commonErrors: [
          {
            title: 'Sustituir en la misma ecuación de donde se despejó',
            description: 'Si despejas x de la ecuación 1, sustituye en la ecuación 2 (no vuelvas a la 1).'
          },
          {
            title: 'Olvidar sustituir para hallar la segunda variable',
            description: 'Al resolver por eliminación, encontrar y no es suficiente. Siempre sustituye para hallar también x.'
          },
          {
            title: 'Invertir las variables en la respuesta',
            description: 'Al escribir la solución, verifica cuál valor corresponde a x y cuál a y sustituyendo en ambas ecuaciones.'
          }
        ]
      },
      examples: [
        {
          title: 'Método de sustitución',
          problem: 'Resuelve: \\(\\begin{cases}x + y = 10\\\\ 2x - y = 5\\end{cases}\\)',
          steps: [
            { action: 'Despeja x de ec.1', why: 'Variable más fácil', formula: 'x = 10 - y', result: '' },
            { action: 'Sustituye en ec.2', why: 'Reemplaza x en la segunda', formula: '2(10-y) - y = 5', result: '' },
            { action: 'Resuelve para y', why: '20 - 2y - y = 5 → 20 - 3y = 5', formula: '3y = 15', result: 'y = 5' },
            { action: 'Halla x', why: 'Sustituye y=5 en x=10-y', formula: 'x = 10 - 5', result: 'x = 5' }
          ]
        },
        {
          title: 'Método de eliminación',
          problem: 'Resuelve: \\(\\begin{cases}3x + 2y = 16\\\\ 5x - 2y = 8\\end{cases}\\)',
          steps: [
            { action: 'Observa que 2y y -2y se cancelan', why: 'Los coeficientes de y son opuestos', formula: '', result: '' },
            { action: 'Suma las ecuaciones', why: 'Elimina y', formula: '8x = 24', result: 'x = 3' },
            { action: 'Sustituye x=3 en ec.1', why: 'Para encontrar y', formula: '3(3)+2y=16 → 2y=7', result: 'y = 3.5' }
          ]
        }
      ],
      visual: { type: 'coordinate_plane' },
      discovery: [
        {
          title: 'Sistema sin solución vs. infinitas soluciones',
          text: 'Dos rectas paralelas nunca se cruzan → sin solución. Dos rectas idénticas se superponen → infinitas soluciones.',
          question: '¿Cómo detectas sin resolver si las ecuaciones son paralelas? Compara las razones de los coeficientes.'
        }
      ],
      exercises: { topic: 'alg_sistemas', generators: [] },
      advanced: {
        title: 'Sistemas avanzados',
        challenges: [
          {
            title: 'Mezcla de precios',
            problem: 'Un kilo de café A y 2 de café B cuestan $3800. Dos de A y uno de B cuestan $4000. ¿Cuánto cuesta cada kilo?',
            hint: 'Sea A=x y B=y. Plantea el sistema y resuelve.',
            solution: 'Sistema: x+2y=3800, 2x+y=4000. Suma: 3x+3y=7800 → x+y=2600. Restando: x-y=200. Entonces x=$1400, y=$1200.'
          }
        ]
      }
    },

    // ════════════════════════════════════════════════
    // 9. INECUACIONES
    // ════════════════════════════════════════════════
    {
      id: 'alg-inecuaciones',
      courseId: 'algebra',
      topic: 'Inecuaciones',
      title: 'Cuando la solución es un intervalo, no un punto',
      level: 9,
      grades: '8°–2° Medio',
      duration: 35,
      xpReward: 145,
      icon: '📏',
      color: '#8B5CF6',
      summary: 'Aprende a resolver inecuaciones lineales y cuadráticas, y a representar sus soluciones en intervalos.',
      keyPoints: [
        'Al multiplicar/dividir por NEGATIVO: el signo de la inecuación se INVIERTE',
        'Solución de inecuación: un intervalo o unión de intervalos',
        'Corchete [ ] incluye el extremo; paréntesis ( ) lo excluye',
        'Inecuación cuadrática: analizar el signo entre las raíces'
      ],
      concept: {
        what: 'Una **inecuación** es una desigualdad con variables. En vez de encontrar un valor exacto, hallamos todos los valores que satisfacen la condición.',
        why: 'Las inecuaciones aparecen en optimización (máximos/mínimos), análisis de restricciones y economía.',
        realLife: [
          { icon: '🎡', text: 'Para subir al juego: altura ≥ 120 cm. Es una inecuación.' },
          { icon: '💊', text: 'Dosis segura de medicamento: \\(0 \\leq d \\leq 500\\) mg.' },
          { icon: '🏋️', text: 'Un ascensor soporta hasta 800 kg: \\(\\sum \\text{pesos} \\leq 800\\).' }
        ],
        commonErrors: [
          {
            title: 'No invertir al dividir/multiplicar por negativo',
            description: 'Si \\(-2x > 6\\), al dividir por -2: \\(x < -3\\) (el signo se INVIERTE). Este es el error más frecuente.'
          },
          {
            title: 'Confundir los símbolos de intervalo',
            description: '\\(x > 3\\) → \\((3, +\\infty)\\) — paréntesis porque 3 NO se incluye. \\(x \\geq 3\\) → \\([3, +\\infty)\\) — corchete porque 3 SÍ se incluye.'
          },
          {
            title: 'Error en inecuación cuadrática',
            description: 'Para \\(x^2-1>0\\): factoriza \\((x-1)(x+1)>0\\). Solución: \\(x<-1\\) o \\(x>1\\) (fuera del intervalo entre raíces).'
          }
        ]
      },
      examples: [
        {
          title: 'Inecuación lineal simple',
          problem: 'Resuelve: \\(-3x + 6 > 0\\)',
          steps: [
            { action: 'Pasa la constante', why: '', formula: '-3x > -6', result: '' },
            { action: 'Divide por -3', why: '¡Al dividir por negativo el signo se invierte!', formula: 'x < 2', result: '' },
            { action: 'Escribe el intervalo', why: '< significa paréntesis (no incluye 2)', formula: '', result: '\\(x \\in (-\\infty, 2)\\)' }
          ]
        },
        {
          title: 'Inecuación cuadrática',
          problem: 'Resuelve: \\(x^2 - 5x + 6 < 0\\)',
          steps: [
            { action: 'Factoriza', why: 'Encuentra las raíces primero', formula: '(x-2)(x-3) < 0', result: '' },
            { action: 'Identifica las raíces', why: 'x=2 y x=3 son los puntos críticos', formula: '', result: '' },
            { action: 'Analiza el signo', why: 'La parábola abre hacia arriba, es <0 ENTRE las raíces', formula: '', result: '\\(x \\in (2, 3)\\)' }
          ]
        }
      ],
      visual: { type: 'number_line' },
      discovery: [
        {
          title: 'Por qué se invierte el signo',
          text: 'Si \\(3 > 2\\) y multiplicamos por -1: \\(-3 < -2\\). El orden se invierte porque los negativos están "al revés" en la recta numérica.',
          question: 'Verifica: ¿Es cierto que -3 < -2 en la recta numérica? Marca ambos puntos.'
        }
      ],
      exercises: { topic: 'alg_inecuaciones', generators: [] },
      advanced: {
        title: 'Sistemas de inecuaciones',
        challenges: [
          {
            title: 'Sistema de inecuaciones lineales',
            problem: 'Resuelve el sistema: \\(x > 1\\) y \\(2x - 3 < 5\\)',
            hint: 'Resuelve cada inecuación por separado, luego encuentra la intersección.',
            solution: 'De la segunda: \\(2x<8\\) → \\(x<4\\). Intersección: \\(1<x<4\\), es decir \\(x \\in (1,4)\\).'
          }
        ]
      }
    },

    // ════════════════════════════════════════════════
    // 10. FUNCIONES
    // ════════════════════════════════════════════════
    {
      id: 'alg-funciones',
      courseId: 'algebra',
      topic: 'Funciones',
      title: 'Dependencia matemática entre cantidades',
      level: 10,
      grades: '1°–2° Medio',
      duration: 45,
      xpReward: 180,
      icon: '📉',
      color: '#8B5CF6',
      summary: 'Comprende el concepto de función, notación, dominio, recorrido y funciones compuestas.',
      keyPoints: [
        'Una función asigna a cada valor de x un único valor f(x)',
        'El dominio es el conjunto de valores de entrada válidos',
        'El recorrido (imagen) es el conjunto de valores de salida posibles',
        'Función compuesta: \\(f(g(x))\\) aplica primero g, luego f'
      ],
      concept: {
        what: 'Una **función** es una regla que a cada elemento del dominio le asigna exactamente UN elemento del recorrido. La notación \\(f(x)\\) se lee "f de x".',
        why: 'Las funciones son el lenguaje central de las matemáticas modernas: todo modelo matemático usa funciones para relacionar variables.',
        realLife: [
          { icon: '🌡️', text: 'La temperatura depende del tiempo: \\(T = f(t)\\). Para cada hora hay una temperatura.' },
          { icon: '📱', text: 'El costo de datos móviles es función del consumo: \\(\\text{costo} = f(\\text{MB usados})\\).' },
          { icon: '🚕', text: 'Tarifa de taxi: \\(f(km) = 2.5 + 1.8 \\cdot km\\). Cada distancia tiene un costo único.' }
        ],
        commonErrors: [
          {
            title: 'Confundir f(x) con f×x',
            description: '\\(f(3)\\) significa evaluar la función en x=3, NO multiplicar f por 3.'
          },
          {
            title: 'Error de dominio en raíces',
            description: '\\(f(x) = \\sqrt{x-2}\\) requiere \\(x-2 \\geq 0\\), es decir \\(x \\geq 2\\). No puedes evaluar en x=1.'
          },
          {
            title: 'Error en función compuesta: el orden importa',
            description: '\\(f(g(x)) \\neq g(f(x))\\) en general. Primero se aplica la función de adentro (g), luego la de afuera (f).'
          }
        ]
      },
      examples: [
        {
          title: 'Evaluar una función',
          problem: 'Para \\(f(x) = 2x^2 - 3x + 1\\), calcula \\(f(2)\\) y \\(f(-1)\\).',
          steps: [
            { action: 'Escribe la función con x=2', why: 'Reemplaza cada x por el valor 2', formula: '\\(f(2) = 2(\\mathbf{2})^2 - 3(\\mathbf{2}) + 1\\)', result: '' },
            { action: 'Resuelve la potencia primero', why: 'Por jerarquía de operaciones: potencias antes que multiplicación', formula: '\\(= 2 \\cdot 4 - 3 \\cdot 2 + 1\\)', result: '' },
            { action: 'Resuelve las multiplicaciones', why: 'Multiplicación antes que suma/resta', formula: '\\(= 8 - 6 + 1\\)', result: '' },
            { action: 'Suma y resta de izquierda a derecha', why: '', formula: '\\(= 2 + 1 = 3\\)', result: 'f(2) = 3 ✓' },
            { action: 'Ahora evalúa f(−1): escribe con x=−1', why: 'Usa paréntesis para evitar errores de signo', formula: '\\(f(-1) = 2(\\mathbf{-1})^2 - 3(\\mathbf{-1}) + 1\\)', result: '' },
            { action: 'Resuelve la potencia: (−1)² = +1', why: 'Número negativo elevado a potencia par → positivo', formula: '\\(= 2 \\cdot 1 - 3 \\cdot (-1) + 1\\)', result: '' },
            { action: 'Resuelve las multiplicaciones', why: '−3 × (−1) = +3', formula: '\\(= 2 + 3 + 1\\)', result: '' },
            { action: 'Suma final', why: '', formula: '\\(= 6\\)', result: 'f(−1) = 6 ✓' }
          ]
        },
        {
          title: 'Función compuesta',
          problem: 'Con \\(f(x) = x+3\\) y \\(g(x) = x^2\\), calcula \\(f(g(2))\\).',
          steps: [
            { action: 'Identifica el orden: primero la función interior', why: 'En f(g(x)) siempre se evalúa g primero, luego f', formula: '\\(f(g(2)) \\Rightarrow \\text{paso 1: calcular } g(2)\\)', result: '' },
            { action: 'Calcula g(2)', why: 'Sustituye x=2 en g(x)=x²', formula: '\\(g(2) = 2^2 = 4\\)', result: 'g(2) = 4' },
            { action: 'Ahora calcula f(g(2)) = f(4)', why: 'Usa el resultado anterior como entrada de f', formula: '\\(f(4) = 4 + 3\\)', result: '' },
            { action: 'Resultado final', why: '', formula: '\\(= 7\\)', result: 'f(g(2)) = 7 ✓' }
          ]
        },
        {
          title: 'Determinar el dominio',
          problem: 'Halla el dominio de \\(f(x) = \\dfrac{1}{\\sqrt{x-4}}\\).',
          steps: [
            { action: 'Identifica las restricciones de la función', why: 'Hay una raíz y una división, cada una impone condiciones', formula: '\\(f(x) = \\dfrac{1}{\\sqrt{x-4}}\\) → dos condiciones', result: '' },
            { action: 'Condición 1 — el radicando debe ser ≥ 0', why: 'No existe raíz cuadrada de número negativo (en reales)', formula: '\\(x - 4 \\geq 0 \\Rightarrow x \\geq 4\\)', result: '' },
            { action: 'Condición 2 — el denominador no puede ser 0', why: 'División por cero no está definida', formula: '\\(\\sqrt{x-4} \\neq 0 \\Rightarrow x - 4 \\neq 0 \\Rightarrow x \\neq 4\\)', result: '' },
            { action: 'Combina ambas condiciones', why: 'x≥4 pero x≠4, por tanto x debe ser estrictamente mayor que 4', formula: '\\(x > 4\\)', result: 'Dominio: \\((4,\\ +\\infty)\\) ✓' }
          ]
        }
      ],
      visual: { type: 'function_machine' },
      discovery: [
        {
          title: '¿Qué NO es una función?',
          text: 'La relación "dado un número, devuelvo sus raíces cuadradas" no es función: el número 9 tiene dos raíces (+3 y -3), violando la condición de asignación única.',
          question: '¿Es \\(x = y^2\\) una función de y? ¿O de x? Prueba con y=3 y y=-3.'
        }
      ],
      exercises: { topic: 'alg_funciones', generators: [] },
      advanced: {
        title: 'Función inversa y transformaciones',
        challenges: [
          {
            title: 'Encontrar la función inversa',
            problem: 'Halla \\(f^{-1}(x)\\) para \\(f(x) = 3x - 6\\).',
            hint: 'Reemplaza f(x) por y, despeja x y luego intercambia x e y.',
            solution: 'y=3x-6 → x=(y+6)/3 → \\(f^{-1}(x) = \\frac{x+6}{3}\\). Verifica: \\(f(f^{-1}(x))=3\\cdot\\frac{x+6}{3}-6=x\\) ✓'
          }
        ]
      }
    },

    // ════════════════════════════════════════════════
    // 11. SUCESIONES Y PROGRESIONES
    // ════════════════════════════════════════════════
    {
      id: 'alg-sucesiones',
      courseId: 'algebra',
      topic: 'Sucesiones y Progresiones',
      title: 'Patrones numéricos y su álgebra',
      level: 11,
      grades: '1°–2° Medio',
      duration: 40,
      xpReward: 165,
      icon: '🔢',
      color: '#8B5CF6',
      summary: 'Domina progresiones aritméticas y geométricas, sus fórmulas generales y sumas de n términos.',
      keyPoints: [
        'PA: diferencia constante \\(d\\) entre términos consecutivos. \\(a_n = a_1+(n-1)d\\)',
        'PG: razón constante \\(q\\) entre términos consecutivos. \\(a_n = a_1 \\cdot q^{n-1}\\)',
        'Suma PA: \\(S_n = \\dfrac{n(a_1+a_n)}{2}\\)',
        'Suma PG: \\(S_n = a_1 \\cdot \\dfrac{q^n-1}{q-1}\\) para \\(q\\neq 1\\)'
      ],
      concept: {
        what: 'Una **sucesión** es una lista ordenada de números con un patrón. Las **progresiones** son sucesiones donde el patrón es especialmente regular: suma constante (aritmética) o multiplicación constante (geométrica).',
        why: 'Las progresiones modelan crecimiento, interés compuesto, depreciación y múltiples patrones naturales y financieros.',
        realLife: [
          { icon: '🏦', text: 'Interés simple: \\(a_n = a_1 + (n-1) \\cdot r\\) — progresión aritmética.' },
          { icon: '💹', text: 'Interés compuesto: \\(a_n = a_1 \\cdot (1+r)^{n-1}\\) — progresión geométrica.' },
          { icon: '🔬', text: 'Crecimiento bacteriano: cada hora las bacterias se multiplican × k — PG.' },
          { icon: '📐', text: 'Los pisos de una pirámide: 1, 3, 5, 7, 9, … bloques — PA con d=2.' }
        ],
        commonErrors: [
          {
            title: 'Usar n en vez de (n-1) en la fórmula del término',
            description: 'El término \\(a_n = a_1 + (n-1)d\\) usa \\(n-1\\), no \\(n\\). Con \\(n=1\\): \\(a_1 = a_1 + 0 = a_1\\). ✓'
          },
          {
            title: 'Confundir d con a_n',
            description: 'La diferencia \\(d = a_2 - a_1\\), no \\(d = a_n\\). En 3, 7, 11, …: \\(d=4\\), no \\(d=7\\).'
          },
          {
            title: 'Aplicar la fórmula de PA a una PG',
            description: 'Identifica siempre primero el tipo: si las diferencias son constantes → PA. Si los cocientes son constantes → PG.'
          }
        ]
      },
      examples: [
        {
          title: 'Término de una PA',
          problem: 'En la PA: 5, 8, 11, 14, … ¿cuál es el término 20?',
          steps: [
            { action: 'Identifica a₁ y d', why: 'a₁=5, d=8-5=3', formula: '', result: '' },
            { action: 'Aplica la fórmula', why: '', formula: 'a₂₀ = 5 + (20-1)·3 = 5 + 57', result: 'a₂₀ = 62' }
          ]
        },
        {
          title: 'Suma de una PA',
          problem: 'Calcula la suma de los primeros 10 términos de 2, 5, 8, 11, …',
          steps: [
            { action: 'a₁=2, d=3, n=10', why: '', formula: 'a₁₀ = 2 + 9(3) = 29', result: '' },
            { action: 'Aplica la fórmula de suma', why: '', formula: 'S₁₀ = 10(2+29)/2 = 10·31/2', result: 'S₁₀ = 155' }
          ]
        },
        {
          title: 'Término de una PG',
          problem: 'En la PG: 3, 6, 12, 24, … ¿cuál es el término 7?',
          steps: [
            { action: 'Identifica a₁ y q', why: 'a₁=3, q=6/3=2', formula: '', result: '' },
            { action: 'Aplica la fórmula', why: '', formula: 'a₇ = 3·2⁶ = 3·64', result: 'a₇ = 192' }
          ]
        }
      ],
      visual: { type: 'sequence_pattern' },
      discovery: [
        {
          title: 'La historia de Gauss',
          text: 'Cuenta la leyenda que el matemático Gauss, siendo niño, sumó 1+2+3+…+100 en segundos notando que 1+100=101, 2+99=101, etc. Hay 50 pares × 101 = 5050.',
          question: '¿Cuál es la fórmula que Gauss usó intuitivamente? ¿Es igual a la fórmula de la suma de PA?'
        }
      ],
      exercises: { topic: 'alg_sucesiones', generators: [] },
      advanced: {
        title: 'Progresiones aplicadas',
        challenges: [
          {
            title: 'Interés compuesto',
            problem: 'Depositas $10,000 a un interés del 5% anual compuesto. ¿Cuánto tienes después de 8 años? (PG con q=1.05)',
            hint: 'Es una PG: a₁=10000, q=1.05, n=8.',
            solution: '\\(a_8 = 10000 \\cdot 1.05^7 \\approx 10000 \\times 1.4071 \\approx \\$14{,}071\\)'
          },
          {
            title: 'Insertar medios aritméticos',
            problem: 'Inserta 4 medios aritméticos entre 3 y 23.',
            hint: 'Se forman 6 términos en total. Usa a₆=23=3+5d para hallar d.',
            solution: 'd=4. La sucesión es: 3, 7, 11, 15, 19, 23.'
          }
        ]
      }
    }

  ];

  // ── Registro en window.MM_LESSONS y window.MM_LESSON_MAP ──
  if (!window.MM_LESSONS) window.MM_LESSONS = [];
  LESSONS.forEach(lesson => {
    if (lesson.exercises && lesson.exercises.topic && window.MM_TOPIC_GENERATORS) {
      const gens = window.MM_TOPIC_GENERATORS[lesson.exercises.topic];
      if (gens && gens.length) lesson.exercises.generators = gens;
    }
    const existing = window.MM_LESSONS.findIndex(l => l.id === lesson.id);
    if (existing !== -1) window.MM_LESSONS.splice(existing, 1);
    window.MM_LESSONS.push(lesson);
  });
  if (!window.MM_LESSON_MAP) window.MM_LESSON_MAP = {};
  LESSONS.forEach(l => { window.MM_LESSON_MAP[l.id] = l; });

  console.log('[MM] content-algebra.js cargado:', LESSONS.length, 'lecciones de Álgebra');
})();
