/* ═══════════════════════════════════════════════════════════════
   CONTENT.JS — Contenido educativo profundo para 4 temas
   Reemplaza/extiende lecciones existentes con nivel de libro escolar
   ═══════════════════════════════════════════════════════════════ */

(function() {

// ── Reemplazar lecciones existentes ─────────────────────────────
const REPLACE_IDS = ['fracciones-intro','porcentajes','ecuaciones-lineales','funcion-cuadratica'];
if (window.MM_LESSONS) {
  window.MM_LESSONS = window.MM_LESSONS.filter(l => !REPLACE_IDS.includes(l.id));
}

// ── FRACCIONES ──────────────────────────────────────────────────
window.MM_LESSONS = window.MM_LESSONS || [];

window.MM_LESSONS.push({
  id: 'fracciones-intro',
  courseId: 'aritmetica',
  topic: 'Fracciones',
  title: 'Fracciones: Concepto y Operaciones',
  level: '7°-8° Básico',
  grades: '5°–8° Básico',
  duration: 45,
  xpReward: 120,
  icon: '🍕',
  color: '#F97316',

  concept: {
    what: `Una <strong>fracción</strong> representa una parte de un todo. Se escribe como \\(\\frac{numerador}{denominador}\\), donde el <em>denominador</em> indica en cuántas partes iguales se divide el todo y el <em>numerador</em> indica cuántas partes se toman.<br><br>
    Por ejemplo, \\(\\frac{3}{4}\\) significa "3 de 4 partes iguales". Si una pizza se corta en 4 pedazos iguales y tomas 3, tienes \\(\\frac{3}{4}\\) de la pizza.<br><br>
    <strong>Tipos de fracciones:</strong>
    <ul>
      <li><strong>Propia:</strong> numerador &lt; denominador (ej: \\(\\frac{2}{5}\\)). Representa menos de un entero.</li>
      <li><strong>Impropia:</strong> numerador ≥ denominador (ej: \\(\\frac{7}{3}\\)). Representa uno o más enteros.</li>
      <li><strong>Número mixto:</strong> parte entera + fracción propia (ej: \\(2\\frac{1}{3}\\)).</li>
      <li><strong>Equivalente:</strong> misma cantidad, diferente escritura (ej: \\(\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6}\\)).</li>
    </ul>`,
    why: `Las fracciones son fundamentales porque la mayoría de las cantidades reales no son números enteros. Un médico receta \\(\\frac{1}{4}\\) de tableta. Un cocinero usa \\(\\frac{3}{4}\\) de taza. Un arquitecto diseña una pared de \\(2\\frac{1}{2}\\) metros. Sin fracciones no podríamos medir ni calcular con precisión.`,
    realLife: `<strong>Cocina:</strong> Recetas usan \\(\\frac{1}{2}\\) taza, \\(\\frac{3}{4}\\) cucharadita.<br>
    <strong>Construcción:</strong> Tablas de \\(2\\frac{1}{4}\\) pulgadas de grosor.<br>
    <strong>Música:</strong> Tiempo musical: negra = \\(\\frac{1}{4}\\) de compás, corchea = \\(\\frac{1}{8}\\).<br>
    <strong>Deportes:</strong> Un jugador estuvo \\(\\frac{2}{3}\\) del partido en cancha.<br>
    <strong>Finanzas:</strong> Descuentos de \\(\\frac{1}{4}\\) del precio original.`,
    commonErrors: [
      { title: 'Sumar denominadores', description: 'Error: \\(\\frac{1}{3} + \\frac{1}{4} = \\frac{2}{7}\\). ¡Incorrecto! Los denominadores NO se suman. Hay que igualarlos primero con el MCM.' },
      { title: 'Olvidar simplificar', description: 'Dejar \\(\\frac{6}{8}\\) sin simplificar a \\(\\frac{3}{4}\\). Siempre busca el MCD para simplificar.' },
      { title: 'Invertir la fracción', description: 'Confundir el numerador con el denominador. "2 de cada 3" es \\(\\frac{2}{3}\\), no \\(\\frac{3}{2}\\).' },
      { title: 'División sin invertir', description: 'Error: \\(\\frac{1}{2} ÷ \\frac{1}{4} = \\frac{1}{8}\\). Correcto: se multiplica por la inversa: \\(\\frac{1}{2} × \\frac{4}{1} = 2\\).' }
    ]
  },

  visual: { type: 'fraction-pizza' },

  discovery: [
    { title: '¿Qué representa la fracción?', text: 'Observa un cuadrado dividido en 8 partes iguales. Si coloreas 3 partes, ¿cómo escribirías la fracción? ¿Qué número va arriba (numerador) y cuál abajo (denominador)?', question: 'Si divides un cuadrado en 8 partes y coloreas 5, ¿qué fracción de las partes NO están coloreadas?' },
    { title: 'Fracciones equivalentes', text: 'Divide una pizza en 2 mitades. Toma 1 mitad. Ahora divide otra pizza idéntica en 4 partes. ¿Cuántas partes necesitas para tener la misma cantidad que 1 mitad?', question: 'Si \\(\\frac{1}{2} = \\frac{2}{4}\\), ¿cuánto es \\(\\frac{1}{2}\\) expresado con denominador 8?' },
    { title: 'Descubriendo el MCM para sumar', text: 'Intenta sumar \\(\\frac{1}{3} + \\frac{1}{4}\\) sin igualar denominadores. Luego busca el número más pequeño que sea múltiplo tanto de 3 como de 4. Ese es el MCM.', question: '¿Cuál es el MCM de 3 y 4? ¿Cómo conviertes \\(\\frac{1}{3}\\) a ese denominador?' },
  ],

  examples: [
    {
      title: 'Simplificar fracciones',
      problem: 'Simplifica \\(\\frac{18}{24}\\)',
      steps: [
        { action: 'Encontrar el MCD', why: 'El MCD nos dice cuánto podemos dividir ambos términos', formula: 'Factores de 18: 2×3×3; Factores de 24: 2×2×2×3', result: 'MCD(18, 24) = 6' },
        { action: 'Dividir numerador y denominador', why: 'Al dividir por el mismo número, la fracción no cambia de valor', formula: '\\(\\frac{18÷6}{24÷6}\\)', result: '\\(\\frac{3}{4}\\)' },
        { action: 'Verificar', why: 'Comprobar que MCD(3,4)=1 confirma que está simplificada', formula: 'MCD(3,4) = 1 ✓', result: 'La fracción simplificada es \\(\\frac{3}{4}\\)' }
      ]
    },
    {
      title: 'Suma de fracciones con distinto denominador',
      problem: 'Calcula \\(\\frac{2}{3} + \\frac{3}{4}\\)',
      steps: [
        { action: 'Calcular el MCM', why: 'Necesitamos un denominador común para poder sumar', formula: 'MCM(3, 4) = 12', result: 'Denominador común = 12' },
        { action: 'Convertir las fracciones', why: 'Multiplicamos numerador y denominador por el factor necesario', formula: '\\(\\frac{2×4}{3×4} + \\frac{3×3}{4×3} = \\frac{8}{12} + \\frac{9}{12}\\)', result: 'Ambas fracciones tienen denominador 12' },
        { action: 'Sumar los numeradores', why: 'Con igual denominador, simplemente sumamos los numeradores', formula: '\\(\\frac{8+9}{12} = \\frac{17}{12}\\)', result: '\\(\\frac{17}{12} = 1\\frac{5}{12}\\)' }
      ]
    },
    {
      title: 'Multiplicación de fracciones',
      problem: 'Calcula \\(\\frac{3}{5} × \\frac{2}{7}\\)',
      steps: [
        { action: 'Multiplicar numeradores', why: 'En multiplicación de fracciones, numerador con numerador', formula: '3 × 2 = 6', result: 'Nuevo numerador = 6' },
        { action: 'Multiplicar denominadores', why: 'Y denominador con denominador', formula: '5 × 7 = 35', result: 'Nuevo denominador = 35' },
        { action: 'Simplificar si es posible', why: 'Verificar si MCD(6,35)=1', formula: 'MCD(6, 35) = 1', result: 'Resultado: \\(\\frac{6}{35}\\) (ya simplificado)' }
      ]
    },
    {
      title: 'División de fracciones',
      problem: 'Calcula \\(\\frac{3}{4} ÷ \\frac{2}{5}\\)',
      steps: [
        { action: 'Invertir la segunda fracción', why: 'Dividir por una fracción es igual a multiplicar por su inversa (fracción volteada)', formula: '\\(\\frac{2}{5}\\) se convierte en \\(\\frac{5}{2}\\)', result: '\\(\\frac{3}{4} × \\frac{5}{2}\\)' },
        { action: 'Multiplicar', why: 'Ahora aplicamos la regla de multiplicación', formula: '\\(\\frac{3×5}{4×2} = \\frac{15}{8}\\)', result: '\\(\\frac{15}{8} = 1\\frac{7}{8}\\)' }
      ]
    },
    {
      title: 'Problema de aplicación',
      problem: 'María tenía \\(\\frac{3}{4}\\) de litro de jugo. Bebió \\(\\frac{1}{3}\\) de litro. ¿Cuánto le queda?',
      steps: [
        { action: 'Identificar la operación', why: 'Se usa "menos", por tanto es una resta', formula: '\\(\\frac{3}{4} - \\frac{1}{3}\\)', result: 'Operación: resta' },
        { action: 'Calcular MCM(4,3)', why: 'Denominadores distintos → necesitamos MCM', formula: 'MCM(4, 3) = 12', result: 'Denominador común = 12' },
        { action: 'Convertir y restar', why: '', formula: '\\(\\frac{9}{12} - \\frac{4}{12} = \\frac{5}{12}\\)', result: 'Le quedan \\(\\frac{5}{12}\\) de litro' }
      ]
    }
  ],

  exploration: null,

  summary: 'Las fracciones representan partes de un todo. Para operar con ellas: suma/resta requieren denominador común (usar MCM), multiplicación multiplica numerador×numerador y denominador×denominador, división multiplica por la fracción inversa. Siempre simplifica el resultado.',
  keyPoints: [
    'Una fracción = numerador/denominador = partes tomadas/partes totales',
    'Fracciones equivalentes: misma cantidad, diferente representación',
    'Suma/Resta: igualar denominadores con el MCM',
    'Multiplicación: numerador×numerador / denominador×denominador',
    'División: multiplicar por la fracción invertida',
    'Simplificar siempre: dividir por MCD(numerador, denominador)'
  ],

  exercises: {
    topic: 'fracciones',
    generators: window.MM_TOPIC_GENERATORS ? window.MM_TOPIC_GENERATORS['fracciones'] : []
  },

  advanced: {
    title: 'Desafíos con Fracciones',
    challenges: [
      {
        title: 'Suma de múltiples fracciones',
        problem: 'Calcula: \\(\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6}\\)',
        solution: 'MCM(2,3,6)=6. \\(\\frac{3}{6} + \\frac{2}{6} + \\frac{1}{6} = \\frac{6}{6} = 1\\)',
        hint: 'Busca el MCM de los tres denominadores.'
      },
      {
        title: 'Fracción de una fracción',
        problem: 'Un pastel está dividido en 3 partes iguales. Comes \\(\\frac{1}{3}\\) de una de esas partes. ¿Qué fracción del pastel comiste?',
        solution: '\\(\\frac{1}{3} × \\frac{1}{3} = \\frac{1}{9}\\) del pastel total.',
        hint: '"Fracción de fracción" significa multiplicación.'
      },
      {
        title: 'Operaciones combinadas',
        problem: 'Calcula: \\(\\frac{3}{4} × \\frac{2}{3} + \\frac{1}{6}\\)',
        solution: 'Primero multiplica: \\(\\frac{6}{12} = \\frac{1}{2}\\). Luego suma: \\(\\frac{1}{2} + \\frac{1}{6} = \\frac{3}{6} + \\frac{1}{6} = \\frac{4}{6} = \\frac{2}{3}\\)',
        hint: 'Respeta la prioridad: multiplicación antes de suma.'
      }
    ]
  }
});

// ── PORCENTAJES ─────────────────────────────────────────────────
window.MM_LESSONS.push({
  id: 'porcentajes',
  courseId: 'aritmetica',
  topic: 'Porcentajes',
  title: 'Porcentajes: Cálculo y Aplicaciones',
  level: '7°-8° Básico',
  grades: '6°–8° Básico',
  duration: 40,
  xpReward: 110,
  icon: '%',
  color: '#8B5CF6',

  concept: {
    what: `Un <strong>porcentaje</strong> (%) es una fracción cuyo denominador es siempre 100. "Por ciento" significa literalmente "por cada cien".<br><br>
    \\[30\\% = \\frac{30}{100} = 0.30\\]<br>
    Los tres conceptos clave son:
    <ul>
      <li><strong>Calcular X% de N:</strong> Resultado = N × (X/100)</li>
      <li><strong>¿Qué % es A de B?:</strong> Porcentaje = (A/B) × 100</li>
      <li><strong>Encontrar el total:</strong> Total = Parte ÷ (Porcentaje/100)</li>
    </ul>
    <strong>Conversiones rápidas:</strong>
    <ul>
      <li>50% = \\(\\frac{1}{2}\\) = 0.5</li>
      <li>25% = \\(\\frac{1}{4}\\) = 0.25</li>
      <li>10% = \\(\\frac{1}{10}\\) = 0.1 (mover coma decimal un lugar)</li>
      <li>1% = \\(\\frac{1}{100}\\) = 0.01</li>
    </ul>`,
    why: `Los porcentajes aparecen en todos los aspectos de la vida cotidiana: descuentos en tiendas, impuestos, intereses bancarios, notas escolares (7.0 = 100%), estadísticas, nutrición (etiquetas dicen "20% de proteína"), encuestas políticas y más.`,
    realLife: `<strong>Comercio:</strong> "20% de descuento" — calcular el precio final.<br>
    <strong>Banco:</strong> Interés del 5% anual sobre tus ahorros.<br>
    <strong>Notas:</strong> Obtuviste 42/50 preguntas correctas → ¿qué porcentaje?<br>
    <strong>IVA:</strong> En Chile, el IVA es el 19% — ¿cuánto pagas de impuesto?<br>
    <strong>Nutrición:</strong> Una manzana tiene 52 kcal, siendo el 2.6% de la ingesta diaria de 2000 kcal.`,
    commonErrors: [
      { title: 'Olvidar dividir por 100', description: 'Error: 30% de 50 = 30×50 = 1500. Correcto: 30% de 50 = 50×(30/100) = 15.' },
      { title: 'Confundir descuento con precio final', description: 'Si hay 20% de descuento en $100, el descuento es $20 y el precio FINAL es $80, no $20.' },
      { title: 'No identificar qué es el "total"', description: 'En "15 es el 30% de ¿cuánto?", el total es lo que buscamos: 15÷0.30=50.' },
      { title: 'Sumar porcentajes directamente', description: 'Un aumento de 20% seguido de una baja de 20% NO te deja igual. (100×1.2×0.8 = 96, no 100).' }
    ]
  },

  visual: { type: 'percentage-bar' },

  discovery: [
    { title: 'El 10% como herramienta', text: 'El 10% de cualquier número se obtiene moviendo el punto decimal un lugar a la izquierda. Por ejemplo, 10% de 340 = 34. Pruébalo con distintos números.', question: '¿Cómo usarías el 10% para calcular el 30% de un número? ¿Y el 15%?' },
    { title: 'Descuento: ¿qué pagas realmente?', text: 'Una camisa cuesta $80 con 25% de descuento. Calcula primero el descuento, luego el precio final. ¿Hay una forma más rápida de calcular el precio final directamente?', question: 'Si el precio es $P y el descuento es d%, el precio final es P×(1 - d/100). ¿Cuánto sería el 25% de descuento sobre $80?' },
    { title: 'Porcentaje inverso', text: 'Sabes que 12 estudiantes aprobaron, y que eso representa el 60% del curso. ¿Cuántos estudiantes hay en total?', question: 'Si A = P% de Total, ¿cómo despejas Total?' }
  ],

  examples: [
    {
      title: 'Calcular el X% de un número',
      problem: '¿Cuánto es el 35% de $240?',
      steps: [
        { action: 'Escribir como fracción', why: 'Convierte el porcentaje a una forma operable', formula: '35% = 35/100 = 0.35', result: '' },
        { action: 'Multiplicar', why: 'El porcentaje de un número = número × (porcentaje/100)', formula: '$240 × 0.35 = $84', result: 'El 35% de $240 es $84' }
      ]
    },
    {
      title: '¿Qué porcentaje es A de B?',
      problem: '28 estudiantes aprobaron de un total de 40. ¿Qué porcentaje aprobó?',
      steps: [
        { action: 'Escribir la fracción', why: 'Expresamos la relación parte/total', formula: '28/40', result: '' },
        { action: 'Multiplicar por 100', why: 'Para convertir a porcentaje', formula: '(28/40) × 100 = 0.7 × 100 = 70%', result: 'Aprobó el 70% de los estudiantes' }
      ]
    },
    {
      title: 'Precio con descuento',
      problem: 'Un televisor costaba $350.000 y tiene un 15% de descuento. ¿Cuál es el precio final?',
      steps: [
        { action: 'Calcular el descuento', why: 'Cuánto dinero se rebaja', formula: '$350.000 × 15/100 = $52.500', result: 'Descuento = $52.500' },
        { action: 'Restar al precio original', why: 'El precio final = precio original - descuento', formula: '$350.000 - $52.500 = $297.500', result: 'Precio final: $297.500' },
        { action: 'Método alternativo', why: 'Si el descuento es 15%, el precio final es el 85% del original', formula: '$350.000 × 0.85 = $297.500 ✓', result: 'Mismo resultado, más rápido' }
      ]
    },
    {
      title: 'Encontrar el total',
      problem: '$45 representa el 30% de cierta cantidad. ¿Cuál es la cantidad total?',
      steps: [
        { action: 'Plantear la ecuación', why: 'Sabemos que parte = total × porcentaje/100', formula: '45 = Total × 0.30', result: '' },
        { action: 'Despejar el total', why: 'Dividimos ambos lados por 0.30', formula: 'Total = 45 ÷ 0.30 = 150', result: 'La cantidad total es 150' }
      ]
    },
    {
      title: 'Variación porcentual',
      problem: 'Un producto subió de $80 a $100. ¿Cuál es el porcentaje de aumento?',
      steps: [
        { action: 'Calcular la diferencia', why: 'La variación absoluta', formula: '100 - 80 = 20', result: 'Diferencia = 20' },
        { action: 'Dividir por el valor inicial y multiplicar por 100', why: 'La variación relativa es respecto al valor original', formula: '(20/80) × 100 = 0.25 × 100 = 25%', result: 'Hubo un aumento del 25%' }
      ]
    }
  ],

  exploration: null,

  summary: 'Porcentaje significa "de cada 100". Las tres operaciones clave: calcular X% de N (N×X/100), encontrar qué % es A de B ((A/B)×100), y encontrar el total dado un % (parte÷%×100). En descuentos: precio final = precio × (1 - descuento/100). En aumentos: precio final = precio × (1 + aumento/100).',
  keyPoints: [
    'X% = X/100 = fracción decimal',
    'X% de N = N × (X/100)',
    '¿Qué % es A de B? = (A/B) × 100',
    'Descuento: precio_final = precio × (1 - d/100)',
    'Aumento: precio_final = precio × (1 + a/100)',
    'Variación %: ((final-inicial)/inicial) × 100'
  ],

  exercises: {
    topic: 'porcentajes',
    generators: window.MM_TOPIC_GENERATORS ? window.MM_TOPIC_GENERATORS['porcentajes'] : []
  },

  advanced: {
    title: 'Desafíos con Porcentajes',
    challenges: [
      {
        title: 'IVA incluido',
        problem: 'Un producto cuesta $59.500 con IVA incluido (19%). ¿Cuál era el precio sin IVA?',
        solution: 'Precio con IVA = Precio_neto × 1.19. Precio_neto = 59.500 ÷ 1.19 ≈ $50.000',
        hint: 'El precio con IVA es el 119% del precio neto.'
      },
      {
        title: 'Aumentos y bajas consecutivos',
        problem: 'Un sueldo sube 20% y luego baja 20%. ¿Volvió al mismo valor?',
        solution: 'Sueldo inicial S. Tras subida: S×1.2. Tras bajada: S×1.2×0.8 = S×0.96. El sueldo quedó en 96% del original, es decir 4% menos.',
        hint: 'Los porcentajes no son simétricos. 20% de un valor mayor es más dinero.'
      },
      {
        title: 'Porcentaje compuesto',
        problem: 'Se invierte $10.000 al 10% anual durante 2 años (interés compuesto). ¿Cuánto hay al final?',
        solution: 'Año 1: 10.000×1.1 = 11.000. Año 2: 11.000×1.1 = 12.100.',
        hint: 'Cada año el interés se calcula sobre el total acumulado, no sobre el capital inicial.'
      }
    ]
  }
});

// ── ECUACIONES LINEALES ─────────────────────────────────────────
window.MM_LESSONS.push({
  id: 'ecuaciones-lineales',
  courseId: 'algebra',
  topic: 'Álgebra',
  title: 'Ecuaciones Lineales: Resolución y Aplicaciones',
  level: '7°-8° Básico',
  grades: '7°–8° Básico',
  duration: 50,
  xpReward: 130,
  icon: '⚖️',
  color: '#3B82F6',

  concept: {
    what: `Una <strong>ecuación lineal</strong> es una igualdad que contiene una o más incógnitas (variables) elevadas a la primera potencia. La forma general es:<br><br>
    \\[ax + b = c\\]<br>
    donde \\(a\\), \\(b\\) y \\(c\\) son números conocidos y \\(x\\) es la incógnita.<br><br>
    <strong>Principio fundamental:</strong> Una ecuación es como una balanza en equilibrio. Para mantener el equilibrio, <em>toda operación que hagas en un lado debe hacerse también en el otro</em>.<br><br>
    <strong>Propiedades de la igualdad:</strong>
    <ul>
      <li><strong>Suma:</strong> Si a=b, entonces a+c = b+c</li>
      <li><strong>Resta:</strong> Si a=b, entonces a-c = b-c</li>
      <li><strong>Multiplicación:</strong> Si a=b, entonces ac = bc</li>
      <li><strong>División:</strong> Si a=b y c≠0, entonces a/c = b/c</li>
    </ul>`,
    why: `Las ecuaciones son el lenguaje matemático para resolver problemas. Cuando necesitas encontrar un valor desconocido —el precio de un producto, la velocidad de un tren, la edad de una persona— planteas una ecuación y la resuelves.`,
    realLife: `<strong>Economía:</strong> ¿Cuántas horas debo trabajar para ganar $50.000? Si gano $3.000/hora: 3000h = 50000 → h = 16.7 horas.<br>
    <strong>Distancia:</strong> Si viajo a 80 km/h, ¿cuándo llego a 240 km? 80t = 240 → t = 3 horas.<br>
    <strong>Temperatura:</strong> Convertir °F a °C: C = (F-32)×5/9.<br>
    <strong>Nutrición:</strong> Si una galleta tiene 80 kcal, ¿cuántas galletas para llegar a 400 kcal? 80n = 400 → n = 5.`,
    commonErrors: [
      { title: 'No pasar al otro lado', description: 'Error: 2x + 3 = 7, entonces 2x = 7 (olvidó restar 3). Correcto: 2x = 7-3 = 4.' },
      { title: 'Cambio de signo', description: 'Al pasar un término al otro lado, SIEMPRE cambia de signo: +5 pasa como -5, y -3 pasa como +3.' },
      { title: 'No distribuir el factor', description: 'Error: 3(x+2)=9 → 3x+2=9. Correcto: 3×x + 3×2 = 3x+6.' },
      { title: 'Dividir solo parte', description: 'Error: 4x+8=20 → x+8=5 (dividió solo 4x por 4). Correcto: 4x=20-8=12, x=3.' }
    ]
  },

  visual: { type: 'equation-balance' },

  discovery: [
    { title: 'La balanza como modelo', text: 'Imagina una balanza con 3 cajas misteriosas y 6 monedas en la izquierda, y 15 monedas en la derecha. Para encontrar cuánto pesa cada caja, primero quita las 6 monedas de ambos lados.', question: 'Si 3x + 6 = 15, ¿qué queda después de quitar 6 de cada lado? ¿Cuánto vale x?' },
    { title: 'Operaciones inversas', text: 'Para "deshacer" una suma se usa una resta. Para "deshacer" una multiplicación se usa una división. El objetivo es dejar la variable sola.', question: 'En 5x = 25, ¿qué operación "deshace" la multiplicación por 5?' },
    { title: 'Variables en ambos lados', text: 'Si tienes 5x = 2x + 9, puedes "mover" las variables al mismo lado. Resta 2x de ambos lados.', question: '5x - 2x = 2x + 9 - 2x. ¿Qué simplificación ocurre? ¿Cuánto vale x?' }
  ],

  examples: [
    {
      title: 'Ecuación simple: ax = b',
      problem: 'Resuelve: 6x = 42',
      steps: [
        { action: 'Dividir ambos lados por 6', why: 'Para despejar x, aplicamos la operación inversa a la multiplicación', formula: '6x ÷ 6 = 42 ÷ 6', result: 'x = 7' },
        { action: 'Verificar', why: 'Sustituimos para confirmar', formula: '6(7) = 42 ✓', result: 'La solución es x = 7' }
      ]
    },
    {
      title: 'Ecuación con suma: ax + b = c',
      problem: 'Resuelve: 3x + 5 = 20',
      steps: [
        { action: 'Aislar el término con x', why: 'Restamos 5 en ambos lados para eliminar el +5', formula: '3x + 5 - 5 = 20 - 5', result: '3x = 15' },
        { action: 'Despejar x', why: 'Dividimos por el coeficiente de x', formula: '3x ÷ 3 = 15 ÷ 3', result: 'x = 5' },
        { action: 'Verificar', why: '', formula: '3(5) + 5 = 15 + 5 = 20 ✓', result: '' }
      ]
    },
    {
      title: 'Ecuación con paréntesis',
      problem: 'Resuelve: 4(x - 3) = 16',
      steps: [
        { action: 'Distribuir el 4', why: 'El factor afecta a todos los términos dentro del paréntesis', formula: '4×x - 4×3 = 16 → 4x - 12 = 16', result: '' },
        { action: 'Sumar 12 en ambos lados', why: 'Para eliminar el -12', formula: '4x = 16 + 12 = 28', result: '' },
        { action: 'Dividir por 4', why: '', formula: 'x = 28 ÷ 4 = 7', result: 'x = 7. Verificar: 4(7-3) = 4(4) = 16 ✓' }
      ]
    },
    {
      title: 'Variables en ambos lados',
      problem: 'Resuelve: 5x + 3 = 2x + 15',
      steps: [
        { action: 'Mover términos con x al mismo lado', why: 'Restamos 2x en ambos lados', formula: '5x - 2x + 3 = 15', result: '3x + 3 = 15' },
        { action: 'Mover constantes al otro lado', why: 'Restamos 3 en ambos lados', formula: '3x = 15 - 3 = 12', result: '' },
        { action: 'Despejar x', why: '', formula: 'x = 12 ÷ 3 = 4', result: 'x = 4' }
      ]
    },
    {
      title: 'Problema verbal',
      problem: 'El doble de un número más 7 es igual a 23. ¿Cuál es el número?',
      steps: [
        { action: 'Definir la variable', why: 'Llamamos x al número desconocido', formula: 'Sea x el número', result: '' },
        { action: 'Plantear la ecuación', why: 'Traducir el enunciado a lenguaje algebraico', formula: '"El doble de x" = 2x; "más 7" = +7; "es 23" = =23 → 2x + 7 = 23', result: '' },
        { action: 'Resolver', why: '', formula: '2x = 23 - 7 = 16 → x = 8', result: 'El número es 8. Verificar: 2(8)+7 = 23 ✓' }
      ]
    }
  ],

  exploration: null,

  summary: 'Una ecuación lineal se resuelve aislando la variable. Estrategia: 1) Distribuir paréntesis, 2) Agrupar términos con x en un lado, 3) Agrupar constantes en el otro lado, 4) Dividir por el coeficiente de x. Siempre verifica sustituyendo en la ecuación original.',
  keyPoints: [
    'Ecuación = balanza: lo mismo en ambos lados',
    'Operaciones inversas: suma↔resta, multiplicación↔división',
    'Al pasar un término al otro lado, cambia de signo',
    'Distribuir siempre antes de agrupar',
    'Verificar sustituyendo la solución',
    'Plantear: leer → definir variable → traducir → resolver'
  ],

  exercises: {
    topic: 'ecuaciones',
    generators: window.MM_TOPIC_GENERATORS ? window.MM_TOPIC_GENERATORS['ecuaciones'] : []
  },

  advanced: {
    title: 'Desafíos con Ecuaciones',
    challenges: [
      {
        title: 'Ecuación con fracciones',
        problem: 'Resuelve: \\(\\frac{x}{3} + \\frac{x}{4} = 7\\)',
        solution: 'MCM(3,4)=12. Multiplicar todo por 12: 4x + 3x = 84 → 7x = 84 → x = 12',
        hint: 'Multiplica toda la ecuación por el MCM de los denominadores.'
      },
      {
        title: 'Sistema de ecuaciones (introducción)',
        problem: 'Dos números suman 20. El mayor es 4 más que el menor. ¿Cuáles son?',
        solution: 'Sea n el menor. n + (n+4) = 20 → 2n+4=20 → n=8. El menor es 8, el mayor es 12.',
        hint: 'Expresa ambos números en términos de una sola variable.'
      },
      {
        title: 'Ecuación con valor absoluto (introducción)',
        problem: 'Encuentra x tal que |2x - 6| = 4',
        solution: 'Caso 1: 2x-6=4 → x=5. Caso 2: 2x-6=-4 → x=1. Soluciones: x=5 o x=1.',
        hint: 'El valor absoluto puede ser positivo o negativo internamente.'
      }
    ]
  }
});

// ── FUNCIÓN CUADRÁTICA ──────────────────────────────────────────
window.MM_LESSONS.push({
  id: 'funcion-cuadratica',
  courseId: 'funciones',
  topic: 'Cuadráticas',
  title: 'Función Cuadrática y Parábola',
  level: 'Enseñanza Media',
  grades: '1°–2° EM',
  duration: 55,
  xpReward: 150,
  icon: '📈',
  color: '#10B981',

  concept: {
    what: `Una <strong>función cuadrática</strong> tiene la forma:<br><br>
    \\[f(x) = ax^2 + bx + c \\quad (a \\neq 0)\\]<br>
    Su gráfico es una <strong>parábola</strong>. Los elementos clave son:
    <ul>
      <li><strong>Coeficiente principal (a):</strong> si a>0, parábola abre hacia arriba (∪); si a<0, hacia abajo (∩).</li>
      <li><strong>Vértice:</strong> punto más alto o más bajo. \\(x_v = \\frac{-b}{2a}\\), \\(y_v = f(x_v)\\).</li>
      <li><strong>Eje de simetría:</strong> recta vertical \\(x = x_v\\). La parábola es simétrica respecto a ella.</li>
      <li><strong>Intersecciones con eje X (raíces):</strong> valores de x donde f(x)=0. Se calculan con la fórmula cuadrática.</li>
      <li><strong>Intersección con eje Y:</strong> punto (0, c).</li>
    </ul>
    <strong>Fórmula cuadrática:</strong><br>
    \\[x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\]<br>
    El <strong>discriminante</strong> \\(\\Delta = b^2 - 4ac\\) determina la cantidad de raíces reales: Δ>0 → dos raíces; Δ=0 → una raíz doble; Δ<0 → sin raíces reales.`,
    why: `Las funciones cuadráticas modelan fenómenos donde la tasa de cambio no es constante: el vuelo de un proyectil, la forma de un arco, el área de una figura en función de su lado, la caída libre, y la optimización de beneficios económicos (maximizar ganancias).`,
    realLife: `<strong>Física:</strong> La trayectoria de un balón es h(t) = -5t² + 20t + 2 metros.<br>
    <strong>Arquitectura:</strong> Los arcos de puentes tienen forma parabólica para distribuir el peso óptimamente.<br>
    <strong>Economía:</strong> La ganancia G(x) = -2x² + 80x - 300 se maximiza en el vértice.<br>
    <strong>Óptica:</strong> Los espejos y antenas parabólicas concentran señales en el foco de la parábola.<br>
    <strong>Deportes:</strong> El alcance máximo de un salto o lanzamiento es un problema cuadrático.`,
    commonErrors: [
      { title: 'No elevar al cuadrado', description: 'f(3) con f(x)=x²+1: error → 3+1=4. Correcto: 3²+1 = 9+1 = 10.' },
      { title: 'Signo en la fórmula del vértice', description: 'El vértice usa -b/(2a). Si b=-6, entonces xv = -(-6)/(2a) = 6/(2a). ¡Doble negativo!' },
      { title: 'Discriminante con error de signo', description: 'Error: Δ = b²+4ac. Correcto: Δ = b²-4ac (es una RESTA).' },
      { title: 'Confundir raíces con vértice', description: 'Las raíces son donde f(x)=0 (sobre el eje X). El vértice es el punto más alto/bajo de la parábola.' }
    ]
  },

  visual: { type: 'parabola-interactive' },

  discovery: [
    { title: 'El papel de "a"', text: 'Graficando f(x)=x², f(x)=2x² y f(x)=½x², ¿cómo cambia la forma de la parábola? Ahora prueba f(x)=-x². ¿Qué ocurre?', question: '¿Qué hace el signo de "a" en f(x)=ax²? ¿Y el valor absoluto de "a"?' },
    { title: 'El vértice y "b"', text: 'Compara f(x)=x², f(x)=x²+4x y f(x)=x²-6x. ¿Cómo se desplaza el vértice al agregar el término bx?', question: 'Si f(x)=x²+4x, ¿en qué valor de x está el vértice? Usa la fórmula xv=-b/(2a).' },
    { title: '¿Cuándo cruza el eje X?', text: 'Para f(x)=x²-4, encuentra los valores de x donde f(x)=0. Luego para f(x)=x²+4. ¿Siempre hay raíces?', question: 'Calcula el discriminante (b²-4ac) para f(x)=x²-4 y para f(x)=x²+4. ¿Qué indica el signo del discriminante?' }
  ],

  examples: [
    {
      title: 'Evaluar una función cuadrática',
      problem: 'Dada f(x) = 2x² - 3x + 1, calcula f(4)',
      steps: [
        { action: 'Sustituir x = 4', why: 'Reemplazamos cada x por el valor dado', formula: 'f(4) = 2(4)² - 3(4) + 1', result: '' },
        { action: 'Calcular las potencias primero', why: 'Respetando la jerarquía de operaciones', formula: '(4)² = 16, entonces 2(16) = 32', result: '' },
        { action: 'Completar el cálculo', why: '', formula: '32 - 12 + 1 = 21', result: 'f(4) = 21' }
      ]
    },
    {
      title: 'Encontrar el vértice',
      problem: 'Encuentra el vértice de f(x) = x² - 6x + 5',
      steps: [
        { action: 'Identificar a, b, c', why: '', formula: 'a = 1, b = -6, c = 5', result: '' },
        { action: 'Calcular xv', why: 'Usando la fórmula del vértice', formula: '\\(x_v = \\frac{-(-6)}{2(1)} = \\frac{6}{2} = 3\\)', result: 'xv = 3' },
        { action: 'Calcular yv', why: 'Evaluar la función en xv', formula: 'f(3) = (3)² - 6(3) + 5 = 9 - 18 + 5 = -4', result: 'Vértice: (3, -4)' }
      ]
    },
    {
      title: 'Resolver ecuación cuadrática',
      problem: 'Encuentra las raíces de x² + x - 6 = 0',
      steps: [
        { action: 'Identificar a=1, b=1, c=-6', why: '', formula: '', result: '' },
        { action: 'Calcular el discriminante', why: 'Para saber cuántas raíces hay', formula: '\\(\\Delta = 1^2 - 4(1)(-6) = 1 + 24 = 25\\)', result: 'Δ = 25 > 0 → dos raíces reales' },
        { action: 'Aplicar la fórmula cuadrática', why: '', formula: '\\(x = \\frac{-1 \\pm \\sqrt{25}}{2} = \\frac{-1 \\pm 5}{2}\\)', result: 'x₁ = (-1+5)/2 = 2; x₂ = (-1-5)/2 = -3' }
      ]
    },
    {
      title: 'Forma vértice y gráfico',
      problem: 'Escribe f(x) = x² - 4x + 7 en forma de vértice f(x) = a(x-h)² + k',
      steps: [
        { action: 'Completar el cuadrado', why: 'La forma vértice revela directamente el vértice (h,k)', formula: 'f(x) = x² - 4x + 4 + 3 = (x-2)² + 3', result: '' },
        { action: 'Identificar el vértice', why: '', formula: 'h = 2, k = 3', result: 'Vértice: (2, 3). Forma vértice: f(x) = (x-2)² + 3' },
        { action: 'Verificar', why: '', formula: 'Expandir: (x-2)² + 3 = x²-4x+4+3 = x²-4x+7 ✓', result: '' }
      ]
    },
    {
      title: 'Aplicación: máxima altura',
      problem: 'Una pelota se lanza y su altura es h(t) = -5t² + 20t + 1 metros. ¿Cuál es la altura máxima y cuándo ocurre?',
      steps: [
        { action: 'Identificar que el máximo es el vértice', why: 'Como a = -5 < 0, la parábola abre hacia abajo, el vértice es el máximo', formula: 'a=-5, b=20, c=1', result: '' },
        { action: 'Calcular t del vértice', why: '', formula: '\\(t_v = \\frac{-20}{2(-5)} = \\frac{-20}{-10} = 2\\) segundos', result: '' },
        { action: 'Calcular altura máxima', why: '', formula: 'h(2) = -5(4) + 20(2) + 1 = -20 + 40 + 1 = 21 m', result: 'Altura máxima: 21 m a los 2 segundos' }
      ]
    }
  ],

  exploration: {
    type: 'quadratic',
    sliders: [
      { id: 'a', label: 'a (curvatura)', min: -3, max: 3, step: 0.5, default: 1 },
      { id: 'b', label: 'b (inclinación)', min: -6, max: 6, step: 1, default: 0 },
      { id: 'c', label: 'c (intersección Y)', min: -5, max: 5, step: 1, default: 0 }
    ]
  },

  summary: 'La función cuadrática f(x)=ax²+bx+c tiene gráfico en forma de parábola. El signo de a determina la apertura. El vértice (xv, yv) es el punto extremo: xv=-b/(2a). La cantidad de raíces depende del discriminante Δ=b²-4ac: Δ>0 dos raíces, Δ=0 una raíz, Δ<0 sin raíces reales.',
  keyPoints: [
    'f(x) = ax² + bx + c, a≠0',
    'a>0 → parábola ∪ (mínimo); a<0 → parábola ∩ (máximo)',
    'Vértice: xv = -b/(2a), yv = f(xv)',
    'Discriminante: Δ = b²-4ac',
    'Fórmula cuadrática: x = (-b ± √Δ)/(2a)',
    'Intersección con eje Y: siempre en (0, c)'
  ],

  exercises: {
    topic: 'cuadratica',
    generators: window.MM_TOPIC_GENERATORS ? window.MM_TOPIC_GENERATORS['cuadratica'] : []
  },

  advanced: {
    title: 'Desafíos con Función Cuadrática',
    challenges: [
      {
        title: 'Factorización de cuadráticas',
        problem: 'Factoriza f(x) = x² - 5x + 6',
        solution: 'Buscar números que sumen -5 y multipliquen 6: (-2) y (-3). f(x) = (x-2)(x-3). Raíces: x=2 y x=3.',
        hint: 'Busca dos números cuya suma sea b y cuyo producto sea c (cuando a=1).'
      },
      {
        title: 'Máximo o mínimo de ganancia',
        problem: 'La ganancia de una empresa es G(p) = -3p² + 120p - 800, donde p es el precio. ¿Qué precio maximiza la ganancia?',
        solution: 'El máximo está en el vértice: p = -120/(2×(-3)) = -120/(-6) = 20. El precio óptimo es $20.',
        hint: 'El vértice de una parábola ∩ es el máximo. Usa xv = -b/(2a).'
      },
      {
        title: 'Sistema cuadrático-lineal',
        problem: 'Encuentra los puntos de intersección entre y = x² y y = x + 2.',
        solution: 'Igualar: x² = x+2 → x²-x-2=0 → (x-2)(x+1)=0 → x=2 o x=-1. Puntos: (2,4) y (-1,1).',
        hint: 'Iguala las dos expresiones y resuelve la ecuación cuadrática resultante.'
      }
    ]
  }
});

// ── Actualizar referencias a generators en lecciones cargadas ───
// Reconectar cuando MM_TOPIC_GENERATORS ya está disponible
if (window.MM_TOPIC_GENERATORS) {
  const topicMap = {
    'fracciones-intro': 'fracciones',
    'porcentajes': 'porcentajes',
    'ecuaciones-lineales': 'ecuaciones',
    'funcion-cuadratica': 'cuadratica'
  };
  window.MM_LESSONS.forEach(l => {
    if (l.exercises && topicMap[l.id]) {
      l.exercises.generators = window.MM_TOPIC_GENERATORS[topicMap[l.id]] || [];
    }
  });
}

})();
