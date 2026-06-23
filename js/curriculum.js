/* ═══════════════════════════════════════════════════════════════
   CURRICULUM.JS — Mapa curricular completo
   Jerarquía: Materia → Unidad → Temario
   9 materias · 51 unidades · ~395 temarios
   ═══════════════════════════════════════════════════════════════ */

window.MM_CURRICULUM = (() => {

  const _subjects = [

    /* ══════════════════════════════════════════════════════════
       ARITMÉTICA — 15 Unidades
    ══════════════════════════════════════════════════════════ */
    {
      id: 'aritmetica', name: 'Aritmética', icon: '🔢',
      color: '#F59E0B', level: '1° Básico → 2° Medio',
      description: 'Domina los números, operaciones y las bases del razonamiento numérico.',
      units: [
        {
          id: 'arit_u1', name: 'Números Naturales', level: '1°–3° Básico',
          lessonIds: ['arit-naturales'],
          topics: [
            { id:'arit_u1_t1', name:'Conteo y valor posicional',          prerequisites:[], generatorKey:'naturales', lessonIds:['arit-naturales'] },
            { id:'arit_u1_t2', name:'Comparación y orden',                prerequisites:['arit_u1_t1'], generatorKey:'naturales' },
            { id:'arit_u1_t3', name:'Redondeo y estimación',              prerequisites:['arit_u1_t2'], generatorKey:'naturales' },
            { id:'arit_u1_t4', name:'Suma y resta de naturales',          prerequisites:['arit_u1_t1'], generatorKey:'naturales' },
            { id:'arit_u1_t5', name:'Multiplicación de naturales',        prerequisites:['arit_u1_t4'], generatorKey:'naturales' },
            { id:'arit_u1_t6', name:'División de naturales',              prerequisites:['arit_u1_t5'], generatorKey:'naturales' },
          ]
        },
        {
          id: 'arit_u2', name: 'Números Enteros', level: '5°–7° Básico',
          lessonIds: ['arit-enteros'],
          topics: [
            { id:'arit_u2_t1', name:'Enteros negativos y la recta',      prerequisites:['arit_u1_t2'], generatorKey:'enteros', lessonIds:['arit-enteros'] },
            { id:'arit_u2_t2', name:'Valor absoluto',                     prerequisites:['arit_u2_t1'], generatorKey:'enteros' },
            { id:'arit_u2_t3', name:'Suma y resta de enteros',            prerequisites:['arit_u2_t1'], generatorKey:'enteros' },
            { id:'arit_u2_t4', name:'Multiplicación y división de enteros', prerequisites:['arit_u2_t3'], generatorKey:'enteros' },
            { id:'arit_u2_t5', name:'Reglas de signos',                   prerequisites:['arit_u2_t4'], generatorKey:'enteros' },
          ]
        },
        {
          id: 'arit_u3', name: 'Operaciones Combinadas', level: '5°–7° Básico',
          lessonIds: ['arit-operaciones'],
          topics: [
            { id:'arit_u3_t1', name:'Jerarquía de operaciones (PEMDAS)', prerequisites:['arit_u1_t5'], generatorKey:'operaciones', lessonIds:['arit-operaciones'] },
            { id:'arit_u3_t2', name:'Expresiones con paréntesis',         prerequisites:['arit_u3_t1'], generatorKey:'operaciones' },
            { id:'arit_u3_t3', name:'Operaciones combinadas con enteros', prerequisites:['arit_u2_t4','arit_u3_t1'], generatorKey:'operaciones' },
            { id:'arit_u3_t4', name:'Problemas con jerarquía',            prerequisites:['arit_u3_t2'], generatorKey:'operaciones' },
          ]
        },
        {
          id: 'arit_u4', name: 'Potencias', level: '5°–8° Básico',
          lessonIds: ['arit-potencias'],
          topics: [
            { id:'arit_u4_t1', name:'Concepto de potencia y exponente',   prerequisites:['arit_u1_t5'], generatorKey:'potencias', lessonIds:['arit-potencias'] },
            { id:'arit_u4_t2', name:'Potencias de base negativa',         prerequisites:['arit_u4_t1','arit_u2_t4'], generatorKey:'potencias' },
            { id:'arit_u4_t3', name:'Propiedades de las potencias',       prerequisites:['arit_u4_t1'], generatorKey:'potencias' },
            { id:'arit_u4_t4', name:'Exponente cero y negativo',          prerequisites:['arit_u4_t3'], generatorKey:'potencias' },
            { id:'arit_u4_t5', name:'Notación científica',                prerequisites:['arit_u4_t3'], generatorKey:'potencias' },
          ]
        },
        {
          id: 'arit_u5', name: 'Raíces', level: '6°–8° Básico',
          lessonIds: ['arit-raices'],
          topics: [
            { id:'arit_u5_t1', name:'Raíz cuadrada exacta',              prerequisites:['arit_u4_t1'], generatorKey:'raices', lessonIds:['arit-raices'] },
            { id:'arit_u5_t2', name:'Raíz cúbica',                       prerequisites:['arit_u5_t1'], generatorKey:'raices' },
            { id:'arit_u5_t3', name:'Simplificación de raíces',          prerequisites:['arit_u5_t1','arit_u4_t3'], generatorKey:'raices' },
            { id:'arit_u5_t4', name:'Números irracionales',               prerequisites:['arit_u5_t1'], generatorKey:'raices' },
          ]
        },
        {
          id: 'arit_u6', name: 'Divisibilidad', level: '4°–6° Básico',
          lessonIds: ['arit-divisibilidad'],
          topics: [
            { id:'arit_u6_t1', name:'Criterios de divisibilidad',        prerequisites:['arit_u1_t6'], generatorKey:'divisibilidad', lessonIds:['arit-divisibilidad'] },
            { id:'arit_u6_t2', name:'Números primos y compuestos',       prerequisites:['arit_u6_t1'], generatorKey:'divisibilidad' },
            { id:'arit_u6_t3', name:'Factorización en primos',           prerequisites:['arit_u6_t2'], generatorKey:'divisibilidad' },
            { id:'arit_u6_t4', name:'Múltiplos y divisores',             prerequisites:['arit_u6_t1'], generatorKey:'divisibilidad' },
          ]
        },
        {
          id: 'arit_u7', name: 'MCD', level: '5°–7° Básico',
          lessonIds: ['arit-mcd'],
          topics: [
            { id:'arit_u7_t1', name:'MCD por factorización',             prerequisites:['arit_u6_t3'], generatorKey:'mcd', lessonIds:['arit-mcd'] },
            { id:'arit_u7_t2', name:'Algoritmo de Euclides',             prerequisites:['arit_u7_t1'], generatorKey:'mcd' },
            { id:'arit_u7_t3', name:'MCD de tres o más números',         prerequisites:['arit_u7_t2'], generatorKey:'mcd' },
            { id:'arit_u7_t4', name:'Aplicaciones del MCD',              prerequisites:['arit_u7_t2'], generatorKey:'mcd' },
          ]
        },
        {
          id: 'arit_u8', name: 'MCM', level: '5°–7° Básico',
          lessonIds: ['arit-mcm'],
          topics: [
            { id:'arit_u8_t1', name:'MCM por factorización',             prerequisites:['arit_u6_t3'], generatorKey:'mcm', lessonIds:['arit-mcm'] },
            { id:'arit_u8_t2', name:'Relación MCM–MCD',                  prerequisites:['arit_u7_t2','arit_u8_t1'], generatorKey:'mcm' },
            { id:'arit_u8_t3', name:'MCM de tres o más números',         prerequisites:['arit_u8_t1'], generatorKey:'mcm' },
            { id:'arit_u8_t4', name:'Aplicaciones del MCM',              prerequisites:['arit_u8_t1'], generatorKey:'mcm' },
          ]
        },
        {
          id: 'arit_u9', name: 'Fracciones', level: '3°–7° Básico',
          lessonIds: ['arit-fracciones'],
          topics: [
            { id:'arit_u9_t1', name:'Concepto y tipos de fracción',      prerequisites:['arit_u1_t6'], generatorKey:'fracciones', lessonIds:['arit-fracciones'] },
            { id:'arit_u9_t2', name:'Fracciones equivalentes y simplificación', prerequisites:['arit_u9_t1','arit_u7_t1'], generatorKey:'fracciones' },
            { id:'arit_u9_t3', name:'Comparación de fracciones',         prerequisites:['arit_u9_t2'], generatorKey:'fracciones' },
            { id:'arit_u9_t4', name:'Suma y resta de fracciones',        prerequisites:['arit_u9_t2','arit_u8_t1'], generatorKey:'fracciones' },
            { id:'arit_u9_t5', name:'Multiplicación de fracciones',      prerequisites:['arit_u9_t1'], generatorKey:'fracciones' },
            { id:'arit_u9_t6', name:'División de fracciones',            prerequisites:['arit_u9_t5'], generatorKey:'fracciones' },
            { id:'arit_u9_t7', name:'Fracción de una cantidad',          prerequisites:['arit_u9_t5'], generatorKey:'fracciones' },
          ]
        },
        {
          id: 'arit_u10', name: 'Decimales', level: '4°–7° Básico',
          lessonIds: ['arit-decimales'],
          topics: [
            { id:'arit_u10_t1', name:'Valor posicional decimal',          prerequisites:['arit_u1_t2'], generatorKey:'decimales', lessonIds:['arit-decimales'] },
            { id:'arit_u10_t2', name:'Suma y resta de decimales',         prerequisites:['arit_u10_t1'], generatorKey:'decimales' },
            { id:'arit_u10_t3', name:'Multiplicación de decimales',       prerequisites:['arit_u10_t1'], generatorKey:'decimales' },
            { id:'arit_u10_t4', name:'División de decimales',             prerequisites:['arit_u10_t3'], generatorKey:'decimales' },
            { id:'arit_u10_t5', name:'Conversión fracción ↔ decimal',    prerequisites:['arit_u10_t1','arit_u9_t1'], generatorKey:'decimales' },
          ]
        },
        {
          id: 'arit_u11', name: 'Razones', level: '6°–8° Básico',
          lessonIds: ['arit-razones'],
          topics: [
            { id:'arit_u11_t1', name:'Concepto de razón',                prerequisites:['arit_u9_t2'], generatorKey:'razones', lessonIds:['arit-razones'] },
            { id:'arit_u11_t2', name:'Simplificación de razones',        prerequisites:['arit_u11_t1','arit_u7_t1'], generatorKey:'razones' },
            { id:'arit_u11_t3', name:'Razones equivalentes',             prerequisites:['arit_u11_t2'], generatorKey:'razones' },
            { id:'arit_u11_t4', name:'División proporcional',            prerequisites:['arit_u11_t2'], generatorKey:'razones' },
          ]
        },
        {
          id: 'arit_u12', name: 'Proporciones', level: '6°–8° Básico',
          lessonIds: ['arit-proporciones'],
          topics: [
            { id:'arit_u12_t1', name:'Cuarto proporcional',              prerequisites:['arit_u11_t1'], generatorKey:'proporciones', lessonIds:['arit-proporciones'] },
            { id:'arit_u12_t2', name:'Proporción directa',               prerequisites:['arit_u12_t1'], generatorKey:'proporciones' },
            { id:'arit_u12_t3', name:'Proporción inversa',               prerequisites:['arit_u12_t1'], generatorKey:'proporciones' },
            { id:'arit_u12_t4', name:'Escalas y mapas',                  prerequisites:['arit_u12_t2'], generatorKey:'proporciones' },
          ]
        },
        {
          id: 'arit_u13', name: 'Porcentajes', level: '5°–8° Básico',
          lessonIds: ['arit-porcentajes'],
          topics: [
            { id:'arit_u13_t1', name:'Concepto de porcentaje',           prerequisites:['arit_u9_t1'], generatorKey:'porcentajes', lessonIds:['arit-porcentajes'] },
            { id:'arit_u13_t2', name:'Calcular el porcentaje de un total', prerequisites:['arit_u13_t1'], generatorKey:'porcentajes' },
            { id:'arit_u13_t3', name:'Encontrar el total dado el porcentaje', prerequisites:['arit_u13_t2'], generatorKey:'porcentajes' },
            { id:'arit_u13_t4', name:'Descuentos y aumentos',            prerequisites:['arit_u13_t2'], generatorKey:'porcentajes' },
            { id:'arit_u13_t5', name:'Porcentajes sucesivos',            prerequisites:['arit_u13_t4'], generatorKey:'porcentajes' },
          ]
        },
        {
          id: 'arit_u14', name: 'Regla de Tres', level: '6°–8° Básico',
          lessonIds: ['arit-reglatres'],
          topics: [
            { id:'arit_u14_t1', name:'Regla de tres directa',            prerequisites:['arit_u12_t2'], generatorKey:'reglatres', lessonIds:['arit-reglatres'] },
            { id:'arit_u14_t2', name:'Regla de tres inversa',            prerequisites:['arit_u12_t3','arit_u14_t1'], generatorKey:'reglatres' },
            { id:'arit_u14_t3', name:'Regla de tres compuesta',          prerequisites:['arit_u14_t1','arit_u14_t2'], generatorKey:'reglatres' },
          ]
        },
        {
          id: 'arit_u15', name: 'Problemas Aplicados', level: '6°–8° Básico',
          lessonIds: ['arit-aplicados'],
          topics: [
            { id:'arit_u15_t1', name:'Problemas de mezclas',             prerequisites:['arit_u13_t2','arit_u12_t2'], generatorKey:'aplicados', lessonIds:['arit-aplicados'] },
            { id:'arit_u15_t2', name:'Problemas de movimiento',          prerequisites:['arit_u14_t1'], generatorKey:'aplicados' },
            { id:'arit_u15_t3', name:'Problemas de edades',              prerequisites:['arit_u2_t3'], generatorKey:'aplicados' },
            { id:'arit_u15_t4', name:'Problemas de trabajo',             prerequisites:['arit_u9_t4','arit_u14_t1'], generatorKey:'aplicados' },
            { id:'arit_u15_t5', name:'Problemas de geometría básica',    prerequisites:['arit_u1_t5'], generatorKey:'aplicados' },
            { id:'arit_u15_t6', name:'Problemas integrados',             prerequisites:['arit_u15_t1','arit_u15_t2','arit_u15_t3'], generatorKey:'aplicados' },
          ]
        },
      ]
    },

    /* ══════════════════════════════════════════════════════════
       ÁLGEBRA
    ══════════════════════════════════════════════════════════ */
    {
      id: 'algebra', name: 'Álgebra', icon: '📐',
      color: '#8B5CF6', level: '7° Básico → Universitario',
      description: 'Trabaja con variables, ecuaciones y expresa relaciones matemáticas.',
      units: [
        {
          id: 'alg_u1', name: 'Expresiones Algebraicas', level: '6°–8° Básico',
          lessonIds: ['alg-expresiones'], generatorKey: 'alg_expresiones',
          topics: [
            { id:'alg_u1_t1', name:'Variable y expresión algebraica',     prerequisites:[] },
            { id:'alg_u1_t2', name:'Monomios y polinomios',               prerequisites:['alg_u1_t1'] },
            { id:'alg_u1_t3', name:'Grado y coeficiente',                 prerequisites:['alg_u1_t2'] },
            { id:'alg_u1_t4', name:'Evaluación de expresiones',           prerequisites:['alg_u1_t2'] },
            { id:'alg_u1_t5', name:'Traducción al lenguaje algebraico',   prerequisites:['alg_u1_t1'] },
            { id:'alg_u1_t6', name:'Evaluación con dos variables',        prerequisites:['alg_u1_t4'] },
          ]
        },
        {
          id: 'alg_u2', name: 'Reducción de Términos Semejantes', level: '7°–8° Básico',
          lessonIds: ['alg-reduccion'], generatorKey: 'alg_reduccion',
          topics: [
            { id:'alg_u2_t1', name:'Términos semejantes: concepto',       prerequisites:['alg_u1_t2'] },
            { id:'alg_u2_t2', name:'Reducción de expresiones lineales',   prerequisites:['alg_u2_t1'] },
            { id:'alg_u2_t3', name:'Reducción de expresiones cuadráticas',prerequisites:['alg_u2_t2'] },
            { id:'alg_u2_t4', name:'Suma de polinomios',                  prerequisites:['alg_u2_t2'] },
            { id:'alg_u2_t5', name:'Resta de polinomios',                 prerequisites:['alg_u2_t4'] },
            { id:'alg_u2_t6', name:'Identificar términos no semejantes',  prerequisites:['alg_u2_t1'] },
          ]
        },
        {
          id: 'alg_u3', name: 'Productos Notables', level: '8° Básico – 1° Medio',
          lessonIds: ['alg-productos'], generatorKey: 'alg_productos',
          topics: [
            { id:'alg_u3_t1', name:'Cuadrado de binomio suma: (a+b)²',   prerequisites:['alg_u2_t4'] },
            { id:'alg_u3_t2', name:'Cuadrado de binomio diferencia',      prerequisites:['alg_u3_t1'] },
            { id:'alg_u3_t3', name:'Producto suma por diferencia',        prerequisites:['alg_u3_t1'] },
            { id:'alg_u3_t4', name:'Cubo de binomio',                     prerequisites:['alg_u3_t1'] },
            { id:'alg_u3_t5', name:'Producto de binomios generales',      prerequisites:['alg_u3_t1'] },
            { id:'alg_u3_t6', name:'Aplicación numérica de notables',     prerequisites:['alg_u3_t3'] },
          ]
        },
        {
          id: 'alg_u4', name: 'Factorización', level: '8° Básico – 1° Medio',
          lessonIds: ['alg-factorizacion'], generatorKey: 'alg_factorizacion',
          topics: [
            { id:'alg_u4_t1', name:'Factor común monomio',                prerequisites:['alg_u2_t4'] },
            { id:'alg_u4_t2', name:'Factor común con variable',           prerequisites:['alg_u4_t1'] },
            { id:'alg_u4_t3', name:'Diferencia de cuadrados',             prerequisites:['alg_u3_t3'] },
            { id:'alg_u4_t4', name:'Trinomio cuadrado perfecto',          prerequisites:['alg_u3_t1'] },
            { id:'alg_u4_t5', name:'Trinomio de la forma x²+bx+c',       prerequisites:['alg_u4_t4'] },
            { id:'alg_u4_t6', name:'Factorización ax²+bx+c',             prerequisites:['alg_u4_t5'] },
          ]
        },
        {
          id: 'alg_u5', name: 'Ecuaciones de Primer Grado', level: '7°–8° Básico',
          lessonIds: ['alg-ec1'], generatorKey: 'alg_ec1',
          topics: [
            { id:'alg_u5_t1', name:'Concepto de ecuación',                prerequisites:['alg_u1_t2'] },
            { id:'alg_u5_t2', name:'Ecuaciones simples',                  prerequisites:['alg_u5_t1'] },
            { id:'alg_u5_t3', name:'Ecuaciones con paréntesis',           prerequisites:['alg_u5_t2'] },
            { id:'alg_u5_t4', name:'Ecuaciones con fracciones',           prerequisites:['alg_u5_t3'] },
            { id:'alg_u5_t5', name:'Problemas verbales',                  prerequisites:['alg_u5_t2'] },
          ]
        },
        {
          id: 'alg_u6', name: 'Ecuaciones de Segundo Grado', level: '8° Básico – 2° Medio',
          lessonIds: ['alg-ec2'], generatorKey: 'alg_ec2',
          topics: [
            { id:'alg_u6_t1', name:'Forma estándar ax²+bx+c=0',          prerequisites:['alg_u5_t2'] },
            { id:'alg_u6_t2', name:'Resolver por factorización',          prerequisites:['alg_u6_t1','alg_u4_t5'] },
            { id:'alg_u6_t3', name:'Fórmula general (Bhaskara)',          prerequisites:['alg_u6_t1'] },
            { id:'alg_u6_t4', name:'El discriminante',                    prerequisites:['alg_u6_t3'] },
            { id:'alg_u6_t5', name:'Teorema de Vieta',                    prerequisites:['alg_u6_t3'] },
            { id:'alg_u6_t6', name:'Problemas con ecuaciones cuadráticas',prerequisites:['alg_u6_t3'] },
          ]
        },
        {
          id: 'alg_u7', name: 'Sistemas de Ecuaciones', level: '1°–2° Medio',
          lessonIds: ['alg-sistemas'], generatorKey: 'alg_sistemas',
          topics: [
            { id:'alg_u7_t1', name:'Ecuación con dos variables',          prerequisites:['alg_u5_t2'] },
            { id:'alg_u7_t2', name:'Método de sustitución',               prerequisites:['alg_u7_t1'] },
            { id:'alg_u7_t3', name:'Método de eliminación',               prerequisites:['alg_u7_t1'] },
            { id:'alg_u7_t4', name:'Clasificación de sistemas',           prerequisites:['alg_u7_t2'] },
            { id:'alg_u7_t5', name:'Problemas con sistemas',              prerequisites:['alg_u7_t2'] },
          ]
        },
        {
          id: 'alg_u8', name: 'Inecuaciones', level: '8° Básico – 2° Medio',
          lessonIds: ['alg-inecuaciones'], generatorKey: 'alg_inecuaciones',
          topics: [
            { id:'alg_u8_t1', name:'Inecuación lineal',                   prerequisites:['alg_u5_t2'] },
            { id:'alg_u8_t2', name:'Inecuación doble',                    prerequisites:['alg_u8_t1'] },
            { id:'alg_u8_t3', name:'Inecuación cuadrática',               prerequisites:['alg_u8_t1','alg_u6_t2'] },
            { id:'alg_u8_t4', name:'Notación de intervalos',              prerequisites:['alg_u8_t1'] },
          ]
        },
        {
          id: 'alg_u9', name: 'Polinomios', level: '8° Básico – 2° Medio',
          lessonIds: ['alg-polinomios'], generatorKey: 'alg_polinomios',
          topics: [
            { id:'alg_u9_t1', name:'Grado y evaluación de polinomios',   prerequisites:['alg_u1_t4'] },
            { id:'alg_u9_t2', name:'División por monomio',                prerequisites:['alg_u9_t1'] },
            { id:'alg_u9_t3', name:'Teorema del Resto',                   prerequisites:['alg_u9_t1'] },
            { id:'alg_u9_t4', name:'Regla de Ruffini',                    prerequisites:['alg_u9_t3'] },
            { id:'alg_u9_t5', name:'Raíces y factores de polinomios',    prerequisites:['alg_u9_t4'] },
          ]
        },
        {
          id: 'alg_u10', name: 'Funciones', level: '1°–2° Medio',
          lessonIds: ['alg-funciones'], generatorKey: 'alg_funciones',
          topics: [
            { id:'alg_u10_t1', name:'Concepto de función y notación',    prerequisites:['alg_u1_t4'],  generatorKey:'alg_funciones', lessonIds:['alg-funciones'] },
            { id:'alg_u10_t2', name:'Evaluación de funciones',           prerequisites:['alg_u10_t1'], generatorKey:'alg_funciones', lessonIds:['alg-funciones'] },
            { id:'alg_u10_t3', name:'Pendiente e intercepción',          prerequisites:['alg_u10_t1'], generatorKey:'alg_funciones', lessonIds:['alg-funciones'] },
            { id:'alg_u10_t4', name:'Función compuesta',                 prerequisites:['alg_u10_t2'], generatorKey:'alg_funciones', lessonIds:['alg-funciones'] },
            { id:'alg_u10_t5', name:'Dominio y recorrido',               prerequisites:['alg_u10_t1'], generatorKey:'alg_funciones', lessonIds:['alg-funciones'] },
            { id:'alg_u10_t6', name:'Imagen inversa',                    prerequisites:['alg_u10_t2'], generatorKey:'alg_funciones', lessonIds:['alg-funciones'] },
          ]
        },
        {
          id: 'alg_u11', name: 'Sucesiones y Progresiones', level: '1°–2° Medio',
          lessonIds: ['alg-sucesiones'], generatorKey: 'alg_sucesiones',
          topics: [
            { id:'alg_u11_t1', name:'Término general de una PA',         prerequisites:['alg_u1_t4'],  generatorKey:'alg_sucesiones', lessonIds:['alg-sucesiones'] },
            { id:'alg_u11_t2', name:'Suma de términos de una PA',        prerequisites:['alg_u11_t1'], generatorKey:'alg_sucesiones', lessonIds:['alg-sucesiones'] },
            { id:'alg_u11_t3', name:'Término general de una PG',         prerequisites:['alg_u11_t1'], generatorKey:'alg_sucesiones', lessonIds:['alg-sucesiones'] },
            { id:'alg_u11_t4', name:'Suma de términos de una PG',        prerequisites:['alg_u11_t3'], generatorKey:'alg_sucesiones', lessonIds:['alg-sucesiones'] },
            { id:'alg_u11_t5', name:'Identificar el tipo de sucesión',   prerequisites:['alg_u11_t1'], generatorKey:'alg_sucesiones', lessonIds:['alg-sucesiones'] },
            { id:'alg_u11_t6', name:'Fórmula general y aplicaciones',    prerequisites:['alg_u11_t3'], generatorKey:'alg_sucesiones', lessonIds:['alg-sucesiones'] },
          ]
        },
      ]
    },

    /* ══════════════════════════════════════════════════════════
       GEOMETRÍA
    ══════════════════════════════════════════════════════════ */
    {
      id: 'geometria', name: 'Geometría', icon: '📏',
      color: '#10B981', level: '5° Básico → 2° Medio',
      description: 'Estudia formas, ángulos, áreas, volúmenes y geometría analítica.',
      units: [
        {
          id: 'geo_u1', name: 'Ángulos', level: '5°–7° Básico',
          lessonIds: ['geo-angulos'],
          topics: [
            { id:'geo_u1_t1', name:'Tipos de ángulos: agudo, recto, obtuso, llano', prerequisites:[], generatorKey:'geo_angulos', lessonIds:['geo-angulos'] },
            { id:'geo_u1_t2', name:'Ángulos complementarios y suplementarios', prerequisites:['geo_u1_t1'], generatorKey:'geo_angulos' },
            { id:'geo_u1_t3', name:'Ángulos opuestos por el vértice', prerequisites:['geo_u1_t1'], generatorKey:'geo_angulos' },
            { id:'geo_u1_t4', name:'Ángulos con rectas paralelas y transversal', prerequisites:['geo_u1_t3'], generatorKey:'geo_angulos' },
            { id:'geo_u1_t5', name:'Ángulo central e inscrito en una circunferencia', prerequisites:['geo_u1_t1'], generatorKey:'geo_angulos' },
          ]
        },
        {
          id: 'geo_u2', name: 'Triángulos', level: '6°–7° Básico',
          lessonIds: ['geo-triangulos'],
          topics: [
            { id:'geo_u2_t1', name:'Clasificación por lados: equilátero, isósceles, escaleno', prerequisites:['geo_u1_t1'], generatorKey:'geo_triangulos', lessonIds:['geo-triangulos'] },
            { id:'geo_u2_t2', name:'Clasificación por ángulos: acutángulo, rectángulo, obtusángulo', prerequisites:['geo_u1_t1'], generatorKey:'geo_triangulos' },
            { id:'geo_u2_t3', name:'Suma de ángulos interiores del triángulo (180°)', prerequisites:['geo_u2_t1'], generatorKey:'geo_triangulos' },
            { id:'geo_u2_t4', name:'Ángulo exterior del triángulo', prerequisites:['geo_u2_t3'], generatorKey:'geo_triangulos' },
            { id:'geo_u2_t5', name:'Desigualdad triangular', prerequisites:['geo_u2_t1'], generatorKey:'geo_triangulos' },
            { id:'geo_u2_t6', name:'Triángulo 30°–60°–90°', prerequisites:['geo_u2_t2'], generatorKey:'geo_triangulos' },
          ]
        },
        {
          id: 'geo_u3', name: 'Congruencia de Triángulos', level: '7°–8° Básico',
          lessonIds: ['geo-congruencia'],
          topics: [
            { id:'geo_u3_t1', name:'Criterio LLL (SSS)', prerequisites:['geo_u2_t1'], generatorKey:'geo_congruencia', lessonIds:['geo-congruencia'] },
            { id:'geo_u3_t2', name:'Criterio LAL (SAS)', prerequisites:['geo_u3_t1'], generatorKey:'geo_congruencia' },
            { id:'geo_u3_t3', name:'Criterio ALA (ASA)', prerequisites:['geo_u3_t1'], generatorKey:'geo_congruencia' },
            { id:'geo_u3_t4', name:'Criterio AAL (AAS)', prerequisites:['geo_u3_t3'], generatorKey:'geo_congruencia' },
            { id:'geo_u3_t5', name:'Criterio HC (HL) para triángulos rectángulos', prerequisites:['geo_u3_t2'], generatorKey:'geo_congruencia' },
          ]
        },
        {
          id: 'geo_u4', name: 'Semejanza de Triángulos', level: '7°–8° Básico',
          lessonIds: ['geo-semejanza'],
          topics: [
            { id:'geo_u4_t1', name:'Razón de semejanza', prerequisites:['geo_u3_t1'], generatorKey:'geo_semejanza', lessonIds:['geo-semejanza'] },
            { id:'geo_u4_t2', name:'Criterio AA de semejanza', prerequisites:['geo_u4_t1'], generatorKey:'geo_semejanza' },
            { id:'geo_u4_t3', name:'Lados faltantes con proporciones', prerequisites:['geo_u4_t1'], generatorKey:'geo_semejanza' },
            { id:'geo_u4_t4', name:'Razón de áreas (k²) y razón de volúmenes (k³)', prerequisites:['geo_u4_t1'], generatorKey:'geo_semejanza' },
            { id:'geo_u4_t5', name:'Aplicaciones: sombras, mapas, escalas', prerequisites:['geo_u4_t3'], generatorKey:'geo_semejanza' },
          ]
        },
        {
          id: 'geo_u5', name: 'Teorema de Pitágoras', level: '7°–8° Básico',
          lessonIds: ['geo-pitagoras'],
          topics: [
            { id:'geo_u5_t1', name:'El Teorema: a²+b²=c²', prerequisites:['geo_u2_t2'], generatorKey:'geo_pitagoras', lessonIds:['geo-pitagoras'] },
            { id:'geo_u5_t2', name:'Calcular la hipotenusa', prerequisites:['geo_u5_t1'], generatorKey:'geo_pitagoras' },
            { id:'geo_u5_t3', name:'Calcular un cateto', prerequisites:['geo_u5_t1'], generatorKey:'geo_pitagoras' },
            { id:'geo_u5_t4', name:'Ternas pitagóricas y verificación', prerequisites:['geo_u5_t1'], generatorKey:'geo_pitagoras' },
            { id:'geo_u5_t5', name:'Diagonal del rectángulo y aplicaciones 2D', prerequisites:['geo_u5_t2'], generatorKey:'geo_pitagoras' },
            { id:'geo_u5_t6', name:'Pitágoras en 3 dimensiones', prerequisites:['geo_u5_t5'], generatorKey:'geo_pitagoras' },
          ]
        },
        {
          id: 'geo_u6', name: 'Polígonos', level: '7°–8° Básico',
          lessonIds: ['geo-poligonos'],
          topics: [
            { id:'geo_u6_t1', name:'Tipos de polígonos: convexos, cóncavos, regulares', prerequisites:['geo_u2_t1'], generatorKey:'geo_poligonos', lessonIds:['geo-poligonos'] },
            { id:'geo_u6_t2', name:'Suma de ángulos interiores: (n-2)×180°', prerequisites:['geo_u6_t1'], generatorKey:'geo_poligonos' },
            { id:'geo_u6_t3', name:'Ángulo interior y exterior de polígonos regulares', prerequisites:['geo_u6_t2'], generatorKey:'geo_poligonos' },
            { id:'geo_u6_t4', name:'Número de diagonales: n(n-3)/2', prerequisites:['geo_u6_t1'], generatorKey:'geo_poligonos' },
            { id:'geo_u6_t5', name:'Teselaciones con polígonos regulares', prerequisites:['geo_u6_t3'], generatorKey:'geo_poligonos' },
          ]
        },
        {
          id: 'geo_u7', name: 'Perímetro', level: '5°–7° Básico',
          lessonIds: ['geo-perimetro'],
          topics: [
            { id:'geo_u7_t1', name:'Perímetro del cuadrado y rectángulo', prerequisites:[], generatorKey:'geo_perimetro', lessonIds:['geo-perimetro'] },
            { id:'geo_u7_t2', name:'Perímetro del triángulo', prerequisites:['geo_u2_t1'], generatorKey:'geo_perimetro' },
            { id:'geo_u7_t3', name:'Perímetro de polígonos regulares', prerequisites:['geo_u6_t1'], generatorKey:'geo_perimetro' },
            { id:'geo_u7_t4', name:'Hallar un lado conociendo el perímetro', prerequisites:['geo_u7_t1'], generatorKey:'geo_perimetro' },
            { id:'geo_u7_t5', name:'Problemas de perímetro con contexto real', prerequisites:['geo_u7_t1'], generatorKey:'geo_perimetro' },
          ]
        },
        {
          id: 'geo_u8', name: 'Área de Figuras Planas', level: '6°–8° Básico',
          lessonIds: ['geo-area'],
          topics: [
            { id:'geo_u8_t1', name:'Área del cuadrado y rectángulo', prerequisites:['geo_u7_t1'], generatorKey:'geo_area', lessonIds:['geo-area'] },
            { id:'geo_u8_t2', name:'Área del triángulo: (b×h)/2', prerequisites:['geo_u2_t3'], generatorKey:'geo_area' },
            { id:'geo_u8_t3', name:'Área del paralelogramo: b×h', prerequisites:['geo_u8_t1'], generatorKey:'geo_area' },
            { id:'geo_u8_t4', name:'Área del trapecio: ((b1+b2)×h)/2', prerequisites:['geo_u8_t3'], generatorKey:'geo_area' },
            { id:'geo_u8_t5', name:'Hallar dimensiones conociendo el área', prerequisites:['geo_u8_t1'], generatorKey:'geo_area' },
            { id:'geo_u8_t6', name:'Áreas de figuras compuestas', prerequisites:['geo_u8_t2','geo_u8_t3'], generatorKey:'geo_area' },
          ]
        },
        {
          id: 'geo_u9', name: 'Circunferencia', level: '7°–8° Básico',
          lessonIds: ['geo-circunferencia'],
          topics: [
            { id:'geo_u9_t1', name:'Radio, diámetro y la constante π', prerequisites:['geo_u8_t1'], generatorKey:'geo_circunferencia', lessonIds:['geo-circunferencia'] },
            { id:'geo_u9_t2', name:'Longitud de la circunferencia: 2πr', prerequisites:['geo_u9_t1'], generatorKey:'geo_circunferencia' },
            { id:'geo_u9_t3', name:'Longitud de arco: (θ/360°)×2πr', prerequisites:['geo_u9_t2'], generatorKey:'geo_circunferencia' },
            { id:'geo_u9_t4', name:'Ángulo central y arco correspondiente', prerequisites:['geo_u9_t3'], generatorKey:'geo_circunferencia' },
            { id:'geo_u9_t5', name:'Ángulo inscrito = mitad del central', prerequisites:['geo_u9_t4'], generatorKey:'geo_circunferencia' },
          ]
        },
        {
          id: 'geo_u10', name: 'Área del Círculo', level: '7°–8° Básico',
          lessonIds: ['geo-circulo'],
          topics: [
            { id:'geo_u10_t1', name:'Área del círculo: πr²', prerequisites:['geo_u9_t1'], generatorKey:'geo_circulo', lessonIds:['geo-circulo'] },
            { id:'geo_u10_t2', name:'Área del sector circular: (θ/360°)×πr²', prerequisites:['geo_u10_t1'], generatorKey:'geo_circulo' },
            { id:'geo_u10_t3', name:'Área de la corona circular (anillo)', prerequisites:['geo_u10_t1'], generatorKey:'geo_circulo' },
            { id:'geo_u10_t4', name:'Radio o diámetro desde el área', prerequisites:['geo_u10_t1'], generatorKey:'geo_circulo' },
            { id:'geo_u10_t5', name:'Problemas combinados de círculo y otras figuras', prerequisites:['geo_u10_t1','geo_u8_t1'], generatorKey:'geo_circulo' },
          ]
        },
        {
          id: 'geo_u11', name: 'Sólidos Geométricos', level: '7°–2° Medio',
          lessonIds: ['geo-solidos'],
          topics: [
            { id:'geo_u11_t1', name:'Clasificación: poliedros vs sólidos de revolución', prerequisites:['geo_u8_t1'], generatorKey:'geo_solidos', lessonIds:['geo-solidos'] },
            { id:'geo_u11_t2', name:'Fórmula de Euler: V−A+C=2', prerequisites:['geo_u11_t1'], generatorKey:'geo_solidos' },
            { id:'geo_u11_t3', name:'Área lateral y total del cubo', prerequisites:['geo_u11_t1'], generatorKey:'geo_solidos' },
            { id:'geo_u11_t4', name:'Área lateral y total del cilindro', prerequisites:['geo_u9_t2'], generatorKey:'geo_solidos' },
            { id:'geo_u11_t5', name:'Identificar y clasificar sólidos', prerequisites:['geo_u11_t1'], generatorKey:'geo_solidos' },
          ]
        },
        {
          id: 'geo_u12', name: 'Volumen de Sólidos', level: '8°–2° Medio',
          lessonIds: ['geo-volumen'],
          topics: [
            { id:'geo_u12_t1', name:'Volumen del prisma rectangular', prerequisites:['geo_u11_t3'], generatorKey:'geo_volumen', lessonIds:['geo-volumen'] },
            { id:'geo_u12_t2', name:'Volumen del cubo', prerequisites:['geo_u12_t1'], generatorKey:'geo_volumen' },
            { id:'geo_u12_t3', name:'Volumen del cilindro: πr²h', prerequisites:['geo_u10_t1'], generatorKey:'geo_volumen' },
            { id:'geo_u12_t4', name:'Volumen de pirámide y cono: (1/3)Bh', prerequisites:['geo_u12_t1'], generatorKey:'geo_volumen' },
            { id:'geo_u12_t5', name:'Volumen de la esfera: (4/3)πr³', prerequisites:['geo_u12_t3'], generatorKey:'geo_volumen' },
            { id:'geo_u12_t6', name:'Conversión de unidades cúbicas y litros', prerequisites:['geo_u12_t1'], generatorKey:'geo_volumen' },
          ]
        },
        {
          id: 'geo_u13', name: 'Geometría Analítica', level: '1°–2° Medio',
          lessonIds: ['geo-analitica'],
          topics: [
            { id:'geo_u13_t1', name:'El plano cartesiano: cuadrantes y coordenadas', prerequisites:[], generatorKey:'geo_analitica', lessonIds:['geo-analitica'] },
            { id:'geo_u13_t2', name:'Distancia entre dos puntos', prerequisites:['geo_u5_t2','geo_u13_t1'], generatorKey:'geo_analitica' },
            { id:'geo_u13_t3', name:'Punto medio de un segmento', prerequisites:['geo_u13_t2'], generatorKey:'geo_analitica' },
            { id:'geo_u13_t4', name:'Pendiente de una recta', prerequisites:['geo_u13_t1'], generatorKey:'geo_analitica' },
            { id:'geo_u13_t5', name:'Ecuación de la recta: y=mx+b', prerequisites:['geo_u13_t4'], generatorKey:'geo_analitica' },
            { id:'geo_u13_t6', name:'Rectas paralelas y perpendiculares (pendientes)', prerequisites:['geo_u13_t5'], generatorKey:'geo_analitica' },
          ]
        },
      ]
    },

    /* ══════════════════════════════════════════════════════════
       TRIGONOMETRÍA
    ══════════════════════════════════════════════════════════ */
    {
      id: 'trigonometria', name: 'Trigonometría', icon: '📡',
      color: '#EF4444', level: '2° Medio → Universitario',
      description: 'Razones trigonométricas, identidades, círculo unitario y aplicaciones.',
      units: [
        {
          id: 'trig_u1', name: 'Razones Trigonométricas', level: '2° Medio',
          lessonIds: ['trig-razones'],
          topics: [
            { id:'trig_u1_t1', name:'Seno, coseno y tangente (SOH-CAH-TOA)', prerequisites:[], generatorKey:'trig_razones', lessonIds:['trig-razones'] },
            { id:'trig_u1_t2', name:'Calcular razones desde el triángulo',    prerequisites:['trig_u1_t1'], generatorKey:'trig_razones' },
            { id:'trig_u1_t3', name:'Despejar cateto desde una razón',        prerequisites:['trig_u1_t1'], generatorKey:'trig_razones' },
            { id:'trig_u1_t4', name:'Despejar hipotenusa desde una razón',    prerequisites:['trig_u1_t1'], generatorKey:'trig_razones' },
            { id:'trig_u1_t5', name:'Triples pitagóricas exactas',            prerequisites:['trig_u1_t2'], generatorKey:'trig_razones' },
            { id:'trig_u1_t6', name:'Cotangente, secante y cosecante',        prerequisites:['trig_u1_t1'], generatorKey:'trig_razones' },
          ]
        },
        {
          id: 'trig_u2', name: 'Ángulos Notables', level: '2° Medio',
          lessonIds: ['trig-notables'],
          topics: [
            { id:'trig_u2_t1', name:'30°, 45°, 60°: valores exactos',        prerequisites:['trig_u1_t1'], generatorKey:'trig_notables', lessonIds:['trig-notables'] },
            { id:'trig_u2_t2', name:'Triángulo 30-60-90',                     prerequisites:['trig_u2_t1'], generatorKey:'trig_notables' },
            { id:'trig_u2_t3', name:'Triángulo 45-45-90',                     prerequisites:['trig_u2_t1'], generatorKey:'trig_notables' },
            { id:'trig_u2_t4', name:'Expresiones con ángulos notables',       prerequisites:['trig_u2_t1'], generatorKey:'trig_notables' },
            { id:'trig_u2_t5', name:'Lados desde ángulos notables',           prerequisites:['trig_u2_t2'], generatorKey:'trig_notables' },
            { id:'trig_u2_t6', name:'Aplicaciones de ángulos notables',       prerequisites:['trig_u2_t2','trig_u2_t3'], generatorKey:'trig_notables' },
          ]
        },
        {
          id: 'trig_u3', name: 'Círculo Unitario', level: '2° Medio – 3° Medio',
          lessonIds: ['trig-circulo'],
          topics: [
            { id:'trig_u3_t1', name:'Radianes y conversión grados ↔ radianes', prerequisites:['trig_u1_t1'], generatorKey:'trig_circulo', lessonIds:['trig-circulo'] },
            { id:'trig_u3_t2', name:'El círculo unitario: coordenadas (cos θ, sen θ)', prerequisites:['trig_u3_t1'], generatorKey:'trig_circulo' },
            { id:'trig_u3_t3', name:'Cuadrantes y signos (regla CAST)',       prerequisites:['trig_u3_t2'], generatorKey:'trig_circulo' },
            { id:'trig_u3_t4', name:'Ángulo de referencia',                   prerequisites:['trig_u3_t3'], generatorKey:'trig_circulo' },
            { id:'trig_u3_t5', name:'Coordenadas exactas en el círculo',      prerequisites:['trig_u3_t2'], generatorKey:'trig_circulo' },
            { id:'trig_u3_t6', name:'Reducción al primer cuadrante',          prerequisites:['trig_u3_t3'], generatorKey:'trig_circulo' },
          ]
        },
        {
          id: 'trig_u4', name: 'Funciones Trigonométricas', level: '3° Medio',
          lessonIds: ['trig-funciones'],
          topics: [
            { id:'trig_u4_t1', name:'Función seno: gráfica y propiedades',   prerequisites:['trig_u3_t2'], generatorKey:'trig_funciones', lessonIds:['trig-funciones'] },
            { id:'trig_u4_t2', name:'Función coseno: gráfica y propiedades', prerequisites:['trig_u3_t2'], generatorKey:'trig_funciones' },
            { id:'trig_u4_t3', name:'Signos por cuadrante',                  prerequisites:['trig_u3_t3'], generatorKey:'trig_funciones' },
            { id:'trig_u4_t4', name:'Valor de funciones en ángulos negativos', prerequisites:['trig_u4_t1'], generatorKey:'trig_funciones' },
            { id:'trig_u4_t5', name:'Período y amplitud',                    prerequisites:['trig_u4_t1'], generatorKey:'trig_funciones' },
            { id:'trig_u4_t6', name:'Valores en cualquier ángulo',           prerequisites:['trig_u3_t4'], generatorKey:'trig_funciones' },
          ]
        },
        {
          id: 'trig_u5', name: 'Identidades Trigonométricas', level: 'Universitario',
          lessonIds: ['trig-identidades'],
          topics: [
            { id:'trig_u5_t1', name:'Identidad pitagórica: sen²+cos²=1',    prerequisites:['trig_u3_t2'], generatorKey:'trig_identidades', lessonIds:['trig-identidades'] },
            { id:'trig_u5_t2', name:'Despejar cos desde sen y viceversa',    prerequisites:['trig_u5_t1'], generatorKey:'trig_identidades' },
            { id:'trig_u5_t3', name:'Identidad de la tangente',              prerequisites:['trig_u5_t1'], generatorKey:'trig_identidades' },
            { id:'trig_u5_t4', name:'Identidad de ángulo complementario',    prerequisites:['trig_u5_t1'], generatorKey:'trig_identidades' },
            { id:'trig_u5_t5', name:'Identidad de ángulo doble (seno)',      prerequisites:['trig_u5_t1'], generatorKey:'trig_identidades' },
            { id:'trig_u5_t6', name:'Identidad de ángulo doble (coseno)',    prerequisites:['trig_u5_t5'], generatorKey:'trig_identidades' },
          ]
        },
        {
          id: 'trig_u6', name: 'Suma y Diferencia de Ángulos', level: 'Universitario',
          lessonIds: ['trig-suma'],
          topics: [
            { id:'trig_u6_t1', name:'Sen(A+B) y Sen(A−B)',                  prerequisites:['trig_u5_t1'], generatorKey:'trig_suma', lessonIds:['trig-suma'] },
            { id:'trig_u6_t2', name:'Cos(A+B) y Cos(A−B)',                  prerequisites:['trig_u6_t1'], generatorKey:'trig_suma' },
            { id:'trig_u6_t3', name:'Seno de diferencia',                   prerequisites:['trig_u6_t1'], generatorKey:'trig_suma' },
            { id:'trig_u6_t4', name:'Coseno de diferencia',                 prerequisites:['trig_u6_t2'], generatorKey:'trig_suma' },
            { id:'trig_u6_t5', name:'Ángulo doble — seno desde suma',       prerequisites:['trig_u6_t1'], generatorKey:'trig_suma' },
            { id:'trig_u6_t6', name:'Ángulo doble — coseno desde suma',     prerequisites:['trig_u6_t2'], generatorKey:'trig_suma' },
          ]
        },
        {
          id: 'trig_u7', name: 'Ecuaciones Trigonométricas', level: 'Universitario',
          lessonIds: ['trig-ecuaciones'],
          topics: [
            { id:'trig_u7_t1', name:'Ecuaciones básicas con seno',          prerequisites:['trig_u3_t3'], generatorKey:'trig_ecuaciones', lessonIds:['trig-ecuaciones'] },
            { id:'trig_u7_t2', name:'Segunda solución en [0°, 360°]',       prerequisites:['trig_u7_t1'], generatorKey:'trig_ecuaciones' },
            { id:'trig_u7_t3', name:'Ecuaciones básicas con coseno',        prerequisites:['trig_u7_t1'], generatorKey:'trig_ecuaciones' },
            { id:'trig_u7_t4', name:'Ecuaciones básicas con tangente',      prerequisites:['trig_u7_t1'], generatorKey:'trig_ecuaciones' },
            { id:'trig_u7_t5', name:'Ecuaciones de ángulo doble',           prerequisites:['trig_u7_t1','trig_u6_t5'], generatorKey:'trig_ecuaciones' },
            { id:'trig_u7_t6', name:'Número de soluciones en un intervalo', prerequisites:['trig_u7_t2'], generatorKey:'trig_ecuaciones' },
          ]
        },
        {
          id: 'trig_u8', name: 'Aplicaciones: Ley de Senos y Cosenos', level: '2° Medio – Universitario',
          lessonIds: ['trig-aplicaciones'],
          topics: [
            { id:'trig_u8_t1', name:'Ángulos de elevación y depresión',     prerequisites:['trig_u1_t4'], generatorKey:'trig_aplicaciones', lessonIds:['trig-aplicaciones'] },
            { id:'trig_u8_t2', name:'Ley de senos — hallar lado',           prerequisites:['trig_u8_t1'], generatorKey:'trig_aplicaciones' },
            { id:'trig_u8_t3', name:'Ley de cosenos — hallar lado',         prerequisites:['trig_u8_t2'], generatorKey:'trig_aplicaciones' },
            { id:'trig_u8_t4', name:'Ley de cosenos — hallar ángulo',       prerequisites:['trig_u8_t3'], generatorKey:'trig_aplicaciones' },
            { id:'trig_u8_t5', name:'Área de triángulo con ½ab·sen(C)',     prerequisites:['trig_u8_t2'], generatorKey:'trig_aplicaciones' },
            { id:'trig_u8_t6', name:'Altura de objeto desde ángulo',        prerequisites:['trig_u8_t1'], generatorKey:'trig_aplicaciones' },
          ]
        },
      ]
    },

    /* ══════════════════════════════════════════════════════════
       FUNCIONES
    ══════════════════════════════════════════════════════════ */
    {
      id: 'funciones', name: 'Funciones', icon: '📈',
      color: '#06B6D4', level: '1° Medio → Universitario',
      description: 'Graficador interactivo, sliders y 100 ejercicios por temario.',
      units: [
        {
          id: 'func_u1', name: 'Función Lineal', level: '1° Medio',
          lessonIds: ['func-lineal'],
          topics: [
            { id:'func_u1_t1', name:'Proporcionalidad directa: f(x)=mx',    prerequisites:[], generatorKey:'func_lineal', lessonIds:['func-lineal'] },
            { id:'func_u1_t2', name:'Evaluar y construir tabla de valores',  prerequisites:['func_u1_t1'], generatorKey:'func_lineal' },
            { id:'func_u1_t3', name:'Pendiente desde dos puntos',            prerequisites:['func_u1_t1'], generatorKey:'func_lineal' },
            { id:'func_u1_t4', name:'Función creciente vs. decreciente',     prerequisites:['func_u1_t1'], generatorKey:'func_lineal' },
            { id:'func_u1_t5', name:'Razón de cambio constante',             prerequisites:['func_u1_t3'], generatorKey:'func_lineal' },
            { id:'func_u1_t6', name:'Modelo proporcional: problemas reales', prerequisites:['func_u1_t5'], generatorKey:'func_lineal' },
          ]
        },
        {
          id: 'func_u2', name: 'Función Afín', level: '1°–2° Medio',
          lessonIds: ['func-afin'],
          topics: [
            { id:'func_u2_t1', name:'Forma f(x)=mx+b: pendiente e intercepto', prerequisites:['func_u1_t1'], generatorKey:'func_afin', lessonIds:['func-afin'] },
            { id:'func_u2_t2', name:'Evaluar f(x) y construir tabla',         prerequisites:['func_u2_t1'], generatorKey:'func_afin' },
            { id:'func_u2_t3', name:'Cero de la función (raíz)',               prerequisites:['func_u2_t1'], generatorKey:'func_afin' },
            { id:'func_u2_t4', name:'Ecuación desde dos puntos',               prerequisites:['func_u2_t1'], generatorKey:'func_afin' },
            { id:'func_u2_t5', name:'Rectas paralelas y perpendiculares',      prerequisites:['func_u2_t1'], generatorKey:'func_afin' },
            { id:'func_u2_t6', name:'Modelamiento: costo, velocidad, temperatura', prerequisites:['func_u2_t4'], generatorKey:'func_afin' },
          ]
        },
        {
          id: 'func_u3', name: 'Función Cuadrática', level: '1°–2° Medio',
          lessonIds: ['func-cuadratica'],
          topics: [
            { id:'func_u3_t1', name:'Parábola: f(x)=ax²+bx+c',             prerequisites:['func_u2_t1'], generatorKey:'func_cuadratica', lessonIds:['func-cuadratica'] },
            { id:'func_u3_t2', name:'Vértice y eje de simetría',            prerequisites:['func_u3_t1'], generatorKey:'func_cuadratica' },
            { id:'func_u3_t3', name:'Discriminante y número de raíces',     prerequisites:['func_u3_t1'], generatorKey:'func_cuadratica' },
            { id:'func_u3_t4', name:'Hallar raíces reales',                 prerequisites:['func_u3_t3'], generatorKey:'func_cuadratica' },
            { id:'func_u3_t5', name:'Máximo y mínimo de la parábola',      prerequisites:['func_u3_t2'], generatorKey:'func_cuadratica' },
            { id:'func_u3_t6', name:'Modelamiento cuadrático',             prerequisites:['func_u3_t5'], generatorKey:'func_cuadratica' },
          ]
        },
        {
          id: 'func_u4', name: 'Función Exponencial', level: '2° Medio',
          lessonIds: ['func-exponencial'],
          topics: [
            { id:'func_u4_t1', name:'f(x)=a·bˣ: crecimiento y decaimiento', prerequisites:['func_u2_t1'], generatorKey:'func_exponencial', lessonIds:['func-exponencial'] },
            { id:'func_u4_t2', name:'Evaluar y construir tabla',             prerequisites:['func_u4_t1'], generatorKey:'func_exponencial' },
            { id:'func_u4_t3', name:'El número e y f(x)=eˣ',               prerequisites:['func_u4_t1'], generatorKey:'func_exponencial' },
            { id:'func_u4_t4', name:'Tiempo de duplicación / semivida',     prerequisites:['func_u4_t1'], generatorKey:'func_exponencial' },
            { id:'func_u4_t5', name:'Tasa de crecimiento porcentual',       prerequisites:['func_u4_t1'], generatorKey:'func_exponencial' },
            { id:'func_u4_t6', name:'Modelamiento: población, interés, decaimiento', prerequisites:['func_u4_t4'], generatorKey:'func_exponencial' },
          ]
        },
        {
          id: 'func_u5', name: 'Función Logarítmica', level: '2° Medio – Universitario',
          lessonIds: ['func-logaritmica'],
          topics: [
            { id:'func_u5_t1', name:'log_b(x): inversa de bˣ',             prerequisites:['func_u4_t1'], generatorKey:'func_logaritmica', lessonIds:['func-logaritmica'] },
            { id:'func_u5_t2', name:'Evaluar logaritmos: log₂, log₁₀, ln', prerequisites:['func_u5_t1'], generatorKey:'func_logaritmica' },
            { id:'func_u5_t3', name:'Propiedades: producto, cociente, potencia', prerequisites:['func_u5_t1'], generatorKey:'func_logaritmica' },
            { id:'func_u5_t4', name:'Cambio de base',                      prerequisites:['func_u5_t3'], generatorKey:'func_logaritmica' },
            { id:'func_u5_t5', name:'Ecuaciones logarítmicas',             prerequisites:['func_u5_t3'], generatorKey:'func_logaritmica' },
            { id:'func_u5_t6', name:'Dominio y gráfica',                   prerequisites:['func_u5_t1'], generatorKey:'func_logaritmica' },
          ]
        },
        {
          id: 'func_u6', name: 'Función Racional', level: 'Universitario',
          lessonIds: ['func-racional'],
          topics: [
            { id:'func_u6_t1', name:'f(x)=p(x)/q(x): dominio y evaluación', prerequisites:['func_u2_t1'], generatorKey:'func_racional', lessonIds:['func-racional'] },
            { id:'func_u6_t2', name:'Asíntota vertical',                    prerequisites:['func_u6_t1'], generatorKey:'func_racional' },
            { id:'func_u6_t3', name:'Asíntota horizontal',                  prerequisites:['func_u6_t1'], generatorKey:'func_racional' },
            { id:'func_u6_t4', name:'Ceros de la función racional',         prerequisites:['func_u6_t1'], generatorKey:'func_racional' },
            { id:'func_u6_t5', name:'Simplificación y discontinuidades removibles', prerequisites:['func_u6_t2'], generatorKey:'func_racional' },
            { id:'func_u6_t6', name:'Comportamiento para x→∞',             prerequisites:['func_u6_t3'], generatorKey:'func_racional' },
          ]
        },
      ]
    },

    /* ══════════════════════════════════════════════════════════
       ESTADÍSTICA
    ══════════════════════════════════════════════════════════ */
    {
      id: 'estadistica', name: 'Estadística', icon: '📊',
      color: '#EC4899', level: '5° Básico → Universitario',
      description: 'Analiza datos, calcula probabilidades y toma decisiones informadas.',
      units: [
        {
          id: 'est_u1', name: 'Estadística Descriptiva', level: '5°–7° Básico',
          lessonIds: ['est-descriptiva'],
          topics: [
            { id:'est_u1_t1', name:'Tipos de variables estadísticas',       prerequisites:[], generatorKey:'est_descriptiva', lessonIds:['est-descriptiva'] },
            { id:'est_u1_t2', name:'Frecuencia absoluta y relativa',        prerequisites:['est_u1_t1'], generatorKey:'est_descriptiva' },
            { id:'est_u1_t3', name:'Frecuencia acumulada',                  prerequisites:['est_u1_t2'], generatorKey:'est_descriptiva' },
            { id:'est_u1_t4', name:'Tablas de distribución de frecuencias', prerequisites:['est_u1_t2'], generatorKey:'est_descriptiva' },
            { id:'est_u1_t5', name:'Amplitud y marca de clase',             prerequisites:['est_u1_t4'], generatorKey:'est_descriptiva' },
            { id:'est_u1_t6', name:'Porcentajes desde tabla',               prerequisites:['est_u1_t2'], generatorKey:'est_descriptiva' },
          ]
        },
        {
          id: 'est_u2', name: 'Gráficos Estadísticos', level: '5°–8° Básico',
          lessonIds: ['est-graficos'],
          topics: [
            { id:'est_u2_t1', name:'Gráfico de barras: lectura e interpretación', prerequisites:['est_u1_t2'], generatorKey:'est_graficos', lessonIds:['est-graficos'] },
            { id:'est_u2_t2', name:'Gráfico circular: ángulos y porcentajes',     prerequisites:['est_u1_t2'], generatorKey:'est_graficos' },
            { id:'est_u2_t3', name:'Histograma: datos continuos agrupados',       prerequisites:['est_u1_t4'], generatorKey:'est_graficos' },
            { id:'est_u2_t4', name:'Comparación entre gráficos',                  prerequisites:['est_u2_t1','est_u2_t2'], generatorKey:'est_graficos' },
            { id:'est_u2_t5', name:'Polígono de frecuencias',                     prerequisites:['est_u2_t3'], generatorKey:'est_graficos' },
            { id:'est_u2_t6', name:'Elección del gráfico adecuado',               prerequisites:['est_u2_t4'], generatorKey:'est_graficos' },
          ]
        },
        {
          id: 'est_u3', name: 'Medidas de Tendencia Central', level: '7°–8° Básico',
          lessonIds: ['est-tendencia-central'],
          topics: [
            { id:'est_u3_t1', name:'Media aritmética',                   prerequisites:['est_u1_t2'], generatorKey:'est_tendencia', lessonIds:['est-tendencia-central'] },
            { id:'est_u3_t2', name:'Mediana con n impar y n par',        prerequisites:['est_u1_t2'], generatorKey:'est_tendencia' },
            { id:'est_u3_t3', name:'Moda y distribución bimodal',        prerequisites:['est_u1_t2'], generatorKey:'est_tendencia' },
            { id:'est_u3_t4', name:'Media ponderada',                    prerequisites:['est_u3_t1'], generatorKey:'est_tendencia' },
            { id:'est_u3_t5', name:'Media desde tabla de frecuencias',   prerequisites:['est_u1_t2','est_u3_t1'], generatorKey:'est_tendencia' },
            { id:'est_u3_t6', name:'Efecto de valores extremos',         prerequisites:['est_u3_t1','est_u3_t2'], generatorKey:'est_tendencia' },
          ]
        },
        {
          id: 'est_u4', name: 'Medidas de Dispersión', level: '1°–2° Medio',
          lessonIds: ['est-dispersion'],
          topics: [
            { id:'est_u4_t1', name:'Rango',                              prerequisites:['est_u3_t1'], generatorKey:'est_dispersion', lessonIds:['est-dispersion'] },
            { id:'est_u4_t2', name:'Varianza poblacional',               prerequisites:['est_u3_t1'], generatorKey:'est_dispersion' },
            { id:'est_u4_t3', name:'Desviación estándar',               prerequisites:['est_u4_t2'], generatorKey:'est_dispersion' },
            { id:'est_u4_t4', name:'Puntaje Z y estandarización',        prerequisites:['est_u4_t3'], generatorKey:'est_dispersion' },
            { id:'est_u4_t5', name:'Regla empírica 68-95-99.7',          prerequisites:['est_u4_t3'], generatorKey:'est_dispersion' },
            { id:'est_u4_t6', name:'Coeficiente de variación',           prerequisites:['est_u4_t3'], generatorKey:'est_dispersion' },
          ]
        },
        {
          id: 'est_u5', name: 'Cuartiles y Percentiles', level: '2° Medio',
          lessonIds: ['est-posicion'],
          topics: [
            { id:'est_u5_t1', name:'Cuartiles Q1, Q2 y Q3',             prerequisites:['est_u3_t2'], generatorKey:'est_posicion', lessonIds:['est-posicion'] },
            { id:'est_u5_t2', name:'Rango intercuartílico (RIC)',        prerequisites:['est_u5_t1'], generatorKey:'est_posicion' },
            { id:'est_u5_t3', name:'Diagrama de caja (boxplot)',         prerequisites:['est_u5_t1'], generatorKey:'est_posicion' },
            { id:'est_u5_t4', name:'Detección de valores atípicos',      prerequisites:['est_u5_t2'], generatorKey:'est_posicion' },
            { id:'est_u5_t5', name:'Percentiles: cálculo e interpretación', prerequisites:['est_u5_t1'], generatorKey:'est_posicion' },
            { id:'est_u5_t6', name:'Percentiles en la PAES',             prerequisites:['est_u5_t5'], generatorKey:'est_posicion' },
          ]
        },
        {
          id: 'est_u6', name: 'Probabilidad Simple', level: '8° Básico – 1° Medio',
          lessonIds: ['est-probabilidad'],
          topics: [
            { id:'est_u6_t1', name:'Experimento aleatorio y espacio muestral', prerequisites:[], generatorKey:'est_probabilidad', lessonIds:['est-probabilidad'] },
            { id:'est_u6_t2', name:'Regla de Laplace: probabilidad clásica',   prerequisites:['est_u6_t1'], generatorKey:'est_probabilidad' },
            { id:'est_u6_t3', name:'Complemento de un evento',                 prerequisites:['est_u6_t2'], generatorKey:'est_probabilidad' },
            { id:'est_u6_t4', name:'Probabilidad frecuentista (empírica)',      prerequisites:['est_u6_t2'], generatorKey:'est_probabilidad' },
            { id:'est_u6_t5', name:'Eventos seguros, imposibles y posibles',   prerequisites:['est_u6_t2'], generatorKey:'est_probabilidad' },
            { id:'est_u6_t6', name:'Aplicaciones: dados, monedas y bolas',     prerequisites:['est_u6_t2'], generatorKey:'est_probabilidad' },
          ]
        },
        {
          id: 'est_u7', name: 'Probabilidad Compuesta y Combinatoria', level: '2° Medio – Universitario',
          lessonIds: ['est-prob-compuesta'],
          topics: [
            { id:'est_u7_t1', name:'Unión de eventos: regla de la suma',       prerequisites:['est_u6_t2'], generatorKey:'est_prob_compuesta', lessonIds:['est-prob-compuesta'] },
            { id:'est_u7_t2', name:'Probabilidad condicional P(A|B)',           prerequisites:['est_u7_t1'], generatorKey:'est_prob_compuesta' },
            { id:'est_u7_t3', name:'Eventos independientes',                   prerequisites:['est_u7_t2'], generatorKey:'est_prob_compuesta' },
            { id:'est_u7_t4', name:'Principio fundamental del conteo',         prerequisites:['est_u6_t2'], generatorKey:'est_prob_compuesta' },
            { id:'est_u7_t5', name:'Permutaciones y factorial',                prerequisites:['est_u7_t4'], generatorKey:'est_prob_compuesta' },
            { id:'est_u7_t6', name:'Combinaciones C(n,r)',                     prerequisites:['est_u7_t5'], generatorKey:'est_prob_compuesta' },
          ]
        },
        {
          id: 'est_u8', name: 'Variables Aleatorias y Distribuciones', level: 'Universitario',
          lessonIds: ['est-variables-aleatorias'],
          topics: [
            { id:'est_u8_t1', name:'Variable aleatoria discreta y continua',   prerequisites:['est_u6_t2'], generatorKey:'est_variables', lessonIds:['est-variables-aleatorias'] },
            { id:'est_u8_t2', name:'Valor esperado E(X)',                       prerequisites:['est_u8_t1'], generatorKey:'est_variables' },
            { id:'est_u8_t3', name:'Distribución Binomial B(n,p)',              prerequisites:['est_u7_t3'], generatorKey:'est_variables' },
            { id:'est_u8_t4', name:'Media y desviación en la binomial',         prerequisites:['est_u8_t3'], generatorKey:'est_variables' },
            { id:'est_u8_t5', name:'Distribución Normal: curva campana',        prerequisites:['est_u4_t3'], generatorKey:'est_variables' },
            { id:'est_u8_t6', name:'Puntaje Z y distribución normal estándar', prerequisites:['est_u8_t5'], generatorKey:'est_variables' },
          ]
        },
      ]
    },

    /* ══════════════════════════════════════════════════════════
       CÁLCULO
    ══════════════════════════════════════════════════════════ */
    {
      id: 'calculo', name: 'Cálculo', icon: '∫',
      color: '#4F46E5', level: 'Universitario',
      description: 'Límites, derivadas e integrales con visualización de tangentes y sumas de Riemann.',
      units: [
        {
          id: 'calc_u1', name: 'Límites', level: 'Universitario',
          lessonIds: ['calc-limites'],
          topics: [
            { id:'calc_u1_t1', name:'Concepto intuitivo: acercarse a un punto', prerequisites:['func_u1_t1'], generatorKey:'calc_limites', lessonIds:['calc-limites'] },
            { id:'calc_u1_t2', name:'Sustitución directa en polinomios',     prerequisites:['calc_u1_t1'], generatorKey:'calc_limites' },
            { id:'calc_u1_t3', name:'Forma indeterminada 0/0: factorización', prerequisites:['calc_u1_t1'], generatorKey:'calc_limites' },
            { id:'calc_u1_t4', name:'Límites al infinito de funciones racionales', prerequisites:['calc_u1_t2'], generatorKey:'calc_limites' },
            { id:'calc_u1_t5', name:'Límites laterales',                     prerequisites:['calc_u1_t2'], generatorKey:'calc_limites' },
            { id:'calc_u1_t6', name:'Reglas de límites: suma y producto',    prerequisites:['calc_u1_t2'], generatorKey:'calc_limites' },
          ]
        },
        {
          id: 'calc_u2', name: 'Continuidad', level: 'Universitario',
          lessonIds: ['calc-continuidad'],
          topics: [
            { id:'calc_u2_t1', name:'Tres condiciones de continuidad',       prerequisites:['calc_u1_t2'], generatorKey:'calc_continuidad', lessonIds:['calc-continuidad'] },
            { id:'calc_u2_t2', name:'Continuidad de polinomios',             prerequisites:['calc_u2_t1'], generatorKey:'calc_continuidad' },
            { id:'calc_u2_t3', name:'Discontinuidades de funciones racionales', prerequisites:['calc_u2_t1'], generatorKey:'calc_continuidad' },
            { id:'calc_u2_t4', name:'Discontinuidad removible vs. esencial', prerequisites:['calc_u2_t3'], generatorKey:'calc_continuidad' },
            { id:'calc_u2_t5', name:'Extender por continuidad',              prerequisites:['calc_u2_t4'], generatorKey:'calc_continuidad' },
            { id:'calc_u2_t6', name:'Teorema del Valor Intermedio (TVI)',    prerequisites:['calc_u2_t1'], generatorKey:'calc_continuidad' },
          ]
        },
        {
          id: 'calc_u3', name: 'Derivadas', level: 'Universitario',
          lessonIds: ['calc-derivadas'],
          topics: [
            { id:'calc_u3_t1', name:'Regla de la potencia: d/dx[xⁿ]=nxⁿ⁻¹', prerequisites:['calc_u1_t1'], generatorKey:'calc_derivadas', lessonIds:['calc-derivadas'] },
            { id:'calc_u3_t2', name:'Derivada de constante = 0',              prerequisites:['calc_u3_t1'], generatorKey:'calc_derivadas' },
            { id:'calc_u3_t3', name:'Suma y diferencia de funciones',         prerequisites:['calc_u3_t1'], generatorKey:'calc_derivadas' },
            { id:'calc_u3_t4', name:'Derivar cuadráticas y cúbicas',          prerequisites:['calc_u3_t3'], generatorKey:'calc_derivadas' },
            { id:'calc_u3_t5', name:'Evaluar f\'(a): pendiente en un punto',   prerequisites:['calc_u3_t3'], generatorKey:'calc_derivadas' },
            { id:'calc_u3_t6', name:'Derivada de √x y 1/x',                  prerequisites:['calc_u3_t1'], generatorKey:'calc_derivadas' },
          ]
        },
        {
          id: 'calc_u4', name: 'Aplicaciones de Derivadas', level: 'Universitario',
          lessonIds: ['calc-aplicaciones-der'],
          topics: [
            { id:'calc_u4_t1', name:'Recta tangente en un punto',            prerequisites:['calc_u3_t5'], generatorKey:'calc_aplder', lessonIds:['calc-aplicaciones-der'] },
            { id:'calc_u4_t2', name:'Puntos críticos: f\'(x)=0',              prerequisites:['calc_u3_t3'], generatorKey:'calc_aplder' },
            { id:'calc_u4_t3', name:'Clasificar máximos y mínimos locales',  prerequisites:['calc_u4_t2'], generatorKey:'calc_aplder' },
            { id:'calc_u4_t4', name:'Intervalos de crecimiento y decrecimiento', prerequisites:['calc_u4_t2'], generatorKey:'calc_aplder' },
            { id:'calc_u4_t5', name:'Optimización: máximos con restricción', prerequisites:['calc_u4_t3'], generatorKey:'calc_aplder' },
            { id:'calc_u4_t6', name:'Velocidad e interpretación física',      prerequisites:['calc_u3_t5'], generatorKey:'calc_aplder' },
          ]
        },
        {
          id: 'calc_u5', name: 'Integrales', level: 'Universitario',
          lessonIds: ['calc-integrales'],
          topics: [
            { id:'calc_u5_t1', name:'Antiderivada: ∫xⁿdx = xⁿ⁺¹/(n+1)+C', prerequisites:['calc_u3_t1'], generatorKey:'calc_integrales', lessonIds:['calc-integrales'] },
            { id:'calc_u5_t2', name:'Integral de constante y suma',          prerequisites:['calc_u5_t1'], generatorKey:'calc_integrales' },
            { id:'calc_u5_t3', name:'Integrar polinomios completos',         prerequisites:['calc_u5_t2'], generatorKey:'calc_integrales' },
            { id:'calc_u5_t4', name:'Integral definida y Teorema Fundamental', prerequisites:['calc_u5_t1'], generatorKey:'calc_integrales' },
            { id:'calc_u5_t5', name:'Verificar primitiva por derivación',    prerequisites:['calc_u5_t1'], generatorKey:'calc_integrales' },
            { id:'calc_u5_t6', name:'Área bajo la curva (aplicación básica)', prerequisites:['calc_u5_t4'], generatorKey:'calc_integrales' },
          ]
        },
        {
          id: 'calc_u6', name: 'Aplicaciones de Integrales', level: 'Universitario',
          lessonIds: ['calc-aplicaciones-int'],
          topics: [
            { id:'calc_u6_t1', name:'Área bajo f(x) de a a b',              prerequisites:['calc_u5_t4'], generatorKey:'calc_aplint', lessonIds:['calc-aplicaciones-int'] },
            { id:'calc_u6_t2', name:'Área entre dos curvas',                 prerequisites:['calc_u6_t1'], generatorKey:'calc_aplint' },
            { id:'calc_u6_t3', name:'Valor promedio de una función',         prerequisites:['calc_u6_t1'], generatorKey:'calc_aplint' },
            { id:'calc_u6_t4', name:'Desplazamiento desde velocidad',        prerequisites:['calc_u6_t1'], generatorKey:'calc_aplint' },
            { id:'calc_u6_t5', name:'Distancia total recorrida',             prerequisites:['calc_u6_t4'], generatorKey:'calc_aplint' },
            { id:'calc_u6_t6', name:'Acumulación y cantidad total',          prerequisites:['calc_u6_t1'], generatorKey:'calc_aplint' },
          ]
        },
      ]
    },

    /* ══════════════════════════════════════════════════════════
       MATEMÁTICA FINANCIERA
    ══════════════════════════════════════════════════════════ */
    {
      id: 'financiera', name: 'Matemática Financiera', icon: '💰',
      color: '#16A34A', level: '2° Medio → Universitario',
      description: 'Porcentajes, interés, anualidades, créditos, inflación, inversiones y evaluación de proyectos con contexto chileno.',
      units: [
        {
          id: 'fin_u1', name: 'Porcentajes Financieros', level: '2° Medio',
          lessonIds: ['fin-porcentajes'],
          topics: [
            { id:'fin_u1_t1', name:'Porcentajes y descuentos simples',       prerequisites:['arit_u6_t3'], generatorKey:'fin_porcentajes' },
            { id:'fin_u1_t2', name:'Descuentos sucesivos',                   prerequisites:['fin_u1_t1'],  generatorKey:'fin_porcentajes' },
            { id:'fin_u1_t3', name:'Descuento equivalente',                  prerequisites:['fin_u1_t2'],  generatorKey:'fin_porcentajes' },
            { id:'fin_u1_t4', name:'Aumentos sucesivos y reajustes',         prerequisites:['fin_u1_t1'],  generatorKey:'fin_porcentajes' },
            { id:'fin_u1_t5', name:'Precio original (precio antes)',         prerequisites:['fin_u1_t1'],  generatorKey:'fin_porcentajes' },
            { id:'fin_u1_t6', name:'IVA 19% y precio con/sin IVA',          prerequisites:['fin_u1_t1'],  generatorKey:'fin_porcentajes' },
          ]
        },
        {
          id: 'fin_u2', name: 'Interés Simple', level: '2° Medio',
          lessonIds: ['fin-interes-simple'],
          topics: [
            { id:'fin_u2_t1', name:'Fórmula I = P·r·t',                    prerequisites:['fin_u1_t1'],  generatorKey:'fin_interes_simple' },
            { id:'fin_u2_t2', name:'Monto M = P(1+rt)',                     prerequisites:['fin_u2_t1'],  generatorKey:'fin_interes_simple' },
            { id:'fin_u2_t3', name:'Despejar capital, tasa o tiempo',       prerequisites:['fin_u2_t2'],  generatorKey:'fin_interes_simple' },
            { id:'fin_u2_t4', name:'Tasas periódicas (mensual/diaria)',     prerequisites:['fin_u2_t1'],  generatorKey:'fin_interes_simple' },
            { id:'fin_u2_t5', name:'Descuento comercial',                   prerequisites:['fin_u2_t2'],  generatorKey:'fin_interes_simple' },
            { id:'fin_u2_t6', name:'Regla de duplicación',                  prerequisites:['fin_u2_t2'],  generatorKey:'fin_interes_simple' },
          ]
        },
        {
          id: 'fin_u3', name: 'Interés Compuesto', level: '3° Medio – Universitario',
          lessonIds: ['fin-interes-compuesto'],
          topics: [
            { id:'fin_u3_t1', name:'Fórmula M = P(1+r)^n',                 prerequisites:['fin_u2_t1'],  generatorKey:'fin_interes_compuesto' },
            { id:'fin_u3_t2', name:'Valor presente VP',                     prerequisites:['fin_u3_t1'],  generatorKey:'fin_interes_compuesto' },
            { id:'fin_u3_t3', name:'Capitalización periódica',              prerequisites:['fin_u3_t1'],  generatorKey:'fin_interes_compuesto' },
            { id:'fin_u3_t4', name:'IS vs IC: diferencia práctica',        prerequisites:['fin_u3_t1'],  generatorKey:'fin_interes_compuesto' },
            { id:'fin_u3_t5', name:'Depósito a plazo (DAP)',               prerequisites:['fin_u3_t3'],  generatorKey:'fin_interes_compuesto' },
            { id:'fin_u3_t6', name:'Regla del 72',                         prerequisites:['fin_u3_t1'],  generatorKey:'fin_interes_compuesto' },
          ]
        },
        {
          id: 'fin_u4', name: 'Equivalencia Financiera', level: '4° Medio – Universitario',
          lessonIds: ['fin-equivalencia'],
          topics: [
            { id:'fin_u4_t1', name:'Tasa nominal y tasa efectiva',          prerequisites:['fin_u3_t1'],  generatorKey:'fin_equivalencia' },
            { id:'fin_u4_t2', name:'Conversión mensual ↔ anual',           prerequisites:['fin_u4_t1'],  generatorKey:'fin_equivalencia' },
            { id:'fin_u4_t3', name:'TEA y CAE',                             prerequisites:['fin_u4_t1'],  generatorKey:'fin_equivalencia' },
            { id:'fin_u4_t4', name:'Tasa real de Fisher',                   prerequisites:['fin_u4_t1'],  generatorKey:'fin_equivalencia' },
            { id:'fin_u4_t5', name:'Factor de descuento',                   prerequisites:['fin_u4_t2'],  generatorKey:'fin_equivalencia' },
            { id:'fin_u4_t6', name:'Comparar proyectos con distinto plazo', prerequisites:['fin_u4_t3'],  generatorKey:'fin_equivalencia' },
          ]
        },
        {
          id: 'fin_u5', name: 'Anualidades y Rentas', level: '4° Medio – Universitario',
          lessonIds: ['fin-anualidades'],
          topics: [
            { id:'fin_u5_t1', name:'Valor futuro de anualidad ordinaria',   prerequisites:['fin_u3_t1'],  generatorKey:'fin_anualidades' },
            { id:'fin_u5_t2', name:'Valor presente de anualidad ordinaria', prerequisites:['fin_u5_t1'],  generatorKey:'fin_anualidades' },
            { id:'fin_u5_t3', name:'Cuota dado VP (crédito)',               prerequisites:['fin_u5_t2'],  generatorKey:'fin_anualidades' },
            { id:'fin_u5_t4', name:'Cuota dado VF (ahorro)',                prerequisites:['fin_u5_t1'],  generatorKey:'fin_anualidades' },
            { id:'fin_u5_t5', name:'Anualidad debida (prepagada)',          prerequisites:['fin_u5_t2'],  generatorKey:'fin_anualidades' },
            { id:'fin_u5_t6', name:'Leasing y CAE universitario',           prerequisites:['fin_u5_t3'],  generatorKey:'fin_anualidades' },
          ]
        },
        {
          id: 'fin_u6', name: 'Amortización y Créditos', level: '4° Medio – Universitario',
          lessonIds: ['fin-amortizacion'],
          topics: [
            { id:'fin_u6_t1', name:'Cuota fija (sistema francés)',          prerequisites:['fin_u5_t3'],  generatorKey:'fin_amortizacion' },
            { id:'fin_u6_t2', name:'Saldo insoluto en cuota k',             prerequisites:['fin_u6_t1'],  generatorKey:'fin_amortizacion' },
            { id:'fin_u6_t3', name:'Interés y amortización en cuota k',    prerequisites:['fin_u6_t2'],  generatorKey:'fin_amortizacion' },
            { id:'fin_u6_t4', name:'Tabla de amortización completa',        prerequisites:['fin_u6_t3'],  generatorKey:'fin_amortizacion' },
            { id:'fin_u6_t5', name:'Crédito hipotecario en UF',            prerequisites:['fin_u6_t1'],  generatorKey:'fin_amortizacion' },
            { id:'fin_u6_t6', name:'Prepago y conveniencia',               prerequisites:['fin_u6_t2'],  generatorKey:'fin_amortizacion' },
          ]
        },
        {
          id: 'fin_u7', name: 'Inflación e Indicadores', level: '3° Medio – Universitario',
          lessonIds: ['fin-inflacion'],
          topics: [
            { id:'fin_u7_t1', name:'IPC y variación porcentual',            prerequisites:['fin_u1_t4'],  generatorKey:'fin_inflacion' },
            { id:'fin_u7_t2', name:'UF y reajuste',                         prerequisites:['fin_u7_t1'],  generatorKey:'fin_inflacion' },
            { id:'fin_u7_t3', name:'Poder adquisitivo',                     prerequisites:['fin_u7_t1'],  generatorKey:'fin_inflacion' },
            { id:'fin_u7_t4', name:'Salario real vs nominal',               prerequisites:['fin_u7_t1'],  generatorKey:'fin_inflacion' },
            { id:'fin_u7_t5', name:'Deuda en UF',                           prerequisites:['fin_u7_t2'],  generatorKey:'fin_inflacion' },
            { id:'fin_u7_t6', name:'Tasa real de interés (Fisher)',         prerequisites:['fin_u7_t1','fin_u4_t4'], generatorKey:'fin_inflacion' },
          ]
        },
        {
          id: 'fin_u8', name: 'Ahorro e Inversiones', level: '4° Medio – Universitario',
          lessonIds: ['fin-ahorro'],
          topics: [
            { id:'fin_u8_t1', name:'Depósito a plazo y rentabilidad',       prerequisites:['fin_u3_t5'],  generatorKey:'fin_ahorro' },
            { id:'fin_u8_t2', name:'Ahorro programado periódico',           prerequisites:['fin_u5_t1'],  generatorKey:'fin_ahorro' },
            { id:'fin_u8_t3', name:'Fondos mutuos y TER',                   prerequisites:['fin_u8_t1'],  generatorKey:'fin_ahorro' },
            { id:'fin_u8_t4', name:'AFP y previsión',                       prerequisites:['fin_u8_t2'],  generatorKey:'fin_ahorro' },
            { id:'fin_u8_t5', name:'ROI y período de recuperación',         prerequisites:['fin_u8_t1'],  generatorKey:'fin_ahorro' },
            { id:'fin_u8_t6', name:'Comparar alternativas de inversión',    prerequisites:['fin_u8_t3'],  generatorKey:'fin_ahorro' },
          ]
        },
        {
          id: 'fin_u9', name: 'Evaluación de Proyectos', level: 'Universitario',
          lessonIds: ['fin-proyectos'],
          topics: [
            { id:'fin_u9_t1', name:'Flujo de caja proyectado',              prerequisites:['fin_u3_t2'],  generatorKey:'fin_proyectos' },
            { id:'fin_u9_t2', name:'VAN (Valor Actual Neto)',               prerequisites:['fin_u9_t1'],  generatorKey:'fin_proyectos' },
            { id:'fin_u9_t3', name:'TIR (Tasa Interna de Retorno)',         prerequisites:['fin_u9_t2'],  generatorKey:'fin_proyectos' },
            { id:'fin_u9_t4', name:'Payback (período de recuperación)',     prerequisites:['fin_u9_t1'],  generatorKey:'fin_proyectos' },
            { id:'fin_u9_t5', name:'Índice de rentabilidad (IR)',           prerequisites:['fin_u9_t2'],  generatorKey:'fin_proyectos' },
            { id:'fin_u9_t6', name:'Análisis de sensibilidad',              prerequisites:['fin_u9_t3'],  generatorKey:'fin_proyectos' },
          ]
        },
        {
          id: 'fin_u10', name: 'Comparación de Alternativas', level: '4° Medio – Universitario',
          lessonIds: ['fin-comparacion'],
          topics: [
            { id:'fin_u10_t1', name:'Comprar vs arrendar',                  prerequisites:['fin_u6_t1'],  generatorKey:'fin_comparacion' },
            { id:'fin_u10_t2', name:'CAE: comparar créditos',               prerequisites:['fin_u4_t3'],  generatorKey:'fin_comparacion' },
            { id:'fin_u10_t3', name:'Contado vs cuotas',                    prerequisites:['fin_u5_t3'],  generatorKey:'fin_comparacion' },
            { id:'fin_u10_t4', name:'Leasing vs compra',                    prerequisites:['fin_u5_t6'],  generatorKey:'fin_comparacion' },
            { id:'fin_u10_t5', name:'Prepagar vs invertir',                 prerequisites:['fin_u6_t6'],  generatorKey:'fin_comparacion' },
            { id:'fin_u10_t6', name:'Cuotas "sin interés" y costo oculto', prerequisites:['fin_u10_t2'], generatorKey:'fin_comparacion' },
          ]
        },
      ]
    },

    /* ══════════════════════════════════════════════════════════
       PREUNIVERSITARIO PAES — MATEMÁTICA
    ══════════════════════════════════════════════════════════ */
    {
      id: 'paes', name: 'PAES Matemática', icon: '🎓',
      color: '#7C3AED', level: '4° Medio',
      description: 'Preparación PAES con banco de preguntas tipo examen real, teoría PAES enfocada y simulacros con puntaje estimado.',
      units: [
        /* ── EJE NÚMEROS (Etapa 1) ────────────────────────── */
        {
          id: 'paes_n_u1', name: 'Números y Operaciones', level: '3°–4° Medio',
          lessonIds: ['paes-numeros'],
          topics: [
            { id:'paes_n_u1_t1', name:'Conjuntos numéricos (ℕ, ℤ, ℚ, 𝕀)',   prerequisites:['arit_u1_t1'],             generatorKey:'paes_n_numeros' },
            { id:'paes_n_u1_t2', name:'Valor absoluto y orden',               prerequisites:['paes_n_u1_t1'],           generatorKey:'paes_n_numeros' },
            { id:'paes_n_u1_t3', name:'Operaciones con enteros',              prerequisites:['paes_n_u1_t1'],           generatorKey:'paes_n_numeros' },
            { id:'paes_n_u1_t4', name:'Orden de operaciones PAPOM',           prerequisites:['paes_n_u1_t3'],           generatorKey:'paes_n_numeros' },
            { id:'paes_n_u1_t5', name:'Problemas tipo PAES — Números',        prerequisites:['paes_n_u1_t3','paes_n_u1_t4'], generatorKey:'paes_n_numeros' },
          ]
        },
        {
          id: 'paes_n_u2', name: 'Fracciones', level: '3°–4° Medio',
          lessonIds: ['paes-fracciones'],
          topics: [
            { id:'paes_n_u2_t1', name:'Tipos de fracciones y simplificación', prerequisites:['paes_n_u1_t1'],           generatorKey:'paes_n_fracciones' },
            { id:'paes_n_u2_t2', name:'Suma y resta de fracciones',           prerequisites:['paes_n_u2_t1'],           generatorKey:'paes_n_fracciones' },
            { id:'paes_n_u2_t3', name:'Multiplicación y división',            prerequisites:['paes_n_u2_t1'],           generatorKey:'paes_n_fracciones' },
            { id:'paes_n_u2_t4', name:'Fracción de una cantidad',             prerequisites:['paes_n_u2_t2'],           generatorKey:'paes_n_fracciones' },
            { id:'paes_n_u2_t5', name:'Problemas tipo PAES — Fracciones',     prerequisites:['paes_n_u2_t3','paes_n_u2_t4'], generatorKey:'paes_n_fracciones' },
          ]
        },
        {
          id: 'paes_n_u3', name: 'Razones y Proporciones', level: '3°–4° Medio',
          lessonIds: ['paes-razones'],
          topics: [
            { id:'paes_n_u3_t1', name:'Razón y simplificación',              prerequisites:['paes_n_u2_t1'],           generatorKey:'paes_n_razones' },
            { id:'paes_n_u3_t2', name:'Proporción directa e inversa',         prerequisites:['paes_n_u3_t1'],           generatorKey:'paes_n_razones' },
            { id:'paes_n_u3_t3', name:'Reparto proporcional',                 prerequisites:['paes_n_u3_t2'],           generatorKey:'paes_n_razones' },
            { id:'paes_n_u3_t4', name:'Trabajo conjunto y escala',            prerequisites:['paes_n_u3_t2'],           generatorKey:'paes_n_razones' },
            { id:'paes_n_u3_t5', name:'Problemas tipo PAES — Proporciones',   prerequisites:['paes_n_u3_t3','paes_n_u3_t4'], generatorKey:'paes_n_razones' },
          ]
        },
        {
          id: 'paes_n_u4', name: 'Porcentajes', level: '3°–4° Medio',
          lessonIds: ['paes-porcentajes'],
          topics: [
            { id:'paes_n_u4_t1', name:'Porcentaje de una cantidad',          prerequisites:['paes_n_u3_t1'],           generatorKey:'paes_n_porcentajes' },
            { id:'paes_n_u4_t2', name:'Aumento y descuento porcentual',       prerequisites:['paes_n_u4_t1'],           generatorKey:'paes_n_porcentajes' },
            { id:'paes_n_u4_t3', name:'Variación y precio original',          prerequisites:['paes_n_u4_t2'],           generatorKey:'paes_n_porcentajes' },
            { id:'paes_n_u4_t4', name:'Porcentajes sucesivos e IVA',          prerequisites:['paes_n_u4_t2'],           generatorKey:'paes_n_porcentajes' },
            { id:'paes_n_u4_t5', name:'Problemas tipo PAES — Porcentajes',    prerequisites:['paes_n_u4_t3','paes_n_u4_t4'], generatorKey:'paes_n_porcentajes' },
          ]
        },
        {
          id: 'paes_n_u5', name: 'Potencias', level: '3°–4° Medio',
          lessonIds: ['paes-potencias'],
          topics: [
            { id:'paes_n_u5_t1', name:'Evaluación de potencias',             prerequisites:['paes_n_u1_t3'],           generatorKey:'paes_n_potencias' },
            { id:'paes_n_u5_t2', name:'Leyes de exponentes (producto/cociente)', prerequisites:['paes_n_u5_t1'],       generatorKey:'paes_n_potencias' },
            { id:'paes_n_u5_t3', name:'Potencia de potencia y exponentes especiales', prerequisites:['paes_n_u5_t2'],  generatorKey:'paes_n_potencias' },
            { id:'paes_n_u5_t4', name:'Exponentes negativos y fraccionarios', prerequisites:['paes_n_u5_t2'],           generatorKey:'paes_n_potencias' },
            { id:'paes_n_u5_t5', name:'Problemas tipo PAES — Potencias',      prerequisites:['paes_n_u5_t3','paes_n_u5_t4'], generatorKey:'paes_n_potencias' },
          ]
        },
        {
          id: 'paes_n_u6', name: 'Raíces y Radicales', level: '3°–4° Medio',
          lessonIds: ['paes-raices'],
          topics: [
            { id:'paes_n_u6_t1', name:'Raíz cuadrada y cúbica exactas',      prerequisites:['paes_n_u5_t1'],           generatorKey:'paes_n_raices' },
            { id:'paes_n_u6_t2', name:'Simplificación de raíces',            prerequisites:['paes_n_u6_t1'],           generatorKey:'paes_n_raices' },
            { id:'paes_n_u6_t3', name:'Operaciones con radicales',           prerequisites:['paes_n_u6_t2'],           generatorKey:'paes_n_raices' },
            { id:'paes_n_u6_t4', name:'Racionalización',                     prerequisites:['paes_n_u6_t2'],           generatorKey:'paes_n_raices' },
            { id:'paes_n_u6_t5', name:'Problemas tipo PAES — Raíces',        prerequisites:['paes_n_u6_t3','paes_n_u6_t4'], generatorKey:'paes_n_raices' },
          ]
        },
        /* ── ETAPA 2: ÁLGEBRA ── */
        {
          id: 'paes_a_u1', name: 'Álgebra Básica', level: '4° Medio',
          lessonIds: ['paes-algebra'],
          topics: [
            { id:'paes_a_u1_t1', name:'Expresiones algebraicas y valor numérico', prerequisites:['paes_n_u1_t5'], generatorKey:'paes_a_algebra' },
            { id:'paes_a_u1_t2', name:'Productos notables', prerequisites:['paes_a_u1_t1'], generatorKey:'paes_a_algebra' },
            { id:'paes_a_u1_t3', name:'Factor común y diferencia de cuadrados', prerequisites:['paes_a_u1_t1'], generatorKey:'paes_a_algebra' },
            { id:'paes_a_u1_t4', name:'Fracciones algebraicas', prerequisites:['paes_a_u1_t2'], generatorKey:'paes_a_algebra' },
            { id:'paes_a_u1_t5', name:'Problemas tipo PAES — Álgebra', prerequisites:['paes_a_u1_t3','paes_a_u1_t4'], generatorKey:'paes_a_algebra' },
          ]
        },
        {
          id: 'paes_a_u2', name: 'Ecuaciones', level: '4° Medio',
          lessonIds: ['paes-ecuaciones'],
          topics: [
            { id:'paes_a_u2_t1', name:'Ecuaciones lineales', prerequisites:['paes_a_u1_t1'], generatorKey:'paes_a_ecuaciones' },
            { id:'paes_a_u2_t2', name:'Ecuaciones con paréntesis y fracciones', prerequisites:['paes_a_u2_t1'], generatorKey:'paes_a_ecuaciones' },
            { id:'paes_a_u2_t3', name:'Ecuaciones cuadráticas — factorización', prerequisites:['paes_a_u1_t3'], generatorKey:'paes_a_ecuaciones' },
            { id:'paes_a_u2_t4', name:'Fórmula general y discriminante', prerequisites:['paes_a_u2_t3'], generatorKey:'paes_a_ecuaciones' },
            { id:'paes_a_u2_t5', name:'Problemas tipo PAES — Ecuaciones', prerequisites:['paes_a_u2_t3','paes_a_u2_t4'], generatorKey:'paes_a_ecuaciones' },
          ]
        },
        {
          id: 'paes_a_u3', name: 'Sistemas de Ecuaciones', level: '4° Medio',
          lessonIds: ['paes-sistemas'],
          topics: [
            { id:'paes_a_u3_t1', name:'Sistemas 2×2 — método de sustitución', prerequisites:['paes_a_u2_t1'], generatorKey:'paes_a_sistemas' },
            { id:'paes_a_u3_t2', name:'Sistemas 2×2 — método de eliminación', prerequisites:['paes_a_u3_t1'], generatorKey:'paes_a_sistemas' },
            { id:'paes_a_u3_t3', name:'Tipos de sistemas (determinado/incompatible)', prerequisites:['paes_a_u3_t1'], generatorKey:'paes_a_sistemas' },
            { id:'paes_a_u3_t4', name:'Problemas con sistemas', prerequisites:['paes_a_u3_t2'], generatorKey:'paes_a_sistemas' },
            { id:'paes_a_u3_t5', name:'Problemas tipo PAES — Sistemas', prerequisites:['paes_a_u3_t3','paes_a_u3_t4'], generatorKey:'paes_a_sistemas' },
          ]
        },
        {
          id: 'paes_a_u4', name: 'Inecuaciones', level: '4° Medio',
          lessonIds: ['paes-inecuaciones'],
          topics: [
            { id:'paes_a_u4_t1', name:'Inecuaciones lineales — regla del signo', prerequisites:['paes_a_u2_t1'], generatorKey:'paes_a_inecuaciones' },
            { id:'paes_a_u4_t2', name:'Inecuaciones dobles', prerequisites:['paes_a_u4_t1'], generatorKey:'paes_a_inecuaciones' },
            { id:'paes_a_u4_t3', name:'Inecuaciones cuadráticas', prerequisites:['paes_a_u2_t3','paes_a_u4_t1'], generatorKey:'paes_a_inecuaciones' },
            { id:'paes_a_u4_t4', name:'Valor absoluto en inecuaciones', prerequisites:['paes_a_u4_t1'], generatorKey:'paes_a_inecuaciones' },
            { id:'paes_a_u4_t5', name:'Problemas tipo PAES — Inecuaciones', prerequisites:['paes_a_u4_t2','paes_a_u4_t3'], generatorKey:'paes_a_inecuaciones' },
          ]
        },
        {
          id: 'paes_a_u5', name: 'Funciones Lineales', level: '4° Medio',
          lessonIds: ['paes-func-lineales'],
          topics: [
            { id:'paes_a_u5_t1', name:'Pendiente e interceptos', prerequisites:['paes_a_u2_t1'], generatorKey:'paes_a_func_lin' },
            { id:'paes_a_u5_t2', name:'Ecuación de la recta', prerequisites:['paes_a_u5_t1'], generatorKey:'paes_a_func_lin' },
            { id:'paes_a_u5_t3', name:'Rectas paralelas y perpendiculares', prerequisites:['paes_a_u5_t2'], generatorKey:'paes_a_func_lin' },
            { id:'paes_a_u5_t4', name:'Gráfica e intersección de rectas', prerequisites:['paes_a_u5_t2'], generatorKey:'paes_a_func_lin' },
            { id:'paes_a_u5_t5', name:'Problemas tipo PAES — Funciones lineales', prerequisites:['paes_a_u5_t3','paes_a_u5_t4'], generatorKey:'paes_a_func_lin' },
          ]
        },
        {
          id: 'paes_a_u6', name: 'Funciones Cuadráticas', level: '4° Medio',
          lessonIds: ['paes-func-cuadraticas'],
          topics: [
            { id:'paes_a_u6_t1', name:'Vértice y eje de simetría', prerequisites:['paes_a_u2_t3'], generatorKey:'paes_a_func_cuad' },
            { id:'paes_a_u6_t2', name:'Forma estándar y forma vértice', prerequisites:['paes_a_u6_t1'], generatorKey:'paes_a_func_cuad' },
            { id:'paes_a_u6_t3', name:'Raíces y discriminante', prerequisites:['paes_a_u2_t4','paes_a_u6_t1'], generatorKey:'paes_a_func_cuad' },
            { id:'paes_a_u6_t4', name:'Máximo y mínimo — aplicaciones', prerequisites:['paes_a_u6_t2'], generatorKey:'paes_a_func_cuad' },
            { id:'paes_a_u6_t5', name:'Problemas tipo PAES — Cuadráticas', prerequisites:['paes_a_u6_t3','paes_a_u6_t4'], generatorKey:'paes_a_func_cuad' },
          ]
        },
        /* ── ETAPAS FUTURAS (placeholders sin generatorKey) ── */
        /* ── ETAPA 3: GEOMETRÍA ── */
        {
          id: 'paes_g_u1', name: 'Geometría Básica', level: '4° Medio',
          lessonIds: ['paes-geo-basica'],
          topics: [
            { id:'paes_g_u1_t1', name:'Ángulos: complementarios, suplementarios y del triángulo', prerequisites:['paes_a_u1_t1'], generatorKey:'paes_g_basica' },
            { id:'paes_g_u1_t2', name:'Ángulos en polígonos regulares', prerequisites:['paes_g_u1_t1'], generatorKey:'paes_g_basica' },
            { id:'paes_g_u1_t3', name:'Rectas paralelas y transversal', prerequisites:['paes_g_u1_t1'], generatorKey:'paes_g_basica' },
            { id:'paes_g_u1_t4', name:'Teorema de Pitágoras', prerequisites:['paes_g_u1_t1'], generatorKey:'paes_g_basica' },
            { id:'paes_g_u1_t5', name:'Problemas tipo PAES — Geometría básica', prerequisites:['paes_g_u1_t3','paes_g_u1_t4'], generatorKey:'paes_g_basica' },
          ]
        },
        {
          id: 'paes_g_u2', name: 'Trigonometría', level: '4° Medio',
          lessonIds: ['paes-geo-trig'],
          topics: [
            { id:'paes_g_u2_t1', name:'Razones trigonométricas (sen, cos, tan)', prerequisites:['paes_g_u1_t4'], generatorKey:'paes_g_trig' },
            { id:'paes_g_u2_t2', name:'Ángulos notables: 30°, 45°, 60°', prerequisites:['paes_g_u2_t1'], generatorKey:'paes_g_trig' },
            { id:'paes_g_u2_t3', name:'Identidad fundamental sen²+cos²=1', prerequisites:['paes_g_u2_t1'], generatorKey:'paes_g_trig' },
            { id:'paes_g_u2_t4', name:'Triángulos especiales 30-60-90 y 45-45-90', prerequisites:['paes_g_u2_t2'], generatorKey:'paes_g_trig' },
            { id:'paes_g_u2_t5', name:'Problemas tipo PAES — Trigonometría', prerequisites:['paes_g_u2_t3','paes_g_u2_t4'], generatorKey:'paes_g_trig' },
          ]
        },
        {
          id: 'paes_g_u3', name: 'Áreas Planas', level: '4° Medio',
          lessonIds: ['paes-geo-areas'],
          topics: [
            { id:'paes_g_u3_t1', name:'Áreas de rectángulo, cuadrado y triángulo', prerequisites:['paes_g_u1_t1'], generatorKey:'paes_g_areas' },
            { id:'paes_g_u3_t2', name:'Área de círculo y sector circular', prerequisites:['paes_g_u3_t1'], generatorKey:'paes_g_areas' },
            { id:'paes_g_u3_t3', name:'Áreas de trapecio, paralelogramo y rombo', prerequisites:['paes_g_u3_t1'], generatorKey:'paes_g_areas' },
            { id:'paes_g_u3_t4', name:'Áreas combinadas y sombreadas', prerequisites:['paes_g_u3_t2','paes_g_u3_t3'], generatorKey:'paes_g_areas' },
            { id:'paes_g_u3_t5', name:'Problemas tipo PAES — Áreas', prerequisites:['paes_g_u3_t4'], generatorKey:'paes_g_areas' },
          ]
        },
        {
          id: 'paes_g_u4', name: 'Volúmenes y Superficies', level: '4° Medio',
          lessonIds: ['paes-geo-vol'],
          topics: [
            { id:'paes_g_u4_t1', name:'Volúmenes de prismas y paralelepípedos', prerequisites:['paes_g_u3_t1'], generatorKey:'paes_g_vol' },
            { id:'paes_g_u4_t2', name:'Volumen de cilindro, cono y pirámide', prerequisites:['paes_g_u4_t1'], generatorKey:'paes_g_vol' },
            { id:'paes_g_u4_t3', name:'Volumen de esfera y superficies totales', prerequisites:['paes_g_u4_t2'], generatorKey:'paes_g_vol' },
            { id:'paes_g_u4_t4', name:'Escala en sólidos (k, k², k³)', prerequisites:['paes_g_u4_t3'], generatorKey:'paes_g_vol' },
            { id:'paes_g_u4_t5', name:'Problemas tipo PAES — Volúmenes', prerequisites:['paes_g_u4_t3','paes_g_u4_t4'], generatorKey:'paes_g_vol' },
          ]
        },
        {
          id: 'paes_g_u5', name: 'Geometría Analítica', level: '4° Medio',
          lessonIds: ['paes-geo-anal'],
          topics: [
            { id:'paes_g_u5_t1', name:'Distancia y punto medio entre dos puntos', prerequisites:['paes_g_u1_t4'], generatorKey:'paes_g_anal' },
            { id:'paes_g_u5_t2', name:'Ecuación de la recta en el plano', prerequisites:['paes_a_u5_t2','paes_g_u5_t1'], generatorKey:'paes_g_anal' },
            { id:'paes_g_u5_t3', name:'Circunferencia: ecuación, centro y radio', prerequisites:['paes_g_u5_t1'], generatorKey:'paes_g_anal' },
            { id:'paes_g_u5_t4', name:'Posición de punto respecto a circunferencia', prerequisites:['paes_g_u5_t3'], generatorKey:'paes_g_anal' },
            { id:'paes_g_u5_t5', name:'Problemas tipo PAES — Geometría analítica', prerequisites:['paes_g_u5_t2','paes_g_u5_t4'], generatorKey:'paes_g_anal' },
          ]
        },
        {
          id: 'paes_g_u6', name: 'Semejanza y Proporciones', level: '4° Medio',
          lessonIds: ['paes-geo-sem'],
          topics: [
            { id:'paes_g_u6_t1', name:'Razón de semejanza — lados y perímetros', prerequisites:['paes_g_u1_t1'], generatorKey:'paes_g_sem' },
            { id:'paes_g_u6_t2', name:'Áreas y volúmenes en figuras semejantes', prerequisites:['paes_g_u6_t1'], generatorKey:'paes_g_sem' },
            { id:'paes_g_u6_t3', name:'Criterios de semejanza (AA, LAL, LLL)', prerequisites:['paes_g_u6_t1'], generatorKey:'paes_g_sem' },
            { id:'paes_g_u6_t4', name:'Altura en triángulo rectángulo y media geométrica', prerequisites:['paes_g_u6_t3'], generatorKey:'paes_g_sem' },
            { id:'paes_g_u6_t5', name:'Problemas tipo PAES — Semejanza', prerequisites:['paes_g_u6_t3','paes_g_u6_t4'], generatorKey:'paes_g_sem' },
          ]
        },
        {
          id: 'paes_f_u1', name: 'Funciones — Potencia, Raíz, Exponencial y Logarítmica', level: '4° Medio',
          lessonIds: ['paes-funciones'],
          topics: [
            { id:'paes_f_u1_t1', name:'Función potencia y paridad', prerequisites:['paes_a_u1_t1'], generatorKey:'paes_f_func', lessonIds:['paes-funciones'] },
            { id:'paes_f_u1_t2', name:'Función raíz y su dominio', prerequisites:['paes_n_u6_t1'], generatorKey:'paes_f_func' },
            { id:'paes_f_u1_t3', name:'Función exponencial — crecimiento y decrecimiento', prerequisites:['paes_a_u1_t1'], generatorKey:'paes_f_func' },
            { id:'paes_f_u1_t4', name:'Función logarítmica y su relación con la exponencial', prerequisites:['paes_f_u1_t3'], generatorKey:'paes_f_func' },
            { id:'paes_f_u1_t5', name:'Problemas tipo PAES — Funciones', prerequisites:['paes_f_u1_t2','paes_f_u1_t4'], generatorKey:'paes_f_func' },
          ]
        },
        {
          id: 'paes_e_u1', name: 'Conteo y Combinatoria', level: '4° Medio',
          lessonIds: ['paes-conteo'],
          topics: [
            { id:'paes_e_u1_t1', name:'Principio Multiplicativo', generatorKey:'paes_e_conteo', prerequisites:['paes_n_u1_t5'] },
            { id:'paes_e_u1_t2', name:'Factorial y Permutaciones', generatorKey:'paes_e_conteo', prerequisites:['paes_e_u1_t1'] },
            { id:'paes_e_u1_t3', name:'Combinaciones', generatorKey:'paes_e_conteo', prerequisites:['paes_e_u1_t2'] },
            { id:'paes_e_u1_t4', name:'Subconjuntos y Potencias de 2', generatorKey:'paes_e_conteo', prerequisites:['paes_e_u1_t3'] },
            { id:'paes_e_u1_t5', name:'Principio Aditivo y Mixto', generatorKey:'paes_e_conteo', prerequisites:['paes_e_u1_t4'] }
          ]
        },
        {
          id: 'paes_e_u2', name: 'Probabilidad', level: '4° Medio',
          lessonIds: ['paes-prob'],
          topics: [
            { id:'paes_e_u2_t1', name:'Probabilidad Clásica', generatorKey:'paes_e_prob', prerequisites:['paes_e_u1_t1'] },
            { id:'paes_e_u2_t2', name:'Complemento y Unión', generatorKey:'paes_e_prob', prerequisites:['paes_e_u2_t1'] },
            { id:'paes_e_u2_t3', name:'Eventos Independientes', generatorKey:'paes_e_prob', prerequisites:['paes_e_u2_t2'] },
            { id:'paes_e_u2_t4', name:'Probabilidad Condicional', generatorKey:'paes_e_prob', prerequisites:['paes_e_u2_t3'] },
            { id:'paes_e_u2_t5', name:'Probabilidad Geométrica', generatorKey:'paes_e_prob', prerequisites:['paes_e_u2_t4'] }
          ]
        },
        {
          id: 'paes_e_u3', name: 'Estadística Descriptiva', level: '4° Medio',
          lessonIds: ['paes-estat'],
          topics: [
            { id:'paes_e_u3_t1', name:'Media, Mediana, Moda', generatorKey:'paes_e_estat', prerequisites:['paes_e_u2_t1'] },
            { id:'paes_e_u3_t2', name:'Rango y Dispersión', generatorKey:'paes_e_estat', prerequisites:['paes_e_u3_t1'] },
            { id:'paes_e_u3_t3', name:'Media Ponderada y Datos Faltantes', generatorKey:'paes_e_estat', prerequisites:['paes_e_u3_t2'] },
            { id:'paes_e_u3_t4', name:'Cuartiles e IQR', generatorKey:'paes_e_estat', prerequisites:['paes_e_u3_t3'] },
            { id:'paes_e_u3_t5', name:'Transformaciones y Asimetría', generatorKey:'paes_e_estat', prerequisites:['paes_e_u3_t4'] }
          ]
        },
        {
          id: 'paes_e_u4', name: 'Gráficos Estadísticos', level: '4° Medio',
          lessonIds: ['paes-graficos'],
          topics: [
            { id:'paes_e_u4_t1', name:'Lectura de Gráficos de Barras', generatorKey:'paes_e_graficos', prerequisites:['paes_e_u3_t1'] },
            { id:'paes_e_u4_t2', name:'Gráfico Circular (Torta)', generatorKey:'paes_e_graficos', prerequisites:['paes_e_u4_t1'] },
            { id:'paes_e_u4_t3', name:'Gráficos de Línea y Tendencia', generatorKey:'paes_e_graficos', prerequisites:['paes_e_u4_t2'] },
            { id:'paes_e_u4_t4', name:'Histogramas y Clase Modal', generatorKey:'paes_e_graficos', prerequisites:['paes_e_u4_t3'] },
            { id:'paes_e_u4_t5', name:'Frecuencia Acumulada en Gráficos', generatorKey:'paes_e_graficos', prerequisites:['paes_e_u4_t4'] }
          ]
        },
        {
          id: 'paes_e_u5', name: 'Tablas de Frecuencia', level: '4° Medio',
          lessonIds: ['paes-tablas'],
          topics: [
            { id:'paes_e_u5_t1', name:'Frecuencia Absoluta y Relativa', generatorKey:'paes_e_tablas', prerequisites:['paes_e_u4_t1'] },
            { id:'paes_e_u5_t2', name:'Frecuencia Acumulada', generatorKey:'paes_e_tablas', prerequisites:['paes_e_u5_t1'] },
            { id:'paes_e_u5_t3', name:'Media y Mediana desde Tabla', generatorKey:'paes_e_tablas', prerequisites:['paes_e_u5_t2'] },
            { id:'paes_e_u5_t4', name:'Tabla de Doble Entrada', generatorKey:'paes_e_tablas', prerequisites:['paes_e_u5_t3'] },
            { id:'paes_e_u5_t5', name:'Probabilidad desde Tablas', generatorKey:'paes_e_tablas', prerequisites:['paes_e_u5_t4'] }
          ]
        },
      ]
    },
  ];

  // ── Build indexes for fast lookup ────────────────────────────
  const _subjectMap = {};
  const _unitMap    = {};
  const _topicMap   = {};

  _subjects.forEach(s => {
    _subjectMap[s.id] = s;
    (s.units || []).forEach(u => {
      u.subjectId = s.id;
      _unitMap[u.id] = u;
      (u.topics || []).forEach(t => {
        t.subjectId = s.id;
        t.unitId    = u.id;
        _topicMap[t.id] = t;
      });
    });
  });

  // ── Public API ────────────────────────────────────────────────
  function getSubject(id)          { return _subjectMap[id] || null; }
  function getUnit(id)             { return _unitMap[id]    || null; }
  function getTopic(id)            { return _topicMap[id]   || null; }
  function getAllSubjects()         { return _subjects; }
  function getAllTopics()           { return Object.values(_topicMap); }

  function getSubjectTopics(sid) {
    const s = getSubject(sid);
    if (!s) return [];
    return s.units.flatMap(u => u.topics);
  }

  function getUnitTopics(uid) {
    const u = getUnit(uid);
    return u ? u.topics : [];
  }

  function getTopicPrerequisites(tid) {
    const t = getTopic(tid);
    if (!t) return [];
    return (t.prerequisites || []).map(id => getTopic(id)).filter(Boolean);
  }

  function getNextTopics(tid) {
    return getAllTopics().filter(t => (t.prerequisites || []).includes(tid));
  }

  // Topics in the same unit that come after this one
  function getNextInUnit(tid) {
    const t = getTopic(tid);
    if (!t) return null;
    const u = getUnit(t.unitId);
    if (!u) return null;
    const idx = u.topics.findIndex(x => x.id === tid);
    return u.topics[idx + 1] || null;
  }

  // Find topic by lesson ID
  function getTopicByLessonId(lessonId) {
    return getAllTopics().find(t => (t.lessonIds || []).includes(lessonId)) || null;
  }

  return {
    getSubject, getUnit, getTopic, getAllSubjects, getAllTopics,
    getSubjectTopics, getUnitTopics,
    getTopicPrerequisites, getNextTopics, getNextInUnit,
    getTopicByLessonId
  };
})();
