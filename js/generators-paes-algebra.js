(function(){ 'use strict';
/* ===================================================
   GENERATORS PAES ÁLGEBRA — Etapa 2
   Topics: Álgebra, Ecuaciones, Sistemas, Inecuaciones,
           Funciones Lineales, Funciones Cuadráticas
   72 generators total (12 per topic)
   MC format: {question,options[5],answer,correctIndex,hint,explanation,topic,type,eje}
=================================================== */

/* ── helpers ── */
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function ri(lo,hi){return lo+Math.floor(Math.random()*(hi-lo+1));}
function r2(x){return Math.round(x*100)/100;}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a||1;}
function sign(n){return n<0?'':'+';}
function signN(n){return n<0?String(n):'+'+n;}
function signPoly(c,v){if(c===0)return'';if(c===1)return'+'+v;if(c===-1)return'-'+v;return(c>0?'+':'')+c+v;}
function coefStr(c,v){if(c===0)return'0';if(c===1)return v;if(c===-1)return'-'+v;return c+v;}
/* Build 5-option MC. correct=string, wrongs=array(4 strings) */
function mc(correct,wrongs){
  var pool=[correct].concat(wrongs.slice(0,4));
  // shuffle
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  var idx=pool.indexOf(correct);
  return{options:pool,correctIndex:idx,answer:correct};
}
/* Full question builder */
function Q(q,m,hint,exp,topic){
  return{question:q,options:m.options,answer:m.answer,correctIndex:m.correctIndex,
    hint:hint,explanation:exp,topic:topic,type:'opcion_multiple',eje:'Álgebra'};
}

/* ════════════════════════════════════════════════════════
   1. ÁLGEBRA BÁSICA  paes_a_alg_01 … paes_a_alg_12
════════════════════════════════════════════════════════ */

/* 01 – Valor numérico de expresión lineal */
MM_GENERATORS['paes_a_alg_01']=function(diff){
  var a=ri(1,5),b=ri(-8,8),x=ri(-4,4)||1;
  var val=a*x+b;
  var expr='\\('+a+'x '+signN(b)+'\\)';
  var q='Si \\(x='+x+'\\), el valor de '+expr+' es:';
  var w=[val+1,val-1,val+a,val-b].map(String);
  return Q(q,mc(String(val),w),'Sustituye x='+x+' directamente.',
    '\\('+a+'('+x+')'+signN(b)+'='+a*x+signN(b)+'='+val+'\\)','Álgebra');
};

/* 02 – Valor numérico con dos variables */
MM_GENERATORS['paes_a_alg_02']=function(diff){
  var a=ri(1,4),b=ri(1,4),x=ri(-3,3)||1,y=ri(-3,3)||2;
  var val=a*x-b*y;
  var q='Si \\(x='+x+'\\) e \\(y='+y+'\\), ¿cuánto vale \\('+a+'x - '+b+'y\\)?';
  var w=[val+b,val-a,a*x+b*y,val+2].map(String);
  return Q(q,mc(String(val),w),'Sustituye cada variable.',
    '\\('+a+'('+x+')-'+b+'('+y+')='+a*x+'-'+b*y+'='+val+'\\)','Álgebra');
};

/* 03 – Factor común monomio */
MM_GENERATORS['paes_a_alg_03']=function(diff){
  var k=ri(2,6),a=ri(1,5),b=ri(1,5);
  var t1=k*a,t2=k*b;
  var q='Factoriza completamente: \\('+t1+'x + '+t2+'y\\)';
  var correct='\\('+k+'('+a+'x + '+b+'y)\\)';
  var w=['\\('+(k-1)+'('+t1+'x + '+t2+'y)\\)','\\('+t1+'(x + y)\\)','\\('+k+'x('+a+' + '+b+')\\)','No factoriza'].map(function(s){return s;});
  return Q(q,mc(correct,w),'Busca el máximo factor común de los coeficientes.',
    'MFC('+t1+','+t2+')='+k+'. Sacando: \\('+k+'('+a+'x+'+b+'y)\\)','Álgebra');
};

/* 04 – Diferencia de cuadrados */
MM_GENERATORS['paes_a_alg_04']=function(diff){
  var a=ri(1,6),b=ri(1,6);
  var q='Factoriza: \\('+(a*a)+'x^2 - '+(b*b)+'\\)';
  var correct='\\(('+a+'x-'+b+')('+a+'x+'+b+')\\)';
  var w=['\\(('+a+'x-'+b+')^2\\)','\\(('+a*a+'x-'+b*b+')(x+1)\\)','\\('+a+'(x-'+b+')(x+'+b+')\\)','\\(('+a+'x)^2-'+b+'^2\\) no factoriza'].map(String);
  return Q(q,mc(correct,w),'Aplica \\(A^2-B^2=(A-B)(A+B)\\)',
    '\\('+a*a+'x^2-'+b*b+'=('+a+'x)^2-'+b+'^2=('+a+'x-'+b+')('+a+'x+'+b+')\\)','Álgebra');
};

/* 05 – Trinomio cuadrado perfecto */
MM_GENERATORS['paes_a_alg_05']=function(diff){
  var a=ri(1,4),b=ri(1,6);
  var A=a*a,B=2*a*b,C=b*b;
  var q='Factoriza: \\('+A+'x^2 + '+B+'x + '+C+'\\)';
  var correct='\\(('+a+'x + '+b+')^2\\)';
  var w=['\\(('+a+'x - '+b+')^2\\)','\\(('+A+'x)(x + '+C+')\\)','\\(('+a+'x+'+b+')('+a+'x-'+b+')\\)','No factoriza'].map(String);
  return Q(q,mc(correct,w),'¿Es un trinomio cuadrado perfecto? Verifica \\((2ab)^2=4a^2b^2\\)',
    '\\('+A+'x^2+'+B+'x+'+C+'=('+a+'x)^2+2('+a+'x)('+b+')+'+b+'^2=('+a+'x+'+b+')^2\\)','Álgebra');
};

/* 06 – Multiplicación de binomios (FOIL) */
MM_GENERATORS['paes_a_alg_06']=function(diff){
  var a=ri(1,4),b=ri(1,6),c=ri(1,4),d=ri(1,6);
  // (ax+b)(cx-d)
  var A=a*c,B=-a*d+b*c,C=-b*d;
  var q='Expande: \\(('+a+'x + '+b+')('+c+'x - '+d+')\\)';
  var correct='\\('+A+'x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+'\\)';
  var w=['\\('+A+'x^2 '+signN(B+1)+'x '+signN(C)+'\\)',
         '\\('+A+'x^2 '+signN(B)+'x '+signN(C+d)+'\\)',
         '\\('+A+'x^2 '+signN(B-c)+'x '+signN(C)+'\\)',
         '\\('+(a*c+1)+'x^2 '+signN(B)+'x '+signN(C)+'\\)'];
  return Q(q,mc(correct,w),'Aplica FOIL: Primeros, Externos, Internos, Últimos.',
    'F:'+a*c+'x², E:'+(a*(-d))+'x, I:'+b*c+'x, U:'+(-b*d)+'. Suma: '+A+'x²'+(B>=0?'+':'')+B+'x'+(C>=0?'+':'')+C,'Álgebra');
};

/* 07 – Simplificación de fracción algebraica */
MM_GENERATORS['paes_a_alg_07']=function(diff){
  var k=ri(2,5),a=ri(1,4),b=ri(1,4);
  // (k*a*x)/(k*b) = (a*x)/b
  var num=k*a,den=k*b;
  var q='Simplifica: \\(\\dfrac{'+num+'x}{'+den+'}\\)';
  var g=gcd(a,b);
  var an=a/g,bn=b/g;
  var correct= bn===1 ? '\\('+an+'x\\)' : '\\(\\dfrac{'+an+'x}{'+bn+'}\\)';
  var w=['\\(\\dfrac{'+num+'x}{'+den+'}\\) no simplifica','\\(\\dfrac{'+(a+1)+'x}{'+b+'}\\)','\\(\\dfrac{x}{'+k+'}\\)','\\('+num+'x\\)'];
  return Q(q,mc(correct,w),'Divide numerador y denominador por el MFC.',
    'MFC('+num+','+den+')='+k*g+'. Dividiendo: \\(\\dfrac{'+an+'x}{'+bn+'}\\)','Álgebra');
};

