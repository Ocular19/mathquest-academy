(function(){ 'use strict';
/* ===================================================
   CONTENT PAES FUNCIONES — Etapa 4
   1 lesson: Función Potencia, Raíz, Exponencial, Logarítmica
=================================================== */

/* ── helpers ── */
function reg(id,fn){ window.MM_GEO_VIS=window.MM_GEO_VIS||{}; window.MM_GEO_VIS[id]=fn; }

(function(){
var lesson={
  id:'paes-funciones',
  title:'Funciones — Potencia, Raíz, Exponencial y Logarítmica',
  subject:'paes',unit:'paes_f_u1',
  sections:[
    {type:'theory',title:'Más allá de la recta y la parábola',content:`
<p>Además de las funciones lineales y cuadráticas, la PAES evalúa otras familias de funciones fundamentales.</p>
<div class="formula-grid">
  <div class="formula-card"><div class="formula-name">Función potencia</div><div class="formula-expr">\\(f(x)=x^n\\)</div></div>
  <div class="formula-card"><div class="formula-name">Función raíz</div><div class="formula-expr">\\(f(x)=\\sqrt{x}\\)</div></div>
  <div class="formula-card"><div class="formula-name">Función exponencial</div><div class="formula-expr">\\(f(x)=b^x,\\ b>0,\\ b\\neq 1\\)</div></div>
  <div class="formula-card"><div class="formula-name">Función logarítmica</div><div class="formula-expr">\\(f(x)=\\log_b(x)\\)</div></div>
</div>
<h4>Ideas clave</h4>
<ul>
  <li>Con exponente <strong>par</strong>, \\(x^n\\) es siempre \\(\\geq 0\\) (función par, simétrica al eje y).</li>
  <li>Con exponente <strong>impar</strong>, \\(x^n\\) puede ser negativo (función impar, simétrica al origen).</li>
  <li>La función raíz \\(\\sqrt{x}\\) solo está definida para \\(x\\geq 0\\): el radicando no puede ser negativo.</li>
  <li>La función exponencial \\(b^x\\) es creciente si \\(b>1\\) y decreciente si \\(0<b<1\\); siempre es positiva y tiene asíntota \\(y=0\\).</li>
  <li>El logaritmo \\(\\log_b(x)\\) solo está definido para \\(x>0\\), y es la función <strong>inversa</strong> de \\(b^x\\).</li>
</ul>`},
    {type:'example',title:'Ejemplo 1 — Evaluar función potencia',content:`
<p><strong>Si</strong> \\(f(x)=x^4\\), <strong>calcula</strong> \\(f(-2)\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Sustituye: \\(f(-2)=(-2)^4\\)</div>
  <div class="step"><span class="step-n">2</span> Exponente par → el resultado es positivo: \\((-2)^4=16\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 2 — Dominio de una raíz',content:`
<p><strong>Encuentra el dominio de</strong> \\(f(x)=\\sqrt{x-3}\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> El radicando no puede ser negativo: \\(x-3\\geq 0\\)</div>
  <div class="step"><span class="step-n">2</span> Despeja: \\(x\\geq 3\\)</div>
  <div class="step"><span class="step-n">3</span> Dominio: \\([3,+\\infty)\\)</div>
</div>`},
    {type:'example',title:'Ejemplo 3 — Logaritmo como exponente inverso',content:`
<p><strong>Calcula</strong> \\(\\log_2(32)\\)</p>
<div class="steps">
  <div class="step"><span class="step-n">1</span> Pregunta: ¿a qué exponente se eleva 2 para obtener 32?</div>
  <div class="step"><span class="step-n">2</span> \\(2^5=32\\)</div>
  <div class="step"><span class="step-n">3</span> Entonces \\(\\log_2(32)=5\\)</div>
</div>`},
    {type:'errors',title:'Errores Frecuentes',content:`
<ul>
  <li>Pensar que \\(\\sqrt{x}\\) está definida para todo x real — solo lo está para \\(x\\geq 0\\).</li>
  <li>Confundir el signo de \\(x^n\\) según la paridad de n: par siempre da resultado \\(\\geq 0\\), impar conserva el signo de x.</li>
  <li>Olvidar que el argumento de un logaritmo debe ser estrictamente positivo (\\(x>0\\), no \\(x\\geq 0\\)).</li>
  <li>Confundir crecimiento/decrecimiento exponencial: \\(b>1\\) crece, \\(0<b<1\\) decrece.</li>
</ul>`},
    {type:'visual',title:'Referencia Visual',key:'paes-funciones-ref'},
    {type:'practice',title:'Práctica',generatorKey:'paes_f_func',count:10},
  ]
};
window.MM_LESSONS=window.MM_LESSONS||[];
window.MM_LESSONS.push(lesson);
window.MM_LESSON_MAP=window.MM_LESSON_MAP||{};
window.MM_LESSON_MAP[lesson.id]=lesson;
})();

/* Visual reference */
reg('paes-funciones-ref',function(container){
  container.innerHTML='';
  var div=document.createElement('div');
  div.style.cssText='padding:12px;max-width:600px;margin:auto';
  var cards=[
    {t:'Potencia (n par)',f:'\\(x^n\\geq 0\\), función par'},
    {t:'Potencia (n impar)',f:'conserva el signo de x, función impar'},
    {t:'Raíz',f:'Dominio: \\(x\\geq 0\\), recorrido: \\(y\\geq 0\\)'},
    {t:'Exponencial',f:'\\(b^x>0\\) siempre, asíntota \\(y=0\\)'},
    {t:'Exponencial creciente',f:'\\(b>1\\)'},
    {t:'Exponencial decreciente',f:'\\(0<b<1\\)'},
    {t:'Logaritmo',f:'Dominio: \\(x>0\\), inversa de \\(b^x\\)'},
    {t:'Relación clave',f:'\\(\\log_b(x)=y \\Leftrightarrow b^y=x\\)'},
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
