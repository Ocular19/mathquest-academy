(function(){ 'use strict';
/* ===================================================
   CONTENT PAES ÁLGEBRA — Etapa 2
   6 lessons: Álgebra, Ecuaciones, Sistemas,
              Inecuaciones, Funciones Lineales, Funciones Cuadráticas
=================================================== */

/* ── helpers ── */
function reg(id,fn){ window.MM_GEO_VIS=window.MM_GEO_VIS||{}; window.MM_GEO_VIS[id]=fn; }

/* ─────────────────────────────────────
   LESSON 1: ÁLGEBRA BÁSICA
───────────────────────────────────── */
(function(){
var lesson={
  id:'paes-algebra',
  title:'Álgebra — Expresiones y Factorización',
  subject:'paes',unit:'paes_a_u1',
  sections:[
    {type:'theory',title:'Expresiones Algebraicas',content:`
<p>Una <strong>expresión algebraica</strong> combina números y variables mediante operaciones. Evaluar significa sustituir las variables por valores concretos.</p>
<div class="formula-box">\\[\\text{Si } p(x)=3x^2-2x+1,\\quad p(2)=3(4)-2(2)+1=9\\]</div>

<h4>Productos Notables — debes memorizar</h4>
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Cuadrado de suma</div><div class="formula-expr">\\((a+b)^2=a^2+2ab+b^2\\)</div></div>
  <div class="formula-card"><div class="formula-name">Cuadrado de diferencia</div><div class="formula-expr">\\((a-b)^2=a^2-2ab+b^2\\)</div></div>
  <div class="formula-card"><div class="formula-name">Diferencia de cuadrados</div><div class="formula-expr">\\(a^2-b^2=(a-b)(a+b)\\)</div></div>
  <div class="formula-card"><div class="formula-name">FOIL (binomios)</div><div class="formula-expr">\\((ax+b)(cx+d)=acx^2+(ad+bc)x+bd\\)</div></div>
</div>`},
    {type:'example',title:'Ejemplo 1 — Factor común',content:`
<p><strong>Factoriza:</strong> \\(6x^2 + 9x\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> MFC de 6 y 9 → \\(\\text{MFC}=3\\); factor de x → x¹</div>
  <div class="step"><span class="step-n">2</span> Saca el factor: \\(3x(2x+3)\\)</div>
  <div class="step"><span class="step-n">3</span> Verifica: \\(3x\\cdot 2x+3x\\cdot 3=6x^2+9x\\ ✓\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Diferencia de cuadrados',content:`
<p><strong>Factoriza:</strong> \\(4x^2-25\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Reconoce: \\(4x^2=(2x)^2\\) y \\(25=5^2\\)</div>
  <div class="step"><span class="step-n">2</span> Aplica la fórmula: \\(A^2-B^2=(A-B)(A+B)\\)</div>
  <div class="step"><span class="step-n">3</span> Resultado: \\((2x-5)(2x+5)\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Trinomio cuadrado perfecto',content:`
<p><strong>Factoriza:</strong> \\(x^2+6x+9\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> ¿Es TCP? Verifica \\(2ab=6\\): \\(a=1,b=3 \\Rightarrow 2(1)(3)=6\\ ✓\\)</div>
  <div class="step"><span class="step-n">2</span> Escribe: \\((x+3)^2\\)</div>
  <div class="step"><span class="step-n">3</span> Error frecuente: \\((x+3)^2\\neq x^2+9\\)</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes en Álgebra',content:`
<ul>
  <li>\\((a+b)^2\\neq a^2+b^2\\) — olvidar el término \\(2ab\\)</li>
  <li>\\(-x^2\\neq(-x)^2\\) — la potencia se aplica solo a x</li>
  <li>Factor común incompleto: siempre busca el <em>máximo</em> factor</li>
  <li>Confundir \\(a^2-b^2\\) (diferencia de cuadrados) con \\((a-b)^2\\) (cuadrado de diferencia)</li>
</ul>`},
    {type:'visual',title:'Referencia Visual',key:'paes-algebra-ref'},
    {type:'practice',title:'Práctica',generatorKey:'paes_a_algebra',count:10},
    {type:'challenge',title:'Desafío Avanzado',content:`
<p>Factoriza completamente: \\(2x^3-8x\\)</p>
<details><summary>Solución</summary>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Factor común: \\(2x(x^2-4)\\)</div>
  <div class="step"><span class="step-n">2</span> Diferencia de cuadrados: \\(2x(x-2)(x+2)\\)</div>
</div></details>`}
  ]
};
window.MM_LESSONS=window.MM_LESSONS||[];window.MM_LESSON_MAP=window.MM_LESSON_MAP||{};
window.MM_LESSONS.push(lesson);window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ─────────────────────────────────────
   LESSON 2: ECUACIONES
───────────────────────────────────── */
(function(){
var lesson={
  id:'paes-ecuaciones',
  title:'Ecuaciones — Lineales y Cuadráticas',
  subject:'paes',unit:'paes_a_u2',
  sections:[
    {type:'theory',title:'Ecuaciones Lineales',content:`
<p>Una <strong>ecuación lineal</strong> tiene la forma \\(ax+b=c\\). Se resuelve aplicando operaciones inversas para aislar x.</p>
<div class="formula-box">\\[ax+b=c\\quad\\Rightarrow\\quad x=\\frac{c-b}{a}\\]</div>
<p><strong>Regla clave:</strong> Lo que se hace a un lado se hace al otro.</p>

<h4>Ecuaciones Cuadráticas</h4>
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Fórmula general</div><div class="formula-expr">\\(x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Discriminante</div><div class="formula-expr">\\(\\Delta=b^2-4ac\\)</div></div>
  <div class="formula-card"><div class="formula-name">\\(\\Delta>0\\)</div><div class="formula-expr">Dos raíces reales distintas</div></div>
  <div class="formula-card"><div class="formula-name">\\(\\Delta=0\\)</div><div class="formula-expr">Una raíz doble</div></div>
  <div class="formula-card"><div class="formula-name">\\(\\Delta<0\\)</div><div class="formula-expr">Sin raíces reales</div></div>
</div>`},
    {type:'example',title:'Ejemplo 1 — Ecuación lineal con paréntesis',content:`
<p><strong>Resuelve:</strong> \\(3(x-2)+4=2x+1\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Distribuye: \\(3x-6+4=2x+1\\)</div>
  <div class="step"><span class="step-n">2</span> Simplifica: \\(3x-2=2x+1\\)</div>
  <div class="step"><span class="step-n">3</span> Pasa x al lado izquierdo: \\(x=3\\)</div>
  <div class="step"><span class="step-n">4</span> Verifica: \\(3(3-2)+4=7=2(3)+1\\ ✓\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Ecuación cuadrática por factorización',content:`
<p><strong>Resuelve:</strong> \\(x^2-5x+6=0\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Busca dos números que sumen −5 y multipliquen 6: −2 y −3</div>
  <div class="step"><span class="step-n">2</span> Factoriza: \\((x-2)(x-3)=0\\)</div>
  <div class="step"><span class="step-n">3</span> Soluciones: \\(x=2\\) y \\(x=3\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Fórmula cuadrática',content:`
<p><strong>Resuelve:</strong> \\(2x^2-3x-2=0\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(a=2,b=-3,c=-2\\)</div>
  <div class="step"><span class="step-n">2</span> \\(\\Delta=9+16=25\\)</div>
  <div class="step"><span class="step-n">3</span> \\(x=\\dfrac{3\\pm 5}{4}\\)</div>
  <div class="step"><span class="step-n">4</span> \\(x=2\\) y \\(x=-\\dfrac{1}{2}\\)</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes en Ecuaciones',content:`
<ul>
  <li>Dividir por 0: si el denominador contiene la variable, verifica siempre</li>
  <li>Olvidar el \\(\\pm\\) en la fórmula cuadrática → pierdes una solución</li>
  <li>No verificar: siempre sustituye la solución en la ecuación original</li>
  <li>\\(x^2=k\\) tiene dos soluciones: \\(x=\\pm\\sqrt{k}\\) (no solo la positiva)</li>
</ul>`},
    {type:'visual',title:'Referencia Visual',key:'paes-ecuaciones-ref'},
    {type:'practice',title:'Práctica',generatorKey:'paes_a_ecuaciones',count:10},
    {type:'challenge',title:'Desafío Avanzado',content:`
<p>Si \\(x_1\\) y \\(x_2\\) son las raíces de \\(x^2-px+q=0\\), expresa \\(x_1^2+x_2^2\\) en función de p y q.</p>
<details><summary>Solución</summary>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Vieta: \\(x_1+x_2=p\\) y \\(x_1\\cdot x_2=q\\)</div>
  <div class="step"><span class="step-n">2</span> \\(x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=p^2-2q\\)</div>
</div></details>`}
  ]
};
window.MM_LESSONS.push(lesson);window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ─────────────────────────────────────
   LESSON 3: SISTEMAS DE ECUACIONES
───────────────────────────────────── */
(function(){
var lesson={
  id:'paes-sistemas',
  title:'Sistemas de Ecuaciones 2×2',
  subject:'paes',unit:'paes_a_u3',
  sections:[
    {type:'theory',title:'Métodos de Resolución',content:`
<p>Un <strong>sistema de ecuaciones</strong> es un conjunto de ecuaciones con las mismas incógnitas. En PAES predominan los sistemas 2×2.</p>

<div class="formula-grid">
  <div class="formula-card">
    <div class="formula-name">Sustitución</div>
    <div class="formula-expr">Despeja una variable en una ecuación y sustituye en la otra.</div>
  </div>
  <div class="formula-card">
    <div class="formula-name">Eliminación (Reducción)</div>
    <div class="formula-expr">Multiplica ecuaciones para igualar coeficientes y suma/resta para eliminar una variable.</div>
  </div>
</div>

<h4>Tipos de sistemas</h4>
<ul>
  <li><strong>Compatible determinado:</strong> una solución — rectas se intersectan</li>
  <li><strong>Incompatible:</strong> sin solución — rectas paralelas</li>
  <li><strong>Compatible indeterminado:</strong> infinitas soluciones — misma recta</li>
</ul>`},
    {type:'example',title:'Ejemplo 1 — Sustitución',content:`
<p><strong>Resuelve:</strong> \\(\\begin{cases}y=2x+1\\\\3x+y=11\\end{cases}\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Sustituye \\(y=2x+1\\) en la segunda: \\(3x+(2x+1)=11\\)</div>
  <div class="step"><span class="step-n">2</span> \\(5x=10 \\Rightarrow x=2\\)</div>
  <div class="step"><span class="step-n">3</span> \\(y=2(2)+1=5\\)</div>
  <div class="step"><span class="step-n">4</span> Solución: \\((2,\\ 5)\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Eliminación',content:`
<p><strong>Resuelve:</strong> \\(\\begin{cases}2x+3y=7\\\\4x-y=9\\end{cases}\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Multiplica la segunda por 3: \\(12x-3y=27\\)</div>
  <div class="step"><span class="step-n">2</span> Suma con la primera: \\(14x=34 \\Rightarrow x=17/7\\)... </div>
  <div class="step"><span class="step-n">2b</span> Mejor: multiplica la primera por 2: \\(4x+6y=14\\). Resta la segunda: \\(7y=5 \\Rightarrow y=5/7\\)</div>
  <div class="step"><span class="step-n">3</span> Sustituye: \\(2x=7-3(5/7)=34/7 \\Rightarrow x=17/7\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Problema de mezcla',content:`
<p>Se venden 10 artículos a $200 o $350 cada uno. El total es $2600. ¿Cuántos hay de cada tipo?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(x+y=10\\)</div>
  <div class="step"><span class="step-n">2</span> \\(200x+350y=2600\\)</div>
  <div class="step"><span class="step-n">3</span> De la primera: \\(x=10-y\\). Sustituye: \\(200(10-y)+350y=2600 \\Rightarrow 150y=600 \\Rightarrow y=4\\)</div>
  <div class="step"><span class="step-n">4</span> \\(x=6\\)</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes en Sistemas',content:`
<ul>
  <li>Sustituir en la misma ecuación de donde se despejó → loop infinito</li>
  <li>No verificar ambas ecuaciones con la solución encontrada</li>
  <li>Asumir que todo sistema tiene solución — puede ser incompatible</li>
  <li>Error aritmético al eliminar: recordar cambiar signos si se resta</li>
</ul>`},
    {type:'visual',title:'Referencia Visual',key:'paes-sistemas-ref'},
    {type:'practice',title:'Práctica',generatorKey:'paes_a_sistemas',count:10},
    {type:'challenge',title:'Desafío Avanzado',content:`
<p>Halla k para que el sistema sea incompatible: \\(\\begin{cases}3x+ky=5\\\\kx+3y=7\\end{cases}\\)</p>
<details><summary>Solución</summary>
<p>El sistema es incompatible cuando el determinante de la matriz de coeficientes es 0 pero no la solución. Det=\\(9-k^2=0 \\Rightarrow k=\\pm 3\\). Con k=3 ambas ecuaciones son \\(3x+3y=5\\) y \\(3x+3y=7\\): paralelas → k=3 funciona.</p>
</details>`}
  ]
};
window.MM_LESSONS.push(lesson);window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ─────────────────────────────────────
   LESSON 4: INECUACIONES
───────────────────────────────────── */
(function(){
var lesson={
  id:'paes-inecuaciones',
  title:'Inecuaciones',
  subject:'paes',unit:'paes_a_u4',
  sections:[
    {type:'theory',title:'Reglas de Inecuaciones',content:`
<p>Una <strong>inecuación</strong> es una desigualdad con variable. Se resuelve como una ecuación, con una regla crucial:</p>

<div class="callout-warning">
  <strong>⚠️ Regla del signo:</strong> Al multiplicar o dividir por un número <strong>negativo</strong>, el signo de la desigualdad se invierte.
  <div style="margin-top:0.5rem">\\(−2x > 6 \\Rightarrow x < −3\\)</div>
</div>

<h4>Tipos de inecuaciones</h4>
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Lineal</div><div class="formula-expr">\\(ax+b < c\\)</div></div>
  <div class="formula-card"><div class="formula-name">Doble</div><div class="formula-expr">\\(a < f(x) < b\\)</div></div>
  <div class="formula-card"><div class="formula-name">Cuadrática</div><div class="formula-expr">\\(ax^2+bx+c>0\\)</div></div>
  <div class="formula-card"><div class="formula-name">Valor absoluto</div><div class="formula-expr">\\(|x|< k \\Leftrightarrow -k<x<k\\)</div></div>
</div>`},
    {type:'example',title:'Ejemplo 1 — Inecuación lineal con inversión de signo',content:`
<p><strong>Resuelve:</strong> \\(-3x+5 > 2\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Resta 5: \\(-3x > -3\\)</div>
  <div class="step"><span class="step-n">2</span> Divide por −3 (¡invierte!): \\(x < 1\\)</div>
  <div class="step"><span class="step-n">3</span> Verifica con x=0: \\(-3(0)+5=5>2\\ ✓\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Inecuación doble',content:`
<p><strong>Resuelve:</strong> \\(-1 < 2x-3 < 5\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Suma 3 a los tres miembros: \\(2 < 2x < 8\\)</div>
  <div class="step"><span class="step-n">2</span> Divide por 2: \\(1 < x < 4\\)</div>
  <div class="step"><span class="step-n">3</span> Verifica con x=2: \\(-1<2(2)-3=1<5\\ ✓\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Inecuación cuadrática',content:`
<p><strong>Resuelve:</strong> \\(x^2-5x+6 < 0\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Factoriza: \\((x-2)(x-3)<0\\)</div>
  <div class="step"><span class="step-n">2</span> Raíces: x=2 y x=3. Parábola abre arriba (a=1>0)</div>
  <div class="step"><span class="step-n">3</span> La parábola es negativa <em>entre</em> las raíces: \\(2 < x < 3\\)</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes en Inecuaciones',content:`
<ul>
  <li>No invertir el signo al dividir/multiplicar por negativo — el error más común en PAES</li>
  <li>En inecuación cuadrática: no analizar el signo de a para saber dónde la parábola es positiva/negativa</li>
  <li>Confundir \\(|x|<k\\) (dos raíces interiores) con \\(|x|>k\\) (exteriors)</li>
  <li>Escribir \\(x>3\\) y \\(x<2\\) como \\(2<x<3\\) — son conjuntos separados</li>
</ul>`},
    {type:'visual',title:'Referencia Visual',key:'paes-inecuaciones-ref'},
    {type:'practice',title:'Práctica',generatorKey:'paes_a_inecuaciones',count:10},
    {type:'challenge',title:'Desafío Avanzado',content:`
<p>Resuelve: \\(\\dfrac{x+1}{x-2} > 0\\)</p>
<details><summary>Solución</summary>
<p>El cociente es positivo cuando numerador y denominador tienen el mismo signo. Casos:</p>
<ul>
  <li>Ambos positivos: \\(x>-1\\) AND \\(x>2\\) → \\(x>2\\)</li>
  <li>Ambos negativos: \\(x<-1\\) AND \\(x<2\\) → \\(x<-1\\)</li>
</ul>
<p>Solución: \\(x<-1\\) ó \\(x>2\\) (excluido x=2 por denominador=0)</p>
</details>`}
  ]
};
window.MM_LESSONS.push(lesson);window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ─────────────────────────────────────
   LESSON 5: FUNCIONES LINEALES
───────────────────────────────────── */
(function(){
var lesson={
  id:'paes-func-lineales',
  title:'Funciones Lineales',
  subject:'paes',unit:'paes_a_u5',
  sections:[
    {type:'theory',title:'La Función Lineal',content:`
<p>Una <strong>función lineal</strong> tiene la forma \\(f(x)=mx+b\\), donde:</p>
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">m — pendiente</div><div class="formula-expr">\\(m=\\dfrac{\\Delta y}{\\Delta x}=\\dfrac{y_2-y_1}{x_2-x_1}\\)</div></div>
  <div class="formula-card"><div class="formula-name">b — intercepto en y</div><div class="formula-expr">\\(f(0)=b\\)</div></div>
  <div class="formula-card"><div class="formula-name">Intercepto en x</div><div class="formula-expr">\\(f(x)=0\\Rightarrow x=-b/m\\)</div></div>
  <div class="formula-card"><div class="formula-name">Punto-pendiente</div><div class="formula-expr">\\(y-y_0=m(x-x_0)\\)</div></div>
</div>

<h4>Rectas especiales</h4>
<ul>
  <li><strong>Paralelas:</strong> misma pendiente, diferente intercepto — no se cortan</li>
  <li><strong>Perpendiculares:</strong> \\(m_1\\cdot m_2=-1\\)</li>
  <li><strong>Horizontal:</strong> \\(m=0\\), ecuación \\(y=b\\)</li>
  <li><strong>Vertical:</strong> pendiente indefinida, ecuación \\(x=a\\)</li>
</ul>`},
    {type:'example',title:'Ejemplo 1 — Ecuación dados dos puntos',content:`
<p><strong>Halla la ecuación</strong> de la recta que pasa por \\((1,3)\\) y \\((3,7)\\).</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(m=\\dfrac{7-3}{3-1}=\\dfrac{4}{2}=2\\)</div>
  <div class="step"><span class="step-n">2</span> \\(y-3=2(x-1) \\Rightarrow y=2x+1\\)</div>
  <div class="step"><span class="step-n">3</span> Verifica: \\(f(1)=3\\ ✓\\) y \\(f(3)=7\\ ✓\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Rectas paralelas y perpendiculares',content:`
<p>La recta \\(y=3x-5\\) tiene pendiente 3.</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> <strong>Paralela:</strong> misma pendiente → \\(y=3x+k\\) (cualquier k≠-5)</div>
  <div class="step"><span class="step-n">2</span> <strong>Perpendicular:</strong> \\(m_\\perp=-1/3\\) → \\(y=-\\frac{1}{3}x+k\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Punto de intersección de dos rectas',content:`
<p>¿Dónde se cortan \\(y=2x+1\\) e \\(y=-x+7\\)?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Iguala: \\(2x+1=-x+7\\)</div>
  <div class="step"><span class="step-n">2</span> \\(3x=6 \\Rightarrow x=2\\)</div>
  <div class="step"><span class="step-n">3</span> \\(y=2(2)+1=5\\). Punto: \\((2,5)\\)</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes en Funciones Lineales',content:`
<ul>
  <li>Invertir numerador y denominador en la pendiente: \\(m=\\Delta y/\\Delta x\\), no al revés</li>
  <li>Confundir intercepto en y (b) con intercepto en x (−b/m)</li>
  <li>Creer que dos rectas con diferente ecuación siempre se cortan (olvidar el caso paralelas)</li>
  <li>En forma punto-pendiente: \\(y-y_0=m(x-x_0)\\) — ojo con los signos de h y k</li>
</ul>`},
    {type:'visual',title:'Referencia Visual',key:'paes-func-lineales-ref'},
    {type:'practice',title:'Práctica',generatorKey:'paes_a_func_lin',count:10},
    {type:'challenge',title:'Desafío Avanzado',content:`
<p>Las rectas \\(y=ax+3\\) e \\(y=2x+b\\) se cortan en el punto \\((2,5)\\). Halla a y b.</p>
<details><summary>Solución</summary>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Sustituye (2,5) en la primera: \\(5=2a+3 \\Rightarrow a=1\\)</div>
  <div class="step"><span class="step-n">2</span> Sustituye (2,5) en la segunda: \\(5=4+b \\Rightarrow b=1\\)</div>
</div></details>`}
  ]
};
window.MM_LESSONS.push(lesson);window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ─────────────────────────────────────
   LESSON 6: FUNCIONES CUADRÁTICAS
───────────────────────────────────── */
(function(){
var lesson={
  id:'paes-func-cuadraticas',
  title:'Funciones Cuadráticas',
  subject:'paes',unit:'paes_a_u6',
  sections:[
    {type:'theory',title:'La Parábola',content:`
<p>La <strong>función cuadrática</strong> \\(f(x)=ax^2+bx+c\\) define una parábola.</p>

<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Vértice (h, k)</div><div class="formula-expr">\\(h=-\\dfrac{b}{2a},\\quad k=f(h)\\)</div></div>
  <div class="formula-card"><div class="formula-name">Forma vértice</div><div class="formula-expr">\\(f(x)=a(x-h)^2+k\\)</div></div>
  <div class="formula-card"><div class="formula-name">Eje de simetría</div><div class="formula-expr">\\(x=h\\)</div></div>
  <div class="formula-card"><div class="formula-name">Raíces (ceros)</div><div class="formula-expr">\\(x=\\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Fórmulas de Vieta</div><div class="formula-expr">\\(x_1+x_2=-b/a,\\ x_1x_2=c/a\\)</div></div>
  <div class="formula-card"><div class="formula-name">Abre arriba/abajo</div><div class="formula-expr">a>0: mínimo • a<0: máximo</div></div>
</div>`},
    {type:'example',title:'Ejemplo 1 — Vértice y eje de simetría',content:`
<p>Para \\(f(x)=2x^2-8x+3\\):</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(h=-\\dfrac{-8}{2(2)}=\\dfrac{8}{4}=2\\)</div>
  <div class="step"><span class="step-n">2</span> \\(k=f(2)=2(4)-8(2)+3=8-16+3=-5\\)</div>
  <div class="step"><span class="step-n">3</span> Vértice: \\((2,-5)\\). Eje: \\(x=2\\). Mínimo: −5</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Número de raíces por discriminante',content:`
<p>¿Cuántas raíces tiene \\(x^2-4x+5=0\\)?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(\\Delta=(-4)^2-4(1)(5)=16-20=-4\\)</div>
  <div class="step"><span class="step-n">2</span> \\(\\Delta<0\\): sin raíces reales</div>
  <div class="step"><span class="step-n">3</span> Interpretación: la parábola no corta al eje x (vértice sobre el eje x con a>0)</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Problema de proyectil',content:`
<p>La altura de un proyectil es \\(h(t)=-5t^2+20t+1\\) (metros). ¿Cuál es la altura máxima?</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> \\(t_{max}=-\\dfrac{20}{2(-5)}=2\\) segundos</div>
  <div class="step"><span class="step-n">2</span> \\(h(2)=-5(4)+20(2)+1=-20+40+1=21\\) metros</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes en Cuadráticas',content:`
<ul>
  <li>Calcular h como \\(b/2a\\) en vez de \\(-b/2a\\) — el signo negativo es crucial</li>
  <li>Confundir el vértice (h,k) con las raíces (ceros de f)</li>
  <li>En forma vértice \\(y=a(x-h)^2+k\\): el signo de h se invierte (si ves x+3, h=-3)</li>
  <li>Olvidar que la parábola tiene eje de simetría: las raíces son simétricas respecto a h</li>
</ul>`},
    {type:'visual',title:'Referencia Visual',key:'paes-func-cuadraticas-ref'},
    {type:'practice',title:'Práctica',generatorKey:'paes_a_func_cuad',count:10},
    {type:'challenge',title:'Desafío Avanzado',content:`
<p>La parábola \\(y=x^2+bx+c\\) tiene vértice en \\((3,−4)\\). Halla b, c y las raíces.</p>
<details><summary>Solución</summary>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Forma vértice: \\(y=(x-3)^2-4=x^2-6x+9-4=x^2-6x+5\\)</div>
  <div class="step"><span class="step-n">2</span> \\(b=-6,\\ c=5\\)</div>
  <div class="step"><span class="step-n">3</span> Raíces: \\((x-3)^2=4 \\Rightarrow x=3\\pm 2\\). Raíces: x=1 y x=5</div>
</div></details>`}
  ]
};
window.MM_LESSONS.push(lesson);window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* ════════════════════════════════════════════════════════
   VISUALS
════════════════════════════════════════════════════════ */

/* Álgebra reference */
reg('paes-algebra-ref',function(container){
  container.innerHTML='';
  var cards=[
    {t:'Factor común',f:'\\(ka+kb=k(a+b)\\)'},
    {t:'Diferencia de cuadrados',f:'\\(a^2-b^2=(a-b)(a+b)\\)'},
    {t:'Cuadrado de suma',f:'\\((a+b)^2=a^2+2ab+b^2\\)'},
    {t:'Cuadrado de diferencia',f:'\\((a-b)^2=a^2-2ab+b^2\\)'},
    {t:'FOIL',f:'\\((a+b)(c+d)=ac+ad+bc+bd\\)'},
    {t:'Potencia de monomio',f:'\\((ka^m)^n=k^na^{mn}\\)'},
  ];
  var g=document.createElement('div');
  g.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;padding:8px';
  cards.forEach(function(c){
    var d=document.createElement('div');
    d.style.cssText='background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center';
    d.innerHTML='<div style="font-size:0.75rem;font-weight:600;color:var(--primary);margin-bottom:6px">'+c.t+'</div><div>'+c.f+'</div>';
    g.appendChild(d);
  });
  container.appendChild(g);
  if(window.renderMathInElement)window.renderMathInElement(container,{delimiters:[{left:'\\(',right:'\\)',display:false},{left:'\\[',right:'\\]',display:true}]});
});

/* Ecuaciones reference */
reg('paes-ecuaciones-ref',function(container){
  container.innerHTML='';
  var div=document.createElement('div');
  div.style.cssText='padding:12px;max-width:560px;margin:auto';
  div.innerHTML=[
    '<h4 style="margin:0 0 12px;color:var(--primary)">Fórmula Cuadrática</h4>',
    '<div style="background:var(--bg-card);border-radius:10px;padding:16px;text-align:center;font-size:1.2rem;margin-bottom:12px">',
    '\\[x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}\\]</div>',
    '<table style="width:100%;border-collapse:collapse;font-size:0.9rem">',
    '<tr style="background:var(--bg-alt)"><th style="padding:8px;border:1px solid var(--border)">\\(\\Delta\\)</th><th style="padding:8px;border:1px solid var(--border)">Tipo de raíces</th></tr>',
    '<tr><td style="padding:8px;border:1px solid var(--border);text-align:center">\\(>0\\)</td><td style="padding:8px;border:1px solid var(--border)">Dos reales distintas</td></tr>',
    '<tr><td style="padding:8px;border:1px solid var(--border);text-align:center">\\(=0\\)</td><td style="padding:8px;border:1px solid var(--border)">Una real doble</td></tr>',
    '<tr><td style="padding:8px;border:1px solid var(--border);text-align:center">\\(<0\\)</td><td style="padding:8px;border:1px solid var(--border)">Sin raíces reales</td></tr>',
    '</table>'
  ].join('');
  container.appendChild(div);
  if(window.renderMathInElement)window.renderMathInElement(container,{delimiters:[{left:'\\(',right:'\\)',display:false},{left:'\\[',right:'\\]',display:true}]});
});

/* Sistemas reference */
reg('paes-sistemas-ref',function(container){
  container.innerHTML='';
  var div=document.createElement('div');
  div.style.cssText='padding:12px;max-width:560px;margin:auto';
  div.innerHTML=[
    '<table style="width:100%;border-collapse:collapse;font-size:0.9rem">',
    '<tr style="background:var(--primary);color:#fff"><th style="padding:8px">Tipo</th><th style="padding:8px">Condición</th><th style="padding:8px">Gráficamente</th></tr>',
    '<tr><td style="padding:8px;border:1px solid var(--border)">Compatible determinado</td><td style="padding:8px;border:1px solid var(--border)">Det≠0</td><td style="padding:8px;border:1px solid var(--border)">Rectas se cruzan</td></tr>',
    '<tr><td style="padding:8px;border:1px solid var(--border)">Incompatible</td><td style="padding:8px;border:1px solid var(--border)">Det=0, ≠solución</td><td style="padding:8px;border:1px solid var(--border)">Rectas paralelas</td></tr>',
    '<tr><td style="padding:8px;border:1px solid var(--border)">Indeterminado</td><td style="padding:8px;border:1px solid var(--border)">Proporcionales</td><td style="padding:8px;border:1px solid var(--border)">Misma recta</td></tr>',
    '</table>',
    '<div style="margin-top:12px;background:var(--bg-card);border-radius:10px;padding:14px;text-align:center">',
    '\\[\\text{Regla de Cramer: }x=\\frac{D_x}{D},\\quad y=\\frac{D_y}{D}\\]',
    'donde \\(D=a_1b_2-a_2b_1\\)',
    '</div>'
  ].join('');
  container.appendChild(div);
  if(window.renderMathInElement)window.renderMathInElement(container,{delimiters:[{left:'\\(',right:'\\)',display:false},{left:'\\[',right:'\\]',display:true}]});
});

/* Inecuaciones reference */
reg('paes-inecuaciones-ref',function(container){
  container.innerHTML='';
  var div=document.createElement('div');
  div.style.cssText='padding:12px;max-width:560px;margin:auto';
  var cards=[
    {t:'\\(ax<b\\) (a>0)',f:'\\(x<b/a\\)'},
    {t:'\\(-ax<b\\)',f:'\\(x>-b/a\\) (¡invierte!)'},
    {t:'\\(a<f(x)<b\\)',f:'Aplica mismas operaciones a los 3 miembros'},
    {t:'\\(|x|<k\\)',f:'\\(-k<x<k\\)'},
    {t:'\\(|x|>k\\)',f:'\\(x<-k\\) ó \\(x>k\\)'},
    {t:'Cuadrática \\(>0\\) (a>0)',f:'Fuera de las raíces'},
    {t:'Cuadrática \\(<0\\) (a>0)',f:'Entre las raíces'},
  ];
  var g=document.createElement('div');
  g.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px';
  cards.forEach(function(c){
    var d=document.createElement('div');
    d.style.cssText='background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px';
    d.innerHTML='<div style="font-size:0.75rem;color:var(--primary);font-weight:600;margin-bottom:4px">'+c.t+'</div><div style="font-size:0.85rem">'+c.f+'</div>';
    g.appendChild(d);
  });
  div.appendChild(g);
  container.appendChild(div);
  if(window.renderMathInElement)window.renderMathInElement(container,{delimiters:[{left:'\\(',right:'\\)',display:false},{left:'\\[',right:'\\]',display:true}]});
});

/* Funciones lineales reference */
reg('paes-func-lineales-ref',function(container){
  container.innerHTML='';
  var div=document.createElement('div');
  div.style.cssText='padding:12px;max-width:560px;margin:auto';
  var cards=[
    {t:'Pendiente',f:'\\(m=\\dfrac{y_2-y_1}{x_2-x_1}\\)'},
    {t:'Forma pendiente-intercepto',f:'\\(y=mx+b\\)'},
    {t:'Forma punto-pendiente',f:'\\(y-y_0=m(x-x_0)\\)'},
    {t:'Intercepto en x',f:'\\(x=-b/m\\) (hace y=0)'},
    {t:'Paralelas',f:'\\(m_1=m_2\\)'},
    {t:'Perpendiculares',f:'\\(m_1\\cdot m_2=-1\\)'},
  ];
  var g=document.createElement('div');
  g.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px';
  cards.forEach(function(c){
    var d=document.createElement('div');
    d.style.cssText='background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center';
    d.innerHTML='<div style="font-size:0.75rem;color:var(--primary);font-weight:600;margin-bottom:6px">'+c.t+'</div><div>'+c.f+'</div>';
    g.appendChild(d);
  });
  div.appendChild(g);
  container.appendChild(div);
  if(window.renderMathInElement)window.renderMathInElement(container,{delimiters:[{left:'\\(',right:'\\)',display:false},{left:'\\[',right:'\\]',display:true}]});
});

/* Funciones cuadráticas reference */
reg('paes-func-cuadraticas-ref',function(container){
  container.innerHTML='';
  var div=document.createElement('div');
  div.style.cssText='padding:12px;max-width:600px;margin:auto';
  var cards=[
    {t:'Vértice',f:'\\((h,k)\\) donde \\(h=-b/2a\\)'},
    {t:'Forma vértice',f:'\\(y=a(x-h)^2+k\\)'},
    {t:'Eje de simetría',f:'\\(x=h\\)'},
    {t:'Discriminante',f:'\\(\\Delta=b^2-4ac\\)'},
    {t:'Suma de raíces (Vieta)',f:'\\(x_1+x_2=-b/a\\)'},
    {t:'Producto de raíces (Vieta)',f:'\\(x_1\\cdot x_2=c/a\\)'},
    {t:'a>0',f:'Parábola abre arriba → mínimo en vértice'},
    {t:'a<0',f:'Parábola abre abajo → máximo en vértice'},
  ];
  var g=document.createElement('div');
  g.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px';
  cards.forEach(function(c){
    var d=document.createElement('div');
    d.style.cssText='background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center';
    d.innerHTML='<div style="font-size:0.75rem;color:var(--primary);font-weight:600;margin-bottom:6px">'+c.t+'</div><div style="font-size:0.85rem">'+c.f+'</div>';
    g.appendChild(d);
  });
  div.appendChild(g);
  container.appendChild(div);
  if(window.renderMathInElement)window.renderMathInElement(container,{delimiters:[{left:'\\(',right:'\\)',display:false},{left:'\\[',right:'\\]',display:true}]});
});

})();