/* 08 – Suma de fracciones algebraicas */
MM_GENERATORS['paes_a_alg_08']=function(diff){
  var a=ri(2,5),b=ri(2,5);
  // 1/a + 1/b = (a+b)/(ab)
  var num=a+b,den=a*b,g=gcd(num,den);
  var rn=num/g,rd=den/g;
  var q='Simplifica: \\(\\dfrac{1}{'+a+'} + \\dfrac{1}{'+b+'}\\)';
  var correct= rd===1 ? '\\('+rn+'\\)' : '\\(\\dfrac{'+rn+'}{'+rd+'}\\)';
  var w=['\\(\\dfrac{2}{'+a+b+'}\\)','\\(\\dfrac{1}{'+a*b+'}\\)','\\(\\dfrac{'+(a+b+1)+'}{'+a*b+'}\\)','\\(\\dfrac{'+rn+'}{'+rd+'}\\)'.replace(rn,rn+1)];
  return Q(q,mc(correct,w),'Busca el mínimo común múltiplo de los denominadores.',
    'MCM('+a+','+b+')='+a*b+'. \\(\\dfrac{'+b+'}{'+a*b+'} + \\dfrac{'+a+'}{'+a*b+'}=\\dfrac{'+num+'}{'+a*b+'}=\\dfrac{'+rn+'}{'+rd+'}\\)','Álgebra');
};

/* 09 – Potencia de monomio */
MM_GENERATORS['paes_a_alg_09']=function(diff){
  var a=ri(2,4),n=ri(2,3),e=ri(1,3);
  var an=Math.pow(a,n),en=e*n;
  var q='Simplifica: \\(('+a+'x^'+e+')^'+n+'\\)';
  var correct='\\('+an+'x^{'+en+'}\\)';
  var w=['\\('+(an+1)+'x^{'+en+'}\\)','\\('+an+'x^{'+(en+1)+'}\\)','\\('+(a*n)+'x^{'+en+'}\\)','\\('+an+'x^{'+(e+n)+'}\\)'];
  return Q(q,mc(correct,w),'Eleva el coeficiente a la potencia y multiplica los exponentes.',
    '\\(('+a+')^'+n+'='+an+'\\) y el exponente \\('+e+'\\times'+n+'='+en+'\\). Resultado: \\('+an+'x^{'+en+'}\\)','Álgebra');
};

/* 10 – División de monomios */
MM_GENERATORS['paes_a_alg_10']=function(diff){
  var a=ri(2,6),b=ri(2,5),m=ri(3,5),n=ri(1,m-1);
  var q='Simplifica: \\(\\dfrac{'+a*b+'x^{'+m+'}}{'+b+'x^{'+n+'}}\\)';
  var correct='\\('+a+'x^{'+(m-n)+'}\\)';
  var w=['\\('+(a+1)+'x^{'+(m-n)+'}\\)','\\('+a+'x^{'+(m-n+1)+'}\\)','\\('+a+'x^{'+(m+n)+'}\\)','\\('+(a*b)+'x^{'+(m-n)+'}\\)'];
  return Q(q,mc(correct,w),'Divide coeficientes y resta exponentes.',
    '\\(\\dfrac{'+a*b+'}{'+b+'}='+a+'\\) y \\(x^{'+m+'-'+n+'}=x^{'+(m-n)+'}\\)','Álgebra');
};

/* 11 – Producto notable (a+b)² */
MM_GENERATORS['paes_a_alg_11']=function(diff){
  var a=ri(1,5),b=ri(1,5);
  var q='Expande: \\((x + '+b+')^2\\)';
  var correct='\\(x^2 + '+2*b+'x + '+b*b+'\\)';
  var w=['\\(x^2 + '+b+'x + '+b*b+'\\)','\\(x^2 + '+2*b+'x + '+(b*b+1)+'\\)','\\(x^2 - '+2*b+'x + '+b*b+'\\)','\\(x^2 + '+b*b+'\\)'];
  return Q(q,mc(correct,w),'\\((a+b)^2=a^2+2ab+b^2\\)',
    '\\(x^2 + 2(x)('+b+') + '+b+'^2 = x^2+'+2*b+'x+'+b*b+'\\)','Álgebra');
};

/* 12 – Evaluación de polinomio cuadrático */
MM_GENERATORS['paes_a_alg_12']=function(diff){
  var a=ri(1,3),b=ri(-4,4),c=ri(-5,5),x=ri(-2,3)||1;
  var val=a*x*x+b*x+c;
  var q='Si \\(p(x)='+a+'x^2 '+(b>=0?'+':'')+b+'x '+(c>=0?'+':'')+c+'\\), entonces \\(p('+x+')=\\)';
  var w=[val+1,val-1,val+a,val-b].map(String);
  return Q(q,mc(String(val),w),'Sustituye x='+x+' en el polinomio.',
    '\\('+a+'('+x+')^2'+(b>=0?'+':'')+b+'('+x+')'+(c>=0?'+':'')+c+'='+a*x*x+(b>=0?'+':'')+b*x+(c>=0?'+':'')+c+'='+val+'\\)','Álgebra');
};

/* ════════════════════════════════════════════════════════
   2. ECUACIONES  paes_a_ec_01 … paes_a_ec_12
════════════════════════════════════════════════════════ */

/* 01 – Ecuación lineal simple */
MM_GENERATORS['paes_a_ec_01']=function(diff){
  var a=ri(2,9),b=ri(-8,8),sol=ri(-5,5)||1;
  var rhs=a*sol+b;
  var q='Resuelve: \\('+a+'x '+(b>=0?'+':'')+b+' = '+rhs+'\\)';
  var w=[sol+1,sol-1,-sol,sol*2].map(String);
  return Q(q,mc(String(sol),w),'Despeja x: resta '+b+' y divide por '+a+'.',
    '\\('+a+'x='+rhs+'-('+(b>=0?'+':'')+b+')='+(rhs-b)+'\\Rightarrow x='+(rhs-b)+'/'+a+'='+sol+'\\)','Ecuaciones');
};

/* 02 – Ecuación con paréntesis */
MM_GENERATORS['paes_a_ec_02']=function(diff){
  var a=ri(1,4),b=ri(1,5),sol=ri(-3,5)||1;
  // a(x+b) = a*sol + a*b
  var rhs=a*(sol+b);
  var q='Resuelve: \\('+a+'(x '+(b>=0?'+':'')+b+') = '+rhs+'\\)';
  var w=[sol+1,sol-1,sol+b,-sol].map(String);
  return Q(q,mc(String(sol),w),'Distribuye primero, luego despeja.',
    '\\('+a+'x+'+(a*b)+'='+rhs+'\\Rightarrow '+a+'x='+(rhs-a*b)+'\\Rightarrow x='+sol+'\\)','Ecuaciones');
};

/* 03 – Ecuación con variable en ambos lados */
MM_GENERATORS['paes_a_ec_03']=function(diff){
  var sol=ri(-4,5)||1,a=ri(2,6),b=ri(1,5),c=ri(1,4);
  // ax + b = (a-c)x + b + c*sol   =>  cx = c*sol  => x=sol
  var lhs_const=b;var rhs_const=b+c*sol;var rhs_coef=a-c;
  var q='Resuelve: \\('+a+'x '+(lhs_const>=0?'+':'')+lhs_const+' = '+rhs_coef+'x '+(rhs_const>=0?'+':'')+rhs_const+'\\)';
  var w=[sol+1,sol-1,-sol,sol+c].map(String);
  return Q(q,mc(String(sol),w),'Pasa los términos con x al mismo lado.',
    '\\('+(c)+'x='+(rhs_const-lhs_const)+'\\Rightarrow x='+sol+'\\)','Ecuaciones');
};

/* 04 – Ecuación con fracción simple */
MM_GENERATORS['paes_a_ec_04']=function(diff){
  var sol=ri(1,8),d=ri(2,5);
  var num=d*sol;
  var q='Resuelve: \\(\\dfrac{x}{'+d+'} = '+sol+'\\)';
  var w=[sol+d,sol-d,sol*d+1,sol+1].map(String);
  return Q(q,mc(String(num),w),'Multiplica ambos lados por '+d+'.',
    '\\(x = '+sol+' \\times '+d+' = '+num+'\\)','Ecuaciones');
};

/* 05 – Ecuación fraccionaria (ambos lados) */
MM_GENERATORS['paes_a_ec_05']=function(diff){
  var sol=ri(2,6),d=ri(2,4),e=ri(2,4),a=ri(1,3);
  // x/d - a = (x-sol*e)/e  =>... pick simpler: x/d=a+sol/e
  // Simpler: ax/d = sol => x=sol*d/a
  var x=sol*d;
  var q='Resuelve: \\(\\dfrac{'+a+'x}{'+d+'} = '+sol+'\\)';
  var correct=String(x);
  var w=[sol,x+d,x-1,x+a].map(String);
  return Q(q,mc(correct,w),'Multiplica ambos lados por '+d+' y despeja.',
    '\\('+a+'x = '+sol+' \\times '+d+' = '+(sol*d)+'\\Rightarrow x='+(sol*d/a)+'\\)','Ecuaciones');
};

