(function(){ 'use strict';
/* ===================================================
   CONTENT PAES GEOMETRÍA — Etapa 3
   6 lessons + 6 interactive canvas visualizations
=================================================== */

function reg(id,fn){window.MM_GEO_VIS=window.MM_GEO_VIS||{};window.MM_GEO_VIS[id]=fn;}
function push(l){window.MM_LESSONS=window.MM_LESSONS||[];window.MM_LESSON_MAP=window.MM_LESSON_MAP||{};window.MM_LESSONS.push(l);window.MM_LESSON_MAP[l.id]=l;}
function remath(el){if(window.renderMathInElement)window.renderMathInElement(el,{delimiters:[{left:'\\(',right:'\\)',display:false},{left:'\\[',right:'\\]',display:true}]});}

/* ═══════════════════════════════════════════════════
   LESSON 1: GEOMETRÍA BÁSICA
═══════════════════════════════════════════════════ */
push({
  id:'paes-geo-basica', title:'Geometría Básica', subject:'paes', unit:'paes_g_u1',
  sections:[
    {type:'theory',title:'Ángulos y Polígonos',content:`
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Complementarios</div><div class="formula-expr">\\(\\alpha+\\beta=90°\\)</div></div>
  <div class="formula-card"><div class="formula-name">Suplementarios</div><div class="formula-expr">\\(\\alpha+\\beta=180°\\)</div></div>
  <div class="formula-card"><div class="formula-name">Triángulo</div><div class="formula-expr">\\(\\alpha+\\beta+\\gamma=180°\\)</div></div>
  <div class="formula-card"><div class="formula-name">Ángulo exterior</div><div class="formula-expr">\\(\\theta_{ext}=\\alpha+\\beta\\)</div></div>
  <div class="formula-card"><div class="formula-name">Cuadrilátero</div><div class="formula-expr">\\(\\sum\\text{ángulos}=360°\\)</div></div>
  <div class="formula-card"><div class="formula-name">Polígono n lados</div><div class="formula-expr">\\(\\sum=(n-2)\\times180°\\)</div></div>
  <div class="formula-card"><div class="formula-name">Teorema de Pitágoras</div><div class="formula-expr">\\(a^2+b^2=c^2\\)</div></div>
  <div class="formula-card"><div class="formula-name">Paralelas+transversal</div><div class="formula-expr">Alternos = correspondientes = iguales</div></div>
</div>`},
    {type:'example',title:'Ejemplo 1 — Ángulos en triángulo',content:`
<p>En un triángulo, dos ángulos miden \\(52°\\) y \\(73°\\). ¿El tercero?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(52°+73°+x=180°\\)</div>
  <div class="step"><span class="step-n">2</span> \\(x=180°-125°=55°\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Teorema de Pitágoras',content:`
<p>Catetos 5 y 12. Hipotenusa:</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(c=\\sqrt{5^2+12^2}=\\sqrt{25+144}=\\sqrt{169}=13\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Polígono regular',content:`
<p>Suma de ángulos de un hexágono (n=6):</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\((6-2)\\times180°=4\\times180°=720°\\)</div>
  <div class="step"><span class="step-n">2</span> Cada ángulo interior: \\(720°\\div6=120°\\)</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes',content:`
<ul>
  <li>Confundir ángulo exterior con el interior adyacente (son suplementarios, no iguales)</li>
  <li>En Pitágoras: \\(c\\) siempre es la <strong>hipotenusa</strong> (el lado más largo)</li>
  <li>Ángulos alternos internos son iguales (no suplementarios)</li>
  <li>Ángulos cointeriores (del mismo lado) suman 180°, no son iguales</li>
</ul>`},
    {type:'visual',title:'Visualización Interactiva',key:'paes-geo-basica-vis'},
    {type:'practice',title:'Práctica',generatorKey:'paes_g_basica',count:10},
  ]
});

/* ═══════════════════════════════════════════════════
   LESSON 2: TRIGONOMETRÍA
═══════════════════════════════════════════════════ */
push({
  id:'paes-geo-trig', title:'Trigonometría', subject:'paes', unit:'paes_g_u2',
  sections:[
    {type:'theory',title:'Razones Trigonométricas',content:`
<p>En un triángulo rectángulo con ángulo \\(\\theta\\):</p>
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Seno</div><div class="formula-expr">\\(\\sin\\theta=\\dfrac{\\text{opuesto}}{\\text{hipotenusa}}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Coseno</div><div class="formula-expr">\\(\\cos\\theta=\\dfrac{\\text{adyacente}}{\\text{hipotenusa}}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Tangente</div><div class="formula-expr">\\(\\tan\\theta=\\dfrac{\\text{opuesto}}{\\text{adyacente}}=\\dfrac{\\sin\\theta}{\\cos\\theta}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Identidad</div><div class="formula-expr">\\(\\sin^2\\theta+\\cos^2\\theta=1\\)</div></div>
</div>
<h4>Tabla de ángulos notables</h4>
<table style="width:100%;border-collapse:collapse;text-align:center;font-size:0.9rem">
<tr style="background:var(--primary);color:#fff"><th style="padding:8px">θ</th><th>sin</th><th>cos</th><th>tan</th></tr>
<tr><td style="padding:6px;border:1px solid var(--border)"><b>30°</b></td><td>\\(\\frac{1}{2}\\)</td><td>\\(\\frac{\\sqrt{3}}{2}\\)</td><td>\\(\\frac{\\sqrt{3}}{3}\\)</td></tr>
<tr style="background:var(--bg-alt)"><td style="padding:6px;border:1px solid var(--border)"><b>45°</b></td><td>\\(\\frac{\\sqrt{2}}{2}\\)</td><td>\\(\\frac{\\sqrt{2}}{2}\\)</td><td>\\(1\\)</td></tr>
<tr><td style="padding:6px;border:1px solid var(--border)"><b>60°</b></td><td>\\(\\frac{\\sqrt{3}}{2}\\)</td><td>\\(\\frac{1}{2}\\)</td><td>\\(\\sqrt{3}\\)</td></tr>
</table>`},
    {type:'example',title:'Ejemplo 1 — Razón trigonométrica',content:`
<p>Triángulo 3-4-5. ¿Cuánto vale \\(\\sin\\theta\\) donde \\(\\theta\\) es el ángulo opuesto al cateto 3?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Opuesto = 3, Hipotenusa = 5</div>
  <div class="step"><span class="step-n">2</span> \\(\\sin\\theta=3/5=0{,}6\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Altura con tangente',content:`
<p>Árbol a 20 m. Ángulo de elevación 30°. ¿Altura?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(\\tan30°=h/20\\Rightarrow h=20\\tan30°\\)</div>
  <div class="step"><span class="step-n">2</span> \\(h=20\\times\\dfrac{\\sqrt{3}}{3}\\approx11{,}55\\) m</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Triángulo 30-60-90°',content:`
<p>Cateto menor = 4. Halla los otros lados.</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Lados en proporción \\(1:\\sqrt{3}:2\\)</div>
  <div class="step"><span class="step-n">2</span> Cateto mayor: \\(4\\sqrt{3}\\approx6{,}93\\)</div>
  <div class="step"><span class="step-n">3</span> Hipotenusa: \\(4\\times2=8\\)</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes',content:`
<ul>
  <li>Invertir seno y coseno (SOH-CAH-TOA: mnemónico)</li>
  <li>Olvidar que la identidad es \\(\\sin^2+\\cos^2=1\\), no \\(\\sin+\\cos=1\\)</li>
  <li>En problemas de altura: verificar si se pide \\(\\tan\\) (cateto/cateto) o \\(\\sin\\) (cateto/hipotenusa)</li>
  <li>¡La tabla de ángulos notables es obligatoria memorizarla para PAES!</li>
</ul>`},
    {type:'visual',title:'Triángulo Trigonométrico Interactivo',key:'paes-geo-trig-vis'},
    {type:'practice',title:'Práctica',generatorKey:'paes_g_trig',count:10},
  ]
});

/* ═══════════════════════════════════════════════════
   LESSON 3: ÁREAS PLANAS
═══════════════════════════════════════════════════ */
push({
  id:'paes-geo-areas', title:'Áreas Planas', subject:'paes', unit:'paes_g_u3',
  sections:[
    {type:'theory',title:'Fórmulas de Área',content:`
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Rectángulo</div><div class="formula-expr">\\(A=b\\times h\\)</div></div>
  <div class="formula-card"><div class="formula-name">Cuadrado</div><div class="formula-expr">\\(A=l^2\\)</div></div>
  <div class="formula-card"><div class="formula-name">Triángulo</div><div class="formula-expr">\\(A=\\dfrac{b\\times h}{2}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Paralelogramo</div><div class="formula-expr">\\(A=b\\times h\\)</div></div>
  <div class="formula-card"><div class="formula-name">Trapecio</div><div class="formula-expr">\\(A=\\dfrac{(a+b)\\times h}{2}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Rombo</div><div class="formula-expr">\\(A=\\dfrac{d_1\\times d_2}{2}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Círculo</div><div class="formula-expr">\\(A=\\pi r^2\\)</div></div>
  <div class="formula-card"><div class="formula-name">Sector circular</div><div class="formula-expr">\\(A=\\dfrac{\\theta}{360°}\\pi r^2\\)</div></div>
  <div class="formula-card"><div class="formula-name">Corona circular</div><div class="formula-expr">\\(A=\\pi(R^2-r^2)\\)</div></div>
  <div class="formula-card"><div class="formula-name">Semejanza (áreas)</div><div class="formula-expr">\\(A_2=k^2\\cdot A_1\\)</div></div>
</div>`},
    {type:'example',title:'Ejemplo 1 — Área sombreada',content:`
<p>Cuadrado de lado 10 cm con círculo inscrito (radio 5). Área sombreada (esquinas):</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(A_{\\square}=10^2=100\\) cm²</div>
  <div class="step"><span class="step-n">2</span> \\(A_{\\circ}=\\pi(5)^2=25\\pi\\) cm²</div>
  <div class="step"><span class="step-n">3</span> \\(A_{\\text{som}}=100-25\\pi\\approx21{,}46\\) cm²</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Trapecio',content:`
<p>Trapecio con bases 8 y 5 cm, altura 4 cm:</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(A=\\dfrac{(8+5)\\times4}{2}=\\dfrac{52}{2}=26\\) cm²</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Escala de áreas',content:`
<p>Una foto de 6×8 cm se amplía con factor 3. ¿Nuevo área?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Área original: \\(6\\times8=48\\) cm²</div>
  <div class="step"><span class="step-n">2</span> \\(A_{\\text{nueva}}=3^2\\times48=9\\times48=432\\) cm²</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes',content:`
<ul>
  <li>En el trapecio: usar la base oblicua como altura (debe ser perpendicular)</li>
  <li>Corona circular: NO restar radios, restar cuadrados de radios: \\(R^2-r^2\\)</li>
  <li>Sector circular: el ángulo va en grados, dividido por 360</li>
  <li>Al escalar áreas: multiplicar por \\(k^2\\), no por \\(k\\)</li>
</ul>`},
    {type:'visual',title:'Visualizador de Áreas',key:'paes-geo-areas-vis'},
    {type:'practice',title:'Práctica',generatorKey:'paes_g_areas',count:10},
  ]
});

/* ═══════════════════════════════════════════════════
   LESSON 4: VOLÚMENES
═══════════════════════════════════════════════════ */
push({
  id:'paes-geo-vol', title:'Volúmenes y Superficies', subject:'paes', unit:'paes_g_u4',
  sections:[
    {type:'theory',title:'Fórmulas de Volumen',content:`
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Cubo</div><div class="formula-expr">\\(V=l^3,\\ S=6l^2\\)</div></div>
  <div class="formula-card"><div class="formula-name">Paralelepípedo</div><div class="formula-expr">\\(V=a\\cdot b\\cdot c\\)</div></div>
  <div class="formula-card"><div class="formula-name">Cilindro</div><div class="formula-expr">\\(V=\\pi r^2 h,\\ S_l=2\\pi rh\\)</div></div>
  <div class="formula-card"><div class="formula-name">Esfera</div><div class="formula-expr">\\(V=\\dfrac{4}{3}\\pi r^3,\\ S=4\\pi r^2\\)</div></div>
  <div class="formula-card"><div class="formula-name">Cono</div><div class="formula-expr">\\(V=\\dfrac{1}{3}\\pi r^2 h\\)</div></div>
  <div class="formula-card"><div class="formula-name">Pirámide</div><div class="formula-expr">\\(V=\\dfrac{1}{3}B\\cdot h\\)</div></div>
  <div class="formula-card"><div class="formula-name">Prisma</div><div class="formula-expr">\\(V=A_{\\text{base}}\\times h\\)</div></div>
  <div class="formula-card"><div class="formula-name">Semejanza (V)</div><div class="formula-expr">\\(V_2=k^3\\cdot V_1\\)</div></div>
</div>`},
    {type:'example',title:'Ejemplo 1 — Cilindro',content:`
<p>Cilindro r=3, h=5:</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(V=\\pi(3)^2(5)=45\\pi\\approx141{,}4\\) cm³</div>
  <div class="step"><span class="step-n">2</span> \\(S_l=2\\pi(3)(5)=30\\pi\\approx94{,}2\\) cm²</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Cono vs Cilindro',content:`
<p>Mismas dimensiones (r=4, h=6):</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(V_{\\text{cil}}=\\pi(16)(6)=96\\pi\\)</div>
  <div class="step"><span class="step-n">2</span> \\(V_{\\text{cono}}=\\dfrac{1}{3}\\pi(16)(6)=32\\pi\\)</div>
  <div class="step"><span class="step-n">3</span> Relación: \\(V_{\\text{cono}}/V_{\\text{cil}}=1/3\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Escala de volúmenes',content:`
<p>Esfera con r=2 (V=32π/3). Nueva esfera con r=4 (doble):</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(k=4/2=2\\)</div>
  <div class="step"><span class="step-n">2</span> \\(V_{\\text{nueva}}=2^3\\times\\dfrac{32\\pi}{3}=\\dfrac{256\\pi}{3}\\)</div>
  <div class="step"><span class="step-n">3</span> El volumen se multiplicó por 8</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes',content:`
<ul>
  <li>Cono y pirámide: olvidar el factor \\(1/3\\)</li>
  <li>Esfera: usar \\(\\frac{4}{3}\\pi r^3\\), no \\(\\frac{4}{3}\\pi r^2\\)</li>
  <li>Al escalar volúmenes: factor \\(k^3\\) (no \\(k\\) ni \\(k^2\\))</li>
  <li>Superficie total ≠ superficie lateral (no olvidar las bases)</li>
</ul>`},
    {type:'visual',title:'Visualizador de Volúmenes',key:'paes-geo-vol-vis'},
    {type:'practice',title:'Práctica',generatorKey:'paes_g_vol',count:10},
  ]
});

/* ═══════════════════════════════════════════════════
   LESSON 5: GEOMETRÍA ANALÍTICA
═══════════════════════════════════════════════════ */
push({
  id:'paes-geo-anal', title:'Geometría Analítica', subject:'paes', unit:'paes_g_u5',
  sections:[
    {type:'theory',title:'Fórmulas del Plano Cartesiano',content:`
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Distancia</div><div class="formula-expr">\\(d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Punto medio</div><div class="formula-expr">\\(M=\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)\\)</div></div>
  <div class="formula-card"><div class="formula-name">Pendiente</div><div class="formula-expr">\\(m=\\dfrac{y_2-y_1}{x_2-x_1}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Circunferencia</div><div class="formula-expr">\\((x-h)^2+(y-k)^2=r^2\\)</div></div>
  <div class="formula-card"><div class="formula-name">Dentro/fuera</div><div class="formula-expr">\\(d<r\\) dentro; \\(d>r\\) fuera</div></div>
  <div class="formula-card"><div class="formula-name">Área △ (det)</div><div class="formula-expr">\\(A=\\frac{1}{2}|x_1(y_2-y_3)+\\cdots|\\)</div></div>
</div>`},
    {type:'example',title:'Ejemplo 1 — Distancia',content:`
<p>Distancia entre \\(A(1,2)\\) y \\(B(4,6)\\):</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(d=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}=\\sqrt{25}=5\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Circunferencia',content:`
<p>¿El punto (7,3) está dentro, sobre o fuera de \\((x-4)^2+(y-3)^2=9\\)?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Centro=(4,3), r=3</div>
  <div class="step"><span class="step-n">2</span> d=\\(\\sqrt{(7-4)^2+(3-3)^2}=\\sqrt{9}=3\\)</div>
  <div class="step"><span class="step-n">3</span> d=r → punto sobre la circunferencia</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Área con vértices dados',content:`
<p>Triángulo: \\((0,0)\\), \\((6,0)\\), \\((3,4)\\):</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(A=\\dfrac{1}{2}|0(0-4)+6(4-0)+3(0-0)|=\\dfrac{1}{2}|24|=12\\) u²</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes',content:`
<ul>
  <li>Distancia: olvidar la raíz cuadrada, o no elevar al cuadrado las diferencias</li>
  <li>Circunferencia: en \\((x-h)^2+(y-k)^2=r^2\\), el centro es \\((h,k)\\) (ojo con signos)</li>
  <li>Radio = \\(\\sqrt{r^2}\\), no \\(r^2\\)</li>
  <li>Punto medio: promediar x con x y y con y (no cruzar)</li>
</ul>`},
    {type:'visual',title:'Plano Cartesiano Interactivo',key:'paes-geo-anal-vis'},
    {type:'practice',title:'Práctica',generatorKey:'paes_g_anal',count:10},
  ]
});

/* ═══════════════════════════════════════════════════
   LESSON 6: SEMEJANZA Y PROPORCIONES
═══════════════════════════════════════════════════ */
push({
  id:'paes-geo-sem', title:'Semejanza y Proporciones', subject:'paes', unit:'paes_g_u6',
  sections:[
    {type:'theory',title:'Semejanza',content:`
<p>Dos figuras son <strong>semejantes</strong> si tienen la misma forma (ángulos iguales, lados proporcionales).</p>
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Razón lineal</div><div class="formula-expr">\\(k=\\dfrac{l_2}{l_1}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Perímetros</div><div class="formula-expr">\\(P_2=k\\cdot P_1\\)</div></div>
  <div class="formula-card"><div class="formula-name">Áreas</div><div class="formula-expr">\\(A_2=k^2\\cdot A_1\\)</div></div>
  <div class="formula-card"><div class="formula-name">Volúmenes</div><div class="formula-expr">\\(V_2=k^3\\cdot V_1\\)</div></div>
  <div class="formula-card"><div class="formula-name">Criterio AA</div><div class="formula-expr">Dos ángulos iguales ⟹ semejanza</div></div>
  <div class="formula-card"><div class="formula-name">Altura en △rect</div><div class="formula-expr">\\(h^2=p\\cdot q\\)</div></div>
  <div class="formula-card"><div class="formula-name">Cateto²</div><div class="formula-expr">\\(c^2=p\\cdot\\text{hip}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Media geométrica</div><div class="formula-expr">\\(MG=\\sqrt{a\\cdot b}\\)</div></div>
</div>`},
    {type:'example',title:'Ejemplo 1 — Relación lineal/área/volumen',content:`
<p>Dos cubos con aristas 3 y 6 cm (k=2):</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Razón superficies: \\(k^2=4\\) (superficie menor × 4 = mayor)</div>
  <div class="step"><span class="step-n">2</span> Razón volúmenes: \\(k^3=8\\) (volumen menor × 8 = mayor)</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Teorema de Tales',content:`
<p>Una paralela divide los lados en segmentos 4 y 6 en un lado. Si el otro lado mide 10 en total, ¿cómo se divide?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Razón: \\(4:6=2:3\\)</div>
  <div class="step"><span class="step-n">2</span> El otro lado: \\(4\\) y \\(6\\) (misma proporción)</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Altura en triángulo rectángulo',content:`
<p>Hipotenusa dividida en segmentos 4 y 9. ¿Altura desde el ángulo recto?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(h^2=4\\times9=36\\)</div>
  <div class="step"><span class="step-n">2</span> \\(h=6\\)</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes',content:`
<ul>
  <li>Confundir k (lineal), k² (áreas) y k³ (volúmenes)</li>
  <li>En \\(h^2=p\\cdot q\\): p y q son las proyecciones, no los catetos</li>
  <li>Escalas en mapas: siempre convertir unidades (cm a km)</li>
  <li>Semejanza ≠ congruencia (congruente también implica mismo tamaño)</li>
</ul>`},
    {type:'visual',title:'Visualizador de Semejanza',key:'paes-geo-sem-vis'},
    {type:'practice',title:'Práctica',generatorKey:'paes_g_sem',count:10},
  ]
});

/* ════════════════════════════════════════════════════════
   VISUALIZACIONES INTERACTIVAS
════════════════════════════════════════════════════════ */

/* ── 1. Geometría básica: triángulo con ángulos ── */
reg('paes-geo-basica-vis',function(container){
  container.innerHTML='';
  var W=container.clientWidth||440,H=260;
  var cv=document.createElement('canvas');cv.width=W;cv.height=H;
  var ctx=cv.getContext('2d');
  container.appendChild(cv);

  var ang1=60,ang2=70,ang3=50;
  function draw(){
    ctx.clearRect(0,0,W,H);
    var cx=W/2,cy=H/2-10;
    var r=Math.min(W,H)*0.35;
    var a1=ang1*Math.PI/180,a2=ang2*Math.PI/180;
    // Compute triangle from angles and base
    var ax=cx-r*0.7,ay=cy+r*0.5;
    var bx=cx+r*0.7,by=cy+r*0.5;
    var sinC=Math.sin(Math.PI-(a1+a2));
    var lenAB=bx-ax;
    var cx2=ax+lenAB*Math.sin(a2)/sinC*Math.cos(a1);
    var cy2=ay-lenAB*Math.sin(a2)/sinC*Math.sin(a1);

    ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.lineTo(cx2,cy2);ctx.closePath();
    ctx.fillStyle='rgba(79,70,229,0.08)';ctx.fill();
    ctx.strokeStyle='var(--primary,#4F46E5)';ctx.lineWidth=2;ctx.stroke();

    ctx.fillStyle='var(--text,#1e1e2e)';ctx.font='bold 14px Inter,sans-serif';ctx.textAlign='center';
    ctx.fillText(ang1+'°',ax+22,ay-8);
    ctx.fillText(ang2+'°',bx-22,by-8);
    ctx.fillText(ang3+'°',cx2,cy2-12);
    ctx.font='13px Inter,sans-serif';ctx.fillStyle='var(--muted,#888)';
    ctx.fillText(ang1+'°+'+ang2+'°+'+ang3+'°=180°',W/2,H-14);
  }
  draw();

  // Sliders for ang1 and ang2
  function mkSlider(lo,hi,val,label,cb){
    var wrap=document.createElement('div');wrap.style.cssText='display:flex;align-items:center;gap:8px;margin:6px 0;font-size:0.85rem';
    var lbl=document.createElement('span');lbl.style.cssText='min-width:60px;color:var(--muted)';lbl.textContent=label;
    var inp=document.createElement('input');inp.type='range';inp.min=lo;inp.max=hi;inp.value=val;inp.style.flex='1';
    var out=document.createElement('span');out.style.cssText='min-width:36px;font-weight:600;color:var(--primary)';out.textContent=val+'°';
    inp.oninput=function(){out.textContent=inp.value+'°';cb(+inp.value);};
    wrap.appendChild(lbl);wrap.appendChild(inp);wrap.appendChild(out);
    return wrap;
  }
  var ctrl=document.createElement('div');ctrl.style.cssText='padding:8px 12px;background:var(--bg-card);border-radius:8px;margin-top:8px';
  ctrl.appendChild(mkSlider(10,100,ang1,'Ángulo A',function(v){ang1=v;ang3=Math.max(5,180-ang1-ang2);if(ang3<5||ang3>170){return;}draw();}));
  ctrl.appendChild(mkSlider(10,100,ang2,'Ángulo B',function(v){ang2=v;ang3=Math.max(5,180-ang1-ang2);if(ang3<5||ang3>170){return;}draw();}));
  container.appendChild(ctrl);
});

/* ── 2. Trigonometría: triángulo rectángulo + tabla ── */
reg('paes-geo-trig-vis',function(container){
  container.innerHTML='';
  var W=container.clientWidth||440,H=280;
  var cv=document.createElement('canvas');cv.width=W;cv.height=H;
  var ctx=cv.getContext('2d');
  container.appendChild(cv);

  var angle=30;
  function draw(){
    ctx.clearRect(0,0,W,H);
    var a=angle*Math.PI/180;
    var ox=60,oy=H-50,len=Math.min(W-120,200);
    var bx=ox+len,by=oy;
    var cx2=ox+len*Math.cos(a)*Math.cos(a)*len/len;
    // Simple right triangle at angle
    var tx=ox,ty=oy-len*Math.tan(a);
    if(ty<30){var sc=(oy-30)/(oy-ty);ty=30;bx=ox+len*sc;}
    // Draw triangle
    ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(bx,oy);ctx.lineTo(ox,ty);ctx.closePath();
    ctx.fillStyle='rgba(16,185,129,0.1)';ctx.fill();
    ctx.strokeStyle='#10B981';ctx.lineWidth=2;ctx.stroke();
    // Right angle mark
    var s=12;ctx.beginPath();ctx.moveTo(ox+s,oy);ctx.lineTo(ox+s,oy-s);ctx.lineTo(ox,oy-s);
    ctx.strokeStyle='#10B981';ctx.lineWidth=1.5;ctx.stroke();
    // Labels
    ctx.fillStyle='var(--text,#333)';ctx.font='13px Inter,sans-serif';
    var opp=Math.round((oy-ty));var adj=Math.round(bx-ox);var hyp=Math.round(Math.sqrt(opp*opp+adj*adj));
    ctx.textAlign='right';ctx.fillText('opuesto',ox-6,(oy+ty)/2);
    ctx.textAlign='center';ctx.fillText('adyacente',(ox+bx)/2,oy+18);
    // Hypotenuse label (middle of hyp)
    ctx.save();ctx.translate((ox+bx)/2,(oy+ty)/2);ctx.rotate(-Math.atan2(oy-ty,bx-ox));
    ctx.fillText('hipotenusa',0,-8);ctx.restore();
    // Angle label
    ctx.fillStyle='var(--primary,#4F46E5)';ctx.font='bold 14px Inter,sans-serif';ctx.textAlign='left';
    ctx.fillText('θ='+angle+'°',ox+20,oy-10);
    // Values
    var sinV=(opp/hyp).toFixed(3),cosV=(adj/hyp).toFixed(3),tanV=(opp/adj).toFixed(3);
    ctx.font='12px Inter,sans-serif';ctx.fillStyle='var(--muted,#888)';ctx.textAlign='center';
    ctx.fillText('sin='+sinV+'  cos='+cosV+'  tan='+tanV,W/2,H-12);
  }
  draw();

  var wrap=document.createElement('div');wrap.style.cssText='display:flex;gap:8px;margin-top:8px;flex-wrap:wrap';
  [30,45,60].forEach(function(a){
    var btn=document.createElement('button');btn.className='btn-secondary';btn.style.cssText='flex:1;padding:6px;border-radius:6px;cursor:pointer;background:var(--bg-card);border:1px solid var(--border)';
    btn.textContent=a+'°';
    btn.onclick=function(){angle=a;draw();};
    wrap.appendChild(btn);
  });
  container.appendChild(wrap);
});

/* ── 3. Áreas: visualizador de fórmulas con canvas ── */
reg('paes-geo-areas-vis',function(container){
  container.innerHTML='';
  var shapes=[
    {name:'Rectángulo',key:'rect'},
    {name:'Triángulo',key:'tri'},
    {name:'Círculo',key:'cir'},
    {name:'Trapecio',key:'trap'},
  ];
  var sel='rect';

  var W=container.clientWidth||420,H=230;
  var cv=document.createElement('canvas');cv.width=W;cv.height=H;
  var ctx=cv.getContext('2d');
  container.appendChild(cv);

  var sliders={b:8,h:5,r:5,a:10,a2:6};

  function draw(){
    ctx.clearRect(0,0,W,H);
    var cx=W/2,cy=H/2-15;
    ctx.fillStyle='rgba(79,70,229,0.12)';ctx.strokeStyle='var(--primary,#4F46E5)';ctx.lineWidth=2;
    var info='';
    if(sel==='rect'){
      var bpx=sliders.b*18,hpx=sliders.h*18;
      ctx.fillRect(cx-bpx/2,cy-hpx/2,bpx,hpx);ctx.strokeRect(cx-bpx/2,cy-hpx/2,bpx,hpx);
      info='A = '+sliders.b+' × '+sliders.h+' = '+(sliders.b*sliders.h)+' u²';
    } else if(sel==='tri'){
      var bpx2=sliders.b*18,hpx2=sliders.h*18;
      ctx.beginPath();ctx.moveTo(cx-bpx2/2,cy+hpx2/2);ctx.lineTo(cx+bpx2/2,cy+hpx2/2);ctx.lineTo(cx,cy-hpx2/2);ctx.closePath();
      ctx.fill();ctx.stroke();
      info='A = ('+sliders.b+' × '+sliders.h+') / 2 = '+(sliders.b*sliders.h/2)+' u²';
    } else if(sel==='cir'){
      var rpx=sliders.r*16;
      ctx.beginPath();ctx.arc(cx,cy,rpx,0,2*Math.PI);ctx.fill();ctx.stroke();
      info='A = π × '+sliders.r+'² = '+(sliders.r*sliders.r)+'π ≈ '+(Math.PI*sliders.r*sliders.r).toFixed(1)+' u²';
    } else if(sel==='trap'){
      var a1px=sliders.a*14,a2px=sliders.a2*14,hpx3=sliders.h*18;
      var dx=(a1px-a2px)/2;
      ctx.beginPath();ctx.moveTo(cx-a1px/2,cy+hpx3/2);ctx.lineTo(cx+a1px/2,cy+hpx3/2);
      ctx.lineTo(cx+a2px/2,cy-hpx3/2);ctx.lineTo(cx-a2px/2,cy-hpx3/2);ctx.closePath();
      ctx.fill();ctx.stroke();
      info='A = ('+sliders.a+'+'+sliders.a2+') × '+sliders.h+' / 2 = '+((sliders.a+sliders.a2)*sliders.h/2)+' u²';
    }
    ctx.fillStyle='var(--text,#333)';ctx.font='13px Inter,sans-serif';ctx.textAlign='center';
    ctx.fillText(info,W/2,H-10);
  }
  draw();

  // Shape buttons
  var btnRow=document.createElement('div');btnRow.style.cssText='display:flex;gap:6px;margin-top:8px;flex-wrap:wrap';
  shapes.forEach(function(s){
    var btn=document.createElement('button');
    btn.style.cssText='flex:1;padding:6px 4px;border-radius:6px;cursor:pointer;font-size:0.8rem;border:1px solid var(--border);background:var(--bg-card)';
    btn.textContent=s.name;
    btn.onclick=function(){sel=s.key;draw();};
    btnRow.appendChild(btn);
  });
  container.appendChild(btnRow);

  // Sliders
  function mkS(label,key,lo,hi){
    var wrap=document.createElement('div');wrap.style.cssText='display:flex;align-items:center;gap:8px;margin:4px 0;font-size:0.82rem';
    var lbl=document.createElement('span');lbl.style.cssText='min-width:50px;color:var(--muted)';lbl.textContent=label;
    var inp=document.createElement('input');inp.type='range';inp.min=lo;inp.max=hi;inp.value=sliders[key];inp.style.flex='1';
    var out=document.createElement('span');out.style.cssText='min-width:24px;font-weight:600;color:var(--primary)';out.textContent=sliders[key];
    inp.oninput=function(){sliders[key]=+inp.value;out.textContent=inp.value;draw();};
    wrap.appendChild(lbl);wrap.appendChild(inp);wrap.appendChild(out);
    return wrap;
  }
  var ctrl=document.createElement('div');ctrl.style.cssText='padding:8px;background:var(--bg-card);border-radius:8px;margin-top:6px';
  ctrl.appendChild(mkS('base',   'b', 2,15));
  ctrl.appendChild(mkS('altura', 'h', 2,12));
  ctrl.appendChild(mkS('radio',  'r', 2,10));
  container.appendChild(ctrl);
});

/* ── 4. Volúmenes: tabla de fórmulas con iconos canvas ── */
reg('paes-geo-vol-vis',function(container){
  container.innerHTML='';
  var items=[
    {n:'Cubo',      f:'V=l³',  ex:'l=3: V=27'},
    {n:'Cilindro',  f:'V=πr²h',ex:'r=2,h=5: V=20π'},
    {n:'Esfera',    f:'V=4πr³/3',ex:'r=3: V=36π'},
    {n:'Cono',      f:'V=πr²h/3',ex:'r=2,h=6: V=8π'},
    {n:'Pirámide',  f:'V=Bh/3',ex:'B=16,h=6: V=32'},
    {n:'Prisma',    f:'V=A_base×h',ex:'A=10,h=5: V=50'},
  ];
  var g=document.createElement('div');
  g.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;padding:8px';
  items.forEach(function(it){
    var d=document.createElement('div');
    d.style.cssText='background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center';
    d.innerHTML='<div style="font-weight:700;color:var(--primary);margin-bottom:4px">'+it.n+'</div>'+
      '<div style="font-size:0.9rem;margin-bottom:6px">\\('+it.f+'\\)</div>'+
      '<div style="font-size:0.75rem;color:var(--muted)">Ej: '+it.ex+'</div>';
    g.appendChild(d);
  });
  container.appendChild(g);
  remath(container);
});

/* ── 5. Geometría Analítica: plano cartesiano interactivo ── */
reg('paes-geo-anal-vis',function(container){
  container.innerHTML='';
  var W=container.clientWidth||420,H=300;
  var cv=document.createElement('canvas');cv.width=W;cv.height=H;
  var ctx=cv.getContext('2d');
  container.appendChild(cv);

  var pts=[{x:1,y:2,c:'#4F46E5'},{x:4,y:6,c:'#EF4444'}];
  var OX=W/2,OY=H/2,SCALE=28;

  function toC(x,y){return{cx:OX+x*SCALE,cy:OY-y*SCALE};}

  function draw(){
    ctx.clearRect(0,0,W,H);
    // Grid
    ctx.strokeStyle='var(--border,#e0e0e0)';ctx.lineWidth=0.5;
    for(var i=-7;i<=7;i++){
      var {cx,cy}=toC(i,0);ctx.beginPath();ctx.moveTo(cx,0);ctx.lineTo(cx,H);ctx.stroke();
      var {cx:cx2,cy:cy2}=toC(0,i);ctx.beginPath();ctx.moveTo(0,cy2);ctx.lineTo(W,cy2);ctx.stroke();
    }
    // Axes
    ctx.strokeStyle='var(--text,#333)';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(0,OY);ctx.lineTo(W,OY);ctx.stroke();
    ctx.beginPath();ctx.moveTo(OX,0);ctx.lineTo(OX,H);ctx.stroke();
    // Line between points
    var p1=toC(pts[0].x,pts[0].y),p2=toC(pts[1].x,pts[1].y);
    ctx.strokeStyle='#10B981';ctx.lineWidth=1.5;ctx.setLineDash([4,4]);
    ctx.beginPath();ctx.moveTo(p1.cx,p1.cy);ctx.lineTo(p2.cx,p2.cy);ctx.stroke();ctx.setLineDash([]);
    // Midpoint
    var mx=(pts[0].x+pts[1].x)/2,my=(pts[0].y+pts[1].y)/2;
    var mp=toC(mx,my);
    ctx.fillStyle='#F59E0B';ctx.beginPath();ctx.arc(mp.cx,mp.cy,5,0,2*Math.PI);ctx.fill();
    // Points
    pts.forEach(function(p){
      var c=toC(p.x,p.y);
      ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(c.cx,c.cy,7,0,2*Math.PI);ctx.fill();
      ctx.fillStyle='var(--text,#333)';ctx.font='12px Inter,sans-serif';ctx.textAlign='left';
      ctx.fillText('('+p.x+','+p.y+')',c.cx+9,c.cy-5);
    });
    // Distance label
    var d=Math.sqrt(Math.pow(pts[1].x-pts[0].x,2)+Math.pow(pts[1].y-pts[0].y,2));
    ctx.fillStyle='#10B981';ctx.font='bold 12px Inter,sans-serif';ctx.textAlign='center';
    ctx.fillText('d='+d.toFixed(2),(p1.cx+p2.cx)/2+15,(p1.cy+p2.cy)/2);
    ctx.fillStyle='#F59E0B';ctx.fillText('M=('+mx+','+my+')',mp.cx+8,mp.cy+16);
  }
  draw();

  var info=document.createElement('div');
  info.style.cssText='font-size:0.8rem;color:var(--muted);text-align:center;margin-top:6px';
  info.textContent='Azul: punto A | Rojo: punto B | Verde: segmento | Amarillo: punto medio';
  container.appendChild(info);
});

/* ── 6. Semejanza: dos triángulos proporcionales ── */
reg('paes-geo-sem-vis',function(container){
  container.innerHTML='';
  var W=container.clientWidth||440,H=260;
  var cv=document.createElement('canvas');cv.width=W;cv.height=H;
  var ctx=cv.getContext('2d');
  container.appendChild(cv);

  var k=2;
  function draw(){
    ctx.clearRect(0,0,W,H);
    var base=60,h1=40;
    // Small triangle (left)
    var x1=50,y1=H/2+h1/2;
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x1+base,y1);ctx.lineTo(x1+base/2,y1-h1);ctx.closePath();
    ctx.fillStyle='rgba(79,70,229,0.15)';ctx.fill();ctx.strokeStyle='#4F46E5';ctx.lineWidth=2;ctx.stroke();
    // Large triangle (right)
    var base2=base*k,h2=h1*k;
    var x2=W/2+10,y2=H/2+h2/2;
    ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2+base2,y2);ctx.lineTo(x2+base2/2,y2-h2);ctx.closePath();
    ctx.fillStyle='rgba(239,68,68,0.12)';ctx.fill();ctx.strokeStyle='#EF4444';ctx.lineWidth=2;ctx.stroke();
    // Labels
    ctx.fillStyle='#4F46E5';ctx.font='12px Inter,sans-serif';ctx.textAlign='center';
    ctx.fillText('Figura menor',x1+base/2,y1+20);
    ctx.fillStyle='#EF4444';
    ctx.fillText('Figura mayor (k='+k+')',x2+base2/2,y2+20);
    ctx.fillStyle='var(--text,#333)';ctx.font='bold 13px Inter,sans-serif';ctx.textAlign='center';
    ctx.fillText('Razón k='+k,W/2,25);
    // Stats
    var a1=base*h1/2,a2=base2*h2/2;
    ctx.font='12px Inter,sans-serif';ctx.fillStyle='var(--muted,#888)';
    ctx.fillText('Perímetros: k='+k+'  |  Áreas: k²='+(k*k)+'  |  Vol: k³='+(k*k*k),W/2,H-10);
  }
  draw();

  var wrap=document.createElement('div');wrap.style.cssText='display:flex;align-items:center;gap:10px;margin-top:8px;font-size:0.85rem';
  var lbl=document.createElement('span');lbl.style.color='var(--muted)';lbl.textContent='Razón k:';
  var inp=document.createElement('input');inp.type='range';inp.min=1;inp.max=4;inp.value=2;inp.style.flex='1';
  var out=document.createElement('span');out.style.cssText='font-weight:700;color:var(--primary);min-width:20px';out.textContent='2';
  inp.oninput=function(){k=+inp.value;out.textContent=k;draw();};
  wrap.appendChild(lbl);wrap.appendChild(inp);wrap.appendChild(out);
  container.appendChild(wrap);
});

})();
