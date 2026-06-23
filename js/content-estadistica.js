/* ═══════════════════════════════════════════════════════
   CONTENT-ESTADISTICA.JS — 8 lecciones completas
   ═══════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var LESSONS=[

  /* ══════════════════════════════════════════
     1. ESTADÍSTICA DESCRIPTIVA
  ══════════════════════════════════════════ */
  {
    id:'est-descriptiva', subject:'estadistica',
    unit:'Estadística Descriptiva',
    title:'Estadística Descriptiva y Tablas de Frecuencia',
    icon:'📊',
    concept:{
      what:'La estadística descriptiva resume, organiza y presenta datos mediante tablas y gráficos. Una tabla de frecuencias registra cuántas veces aparece cada valor o rango de valores en un conjunto de datos.',
      why:'Sin estadística descriptiva, un conjunto de 1000 datos no nos dice nada. Con ella podemos ver patrones, tendencias y extraer conclusiones de un vistazo.',
      realLife:'Los noticieros usan tablas de frecuencia para mostrar resultados electorales. Las escuelas registran notas en tablas. Los supermercados analizan ventas por categoría.',
      commonErrors:[
        'Confundir frecuencia absoluta (conteo) con frecuencia relativa (proporción).',
        'Olvidar que las frecuencias relativas deben sumar exactamente 1 (o 100%).',
        'Usar intervalos de clase de distinto tamaño sin justificación en una tabla.'
      ]
    },
    examples:[
      {
        title:'Frecuencia absoluta y relativa',
        steps:[
          'Datos: notas de 10 alumnos: 5, 6, 7, 7, 4, 6, 7, 5, 6, 7',
          'Contamos: nota 4→1 vez, nota 5→2 veces, nota 6→3 veces, nota 7→4 veces',
          'Frecuencias relativas: 1/10=0.10, 2/10=0.20, 3/10=0.30, 4/10=0.40',
          'Verificación: 0.10+0.20+0.30+0.40 = 1.00 ✓',
          'Porcentajes: 10%, 20%, 30%, 40% → suman 100% ✓'
        ]
      },
      {
        title:'Frecuencia acumulada',
        steps:[
          'Datos agrupados: [0–4]→5, [5–9]→8, [10–14]→12, [15–19]→5',
          'Frecuencia acumulada [0–4]: 5',
          'Frecuencia acumulada [0–9]: 5+8=13',
          'Frecuencia acumulada [0–14]: 13+12=25',
          'Frecuencia acumulada [0–19]: 25+5=30 (= n total)'
        ]
      },
      {
        title:'Tabla de distribución de frecuencias agrupadas',
        steps:[
          'Paso 1: Determinar el rango: máx − mín = 95 − 42 = 53',
          'Paso 2: Elegir el número de clases (regla: √n ≈ √50 ≈ 7)',
          'Paso 3: Amplitud de clase = 53/7 ≈ 8 (redondeamos a 10)',
          'Paso 4: Clases: [40-50), [50-60), [60-70), [70-80), [80-90), [90-100]',
          'Paso 5: Contar datos en cada clase → tabla completa'
        ]
      }
    ],
    visual:{type:'est-frequency-table'},
    discovery:{
      title:'¿Qué revela una tabla de frecuencias?',
      steps:[
        'Recopila las edades de 15 personas de tu familia o amigos.',
        'Agrupa en intervalos de 10 años: [0-10), [10-20), [20-30), etc.',
        'Cuenta cuántas personas caen en cada intervalo.',
        '¿Cuál intervalo tiene más personas? ¿Cómo se distribuyen?',
        'Calcula la frecuencia relativa y el porcentaje de cada grupo.'
      ]
    },
    exercises:{topic:'est_descriptiva', generators:[]},
    advanced:{
      title:'Tipos de variables y escalas de medición',
      content:'Las variables se clasifican en: **Cualitativas** (nominal u ordinal) y **Cuantitativas** (discreta o continua). Las escalas de medición son: nominal (categorías sin orden), ordinal (categorías con orden), de intervalo (orden + distancias iguales, sin cero absoluto) y de razón (orden + distancias + cero absoluto). Ejemplo: temperatura en °C es de intervalo; peso en kg es de razón. Esta clasificación determina qué operaciones estadísticas son válidas.'
    }
  },

  /* ══════════════════════════════════════════
     2. GRÁFICOS ESTADÍSTICOS
  ══════════════════════════════════════════ */
  {
    id:'est-graficos', subject:'estadistica',
    unit:'Representación Gráfica',
    title:'Gráficos de Barras, Circulares e Histogramas',
    icon:'📈',
    concept:{
      what:'Los gráficos estadísticos visualizan datos de forma intuitiva. El gráfico de barras compara categorías. El circular (torta) muestra proporciones de un todo. El histograma distribuye datos continuos en intervalos de clase.',
      why:'Una imagen vale mil números: un gráfico bien diseñado permite detectar patrones, comparar grupos y comunicar resultados de forma clara y eficaz.',
      realLife:'Los medios de comunicación usan gráficos circulares para mostrar resultados de encuestas. Los científicos usan histogramas para analizar distribuciones de datos experimentales.',
      commonErrors:[
        'Usar un gráfico circular cuando hay muchas categorías (más de 6–7): difícil de leer.',
        'No iniciar el eje Y desde 0 en gráficos de barras: distorsiona la comparación.',
        'Confundir gráfico de barras (datos discretos) con histograma (datos continuos agrupados).'
      ]
    },
    examples:[
      {
        title:'Gráfico de barras: preferencias musicales',
        steps:[
          'Datos: Pop=25, Rock=18, Reggaetón=30, Clásica=7, Jazz=10',
          'Eje X: géneros musicales (variable categórica)',
          'Eje Y: número de personas (frecuencia absoluta)',
          'Cada barra tiene altura proporcional a su frecuencia',
          'Conclusión: Reggaetón es el más popular (30 personas, 33.3%)'
        ]
      },
      {
        title:'Gráfico circular: cuotas de mercado',
        steps:[
          'Empresa A: 40%, Empresa B: 25%, Empresa C: 20%, Otras: 15%',
          'Ángulo A: 40% × 360° = 144°',
          'Ángulo B: 25% × 360° = 90°',
          'Ángulo C: 20% × 360° = 72°',
          'Ángulo Otras: 15% × 360° = 54°',
          'Verificación: 144+90+72+54 = 360° ✓'
        ]
      },
      {
        title:'Histograma: distribución de estaturas',
        steps:[
          'Datos agrupados: [150-160)→8, [160-170)→15, [170-180)→20, [180-190)→12, [190-200)→5',
          'Eje X: intervalos de estatura (variable continua)',
          'Eje Y: frecuencia de cada intervalo',
          'Las barras van pegadas (sin espacio entre ellas → variable continua)',
          'La forma campana sugiere distribución aproximadamente normal'
        ]
      }
    ],
    visual:{type:'est-bar-chart'},
    discovery:{
      title:'Construye tu propio gráfico estadístico',
      steps:[
        'Pregunta a 20 personas: ¿Cuál es tu color favorito?',
        'Organiza los resultados en una tabla de frecuencias.',
        'Calcula el ángulo de cada color: (frecuencia/20) × 360°.',
        'Dibuja el gráfico circular con esos ángulos.',
        '¿Qué tipo de gráfico sería más informativo para estos datos? ¿Por qué?'
      ]
    },
    exercises:{topic:'est_graficos', generators:[]},
    advanced:{
      title:'Polígono de frecuencias y ojiva',
      content:'El **polígono de frecuencias** conecta los puntos medios de cada barra del histograma con líneas rectas. La **ojiva** (curva acumulada) une los extremos superiores de las barras acumuladas. Permite estimar percentiles y medianas gráficamente: el valor donde la ojiva cruza el 50% es la mediana. Para comparar dos distribuciones, superponer sus polígonos de frecuencias es mucho más efectivo que superponer histogramas.'
    }
  },

  /* ══════════════════════════════════════════
     3. MEDIDAS DE TENDENCIA CENTRAL
  ══════════════════════════════════════════ */
  {
    id:'est-tendencia-central', subject:'estadistica',
    unit:'Tendencia Central',
    title:'Media, Mediana y Moda',
    icon:'🎯',
    concept:{
      what:'Las medidas de tendencia central indican un valor "representativo" o "central" del conjunto de datos. Las tres principales son: **media** (promedio aritmético), **mediana** (valor central al ordenar) y **moda** (valor más frecuente).',
      why:'Necesitamos resumir datos en un solo número representativo. El promedio de notas, el salario mediano del país, la talla más vendida de zapatos: cada contexto pide una medida diferente.',
      realLife:'El INE usa la mediana del ingreso (no la media) para medir la distribución de riqueza, porque la media es distorsionada por los muy ricos. Las tiendas de ropa necesitan saber la moda (talla más común).',
      commonErrors:[
        'Olvidar ordenar los datos antes de calcular la mediana.',
        'Dividir entre n−1 en vez de n al calcular la media (confusión con desviación estándar muestral).',
        'Concluir que siempre hay una sola moda: puede haber dos (bimodal) o más.'
      ]
    },
    examples:[
      {
        title:'Media aritmética',
        steps:[
          'Notas: 6, 7, 5, 4, 7, 6, 5, 7, 4, 5',
          'Suma: 6+7+5+4+7+6+5+7+4+5 = 56',
          'n = 10 datos',
          'Media = 56 / 10 = 5.6',
          '\\(\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{56}{10} = 5.6\\)'
        ]
      },
      {
        title:'Mediana con 7 datos',
        steps:[
          'Datos desordenados: 8, 3, 5, 9, 1, 7, 6',
          'Ordenados: 1, 3, 5, 6, 7, 8, 9',
          '7 datos (impar) → posición central = (7+1)/2 = 4ª posición',
          'Mediana = 6',
          'Si fueran 8 datos: Md = (valor 4° + valor 5°)/2'
        ]
      },
      {
        title:'Media ponderada: promedio con pesos distintos',
        steps:[
          'Prueba 1: 5.5 (peso 30%), Prueba 2: 6.0 (peso 30%), Examen: 7.0 (peso 40%)',
          '\\(\\bar{x}_p = \\frac{5.5×0.30 + 6.0×0.30 + 7.0×0.40}{0.30+0.30+0.40}\\)',
          '= (1.65 + 1.80 + 2.80) / 1.00',
          '= 6.25',
          'La nota final es 6.25, no 6.17 (media simple)'
        ]
      }
    ],
    visual:{type:'est-central-tendency'},
    discovery:{
      title:'¿Cuándo falla la media?',
      steps:[
        'Considera los salarios mensuales (en miles $): 400, 420, 380, 390, 410, 3000.',
        'Calcula la media: ¿Te parece representativa?',
        'Calcula la mediana: ¿Es más representativa del "trabajador típico"?',
        'El valor 3000 es el sueldo del dueño de la empresa.',
        'Conclusión: cuando hay valores extremos (outliers), la mediana es más robusta.'
      ]
    },
    exercises:{topic:'est_tendencia', generators:[]},
    advanced:{
      title:'Media geométrica y media armónica',
      content:'La **media geométrica** \\(G = \\sqrt[n]{x_1 \\cdot x_2 \\cdots x_n}\\) es ideal para promediar tasas de crecimiento o rendimientos. Ejemplo: si una inversión creció 10%, 20% y 5% en tres años, la tasa anual promedio es \\(G = \\sqrt[3]{1.10 × 1.20 × 1.05} ≈ 1.115\\) → 11.5% anual. La **media armónica** \\(H = \\frac{n}{\\sum(1/x_i)}\\) se usa para promediar velocidades. Si un coche va a 60 km/h de ida y 40 km/h de vuelta, la velocidad media es H, NO (60+40)/2.'
    }
  },

  /* ══════════════════════════════════════════
     4. MEDIDAS DE DISPERSIÓN
  ══════════════════════════════════════════ */
  {
    id:'est-dispersion', subject:'estadistica',
    unit:'Dispersión',
    title:'Rango, Varianza y Desviación Estándar',
    icon:'📏',
    concept:{
      what:'Las medidas de dispersión indican qué tan "esparcidos" están los datos alrededor de la media. Las principales son: **rango** (máx−mín), **varianza** (promedio de desviaciones cuadradas) y **desviación estándar** (raíz de la varianza).',
      why:'Dos cursos pueden tener la misma media pero distribuciones muy distintas. El Curso A: 6,6,6,6 y el Curso B: 2,5,7,10. Ambos tienen media 6, pero el B es muy heterogéneo.',
      realLife:'En finanzas, la desviación estándar mide el riesgo de una inversión. En control de calidad, σ pequeña significa producción uniforme. En medicina, valores fuera de μ±2σ son clínicamente relevantes.',
      commonErrors:[
        'Confundir varianza poblacional (÷n) con varianza muestral (÷n−1): a nivel escolar generalmente se usa la poblacional.',
        'Olvidar elevar al cuadrado las desviaciones: si no, se anulan positivos y negativos.',
        'Interpretar σ=0 como error: simplemente significa que todos los datos son iguales.'
      ]
    },
    examples:[
      {
        title:'Cálculo de varianza y desviación estándar',
        steps:[
          'Datos: 4, 6, 8, 4, 8. Media = 30/5 = 6',
          'Desviaciones: 4-6=-2, 6-6=0, 8-6=2, 4-6=-2, 8-6=2',
          'Desviaciones cuadradas: 4, 0, 4, 4, 4',
          '\\(\\sigma^2 = \\frac{4+0+4+4+4}{5} = \\frac{16}{5} = 3.2\\)',
          '\\(\\sigma = \\sqrt{3.2} \\approx 1.79\\)'
        ]
      },
      {
        title:'Puntaje Z (estandarización)',
        steps:[
          'Un estudiante saca 75 en un examen donde μ=65 y σ=10',
          '\\(Z = \\frac{x - \\mu}{\\sigma} = \\frac{75-65}{10} = 1.0\\)',
          'Z=1 significa que está 1 desviación estándar sobre la media',
          'Esto equivale aproximadamente al percentil 84',
          'Si Z < 0, el dato está por debajo de la media'
        ]
      },
      {
        title:'Regla empírica 68-95-99.7',
        steps:[
          'En una distribución aproximadamente normal:',
          'μ ± 1σ contiene el 68% de los datos',
          'μ ± 2σ contiene el 95% de los datos',
          'μ ± 3σ contiene el 99.7% de los datos',
          'Ejemplo: si μ=100, σ=15 → el 95% tiene IQ entre 70 y 130'
        ]
      }
    ],
    visual:{type:'est-dispersion-vis'},
    discovery:{
      title:'¿Por qué elevar al cuadrado las desviaciones?',
      steps:[
        'Calcula las desviaciones de {2, 5, 8}: sus desviaciones respecto a la media (5) son -3, 0, +3.',
        'Suma directa: -3+0+3=0. ¡Siempre da 0! Por eso no sirve.',
        'Valor absoluto: 3+0+3=6. Desviación media absoluta = 6/3 = 2.',
        'Cuadrados: 9+0+9=18. Varianza = 18/3 = 6. σ = √6 ≈ 2.45.',
        '¿Por qué cuadrado y no valor absoluto? El cuadrado tiene mejores propiedades matemáticas (diferenciable en todo punto).'
      ]
    },
    exercises:{topic:'est_dispersion', generators:[]},
    advanced:{
      title:'Coeficiente de variación y comparación de dispersiones',
      content:'El **coeficiente de variación** \\(CV = \\frac{\\sigma}{\\mu} \\times 100\\%\\) permite comparar dispersiones de conjuntos con distintas escalas. Ejemplo: Equipo A tiene μ=80 kg, σ=8 kg (CV=10%). Equipo B tiene μ=1.70 m, σ=0.20 m (CV=11.8%). Aunque σ_B < σ_A en unidades absolutas, el equipo B es relativamente más heterogéneo. El CV funciona solo cuando μ > 0.'
    }
  },

  /* ══════════════════════════════════════════
     5. CUARTILES Y PERCENTILES
  ══════════════════════════════════════════ */
  {
    id:'est-posicion', subject:'estadistica',
    unit:'Medidas de Posición',
    title:'Cuartiles, Percentiles y Diagrama de Caja',
    icon:'📦',
    concept:{
      what:'Las medidas de posición indican la ubicación de un valor dentro de la distribución. Los **cuartiles** dividen los datos ordenados en 4 partes iguales. Los **percentiles** los dividen en 100 partes. El **RIC** (rango intercuartílico) = Q3−Q1 mide la dispersión del 50% central.',
      why:'Las medidas de posición permiten comparar un dato con el resto del grupo. La PAES usa percentiles para informarte dónde quedaste respecto a todos los estudiantes que dieron la prueba.',
      realLife:'Las tablas de peso y talla pediátricas usan percentiles: un niño en el percentil 75 de estatura es más alto que el 75% de niños de su edad. Los bancos usan percentiles de riesgo crediticio.',
      commonErrors:[
        'Confundir "percentil 90" con "nota 90": percentil 90 significa superar al 90% del grupo.',
        'Calcular el RIC como Q3/Q1 en vez de Q3−Q1.',
        'Olvidar que Q2 = mediana siempre.'
      ]
    },
    examples:[
      {
        title:'Cálculo de cuartiles (método interpolación)',
        steps:[
          'Datos (9 valores): 2, 5, 6, 7, 8, 9, 10, 11, 14',
          'Q1: posición 0.25×(9-1)=2 → índice 2 → valor 6',
          'Q2: posición 0.50×(9-1)=4 → índice 4 → valor 8 (mediana)',
          'Q3: posición 0.75×(9-1)=6 → índice 6 → valor 10',
          'RIC = Q3−Q1 = 10−6 = 4'
        ]
      },
      {
        title:'Detección de outliers con límites de Tukey',
        steps:[
          'RIC = 4, Q1=6, Q3=10',
          'Límite inferior: Q1−1.5×RIC = 6−6 = 0',
          'Límite superior: Q3+1.5×RIC = 10+6 = 16',
          'Datos fuera de [0,16] son outliers',
          'Si existiera un dato 25: es outlier (25 > 16)'
        ]
      },
      {
        title:'Diagrama de caja (boxplot)',
        steps:[
          'Los 5 números resumen: mín, Q1, Q2, Q3, máx',
          'La caja va de Q1 a Q3 (50% central de los datos)',
          'La línea interior es Q2 (mediana)',
          'Los bigotes se extienden hasta mín y máx (o hasta los límites de Tukey)',
          'Los puntos fuera de los bigotes son outliers'
        ]
      }
    ],
    visual:{type:'est-boxplot'},
    discovery:{
      title:'Compara tu puntaje con el grupo',
      steps:[
        'Registra las notas del último examen de tu clase (¡pide permiso!)',
        'Ordena los datos de menor a mayor.',
        'Calcula Q1, Q2 (mediana) y Q3.',
        'Dibuja el boxplot: ¿la distribución es simétrica o sesgada?',
        'Si tu nota es el Q3, ¿qué significa respecto al resto de la clase?'
      ]
    },
    exercises:{topic:'est_posicion', generators:[]},
    advanced:{
      title:'Percentiles y la PAES',
      content:'En la **PAES** (Prueba de Acceso a la Educación Superior de Chile), los puntajes se reportan como percentiles. Un percentil k significa que obtuviste más puntaje que el k% de los postulantes. El corte para universidades selectivas suele estar en el percentil 85–90+. La fórmula exacta del percentil k-ésimo en un conjunto de n datos ordenados es: posición = (k/100)×(n−1)+1 (base 1). El valor se obtiene interpolando linealmente entre los datos adyacentes si la posición no es entera.'
    }
  },

  /* ══════════════════════════════════════════
     6. PROBABILIDAD SIMPLE
  ══════════════════════════════════════════ */
  {
    id:'est-probabilidad', subject:'estadistica',
    unit:'Probabilidad Simple',
    title:'Probabilidad: Conceptos y Regla de Laplace',
    icon:'🎲',
    concept:{
      what:'La probabilidad mide cuán probable es que ocurra un evento. La **regla de Laplace** (probabilidad clásica) establece: \\(P(A) = \\frac{\\text{casos favorables}}{\\text{casos totales}}\\), cuando todos los resultados son igualmente posibles.',
      why:'La probabilidad está en todas partes: previsión del tiempo, diagnóstico médico, juegos de azar, seguros, inteligencia artificial. Entender probabilidad es esencial para tomar decisiones informadas bajo incertidumbre.',
      realLife:'Los meteorólogos dicen "70% de probabilidad de lluvia". Los médicos diagnostican basándose en probabilidades de enfermedades. Los seguros calculan primas según probabilidades de accidentes.',
      commonErrors:[
        'Confundir el espacio muestral con los eventos favorables.',
        'Olvidar que la probabilidad siempre está entre 0 y 1 (no puede ser negativa ni mayor a 1).',
        'Creer que "50-50" significa que algo ocurrirá cada dos veces: en probabilidad, cada ensayo es independiente.'
      ]
    },
    examples:[
      {
        title:'Dado: espacio muestral y eventos',
        steps:[
          'Espacio muestral: Ω = {1, 2, 3, 4, 5, 6} → |Ω| = 6',
          'Evento A = "sacar par" = {2, 4, 6} → |A| = 3',
          '\\(P(A) = \\frac{3}{6} = \\frac{1}{2} = 0.5\\)',
          'Evento B = "sacar > 4" = {5, 6} → P(B) = 2/6 = 1/3',
          'Evento C = "sacar 7" = {} → P(C) = 0/6 = 0 (imposible)'
        ]
      },
      {
        title:'Probabilidad del complemento',
        steps:[
          'Si P(llueve) = 0.3, entonces P(no llueve) = 1 − 0.3 = 0.7',
          '\\(P(A^c) = 1 - P(A)\\)',
          'Ejemplo: al tirar un dado, P(sacar 6) = 1/6',
          'P(no sacar 6) = 1 − 1/6 = 5/6',
          'Siempre: P(A) + P(Aᶜ) = 1'
        ]
      },
      {
        title:'Probabilidad frecuentista',
        steps:[
          'Se lanzó una moneda 200 veces → salió cara 94 veces',
          'Probabilidad empírica = 94/200 = 0.47',
          'La probabilidad teórica es 0.5',
          'Con más lanzamientos, la probabilidad empírica se acerca a la teórica',
          'Esta es la Ley de los Grandes Números'
        ]
      }
    ],
    visual:{type:'est-probability'},
    discovery:{
      title:'La moneda "trucha"',
      steps:[
        'Lanza una moneda 10 veces. ¿Cuántas caras? ¿Es exactamente 5?',
        'Repite 10 veces más. ¿El promedio se acerca a 5?',
        'Con 100 lanzamientos, ¿la proporción de caras se acerca a 0.5?',
        'Esto ilustra la Ley de los Grandes Números.',
        'Conclusión: la probabilidad es una predicción de largo plazo, no de cada ensayo individual.'
      ]
    },
    exercises:{topic:'est_probabilidad', generators:[]},
    advanced:{
      title:'Definición axiomática de Kolmogórov',
      content:'El matemático ruso Andrei Kolmogórov (1933) formalizó la probabilidad con tres axiomas: (1) P(A) ≥ 0 para todo evento A; (2) P(Ω) = 1 (probabilidad del espacio muestral); (3) Si A y B son mutuamente excluyentes: P(A∪B) = P(A)+P(B). Todo el cálculo de probabilidades se deriva de estos tres axiomas. La probabilidad subjetiva (Bayesiana) añade la actualización de creencias con nueva evidencia: P(H|E) ∝ P(E|H)·P(H).'
    }
  },

  /* ══════════════════════════════════════════
     7. PROBABILIDAD COMPUESTA Y COMBINATORIA
  ══════════════════════════════════════════ */
  {
    id:'est-prob-compuesta', subject:'estadistica',
    unit:'Probabilidad Compuesta',
    title:'Probabilidad Compuesta, Combinatoria y Conteo',
    icon:'🎰',
    concept:{
      what:'La probabilidad compuesta trabaja con la combinación de eventos. Incluye: unión (A∪B), intersección (A∩B), probabilidad condicional P(A|B), y eventos independientes. La combinatoria cuenta arreglos y selecciones: permutaciones (orden importa) y combinaciones (orden no importa).',
      why:'La combinatoria es la base del conteo en probabilidad. Para calcular P(A), necesitamos contar cuántos resultados son favorables y cuántos son totales. Muchos problemas reales (lotería, juegos de cartas, selección de equipos) requieren combinar estas técnicas.',
      realLife:'La lotería usa combinatoria: C(49,6) = 13,983,816 posibles combinaciones. Las contraseñas usan permutaciones. Los algoritmos de IA usan probabilidad condicional (redes bayesianas).',
      commonErrors:[
        'Usar permutaciones cuando el orden no importa (y viceversa): C(n,r) cuando el orden no importa, P(n,r) cuando sí.',
        'Aplicar P(A∩B)=P(A)·P(B) sin verificar independencia.',
        'Confundir P(A|B) con P(B|A): son distintas (falacia del fiscal).'
      ]
    },
    examples:[
      {
        title:'Regla de la suma: eventos NO excluyentes',
        steps:[
          'P(Matemática) = 0.60, P(Ciencias) = 0.45, P(ambas) = 0.30',
          'P(M ∪ C) = P(M) + P(C) − P(M ∩ C)',
          '= 0.60 + 0.45 − 0.30 = 0.75',
          'Sin restar la intersección se contaría dos veces.',
          'Si fueran excluyentes: P(M∪C) = 0.60 + 0.45 = 1.05 → ¡imposible!'
        ]
      },
      {
        title:'Combinaciones: cuántas formas de elegir un comité',
        steps:[
          '¿De cuántas formas elegir 3 personas de un grupo de 7?',
          '\\(C(7,3) = \\frac{7!}{3! \\cdot 4!} = \\frac{7×6×5}{3×2×1} = \\frac{210}{6} = 35\\)',
          'Verificar: el orden NO importa (comité, no presidencia)',
          'Si el orden importara: P(7,3) = 7×6×5 = 210',
          '35 vs 210: hay 6 veces más permutaciones que combinaciones (3! = 6)'
        ]
      },
      {
        title:'Probabilidad condicional',
        steps:[
          'P(llueve) = 0.40, P(llueve y hay tráfico) = 0.30',
          '\\(P(\\text{tráfico} | \\text{lluvia}) = \\frac{P(T \\cap L)}{P(L)} = \\frac{0.30}{0.40} = 0.75\\)',
          'Dado que llueve, hay 75% de probabilidad de tráfico.',
          'Comparar: sin condición, P(tráfico) podría ser diferente.',
          'La condición reduce o modifica el espacio muestral.'
        ]
      }
    ],
    visual:{type:'est-probability'},
    discovery:{
      title:'El paradox del cumpleaños',
      steps:[
        'En un grupo de 23 personas, ¿cuál es la probabilidad de que dos compartan cumpleaños?',
        'Calcula la probabilidad de que NINGÚN par comparta: (365/365)×(364/365)×(363/365)×...×(343/365)',
        'Multiplica 23 fracciones → resultado ≈ 0.493',
        'P(al menos un par) = 1 − 0.493 = 0.507 → ¡más del 50%!',
        'Con solo 23 personas, ya es más probable que haya un cumpleaños repetido.'
      ]
    },
    exercises:{topic:'est_prob_compuesta', generators:[]},
    advanced:{
      title:'Teorema de Bayes',
      content:'\\(P(H|E) = \\frac{P(E|H) \\cdot P(H)}{P(E)}\\) — El Teorema de Bayes actualiza la probabilidad de una hipótesis H al observar evidencia E. Ejemplo: una prueba médica detecta la enfermedad con 99% de precisión. La enfermedad tiene prevalencia del 1%. Si el test da positivo, ¿cuál es la probabilidad real de tener la enfermedad? P(enf|+) = (0.99×0.01)/(0.99×0.01 + 0.01×0.99) ≈ 50%. ¡Sorprendente! La baja prevalencia domina el resultado. Este es el error base-rate en razonamiento probabilístico.'
    }
  },

  /* ══════════════════════════════════════════
     8. VARIABLES ALEATORIAS Y DISTRIBUCIONES
  ══════════════════════════════════════════ */
  {
    id:'est-variables-aleatorias', subject:'estadistica',
    unit:'Variables Aleatorias',
    title:'Variables Aleatorias y Distribuciones de Probabilidad',
    icon:'🎰',
    concept:{
      what:'Una **variable aleatoria** X asigna un número a cada resultado de un experimento aleatorio. **Discreta**: toma valores contables (0,1,2,...). **Continua**: toma cualquier valor en un intervalo. La **distribución binomial** modela éxitos en n ensayos independientes. La **distribución normal** modela fenómenos naturales con su famosa curva campana.',
      why:'Las distribuciones de probabilidad son los modelos matemáticos del azar. Permiten calcular probabilidades exactas, predicciones y tomar decisiones bajo incertidumbre.',
      realLife:'La distribución binomial modela cuántas vacunas serán efectivas en un ensayo clínico. La distribución normal modela las estaturas de una población, los errores de medición, y muchos fenómenos naturales.',
      commonErrors:[
        'Usar la distribución binomial sin verificar: n fijo, p constante, ensayos independientes.',
        'Confundir la distribución normal estándar N(0,1) con la normal general N(μ,σ).',
        'Calcular E(X) como el valor de X más probable (moda) en vez del promedio ponderado.'
      ]
    },
    examples:[
      {
        title:'Valor esperado de una variable discreta',
        steps:[
          'X = número obtenido al tirar un dado',
          'P(X=1)=P(X=2)=...=P(X=6) = 1/6',
          '\\(E(X) = 1·\\frac{1}{6} + 2·\\frac{1}{6} + ... + 6·\\frac{1}{6}\\)',
          '\\(= \\frac{1+2+3+4+5+6}{6} = \\frac{21}{6} = 3.5\\)',
          'Interpretación: en promedio, al tirar un dado se espera obtener 3.5'
        ]
      },
      {
        title:'Distribución Binomial',
        steps:[
          'n=5 lanzamientos, p=0.5 (cara), X=número de caras',
          '\\(P(X=k) = C(n,k)\\cdot p^k \\cdot (1-p)^{n-k}\\)',
          '\\(P(X=3) = C(5,3)\\cdot 0.5^3 \\cdot 0.5^2 = 10 \\cdot 0.125 \\cdot 0.25 = 0.3125\\)',
          '\\(E(X) = np = 5 × 0.5 = 2.5\\)',
          '\\(\\sigma = \\sqrt{np(1-p)} = \\sqrt{5×0.5×0.5} = \\sqrt{1.25} ≈ 1.12\\)'
        ]
      },
      {
        title:'Distribución Normal y puntaje Z',
        steps:[
          'IQ sigue N(μ=100, σ=15)',
          'Para x=115: \\(Z = \\frac{115-100}{15} = 1.0\\)',
          'P(X < 115) = P(Z < 1) ≈ 84.13% (tabla normal)',
          'Para x=70: Z = (70-100)/15 = -2 → P(X<70) ≈ 2.28%',
          'Regla 68-95-99.7: el 95% tiene IQ entre 70 y 130 (μ±2σ)'
        ]
      }
    ],
    visual:{type:'est-normal-dist'},
    discovery:{
      title:'Simula la distribución binomial',
      steps:[
        'Lanza 10 monedas al aire y cuenta las caras. Anota el número.',
        'Repite el experimento 20 veces.',
        'Haz un histograma de tus resultados.',
        '¿Se parece a la distribución binomial B(10, 0.5)?',
        'El valor teórico más probable es X=5 (moda). ¿Coincide con tu experimento?'
      ]
    },
    exercises:{topic:'est_variables', generators:[]},
    advanced:{
      title:'Distribución de Poisson',
      content:'La **distribución de Poisson** \\(P(X=k) = \\frac{e^{-\\lambda}\\lambda^k}{k!}\\) modela eventos raros que ocurren a tasa constante λ en un intervalo. Ejemplo: si un call center recibe en promedio λ=3 llamadas por minuto, la probabilidad de exactamente k llamadas en un minuto sigue Poisson(3). Para λ grande, la distribución de Poisson se aproxima a la normal. Para n grande y p pequeño en la binomial (λ=np≈constante), la binomial se aproxima a la Poisson. Esta cadena de aproximaciones es fundamental en estadística aplicada.'
    }
  }

  ]; // end LESSONS

  // Registro
  if(!window.MM_LESSONS) window.MM_LESSONS=[];
  LESSONS.forEach(function(lesson){
    if(lesson.exercises&&lesson.exercises.topic&&window.MM_TOPIC_GENERATORS){
      var gens=window.MM_TOPIC_GENERATORS[lesson.exercises.topic];
      if(gens&&gens.length) lesson.exercises.generators=gens;
    }
    var idx=window.MM_LESSONS.findIndex(function(l){return l.id===lesson.id;});
    if(idx!==-1) window.MM_LESSONS.splice(idx,1);
    window.MM_LESSONS.push(lesson);
  });
  if(!window.MM_LESSON_MAP) window.MM_LESSON_MAP={};
  LESSONS.forEach(function(l){window.MM_LESSON_MAP[l.id]=l;});
  console.log('[MM] content-estadistica.js cargado.',LESSONS.length,'lecciones');
})();
