(function(){ 'use strict';
/* CONTENT PAES ESTADÍSTICA Y PROBABILIDAD — Etapa 4
   5 lecciones + 5 visualizaciones interactivas */

if(!window.MM_LESSONS)window.MM_LESSONS=[];
if(!window.MM_LESSON_MAP)window.MM_LESSON_MAP={};
if(!window.MM_GEO_VIS)window.MM_GEO_VIS={};

/* ═══════════════════════════════════════
   LECCIÓN 1 — CONTEO Y COMBINATORIA
═══════════════════════════════════════ */
(function(){
var lesson={
  id:'paes-conteo',
  title:'Conteo y Combinatoria',
  subject:'paes',
  unit:'paes_e_u1',
  icon:'🔢',
  color:'#7C3AED',
  estimatedTime:25,
  generatorKey:'paes_e_conteo',
  content:`
<h2>Conteo y Combinatoria</h2>
<p>Herramientas para contar posibilidades sin listarlas todas.</p>

<h3>Principio Multiplicativo</h3>
<p>Si una acción tiene <strong>m</strong> formas y una segunda tiene <strong>n</strong> formas independientes, hay <strong>m × n</strong> formas en total.</p>
<div class="example-box">
  <strong>Ejemplo:</strong> 4 camisas y 3 pantalones → \\(4\\times3=12\\) atuendos.
</div>

<h3>Factorial</h3>
<p>\\(n! = n\\times(n-1)\\times\\cdots\\times2\\times1\\), con \\(0!=1\\).</p>
<p>Ejemplo: \\(5!=120\\), \\(4!=24\\).</p>

<h3>Permutaciones (orden importa)</h3>
<p>\\(P(n,r)=\\dfrac{n!}{(n-r)!}\\)</p>
<div class="example-box">
  <strong>Ejemplo:</strong> Podio de 3 en un grupo de 8: \\(P(8,3)=\\dfrac{8!}{5!}=336\\).
</div>

<h3>Combinaciones (orden NO importa)</h3>
<p>\\(C(n,r)=\\dbinom{n}{r}=\\dfrac{n!}{r!(n-r)!}\\)</p>
<div class="example-box">
  <strong>Ejemplo:</strong> Comité de 3 de 8 personas: \\(C(8,3)=56\\).
</div>

<h3>¿Cuándo usar cada una?</h3>
<table class="content-table">
  <tr><th>Situación</th><th>Fórmula</th></tr>
  <tr><td>Ordenar r de n elementos</td><td>\\(P(n,r)\\)</td></tr>
  <tr><td>Seleccionar r de n (sin orden)</td><td>\\(C(n,r)\\)</td></tr>
  <tr><td>Subconjuntos de un conjunto de n</td><td>\\(2^n\\)</td></tr>
  <tr><td>Opciones con repetición (k etapas)</td><td>\\(m_1\\times m_2\\times\\cdots\\times m_k\\)</td></tr>
</table>

<h3>Errores frecuentes en PAES</h3>
<ul>
  <li>Confundir "ordenar" con "elegir" → revisa si el orden cambia el resultado.</li>
  <li>Olvidar que \\(C(n,r)=C(n,n-r)\\) — elegir 3 de 10 = elegir 7 de 10.</li>
  <li>Usar \\(n!\\) cuando solo se ordenan algunos elementos (usa \\(P(n,r)\\)).</li>
</ul>
`,
  visualId:'paes-conteo-vis'
};
window.MM_LESSONS.push(lesson);
window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ═══════════════════════════════════════
   LECCIÓN 2 — PROBABILIDAD
═══════════════════════════════════════ */
(function(){
var lesson={
  id:'paes-prob',
  title:'Probabilidad',
  subject:'paes',
  unit:'paes_e_u2',
  icon:'🎲',
  color:'#7C3AED',
  estimatedTime:30,
  generatorKey:'paes_e_prob',
  content:`
<h2>Probabilidad</h2>

<h3>Definición Clásica</h3>
<p>\\(P(A)=\\dfrac{\\text{casos favorables}}{\\text{casos posibles}}\\quad\\text{con }0\\le P(A)\\le1\\)</p>

<h3>Reglas Fundamentales</h3>
<table class="content-table">
  <tr><th>Regla</th><th>Fórmula</th></tr>
  <tr><td>Complemento</td><td>\\(P(A^c)=1-P(A)\\)</td></tr>
  <tr><td>Unión (general)</td><td>\\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\)</td></tr>
  <tr><td>Unión (excluyentes)</td><td>\\(P(A\\cup B)=P(A)+P(B)\\)</td></tr>
  <tr><td>Intersección (independientes)</td><td>\\(P(A\\cap B)=P(A)\\cdot P(B)\\)</td></tr>
  <tr><td>Probabilidad condicional</td><td>\\(P(A|B)=\\dfrac{P(A\\cap B)}{P(B)}\\)</td></tr>
</table>

<h3>Eventos Independientes vs. Dependientes</h3>
<div class="example-box">
  <strong>Independientes:</strong> lanzar dos monedas. \\(P(\\text{cara y cara})=\\dfrac{1}{2}\\times\\dfrac{1}{2}=\\dfrac{1}{4}\\).<br>
  <strong>Dependientes:</strong> sacar 2 cartas sin reposición. \\(P(2\\text{ ases})=\\dfrac{4}{52}\\times\\dfrac{3}{51}=\\dfrac{1}{221}\\).
</div>

<h3>Probabilidad Geométrica</h3>
<p>\\(P=\\dfrac{\\text{medida favorable}}{\\text{medida total}}\\) (longitud, área, etc.).</p>

<h3>Errores frecuentes</h3>
<ul>
  <li>Sumar probabilidades de eventos NO excluyentes sin restar la intersección.</li>
  <li>Asumir independencia cuando hay extracción sin reposición.</li>
  <li>Confundir \\(P(A|B)\\) con \\(P(B|A)\\) — no son iguales en general.</li>
</ul>
`,
  visualId:'paes-prob-vis'
};
window.MM_LESSONS.push(lesson);
window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ═══════════════════════════════════════
   LECCIÓN 3 — ESTADÍSTICA DESCRIPTIVA
═══════════════════════════════════════ */
(function(){
var lesson={
  id:'paes-estat',
  title:'Estadística Descriptiva',
  subject:'paes',
  unit:'paes_e_u3',
  icon:'📊',
  color:'#7C3AED',
  estimatedTime:30,
  generatorKey:'paes_e_estat',
  content:`
<h2>Estadística Descriptiva</h2>

<h3>Medidas de Tendencia Central</h3>
<table class="content-table">
  <tr><th>Medida</th><th>Definición</th><th>Fórmula</th></tr>
  <tr><td><strong>Media (\\(\\bar{x}\\))</strong></td><td>Promedio aritmético</td><td>\\(\\bar{x}=\\dfrac{\\sum x_i}{n}\\)</td></tr>
  <tr><td><strong>Mediana</strong></td><td>Valor central (ordenados)</td><td>Posición \\(\\tfrac{n+1}{2}\\)</td></tr>
  <tr><td><strong>Moda</strong></td><td>Valor más frecuente</td><td>—</td></tr>
</table>

<div class="example-box">
  <strong>Datos:</strong> 3, 7, 7, 9, 12<br>
  Media: \\(\\dfrac{3+7+7+9+12}{5}=\\dfrac{38}{5}=7{,}6\\)<br>
  Mediana: 7 (valor central)<br>
  Moda: 7 (aparece 2 veces)
</div>

<h3>Medidas de Dispersión</h3>
<table class="content-table">
  <tr><th>Medida</th><th>Fórmula</th></tr>
  <tr><td>Rango</td><td>\\(R=x_{\\max}-x_{\\min}\\)</td></tr>
  <tr><td>Varianza (\\(\\sigma^2\\))</td><td>\\(\\sigma^2=\\dfrac{\\sum(x_i-\\bar{x})^2}{n}\\)</td></tr>
  <tr><td>Desviación estándar</td><td>\\(\\sigma=\\sqrt{\\sigma^2}\\)</td></tr>
</table>

<h3>Cuartiles</h3>
<p>Q₁: 25% de los datos; Q₂ (mediana): 50%; Q₃: 75%.</p>
<p><strong>Rango intercuartílico:</strong> \\(IQR=Q_3-Q_1\\) — mide la dispersión del 50% central.</p>

<h3>Efectos de Transformaciones</h3>
<ul>
  <li>Sumar constante k: media y mediana aumentan en k; rango y σ no cambian.</li>
  <li>Multiplicar por k: media, mediana, rango y σ se multiplican por k (σ por |k|).</li>
</ul>

<h3>Asimetría</h3>
<ul>
  <li><strong>Sesgo positivo (cola derecha):</strong> Moda < Mediana < Media.</li>
  <li><strong>Sesgo negativo (cola izquierda):</strong> Media < Mediana < Moda.</li>
  <li><strong>Simétrica:</strong> Media ≈ Mediana ≈ Moda.</li>
</ul>
`,
  visualId:'paes-estat-vis'
};
window.MM_LESSONS.push(lesson);
window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ═══════════════════════════════════════
   LECCIÓN 4 — GRÁFICOS ESTADÍSTICOS
═══════════════════════════════════════ */
(function(){
var lesson={
  id:'paes-graficos',
  title:'Gráficos Estadísticos',
  subject:'paes',
  unit:'paes_e_u4',
  icon:'📈',
  color:'#7C3AED',
  estimatedTime:25,
  generatorKey:'paes_e_graficos',
  content:`
<h2>Gráficos Estadísticos</h2>

<h3>Tipos de Gráficos</h3>
<table class="content-table">
  <tr><th>Gráfico</th><th>Uso</th><th>Clave de lectura</th></tr>
  <tr><td>Barras</td><td>Comparar categorías</td><td>Altura = frecuencia</td></tr>
  <tr><td>Líneas</td><td>Evolución en el tiempo</td><td>Pendiente = cambio</td></tr>
  <tr><td>Circular (torta)</td><td>Proporciones del todo</td><td>Ángulo = \\(\\%\\times3.6°\\)</td></tr>
  <tr><td>Histograma</td><td>Variables continuas</td><td>Área = frecuencia</td></tr>
  <tr><td>Diagrama de caja</td><td>Dispersión y cuartiles</td><td>Caja = IQR</td></tr>
</table>

<h3>Gráfico Circular — Conversión</h3>
<p>\\(\\text{grados}=\\%\\times\\dfrac{360}{100}=\\%\\times3.6\\)</p>
<p>\\(\\%=\\dfrac{\\text{grados}}{360}\\times100\\)</p>

<div class="example-box">
  <strong>Ejemplo:</strong> El 25% de una torta ocupa \\(25\\times3.6=90°\\).
</div>

<h3>Lectura de Histogramas</h3>
<ul>
  <li><strong>Clase modal:</strong> barra más alta.</li>
  <li><strong>Frecuencia acumulada:</strong> suma desde el primer intervalo hasta el indicado.</li>
  <li>En histogramas de igual amplitud: altura ∝ frecuencia.</li>
</ul>

<h3>Porcentaje de cambio</h3>
<p>\\(\\%\\text{ cambio}=\\dfrac{v_{\\text{nuevo}}-v_{\\text{anterior}}}{v_{\\text{anterior}}}\\times100\\)</p>

<h3>Errores frecuentes</h3>
<ul>
  <li>Confundir área con altura en histogramas de distinta amplitud.</li>
  <li>Leer el eje Y incorrecto en gráficos de doble eje.</li>
  <li>Sumar frecuencias en lugar de usar el porcentaje en gráfico circular.</li>
</ul>
`,
  visualId:'paes-graficos-vis'
};
window.MM_LESSONS.push(lesson);
window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ═══════════════════════════════════════
   LECCIÓN 5 — TABLAS DE FRECUENCIA
═══════════════════════════════════════ */
(function(){
var lesson={
  id:'paes-tablas',
  title:'Tablas de Frecuencia',
  subject:'paes',
  unit:'paes_e_u5',
  icon:'📋',
  color:'#7C3AED',
  estimatedTime:25,
  generatorKey:'paes_e_tablas',
  content:`
<h2>Tablas de Frecuencia</h2>

<h3>Tipos de Frecuencia</h3>
<table class="content-table">
  <tr><th>Tipo</th><th>Símbolo</th><th>Descripción</th></tr>
  <tr><td>Absoluta</td><td>\\(f_i\\)</td><td>Número de veces que aparece el dato</td></tr>
  <tr><td>Relativa</td><td>\\(f_{r,i}\\)</td><td>\\(f_{r,i}=f_i/n\\) (entre 0 y 1)</td></tr>
  <tr><td>Acumulada</td><td>\\(F_i\\)</td><td>\\(F_i=\\sum_{j\\le i}f_j\\)</td></tr>
  <tr><td>Relativa acumulada</td><td>\\(F_{r,i}\\)</td><td>\\(F_{r,i}=F_i/n\\)</td></tr>
</table>

<h3>Tabla de Ejemplo</h3>
<p>Datos: 2,3,3,4,4,4,5,5 (n=8)</p>
<p>\\[\\begin{array}{c|c|c|c|c}x&f_i&f_{r,i}&F_i&F_{r,i}\\\\\\hline2&1&0.125&1&0.125\\\\3&2&0.25&3&0.375\\\\4&3&0.375&6&0.75\\\\5&2&0.25&8&1\\end{array}\\]</p>

<h3>Media desde tabla de frecuencias</h3>
<p>\\(\\bar{x}=\\dfrac{\\sum f_i\\cdot x_i}{n}\\)</p>

<h3>Mediana desde tabla de frecuencias</h3>
<p>Buscar la clase donde \\(F_i\\ge\\lceil n/2\\rceil\\).</p>

<h3>Tabla de Doble Entrada</h3>
<p>Relaciona dos variables categóricas. Permite calcular probabilidades condicionales:
\\(P(A|B)=\\dfrac{n(A\\cap B)}{n(B)}\\)</p>

<h3>Errores frecuentes</h3>
<ul>
  <li>Confundir \\(f_i\\) (absoluta) con \\(f_{r,i}\\) (relativa).</li>
  <li>Olvidar que \\(\\sum f_i = n\\) y \\(\\sum f_{r,i}=1\\).</li>
  <li>En tabla de doble entrada: dividir por el total general en lugar del total de la fila/columna al calcular probabilidad condicional.</li>
</ul>
`,
  visualId:'paes-tablas-vis'
};
window.MM_LESSONS.push(lesson);
window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ═══════════════════════════════════════
   VISUALIZACIÓN 1 — SIMULADOR CONTEO
═══════════════════════════════════════ */
window.MM_GEO_VIS['paes-conteo-vis']=function(container){
  container.innerHTML='';
  var W=Math.min(container.clientWidth||500,500),H=260;
  // UI panel
  var panel=document.createElement('div');
  panel.style.cssText='font-family:inherit;padding:12px;';

  var title=document.createElement('div');
  title.style.cssText='font-weight:700;font-size:15px;margin-bottom:12px;color:var(--clr-primary,#7C3AED);';
  title.textContent='Calculadora de Conteo';
  panel.appendChild(title);

  function row(label,inputAttrs,resultId){
    var d=document.createElement('div');
    d.style.cssText='display:flex;align-items:center;gap:8px;margin-bottom:8px;';
    var lbl=document.createElement('label');
    lbl.style.cssText='min-width:80px;font-size:13px;';
    lbl.textContent=label;
    var inp=document.createElement('input');
    inp.type='number';
    Object.assign(inp,inputAttrs);
    inp.style.cssText='width:60px;padding:4px 6px;border:1px solid var(--clr-border,#e5e7eb);border-radius:6px;font-size:14px;';
    var res=document.createElement('span');
    res.id=resultId;
    res.style.cssText='font-size:14px;font-weight:600;color:var(--clr-primary,#7C3AED);min-width:80px;';
    d.appendChild(lbl);d.appendChild(inp);d.appendChild(res);
    return{el:d,inp:inp,res:res};
  }
  var rN=row('n =',{value:7,min:0,max:15},'cnt-n');
  var rR=row('r =',{value:3,min:0,max:15},'cnt-r');
  panel.appendChild(rN.el);panel.appendChild(rR.el);

  var resultBox=document.createElement('div');
  resultBox.style.cssText='background:var(--clr-surface2,#f3f4f6);border-radius:8px;padding:12px;font-size:13px;line-height:1.8;margin-top:8px;';
  panel.appendChild(resultBox);
  container.appendChild(panel);

  function fact(n){if(n<=1)return 1;var f=1;for(var i=2;i<=n;i++)f*=i;return f;}
  function C(n,r){if(r<0||r>n)return 0;return Math.round(fact(n)/(fact(r)*fact(n-r)));}
  function P(n,r){if(r<0||r>n)return 0;return Math.round(fact(n)/fact(n-r));}

  function update(){
    var n=parseInt(rN.inp.value)||0,r=parseInt(rR.inp.value)||0;
    var perm=P(n,r),comb=C(n,r),subsets=Math.pow(2,Math.min(n,20));
    resultBox.innerHTML=
      '<b>n! =</b> '+(n<=12?fact(n):'muy grande')+'<br>'+
      '<b>P(n,r) =</b> n!/(n−r)! = <span style="color:var(--clr-primary,#7C3AED)">'+perm+'</span> (orden importa)<br>'+
      '<b>C(n,r) =</b> n!/[r!(n−r)!] = <span style="color:var(--clr-primary,#7C3AED)">'+comb+'</span> (orden no importa)<br>'+
      '<b>2ⁿ =</b> '+subsets+' subconjuntos posibles';
  }
  rN.inp.addEventListener('input',update);
  rR.inp.addEventListener('input',update);
  update();
};

/* ═══════════════════════════════════════
   VISUALIZACIÓN 2 — SIMULADOR PROBABILIDAD
═══════════════════════════════════════ */
window.MM_GEO_VIS['paes-prob-vis']=function(container){
  container.innerHTML='';
  var W=Math.min(container.clientWidth||500,500),H=220;
  var canvas=document.createElement('canvas');
  canvas.width=W;canvas.height=H;canvas.style.cssText='display:block;border-radius:8px;';
  container.appendChild(canvas);
  var ctx=canvas.getContext('2d');

  var controls=document.createElement('div');
  controls.style.cssText='display:flex;gap:8px;padding:10px;flex-wrap:wrap;align-items:center;';

  function btn(label,title){
    var b=document.createElement('button');
    b.textContent=label;b.title=title;
    b.style.cssText='padding:6px 14px;border-radius:20px;border:1px solid var(--clr-border,#e5e7eb);cursor:pointer;font-size:13px;background:var(--clr-surface,#fff);';
    return b;
  }
  var bDice=btn('🎲 Dado','Lanza un dado');
  var bCoin=btn('🪙 Moneda','Lanza moneda');
  var bReset=btn('↩ Reiniciar','Reiniciar');
  controls.appendChild(bDice);controls.appendChild(bCoin);controls.appendChild(bReset);

  var info=document.createElement('div');
  info.style.cssText='padding:4px 10px;font-size:13px;color:var(--clr-text2,#6b7280);';
  container.appendChild(controls);container.appendChild(info);

  var history=[];
  var counts={1:0,2:0,3:0,4:0,5:0,6:0,'H':0,'T':0};
  var total=0;

  function draw(){
    ctx.clearRect(0,0,W,H);
    var clrBg=getComputedStyle(document.documentElement).getPropertyValue('--clr-surface')||'#fff';
    var clrPrimary='#7C3AED';
    ctx.fillStyle=clrBg.trim()||'#fff';
    ctx.fillRect(0,0,W,H);

    if(history.length===0){
      ctx.fillStyle='#9ca3af';ctx.font='14px sans-serif';ctx.textAlign='center';
      ctx.fillText('Lanza el dado o la moneda para ver resultados',W/2,H/2);
      return;
    }

    // bar chart of results
    var keys=history[0] && typeof history[0]==='number'?[1,2,3,4,5,6]:['H','T'];
    var maxCount=Math.max.apply(null,keys.map(function(k){return counts[k]||0;}));
    var barW=Math.floor(W*0.8/keys.length),gap=6;
    var chartH=H-60,startX=(W-keys.length*(barW+gap))/2;

    ctx.font='bold 12px sans-serif';ctx.textAlign='center';
    keys.forEach(function(k,i){
      var c=counts[k]||0;
      var bH=maxCount>0?Math.floor(c/maxCount*chartH):0;
      var x=startX+i*(barW+gap),y=H-30-bH;
      ctx.fillStyle=clrPrimary+'99';
      ctx.fillRect(x,y,barW,bH);
      ctx.fillStyle='#374151';ctx.font='12px sans-serif';
      ctx.fillText(k,x+barW/2,H-12);
      var pct=total>0?Math.round(c/total*100):0;
      ctx.fillText(pct+'%',x+barW/2,y-4);
    });
    info.textContent='Total lanzamientos: '+total+' | Último: '+history[history.length-1];
  }

  bDice.addEventListener('click',function(){
    var v=1+Math.floor(Math.random()*6);
    history.push(v);counts[v]=(counts[v]||0)+1;total++;draw();
  });
  bCoin.addEventListener('click',function(){
    var v=Math.random()<0.5?'H':'T';
    history.push(v);counts[v]=(counts[v]||0)+1;total++;draw();
  });
  bReset.addEventListener('click',function(){
    history=[];Object.keys(counts).forEach(function(k){counts[k]=0;});total=0;info.textContent='';draw();
  });
  draw();
};

/* ═══════════════════════════════════════
   VISUALIZACIÓN 3 — ESTADÍSTICA DESCRIPTIVA
═══════════════════════════════════════ */
window.MM_GEO_VIS['paes-estat-vis']=function(container){
  container.innerHTML='';
  var W=Math.min(container.clientWidth||500,500),H=200;
  var canvas=document.createElement('canvas');
  canvas.width=W;canvas.height=H;canvas.style.cssText='display:block;border-radius:8px;';
  container.appendChild(canvas);
  var ctx=canvas.getContext('2d');

  var inputDiv=document.createElement('div');
  inputDiv.style.cssText='padding:10px;display:flex;flex-direction:column;gap:8px;';
  var lbl=document.createElement('label');
  lbl.style.cssText='font-size:13px;font-weight:600;';
  lbl.textContent='Datos (separados por coma):';
  var inp=document.createElement('input');
  inp.type='text';inp.value='3, 7, 7, 9, 12, 15, 7';
  inp.style.cssText='padding:6px 10px;border:1px solid var(--clr-border,#e5e7eb);border-radius:6px;font-size:14px;width:100%;box-sizing:border-box;';
  inputDiv.appendChild(lbl);inputDiv.appendChild(inp);
  container.appendChild(inputDiv);

  var statsDiv=document.createElement('div');
  statsDiv.style.cssText='padding:4px 10px 12px;font-size:13px;display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;';
  container.appendChild(statsDiv);

  function parse(s){
    return s.split(',').map(function(x){return parseFloat(x.trim());}).filter(function(x){return !isNaN(x);});
  }
  function median(arr){
    var s=arr.slice().sort(function(a,b){return a-b;});
    var n=s.length;
    return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;
  }
  function mode(arr){
    var cnt={};arr.forEach(function(x){cnt[x]=(cnt[x]||0)+1;});
    var max=Math.max.apply(null,Object.values(cnt));
    return Object.keys(cnt).filter(function(k){return cnt[k]===max;}).map(Number);
  }
  function r1(x){return Math.round(x*10)/10;}

  function update(){
    var data=parse(inp.value);
    if(data.length<2){statsDiv.textContent='Ingresa al menos 2 datos.';ctx.clearRect(0,0,W,H);return;}
    var n=data.length,s=data.reduce(function(a,b){return a+b;},0);
    var mean=s/n,med=median(data),mods=mode(data);
    var variance=data.reduce(function(a,x){return a+(x-mean)*(x-mean);},0)/n;
    var std=Math.sqrt(variance);
    var mn=Math.min.apply(null,data),mx=Math.max.apply(null,data);

    statsDiv.innerHTML=
      '<b>n:</b> '+n+'<b>  Media:</b> '+r1(mean)+
      '<b>Mediana:</b> '+r1(med)+'<b>Moda:</b> '+mods.join(', ')+
      '<b>Mín:</b> '+mn+'<b>Máx:</b> '+mx+
      '<b>Rango:</b> '+(mx-mn)+'<b>σ:</b> '+r1(std);

    // Draw dot plot
    ctx.clearRect(0,0,W,H);
    var clrP='#7C3AED';
    var range=mx-mn||1;
    var pad=30;
    ctx.strokeStyle='#d1d5db';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(pad,H-30);ctx.lineTo(W-pad,H-30);ctx.stroke();
    // tick labels
    ctx.fillStyle='#6b7280';ctx.font='11px sans-serif';ctx.textAlign='center';
    [mn,Math.round((mn+mx)/2),mx].forEach(function(v){
      var x=pad+(v-mn)/range*(W-2*pad);
      ctx.fillText(v,x,H-12);
      ctx.beginPath();ctx.moveTo(x,H-30);ctx.lineTo(x,H-24);ctx.stroke();
    });
    // dots stacked
    var dotR=6,slotH=dotR*2+2;
    var cols={};
    data.forEach(function(v){
      var x=pad+(v-mn)/range*(W-2*pad);
      var key=Math.round(x);
      cols[key]=(cols[key]||0)+1;
      var y=H-30-cols[key]*slotH+4;
      ctx.beginPath();ctx.arc(x,y,dotR,0,Math.PI*2);
      ctx.fillStyle=clrP+'cc';ctx.fill();
    });
    // mean line
    var mx2=pad+(mean-mn)/range*(W-2*pad);
    ctx.strokeStyle='#ef4444';ctx.lineWidth=2;ctx.setLineDash([4,3]);
    ctx.beginPath();ctx.moveTo(mx2,8);ctx.lineTo(mx2,H-30);ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle='#ef4444';ctx.font='11px sans-serif';ctx.textAlign='center';
    ctx.fillText('media='+r1(mean),mx2,6);
  }
  inp.addEventListener('input',update);
  update();
};

/* ═══════════════════════════════════════
   VISUALIZACIÓN 4 — GRÁFICO DE BARRAS/TORTA
═══════════════════════════════════════ */
window.MM_GEO_VIS['paes-graficos-vis']=function(container){
  container.innerHTML='';
  var W=Math.min(container.clientWidth||500,500),H=220;
  var canvas=document.createElement('canvas');
  canvas.width=W;canvas.height=H;canvas.style.cssText='display:block;border-radius:8px;';
  container.appendChild(canvas);
  var ctx=canvas.getContext('2d');

  var ctrl=document.createElement('div');
  ctrl.style.cssText='padding:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;';
  function mkBtn(t){
    var b=document.createElement('button');b.textContent=t;
    b.style.cssText='padding:5px 14px;border-radius:20px;border:1px solid var(--clr-border,#e5e7eb);cursor:pointer;font-size:13px;background:var(--clr-surface,#fff);';
    return b;
  }
  var bBar=mkBtn('Barras'),bPie=mkBtn('Torta');
  ctrl.appendChild(bBar);ctrl.appendChild(bPie);
  container.appendChild(ctrl);

  var CATS=['A','B','C','D','E'];
  var VALS=[35,20,25,10,10];
  var COLORS=['#7C3AED','#10B981','#F59E0B','#EF4444','#06B6D4'];

  function drawBars(){
    ctx.clearRect(0,0,W,H);
    var pad={l:30,r:10,t:20,b:40};
    var bW=(W-pad.l-pad.r)/CATS.length-8;
    var maxV=Math.max.apply(null,VALS);
    var chartH=H-pad.t-pad.b;
    ctx.fillStyle='#d1d5db';ctx.fillRect(pad.l,pad.t,W-pad.l-pad.r,1);

    CATS.forEach(function(c,i){
      var bH=Math.floor(VALS[i]/maxV*chartH);
      var x=pad.l+i*(bW+8),y=pad.t+chartH-bH;
      ctx.fillStyle=COLORS[i];
      ctx.fillRect(x,y,bW,bH);
      ctx.fillStyle='#374151';ctx.font='12px sans-serif';ctx.textAlign='center';
      ctx.fillText(c,x+bW/2,H-pad.b+14);
      ctx.fillText(VALS[i]+'%',x+bW/2,y-4);
    });
  }

  function drawPie(){
    ctx.clearRect(0,0,W,H);
    var cx=W/2,cy=H/2,r=Math.min(W,H)/2-20;
    var total=VALS.reduce(function(a,b){return a+b;},0);
    var start=-Math.PI/2;
    VALS.forEach(function(v,i){
      var angle=v/total*Math.PI*2;
      ctx.beginPath();ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,r,start,start+angle);
      ctx.closePath();ctx.fillStyle=COLORS[i];ctx.fill();
      ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
      // label
      var mid=start+angle/2;
      var lx=cx+Math.cos(mid)*(r*0.65),ly=cy+Math.sin(mid)*(r*0.65);
      ctx.fillStyle='#fff';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(CATS[i]+' '+v+'%',lx,ly);
      ctx.textBaseline='alphabetic';
      start+=angle;
    });
  }

  var mode='bar';
  bBar.addEventListener('click',function(){mode='bar';bBar.style.background='var(--clr-primary-light,#ede9fe)';bPie.style.background='var(--clr-surface,#fff)';drawBars();});
  bPie.addEventListener('click',function(){mode='pie';bPie.style.background='var(--clr-primary-light,#ede9fe)';bBar.style.background='var(--clr-surface,#fff)';drawPie();});
  bBar.style.background='var(--clr-primary-light,#ede9fe)';
  drawBars();
};

/* ═══════════════════════════════════════
   VISUALIZACIÓN 5 — TABLA DE FRECUENCIAS
═══════════════════════════════════════ */
window.MM_GEO_VIS['paes-tablas-vis']=function(container){
  container.innerHTML='';
  var panel=document.createElement('div');
  panel.style.cssText='font-family:inherit;padding:12px;';

  var title=document.createElement('div');
  title.style.cssText='font-weight:700;font-size:15px;margin-bottom:10px;color:var(--clr-primary,#7C3AED);';
  title.textContent='Generador de Tabla de Frecuencias';
  panel.appendChild(title);

  var lbl=document.createElement('label');
  lbl.style.cssText='font-size:13px;';
  lbl.textContent='Datos (separados por coma):';
  var inp=document.createElement('input');
  inp.type='text';inp.value='1,2,2,3,3,3,4,4,5';
  inp.style.cssText='display:block;width:100%;box-sizing:border-box;padding:6px 10px;border:1px solid var(--clr-border,#e5e7eb);border-radius:6px;font-size:14px;margin:6px 0 12px;';
  panel.appendChild(lbl);panel.appendChild(inp);

  var tableDiv=document.createElement('div');
  panel.appendChild(tableDiv);
  container.appendChild(panel);

  function update(){
    var raw=inp.value.split(',').map(function(x){return parseFloat(x.trim());}).filter(function(x){return !isNaN(x);});
    if(raw.length<2){tableDiv.textContent='Ingresa al menos 2 datos.';return;}
    raw.sort(function(a,b){return a-b;});
    var n=raw.length;
    var freq={};raw.forEach(function(x){freq[x]=(freq[x]||0)+1;});
    var vals=Object.keys(freq).map(Number).sort(function(a,b){return a-b;});
    var cum=0;
    var html='<table style="width:100%;border-collapse:collapse;font-size:13px;">';
    html+='<tr style="background:var(--clr-primary,#7C3AED);color:#fff;"><th style="padding:6px;">x</th><th>f_i</th><th>f_r</th><th>F_i</th><th>F_r</th></tr>';
    vals.forEach(function(v,i){
      var fi=freq[v],fr=(fi/n).toFixed(3);
      cum+=fi;
      var Fri=(cum/n).toFixed(3);
      var bg=i%2?'#f9fafb':'#fff';
      html+='<tr style="background:'+bg+';text-align:center;"><td style="padding:5px;font-weight:600;">'+v+'</td><td>'+fi+'</td><td>'+fr+'</td><td>'+cum+'</td><td>'+Fri+'</td></tr>';
    });
    html+='<tr style="border-top:2px solid var(--clr-border,#e5e7eb);font-weight:700;text-align:center;"><td>Total</td><td>'+n+'</td><td>1.000</td><td>—</td><td>1.000</td></tr>';
    html+='</table>';
    tableDiv.innerHTML=html;
  }
  inp.addEventListener('input',update);
  update();
};

})();