/* 06 – Ecuación literal (despejar variable) */
MM_GENERATORS['paes_a_ec_06']=function(diff){
  // Despeja b en: a = (b+c)/d
  var variants=[
    {q:'Despeja \\(b\\) en \\(a = \\dfrac{b+c}{d}\\)',ans:'\\(b = ad - c\\)',exp:'\\(ad = b+c \\Rightarrow b = ad-c\\)'},
    {q:'Despeja \\(r\\) en \\(I = Prt\\)',ans:'\\(r = \\dfrac{I}{Pt}\\)',exp:'\\(r = \\dfrac{I}{Pt}\\) dividiendo por \\(Pt\\)'},
    {q:'Despeja \\(h\\) en \\(A = \\dfrac{bh}{2}\\)',ans:'\\(h = \\dfrac{2A}{b}\\)',exp:'\\(2A = bh \\Rightarrow h = \\dfrac{2A}{b}\\)'},
    {q:'Despeja \\(v\\) en \\(E = \\dfrac{mv^2}{2}\\)',ans:'\\(v = \\sqrt{\\dfrac{2E}{m}}\\)',exp:'\\(v^2 = \\dfrac{2E}{m} \\Rightarrow v = \\sqrt{\\dfrac{2E}{m}}\\)'},
  ];
  var v=pick(variants);
  var wrongs=['\\(b = a + cd\\)','\\(b = \\dfrac{a}{d} - c\\)','\\(b = ad + c\\)','\\(b = \\dfrac{c}{ad}\\)'];
  if(v.ans!==wrongs[0]){}
  return Q(v.q,mc(v.ans,wrongs),
    'Aplica operaciones inversas en orden para despejar la variable.',
    v.exp,'Ecuaciones');
};

/* 07 – Ecuación cuadrática por factorización */
MM_GENERATORS['paes_a_ec_07']=function(diff){
  var r1=ri(-4,4)||1,r2b=ri(-4,4)||2;
  while(r2b===r1)r2b=ri(-4,4)||3;
  var B=-(r1+r2b),C=r1*r2b;
  var q='Resuelve: \\(x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+' = 0\\)';
  var sol=[r1,r2b].sort(function(a,b){return a-b;});
  var correct='\\(x='+sol[0]+'\\) y \\(x='+sol[1]+'\\)';
  var w=['\\(x='+sol[0]+'\\) solamente','\\(x='+(sol[0]+1)+'\\) y \\(x='+(sol[1]-1)+'\\)','\\(x='+(-sol[0])+'\\) y \\(x='+(-sol[1])+'\\)','No tiene solución real'];
  return Q(q,mc(correct,w),'Factoriza como \\((x-r_1)(x-r_2)=0\\)',
    '\\((x-'+r1+')(x-'+r2b+')=0 \\Rightarrow x='+r1+'\\) o \\(x='+r2b+'\\)','Ecuaciones');
};

/* 08 – Fórmula cuadrática */
MM_GENERATORS['paes_a_ec_08']=function(diff){
  // ax²+bx+c=0 con discriminante perfecto
  var r1=ri(-3,3)||1,r2b=ri(-3,3)||2;
  while(r2b===r1)r2b+=1;
  var B=-(r1+r2b),C=r1*r2b;
  var disc=B*B-4*C;
  var q='Usando la fórmula general, resuelve: \\(x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+' = 0\\)';
  var sol=[r1,r2b].sort(function(a,b){return a-b;});
  var correct='\\(x='+sol[0]+'\\) y \\(x='+sol[1]+'\\)';
  var w=['\\(x=\\dfrac{'+(-B)+'±\\sqrt{'+disc+'}}{2}\\) (sin simplificar)','\\(x='+(sol[0]+1)+'\\) y \\(x='+(sol[1]+1)+'\\)','\\(x='+sol[0]+'\\) solamente','Sin solución real'];
  return Q(q,mc(correct,w),'\\(x=\\dfrac{-b±\\sqrt{b^2-4ac}}{2a}\\)',
    '\\(\\Delta='+B+'^2-4(1)('+C+')='+disc+'\\), \\(\\sqrt{'+disc+'}='+(sol[1]-sol[0])+'\\). Soluciones: '+sol[0]+' y '+sol[1],'Ecuaciones');
};

/* 09 – Discriminante */
MM_GENERATORS['paes_a_ec_09']=function(diff){
  var cases=[
    {a:1,b:2,c:-3,d:16,tipo:'Dos raíces reales distintas'},
    {a:1,b:4,c:4,d:0,tipo:'Una raíz real doble'},
    {a:1,b:1,c:2,d:-7,tipo:'Dos raíces reales distintas'},
    {a:2,b:3,c:5,d:-31,tipo:'Sin raíces reales'},
  ];
  var cas=pick(cases);
  var disc=cas.b*cas.b-4*cas.a*cas.c;
  var q='Para \\('+cas.a+'x^2 '+(cas.b>=0?'+':'')+cas.b+'x '+(cas.c>=0?'+':'')+cas.c+'=0\\), ¿cuántas raíces reales tiene?';
  var tipos=['Dos raíces reales distintas','Una raíz real doble','Sin raíces reales','Infinitas soluciones'];
  var correct=disc>0?tipos[0]:disc===0?tipos[1]:tipos[2];
  var w=tipos.filter(function(t){return t!==correct;});
  return Q(q,mc(correct,w),'Calcula \\(\\Delta = b^2 - 4ac\\) e interpreta el signo.',
    '\\(\\Delta='+cas.b+'^2-4('+cas.a+')('+cas.c+')='+disc+'\\). '+
    (disc>0?'\\(\\Delta>0\\): dos raíces':disc===0?'\\(\\Delta=0\\): una raíz doble':'\\(\\Delta<0\\): sin raíces reales'),'Ecuaciones');
};

/* 10 – Ecuación cuadrática incompleta */
MM_GENERATORS['paes_a_ec_10']=function(diff){
  var a=ri(1,4),k=ri(1,9);
  var val=k*k/a;
  var q='Resuelve: \\('+a+'x^2 = '+a*k*k+'\\)';
  var correct='\\(x = ±'+k+'\\)';
  var w=['\\(x = '+k+'\\)','\\(x = ±\\sqrt{'+a*k*k+'}\\) (sin simplificar)','\\(x = '+k*k+'\\)','Sin solución'];
  return Q(q,mc(correct,w),'Despeja x² y saca raíz cuadrada (recuerda el ±).',
    '\\(x^2='+k*k+'\\Rightarrow x=±\\sqrt{'+k*k+'}=±'+k+'\\)','Ecuaciones');
};

/* 11 – Problema con ecuación lineal */
MM_GENERATORS['paes_a_ec_11']=function(diff){
  var x=ri(5,20),extra=ri(2,8);
  var other=x+extra;
  var sum=x+other;
  var q='La suma de dos números es '+sum+'. El mayor supera al menor en '+extra+'. ¿Cuál es el menor?';
  var correct=String(x);
  var w=[other,x+1,x-1,Math.floor(sum/2)].map(String);
  return Q(q,mc(correct,w),'Llama al menor x; el mayor es x+'+extra+'. Suma = '+sum+'.',
    'x+(x+'+extra+')='+sum+' → 2x='+( sum-extra)+'→ x='+x,'Ecuaciones');
};

/* 12 – Ecuación de movimiento uniforme d=vt */
MM_GENERATORS['paes_a_ec_12']=function(diff){
  var v=ri(40,120),t=ri(2,5);
  var d=v*t;
  var q='Un auto viaja a '+v+' km/h durante '+t+' horas. ¿Qué distancia recorre?';
  var correct=d+' km';
  var w=[(d+v)+' km',(d-v)+' km',(d+t)+' km',(v+t)+' km'];
  return Q(q,mc(correct,w),'Usa \\(d=v\\cdot t\\).',
    '\\(d='+v+' \\times '+t+'='+d+'\\) km','Ecuaciones');
};

/* ════════════════════════════════════════════════════════
   3. SISTEMAS 2×2  paes_a_sis_01 … paes_a_sis_12
════════════════════════════════════════════════════════ */

function genSys(){
  // random integer solution
  var x=ri(-4,4)||1,y=ri(-4,4)||2;
  while(x===y)y=ri(-4,4)||3;
  var a1=ri(1,4),b1=ri(1,3),a2=ri(1,3),b2=ri(1,4);
  while(a1*b2===a2*b1){b2=ri(1,4);}
  var c1=a1*x+b1*y,c2=a2*x+b2*y;
  return{a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2,x:x,y:y};
}

MM_GENERATORS['paes_a_sis_01']=function(diff){
  var s=genSys();
  var q='Resuelve el sistema:\n\\[\\begin{cases}'+s.a1+'x+'+s.b1+'y='+s.c1+'\\\\'+s.a2+'x+'+s.b2+'y='+s.c2+'\\end{cases}\\]';
  var correct='\\(x='+s.x+',\\ y='+s.y+'\\)';
  var w=['\\(x='+(s.x+1)+',\\ y='+s.y+'\\)','\\(x='+s.x+',\\ y='+(s.y+1)+'\\)','\\(x='+(s.y)+',\\ y='+(s.x)+'\\)','Sin solución'];
  return Q(q,mc(correct,w),'Usa sustitución o eliminación.',
    'Solución: x='+s.x+', y='+s.y+'. Verifica: '+s.a1+'('+s.x+')+'+s.b1+'('+s.y+')='+s.c1,'Sistemas');
};

