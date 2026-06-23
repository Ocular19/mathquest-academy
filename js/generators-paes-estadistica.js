(function(){ 'use strict';
/* GENERATORS PAES ESTADÍSTICA Y PROBABILIDAD — Etapa 4
   5 topics × 12 = 60 generators */

function pick(a){return a[Math.floor(Math.random()*a.length)];}
function ri(lo,hi){return lo+Math.floor(Math.random()*(hi-lo+1));}
function r1(x){return Math.round(x*10)/10;}
function r2(x){return Math.round(x*100)/100;}
function fact(n){var f=1;for(var i=2;i<=n;i++)f*=i;return f;}
function C(n,r){if(r<0||r>n)return 0;return fact(n)/(fact(r)*fact(n-r));}
function Perm(n,r){if(r<0||r>n)return 0;return fact(n)/fact(n-r);}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a||1;}
function fr(n,d){var g=gcd(n,d);return(n/g)+'/'+(d/g);}
function frL(n,d){var g=gcd(n,d),rn=n/g,rd=d/g;return rd===1?String(rn):'\\(\\dfrac{'+rn+'}{'+rd+'}\\)';}
function sm(a){return a.reduce(function(x,y){return x+y;},0);}
function mc(correct,wrongs){
  var pool=[correct].concat(wrongs.slice(0,4));
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  return{options:pool,correctIndex:pool.indexOf(correct),answer:correct};
}
function Q(q,m,hint,exp,topic){
  return{question:q,options:m.options,answer:m.answer,correctIndex:m.correctIndex,
    hint:hint,explanation:exp,topic:topic,type:'opcion_multiple',eje:'Estadística y Probabilidad'};
}

/* ════════ 1. CONTEO Y COMBINATORIA ════════ */

MM_GENERATORS['paes_e_con_01']=function(){
  var a=ri(2,5),b=ri(2,6);
  var q='Un restaurante ofrece \\('+a+'\\) platos y \\('+b+'\\) bebidas. ¿Cuántos menús distintos hay?';
  return Q(q,mc(String(a*b),[a+b+'',a*b+a+'',a*b-b+'',(a+1)*b+'']),
    'Principio multiplicativo: multiplica las opciones de cada categoría.',
    '\\('+a+'\\times '+b+'='+a*b+'\\)','Conteo');
};

MM_GENERATORS['paes_e_con_02']=function(){
  var a=ri(2,4),b=ri(2,5),c=ri(2,4),t=a*b*c;
  var q='Hay \\('+a+'\\) camisas, \\('+b+'\\) pantalones y \\('+c+'\\) zapatos. ¿Cuántos atuendos distintos hay?';
  return Q(q,mc(String(t),[a+b+c+'',a*b+c+'',t+c+'',(a+1)*b*c+'']),
    'Principio multiplicativo (3 etapas): \\(a\\times b\\times c\\)',
    '\\('+a+'\\times '+b+'\\times '+c+'='+t+'\\)','Conteo');
};

MM_GENERATORS['paes_e_con_03']=function(){
  var n=ri(3,7),f=fact(n);
  var q='¿Cuánto vale \\('+n+'!\\)?';
  return Q(q,mc(String(f),[fact(n-1)+'',f+n+'',n*n+'',f-n+'']),
    '\\(n!=n\\times(n-1)\\times\\cdots\\times1\\)',
    '\\('+Array.from({length:n},function(_,i){return n-i;}).join('\\times ')+'='+f+'\\)','Conteo');
};

MM_GENERATORS['paes_e_con_04']=function(){
  var n=ri(4,7),r=pick([2,3]),p=Perm(n,r);
  var q='¿De cuántas formas se puede elegir y ordenar \\('+r+'\\) de \\('+n+'\\) personas en el podio?';
  return Q(q,mc(String(p),[C(n,r)+'',p+r+'',fact(n)+'',p-r+'']),
    '\\(P(n,r)=\\dfrac{n!}{(n-r)!}\\) — el orden importa.',
    '\\(P('+n+','+r+')='+p+'\\)','Conteo');
};

MM_GENERATORS['paes_e_con_05']=function(){
  var n=ri(5,9),r=pick([2,3,4]),c=C(n,r);
  var q='¿De cuántas formas se puede elegir un comité de \\('+r+'\\) personas de un grupo de \\('+n+'\\)?';
  return Q(q,mc(String(c),[Perm(n,r)+'',c+1+'',C(n,r-1)+'',C(n,r+1)+'']),
    '\\(C(n,r)=\\dfrac{n!}{r!(n-r)!}\\) — el orden NO importa.',
    '\\(C('+n+','+r+')='+c+'\\)','Conteo');
};

MM_GENERATORS['paes_e_con_06']=function(){
  var n=ri(5,8),r=ri(2,3);
  var q='¿Cuál de estos casos usa combinaciones (orden no importa)?';
  return Q(q,mc('Elegir '+r+' estudiantes de '+n+' para un equipo',
    ['Ordenar '+r+' libros en '+r+' estantes distintos',
     'Asignar 1°, 2° y 3° lugar en carrera de '+n+' participantes',
     'Crear clave de '+r+' dígitos distintos con orden',
     'Distribuir '+r+' premios diferentes entre '+n+' personas']),
    'Combinaciones: cuando la selección no tiene orden interno.',
    'En un equipo no hay "primero ni segundo": el orden no importa → combinación.','Conteo');
};

MM_GENERATORS['paes_e_con_07']=function(){
  var d=ri(2,4),t=Math.pow(10,d);
  var q='Claves de \\('+d+'\\) dígitos (0–9) con repetición permitida. ¿Cuántas claves distintas hay?';
  return Q(q,mc(String(t),[10*d+'',fact(d)+'',t-1+'',t+10+'']),
    '\\(10^{'+d+'}\\) (10 opciones por posición)',
    '\\(10^{'+d+'}='+t+'\\)','Conteo');
};

MM_GENERATORS['paes_e_con_08']=function(){
  var n=ri(3,6),f=fact(n);
  var q='¿De cuántas formas se pueden ordenar \\('+n+'\\) libros diferentes en una repisa?';
  return Q(q,mc(String(f),[f/n+'',f+n+'',C(n,2)+'',n*n+'']),
    '\\(n!\\) — permutación total.',
    '\\('+n+'!='+f+'\\)','Conteo');
};

MM_GENERATORS['paes_e_con_09']=function(){
  var n=ri(2,5),t=Math.pow(2,n);
  var q='¿Cuántos subconjuntos distintos tiene un conjunto de \\('+n+'\\) elementos (incluido el vacío)?';
  return Q(q,mc(String(t),[t-1+'',n*2+'',fact(n)+'',t+1+'']),
    'Cada elemento puede estar o no: \\(2^n\\)',
    '\\(2^{'+n+'}='+t+'\\)','Conteo');
};

MM_GENERATORS['paes_e_con_10']=function(){
  var tot=ri(8,12),r=3,c=C(tot,r);
  var q='En un grupo de \\('+tot+'\\) personas se elige una delegación de \\('+r+'\\). ¿Cuántas formas hay?';
  return Q(q,mc(String(c),[Perm(tot,r)+'',C(tot,2)+'',c+tot+'',fact(r)+'']),
    '\\(C('+tot+',3)\\)',
    '\\(C('+tot+',3)=\\dfrac{'+tot+'!}{3!\\cdot'+(tot-3)+'!}='+c+'\\)','Conteo');
};

MM_GENERATORS['paes_e_con_11']=function(){
  var a=ri(3,8),b=ri(3,8);
  var q='Un estudiante puede elegir entre \\('+a+'\\) películas o \\('+b+'\\) series (no ambas). ¿Cuántas opciones tiene?';
  return Q(q,mc(String(a+b),[a*b+'',a+b+1+'',a*b-a+'',(a+b)*2+'']),
    'Eventos excluyentes: suma (principio aditivo).',
    '\\('+a+'+'+b+'='+(a+b)+'\\)','Conteo');
};

MM_GENERATORS['paes_e_con_12']=function(){
  var n=ri(4,8),r=ri(1,n-1),c=C(n,r);
  var q='¿Cuánto vale \\(\\dbinom{'+n+'}{'+r+'}\\)?';
  return Q(q,mc(String(c),[C(n,r-1)+'',Perm(n,r)+'',c+n+'',fact(r)+'']),
    '\\(\\dbinom{n}{r}=\\dfrac{n!}{r!(n-r)!}\\)',
    '\\(\\dbinom{'+n+'}{'+r+'}='+c+'\\)','Conteo');
};

/* ════════ 2. PROBABILIDAD ════════ */

MM_GENERATORS['paes_e_pro_01']=function(){
  var total=ri(8,15),fav=ri(2,total-2);
  var cor=frL(fav,total);
  var q='En una bolsa hay \\('+total+'\\) bolas numeradas del 1 al '+total+'. Se extrae una. Probabilidad de sacar la bola \\('+fav+'\\):';
  return Q(q,mc(cor,[frL(fav+1,total),frL(fav-1,total),frL(total-fav,total),'\\(1\\)']),
    '\\(P=\\dfrac{\\text{casos favorables}}{\\text{casos totales}}\\)',
    '\\(P=\\dfrac{1}{'+total+'}\\)','Probabilidad');
};

MM_GENERATORS['paes_e_pro_02']=function(){
  var total=ri(6,12),fav=ri(1,total-1);
  var comp=total-fav;
  var cor=frL(comp,total);
  var q='P(A)='+frL(fav,total)+'. ¿Cuánto vale P(A^c) (complemento)?';
  return Q(q,mc(cor,['\\(0\\)','\\(1\\)',frL(fav+1,total),frL(comp+1,total)]),
    '\\(P(A^c)=1-P(A)\\)',
    '\\(P(A^c)=1-'+frL(fav,total)+'='+cor+'\\)','Probabilidad');
};

MM_GENERATORS['paes_e_pro_03']=function(){
  var q='Se lanza un dado justo (1–6). Probabilidad de obtener un número par:';
  return Q(q,mc('\\(\\dfrac{1}{2}\\)',['\\(\\dfrac{1}{6}\\)','\\(\\dfrac{1}{3}\\)','\\(\\dfrac{2}{3}\\)','\\(\\dfrac{3}{4}\\)']),
    'Los pares son {2,4,6}: 3 de 6 resultados.',
    '\\(P(\\text{par})=\\dfrac{3}{6}=\\dfrac{1}{2}\\)','Probabilidad');
};

MM_GENERATORS['paes_e_pro_04']=function(){
  var k=ri(3,5);
  var fav=6-k,cor=frL(fav,6);
  var q='Se lanza un dado justo. Probabilidad de obtener un número mayor que \\('+k+'\\):';
  return Q(q,mc(cor,[frL(k,6),frL(fav+1,6),frL(fav-1,6),'\\(\\dfrac{1}{2}\\)']),
    'Cuenta los valores mayores que '+k+' en {1,2,3,4,5,6}.',
    '{'+Array.from({length:fav},function(_,i){return k+1+i;}).join(',')+'}\\Rightarrow P='+cor,'Probabilidad');
};

MM_GENERATORS['paes_e_pro_05']=function(){
  var q='Se lanza un dado justo. Probabilidad de obtener un número primo:';
  // primes in 1-6: 2,3,5 → 3/6 = 1/2
  return Q(q,mc('\\(\\dfrac{1}{2}\\)',['\\(\\dfrac{1}{3}\\)','\\(\\dfrac{2}{3}\\)','\\(\\dfrac{1}{6}\\)','\\(\\dfrac{3}{4}\\)']),
    'Los primos en {1,…,6} son {2, 3, 5}.',
    '\\(P=\\dfrac{3}{6}=\\dfrac{1}{2}\\)','Probabilidad');
};

MM_GENERATORS['paes_e_pro_06']=function(){
  // Two dice: P(sum = k)
  var target=pick([7,6,8]);
  var ways=target===7?6:target===6?5:target===8?5:4;
  var cor=frL(ways,36);
  var q='Se lanzan dos dados justos. Probabilidad de que la suma sea \\('+target+'\\):';
  return Q(q,mc(cor,[frL(ways-1,36),frL(ways+1,36),'\\(\\dfrac{1}{6}\\)','\\(\\dfrac{1}{36}\\)']),
    'Cuenta los pares (d1,d2) que suman '+target+' de 36 posibles.',
    ways+' pares suman '+target+' \\(\\Rightarrow P=\\dfrac{'+ways+'}{36}='+cor+'\\)','Probabilidad');
};

MM_GENERATORS['paes_e_pro_07']=function(){
  // Cards: P(ace) = 4/52 = 1/13
  var q='Se extrae una carta al azar de una baraja de 52. Probabilidad de que sea un as:';
  return Q(q,mc('\\(\\dfrac{1}{13}\\)',['\\(\\dfrac{1}{52}\\)','\\(\\dfrac{4}{13}\\)','\\(\\dfrac{1}{4}\\)','\\(\\dfrac{1}{12}\\)']),
    'Hay 4 ases en 52 cartas.',
    '\\(P=\\dfrac{4}{52}=\\dfrac{1}{13}\\)','Probabilidad');
};

MM_GENERATORS['paes_e_pro_08']=function(){
  // P(heart OR ace): P(A∪B) = P(A)+P(B)-P(A∩B)
  var q='De una baraja de 52 se extrae una carta. P(corazón o as):';
  // 13 hearts + 4 aces - 1 ace of hearts = 16
  return Q(q,mc('\\(\\dfrac{16}{52}=\\dfrac{4}{13}\\)',['\\(\\dfrac{17}{52}\\)','\\(\\dfrac{13}{52}\\)','\\(\\dfrac{1}{4}\\)','\\(\\dfrac{3}{13}\\)']),
    '\\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\)',
    '\\(\\dfrac{13}{52}+\\dfrac{4}{52}-\\dfrac{1}{52}=\\dfrac{16}{52}=\\dfrac{4}{13}\\)','Probabilidad');
};

MM_GENERATORS['paes_e_pro_09']=function(){
  // Without replacement: P(both red from 6R+4B bag)
  var r=ri(4,7),b=ri(2,5),tot=r+b;
  var p1=r,p2=r-1,d1=tot,d2=tot-1;
  var num=p1*p2,den=d1*d2,g=gcd(num,den);
  var cor='\\(\\dfrac{'+(num/g)+'}{'+( den/g)+'}\\)';
  var q='Bolsa con \\('+r+'\\) bolas rojas y \\('+b+'\\) azules. Se extraen 2 sin reposición. P(ambas rojas):';
  return Q(q,mc(cor,[frL(r,tot),'\\(\\dfrac{'+(r*r)+'}{'+( tot*tot)+'}\\)',frL(r-1,tot-1),frL(r*(r-1),tot)]),
    '\\(P=\\dfrac{'+r+'}{'+tot+'}\\times\\dfrac{'+(r-1)+'}{'+( tot-1)+'}\\)',
    '\\(\\dfrac{'+p1+'}{'+d1+'}\\times\\dfrac{'+p2+'}{'+d2+'}=\\dfrac{'+num+'}{'+den+'}='+cor+'\\)','Probabilidad');
};

MM_GENERATORS['paes_e_pro_10']=function(){
  // P(A|B) = P(A∩B)/P(B): simple Venn numbers
  var total=ri(20,40),ab=ri(3,8),aOnly=ri(3,8),bOnly=ri(3,8);
  var B=ab+bOnly;
  var cor=frL(ab,B);
  var q='En un grupo de \\('+total+'\\) estudiantes: \\('+ab+'\\) hablan inglés y francés, \\('+B+'\\) hablan francés. P(habla inglés | habla francés):';
  return Q(q,mc(cor,[frL(ab,total),frL(B,total),frL(ab+1,B),frL(ab-1,B)]),
    '\\(P(A|B)=\\dfrac{P(A\\cap B)}{P(B)}=\\dfrac{n(A\\cap B)}{n(B)}\\)',
    '\\(P=\\dfrac{'+ab+'}{'+B+'}='+cor+'\\)','Probabilidad');
};

MM_GENERATORS['paes_e_pro_11']=function(){
  // Independent events: P(A∩B)=P(A)·P(B)
  var p1n=ri(1,4),p1d=pick([5,6,8]),p2n=ri(1,4),p2d=pick([5,6]);
  while(p1n>=p1d)p1n=ri(1,4);while(p2n>=p2d)p2n=ri(1,4);
  var num=p1n*p2n,den=p1d*p2d,g=gcd(num,den);
  var cor='\\(\\dfrac{'+(num/g)+'}{'+( den/g)+'}\\)';
  var q='Eventos independientes A y B: \\(P(A)=\\dfrac{'+p1n+'}{'+p1d+'}\\) y \\(P(B)=\\dfrac{'+p2n+'}{'+p2d+'}\\). P(A y B) es:';
  return Q(q,mc(cor,['\\(\\dfrac{'+(p1n+p2n)+'}{'+( p1d+p2d)+'}\\)',frL(p1n,p1d)+'\\cdot\\dfrac{1}{2}',frL(num,den*2),frL(p1n+p2n,den)]),
    'Independientes: \\(P(A\\cap B)=P(A)\\times P(B)\\)',
    '\\(\\dfrac{'+p1n+'}{'+p1d+'}\\times\\dfrac{'+p2n+'}{'+p2d+'}=\\dfrac{'+num+'}{'+den+'}='+cor+'\\)','Probabilidad');
};

MM_GENERATORS['paes_e_pro_12']=function(){
  // Geometric probability: point in segment
  var total=ri(10,20),fav=ri(2,total-2);
  var cor=frL(fav,total);
  var q='Se elige aleatoriamente un punto en un segmento de longitud \\('+total+'\\) cm. P(punto caiga en los primeros \\('+fav+'\\) cm):';
  return Q(q,mc(cor,[frL(fav+1,total),frL(total-fav,total),frL(fav,total+1),'\\(\\dfrac{1}{2}\\)']),
    'Probabilidad geométrica: \\(P=\\dfrac{\\text{longitud favorable}}{\\text{longitud total}}\\)',
    '\\(P=\\dfrac{'+fav+'}{'+total+'}='+cor+'\\)','Probabilidad');
};

/* ════════ 3. ESTADÍSTICA DESCRIPTIVA ════════ */

MM_GENERATORS['paes_e_est_01']=function(){
  var nums=[];for(var i=0;i<5;i++)nums.push(ri(2,20));
  var s=sm(nums),m=r1(s/5);
  var q='Datos: \\('+nums.join(',\\ ')+'\\). Media aritmética:';
  return Q(q,mc(String(m),[r1(m+2)+'',r1(m-2)+'',r1(m+1.5)+'',r1(s/4)+'']),
    '\\(\\bar{x}=\\dfrac{\\sum x_i}{n}\\)',
    '\\(\\dfrac{'+s+'}{5}='+m+'\\)','Estadística');
};

MM_GENERATORS['paes_e_est_02']=function(){
  var sorted=[ri(1,10),ri(11,20),ri(21,30),ri(31,40),ri(41,50)];
  // shuffle
  var nums=sorted.slice();for(var i=4;i>0;i--){var j=ri(0,i);var t=nums[i];nums[i]=nums[j];nums[j]=t;}
  var med=sorted[2];
  var q='Datos: \\('+nums.join(',\\ ')+'\\). La mediana es:';
  return Q(q,mc(String(med),[sorted[1]+'',sorted[3]+'',(sorted[1]+sorted[3])/2+'',(sm(sorted)/5|0)+'']),
    'Ordena y toma el valor central (n=5 → posición 3).',
    'Ordenados: \\('+sorted.join('<')+'\\). Mediana=\\('+med+'\\)','Estadística');
};

MM_GENERATORS['paes_e_est_03']=function(){
  // Median with even n=6
  var base=ri(5,15),d=[base-4,base-2,base,base+1,base+3,base+6];
  var nums=d.slice();for(var i=5;i>0;i--){var j=ri(0,i);var t=nums[i];nums[i]=nums[j];nums[j]=t;}
  var med=r1((d[2]+d[3])/2);
  var q='Datos: \\('+nums.join(',\\ ')+'\\). La mediana es:';
  return Q(q,mc(String(med),[d[2]+'',d[3]+'',r1(med+1)+'',r1(med-0.5)+'']),
    'n=6 (par): mediana = promedio de los dos centrales (posiciones 3 y 4).',
    'Ordenados: \\('+d.join(',')+'\\). Med=\\(\\dfrac{'+d[2]+'+'+d[3]+'}{2}='+med+'\\)','Estadística');
};

MM_GENERATORS['paes_e_est_04']=function(){
  var rep=ri(3,5),base=ri(5,15);
  var nums=[base,base+ri(2,5),base,base+ri(3,7),base,base+ri(4,8)];
  if(rep>3)nums.push(base);
  // shuffle
  for(var i=nums.length-1;i>0;i--){var j=ri(0,i);var t=nums[i];nums[i]=nums[j];nums[j]=t;}
  var q='Datos: \\('+nums.join(',\\ ')+'\\). La moda es:';
  return Q(q,mc(String(base),[base+2+'',base+3+'',sm(nums)/nums.length|0+'','No hay moda']),
    'La moda es el valor que más se repite.',
    '\\('+base+'\\) aparece '+rep+' veces: es la moda.','Estadística');
};

MM_GENERATORS['paes_e_est_05']=function(){
  var nums=[];for(var i=0;i<6;i++)nums.push(ri(5,30));
  var mn=Math.min.apply(null,nums),mx=Math.max.apply(null,nums),rng=mx-mn;
  var q='Datos: \\('+nums.join(',\\ ')+'\\). El rango es:';
  return Q(q,mc(String(rng),[rng+2+'',rng-2+'',mn+'',mx+'']),
    'Rango = valor máximo − valor mínimo.',
    '\\('+mx+'-'+mn+'='+rng+'\\)','Estadística');
};

MM_GENERATORS['paes_e_est_06']=function(){
  // Weighted mean: notas con pesos
  var p1=ri(30,40),p2=100-p1;
  var n1=ri(40,70),n2=ri(40,70);
  var media=r1((n1*p1+n2*p2)/100);
  var q='Un examen tiene dos partes: la primera (\\('+p1+'%\\)) con nota \\('+n1+'\\) y la segunda (\\('+p2+'%\\)) con nota \\('+n2+'\\). ¿Cuál es la nota final?';
  return Q(q,mc(String(media),[r1((n1+n2)/2)+'',r1(media+3)+'',r1(media-3)+'',r1(media+1.5)+'']),
    '\\(\\bar{x}_p=\\dfrac{\\sum w_i x_i}{\\sum w_i}\\)',
    '\\(\\dfrac{'+n1+'\\times'+p1+'+'+n2+'\\times'+p2+'}{100}=\\dfrac{'+(n1*p1+n2*p2)+'}{100}='+media+'\\)','Estadística');
};

MM_GENERATORS['paes_e_est_07']=function(){
  // Find missing value given mean
  var n=5,target=ri(10,20);
  var known=[];for(var i=0;i<n-1;i++)known.push(ri(5,25));
  var missing=n*target-sm(known);
  if(missing<0||missing>50){known=[target-2,target-1,target+1,target+2];missing=n*target-sm(known);}
  var q='La media de 5 datos es \\('+target+'\\). Cuatro de los datos son: \\('+known.join(',')+'\\). El quinto dato es:';
  return Q(q,mc(String(missing),[missing+3+'',missing-3+'',missing+5+'',target+'']),
    '\\(x_{\\text{faltante}}=n\\times\\bar{x}-\\sum x_i\\)',
    '\\(5\\times'+target+'-('+(known.join('+'))+')='+n*target+'-'+sm(known)+'='+missing+'\\)','Estadística');
};

MM_GENERATORS['paes_e_est_08']=function(){
  var nums=[ri(2,15),ri(2,15),ri(2,15),ri(2,15),ri(2,15)];
  var k=ri(2,8),media0=r1(sm(nums)/5),mediaN=r1(media0+k);
  var q='Si a cada dato de un conjunto se le suma \\('+k+'\\), la media:';
  return Q(q,mc('Aumenta en '+k,[
    'Se multiplica por '+k,'No cambia','Aumenta en '+(k*2),'Disminuye en '+k]),
    'Sumar k a todos los datos suma k a la media.',
    'Nueva media = \\(\\bar{x}+'+k+'\\)','Estadística');
};

MM_GENERATORS['paes_e_est_09']=function(){
  var k=ri(2,5),med0=ri(5,20),medN=k*med0;
  var q='Si se multiplican todos los datos de un conjunto por \\('+k+'\\), ¿qué pasa con la media?';
  return Q(q,mc('Se multiplica por '+k,[
    'Se suma '+k,'No cambia','Se divide entre '+k,'Se eleva al cuadrado']),
    'Multiplicar todos los datos por k multiplica la media por k.',
    '\\(\\bar{x}_{\\text{nueva}}=k\\cdot\\bar{x}\\)','Estadística');
};

MM_GENERATORS['paes_e_est_10']=function(){
  // Quartiles: sorted list
  var d=[ri(2,10),ri(11,20),ri(21,30),ri(31,40),ri(41,50),ri(51,60),ri(61,70),ri(71,80)];
  var Q1=(d[1]+d[2])/2,Q2=(d[3]+d[4])/2,Q3=(d[5]+d[6])/2;
  var q='Para los datos ordenados \\('+d.join(',\\ ')+'\\), el primer cuartil Q₁ es:';
  return Q(q,mc(String(r1(Q1)),[r1(Q2)+'',r1(Q3)+'',d[1]+'',d[2]+'']),
    'Q₁ = mediana de la mitad inferior de los datos.',
    'Mitad inferior: \\('+d.slice(0,4).join(',')+'\\). Q₁=\\(\\dfrac{'+d[1]+'+'+d[2]+'}{2}='+r1(Q1)+'\\)','Estadística');
};

MM_GENERATORS['paes_e_est_11']=function(){
  var q='Un conjunto tiene desviación estándar \\(\\sigma=0\\). Esto significa:';
  return Q(q,mc('Todos los datos son iguales entre sí',
    ['El promedio es 0','Los datos están muy dispersos','No hay datos','El rango es 1']),
    'σ=0 significa que no hay variación: todos los valores son idénticos.',
    'Desviación estándar mide dispersión. σ=0 ⟹ sin dispersión ⟹ todos iguales.','Estadística');
};

MM_GENERATORS['paes_e_est_12']=function(){
  var q='En una distribución con cola larga hacia la derecha (asimétrica positiva), ¿qué se cumple?';
  return Q(q,mc('Media > Mediana > Moda',
    ['Moda > Mediana > Media','Media = Mediana = Moda','Mediana > Media > Moda','Media < Moda']),
    'La cola larga "jala" la media hacia la derecha.',
    'En distribuciones con sesgo positivo (cola derecha): Moda < Mediana < Media.','Estadística');
};

/* ════════ 4. GRÁFICOS ESTADÍSTICOS ════════ */

MM_GENERATORS['paes_e_grf_01']=function(){
  var cats=['Lunes','Martes','Miércoles','Jueves','Viernes'];
  var vals=cats.map(function(){return ri(10,80);});
  var idx=ri(0,4);
  var q='Un gráfico de barras registra: '+cats.map(function(c,i){return c+': '+vals[i];}).join(', ')+'. ¿Cuánto se registró el '+cats[idx]+'?';
  return Q(q,mc(String(vals[idx]),[vals[(idx+1)%5]+'',vals[(idx+2)%5]+'',vals[idx]+10+'',vals[idx]-5+'']),
    'Lee directamente la barra correspondiente.',
    cats[idx]+' = '+vals[idx],'Gráficos');
};

MM_GENERATORS['paes_e_grf_02']=function(){
  var cats=['A','B','C','D'];
  var vals=[ri(10,50),ri(51,80),ri(10,50),ri(10,50)]; // B is max
  var shuf=cats.map(function(_,i){return{c:cats[i],v:vals[i]};});
  for(var i=3;i>0;i--){var j=ri(0,i);var t=shuf[i];shuf[i]=shuf[j];shuf[j]=t;}
  var maxV=Math.max.apply(null,shuf.map(function(x){return x.v;}));
  var maxC=shuf.filter(function(x){return x.v===maxV;})[0].c;
  var q='Gráfico de barras: '+shuf.map(function(x){return x.c+': '+x.v;}).join(', ')+'. ¿Cuál categoría tiene el valor más alto?';
  return Q(q,mc('Categoría '+maxC,shuf.filter(function(x){return x.c!==maxC;}).map(function(x){return 'Categoría '+x.c;}).concat(['Todas iguales'])),
    'Busca la barra más alta.','La más alta es '+maxC+' con '+maxV,'Gráficos');
};

MM_GENERATORS['paes_e_grf_03']=function(){
  var a=ri(15,50),b=ri(15,50),c=ri(15,50),d=ri(15,50),tot=a+b+c+d;
  var q='Gráfico de barras: A='+a+', B='+b+', C='+c+', D='+d+'. Total de todos los registros:';
  return Q(q,mc(String(tot),[tot+a+'',tot-d+'',tot+10+'',tot-5+'']),
    'Suma todos los valores de las barras.',
    '\\('+a+'+'+b+'+'+c+'+'+d+'='+tot+'\\)','Gráficos');
};

MM_GENERATORS['paes_e_grf_04']=function(){
  var pct=pick([20,25,30,40,50,60]),deg=Math.round(pct*3.6);
  var q='En un gráfico circular, la categoría X representa el \\('+pct+'\\%\\). ¿Cuántos grados ocupa en el círculo?';
  return Q(q,mc(deg+'°',[pct+'°',180-deg+'°',deg+20+'°',deg-20+'°']),
    '\\(\\text{grados}=\\dfrac{\\%}{100}\\times360°\\)',
    '\\(\\dfrac{'+pct+'}{100}\\times360°='+deg+'°\\)','Gráficos');
};

MM_GENERATORS['paes_e_grf_05']=function(){
  var deg=pick([36,45,60,72,90,120]),pct=Math.round(deg/3.6);
  var q='En un gráfico circular, una categoría ocupa \\('+deg+'°\\). ¿Qué porcentaje representa?';
  return Q(q,mc(pct+'%',[(pct+10)+'%',(pct-10)+'%',deg+'%',(360-deg)/3.6+'%']),
    '\\(\\%=\\dfrac{\\text{grados}}{360°}\\times100\\)',
    '\\(\\dfrac{'+deg+'}{360}\\times100='+pct+'\\%\\)','Gráficos');
};

MM_GENERATORS['paes_e_grf_06']=function(){
  var total=ri(200,600),pct=pick([20,25,30,40,50]);
  var cant=total*pct/100;
  var q='Un gráfico circular muestra que la categoría Y es el \\('+pct+'\\%\\) del total (\\('+total+'\\) personas). ¿Cuántas personas son de Y?';
  return Q(q,mc(String(cant),[cant+total/10+'',cant-pct+'',total-cant+'',Math.round(cant/2)+'']),
    '\\(\\text{cantidad}=\\text{total}\\times\\dfrac{\\%}{100}\\)',
    '\\('+total+'\\times\\dfrac{'+pct+'}{100}='+cant+'\\)','Gráficos');
};

MM_GENERATORS['paes_e_grf_07']=function(){
  var years=[2019,2020,2021,2022,2023];
  var base=ri(100,300),vals=years.map(function(_,i){return base+i*ri(15,40);});
  var q='Gráfico de líneas: '+years.map(function(y,i){return y+': '+vals[i];}).join(', ')+'. ¿Qué tendencia muestra?';
  return Q(q,mc('Creciente (ascendente)',['Decreciente','Constante','Sin tendencia clara','Cíclica']),
    'Compara los valores de izquierda a derecha.',
    'Los valores aumentan cada año: tendencia creciente.','Gráficos');
};

MM_GENERATORS['paes_e_grf_08']=function(){
  var v1=ri(50,150),v2=v1+ri(20,60);
  var pct=Math.round((v2-v1)/v1*100);
  var q='Un gráfico de líneas muestra que un valor pasó de \\('+v1+'\\) a \\('+v2+'\\). ¿Cuál es el porcentaje de aumento?';
  return Q(q,mc(pct+'%',[(pct+10)+'%',(pct-10)+'%',(v2-v1)+'%',Math.round(v2/v1*100)+'%']),
    '\\(\\%\\text{ aumento}=\\dfrac{v_2-v_1}{v_1}\\times100\\)',
    '\\(\\dfrac{'+v2+'-'+v1+'}{'+v1+'}\\times100='+pct+'\\%\\)','Gráficos');
};

MM_GENERATORS['paes_e_grf_09']=function(){
  var intervals=['[0-10)','[10-20)','[20-30)','[30-40)'];
  var freqs=[ri(5,20),ri(5,20),ri(5,20),ri(5,20)];
  var idx=ri(0,3);
  var q='Histograma: '+intervals.map(function(iv,i){return iv+': f='+freqs[i];}).join(', ')+'. ¿Cuántos datos hay en '+intervals[idx]+'?';
  return Q(q,mc(String(freqs[idx]),[freqs[(idx+1)%4]+'',freqs[idx]+3+'',sm(freqs)+'',freqs[idx]-2+'']),
    'Lee la frecuencia (altura de la barra) del intervalo indicado.',
    intervals[idx]+' → f = '+freqs[idx],'Gráficos');
};

MM_GENERATORS['paes_e_grf_10']=function(){
  var intervals=['[0-10)','[10-20)','[20-30)','[30-40)'];
  var freqs=[ri(5,10),ri(15,30),ri(8,14),ri(5,10)]; // [10-20) is modal
  var maxF=Math.max.apply(null,freqs),maxIdx=freqs.indexOf(maxF);
  var q='Histograma: '+intervals.map(function(iv,i){return iv+': f='+freqs[i];}).join(', ')+'. ¿Cuál es la clase modal?';
  return Q(q,mc(intervals[maxIdx],intervals.filter(function(_,i){return i!==maxIdx;}).concat(['La de mayor amplitud'])),
    'La clase modal es el intervalo con mayor frecuencia.',
    intervals[maxIdx]+' tiene frecuencia '+maxF+' (la más alta).','Gráficos');
};

MM_GENERATORS['paes_e_grf_11']=function(){
  var f1=ri(5,15),f2=ri(5,15),f3=ri(5,15);
  var ac3=f1+f2+f3;
  var q='Histograma con frecuencias: clase 1: '+f1+', clase 2: '+f2+', clase 3: '+f3+'. ¿Cuál es la frecuencia acumulada hasta la clase 3?';
  return Q(q,mc(String(ac3),[f3+'',f1+f2+'',ac3+f3+'',ac3-f1+'']),
    'Frecuencia acumulada = suma de frecuencias hasta esa clase.',
    '\\('+f1+'+'+f2+'+'+f3+'='+ac3+'\\)','Gráficos');
};

MM_GENERATORS['paes_e_grf_12']=function(){
  var catA=ri(20,60),catB=ri(20,60);
  var dif=Math.abs(catA-catB);
  var mayor=catA>catB?'A':'B';
  var q='Gráfico de barras doble: categoría A='+catA+', categoría B='+catB+'. Diferencia entre A y B:';
  return Q(q,mc(String(dif),[dif+5+'',dif-5+'',catA+catB+'',Math.round(dif/2)+'']),
    'Diferencia = valor mayor − valor menor.',
    '|'+catA+'-'+catB+'|='+dif,'Gráficos');
};

/* ════════ 5. TABLAS DE FRECUENCIA ════════ */

MM_GENERATORS['paes_e_tab_01']=function(){
  var vals=[ri(1,5),ri(6,10),ri(11,15),ri(16,20)];
  var freqs=[ri(3,10),ri(3,10),ri(3,10),ri(3,10)];
  var idx=ri(0,3);
  var q='Tabla de frecuencias:\n\\[\\begin{array}{c|c}x&f\\\\\\hline'+vals.map(function(v,i){return v+'&'+freqs[i];}).join('\\\\')+'\\end{array}\\]\n¿Cuántas veces aparece el dato \\('+vals[idx]+'\\)?';
  return Q(q,mc(String(freqs[idx]),[freqs[(idx+1)%4]+'',freqs[(idx+2)%4]+'',sm(freqs)+'',freqs[idx]+2+'']),
    'Lee la frecuencia de la fila correspondiente.',
    'El dato '+vals[idx]+' tiene frecuencia '+freqs[idx],'Tablas');
};

MM_GENERATORS['paes_e_tab_02']=function(){
  var vals=[2,3,4,5,6];
  var freqs=[ri(2,8),ri(2,8),ri(2,8),ri(2,8),ri(2,8)];
  var tot=sm(freqs);
  var idx=ri(0,4);
  var fr_=r2(freqs[idx]/tot);
  var q='Tabla: '+vals.map(function(v,i){return 'x='+v+', f='+freqs[i];}).join(' | ')+'. Total: \\(n='+tot+'\\). Frecuencia relativa del dato \\('+vals[idx]+'\\):';
  return Q(q,mc(String(fr_),[r2(fr_+0.05)+'',r2(fr_-0.05)+'',r2(freqs[idx]/100)+'',r2(freqs[idx]*2/tot)+'']),
    '\\(f_r=\\dfrac{f_i}{n}\\)',
    '\\(\\dfrac{'+freqs[idx]+'}{'+tot+'}='+fr_+'\\)','Tablas');
};

MM_GENERATORS['paes_e_tab_03']=function(){
  var f1=ri(3,8),f2=ri(3,8),f3=ri(3,8),f4=ri(3,8);
  var ac2=f1+f2,ac3=ac2+f3;
  var q='Tabla de frecuencias con datos 1,2,3,4 y frecuencias '+f1+','+f2+','+f3+','+f4+'. Frecuencia acumulada hasta el dato 3:';
  return Q(q,mc(String(ac3),[f3+'',f1+f2+'',ac3+f4+'',f2+f3+'']),
    'Suma las frecuencias de los datos ≤ 3.',
    '\\('+f1+'+'+f2+'+'+f3+'='+ac3+'\\)','Tablas');
};

MM_GENERATORS['paes_e_tab_04']=function(){
  var f=[ri(4,12),ri(4,12),ri(4,12),ri(4,12)];
  var tot=sm(f);
  var q='Una tabla de frecuencias tiene frecuencias absolutas: '+f.join(', ')+'. El total de datos es:';
  return Q(q,mc(String(tot),[tot+f[0]+'',tot-f[1]+'',tot+5+'',tot-3+'']),
    'Total = suma de todas las frecuencias absolutas.',
    '\\('+f.join('+')+'='+tot+'\\)','Tablas');
};

MM_GENERATORS['paes_e_tab_05']=function(){
  var vals=[ri(2,6),ri(7,11),ri(12,16),ri(17,21)];
  var freqs=[ri(2,5),ri(6,10),ri(6,10),ri(2,5)]; // middle freqs bigger
  var maxF=Math.max.apply(null,freqs),modeIdx=freqs.indexOf(maxF);
  var q='Tabla: datos '+vals.join(', ')+' con frecuencias '+freqs.join(', ')+'. La moda es:';
  return Q(q,mc(String(vals[modeIdx]),[vals[(modeIdx+1)%4]+'',vals[(modeIdx+2)%4]+'',String(maxF),'No tiene moda']),
    'La moda es el dato con mayor frecuencia.',
    'El dato '+vals[modeIdx]+' tiene la mayor frecuencia ('+maxF+').','Tablas');
};

MM_GENERATORS['paes_e_tab_06']=function(){
  // Mean from frequency table
  var vals=[1,2,3,4,5];
  var freqs=[ri(1,5),ri(1,5),ri(1,5),ri(1,5),ri(1,5)];
  var tot=sm(freqs);
  var weightedSum=vals.reduce(function(s,v,i){return s+v*freqs[i];},0);
  var media=r1(weightedSum/tot);
  var q='Tabla: \\(\\begin{array}{c|c}x&f\\\\\\hline'+vals.map(function(v,i){return v+'&'+freqs[i];}).join('\\\\')+'\\end{array}\\). Media:';
  return Q(q,mc(String(media),[r1(media+0.5)+'',r1(media-0.5)+'',r1(media+1)+'',vals[2]+'']),
    '\\(\\bar{x}=\\dfrac{\\sum f_i\\cdot x_i}{\\sum f_i}\\)',
    '\\(\\dfrac{'+vals.map(function(v,i){return v+'\\times'+freqs[i];}).join('+')+'}{'+tot+'}=\\dfrac{'+weightedSum+'}{'+tot+'}='+media+'\\)','Tablas');
};

MM_GENERATORS['paes_e_tab_07']=function(){
  // Two-way table: marginal total
  var a11=ri(5,20),a12=ri(5,20),a21=ri(5,20),a22=ri(5,20);
  var fila1=a11+a12,fila2=a21+a22,tot=fila1+fila2;
  var q='Tabla de doble entrada:\n\\[\\begin{array}{c|cc|c}&\\text{Cat X}&\\text{Cat Y}&\\text{Total}\\\\\\hline\\text{Grupo A}&'+a11+'&'+a12+'&'+fila1+'\\\\\\text{Grupo B}&'+a21+'&'+a22+'&'+fila2+'\\\\\\hline\\text{Total}&'+(a11+a21)+'&'+(a12+a22)+'&'+tot+'\\end{array}\\]\nTotal general:';
  return Q(q,mc(String(tot),[tot+10+'',fila1+'',fila2+'',tot-5+'']),
    'El total general es la suma de todas las celdas.',
    '\\('+a11+'+'+a12+'+'+a21+'+'+a22+'='+tot+'\\)','Tablas');
};

MM_GENERATORS['paes_e_tab_08']=function(){
  var a11=ri(10,30),a12=ri(10,30),a21=ri(10,30),a22=ri(10,30);
  var tot=a11+a12+a21+a22;
  // P(Cat X | Grupo A)
  var fila1=a11+a12;
  var cor=frL(a11,fila1);
  var q='Tabla de doble entrada: Grupo A tiene '+fila1+' personas ('+a11+' en Cat X, '+a12+' en Cat Y). P(Cat X | Grupo A):';
  return Q(q,mc(cor,[frL(a11,tot),frL(a12,fila1),frL(a11+a21,tot),frL(a12,tot)]),
    '\\(P(\\text{Cat X}|\\text{Grupo A})=\\dfrac{n(A\\cap X)}{n(A)}\\)',
    '\\(\\dfrac{'+a11+'}{'+fila1+'}='+cor+'\\)','Tablas');
};

MM_GENERATORS['paes_e_tab_09']=function(){
  var f=[ri(4,10),ri(4,10),ri(4,10)];
  var tot=sm(f),missing=tot;
  var known=sm(f.slice(0,2));
  var last=f[2];
  var q='Tabla de frecuencias con frecuencias parciales: '+f[0]+', '+f[1]+', __. Total: '+tot+'. ¿Cuál es la frecuencia faltante?';
  return Q(q,mc(String(last),[last+2+'',last-2+'',tot-f[0]+'',tot-f[1]+'']),
    '\\(f_{\\text{faltante}}=\\text{Total}-\\sum f_{\\text{conocidas}}\\)',
    '\\('+tot+'-'+f[0]+'-'+f[1]+'='+last+'\\)','Tablas');
};

MM_GENERATORS['paes_e_tab_10']=function(){
  var pct=pick([20,25,30,40,50]),tot=ri(100,400);
  var cant=tot*pct/100;
  var q='Una tabla muestra que la categoría K tiene frecuencia relativa \\('+r2(pct/100)+'\\) en una muestra de \\('+tot+'\\). ¿Cuántos datos son de K?';
  return Q(q,mc(String(cant),[cant+tot/10+'',cant-pct+'',tot-cant+'',r2(pct/100)+'']),
    '\\(f_i=f_r\\times n\\)',
    '\\('+r2(pct/100)+'\\times '+tot+'='+cant+'\\)','Tablas');
};

MM_GENERATORS['paes_e_tab_11']=function(){
  var f=[ri(3,8),ri(3,8),ri(3,8),ri(3,8),ri(3,8)];
  var tot=sm(f);
  var cumFreqs=f.map(function(_,i){return sm(f.slice(0,i+1));});
  var idx=ri(1,3);
  var q='Tabla con frecuencias '+f.join(', ')+' (n='+tot+'). Frecuencia relativa acumulada hasta el dato '+(idx+1)+':';
  var rfa=r2(cumFreqs[idx]/tot);
  return Q(q,mc(String(rfa),[r2(cumFreqs[idx-1]/tot)+'',r2(cumFreqs[idx+1]/tot)+'',r2(f[idx]/tot)+'',cumFreqs[idx]+'']),
    '\\(F_{r,i}=\\dfrac{F_i}{n}\\) donde \\(F_i\\) es la frecuencia acumulada.',
    '\\(\\dfrac{'+cumFreqs[idx]+'}{'+tot+'}='+rfa+'\\)','Tablas');
};

MM_GENERATORS['paes_e_tab_12']=function(){
  // Mediana from frequency table
  var vals=[1,2,3,4,5];
  var freqs=[ri(1,4),ri(3,6),ri(3,6),ri(1,4),ri(1,4)];
  var tot=sm(freqs);
  // median position
  var medPos=Math.ceil(tot/2);
  var cum=0,medVal=vals[0];
  for(var i=0;i<vals.length;i++){cum+=freqs[i];if(cum>=medPos){medVal=vals[i];break;}}
  var q='Tabla: \\(\\begin{array}{c|c}x&f\\\\\\hline'+vals.map(function(v,i){return v+'&'+freqs[i];}).join('\\\\')+'\\end{array}\\) (n='+tot+'). Mediana:';
  return Q(q,mc(String(medVal),[medVal===1?2:medVal-1+'',medVal===5?4:medVal+1+'',vals[2]+'',r1(sm(vals.map(function(v,i){return v*freqs[i];}))/ tot)+'']),
    'Mediana = dato cuya frecuencia acumulada alcanza \\(\\lceil n/2\\rceil\\).',
    'Posición mediana: \\(\\lceil '+tot+'/2\\rceil='+medPos+'\\). Cae en dato '+medVal,'Tablas');
};

/* ── Register topic arrays ── */
if(!window.MM_TOPIC_GENERATORS)window.MM_TOPIC_GENERATORS={};
var T=window.MM_TOPIC_GENERATORS;
T['paes_e_conteo']=['paes_e_con_01','paes_e_con_02','paes_e_con_03','paes_e_con_04','paes_e_con_05','paes_e_con_06','paes_e_con_07','paes_e_con_08','paes_e_con_09','paes_e_con_10','paes_e_con_11','paes_e_con_12'];
T['paes_e_prob']=['paes_e_pro_01','paes_e_pro_02','paes_e_pro_03','paes_e_pro_04','paes_e_pro_05','paes_e_pro_06','paes_e_pro_07','paes_e_pro_08','paes_e_pro_09','paes_e_pro_10','paes_e_pro_11','paes_e_pro_12'];
T['paes_e_estat']=['paes_e_est_01','paes_e_est_02','paes_e_est_03','paes_e_est_04','paes_e_est_05','paes_e_est_06','paes_e_est_07','paes_e_est_08','paes_e_est_09','paes_e_est_10','paes_e_est_11','paes_e_est_12'];
T['paes_e_graficos']=['paes_e_grf_01','paes_e_grf_02','paes_e_grf_03','paes_e_grf_04','paes_e_grf_05','paes_e_grf_06','paes_e_grf_07','paes_e_grf_08','paes_e_grf_09','paes_e_grf_10','paes_e_grf_11','paes_e_grf_12'];
T['paes_e_tablas']=['paes_e_tab_01','paes_e_tab_02','paes_e_tab_03','paes_e_tab_04','paes_e_tab_05','paes_e_tab_06','paes_e_tab_07','paes_e_tab_08','paes_e_tab_09','paes_e_tab_10','paes_e_tab_11','paes_e_tab_12'];

})();
