/* ═══════════════════════════════════════════════════════
   CONTENT-FINANCIERA.JS — 10 lecciones completas
   Matemática Financiera con contexto chileno
   ═══════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var LESSONS=[

  /* ══════════════════════════════════════════
     1. PORCENTAJES FINANCIEROS
  ══════════════════════════════════════════ */
  {
    id:'fin-porcentajes', subject:'financiera',
    unit:'Porcentajes Financieros',
    title:'Porcentajes, Descuentos y Variaciones',
    icon:'%',
    concept:{
      what:'Los porcentajes son la herramienta más usada en finanzas cotidianas. Un descuento reduce el precio; un aumento lo sube. Los **descuentos sucesivos** se aplican uno sobre el resultado del anterior — NO se suman. Los **aumentos sucesivos** funcionan igual.',
      why:'Cada vez que ves una oferta, calculas IVA, negocias un sueldo o comparas precios, usas porcentajes financieros. Entenderlos te protege de la publicidad engañosa.',
      realLife:'En Chile, el IVA es del 19% sobre el precio neto. El Cyber Monday ofrece descuentos sucesivos. Las tiendas anuncian "50% + 20%" que NO es 70% de descuento.',
      commonErrors:[
        '"50% + 20% de descuento" NO equivale a 70%. Equivale a 1−(1−0.5)(1−0.2) = 60%.',
        'Al calcular el precio original desde el precio con descuento, NO sumes el descuento: P_orig = P_final/(1−d).',
        'El IVA en Chile es 19% sobre el NETO, no sobre el precio final: P_neto = P_bruto/1.19.'
      ]
    },
    examples:[
      {
        title:'Descuentos sucesivos en el Cyber Monday',
        steps:[
          'Un televisor de $400.000 tiene 30% de descuento y además 10% adicional.',
          'Primer descuento: $400.000 × (1 − 0.30) = $400.000 × 0.70 = $280.000',
          'Segundo descuento: $280.000 × (1 − 0.10) = $280.000 × 0.90 = $252.000',
          'Descuento equivalente: 1 − (0.70 × 0.90) = 1 − 0.63 = 37% (no 40%)',
          'Ahorro total: $400.000 − $252.000 = $148.000'
        ]
      },
      {
        title:'IVA en Chile (19%)',
        steps:[
          'Un servicio tiene precio neto de $100.000.',
          'IVA = $100.000 × 0.19 = $19.000',
          'Precio final (con IVA) = $100.000 + $19.000 = $119.000',
          'Si el precio con IVA es $119.000 → neto = $119.000 / 1.19 = $100.000',
          'Cuidado: nunca restes 19% al precio final para obtener el neto.'
        ]
      },
      {
        title:'Reajuste por IPC',
        steps:[
          'Un contrato de arriendo pactado en $500.000 se reajusta por IPC anual de 4.5%.',
          'Nuevo arriendo = $500.000 × (1 + 0.045) = $500.000 × 1.045 = $522.500',
          'En 5 años: $500.000 × 1.045⁵ = $500.000 × 1.2462 = $623.100',
          'Sin reajuste perderías poder adquisitivo equivalente a $123.100 en 5 años.',
          'El reajuste protege al arrendador de la inflación.'
        ]
      }
    ],
    visual:{type:'fin-porcentajes-vis'},
    discovery:{
      title:'¿Cuál descuento es mayor?',
      steps:[
        'Compara "30% + 20% de descuento" vs "45% de descuento directo" sobre $100.000.',
        '30%+20% sucesivo: $100.000 × 0.70 × 0.80 = $56.000 (descuento efectivo: 44%)',
        '45% directo: $100.000 × 0.55 = $55.000',
        '¿Cuál da menor precio final?',
        'Conclusión: el descuento directo del 45% es MAYOR que el sucesivo 30%+20%.'
      ]
    },
    exercises:{topic:'fin_porcentajes',generators:[]},
    advanced:{
      title:'Tasa de markup vs tasa de margen',
      content:'El **markup** (margen sobre costo) y el **margen** (sobre precio de venta) son distintos. Si el costo es $100 y el markup es 50%, el precio es $150 y el margen sobre precio es 50/150 = 33.3%. En Chile, el SII distingue entre precio neto, IVA y precio final. Los supermercados suelen publicitar precios sin IVA para productos de primera necesidad (exentos) y con IVA para otros.'
    }
  },

  /* ══════════════════════════════════════════
     2. INTERÉS SIMPLE
  ══════════════════════════════════════════ */
  {
    id:'fin-interes-simple', subject:'financiera',
    unit:'Interés Simple',
    title:'Interés Simple: I = P·r·t',
    icon:'💵',
    concept:{
      what:'El **interés simple** se calcula siempre sobre el capital inicial, sin importar el tiempo transcurrido. Fórmula: \\(I = P \\cdot r \\cdot t\\) donde P=capital, r=tasa (decimal) y t=tiempo en años. El monto final es \\(M = P(1 + rt)\\).',
      why:'El interés simple se usa en préstamos de corto plazo, pagarés comerciales y como base conceptual para entender el interés compuesto.',
      realLife:'Los créditos de consumo de corto plazo en Chile a veces usan interés simple. El descuento comercial de documentos (pagarés) es interés simple cobrado por anticipado.',
      commonErrors:[
        'Usar la tasa anual directamente para períodos mensuales sin convertir: si r=12% anual y t=6 meses, t=0.5 años.',
        'Confundir monto con interés: M = P + I, no M = I.',
        'Calcular tiempo en días sin dividir por 365: siempre que r sea anual, t en días = días/365.'
      ]
    },
    examples:[
      {
        title:'Crédito de consumo simple',
        steps:[
          'Capital: $2.000.000. Tasa: 10% anual. Plazo: 18 meses.',
          'Convertir tiempo: 18 meses = 1.5 años.',
          'Interés: I = $2.000.000 × 0.10 × 1.5 = $300.000',
          'Monto total: M = $2.000.000 + $300.000 = $2.300.000',
          'Cuota mensual simple: $2.300.000 / 18 = $127.778/mes'
        ]
      },
      {
        title:'Descuento comercial (banco descuenta un pagaré)',
        steps:[
          'Un pagaré con valor nominal $5.000.000 vence en 90 días.',
          'El banco lo descuenta al 12% anual (interés simple cobrado por anticipado).',
          'Descuento = $5.000.000 × 0.12 × (90/365) = $147.945',
          'Precio de descuento (lo que recibes hoy): $5.000.000 − $147.945 = $4.852.055',
          'Tasa de interés que realmente pagas: $147.945/$4.852.055 × (365/90) = 12.4%'
        ]
      },
      {
        title:'¿En cuánto tiempo se duplica? (Regla simple)',
        steps:[
          'Para duplicar con interés simple: 2P = P(1+rt) → 1 = rt → t = 1/r',
          'A 10% anual: t = 1/0.10 = 10 años',
          'A 15% anual: t = 1/0.15 = 6.67 años',
          'A 20% anual: t = 1/0.20 = 5 años',
          'Con interés compuesto es más rápido (Regla del 72: t ≈ 72/r%)'
        ]
      }
    ],
    visual:{type:'fin-interes-simple'},
    discovery:{
      title:'¿Cuánto te cuesta ese crédito?',
      steps:[
        'Supongamos un crédito de $1.000.000 a 12 meses.',
        'Con interés simple al 15% anual: I = $150.000, total = $1.150.000.',
        'Si pagas $1.150.000/12 = $95.833/mes.',
        'Pero al pagar cuotas mensuales estás devolviendo capital cada mes.',
        '¿El banco cobra interés sobre el saldo que debes o sobre el monto original? (Importante para el CAE)'
      ]
    },
    exercises:{topic:'fin_interes_simple',generators:[]},
    advanced:{
      title:'Tasas equivalentes en interés simple',
      content:'En interés simple, las tasas NO son equivalentes de la misma forma que en compuesto. Una tasa mensual del 1% NO equivale exactamente al 12% anual en interés simple (aunque sí son iguales numéricamente: 1%×12=12%). La diferencia está al capitalizar: 1% mensual compuesto equivale a 12.68% anual. Por eso, los créditos que anuncian "tasa mensual X%" con interés simple son más baratos que los que usan interés compuesto a la misma tasa mensual.'
    }
  },

  /* ══════════════════════════════════════════
     3. INTERÉS COMPUESTO Y CAPITALIZACIÓN
  ══════════════════════════════════════════ */
  {
    id:'fin-interes-compuesto', subject:'financiera',
    unit:'Interés Compuesto',
    title:'Interés Compuesto y Capitalización',
    icon:'📈',
    concept:{
      what:'El **interés compuesto** reinvierte los intereses generados: el interés del período siguiente se calcula sobre el capital MÁS los intereses anteriores. Fórmula: \\(M = P(1+r)^n\\). El **valor presente** es \\(VP = VF/(1+r)^n\\).',
      why:'Es la base de toda inversión y ahorro a largo plazo. Albert Einstein supuestamente lo llamó "la octava maravilla del mundo". Los fondos de pensiones (AFP), los depósitos a plazo y las inversiones usan interés compuesto.',
      realLife:'Un DAP (Depósito a Plazo) del Banco Estado al 5% anual con capitalización diaria. Las AFP chilenas invierten con interés compuesto. La deuda de la UF crece por inflación (forma de interés compuesto).',
      commonErrors:[
        'Calcular M = P + P×r×n en vez de M = P×(1+r)^n.',
        'Confundir tasa nominal con tasa efectiva: 12% nominal mensual ≠ 12% efectivo anual.',
        'No ajustar la tasa al período: si la tasa es anual y el período es mensual, r_mensual = (1+r_anual)^(1/12)−1.'
      ]
    },
    examples:[
      {
        title:'DAP (Depósito a Plazo) en banco chileno',
        steps:[
          'Depositas $5.000.000 al 5% anual, capitalización anual, por 3 años.',
          'M = $5.000.000 × (1.05)³ = $5.000.000 × 1.157625 = $5.788.125',
          'Vs interés simple: M = $5.000.000 × (1 + 0.05×3) = $5.750.000',
          'El interés compuesto genera $38.125 extra.',
          'Con capitalización mensual: r_m = (1.05)^(1/12)−1 ≈ 0.4074%. M = $5.000.000 × (1.004074)^36 ≈ $5.803.000'
        ]
      },
      {
        title:'Valor presente (¿cuánto invertir hoy?)',
        steps:[
          'Necesitas $10.000.000 en 5 años para un auto.',
          'Un fondo rinde 8% anual compuesto.',
          'VP = $10.000.000 / (1.08)⁵ = $10.000.000 / 1.46933 = $6.805.832',
          'Invirtiendo $6.805.832 hoy, tendrás $10.000.000 en 5 años.',
          'Interpretación: $10.000.000 en 5 años "vale" $6.805.832 hoy al 8%.'
        ]
      },
      {
        title:'Regla del 72 (¿cuándo se duplica?)',
        steps:[
          'Al 6% anual compuesto: ¿en cuántos años se duplica el capital?',
          'Regla del 72: n ≈ 72 / 6 = 12 años',
          'Valor exacto: n = ln(2)/ln(1.06) = 0.6931/0.0583 = 11.9 años ≈ 12 años ✓',
          'Al 12% anual: n ≈ 72/12 = 6 años.',
          'Al 1% mensual: n ≈ 72/1 = 72 meses = 6 años.'
        ]
      }
    ],
    visual:{type:'fin-interes-compuesto'},
    discovery:{
      title:'El poder del tiempo y la tasa',
      steps:[
        'Compara $1.000.000 al 6% anual durante 10, 20 y 30 años.',
        '10 años: $1.000.000 × 1.06^10 = $1.790.847',
        '20 años: $1.000.000 × 1.06^20 = $3.207.135',
        '30 años: $1.000.000 × 1.06^30 = $5.743.491',
        'Observa: el capital no crece linealmente sino exponencialmente. En los últimos 10 años (20→30) crece $2.536.356, ¡más que en los primeros 20 años!'
      ]
    },
    exercises:{topic:'fin_interes_compuesto',generators:[]},
    advanced:{
      title:'Número e y capitalización continua',
      content:'Cuando la capitalización se hace infinitas veces por período, se llega a la **capitalización continua**: \\(M = P \\cdot e^{rt}\\). El número \\(e \\approx 2.71828\\) surge de \\(\\lim_{n\\to\\infty}(1+1/n)^n\\). Ejemplo: $1.000.000 al 5% anual continuo por 10 años = $1.000.000 × e^{0.5} = $1.648.721. La TEA de capitalización continua: TEA = e^{r_{cont}} − 1. Aunque académicamente elegante, en Chile los bancos usan capitalización diaria como máximo (DAP 360 días).'
    }
  },

  /* ══════════════════════════════════════════
     4. EQUIVALENCIA FINANCIERA Y TASAS
  ══════════════════════════════════════════ */
  {
    id:'fin-equivalencia', subject:'financiera',
    unit:'Equivalencia Financiera',
    title:'Equivalencia de Tasas y CAE',
    icon:'🔄',
    concept:{
      what:'Dos tasas son **equivalentes** si producen el mismo monto final en el mismo período. La **TEA** (Tasa Efectiva Anual) es la medida estándar de comparación. El **CAE** (Costo Anual Equivalente) es la TEA del crédito incluyendo todos los costos (seguros, comisiones).',
      why:'En Chile, la CMF obliga a todos los bancos a publicar el CAE para que los clientes puedan comparar créditos en forma justa. Una tasa nominal baja puede esconder un CAE alto.',
      realLife:'Banco A: tasa 15% nominal anual, sin comisiones. Banco B: tasa 13% nominal pero con seguro de desgravamen. El CAE revela cuál es realmente más barato.',
      commonErrors:[
        'Sumar tasas para convertir: 1% mensual NO es 12% anual efectivo. Correcto: (1.01)^12−1=12.68%.',
        'Confundir TNA (Tasa Nominal Anual) con TEA (Tasa Efectiva Anual).',
        'Ignorar el CAE al comparar créditos: la cuota más baja puede tener el CAE más alto.'
      ]
    },
    examples:[
      {
        title:'Conversión tasa mensual → TEA',
        steps:[
          'Tasa mensual: 1.2%.',
          'TEA = (1 + 0.012)^12 − 1 = (1.012)^12 − 1',
          '= 1.15405 − 1 = 0.15405',
          '= 15.41% anual efectivo',
          'Si el banco anuncia solo "1.2% mensual", la TEA real es 15.41%, no 14.4% (que sería la TNA).'
        ]
      },
      {
        title:'El CAE en la práctica (CMF Chile)',
        steps:[
          'Crédito de $5.000.000 a 24 meses.',
          'Banco A: tasa 1% mensual, sin otros costos. CAE ≈ 12.68% anual.',
          'Banco B: tasa 0.9% mensual + seguro $5.000/mes. CAE ≈ 13.5% anual.',
          'Aunque la cuota de B parece más baja en intereses, el CAE de B es mayor.',
          'La CMF exige publicar el CAE en cualquier oferta de crédito en Chile.'
        ]
      },
      {
        title:'Tasa real vs nominal (Fisher)',
        steps:[
          'Banco ofrece DAP al 6% nominal anual. Inflación: 4.5%.',
          'Tasa real = (1 + 0.06) / (1 + 0.045) − 1',
          '= 1.06/1.045 − 1',
          '= 1.01435 − 1 = 1.44% real',
          'Tu dinero solo crece 1.44% en poder adquisitivo real, no 6%.'
        ]
      }
    ],
    visual:{type:'fin-equivalencia-vis'},
    discovery:{
      title:'¿Qué banco cobra más?',
      steps:[
        'Compara: Banco A anuncia "0.8% mensual". Banco B anuncia "9% nominal anual".',
        'Banco A TEA: (1.008)^12 − 1 = 10.03%.',
        'Banco B si capitaliza mensualmente: (1+0.09/12)^12 − 1 = 9.38%.',
        '¿Cuál cobra más en términos efectivos anuales?',
        'Lección: siempre convierte a TEA antes de comparar.'
      ]
    },
    exercises:{topic:'fin_equivalencia',generators:[]},
    advanced:{
      title:'WACC: Costo de Capital Promedio Ponderado',
      content:'El **WACC** (Weighted Average Cost of Capital) es la tasa mínima que debe rendir un proyecto para que valga la pena. Combina costo de deuda y costo de capital propio: \\(WACC = \\frac{D}{D+E}\\cdot r_d(1-T) + \\frac{E}{D+E}\\cdot r_e\\) donde D=deuda, E=patrimonio, T=tasa impuesto, r_d=costo deuda, r_e=costo capital propio. En Chile, la tasa de impuesto corporativo es 25-27%. El WACC se usa como tasa de descuento en el VAN.'
    }
  },

  /* ══════════════════════════════════════════
     5. ANUALIDADES Y RENTAS
  ══════════════════════════════════════════ */
  {
    id:'fin-anualidades', subject:'financiera',
    unit:'Anualidades y Rentas',
    title:'Anualidades, Rentas y Cuotas',
    icon:'📅',
    concept:{
      what:'Una **anualidad** es una serie de pagos iguales y periódicos. El **valor futuro** de una anualidad es cuánto acumulas al final. El **valor presente** es cuánto vale hoy esa serie. La cuota mensual de un crédito es el pago de una anualidad.',
      why:'Todo crédito de cuota fija (hipotecario, automotriz, de consumo) se calcula con la fórmula de anualidades. También los ahorros periódicos (AFP, ahorro programado).',
      realLife:'El crédito hipotecario del Banco BCI con cuota fija en UF es una anualidad. El ahorro programado del Banco Estado es un depósito de anualidad. Las cuotas sin interés también son una anualidad (con tasa 0%).',
      commonErrors:[
        'Confundir anualidad ordinaria (pago al FIN del período) con anualidad debida (pago al INICIO): la debida vale (1+r) veces más.',
        'Usar tasa anual con períodos mensuales: siempre convierte a tasa del período.',
        'Calcular n=12 cuando hay 12 pagos anuales por 3 años: n=36, no n=12.'
      ]
    },
    examples:[
      {
        title:'Cuota de un crédito automotriz',
        steps:[
          'Crédito de $8.000.000 al 12% anual (≈1% mensual) en 48 cuotas.',
          'r_mensual ≈ (1.12)^(1/12)−1 = 0.9489%',
          'Cuota = $8.000.000 × 0.009489 × (1.009489)^48 / [(1.009489)^48−1]',
          '= $8.000.000 × 0.009489 × 1.5731 / 0.5731',
          '= $8.000.000 × 0.026063 ≈ $208.507/mes',
          'Total pagado: $208.507 × 48 = $10.008.336. Intereses: $2.008.336.'
        ]
      },
      {
        title:'Ahorro programado para el pie de una casa',
        steps:[
          'Meta: $15.000.000 en 36 meses para el pie.',
          'Fondo al 0.5% mensual.',
          'Cuota mensual = VF × r / [(1+r)^n − 1]',
          '= $15.000.000 × 0.005 / [(1.005)^36 − 1]',
          '= $75.000 / 0.19668 ≈ $381.319/mes',
          'Total aportado: $381.319 × 36 = $13.727.484. Ganado por intereses: $1.272.516.'
        ]
      },
      {
        title:'Leasing de equipos industriales',
        steps:[
          'Equipo de $20.000.000. Pie 20% = $4.000.000. Financiado: $16.000.000.',
          'Tasa mensual 1.5%, 60 cuotas.',
          'Cuota = $16.000.000 × 0.015 × (1.015)^60 / [(1.015)^60−1]',
          '= $16.000.000 × 0.015 × 2.4432 / 1.4432 = $16.000.000 × 0.02539',
          '= $406.240/mes',
          'Al final del leasing, la empresa puede comprar el bien por un valor residual pactado.'
        ]
      }
    ],
    visual:{type:'fin-anualidades'},
    discovery:{
      title:'¿Cuánto más pagas por el crédito?',
      steps:[
        'Un televisor de $500.000: pagas al contado o en 12 cuotas de $48.000.',
        '12 × $48.000 = $576.000 en total.',
        '¿Cuánto "extra" pagas? $76.000.',
        '¿Cuál es la tasa implícita mensual? (VP=$500.000, PMT=$48.000, n=12)',
        'La tasa que resuelve esta ecuación es la TIR del crédito → aprox. 3.5% mensual = 51% anual.'
      ]
    },
    exercises:{topic:'fin_anualidades',generators:[]},
    advanced:{
      title:'Rentas perpetuas y su aplicación',
      content:'Una **renta perpetua** paga el mismo monto para siempre. Su valor presente es simplemente: \\(VP = PMT/r\\). Ejemplo: si un bono paga $100.000 al año por siempre y la tasa de descuento es 5%, vale $100.000/0.05 = $2.000.000. Las acciones que pagan dividendo constante se valoran con el modelo Gordon-Shapiro: \\(P = D/(r-g)\\) donde g es la tasa de crecimiento del dividendo. Una empresa que paga dividendo $500/acción creciendo 3% anual, con tasa de descuento 8%, vale: P = 500/(0.08−0.03) = $10.000/acción.'
    }
  },

  /* ══════════════════════════════════════════
     6. AMORTIZACIÓN Y CRÉDITOS
  ══════════════════════════════════════════ */
  {
    id:'fin-amortizacion', subject:'financiera',
    unit:'Amortización y Créditos',
    title:'Amortización, Créditos Hipotecarios y de Consumo',
    icon:'🏦',
    concept:{
      what:'Una **tabla de amortización** muestra cómo cada cuota se divide entre interés y abono a capital (amortización). En el **sistema francés** (el más usado en Chile), la cuota es constante pero la proporción interés/capital cambia: al inicio se paga más interés y menos capital; al final, al revés.',
      why:'Entender la amortización te permite calcular el saldo real de tu deuda, saber cuánto podrías prepagar, y comparar créditos por su costo real total.',
      realLife:'En Chile, el crédito hipotecario usa sistema francés en UF. El crédito de consumo del BancoChile usa sistema francés en pesos. El CAE (publicado por la CMF) incluye todos los costos.',
      commonErrors:[
        'Creer que después de la mitad de las cuotas has pagado la mitad del capital: en el sistema francés, a la mitad del plazo has pagado MENOS del 50% del capital.',
        'Calcular saldo = VP − cuotas_pagadas × (VP/n): el saldo baja lentamente al inicio.',
        'Olvidar el seguro de desgravamen en el crédito hipotecario chileno: aumenta la cuota real.'
      ]
    },
    examples:[
      {
        title:'Tabla de amortización de un crédito de consumo',
        steps:[
          'Crédito $3.000.000, tasa 1%/mes, 4 cuotas.',
          'Cuota = $3.000.000 × 0.01×1.01⁴/(1.01⁴−1) = $3.000.000 × 0.01×1.0406/0.0406 = $768.678',
          'Cuota 1: Interés=$30.000, Amort=$738.678, Saldo=$2.261.322',
          'Cuota 2: Interés=$22.613, Amort=$746.065, Saldo=$1.515.257',
          'Cuota 3: Interés=$15.153, Amort=$753.525, Saldo=$761.731',
          'Cuota 4: Interés=$7.617, Amort=$761.061, Saldo≈$0'
        ]
      },
      {
        title:'Crédito hipotecario en UF (Chile)',
        steps:[
          'Crédito: 2.000 UF. UF=$38.000. Tasa UF: 3.8% anual. Plazo: 240 meses.',
          'r_mensual_UF = (1.038)^(1/12)−1 ≈ 0.3113%',
          'Cuota_UF = 2000 × 0.003113 × (1.003113)^240 / [(1.003113)^240−1]',
          '≈ 2000 × 0.003113 × 2.0877 / 1.0877 = 11.89 UF/mes',
          'En pesos: 11.89 × $38.000 ≈ $451.820/mes (varía con UF)',
          'Total pagado: 11.89 UF × 240 = 2.853.6 UF. Intereses: 853.6 UF.'
        ]
      },
      {
        title:'¿Conviene prepagar? (Efecto del prepago)',
        steps:[
          'Crédito $10.000.000, 1%/mes, 60 cuotas = $222.444/mes.',
          'Después de 12 cuotas, saldo ≈ $8.651.000.',
          'Si prepagas los $8.651.000, te ahorras las 48 cuotas restantes = $222.444×48 = $10.677.312.',
          'Ahorro en intereses = $10.677.312 − $8.651.000 = $2.026.312',
          'Conclusión: prepagar en cuotas tempranas maximiza el ahorro en intereses.'
        ]
      }
    ],
    visual:{type:'fin-amortizacion'},
    discovery:{
      title:'El crédito hipotecario: ¿cuánto pagas realmente?',
      steps:[
        'Crédito hipotecario de $50.000.000 al 5% anual en UF, a 30 años (360 cuotas).',
        'Cuota mensual ≈ $268.400/mes.',
        'Total pagado: $268.400 × 360 = $96.624.000.',
        'Intereses totales pagados: $96.624.000 − $50.000.000 = $46.624.000.',
        '¡Pagaste casi el doble del capital! ¿Vale la pena tener casa propia? Considera que la propiedad también se valoriza.'
      ]
    },
    exercises:{topic:'fin_amortizacion',generators:[]},
    advanced:{
      title:'Sistemas de amortización: francés, alemán y americano',
      content:'**Sistema Francés** (el más usado): cuota constante, amortización creciente. **Sistema Alemán**: amortización constante, cuota decreciente. Paga menos interés total pero más al inicio. **Sistema Americano**: solo paga intereses cada período y devuelve todo el capital al final (usado en bonos). En Chile, los créditos hipotecarios y de consumo usan el sistema francés. Los bonos corporativos chilenos suelen usar el sistema americano.'
    }
  },

  /* ══════════════════════════════════════════
     7. INFLACIÓN, UF E IPC
  ══════════════════════════════════════════ */
  {
    id:'fin-inflacion', subject:'financiera',
    unit:'Inflación e Indicadores',
    title:'Inflación, UF e IPC en Chile',
    icon:'📊',
    concept:{
      what:'La **inflación** es el aumento generalizado de precios que reduce el poder adquisitivo del dinero. El **IPC** (Índice de Precios al Consumidor) lo mide el INE mensualmente. La **UF** (Unidad de Fomento) es una unidad indexada al IPC que se actualiza diariamente.',
      why:'En Chile, muchos contratos (arrendamiento, créditos hipotecarios, planes de salud) se expresan en UF para protegerse de la inflación. Entender la UF es esencial para cualquier contrato financiero en Chile.',
      realLife:'UF diaria publicada por el Banco Central de Chile (~$38.000 en 2024). Créditos hipotecarios en UF. Arriendos en UF. Multas en UTM. Contratos de trabajo con reajuste IPC.',
      commonErrors:[
        'Creer que si tu sueldo sube 5% pero la inflación es 6%, ganaste más: en realidad perdiste 1% de poder adquisitivo.',
        'Confundir UF con UTM (Unidad Tributaria Mensual): son distintas. UTM ≈ $65.000, no indexada al IPC.',
        'Calcular reajuste sumando IPC directamente: $1.000.000 × (1+4%) correcto; NO $1.000.000 + 4%.'
      ]
    },
    examples:[
      {
        title:'¿Cómo se calcula la UF?',
        steps:[
          'La UF se calcula a partir de la variación del IPC mensual.',
          'Si el IPC de octubre fue 0.4%, la UF de noviembre se reajusta diariamente.',
          'UF_nueva = UF_anterior × (1 + IPC_mensual)',
          'Ejemplo: UF el 1 de noviembre = $37.500 × (1.004) = $37.650',
          'La UF sube todos los días del mes en forma proporcional al IPC mensual.'
        ]
      },
      {
        title:'Crédito hipotecario en UF: efecto de la inflación',
        steps:[
          'Deuda inicial: 2.000 UF. UF hoy: $38.000 = $76.000.000.',
          'Si la inflación sube 5%, la UF sube a $39.900.',
          'Tu deuda en pesos sube: 2.000 UF × $39.900 = $79.800.000.',
          '¡Tu deuda en pesos aumentó en $3.800.000 sin hacer nada!',
          'Por eso los créditos en UF son de "menor cuota" pero con riesgo de inflación.'
        ]
      },
      {
        title:'Poder adquisitivo en el tiempo',
        steps:[
          'Sueldo de $800.000 en 2020. Inflación acumulada 2020-2025: 30%.',
          'Para mantener el mismo poder adquisitivo en 2025:',
          'Sueldo necesario = $800.000 × 1.30 = $1.040.000',
          'Si tu sueldo actual es $950.000, tu poder adquisitivo bajó:',
          'Pérdida real = $950.000/$1.040.000 − 1 = −8.65%'
        ]
      }
    ],
    visual:{type:'fin-inflacion'},
    discovery:{
      title:'¿Cuánto vale un millón de pesos en 20 años?',
      steps:[
        'Supón una inflación promedio del 4% anual en Chile.',
        'En 20 años, $1.000.000 valdrá en poder adquisitivo:',
        '$1.000.000 / (1.04)^20 = $1.000.000 / 2.191 = $456.387 de hoy.',
        'Es decir, un millón de pesos tendrá la mitad del poder adquisitivo actual.',
        '¿Qué harías para protegerte de la inflación? (Inversiones, UF, activos reales)'
      ]
    },
    exercises:{topic:'fin_inflacion',generators:[]},
    advanced:{
      title:'Teoría cuantitativa del dinero y política monetaria',
      content:'La ecuación de Fisher relaciona inflación con tasas: \\(r_{nominal} = r_{real} + \\pi\\) (aproximación). Más exacto: \\((1+r_n) = (1+r_r)(1+\\pi)\\). El **Banco Central de Chile** fija la Tasa de Política Monetaria (TPM) para controlar la inflación. Cuando la inflación sube, el BC sube la TPM → suben los créditos hipotecarios → baja el consumo → baja la inflación. En 2022, Chile tuvo inflación récord de ~14%; el BC subió la TPM hasta 11.25%. Entender este mecanismo es clave para anticipar cómo cambiarán las cuotas hipotecarias.'
    }
  },

  /* ══════════════════════════════════════════
     8. AHORRO E INVERSIONES
  ══════════════════════════════════════════ */
  {
    id:'fin-ahorro', subject:'financiera',
    unit:'Ahorro e Inversiones',
    title:'Ahorro, Depósitos, Fondos y Rentabilidad',
    icon:'💰',
    concept:{
      what:'**Ahorrar** es postergar consumo presente para consumo futuro. **Invertir** es poner el dinero a trabajar para que genere rendimiento. La **rentabilidad** mide cuánto ganaste respecto a lo invertido. Las principales opciones en Chile: DAP, fondos mutuos, AFP, APV, acciones y bienes raíces.',
      why:'Sin ahorro e inversión, el dinero pierde valor por la inflación. El ahorro programado con interés compuesto puede transformar pequeñas cuotas mensuales en fortunas a largo plazo.',
      realLife:'AFP A/B/C/D/E en Chile: multifondos según riesgo. Fondos mutuos del Banco Santander. DAP del Banco Estado. APV (Ahorro Previsional Voluntario) con beneficio tributario del SII.',
      commonErrors:[
        'Comparar rendimientos sin ajustar por inflación: un DAP al 5% con inflación del 6% es una pérdida real.',
        'No considerar impuestos: las ganancias de fondos mutuos en Chile pagan impuesto (salvo ciertos APV).',
        'Comparar un fondo de alto riesgo (acciones) con un DAP sin considerar el riesgo diferente.'
      ]
    },
    examples:[
      {
        title:'AFP: el poder del tiempo',
        steps:[
          'Trabajador que cotiza $100.000/mes en AFP desde los 25 hasta los 65 años (480 meses).',
          'Rendimiento histórico AFP en Chile: ~5% anual ≈ 0.407% mensual.',
          'VF = $100.000 × [(1.00407)^480 − 1] / 0.00407',
          '= $100.000 × 6.498 / 0.00407 = $100.000 × 1.597 millones... ≈ $159.700.000',
          'Total aportado: $100.000 × 480 = $48.000.000. Ganado por interés: $111.700.000.'
        ]
      },
      {
        title:'DAP vs Fondo Mutuo vs Acción',
        steps:[
          '$5.000.000 invertidos por 5 años:',
          'DAP Banco Estado 5% anual: M = $5.000.000 × 1.05⁵ = $6.381.408',
          'Fondo Mutuo moderado 8% anual: M = $5.000.000 × 1.08⁵ = $7.346.640',
          'Acciones 12% anual: M = $5.000.000 × 1.12⁵ = $8.811.708',
          'Mayor rendimiento = mayor riesgo. El DAP es garantizado; las acciones pueden bajar.'
        ]
      },
      {
        title:'APV (Ahorro Previsional Voluntario)',
        steps:[
          'El APV tiene beneficio tributario en Chile: Régimen A (15% de subsidio) o B (descuento de base imponible).',
          'Con Régimen A: por cada $1.000.000 ahorrado, el Estado aporta $150.000 adicionales.',
          'Ahorra $500.000/mes en APV durante 20 años al 5% anual.',
          'VF propio = anualidad de $500.000/mes por 240 meses al 0.407%/mes',
          '+ 15% del Estado sobre cada aporte.',
          'El APV es el instrumento más eficiente de ahorro a largo plazo en Chile.'
        ]
      }
    ],
    visual:{type:'fin-ahorro'},
    discovery:{
      title:'¿Cuánto necesitas ahorrar para jubilarte con $1.000.000/mes?',
      steps:[
        'Quieres una renta de $1.000.000/mes de por vida desde los 65 años.',
        'Esperanza de vida: 85 años = 20 años = 240 meses de retiro.',
        'Tasa de retiro: 0.4% mensual (DAP conservador).',
        'Capital necesario al jubilarte = $1.000.000 × [1−(1.004)^(-240)]/0.004 ≈ $1.000.000 × 149.8 ≈ $149.800.000',
        '¿Cuánto debes ahorrar desde los 30 años (35 años = 420 meses) al 0.5%/mes para llegar a $149.800.000?'
      ]
    },
    exercises:{topic:'fin_ahorro',generators:[]},
    advanced:{
      title:'Diversificación y frontera eficiente de Markowitz',
      content:'Harry Markowitz (Premio Nobel 1990) demostró que combinar activos con distintas correlaciones REDUCE el riesgo sin sacrificar rentabilidad esperada. La **frontera eficiente** muestra las carteras con máxima rentabilidad para cada nivel de riesgo. En Chile, las AFP implementan esto con los multifondos A-E: el Fondo A (renta variable, mayor riesgo/rentabilidad) vs el Fondo E (renta fija, menor riesgo/rentabilidad). Un joven de 25 años debería estar en Fondo A; alguien de 55 en Fondo D o E.'
    }
  },

  /* ══════════════════════════════════════════
     9. VAN, TIR Y EVALUACIÓN DE PROYECTOS
  ══════════════════════════════════════════ */
  {
    id:'fin-proyectos', subject:'financiera',
    unit:'Evaluación de Proyectos',
    title:'VAN, TIR y Flujo de Caja',
    icon:'📋',
    concept:{
      what:'El **VAN** (Valor Actual Neto) descuenta todos los flujos de caja del proyecto a la tasa de costo de capital. Si VAN>0, el proyecto crea valor. La **TIR** es la tasa que hace VAN=0: si TIR > costo de capital, el proyecto es rentable. El **payback** es el tiempo para recuperar la inversión.',
      why:'En Chile, la evaluación de proyectos es obligatoria para el sector público (MIDESO-SNI) y fundamental para cualquier empresa privada. La minería, energía y retail usan VAN y TIR para decidir inversiones de millones de dólares.',
      realLife:'El Proyecto Minero Quebrada Blanca Fase 2 (Teck Resources, Chile) fue evaluado con VAN a tasa 10% y TIR esperada de 18%. El Metro de Santiago evalúa cada extensión con VAN social.',
      commonErrors:[
        'Olvidar incluir la inversión inicial como flujo negativo en t=0.',
        'Comparar proyectos solo por TIR sin considerar la magnitud: TIR 50% en $100 de inversión vs TIR 20% en $1.000.000 — el segundo crea más valor absoluto.',
        'Usar el payback como único criterio: ignora flujos después del período de recupero y el valor del dinero en el tiempo.'
      ]
    },
    examples:[
      {
        title:'Evaluación de un proyecto de panadería',
        steps:[
          'Inversión inicial: $10.000.000. Flujos anuales: Año 1: $3.000.000, Año 2: $4.000.000, Año 3: $5.000.000.',
          'Tasa de descuento: 10% anual.',
          'VAN = −$10M + $3M/1.10 + $4M/1.10² + $5M/1.10³',
          '= −$10M + $2.727.273 + $3.305.785 + $3.756.574',
          '= −$10M + $9.789.632 = −$210.368',
          'VAN < 0 → No conviene. La panadería no supera el 10% mínimo requerido.'
        ]
      },
      {
        title:'TIR de un proyecto de energía solar',
        steps:[
          'Inversión: $20.000.000. Flujos anuales: $5.000.000 por 6 años.',
          'VP de anualidad al 10%: $5M × [1−(1.10)^(-6)]/0.10 = $5M × 4.3553 = $21.776.500',
          'VAN al 10% = −$20M + $21.776.500 = +$1.776.500 > 0 ✓',
          'TIR: es la tasa r donde VAN=0. Por iteración: r ≈ 12.98%.',
          'Como TIR (13%) > tasa de descuento (10%), el proyecto se aprueba.'
        ]
      },
      {
        title:'Período de recupero (Payback)',
        steps:[
          'Inversión: $30.000.000. Flujos: Año 1: $8M, Año 2: $10M, Año 3: $12M, Año 4: $14M.',
          'Acumulado: Año 1: $8M, Año 2: $18M, Año 3: $30M → ¡se recupera en el Año 3!',
          'Payback = 3 años exactos.',
          'Payback descontado (con tasa 10%): VP_1=$7.27M, VP_2=$8.26M, VP_3=$9.01M, VP_4=$9.56M.',
          'Acum VP: 7.27, 15.53, 24.54, 34.10M → Payback descontado = entre 3 y 4 años.'
        ]
      }
    ],
    visual:{type:'fin-van-tir'},
    discovery:{
      title:'¿Conviene poner una cafetería en la escuela?',
      steps:[
        'Inversión: $2.000.000. Ventas esperadas: $200.000/mes. Costos: $100.000/mes.',
        'Flujo mensual neto: $100.000/mes durante 24 meses.',
        'VP de la anualidad al 1%/mes: $100.000 × [1−(1.01)^(-24)]/0.01 = $100.000 × 21.24 = $2.124.000.',
        'VAN = −$2.000.000 + $2.124.000 = +$124.000 > 0. ¡Conviene!',
        'TIR ≈ 1.9% mensual ≈ 25% anual. ¿Es suficiente rentabilidad para el riesgo?'
      ]
    },
    exercises:{topic:'fin_proyectos',generators:[]},
    advanced:{
      title:'VAN incremental y análisis de sensibilidad',
      content:'Al comparar dos proyectos mutuamente excluyentes, el criterio correcto es el **VAN incremental**: analizar el proyecto adicional (B−A) y verificar si su VAN incremental es positivo. El **análisis de sensibilidad** pregunta: "¿cuánto debe cambiar la variable X para que el VAN sea 0?" Las variables clave en Chile: tipo de cambio (para exportadores), precio del cobre (minería), precio del petróleo (transporte). El **Punto de Equilibrio Financiero** es el flujo anual mínimo que hace VAN=0: FC_min = I₀ × r/[1−(1+r)^(-n)].'
    }
  },

  /* ══════════════════════════════════════════
     10. COMPARACIÓN DE ALTERNATIVAS
  ══════════════════════════════════════════ */
  {
    id:'fin-comparacion', subject:'financiera',
    unit:'Comparación de Alternativas',
    title:'Comparación Financiera: ¿Qué conviene más?',
    icon:'⚖️',
    concept:{
      what:'Comparar alternativas financieras requiere llevarlas a un mismo punto en el tiempo para comparar en términos equivalentes. La regla: siempre compara los **valores presentes** o los **costos totales** al mismo instante, usando la misma tasa de descuento.',
      why:'Decisiones cotidianas: ¿comprar o arrendar? ¿crédito bancario o automotriz? ¿pagar al contado o en cuotas? ¿prepagar la deuda o invertir los ahorros? Estas decisiones implican miles de pesos de diferencia.',
      realLife:'La CMF publica el CAE de todos los créditos de consumo en Chile para que puedas comparar. El Sernac te protege de publicidad engañosa en cuotas.',
      commonErrors:[
        'Comparar cuotas de distintos plazos sin calcular el total: $100.000/mes por 48 meses puede costar más que $130.000/mes por 36 meses.',
        'Ignorar el costo de oportunidad: pagar al contado significa perder la rentabilidad de ese capital.',
        'Comparar créditos solo por tasa sin ver el CAE (que incluye seguros y comisiones).'
      ]
    },
    examples:[
      {
        title:'¿Comprar o arrendar? (Decisión clásica)',
        steps:[
          'Casa de $100.000.000. Arriendo equivalente: $500.000/mes.',
          'Si compras con hipotecario al 4% UF, 360 cuotas, cuota ≈ $477.000/mes.',
          '¿La cuota del hipotecario es menor que el arriendo? Sí ($477K < $500K).',
          'Pero ojo: hay pie (20% = $20.000.000), seguros (~$100.000/mes), contribuciones, mantención.',
          'Cuota total real: ~$600.000/mes. Y el capital $20M no genera rentabilidad al ponerlo de pie.'
        ]
      },
      {
        title:'¿Prepagar la deuda o invertir?',
        steps:[
          'Tienes $5.000.000 ahorrados y deuda a 15% anual.',
          'Opción A: prepagar la deuda → "ganas" 15% (ahorras esos intereses).',
          'Opción B: invertir en DAP al 5% anual → "ganas" 5%.',
          'El costo de la deuda (15%) es mayor que el rendimiento del DAP (5%).',
          'Conviene prepagar la deuda. Regla: si r_deuda > r_inversión → paga primero la deuda.'
        ]
      },
      {
        title:'CAE: el árbitro de los créditos',
        steps:[
          'Crédito $5.000.000 a 24 meses:',
          'Banco A: tasa 1%/mes, sin comisión. CAE = 12.68% anual. Cuota = $235.371.',
          'Banco B: tasa 0.9%/mes + seguro $5.000/mes. Cuota = $224.237+$5.000 = $229.237.',
          'Parece que B es más barato por cuota... pero calcula el total:',
          'A: $235.371×24 = $5.648.904. B: $229.237×24 = $5.501.688. B total menor.',
          'Sin embargo, el CAE de B podría ser mayor si hay comisión de apertura.'
        ]
      }
    ],
    visual:{type:'fin-comparacion-vis'},
    discovery:{
      title:'Cuotas sin interés: ¿realmente sin interés?',
      steps:[
        'Una tienda ofrece un iPhone de $600.000 "en 3 cuotas sin interés de $200.000".',
        'Pero al pagar al contado hay 5% de descuento: $570.000.',
        'Si pagas en cuotas, pagas $600.000 en vez de $570.000 al contado.',
        'El "interés implícito": resolver $570.000 = $200.000×[1−(1+r)^(-3)]/r.',
        'La tasa implícita es ~6.2% mensual = ¡91% anual! Las cuotas "sin interés" tienen costo oculto.'
      ]
    },
    exercises:{topic:'fin_comparacion',generators:[]},
    advanced:{
      title:'Costo de Oportunidad y Decisiones de Inversión',
      content:'El **costo de oportunidad** es el rendimiento de la mejor alternativa descartada. En las decisiones financieras, siempre hay un costo de oportunidad implícito. Si usas $10.000.000 de ahorros para comprar un auto, el costo de oportunidad es lo que habrían rendido esos $10M en una alternativa de inversión. El VAN ya incorpora el costo de oportunidad a través de la tasa de descuento: un VAN positivo significa que el proyecto supera la mejor alternativa disponible al mismo riesgo. En Chile, la tasa de descuento social usada por el MIDESO es 6% real anual.'
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
  console.log('[MM] content-financiera.js cargado.',LESSONS.length,'lecciones financieras');
})();
