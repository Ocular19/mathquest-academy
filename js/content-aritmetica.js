/* ═══════════════════════════════════════════════════════════════
   CONTENT-ARITMETICA.JS — Contenido completo de 15 lecciones
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  const LESSONS = [

    // ── 1. NÚMEROS NATURALES ──────────────────────────────────────
    {
      id: 'arit-naturales',
      courseId: 'aritmetica',
      topic: 'Números Naturales',
      title: 'Números Naturales: el origen del contar',
      level: 1,
      grades: '1°–3° Básico',
      duration: 25,
      xpReward: 120,
      icon: '🔢',
      color: '#F59E0B',
      summary: 'Los números naturales son los que usamos para contar objetos del mundo real. Son la base de toda la aritmética.',
      keyPoints: [
        'Los naturales son: 0, 1, 2, 3, 4, 5, …',
        'Cada posición en un número tiene un valor (valor posicional)',
        'Se pueden comparar y ordenar en la recta numérica',
        'Las cuatro operaciones básicas: suma, resta, multiplicación y división'
      ],
      concept: {
        what: 'Los **números naturales** son el conjunto {0, 1, 2, 3, 4, …}. Son infinitos y sirven para contar, ordenar y medir cantidades enteras.',
        why: 'Desde la antigüedad, el ser humano necesitó contar objetos: ganado, monedas, días. Los números naturales son la primera herramienta matemática de la humanidad.',
        realLife: [
          { icon: '🛒', text: 'Contar cuántos artículos hay en el carrito del supermercado.' },
          { icon: '📅', text: 'El número de días de un mes (28, 29, 30 o 31).' },
          { icon: '🏠', text: 'El número de una calle o de un apartamento.' },
          { icon: '🏆', text: 'El marcador de un partido de fútbol.' }
        ],
        commonErrors: [
          { title: 'Confundir "cero" con "nada"', description: 'El cero (0) ES un número natural y tiene valor posicional. En 305, el 0 indica que no hay decenas, pero sí hay centenas y unidades.' },
          { title: 'Mezclar valor posicional con valor del dígito', description: 'En 347, el dígito 4 tiene valor 40 (cuatro decenas), no simplemente 4.' },
          { title: 'Llevar mal en sumas largas', description: 'Al sumar columna a columna, si el resultado supera 9 debes "llevar" la decena a la columna siguiente.' }
        ]
      },
      examples: [
        {
          title: 'Valor posicional',
          problem: '¿Cuánto vale el dígito 6 en el número 4.628?',
          steps: [
            { action: 'Identificar la posición', why: 'De derecha a izquierda: unidades (8), decenas (2), centenas (6), millares (4).', result: 'El 6 está en la posición de las centenas.' },
            { action: 'Calcular el valor', why: 'Las centenas valen 100 cada una.', formula: '6 × 100 = 600', result: 'El valor del 6 es 600.' }
          ]
        },
        {
          title: 'Suma con llevada',
          problem: 'Calcula 478 + 365',
          steps: [
            { action: 'Suma las unidades', why: '8 + 5 = 13. Escribo 3 y llevo 1.', result: 'Unidades: 3, llevada: 1' },
            { action: 'Suma las decenas', why: '7 + 6 + 1 (llevada) = 14. Escribo 4 y llevo 1.', result: 'Decenas: 4, llevada: 1' },
            { action: 'Suma las centenas', why: '4 + 3 + 1 (llevada) = 8.', result: '478 + 365 = 843' }
          ]
        }
      ],
      visual: { type: 'abacus' },
      discovery: [
        { title: '¿Cuántos naturales hay?', text: 'Los números naturales son infinitos. Cualquier número que imagines, siempre puedes sumarle 1 y obtienes otro mayor.', question: '¿Cuál es el número natural más grande que conoces? ¿Puedes encontrar uno mayor?' },
        { title: 'El poder del cero', text: 'El cero fue inventado en la India hace unos 1500 años. Sin el cero, no existiría la numeración posicional moderna.', question: 'Sin el cero, ¿cómo escribirías el número 305?' }
      ],
      exercises: { topic: 'naturales', generators: MM_TOPIC_GENERATORS['naturales'] || [] },
      advanced: {
        title: 'Desafíos con Números Naturales',
        challenges: [
          { title: 'El número misterioso', problem: 'Soy un número de 5 cifras. Mi dígito de las decenas de millar es 3. La suma de todos mis dígitos es 20. ¿Quién soy? (da un ejemplo)', hint: '3???? donde los dígitos suman 20 − 3 = 17.', solution: 'Ejemplo: 38900 → 3+8+9+0+0=20. Hay múltiples soluciones válidas.' },
          { title: 'Campeonato de multiplicación', problem: 'Calcula \\(999 \\times 111\\) usando distribución (no calculadora).', hint: '999 × 111 = 1000×111 − 111.', solution: '111000 − 111 = 110889' }
        ]
      }
    },

    // ── 2. NÚMEROS ENTEROS ────────────────────────────────────────
    {
      id: 'arit-enteros',
      courseId: 'aritmetica',
      topic: 'Números Enteros',
      title: 'Números Enteros: más allá del cero',
      level: 2,
      grades: '4°–6° Básico',
      duration: 30,
      xpReward: 150,
      icon: '↔️',
      color: '#EF4444',
      summary: 'Los enteros extienden los naturales hacia los negativos, permitiendo representar deudas, temperaturas bajo cero y posiciones debajo del nivel del mar.',
      keyPoints: [
        'El conjunto de enteros: … −3, −2, −1, 0, 1, 2, 3, …',
        'Regla de signos: (−) × (−) = (+), (−) × (+) = (−)',
        'El valor absoluto |n| es la distancia al cero',
        'La recta numérica se extiende en ambas direcciones'
      ],
      concept: {
        what: 'Los **números enteros** incluyen los naturales y sus negativos: \\(\\mathbb{Z} = \\{\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\}\\).',
        why: 'Para representar deudas, temperaturas bajo cero, pisos subterráneos o pérdidas de puntos en un juego, necesitamos números menores que cero.',
        realLife: [
          { icon: '🌡️', text: 'Temperatura de −12°C en la Antártida.' },
          { icon: '💳', text: 'Saldo bancario negativo (deuda).' },
          { icon: '🏔️', text: 'Valle de la Muerte: −86 m bajo el nivel del mar.' },
          { icon: '🎮', text: 'Perder 50 puntos en un videojuego.' }
        ],
        commonErrors: [
          { title: 'Regla de signos en multiplicación', description: '(−5) × (−3) = +15, NO −15. Dos negativos se cancelan.' },
          { title: 'Restar un negativo', description: '5 − (−3) = 5 + 3 = 8. Restar un negativo es lo mismo que sumar el positivo.' },
          { title: 'Confundir mayor/menor', description: '−2 > −10 aunque 2 < 10. En los negativos, el de mayor valor absoluto es el menor.' }
        ]
      },
      examples: [
        {
          title: 'Operaciones con signos',
          problem: 'Calcula: (−8) + 5 − (−3)',
          steps: [
            { action: 'Resolver restar negativo', why: 'Restar un negativo = sumar el positivo.', formula: '−(−3) = +3', result: '(−8) + 5 + 3' },
            { action: 'Sumar de izquierda a derecha', why: '', formula: '−8 + 5 = −3', result: '−3 + 3 = 0' }
          ]
        },
        {
          title: 'Multiplicación de enteros',
          problem: 'Calcula: (−4) × (−3) × (−2)',
          steps: [
            { action: 'Multiplicar los dos primeros', why: '(−) × (−) = (+)', formula: '(−4) × (−3) = 12', result: '12 × (−2)' },
            { action: 'Multiplicar el resultado', why: '(+) × (−) = (−)', formula: '12 × (−2) = −24', result: '−24' }
          ]
        }
      ],
      visual: { type: 'number-line' },
      discovery: [
        { title: 'La deuda como número', text: 'Si tienes $100 y debes $150, tu saldo es −$50. Los bancos usan enteros negativos todo el tiempo.', question: 'Si tu cuenta tiene −$200 y depositas $350, ¿cuál es el nuevo saldo?' }
      ],
      exercises: { topic: 'enteros', generators: [] },
      advanced: {
        title: 'Desafíos con Enteros',
        challenges: [
          { title: 'Cadena de signos', problem: '¿Cuánto vale \\((−1)^{2026}\\)?', hint: 'Analiza la paridad del exponente.', solution: '\\((−1)^{\\text{par}} = 1\\). Resultado: 1.' },
          { title: 'Temperatura', problem: 'La temperatura baja 3°C cada hora. Si ahora es −2°C, ¿cuál será en 5 horas?', hint: 'Suma: −2 + 5×(−3)', solution: '−2 − 15 = −17°C' }
        ]
      }
    },

    // ── 3. OPERACIONES COMBINADAS ─────────────────────────────────
    {
      id: 'arit-operaciones',
      courseId: 'aritmetica',
      topic: 'Operaciones Combinadas',
      title: 'Jerarquía de Operaciones: el orden importa',
      level: 2,
      grades: '5°–7° Básico',
      duration: 30,
      xpReward: 150,
      icon: '🧮',
      color: '#8B5CF6',
      summary: 'Cuando una expresión tiene varias operaciones, el orden en que se realizan determina el resultado. PEMDAS establece la jerarquía correcta.',
      keyPoints: [
        'PEMDAS: Paréntesis, Exponentes, Multiplicación/División, Suma/Resta',
        'Las operaciones del mismo nivel se resuelven de izquierda a derecha',
        'Los paréntesis anidados se resuelven desde el más interno',
        'No aplicar PEMDAS es el error más común en matemáticas'
      ],
      concept: {
        what: 'La **jerarquía de operaciones** (PEMDAS/BODMAS) establece el orden correcto para resolver expresiones con múltiples operaciones.',
        why: 'Sin un orden establecido, \\(2 + 3 \\times 4\\) podría dar 20 (si sumas primero) o 14 (si multiplicas primero). El resultado correcto es 14.',
        realLife: [
          { icon: '💻', text: 'Las computadoras siguen PEMDAS exactamente al calcular expresiones.' },
          { icon: '📐', text: 'Las fórmulas de física y química requieren jerarquía correcta.' }
        ],
        commonErrors: [
          { title: 'Sumar antes de multiplicar', description: '2 + 3 × 4 ≠ 20. Primero: 3 × 4 = 12. Luego: 2 + 12 = 14.' },
          { title: 'Ignorar los paréntesis', description: '(2 + 3) × 4 = 20, pero 2 + 3 × 4 = 14. ¡Los paréntesis cambian todo!' }
        ]
      },
      examples: [
        {
          title: 'PEMDAS en acción',
          problem: 'Calcula: \\(3 + 2 \\times (8 - 5)^2 \\div 3\\)',
          steps: [
            { action: 'Paréntesis', why: 'Primero lo de dentro.', formula: '(8 − 5) = 3', result: '3 + 2 × 3² ÷ 3' },
            { action: 'Exponentes', why: '', formula: '3² = 9', result: '3 + 2 × 9 ÷ 3' },
            { action: 'Multiplicación/División (izq→der)', why: '', formula: '2 × 9 = 18; 18 ÷ 3 = 6', result: '3 + 6' },
            { action: 'Suma', why: '', formula: '3 + 6 = 9', result: '9' }
          ]
        }
      ],
      visual: { type: 'order-of-operations' },
      discovery: [
        { title: 'Cambia el paréntesis, cambia el resultado', text: 'La expresión 2 + 3 × 4 y (2 + 3) × 4 dan resultados distintos.', question: '¿Puedes escribir una expresión que dé 10 usando los números 2, 3, 4 y una operación de cada tipo?' }
      ],
      exercises: { topic: 'operaciones', generators: [] },
      advanced: {
        title: 'Desafíos con Operaciones Combinadas',
        challenges: [
          { title: 'Coloca los paréntesis', problem: 'Coloca paréntesis en \\(8 ÷ 2 + 2 × 2\\) para obtener el mayor resultado posible.', hint: 'Prueba distintas posiciones.', solution: '\\(8 ÷ (2+2) × 2 = 4\\), \\((8 ÷ 2 + 2) × 2 = 20\\). El mayor es 20.' }
        ]
      }
    },

    // ── 4. POTENCIAS ─────────────────────────────────────────────
    {
      id: 'arit-potencias',
      courseId: 'aritmetica',
      topic: 'Potencias',
      title: 'Potencias: multiplicación repetida',
      level: 2,
      grades: '5°–8° Básico',
      duration: 30,
      xpReward: 160,
      icon: '⬆️',
      color: '#F59E0B',
      summary: 'Una potencia es una forma abreviada de escribir multiplicaciones repetidas. Las potencias aparecen en el crecimiento exponencial, el dinero y la ciencia.',
      keyPoints: [
        '\\(a^n = a \\times a \\times \\ldots \\times a\\) (n veces)',
        'Propiedades: \\(a^m \\cdot a^n = a^{m+n}\\), \\((a^m)^n = a^{mn}\\)',
        'Todo número elevado a 0 es 1 (excepto 0⁰)',
        'Base negativa: \\((-a)^n\\) es positivo si n es par, negativo si n es impar'
      ],
      concept: {
        what: '\\(a^n\\) (a elevado a n) significa multiplicar a por sí mismo n veces. Se llama **potencia**, **base** a, y **exponente** a n.',
        why: 'Las potencias permiten escribir números muy grandes de forma compacta. El universo observable tiene unos \\(10^{80}\\) átomos.',
        realLife: [
          { icon: '🦠', text: 'Una bacteria se duplica cada hora: \\(2^{24} \\approx 16\\) millones en un día.' },
          { icon: '💰', text: 'El interés compuesto usa potencias: \\(C(1+r)^n\\).' },
          { icon: '🌍', text: 'El área de un cuadrado de lado 5: \\(5^2 = 25\\) m².' }
        ],
        commonErrors: [
          { title: 'Confundir potencia con multiplicación', description: '\\(2^3 = 8\\), NO 6. No es 2 × 3, es 2 × 2 × 2.' },
          { title: 'Base negativa sin paréntesis', description: '\\(-2^4 = -16\\) pero \\((-2)^4 = 16\\). ¡Los paréntesis importan!' }
        ]
      },
      examples: [
        {
          title: 'Propiedades de las potencias',
          problem: 'Simplifica: \\(2^3 \\times 2^4 \\div 2^2\\)',
          steps: [
            { action: 'Producto de potencias', why: 'Misma base: sumar exponentes.', formula: '\\(2^3 × 2^4 = 2^{3+4} = 2^7\\)', result: '\\(2^7 \\div 2^2\\)' },
            { action: 'Cociente de potencias', why: 'Misma base: restar exponentes.', formula: '\\(2^7 ÷ 2^2 = 2^{7-2} = 2^5\\)', result: '\\(2^5 = 32\\)' }
          ]
        }
      ],
      visual: { type: 'exponent-grid' },
      discovery: [
        { title: 'Crecimiento exponencial', text: 'Si doblas un papel de 0.1 mm 42 veces, sería más alto que la distancia a la Luna (384,000 km).', question: '¿Cuánto mide \\(0.1 \\times 2^{42}\\) mm? Conviértelo a km.' }
      ],
      exercises: { topic: 'potencias', generators: [] },
      advanced: {
        title: 'Desafíos con Potencias',
        challenges: [
          { title: 'Último dígito', problem: '¿Cuál es el último dígito de \\(7^{2026}\\)?', hint: 'Busca el patrón de los últimos dígitos de las potencias de 7: 7,9,3,1,7,9,3,1…', solution: '2026 mod 4 = 2, así que el último dígito es 9.' }
        ]
      }
    },

    // ── 5. RAÍCES ─────────────────────────────────────────────────
    {
      id: 'arit-raices',
      courseId: 'aritmetica',
      topic: 'Raíces',
      title: 'Raíces: la operación inversa a la potencia',
      level: 2,
      grades: '6°–8° Básico',
      duration: 30,
      xpReward: 160,
      icon: '√',
      color: '#10B981',
      summary: 'La raíz cuadrada de n es el número que al cuadrado da n. Las raíces aparecen en el Teorema de Pitágoras y la física.',
      keyPoints: [
        '\\(\\sqrt{a}\\) es el número positivo cuyo cuadrado es a',
        'Raíz cuadrada solo de números positivos (en los reales)',
        'Números irracionales: \\(\\sqrt{2}, \\sqrt{3}\\) no son fracciones exactas',
        'Simplificación: \\(\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}\\)'
      ],
      concept: {
        what: 'La **raíz cuadrada** \\(\\sqrt{n}\\) es el número positivo que al elevarse al cuadrado da n. La raíz cúbica \\(\\sqrt[3]{n}\\) es el número que al cubo da n.',
        why: 'En un cuadrado de área 25 m², el lado mide \\(\\sqrt{25} = 5\\) m. En el Teorema de Pitágoras, la hipotenusa es \\(\\sqrt{a^2+b^2}\\).',
        realLife: [
          { icon: '📐', text: 'El lado de un cuadrado con área 64 m² es \\(\\sqrt{64} = 8\\) m.' },
          { icon: '🏗️', text: 'Ingenieros usan raíces para calcular tensiones y frecuencias.' }
        ],
        commonErrors: [
          { title: 'Raíz cuadrada de suma', description: '\\(\\sqrt{9+16} \\neq \\sqrt{9}+\\sqrt{16} = 3+4 = 7\\). En realidad \\(\\sqrt{25} = 5\\).' },
          { title: 'Raíz de número negativo', description: '\\(\\sqrt{-4}\\) no existe en los reales.' }
        ]
      },
      examples: [
        {
          title: 'Simplificar una raíz',
          problem: 'Simplifica \\(\\sqrt{72}\\)',
          steps: [
            { action: 'Factorizar', why: 'Busca el cuadrado perfecto mayor contenido en 72.', formula: '72 = 36 × 2', result: '\\(\\sqrt{36 \\times 2}\\)' },
            { action: 'Separar la raíz', why: '\\(\\sqrt{ab} = \\sqrt{a}\\sqrt{b}\\)', formula: '\\(\\sqrt{36} \\times \\sqrt{2}\\)', result: '\\(6\\sqrt{2}\\)' }
          ]
        }
      ],
      visual: { type: 'square-grid' },
      discovery: [
        { title: 'Irracionales a nuestro alrededor', text: '\\(\\sqrt{2} \\approx 1.41421356…\\) Los decimales nunca se repiten ni terminan.', question: '¿Cuántos decimales de \\(\\sqrt{2}\\) puedes calcular a mano?' }
      ],
      exercises: { topic: 'raices', generators: [] },
      advanced: {
        title: 'Desafíos con Raíces',
        challenges: [
          { title: 'Anidadas', problem: '¿Cuánto vale \\(\\sqrt{\\sqrt{256}}\\)?', hint: 'Calcula de adentro hacia afuera.', solution: '\\(\\sqrt{256}=16\\), \\(\\sqrt{16}=4\\).' }
        ]
      }
    },

    // ── 6. DIVISIBILIDAD ──────────────────────────────────────────
    {
      id: 'arit-divisibilidad',
      courseId: 'aritmetica',
      topic: 'Divisibilidad',
      title: 'Divisibilidad y Criterios',
      level: 2,
      grades: '4°–6° Básico',
      duration: 25,
      xpReward: 130,
      icon: '÷',
      color: '#3B82F6',
      summary: 'Un número es divisible por otro cuando la división es exacta (sin resto). Los criterios de divisibilidad permiten saberlo sin dividir.',
      keyPoints: [
        'Divisible por 2: termina en cifra par',
        'Divisible por 3: suma de dígitos múltiplo de 3',
        'Divisible por 5: termina en 0 o 5',
        'Número primo: solo divisible por 1 y por sí mismo'
      ],
      concept: {
        what: 'a es **divisible** por b si \\(a \\div b\\) da resto 0. Se escribe \\(b \\mid a\\).',
        why: 'Los criterios de divisibilidad nos ahorran tiempo: sin dividir podemos saber si 123.456 es divisible por 3 (sí: 1+2+3+4+5+6=21).',
        realLife: [
          { icon: '🍕', text: 'Repartir 24 pizzas en grupos iguales: 24 es divisible por 1,2,3,4,6,8,12,24.' },
          { icon: '🔐', text: 'La criptografía RSA usa números primos de cientos de dígitos.' }
        ],
        commonErrors: [
          { title: 'Criterio del 6', description: 'Un número es divisible por 6 si es divisible por 2 Y por 3 a la vez.' },
          { title: 'Primo vs. impar', description: 'No todos los números impares son primos (ej: 9 = 3×3). Y 2 es primo aunque es par.' }
        ]
      },
      examples: [
        {
          title: 'Factorización en primos',
          problem: 'Descompón 60 en factores primos.',
          steps: [
            { action: '60 ÷ 2 = 30', why: '60 es par.', result: '60 = 2 × 30' },
            { action: '30 ÷ 2 = 15', why: '30 es par.', result: '= 2 × 2 × 15' },
            { action: '15 ÷ 3 = 5', why: '1+5=6, divisible por 3.', result: '= 2² × 3 × 5' },
            { action: '5 es primo', why: '', result: '60 = 2² × 3 × 5' }
          ]
        }
      ],
      visual: { type: 'factor-tree' },
      discovery: [
        { title: 'La Criba de Eratóstenes', text: 'Un método del siglo III a.C. para encontrar todos los primos hasta n: tacha los múltiplos de cada primo.', question: '¿Cuántos primos hay entre 1 y 100?' }
      ],
      exercises: { topic: 'divisibilidad', generators: [] },
      advanced: {
        title: 'Desafíos con Divisibilidad',
        challenges: [
          { title: 'Conjetura de Goldbach', problem: 'La conjetura de Goldbach dice que todo número par mayor que 2 es suma de dos primos. Verifica con 28.', hint: '28 = ? + ?', solution: '28 = 5 + 23 (también 11 + 17).' }
        ]
      }
    },

    // ── 7. MCD ────────────────────────────────────────────────────
    {
      id: 'arit-mcd',
      courseId: 'aritmetica',
      topic: 'MCD',
      title: 'Máximo Común Divisor (MCD)',
      level: 2,
      grades: '5°–7° Básico',
      duration: 25,
      xpReward: 140,
      icon: '⬇️',
      color: '#06B6D4',
      summary: 'El MCD de varios números es el mayor divisor que tienen en común. Se usa para simplificar fracciones y resolver problemas de reparto.',
      keyPoints: [
        'MCD(a, b): mayor divisor común a a y b',
        'Algoritmo de Euclides: MCD(a,b) = MCD(b, a mod b)',
        'Si MCD(a,b)=1, los números son coprimos',
        'Factorización: MCD = producto de factores primos comunes con menor exponente'
      ],
      concept: {
        what: 'El **Máximo Común Divisor** de a y b es el mayor entero que divide exactamente a ambos.',
        why: 'Para simplificar \\(\\frac{12}{18}\\), dividimos numerador y denominador por MCD(12,18)=6, obteniendo \\(\\frac{2}{3}\\).',
        realLife: [
          { icon: '🎁', text: 'Repartir 24 galletas y 36 chocolates en grupos iguales del mayor tamaño posible: MCD(24,36)=12 grupos.' }
        ],
        commonErrors: [
          { title: 'Confundir MCD con MCM', description: 'MCD ≤ cualquier número dado. MCM ≥ cualquier número dado.' }
        ]
      },
      examples: [
        {
          title: 'Algoritmo de Euclides',
          problem: 'Calcula MCD(48, 18)',
          steps: [
            { action: '48 = 2×18 + 12', why: '48 ÷ 18 = 2 resto 12', result: 'MCD(48,18) = MCD(18,12)' },
            { action: '18 = 1×12 + 6', why: '18 ÷ 12 = 1 resto 6', result: 'MCD(18,12) = MCD(12,6)' },
            { action: '12 = 2×6 + 0', why: '12 ÷ 6 = 2 resto 0', result: 'MCD(12,6) = 6' }
          ]
        }
      ],
      visual: { type: 'venn-factors' },
      discovery: [
        { title: 'El algoritmo más antiguo del mundo', text: 'El algoritmo de Euclides (300 a.C.) sigue siendo uno de los algoritmos más eficientes para calcular el MCD.', question: 'Calcula MCD(1071, 462) usando el algoritmo de Euclides paso a paso.' }
      ],
      exercises: { topic: 'mcd', generators: [] },
      advanced: {
        title: 'Desafíos con MCD',
        challenges: [
          { title: 'Identidad de Bézout', problem: 'Para MCD(15,7)=1, encuentra enteros x e y tales que 15x + 7y = 1.', hint: 'Usa el algoritmo extendido de Euclides.', solution: '15×1 + 7×(−2) = 15 − 14 = 1.' }
        ]
      }
    },

    // ── 8. MCM ────────────────────────────────────────────────────
    {
      id: 'arit-mcm',
      courseId: 'aritmetica',
      topic: 'MCM',
      title: 'Mínimo Común Múltiplo (MCM)',
      level: 2,
      grades: '5°–7° Básico',
      duration: 25,
      xpReward: 140,
      icon: '⬆️',
      color: '#7C3AED',
      summary: 'El MCM es el menor número que es múltiplo a la vez de varios números. Se usa para sumar fracciones y sincronizar eventos.',
      keyPoints: [
        'MCM(a,b) = (a×b) ÷ MCD(a,b)',
        'Factorización: MCM = producto de factores primos con mayor exponente',
        'MCM siempre ≥ que cualquier número dado',
        'Se usa como denominador común al sumar fracciones'
      ],
      concept: {
        what: 'El **Mínimo Común Múltiplo** de a y b es el menor entero positivo que es múltiplo de ambos.',
        why: 'Para sumar \\(\\frac{1}{4} + \\frac{1}{6}\\) necesitamos MCM(4,6)=12 como denominador común.',
        realLife: [
          { icon: '🚌', text: 'Dos buses salen cada 12 y cada 15 minutos. MCM(12,15)=60: coinciden cada hora.' },
          { icon: '📆', text: '¿Cada cuántos años coinciden los ciclos de 4 y 7 años? MCM(4,7)=28 años.' }
        ],
        commonErrors: [
          { title: 'MCM ≠ producto', description: 'MCM(4,6) ≠ 24. Es 12. El MCM puede ser menor que el producto cuando los números comparten factores.' }
        ]
      },
      examples: [
        {
          title: 'MCM por factorización',
          problem: 'Calcula MCM(12, 18)',
          steps: [
            { action: 'Factorizar', why: '', formula: '12 = 2²×3, 18 = 2×3²', result: 'Factores: 2 y 3' },
            { action: 'Mayor exponente de cada factor', why: '', formula: '\\(2^2 \\times 3^2\\)', result: '4 × 9 = 36' }
          ]
        }
      ],
      visual: { type: 'multiples-grid' },
      discovery: [
        { title: 'MCM y MCD juntos', text: 'Para cualesquiera a y b: MCD(a,b) × MCM(a,b) = a × b. ¡Siempre!', question: 'Verifica con a=6, b=10.' }
      ],
      exercises: { topic: 'mcm', generators: [] },
      advanced: {
        title: 'Desafíos con MCM',
        challenges: [
          { title: 'Ciclos planetarios', problem: 'Júpiter orbita en 12 años y Saturno en 30. ¿Cada cuántos años están en la misma posición (alineados)?', hint: 'MCM(12,30)', solution: 'MCM(12,30)=60 años.' }
        ]
      }
    },

    // ── 9. FRACCIONES ─────────────────────────────────────────────
    {
      id: 'arit-fracciones',
      courseId: 'aritmetica',
      topic: 'Fracciones',
      title: 'Fracciones: partes del todo',
      level: 2,
      grades: '3°–7° Básico',
      duration: 40,
      xpReward: 200,
      icon: '½',
      color: '#EC4899',
      summary: 'Las fracciones representan partes de un entero. Son la base de los números racionales y aparecen en recetas, planos y finanzas.',
      keyPoints: [
        'Fracción: \\(\\frac{a}{b}\\) con b ≠ 0. a=numerador, b=denominador',
        'Fracciones equivalentes: \\(\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6}\\)',
        'Para sumar/restar: igualar denominadores con MCM',
        'Para multiplicar: numerador × numerador, denominador × denominador'
      ],
      concept: {
        what: 'Una **fracción** \\(\\frac{a}{b}\\) representa a partes de un total dividido en b partes iguales.',
        why: 'Cortamos una pizza en 8 trozos y comemos 3: hemos comido \\(\\frac{3}{8}\\) de la pizza. Las fracciones modelan exactamente este tipo de situaciones.',
        realLife: [
          { icon: '🍕', text: '3/8 de una pizza.' },
          { icon: '📏', text: 'Una receta pide 3/4 de taza de harina.' },
          { icon: '🏗️', text: 'Un plano 1/100 significa que 1 cm representa 100 cm reales.' }
        ],
        commonErrors: [
          { title: 'Sumar denominadores', description: '\\(\\frac{1}{2} + \\frac{1}{3} \\neq \\frac{2}{5}\\). Primero iguala denominadores: \\(\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}\\).' },
          { title: 'No simplificar', description: 'Siempre simplifica al máximo dividiendo por el MCD.' }
        ]
      },
      examples: [
        {
          title: 'Suma de fracciones',
          problem: 'Calcula \\(\\frac{2}{3} + \\frac{3}{4}\\)',
          steps: [
            { action: 'Hallar MCM(3,4) = 12', why: 'Necesitamos denominador común.', result: '' },
            { action: 'Convertir', why: '', formula: '\\(\\frac{2}{3}=\\frac{8}{12}\\) y \\(\\frac{3}{4}=\\frac{9}{12}\\)', result: '\\(\\frac{8}{12}+\\frac{9}{12}\\)' },
            { action: 'Sumar numeradores', why: '', formula: '\\(\\frac{8+9}{12} = \\frac{17}{12}\\)', result: '\\(1\\frac{5}{12}\\)' }
          ]
        }
      ],
      visual: { type: 'fraction-pizza' },
      discovery: [
        { title: 'Fracciones en la historia', text: 'Los egipcios antiguos solo usaban fracciones unitarias (con numerador 1). Escribían \\(\\frac{2}{3}\\) como \\(\\frac{1}{2} + \\frac{1}{6}\\).', question: '¿Cómo escribirías \\(\\frac{3}{4}\\) con fracciones unitarias?' }
      ],
      exercises: { topic: 'fracciones', generators: [] },
      advanced: {
        title: 'Desafíos con Fracciones',
        challenges: [
          { title: 'Fracción continua', problem: 'Calcula \\(1 + \\dfrac{1}{1+\\dfrac{1}{1+\\dfrac{1}{1}}}\\)', hint: 'Trabaja de adentro hacia afuera.', solution: '\\(1+1/1=2\\), \\(1+1/2=3/2\\), \\(1+2/3=5/3\\). Resultado: \\(5/3\\).' }
        ]
      }
    },

    // ── 10. DECIMALES ────────────────────────────────────────────
    {
      id: 'arit-decimales',
      courseId: 'aritmetica',
      topic: 'Decimales',
      title: 'Números Decimales',
      level: 2,
      grades: '4°–7° Básico',
      duration: 30,
      xpReward: 150,
      icon: '🔣',
      color: '#06B6D4',
      summary: 'Los decimales son una forma de expresar fracciones usando la coma decimal. Se usan en dinero, medidas y porcentajes.',
      keyPoints: [
        'La coma separa la parte entera de la parte decimal',
        'Posiciones: décimas, centésimas, milésimas…',
        'Para sumar/restar: alinear las comas',
        'Para multiplicar: multiplicar normalmente y contar decimales'
      ],
      concept: {
        what: 'Un número decimal como 3,14 tiene parte entera (3) y parte decimal (14 centésimas = 0,14).',
        why: 'El sistema decimal extiende la numeración posicional hacia fracciones de la unidad, facilitando cálculos con dinero ($3.50) y medidas (1.75 m).',
        realLife: [
          { icon: '💵', text: '$1.250,75 — parte decimal son los centavos.' },
          { icon: '🏃', text: 'Record de 100m: 9,58 s.' },
          { icon: '⛽', text: 'El precio de la bencina en $/litro.' }
        ],
        commonErrors: [
          { title: 'No alinear la coma', description: 'Para sumar 12,5 + 1,35 debes alinear las comas: 12,50 + 1,35 = 13,85.' },
          { title: 'Contar mal los decimales al multiplicar', description: '2,3 × 1,4: 23×14=322, luego 2 decimales en total → 3,22.' }
        ]
      },
      examples: [
        {
          title: 'Multiplicación de decimales',
          problem: 'Calcula 3,14 × 2,5',
          steps: [
            { action: 'Multiplicar como enteros', why: '314 × 25 = 7850', result: '7850' },
            { action: 'Contar decimales totales', why: '3,14 tiene 2 decimales, 2,5 tiene 1 → total 3', result: '7,850' }
          ]
        }
      ],
      visual: { type: 'decimal-grid' },
      discovery: [
        { title: 'Decimales infinitos', text: '1/3 = 0,333… (infinitos treses). 1/7 = 0,142857142857… (6 dígitos que se repiten).', question: '¿Cuántos decimales distintos tiene 1/7?' }
      ],
      exercises: { topic: 'decimales', generators: [] },
      advanced: {
        title: 'Desafíos con Decimales',
        challenges: [
          { title: 'Decimal a fracción', problem: 'Convierte 0,363636… (periódico) a fracción.', hint: 'Sea x = 0,363636… → 100x = 36,363636…', solution: '100x − x = 36 → 99x = 36 → x = 36/99 = 4/11.' }
        ]
      }
    },

    // ── 11. RAZONES ──────────────────────────────────────────────
    {
      id: 'arit-razones',
      courseId: 'aritmetica',
      topic: 'Razones',
      title: 'Razones y Cocientes',
      level: 3,
      grades: '6°–8° Básico',
      duration: 25,
      xpReward: 150,
      icon: '⚖️',
      color: '#F59E0B',
      summary: 'Una razón compara dos cantidades del mismo tipo. Es la base de las proporciones, escalas y tasas de cambio.',
      keyPoints: [
        'Razón a:b = a/b (compara cantidades del mismo tipo)',
        'Se simplifica dividiendo por el MCD',
        'Razones equivalentes: 2:4 = 1:2',
        'Puede expresarse como fracción, decimal o porcentaje'
      ],
      concept: {
        what: 'Una **razón** a:b compara la magnitud a con la magnitud b, indicando cuántas veces a contiene a b.',
        why: 'Los mapas usan razones de escala (1:50.000). Las recetas usan razones (2:1 de harina y azúcar).',
        realLife: [
          { icon: '🗺️', text: 'Mapa 1:100.000: 1 cm en el mapa = 1 km real.' },
          { icon: '⚽', text: 'Ratio de victorias 3:1 (gana 3 de cada 4 partidos).' }
        ],
        commonErrors: [
          { title: 'El orden importa', description: 'La razón 3:5 ≠ 5:3. Siempre especifica qué se compara con qué.' }
        ]
      },
      examples: [
        {
          title: 'Simplificar una razón',
          problem: 'Simplifica la razón 24:36',
          steps: [
            { action: 'MCD(24,36) = 12', why: '', result: '' },
            { action: 'Dividir ambos términos por 12', why: '', formula: '24÷12 : 36÷12', result: '2:3' }
          ]
        }
      ],
      visual: { type: 'ratio-bar' },
      discovery: [
        { title: 'El número áureo', text: 'El número áureo φ ≈ 1,618 es la razón a:b donde a+b:a = a:b. Aparece en la naturaleza, el arte y la arquitectura.', question: '¿Puedes verificar que (1+√5)/2 ≈ 1,618?' }
      ],
      exercises: { topic: 'razones', generators: [] },
      advanced: {
        title: 'Desafíos con Razones',
        challenges: [
          { title: 'División proporcional', problem: 'Reparte $2400 entre A, B y C en razón 3:4:5.', hint: 'Total partes = 3+4+5=12. Valor de cada parte = 2400/12.', solution: 'A=$600, B=$800, C=$1000.' }
        ]
      }
    },

    // ── 12. PROPORCIONES ─────────────────────────────────────────
    {
      id: 'arit-proporciones',
      courseId: 'aritmetica',
      topic: 'Proporciones',
      title: 'Proporciones: razones iguales',
      level: 3,
      grades: '6°–8° Básico',
      duration: 30,
      xpReward: 160,
      icon: '⚖️',
      color: '#8B5CF6',
      summary: 'Dos razones son proporcionales cuando son iguales. Las proporciones permiten resolver problemas de escala, velocidad y mezclas.',
      keyPoints: [
        'Proporción: a:b = c:d ↔ a×d = b×c',
        'Directa: si una magnitud aumenta, la otra también',
        'Inversa: si una aumenta, la otra disminuye',
        'Regla de tres: técnica para encontrar el término faltante'
      ],
      concept: {
        what: 'Una **proporción** es la igualdad de dos razones: \\(\\frac{a}{b} = \\frac{c}{d}\\), equivalente a \\(a \\times d = b \\times c\\) (producto de medios = producto de extremos).',
        why: 'Si 3 litros de gasolina cuestan $5.400, podemos calcular el costo de cualquier cantidad usando proporciones.',
        realLife: [
          { icon: '🗺️', text: 'Escala de un mapa: si 2 cm son 5 km, ¿cuánto son 7 cm?' },
          { icon: '👨‍🍳', text: 'Receta: si 4 personas comen con 200g de arroz, ¿cuánto para 7?' }
        ],
        commonErrors: [
          { title: 'Confundir directa e inversa', description: 'Velocidad y tiempo para la misma distancia son inversamente proporcionales (más velocidad = menos tiempo).' }
        ]
      },
      examples: [
        {
          title: 'Proporción inversa',
          problem: '6 obreros terminan un muro en 10 días. ¿Cuántos días tardarán 15 obreros?',
          steps: [
            { action: 'Identificar tipo', why: 'Más obreros → menos días → proporción inversa.', result: '' },
            { action: 'k = 6 × 10 = 60', why: 'El producto es constante.', result: 'k = 60' },
            { action: 'Despejar', why: '15 × d = 60', formula: 'd = 60 / 15 = 4', result: '4 días' }
          ]
        }
      ],
      visual: { type: 'proportion-scale' },
      discovery: [
        { title: 'Tales y la pirámide', text: 'Tales de Mileto (600 a.C.) usó proporciones para medir la altura de las pirámides comparando su sombra con la sombra de un palo.', question: 'Si un palo de 1 m tiene sombra de 0,8 m y la pirámide tiene sombra de 200 m, ¿cuánto mide la pirámide?' }
      ],
      exercises: { topic: 'proporciones', generators: [] },
      advanced: {
        title: 'Desafíos con Proporciones',
        challenges: [
          { title: 'Mezcla de soluciones', problem: 'Mezclas 200 mL de solución al 30% con 300 mL al 50%. ¿Cuál es la concentración final?', hint: 'Total soluto = 200×0.3 + 300×0.5.', solution: '60 + 150 = 210 mL de soluto en 500 mL → 42%.' }
        ]
      }
    },

    // ── 13. PORCENTAJES ──────────────────────────────────────────
    {
      id: 'arit-porcentajes',
      courseId: 'aritmetica',
      topic: 'Porcentajes',
      title: 'Porcentajes: partes de cien',
      level: 2,
      grades: '5°–8° Básico',
      duration: 35,
      xpReward: 180,
      icon: '%',
      color: '#10B981',
      summary: 'El porcentaje expresa una cantidad como partes de 100. Aparece en descuentos, impuestos, estadísticas y finanzas.',
      keyPoints: [
        'x% = x/100',
        'Parte = Total × (porcentaje / 100)',
        'Porcentaje = (Parte / Total) × 100',
        'Aumento/descuento sucesivo: no es igual a la suma de los porcentajes'
      ],
      concept: {
        what: 'El **porcentaje** expresa una proporción como partes de cien: 25% = 25/100 = 0,25.',
        why: 'Un descuento de 20% en un producto de $10.000 cuesta exactamente $10.000 × 0,20 = $2.000 menos. Los porcentajes simplifican la comparación.',
        realLife: [
          { icon: '🛍️', text: 'Descuento del 30% en ropa.' },
          { icon: '🏦', text: 'Tasa de interés del 5% anual.' },
          { icon: '📊', text: 'El 60% de los estudiantes aprobó el examen.' }
        ],
        commonErrors: [
          { title: 'Descuentos sucesivos', description: '−20% y luego −10% ≠ −30%. Es: 0,80 × 0,90 = 0,72 → descuento total del 28%.' },
          { title: 'Porcentaje de porcentaje', description: 'El 50% del 50% es el 25%, no el 0%.' }
        ]
      },
      examples: [
        {
          title: 'IVA',
          problem: 'Un producto vale $8.500 neto. Con IVA del 19%, ¿cuánto se paga?',
          steps: [
            { action: 'Calcular el IVA', why: '', formula: '$8.500 × 19/100 = $1.615', result: 'IVA = $1.615' },
            { action: 'Precio final', why: '', formula: '$8.500 + $1.615 = $10.115', result: '$10.115' }
          ]
        }
      ],
      visual: { type: 'percentage-bar' },
      discovery: [
        { title: 'El problema del porcentaje', text: 'Si el precio sube 25% y luego baja 20%, ¿vuelve al precio original?', question: 'Prueba con $100. Sube 25% → $125. Baja 20% → ¿cuánto?' }
      ],
      exercises: { topic: 'porcentajes', generators: [] },
      advanced: {
        title: 'Desafíos con Porcentajes',
        challenges: [
          { title: 'Vuelta al precio original', problem: '¿Cuánto % hay que subir un precio que bajó 20% para volver al precio original?', hint: 'Si baja 20%, queda en 80%. Para volver a 100%: x% de 80% = 20%.', solution: '20/80 = 25%. Hay que subirlo un 25%.' }
        ]
      }
    },

    // ── 14. REGLA DE TRES ────────────────────────────────────────
    {
      id: 'arit-reglatres',
      courseId: 'aritmetica',
      topic: 'Regla de Tres',
      title: 'Regla de Tres: simples y compuestas',
      level: 3,
      grades: '6°–8° Básico',
      duration: 35,
      xpReward: 180,
      icon: '📐',
      color: '#F59E0B',
      summary: 'La regla de tres permite encontrar un valor desconocido cuando dos magnitudes son proporcionales. Es la herramienta más usada en matemática aplicada.',
      keyPoints: [
        'Directa: a₁/b₁ = a₂/b₂ (mismo sentido)',
        'Inversa: a₁×b₁ = a₂×b₂ (sentidos contrarios)',
        'Compuesta: múltiples variables relacionadas',
        'Identificar el tipo antes de plantear la ecuación'
      ],
      concept: {
        what: 'La **regla de tres** permite calcular un término desconocido cuando se conocen tres términos de una proporción.',
        why: 'Es la técnica más aplicada en la vida real: precios, recetas, velocidades, salarios, conversiones de unidades.',
        realLife: [
          { icon: '💱', text: 'Si 1 USD = 900 CLP, ¿cuánto son 250 USD?' },
          { icon: '⛽', text: 'Si un auto consume 7 L cada 100 km, ¿cuánto consume en 350 km?' }
        ],
        commonErrors: [
          { title: 'Plantear regla inversa como directa', description: 'Más trabajadores → MENOS días. Esta es inversa, no directa.' },
          { title: 'No identificar las magnitudes', description: 'Siempre asocia cada valor a su magnitud antes de plantear la proporción.' }
        ]
      },
      examples: [
        {
          title: 'Regla de tres directa',
          problem: 'Si 5 kg de arroz cuestan $3.500, ¿cuánto cuestan 8 kg?',
          steps: [
            { action: 'Organizar la tabla', why: '5 kg → $3.500; 8 kg → x', result: '5/3.500 = 8/x (directa)' },
            { action: 'Producto cruzado', why: '5×x = 3.500×8', formula: 'x = 28.000/5', result: 'x = $5.600' }
          ]
        }
      ],
      visual: { type: 'proportion-table' },
      discovery: [
        { title: 'La regla de tres en el tiempo', text: 'La regla de tres fue enseñada en Europa bajo el nombre "Regla de Oro" por ser tan útil para el comercio en la Edad Media.', question: 'Si un comerciante medieval ganaba 3 monedas en 4 días, ¿cuántas ganaba en un mes (30 días)?' }
      ],
      exercises: { topic: 'reglatres', generators: [] },
      advanced: {
        title: 'Desafíos con Regla de Tres',
        challenges: [
          { title: 'Llenado de estanque', problem: '3 cañerías llenan un estanque en 8 horas. ¿En cuántas horas lo llenan 6 cañerías? ¿Y si una de las 6 tiene la mitad del caudal de las otras?', hint: 'Parte 1: regla inversa. Parte 2: convierte capacidades.', solution: 'Parte 1: 4 h. Parte 2: 5 cañerías plenas + 0,5 = 5,5 unidades. k=24. 24/5,5 ≈ 4,36 h.' }
        ]
      }
    },

    // ── 15. PROBLEMAS APLICADOS ──────────────────────────────────
    {
      id: 'arit-aplicados',
      courseId: 'aritmetica',
      topic: 'Problemas Aplicados',
      title: 'Problemas Aplicados de Aritmética',
      level: 3,
      grades: '6°–8° Básico',
      duration: 40,
      xpReward: 200,
      icon: '🧩',
      color: '#6366F1',
      summary: 'Integración de todos los conceptos aritméticos para resolver problemas del mundo real: mezclas, movimiento, trabajo, edades y geometría.',
      keyPoints: [
        'Leer el problema completo antes de resolver',
        'Identificar qué se pide y qué datos hay',
        'Elegir la operación o técnica correcta',
        'Verificar que la respuesta tiene sentido en el contexto'
      ],
      concept: {
        what: 'Los **problemas aplicados** combinan varios conceptos aritméticos en situaciones reales. Requieren modelar la situación matemáticamente antes de calcular.',
        why: 'El objetivo de la aritmética no es calcular por calcular, sino resolver problemas del mundo: negociar precios, planificar viajes, diseñar estructuras.',
        realLife: [
          { icon: '🚗', text: 'Problema de movimiento: dos autos en sentidos contrarios.' },
          { icon: '🏗️', text: 'Problema de trabajo: cuántos obreros necesito para terminar a tiempo.' },
          { icon: '🧪', text: 'Problema de mezcla: concentración de soluciones.' }
        ],
        commonErrors: [
          { title: 'No leer bien el enunciado', description: 'Muchos errores vienen de leer apresuradamente. Subraya los datos y lo que se pide.' },
          { title: 'Unidades inconsistentes', description: 'Si la velocidad es km/h y el tiempo es minutos, debes convertir antes de operar.' }
        ]
      },
      examples: [
        {
          title: 'Problema de mezcla',
          problem: 'Se mezclan 3 kg de té a $800/kg con 5 kg a $1.200/kg. ¿Cuál es el precio promedio de la mezcla?',
          steps: [
            { action: 'Costo total', why: '', formula: '3×800 + 5×1200 = 2400 + 6000 = 8400', result: '$8.400' },
            { action: 'Cantidad total', why: '', formula: '3 + 5 = 8 kg', result: '8 kg' },
            { action: 'Precio promedio', why: '', formula: '8400 ÷ 8 = 1050', result: '$1.050/kg' }
          ]
        },
        {
          title: 'Problema de edades',
          problem: 'Ana tiene 12 años y su madre tiene 36. ¿En cuántos años la madre tendrá el doble de la edad de Ana?',
          steps: [
            { action: 'Plantear', why: 'Sea x el número de años.', formula: '36 + x = 2(12 + x)', result: '' },
            { action: 'Resolver', why: '36 + x = 24 + 2x → x = 12', result: 'En 12 años.' },
            { action: 'Verificar', why: '36+12=48, 12+12=24, 48=2×24 ✓', result: '12 años.' }
          ]
        }
      ],
      visual: { type: 'problem-diagram' },
      discovery: [
        { title: 'Estrategia de Polya', text: 'George Polya propuso 4 pasos para resolver cualquier problema: 1) Entender el problema, 2) Hacer un plan, 3) Ejecutar el plan, 4) Verificar.', question: 'Aplica los 4 pasos al problema: "Si compro 3 y vendo a $500 ganando el 25%, ¿a cuánto compré cada uno?"' }
      ],
      exercises: { topic: 'aplicados', generators: [] },
      advanced: {
        title: 'Desafíos Aplicados',
        challenges: [
          { title: 'El problema del granjero', problem: 'Un granjero tiene pollos y conejos. En total hay 20 cabezas y 56 patas. ¿Cuántos hay de cada animal?', hint: 'Pollos: 2 patas. Conejos: 4 patas. Sistema de ecuaciones.', solution: 'p + c = 20 y 2p + 4c = 56 → c = 8 conejos, p = 12 pollos.' },
          { title: 'Cisterna y cañerías', problem: 'Una cisterna se llena en 6 h con la cañería A. Con B se llena en 9 h. Con ambas y un desagüe que vacía en 18 h, ¿cuánto tarda en llenarse?', hint: 'Tasa neta = 1/6 + 1/9 − 1/18.', solution: '1/6+1/9−1/18 = 3/18+2/18−1/18 = 4/18 = 2/9 → 9/2 = 4,5 horas.' }
        ]
      }
    }

  ];

  // Register all lessons into MM_LESSONS
  if (!window.MM_LESSONS) window.MM_LESSONS = [];
  LESSONS.forEach(lesson => {
    // Set exercises.generators from topic generators if not already set
    if (lesson.exercises && lesson.exercises.topic && window.MM_TOPIC_GENERATORS) {
      const gens = window.MM_TOPIC_GENERATORS[lesson.exercises.topic];
      if (gens && gens.length) lesson.exercises.generators = gens;
    }
    // Remove duplicates
    const existing = window.MM_LESSONS.findIndex(l => l.id === lesson.id);
    if (existing !== -1) window.MM_LESSONS.splice(existing, 1);
    window.MM_LESSONS.push(lesson);
  });

  // Also register in MM_LESSON_MAP for quick lookup
  if (!window.MM_LESSON_MAP) window.MM_LESSON_MAP = {};
  LESSONS.forEach(l => { window.MM_LESSON_MAP[l.id] = l; });

  console.log('[MM] content-aritmetica.js cargado: 15 lecciones de Aritmética');
})();
