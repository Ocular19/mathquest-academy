/* ═══════════════════════════════════════════════════════════════
   CONTENT-GEOMETRIA.JS — 13 lecciones completas de Geometría
   ═══════════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  const LESSONS = [

    // ══════════════════════════════════════════════════════════════
    // 1. ÁNGULOS
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-angulos', courseId: 'geometria', topic: 'Ángulos',
      title: 'La medida de lo que gira', level: 1,
      grades: '5°–7° Básico', duration: 25, xpReward: 100,
      icon: '📐', color: '#10B981',
      summary: 'Clasifica, mide y calcula ángulos: complementarios, suplementarios, verticales y con paralelas.',
      keyPoints: [
        'Ángulo agudo: entre 0° y 90°; recto: exactamente 90°; obtuso: entre 90° y 180°; llano: 180°',
        'Complementarios suman 90°; suplementarios suman 180°',
        'Ángulos opuestos por el vértice (verticales) son siempre iguales',
        'Con rectas paralelas: alternos internos = iguales; co-internos suman 180°'
      ],
      concept: {
        what: 'Un **ángulo** es la apertura entre dos rayos que comparten un mismo punto (vértice). Se mide en grados (°), y esa medida describe cuánto "gira" un rayo respecto al otro.',
        why: 'Los ángulos están en todas partes: en arquitectura (techos, arcos), navegación (rumbos), deportes (trayectorias) y trigonometría.',
        realLife: [
          { icon: '🏗️', text: 'Las esquinas de las habitaciones son ángulos rectos de 90°.' },
          { icon: '✂️', text: 'Las tijeras funcionan abriendo y cerrando el ángulo entre sus brazos.' },
          { icon: '⛵', text: 'Los marineros miden rumbos en grados (0°–360°).' },
          { icon: '🕐', text: 'Las agujas de un reloj forman ángulos: a las 3:00 forman 90°.' }
        ],
        commonErrors: [
          { title: 'Complementario ≠ Suplementario', description: 'Complementarios suman 90°, suplementarios suman 180°. El complemento de 30° es 60°; el suplemento es 150°.' },
          { title: 'Ángulos verticales ≠ adyacentes', description: 'Los verticales son los ángulos OPUESTOS (no adyacentes) y son iguales. Los adyacentes son suplementarios.' },
          { title: 'Alternos = iguales, co-internos = suplementarios', description: 'Con paralelas: no confundas alternos (iguales) con co-internos (suman 180°).' }
        ]
      },
      examples: [
        {
          title: 'Encontrar el complemento y suplemento',
          problem: 'Un ángulo mide 35°. ¿Cuánto miden su complemento y su suplemento?',
          steps: [
            { action: 'Complemento', why: 'Complementarios suman 90°', formula: '90° − 35°', result: '55°' },
            { action: 'Suplemento', why: 'Suplementarios suman 180°', formula: '180° − 35°', result: '145°' }
          ]
        },
        {
          title: 'Ángulos con paralelas y transversal',
          problem: 'Dos rectas paralelas son cortadas por una transversal. Un ángulo mide 70°. Halla el ángulo co-interno y el alterno interno.',
          steps: [
            { action: 'Ángulo co-interno', why: 'Co-internos son suplementarios', formula: '180° − 70°', result: '110°' },
            { action: 'Ángulo alterno interno', why: 'Alternos son iguales entre paralelas', formula: '= 70°', result: '70°' }
          ]
        }
      ],
      visual: { type: 'geo-angles' },
      discovery: [
        { title: 'El transportador como herramienta', text: 'El transportador mide ángulos. En un reloj a las 3:00 las agujas forman 90°, a las 6:00 forman 180°, y a las 12:00 forman 0° (o 360°).', question: '¿Qué ángulo forman las agujas del reloj a las 2:00?' }
      ],
      exercises: { topic: 'geo_angulos', generators: [] },
      advanced: {
        title: 'Desafíos con ángulos',
        challenges: [
          { title: 'Tres ángulos en una recta', problem: 'En una recta hay tres ángulos adyacentes que suman 180°. El segundo es el doble del primero y el tercero es el triple. ¿Cuánto mide cada uno?', hint: 'Sea el primero = x. Segundo = 2x, Tercero = 3x. Ecuación: x+2x+3x=180°.', solution: '6x=180° → x=30°. Los ángulos miden 30°, 60° y 90°.' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 2. TRIÁNGULOS
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-triangulos', courseId: 'geometria', topic: 'Triángulos',
      title: 'La figura fundamental de la geometría', level: 2,
      grades: '6°–7° Básico', duration: 30, xpReward: 120,
      icon: '🔺', color: '#10B981',
      summary: 'Clasifica triángulos, calcula ángulos faltantes y trabaja con triángulos especiales.',
      keyPoints: [
        'La suma de ángulos interiores de un triángulo es siempre 180°',
        'El ángulo exterior = suma de los dos ángulos interiores no adyacentes',
        'Equilátero: 3 lados iguales; isósceles: 2 iguales; escaleno: todos distintos',
        'Acutángulo: todos <90°; rectángulo: uno = 90°; obtusángulo: uno >90°'
      ],
      concept: {
        what: 'Un **triángulo** es un polígono con tres lados y tres ángulos. Sus propiedades son la base de casi toda la geometría: si puedes analizar triángulos, puedes analizar cualquier figura.',
        why: 'Los triángulos son la forma estructuralmente más rígida, por eso se usan en puentes, torres, armazones y pantallas de ordenadores (mallas 3D).',
        realLife: [
          { icon: '🌉', text: 'Los puentes colgantes usan triángulos en sus armaduras por su rigidez.' },
          { icon: '🎸', text: 'Los picks de guitarra son triángulos (mejor ergonomía para tocar).' },
          { icon: '🗼', text: 'La Torre Eiffel está formada por miles de triángulos metálicos.' },
          { icon: '⛺', text: 'Las tiendas de campaña y pirámides aprovechan la forma triangular.' }
        ],
        commonErrors: [
          { title: 'Olvidar que los ángulos suman 180°, no 360°', description: '360° es para cuadriláteros. En triángulos: ángulo C = 180° − A − B.' },
          { title: 'Confundir ángulo exterior con interior', description: 'El ángulo exterior es el que está FUERA del triángulo, adyacente a un vértice. Vale = suma de los otros dos interiores.' },
          { title: 'Confundir clasificación por lados y por ángulos', description: 'Un triángulo puede ser isósceles Y rectángulo a la vez. Son clasificaciones independientes.' }
        ]
      },
      examples: [
        {
          title: 'Hallar el ángulo faltante',
          problem: 'Un triángulo tiene ángulos de 48° y 67°. ¿Cuánto mide el tercero?',
          steps: [
            { action: 'Suma de ángulos = 180°', why: 'Propiedad del triángulo', formula: '48° + 67° + C = 180°', result: '' },
            { action: 'Suma los conocidos', why: '', formula: '115° + C = 180°', result: '' },
            { action: 'Despeja C', why: '', formula: 'C = 180° − 115°', result: 'C = 65°' }
          ]
        },
        {
          title: 'Ángulo exterior',
          problem: 'Un triángulo tiene ángulos interiores de 50° y 70°. ¿Cuánto mide el ángulo exterior al tercer vértice?',
          steps: [
            { action: 'Ángulo exterior = suma de los no adyacentes', why: 'Teorema del ángulo exterior', formula: 'E = 50° + 70°', result: 'E = 120°' },
            { action: 'Verificación', why: 'El ángulo interior del tercer vértice = 180°−120°=60°, y 50+70+60=180° ✓', formula: '', result: '✓' }
          ]
        }
      ],
      visual: { type: 'geo-triangle' },
      discovery: [
        { title: 'La suma siempre es 180°', text: 'Dibuja cualquier triángulo, recorta los tres ángulos y ponlos juntos: forman exactamente una línea recta (180°). Esto funciona con TODO triángulo, sin importar su forma.', question: '¿Por qué un triángulo no puede tener dos ángulos obtusos?' }
      ],
      exercises: { topic: 'geo_triangulos', generators: [] },
      advanced: {
        title: 'Triángulos especiales',
        challenges: [
          { title: 'El triángulo en el círculo', problem: 'Un triángulo inscrito en un semicírculo siempre es rectángulo (Teorema de Tales). Si los dos ángulos agudos son (2x+10)° y (3x−15)°, ¿cuánto vale x?', hint: 'Los dos ángulos agudos suman 90° (ya que el tercero es 90°).', solution: '(2x+10)+(3x−15)=90 → 5x−5=90 → x=19. Ángulos: 48° y 42°.' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 3. CONGRUENCIA
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-congruencia', courseId: 'geometria', topic: 'Congruencia de Triángulos',
      title: 'Cuando dos figuras son exactamente iguales', level: 3,
      grades: '7°–8° Básico', duration: 30, xpReward: 130,
      icon: '⚖️', color: '#10B981',
      summary: 'Aprende los criterios de congruencia SSS, SAS, ASA, AAS y RHS, y úsalos para deducir elementos.',
      keyPoints: [
        'Dos triángulos son congruentes si tienen la misma forma Y tamaño (≅)',
        'LLL (SSS): tres pares de lados iguales',
        'LAL (SAS): dos lados y el ángulo comprendido iguales',
        'ALA (ASA): un lado y los dos ángulos adyacentes iguales',
        'HC (RHS/HL): hipotenusa e cateto iguales (solo triángulos rectángulos)'
      ],
      concept: {
        what: 'Dos figuras son **congruentes** (≅) si tienen exactamente la misma forma y tamaño. En triángulos, esto significa que todos sus ángulos y lados son iguales respectivamente, aunque estén orientados diferente.',
        why: 'La congruencia es la herramienta básica de las demostraciones geométricas: permite probar igualdades sin medir directamente.',
        realLife: [
          { icon: '🔧', text: 'Las piezas industriales fabricadas en serie son congruentes entre sí.' },
          { icon: '🪞', text: 'La reflexión de una figura produce una figura congruente (imagen especular).' },
          { icon: '🎭', text: 'Las máscaras gemelas en teatro son congruentes: misma forma y tamaño.' }
        ],
        commonErrors: [
          { title: 'El orden de los vértices importa', description: 'ΔABC ≅ ΔDEF significa A↔D, B↔E, C↔F. Si dice ΔABC ≅ ΔFDE entonces A↔F, B↔D, C↔E.' },
          { title: 'LAL requiere el ángulo ENTRE los lados', description: 'Los dos lados conocidos deben "encerrar" el ángulo. Si el ángulo no está entre los lados, no es LAL.' },
          { title: 'AAL ≠ AAA', description: 'AAA (tres ángulos iguales) garantiza semejanza pero NO congruencia (las figuras pueden ser proporcionales pero de diferente tamaño).' }
        ]
      },
      examples: [
        {
          title: 'Identificar el criterio de congruencia',
          problem: 'En dos triángulos: AB = DE = 5 cm, BC = EF = 7 cm, y ∠B = ∠E = 60°. ¿Son congruentes? ¿Por qué?',
          steps: [
            { action: 'Identifica los datos', why: '', formula: 'AB=DE=5, BC=EF=7, ∠B=∠E=60°', result: '' },
            { action: 'El ángulo ∠B está entre AB y BC', why: 'El ángulo está encerrado por los dos lados conocidos', formula: '', result: '' },
            { action: 'Aplica el criterio', why: 'Dos lados y el ángulo comprendido', formula: 'Criterio LAL (SAS)', result: 'ΔABC ≅ ΔDEF ✓' }
          ]
        },
        {
          title: 'Usar congruencia para encontrar elementos',
          problem: 'Si ΔPQR ≅ ΔXYZ, PQ = 8 cm, QR = 6 cm, ∠P = 45°. ¿Cuánto mide XY?',
          steps: [
            { action: 'Identifica la correspondencia', why: 'P↔X, Q↔Y, R↔Z', formula: '', result: '' },
            { action: 'PQ corresponde a XY', why: 'Lados correspondientes en triángulos congruentes son iguales', formula: 'XY = PQ = 8 cm', result: '8 cm' }
          ]
        }
      ],
      visual: { type: 'geo-congruencia' },
      discovery: [
        { title: '¿Cuánta información necesitas?', text: 'Para construir un triángulo único necesitas al menos 3 partes específicas (como LLL o LAL). Con solo 3 ángulos (AAA) podrías construir infinitos triángulos similares pero de distinto tamaño.', question: '¿Por qué con tres lados (LLL) hay un único triángulo posible?' }
      ],
      exercises: { topic: 'geo_congruencia', generators: [] },
      advanced: {
        title: 'Congruencia en demostraciones',
        challenges: [
          { title: 'La diagonal del paralelogramo', problem: 'Demuestra que la diagonal de un paralelogramo divide al paralelogramo en dos triángulos congruentes.', hint: 'En ABCD paralelo, la diagonal AC crea ΔABC y ΔCDA. Identifica los lados y ángulos iguales.', solution: 'AB=CD, BC=DA (lados opuestos del paralelog.), AC=CA (compartido). Por LLL: ΔABC ≅ ΔCDA.' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 4. SEMEJANZA
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-semejanza', courseId: 'geometria', topic: 'Semejanza de Triángulos',
      title: 'La misma forma, diferente tamaño', level: 4,
      grades: '7°–8° Básico', duration: 30, xpReward: 130,
      icon: '🔍', color: '#10B981',
      summary: 'Aplica los criterios de semejanza (AA, SAS~, SSS~) y calcula razones de lados y áreas.',
      keyPoints: [
        'Figuras semejantes: misma forma, distinto tamaño (∼)',
        'AA: dos pares de ángulos iguales → triángulos semejantes',
        'La razón de semejanza k es el cociente de lados correspondientes',
        'Razón de áreas = k²; razón de volúmenes = k³'
      ],
      concept: {
        what: 'Dos figuras son **semejantes** (∼) si tienen la misma forma pero no necesariamente el mismo tamaño. Todos sus ángulos son iguales y sus lados son proporcionales.',
        why: 'La semejanza es el principio detrás de los mapas, escalas de planos, proyecciones de cine y calcular alturas con sombras.',
        realLife: [
          { icon: '🗺️', text: 'Un mapa 1:50000 es semejante al terreno real (todo reducido en razón 50000).' },
          { icon: '📷', text: 'Una foto ampliada es semejante al negativo original.' },
          { icon: '🌲', text: 'Medir la altura de un árbol usando tu sombra y la del árbol (triángulos semejantes).' }
        ],
        commonErrors: [
          { title: 'Semejante ≠ Congruente', description: 'Congruente = misma forma Y mismo tamaño. Semejante = misma forma, posiblemente distinto tamaño. Todo congruente es semejante (k=1), pero no viceversa.' },
          { title: 'La razón de áreas se eleva al cuadrado', description: 'Si la razón lineal es k=3, el área no es 3 veces mayor sino 9 veces (k²=9).' },
          { title: 'Identificar correctamente los lados correspondientes', description: 'Los lados correspondientes son los opuestos a ángulos iguales, no necesariamente los que están en la misma posición visual.' }
        ]
      },
      examples: [
        {
          title: 'Calcular un lado usando semejanza',
          problem: 'ΔABC ∼ ΔDEF con razón 3:1. Si AB = 6 cm, ¿cuánto mide DE?',
          steps: [
            { action: 'Razón de semejanza k = 3', why: 'El triángulo ABC es 3 veces el de DEF', formula: 'AB/DE = 3', result: '' },
            { action: 'Despeja DE', why: '', formula: 'DE = AB/3 = 6/3', result: 'DE = 2 cm' }
          ]
        },
        {
          title: 'Razón de áreas',
          problem: 'Dos triángulos semejantes tienen razón de semejanza 4. El área del menor es 9 cm². ¿Cuánto es el área del mayor?',
          steps: [
            { action: 'Razón de áreas = k²', why: 'Las áreas escalan con el cuadrado', formula: 'Razón áreas = 4² = 16', result: '' },
            { action: 'Área mayor', why: '', formula: 'A₂ = 9 × 16 = 144 cm²', result: '144 cm²' }
          ]
        }
      ],
      visual: { type: 'geo-semejanza' },
      discovery: [
        { title: 'Medir un árbol con tu sombra', text: 'Parado al sol, tu sombra y tú forman un triángulo semejante al triángulo árbol-sombra. Si mides 1.7 m y tu sombra es 2 m, y la sombra del árbol mide 10 m...', question: '¿Cuánto mide el árbol? (Usa proporciones de triángulos semejantes)' }
      ],
      exercises: { topic: 'geo_semejanza', generators: [] },
      advanced: {
        title: 'Semejanza y escalas',
        challenges: [
          { title: 'El plano arquitectónico', problem: 'En un plano a escala 1:200, una habitación mide 4 cm × 3 cm. ¿Cuáles son las dimensiones reales? ¿Y su área real en m²?', hint: 'Multiplica por 200 cada dimensión. Para el área, usa la razón k²=200²=40000.', solution: 'Dimensiones reales: 8m × 6m. Área real = 4×3×200² cm² = 12×40000 cm² = 48 m².' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 5. TEOREMA DE PITÁGORAS
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-pitagoras', courseId: 'geometria', topic: 'Teorema de Pitágoras',
      title: 'El teorema más famoso de la matemática', level: 5,
      grades: '7°–8° Básico', duration: 35, xpReward: 150,
      icon: '📐', color: '#10B981',
      summary: 'Aplica el teorema a²+b²=c² para encontrar lados de triángulos rectángulos y distancias.',
      keyPoints: [
        '\\(a^2 + b^2 = c^2\\) donde c es la hipotenusa (frente al ángulo recto)',
        'La hipotenusa es siempre el lado más largo del triángulo rectángulo',
        'Ternas pitagóricas clásicas: (3,4,5), (5,12,13), (8,15,17)',
        'Se usa para calcular distancias, diagonales y en problemas 3D'
      ],
      concept: {
        what: 'El **Teorema de Pitágoras** establece que en todo triángulo rectángulo, el cuadrado de la hipotenusa (\\(c\\)) es igual a la suma de los cuadrados de los catetos (\\(a\\) y \\(b\\)): \\(a^2+b^2=c^2\\).',
        why: 'Es la fórmula más aplicada de toda la geometría: aparece en arquitectura, navegación, física, cálculo de distancias en mapas y en el teorema de Pitágoras generalizado en 3D.',
        realLife: [
          { icon: '🏗️', text: 'Para verificar que una esquina es exactamente 90°, los albañiles usan la terna (3,4,5): si a=3, b=4 y c=5 exacto, el ángulo es recto.' },
          { icon: '📡', text: 'La distancia a una señal de TV en una torre se calcula con Pitágoras (catetos = distancia horizontal + altura).' },
          { icon: '🎮', text: 'En videojuegos 2D la distancia entre dos puntos usa la fórmula pitagórica.' },
          { icon: '✈️', text: 'Los pilotos calculan la trayectoria real (diagonal) usando las componentes horizontal y vertical.' }
        ],
        commonErrors: [
          { title: 'Confundir hipotenusa con cateto', description: 'La hipotenusa (c) es el lado OPUESTO al ángulo recto, siempre el más largo. Los catetos (a, b) son los otros dos lados.' },
          { title: 'a² + b² ≠ (a+b)²', description: '\\(3^2+4^2=25\\neq(3+4)^2=49\\). Debes elevar al cuadrado CADA lado por separado.' },
          { title: 'Olvidar la raíz cuadrada al final', description: 'Después de calcular c²=25, todavía debes sacar la raíz: c=√25=5, no c=25.' }
        ]
      },
      examples: [
        {
          title: 'Calcular la hipotenusa',
          problem: 'Un triángulo rectángulo tiene catetos 6 y 8 cm. ¿Cuánto mide la hipotenusa?',
          steps: [
            { action: 'Aplica el teorema', why: 'a=6, b=8', formula: 'c² = 6² + 8² = 36 + 64', result: 'c² = 100' },
            { action: 'Saca la raíz cuadrada', why: '', formula: 'c = √100', result: 'c = 10 cm' }
          ]
        },
        {
          title: 'Calcular un cateto desconocido',
          problem: 'Un triángulo rectángulo tiene cateto 5 cm e hipotenusa 13 cm. ¿Cuánto mide el otro cateto?',
          steps: [
            { action: 'Despeja el cateto', why: 'a²= c²−b²', formula: 'a² = 13² − 5² = 169 − 25', result: 'a² = 144' },
            { action: 'Raíz cuadrada', why: '', formula: 'a = √144', result: 'a = 12 cm' }
          ]
        },
        {
          title: 'Diagonal de un rectángulo',
          problem: 'Una pantalla mide 80 cm × 60 cm. ¿Cuánto mide la diagonal (tamaño de pantalla)?',
          steps: [
            { action: 'La diagonal es la hipotenusa', why: 'Forma un triángulo rectángulo con los lados del rectángulo', formula: 'd² = 80² + 60² = 6400 + 3600', result: 'd² = 10000' },
            { action: 'Raíz', why: '', formula: 'd = √10000', result: 'd = 100 cm = 1 metro' }
          ]
        }
      ],
      visual: { type: 'geo-pythagorean' },
      discovery: [
        { title: 'Prueba geométrica del teorema', text: 'Dibuja un triángulo rectángulo con catetos a y b. Construye un cuadrado sobre cada lado. El área del cuadrado de la hipotenusa (c²) es igual a la suma de las áreas de los cuadrados de los catetos (a²+b²).', question: '¿Cuánto mide la hipotenusa si los catetos son 1 y 1? ¿Es un número racional o irracional?' }
      ],
      exercises: { topic: 'geo_pitagoras', generators: [] },
      advanced: {
        title: 'Pitágoras en 3 dimensiones',
        challenges: [
          { title: 'La diagonal del cubo', problem: 'Un cubo tiene arista a. Demuestra que su diagonal interior mide \\(a\\sqrt{3}\\).', hint: 'Primero halla la diagonal de la base: d_base=a√2. Luego aplica Pitágoras con la altura del cubo.', solution: 'd² = (a√2)² + a² = 2a² + a² = 3a². Por tanto d = a√3.' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 6. POLÍGONOS
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-poligonos', courseId: 'geometria', topic: 'Polígonos',
      title: 'Figuras de lados rectos', level: 6,
      grades: '7°–8° Básico', duration: 30, xpReward: 120,
      icon: '🔷', color: '#10B981',
      summary: 'Estudia la suma de ángulos interiores y exteriores, y las propiedades de los polígonos regulares.',
      keyPoints: [
        'Suma de ángulos interiores de un polígono de n lados: \\((n-2)\\times 180°\\)',
        'Suma de ángulos exteriores de cualquier polígono convexo: siempre 360°',
        'Número de diagonales: \\(n(n-3)/2\\)',
        'Polígono regular: todos los lados y todos los ángulos son iguales'
      ],
      concept: {
        what: 'Un **polígono** es una figura plana cerrada formada por segmentos de línea recta (lados). Según el número de lados: triángulo (3), cuadrilátero (4), pentágono (5), hexágono (6), etc.',
        why: 'Los polígonos modelan desde azulejos (hexágonos en la naturaleza) hasta señales de tráfico, monedas y estructuras arquitectónicas.',
        realLife: [
          { icon: '🐝', text: 'Los panales de abejas son hexágonos regulares: maximizan el espacio con el mínimo material.' },
          { icon: '🔴', text: 'Las señales de alto (STOP) son octógonos: forma fácil de reconocer a distancia.' },
          { icon: '⚽', text: 'Una pelota de fútbol combina pentágonos (negros) y hexágonos (blancos).' }
        ],
        commonErrors: [
          { title: 'La fórmula usa (n−2), no n', description: 'Suma = (n−2)×180°. Para un triángulo: (3−2)×180=180°. Para un cuadrilátero: (4−2)×180=360°.' },
          { title: 'Ángulos exteriores SIEMPRE suman 360°', description: 'Sin importar cuántos lados tenga el polígono convexo, la suma de sus ángulos exteriores es siempre 360°.' }
        ]
      },
      examples: [
        {
          title: 'Suma de ángulos interiores',
          problem: '¿Cuánto suman los ángulos interiores de un octógono (8 lados)?',
          steps: [
            { action: 'Aplica la fórmula', why: '', formula: '(n-2) × 180° = (8-2) × 180°', result: '' },
            { action: 'Calcula', why: '', formula: '6 × 180°', result: '1080°' }
          ]
        },
        {
          title: 'Cada ángulo de un polígono regular',
          problem: '¿Cuánto mide cada ángulo interior de un hexágono regular?',
          steps: [
            { action: 'Suma total', why: '', formula: '(6−2)×180° = 720°', result: '' },
            { action: 'Divide entre 6', why: 'Polígono regular: todos iguales', formula: '720°/6', result: '120°' }
          ]
        }
      ],
      visual: { type: 'geo-polygon' },
      discovery: [
        { title: 'El ángulo exterior da una vuelta completa', text: 'Imagina que caminas por el borde de un polígono convexo. En cada vértice giras hacia afuera. Al completar el recorrido has girado exactamente 360°. Esto explica por qué la suma siempre es 360°, sin importar el número de lados.', question: '¿Cuánto giras en cada vértice de un polígono regular de 10 lados?' }
      ],
      exercises: { topic: 'geo_poligonos', generators: [] },
      advanced: {
        title: 'Polígonos regulares y diseño',
        challenges: [
          { title: 'El azulejo perfecto', problem: 'Solo tres polígonos regulares pueden teselar (cubrir el plano sin huecos): triángulo (60°), cuadrado (90°) y hexágono (120°). ¿Por qué? ¿Qué tiene de especial 60°, 90° y 120°?', hint: 'Para teselar, el ángulo interior debe ser divisor exacto de 360°.', solution: '360°/60°=6, 360°/90°=4, 360°/120°=3. Todos son divisores enteros de 360°. El pentágono (108°) no divide exactamente.' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 7. PERÍMETRO
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-perimetro', courseId: 'geometria', topic: 'Perímetro',
      title: 'La longitud del contorno', level: 7,
      grades: '5°–7° Básico', duration: 25, xpReward: 100,
      icon: '📏', color: '#10B981',
      summary: 'Calcula el perímetro de rectángulos, triángulos, polígonos regulares y resuelve problemas reales.',
      keyPoints: [
        'Perímetro = suma de todos los lados de la figura',
        'Rectángulo: \\(P = 2(l+w)\\)',
        'Cuadrado: \\(P = 4l\\)',
        'Polígono regular: \\(P = n \\times l\\)'
      ],
      concept: {
        what: 'El **perímetro** es la longitud total del contorno de una figura plana. Es como medir el borde exterior.',
        why: 'El perímetro determina cuánta cerca rodea un terreno, cuánto marco necesita un cuadro, o cuánto bordado lleva un mantel.',
        realLife: [
          { icon: '🏡', text: 'Para cercar un jardín rectangular de 12m×8m se necesitan 2(12+8)=40m de cerca.' },
          { icon: '🖼️', text: 'El marco de un cuadro cuadrado de 60 cm de lado usa 4×60=240cm de marco.' },
          { icon: '🏃', text: 'Una pista de atletismo estándar tiene perímetro de 400m.' }
        ],
        commonErrors: [
          { title: 'Confundir perímetro con área', description: 'Perímetro = longitud del borde (cm, m). Área = superficie interior (cm², m²). Son dimensiones completamente diferentes.' },
          { title: 'Olvidar multiplicar por 2 en el rectángulo', description: 'El rectángulo tiene 4 lados: 2 largos y 2 anchos. P = 2l + 2w = 2(l+w).' }
        ]
      },
      examples: [
        {
          title: 'Perímetro de un rectángulo',
          problem: 'Un terreno mide 15 m × 9 m. ¿Cuántos metros de cerco se necesitan?',
          steps: [
            { action: 'Fórmula', why: '', formula: 'P = 2(l+w) = 2(15+9)', result: '' },
            { action: 'Calcula', why: '', formula: '2 × 24', result: 'P = 48 m' }
          ]
        },
        {
          title: 'Encontrar el lado desde el perímetro',
          problem: 'El perímetro de un cuadrado es 52 cm. ¿Cuánto mide su lado?',
          steps: [
            { action: 'Despeja l', why: 'P = 4l', formula: 'l = P/4 = 52/4', result: 'l = 13 cm' }
          ]
        }
      ],
      visual: { type: 'geo-area' },
      discovery: [
        { title: '¿Mismo perímetro, diferente área?', text: 'Con 20 metros de cerca puedes hacer un rectángulo de 8×2 (área=16) o de 5×5 (área=25). El cuadrado maximiza el área para un perímetro dado.', question: '¿Cuál figura encierra más terreno con 20m de cerca: un rectángulo de 9×1 o uno de 4×6?' }
      ],
      exercises: { topic: 'geo_perimetro', generators: [] },
      advanced: {
        title: 'Perímetro y optimización',
        challenges: [
          { title: 'El campo de máximo rendimiento', problem: 'Con 100 m de cerca quieres encerrar el mayor terreno rectangular posible contra una pared recta (que actúa de cuarto lado). ¿Qué dimensiones maximizan el área?', hint: 'Solo 3 lados de cerca: 2x + y = 100. Maximiza A = x×y.', solution: 'y = 100−2x. A = x(100−2x). Máximo en x=25: A = 25×50 = 1250 m².' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 8. ÁREA
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-area', courseId: 'geometria', topic: 'Área de Figuras Planas',
      title: 'Cuánto espacio ocupa una figura', level: 8,
      grades: '6°–8° Básico', duration: 35, xpReward: 140,
      icon: '🟩', color: '#10B981',
      summary: 'Calcula áreas de cuadrados, rectángulos, triángulos, paralelogramos, trapecios y figuras compuestas.',
      keyPoints: [
        'Cuadrado: \\(A = l^2\\)',
        'Rectángulo: \\(A = l \\times w\\)',
        'Triángulo: \\(A = \\dfrac{b \\times h}{2}\\)',
        'Paralelogramo: \\(A = b \\times h\\)',
        'Trapecio: \\(A = \\dfrac{(b_1+b_2) \\times h}{2}\\)'
      ],
      concept: {
        what: 'El **área** es la medida de la superficie de una figura plana. Se mide en unidades cuadradas (cm², m², km²). A diferencia del perímetro, el área mide el INTERIOR de la figura.',
        why: 'El área determina cuánto pintar una pared, cuánta tela usar, cuánto moqueta comprar, cuántos m² tiene un apartamento.',
        realLife: [
          { icon: '🪟', text: 'Para pintar una pared de 3m×4m se necesitan pintar 12 m² de superficie.' },
          { icon: '🌾', text: 'Un campo triangular con base 200m y altura 150m tiene 200×150/2=15000 m².' },
          { icon: '🏊', text: 'Una piscina olímpica de 50m×25m tiene área de 1250 m².' }
        ],
        commonErrors: [
          { title: 'Área ≠ Perímetro', description: 'Un cuadrado de 4 cm tiene perímetro 16 cm pero área 16 cm². Coinciden en este caso por azar; no es general.' },
          { title: 'Olvidar dividir por 2 en el triángulo', description: 'El triángulo ocupa la mitad del rectángulo de misma base y altura: A = (b×h)/2.' },
          { title: 'La altura del paralelogramo es la perpendicular', description: 'En un paralelogramo la altura h no es el lado oblicuo sino la distancia perpendicular entre las bases.' }
        ]
      },
      examples: [
        {
          title: 'Área de un triángulo',
          problem: 'Un triángulo tiene base 10 cm y altura 7 cm. ¿Cuál es su área?',
          steps: [
            { action: 'Fórmula del triángulo', why: '', formula: 'A = (b×h)/2 = (10×7)/2', result: '' },
            { action: 'Calcula', why: '', formula: '70/2', result: 'A = 35 cm²' }
          ]
        },
        {
          title: 'Área de un trapecio',
          problem: 'Un trapecio tiene bases 12 y 8 cm, y altura 5 cm. ¿Cuál es su área?',
          steps: [
            { action: 'Fórmula del trapecio', why: '', formula: 'A = ((b₁+b₂)/2)×h = ((12+8)/2)×5', result: '' },
            { action: 'Calcula', why: '', formula: '(20/2)×5 = 10×5', result: 'A = 50 cm²' }
          ]
        },
        {
          title: 'Figura compuesta',
          problem: 'Un salón en L tiene dos rectángulos: uno de 8×4 m y otro de 3×2 m. ¿Cuál es el área total?',
          steps: [
            { action: 'Área rectángulo 1', why: '', formula: '8×4 = 32 m²', result: '' },
            { action: 'Área rectángulo 2', why: '', formula: '3×2 = 6 m²', result: '' },
            { action: 'Suma total', why: '', formula: '32 + 6', result: 'A total = 38 m²' }
          ]
        }
      ],
      visual: { type: 'geo-area' },
      discovery: [
        { title: '¿Por qué el triángulo es la mitad del rectángulo?', text: 'Dibuja un triángulo dentro de su rectángulo mínimo (misma base y misma altura). Puedes cortar el triángulo y rearmar las dos partes restantes para llenar exactamente la otra mitad del rectángulo.', question: '¿Qué pasa con el área de un triángulo si duplicas solo la base? ¿Y si duplicas solo la altura?' }
      ],
      exercises: { topic: 'geo_area', generators: [] },
      advanced: {
        title: 'Área y diferencia',
        challenges: [
          { title: 'El marco de la foto', problem: 'Una foto tiene 20×15 cm. Un marco agrega 3 cm en cada borde. ¿Cuántos cm² ocupa solo el marco (no la foto)?', hint: 'Área total (con marco) − Área de la foto.', solution: 'Área total = 26×21 = 546 cm². Foto = 300 cm². Marco = 246 cm².' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 9. CIRCUNFERENCIA
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-circunferencia', courseId: 'geometria', topic: 'Circunferencia',
      title: 'El camino del radio', level: 9,
      grades: '7°–8° Básico', duration: 30, xpReward: 130,
      icon: '⭕', color: '#10B981',
      summary: 'Calcula longitud de circunferencias, arcos, ángulos centrales e inscritos.',
      keyPoints: [
        'Longitud de circunferencia: \\(C = 2\\pi r = \\pi d\\)',
        'Longitud de arco: \\(L = \\dfrac{\\theta}{360°} \\times 2\\pi r\\)',
        'Ángulo inscrito = la mitad del ángulo central que subtiende el mismo arco',
        'π ≈ 3.14159 (irracional, aproximado frecuentemente como 3.14 o 22/7)'
      ],
      concept: {
        what: 'La **circunferencia** es la curva cerrada donde todos los puntos están a la misma distancia (radio r) del centro. No confundir con el "círculo" que es la región interior.',
        why: 'Circunferencias y arcos aparecen en ruedas, engranajes, satélites, ondas y en la definición de los ángulos trigonométricos.',
        realLife: [
          { icon: '🚲', text: 'Una rueda de bicicleta con radio 35 cm avanza 2π×35 ≈ 220 cm por vuelta.' },
          { icon: '🌍', text: 'La circunferencia de la Tierra en el ecuador es ≈ 40,075 km.' },
          { icon: '🎡', text: 'La noria de la Expo tiene radio 60 m: longitud de la noria = 2π×60 ≈ 377 m.' }
        ],
        commonErrors: [
          { title: 'C = 2πr, no πr ni πr²', description: '2πr es la longitud (perímetro) del círculo. πr² es el ÁREA. Son fórmulas completamente distintas.' },
          { title: 'Radio vs diámetro', description: 'El diámetro d = 2r. Si tienes el diámetro, divide por 2 para obtener el radio antes de aplicar las fórmulas.' },
          { title: 'Unidades de arco: grados vs radianes', description: 'La fórmula L = (θ/360°)×2πr usa θ en GRADOS. Si θ está en radianes, la fórmula es L = r×θ.' }
        ]
      },
      examples: [
        {
          title: 'Longitud de circunferencia',
          problem: 'Un reloj tiene un minutero de 15 cm. ¿Cuánto recorre en 30 minutos?',
          steps: [
            { action: 'En 60 min recorre una vuelta completa', why: 'Circunferencia completa', formula: 'C = 2π×15 ≈ 94.25 cm', result: '' },
            { action: 'En 30 min recorre la mitad', why: '30/60 = 1/2 del círculo', formula: '94.25/2', result: '≈ 47.12 cm' }
          ]
        },
        {
          title: 'Longitud de un arco',
          problem: 'En una circunferencia de radio 10 cm, ¿cuánto mide el arco de 72°?',
          steps: [
            { action: 'Fórmula del arco', why: '', formula: 'L = (72/360) × 2π × 10', result: '' },
            { action: 'Simplifica', why: '72/360 = 1/5', formula: '(1/5) × 2π × 10 = 4π', result: 'L ≈ 12.57 cm' }
          ]
        }
      ],
      visual: { type: 'geo-circle' },
      discovery: [
        { title: 'Qué es π exactamente', text: 'π es el cociente entre la circunferencia y el diámetro de CUALQUIER círculo. No importa el tamaño del círculo: C/d siempre es el mismo número irracional ≈ 3.14159...', question: 'Si mides la circunferencia de una lata (aprox. 26 cm) y su diámetro (aprox. 8.3 cm), ¿qué cociente obtienes?' }
      ],
      exercises: { topic: 'geo_circunferencia', generators: [] },
      advanced: {
        title: 'Arcos y ángulos',
        challenges: [
          { title: 'El reloj y los ángulos', problem: 'A las 10:00 el minutero apunta a las 12 y el horario a las 10. ¿Cuánto mide el arco del círculo del reloj (radio 12 cm) entre ambas agujas?', hint: '¿Qué ángulo central forman las agujas a las 10:00? (Cada hora = 30°)', solution: '10:00 → el horario está a 60° del minutero (2 horas × 30°/hora). Arco = (60/360)×2π×12 = 4π ≈ 12.57 cm.' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 10. CÍRCULO
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-circulo', courseId: 'geometria', topic: 'Área del Círculo',
      title: 'El espacio dentro de la curva perfecta', level: 10,
      grades: '7°–8° Básico', duration: 30, xpReward: 130,
      icon: '🔵', color: '#10B981',
      summary: 'Calcula áreas de círculos, sectores circulares y coronas (anillos), con aplicaciones reales.',
      keyPoints: [
        'Área del círculo: \\(A = \\pi r^2\\)',
        'Área del sector: \\(A_s = \\dfrac{\\theta}{360°} \\times \\pi r^2\\)',
        'Área de la corona (anillo): \\(A = \\pi(R^2 - r^2)\\)',
        'Para el diámetro d: \\(r = d/2\\) antes de calcular'
      ],
      concept: {
        what: 'El **círculo** es la región plana encerrada por una circunferencia. Su área (\\(\\pi r^2\\)) mide cuánto espacio ocupa ese disco.',
        why: 'El área del círculo es fundamental para ingeniería (tuberías, engranajes), diseño (botones, tapas), pizza (precio/m²) y física (ondas circulares).',
        realLife: [
          { icon: '🍕', text: 'Una pizza de radio 20 cm tiene área πr²≈1257 cm². ¿Es más conveniente que dos de radio 10 cm? (Dos pizzas: 2×π×100≈628 cm²)' },
          { icon: '💿', text: 'Un CD tiene radio exterior 6 cm y agujero de radio 0.75 cm: área = π(36−0.5625) ≈ 110.5 cm².' },
          { icon: '🚰', text: 'Una tubería de radio r lleva πr² unidades de flujo por corte transversal.' }
        ],
        commonErrors: [
          { title: 'A = πr² no πd²', description: 'Si te dan el diámetro d, el radio es r=d/2. Error frecuente: usar el diámetro directamente donde va el radio.' },
          { title: 'Sector: usar la fracción del ángulo correctamente', description: 'Sector de 90° = 1/4 del círculo (90°/360°=1/4). Sector de 120° = 1/3 del círculo.' },
          { title: 'Confundir πr con πr²', description: 'πr no es una fórmula estándar. πr² es el área; 2πr es la circunferencia.' }
        ]
      },
      examples: [
        {
          title: 'Área del círculo desde el diámetro',
          problem: 'Una rueda tiene diámetro 80 cm. ¿Cuántos cm² de goma tiene la superficie?',
          steps: [
            { action: 'Halla el radio', why: 'r = d/2', formula: 'r = 80/2 = 40 cm', result: '' },
            { action: 'Aplica la fórmula', why: '', formula: 'A = π × 40²= π × 1600', result: 'A ≈ 5026.55 cm²' }
          ]
        },
        {
          title: 'Área de un sector circular',
          problem: '¿Cuántos cm² tiene un sector de 45° en un círculo de radio 6 cm?',
          steps: [
            { action: 'Fracción del círculo', why: '45°/360° = 1/8', formula: 'As = (1/8) × π × 6²', result: '' },
            { action: 'Calcula', why: '', formula: '(1/8) × 36π = 4.5π', result: '≈ 14.14 cm²' }
          ]
        }
      ],
      visual: { type: 'geo-circle' },
      discovery: [
        { title: 'La pizza más rentable', text: 'Una pizzería vende pizza individual (radio 10 cm, $5000) y familiar (radio 20 cm, $15000). ¿Cuál da más cm² por peso?', question: '¿Cuánto cm²/$1000 da cada pizza? (Recuerda: la familiar tiene 4 veces el radio al cuadrado)' }
      ],
      exercises: { topic: 'geo_circulo', generators: [] },
      advanced: {
        title: 'Anillos y sectores',
        challenges: [
          { title: 'El anillo del CD', problem: 'Un CD tiene radio exterior 6 cm y el orificio central tiene radio 0.75 cm. La pista de datos va de r=2.5 cm a r=5.8 cm. ¿Cuántos cm² tiene la zona de datos?', hint: 'Área anillo = π(R²−r²) con R=5.8 y r=2.5.', solution: 'A = π(5.8²−2.5²) = π(33.64−6.25) = 27.39π ≈ 86.03 cm².' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 11. SÓLIDOS GEOMÉTRICOS
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-solidos', courseId: 'geometria', topic: 'Sólidos Geométricos',
      title: 'Las figuras del espacio tridimensional', level: 11,
      grades: '7°–2° Medio', duration: 35, xpReward: 140,
      icon: '🎲', color: '#10B981',
      summary: 'Identifica sólidos, aplica la fórmula de Euler y calcula áreas laterales y totales.',
      keyPoints: [
        'Poliedros: sólidos de caras planas. Fórmula de Euler: \\(V - A + C = 2\\)',
        'Cubo: 8V, 12A, 6C. Área total = \\(6l^2\\). Volumen = \\(l^3\\)',
        'Cilindro: área total = \\(2\\pi r(r+h)\\)',
        'Los sólidos de revolución (cilindro, cono, esfera) tienen caras curvas'
      ],
      concept: {
        what: 'Un **sólido geométrico** es una figura tridimensional con largo, ancho y alto. Los poliedros tienen todas sus caras planas; los sólidos de revolución tienen caras curvas.',
        why: 'Identificar sólidos es crucial en ingeniería, arquitectura, packaging (cajas, latas, tubos) y visualización científica.',
        realLife: [
          { icon: '📦', text: 'Las cajas son prismas rectangulares. La fórmula V=lwh dice cuánto cabe dentro.' },
          { icon: '🥫', text: 'Las latas son cilindros. Su área total determina cuánto metal se usa.' },
          { icon: '🍦', text: 'Un cucurucho de helado es un cono. El volumen = cuánto helado cabe.' },
          { icon: '⚽', text: 'Una pelota es una esfera. V=(4/3)πr³.' }
        ],
        commonErrors: [
          { title: 'Fórmula de Euler solo para poliedros convexos', description: 'V−A+C=2 aplica a poliedros convexos. No aplica a esferas (sin vértices ni aristas rectas).' },
          { title: 'El área lateral no incluye las bases', description: 'Área lateral del cilindro = 2πrh. Área TOTAL incluye además las 2 bases: +2πr².' }
        ]
      },
      examples: [
        {
          title: 'Verificar Euler en un cubo',
          problem: 'Verifica la fórmula de Euler para el cubo.',
          steps: [
            { action: 'Cuenta elementos del cubo', why: '', formula: 'Vértices (V)=8, Aristas (A)=12, Caras (C)=6', result: '' },
            { action: 'Aplica Euler', why: '', formula: 'V − A + C = 8 − 12 + 6', result: '= 2 ✓' }
          ]
        },
        {
          title: 'Área total de un cilindro',
          problem: 'Una lata de conservas tiene radio 4 cm y altura 10 cm. ¿Cuánto mide su área total?',
          steps: [
            { action: 'Área lateral', why: '2πrh', formula: '2π×4×10 = 80π', result: '' },
            { action: 'Área de 2 bases', why: '2×πr²', formula: '2×π×16 = 32π', result: '' },
            { action: 'Área total', why: '', formula: '80π + 32π = 112π', result: '≈ 351.86 cm²' }
          ]
        }
      ],
      visual: { type: 'geo-volume' },
      discovery: [
        { title: 'Desarrollos planos (nets)', text: 'Si "abres" un cubo y lo aplanas obtienes su desarrollo plano: 6 cuadrados conectados. Hay 11 desarrollos planos distintos para el cubo.', question: '¿Cuántos cuadrados tiene el desarrollo plano de un cubo? ¿Para qué sirve conocer el desarrollo?' }
      ],
      exercises: { topic: 'geo_solidos', generators: [] },
      advanced: {
        title: 'Áreas de sólidos',
        challenges: [
          { title: 'La pirámide de Keops', problem: 'La Gran Pirámide tiene base cuadrada de 230m y apotema lateral ≈ 186m. ¿Cuántos m² tiene su área lateral (4 caras triangulares)?', hint: 'Cada cara triangular: A = (1/2)×base×apotema.', solution: 'Área de 1 cara = (1/2)×230×186 = 21390 m². 4 caras = 85560 m² (≈ 8.6 hectáreas).' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 12. VOLUMEN
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-volumen', courseId: 'geometria', topic: 'Volumen de Sólidos',
      title: 'Cuánto cabe dentro de un sólido', level: 12,
      grades: '8°–2° Medio', duration: 40, xpReward: 160,
      icon: '📦', color: '#10B981',
      summary: 'Calcula volúmenes de prismas, cilindros, pirámides, conos y esferas con aplicaciones reales.',
      keyPoints: [
        'Prisma rectangular: \\(V = l \\times w \\times h\\)',
        'Cilindro: \\(V = \\pi r^2 h\\)',
        'Pirámide/Cono: \\(V = \\dfrac{1}{3} \\times B \\times h\\) (un tercio del prisma equivalente)',
        'Esfera: \\(V = \\dfrac{4}{3}\\pi r^3\\)'
      ],
      concept: {
        what: 'El **volumen** mide la cantidad de espacio tridimensional que ocupa un sólido. Se expresa en unidades cúbicas: cm³, m³, litros (1 litro = 1 dm³ = 1000 cm³).',
        why: 'El volumen determina cuánto líquido cabe en un recipiente, cuánto material se necesita para fabricar un objeto sólido, y cuánto espacio ocupa un paquete.',
        realLife: [
          { icon: '🪣', text: 'Un cubo de basura cilíndrico de radio 20 cm y altura 60 cm: V = π×400×60 ≈ 75398 cm³ ≈ 75 litros.' },
          { icon: '🎂', text: 'Un pastel cilíndrico de r=15 cm y h=8 cm: V ≈ π×225×8 ≈ 5655 cm³.' },
          { icon: '⛽', text: 'La capacidad de un tanque esférico de radio 3 m: V = (4/3)π×27 ≈ 113 m³ ≈ 113000 litros.' }
        ],
        commonErrors: [
          { title: 'Pirámide/Cono: dividir por 3', description: 'Una pirámide tiene exactamente 1/3 del volumen del prisma equivalente. V_pirámide = (1/3)×B×h. Sin el 1/3 el resultado es 3 veces mayor.' },
          { title: 'Radio al cubo en la esfera', description: 'V_esfera = (4/3)πr³. El exponente es 3, no 2. Si r=3: r³=27, no r²=9.' },
          { title: 'Convertir unidades antes de calcular', description: '1 m³ = 1000000 cm³ (no 1000). Cuidado con conversiones de unidades cúbicas.' }
        ]
      },
      examples: [
        {
          title: 'Volumen del cilindro',
          problem: 'Un vaso cilíndrico tiene radio 4 cm y altura 12 cm. ¿Cuántos cm³ de agua cabe?',
          steps: [
            { action: 'Aplica la fórmula', why: 'V = πr²h', formula: 'V = π × 4² × 12 = π × 16 × 12', result: '' },
            { action: 'Calcula', why: '', formula: '192π', result: '≈ 603.19 cm³ (≈ 0.6 litros)' }
          ]
        },
        {
          title: 'Volumen del cono vs cilindro',
          problem: 'Un cono y un cilindro tienen el mismo radio (5 cm) y altura (9 cm). ¿Cuánto más volumen tiene el cilindro?',
          steps: [
            { action: 'Cilindro', why: '', formula: 'V_cil = π×25×9 = 225π ≈ 706.86 cm³', result: '' },
            { action: 'Cono', why: 'V_cono = (1/3)×V_cil', formula: '225π/3 = 75π ≈ 235.62 cm³', result: '' },
            { action: 'Diferencia', why: '', formula: '706.86 − 235.62', result: '≈ 471.24 cm³ (3 veces más)' }
          ]
        }
      ],
      visual: { type: 'geo-volume' },
      discovery: [
        { title: 'Un tercio es exactamente 1/3', text: 'Los griegos demostraron que una pirámide cabe exactamente 3 veces dentro del prisma de misma base y altura. Puedes comprobarlo con arena o agua: llena una pirámide y vacíala 3 veces en el prisma equivalente.', question: '¿Cuántos conos llenas con el agua de un cilindro de igual radio y altura?' }
      ],
      exercises: { topic: 'geo_volumen', generators: [] },
      advanced: {
        title: 'Optimización de volumen',
        challenges: [
          { title: 'La lata más económica', problem: 'Una lata cilíndrica de 1 litro (1000 cm³) usa V=πr²h=1000. ¿Qué radio y altura minimizan el material (área total)?', hint: 'Con h=1000/(πr²), área total A=2πr²+2000/r. Iguala dA/dr=0.', solution: '4πr = 2000/r² → r³=500/π → r≈5.42 cm, h≈10.84 cm (h=2r es el óptimo).' }
        ]
      }
    },

    // ══════════════════════════════════════════════════════════════
    // 13. GEOMETRÍA ANALÍTICA
    // ══════════════════════════════════════════════════════════════
    {
      id: 'geo-analitica', courseId: 'geometria', topic: 'Geometría Analítica',
      title: 'El encuentro entre álgebra y geometría', level: 13,
      grades: '1°–2° Medio', duration: 40, xpReward: 170,
      icon: '📊', color: '#10B981',
      summary: 'Trabaja con puntos en el plano cartesiano: distancia, punto medio, pendiente y ecuación de la recta.',
      keyPoints: [
        'Distancia: \\(d = \\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\)',
        'Punto medio: \\(M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)\\)',
        'Pendiente: \\(m = \\frac{y_2-y_1}{x_2-x_1}\\)',
        'Ecuación de la recta: \\(y = mx + b\\) (forma pendiente-intersección)'
      ],
      concept: {
        what: 'La **geometría analítica** usa el sistema de coordenadas cartesianas para representar figuras geométricas mediante ecuaciones algebraicas. Une álgebra y geometría en un solo lenguaje.',
        why: 'Es la base del cálculo, la física analítica, los gráficos en computadoras y los sistemas de navegación GPS.',
        realLife: [
          { icon: '🗺️', text: 'El GPS usa coordenadas y distancias para ubicarte en el mapa.' },
          { icon: '🖥️', text: 'Cada píxel de una pantalla tiene coordenadas (x,y). Los gráficos usan ecuaciones de líneas y curvas.' },
          { icon: '✈️', text: 'Los pilotos trazan rutas como rectas en un plano de coordenadas.' },
          { icon: '📡', text: 'Los radares miden posición en coordenadas polares, convertibles a cartesianas.' }
        ],
        commonErrors: [
          { title: 'Raíz en la fórmula de distancia', description: '\\(d=\\sqrt{(\\Delta x)^2+(\\Delta y)^2}\\). Si calculas (Δx)²+(Δy)²=25, la distancia es √25=5, no 25.' },
          { title: 'Pendiente: Δy/Δx, no Δx/Δy', description: 'La pendiente es "cuánto sube Y por cada unidad de X". Si la recta sube 3 y avanza 2, m=3/2, no 2/3.' },
          { title: 'Punto medio: promedio de ambas coordenadas', description: 'Mx=(x₁+x₂)/2 Y My=(y₁+y₂)/2. Error frecuente: calcular solo una de las coordenadas del punto medio.' }
        ]
      },
      examples: [
        {
          title: 'Distancia entre dos puntos',
          problem: 'Calcula la distancia entre A(1, 2) y B(4, 6).',
          steps: [
            { action: 'Calcula las diferencias', why: '', formula: 'Δx = 4−1 = 3, Δy = 6−2 = 4', result: '' },
            { action: 'Aplica la fórmula', why: '', formula: 'd = √(3²+4²) = √(9+16)', result: '' },
            { action: 'Raíz', why: '', formula: '√25', result: 'd = 5' }
          ]
        },
        {
          title: 'Punto medio y pendiente',
          problem: 'Dados A(0, 4) y B(6, 0). Halla el punto medio y la pendiente de AB.',
          steps: [
            { action: 'Punto medio', why: '', formula: 'M = ((0+6)/2, (4+0)/2)', result: 'M = (3, 2)' },
            { action: 'Pendiente', why: '', formula: 'm = (0−4)/(6−0) = −4/6', result: 'm = −2/3' }
          ]
        },
        {
          title: 'Ecuación de la recta',
          problem: 'Una recta pasa por (2, 1) con pendiente 3. ¿Cuál es su ecuación?',
          steps: [
            { action: 'Usa y = mx + b', why: 'Sustituye el punto y la pendiente', formula: '1 = 3(2) + b → 1 = 6 + b', result: '' },
            { action: 'Despeja b', why: '', formula: 'b = 1 − 6 = −5', result: '' },
            { action: 'Ecuación final', why: '', formula: '', result: 'y = 3x − 5' }
          ]
        }
      ],
      visual: { type: 'geo-analytic' },
      discovery: [
        { title: 'La distancia como Pitágoras', text: 'La fórmula de distancia entre dos puntos ES el Teorema de Pitágoras. Los catetos son Δx y Δy, y la hipotenusa es la distancia buscada.', question: '¿Cuánto mide el segmento que une (0,0) con (3,4)? ¿Reconoces esta terna pitagórica?' }
      ],
      exercises: { topic: 'geo_analitica', generators: [] },
      advanced: {
        title: 'Rectas y circunferencias',
        challenges: [
          { title: 'La ecuación de la mediatriz', problem: 'Halla la ecuación de la mediatriz del segmento AB donde A(2,0) y B(8,4).', hint: 'La mediatriz pasa por el punto medio de AB y es perpendicular a AB. Calcula M, la pendiente de AB y la pendiente perpendicular.', solution: 'M=(5,2). m_AB=(4−0)/(8−2)=2/3. m_perp=−3/2. Ecuación: y−2=−(3/2)(x−5) → y=−(3/2)x+9.5.' }
        ]
      }
    }

  ];

  // ── Registro ──────────────────────────────────────────────────
  if (!window.MM_LESSONS) window.MM_LESSONS = [];
  LESSONS.forEach(lesson => {
    if (lesson.exercises && lesson.exercises.topic && window.MM_TOPIC_GENERATORS) {
      const gens = window.MM_TOPIC_GENERATORS[lesson.exercises.topic];
      if (gens && gens.length) lesson.exercises.generators = gens;
    }
    const idx = window.MM_LESSONS.findIndex(l => l.id === lesson.id);
    if (idx !== -1) window.MM_LESSONS.splice(idx, 1);
    window.MM_LESSONS.push(lesson);
  });
  if (!window.MM_LESSON_MAP) window.MM_LESSON_MAP = {};
  LESSONS.forEach(l => { window.MM_LESSON_MAP[l.id] = l; });

  console.log('[MM] content-geometria.js cargado:', LESSONS.length, 'lecciones');
})();