MM_GENERATORS['paes_a_sis_02']=function(diff){
  var s=genSys();
  var q='Dado el sistema:\n\\[\\begin{cases}'+s.a1+'x-'+s.b1+'y='+s.c1+'\\\\'+s.a2+'x+'+s.b2+'y='+s.c2+'\\end{cases}\\]';
  var correct='\\(('+s.x+',\\ '+s.y+')\\)';
  var w=['\\(('+(s.x-1)+',\\ '+s.y+')\\)','\\(('+s.x+',\\ '+(s.y-1)+')\\)','\\(('+(s.x+s.y)+',\\ 0)\\)','Sin solución única'];
  return Q(q,mc(correct,w),'Método de eliminación: suma o resta ecuaciones para cancelar una variable.',
    'Ajusta coeficientes para eliminar x o y, luego sustituye.','Sistemas');
};

MM_GENERATORS['paes_a_sis_03']=function(diff){
  // Sustitución directa: y = mx + b
  var m=ri(1,3),b=ri(-4,4),x=ri(-2,3)||1;
  var y=m*x+b;
  var k=ri(1,3),d=k*x-y;
  var q='Si \\(y='+m+'x'+(b>=0?'+':'')+b+'\\) y \\('+k+'x-y='+d+'\\), halla \\(x\\).';
  var correct=String(x);
  var w=[x+1,x-1,-x,x+m].map(String);
  return Q(q,mc(correct,w),'Sustituye y en la segunda ecuación.',
    '\\('+k+'x-('+m+'x'+(b>=0?'+':'')+b+')='+d+' \\Rightarrow '+(k-m)+'x='+( d+b)+'\\Rightarrow x='+x+'\\)','Sistemas');
};

MM_GENERATORS['paes_a_sis_04']=function(diff){
  var s=genSys();
  var q='Determina el valor de \\(x+y\\) para el sistema:\n\\[\\begin{cases}'+s.a1+'x+'+s.b1+'y='+s.c1+'\\\\'+s.a2+'x+'+s.b2+'y='+s.c2+'\\end{cases}\\]';
  var correct=String(s.x+s.y);
  var w=[s.x+s.y+1,s.x*s.y,s.x-s.y,s.c1+s.c2].map(String);
  return Q(q,mc(correct,w),'Primero halla x e y por separado.',
    'x='+s.x+', y='+s.y+', por lo tanto x+y='+(s.x+s.y),'Sistemas');
};

MM_GENERATORS['paes_a_sis_05']=function(diff){
  var s=genSys();
  var q='¿Cuál es el valor de \\(x-y\\) en el sistema?\n\\[\\begin{cases}'+s.a1+'x+'+s.b1+'y='+s.c1+'\\\\'+s.a2+'x+'+s.b2+'y='+s.c2+'\\end{cases}\\]';
  var correct=String(s.x-s.y);
  var w=[s.x-s.y+1,s.x-s.y-1,s.y-s.x,s.x+s.y].map(String);
  return Q(q,mc(correct,w),'Resuelve el sistema, luego calcula x-y.',
    'x='+s.x+', y='+s.y+', x-y='+(s.x-s.y),'Sistemas');
};

MM_GENERATORS['paes_a_sis_06']=function(diff){
  // Sistema sin solución (paralelas)
  var a=ri(1,4),b=ri(1,3),c1=ri(1,8),c2=c1+ri(1,5);
  var q='Analiza el sistema:\n\\[\\begin{cases}'+a+'x+'+b+'y='+c1+'\\\\'+a+'x+'+b+'y='+c2+'\\end{cases}\\]';
  var correct='Sin solución (sistema incompatible)';
  var w=['\\((1, 1)\\)','Infinitas soluciones','\\((0, 0)\\)','\\(('+c1+', '+c2+')\\)'];
  return Q(q,mc(correct,w),'Si las ecuaciones son proporcionales pero con distinto término independiente, no hay solución.',
    'Ambas ecuaciones tienen los mismos coeficientes pero \\('+c1+'\\neq '+c2+'\\): rectas paralelas, sin punto de intersección.','Sistemas');
};

MM_GENERATORS['paes_a_sis_07']=function(diff){
  // Problema de mezcla: precio × cantidad
  var p1=ri(100,500)*10,p2=ri(100,500)*10;
  while(p2===p1)p2=ri(100,500)*10;
  var q1=ri(2,6),q2=ri(2,6);
  var total=p1*q1+p2*q2;
  var totalQ=q1+q2;
  var q='Se venden '+totalQ+' productos: algunos a $'+p1+' y otros a $'+p2+'. Total $'+total+'. ¿Cuántos son del primer tipo?';
  var correct=String(q1);
  var w=[q2,q1+1,q1-1,totalQ-q1+1].map(String);
  return Q(q,mc(correct,w),'Plantea: x+y='+totalQ+' y '+p1+'x+'+p2+'y='+total,
    p1+'x+'+p2+'('+totalQ+'-x)='+total+' → '+(p1-p2)+'x='+( total-p2*totalQ)+'→x='+q1,'Sistemas');
};

MM_GENERATORS['paes_a_sis_08']=function(diff){
  var s=genSys();
  var q='¿Cuál par ordenado (x, y) satisface ambas ecuaciones?\n\\[\\begin{cases}'+s.a1+'x+'+s.b1+'y='+s.c1+'\\\\'+s.a2+'x+'+s.b2+'y='+s.c2+'\\end{cases}\\]';
  var correct='('+s.x+', '+s.y+')';
  var w=['('+(s.x+1)+', '+s.y+')','('+s.x+', '+(s.y+1)+')','('+(s.y)+', '+(s.x)+')',( '(0, 0)')].map(function(s){return s;});
  return Q(q,mc(correct,w),'Verifica sustituyendo los pares candidatos en ambas ecuaciones.',
    'x='+s.x+', y='+s.y+' satisface ambas: '+s.a1+'('+s.x+')+'+s.b1+'('+s.y+')='+s.c1+' ✓','Sistemas');
};

MM_GENERATORS['paes_a_sis_09']=function(diff){
  // Edad problem
  var ahora1=ri(10,30),dif=ri(2,10);
  var ahora2=ahora1+dif;
  var yrs=ri(3,8);
  // En 'yrs' años: ahora1+yrs + ahora2+yrs = sum_future
  var sumF=(ahora1+yrs)+(ahora2+yrs);
  var q='Hoy la suma de las edades de A y B es '+(ahora1+ahora2)+'. En '+yrs+' años la suma será '+sumF+'. ¿Cuántos años tiene A hoy (el menor)?';
  var correct=String(ahora1);
  var w=[ahora2,ahora1+1,ahora1-1,ahora1+dif].map(String);
  return Q(q,mc(correct,w),'Plantea x+y='+(ahora1+ahora2)+' y (x+'+yrs+')+(y+'+yrs+')='+sumF,
    'x+y='+(ahora1+ahora2)+'; sum_futura automáticamente se cumple. La diferencia de edades es '+dif+'. A='+ahora1,'Sistemas');
};

MM_GENERATORS['paes_a_sis_10']=function(diff){
  var s=genSys();
  var q='Resuelve por eliminación:\n\\[\\begin{cases}'+s.a1+'x+'+s.b1+'y='+s.c1+'\\\\'+s.a2+'x+'+s.b2+'y='+s.c2+'\\end{cases}\\]';
  var correct='\\(x='+s.x+',\\ y='+s.y+'\\)';
  var w=['\\(x='+(s.x+2)+',\\ y='+(s.y-1)+'\\)','\\(x='+s.y+',\\ y='+s.x+'\\)','\\(x='+(-s.x)+',\\ y='+(-s.y)+'\\)','Sin solución'];
  return Q(q,mc(correct,w),'Multiplica ecuaciones para igualar coeficientes y elimina una variable.',
    'Tras eliminar, se obtiene x='+s.x+'. Sustituyendo, y='+s.y,'Sistemas');
};

MM_GENERATORS['paes_a_sis_11']=function(diff){
  var s=genSys();
  var q='¿Cuál es el valor de \\(2x+3y\\) para el sistema?\n\\[\\begin{cases}'+s.a1+'x+'+s.b1+'y='+s.c1+'\\\\'+s.a2+'x+'+s.b2+'y='+s.c2+'\\end{cases}\\]';
  var val=2*s.x+3*s.y;
  var w=[val+1,val-1,3*s.x+2*s.y,s.x+s.y].map(String);
  return Q(q,mc(String(val),w),'Halla x e y, luego calcula 2x+3y.',
    'x='+s.x+', y='+s.y+', 2('+s.x+')+3('+s.y+')='+val,'Sistemas');
};

