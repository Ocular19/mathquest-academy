/* ═══════════════════════════════════════════════════════════════
   CONTENT-TRIGONOMETRIA.JS — 8 lecciones completas
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const LESSONS=[

    // ══════════════════════════════════════════════════════════
    // 1. RAZONES TRIGONOMÉTRICAS
    // ══════════════════════════════════════════════════════════
    {
      id:'trig-razones',courseId:'trigonometria',topic:'Razones Trigonométricas',
      title:'SOH-CAH-TOA: el puente entre ángulos y lados',
      level:1,grades:'2° Medio',duration:35,xpReward:150,
      icon:'📐',color:'#EF4444',
      summary:'Calcula seno, coseno y tangente en triángulos rectángulos y aplícalos para hallar lados desconocidos.',
      keyPoints:[
        'sen(θ) = cateto opuesto / hipotenusa (SOH)',
        'cos(θ) = cateto adyacente / hipotenusa (CAH)',
        'tan(θ) = cateto opuesto / cateto adyacente (TOA)',
        'La hipotenusa siempre es el lado opuesto al ángulo recto (el mayor)',
        'Identidad pitagórica: sen²(θ) + cos²(θ) = 1'
      ],
      concept:{
        what:'Las **razones trigonométricas** son cocientes entre los lados de un triángulo rectángulo. Permiten conectar los ángulos con las longitudes de los lados: si conoces el ángulo y un lado, puedes calcular cualquier otro.',
        why:'La trigonometría nació para resolver problemas de astronomía y navegación. Hoy se usa en arquitectura, física, ingeniería, videojuegos y procesamiento de señales.',
        realLife:[
          {icon:'🏗️',text:'Los ingenieros calculan la pendiente de rampas y puentes con tan(θ)=altura/base.'},
          {icon:'🚀',text:'NASA calcula trayectorias espaciales con funciones trigonométricas.'},
          {icon:'🎮',text:'Los motores 3D de videojuegos usan sen/cos para rotar objetos.'},
          {icon:'⛵',text:'Los navegantes usan trigonometría para calcular distancias en el mar.'}
        ],
        commonErrors:[
          {title:'Confundir opuesto y adyacente',description:'El cateto opuesto está FRENTE al ángulo θ. El adyacente está JUNTO a θ (pero no es la hipotenusa). Siempre identifica primero el ángulo de referencia.'},
          {title:'Confundir sen y cos',description:'Un truco: la s de "seno" va con la s de "sin" y la o de "opuesto". SOH: Seno=Opuesto/Hipotenusa.'},
          {title:'Usar el ángulo recto como referencia',description:'Las razones sen, cos, tan se calculan SIEMPRE respecto a un ángulo agudo del triángulo, nunca respecto al ángulo de 90°.'}
        ]
      },
      examples:[
        {
          title:'Calcular las tres razones trigonométricas',
          problem:'En un triángulo rectángulo, los catetos miden 3 y 4. Halla sen(θ), cos(θ) y tan(θ) para el ángulo opuesto al cateto de 3.',
          steps:[
            {action:'Hallar la hipotenusa con Pitágoras',why:'',formula:'c = √(3²+4²) = √25 = 5',result:'c = 5'},
            {action:'Calcular seno',why:'opuesto=3, hipotenusa=5',formula:'sen(θ) = 3/5',result:'0.6'},
            {action:'Calcular coseno',why:'adyacente=4, hipotenusa=5',formula:'cos(θ) = 4/5',result:'0.8'},
            {action:'Calcular tangente',why:'opuesto=3, adyacente=4',formula:'tan(θ) = 3/4',result:'0.75'},
          ]
        },
        {
          title:'Hallar un lado desconocido',
          problem:'Un triángulo rectángulo tiene ángulo θ=30° e hipotenusa de 10 cm. ¿Cuánto mide el cateto opuesto?',
          steps:[
            {action:'Identifica la razón correcta',why:'Tenemos el ángulo y la hipotenusa; buscamos el opuesto',formula:'sen(θ) = opuesto / hipotenusa',result:''},
            {action:'Sustituye',why:'',formula:'sen(30°) = opuesto / 10',result:''},
            {action:'Despeja',why:'sen(30°) = 0.5',formula:'opuesto = 10 × 0.5',result:'5 cm'},
          ]
        }
      ],
      visual:{type:'trig-right-triangle'},
      discovery:[
        {title:'¿Por qué SOH-CAH-TOA funciona para cualquier tamaño?',text:'Si amplías un triángulo rectángulo al doble, los tres lados se duplican, pero los COCIENTES no cambian. Por eso sen(30°)=0.5 sin importar el tamaño del triángulo.',question:'Si un triángulo tiene cateto opuesto 6 e hipotenusa 10, ¿cuánto vale sen(θ)? ¿Y si ambos se duplican?'}
      ],
      exercises:{topic:'trig_razones',generators:[]},
      advanced:{
        title:'Razones recíprocas',
        challenges:[
          {title:'Cosecante, secante y cotangente',problem:'Dado sen(θ)=3/5, calcula csc(θ)=1/sen(θ), cos(θ) por identidad, sec(θ)=1/cos(θ) y cot(θ)=cos(θ)/sen(θ).',hint:'Usa la identidad pitagórica para cos(θ).',solution:'cos(θ)=4/5. csc=5/3≈1.667, sec=5/4=1.25, cot=4/3≈1.333.'}
        ]
      }
    },

    // ══════════════════════════════════════════════════════════
    // 2. ÁNGULOS NOTABLES
    // ══════════════════════════════════════════════════════════
    {
      id:'trig-notables',courseId:'trigonometria',topic:'Ángulos Notables',
      title:'Los ángulos que todo matemático conoce de memoria',
      level:2,grades:'2° Medio',duration:30,xpReward:130,
      icon:'⭐',color:'#EF4444',
      summary:'Domina los valores exactos de sen, cos y tan para los ángulos 0°, 30°, 45°, 60° y 90°.',
      keyPoints:[
        'sen(0°)=0, cos(0°)=1, tan(0°)=0',
        'sen(30°)=1/2, cos(30°)=√3/2, tan(30°)=√3/3≈0.577',
        'sen(45°)=cos(45°)=√2/2≈0.707, tan(45°)=1',
        'sen(60°)=√3/2≈0.866, cos(60°)=1/2, tan(60°)=√3≈1.732',
        'sen(90°)=1, cos(90°)=0, tan(90°)=indefinida'
      ],
      concept:{
        what:'Los **ángulos notables** son aquellos cuyos valores trigonométricos se pueden expresar de forma exacta con fracciones y raíces. No son aproximaciones de calculadora, sino valores geométricamente perfectos derivados de triángulos equiláteros y cuadrados.',
        why:'Permiten resolver ecuaciones y problemas sin calculadora, y son la base de la trigonometría analítica, la física de ondas y los cálculos de ingeniería.',
        realLife:[
          {icon:'🔺',text:'Los techos a 45° son los más comunes en arquitectura: maximizan la eficiencia estructural (tan 45°=1).'},
          {icon:'📡',text:'Las antenas de TV se inclinan a 60° para optimizar la recepción de señal (sin 60°=√3/2≈0.866).'},
          {icon:'🎵',text:'Las ondas de audio con frecuencias en ratios √2 o √3 dan intervalos musicales perfectos.'}
        ],
        commonErrors:[
          {title:'Confundir sen(30°) con sen(60°)',description:'sen(30°)=0.5=cos(60°) y sen(60°)=0.866=cos(30°). Son complementarios: lo que es seno en uno es coseno en el otro.'},
          {title:'tan(90°) no es infinito, es indefinida',description:'tan(90°)=sen(90°)/cos(90°)=1/0, que no tiene valor real. Nunca escribas "∞"; la tangente simplemente no existe en 90°.'},
          {title:'Mezclar decimales y exactos',description:'0.707 es la aproximación decimal de √2/2. En cálculos exactos, usa fracciones y raíces para no acumular error de redondeo.'}
        ]
      },
      examples:[
        {
          title:'Tabla de valores notables (construida con geometría)',
          problem:'¿Por qué sen(30°)=1/2 exactamente?',
          steps:[
            {action:'Triángulo equilátero de lado 2',why:'Todos los ángulos son 60°',formula:'Corta por la mitad: triángulo 30-60-90',result:''},
            {action:'Lados del 30-60-90',why:'Hipotenusa=2, cateto opp a 30°=1',formula:'Cateto adj a 30° = √(2²−1²)=√3',result:'Lados: 1, √3, 2'},
            {action:'sen(30°)',why:'opp=1, hip=2',formula:'sen(30°) = 1/2',result:'= 0.5 exactamente'},
          ]
        },
        {
          title:'Calcular una expresión con ángulos notables',
          problem:'Calcula: 2·sen(60°)·cos(60°)',
          steps:[
            {action:'Sustituye valores',why:'',formula:'2 × (√3/2) × (1/2)',result:''},
            {action:'Simplifica',why:'',formula:'2 × √3/4 = √3/2',result:'≈ 0.866 = sen(60°)'},
            {action:'Reconoces el resultado',why:'Es la fórmula del ángulo doble',formula:'sen(2×30°) = sen(60°) ✓',result:''},
          ]
        }
      ],
      visual:{type:'trig-right-triangle'},
      discovery:[
        {title:'El triángulo 45-45-90',text:'Un cuadrado de lado 1 tiene diagonal √2. Divide por la mitad: triángulo 45-45-90 con catetos 1 y 1, e hipotenusa √2. Entonces sen(45°)=1/√2=√2/2.',question:'¿Por qué sen(45°) es igual a cos(45°)? Explica geométricamente.'}
      ],
      exercises:{topic:'trig_notables',generators:[]},
      advanced:{
        title:'Valores exactos avanzados',
        challenges:[
          {title:'sen(75°) sin calculadora',problem:'Usa sen(45°+30°) para calcular sen(75°) exacto.',hint:'sen(A+B)=senA·cosB+cosA·senB con A=45°, B=30°.',solution:'sen(75°)=(√2/2·√3/2)+(√2/2·1/2)=(√6+√2)/4≈0.966.'}
        ]
      }
    },

    // ══════════════════════════════════════════════════════════
    // 3. CÍRCULO UNITARIO Y RADIANES
    // ══════════════════════════════════════════════════════════
    {
      id:'trig-circulo',courseId:'trigonometria',topic:'Círculo Unitario y Radianes',
      title:'La brújula completa de la trigonometría',
      level:3,grades:'2° Medio – 3° Medio',duration:40,xpReward:160,
      icon:'🔵',color:'#EF4444',
      summary:'Entiende los radianes, el círculo unitario y los valores trigonométricos para cualquier ángulo en cualquier cuadrante.',
      keyPoints:[
        'Radián: ángulo cuyo arco tiene longitud = radio. 2π rad = 360°',
        'Conversión: rad = grados × π/180 | grados = rad × 180/π',
        'En el círculo unitario (r=1): P(θ) = (cos θ, sen θ)',
        'Cuadrantes: Q1(+,+), Q2(−,+), Q3(−,−), Q4(+,−) para (cos,sen)',
        'Ángulo de referencia: el ángulo agudo equivalente en Q1'
      ],
      concept:{
        what:'El **círculo unitario** es un círculo de radio 1 centrado en el origen. Para cualquier ángulo θ, el punto P sobre la circunferencia tiene coordenadas exactamente (cos θ, sen θ). Esto extiende la trigonometría a todos los ángulos, no solo los agudos.',
        why:'El círculo unitario unifica todas las razones trigonométricas, explica la periodicidad, y es la base del análisis de Fourier (que descompone cualquier señal en ondas sinusoidales).',
        realLife:[
          {icon:'🌊',text:'Las ondas del océano, la luz y el sonido se modelan con funciones del círculo unitario.'},
          {icon:'🔄',text:'Los motores eléctricos rotan siguiendo la trayectoria del círculo unitario.'},
          {icon:'🎵',text:'La síntesis de audio digital usa el círculo unitario para generar tonos puros.'},
          {icon:'📡',text:'Las señales de radio son senos y cosenos del círculo unitario con diferentes frecuencias.'}
        ],
        commonErrors:[
          {title:'π es radianes, no una operación',description:'Cuando se escribe 2π/3, el π representa π ≈ 3.14159 radianes, no "pi veces algo". 2π/3 rad = 120°.'},
          {title:'El ángulo de referencia siempre es positivo y agudo',description:'El ángulo de referencia de 210° es 30° (no −30°, no 150°). Siempre es el ángulo más pequeño hasta el eje x.'},
          {title:'cos es x, sen es y (no al revés)',description:'El punto P(θ) = (cos θ, sen θ). La primera coordenada (eje x) es el coseno; la segunda (eje y) es el seno.'}
        ]
      },
      examples:[
        {
          title:'Convertir entre grados y radianes',
          problem:'Convierte 135° a radianes y √5π/3 radianes a grados.',
          steps:[
            {action:'135° a radianes',why:'Multiplica por π/180',formula:'135 × π/180 = 3π/4',result:'3π/4 ≈ 2.356 rad'},
            {action:'5π/3 a grados',why:'Multiplica por 180/π',formula:'(5π/3) × (180/π) = 5×60 = 300°',result:'300°'},
          ]
        },
        {
          title:'Valores trigonométricos en el Q3',
          problem:'Halla sen(210°) y cos(210°).',
          steps:[
            {action:'Ángulo de referencia',why:'210° está en Q3',formula:'ref = 210° − 180° = 30°',result:''},
            {action:'Valores en Q1 para 30°',why:'',formula:'sen(30°)=0.5, cos(30°)=0.866',result:''},
            {action:'Aplicar signos del Q3',why:'En Q3: sen < 0, cos < 0',formula:'',result:'sen(210°) = −0.5, cos(210°) = −0.866'},
          ]
        }
      ],
      visual:{type:'trig-unit-circle'},
      discovery:[
        {title:'¿Por qué 2π radianes = 360°?',text:'Un radián es el ángulo que forma un arco de longitud = radio. En un círculo completo, la circunferencia = 2πr. Si r=1, la circunferencia = 2π, así que se necesitan 2π radianes para dar la vuelta completa.',question:'¿Cuántos radianes es un giro de media vuelta? ¿Y un cuarto de vuelta?'}
      ],
      exercises:{topic:'trig_circulo',generators:[]},
      advanced:{
        title:'Identidades de simetría',
        challenges:[
          {title:'Demuestra usando el círculo unitario',problem:'Explica por qué sen(180°−θ) = sen(θ) y cos(180°−θ) = −cos(θ) usando las coordenadas del círculo unitario.',hint:'El punto P(180°−θ) es la reflexión de P(θ) respecto al eje y.',solution:'P(θ)=(cos θ, sen θ). Su reflexión respecto al eje y es (−cos θ, sen θ). Ese punto corresponde a 180°−θ, confirmando que sen(180°−θ)=sen θ y cos(180°−θ)=−cos θ.'}
        ]
      }
    },

    // ══════════════════════════════════════════════════════════
    // 4. FUNCIONES TRIGONOMÉTRICAS
    // ══════════════════════════════════════════════════════════
    {
      id:'trig-funciones',courseId:'trigonometria',topic:'Funciones Trigonométricas',
      title:'Ondas perfectas que gobiernan el universo',
      level:4,grades:'2° Medio – 3° Medio',duration:40,xpReward:160,
      icon:'〰️',color:'#EF4444',
      summary:'Analiza las funciones seno, coseno y tangente: valores para cualquier ángulo, signos por cuadrante, periodicidad y simetría.',
      keyPoints:[
        'sen(θ) y cos(θ) están siempre entre −1 y 1',
        'sen es función impar: sen(−θ) = −sen(θ)',
        'cos es función par: cos(−θ) = cos(θ)',
        'Período de sen y cos = 360° (2π rad); período de tan = 180° (π rad)',
        'Regla CAST: Q1=todos+, Q2=sen+, Q3=tan+, Q4=cos+'
      ],
      concept:{
        what:'Las **funciones trigonométricas** toman un ángulo como entrada y devuelven un número. La función seno y coseno oscilan entre −1 y 1 formando la onda sinusoidal, la forma de onda más fundamental de la naturaleza.',
        why:'Toda señal periódica (sonido, luz, radio, electricidad alterna) se descompone en sumas de senos y cosenos. El análisis de Fourier es la base de la ingeniería de comunicaciones moderna.',
        realLife:[
          {icon:'🔊',text:'El sonido es presión de aire que oscila como una onda sinusoidal.'},
          {icon:'⚡',text:'La corriente alterna de los enchufes oscila como A·sen(2π·50t) (50 Hz en Chile/España).'},
          {icon:'🌈',text:'La luz visible es una onda electromagnética sinusoidal de alta frecuencia.'},
          {icon:'📻',text:'Las emisoras de radio modulan la amplitud o frecuencia de ondas sinusoidales.'}
        ],
        commonErrors:[
          {title:'sen(θ) no puede ser mayor que 1',description:'Si calculas sen(θ)=1.5, hay un error. Las funciones seno y coseno siempre están acotadas entre −1 y 1.'},
          {title:'Período ≠ amplitud',description:'El período es la longitud de un ciclo completo (360° para sen/cos). La amplitud es la altura máxima (1 para sen/cos sin modificar).'},
          {title:'sen(−θ) = −sen(θ) pero cos(−θ) = cos(θ)',description:'El seno es una función impar (antisimétrica al origen). El coseno es una función par (simétrica al eje y). Error común: aplicar ambas igualdades al mismo tipo.'}
        ]
      },
      examples:[
        {
          title:'Valores en Q3 usando ángulo de referencia',
          problem:'Calcula sen(240°) y cos(240°).',
          steps:[
            {action:'Identifica el cuadrante',why:'180°<240°<270°',formula:'Q3',result:''},
            {action:'Ángulo de referencia',why:'ref = 240°−180°',formula:'ref = 60°',result:''},
            {action:'Valores en Q1',why:'',formula:'sen(60°)=0.866, cos(60°)=0.5',result:''},
            {action:'Aplicar signos del Q3',why:'En Q3 ambos son negativos',formula:'',result:'sen(240°)=−0.866, cos(240°)=−0.5'},
          ]
        },
        {
          title:'Usar la periodicidad',
          problem:'¿Cuánto vale cos(−300°)?',
          steps:[
            {action:'cos es función par',why:'cos(−θ)=cos(θ)',formula:'cos(−300°)=cos(300°)',result:''},
            {action:'300° en Q4, ref=60°',why:'',formula:'cos(300°)=+cos(60°)=0.5',result:''},
          ]
        }
      ],
      visual:{type:'trig-wave'},
      discovery:[
        {title:'La onda sinusoidal en la naturaleza',text:'Conecta un oscilador a un osciloscopio: verás una curva perfectamente sinusoidal. Esta onda tiene la forma y=A·sen(2πft) donde A es la amplitud y f la frecuencia.',question:'Si la corriente eléctrica oscila 50 veces por segundo (50 Hz), ¿cuántos radianes por segundo es eso?'}
      ],
      exercises:{topic:'trig_funciones',generators:[]},
      advanced:{
        title:'Transformaciones de funciones trig',
        challenges:[
          {title:'Interpretar y=3·sen(2θ)',problem:'¿Cuál es la amplitud y el período de y=3·sen(2θ)?',hint:'Amplitud = coeficiente delante de sen. Período = 360°/coeficiente dentro del argumento.',solution:'Amplitud=3 (oscila entre −3 y 3). Período=360°/2=180° (doble frecuencia que sen(θ)).'}
        ]
      }
    },

    // ══════════════════════════════════════════════════════════
    // 5. IDENTIDADES TRIGONOMÉTRICAS
    // ══════════════════════════════════════════════════════════
    {
      id:'trig-identidades',courseId:'trigonometria',topic:'Identidades Trigonométricas',
      title:'Las verdades eternas de la trigonometría',
      level:5,grades:'2° Medio – 3° Medio',duration:40,xpReward:170,
      icon:'🔑',color:'#EF4444',
      summary:'Aplica la identidad pitagórica, las identidades de complemento y las fórmulas del ángulo doble para transformar y simplificar expresiones.',
      keyPoints:[
        '\\(\\sen^2(\\theta)+\\cos^2(\\theta)=1\\) (identidad pitagórica fundamental)',
        '\\(\\tan(\\theta) = \\dfrac{\\sen(\\theta)}{\\cos(\\theta)}\\)',
        'Complemento: \\(\\sen(90°-\\theta)=\\cos(\\theta)\\)',
        'Ángulo doble: \\(\\sen(2\\theta)=2\\sen(\\theta)\\cos(\\theta)\\)',
        'Ángulo doble: \\(\\cos(2\\theta)=\\cos^2(\\theta)-\\sen^2(\\theta)\\)'
      ],
      concept:{
        what:'Una **identidad trigonométrica** es una ecuación que es verdadera para todos los valores del ángulo donde está definida. No es una ecuación a resolver; es una herramienta para reescribir y simplificar expresiones.',
        why:'Las identidades permiten simplificar integrales en cálculo, resolver ecuaciones complejas, y están en el corazón del procesamiento de señales y la física cuántica.',
        realLife:[
          {icon:'📡',text:'Los chips de teléfonos móviles usan identidades trig para procesar señales a alta velocidad.'},
          {icon:'🧲',text:'Las ecuaciones de Maxwell del electromagnetismo se simplifican con identidades trigonométricas.'},
          {icon:'🎛️',text:'El procesamiento de audio digital usa la transformada de Fourier, basada en estas identidades.'}
        ],
        commonErrors:[
          {title:'sen²(θ)+cos²(θ)=1, no sen(θ)+cos(θ)=1',description:'La identidad eleva al cuadrado CADA función, luego suma. sen(θ)+cos(θ) no es una constante.'},
          {title:'sen(A+B) ≠ sen(A)+sen(B)',description:'La función seno NO es lineal (distributiva). sen(30°+60°)=sen(90°)=1, pero sen(30°)+sen(60°)=0.5+0.866=1.366≠1.'},
          {title:'Demostrar ≠ resolver',description:'Para demostrar una identidad, transforma un lado hasta igualarlo al otro. No "pases" términos de un lado al otro como en una ecuación.'}
        ]
      },
      examples:[
        {
          title:'Hallar cos(θ) dado sen(θ)',
          problem:'Si sen(θ)=0.6 y θ está en el primer cuadrante, ¿cuánto vale cos(θ)?',
          steps:[
            {action:'Parte de la identidad pitagórica',why:'',formula:'sen²(θ)+cos²(θ)=1',result:''},
            {action:'Sustituye',why:'',formula:'0.6²+cos²(θ)=1 → 0.36+cos²(θ)=1',result:''},
            {action:'Despeja',why:'',formula:'cos²(θ)=0.64 → cos(θ)=0.8',result:'cos(θ)=0.8 ✓ (positivo en Q1)'},
          ]
        },
        {
          title:'Usar el ángulo doble',
          problem:'Si sen(θ)=3/5 y cos(θ)=4/5, calcula sen(2θ).',
          steps:[
            {action:'Fórmula del ángulo doble',why:'',formula:'sen(2θ)=2·sen(θ)·cos(θ)',result:''},
            {action:'Sustituye',why:'',formula:'2×(3/5)×(4/5)=2×12/25',result:'sen(2θ)=24/25=0.96'},
          ]
        }
      ],
      visual:{type:'trig-unit-circle'},
      discovery:[
        {title:'La identidad pitagórica en el círculo unitario',text:'En el círculo unitario, cualquier punto P=(cos θ, sen θ). La distancia de P al origen es siempre 1 (radio del círculo). Aplicando Pitágoras: cos²(θ)+sen²(θ)=1². ¡La identidad es simplemente el Teorema de Pitágoras!',question:'¿Puedes derivar la identidad 1+tan²(θ)=sec²(θ) dividiendo sen²+cos²=1 entre cos²?'}
      ],
      exercises:{topic:'trig_identidades',generators:[]},
      advanced:{
        title:'Demostración de identidades',
        challenges:[
          {title:'Demuestra: (sen(θ)+cos(θ))²=1+2sen(θ)cos(θ)',problem:'Expande el cuadrado y usa la identidad pitagórica para demostrar esta igualdad.',hint:'Expande (a+b)²=a²+2ab+b². Luego aplica sen²+cos²=1.',solution:'(sen+cos)²=sen²+2sen·cos+cos²=(sen²+cos²)+2sen·cos=1+2sen·cos ✓'}
        ]
      }
    },

    // ══════════════════════════════════════════════════════════
    // 6. SUMA Y DIFERENCIA DE ÁNGULOS
    // ══════════════════════════════════════════════════════════
    {
      id:'trig-suma',courseId:'trigonometria',topic:'Suma y Diferencia de Ángulos',
      title:'Combinando ángulos para obtener nuevos valores',
      level:6,grades:'2° Medio – 3° Medio',duration:40,xpReward:170,
      icon:'➕',color:'#EF4444',
      summary:'Usa las fórmulas de sen(A±B) y cos(A±B) para calcular valores de ángulos no notables y derivar las fórmulas de ángulo doble.',
      keyPoints:[
        '\\(\\sen(A+B)=\\sen A\\cos B+\\cos A\\sen B\\)',
        '\\(\\sen(A-B)=\\sen A\\cos B-\\cos A\\sen B\\)',
        '\\(\\cos(A+B)=\\cos A\\cos B-\\sen A\\sen B\\)',
        '\\(\\cos(A-B)=\\cos A\\cos B+\\sen A\\sen B\\)',
        'Ángulo doble (A=B): \\(\\sen(2A)=2\\sen A\\cos A\\)'
      ],
      concept:{
        what:'Las **fórmulas de suma y diferencia** expresan las funciones trigonométricas de la suma (o diferencia) de dos ángulos en términos de las funciones de cada ángulo por separado. Son fundamentales para calcular valores exactos de ángulos como 15°, 75°, etc.',
        why:'Estas fórmulas son la base para integrar funciones trigonométricas en cálculo, y también se usan en electrónica para mezclar señales de diferente frecuencia (heterodino).',
        realLife:[
          {icon:'📻',text:'La mezcladora de frecuencias en radios AM/FM usa la fórmula cos(A)·cos(B)=(cos(A−B)+cos(A+B))/2.'},
          {icon:'🔭',text:'Los interferómetros astronómicos (como los que detectaron ondas gravitacionales) se basan en la interferencia de senos/cosenos.'}
        ],
        commonErrors:[
          {title:'sen(A+B) ≠ sen(A)+sen(B)',description:'Este es EL error más frecuente. sen(A+B) tiene términos cruzados: senA·cosB + cosA·senB.'},
          {title:'cos(A+B) se RESTA, cos(A−B) se SUMA',description:'cos(A+B)=cosA·cosB − senA·senB (resta). cos(A−B)=cosA·cosB + senA·senB (suma). La diferencia de cosenos usa suma, y viceversa.'},
          {title:'No confundir los términos cruzados',description:'En sen(A+B): senA·cosB tiene el seno del primero y el coseno del segundo. En cosA·senB es al revés: coseno del primero, seno del segundo.'}
        ]
      },
      examples:[
        {
          title:'Calcular sen(75°) exacto',
          problem:'Calcula sen(75°)=sen(45°+30°) sin calculadora.',
          steps:[
            {action:'Aplica la fórmula',why:'',formula:'sen(45°+30°)=sen(45°)cos(30°)+cos(45°)sen(30°)',result:''},
            {action:'Sustituye valores exactos',why:'',formula:'(√2/2)·(√3/2)+(√2/2)·(1/2)',result:''},
            {action:'Simplifica',why:'',formula:'√6/4 + √2/4 = (√6+√2)/4',result:'≈ 0.966'},
          ]
        },
        {
          title:'Derivar la fórmula del ángulo doble',
          problem:'Demuestra que sen(2θ)=2·sen(θ)·cos(θ).',
          steps:[
            {action:'Escribe 2θ como θ+θ',why:'',formula:'sen(2θ)=sen(θ+θ)',result:''},
            {action:'Aplica sen(A+B)',why:'A=B=θ',formula:'=sen(θ)cos(θ)+cos(θ)sen(θ)',result:''},
            {action:'Simplifica',why:'Ambos términos son iguales',formula:'=2·sen(θ)·cos(θ)',result:'✓'},
          ]
        }
      ],
      visual:{type:'trig-unit-circle'},
      discovery:[
        {title:'Verificar con ángulos conocidos',text:'Si A=B=45°: sen(90°)=2·sen(45°)·cos(45°)=2·(√2/2)·(√2/2)=2·(1/2)=1. ¡Correcto!',question:'Verifica cos(90°)=0 usando la fórmula cos(A+B) con A=B=45°.'}
      ],
      exercises:{topic:'trig_suma',generators:[]},
      advanced:{
        title:'Fórmulas del ángulo mitad',
        challenges:[
          {title:'Derivar sen(A/2)',problem:'Usa cos(A)=1−2sen²(A/2) para expresar sen(A/2) en términos de cos(A).',hint:'Despeja sen²(A/2) y toma raíz.',solution:'sen²(A/2)=(1−cos A)/2 → sen(A/2)=√((1−cos A)/2). Verifica: A=60°: sen(30°)=√((1−0.5)/2)=√(0.25)=0.5 ✓'}
        ]
      }
    },

    // ══════════════════════════════════════════════════════════
    // 7. ECUACIONES TRIGONOMÉTRICAS
    // ══════════════════════════════════════════════════════════
    {
      id:'trig-ecuaciones',courseId:'trigonometria',topic:'Ecuaciones Trigonométricas',
      title:'Encontrar todos los ángulos que satisfacen una condición',
      level:7,grades:'3° Medio – 4° Medio',duration:40,xpReward:180,
      icon:'🔍',color:'#EF4444',
      summary:'Resuelve ecuaciones de la forma sen(x)=k, cos(x)=k y tan(x)=k en intervalos dados, incluyendo ecuaciones con ángulo doble.',
      keyPoints:[
        'sen(x)=k tiene 2 soluciones en [0°,360°) si |k|<1 (0 si |k|>1, 1 si |k|=1)',
        'Para sen(x)=k: x₁=arcsen(k), x₂=180°−x₁',
        'Para cos(x)=k: x₁=arccos(k), x₂=360°−x₁',
        'Para tan(x)=k: x₁=arctan(k), x₂=x₁+180°',
        'Para sen(2x)=k: sustituye u=2x, resuelve, luego x=u/2'
      ],
      concept:{
        what:'Una **ecuación trigonométrica** es una ecuación que contiene funciones trigonométricas. A diferencia de las ecuaciones algebraicas, suelen tener infinitas soluciones (por la periodicidad), por eso siempre se trabaja en un intervalo específico.',
        why:'Resolver ecuaciones trigonométricas permite encontrar los ángulos exactos en que ocurre un fenómeno: cuando una onda alcanza cierto valor, cuando dos señales se sincronizan, etc.',
        realLife:[
          {icon:'🌊',text:'¿En qué momento la marea alcanza exactamente 2m? Se resuelve una ecuación de la forma A·sen(ωt+φ)=2.'},
          {icon:'💡',text:'¿Cuándo la corriente alterna pasa por cero? Resolviendo 220·sen(2π·50·t)=0.'},
          {icon:'🎵',text:'¿En qué instantes dos ondas de audio se refuerzan o cancelan? Cuando sus senos tienen el mismo valor.'}
        ],
        commonErrors:[
          {title:'Dar solo una solución cuando hay dos',description:'sen(x)=0.5 tiene DOS soluciones en [0°,360°): 30° y 150°. Siempre verifica si hay segunda solución (especialmente en Q1 y Q2 para sen, Q1 y Q4 para cos).'},
          {title:'Para ángulo doble, dividir correctamente',description:'En sen(2x)=0.5: 2x=30° Y 2x=150°, entonces x=15° Y x=75°. No dividas solo la primera solución.'},
          {title:'No confundir arcsen con sen⁻¹',description:'arcsen(0.5)=30° es la PRIMERA solución (en Q1). La segunda (180°−30°=150°) no viene de la calculadora directamente.'}
        ]
      },
      examples:[
        {
          title:'Resolver sen(x)=0.5 en [0°,360°)',
          problem:'Encuentra todas las soluciones.',
          steps:[
            {action:'Primera solución',why:'x₁=arcsen(0.5)',formula:'x₁=30° (Q1)',result:''},
            {action:'Segunda solución',why:'El seno también es positivo en Q2',formula:'x₂=180°−30°=150°',result:''},
            {action:'Verificación',why:'',formula:'sen(30°)=0.5 ✓ y sen(150°)=0.5 ✓',result:'Soluciones: 30° y 150°'},
          ]
        },
        {
          title:'Resolver sen(2x)=1 en [0°,360°)',
          problem:'Encuentra x.',
          steps:[
            {action:'Sustituye u=2x',why:'Rango de u: 0° a 720°',formula:'sen(u)=1',result:''},
            {action:'Resuelve para u',why:'',formula:'u=90° (y u=90°+360°=450° en el rango extendido)',result:'u=90°, 450°'},
            {action:'Convierte x=u/2',why:'',formula:'x=45° y x=225°',result:'Soluciones: 45° y 225°'},
          ]
        }
      ],
      visual:{type:'trig-wave'},
      discovery:[
        {title:'La periodicidad produce infinitas soluciones',text:'sen(x)=0.5 tiene soluciones 30°, 150°, 390°, 510°,... cada 360° más. Por eso siempre se trabaja en un intervalo: [0°,360°) o [0°,2π).',question:'¿Cuántas soluciones tiene cos(x)=0.5 en [0°,720°)?'}
      ],
      exercises:{topic:'trig_ecuaciones',generators:[]},
      advanced:{
        title:'Ecuaciones cuadráticas trigonométricas',
        challenges:[
          {title:'Resolver 2sen²(x)−1=0',problem:'Encuentra todas las soluciones en [0°,360°).',hint:'Despeja sen²(x)=1/2, luego sen(x)=±1/√2=±0.707.',solution:'sen(x)=0.707: x=45°,135°. sen(x)=−0.707: x=225°,315°. Total: 4 soluciones.'}
        ]
      }
    },

    // ══════════════════════════════════════════════════════════
    // 8. APLICACIONES
    // ══════════════════════════════════════════════════════════
    {
      id:'trig-aplicaciones',courseId:'trigonometria',topic:'Aplicaciones de la Trigonometría',
      title:'La trigonometría resuelve el mundo real',
      level:8,grades:'2° Medio – 3° Medio',duration:45,xpReward:200,
      icon:'🌍',color:'#EF4444',
      summary:'Aplica ángulos de elevación/depresión, la ley de senos y la ley de cosenos para resolver triángulos y problemas de la vida real.',
      keyPoints:[
        'Ángulo de elevación: desde horizontal hacia arriba. Ángulo de depresión: desde horizontal hacia abajo',
        'Ley de senos: \\(\\dfrac{a}{\\sen A}=\\dfrac{b}{\\sen B}=\\dfrac{c}{\\sen C}\\)',
        'Ley de cosenos: \\(c^2=a^2+b^2-2ab\\cos C\\)',
        'Área: \\(A=\\dfrac{1}{2}ab\\sen C\\)',
        'Usa ley de senos para LAA/LLA; ley de cosenos para LLL/LAL'
      ],
      concept:{
        what:'Las **aplicaciones trigonométricas** resuelven triángulos en situaciones reales donde no todos los lados y ángulos son conocidos. Para triángulos oblicuos (sin ángulo recto) se usan la Ley de Senos y la Ley de Cosenos.',
        why:'La triangulación trigonométrica se usa para medir distancias imposibles de medir directamente: la altura de montañas, la distancia a estrellas, la posición de satélites GPS.',
        realLife:[
          {icon:'🏔️',text:'La primera medición del Everest en 1856 usó trigonometría desde puntos distantes en la llanura india.'},
          {icon:'📡',text:'El GPS triangula tu posición usando ángulos y distancias a 4 satélites simultáneamente.'},
          {icon:'🚁',text:'Los pilotos usan ángulos de elevación y depresión para aterrizar con la inclinación correcta.'},
          {icon:'⚓',text:'Los marinos usan la ley de senos para calcular distancias entre embarcaciones sin medirlas directamente.'}
        ],
        commonErrors:[
          {title:'Ley de senos: el lado y el ángulo OPUESTO',description:'En a/sen(A), el lado a y el ángulo A deben ser OPUESTOS. No puedes emparejar un lado con un ángulo adyacente.'},
          {title:'Ley de cosenos: identificar el ángulo incluido',description:'c²=a²+b²−2ab·cos(C): el ángulo C es el que está ENTRE los lados a y b (el ángulo incluido). Si metes el ángulo equivocado, el resultado es incorrecto.'},
          {title:'Ángulo de elevación vs depresión',description:'El ángulo de elevación se mide HACIA ARRIBA desde la horizontal. El de depresión HACIA ABAJO. En ambos casos, el triángulo rectángulo tiene el mismo tamaño; solo cambia desde qué punto se observa.'}
        ]
      },
      examples:[
        {
          title:'Ángulo de elevación',
          problem:'Desde un punto a 50m de la base de un edificio, el ángulo de elevación al techo es 60°. ¿Cuánto mide el edificio?',
          steps:[
            {action:'Identifica el triángulo rectángulo',why:'Base=50m (horizontal), altura=? (vertical)',formula:'tan(60°) = altura/50',result:''},
            {action:'Despeja',why:'tan(60°)=1.732',formula:'altura = 50 × 1.732',result:'altura ≈ 86.6 m'},
          ]
        },
        {
          title:'Ley de senos',
          problem:'En un triángulo, A=30°, B=60°, a=10. Halla b.',
          steps:[
            {action:'Aplica la ley de senos',why:'',formula:'b/sen(B) = a/sen(A)',result:''},
            {action:'Despeja b',why:'',formula:'b = 10 × sen(60°)/sen(30°) = 10 × 0.866/0.5',result:'b ≈ 17.32'},
          ]
        },
        {
          title:'Ley de cosenos (hallar un ángulo)',
          problem:'Un triángulo tiene lados 5, 8 y 7. Halla el ángulo opuesto al lado de 7.',
          steps:[
            {action:'Identifica: a=5, b=8, c=7 (buscar C)',why:'',formula:'cos(C)=(a²+b²−c²)/(2ab)',result:''},
            {action:'Sustituye',why:'',formula:'cos(C)=(25+64−49)/(2×5×8)=40/80=0.5',result:''},
            {action:'Calcula',why:'arccos(0.5)',formula:'C=60°',result:'✓'},
          ]
        }
      ],
      visual:{type:'trig-law-triangle'},
      discovery:[
        {title:'Triangulación GPS',text:'Un receptor GPS calcula la distancia a 4 satélites midiendo el tiempo que tarda la señal. Con 3 distancias conocidas a 3 puntos, se puede triangular una posición única en el espacio (se necesita un 4° satélite para sincronizar el reloj).',question:'Si estás a 20000 km de tres satélites GPS, ¿por qué puedes estar en más de un punto solo con esas 3 distancias?'}
      ],
      exercises:{topic:'trig_aplicaciones',generators:[]},
      advanced:{
        title:'Triangulación clásica',
        challenges:[
          {title:'Altura de una montaña',problem:'Desde el punto A, el ángulo de elevación al pico es 40°. Desde el punto B (en línea recta con A, a 500m más cerca de la base), el ángulo es 60°. Halla la altura.',hint:'Crea dos ecuaciones con tan: h=x·tan(60°) y h=(x+500)·tan(40°). Iguala y resuelve para x.',solution:'x·tan60°=(x+500)·tan40° → 1.732x=0.839x+419.5 → 0.893x=419.5 → x≈470. h=470×1.732≈814m.'}
        ]
      }
    }

  ];

  // ── Registro ──────────────────────────────────────────────
  if(!window.MM_LESSONS) window.MM_LESSONS=[];
  LESSONS.forEach(lesson=>{
    if(lesson.exercises&&lesson.exercises.topic&&window.MM_TOPIC_GENERATORS){
      const gens=window.MM_TOPIC_GENERATORS[lesson.exercises.topic];
      if(gens&&gens.length) lesson.exercises.generators=gens;
    }
    const idx=window.MM_LESSONS.findIndex(l=>l.id===lesson.id);
    if(idx!==-1) window.MM_LESSONS.splice(idx,1);
    window.MM_LESSONS.push(lesson);
  });
  if(!window.MM_LESSON_MAP) window.MM_LESSON_MAP={};
  LESSONS.forEach(l=>{window.MM_LESSON_MAP[l.id]=l;});
  console.log('[MM] content-trigonometria.js cargado:',LESSONS.length,'lecciones');
})();
