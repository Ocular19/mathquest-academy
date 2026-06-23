/* generators-paes-numeros.js
   Eje NÚMEROS — PAES: 72 generadores (12 por temario × 6 temarios)
   Cada generador retorna {question, options[5], answer, correctIndex, hint, explanation, topic, type, eje}
*/
(function(){
'use strict';
var G=window.MM_GENERATORS=window.MM_GENERATORS||{};
var T=window.MM_TOPIC_GENERATORS=window.MM_TOPIC_GENERATORS||{};

function pick(a){return a[Math.floor(Math.random()*a.length)];}
function r0(x){return Math.round(x);}
function r2(x){return Math.round(x*100)/100;}
function r1(x){return Math.round(x*10)/10;}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a||1;}
function lcm(a,b){return Math.abs(a*b)/gcd(a,b);}
function sim(n,d){var g=gcd(Math.abs(n),Math.abs(d));n=n/g;d=d/g;if(d<0){n=-n;d=-d;}return{n:n,d:d};}
function fs(n,d){var s=sim(n,d);return s.d===1?String(s.n):s.n+'/'+s.d;}

function mc(correct,wrongs){
  var c=String(correct),seen=new Set([c]),pool=[];
  wrongs.forEach(function(w){var s=String(w);if(!seen.has(s)&&s!=='NaN'&&s!=='Infinity'&&s!=='-Infinity'&&s!=='undefined'){seen.add(s);pool.push(s);}});
  var fills=['Ninguna de las anteriores','No existe','No es posible','Depende del contexto'];
  var fi=0;
  while(pool.length<4){
    var parsed=parseFloat(c);
    if(!isNaN(parsed)){
      var j=pool.length+1;var v=String(r2(parsed+(j%2?j:-j)));
      if(!seen.has(v)){seen.add(v);pool.push(v);}else{if(!seen.has(fills[fi])){seen.add(fills[fi]);pool.push(fills[fi]);}fi++;}
    } else {if(!seen.has(fills[fi])){seen.add(fills[fi]);pool.push(fills[fi]);}fi++;if(fi>=fills.length)break;}
  }
  pool=pool.slice(0,4);
  var pos=Math.floor(Math.random()*5);pool.splice(pos,0,c);
  var L=['A','B','C','D','E'];
  return{options:pool.map(function(v,i){return L[i]+') '+v;}),correctIndex:pos,answer:L[pos]+') '+c};
}

function Q(q,m,hint,exp,topic){
  return{question:q,options:m.options,correctIndex:m.correctIndex,answer:m.answer,
    hint:hint,explanation:exp,topic:topic,type:'opcion_multiple',eje:'Números'};
}

/* ══════════════════════════════════════════════════════
   TEMARIO 1 — NÚMEROS Y OPERACIONES
══════════════════════════════════════════════════════ */
T['paes_n_numeros']=['paes_n_num_01','paes_n_num_02','paes_n_num_03','paes_n_num_04',
  'paes_n_num_05','paes_n_num_06','paes_n_num_07','paes_n_num_08','paes_n_num_09',
  'paes_n_num_10','paes_n_num_11','paes_n_num_12'];

G['paes_n_num_01']=function(diff){
  var items=[
    {n:'√2',t:'irracional'},{n:'π',t:'irracional'},{n:'√3',t:'irracional'},
    {n:'1/3',t:'racional'},{n:'-7',t:'racional'},{n:'0,5',t:'racional'},
    {n:'√5',t:'irracional'},{n:'2/7',t:'racional'},{n:'√4 = 2',t:'racional'},
    {n:'e (número de Euler)',t:'irracional'}
  ];
  var item=pick(diff==='easy'?items.slice(3):diff==='medio'?items:items.filter(function(i){return i.t==='irracional';}));
  var correct=item.t;
  var wrong=correct==='racional'?'irracional':'racional';
  var m=mc(correct,[wrong,'entero','natural']);
  return Q('¿El número '+item.n+' es...?',m,
    'Un número racional puede escribirse como p/q con p,q enteros y q≠0. Los irracionales no pueden expresarse de esa forma.',
    item.n+(item.t==='racional'?' puede expresarse como fracción → es racional':' no puede expresarse como fracción → es irracional'),
    'paes_n_numeros');
};

G['paes_n_num_02']=function(diff){
  var vals=diff==='easy'?[-5,-3,-8,-2,-7]:diff==='medio'?[-15,-23,-7,-11,-19]:[-47,-83,-36,-125,-64];
  var a=pick(vals);
  var correct=Math.abs(a);
  var m=mc(correct,[a,-a,a-1,correct+1]);
  return Q('¿Cuál es el valor de |'+a+'|?',m,
    '|a| es la distancia de a al cero: si a<0, |a| = -a (número positivo).',
    '|'+a+'| = -('+a+') = '+correct,
    'paes_n_numeros');
};

G['paes_n_num_03']=function(diff){
  var pairs=diff==='easy'?[[-3,2],[-1,4],[0,-5],[6,-2]]:diff==='medio'?[[-15,-3],[-8,-12],[0,-20],[-7,7]]:[['-23','-7'],['-100','-99'],['-50','0'],['-3','3']];
  var par=pick(pairs);var a=parseInt(par[0]),b=parseInt(par[1]);
  var rel=a<b?'<':a>b?'>':'=';
  var correct=a+' '+rel+' '+b;
  var wrong1=a+' '+(rel==='<'?'>':rel==='>'?'<':'≠')+' '+b;
  var wrong2=a+' = '+b;
  var wrong3='|'+a+'| '+rel+' |'+b+'|';
  var m=mc(correct,[wrong1,wrong2,wrong3,(-a)+' '+rel+' '+(-b)]);
  return Q('¿Cuál afirmación es verdadera?',m,
    'En la recta numérica, los valores más a la derecha son mayores. Los negativos siempre son menores que los positivos.',
    a+(a<b?' está a la izquierda de ':' está a la derecha de ')+b+' → '+correct,
    'paes_n_numeros');
};

G['paes_n_num_04']=function(diff){
  var pairs=diff==='easy'?[[3,-7],[-4,9],[-5,-3],[8,-3]]:diff==='medio'?[[-12,5],[7,-15],[-8,-9],[20,-23]]:[['-35','17'],['42','-68'],['-100','73'],['-29','-45']];
  var par=pick(pairs);var a=parseInt(par[0]),b=parseInt(par[1]),c=a+b;
  var m=mc(c,[Math.abs(a)+Math.abs(b),Math.abs(a-b),c+1,a-b]);
  return Q('¿Cuánto es '+a+' + ('+b+')?',m,
    'Suma con signos: si son distintos, resta los valores absolutos y toma el signo del mayor.',
    a+' + ('+b+') = '+c,
    'paes_n_numeros');
};

G['paes_n_num_05']=function(diff){
  var pairs=diff==='easy'?[[-3,4],[-2,5],[3,-6],[-4,-4]]:diff==='medio'?[[-7,8],[-3,-9],[12,-5],[-6,-7]]:[['-13','11'],['-8','-12'],['15','-9'],['-14','-6']];
  var par=pick(pairs);var a=parseInt(par[0]),b=parseInt(par[1]),c=a*b;
  var m=mc(c,[-c,Math.abs(c)*(a+b<0?-1:1)-1,a+b,c+(diff==='easy'?2:5)]);
  return Q('¿Cuánto es ('+a+') × ('+b+')?',m,
    'Regla de signos: (−)(−)=+, (+)(+)=+, (−)(+)=−. Multiplica valores absolutos y aplica la regla.',
    '('+a+') × ('+b+') = '+c+(c>0?' [signos iguales → positivo]':' [signos distintos → negativo]'),
    'paes_n_numeros');
};

G['paes_n_num_06']=function(diff){
  var pairs=diff==='easy'?[[-12,3],[-15,-5],[24,-4],[-18,-6]]:diff==='medio'?[[-36,9],[-48,-8],[60,-12],[-72,-9]]:[['-120','15'],['-144','-12'],['180','-15'],['-210','-14']];
  var par=pick(pairs);var a=parseInt(par[0]),b=parseInt(par[1]),c=a/b;
  var m=mc(c,[-c,c+1,c-1,Math.abs(c)]);
  return Q('¿Cuánto es ('+a+') ÷ ('+b+')?',m,
    'Signos en división: iguales → positivo; distintos → negativo.',
    '('+a+') ÷ ('+b+') = '+c+((a<0&&b<0)||(a>0&&b>0)?' (positivo: mismo signo)':' (negativo: signos distintos)'),
    'paes_n_numeros');
};

G['paes_n_num_07']=function(diff){
  var a=pick([2,3,4,5]),b=pick([2,3,4]),c=pick([3,4,5,6]);
  var correct=a+b*c;var wrong1=(a+b)*c;
  var m=mc(correct,[wrong1,a*b+c,correct+1,wrong1-1]);
  return Q('¿Cuánto es '+a+' + '+b+' × '+c+'?',m,
    'Primero se resuelven las multiplicaciones, luego las sumas y restas.',
    a+' + '+b+' × '+c+' = '+a+' + '+(b*c)+' = '+correct+' (NO es ('+a+'+'+b+')×'+c+' = '+wrong1+')',
    'paes_n_numeros');
};

G['paes_n_num_08']=function(diff){
  var a=pick([2,3]),b=pick([2,3,4]),c=pick([4,5,6,8,10]);
  var correct=a*b*b-c;var wrong1=(a*b)*(a*b)-c;var wrong2=a*b-c;
  var m=mc(correct,[wrong1,wrong2,correct+a,correct-b]);
  return Q('¿Cuánto es '+a+' × '+b+'² − '+c+'?',m,
    'Primero potencias ('+b+'²='+b*b+'), luego multiplicación, finalmente resta.',
    a+' × '+b+'² − '+c+' = '+a+' × '+(b*b)+' − '+c+' = '+(a*b*b)+' − '+c+' = '+correct,
    'paes_n_numeros');
};

G['paes_n_num_09']=function(diff){
  var tIni=pick(diff==='easy'?[5,10,15,8]:diff==='medio'?[-3,0,8,-5]:[-10,-5,-15,-8]);
  var baj=pick(diff==='easy'?[8,6,4,12]:diff==='medio'?[15,12,9,18]:[20,18,25,13]);
  var correct=tIni-baj;
  var m=mc(correct,[tIni+baj,Math.abs(tIni-baj),correct-1,correct+1]);
  return Q('La temperatura era '+tIni+'°C y bajó '+baj+'°C. ¿Cuál es la temperatura final?',m,
    'Bajar '+baj+'°C = sumar −'+baj+'. Resultado: '+tIni+' + (−'+baj+').',
    tIni+' − '+baj+' = '+correct+'°C',
    'paes_n_numeros');
};

G['paes_n_num_10']=function(diff){
  var a=pick(diff==='easy'?[-5,-3,7,-9]:diff==='medio'?[-17,24,-31,45]:[-123,87,-256,199]);
  var correct=-a;
  var m=mc(correct,[a,Math.abs(a),correct+2,correct-2]);
  return Q('¿Cuál es el opuesto aditivo de '+a+'?',m,
    'El opuesto de a es −a, pues a + (−a) = 0.',
    'El opuesto de '+a+' es −('+a+') = '+correct,
    'paes_n_numeros');
};

G['paes_n_num_11']=function(diff){
  var a=pick(diff==='easy'?[-3,-5,-7,-2]:diff==='medio'?[-12,-8,-15,-20]:[-35,-47,-23,-61]);
  var b=pick(diff==='easy'?[1,2,3]:diff==='medio'?[3,4,5]:[7,8,10]);
  var sum=a+b;var correct=Math.abs(sum);
  var m=mc(correct,[Math.abs(a)+b,Math.abs(a)+Math.abs(b),Math.abs(sum-1),correct+1]);
  return Q('¿Cuánto es |'+a+' + '+b+'|?',m,
    'Primero resuelve dentro: '+a+' + '+b+' = '+sum+'. Luego aplica el valor absoluto.',
    '|'+a+' + '+b+'| = |'+sum+'| = '+correct,
    'paes_n_numeros');
};

G['paes_n_num_12']=function(diff){
  var deuda=pick(diff==='easy'?[5000,8000,12000]:diff==='medio'?[25000,40000,55000]:[120000,250000,380000]);
  var pago=pick(diff==='easy'?[3000,4000]:diff==='medio'?[10000,15000]:[50000,80000]);
  var saldo=-deuda+pago;
  var m=mc('$'+saldo,['$'+(deuda-pago),'$'+(deuda+pago),'$'+(saldo+pago),'$'+(-saldo)]);
  return Q('Sofía debe $'+deuda+'. Paga $'+pago+'. ¿Cuál es su saldo?',m,
    'La deuda es −$'+deuda+'. El pago la reduce: −$'+deuda+' + $'+pago+'.',
    'Saldo = −$'+deuda+' + $'+pago+' = $'+saldo+(saldo<0?' (aún debe $'+Math.abs(saldo)+')':' (saldo favorable)'),
    'paes_n_numeros');
};

/* ══════════════════════════════════════════════════════
   TEMARIO 2 — FRACCIONES
══════════════════════════════════════════════════════ */
T['paes_n_fracciones']=['paes_n_fra_01','paes_n_fra_02','paes_n_fra_03','paes_n_fra_04',
  'paes_n_fra_05','paes_n_fra_06','paes_n_fra_07','paes_n_fra_08','paes_n_fra_09',
  'paes_n_fra_10','paes_n_fra_11','paes_n_fra_12'];

G['paes_n_fra_01']=function(diff){
  var d=pick(diff==='easy'?[4,5,6]:diff==='medio'?[7,8,9]:[11,12,15]);
  var a=pick([1,2,3]),b=1;while(a+b>=d){b=1;}b=pick([1,2]);while(a+b>=d){b=1;}
  var n=a+b;var s=sim(n,d);var correct=fs(n,d);
  var wrong1=(a*b)+'/'+d;var wrong2=a+'/'+b;var wrong3=n+'/'+(d+1);
  var m=mc(correct,[wrong1,wrong2,wrong3,s.n+'/'+(s.d+1)]);
  return Q(a+'/'+d+' + '+b+'/'+d+' = ?',m,
    'Mismos denominadores: suma los numeradores y conserva el denominador.',
    a+'/'+d+' + '+b+'/'+d+' = '+(a+b)+'/'+d+(s.d!==d?' = '+correct:''),
    'paes_n_fracciones');
};

G['paes_n_fra_02']=function(diff){
  var sets=diff==='easy'?[[1,2,1,3],[1,3,1,4],[2,3,1,4]]:diff==='medio'?[[3,4,2,3],[5,6,1,4],[2,5,3,4]]:[[5,6,7,8],[3,7,4,9],[5,8,3,10]];
  var p=pick(sets);var a=p[0],b=p[1],c=p[2],d=p[3];
  var l=lcm(b,d);var num=a*(l/b)+c*(l/d);var s=sim(num,l);
  var correct=fs(num,l);
  var wrong1=(a+c)+'/'+(b+d);var wrong2=a+'/'+d;var wrong3=fs(a*c,b*d);
  var m=mc(correct,[wrong1,wrong2,wrong3,s.n+'/'+(s.d+1)]);
  return Q(a+'/'+b+' + '+c+'/'+d+' = ?',m,
    'Busca MCM('+b+','+d+') = '+l+'. Amplifica cada fracción y suma los numeradores.',
    a+'/'+b+' + '+c+'/'+d+' = '+(a*(l/b))+'/'+l+' + '+(c*(l/d))+'/'+l+' = '+num+'/'+l+(s.d!==l?' = '+correct:''),
    'paes_n_fracciones');
};

G['paes_n_fra_03']=function(diff){
  var sets=diff==='easy'?[[3,4,1,4],[5,6,1,3],[7,8,1,4]]:diff==='medio'?[[5,6,3,4],[7,8,5,6],[9,10,3,5]]:[[11,12,5,8],[13,15,7,10],[17,18,5,12]];
  var p=pick(sets);var a=p[0],b=p[1],c=p[2],d=p[3];
  var l=lcm(b,d);var num=a*(l/b)-c*(l/d);var s=sim(num,l);var correct=fs(num,l);
  var wrong1=(a-c)+'/'+(b===d?b:Math.abs(b-d)||1);var wrong2=fs(a*d-c*b,b*d);
  var m=mc(correct,[wrong1,wrong2,fs(num+1,l),fs(num,l+1)]);
  return Q(a+'/'+b+' − '+c+'/'+d+' = ?',m,
    'Busca MCM('+b+','+d+') = '+l+'. Amplifica cada fracción y resta los numeradores.',
    a+'/'+b+' − '+c+'/'+d+' = '+(a*(l/b))+'/'+l+' − '+(c*(l/d))+'/'+l+' = '+num+'/'+l+(s.d!==l?' = '+correct:''),
    'paes_n_fracciones');
};

G['paes_n_fra_04']=function(diff){
  var sets=diff==='easy'?[[2,3,3,4],[1,2,4,5],[3,4,2,5]]:diff==='medio'?[[5,6,3,10],[7,8,4,7],[5,9,3,5]]:[[7,12,4,21],[9,16,8,15],[11,14,7,22]];
  var p=pick(sets);var a=p[0],b=p[1],c=p[2],d=p[3];
  var correct=fs(a*c,b*d);
  var wrong1=(a+c)+'/'+(b+d);var wrong2=fs(a*d+b*c,b*d);var wrong3=fs(a*d,b*c);
  var m=mc(correct,[wrong1,wrong2,wrong3,fs(a*c+1,b*d)]);
  return Q(a+'/'+b+' × '+c+'/'+d+' = ?',m,
    'Multiplica numeradores y denominadores por separado: (a×c)/(b×d). Simplifica.',
    a+'/'+b+' × '+c+'/'+d+' = '+(a*c)+'/'+(b*d)+(correct!==(a*c)+'/'+(b*d)?' = '+correct:''),
    'paes_n_fracciones');
};

G['paes_n_fra_05']=function(diff){
  var sets=diff==='easy'?[[2,3,4,3],[3,4,3,2],[5,6,5,3]]:diff==='medio'?[[7,8,7,4],[5,9,10,9],[11,12,11,6]]:[[13,15,26,5],[17,18,34,9],[7,10,21,5]];
  var p=pick(sets);var a=p[0],b=p[1],c=p[2],d=p[3];
  var correct=fs(a*d,b*c);
  var wrong1=fs(a*c,b*d);var wrong2=a+'/'+c;var wrong3=fs(b*c,a*d);
  var m=mc(correct,[wrong1,wrong2,wrong3,fs(a*d+1,b*c)]);
  return Q(a+'/'+b+' ÷ '+c+'/'+d+' = ?',m,
    'Dividir por una fracción = multiplicar por su recíproco: ÷ c/d = × d/c.',
    a+'/'+b+' ÷ '+c+'/'+d+' = '+a+'/'+b+' × '+d+'/'+c+' = '+(a*d)+'/'+(b*c)+(correct!==(a*d)+'/'+(b*c)?' = '+correct:''),
    'paes_n_fracciones');
};

G['paes_n_fra_06']=function(diff){
  var sets=diff==='easy'?[[12,16],[15,20],[18,24]]:diff==='medio'?[[28,42],[45,75],[36,48]]:[[84,126],[75,100],[132,154]];
  var p=pick(sets);var a=p[0],b=p[1];var g=gcd(a,b);
  var correct=fs(a/g,b/g);
  var m=mc(correct,[a+'/'+(b-1),(a-1)+'/'+b,fs(a/2,b/2)||a+'/'+b,correct+'/2']);
  return Q('¿Cuál es '+a+'/'+b+' en su mínima expresión?',m,
    'Divide numerador y denominador por su MCD. MCD('+a+','+b+') = '+g+'.',
    'MCD('+a+','+b+') = '+g+' → '+a+'/'+b+' ÷ '+g+'/'+g+' = '+(a/g)+'/'+(b/g)+' = '+correct,
    'paes_n_fracciones');
};

G['paes_n_fra_07']=function(diff){
  var sets=diff==='easy'?[[2,3,120],[3,4,80],[1,2,150]]:diff==='medio'?[[5,8,240],[3,7,280],[4,9,225]]:[[11,12,360],[7,15,450],[9,16,480]];
  var p=pick(sets);var a=p[0],b=p[1],n=p[2];
  var correct=r0(n*a/b);var wrong1=r0(n*b/a);var wrong2=r0(n/b);var wrong3=r0(n*a);
  var m=mc(correct,[wrong1,wrong2,wrong3,correct+b]);
  return Q('¿Cuánto es '+a+'/'+b+' de '+n+'?',m,
    'Fracción de cantidad: '+n+' × '+a+'/'+b+'.',
    n+' × '+a+'/'+b+' = '+(n*a)+'/'+b+' = '+correct,
    'paes_n_fracciones');
};

G['paes_n_fra_08']=function(diff){
  var fracs=diff==='easy'?[[1,4,'0,25'],[3,4,'0,75'],[1,5,'0,2'],[2,5,'0,4']]:diff==='medio'?[[3,8,'0,375'],[7,8,'0,875'],[5,8,'0,625'],[1,8,'0,125']]:[[1,6,'0,1666...'],[5,6,'0,8333...'],[1,3,'0,333...'],[2,3,'0,6666...']];
  var f=pick(fracs);var a=f[0],b=f[1],correct=f[2];
  var m=mc(correct,[String(a*b),String(r2(b/a)),String(r2((a+1)/b)),String(r2(a/(b+1)))]);
  return Q('¿Cuál es la expresión decimal de '+a+'/'+b+'?',m,
    'Divide el numerador por el denominador: '+a+' ÷ '+b+'.',
    a+'/'+b+' = '+a+' ÷ '+b+' = '+correct,
    'paes_n_fracciones');
};

G['paes_n_fra_09']=function(diff){
  var sets=diff==='easy'?[[1,3,1,4],[2,5,3,7],[3,4,5,7]]:diff==='medio'?[[5,8,7,12],[4,9,3,7],[7,10,5,8]]:[[11,13,9,11],[7,15,5,11],[9,14,11,17]];
  var p=pick(sets);var a=p[0],b=p[1],c=p[2],d=p[3];
  var v1=a/b,v2=c/d;var rel=v1>v2?'>':v1<v2?'<':'=';
  var correct=a+'/'+b+' '+rel+' '+c+'/'+d;
  var wrong=a+'/'+b+' '+(rel==='>'?'<':rel==='<'?'>':'≠')+' '+c+'/'+d;
  var m=mc(correct,[wrong,a+'/'+b+' = '+c+'/'+d,r2(v1)+' < '+r2(v2),c+'/'+d+' < '+a+'/'+b+(rel!=='<'?' (invertida)':'')]);
  return Q('¿Cuál relación entre '+a+'/'+b+' y '+c+'/'+d+' es correcta?',m,
    'Convierte a decimal: '+a+'/'+b+'='+r2(v1)+' y '+c+'/'+d+'='+r2(v2)+'.',
    a+'/'+b+'='+r2(v1)+' y '+c+'/'+d+'='+r2(v2)+' → '+correct,
    'paes_n_fracciones');
};

G['paes_n_fra_10']=function(diff){
  var sets=diff==='easy'?[[2,1,3],[3,2,4],[1,3,5]]:diff==='medio'?[[4,3,7],[5,2,9],[3,4,5]]:[[7,5,8],[9,3,11],[6,7,10]];
  var p=pick(sets);var ent=p[0],num=p[1],den=p[2];
  var correct=(ent*den+num)+'/'+den;
  var m=mc(correct,[(ent+num)+'/'+den,(ent*num+den)+'/'+den,(ent*den-num)+'/'+den,(ent*den+num)+'/'+(den+1)]);
  return Q('Expresa '+ent+' '+num+'/'+den+' como fracción impropia:',m,
    'Entero × denominador + numerador, todo sobre el denominador: ('+ent+'×'+den+'+'+num+')/'+den+'.',
    ent+' '+num+'/'+den+' = ('+ent+'×'+den+'+'+num+')/'+den+' = '+(ent*den+num)+'/'+den,
    'paes_n_fracciones');
};

G['paes_n_fra_11']=function(diff){
  var sets=diff==='easy'?[[1,2,1,3,3,4],[2,3,1,4,2,3]]:diff==='medio'?[[3,4,1,6,2,5],[5,8,1,4,3,5]]:[[7,12,5,8,2,3]];
  var p=pick(sets);var a=p[0],b=p[1],c=p[2],d=p[3],e=p[4],f=p[5];
  var l=lcm(b,d);var sumN=a*(l/b)+c*(l/d);
  var resN=sumN*e;var resD=l*f;var s=sim(resN,resD);var correct=fs(resN,resD);
  var wrong1=fs(a+c,b+d);var wrong2=fs(sumN+e,l+f);
  var m=mc(correct,[wrong1,wrong2,fs(resN+1,resD),fs(resN,resD+1)]);
  return Q('Calcula ('+a+'/'+b+' + '+c+'/'+d+') × '+e+'/'+f+' = ?',m,
    'Primero resuelve el paréntesis con MCM = '+l+': '+sumN+'/'+l+'. Luego multiplica por '+e+'/'+f+'.',
    '('+a+'/'+b+'+'+c+'/'+d+')='+sumN+'/'+l+'. × '+e+'/'+f+' = '+resN+'/'+resD+(s.d!==resD?' = '+correct:''),
    'paes_n_fracciones');
};

G['paes_n_fra_12']=function(diff){
  var sets=diff==='easy'?[[1,4,120,'comida'],[1,3,90,'ropa'],[2,5,100,'ahorro']]:diff==='medio'?[[3,8,240,'comida'],[2,7,280,'transporte']]:[[5,12,360,'arriendo'],[7,16,480,'salud']];
  var p=pick(sets);var a=p[0],b=p[1],total=p[2],dest=p[3];
  var gasto=r0(total*a/b);var correct=total-gasto;
  var m=mc(correct,[gasto,total,total-r0(total*(a+1)/b),r0(total*a/b*2)]);
  return Q('Ana tiene $'+total+'. Gasta '+a+'/'+b+' en '+dest+'. ¿Cuánto le queda?',m,
    a+'/'+b+' de $'+total+' = $'+gasto+'. Resto = $'+total+' − $'+gasto+'.',
    total+'×'+a+'/'+b+'=$'+gasto+'. Queda: $'+total+'−$'+gasto+'=$'+correct,
    'paes_n_fracciones');
};

/* ══════════════════════════════════════════════════════
   TEMARIO 3 — RAZONES Y PROPORCIONES
══════════════════════════════════════════════════════ */
T['paes_n_razones']=['paes_n_raz_01','paes_n_raz_02','paes_n_raz_03','paes_n_raz_04',
  'paes_n_raz_05','paes_n_raz_06','paes_n_raz_07','paes_n_raz_08','paes_n_raz_09',
  'paes_n_raz_10','paes_n_raz_11','paes_n_raz_12'];

G['paes_n_raz_01']=function(diff){
  var sets=diff==='easy'?[[6,10],[8,12],[15,20]]:diff==='medio'?[[24,36],[35,49],[42,63]]:[[72,108],[90,135],[84,140]];
  var p=pick(sets);var a=p[0],b=p[1];var g=gcd(a,b);
  var correct=(a/g)+':'+(b/g);
  var m=mc(correct,[a+':'+b,(b/g)+':'+(a/g),(a/g)+':'+(b/g+1),(a/g-1)+':'+(b/g)]);
  return Q('¿Cuál es la razón '+a+':'+b+' en su forma más simple?',m,
    'Divide ambos términos por su MCD. MCD('+a+','+b+') = '+g+'.',
    'MCD('+a+','+b+')='+g+' → '+a+':'+b+' = '+(a/g)+':'+(b/g),
    'paes_n_razones');
};

G['paes_n_raz_02']=function(diff){
  var sets=diff==='easy'?[[3,9,5],[2,8,4],[4,12,6]]:diff==='medio'?[[7,21,11],[5,35,8],[9,27,15]]:[[13,52,17],[11,44,15],[8,56,14]];
  var d=pick(sets);var a=d[0],b=d[1],c=d[2];var correct=r0(b*c/a);
  var m=mc(correct,[r0(a*c/b),r0(a*b/c),r0(c+b-a),correct+1]);
  return Q('Si '+a+' corresponde a '+b+', ¿a qué cantidad corresponde '+c+'?',m,
    'Proporción directa: a/b = c/x → x = b × c / a.',
    'x = '+b+' × '+c+' / '+a+' = '+(b*c)+'/'+a+' = '+correct,
    'paes_n_razones');
};

G['paes_n_raz_03']=function(diff){
  var sets=diff==='easy'?[[4,6,3],[5,4,10],[3,8,6]]:diff==='medio'?[[8,15,12],[6,10,15],[9,16,12]]:[[15,8,12],[20,9,15],[12,25,20]];
  var d=pick(sets);var a=d[0],b=d[1],c=d[2];var correct=r2(a*b/c);
  var m=mc(correct,[r2(b*c/a),r2(c*a/b),correct+2,correct-2]);
  return Q('Si '+a+' máquinas hacen una tarea en '+b+' horas, ¿cuántas horas tardan '+c+' máquinas?',m,
    'Proporción inversa: más máquinas → menos horas. Producto constante: '+a+'×'+b+' = '+c+'×x.',
    a+'×'+b+' = '+c+'×x → x = '+(a*b)+'/'+c+' = '+correct+' horas',
    'paes_n_razones');
};

G['paes_n_raz_04']=function(diff){
  var sets=diff==='easy'?[[2,3,100],[1,2,90],[3,5,80]]:diff==='medio'?[[3,5,160],[2,7,180],[4,5,180]]:[[5,7,240],[3,8,220],[6,7,260]];
  var d=pick(sets);var ra=d[0],rb=d[1],total=d[2];
  var sumR=ra+rb;var partA=r0(total*ra/sumR);var partB=total-partA;
  var correct='$'+partA+' y $'+partB;
  var m=mc(correct,['$'+partB+' y $'+partA,'$'+(total/2)+' y $'+(total/2),'$'+(ra*rb)+' y $'+(total-ra*rb),'$'+(total*ra)+' y $'+(total*rb)]);
  return Q('Se reparten $'+total+' en la razón '+ra+':'+rb+'. ¿Cuánto recibe cada parte?',m,
    'Suma de la razón = '+sumR+'. Parte A = $'+total+'×'+ra+'/'+sumR+', Parte B = $'+total+'×'+rb+'/'+sumR+'.',
    'Parte A = $'+total+'×'+ra+'/'+sumR+' = $'+partA+'. Parte B = $'+total+'−$'+partA+' = $'+partB,
    'paes_n_razones');
};

G['paes_n_raz_05']=function(diff){
  var ok=diff==='easy'?[[2,5,4,10],[3,7,9,21],[4,6,2,3]]:[[7,11,21,33],[8,15,16,30],[9,13,27,39]];
  var no=diff==='easy'?[[2,5,4,9],[3,7,9,22],[4,6,3,5]]:[[7,11,21,34],[8,15,16,31],[9,13,27,40]];
  var isOk=Math.random()<0.5;var p=isOk?pick(ok):pick(no);
  var a=p[0],b=p[1],c=p[2],d=p[3];
  var correct=a*d===b*c?'Sí, son proporcionales':'No son proporcionales';
  var wrong=a*d===b*c?'No son proporcionales':'Sí, son proporcionales';
  var m=mc(correct,[wrong,'Solo si a < b','No se puede determinar','Siempre son proporcionales']);
  return Q('¿Los números '+a+', '+b+', '+c+', '+d+' forman una proporción '+a+'/'+b+' = '+c+'/'+d+'?',m,
    'Verifica con productos cruzados: a×d debe ser igual a b×c.',
    a+'×'+d+' = '+a*d+' y '+b+'×'+c+' = '+b*c+'. '+(a*d===b*c?'Iguales → '+correct+'.':'Distintos → '+correct+'.'),
    'paes_n_razones');
};

G['paes_n_raz_06']=function(diff){
  var sets=diff==='easy'?[[60,2],[80,3],[100,2]]:diff==='medio'?[[90,3],[75,4],[120,2]]:[[85,3],[110,4],[95,6]];
  var d=pick(sets);var v=d[0],t=d[1];var dist=v*t;
  var m=mc(dist+'km',[(v+t)+'km',r2(v/t)+'km',(dist*2)+'km',(dist-v)+'km']);
  return Q('Un vehículo viaja a '+v+' km/h durante '+t+' horas. ¿Qué distancia recorre?',m,
    'd = velocidad × tiempo = '+v+' × '+t+'.',
    'd = '+v+' km/h × '+t+' h = '+dist+' km',
    'paes_n_razones');
};

G['paes_n_raz_07']=function(diff){
  var sets=diff==='easy'?[[1,100,5,'cm','m']]:diff==='medio'?[[1,1000,3,'cm','m']]:[[1,25000,8,'cm','km']];
  var d=pick(sets);var factor=d[1];var med=d[2];var unit_p=d[3];var unit_r=d[4];
  var real_cm=med*factor;
  var correct=unit_r==='m'?(real_cm/100)+'m':(real_cm/100000)+'km';
  var wrong1=(med*factor)+'cm';var wrong2=(med/factor)+'m';var wrong3=(real_cm/10)+'m';
  var m=mc(correct,[wrong1,wrong2,wrong3,r2(real_cm/100+1)+'m']);
  return Q('En un plano a escala 1:'+factor+', una distancia mide '+med+' '+unit_p+'. ¿Cuánto es en la realidad?',m,
    'Escala 1:'+factor+': 1 cm plano = '+factor+' cm real = '+(factor/100)+' m.',
    med+' cm × '+factor+' = '+real_cm+' cm = '+correct,
    'paes_n_razones');
};

G['paes_n_raz_08']=function(diff){
  var sets=diff==='easy'?[[4,6],[3,6],[6,12]]:diff==='medio'?[[8,12],[6,9],[10,15]]:[[12,18],[15,20],[18,24]];
  var d=pick(sets);var ta=d[0],tb=d[1];
  var t=r2(ta*tb/(ta+tb));
  var m=mc(t+' días',[(ta+tb)+' días',(ta/2)+' días',Math.max(ta,tb)+' días',(t+1)+' días']);
  return Q('A hace una tarea en '+ta+' días y B en '+tb+' días. ¿Cuánto tardan juntos?',m,
    'Tasa A = 1/'+ta+' por día, tasa B = 1/'+tb+'. Juntos: 1/t = 1/'+ta+' + 1/'+tb+'.',
    '1/t = 1/'+ta+'+1/'+tb+' = '+(ta+tb)+'/'+(ta*tb)+' → t = '+(ta*tb)+'/'+(ta+tb)+' = '+t+' días',
    'paes_n_razones');
};

G['paes_n_raz_09']=function(diff){
  var sets=diff==='easy'?[[5,10,10],[6,12,8],[4,8,12]]:diff==='medio'?[[8,12,12],[15,20,10],[6,9,12]]:[[20,30,15],[12,18,16],[15,25,20]];
  var d=pick(sets);var p1=d[0],dias1=d[1],p2=d[2];
  var correct=r2(p1*dias1/p2);
  var m=mc(correct+' días',[r2(p2*dias1/p1)+' días',(dias1+p2-p1)+' días',(p1*dias1)+' días',(correct+2)+' días']);
  return Q(p1+' obreros terminan una obra en '+dias1+' días. ¿Cuántos días tardan '+p2+' obreros?',m,
    'Más obreros → menos días (proporción inversa). '+p1+'×'+dias1+' = '+p2+'×x.',
    p1+'×'+dias1+' = '+p2+'×x → x = '+(p1*dias1)+'/'+p2+' = '+correct+' días',
    'paes_n_razones');
};

G['paes_n_raz_10']=function(diff){
  var sets=diff==='easy'?[[3,5,150],[2,3,90],[4,7,140]]:diff==='medio'?[[5,8,200],[7,10,210],[3,7,280]]:[[7,12,252],[9,16,288],[11,15,330]];
  var d=pick(sets);var ra=d[0],rb=d[1],total=d[2];
  var mayor=Math.max(ra,rb),menor=Math.min(ra,rb);
  var partMayor=r0(total*mayor/(ra+rb));
  var correct=partMayor;
  var m=mc(correct,[total-correct,r0(total/2),r0(total*menor/(ra+rb)),correct+menor]);
  return Q('Se reparten $'+total+' en la razón '+ra+':'+rb+'. ¿Cuánto recibe la parte mayor?',m,
    'Suma de razón = '+(ra+rb)+'. Parte mayor = $'+total+' × '+mayor+'/'+(ra+rb)+'.',
    '$'+total+' × '+mayor+'/'+(ra+rb)+' = '+(total*mayor)+'/'+(ra+rb)+' = $'+correct,
    'paes_n_razones');
};

G['paes_n_raz_11']=function(diff){
  var sets=diff==='easy'?[[2,1,90],[3,1,80],[4,1,100]]:diff==='medio'?[[3,2,250],[5,2,210],[4,3,280]]:[[5,3,320],[7,4,330],[9,5,350]];
  var d=pick(sets);var rAgua=d[0],rConc=d[1],total=d[2];
  var sumR=rAgua+rConc;
  var agua=r0(total*rAgua/sumR);
  var m=mc(agua+' L',[r0(total*rConc/sumR)+' L',(total-agua)+' L',(total/rAgua|0)+' L',r0(total*rAgua)+' L']);
  return Q('Una bebida se prepara mezclando agua y concentrado en razón '+rAgua+':'+rConc+'. Si se preparan '+total+' L, ¿cuántos litros de agua se usan?',m,
    'Agua = total × '+rAgua+'/'+(sumR)+' (fracción de agua en la mezcla).',
    total+' × '+rAgua+'/'+sumR+' = '+(total*rAgua)+'/'+sumR+' = '+agua+' L',
    'paes_n_razones');
};

G['paes_n_raz_12']=function(diff){
  var sets=diff==='easy'?[[3,15,5],[4,20,6],[2,10,8]]:diff==='medio'?[[5,25,7],[6,30,9],[4,32,8]]:[[8,40,12],[9,45,15],[7,35,14]];
  var d=pick(sets);var h1=d[0],panes1=d[1],h2=d[2];
  var panes2=r0(panes1*h2/h1);
  var m=mc(panes2+' panes',[(panes1+h2)+' panes',r0(panes1/h1)+'panes/horno',(panes2-h1)+' panes',(panes2+h1)+' panes']);
  return Q('Con '+h1+' hornos se producen '+panes1+' panes por hora. ¿Cuántos panes producen '+h2+' hornos?',m,
    'Proporción directa: más hornos → más panes. '+panes1+'/'+h1+' = x/'+h2+'.',
    'x = '+panes1+'×'+h2+'/'+h1+' = '+(panes1*h2)+'/'+h1+' = '+panes2+' panes',
    'paes_n_razones');
};

/* ══════════════════════════════════════════════════════
   TEMARIO 4 — PORCENTAJES
══════════════════════════════════════════════════════ */
T['paes_n_porcentajes']=['paes_n_por_01','paes_n_por_02','paes_n_por_03','paes_n_por_04',
  'paes_n_por_05','paes_n_por_06','paes_n_por_07','paes_n_por_08','paes_n_por_09',
  'paes_n_por_10','paes_n_por_11','paes_n_por_12'];

G['paes_n_por_01']=function(diff){
  var sets=diff==='easy'?[[10,200],[25,400],[50,120]]:diff==='medio'?[[15,300],[30,250],[35,400]]:[[12,175],[17,300],[33,600]];
  var d=pick(sets);var p=d[0],b=d[1];var correct=r2(b*p/100);
  var m=mc(correct,[r2(b*p/10),r2(b+p),r2(b/p),r2(correct*2)]);
  return Q('¿Cuánto es el '+p+'% de '+b+'?',m,
    'Porcentaje: multiplica la cantidad por p/100. '+b+' × '+p+'/100.',
    b+' × '+p+'/100 = '+(b*p)+'/100 = '+correct,
    'paes_n_porcentajes');
};

G['paes_n_por_02']=function(diff){
  var sets=diff==='easy'?[[10,200],[20,500],[25,400]]:diff==='medio'?[[15,600],[30,800],[35,1000]]:[[12,750],[17,900],[22,1200]];
  var d=pick(sets);var p=d[0],b=d[1];var correct=r2(b*(1+p/100));
  var m=mc(correct,[r2(b+p),r2(b*p/100),r2(b*(1-p/100)),r2(correct+p)]);
  return Q('Un precio de $'+b+' aumenta un '+p+'%. ¿Cuál es el nuevo precio?',m,
    'Precio nuevo = original × (1 + p/100) = '+b+' × '+r2(1+p/100)+'.',
    '$'+b+' × (1 + '+p+'/100) = $'+b+' × '+r2(1+p/100)+' = $'+correct,
    'paes_n_porcentajes');
};

G['paes_n_por_03']=function(diff){
  var sets=diff==='easy'?[[10,180],[20,400],[25,300]]:diff==='medio'?[[15,340],[30,560],[40,600]]:[[12,440],[17,830],[22,780]];
  var d=pick(sets);var p=d[0],b=d[1];var correct=r2(b*(1-p/100));
  var m=mc(correct,[r2(b-p),r2(b*p/100),r2(b*(1+p/100)),r2(correct+p)]);
  return Q('Un precio de $'+b+' tiene un descuento del '+p+'%. ¿Cuál es el precio final?',m,
    'Precio final = original × (1 − p/100) = '+b+' × '+r2(1-p/100)+'.',
    '$'+b+' × (1 − '+p+'/100) = $'+b+' × '+r2(1-p/100)+' = $'+correct,
    'paes_n_porcentajes');
};

G['paes_n_por_04']=function(diff){
  var sets=diff==='easy'?[[30,150],[40,200],[25,100]]:diff==='medio'?[[45,300],[60,400],[80,500]]:[[56,350],[84,480],[126,600]];
  var d=pick(sets);var parte=d[0],total=d[1];var correct=r1(parte/total*100)+'%';
  var m=mc(correct,[r1(total/parte*100)+'%',r1(parte*total/100)+'%',r1(parte/total*10)+'%',r1(parte/total*100+5)+'%']);
  return Q('¿Qué porcentaje de '+total+' es '+parte+'?',m,
    'Porcentaje = (parte / total) × 100.',
    '('+parte+'/'+total+') × 100 = '+r1(parte/total*100)+'%',
    'paes_n_porcentajes');
};

G['paes_n_por_05']=function(diff){
  var sets=diff==='easy'?[[20,160],[25,225],[10,270]]:diff==='medio'?[[15,340],[30,210],[35,520]]:[[12,352],[17,498],[22,390]];
  var d=pick(sets);var p=d[0],final_p=d[1];var orig=r0(final_p/(1-p/100));
  var m=mc('$'+orig,['$'+r0(final_p*(1+p/100)),'$'+r0(final_p+p),'$'+r0(final_p*(1-p/100)),'$'+(orig+p)]);
  return Q('Después de un descuento del '+p+'%, un artículo cuesta $'+final_p+'. ¿Cuál era el precio original?',m,
    'Final = original × (1 − p/100) → original = final ÷ (1 − p/100).',
    '$'+final_p+' ÷ (1 − '+p+'/100) = $'+final_p+' ÷ '+r2(1-p/100)+' = $'+orig,
    'paes_n_porcentajes');
};

G['paes_n_por_06']=function(diff){
  var sets=diff==='easy'?[[10,20,1000],[15,10,500]]:diff==='medio'?[[20,15,800],[25,10,600]]:[[12,18,900],[30,20,1200]];
  var d=pick(sets);var d1=d[0],d2=d[1],base=d[2];
  var p1=1-d1/100;var p2=1-d2/100;var correct=r0(base*p1*p2);
  var wrong1=r0(base*(1-(d1+d2)/100));
  var m=mc('$'+correct,['$'+wrong1,'$'+r0(base*d1/100),'$'+(correct+d1),'$'+r0(base*p2)]);
  return Q('Un producto de $'+base+' tiene descuentos sucesivos del '+d1+'% y luego '+d2+'%. ¿Cuál es el precio final?',m,
    'Aplica cada descuento por separado. NO se suman los %: es '+base+'×(1−'+d1+'/100)×(1−'+d2+'/100).',
    '$'+base+'×'+r2(p1)+'×'+r2(p2)+' = $'+r0(base*p1)+'×'+r2(p2)+' = $'+correct+' (≠ $'+wrong1+' por '+d1+'+'+d2+'%)',
    'paes_n_porcentajes');
};

G['paes_n_por_07']=function(diff){
  var sets=diff==='easy'?[[10,20,1000],[15,10,500]]:diff==='medio'?[[20,15,800],[25,10,600]]:[[12,18,900],[30,20,1200]];
  var d=pick(sets);var a1=d[0],a2=d[1],base=d[2];
  var p1=1+a1/100;var p2=1+a2/100;var correct=r0(base*p1*p2);
  var wrong1=r0(base*(1+(a1+a2)/100));
  var m=mc('$'+correct,['$'+wrong1,'$'+r0(base+a1+a2),'$'+(correct-a1),'$'+r0(base*p1)]);
  return Q('Un sueldo de $'+base+' tiene dos aumentos sucesivos: '+a1+'% y luego '+a2+'%. ¿Cuál es el sueldo final?',m,
    'Aplica cada aumento por separado: $'+base+'×(1+'+a1+'/100)×(1+'+a2+'/100).',
    '$'+base+'×'+r2(p1)+'×'+r2(p2)+' = $'+r0(base*p1)+'×'+r2(p2)+' = $'+correct,
    'paes_n_porcentajes');
};

G['paes_n_por_08']=function(diff){
  var sets=diff==='easy'?[[100,119],[200,238],[500,595]]:diff==='medio'?[[350,416.5],[480,571.2],[750,892.5]]:[[1234,1468.46],[975,1160.25],[843,1003.17]];
  var d=pick(sets);var neto=d[0],correct=r2(d[1]);
  var m=mc('$'+correct,['$'+r2(neto+19),'$'+r2(neto*0.19),'$'+r2(neto*1.9),'$'+r2(neto*2)]);
  return Q('El precio neto de un producto es $'+neto+'. ¿Cuál es el precio con IVA (19%)?',m,
    'Precio con IVA = precio neto × 1,19.',
    '$'+neto+' × 1,19 = $'+correct,
    'paes_n_porcentajes');
};

G['paes_n_por_09']=function(diff){
  var sets=diff==='easy'?[[100,120],[200,250],[500,600]]:diff==='medio'?[[300,345],[800,900],[600,690]]:[[1200,1380],[750,855],[960,1104]];
  var d=pick(sets);var viejo=d[0],nuevo=d[1];
  var correct=r1((nuevo-viejo)/viejo*100)+'%';
  var wrong1=r1((nuevo-viejo)/nuevo*100)+'%';var wrong2=r1(nuevo/viejo*100)+'%';
  var m=mc(correct,[wrong1,wrong2,r1((nuevo-viejo))+'%',r1(nuevo-viejo+5)+'%']);
  return Q('Un precio pasó de $'+viejo+' a $'+nuevo+'. ¿Cuál fue la variación porcentual?',m,
    'Variación % = ((nuevo − viejo) / viejo) × 100.',
    '(('+nuevo+' − '+viejo+') / '+viejo+') × 100 = ('+(nuevo-viejo)+'/'+viejo+') × 100 = '+correct,
    'paes_n_porcentajes');
};

G['paes_n_por_10']=function(diff){
  var sets=diff==='easy'?[[20,50,1000],[10,40,500]]:diff==='medio'?[[30,25,800],[15,60,600]]:[[12,40,750],[25,20,960]];
  var d=pick(sets);var p1=d[0],p2=d[1],base=d[2];
  var paso1=r0(base*p1/100);var correct=r0(paso1*p2/100);
  var wrong1=r0(base*(p1+p2)/100);var wrong2=r0(base*p1*p2/10000);
  var m=mc(correct,[wrong1,paso1,wrong2,correct+10]);
  return Q('¿Cuánto es el '+p2+'% del '+p1+'% de '+base+'?',m,
    'Primero calcula el '+p1+'% de '+base+' = '+paso1+'. Luego el '+p2+'% de ese resultado.',
    p1+'% de '+base+' = '+paso1+'. '+p2+'% de '+paso1+' = '+correct,
    'paes_n_porcentajes');
};

G['paes_n_por_11']=function(diff){
  var sets=diff==='easy'?[[20,10,500],[30,15,400]]:diff==='medio'?[[25,20,800],[15,30,600]]:[[20,25,1200],[30,20,900]];
  var d=pick(sets);var aum=d[0],desc=d[1],base=d[2];
  var paso1=r0(base*(1+aum/100));var correct=r0(paso1*(1-desc/100));
  var wrong1=r0(base*(1+(aum-desc)/100));var wrong2=r0(base*(1-desc/100));
  var m=mc('$'+correct,['$'+wrong1,'$'+paso1,'$'+wrong2,'$'+(correct+aum)]);
  return Q('Un precio de $'+base+' sube un '+aum+'% y luego baja un '+desc+'%. ¿Cuál es el precio final?',m,
    'Paso 1: $'+base+' × (1+'+aum+'/100) = $'+paso1+'. Paso 2: $'+paso1+' × (1−'+desc+'/100).',
    '$'+base+'×'+r2(1+aum/100)+' = $'+paso1+'. Luego $'+paso1+'×'+r2(1-desc/100)+' = $'+correct,
    'paes_n_porcentajes');
};

G['paes_n_por_12']=function(diff){
  var sets=diff==='easy'?[[120,30,'Matemática'],[80,25,'Ciencias']]:diff==='medio'?[[240,45,'votantes'],[360,60,'clientes']]:[[500,72,'socios'],[800,168,'usuarios']];
  var d=pick(sets);var total=d[0],cant=d[1],grupo=d[2];
  var correct=r1(cant/total*100)+'%';
  var wrong1=r1(total/cant*100)+'%';var wrong2=r1(cant*100)+'%';
  var m=mc(correct,[wrong1,wrong2,r1(cant/total*10)+'%',r1(cant/total*100-5)+'%']);
  return Q('En una clase de '+total+' '+grupo+', '+cant+' aprobaron. ¿Qué porcentaje aprobó?',m,
    'Porcentaje = (aprobados / total) × 100.',
    '('+cant+' / '+total+') × 100 = '+r1(cant/total*100)+'%',
    'paes_n_porcentajes');
};

/* ══════════════════════════════════════════════════════
   TEMARIO 5 — POTENCIAS
══════════════════════════════════════════════════════ */
T['paes_n_potencias']=['paes_n_pot_01','paes_n_pot_02','paes_n_pot_03','paes_n_pot_04',
  'paes_n_pot_05','paes_n_pot_06','paes_n_pot_07','paes_n_pot_08','paes_n_pot_09',
  'paes_n_pot_10','paes_n_pot_11','paes_n_pot_12'];

G['paes_n_pot_01']=function(diff){
  var sets=diff==='easy'?[[2,4,16],[3,3,27],[2,5,32],[4,2,16]]:diff==='medio'?[[2,8,256],[3,4,81],[5,3,125],[2,6,64]]:[[2,10,1024],[3,5,243],[7,3,343],[4,4,256]];
  var d=pick(sets);var b=d[0],e=d[1],correct=d[2];
  var m=mc(correct,[b*e,b+e,Math.pow(b,e-1),correct+b]);
  return Q('¿Cuánto es '+b+'^'+e+'?',m,
    b+'^'+e+' significa '+b+' multiplicado '+e+' veces: '+Array(e).fill(b).join('×')+'.',
    Array(e).fill(b).join('×')+' = '+correct,
    'paes_n_potencias');
};

G['paes_n_pot_02']=function(diff){
  var sets=diff==='easy'?[[-2,3],['-3','2'],['-1','4'],['-2','4']]:diff==='medio'?[['-3','3'],['-2','5'],[-4,2]]:[['-5','3'],['-2','7'],['-3','4']];
  var d=pick(sets);var b=parseInt(d[0]),e=parseInt(d[1]);var correct=Math.pow(b,e);
  var m=mc(correct,[-correct,Math.abs(correct),correct+b*2,correct-b]);
  return Q('¿Cuánto es ('+b+')^'+e+'?',m,
    e%2===0?'Base negativa con exponente par → resultado positivo.':'Base negativa con exponente impar → resultado negativo.',
    '('+b+')^'+e+(e%2===0?' = positivo: ':'= negativo: ')+' = '+correct,
    'paes_n_potencias');
};

G['paes_n_pot_03']=function(diff){
  var sets=diff==='easy'?[[2,3,4,7],[3,2,3,5],[5,2,4,6]]:diff==='medio'?[[2,5,4,9],[3,3,4,7],[7,2,3,5]]:[[2,7,5,12],[3,4,6,10],[11,2,3,5]];
  var d=pick(sets);var b=d[0],e1=d[1],e2=d[2],sum=d[3];
  var correct=b+'^'+sum;var wrong1=b+'^'+(e1*e2);var wrong2=(b*b)+'^'+(e1+e2);var wrong3=b+'^'+(sum-1);
  var m=mc(correct,[wrong1,wrong2,wrong3,b+'^'+(sum+1)]);
  return Q('Simplifica: '+b+'^'+e1+' × '+b+'^'+e2+' = ?',m,
    'Producto de potencias misma base: a^m × a^n = a^(m+n). Se SUMAN los exponentes.',
    b+'^'+e1+' × '+b+'^'+e2+' = '+b+'^('+e1+'+'+e2+') = '+b+'^'+sum+' = '+correct,
    'paes_n_potencias');
};

G['paes_n_pot_04']=function(diff){
  var sets=diff==='easy'?[[2,6,2,4],[3,5,2,3],[5,4,2,2]]:diff==='medio'?[[2,8,3,5],[3,7,4,3],[7,5,2,3]]:[[2,10,4,6],[3,8,5,3],[11,4,2,2]];
  var d=pick(sets);var b=d[0],e1=d[1],e2=d[2],dif=d[3];
  var correct=b+'^'+dif;var wrong1=b+'^'+(e1*e2);var wrong2='1';var wrong3=b+'^'+(dif+1);
  var m=mc(correct,[wrong1,wrong2,wrong3,b+'^'+(dif-1)]);
  return Q('Simplifica: '+b+'^'+e1+' ÷ '+b+'^'+e2+' = ?',m,
    'Cociente de potencias misma base: a^m ÷ a^n = a^(m-n). Se RESTAN los exponentes.',
    b+'^'+e1+' ÷ '+b+'^'+e2+' = '+b+'^('+e1+'−'+e2+') = '+b+'^'+dif,
    'paes_n_potencias');
};

G['paes_n_pot_05']=function(diff){
  var sets=diff==='easy'?[[2,3,2,6],[3,2,3,6],[2,4,2,8]]:diff==='medio'?[[2,3,4,12],[3,2,5,10],[5,2,3,6]]:[[2,4,5,20],[3,3,4,12],[7,2,3,6]];
  var d=pick(sets);var b=d[0],e1=d[1],e2=d[2],prod=d[3];
  var correct=b+'^'+prod;var wrong1=b+'^'+(e1+e2);var wrong2=(b*e1)+'^'+e2;var wrong3=b+'^'+(prod+e1);
  var m=mc(correct,[wrong1,wrong2,wrong3,b+'^'+(prod-1)]);
  return Q('Simplifica: ('+b+'^'+e1+')^'+e2+' = ?',m,
    'Potencia de potencia: (a^m)^n = a^(m×n). Se MULTIPLICAN los exponentes.',
    '('+b+'^'+e1+')^'+e2+' = '+b+'^('+e1+'×'+e2+') = '+b+'^'+prod,
    'paes_n_potencias');
};

G['paes_n_pot_06']=function(diff){
  var bases=diff==='easy'?[2,3,5,7]:diff==='medio'?[11,13,17,19]:[23,29,31,37];
  var b=pick(bases);var correct='1';
  var m=mc(correct,['0',String(b),String(b*b),'No está definido']);
  return Q('¿Cuánto es '+b+'^0?',m,
    'Cualquier número distinto de cero elevado al exponente 0 es igual a 1.',
    b+'^0 = 1 (regla fundamental: a^0 = 1 para todo a ≠ 0)',
    'paes_n_potencias');
};

G['paes_n_pot_07']=function(diff){
  var sets=diff==='easy'?[[2,1,'1/2'],[2,2,'1/4'],[3,1,'1/3']]:diff==='medio'?[[2,3,'1/8'],[3,2,'1/9'],[5,2,'1/25']]:[[2,4,'1/16'],[3,3,'1/27'],[10,3,'1/1000']];
  var d=pick(sets);var b=d[0],e=d[1],correct=d[2];
  var m=mc(correct,[String(-b*e),String(b*e),String(-(b*e)),'0']);
  return Q('¿Cuánto es '+b+'^(−'+e+')?',m,
    'Exponente negativo: a^(−n) = 1/a^n.',
    b+'^(−'+e+') = 1/'+b+'^'+e+' = 1/'+(Math.pow(b,e))+' = '+correct,
    'paes_n_potencias');
};

G['paes_n_pot_08']=function(diff){
  var sets=diff==='easy'?[[4,'1/2',2],[9,'1/2',3],[25,'1/2',5]]:diff==='medio'?[[8,'1/3',2],[27,'1/3',3],[64,'1/3',4]]:[[16,'1/4',2],[81,'1/4',3],[32,'1/5',2]];
  var d=pick(sets);var b=d[0],exp=d[1],correct=d[2];
  var m=mc(correct,[r2(b/2),r2(b*0.5),correct+1,correct-1]);
  return Q('¿Cuánto es '+b+'^('+exp+')?',m,
    'Exponente fraccionario: a^(1/n) = ⁿ√a (raíz n-ésima de a).',
    b+'^('+exp+') = √['+exp.split('/')[1]+']'+b+' = '+correct,
    'paes_n_potencias');
};

G['paes_n_pot_09']=function(diff){
  var sets=diff==='easy'?[[2,4,3,3],[2,5,3,2],[3,3,2,4]]:diff==='medio'?[[2,8,3,5],[2,10,4,3],[5,4,3,4]]:[[2,12,3,8],[7,3,2,9],[5,6,2,10]];
  var d=pick(sets);var b1=d[0],e1=d[1],b2=d[2],e2=d[3];
  var v1=Math.pow(b1,e1),v2=Math.pow(b2,e2);
  var rel=v1>v2?'>':v1<v2?'<':'=';
  var correct=b1+'^'+e1+' '+rel+' '+b2+'^'+e2;
  var wrong=b1+'^'+e1+' '+(rel==='>'?'<':rel==='<'?'>':'≠')+' '+b2+'^'+e2;
  var m=mc(correct,[wrong,b1+'^'+e1+' = '+b2+'^'+e2,'No se puede comparar',b1+'^'+e1+' ≠ '+b2+'^'+e2]);
  return Q('¿Cuál afirmación es correcta?',m,
    'Calcula: '+b1+'^'+e1+' = '+v1+' y '+b2+'^'+e2+' = '+v2+'. Luego compara.',
    b1+'^'+e1+' = '+v1+' y '+b2+'^'+e2+' = '+v2+' → '+correct,
    'paes_n_potencias');
};

G['paes_n_pot_10']=function(diff){
  var sets=diff==='easy'?[[2,3,5,5,8],[3,2,4,4,6]]:diff==='medio'?[[2,4,5,8,12],[3,3,5,5,8]]:[[2,6,4,8,10],[5,3,6,6,9]];
  var d=pick(sets);var b=d[0],e1=d[1],e2=d[2],e3=d[3],ef=d[4];
  var correct=b+'^'+ef;
  var wrong1=b+'^'+(e1+e2+e3);var wrong2=b+'^'+(e1*e2-e3);var wrong3=b+'^'+(ef-1);
  var m=mc(correct,[wrong1,wrong2,wrong3,(b+1)+'^'+ef]);
  return Q('Simplifica: '+b+'^'+e1+' × '+b+'^'+e2+' ÷ '+b+'^'+e3,m,
    'Aplica las leyes: producto suma exponentes, cociente resta. Resultado: '+b+'^('+e1+'+'+e2+'−'+e3+').',
    b+'^('+e1+'+'+e2+'−'+e3+') = '+b+'^'+(e1+e2-e3)+' = '+correct,
    'paes_n_potencias');
};

G['paes_n_pot_11']=function(diff){
  var sets=diff==='easy'?[[2,8,3],[2,16,4],[3,27,3]]:diff==='medio'?[[2,32,5],[2,64,6],[3,81,4]]:[[2,128,7],[3,243,5],[5,125,3]];
  var d=pick(sets);var b=d[0],val=d[1],correct=d[2];
  var m=mc('x = '+correct,['x = '+( correct+1),'x = '+(correct-1),'x = '+(correct*2),'x = '+(correct+2)]);
  return Q('Si '+b+'^x = '+val+', ¿cuánto vale x?',m,
    'Escribe '+val+' como potencia de '+b+': '+b+'^? = '+val+'.',
    b+'^'+correct+' = '+val+' → x = '+correct,
    'paes_n_potencias');
};

G['paes_n_pot_12']=function(diff){
  var sets=diff==='easy'?[[2,16,4,'una inversión se cuadruplica']]:diff==='medio'?[[3,81,4,'un virus se triplica']]:[[2,1024,10,'una bacteria se duplica']];
  var d=pick(sets);var b=d[0],val=d[1],exp=d[2],ctx=d[3];
  var correct=exp+' períodos';
  var m=mc(correct,[(exp+1)+' períodos',(exp-1)+' períodos',(exp+2)+' períodos',val+' períodos']);
  return Q('Si '+ctx+' cada período, ¿cuántos períodos se necesitan para ir de 1 a '+val+'?',m,
    val+' = '+b+'^x. Calcula cuántas veces multiplicas '+b+' por sí mismo para obtener '+val+'.',
    b+'^'+exp+' = '+val+' → Se necesitan '+correct,
    'paes_n_potencias');
};

/* ══════════════════════════════════════════════════════
   TEMARIO 6 — RAÍCES Y RADICALES
══════════════════════════════════════════════════════ */
T['paes_n_raices']=['paes_n_rai_01','paes_n_rai_02','paes_n_rai_03','paes_n_rai_04',
  'paes_n_rai_05','paes_n_rai_06','paes_n_rai_07','paes_n_rai_08','paes_n_rai_09',
  'paes_n_rai_10','paes_n_rai_11','paes_n_rai_12'];

G['paes_n_rai_01']=function(diff){
  var sets=diff==='easy'?[[9,3],[16,4],[25,5],[36,6],[49,7]]:diff==='medio'?[[64,8],[81,9],[100,10],[121,11],[144,12]]:[[169,13],[196,14],[225,15],[256,16],[289,17]];
  var d=pick(sets);var v=d[0],correct=d[1];
  var m=mc(correct,[correct+1,correct-1,v/2,correct*2]);
  return Q('¿Cuánto es √'+v+'?',m,
    '√a es el número positivo cuyo cuadrado es a.',
    '√'+v+' = '+correct+' porque '+correct+'² = '+(correct*correct)+' = '+v,
    'paes_n_raices');
};

G['paes_n_rai_02']=function(diff){
  var sets=diff==='easy'?[[8,2],[27,3],[1,1]]:diff==='medio'?[[64,4],[125,5],[216,6]]:[[343,7],[512,8],[729,9]];
  var d=pick(sets);var v=d[0],correct=d[1];
  var m=mc(correct,[correct+1,correct-1,r2(Math.pow(v,0.5)),r2(v/3)]);
  return Q('¿Cuánto es ∛'+v+' (raíz cúbica de '+v+')?',m,
    '∛a es el número cuyo cubo es a: x³ = '+v+'.',
    '∛'+v+' = '+correct+' porque '+correct+'³ = '+(correct*correct*correct)+' = '+v,
    'paes_n_raices');
};

G['paes_n_rai_03']=function(diff){
  var sets=diff==='easy'?[[12,'2√3'],[18,'3√2'],[20,'2√5']]:diff==='medio'?[[24,'2√6'],[50,'5√2'],[45,'3√5']]:[[72,'6√2'],[75,'5√3'],[98,'7√2']];
  var d=pick(sets);var v=d[0],correct=d[1];
  var m=mc(correct,['√'+v,'2√'+(v/4|0),'3√'+(v/9|0),'4√'+(v/16|0)]);
  return Q('Simplifica √'+v,m,
    'Busca el mayor cuadrado perfecto que divide a '+v+'. Escribe: √(cuadrado × resto) = √cuadrado × √resto.',
    '√'+v+' = √('+Math.pow(parseInt(correct.split('√')[0]),2)+'×'+v/Math.pow(parseInt(correct.split('√')[0]),2)+') = '+parseInt(correct.split('√')[0])+'×√'+v/Math.pow(parseInt(correct.split('√')[0]),2)+' = '+correct,
    'paes_n_raices');
};

G['paes_n_rai_04']=function(diff){
  var sets=diff==='easy'?[[3,2,5,2,'5√2'],[2,3,4,3,'6√3'],[1,5,3,5,'4√5']]:diff==='medio'?[[5,7,3,7,'8√7'],[4,2,7,2,'11√2'],[6,3,2,3,'8√3']]:[[9,6,4,6,'13√6'],[7,5,5,5,'12√5'],[8,11,3,11,'11√11']];
  var d=pick(sets);var a=d[0],r=d[1],b=d[2];var correct=d[4];
  var m=mc(correct,[(a+b)+'√'+(r*r),(a*b)+'√'+r,String(a+b),'√'+(r*(a+b))]);
  return Q('Simplifica: '+a+'√'+r+' + '+b+'√'+r,m,
    'Raíces semejantes (mismo radicando): suma los coeficientes y conserva la raíz.',
    a+'√'+r+' + '+b+'√'+r+' = ('+a+'+'+b+')√'+r+' = '+(a+b)+'√'+r,
    'paes_n_raices');
};

G['paes_n_rai_05']=function(diff){
  var sets=diff==='easy'?[[6,6,6],[2,8,4],[3,12,6]]:diff==='medio'?[[5,20,10],[7,7,7],[3,27,9]]:[[6,24,12],[5,45,15],[8,18,12]];
  var d=pick(sets);var a=d[0],b=d[1],correct=d[2];
  var m=mc(correct,[correct*2,correct+a,r2(Math.sqrt(a*b)),correct-1]);
  return Q('Simplifica: √'+a+' × √'+b,m,
    '√a × √b = √(a×b). Luego simplifica si es posible.',
    '√'+a+' × √'+b+' = √'+(a*b)+(correct*correct===a*b?' = '+correct:' = '+correct+' (√'+a*b+' = '+correct+')'),
    'paes_n_raices');
};

G['paes_n_rai_06']=function(diff){
  var sets=diff==='easy'?[[8,2,2],[12,3,2],[18,2,3]]:diff==='medio'?[[45,5,3],[50,2,5],[75,3,5]]:[[72,2,6],[48,3,4],[108,3,6]];
  var d=pick(sets);var a=d[0],b=d[1],correct=d[2];
  var m=mc('√'+correct,[String(correct),String(a/b),String(r2(Math.sqrt(a/b))),'√'+(correct+1)]);
  return Q('Simplifica: √'+a+' ÷ √'+b,m,
    '√a ÷ √b = √(a÷b).',
    '√'+a+' ÷ √'+b+' = √('+a+'/'+b+') = √'+correct,
    'paes_n_raices');
};

G['paes_n_rai_07']=function(diff){
  var sets=diff==='easy'?[[1,4,'1/2'],[9,16,'3/4'],[4,25,'2/5']]:diff==='medio'?[[1,9,'1/3'],[4,9,'2/3'],[9,25,'3/5']]:[[16,25,'4/5'],[25,49,'5/7'],[1,16,'1/4']];
  var d=pick(sets);var a=d[0],b=d[1],correct=d[2];
  var m=mc(correct,['√'+a+'/'+b,r2(Math.sqrt(a/b)).toString(),String(a/b),r2(a/b)+'']);
  return Q('¿Cuánto es √('+a+'/'+b+')?',m,
    '√(a/b) = √a / √b.',
    '√('+a+'/'+b+') = √'+a+'/√'+b+' = '+Math.sqrt(a)+'/'+Math.sqrt(b)+' = '+correct,
    'paes_n_raices');
};

G['paes_n_rai_08']=function(diff){
  var sets=diff==='easy'?[[2,'√2/2'],[3,'√3/3'],[5,'√5/5']]:diff==='medio'?[[6,'√6/6'],[7,'√7/7'],[10,'√10/10']]:[[11,'√11/11'],[13,'√13/13'],[15,'√15/15']];
  var d=pick(sets);var r=d[0],correct=d[1];
  var m=mc(correct,['1/'+r,'√'+r,r+'/√'+r,'√'+(r*r)+'/'+r]);
  return Q('Racionaliza: 1/√'+r,m,
    'Multiplica numerador y denominador por √'+r+': 1/√'+r+' × √'+r+'/√'+r+' = √'+r+'/'+r+'.',
    '1/√'+r+' × √'+r+'/√'+r+' = √'+r+'/'+r+' = '+correct,
    'paes_n_raices');
};

G['paes_n_rai_09']=function(diff){
  var sets=diff==='easy'?[[5,2,3],[10,3,4],[17,4,5]]:diff==='medio'?[[23,4,5],[37,6,7],[50,7,8]]:[[101,10,11],[122,11,12],[170,13,14]];
  var d=pick(sets);var v=d[0],lo=d[1],hi=d[2];var correct=lo+' < √'+v+' < '+hi;
  var m=mc(correct,[hi+' < √'+v+' < '+(hi+1),String(r2(Math.sqrt(v))),lo+' = √'+v,String(lo)]);
  return Q('¿Entre qué enteros consecutivos se encuentra √'+v+'?',m,
    lo+'² = '+lo*lo+' < '+v+' < '+hi*hi+' = '+hi+'². Entonces: '+lo+' < √'+v+' < '+hi+'.',
    lo+'² = '+lo*lo+' y '+hi+'² = '+hi*hi+'. Como '+lo*lo+' < '+v+' < '+hi*hi+', se tiene: '+correct,
    'paes_n_raices');
};

G['paes_n_rai_10']=function(diff){
  var sets=diff==='easy'?[[4,2],[9,3],[16,4],[25,5]]:diff==='medio'?[[36,6],[49,7],[64,8],[81,9]]:[[100,10],[121,11],[144,12],[169,13]];
  var d=pick(sets);var correct=d[0];var k=d[1];
  var m=mc('x = '+correct,['x = '+(correct+1),'x = '+(correct-1),'x = '+(correct*2),'x = '+k]);
  return Q('Si √x = '+k+', ¿cuánto es x?',m,
    'Si √x = k, entonces x = k².',
    '√x = '+k+' → x = '+k+'² = '+(k*k)+' = '+correct,
    'paes_n_raices');
};

G['paes_n_rai_11']=function(diff){
  var sets=diff==='easy'?[[-4,4],[-9,9],[-16,16]]:diff==='medio'?[[-25,25],[-36,36],[-49,49]]:[['-a²','a (si a ≥ 0)'],['-x²','|x|']];
  var d=pick(diff==='experto'?sets.slice(2):sets.slice(0,2));
  var v=parseInt(d[0])||0;var correct=String(Math.abs(v));
  var m=mc(correct,[String(v),'-'+Math.abs(v),'No existe','0']);
  return Q('¿Cuánto es √('+d[0]+'²)?',m,
    '√(a²) = |a|, el valor absoluto de a.',
    '√('+d[0]+'²) = |'+d[0]+'| = '+correct,
    'paes_n_raices');
};

G['paes_n_rai_12']=function(diff){
  var sets=diff==='easy'?[[36,6],[64,8],[100,10]]:diff==='medio'?[[121,11],[144,12],[169,13]]:[[225,15],[256,16],[289,17]];
  var d=pick(sets);var area=d[0],lado=d[1];
  var m=mc(lado+' m',[(lado+1)+' m',(lado-1)+' m',(area/4)+' m',(r2(area/lado))+' m']);
  return Q('El área de un cuadrado es '+area+' m². ¿Cuánto mide su lado?',m,
    'Área = lado² → lado = √Área.',
    'lado = √'+area+' = '+lado+' m',
    'paes_n_raices');
};

console.log('[MM] generators-paes-numeros.js: 72 generadores cargados (6 temarios × 12 cada uno).');
})();