MM_GENERATORS['paes_a_sis_12']=function(diff){
  // Sistema con decimales/fracciones convertido a enteros
  var x=ri(1,5),y=ri(1,5);
  // 2x + y = c1,  x + 3y = c2
  var c1=2*x+y,c2=x+3*y;
  var q='Resuelve:\n\\[\\begin{cases}2x+y='+c1+'\\\\x+3y='+c2+'\\end{cases}\\]';
  var correct='\\(x='+x+',\\ y='+y+'\\)';
  var w=['\\(x='+(x+1)+',\\ y='+(y-1)+'\\)','\\(x='+y+',\\ y='+x+'\\)','\\(x='+c1+',\\ y=0\\)','\\(x=0,\\ y='+c2+'\\)'];
  return Q(q,mc(correct,w),'Elimina x: multiplica la segunda por 2 y resta.',
    '2x+y='+c1+'; 2x+6y='+2*c2+' → 5y='+(2*c2-c1)+'='+5*y+'→ y='+y+'. x='+(c1-y)+'='+x,'Sistemas');
};

/* ════════════════════════════════════════════════════════
   4. INECUACIONES  paes_a_ine_01 … paes_a_ine_12
════════════════════════════════════════════════════════ */

MM_GENERATORS['paes_a_ine_01']=function(diff){
  var a=ri(1,5),b=ri(-6,6),c=ri(-6,6);
  var rhs=(c-b); var sol_num=rhs, sol_den=a;
  var g=gcd(Math.abs(sol_num),Math.abs(sol_den));
  var n=sol_num/g,d=sol_den/g;
  var solStr=d===1?String(n):'\\dfrac{'+n+'}{'+d+'}';
  var q='Resuelve: \\('+a+'x '+(b>=0?'+':'')+b+' < '+c+'\\)';
  var correct='\\(x < '+solStr+'\\)';
  var w=['\\(x > '+solStr+'\\)','\\(x < '+(n+1)+'\\)','\\(x ≤ '+solStr+'\\)','\\(x = '+solStr+'\\)'];
  return Q(q,mc(correct,w),'Despeja x como en una ecuación. El signo < no cambia al dividir por número positivo.',
    '\\('+a+'x < '+(c-b)+'\\Rightarrow x < '+solStr+'\\)','Inecuaciones');
};

MM_GENERATORS['paes_a_ine_02']=function(diff){
  // División por negativo: signo cambia
  var a=ri(2,5);
  var b=ri(2,10),c=ri(-8,-1);
  // -ax + b > c => -ax > c-b => x < (b-c)/a
  var rhs=b-c,sol_n=rhs,sol_d=a;
  var g=gcd(sol_n,sol_d);
  var n=sol_n/g,d=sol_d/g;
  var solStr=d===1?String(n):'\\dfrac{'+n+'}{'+d+'}';
  var q='Resuelve: \\(-'+a+'x + '+b+' > '+c+'\\)';
  var correct='\\(x < '+solStr+'\\)';
  var w=['\\(x > '+solStr+'\\)','\\(x > '+(n-1)+'\\)','\\(x ≤ '+solStr+'\\)','\\(x < '+(n+1)+'\\)'];
  return Q(q,mc(correct,w),'¡Al dividir o multiplicar por negativo, el signo de desigualdad cambia!',
    '\\(-'+a+'x > '+(c-b)+'\\Rightarrow x < \\dfrac{'+b+'-('+(c)+')'+'}{'+a+'}='+solStr+'\\)','Inecuaciones');
};

MM_GENERATORS['paes_a_ine_03']=function(diff){
  // Inecuación doble
  var lo=ri(1,4),hi=lo+ri(2,6);
  var a=ri(1,3),b=ri(0,3);
  // lo < ax+b < hi => (lo-b)/a < x < (hi-b)/a
  var xlo=(lo-b)/a,xhi=(hi-b)/a;
  var q='Resuelve la inecuación doble: \\('+lo+' < '+a+'x'+(b>0?'+'+b:'')+'< '+hi+'\\)';
  var correct='\\('+r2(xlo)+' < x < '+r2(xhi)+'\\)';
  var w=['\\('+r2(xlo)+' ≤ x ≤ '+r2(xhi)+'\\)','\\('+r2(xhi)+' < x < '+r2(xlo)+'\\)','\\(x < '+r2(xlo)+'\\) ó \\(x>'+r2(xhi)+'\\)','\\('+r2(xlo-1)+' < x < '+r2(xhi+1)+'\\)'];
  return Q(q,mc(correct,w),'Aplica las mismas operaciones a los tres miembros.',
    '\\('+lo+'-'+b+' < '+a+'x < '+hi+'-'+b+'\\Rightarrow '+r2(xlo)+' < x < '+r2(xhi)+'\\)','Inecuaciones');
};

MM_GENERATORS['paes_a_ine_04']=function(diff){
  // Inecuación cuadrática x²-bx+c<0 con raíces enteras
  var r1=ri(0,5),r2b=r1+ri(1,4);
  var B=-(r1+r2b),C=r1*r2b;
  var q='Resuelve: \\(x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+' < 0\\)';
  var correct='\\('+r1+' < x < '+r2b+'\\)';
  var w=['\\(x < '+r1+'\\) ó \\(x > '+r2b+'\\)','\\('+r1+' ≤ x ≤ '+r2b+'\\)','\\(x < '+r2b+'\\)','\\(x > '+r1+'\\)'];
  return Q(q,mc(correct,w),'Factoriza y analiza el signo entre las raíces.',
    '\\((x-'+r1+')(x-'+r2b+')<0\\) cuando \\('+r1+'<x<'+r2b+'\\) (parábola abre arriba, negativa entre raíces).','Inecuaciones');
};

MM_GENERATORS['paes_a_ine_05']=function(diff){
  var r1=ri(0,4),r2b=r1+ri(1,4);
  var B=-(r1+r2b),C=r1*r2b;
  var q='¿Para qué valores de \\(x\\) es \\(x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+' > 0\\)?';
  var correct='\\(x < '+r1+'\\) ó \\(x > '+r2b+'\\)';
  var w=['\\('+r1+' < x < '+r2b+'\\)','\\(x > '+r1+'\\)','\\(x < '+r2b+'\\)','Nunca es positiva'];
  return Q(q,mc(correct,w),'La parábola abre hacia arriba: es positiva fuera de las raíces.',
    '\\((x-'+r1+')(x-'+r2b+')>0\\) cuando x<'+r1+' o x>'+r2b+'.','Inecuaciones');
};

MM_GENERATORS['paes_a_ine_06']=function(diff){
  var a=ri(2,6),b=ri(1,8);
  var sol=Math.ceil(b/a);
  var q='Un estudiante necesita que \\('+a+'x > '+b+'\\). El menor entero que satisface esto es:';
  var correct=String(sol);
  var w=[sol-1,sol+1,sol+2,0].map(String);
  return Q(q,mc(correct,w),'Resuelve la inecuación y redondea al entero mayor más cercano.',
    '\\(x > '+b+'/'+a+'='+r2(b/a)+'\\). Menor entero: '+sol,'Inecuaciones');
};

MM_GENERATORS['paes_a_ine_07']=function(diff){
  var a=ri(1,4),b=ri(1,6),c=ri(1,4),d=ri(1,6);
  // ax-b >= cx+d => (a-c)x >= b+d
  if(a<=c){a=c+ri(1,3);}
  var diff2=a-c,rhs=b+d;
  var xn=rhs,xd=diff2,g=gcd(xn,xd);
  var n=xn/g,dv=xd/g;
  var solStr=dv===1?String(n):'\\dfrac{'+n+'}{'+dv+'}';
  var q='Resuelve: \\('+a+'x - '+b+' \\geq '+c+'x + '+d+'\\)';
  var correct='\\(x \\geq '+solStr+'\\)';
  var w=['\\(x \\leq '+solStr+'\\)','\\(x > '+solStr+'\\)','\\(x \\geq '+(n+1)+'\\)','\\(x \\geq '+(n-1)+'\\)'];
  return Q(q,mc(correct,w),'Pasa términos con x a un lado y constantes al otro.',
    '\\('+diff2+'x \\geq '+(b+d)+'\\Rightarrow x \\geq '+solStr+'\\)','Inecuaciones');
};

MM_GENERATORS['paes_a_ine_08']=function(diff){
  // Valor absoluto: |x| < k
  var k=ri(2,7);
  var q='Resuelve: \\(|x| < '+k+'\\)';
  var correct='\\(-'+k+' < x < '+k+'\\)';
  var w=['\\(x < '+k+'\\)','\\(x > -'+k+'\\)','\\(|x| > '+k+'\\)','\\(-'+k+' \\leq x \\leq '+k+'\\)'];
  return Q(q,mc(correct,w),'\\(|x|<k\\) equivale a \\(-k<x<k\\).',
    '\\(|x|<'+k+'\\Rightarrow -'+k+'<x<'+k+'\\)','Inecuaciones');
};

