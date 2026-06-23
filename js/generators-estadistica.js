/* ═══════════════════════════════════════════════════════
   GENERATORS-ESTADISTICA.JS — 8 temas × 10 generadores
   Estadística: descriptiva, gráficos, tendencia central,
   dispersión, posición, probabilidad, prob. compuesta,
   variables aleatorias y distribuciones
   ═══════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if(!window.MM_GENERATORS) window.MM_GENERATORS={};
  if(!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS={};
  const G=window.MM_GENERATORS;

  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const r2=x=>Math.round(x*100)/100;
  const r3=x=>Math.round(x*1000)/1000;
  const shuffle=a=>[...a].sort(()=>Math.random()-0.5);

  // Stats helpers
  function genData(n,min,max){return Array.from({length:n},()=>ri(min,max));}
  function sorted(a){return[...a].sort((x,y)=>x-y);}
  function sum(a){return a.reduce((s,v)=>s+v,0);}
  function mean(a){return sum(a)/a.length;}
  function median(a){const s=sorted(a),n=s.length;return n%2===0?(s[n/2-1]+s[n/2])/2:s[Math.floor(n/2)];}
  function mode(a){const freq={};let mx=0,mo=[];a.forEach(v=>{freq[v]=(freq[v]||0)+1;if(freq[v]>mx)mx=freq[v];});Object.keys(freq).forEach(k=>{if(freq[k]===mx)mo.push(Number(k));});return mo.sort((x,y)=>x-y);}
  function variance(a){const m=mean(a);return mean(a.map(v=>(v-m)**2));}
  function stddev(a){return Math.sqrt(variance(a));}
  function fact(n){return n<=1?1:n*fact(n-1);}
  function nCr(n,r){if(r>n)return 0;return fact(n)/(fact(r)*fact(n-r));}
  function nPr(n,r){return fact(n)/fact(n-r);}
  function quartile(a,q){const s=sorted(a),n=s.length;const pos=(q/4)*(n-1);const lo=Math.floor(pos),hi=Math.ceil(pos);return s[lo]+(s[hi]-s[lo])*(pos-lo);}

  /* ═══════════════════════════════════════
     1. ESTADÍSTICA DESCRIPTIVA
  ═══════════════════════════════════════ */
  G['est_desc_tipo_variable']=function(diff){
    const casos=[
      {var:'Colores favoritos de estudiantes',tipo:'cualitativa nominal'},
      {var:'Temperatura en grados Celsius',tipo:'cuantitativa continua'},
      {var:'Número de hermanos',tipo:'cuantitativa discreta'},
      {var:'Nivel de satisfacción (bajo/medio/alto)',tipo:'cualitativa ordinal'},
      {var:'Estatura en cm',tipo:'cuantitativa continua'},
      {var:'Nota en escala 1–7',tipo:'cuantitativa discreta'},
      {var:'País de nacimiento',tipo:'cualitativa nominal'},
    ];
    const c=pick(casos);
    return {question:`¿Qué tipo de variable es: "${c.var}"?`,answer:c.tipo,
      hint:'Variables cualitativas: categorías. Cuantitativas: números. Continua: mide. Discreta: cuenta.',
      explanation:`"${c.var}" es ${c.tipo}.`,topic:'est_descriptiva',type:'tipo_variable'};
  };

  G['est_desc_frecuencia_abs']=function(diff){
    const n=pick([20,25,30,40,50]);
    const cats=pick([['A','B','C'],['Rojo','Azul','Verde'],['Sí','No','NS']]);
    const f1=ri(3,n-6), f2=ri(3,n-f1-3), f3=n-f1-f2;
    const cat=pick([0,1,2]);
    const freqs=[f1,f2,f3];
    return {question:`En una encuesta de ${n} personas, ${f1} eligieron "${cats[0]}", ${f2} "${cats[1]}" y ${f3} "${cats[2]}". ¿Cuál es la frecuencia absoluta de "${cats[cat]}"?`,
      answer:`${freqs[cat]}`,hint:'La frecuencia absoluta es el conteo directo de casos.',
      explanation:`La frecuencia de "${cats[cat]}" es ${freqs[cat]}.`,topic:'est_descriptiva',type:'freq_abs'};
  };

  G['est_desc_frecuencia_relativa']=function(diff){
    const n=pick([20,25,40,50,100]);
    const f=ri(2,n-2);
    const fr=r2(f/n);
    const pct=r2(f/n*100);
    return {question:`De ${n} estudiantes, ${f} aprobaron. ¿Cuál es la frecuencia relativa de aprobados?`,
      answer:`${fr}`,hint:'Frecuencia relativa = frecuencia absoluta / total.',
      explanation:`f_r = ${f}/${n} = ${fr} (equivale al ${pct}%)`,topic:'est_descriptiva',type:'freq_rel'};
  };

  G['est_desc_frecuencia_acumulada']=function(diff){
    const fs=[ri(3,8),ri(3,8),ri(3,8),ri(3,8)];
    const n=sum(fs);
    const idx=pick([1,2,3]);
    const acc=sum(fs.slice(0,idx+1));
    return {question:`Frecuencias: ${fs.join(', ')} (de 4 categorías). ¿Cuál es la frecuencia acumulada hasta la categoría ${idx+1}?`,
      answer:`${acc}`,hint:'Suma las frecuencias hasta la categoría indicada.',
      explanation:`${fs.slice(0,idx+1).join(' + ')} = ${acc}`,topic:'est_descriptiva',type:'freq_acc'};
  };

  G['est_desc_porcentaje']=function(diff){
    const n=pick([50,100,200,400,500]);
    const f=ri(5,n-5);
    const pct=r2(f/n*100);
    return {question:`Si hay ${f} casos de un total de ${n}, ¿qué porcentaje representa?`,
      answer:`${pct}%`,hint:'Porcentaje = (frecuencia / total) × 100',
      explanation:`(${f}/${n}) × 100 = ${pct}%`,topic:'est_descriptiva',type:'porcentaje'};
  };

  G['est_desc_total_desde_tabla']=function(diff){
    const fs=[ri(4,15),ri(4,15),ri(4,15),ri(4,15)];
    const n=sum(fs);
    return {question:`Una tabla tiene las frecuencias: ${fs.join(', ')}. ¿Cuál es el total de datos?`,
      answer:`${n}`,hint:'El total es la suma de todas las frecuencias.',
      explanation:`${fs.join(' + ')} = ${n}`,topic:'est_descriptiva',type:'total'};
  };

  G['est_desc_amplitud_clase']=function(diff){
    const li=ri(0,10), ls=li+pick([5,10,15,20,25]);
    const amp=ls-li;
    return {question:`Un intervalo de clase va de ${li} a ${ls}. ¿Cuál es la amplitud de clase?`,
      answer:`${amp}`,hint:'Amplitud = límite superior − límite inferior.',
      explanation:`${ls} − ${li} = ${amp}`,topic:'est_descriptiva',type:'amplitud'};
  };

  G['est_desc_marca_clase']=function(diff){
    const li=ri(0,10), ls=li+pick([5,10,15,20]);
    const mc=(li+ls)/2;
    return {question:`Halla la marca de clase (punto medio) del intervalo [${li}, ${ls}].`,
      answer:`${mc}`,hint:'Marca de clase = (límite inferior + límite superior) / 2.',
      explanation:`(${li} + ${ls}) / 2 = ${mc}`,topic:'est_descriptiva',type:'marca_clase'};
  };

  G['est_desc_n_desde_frecuencia_relativa']=function(diff){
    const ns=[20,25,40,50,100];
    const n=pick(ns);
    const f=ri(2,n-2);
    const fr=r3(f/n);
    return {question:`Si la frecuencia relativa de un evento es ${fr} y el total es ${n}, ¿cuántos casos hay?`,
      answer:`${f}`,hint:'Frecuencia absoluta = frecuencia relativa × total.',
      explanation:`${fr} × ${n} = ${r2(fr*n)} ≈ ${f}`,topic:'est_descriptiva',type:'n_desde_fr'};
  };

  G['est_desc_frecuencia_relativa_acumulada']=function(diff){
    const n=pick([50,100,200]);
    const fs=[ri(5,30),ri(5,30),ri(5,30)];
    const total=sum(fs)+ri(5,n-sum(fs));
    const fr_acc=r2(sum(fs)/total);
    return {question:`Primeras 3 frecuencias: ${fs.join(', ')} (total n=${total}). ¿Cuál es la frecuencia relativa acumulada hasta la 3ª categoría?`,
      answer:`${r2(sum(fs)/total)}`,hint:'f.r.acc = suma de frecuencias absolutas / total.',
      explanation:`(${sum(fs)})/${total} = ${r2(sum(fs)/total)}`,topic:'est_descriptiva',type:'fr_acc'};
  };

  window.MM_TOPIC_GENERATORS['est_descriptiva']=[
    'est_desc_tipo_variable','est_desc_frecuencia_abs','est_desc_frecuencia_relativa',
    'est_desc_frecuencia_acumulada','est_desc_porcentaje','est_desc_total_desde_tabla',
    'est_desc_amplitud_clase','est_desc_marca_clase','est_desc_n_desde_frecuencia_relativa',
    'est_desc_frecuencia_relativa_acumulada'
  ];

  /* ═══════════════════════════════════════
     2. GRÁFICOS ESTADÍSTICOS
  ═══════════════════════════════════════ */
  G['est_gra_barras_lectura']=function(diff){
    const cats=['Matemática','Lenguaje','Historia','Ciencias','Arte'];
    const vals=cats.map(()=>ri(5,50));
    const idx=ri(0,cats.length-1);
    return {question:`Un gráfico de barras muestra: ${cats.map((c,i)=>c+'='+vals[i]).join(', ')}. ¿Cuántos estudiantes prefieren ${cats[idx]}?`,
      answer:`${vals[idx]}`,hint:'Lee directamente el valor de la barra indicada.',
      explanation:`La barra de "${cats[idx]}" tiene valor ${vals[idx]}.`,topic:'est_graficos',type:'barras_lectura'};
  };

  G['est_gra_barras_mayor']=function(diff){
    const cats=['Lunes','Martes','Miércoles','Jueves','Viernes'];
    const vals=cats.map(()=>ri(10,80));
    const maxVal=Math.max(...vals), maxCat=cats[vals.indexOf(maxVal)];
    return {question:`Ventas por día: ${cats.map((c,i)=>c+'='+vals[i]).join(', ')}. ¿Qué día se vendió más?`,
      answer:maxCat,hint:'Busca el valor máximo en el gráfico.',
      explanation:`${maxCat} tiene la mayor venta: ${maxVal}.`,topic:'est_graficos',type:'barras_mayor'};
  };

  G['est_gra_circular_angulo']=function(diff){
    const pct=pick([10,15,20,25,30,40,50]);
    const ang=r2(pct*3.6);
    return {question:`En un gráfico circular, una categoría representa el ${pct}% del total. ¿Cuántos grados le corresponden?`,
      answer:`${ang}°`,hint:'Ángulo = porcentaje × 3.6 (pues 360° = 100%).',
      explanation:`${pct}% × 3.6 = ${ang}°`,topic:'est_graficos',type:'circular_angulo'};
  };

  G['est_gra_circular_porcentaje']=function(diff){
    const ang=pick([36,72,90,108,144,180]);
    const pct=r2(ang/3.6);
    return {question:`Un sector circular tiene ${ang}°. ¿Qué porcentaje del total representa?`,
      answer:`${pct}%`,hint:'Porcentaje = ángulo / 3.6 (pues 360° = 100%).',
      explanation:`${ang}° ÷ 3.6 = ${pct}%`,topic:'est_graficos',type:'circular_pct'};
  };

  G['est_gra_histograma_clase']=function(diff){
    const li=ri(0,15)*5, amp=pick([5,10,15]);
    const ls=li+amp;
    const f=ri(5,30);
    return {question:`En un histograma, la barra del intervalo [${li}, ${ls}] tiene altura ${f}. ¿Cuántos datos caen en esa clase?`,
      answer:`${f}`,hint:'En un histograma, la altura (frecuencia) = cantidad de datos en esa clase.',
      explanation:`La clase [${li}, ${ls}] contiene ${f} datos.`,topic:'est_graficos',type:'histograma'};
  };

  G['est_gra_comparar']=function(diff){
    const c1='Grupo A', c2='Grupo B';
    const v1=ri(10,50), v2=ri(10,50);
    const mayor=v1>v2?c1:v1<v2?c2:'empatan';
    return {question:`${c1} obtuvo ${v1} puntos y ${c2} obtuvo ${v2}. ¿Cuál tiene mayor puntaje?`,
      answer:mayor,hint:'Compara directamente los valores.',
      explanation:`${v1} vs ${v2}: ${mayor==='empatan'?'son iguales':mayor+' es mayor'}.`,topic:'est_graficos',type:'comparar'};
  };

  G['est_gra_total_desde_barras']=function(diff){
    const n=ri(3,5);
    const vals=Array.from({length:n},()=>ri(10,40));
    const total=sum(vals);
    return {question:`Un gráfico de barras muestra: ${vals.join(', ')}. ¿Cuántos datos hay en total?`,
      answer:`${total}`,hint:'El total es la suma de todas las barras.',
      explanation:`${vals.join(' + ')} = ${total}`,topic:'est_graficos',type:'total_barras'};
  };

  G['est_gra_angulo_desde_frecuencia']=function(diff){
    const n=pick([20,50,100,200]);
    const f=ri(2,n-2);
    const ang=r2(f/n*360);
    return {question:`De ${n} datos, ${f} corresponden a una categoría. ¿Cuántos grados ocupa en un gráfico circular?`,
      answer:`${ang}°`,hint:'Ángulo = (frecuencia / total) × 360°.',
      explanation:`(${f}/${n}) × 360 = ${ang}°`,topic:'est_graficos',type:'angulo_desde_f'};
  };

  G['est_gra_frecuencia_desde_angulo']=function(diff){
    const n=pick([50,100,200]);
    const ang=pick([36,45,60,72,90,120]);
    const f=Math.round(ang/360*n);
    return {question:`Un sector de ${ang}° en un gráfico circular, total ${n} datos. ¿Cuántos datos representa?`,
      answer:`${f}`,hint:'Frecuencia = (ángulo / 360) × total.',
      explanation:`(${ang}/360) × ${n} = ${f}`,topic:'est_graficos',type:'f_desde_angulo'};
  };

  G['est_gra_interpretacion']=function(diff){
    const tipos=[
      {q:'¿Qué tipo de gráfico es mejor para mostrar la distribución de frecuencias de datos continuos?','a':'histograma','e':'El histograma agrupa datos continuos en intervalos (clases) y muestra su frecuencia.'},
      {q:'¿Qué gráfico sirve para comparar proporciones de un todo?','a':'gráfico circular (torta)','e':'El gráfico circular muestra partes de un total (100%).'},
      {q:'¿Qué gráfico sirve para comparar categorías entre sí?','a':'gráfico de barras','e':'El gráfico de barras facilita la comparación entre categorías.'},
    ];
    const c=pick(tipos);
    return {question:c.q,answer:c.a,hint:'Piensa qué información quieres transmitir.',explanation:c.e,
      topic:'est_graficos',type:'interpretacion'};
  };

  window.MM_TOPIC_GENERATORS['est_graficos']=[
    'est_gra_barras_lectura','est_gra_barras_mayor','est_gra_circular_angulo',
    'est_gra_circular_porcentaje','est_gra_histograma_clase','est_gra_comparar',
    'est_gra_total_desde_barras','est_gra_angulo_desde_frecuencia',
    'est_gra_frecuencia_desde_angulo','est_gra_interpretacion'
  ];

  /* ═══════════════════════════════════════
     3. MEDIDAS DE TENDENCIA CENTRAL
  ═══════════════════════════════════════ */
  G['est_ten_media_simple']=function(diff){
    const ns={easy:4,medio:5,dificil:6,experto:7};
    const n=ns[diff]||5;
    const data=genData(n,1,30);
    const m=r2(mean(data));
    return {question:`Calcula la media de: \\(${data.join(', ')}\\).`,
      answer:`${m}`,hint:'Suma todos los datos y divide entre la cantidad.',
      explanation:`(${data.join('+')})/\\(${n}\\) = ${sum(data)}/${n} = ${m}`,
      topic:'est_tendencia',type:'media'};
  };

  G['est_ten_media_ponderada']=function(diff){
    const notas=[ri(4,7),ri(4,7),ri(4,7)];
    const pesos=[ri(1,3),ri(1,3),ri(1,3)];
    const totalPeso=sum(pesos);
    const mp=r2(sum(notas.map((n,i)=>n*pesos[i]))/totalPeso);
    return {question:`Notas: ${notas.join(', ')} con pesos ${pesos.join(', ')}. ¿Cuál es la media ponderada?`,
      answer:`${mp}`,hint:'Media ponderada = Σ(nota × peso) / Σ(pesos).',
      explanation:`(${notas.map((n,i)=>n+'×'+pesos[i]).join('+')}) / ${totalPeso} = ${r2(sum(notas.map((n,i)=>n*pesos[i])))}/${totalPeso} = ${mp}`,
      topic:'est_tendencia',type:'media_ponderada'};
  };

  G['est_ten_mediana_impar']=function(diff){
    const ns={easy:5,medio:7,dificil:9,experto:11};
    const n=ns[diff]||7;
    const data=genData(n,1,30);
    const med=median(data);
    const pos=Math.floor(n/2)+1;
    return {question:`Halla la mediana de: \\(${shuffle(data).join(', ')}\\).`,
      answer:`${med}`,hint:`Ordena de menor a mayor. Con ${n} datos (impar), la mediana es el dato en posición ${pos}.`,
      explanation:`Ordenados: ${sorted(data).join(', ')}. Mediana (pos. ${pos}): ${med}`,
      topic:'est_tendencia',type:'mediana_impar'};
  };

  G['est_ten_mediana_par']=function(diff){
    const ns={easy:4,medio:6,dificil:8,experto:10};
    const n=ns[diff]||6;
    const data=genData(n,1,30);
    const s=sorted(data);
    const med=median(data);
    const p1=n/2, p2=n/2+1;
    return {question:`Halla la mediana de: \\(${shuffle(data).join(', ')}\\).`,
      answer:`${med}`,hint:`Con ${n} datos (par), la mediana es el promedio de los datos en posiciones ${p1} y ${p2}.`,
      explanation:`Ordenados: ${s.join(', ')}. Mediana = (${s[n/2-1]}+${s[n/2]})/2 = ${med}`,
      topic:'est_tendencia',type:'mediana_par'};
  };

  G['est_ten_moda']=function(diff){
    const base=genData(5,1,10);
    const repeated=pick(base);
    const data=shuffle([...base,repeated,repeated]);
    const mo=mode(data);
    return {question:`Halla la moda de: \\(${data.join(', ')}\\).`,
      answer:`${mo.join(', ')}`,hint:'La moda es el valor que más se repite.',
      explanation:`${repeated} aparece más veces. Moda: ${mo.join(', ')}`,
      topic:'est_tendencia',type:'moda'};
  };

  G['est_ten_moda_bimodal']=function(diff){
    const v1=ri(1,5), v2=ri(6,10);
    const data=shuffle([v1,v1,v2,v2,ri(1,10),ri(1,10)]);
    return {question:`¿Cuáles son las modas de: \\(${data.join(', ')}\\)?`,
      answer:`${Math.min(v1,v2)} y ${Math.max(v1,v2)}`,hint:'Si hay dos valores que se repiten igual cantidad de veces, hay dos modas (distribución bimodal).',
      explanation:`${v1} y ${v2} aparecen dos veces cada uno → bimodal.`,
      topic:'est_tendencia',type:'bimodal'};
  };

  G['est_ten_valor_faltante_media']=function(diff){
    const n=pick([4,5,6]);
    const data=genData(n-1,5,20);
    const targetMean=ri(8,18);
    const missing=targetMean*n-sum(data);
    if(missing<0||missing>30) return G['est_ten_media_simple'](diff);
    return {question:`Se necesita que ${n} datos tengan media ${targetMean}. Los primeros son: ${data.join(', ')}. ¿Cuál debe ser el dato faltante?`,
      answer:`${missing}`,hint:`Valor faltante = (media × n) − suma de datos conocidos = ${targetMean}×${n}−${sum(data)}`,
      explanation:`${targetMean}×${n}−${sum(data)} = ${missing}`,topic:'est_tendencia',type:'valor_faltante'};
  };

  G['est_ten_comparar_medidas']=function(diff){
    const casos=[
      {q:'En un dataset con valores extremos muy altos, ¿qué medida de tendencia central es más representativa?','a':'mediana','e':'La mediana no se ve afectada por valores extremos (outliers).'},
      {q:'¿Qué medida de tendencia central es la única que aplica a datos cualitativos?','a':'moda','e':'La moda es simplemente el valor más frecuente; no requiere operaciones numéricas.'},
      {q:'Para calcular el promedio de temperaturas de un mes, ¿qué medida se usa?','a':'media','e':'La media aritmética es la medida estándar para datos numéricos sin outliers.'},
    ];
    const c=pick(casos);
    return {question:c.q,answer:c.a,hint:'Piensa en las propiedades de cada medida.',explanation:c.e,
      topic:'est_tendencia',type:'comparar'};
  };

  G['est_ten_media_desde_frecuencia']=function(diff){
    const vals=[ri(1,5),ri(6,10),ri(11,15)];
    const freqs=[ri(2,8),ri(2,8),ri(2,8)];
    const n=sum(freqs);
    const m=r2(sum(vals.map((v,i)=>v*freqs[i]))/n);
    return {question:`Tabla de frecuencias: valores ${vals.join(', ')} con frecuencias ${freqs.join(', ')}. ¿Cuál es la media?`,
      answer:`${m}`,hint:'Media = Σ(valor × frecuencia) / Σ(frecuencias).',
      explanation:`(${vals.map((v,i)=>v+'×'+freqs[i]).join('+')})/\\(${n}\\) = ${r2(sum(vals.map((v,i)=>v*freqs[i])))}/${n} = ${m}`,
      topic:'est_tendencia',type:'media_frecuencia'};
  };

  G['est_ten_efecto_outlier']=function(diff){
    const data=[ri(10,20),ri(10,20),ri(10,20),ri(10,20),ri(10,20)];
    const outlier=pick([100,200,500]);
    const conOutlier=r2(mean([...data,outlier]));
    const sinOutlier=r2(mean(data));
    return {question:`Datos: ${data.join(', ')}. Si se agrega el valor ${outlier}, ¿la media sube o baja?`,
      answer:'sube',hint:'Un valor extremo alto siempre eleva la media.',
      explanation:`Media sin outlier: ${sinOutlier}. Con ${outlier}: ${conOutlier}. La media sube.`,
      topic:'est_tendencia',type:'outlier'};
  };

  window.MM_TOPIC_GENERATORS['est_tendencia']=[
    'est_ten_media_simple','est_ten_media_ponderada','est_ten_mediana_impar',
    'est_ten_mediana_par','est_ten_moda','est_ten_moda_bimodal',
    'est_ten_valor_faltante_media','est_ten_comparar_medidas',
    'est_ten_media_desde_frecuencia','est_ten_efecto_outlier'
  ];

  /* ═══════════════════════════════════════
     4. MEDIDAS DE DISPERSIÓN
  ═══════════════════════════════════════ */
  G['est_dis_rango']=function(diff){
    const ns={easy:4,medio:5,dificil:6,experto:8};
    const data=genData(ns[diff]||5,1,40);
    const rango=Math.max(...data)-Math.min(...data);
    return {question:`Halla el rango de: \\(${data.join(', ')}\\).`,
      answer:`${rango}`,hint:'Rango = valor máximo − valor mínimo.',
      explanation:`\\(${Math.max(...data)} − ${Math.min(...data)} = ${rango}\\)`,
      topic:'est_dispersion',type:'rango'};
  };

  G['est_dis_varianza']=function(diff){
    const ns={easy:3,medio:4,dificil:5,experto:5};
    const data=genData(ns[diff]||4,1,15);
    const m=r2(mean(data));
    const v=r2(variance(data));
    return {question:`Calcula la varianza de: \\(${data.join(', ')}\\) (varianza poblacional).`,
      answer:`${v}`,hint:'Varianza = promedio de los cuadrados de las desviaciones respecto a la media.',
      explanation:`Media=${m}. Desv. cuadradas: ${data.map(x=>r2((x-m)**2)).join(', ')}. Varianza=${v}`,
      topic:'est_dispersion',type:'varianza'};
  };

  G['est_dis_desv_estandar']=function(diff){
    const ns={easy:4,medio:5,dificil:5,experto:6};
    const data=genData(ns[diff]||5,1,20);
    const s=r2(stddev(data));
    const m=r2(mean(data));
    return {question:`Calcula la desviación estándar de: \\(${data.join(', ')}\\).`,
      answer:`${s}`,hint:'Desviación estándar = √varianza. Mide cuánto se alejan los datos de la media.',
      explanation:`Media=${m}. Varianza=${r2(variance(data))}. σ=√${r2(variance(data))}≈${s}`,
      topic:'est_dispersion',type:'desv_estandar'};
  };

  G['est_dis_interpretar_sigma']=function(diff){
    const m=ri(50,80), s=ri(5,15);
    const casos=[
      {q:`Si μ=${m} y σ=${s}, el intervalo [${m-s}, ${m+s}] contiene aproximadamente el ___% de los datos en una distribución normal.`,'a':'68%','e':'Regla empírica: μ±σ contiene el 68% de los datos.'},
      {q:`Si μ=${m} y σ=${s}, ¿qué porcentaje de datos cae dentro de [${m-2*s}, ${m+2*s}]?`,'a':'95%','e':'Regla empírica: μ±2σ contiene el 95% de los datos.'},
      {q:`Si μ=${m} y σ=${s}, ¿qué porcentaje de datos cae dentro de [${m-3*s}, ${m+3*s}]?`,'a':'99.7%','e':'Regla 68-95-99.7: μ±3σ contiene el 99.7% de los datos.'},
    ];
    const c=pick(casos);
    return {question:c.q,answer:c.a,hint:'Recuerda la regla empírica: 68-95-99.7.',explanation:c.e,
      topic:'est_dispersion',type:'interpretar_sigma'};
  };

  G['est_dis_zscore']=function(diff){
    const m=pick([50,60,70,100,200]);
    const s=pick([5,10,15,20]);
    const x=m+s*pick([-2,-1,0,1,2]);
    const z=(x-m)/s;
    return {question:`Si \\(\\mu=${m}\\) y \\(\\sigma=${s}\\), ¿cuál es el puntaje Z para \\(x=${x}\\)?`,
      answer:`${z}`,hint:'\\(Z=\\frac{x-\\mu}{\\sigma}\\)',
      explanation:`\\(Z=\\frac{${x}-${m}}{${s}}=\\frac{${x-m}}{${s}}=${z}\\)`,
      topic:'est_dispersion',type:'zscore'};
  };

  G['est_dis_coef_variacion']=function(diff){
    const m=ri(20,100), s=ri(2,20);
    const cv=r2(s/m*100);
    return {question:`Si la media es ${m} y la desviación estándar es ${s}, ¿cuál es el coeficiente de variación (CV)?`,
      answer:`${cv}%`,hint:'CV = (σ/μ) × 100%.',
      explanation:`CV = (${s}/${m}) × 100 = ${cv}%`,topic:'est_dispersion',type:'cv'};
  };

  G['est_dis_comparar_dispersiones']=function(diff){
    const s1=ri(2,8), s2=ri(10,20);
    const m=ri(30,70);
    return {question:`Dos grupos tienen la misma media (${m}), pero σ₁=${s1} y σ₂=${s2}. ¿Cuál grupo es más homogéneo?`,
      answer:'Grupo 1',hint:'Menor desviación estándar = más homogéneo (datos más cercanos a la media).',
      explanation:`σ₁=${s1} < σ₂=${s2}: el Grupo 1 tiene menor dispersión → más homogéneo.`,
      topic:'est_dispersion',type:'comparar'};
  };

  G['est_dis_desv_nula']=function(diff){
    const v=ri(3,12), n=ri(3,6);
    const data=Array(n).fill(v);
    return {question:`¿Cuál es la desviación estándar de \\(${data.join(', ')}\\)?`,
      answer:'0',hint:'Si todos los datos son iguales, todos tienen desviación cero respecto a la media.',
      explanation:`Todos los valores son ${v}. Media=${v}. Desviaciones=0. σ=0.`,
      topic:'est_dispersion',type:'desv_nula'};
  };

  G['est_dis_rango_vs_desv']=function(diff){
    return {question:'¿Por qué la desviación estándar es preferible al rango como medida de dispersión?',
      answer:'usa todos los datos',hint:'Piensa en cuántos datos usa cada medida.',
      explanation:'El rango solo usa el máximo y el mínimo (2 datos). La desviación estándar usa todos los datos, siendo más robusta e informativa.',
      topic:'est_dispersion',type:'rango_vs_desv'};
  };

  G['est_dis_x_desde_zscore']=function(diff){
    const m=pick([50,60,70,80,100]);
    const s=pick([5,10,15]);
    const z=pick([-2,-1,1,2]);
    const x=m+z*s;
    return {question:`Si \\(\\mu=${m}\\), \\(\\sigma=${s}\\) y \\(Z=${z}\\), ¿cuál es el valor de \\(x\\)?`,
      answer:`${x}`,hint:'Despeja: \\(x=\\mu+Z\\cdot\\sigma\\).',
      explanation:`\\(x=${m}+(${z})(${s})=${x}\\)`,topic:'est_dispersion',type:'x_desde_z'};
  };

  window.MM_TOPIC_GENERATORS['est_dispersion']=[
    'est_dis_rango','est_dis_varianza','est_dis_desv_estandar','est_dis_interpretar_sigma',
    'est_dis_zscore','est_dis_coef_variacion','est_dis_comparar_dispersiones',
    'est_dis_desv_nula','est_dis_rango_vs_desv','est_dis_x_desde_zscore'
  ];

  /* ═══════════════════════════════════════
     5. CUARTILES Y PERCENTILES
  ═══════════════════════════════════════ */
  G['est_pos_q1']=function(diff){
    const ns={easy:7,medio:9,dificil:11,experto:13};
    const n=ns[diff]||9;
    const data=genData(n,1,40);
    const q1=r2(quartile(data,1));
    return {question:`Halla Q1 de: \\(${shuffle(data).join(', ')}\\).`,
      answer:`${q1}`,hint:'Ordena los datos. Q1 es la mediana de la mitad inferior.',
      explanation:`Ordenados: ${sorted(data).join(', ')}. Q1=${q1}`,
      topic:'est_posicion',type:'q1'};
  };

  G['est_pos_q3']=function(diff){
    const ns={easy:7,medio:9,dificil:11,experto:13};
    const n=ns[diff]||9;
    const data=genData(n,1,40);
    const q3=r2(quartile(data,3));
    return {question:`Halla Q3 de: \\(${shuffle(data).join(', ')}\\).`,
      answer:`${q3}`,hint:'Ordena los datos. Q3 es la mediana de la mitad superior.',
      explanation:`Ordenados: ${sorted(data).join(', ')}. Q3=${q3}`,
      topic:'est_posicion',type:'q3'};
  };

  G['est_pos_riq']=function(diff){
    const data=genData(8,1,30);
    const q1=r2(quartile(data,1)), q3=r2(quartile(data,3));
    const ric=r2(q3-q1);
    return {question:`Para los datos: \\(${shuffle(data).join(', ')}\\), ¿cuál es el rango intercuartílico (RIC)?`,
      answer:`${ric}`,hint:'RIC = Q3 − Q1.',
      explanation:`Q1=${q1}, Q3=${q3}. RIC=${q3}−${q1}=${ric}`,
      topic:'est_posicion',type:'ric'};
  };

  G['est_pos_outlier']=function(diff){
    const data=sorted(genData(6,10,30));
    const q1=r2(quartile(data,1)), q3=r2(quartile(data,3));
    const ric=r2(q3-q1);
    const limite_inf=r2(q1-1.5*ric), limite_sup=r2(q3+1.5*ric);
    const candidato=pick([limite_sup+5, limite_sup+10, limite_inf-5]);
    const esOutlier=candidato>limite_sup||candidato<limite_inf;
    return {question:`Con Q1=${q1}, Q3=${q3}, RIC=${ric}. ¿Es ${candidato} un valor atípico (outlier)?`,
      answer:esOutlier?'sí':'no',
      hint:`Los límites son: [${limite_inf}, ${limite_sup}]. Un outlier está fuera de ese rango.`,
      explanation:`Límite superior: ${q3}+1.5×${ric}=${limite_sup}. ${candidato} ${esOutlier?'>':'≤'} ${limite_sup}: ${esOutlier?'es':'no es'} outlier.`,
      topic:'est_posicion',type:'outlier'};
  };

  G['est_pos_percentil']=function(diff){
    const n=20;
    const data=sorted(genData(n,1,100));
    const p=pick([25,50,75,80,90]);
    const val=r2(quartile(data,p/25));
    return {question:`En un conjunto de ${n} datos ordenados, ¿qué posición aproximada ocupa el percentil ${p}?`,
      answer:`posición ${Math.round(p/100*n)}`,hint:`P_k ≈ (k/100) × n-ésima posición.`,
      explanation:`${p}/100 × ${n} = ${p/100*n} → posición ${Math.round(p/100*n)}`,
      topic:'est_posicion',type:'percentil'};
  };

  G['est_pos_interpretar_percentil']=function(diff){
    const p=pick([25,50,75,80,90,95]);
    const score=ri(50,100);
    return {question:`Un estudiante está en el percentil ${p} con puntaje ${score}. ¿Qué significa esto?`,
      answer:`supera al ${p}% de los estudiantes`,hint:'El percentil k indica que el ${k}% de los datos están por debajo.',
      explanation:`Estar en el percentil ${p} significa que el estudiante supera al ${p}% del grupo.`,
      topic:'est_posicion',type:'interpretar_percentil'};
  };

  G['est_pos_q2_mediana']=function(diff){
    const data=genData(7,1,30);
    const q2=r2(quartile(data,2));
    const med=r2(median(data));
    return {question:`¿Qué es Q2 para los datos: \\(${shuffle(data).join(', ')}\\)?`,
      answer:`${med}`,hint:'Q2 siempre es igual a la mediana.',
      explanation:`Q2 = mediana = ${med}. Ordenados: ${sorted(data).join(', ')}`,
      topic:'est_posicion',type:'q2'};
  };

  G['est_pos_boxplot_lectura']=function(diff){
    const min=ri(5,20), q1=min+ri(5,10), med=q1+ri(3,8), q3=med+ri(3,8), max=q3+ri(5,10);
    const parte=pick(['mínimo','Q1','mediana','Q3','máximo']);
    const vals={mínimo:min,Q1:q1,mediana:med,Q3:q3,máximo:max};
    return {question:`Un diagrama de caja tiene: mín=${min}, Q1=${q1}, mediana=${med}, Q3=${q3}, máx=${max}. ¿Cuál es el ${parte}?`,
      answer:`${vals[parte]}`,hint:'Identifica cada elemento del boxplot.',
      explanation:`${parte} = ${vals[parte]}`,topic:'est_posicion',type:'boxplot'};
  };

  G['est_pos_posicion_relativa']=function(diff){
    const data=sorted(genData(10,50,100));
    const x=data[ri(0,9)];
    const pos=data.indexOf(x)+1;
    const totalMenores=data.filter(v=>v<x).length;
    return {question:`En el conjunto ordenado ${data.join(', ')}, ¿cuántos datos son menores que ${x}?`,
      answer:`${totalMenores}`,hint:'Cuenta directamente los datos menores que el valor dado.',
      explanation:`Datos < ${x}: ${data.filter(v=>v<x).join(', ')} (${totalMenores} datos).`,
      topic:'est_posicion',type:'posicion'};
  };

  G['est_pos_ric_robustez']=function(diff){
    return {question:'¿Por qué el RIC (Rango Intercuartílico) es más robusto que el rango para medir dispersión?',
      answer:'no usa valores extremos',hint:'Piensa qué datos usa el RIC vs el rango.',
      explanation:'El RIC = Q3−Q1 usa el 50% central de los datos, ignorando el 25% inferior y superior (valores extremos). El rango solo usa el máximo y mínimo, siendo sensible a outliers.',
      topic:'est_posicion',type:'ric_robustez'};
  };

  window.MM_TOPIC_GENERATORS['est_posicion']=[
    'est_pos_q1','est_pos_q3','est_pos_riq','est_pos_outlier','est_pos_percentil',
    'est_pos_interpretar_percentil','est_pos_q2_mediana','est_pos_boxplot_lectura',
    'est_pos_posicion_relativa','est_pos_ric_robustez'
  ];

  /* ═══════════════════════════════════════
     6. PROBABILIDAD SIMPLE
  ═══════════════════════════════════════ */
  G['est_prob_dado']=function(diff){
    const eventos=[
      {desc:'sacar un 6',fav:1,total:6},
      {desc:'sacar un número par',fav:3,total:6},
      {desc:'sacar un número mayor que 4',fav:2,total:6},
      {desc:'sacar un número primo (2,3,5)',fav:3,total:6},
      {desc:'sacar un 1 o un 2',fav:2,total:6},
    ];
    const e=pick(eventos);
    return {question:`Al lanzar un dado, ¿cuál es la probabilidad de ${e.desc}?`,
      answer:`${e.fav}/6`,hint:`P(A) = casos favorables / casos totales = ${e.fav}/6`,
      explanation:`Casos favorables: ${e.fav}. Total: ${e.total}. P = ${e.fav}/${e.total}`,
      topic:'est_probabilidad',type:'dado'};
  };

  G['est_prob_moneda']=function(diff){
    const eventos=[
      {desc:'cara en una moneda',fav:1,total:2},
      {desc:'dos caras al lanzar dos monedas',fav:1,total:4},
      {desc:'al menos una cara en dos monedas',fav:3,total:4},
      {desc:'exactamente una cara en dos monedas',fav:2,total:4},
    ];
    const e=pick(eventos);
    const fracStr=`${e.fav}/${e.total}`;
    const dec=r2(e.fav/e.total);
    return {question:`¿Cuál es la probabilidad de ${e.desc}?`,
      answer:fracStr,hint:`Espacio muestral de ${e.total===2?'1 moneda':'2 monedas'}: ${e.total} resultados posibles.`,
      explanation:`P = ${e.fav}/${e.total} = ${dec}`,topic:'est_probabilidad',type:'moneda'};
  };

  G['est_prob_complemento']=function(diff){
    const nums=[2,3,4,5]; const den=pick([10,12,15,20]);
    const num=pick(nums.filter(x=>x<den));
    const comp=den-num;
    const pA=`${num}/${den}`, pComp=`${comp}/${den}`;
    return {question:`Si \\(P(A) = ${pA}\\), ¿cuánto vale \\(P(A^c)\\) (complemento)?`,
      answer:pComp,hint:`P(Aᶜ) = 1 − P(A) = 1 − ${pA}.`,
      explanation:`P(Aᶜ) = 1 − ${num}/${den} = ${comp}/${den}`,
      topic:'est_probabilidad',type:'complemento'};
  };

  G['est_prob_clasica']=function(diff){
    const totales=pick([10,12,15,20,25,30]);
    const favorables=ri(1,totales-1);
    const p=r3(favorables/totales);
    return {question:`En un experimento con ${totales} resultados igualmente posibles, ${favorables} son favorables. ¿Cuál es la probabilidad del evento?`,
      answer:`${favorables}/${totales}`,hint:'P(A) = favorables / total posibles (Regla de Laplace).',
      explanation:`P(A) = ${favorables}/${totales} ≈ ${p}`,topic:'est_probabilidad',type:'clasica'};
  };

  G['est_prob_bolsas']=function(diff){
    const rojas=ri(2,8), azules=ri(2,8), verdes=ri(2,8);
    const total=rojas+azules+verdes;
    const color=pick(['roja','azul','verde']);
    const cantidades={roja:rojas,azul:azules,verde:verdes};
    const f=cantidades[color];
    return {question:`Una bolsa tiene ${rojas} bolas rojas, ${azules} azules y ${verdes} verdes. ¿Cuál es la probabilidad de sacar una bola ${color}?`,
      answer:`${f}/${total}`,hint:'P = cantidad del color / total de bolas.',
      explanation:`P(${color}) = ${f}/${total} ≈ ${r2(f/total)}`,topic:'est_probabilidad',type:'bolsas'};
  };

  G['est_prob_seguro_imposible']=function(diff){
    const casos=[
      {q:'Al lanzar un dado, ¿cuál es la probabilidad de sacar un número entre 1 y 6?','a':'1','e':'Evento seguro: todos los resultados cumplen la condición. P=1.'},
      {q:'¿Cuál es la probabilidad de sacar un 7 en un dado normal de 6 caras?','a':'0','e':'Evento imposible: ningún resultado cumple la condición. P=0.'},
      {q:'Al tirar dos dados, ¿cuál es la probabilidad de que sume menos de 13?','a':'1','e':'La suma máxima es 12. Todo resultado da suma <13. Evento seguro.'},
    ];
    const c=pick(casos);
    return {question:c.q,answer:c.a,hint:'Probabilidad entre 0 (imposible) y 1 (seguro).',explanation:c.e,
      topic:'est_probabilidad',type:'seguro_imposible'};
  };

  G['est_prob_frecuencia_relativa']=function(diff){
    const n=pick([50,100,200,500]);
    const favorable=ri(10,n-10);
    const p=r2(favorable/n);
    return {question:`Se realizó un experimento ${n} veces y el evento ocurrió ${favorable} veces. ¿Cuál es la probabilidad empírica del evento?`,
      answer:`${p}`,hint:'Probabilidad empírica = frecuencia relativa = ocurrencias / intentos.',
      explanation:`P(A) ≈ ${favorable}/${n} = ${p}`,topic:'est_probabilidad',type:'empirica'};
  };

  G['est_prob_baraja']=function(diff){
    const total=52;
    const eventos=[
      {desc:'un As',fav:4},
      {desc:'una carta de corazones',fav:13},
      {desc:'una figura (J, Q, K)',fav:12},
      {desc:'un número par (2,4,6,8,10)',fav:20},
    ];
    const e=pick(eventos);
    return {question:`De una baraja de ${total} cartas, ¿cuál es la probabilidad de sacar ${e.desc}?`,
      answer:`${e.fav}/${total}`,hint:`P = ${e.fav}/${total}`,
      explanation:`Hay ${e.fav} cartas favorables de ${total}. P = ${e.fav}/${total} = ${r2(e.fav/total)}`,
      topic:'est_probabilidad',type:'baraja'};
  };

  G['est_prob_rango_probabilidad']=function(diff){
    const p=pick(['-0.3','1.2','0','0.5','1','0.99','-0.01']);
    const valido=['0','0.5','1','0.99'].includes(p);
    return {question:`¿El valor ${p} puede ser una probabilidad válida?`,
      answer:valido?'sí':'no',hint:'La probabilidad debe estar en [0, 1].',
      explanation:`${valido?`${p}∈[0,1]: probabilidad válida.`:`${p} está fuera de [0,1]: no es válida.`}`,
      topic:'est_probabilidad',type:'rango'};
  };

  G['est_prob_num_favorable']=function(diff){
    const total=pick([10,12,15,20]);
    const p=pick([0.2,0.25,0.3,0.4,0.5]);
    const fav=Math.round(p*total);
    return {question:`Si P(A)=${p} y el espacio muestral tiene ${total} resultados, ¿cuántos son favorables?`,
      answer:`${fav}`,hint:'Favorables = P × total.',
      explanation:`${p} × ${total} = ${fav}`,topic:'est_probabilidad',type:'num_favorable'};
  };

  window.MM_TOPIC_GENERATORS['est_probabilidad']=[
    'est_prob_dado','est_prob_moneda','est_prob_complemento','est_prob_clasica',
    'est_prob_bolsas','est_prob_seguro_imposible','est_prob_frecuencia_relativa',
    'est_prob_baraja','est_prob_rango_probabilidad','est_prob_num_favorable'
  ];

  /* ═══════════════════════════════════════
     7. PROBABILIDAD COMPUESTA Y COMBINATORIA
  ═══════════════════════════════════════ */
  G['est_comp_union_excluyentes']=function(diff){
    const den=pick([10,12,15,20]);
    const a=ri(1,den/3), b=ri(1,den/3);
    if(a+b>den) return G['est_comp_union_excluyentes'](diff);
    const union=a+b;
    return {question:`Si A y B son mutuamente excluyentes, \\(P(A)=${a}/${den}\\) y \\(P(B)=${b}/${den}\\), ¿cuánto es \\(P(A\\cup B)\\)?`,
      answer:`${union}/${den}`,hint:'Si A∩B=∅: P(A∪B) = P(A)+P(B).',
      explanation:`P(A∪B) = ${a}/${den} + ${b}/${den} = ${union}/${den}`,
      topic:'est_prob_compuesta',type:'union_excl'};
  };

  G['est_comp_union_general']=function(diff){
    const den=10;
    const a=ri(2,5), b=ri(2,5), inter=ri(1,Math.min(a,b)-1);
    const union=a+b-inter;
    return {question:`P(A)=${a}/${den}, P(B)=${b}/${den}, P(A∩B)=${inter}/${den}. ¿Cuánto es P(A∪B)?`,
      answer:`${union}/${den}`,hint:'P(A∪B) = P(A)+P(B)−P(A∩B).',
      explanation:`${a}/${den}+${b}/${den}−${inter}/${den} = ${union}/${den}`,
      topic:'est_prob_compuesta',type:'union_gral'};
  };

  G['est_comp_independientes']=function(diff){
    const p1=pick([2,3,4]), p2=pick([2,3,4]), den=pick([6,8,10]);
    const inter=r2(p1/den*p2/den);
    return {question:`Si A y B son independientes con P(A)=${p1}/${den} y P(B)=${p2}/${den}, ¿cuánto es P(A∩B)?`,
      answer:`${r2(p1*p2/den/den)}`,hint:'Para eventos independientes: P(A∩B) = P(A)·P(B).',
      explanation:`(${p1}/${den})×(${p2}/${den}) = ${p1*p2}/${den*den} ≈ ${r2(p1*p2/den/den)}`,
      topic:'est_prob_compuesta',type:'independientes'};
  };

  G['est_comp_condicional']=function(diff){
    const den=10;
    const inter=ri(1,3), b=ri(inter+1,5);
    return {question:`P(A∩B) = ${inter}/${den}, P(B) = ${b}/${den}. Calcula P(A|B).`,
      answer:`${inter}/${b}`,hint:'P(A|B) = P(A∩B) / P(B).',
      explanation:`P(A|B) = (${inter}/${den}) / (${b}/${den}) = ${inter}/${b}`,
      topic:'est_prob_compuesta',type:'condicional'};
  };

  G['est_comp_factorial']=function(diff){
    const ns={easy:[3,4],medio:[4,5],dificil:[5,6],experto:[6,7]};
    const n=pick(ns[diff]||ns.medio);
    const ans=fact(n);
    return {question:`Calcula \\(${n}!\\)`,
      answer:`${ans}`,hint:`\\(n! = n×(n-1)×...×1\\)`,
      explanation:`${n}! = ${Array.from({length:n},(_,i)=>n-i).join('×')} = ${ans}`,
      topic:'est_prob_compuesta',type:'factorial'};
  };

  G['est_comp_permutaciones']=function(diff){
    const ns={easy:[[5,2],[4,2]],medio:[[5,3],[6,2]],dificil:[[6,3],[7,2]],experto:[[7,3],[8,2]]};
    const [n,r]=pick(ns[diff]||ns.medio);
    const ans=nPr(n,r);
    return {question:`¿De cuántas formas se pueden ordenar ${r} elementos elegidos de ${n} distintos? \\(P(${n},${r})\\)`,
      answer:`${ans}`,hint:`P(n,r) = n!/(n-r)! = ${n}!/${n-r}!`,
      explanation:`P(${n},${r}) = ${n}×${n-1}${r>2?`×...×${n-r+1}`:''} = ${ans}`,
      topic:'est_prob_compuesta',type:'permutaciones'};
  };

  G['est_comp_combinaciones']=function(diff){
    const ns={easy:[[5,2],[6,2]],medio:[[6,3],[7,2]],dificil:[[7,3],[8,3]],experto:[[8,4],[9,3]]};
    const [n,r]=pick(ns[diff]||ns.medio);
    const ans=nCr(n,r);
    return {question:`¿De cuántas formas se pueden elegir ${r} elementos de ${n} sin importar el orden? \\(C(${n},${r})\\)`,
      answer:`${ans}`,hint:`C(n,r) = n! / (r! × (n-r)!)`,
      explanation:`C(${n},${r}) = ${fact(n)} / (${fact(r)}×${fact(n-r)}) = ${ans}`,
      topic:'est_prob_compuesta',type:'combinaciones'};
  };

  G['est_comp_principio_conteo']=function(diff){
    const a=ri(2,6), b=ri(2,6), c=ri(2,5);
    const total=a*b;
    const totalTres=a*b*c;
    const usaTres=diff==='dificil'||diff==='experto';
    if(usaTres){
      return {question:`Un menú tiene ${a} entradas, ${b} fondos y ${c} postres. ¿Cuántos menús distintos hay?`,
        answer:`${totalTres}`,hint:'Principio multiplicativo: a×b×c.',
        explanation:`${a}×${b}×${c} = ${totalTres}`,topic:'est_prob_compuesta',type:'conteo'};
    }
    return {question:`Hay ${a} camisas y ${b} pantalones. ¿Cuántas combinaciones distintas hay?`,
      answer:`${total}`,hint:'Principio multiplicativo: a×b.',
      explanation:`${a}×${b} = ${total}`,topic:'est_prob_compuesta',type:'conteo'};
  };

  G['est_comp_prob_comite']=function(diff){
    const n=pick([6,7,8,9,10]), r=pick([2,3]);
    const total=nCr(n,r);
    const m=ri(2,n-2); // elementos del grupo especial
    const favs=nCr(m,r);
    const pStr=`${favs}/${total}`;
    return {question:`De ${n} personas, ¿cuál es la probabilidad de elegir un comité de ${r} solo del subgrupo de ${m}?`,
      answer:pStr,hint:`C(${m},${r}) / C(${n},${r})`,
      explanation:`Favorables: C(${m},${r})=${favs}. Total: C(${n},${r})=${total}. P=${pStr}`,
      topic:'est_prob_compuesta',type:'comite'};
  };

  G['est_comp_al_menos_uno']=function(diff){
    const n=pick([2,3,4]);
    const p=pick([0.1,0.2,0.25,0.3]);
    const pNinguno=r3(Math.pow(1-p,n));
    const pAlMenosUno=r3(1-pNinguno);
    return {question:`Si la probabilidad de éxito en un ensayo es ${p}, en ${n} ensayos independientes, ¿cuál es la probabilidad de al menos un éxito?`,
      answer:`${pAlMenosUno}`,hint:`P(al menos 1) = 1 − P(ninguno) = 1 − (1−${p})^${n}`,
      explanation:`1 − ${(1-p).toFixed(2)}^${n} = 1 − ${pNinguno} = ${pAlMenosUno}`,
      topic:'est_prob_compuesta',type:'al_menos_uno'};
  };

  window.MM_TOPIC_GENERATORS['est_prob_compuesta']=[
    'est_comp_union_excluyentes','est_comp_union_general','est_comp_independientes',
    'est_comp_condicional','est_comp_factorial','est_comp_permutaciones',
    'est_comp_combinaciones','est_comp_principio_conteo','est_comp_prob_comite',
    'est_comp_al_menos_uno'
  ];

  /* ═══════════════════════════════════════
     8. VARIABLES ALEATORIAS Y DISTRIBUCIONES
  ═══════════════════════════════════════ */
  G['est_var_tipo_variable']=function(diff){
    const casos=[
      {v:'Número de caras al lanzar 5 monedas',t:'discreta'},
      {v:'Tiempo hasta que falla una máquina',t:'continua'},
      {v:'Número de clientes que llegan por hora',t:'discreta'},
      {v:'Temperatura exacta de un paciente',t:'continua'},
      {v:'Número de defectos en una muestra de 10 piezas',t:'discreta'},
    ];
    const c=pick(casos);
    return {question:`¿"${c.v}" es una variable aleatoria discreta o continua?`,answer:c.t,
      hint:'Discreta: cuenta (enteros). Continua: mide (cualquier valor real).',explanation:`"${c.v}" es ${c.t}.`,
      topic:'est_variables',type:'tipo'};
  };

  G['est_var_esperanza']=function(diff){
    const vals=[1,2,3,4];
    const probs=pick([[0.1,0.3,0.4,0.2],[0.2,0.2,0.3,0.3],[0.25,0.25,0.25,0.25]]);
    const E=r2(sum(vals.map((v,i)=>v*probs[i])));
    const probStr=probs.map((p,i)=>`P(X=${vals[i]})=${p}`).join(', ');
    return {question:`Para la distribución: ${probStr}, calcula E(X).`,
      answer:`${E}`,hint:'E(X) = Σ x·P(X=x).',
      explanation:`E(X)=${vals.map((v,i)=>v+'×'+probs[i]).join('+')}=${E}`,
      topic:'est_variables',type:'esperanza'};
  };

  G['est_var_binomial_prob']=function(diff){
    const ns={easy:3,medio:4,dificil:5,experto:6};
    const n=ns[diff]||4;
    const p=pick([0.25,0.3,0.4,0.5]);
    const k=ri(0,n);
    const ans=r3(nCr(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k));
    return {question:`\\(X\\sim B(n=${n},p=${p})\\). Calcula \\(P(X=${k})\\).`,
      answer:`${ans}`,hint:`P(X=k)=C(n,k)·pᵏ·(1-p)^(n-k)`,
      explanation:`C(${n},${k})·${p}^${k}·${1-p}^${n-k}=${nCr(n,k)}·${r3(Math.pow(p,k))}·${r3(Math.pow(1-p,n-k))}=${ans}`,
      topic:'est_variables',type:'binomial_prob'};
  };

  G['est_var_binomial_media']=function(diff){
    const ns={easy:[[5,0.4],[10,0.3]],medio:[[8,0.5],[12,0.4]],dificil:[[20,0.3],[15,0.6]],experto:[[25,0.4],[30,0.3]]};
    const [n,p]=pick(Object.values(ns).slice(0,4));
    const mu=r2(n*p);
    return {question:`Para \\(X\\sim B(n=${n},p=${p})\\), calcula la media \\(\\mu = E(X)\\).`,
      answer:`${mu}`,hint:'Para distribución binomial: E(X) = n·p.',
      explanation:`\\(E(X) = ${n}×${p} = ${mu}\\)`,topic:'est_variables',type:'binomial_media'};
  };

  G['est_var_binomial_sigma']=function(diff){
    const n=pick([5,10,15,20]), p=pick([0.2,0.3,0.4,0.5]);
    const sigma=r3(Math.sqrt(n*p*(1-p)));
    return {question:`Para \\(X\\sim B(n=${n},p=${p})\\), halla la desviación estándar \\(\\sigma\\).`,
      answer:`${sigma}`,hint:'σ = √(n·p·(1−p)).',
      explanation:`\\(\\sigma = \\sqrt{${n}×${p}×${1-p}} = \\sqrt{${r2(n*p*(1-p))}} ≈ ${sigma}\\)`,
      topic:'est_variables',type:'binomial_sigma'};
  };

  G['est_var_normal_zscore']=function(diff){
    const mu=pick([60,70,80,100,150]);
    const sigma=pick([5,10,15,20]);
    const z=pick([-2,-1,0,1,2]);
    const x=mu+z*sigma;
    return {question:`Para \\(X\\sim N(\\mu=${mu},\\sigma=${sigma})\\), halla el puntaje Z de \\(x=${x}\\).`,
      answer:`${z}`,hint:'Z = (x−μ)/σ.',
      explanation:`Z = (${x}−${mu})/${sigma} = ${z}`,topic:'est_variables',type:'normal_z'};
  };

  G['est_var_normal_interpretar']=function(diff){
    const casos=[
      {q:'En una distribución normal, ¿qué porcentaje de datos cae entre μ−σ y μ+σ?','a':'68%'},
      {q:'¿Qué valor de Z corresponde al percentil 50 en una distribución normal estándar?','a':'Z=0'},
      {q:'En una distribución normal estándar N(0,1), ¿cuánto vale la media?','a':'0'},
      {q:'En N(μ,σ), ¿la distribución es simétrica respecto a qué valor?','a':'la media μ'},
    ];
    const c=pick(casos);
    return {question:c.q,answer:c.a,hint:'Recuerda las propiedades de la distribución normal.',explanation:c.a,
      topic:'est_variables',type:'normal_interp'};
  };

  G['est_var_distribucion_uniforme']=function(diff){
    const a=ri(0,5), b=a+pick([5,10,15,20]);
    const p=r3(1/(b-a));
    return {question:`En una distribución uniforme continua en [${a}, ${b}], ¿cuál es la probabilidad de cualquier valor específico?`,
      answer:`${p}`,hint:'En distribución uniforme: f(x) = 1/(b−a) para todo x en [a,b].',
      explanation:`1/(${b}−${a}) = 1/${b-a} ≈ ${p}`,topic:'est_variables',type:'uniforme'};
  };

  G['est_var_varianza_discreta']=function(diff){
    const vals=[0,1,2,3];
    const probs=[0.1,0.3,0.4,0.2];
    const E=r2(sum(vals.map((v,i)=>v*probs[i])));
    const E2=r2(sum(vals.map((v,i)=>v*v*probs[i])));
    const vari=r2(E2-E*E);
    return {question:`Para X con distribución P(X=0)=0.1, P(X=1)=0.3, P(X=2)=0.4, P(X=3)=0.2, calcula Var(X).`,
      answer:`${vari}`,hint:'Var(X) = E(X²)−[E(X)]².',
      explanation:`E(X)=${E}. E(X²)=${E2}. Var(X)=${E2}−${E}²=${vari}`,
      topic:'est_variables',type:'varianza_discreta'};
  };

  G['est_var_poisson_media']=function(diff){
    const lambdas=[1,2,3,4,5];
    const lambda=pick(lambdas);
    const k=ri(0,lambda+1);
    const ans=r3(Math.pow(lambda,k)*Math.exp(-lambda)/fact(k));
    return {question:`Para \\(X\\sim Poisson(\\lambda=${lambda})\\), calcula \\(P(X=${k})\\).`,
      answer:`${ans}`,hint:`P(X=k) = e^(-λ)·λᵏ/k!`,
      explanation:`P(X=${k}) = e^(-${lambda})·${lambda}^${k}/${fact(k)} ≈ ${ans}`,
      topic:'est_variables',type:'poisson'};
  };

  window.MM_TOPIC_GENERATORS['est_variables']=[
    'est_var_tipo_variable','est_var_esperanza','est_var_binomial_prob','est_var_binomial_media',
    'est_var_binomial_sigma','est_var_normal_zscore','est_var_normal_interpretar',
    'est_var_distribucion_uniforme','est_var_varianza_discreta','est_var_poisson_media'
  ];

  console.log('[MM] generators-estadistica.js cargado. Temas estadística:',
    Object.keys(window.MM_TOPIC_GENERATORS).filter(k=>k.startsWith('est_')).length);
})();
