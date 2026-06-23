(function(){ 'use strict';
/* ===================================================
   GENERATORS PAES FUNCIONES — Etapa 4
   Topics: Función Potencia, Función Raíz,
           Función Exponencial, Función Logarítmica
   12 generators total
   MC format: {question,options[5],answer,correctIndex,hint,explanation,topic,type,eje}
=================================================== */

/* ── helpers ── */
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function ri(lo,hi){return lo+Math.floor(Math.random()*(hi-lo+1));}
function r2(x){return Math.round(x*100)/100;}
function signN(n){return n<0?String(n):'+'+n;}
function mc(correct,wrongs){
  var pool=[correct].concat(wrongs.slice(0,4));
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  var idx=pool.indexOf(correct);
  return{options:pool,correctIndex:idx,answer:correct};
}
function Q(q,m,hint,exp,topic){
  return{question:q,options:m.options,answer:m.answer,correctIndex:m.correctIndex,
    hint:hint,explanation:exp,topic:topic,type:'opcion_multiple',eje:'Álgebra'};
}

/* ════════════════════════════════════════════════════════
   FUNCIONES PAES  paes_f_func_01 … paes_f_func_12
════════════════════════════════════════════════════════ */

/* 01 – Evaluar función potencia */
MM_GENERATORS['paes_f_func_01']=function(diff){
  var n=pick([2,3,4]),x=ri(-3,3)||1;
  var val=Math.pow(x,n);
  var q='Si \\(f(x)=x^{'+n+'}\\), \\(f('+x+')=\\)';
  var w=[val+1,val-1,n*x,-val].map(String);
  return Q(q,mc(String(val),w),'Eleva x a la potencia n.',
    '\\(f('+x+')=('+x+')^{'+n+'}='+val+'\\)','Función Potencia');
};

/* 02 – Paridad de función potencia */
MM_GENERATORS['paes_f_func_02']=function(diff){
  var n=pick([2,3,4,5]);
  var par=n%2===0;
  var q='La función \\(f(x)=x^{'+n+'}\\) es:';
  var correct=par?'Par (simétrica respecto al eje y)':'Impar (simétrica respecto al origen)';
  var w=['Par (simétrica respecto al eje y)','Impar (simétrica respecto al origen)','Ni par ni impar','Creciente y decreciente a la vez']
    .filter(function(s){return s!==correct;});
  return Q(q,mc(correct,w),'Compara \\(f(-x)\\) con \\(f(x)\\) y \\(-f(x)\\).',
    'Con n='+n+' ('+(par?'par':'impar')+'): \\(f(-x)='+(par?'f(x)':'-f(x)')+'\\), por lo tanto la función es '+(par?'par':'impar')+'.','Función Potencia');
};

/* 03 – Dominio y recorrido de función potencia */
MM_GENERATORS['paes_f_func_03']=function(diff){
  var n=pick([2,4]);
  var q='El recorrido de \\(f(x)=x^{'+n+'}\\) (con n par) es:';
  var correct='\\([0,+\\infty)\\)';
  var w=['\\((-\\infty,+\\infty)\\)','\\((-\\infty,0]\\)','\\((0,+\\infty)\\)','\\([1,+\\infty)\\)'];
  return Q(q,mc(correct,w),'Con exponente par, \\(x^{'+n+'}\\) nunca es negativo.',
    'Para todo x real, \\(x^{'+n+'}\\geq 0\\), y el mínimo (0) se alcanza en x=0. Recorrido: \\([0,+\\infty)\\)','Función Potencia');
};

/* 04 – Evaluar función raíz */
MM_GENERATORS['paes_f_func_04']=function(diff){
  var b=pick([1,2,3,4,5]),x=b*b;
  var q='Si \\(f(x)=\\sqrt{x}\\), \\(f('+x+')=\\)';
  var w=[b+1,b-1,x,-b].map(String);
  return Q(q,mc(String(b),w),'Busca el número cuyo cuadrado es '+x+'.',
    '\\(\\sqrt{'+x+'}='+b+'\\) porque \\('+b+'^2='+x+'\\)','Función Raíz');
};

/* 05 – Dominio de función raíz */
MM_GENERATORS['paes_f_func_05']=function(diff){
  var a=ri(1,5);
  var q='El dominio de \\(f(x)=\\sqrt{x-'+a+'}\\) es:';
  var correct='\\(x \\geq '+a+'\\)';
  var w=['\\(x \\leq '+a+'\\)','\\(x > '+a+'\\)','\\(x \\geq -'+a+'\\)','Todos los reales'];
  return Q(q,mc(correct,w),'El radicando de una raíz cuadrada no puede ser negativo.',
    'Necesitamos \\(x-'+a+'\\geq 0 \\Rightarrow x\\geq '+a+'\\)','Función Raíz');
};

/* 06 – Recorrido de función raíz */
MM_GENERATORS['paes_f_func_06']=function(diff){
  var k=ri(1,6);
  var q='El recorrido de \\(f(x)=\\sqrt{x}+'+k+'\\) es:';
  var correct='\\(['+k+',+\\infty)\\)';
  var w=['\\((-\\infty,'+k+']\\)','\\([0,+\\infty)\\)','\\((-\\infty,+\\infty)\\)','\\(['+(k+1)+',+\\infty)\\)'];
  return Q(q,mc(correct,w),'\\(\\sqrt{x}\\geq 0\\), luego suma el desplazamiento vertical.',
    'Como \\(\\sqrt{x}\\geq 0\\) para todo x del dominio, \\(f(x)=\\sqrt{x}+'+k+'\\geq '+k+'\\). Recorrido: \\(['+k+',+\\infty)\\)','Función Raíz');
};

/* 07 – Evaluar función exponencial */
MM_GENERATORS['paes_f_func_07']=function(diff){
  var b=pick([2,3,5]),x=ri(-2,3);
  var valStr=x<0?('1/'+Math.pow(b,-x)):String(Math.pow(b,x));
  var q='Si \\(f(x)='+b+'^x\\), \\(f('+x+')=\\)';
  var correct='\\('+valStr+'\\)';
  var w=['\\('+(x*b)+'\\)','\\('+Math.pow(b,Math.abs(x))+'\\)','\\('+(b*x)+'\\)','\\('+(b+x)+'\\)'];
  return Q(q,mc(correct,w),x<0?'Recuerda que \\(b^{-n}=1/b^n\\).':'Multiplica b por sí mismo x veces.',
    '\\(f('+x+')='+b+'^{'+x+'}='+valStr+'\\)','Función Exponencial');
};

/* 08 – Crecimiento vs decrecimiento exponencial */
MM_GENERATORS['paes_f_func_08']=function(diff){
  var b=pick([0.3,0.5,0.8,2,3,5]);
  var creciente=b>1;
  var q='La función \\(f(x)='+b+'^x\\) es:';
  var correct=creciente?'Creciente':'Decreciente';
  var w=[creciente?'Decreciente':'Creciente','Constante','No está definida para x<0'];
  return Q(q,mc(correct,w),'Si la base es mayor que 1, la función crece; si está entre 0 y 1, decrece.',
    'Base='+b+(creciente?' > 1: la función es creciente.':' está entre 0 y 1: la función es decreciente.'),'Función Exponencial');
};

/* 09 – Asíntota e intercepto de función exponencial */
MM_GENERATORS['paes_f_func_09']=function(diff){
  var b=pick([2,3,5]);
  var q='La función \\(f(x)='+b+'^x\\) tiene como asíntota horizontal:';
  var correct='\\(y=0\\)';
  var w=['\\(x=0\\)','\\(y=1\\)','\\(y='+b+'\\)','No tiene asíntota'];
  return Q(q,mc(correct,w),'Observa qué pasa con \\(f(x)\\) cuando \\(x\\to-\\infty\\).',
    'Cuando \\(x\\to-\\infty\\), \\('+b+'^x\\to 0\\) pero nunca lo alcanza: asíntota \\(y=0\\)','Función Exponencial');
};

/* 10 – Definición de logaritmo */
MM_GENERATORS['paes_f_func_10']=function(diff){
  var b=pick([2,3,5,10]),n=ri(1,4),val=Math.pow(b,n);
  var q='\\(\\log_{'+b+'}('+val+')=\\)';
  var w=[n+1,n-1,val,b].map(String);
  return Q(q,mc(String(n),w),'Pregúntate: ¿a qué exponente hay que elevar '+b+' para obtener '+val+'?',
    '\\('+b+'^{'+n+'}='+val+'\\), por lo tanto \\(\\log_{'+b+'}('+val+')='+n+'\\)','Función Logarítmica');
};

/* 11 – Dominio de función logarítmica */
MM_GENERATORS['paes_f_func_11']=function(diff){
  var a=ri(1,5);
  var q='El dominio de \\(f(x)=\\log_2(x-'+a+')\\) es:';
  var correct='\\(x > '+a+'\\)';
  var w=['\\(x \\geq '+a+'\\)','\\(x < '+a+'\\)','\\(x \\geq 0\\)','Todos los reales'];
  return Q(q,mc(correct,w),'El argumento de un logaritmo debe ser estrictamente positivo.',
    'Necesitamos \\(x-'+a+'>0 \\Rightarrow x>'+a+'\\)','Función Logarítmica');
};

/* 12 – Relación logaritmo–exponencial */
MM_GENERATORS['paes_f_func_12']=function(diff){
  var b=pick([2,3,5]);
  var q='La función \\(f(x)=\\log_{'+b+'}(x)\\) es la inversa de:';
  var correct='\\(g(x)='+b+'^x\\)';
  var w=['\\(g(x)=x^{'+b+'}\\)','\\(g(x)='+b+'x\\)','\\(g(x)=\\sqrt['+b+']{x}\\)','\\(g(x)=x/'+b+'\\)'];
  return Q(q,mc(correct,w),'El logaritmo y la exponencial de la misma base son funciones inversas.',
    'Como \\(\\log_{'+b+'}(x)=y \\Leftrightarrow '+b+'^y=x\\), la inversa de \\(\\log_{'+b+'}(x)\\) es \\('+b+'^x\\)','Función Logarítmica');
};

/* ── Register topic array ── */
if(!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS={};
window.MM_TOPIC_GENERATORS['paes_f_func']=['paes_f_func_01','paes_f_func_02','paes_f_func_03','paes_f_func_04',
  'paes_f_func_05','paes_f_func_06','paes_f_func_07','paes_f_func_08','paes_f_func_09','paes_f_func_10',
  'paes_f_func_11','paes_f_func_12'];

})();