MM_GENERATORS['paes_a_ine_09']=function(diff){
  var k=ri(2,6);
  var q='Resuelve: \\(|x| \\geq '+k+'\\)';
  var correct='\\(x \\leq -'+k+'\\) ó \\(x \\geq '+k+'\\)';
  var w=['\\(-'+k+' \\leq x \\leq '+k+'\\)','\\(x \\geq '+k+'\\)','\\(x \\leq -'+k+'\\)','\\(|x| < '+k+'\\)'];
  return Q(q,mc(correct,w),'\\(|x|\\geq k\\) equivale a \\(x\\leq-k\\) ó \\(x\\geq k\\).',
    '\\(|x|\\geq '+k+'\\Rightarrow x\\leq -'+k+'\\) ó \\(x\\geq '+k+'\\)','Inecuaciones');
};

MM_GENERATORS['paes_a_ine_10']=function(diff){
  var a=ri(1,4),k=ri(2,7),b=ri(0,4);
  // |ax+b| < k => -k < ax+b < k => (-k-b)/a < x < (k-b)/a
  var xlo=(-k-b)/a,xhi=(k-b)/a;
  var q='Resuelve: \\(|'+a+'x'+(b>0?'+'+b:'')+' | < '+k+'\\)';
  var correct='\\('+r2(xlo)+' < x < '+r2(xhi)+'\\)';
  var w=['\\(x < '+r2(xhi)+'\\)','\\('+r2(xhi)+' < x < '+r2(xlo)+'\\)','\\(x > '+r2(xlo)+'\\)','\\('+r2(xlo-1)+' < x < '+r2(xhi)+'\\)'];
  return Q(q,mc(correct,w),'Escribe como inecuación doble sin valor absoluto.',
    '\\(-'+k+' < '+a+'x'+(b>0?'+'+b:'')+' < '+k+'\\Rightarrow '+r2(xlo)+' < x < '+r2(xhi)+'\\)','Inecuaciones');
};

MM_GENERATORS['paes_a_ine_11']=function(diff){
  var sol=ri(-3,3);
  var a=ri(1,3),b=-a*sol+ri(1,3);
  // representa solución en recta numérica
  var op=pick(['<','≤','>','≥']);
  var rhs_val=b/a;
  var q='La solución de \\('+a+'x'+signN(Math.round(-a*sol))+' '+op+' '+Math.round(b)+'\\) en la recta numérica es:';
  var correct='Todos los x '+op+' '+r2(rhs_val);
  var w=['Todos los x '+{'>':'<','<':'>','≥':'≤','≤':'≥'}[op]+' '+r2(rhs_val),'Solo x='+r2(rhs_val),'Ningún valor real','x=0 solamente'];
  return Q(q,mc(correct,w),'Despeja x y determina la dirección de la flecha.',
    '\\('+a+'x '+op+' '+r2(b)+'\\Rightarrow x '+op+' '+r2(b/a)+'\\)','Inecuaciones');
};

MM_GENERATORS['paes_a_ine_12']=function(diff){
  var min=ri(3,8),maxk=min+ri(4,10);
  var x=ri(min,maxk);
  var q='¿Cuántos enteros satisfacen \\('+min+' \\leq x < '+maxk+'\\)?';
  var count=maxk-min;
  var w=[count-1,count+1,count+2,maxk+min].map(String);
  return Q(q,mc(String(count),w),'Cuenta los enteros desde '+min+' hasta '+(maxk-1)+' (incluidos).',
    'Los enteros son '+min+', '+( min+1)+', ..., '+(maxk-1)+'. Total: '+(maxk-min),'Inecuaciones');
};

/* ════════════════════════════════════════════════════════
   5. FUNCIONES LINEALES  paes_a_lin_01 … paes_a_lin_12
════════════════════════════════════════════════════════ */

