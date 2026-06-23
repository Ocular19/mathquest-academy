/* ═══════════════════════════════════════════════════════
   GENERATORS-FINANCIERA.JS — 10 temas × 10 generadores
   ═══════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if(!window.MM_GENERATORS) window.MM_GENERATORS={};
  if(!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS={};
  const G=window.MM_GENERATORS;

  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const r2=x=>Math.round(x*100)/100;
  const r4=x=>Math.round(x*10000)/10000;

  // Formato pesos chilenos: 1234567 → "$1.234.567"
  function clp(n){
    return '$'+Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  }
  function pct(r){return r2(r*100)+'%';}

  /* ═══════════════════════════════════════
     1. PORCENTAJES FINANCIEROS
  ═══════════════════════════════════════ */
  G['fin_por_descuento_simple']=function(diff){
    const precios={easy:[50000,80000,100000],medio:[120000,250000,500000],dificil:[180000,350000,750000],experto:[890000,1250000,2400000]};
    const P=pick(precios[diff]||precios.medio);
    const d=pick([5,10,15,20,25,30]);
    const desc=P*d/100, final=P-desc;
    return {question:`Un producto cuesta ${clp(P)} y tiene un descuento del ${d}%. ¿Cuánto pagas?`,
      answer:clp(final),
      hint:`Precio final = Precio × (1 − ${d}/100) = ${clp(P)} × ${r2(1-d/100)}`,
      explanation:`Descuento: ${clp(P)} × ${d}/100 = ${clp(desc)}. Final: ${clp(P)} − ${clp(desc)} = ${clp(final)}`,
      topic:'fin_porcentajes',type:'descuento_simple'};
  };

  G['fin_por_descuento_sucesivo']=function(diff){
    const P=pick([100000,200000,500000,1000000]);
    const d1=pick([10,15,20,25]), d2=pick([5,10,15]);
    const p1=P*(1-d1/100), p2=p1*(1-d2/100);
    const equiv=r2(100-(1-d1/100)*(1-d2/100)*100);
    return {question:`Un producto de ${clp(P)} tiene descuentos sucesivos de ${d1}% y ${d2}%. ¿Cuál es el precio final?`,
      answer:clp(p2),
      hint:`Aplica cada descuento en orden: primero ${d1}%, luego ${d2}% sobre el resultado.`,
      explanation:`${clp(P)}×(1−${d1/100})=${clp(p1)} → ×(1−${d2/100})=${clp(p2)}. Descuento equivalente: ${equiv}%`,
      topic:'fin_porcentajes',type:'descuento_sucesivo'};
  };

  G['fin_por_descuento_equivalente']=function(diff){
    const d1=pick([10,15,20,25]), d2=pick([5,10,15,20]);
    const equiv=r2(100-(1-d1/100)*(1-d2/100)*100);
    return {question:`Dos descuentos sucesivos de ${d1}% y ${d2}%, ¿cuál es el descuento único equivalente?`,
      answer:equiv+'%',
      hint:`D_equiv = 1 − (1−d₁)(1−d₂) expresado como porcentaje.`,
      explanation:`1−(1−${d1/100})(1−${d2/100}) = 1−${r2((1-d1/100)*(1-d2/100))} = ${r2(1-(1-d1/100)*(1-d2/100))} → ${equiv}%`,
      topic:'fin_porcentajes',type:'descuento_equiv'};
  };

  G['fin_por_aumento_sucesivo']=function(diff){
    const P=pick([50000,100000,200000,500000]);
    const a1=pick([5,8,10,12,15]), a2=pick([3,5,8,10]);
    const p1=P*(1+a1/100), p2=p1*(1+a2/100);
    return {question:`Un salario de ${clp(P)} aumenta ${a1}% el primer año y ${a2}% el segundo. ¿Cuál es el salario final?`,
      answer:clp(p2),
      hint:`Monto final = P × (1+${a1}/100) × (1+${a2}/100)`,
      explanation:`${clp(P)} × ${r2(1+a1/100)} × ${r2(1+a2/100)} = ${clp(p2)}`,
      topic:'fin_porcentajes',type:'aumento_sucesivo'};
  };

  G['fin_por_precio_original']=function(diff){
    const d=pick([10,15,20,25,30]);
    const pfinal=pick([40000,68000,80000,120000,170000,200000]);
    const porig=r2(pfinal/(1-d/100));
    return {question:`Un artículo está en oferta con ${d}% de descuento y su precio actual es ${clp(pfinal)}. ¿Cuál era el precio original?`,
      answer:clp(porig),
      hint:`P_original = P_final / (1 − descuento) = ${clp(pfinal)} / (1 − ${d/100})`,
      explanation:`${clp(pfinal)} / ${r2(1-d/100)} = ${clp(porig)}`,
      topic:'fin_porcentajes',type:'precio_original'};
  };

  G['fin_por_iva']=function(diff){
    const tipos=[
      {dir:'neto→bruto',P:pick([10000,25000,50000,100000,200000]),label:'neto'},
      {dir:'bruto→neto',P:pick([11900,29750,59500,119000,238000]),label:'bruto'},
    ];
    const t=pick(tipos);
    const iva=0.19;
    if(t.dir==='neto→bruto'){
      const bruto=Math.round(t.P*(1+iva));
      return {question:`Un producto tiene precio neto (sin IVA) de ${clp(t.P)}. ¿Cuánto cuesta con IVA (19%)?`,
        answer:clp(bruto),hint:'Precio con IVA = Precio neto × 1.19',
        explanation:`${clp(t.P)} × 1.19 = ${clp(bruto)}`,topic:'fin_porcentajes',type:'iva'};
    } else {
      const neto=Math.round(t.P/1.19);
      return {question:`Un producto cuesta ${clp(t.P)} con IVA incluido (19%). ¿Cuál es el precio neto?`,
        answer:clp(neto),hint:'Precio neto = Precio con IVA / 1.19',
        explanation:`${clp(t.P)} / 1.19 = ${clp(neto)}`,topic:'fin_porcentajes',type:'iva'};
    }
  };

  G['fin_por_variacion']=function(diff){
    const P0=pick([100000,200000,500000,1000000]);
    const P1s=[P0*1.05,P0*1.10,P0*0.90,P0*0.95,P0*1.20,P0*0.80];
    const P1=Math.round(pick(P1s));
    const var_pct=r2((P1-P0)/P0*100);
    return {question:`El precio de un bien pasó de ${clp(P0)} a ${clp(P1)}. ¿Cuál fue la variación porcentual?`,
      answer:var_pct+'%',
      hint:`Variación % = (P_final − P_inicial) / P_inicial × 100`,
      explanation:`(${clp(P1)} − ${clp(P0)}) / ${clp(P0)} × 100 = ${var_pct}%`,
      topic:'fin_porcentajes',type:'variacion'};
  };

  G['fin_por_margen']=function(diff){
    const costo=pick([50000,80000,120000,200000,400000]);
    const margen=pick([20,30,40,50,60]);
    const precio=Math.round(costo*(1+margen/100));
    return {question:`Un producto cuesta ${clp(costo)} y se vende con un margen de utilidad del ${margen}% sobre el costo. ¿Cuál es el precio de venta?`,
      answer:clp(precio),
      hint:`Precio = Costo × (1 + ${margen}/100)`,
      explanation:`${clp(costo)} × ${r2(1+margen/100)} = ${clp(precio)}`,
      topic:'fin_porcentajes',type:'margen'};
  };

  G['fin_por_cuantos_descuentos']=function(diff){
    const P=pick([200000,500000,1000000]);
    const target_pct=pick([50,60,64,72,75]);
    const d1=pick([20,25,30]);
    const final=Math.round(P*(target_pct/100));
    const ya=P*(1-d1/100);
    const d2=r2(100-(final/ya*100));
    return {question:`Necesito que ${clp(P)} quede en ${clp(final)} (${target_pct}% del precio). Ya apliqué un descuento de ${d1}%. ¿Qué descuento adicional debo hacer?`,
      answer:d2+'%',
      hint:`Después del primer descuento: ${clp(Math.round(ya))}. Calcula el % para llegar a ${clp(final)}.`,
      explanation:`Después del ${d1}%: ${clp(Math.round(ya))}. Descuento adicional: 1 − ${final}/${Math.round(ya)} = ${d2}%`,
      topic:'fin_porcentajes',type:'descuento_buscado'};
  };

  G['fin_por_reajuste']=function(diff){
    const s=pick([500000,700000,900000,1200000]);
    const ipc=pick([3.5,4.0,4.5,5.0,6.0]);
    const s_reaj=Math.round(s*(1+ipc/100));
    return {question:`Un contrato de ${clp(s)} se reajusta por IPC del ${ipc}%. ¿Cuál es el nuevo valor?`,
      answer:clp(s_reaj),
      hint:`Valor reajustado = ${clp(s)} × (1 + ${ipc}/100)`,
      explanation:`${clp(s)} × ${r2(1+ipc/100)} = ${clp(s_reaj)}`,
      topic:'fin_porcentajes',type:'reajuste'};
  };

  window.MM_TOPIC_GENERATORS['fin_porcentajes']=[
    'fin_por_descuento_simple','fin_por_descuento_sucesivo','fin_por_descuento_equivalente',
    'fin_por_aumento_sucesivo','fin_por_precio_original','fin_por_iva',
    'fin_por_variacion','fin_por_margen','fin_por_cuantos_descuentos','fin_por_reajuste'
  ];

  /* ═══════════════════════════════════════
     2. INTERÉS SIMPLE
     I = P·r·t  |  M = P(1+rt)
  ═══════════════════════════════════════ */
  G['fin_is_interes']=function(diff){
    const Ps=[100000,200000,500000,1000000,2000000,5000000];
    const rs=[0.04,0.05,0.06,0.08,0.10,0.12];
    const ts=[0.5,1,1.5,2,3];
    const P=pick(Ps), r=pick(rs), t=pick(ts);
    const I=Math.round(P*r*t);
    return {question:`Calcula el interés simple de un capital de ${clp(P)} al ${pct(r)} anual durante ${t} año(s).`,
      answer:clp(I),
      hint:`I = P × r × t = ${clp(P)} × ${r} × ${t}`,
      explanation:`I = ${clp(P)} × ${r} × ${t} = ${clp(I)}`,
      topic:'fin_interes_simple',type:'interes'};
  };

  G['fin_is_monto']=function(diff){
    const P=pick([500000,1000000,2000000,5000000,10000000]);
    const r=pick([0.04,0.05,0.06,0.08,0.10,0.12]);
    const t=pick([1,2,3,4,5]);
    const M=Math.round(P*(1+r*t));
    return {question:`¿Cuánto acumulas si depositas ${clp(P)} al ${pct(r)} anual simple durante ${t} año(s)?`,
      answer:clp(M),
      hint:`M = P(1 + r·t) = ${clp(P)} × (1 + ${r}×${t})`,
      explanation:`M = ${clp(P)} × (1 + ${r*t}) = ${clp(P)} × ${r2(1+r*t)} = ${clp(M)}`,
      topic:'fin_interes_simple',type:'monto'};
  };

  G['fin_is_capital']=function(diff){
    const r=pick([0.05,0.08,0.10,0.12]);
    const t=pick([1,2,3]);
    const I=pick([50000,100000,150000,200000,300000,500000]);
    const P=Math.round(I/(r*t));
    return {question:`Se generó un interés simple de ${clp(I)} al ${pct(r)} anual en ${t} año(s). ¿Cuál era el capital inicial?`,
      answer:clp(P),
      hint:`P = I / (r × t) = ${clp(I)} / (${r} × ${t})`,
      explanation:`P = ${clp(I)} / ${r2(r*t)} = ${clp(P)}`,
      topic:'fin_interes_simple',type:'capital'};
  };

  G['fin_is_tasa']=function(diff){
    const P=pick([500000,1000000,2000000,5000000]);
    const t=pick([1,2,3,4]);
    const rs=[0.05,0.06,0.08,0.10,0.12,0.15];
    const r=pick(rs);
    const I=Math.round(P*r*t);
    return {question:`Un capital de ${clp(P)} generó ${clp(I)} de interés simple en ${t} año(s). ¿Cuál es la tasa anual?`,
      answer:pct(r),
      hint:`r = I / (P × t) = ${clp(I)} / (${clp(P)} × ${t})`,
      explanation:`r = ${clp(I)} / ${clp(P*t)} = ${r} = ${pct(r)}`,
      topic:'fin_interes_simple',type:'tasa'};
  };

  G['fin_is_tiempo']=function(diff){
    const P=pick([500000,1000000,2000000]);
    const r=pick([0.05,0.06,0.08,0.10,0.12]);
    const ts=[1,2,3,4,5];
    const t=pick(ts);
    const I=Math.round(P*r*t);
    return {question:`¿Cuánto tiempo (años) tarda un capital de ${clp(P)} al ${pct(r)} anual en generar ${clp(I)} de interés simple?`,
      answer:t+' años',
      hint:`t = I / (P × r) = ${clp(I)} / (${clp(P)} × ${r})`,
      explanation:`t = ${clp(I)} / ${clp(P*r)} = ${t} años`,
      topic:'fin_interes_simple',type:'tiempo'};
  };

  G['fin_is_mensual']=function(diff){
    const P=pick([200000,500000,1000000,3000000]);
    const rm=pick([0.008,0.01,0.012,0.015,0.018,0.02]);
    const n=pick([3,6,9,12,18,24]);
    const I=Math.round(P*rm*n);
    const M=P+I;
    return {question:`Capital: ${clp(P)}, tasa mensual: ${pct(rm)}, plazo: ${n} meses (interés simple). ¿Cuánto es el monto final?`,
      answer:clp(M),
      hint:`M = P(1 + r_mensual × n_meses) = ${clp(P)} × (1 + ${rm}×${n})`,
      explanation:`I = ${clp(P)}×${rm}×${n} = ${clp(I)}. M = ${clp(P)}+${clp(I)} = ${clp(M)}`,
      topic:'fin_interes_simple',type:'mensual'};
  };

  G['fin_is_descuento_comercial']=function(diff){
    const VN=pick([500000,1000000,2000000,5000000]);
    const d=pick([0.05,0.06,0.08,0.10,0.12]);
    const t=pick([0.25,0.5,1]);
    const D=Math.round(VN*d*t);
    const P=VN-D;
    return {question:`Un pagaré con valor nominal ${clp(VN)} se descuenta comercialmente al ${pct(d)} anual con ${t} año(s) de anticipación. ¿Cuánto recibes hoy?`,
      answer:clp(P),
      hint:`Descuento = VN × d × t. Precio de descuento = VN − Descuento.`,
      explanation:`D = ${clp(VN)} × ${d} × ${t} = ${clp(D)}. P = ${clp(VN)} − ${clp(D)} = ${clp(P)}`,
      topic:'fin_interes_simple',type:'descuento_comercial'};
  };

  G['fin_is_duplicar']=function(diff){
    const rs=[0.05,0.08,0.10,0.12,0.15,0.20];
    const r=pick(rs);
    const t=r2(1/r);
    return {question:`A una tasa de interés simple del ${pct(r)} anual, ¿en cuántos años se duplica un capital?`,
      answer:t+' años',
      hint:`Cuando M = 2P: 2P = P(1+rt) → t = 1/r`,
      explanation:`t = 1/${r} = ${t} años. Regla: a tasa ${pct(r)}, se duplica en ${t} años.`,
      topic:'fin_interes_simple',type:'duplicar'};
  };

  G['fin_is_dias']=function(diff){
    const P=pick([500000,1000000,2000000,5000000]);
    const r_anual=pick([0.05,0.06,0.08,0.10,0.12]);
    const dias=pick([30,60,90,120,180,270]);
    const I=Math.round(P*r_anual*dias/365);
    return {question:`${clp(P)} al ${pct(r_anual)} anual simple durante ${dias} días. ¿Cuánto es el interés? (año de 365 días)`,
      answer:clp(I),
      hint:`I = P × r × (días/365)`,
      explanation:`I = ${clp(P)} × ${r_anual} × ${dias}/365 = ${clp(I)}`,
      topic:'fin_interes_simple',type:'dias'};
  };

  G['fin_is_banco_estado']=function(diff){
    const montos=[500000,1000000,2000000,5000000];
    const P=pick(montos);
    const r_mensual=pick([0.01,0.012,0.015]);
    const n=pick([6,12,18,24]);
    const I=Math.round(P*r_mensual*n);
    const M=P+I;
    return {question:`Banco Estado ofrece un crédito de consumo de ${clp(P)} a tasa mensual del ${pct(r_mensual)} en ${n} meses (interés simple). ¿Cuánto pagas en total?`,
      answer:clp(M),
      hint:`Total = Capital × (1 + r_mensual × n_meses)`,
      explanation:`${clp(P)} × (1 + ${r_mensual}×${n}) = ${clp(P)} × ${r2(1+r_mensual*n)} = ${clp(M)}`,
      topic:'fin_interes_simple',type:'banco_estado'};
  };

  window.MM_TOPIC_GENERATORS['fin_interes_simple']=[
    'fin_is_interes','fin_is_monto','fin_is_capital','fin_is_tasa','fin_is_tiempo',
    'fin_is_mensual','fin_is_descuento_comercial','fin_is_duplicar','fin_is_dias','fin_is_banco_estado'
  ];

  /* ═══════════════════════════════════════
     3. INTERÉS COMPUESTO Y CAPITALIZACIÓN
     M = P(1+r)^n  |  VP = VF/(1+r)^n
  ═══════════════════════════════════════ */
  G['fin_ic_monto']=function(diff){
    const P=pick([1000000,2000000,5000000,10000000]);
    const r=pick([0.04,0.05,0.06,0.08,0.10]);
    const n=pick([1,2,3,4,5]);
    const M=Math.round(P*Math.pow(1+r,n));
    return {question:`Depositas ${clp(P)} al ${pct(r)} anual compuesto durante ${n} año(s). ¿Cuánto acumulas?`,
      answer:clp(M),
      hint:`M = P(1+r)ⁿ = ${clp(P)} × ${r2(1+r)}^${n}`,
      explanation:`M = ${clp(P)} × ${r2(Math.pow(1+r,n))} = ${clp(M)}`,
      topic:'fin_interes_compuesto',type:'monto'};
  };

  G['fin_ic_valor_presente']=function(diff){
    const VF=pick([2000000,5000000,10000000,20000000,50000000]);
    const r=pick([0.04,0.05,0.06,0.08,0.10]);
    const n=pick([1,2,3,4,5]);
    const VP=Math.round(VF/Math.pow(1+r,n));
    return {question:`¿Cuánto debes invertir hoy al ${pct(r)} anual compuesto para tener ${clp(VF)} en ${n} año(s)?`,
      answer:clp(VP),
      hint:`VP = VF / (1+r)ⁿ = ${clp(VF)} / ${r2(1+r)}^${n}`,
      explanation:`VP = ${clp(VF)} / ${r2(Math.pow(1+r,n))} = ${clp(VP)}`,
      topic:'fin_interes_compuesto',type:'valor_presente'};
  };

  G['fin_ic_vs_simple']=function(diff){
    const P=pick([1000000,2000000,5000000]);
    const r=pick([0.06,0.08,0.10,0.12]);
    const n=pick([3,4,5,10]);
    const MIS=Math.round(P*(1+r*n));
    const MIC=Math.round(P*Math.pow(1+r,n));
    const dif=MIC-MIS;
    return {question:`${clp(P)} al ${pct(r)} durante ${n} años: ¿cuánto más genera el interés compuesto vs simple?`,
      answer:clp(dif),
      hint:`Compuesto: M=P(1+r)ⁿ. Simple: M=P(1+rt). Diferencia = MIC − MIS.`,
      explanation:`IS: ${clp(MIS)}. IC: ${clp(MIC)}. Diferencia: ${clp(dif)}`,
      topic:'fin_interes_compuesto',type:'vs_simple'};
  };

  G['fin_ic_capital']=function(diff){
    const r=pick([0.05,0.06,0.08,0.10]);
    const n=pick([2,3,4,5]);
    const Ms=[2000000,5000000,10000000,20000000];
    const M=pick(Ms);
    const P=Math.round(M/Math.pow(1+r,n));
    return {question:`¿Qué capital debes depositar hoy al ${pct(r)} anual compuesto para obtener ${clp(M)} en ${n} año(s)?`,
      answer:clp(P),
      hint:`P = M / (1+r)ⁿ`,
      explanation:`P = ${clp(M)} / ${r2(Math.pow(1+r,n))} = ${clp(P)}`,
      topic:'fin_interes_compuesto',type:'capital'};
  };

  G['fin_ic_mensual']=function(diff){
    const P=pick([500000,1000000,2000000,5000000]);
    const r_anual=pick([0.06,0.08,0.10,0.12,0.18]);
    const rm=r4(Math.pow(1+r_anual,1/12)-1);
    const n=pick([12,24,36,48,60]);
    const M=Math.round(P*Math.pow(1+rm,n));
    return {question:`${clp(P)} al ${pct(r_anual)} anual con capitalización mensual, durante ${n} meses. ¿Cuánto acumulas?`,
      answer:clp(M),
      hint:`Tasa mensual equivalente = (1+${r_anual})^(1/12)−1 = ${pct(rm)}. M = P(1+r_m)^n`,
      explanation:`r_m = ${pct(rm)}. M = ${clp(P)}×${r4(Math.pow(1+rm,n))} = ${clp(M)}`,
      topic:'fin_interes_compuesto',type:'mensual'};
  };

  G['fin_ic_tasa_efectiva']=function(diff){
    const r_nom=pick([0.06,0.08,0.10,0.12,0.18]);
    const ms={mensual:12,trimestral:4,semestral:2};
    const mNombre=pick(Object.keys(ms));
    const m=ms[mNombre];
    const i_eff=r4(Math.pow(1+r_nom/m,m)-1);
    return {question:`Tasa nominal anual del ${pct(r_nom)} capitalizable ${mNombre}. ¿Cuál es la tasa efectiva anual?`,
      answer:pct(i_eff),
      hint:`TEA = (1 + i_nom/m)^m − 1 = (1 + ${r_nom}/${m})^${m} − 1`,
      explanation:`TEA = ${r2((1+r_nom/m)*100)/100}^${m} − 1 = ${i_eff} = ${pct(i_eff)}`,
      topic:'fin_interes_compuesto',type:'tasa_efectiva'};
  };

  G['fin_ic_duplicar']=function(diff){
    const rs=[0.04,0.05,0.06,0.08,0.10,0.12];
    const r=pick(rs);
    const n72=r2(72/(r*100));
    const n_exacto=r2(Math.log(2)/Math.log(1+r));
    return {question:`A una tasa del ${pct(r)} anual compuesto, ¿en cuántos años se duplica un capital? (usa la Regla del 72)`,
      answer:n72+' años (aprox.)',
      hint:`Regla del 72: n ≈ 72 / tasa(%). Valor exacto: n = ln(2)/ln(1+r) = ${n_exacto} años.`,
      explanation:`72 / ${r*100} = ${n72} años. Exacto: ${n_exacto} años.`,
      topic:'fin_interes_compuesto',type:'duplicar'};
  };

  G['fin_ic_n_periodos']=function(diff){
    const P=pick([1000000,2000000,5000000]);
    const r=pick([0.05,0.06,0.08,0.10]);
    const factor=pick([1.5,2,2.5,3]);
    const M=Math.round(P*factor);
    const n=r2(Math.log(M/P)/Math.log(1+r));
    return {question:`¿En cuántos años crece ${clp(P)} hasta ${clp(M)} al ${pct(r)} anual compuesto?`,
      answer:n+' años',
      hint:`n = log(M/P) / log(1+r) = log(${factor}) / log(${r2(1+r)})`,
      explanation:`n = ${r2(Math.log(factor))} / ${r4(Math.log(1+r))} = ${n} años`,
      topic:'fin_interes_compuesto',type:'n_periodos'};
  };

  G['fin_ic_deposito_plazo']=function(diff){
    const P=pick([500000,1000000,2000000,5000000,10000000]);
    const r_anual=pick([0.04,0.05,0.06,0.08]);
    const dias=pick([30,60,90,180,365]);
    const r_diaria=r4(Math.pow(1+r_anual,1/365)-1);
    const M=Math.round(P*Math.pow(1+r_diaria,dias));
    const I=M-P;
    return {question:`Depositas ${clp(P)} en un DAP (Depósito a Plazo) al ${pct(r_anual)} anual por ${dias} días. ¿Cuánto retiras?`,
      answer:clp(M),
      hint:`Tasa diaria = (1+${r_anual})^(1/365)−1. M = P×(1+r_d)^${dias}`,
      explanation:`Interés: ${clp(I)}. Monto total: ${clp(P)}+${clp(I)}=${clp(M)}`,
      topic:'fin_interes_compuesto',type:'deposito_plazo'};
  };

  G['fin_ic_inflacion']=function(diff){
    const P=pick([1000000,2000000,5000000,10000000]);
    const r=pick([0.06,0.08,0.10,0.12]);
    const inf=pick([0.03,0.04,0.05,0.06]);
    const n=pick([3,5,10]);
    const M=Math.round(P*Math.pow(1+r,n));
    const M_real=Math.round(M/Math.pow(1+inf,n));
    return {question:`Inviertes ${clp(P)} al ${pct(r)} anual compuesto por ${n} años. Si la inflación es ${pct(inf)} anual, ¿cuánto vale el monto final en pesos de hoy?`,
      answer:clp(M_real),
      hint:`Monto nominal: ${clp(M)}. Valor real = M / (1+inf)^n.`,
      explanation:`M_nominal=${clp(M)}. M_real=${clp(M)}/${r2(Math.pow(1+inf,n))}=${clp(M_real)}`,
      topic:'fin_interes_compuesto',type:'real_vs_nominal'};
  };

  window.MM_TOPIC_GENERATORS['fin_interes_compuesto']=[
    'fin_ic_monto','fin_ic_valor_presente','fin_ic_vs_simple','fin_ic_capital','fin_ic_mensual',
    'fin_ic_tasa_efectiva','fin_ic_duplicar','fin_ic_n_periodos','fin_ic_deposito_plazo','fin_ic_inflacion'
  ];

  /* ═══════════════════════════════════════
     4. EQUIVALENCIA FINANCIERA Y TASAS
  ═══════════════════════════════════════ */
  G['fin_eq_mensual_a_anual']=function(diff){
    const rms=[0.005,0.008,0.01,0.012,0.015,0.018,0.02];
    const rm=pick(rms);
    const ra=r4(Math.pow(1+rm,12)-1);
    return {question:`Una tasa mensual del ${pct(rm)} es equivalente a una tasa efectiva anual de ¿cuánto?`,
      answer:pct(ra),
      hint:`TEA = (1 + r_mensual)^12 − 1`,
      explanation:`(1 + ${rm})^12 − 1 = ${r4(Math.pow(1+rm,12))} − 1 = ${ra} = ${pct(ra)}`,
      topic:'fin_equivalencia',type:'mensual_anual'};
  };

  G['fin_eq_anual_a_mensual']=function(diff){
    const ras=[0.06,0.08,0.10,0.12,0.15,0.18,0.20,0.24];
    const ra=pick(ras);
    const rm=r4(Math.pow(1+ra,1/12)-1);
    return {question:`Una tasa efectiva anual del ${pct(ra)} equivale a una tasa mensual de ¿cuánto?`,
      answer:pct(rm),
      hint:`r_mensual = (1 + TEA)^(1/12) − 1`,
      explanation:`(1 + ${ra})^(1/12) − 1 = ${pct(rm)}`,
      topic:'fin_equivalencia',type:'anual_mensual'};
  };

  G['fin_eq_nominal_efectiva']=function(diff){
    const r_nom=pick([0.06,0.08,0.10,0.12,0.18,0.24]);
    const ms={mensual:12,trimestral:4,semestral:2,bimestral:6};
    const mN=pick(Object.keys(ms)), m=ms[mN];
    const i_eff=r4(Math.pow(1+r_nom/m,m)-1);
    return {question:`Tasa nominal ${pct(r_nom)} anual con capitalización ${mN}. ¿TEA?`,
      answer:pct(i_eff),
      hint:`TEA = (1 + TNA/m)^m − 1`,
      explanation:`(1 + ${r2(r_nom/m*100)/100})^${m} − 1 = ${pct(i_eff)}`,
      topic:'fin_equivalencia',type:'nominal_efectiva'};
  };

  G['fin_eq_trimestral']=function(diff){
    const rts=[0.015,0.02,0.025,0.03];
    const rt=pick(rts);
    const ra=r4(Math.pow(1+rt,4)-1);
    const rm=r4(Math.pow(1+ra,1/12)-1);
    return {question:`Tasa trimestral del ${pct(rt)}. ¿Cuánto es la tasa mensual equivalente?`,
      answer:pct(rm),
      hint:`Convierte a TEA: (1+${rt})^4−1, luego a mensual: TEA^(1/12)−1.`,
      explanation:`TEA=${pct(ra)}. r_mensual=${pct(rm)}`,
      topic:'fin_equivalencia',type:'trimestral'};
  };

  G['fin_eq_tasa_real']=function(diff){
    const r_nom=pick([0.06,0.08,0.10,0.12]);
    const inf=pick([0.03,0.04,0.05,0.06]);
    const r_real=r4((1+r_nom)/(1+inf)-1);
    return {question:`Tasa nominal ${pct(r_nom)}, inflación ${pct(inf)}. ¿Cuál es la tasa de interés real? (Fórmula de Fisher)`,
      answer:pct(r_real),
      hint:`r_real = (1 + r_nominal) / (1 + inflación) − 1`,
      explanation:`(1+${r_nom})/(1+${inf})−1 = ${r2(1+r_nom)}/${r2(1+inf)}−1 = ${pct(r_real)}`,
      topic:'fin_equivalencia',type:'tasa_real'};
  };

  G['fin_eq_comparar_vpn']=function(diff){
    const r=pick([0.06,0.08,0.10,0.12]);
    const VF1=pick([1000000,2000000,5000000]);
    const n1=pick([2,3,4]);
    const VP1=Math.round(VF1/Math.pow(1+r,n1));
    const VF2=pick([1500000,3000000,6000000]);
    const n2=n1+pick([1,2]);
    const VP2=Math.round(VF2/Math.pow(1+r,n2));
    const mejor=VP1>VP2?'Opción A':'Opción B';
    return {question:`Al ${pct(r)} de descuento: Opción A devuelve ${clp(VF1)} en ${n1} años. Opción B devuelve ${clp(VF2)} en ${n2} años. ¿Cuál es mejor hoy?`,
      answer:mejor,
      hint:`Compara los valores presentes: VP_A = ${clp(VF1)}/(1+${r})^${n1}, VP_B = ${clp(VF2)}/(1+${r})^${n2}`,
      explanation:`VP_A=${clp(VP1)}, VP_B=${clp(VP2)}. ${mejor} tiene mayor valor presente.`,
      topic:'fin_equivalencia',type:'comparar_vpn'};
  };

  G['fin_eq_factor_descuento']=function(diff){
    const r=pick([0.05,0.06,0.08,0.10,0.12]);
    const n=pick([1,2,3,4,5]);
    const fd=r4(1/Math.pow(1+r,n));
    return {question:`¿Cuál es el factor de descuento para ${n} período(s) al ${pct(r)}?`,
      answer:fd.toString(),
      hint:`Factor = 1/(1+r)^n = 1/${r2(1+r)}^${n}`,
      explanation:`1/${r4(Math.pow(1+r,n))} = ${fd}`,
      topic:'fin_equivalencia',type:'factor_descuento'};
  };

  G['fin_eq_tasa_diaria']=function(diff){
    const ra=pick([0.05,0.06,0.08,0.10,0.12]);
    const rd=r4(Math.pow(1+ra,1/365)-1);
    return {question:`Tasa efectiva anual del ${pct(ra)}. ¿Cuánto es la tasa diaria equivalente?`,
      answer:pct(rd),
      hint:`r_diaria = (1 + TEA)^(1/365) − 1`,
      explanation:`(1+${ra})^(1/365)−1 = ${pct(rd)}`,
      topic:'fin_equivalencia',type:'diaria'};
  };

  G['fin_eq_plazo_diferente']=function(diff){
    const P=pick([1000000,2000000,5000000]);
    const r=pick([0.06,0.08,0.10]);
    const n1=pick([1,2,3]);
    const n2=n1+pick([2,3,4]);
    const M1=Math.round(P*Math.pow(1+r,n1));
    const M2=Math.round(P*Math.pow(1+r,n2));
    const dif=M2-M1;
    return {question:`${clp(P)} al ${pct(r)} anual compuesto. ¿Cuánto más se gana esperando ${n2} años vs ${n1} años?`,
      answer:clp(dif),
      hint:`M₁=${clp(M1)} (${n1} años), M₂=${clp(M2)} (${n2} años). Diferencia = M₂−M₁.`,
      explanation:`${clp(M2)}−${clp(M1)}=${clp(dif)}`,
      topic:'fin_equivalencia',type:'plazo_diferente'};
  };

  G['fin_eq_cae_concepto']=function(diff){
    const casos=[
      {q:'¿Qué mide el CAE (Costo Anual Equivalente) en un crédito?','a':'el costo total anual real del crédito (incluyendo seguros y comisiones)','e':'El CAE permite comparar créditos con distintas estructuras de costos en forma justa.'},
      {q:'Si el Banco A ofrece CAE 18% y el Banco B ofrece CAE 15%, ¿cuál conviene pedir?','a':'Banco B (CAE 15%)','e':'Menor CAE = menor costo real del crédito. El CAE ya incluye todos los costos.'},
      {q:'¿El CAE es mayor o menor que la tasa de interés nominal anunciada?','a':'mayor','e':'El CAE incluye seguros, comisiones y otros costos que la tasa nominal no considera.'},
    ];
    const c=pick(casos);
    return {question:c.q,answer:c.a,hint:'El CAE permite comparar créditos en forma estandarizada (regulado por CMF).',explanation:c.e,
      topic:'fin_equivalencia',type:'cae'};
  };

  window.MM_TOPIC_GENERATORS['fin_equivalencia']=[
    'fin_eq_mensual_a_anual','fin_eq_anual_a_mensual','fin_eq_nominal_efectiva','fin_eq_trimestral',
    'fin_eq_tasa_real','fin_eq_comparar_vpn','fin_eq_factor_descuento','fin_eq_tasa_diaria',
    'fin_eq_plazo_diferente','fin_eq_cae_concepto'
  ];

  /* ═══════════════════════════════════════
     5. ANUALIDADES Y RENTAS
     VF = PMT·[(1+r)^n−1]/r
     VP = PMT·[1−(1+r)^(-n)]/r
  ═══════════════════════════════════════ */
  function anVF(PMT,r,n){return PMT*(Math.pow(1+r,n)-1)/r;}
  function anVP(PMT,r,n){return PMT*(1-Math.pow(1+r,-n))/r;}
  function cuota(PV,r,n){return PV*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}

  G['fin_an_vf_ordinaria']=function(diff){
    const PMT=pick([50000,100000,150000,200000,300000]);
    const r=pick([0.005,0.008,0.01,0.012,0.015]);
    const ns={easy:12,medio:24,dificil:36,experto:48};
    const n=ns[diff]||24;
    const VF=Math.round(anVF(PMT,r,n));
    return {question:`Ahorras ${clp(PMT)} mensual al ${pct(r)} mensual durante ${n} meses. ¿Cuánto acumulas?`,
      answer:clp(VF),
      hint:`VF = PMT × [(1+r)^n−1]/r`,
      explanation:`${clp(PMT)} × [${r2(Math.pow(1+r,n))}−1]/${r} = ${clp(VF)}`,
      topic:'fin_anualidades',type:'vf_ordinaria'};
  };

  G['fin_an_vp_ordinaria']=function(diff){
    const PMT=pick([100000,150000,200000,300000,500000]);
    const r=pick([0.005,0.008,0.01,0.012,0.015]);
    const n=pick([12,24,36,48,60]);
    const VP=Math.round(anVP(PMT,r,n));
    return {question:`Una renta de ${clp(PMT)} mensual durante ${n} meses al ${pct(r)} mensual. ¿Cuánto vale hoy (VP)?`,
      answer:clp(VP),
      hint:`VP = PMT × [1−(1+r)^(-n)]/r`,
      explanation:`${clp(PMT)} × [1−${r4(Math.pow(1+r,-n))}]/${r} = ${clp(VP)}`,
      topic:'fin_anualidades',type:'vp_ordinaria'};
  };

  G['fin_an_cuota_dado_vp']=function(diff){
    const VP=pick([5000000,10000000,20000000,50000000]);
    const r=pick([0.005,0.008,0.01,0.012,0.015]);
    const n=pick([12,24,36,48,60]);
    const PMT=Math.round(cuota(VP,r,n));
    return {question:`Préstamo de ${clp(VP)} al ${pct(r)} mensual en ${n} cuotas. ¿Cuánto es cada cuota?`,
      answer:clp(PMT),
      hint:`C = VP × r(1+r)^n / [(1+r)^n−1]`,
      explanation:`C = ${clp(VP)} × ${r4(r*Math.pow(1+r,n))} / ${r4(Math.pow(1+r,n)-1)} = ${clp(PMT)}`,
      topic:'fin_anualidades',type:'cuota_vp'};
  };

  G['fin_an_cuota_dado_vf']=function(diff){
    const VF=pick([5000000,10000000,20000000,50000000]);
    const r=pick([0.005,0.008,0.01,0.012,0.015]);
    const n=pick([12,24,36,48,60]);
    const PMT=Math.round(VF*r/(Math.pow(1+r,n)-1));
    return {question:`Quieres acumular ${clp(VF)} en ${n} meses al ${pct(r)} mensual. ¿Cuánto ahorras por mes?`,
      answer:clp(PMT),
      hint:`PMT = VF × r / [(1+r)^n − 1]`,
      explanation:`${clp(VF)} × ${r} / [${r2(Math.pow(1+r,n))}−1] = ${clp(PMT)}`,
      topic:'fin_anualidades',type:'cuota_vf'};
  };

  G['fin_an_total_pagado']=function(diff){
    const VP=pick([3000000,5000000,10000000,20000000]);
    const r=pick([0.008,0.01,0.012,0.015]);
    const n=pick([12,24,36,48]);
    const PMT=Math.round(cuota(VP,r,n));
    const total=PMT*n;
    const intereses=total-VP;
    return {question:`Crédito de ${clp(VP)} a ${n} cuotas mensuales al ${pct(r)}/mes. ¿Cuánto pagas en total?`,
      answer:clp(total),
      hint:`Total = cuota × n. Cuota = ${clp(PMT)}.`,
      explanation:`Cuota: ${clp(PMT)}. Total: ${clp(PMT)} × ${n} = ${clp(total)}. Intereses: ${clp(intereses)}`,
      topic:'fin_anualidades',type:'total_pagado'};
  };

  G['fin_an_leasing']=function(diff){
    const valor=pick([5000000,10000000,20000000,50000000]);
    const pie=pick([0.20,0.25,0.30]);
    const r=pick([0.008,0.01,0.012,0.015]);
    const n=pick([24,36,48,60]);
    const financiado=Math.round(valor*(1-pie));
    const PMT=Math.round(cuota(financiado,r,n));
    return {question:`Leasing de ${clp(valor)} con pie del ${pct(pie)} y ${n} cuotas mensuales al ${pct(r)}/mes. ¿Cuánto es la cuota?`,
      answer:clp(PMT),
      hint:`Monto financiado = ${clp(financiado)}. C = VP × r(1+r)^n/[(1+r)^n−1]`,
      explanation:`Financiado: ${clp(financiado)}. Cuota: ${clp(PMT)}`,
      topic:'fin_anualidades',type:'leasing'};
  };

  G['fin_an_renta_vitalicia']=function(diff){
    const PMT=pick([200000,300000,400000,500000]);
    const r=pick([0.004,0.005,0.006,0.008]);
    const VP=Math.round(PMT/r);
    return {question:`Una renta perpetua de ${clp(PMT)} mensual al ${pct(r)}/mes. ¿Cuál es su valor presente?`,
      answer:clp(VP),
      hint:`Renta perpetua: VP = PMT / r (cuando n→∞)`,
      explanation:`VP = ${clp(PMT)} / ${r} = ${clp(VP)}`,
      topic:'fin_anualidades',type:'perpetua'};
  };

  G['fin_an_ahorro_meta']=function(diff){
    const meta=pick([5000000,10000000,20000000,30000000]);
    const r=pick([0.005,0.008,0.01,0.012]);
    const n=pick([12,24,36,48,60]);
    const PMT=Math.round(meta*r/(Math.pow(1+r,n)-1));
    return {question:`Meta de ahorro: ${clp(meta)} en ${n} meses al ${pct(r)}/mes. ¿Cuánto debes depositar mensualmente?`,
      answer:clp(PMT),
      hint:`PMT = VF × r / [(1+r)^n − 1]`,
      explanation:`${clp(meta)} × ${r} / [${r2(Math.pow(1+r,n))}−1] = ${clp(PMT)}`,
      topic:'fin_anualidades',type:'ahorro_meta'};
  };

  G['fin_an_anualidad_debida']=function(diff){
    const PMT=pick([100000,200000,300000]);
    const r=pick([0.005,0.008,0.01,0.012]);
    const n=pick([12,24,36]);
    const VF_ord=Math.round(anVF(PMT,r,n));
    const VF_deb=Math.round(VF_ord*(1+r));
    return {question:`Anualidad debida (pago al inicio): ${clp(PMT)}/mes al ${pct(r)}/mes, ${n} meses. ¿VF?`,
      answer:clp(VF_deb),
      hint:`VF_debida = VF_ordinaria × (1+r). VF_ord = ${clp(VF_ord)}`,
      explanation:`${clp(VF_ord)} × ${r2(1+r)} = ${clp(VF_deb)}`,
      topic:'fin_anualidades',type:'debida'};
  };

  G['fin_an_cae_universitario']=function(diff){
    const VP=pick([3000000,5000000,8000000,10000000]);
    const r=pick([0.005,0.006,0.008,0.01]);
    const n=pick([60,72,84,96,120]);
    const PMT=Math.round(cuota(VP,r,n));
    const total=PMT*n;
    return {question:`CAE universitario de ${clp(VP)} a ${n} cuotas al ${pct(r)}/mes. ¿Cuánto es la cuota mensual?`,
      answer:clp(PMT),
      hint:`C = VP × r(1+r)^n / [(1+r)^n−1]`,
      explanation:`Cuota: ${clp(PMT)}. Total a pagar: ${clp(total)}`,
      topic:'fin_anualidades',type:'cae'};
  };

  window.MM_TOPIC_GENERATORS['fin_anualidades']=[
    'fin_an_vf_ordinaria','fin_an_vp_ordinaria','fin_an_cuota_dado_vp','fin_an_cuota_dado_vf',
    'fin_an_total_pagado','fin_an_leasing','fin_an_renta_vitalicia','fin_an_ahorro_meta',
    'fin_an_anualidad_debida','fin_an_cae_universitario'
  ];

  /* ═══════════════════════════════════════
     6. AMORTIZACIÓN Y CRÉDITOS
  ═══════════════════════════════════════ */
  G['fin_am_cuota_credito']=function(diff){
    const VP=pick([2000000,5000000,10000000,20000000]);
    const r_a=pick([0.10,0.12,0.15,0.18,0.20,0.24]);
    const rm=r4(Math.pow(1+r_a,1/12)-1);
    const n=pick([12,24,36,48,60]);
    const PMT=Math.round(cuota(VP,rm,n));
    return {question:`Crédito de consumo de ${clp(VP)}, CAE ${pct(r_a)} anual, ${n} cuotas. ¿Cuánto es la cuota mensual?`,
      answer:clp(PMT),
      hint:`Tasa mensual equivalente: ${pct(rm)}. Cuota = VP × r_m(1+r_m)^n/[(1+r_m)^n−1]`,
      explanation:`r_m=${pct(rm)}. Cuota=${clp(PMT)}`,
      topic:'fin_amortizacion',type:'cuota'};
  };

  G['fin_am_saldo_cuota_k']=function(diff){
    const VP=pick([5000000,10000000,20000000]);
    const rm=pick([0.008,0.01,0.012,0.015]);
    const n=pick([24,36,48]);
    const k=pick([3,6,12]);
    const PMT=Math.round(cuota(VP,rm,n));
    const saldo=Math.round(VP*Math.pow(1+rm,k)-PMT*(Math.pow(1+rm,k)-1)/rm);
    return {question:`Crédito de ${clp(VP)} a ${n} cuotas al ${pct(rm)}/mes. ¿Cuál es el saldo después de pagar ${k} cuotas?`,
      answer:clp(saldo),
      hint:`Saldo_k = VP(1+r)^k − PMT×[(1+r)^k−1]/r`,
      explanation:`Saldo después de ${k} cuotas: ${clp(saldo)}`,
      topic:'fin_amortizacion',type:'saldo_k'};
  };

  G['fin_am_interes_cuota_k']=function(diff){
    const VP=pick([5000000,10000000,20000000]);
    const rm=pick([0.008,0.01,0.012,0.015]);
    const n=pick([24,36,48]);
    const k=pick([1,2,3,6,12]);
    const PMT=Math.round(cuota(VP,rm,n));
    const saldo_ant=k===1?VP:Math.round(VP*Math.pow(1+rm,k-1)-PMT*(Math.pow(1+rm,k-1)-1)/rm);
    const interes_k=Math.round(saldo_ant*rm);
    return {question:`Crédito de ${clp(VP)} a ${n} cuotas al ${pct(rm)}/mes. ¿Cuánto es el interés de la cuota ${k}?`,
      answer:clp(interes_k),
      hint:`Interés_k = Saldo_{k-1} × r_mensual`,
      explanation:`Saldo cuota ${k-1}: ${clp(saldo_ant)}. Interés: ${clp(saldo_ant)} × ${rm} = ${clp(interes_k)}`,
      topic:'fin_amortizacion',type:'interes_k'};
  };

  G['fin_am_amortizacion_cuota_k']=function(diff){
    const VP=pick([5000000,10000000,20000000]);
    const rm=pick([0.008,0.01,0.012,0.015]);
    const n=pick([24,36,48]);
    const k=pick([1,2,3,6,12]);
    const PMT=Math.round(cuota(VP,rm,n));
    const saldo_ant=k===1?VP:Math.round(VP*Math.pow(1+rm,k-1)-PMT*(Math.pow(1+rm,k-1)-1)/rm);
    const interes_k=Math.round(saldo_ant*rm);
    const amort_k=PMT-interes_k;
    return {question:`Crédito de ${clp(VP)} a ${n} cuotas al ${pct(rm)}/mes (cuota: ${clp(PMT)}). ¿Cuánto se amortiza en la cuota ${k}?`,
      answer:clp(amort_k),
      hint:`Amortización_k = Cuota − Interés_k`,
      explanation:`Interés_${k}=${clp(interes_k)}. Amortización: ${clp(PMT)}−${clp(interes_k)}=${clp(amort_k)}`,
      topic:'fin_amortizacion',type:'amort_k'};
  };

  G['fin_am_intereses_totales']=function(diff){
    const VP=pick([3000000,5000000,10000000,20000000]);
    const rm=pick([0.008,0.01,0.012,0.015]);
    const n=pick([12,24,36,48]);
    const PMT=Math.round(cuota(VP,rm,n));
    const total=PMT*n;
    const intereses=total-VP;
    return {question:`Crédito de ${clp(VP)}, cuota mensual ${clp(PMT)} en ${n} meses. ¿Cuánto pagas en intereses en total?`,
      answer:clp(intereses),
      hint:`Intereses totales = Total pagado − Capital = (Cuota × n) − VP`,
      explanation:`${clp(PMT)} × ${n} = ${clp(total)}. Intereses: ${clp(total)}−${clp(VP)}=${clp(intereses)}`,
      topic:'fin_amortizacion',type:'intereses_totales'};
  };

  G['fin_am_hipotecario']=function(diff){
    const uf_valor=38000;
    const ufs=pick([1000,1500,2000,2500,3000,4000]);
    const VP=ufs*uf_valor;
    const r_uf=pick([0.03,0.035,0.04,0.045,0.05]);
    const rm=r4(Math.pow(1+r_uf,1/12)-1);
    const n=pick([180,240,300,360]);
    const PMT_uf=r2(cuota(ufs,rm,n));
    const PMT_clp=Math.round(PMT_uf*uf_valor);
    return {question:`Crédito hipotecario de ${ufs} UF a ${pct(r_uf)} anual en UF, en ${n} cuotas. ¿Cuánto es la cuota mensual en UF? (UF ≈ ${clp(uf_valor)})`,
      answer:PMT_uf+' UF',
      hint:`r_m_UF = (1+${r_uf})^(1/12)−1. Cuota = VP_UF × r_m(1+r_m)^n/[(1+r_m)^n−1]`,
      explanation:`Cuota: ${PMT_uf} UF ≈ ${clp(PMT_clp)}`,
      topic:'fin_amortizacion',type:'hipotecario'};
  };

  G['fin_am_prepago']=function(diff){
    const VP=pick([5000000,10000000,20000000]);
    const rm=pick([0.008,0.01,0.012,0.015]);
    const n=pick([24,36,48]);
    const k_pagadas=pick([6,12]);
    const PMT=Math.round(cuota(VP,rm,n));
    const saldo=Math.round(VP*Math.pow(1+rm,k_pagadas)-PMT*(Math.pow(1+rm,k_pagadas)-1)/rm);
    return {question:`Crédito de ${clp(VP)}, ${n} cuotas al ${pct(rm)}/mes. Después de ${k_pagadas} cuotas, ¿cuánto debes para liquidar la deuda?`,
      answer:clp(saldo),
      hint:`El saldo insoluto después de k cuotas es: VP(1+r)^k − PMT×[(1+r)^k−1]/r`,
      explanation:`Saldo después de ${k_pagadas} cuotas: ${clp(saldo)}`,
      topic:'fin_amortizacion',type:'prepago'};
  };

  G['fin_am_plazo_cuota']=function(diff){
    const VP=pick([3000000,5000000,10000000]);
    const rm=pick([0.008,0.01,0.012,0.015]);
    const PMTs=[200000,300000,500000,1000000];
    const PMT=pick(PMTs);
    if(PMT<=VP*rm) return G['fin_am_cuota_credito'](diff);
    const n=Math.ceil(Math.log(PMT/(PMT-VP*rm))/Math.log(1+rm));
    return {question:`Préstamo de ${clp(VP)} al ${pct(rm)}/mes con cuota mensual de ${clp(PMT)}. ¿En cuántas cuotas lo pagas?`,
      answer:n+' cuotas',
      hint:`n = ln(PMT/(PMT−VP·r)) / ln(1+r)`,
      explanation:`n = ln(${PMT}/(${PMT}−${VP*rm})) / ln(${r2(1+rm)}) = ${n} cuotas`,
      topic:'fin_amortizacion',type:'plazo'};
  };

  G['fin_am_comparar_creditos']=function(diff){
    const VP=pick([3000000,5000000,10000000]);
    const rA=pick([0.008,0.01,0.012]);
    const nA=pick([24,36]);
    const rB=pick([0.005,0.006,0.008]);
    const nB=nA*2;
    const PMTA=Math.round(cuota(VP,rA,nA));
    const PMTB=Math.round(cuota(VP,rB,nB));
    const totalA=PMTA*nA, totalB=PMTB*nB;
    const mejor=totalA<totalB?'A':'B';
    return {question:`Crédito ${clp(VP)}: Banco A: ${pct(rA)}/mes, ${nA} cuotas (${clp(PMTA)}/mes). Banco B: ${pct(rB)}/mes, ${nB} cuotas (${clp(PMTB)}/mes). ¿Cuál paga menos en total?`,
      answer:'Banco '+mejor,
      hint:`Compara el total pagado: A=${clp(totalA)}, B=${clp(totalB)}.`,
      explanation:`Total A: ${clp(totalA)}. Total B: ${clp(totalB)}. Banco ${mejor} paga menos.`,
      topic:'fin_amortizacion',type:'comparar'};
  };

  G['fin_am_tasa_cuota']=function(diff){
    return {question:'¿Qué indica que en las primeras cuotas de un crédito se paga más interés que capital?',
      answer:'es un sistema francés (cuota constante)',
      hint:'En el sistema francés, la cuota es fija pero la composición interés/capital varía.',
      explanation:'El sistema francés tiene cuota constante. Al inicio el saldo es alto → más intereses → menos amortización. Con el tiempo se invierte: se paga más capital y menos interés.',
      topic:'fin_amortizacion',type:'sistema_frances'};
  };

  window.MM_TOPIC_GENERATORS['fin_amortizacion']=[
    'fin_am_cuota_credito','fin_am_saldo_cuota_k','fin_am_interes_cuota_k','fin_am_amortizacion_cuota_k',
    'fin_am_intereses_totales','fin_am_hipotecario','fin_am_prepago','fin_am_plazo_cuota',
    'fin_am_comparar_creditos','fin_am_tasa_cuota'
  ];

  /* ═══════════════════════════════════════
     7. INFLACIÓN, UF E IPC
  ═══════════════════════════════════════ */
  G['fin_inf_ipc']=function(diff){
    const P0=pick([100000,200000,500000,1000000]);
    const inf=pick([3.5,4.0,4.5,5.0,6.0]);
    const P1=Math.round(P0*(1+inf/100));
    return {question:`Un bien cuesta ${clp(P0)}. Si el IPC sube ${inf}%, ¿cuánto costará?`,
      answer:clp(P1),
      hint:`Precio_nuevo = Precio_actual × (1 + IPC/100)`,
      explanation:`${clp(P0)} × ${r2(1+inf/100)} = ${clp(P1)}`,
      topic:'fin_inflacion',type:'ipc'};
  };

  G['fin_inf_poder_adquisitivo']=function(diff){
    const S=pick([500000,700000,900000,1200000]);
    const inf=pick([4.0,5.0,6.0,8.0]);
    const n=pick([2,3,5,10]);
    const S_real=Math.round(S/Math.pow(1+inf/100,n));
    return {question:`Tu sueldo es ${clp(S)} y NO se reajusta. Con inflación del ${inf}% anual, ¿cuánto valdrá en pesos de hoy en ${n} años?`,
      answer:clp(S_real),
      hint:`Poder adquisitivo = Sueldo / (1+inf)^n`,
      explanation:`${clp(S)} / ${r2(Math.pow(1+inf/100,n))} = ${clp(S_real)}`,
      topic:'fin_inflacion',type:'poder_adquisitivo'};
  };

  G['fin_inf_reajuste_uf']=function(diff){
    const uf_hoy=pick([37500,38000,38500,39000]);
    const ipc_mensual=pick([0.003,0.004,0.005,0.006]);
    const meses=pick([1,3,6,12]);
    const uf_futura=r2(uf_hoy*Math.pow(1+ipc_mensual,meses));
    return {question:`UF hoy: ${clp(uf_hoy)}. Si el IPC mensual es ${pct(ipc_mensual)}, ¿cuánto valdrá la UF en ${meses} mes(es)?`,
      answer:clp(uf_futura),
      hint:`UF_futura = UF_hoy × (1+IPC_mensual)^meses`,
      explanation:`${clp(uf_hoy)} × ${r4(Math.pow(1+ipc_mensual,meses))} = ${clp(uf_futura)}`,
      topic:'fin_inflacion',type:'uf_reajuste'};
  };

  G['fin_inf_deuda_uf']=function(diff){
    const deuda_uf=pick([500,1000,1500,2000]);
    const uf_inicio=pick([37000,38000,39000]);
    const ipc_anual=pick([4.0,5.0,6.0]);
    const n=pick([1,2,3]);
    const uf_final=r2(uf_inicio*Math.pow(1+ipc_anual/100,n));
    const deuda_clp_inicio=deuda_uf*uf_inicio;
    const deuda_clp_final=Math.round(deuda_uf*uf_final);
    return {question:`Deuda de ${deuda_uf} UF. Si la UF era ${clp(uf_inicio)} y el IPC es ${ipc_anual}% anual, ¿cuántos pesos es la deuda en ${n} año(s)?`,
      answer:clp(deuda_clp_final),
      hint:`UF_futura = ${clp(uf_inicio)} × (1+${ipc_anual/100})^${n} = ${clp(r2(uf_final))}`,
      explanation:`UF futura: ${clp(r2(uf_final))}. Deuda: ${deuda_uf} × ${clp(r2(uf_final))} = ${clp(deuda_clp_final)}`,
      topic:'fin_inflacion',type:'deuda_uf'};
  };

  G['fin_inf_variacion_ipc']=function(diff){
    const P0=pick([100,200,500,1000,2000]);
    const P1=P0*pick([1.03,1.04,1.05,1.06,1.08]);
    const ipc=r2((P1/P0-1)*100);
    return {question:`Una canasta de bienes pasó de ${clp(P0*1000)} a ${clp(Math.round(P1*1000))}. ¿Cuál es la variación del IPC?`,
      answer:ipc+'%',
      hint:`IPC = (P_final/P_inicial − 1) × 100`,
      explanation:`(${Math.round(P1*1000)}/${P0*1000} − 1) × 100 = ${ipc}%`,
      topic:'fin_inflacion',type:'variacion_ipc'};
  };

  G['fin_inf_salario_real']=function(diff){
    const s_nom=pick([500000,800000,1000000,1500000]);
    const r_aumento=pick([0.03,0.04,0.05,0.06]);
    const inf=pick([0.05,0.06,0.07,0.08]);
    const s_nuevo=Math.round(s_nom*(1+r_aumento));
    const s_real=Math.round(s_nom*(1+r_aumento)/(1+inf));
    const ganancia=r2((s_real/s_nom-1)*100);
    return {question:`Sueldo actual: ${clp(s_nom)}. Aumento del ${pct(r_aumento)}, inflación del ${pct(inf)}. ¿Cuánto ganas en términos reales?`,
      answer:clp(s_real)+' (${ganancia}% real)',
      hint:`Sueldo real = Sueldo_nuevo / (1+inflación)`,
      explanation:`Nuevo: ${clp(s_nuevo)}. Real: ${clp(s_nuevo)}/${r2(1+inf)}=${clp(s_real)}. Variación real: ${ganancia}%`,
      topic:'fin_inflacion',type:'salario_real'};
  };

  G['fin_inf_inversion_vs_inflacion']=function(diff){
    const P=pick([1000000,2000000,5000000]);
    const r=pick([0.04,0.05,0.06,0.08]);
    const inf=pick([0.04,0.05,0.06]);
    const conv=r>inf?'sí, supera la inflación':'no, pierde poder adquisitivo';
    return {question:`Tienes ${clp(P)} en un depósito al ${pct(r)} anual. La inflación es ${pct(inf)}. ¿Tu inversión mantiene poder adquisitivo?`,
      answer:conv,
      hint:`Si tasa_inversión > inflación → ganas en términos reales.`,
      explanation:`Tasa real = (1+${r})/(1+${inf})−1 = ${pct(r4((1+r)/(1+inf)-1))}. ${r>inf?'Positiva: sí conviene.':'Negativa: pierdes poder adquisitivo.'}`,
      topic:'fin_inflacion',type:'inversion_inflacion'};
  };

  G['fin_inf_precio_canasta']=function(diff){
    const base=100;
    const ipc_acum=pick([15,20,25,30,40]);
    const precio_actual=pick([500,800,1000,1500,2000]);
    const precio_hace=Math.round(precio_actual*100/(100+ipc_acum));
    return {question:`El IPC acumulado en ${pick([3,4,5,6])} años fue ${ipc_acum}%. Un producto cuesta hoy ${clp(precio_actual)}. ¿Cuánto costaba antes?`,
      answer:clp(precio_hace),
      hint:`Precio_anterior = Precio_actual / (1 + IPC_acumulado/100)`,
      explanation:`${clp(precio_actual)} / ${r2(1+ipc_acum/100)} = ${clp(precio_hace)}`,
      topic:'fin_inflacion',type:'precio_anterior'};
  };

  G['fin_inf_uf_cuota']=function(diff){
    const cuota_uf=pick([5,8,10,12,15,20]);
    const uf_valor=pick([37000,38000,38500,39000]);
    const cuota_clp=Math.round(cuota_uf*uf_valor);
    return {question:`Una cuota hipotecaria de ${cuota_uf} UF con la UF en ${clp(uf_valor)}. ¿Cuántos pesos es la cuota?`,
      answer:clp(cuota_clp),
      hint:`Cuota en pesos = cuota_UF × valor_UF`,
      explanation:`${cuota_uf} × ${clp(uf_valor)} = ${clp(cuota_clp)}`,
      topic:'fin_inflacion',type:'cuota_uf'};
  };

  G['fin_inf_tasa_real_fisher']=function(diff){
    const r_real=pick([0.02,0.03,0.04,0.05]);
    const inf=pick([0.03,0.04,0.05,0.06]);
    const r_nom=r4((1+r_real)*(1+inf)-1);
    return {question:`Con tasa real del ${pct(r_real)} e inflación del ${pct(inf)}, ¿cuál debe ser la tasa nominal? (Fisher)`,
      answer:pct(r_nom),
      hint:`r_nominal = (1+r_real)(1+π)−1`,
      explanation:`(1+${r_real})(1+${inf})−1 = ${r2(1+r_real)}×${r2(1+inf)}−1 = ${pct(r_nom)}`,
      topic:'fin_inflacion',type:'fisher'};
  };

  window.MM_TOPIC_GENERATORS['fin_inflacion']=[
    'fin_inf_ipc','fin_inf_poder_adquisitivo','fin_inf_reajuste_uf','fin_inf_deuda_uf',
    'fin_inf_variacion_ipc','fin_inf_salario_real','fin_inf_inversion_vs_inflacion',
    'fin_inf_precio_canasta','fin_inf_uf_cuota','fin_inf_tasa_real_fisher'
  ];

  /* ═══════════════════════════════════════
     8. AHORRO E INVERSIONES
  ═══════════════════════════════════════ */
  G['fin_ah_deposito_plazo']=function(diff){
    const P=pick([500000,1000000,2000000,5000000,10000000]);
    const r_anual=pick([0.04,0.05,0.055,0.06]);
    const dias=pick([30,60,90,180,270,365]);
    const r_periodo=r4(Math.pow(1+r_anual,dias/365)-1);
    const I=Math.round(P*r_periodo);
    return {question:`DAP de ${clp(P)} al ${pct(r_anual)} anual por ${dias} días. ¿Cuánto recibes de interés?`,
      answer:clp(I),
      hint:`I = P × [(1+r_a)^(días/365) − 1]`,
      explanation:`r_período = ${pct(r_periodo)}. I = ${clp(P)} × ${r_periodo} = ${clp(I)}`,
      topic:'fin_ahorro',type:'dap'};
  };

  G['fin_ah_rentabilidad']=function(diff){
    const P=pick([1000000,2000000,5000000,10000000]);
    const gain=pick([0.05,0.08,0.10,0.12,0.15,0.20]);
    const M=Math.round(P*(1+gain));
    return {question:`Invertiste ${clp(P)} y obtuviste ${clp(M)} al cabo de un año. ¿Cuál fue la rentabilidad?`,
      answer:pct(gain),
      hint:`Rentabilidad = (VF − VP) / VP × 100%`,
      explanation:`(${clp(M)}−${clp(P)})/\\(${clp(P)})\\×100 = ${pct(gain)}`,
      topic:'fin_ahorro',type:'rentabilidad'};
  };

  G['fin_ah_ahorro_programado']=function(diff){
    const PMT=pick([50000,100000,150000,200000]);
    const r_anual=pick([0.04,0.05,0.06,0.08]);
    const rm=r4(Math.pow(1+r_anual,1/12)-1);
    const n=pick([12,24,36,48,60]);
    const VF=Math.round(anVF(PMT,rm,n));
    const aportado=PMT*n;
    const ganado=VF-aportado;
    return {question:`Ahorro programado: ${clp(PMT)}/mes al ${pct(r_anual)} anual, ${n} meses. ¿Cuánto acumulas?`,
      answer:clp(VF),
      hint:`VF = PMT × [(1+r_m)^n−1]/r_m. r_m=${pct(rm)}`,
      explanation:`Aportado: ${clp(aportado)}. Intereses: ${clp(ganado)}. Total: ${clp(VF)}`,
      topic:'fin_ahorro',type:'ahorro_programado'};
  };

  G['fin_ah_roi']=function(diff){
    const inv=pick([1000000,2000000,5000000,10000000]);
    const retorno=pick([200000,400000,800000,1500000,2500000]);
    const roi=r2(retorno/inv*100);
    return {question:`Invertiste ${clp(inv)} y obtuviste ${clp(retorno)} de ganancia neta. ¿Cuál es el ROI?`,
      answer:roi+'%',
      hint:`ROI = Ganancia neta / Inversión × 100%`,
      explanation:`${clp(retorno)} / ${clp(inv)} × 100 = ${roi}%`,
      topic:'fin_ahorro',type:'roi'};
  };

  G['fin_ah_fondo_mutuo']=function(diff){
    const cuotas=pick([100,200,500,1000]);
    const vci=pick([1000,1500,2000,2500]);
    const vcf=pick([1050,1100,1200,1300,1400,1500]);
    const ganancia=Math.round(cuotas*(vcf-vci));
    const rentab=r2((vcf/vci-1)*100);
    return {question:`Compraste ${cuotas} cuotas de un fondo mutuo a ${clp(vci)} c/u. Ahora valen ${clp(vcf)}. ¿Cuánto ganaste?`,
      answer:clp(ganancia),
      hint:`Ganancia = cuotas × (valor_actual − valor_compra)`,
      explanation:`${cuotas} × (${clp(vcf)}−${clp(vci)}) = ${cuotas} × ${clp(vcf-vci)} = ${clp(ganancia)}. Rentabilidad: ${rentab}%`,
      topic:'fin_ahorro',type:'fondo_mutuo'};
  };

  G['fin_ah_meta_inversion']=function(diff){
    const meta=pick([5000000,10000000,20000000,30000000,50000000]);
    const r_anual=pick([0.05,0.06,0.08,0.10]);
    const n_anos=pick([5,10,15,20]);
    const P=Math.round(meta/Math.pow(1+r_anual,n_anos));
    return {question:`Para tener ${clp(meta)} en ${n_anos} años al ${pct(r_anual)} anual compuesto, ¿cuánto inviertes hoy?`,
      answer:clp(P),
      hint:`VP = VF / (1+r)^n`,
      explanation:`${clp(meta)} / ${r2(Math.pow(1+r_anual,n_anos))} = ${clp(P)}`,
      topic:'fin_ahorro',type:'meta'};
  };

  G['fin_ah_comparar_opciones']=function(diff){
    const P=pick([1000000,2000000,5000000]);
    const r1=pick([0.04,0.05,0.06]);
    const r2_=pick([0.06,0.07,0.08,0.09]);
    const n=pick([2,3,5]);
    const M1=Math.round(P*Math.pow(1+r1,n));
    const M2=Math.round(P*Math.pow(1+r2_,n));
    return {question:`Inversion de ${clp(P)} en ${n} años: Opción A al ${pct(r1)}, Opción B al ${pct(r2_)}. ¿Cuánto más gana B?`,
      answer:clp(M2-M1),
      hint:`Diferencia = M_B − M_A = ${clp(M2)} − ${clp(M1)}`,
      explanation:`A: ${clp(M1)}. B: ${clp(M2)}. Diferencia: ${clp(M2-M1)}`,
      topic:'fin_ahorro',type:'comparar'};
  };

  G['fin_ah_afp']=function(diff){
    const sueldo=pick([500000,800000,1000000,1500000,2000000]);
    const tasa_cot=pick([0.10,0.1027,0.1069]);
    const cot=Math.round(sueldo*tasa_cot);
    return {question:`Sueldo bruto: ${clp(sueldo)}. Cotización AFP: ${pct(tasa_cot)}. ¿Cuánto se cotiza al mes?`,
      answer:clp(cot),
      hint:`Cotización = Sueldo × tasa AFP`,
      explanation:`${clp(sueldo)} × ${tasa_cot} = ${clp(cot)}`,
      topic:'fin_ahorro',type:'afp'};
  };

  G['fin_ah_tasa_efectiva_inv']=function(diff){
    const P=pick([1000000,2000000,5000000]);
    const n=pick([1,2,3,4,5]);
    const M=Math.round(P*pick([1.04,1.05,1.06,1.08,1.10,1.12])*pick([1.04,1.05,1.06,1.08,1.10]));
    const r=r4(Math.pow(M/P,1/n)-1);
    return {question:`Invertiste ${clp(P)} y en ${n} años tienes ${clp(M)}. ¿Cuál fue la tasa de retorno anual?`,
      answer:pct(r),
      hint:`r = (M/P)^(1/n) − 1`,
      explanation:`(${clp(M)}/${clp(P)})^(1/${n})−1 = ${r2(M/P)}^(1/${n})−1 = ${pct(r)}`,
      topic:'fin_ahorro',type:'tasa_retorno'};
  };

  G['fin_ah_inversion_periodica']=function(diff){
    const PMT=pick([100000,200000,300000,500000]);
    const r_anual=pick([0.06,0.08,0.10,0.12]);
    const rm=r4(Math.pow(1+r_anual,1/12)-1);
    const anos=pick([5,10,15,20]);
    const n=anos*12;
    const VF=Math.round(anVF(PMT,rm,n));
    const aportado=PMT*n;
    return {question:`Inviertes ${clp(PMT)}/mes al ${pct(r_anual)} anual compuesto por ${anos} años. ¿Cuánto acumulas?`,
      answer:clp(VF),
      hint:`VF = PMT × [(1+r_m)^${n}−1]/r_m. Total aportado: ${clp(aportado)}.`,
      explanation:`Aportado: ${clp(aportado)}. Intereses: ${clp(VF-aportado)}. Total: ${clp(VF)}`,
      topic:'fin_ahorro',type:'inversion_periodica'};
  };

  window.MM_TOPIC_GENERATORS['fin_ahorro']=[
    'fin_ah_deposito_plazo','fin_ah_rentabilidad','fin_ah_ahorro_programado','fin_ah_roi',
    'fin_ah_fondo_mutuo','fin_ah_meta_inversion','fin_ah_comparar_opciones','fin_ah_afp',
    'fin_ah_tasa_efectiva_inv','fin_ah_inversion_periodica'
  ];

  /* ═══════════════════════════════════════
     9. VAN, TIR Y EVALUACIÓN DE PROYECTOS
  ═══════════════════════════════════════ */
  G['fin_pr_van_simple']=function(diff){
    const I0=pick([5000000,10000000,20000000]);
    const r=pick([0.08,0.10,0.12,0.15]);
    const n=pick([3,4,5]);
    const FC_anual=Math.round(I0*pick([0.25,0.30,0.35,0.40,0.50]));
    let van=-I0;
    for(let i=1;i<=n;i++) van+=FC_anual/Math.pow(1+r,i);
    van=Math.round(van);
    const conv=van>0?'conviene (VAN>0)':'no conviene (VAN<0)';
    return {question:`Proyecto: inversión ${clp(I0)}, flujos anuales ${clp(FC_anual)} por ${n} años, tasa ${pct(r)}. ¿Cuánto es el VAN?`,
      answer:clp(van),
      hint:`VAN = −I₀ + FC/(1+r) + FC/(1+r)² + ... = −${clp(I0)} + VP(anualidad)`,
      explanation:`VAN = ${clp(van)}. El proyecto ${conv}.`,
      topic:'fin_proyectos',type:'van'};
  };

  G['fin_pr_van_decision']=function(diff){
    const casos=[
      {van:5000000,desc:'VAN = $5.000.000'},
      {van:-3000000,desc:'VAN = −$3.000.000'},
      {van:0,desc:'VAN = $0'},
    ];
    const c=pick(casos);
    const dec=c.van>0?'aceptar':c.van<0?'rechazar':'indiferente';
    return {question:`Un proyecto tiene ${c.desc}. ¿La decisión es aceptar, rechazar o es indiferente?`,
      answer:dec,
      hint:'VAN > 0 → aceptar (crea valor). VAN < 0 → rechazar (destruye valor). VAN = 0 → indiferente.',
      explanation:`VAN=${c.desc}. Decisión: ${dec}. El VAN positivo significa que el proyecto rinde más que la tasa de descuento.`,
      topic:'fin_proyectos',type:'van_decision'};
  };

  G['fin_pr_tir_2periodos']=function(diff){
    const I0=pick([1000000,2000000,5000000]);
    const FC1=pick([600000,800000,1000000,1500000,2000000,4000000]);
    const FC2=Math.round(I0*pick([0.5,0.6,0.8,1.0]));
    // VAN = -I0 + FC1/(1+r) + FC2/(1+r)^2 = 0
    // Cuadrática en (1+r): FC2x^2 + FC1x - ... no limpio, usemos estimación
    // Para simplificar, generemos casos con TIR "redonda"
    const tirs=[0.10,0.12,0.15,0.20,0.25,0.30];
    const tir=pick(tirs);
    const FC2_clean=Math.round(I0*(1+tir)*(1+tir)-FC1*(1+tir));
    if(FC2_clean<=0) return G['fin_pr_van_simple'](diff);
    return {question:`Proyecto: −${clp(I0)} hoy, ${clp(FC1)} al año 1, ${clp(FC2_clean)} al año 2. ¿Cuál es la TIR?`,
      answer:pct(tir),
      hint:`TIR es la tasa r donde VAN=0: −${clp(I0)} + ${clp(FC1)}/(1+r) + ${clp(FC2_clean)}/(1+r)²=0`,
      explanation:`Con r=${pct(tir)}: VAN=0 ✓. TIR=${pct(tir)}`,
      topic:'fin_proyectos',type:'tir'};
  };

  G['fin_pr_payback']=function(diff){
    const I0=pick([10000000,20000000,30000000,50000000]);
    const FC_anual=pick([2000000,4000000,5000000,8000000,10000000]);
    const n=Math.ceil(I0/FC_anual);
    return {question:`Proyecto con inversión inicial ${clp(I0)} y flujos de ${clp(FC_anual)}/año. ¿Cuál es el período de recupero (payback)?`,
      answer:n+' años',
      hint:`Payback = Inversión / Flujo anual = ${clp(I0)} / ${clp(FC_anual)}`,
      explanation:`${clp(I0)} / ${clp(FC_anual)} = ${r2(I0/FC_anual)} → ${n} años`,
      topic:'fin_proyectos',type:'payback'};
  };

  G['fin_pr_flujo_caja']=function(diff){
    const I0=pick([10000000,20000000]);
    const fcs=[pick([3000000,4000000,5000000]),pick([4000000,5000000,6000000]),pick([5000000,6000000,8000000])];
    const acum=fcs.reduce((a,b)=>a+b,0);
    const flujo_neto=acum-I0;
    return {question:`Flujo de caja: Año 0: −${clp(I0)}, Año 1: +${clp(fcs[0])}, Año 2: +${clp(fcs[1])}, Año 3: +${clp(fcs[2])}. ¿Cuánto es el flujo de caja neto acumulado?`,
      answer:clp(flujo_neto),
      hint:`Flujo neto = suma de todos los flujos`,
      explanation:`−${clp(I0)}+${fcs.map(f=>clp(f)).join('+')} = ${clp(flujo_neto)}`,
      topic:'fin_proyectos',type:'flujo_caja'};
  };

  G['fin_pr_ir']=function(diff){
    const I0=pick([5000000,10000000,20000000]);
    const van=pick([500000,1000000,2000000,5000000]);
    const ir=r2((van+I0)/I0);
    return {question:`Proyecto: inversión ${clp(I0)}, VAN=${clp(van)}. ¿Cuál es el Índice de Rentabilidad (IR)?`,
      answer:ir.toString(),
      hint:`IR = (VAN + Inversión) / Inversión = VP de flujos / Inversión`,
      explanation:`IR = (${clp(van)}+${clp(I0)})/\\(${clp(I0)}) = ${clp(van+I0)}/\\(${clp(I0)}) = ${ir}`,
      topic:'fin_proyectos',type:'ir'};
  };

  G['fin_pr_tir_vs_r']=function(diff){
    const casos=[
      {tir:0.15,r:0.10,dec:'aceptar (TIR > costo capital)'},
      {tir:0.08,r:0.12,dec:'rechazar (TIR < costo capital)'},
      {tir:0.10,r:0.10,dec:'indiferente (TIR = costo capital)'},
    ];
    const c=pick(casos);
    return {question:`Un proyecto tiene TIR=${pct(c.tir)} y el costo de capital es ${pct(c.r)}. ¿La decisión es?`,
      answer:c.dec,
      hint:'TIR > costo de capital → aceptar. TIR < costo → rechazar.',
      explanation:c.dec,topic:'fin_proyectos',type:'tir_decision'};
  };

  G['fin_pr_sensibilidad']=function(diff){
    const I0=pick([10000000,20000000]);
    const FC=pick([3000000,4000000,5000000]);
    const r_base=pick([0.08,0.10,0.12]);
    const n=pick([4,5]);
    const van_base=Math.round(-I0+anVP(FC,r_base,n));
    const r_nuevo=r_base+pick([0.02,0.03,0.05]);
    const van_nuevo=Math.round(-I0+anVP(FC,r_nuevo,n));
    const cambio=r2((van_nuevo-van_base)/Math.abs(van_base)*100);
    return {question:`Proyecto VAN=${clp(van_base)} con tasa ${pct(r_base)}. Si la tasa sube a ${pct(r_nuevo)}, ¿cómo cambia el VAN?`,
      answer:'Nuevo VAN: '+clp(van_nuevo),
      hint:`Recalcula VP con la nueva tasa.`,
      explanation:`VAN base: ${clp(van_base)}. VAN nuevo: ${clp(van_nuevo)}. Cambio: ${cambio}%`,
      topic:'fin_proyectos',type:'sensibilidad'};
  };

  G['fin_pr_van_perpetuo']=function(diff){
    const I0=pick([10000000,20000000,50000000]);
    const FC=pick([1000000,2000000,3000000,5000000]);
    const r=pick([0.08,0.10,0.12,0.15]);
    const VP_FC=Math.round(FC/r);
    const van=VP_FC-I0;
    return {question:`Proyecto perpetuo: inversión ${clp(I0)}, flujo anual perpetuo ${clp(FC)}, tasa ${pct(r)}. ¿VAN?`,
      answer:clp(van),
      hint:`VP_flujos_perpetuos = FC/r. VAN = VP − Inversión.`,
      explanation:`VP = ${clp(FC)}/\\(${r}) = ${clp(VP_FC)}. VAN = ${clp(VP_FC)}−${clp(I0)} = ${clp(van)}`,
      topic:'fin_proyectos',type:'van_perpetuo'};
  };

  G['fin_pr_comparar_proyectos']=function(diff){
    const I=pick([10000000,20000000]);
    const vanA=pick([2000000,3000000,5000000]);
    const vanB=pick([1000000,2000000,4000000]);
    const mejor=vanA>vanB?'Proyecto A':'Proyecto B';
    return {question:`Proyecto A: VAN=${clp(vanA)}. Proyecto B: VAN=${clp(vanB)}. Ambos con la misma inversión de ${clp(I)}. ¿Cuál prefieres?`,
      answer:mejor,
      hint:'Con igual inversión y tasa, elegir el de mayor VAN.',
      explanation:`VAN_A=${clp(vanA)} vs VAN_B=${clp(vanB)}. ${mejor} crea más valor.`,
      topic:'fin_proyectos',type:'comparar'};
  };

  window.MM_TOPIC_GENERATORS['fin_proyectos']=[
    'fin_pr_van_simple','fin_pr_van_decision','fin_pr_tir_2periodos','fin_pr_payback',
    'fin_pr_flujo_caja','fin_pr_ir','fin_pr_tir_vs_r','fin_pr_sensibilidad',
    'fin_pr_van_perpetuo','fin_pr_comparar_proyectos'
  ];

  /* ═══════════════════════════════════════
     10. COMPARACIÓN DE ALTERNATIVAS
  ═══════════════════════════════════════ */
  G['fin_co_comprar_vs_arrendar']=function(diff){
    const arr_mensual=pick([300000,400000,500000,600000]);
    const anos=pick([5,10,15,20]);
    const total_arr=arr_mensual*12*anos;
    const precio_casa=pick([50000000,80000000,100000000,120000000]);
    const r=pick([0.06,0.08,0.10]);
    const valor_futuro_arr=Math.round(total_arr*(Math.pow(1+r,anos)-1)/anos/r*anos);
    return {question:`Arriendo: ${clp(arr_mensual)}/mes por ${anos} años = ${clp(total_arr)}. Casa: ${clp(precio_casa)}. ¿El arriendo es más o menos que el precio de la casa?`,
      answer:total_arr<precio_casa?'menos':'más',
      hint:'Compara total arriendo vs precio de compra.',
      explanation:`Total arriendo: ${clp(total_arr)}. Casa: ${clp(precio_casa)}. ${total_arr<precio_casa?'Arriendo = menos en pagos, pero sin activo al final.':'Arriendo supera el precio de la casa.'}`,
      topic:'fin_comparacion',type:'comprar_arrendar'};
  };

  G['fin_co_cae_comparacion']=function(diff){
    const monto=pick([3000000,5000000,10000000]);
    const caeA=pick([18,20,22,24]);
    const caeB=pick([12,14,15,16]);
    const mejor='Banco B (CAE '+caeB+'%)';
    return {question:`Para un crédito de ${clp(monto)}: Banco A CAE ${caeA}%, Banco B CAE ${caeB}%. ¿Cuál conviene?`,
      answer:mejor,
      hint:'Menor CAE = menor costo total real del crédito.',
      explanation:`CAE_A=${caeA}% > CAE_B=${caeB}%. ${mejor} es más barato.`,
      topic:'fin_comparacion',type:'cae'};
  };

  G['fin_co_contado_vs_credito']=function(diff){
    const precio=pick([500000,1000000,2000000,5000000]);
    const enganche=pick([0.0,0.10,0.20]);
    const rm=pick([0.012,0.015,0.018]);
    const n=pick([12,24,36]);
    const financiado=Math.round(precio*(1-enganche));
    const PMT=Math.round(cuota(financiado,rm,n));
    const total_credito=PMT*n+Math.round(precio*enganche);
    const sobrecosto=total_credito-precio;
    return {question:`Comprar ${clp(precio)} al contado vs. crédito (${n} cuotas de ${clp(PMT)}/mes + pie ${pct(enganche)}). ¿Cuánto más cuesta el crédito?`,
      answer:clp(sobrecosto),
      hint:`Total crédito = cuotas × n + pie. Sobrecosto = total − precio contado.`,
      explanation:`Total crédito: ${clp(total_credito)}. Diferencia: ${clp(sobrecosto)}`,
      topic:'fin_comparacion',type:'contado_credito'};
  };

  G['fin_co_prepago_conviene']=function(diff){
    const saldo=pick([3000000,5000000,10000000]);
    const rm=pick([0.012,0.015,0.018]);
    const n=pick([12,24,36]);
    const PMT=Math.round(cuota(saldo,rm,n));
    const total_sin=PMT*n;
    const total_con=saldo; // prepago total
    const ahorro=total_sin-total_con;
    return {question:`Saldo de crédito: ${clp(saldo)}, ${n} cuotas de ${clp(PMT)}/mes. Si prepagas hoy, ¿cuánto ahorras en intereses?`,
      answer:clp(ahorro),
      hint:`Ahorro = Total cuotas restantes − Saldo actual`,
      explanation:`Total restante: ${clp(total_sin)}. Prepago: ${clp(total_con)}. Ahorro: ${clp(ahorro)}`,
      topic:'fin_comparacion',type:'prepago'};
  };

  G['fin_co_leasing_vs_compra']=function(diff){
    const valor=pick([5000000,10000000,20000000]);
    const rm=pick([0.008,0.01,0.012]);
    const n=pick([36,48,60]);
    const PMT=Math.round(cuota(valor,rm,n));
    const total_leasing=PMT*n;
    const diferencia=total_leasing-valor;
    return {question:`Bien de ${clp(valor)}: Leasing con ${n} cuotas de ${clp(PMT)}/mes. ¿Cuánto más pagas con leasing vs compra directa?`,
      answer:clp(diferencia),
      hint:`Sobrecosto leasing = Total cuotas − Valor del bien`,
      explanation:`${clp(PMT)} × ${n} = ${clp(total_leasing)}. Diferencia: ${clp(diferencia)}`,
      topic:'fin_comparacion',type:'leasing'};
  };

  G['fin_co_inversion_tasa']=function(diff){
    const P=pick([1000000,2000000,5000000]);
    const opts=[
      {nombre:'DAP Banco Estado',r:0.05},
      {nombre:'Fondo Mutuo Renta Fija',r:0.07},
      {nombre:'Acciones',r:0.12},
    ];
    const n=pick([1,2,3,5]);
    const resultados=opts.map(o=>({...o,M:Math.round(P*Math.pow(1+o.r,n))}));
    const mejor=resultados.reduce((a,b)=>a.M>b.M?a:b);
    return {question:`Inviertes ${clp(P)} por ${n} años. Opción: ${opts.map(o=>o.nombre+' '+pct(o.r)).join(' | ')}. ¿Cuál rinde más en ${clp(mejor.M)}?`,
      answer:mejor.nombre,
      hint:'Mayor tasa = mayor rendimiento (pero también mayor riesgo).',
      explanation:resultados.map(o=>o.nombre+': '+clp(o.M)).join('. ')+'. Mayor: '+mejor.nombre,
      topic:'fin_comparacion',type:'inversion'};
  };

  G['fin_co_ahorro_vs_credito_rapido']=function(diff){
    const meta=pick([500000,1000000,2000000]);
    const r_ahorro=pick([0.005,0.006,0.008]);
    const r_credito=pick([0.012,0.015,0.018]);
    const n=pick([6,12,18]);
    const PMT_ahorro=Math.round(meta*r_ahorro/(Math.pow(1+r_ahorro,n)-1));
    const PMT_credito=Math.round(cuota(meta,r_credito,n));
    const diffAmt=PMT_credito-PMT_ahorro;
    return {question:`Meta ${clp(meta)} en ${n} meses. Ahorrar: ${clp(PMT_ahorro)}/mes. Crédito: ${clp(PMT_credito)}/mes. ¿Cuánto más cuesta el crédito por mes?`,
      answer:clp(diffAmt),
      hint:'Compara cuota de ahorro vs cuota de crédito mensual.',
      explanation:`Crédito: ${clp(PMT_credito)}. Ahorro: ${clp(PMT_ahorro)}. Diferencia: ${clp(diffAmt)}/mes`,
      topic:'fin_comparacion',type:'ahorro_credito'};
  };

  G['fin_co_cuotas_sin_interes']=function(diff){
    const precio=pick([100000,200000,500000,1000000]);
    const n=pick([3,6,12]);
    const cuota_nominal=Math.round(precio/n);
    const r_real=pick([0.015,0.02,0.025]);
    const VP_real=Math.round(cuota_nominal*(1-Math.pow(1+r_real,-n))/r_real);
    const sobreprecio=Math.round(precio-VP_real);
    return {question:`Un producto de ${clp(precio)} se ofrece en ${n} cuotas de ${clp(cuota_nominal)} "sin interés". Si tu tasa de descuento es ${pct(r_real)}/mes, ¿el precio real en VP es?`,
      answer:clp(VP_real),
      hint:`VP = cuota × [1−(1+r)^(-n)]/r`,
      explanation:`VP = ${clp(cuota_nominal)} × ${r4((1-Math.pow(1+r_real,-n))/r_real)} = ${clp(VP_real)}`,
      topic:'fin_comparacion',type:'cuotas_sin_interes'};
  };

  G['fin_co_fondos_comparar']=function(diff){
    const tipos=[
      {nombre:'Fondo A (conservador)',r:0.04},
      {nombre:'Fondo B (moderado)',r:0.07},
      {nombre:'Fondo C (agresivo)',r:0.12},
    ];
    const PMT=pick([100000,200000,300000]);
    const n=pick([60,120,180,240]);
    const rm_list=tipos.map(t=>r4(Math.pow(1+t.r,1/12)-1));
    const VFs=tipos.map((t,i)=>Math.round(anVF(PMT,rm_list[i],n)));
    const mejor=tipos[VFs.indexOf(Math.max(...VFs))];
    return {question:`Inviertes ${clp(PMT)}/mes por ${n} meses. ${tipos.map((t,i)=>`${t.nombre} ${pct(t.r)}/año → ${clp(VFs[i])}`).join(', ')}. ¿Cuál acumula más?`,
      answer:mejor.nombre,
      hint:'Mayor tasa anual = mayor acumulación (pero mayor riesgo).',
      explanation:`${mejor.nombre} acumula ${clp(Math.max(...VFs))}. Diferencia con el conservador: ${clp(Math.max(...VFs)-Math.min(...VFs))}`,
      topic:'fin_comparacion',type:'fondos'};
  };

  G['fin_co_decision_financiera']=function(diff){
    const casos=[
      {q:'Tienes un crédito al 20% anual y ahorros en un DAP al 5%. ¿Qué conviene hacer primero?','a':'pagar la deuda','e':'El costo de la deuda (20%) supera el rendimiento del ahorro (5%). Siempre paga primero la deuda más cara.'},
      {q:'Banco A: cuota $150.000/mes por 36 meses. Banco B: cuota $120.000/mes por 48 meses. ¿Cuál paga menos en total?','a':'Banco A','e':'A: 150.000×36=$5.400.000. B: 120.000×48=$5.760.000. A paga menos en total.'},
      {q:'VAN=+$2.000.000 con tasa de descuento 10%. ¿Qué pasa si la tasa de descuento sube a 15%?','a':'el VAN disminuye','e':'A mayor tasa de descuento, los flujos futuros valen menos en el presente → VAN baja.'},
    ];
    const c=pick(casos);
    return {question:c.q,answer:c.a,hint:'Usa los principios del valor del dinero en el tiempo.',explanation:c.e,
      topic:'fin_comparacion',type:'decision'};
  };

  window.MM_TOPIC_GENERATORS['fin_comparacion']=[
    'fin_co_comprar_vs_arrendar','fin_co_cae_comparacion','fin_co_contado_vs_credito',
    'fin_co_prepago_conviene','fin_co_leasing_vs_compra','fin_co_inversion_tasa',
    'fin_co_ahorro_vs_credito_rapido','fin_co_cuotas_sin_interes','fin_co_fondos_comparar',
    'fin_co_decision_financiera'
  ];

  console.log('[MM] generators-financiera.js cargado. Temas financieros:',
    Object.keys(window.MM_TOPIC_GENERATORS).filter(k=>k.startsWith('fin_')).length,
    '× 10 generadores = 100 ejercicios/temario');
})();