MM_GENERATORS['paes_a_lin_01']=function(diff){
  var m=ri(-4,4)||1,b=ri(-6,6);
  var x=ri(-3,5);
  var y=m*x+b;
  var q='Para la función \\(f(x)='+coefStr(m,'x')+(b>=0?'+':'')+b+'\\), \\(f('+x+')=\\)';
  var w=[y+1,y-1,y+m,m*x].map(String);
  return Q(q,mc(String(y),w),'Sustituye x='+x+'.',
    '\\(f('+x+')='+m+'('+x+')+('+b+')='+m*x+(b>=0?'+':'')+b+'='+y+'\\)','Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_02']=function(diff){
  var m=ri(-4,4)||2,b=ri(-6,6);
  var q='Identifica la pendiente de \\(y='+coefStr(m,'x')+(b>=0?'+':'')+b+'\\)';
  var correct=String(m);
  var w=[b,m+1,m-1,-m].map(String);
  return Q(q,mc(correct,w),'En \\(y=mx+b\\), la pendiente es el coeficiente de x.',
    'La función es \\(y='+m+'x+('+b+')\\), pendiente m='+m,'Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_03']=function(diff){
  var m=ri(-3,3)||1,b=ri(-5,5);
  var q='El intercepto en \\(y\\) de \\(f(x)='+coefStr(m,'x')+(b>=0?'+':'')+b+'\\) es:';
  var correct=String(b);
  var w=[b+1,b-1,-b,m].map(String);
  return Q(q,mc(correct,w),'El intercepto en y es el valor cuando x=0, es decir, b.',
    '\\(f(0)='+m+'(0)'+(b>=0?'+':'')+b+'='+b+'\\)','Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_04']=function(diff){
  // Encontrar ecuación dado pendiente y punto
  var m=ri(-3,3)||1,x0=ri(-3,3)||1,y0=ri(-5,5);
  var b=y0-m*x0;
  var q='La recta con pendiente \\(m='+m+'\\) que pasa por \\(('+x0+','+y0+')\\) tiene ecuación:';
  var correct='\\(y='+coefStr(m,'x')+(b>=0?'+':'')+b+'\\)';
  var w=['\\(y='+coefStr(m,'x')+(b+1>=0?'+':'')+(b+1)+'\\)','\\(y='+coefStr(m+1,'x')+(b>=0?'+':'')+b+'\\)','\\(y='+coefStr(-m,'x')+(b>=0?'+':'')+b+'\\)','\\(y='+b+'x'+(m>=0?'+':'')+m+'\\)'];
  return Q(q,mc(correct,w),'Usa \\(y-y_0=m(x-x_0)\\) y despeja y.',
    '\\(y-'+y0+'='+m+'(x-'+x0+')\\Rightarrow y='+coefStr(m,'x')+(b>=0?'+':'')+b+'\\)','Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_05']=function(diff){
  // Pendiente dados dos puntos
  var x1=ri(-3,3)||0,y1=ri(-5,5),dx=ri(1,4),dy=ri(-4,4)||1;
  var x2=x1+dx,y2=y1+dy;
  var mFrac=dy+'/'+dx;
  var g=gcd(Math.abs(dy),dx);
  var mn=dy/g,md=dx/g;
  var mStr=md===1?String(mn):(md<0?'-':'')+Math.abs(mn)+'/'+Math.abs(md);
  var q='La pendiente de la recta que pasa por \\(('+x1+','+y1+')\\) y \\(('+x2+','+y2+')\\) es:';
  var correct='\\('+mStr+'\\)';
  var w=['\\('+(mn+1)+'\\)','\\('+(-mn)+'/'+md+'\\)','\\('+(dx)+'/'+dy+'\\)','\\('+(mn)+'/'+(md+1)+'\\)'];
  return Q(q,mc(correct,w),'\\(m=\\dfrac{y_2-y_1}{x_2-x_1}\\)',
    '\\(m=\\dfrac{'+y2+'-'+y1+'}{'+x2+'-'+x1+'}=\\dfrac{'+dy+'}{'+dx+'}='+mStr+'\\)','Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_06']=function(diff){
  var m=ri(-4,4)||2;
  var q='Una recta tiene pendiente \\(m='+m+'\\). Una recta paralela a ella tiene pendiente:';
  var correct=String(m);
  var w=[m===0?1:-m, m+1, m-1, m===0?'indefinida':0].map(String);
  return Q(q,mc(correct,w),'Rectas paralelas tienen la misma pendiente.',
    'Las rectas paralelas tienen pendientes iguales: m='+m,'Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_07']=function(diff){
  var m=ri(1,4);
  var q='Una recta tiene pendiente \\(m='+m+'\\). Una recta perpendicular tiene pendiente:';
  var correct='\\(-\\dfrac{1}{'+m+'}\\)';
  var w=['\\('+m+'\\)','\\(\\dfrac{1}{'+m+'}\\)','\\(-'+m+'\\)','\\('+(-m-1)+'\\)'];
  return Q(q,mc(correct,w),'Rectas perpendiculares: \\(m_1 \\cdot m_2 = -1\\)',
    '\\(m_\\perp = -\\dfrac{1}{'+m+'}\\)','Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_08']=function(diff){
  // Intercepto en x (f(x)=0)
  var m=ri(1,4)||1,b=ri(-8,-1);
  var xint=-b/m;
  var q='¿Dónde corta \\(y='+coefStr(m,'x')+(b>=0?'+':'')+b+'\\) al eje \\(x\\)?';
  var correct='\\(x='+r2(xint)+'\\)';
  var w=['\\(x='+r2(xint+1)+'\\)','\\(x='+r2(-xint)+'\\)','\\(x='+b+'\\)','\\(x=0\\)'];
  return Q(q,mc(correct,w),'Haz y=0 y despeja x.',
    '\\('+m+'x+('+b+')=0\\Rightarrow x='+r2(xint)+'\\)','Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_09']=function(diff){
  var m=ri(-3,3)||1,b=ri(-4,4);
  var x1=ri(-2,2),y1=m*x1+b,x2=x1+ri(1,3),y2=m*x2+b;
  var q='¿La función que pasa por \\(('+x1+','+y1+')\\) y \\(('+x2+','+y2+')\\) es creciente, decreciente o constante?';
  var correct=m>0?'Creciente':m<0?'Decreciente':'Constante';
  var w=['Creciente','Decreciente','Constante'].filter(function(s){return s!==correct;}).concat(['No es función']);
  return Q(q,mc(correct,w),'La pendiente m determina el comportamiento: m>0 creciente, m<0 decreciente, m=0 constante.',
    'Pendiente: '+(y2-y1)+'/'+(x2-x1)+'='+m+'. '+(m>0?'m>0: creciente':m<0?'m<0: decreciente':'m=0: constante'),'Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_10']=function(diff){
  var m1=ri(1,4),b1=ri(-5,5),b2=b1+ri(1,5);
  // Dos rectas paralelas: misma pendiente, distinto intercepto
  var q='¿Las rectas \\(y='+m1+'x+('+b1+')\\) y \\(y='+m1+'x+('+b2+')\\) se intersectan?';
  var correct='No, son paralelas';
  var w=['Sí, en \\(x='+r2(-b2/m1)+'\\)','Sí, en el origen','Sí, son la misma recta','Solo si \\(x=0\\)'];
  return Q(q,mc(correct,w),'Si dos rectas tienen la misma pendiente y distinto intercepto, son paralelas y no se cortan.',
    'Ambas tienen pendiente '+m1+', pero interceptos distintos ('+b1+' ≠ '+b2+'): son paralelas.','Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_11']=function(diff){
  // Tabla de valores → identificar pendiente
  var m=ri(-3,3)||1,b=ri(-4,4);
  var xs=[-1,0,1,2];
  var ys=xs.map(function(x){return m*x+b;});
  var tableStr='| x | y |\\n|---|---|\\n'+xs.map(function(x,i){return '| '+x+' | '+ys[i]+' |';}).join('\\n');
  var q='Según la tabla, ¿cuál es la pendiente de la función lineal?\\n\\n'+tableStr;
  var correct=String(m);
  var w=[m+1,m-1,-m,b].map(String);
  return Q(q,mc(correct,w),'Calcula \\(\\Delta y / \\Delta x\\) entre dos puntos consecutivos.',
    'Entre (0,'+ys[1]+') y (1,'+ys[2]+'): m='+(ys[2]-ys[1])+'/1='+m,'Funciones Lineales');
};

MM_GENERATORS['paes_a_lin_12']=function(diff){
  var m=ri(1,5),b=ri(-6,0);
  var xint=-b/m;
  var q='Para \\(f(x)='+coefStr(m,'x')+(b>=0?'+':'')+b+'\\), el dominio donde \\(f(x)>0\\) es:';
  var correct='\\(x > '+r2(xint)+'\\)';
  var w=['\\(x > '+r2(xint+1)+'\\)','\\(x < '+r2(xint)+'\\)','\\(x > 0\\)','\\(x > '+(-b)+'\\)'];
  return Q(q,mc(correct,w),'Resuelve \\('+m+'x+('+b+')>0\\)',
    '\\('+m+'x > '+(-b)+'\\Rightarrow x > '+r2(xint)+'\\)','Funciones Lineales');
};

/* ════════════════════════════════════════════════════════
   6. FUNCIONES CUADRÁTICAS  paes_a_cua_01 … paes_a_cua_12
════════════════════════════════════════════════════════ */

MM_GENERATORS['paes_a_cua_01']=function(diff){
  // Vértice de parábola
  var a=pick([1,-1,2,-2]),h=ri(-3,3),k=ri(-4,4);
  var A=a,B=-2*a*h,C=a*h*h+k;
  var q='El vértice de \\(y='+A+'x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+'\\) es:';
  var correct='\\(('+h+',\\ '+k+')\\)';
  var w=['\\(('+(h+1)+',\\ '+k+')\\)','\\(('+h+',\\ '+(k+1)+')\\)','\\(('+(- B/(2*A))+',\\ '+(-C)+'\\))','\\((-'+h+',\\ '+k+')\\)'];
  return Q(q,mc(correct,w),'\\(h=-\\dfrac{b}{2a}\\), luego \\(k=f(h)\\)',
    '\\(h=-\\dfrac{'+B+'}{2('+A+')}='+h+'\\). \\(k='+A+'('+h+')^2+('+B+')('+h+')+('+C+')='+k+'\\). Vértice: ('+h+','+k+')','Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_02']=function(diff){
  var a=pick([1,2]),h=ri(-3,3),k=ri(-4,4);
  var q='La parábola \\(y='+a+'(x'+(h>=0?'-':'+')+Math.abs(h)+')^2'+(k>=0?'+':'')+k+'\\) tiene vértice en:';
  var correct='\\(('+h+',\\ '+k+')\\)';
  var w=['\\((-'+h+',\\ '+k+')\\)','\\(('+h+',\\ '+(k+1)+')\\)','\\(('+(h+1)+',\\ '+k+')\\)','\\(('+h+',\\ '+(- k)+')\\)'];
  return Q(q,mc(correct,w),'En forma vértice \\(y=a(x-h)^2+k\\), el vértice es (h,k).',
    'La forma vértice muestra directamente: vértice=('+h+','+k+')','Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_03']=function(diff){
  var a=pick([1,-1,2,-2]);
  var q2='Si \\(a='+a+'\\) en \\(y=ax^2+bx+c\\), la parábola:';
  var correct=a>0?'Abre hacia arriba (mínimo)':'Abre hacia abajo (máximo)';
  var w=a>0?['Abre hacia abajo (máximo)','Es una recta','No tiene vértice','Abre a la derecha']:['Abre hacia arriba (mínimo)','Es una recta','No tiene vértice','Abre a la derecha'];
  return Q(q2,mc(correct,w),'Si \\(a>0\\) abre arriba; si \\(a<0\\) abre abajo.',
    'Como \\(a='+a+(a>0?'>0\\): mínimo en el vértice':'<0\\): máximo en el vértice'),'Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_04']=function(diff){
  // Raíces (zeros) de cuadrática
  var r1=ri(-4,4)||1,r2b=ri(-4,4)||2;
  while(r2b===r1)r2b=ri(-4,4)||3;
  var B=-(r1+r2b),C=r1*r2b;
  var q='Las raíces de \\(x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+' = 0\\) son:';
  var sol=[r1,r2b].sort(function(a,b){return a-b;});
  var correct='\\(x='+sol[0]+'\\) y \\(x='+sol[1]+'\\)';
  var w=['\\(x='+sol[0]+'\\) solamente','\\(x='+(sol[0]+1)+'\\) y \\(x='+(sol[1]-1)+'\\)','\\(x='+(-B)+'\\) y \\(x='+C+'\\)','No tiene raíces reales'];
  return Q(q,mc(correct,w),'Factoriza \\((x-r_1)(x-r_2)=0\\)',
    '\\((x-'+r1+')(x-'+r2b+')=0 \\Rightarrow x='+r1+'\\) o \\(x='+r2b+'\\)','Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_05']=function(diff){
  var a=pick([1,2]),h=ri(-2,2),k=ri(1,5);
  // parábola sin raíces reales: k>0 con a>0
  var B=-2*a*h,C=a*h*h+k;
  var disc=B*B-4*a*C; // should be negative
  var q='¿Cuántas raíces reales tiene \\('+a+'x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+'\\)?';
  var correct=disc>0?'Dos raíces reales':disc===0?'Una raíz doble':'Sin raíces reales';
  var w=['Dos raíces reales','Una raíz doble','Sin raíces reales'].filter(function(s){return s!==correct;}).concat(['Infinitas raíces']);
  return Q(q,mc(correct,w),'Calcula el discriminante \\(\\Delta=b^2-4ac\\).',
    '\\(\\Delta='+B+'^2-4('+a+')('+C+')='+(B*B-4*a*C)+'\\). '+(disc<0?'\\(\\Delta<0\\): sin raíces reales':disc===0?'\\(\\Delta=0\\): una raíz doble':'\\(\\Delta>0\\): dos raíces reales'),'Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_06']=function(diff){
  var h=ri(-3,3),k=ri(-5,5);
  var q='El eje de simetría de la parábola con vértice \\(('+h+',\\ '+k+')\\) es:';
  var correct='\\(x='+h+'\\)';
  var w=['\\(x='+k+'\\)','\\(y='+h+'\\)','\\(x='+(h+1)+'\\)','\\(y='+k+'\\)'];
  return Q(q,mc(correct,w),'El eje de simetría pasa por el vértice y es de la forma \\(x=h\\).',
    'El eje de simetría es la recta vertical \\(x='+h+'\\)','Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_07']=function(diff){
  // Suma y producto de raíces (Vieta)
  var r1=ri(-4,4)||1,r2b=ri(-4,4)||2;
  while(r2b===r1)r2b+=1;
  var B=-(r1+r2b),C=r1*r2b;
  var q='Para \\(x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+'=0\\), la suma de las raíces es:';
  var correct=String(r1+r2b);
  var w=[r1*r2b, -(r1+r2b), r1-r2b, r2b-r1].map(String);
  return Q(q,mc(correct,w),'Por las fórmulas de Vieta: suma=\\(-b/a\\).',
    'Suma = \\(-b/a = -('+(B)+')/1 = '+(r1+r2b)+'\\)','Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_08']=function(diff){
  var r1=ri(-3,3)||1,r2b=ri(-3,3)||2;
  while(r2b===r1)r2b+=1;
  var B=-(r1+r2b),C=r1*r2b;
  var q='Para \\(x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+'=0\\), el producto de las raíces es:';
  var correct=String(r1*r2b);
  var w=[r1+r2b, -(r1*r2b), r1-r2b, C+1].map(String);
  return Q(q,mc(correct,w),'Producto = \\(c/a\\).',
    'Producto = \\(c/a = '+C+'/1 = '+(r1*r2b)+'\\)','Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_09']=function(diff){
  var a=pick([1,2]),h=ri(-2,3),k=ri(-5,5);
  // f evaluated at x
  var x=ri(-3,3);
  var val=a*(x-h)*(x-h)+k;
  var q='Si \\(f(x)='+a+'(x'+(h>=0?'-':'+')+Math.abs(h)+')^2'+(k>=0?'+':'')+k+'\\), entonces \\(f('+x+')=\\)';
  var w=[val+1,val-1,val+a,val-k].map(String);
  return Q(q,mc(String(val),w),'Sustituye x='+x+' directamente.',
    '\\(f('+x+')='+a+'('+x+(h>=0?'-':'+')+Math.abs(h)+')^2'+(k>=0?'+':'')+k+'='+a+'('+( x-h)+')^2'+(k>=0?'+':'')+k+'='+a*(x-h)*(x-h)+(k>=0?'+':'')+k+'='+val+'\\)','Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_10']=function(diff){
  // Máximo o mínimo de cuadrática
  var a=pick([1,-1,2,-2]),h=ri(-3,3),k=ri(-5,5);
  var type=a>0?'mínimo':'máximo';
  var B=-2*a*h,C=a*h*h+k;
  var q='¿Cuál es el valor '+type+' de \\(f(x)='+a+'x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+'\\)?';
  var correct=String(k);
  var w=[k+1,k-1,h,C].map(String);
  return Q(q,mc(correct,w),'El '+type+' ocurre en el vértice, donde \\(y=k\\).',
    'Vértice en h='+h+', k='+k+'. Como a='+a+(a>0?'>0, es mínimo.':'<0, es máximo.')+' Valor: '+k,'Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_11']=function(diff){
  // Problema: proyectil altura máxima
  var v0=ri(10,40)*2,g=10;
  // h(t) = v0*t - 5t^2; max en t=v0/10, h=v0^2/20
  var tmax=v0/(2*g/2); // = v0/10... wait g=10, h=-5t²+v0*t
  var hmax= v0*v0/(4*g/2); // = v0^2/20
  // simpler: h(t)=-5t²+v0*t, hmax=v0²/20
  var hm=Math.round(v0*v0/20);
  var q='Un objeto se lanza con \\(h(t)=-5t^2+'+v0+'t\\) (metros). La altura máxima es:';
  var correct=hm+' m';
  var w=[(hm+5)+' m',(hm-5)+' m',(v0)+' m',(Math.round(v0/10))+' m'];
  return Q(q,mc(correct,w),'El máximo ocurre en \\(t=-\\dfrac{b}{2a}=\\dfrac{'+v0+'}{10}\\) s.',
    't_max='+v0+'/10='+r2(v0/10)+' s. h='+(-5)+'('+r2(v0/10)+')²+'+v0+'('+r2(v0/10)+')='+hm+' m','Funciones Cuadráticas');
};

MM_GENERATORS['paes_a_cua_12']=function(diff){
  // Forma estándar a forma vértice
  var h=ri(-3,3),k=ri(-4,4);
  var B=-2*h,C=h*h+k;
  var q='Convierte a forma vértice: \\(f(x)=x^2 '+(B>=0?'+':'')+B+'x '+(C>=0?'+':'')+C+'\\)';
  var correct='\\(f(x)=(x'+(h>=0?'-':'+')+Math.abs(h)+')^2'+(k>=0?'+':'')+k+'\\)';
  var w=['\\(f(x)=(x'+(h>=0?'+':'-')+Math.abs(h)+')^2'+(k>=0?'+':'')+k+'\\)','\\(f(x)=(x'+(h>=0?'-':'+')+Math.abs(h)+')^2'+(k>=0?'-':'+')+Math.abs(k)+'\\)','\\(f(x)=(x-'+B+')^2+'+C+'\\)','\\(f(x)=(x'+(h>=0?'-':'+')+Math.abs(h)+')^2\\)'];
  return Q(q,mc(correct,w),'Completa el cuadrado: agrupa \\(x^2+bx\\) y suma/resta \\((b/2)^2\\).',
    'Vértice: h='+h+', k='+k+'. \\(x^2'+(B>=0?'+':'')+B+'x+'+h*h+'-'+h*h+'+'+C+'=(x'+(h>=0?'-':'+')+Math.abs(h)+')^2+'+k+'\\)','Funciones Cuadráticas');
};

/* ── Register topic arrays ── */
if(!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS={};
var T=window.MM_TOPIC_GENERATORS;

T['paes_a_algebra']=['paes_a_alg_01','paes_a_alg_02','paes_a_alg_03','paes_a_alg_04','paes_a_alg_05',
  'paes_a_alg_06','paes_a_alg_07','paes_a_alg_08','paes_a_alg_09','paes_a_alg_10','paes_a_alg_11','paes_a_alg_12'];
T['paes_a_ecuaciones']=['paes_a_ec_01','paes_a_ec_02','paes_a_ec_03','paes_a_ec_04','paes_a_ec_05',
  'paes_a_ec_06','paes_a_ec_07','paes_a_ec_08','paes_a_ec_09','paes_a_ec_10','paes_a_ec_11','paes_a_ec_12'];
T['paes_a_sistemas']=['paes_a_sis_01','paes_a_sis_02','paes_a_sis_03','paes_a_sis_04','paes_a_sis_05',
  'paes_a_sis_06','paes_a_sis_07','paes_a_sis_08','paes_a_sis_09','paes_a_sis_10','paes_a_sis_11','paes_a_sis_12'];
T['paes_a_inecuaciones']=['paes_a_ine_01','paes_a_ine_02','paes_a_ine_03','paes_a_ine_04','paes_a_ine_05',
  'paes_a_ine_06','paes_a_ine_07','paes_a_ine_08','paes_a_ine_09','paes_a_ine_10','paes_a_ine_11','paes_a_ine_12'];
T['paes_a_func_lin']=['paes_a_lin_01','paes_a_lin_02','paes_a_lin_03','paes_a_lin_04','paes_a_lin_05',
  'paes_a_lin_06','paes_a_lin_07','paes_a_lin_08','paes_a_lin_09','paes_a_lin_10','paes_a_lin_11','paes_a_lin_12'];
T['paes_a_func_cuad']=['paes_a_cua_01','paes_a_cua_02','paes_a_cua_03','paes_a_cua_04','paes_a_cua_05',
  'paes_a_cua_06','paes_a_cua_07','paes_a_cua_08','paes_a_cua_09','paes_a_cua_10','paes_a_cua_11','paes_a_cua_12'];

})();
