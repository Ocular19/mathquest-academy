(function(){ 'use strict';
/* ===================================================
   GENERATORS PAES GEOMETRÍA — Etapa 3
   Topics: Geometría Básica, Trigonometría, Áreas,
           Volúmenes, Geometría Analítica, Semejanza
   72 generators (12 per topic)
=================================================== */

function pick(a){return a[Math.floor(Math.random()*a.length)];}
function ri(lo,hi){return lo+Math.floor(Math.random()*(hi-lo+1));}
function r2(x){return Math.round(x*100)/100;}
function r1(x){return Math.round(x*10)/10;}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a||1;}
var PI=Math.PI;
function mc(correct,wrongs){
  var pool=[correct].concat(wrongs.slice(0,4));
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  return{options:pool,correctIndex:pool.indexOf(correct),answer:correct};
}
function Q(q,m,hint,exp,topic){
  return{question:q,options:m.options,answer:m.answer,correctIndex:m.correctIndex,
    hint:hint,explanation:exp,topic:topic,type:'opcion_multiple',eje:'Geometría'};
}
var PYTH=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]];
function pt(){return pick(PYTH);}

/* ════════════════════════════════════════════════════════
   1. GEOMETRÍA BÁSICA  paes_g_bas_01 … paes_g_bas_12
════════════════════════════════════════════════════════ */

MM_GENERATORS['paes_g_bas_01']=function(){
  var a=ri(15,75),b=90-a;
  var q='Dos ángulos complementarios. Uno mide \\('+a+'°\\). El otro mide:';
  return Q(q,mc(b+'°',[b+10+'°',b-10+'°',180-a+'°',a+'°']),
    'Complementarios suman 90°.','\\(90°-'+a+'°='+b+'°\\)','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_02']=function(){
  var a=ri(20,160),b=180-a;
  var q='Dos ángulos suplementarios. Uno mide \\('+a+'°\\). El otro mide:';
  return Q(q,mc(b+'°',[b+20+'°',90-a+'°',a+'°',360-a+'°']),
    'Suplementarios suman 180°.','\\(180°-'+a+'°='+b+'°\\)','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_03']=function(){
  var a=ri(35,75),b=ri(25,70);while(a+b>=170)b=ri(20,50);
  var c=180-a-b;
  var q='Un triángulo tiene ángulos de \\('+a+'°\\) y \\('+b+'°\\). El tercer ángulo mide:';
  return Q(q,mc(c+'°',[c+10+'°',c-10+'°',360-a-b+'°',90+'°']),
    'Los ángulos internos suman 180°.','\\(180°-'+a+'°-'+b+'°='+c+'°\\)','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_04']=function(){
  var a=ri(30,70),b=ri(30,70);while(a+b>=175)b=ri(20,50);
  var ext=a+b;
  var q='Un ángulo exterior de un triángulo es igual a la suma de los dos ángulos interiores no adyacentes: \\('+a+'°\\) y \\('+b+'°\\). El ángulo exterior mide:';
  return Q(q,mc(ext+'°',[ext+10+'°',ext-10+'°',180-a+'°',a+'°']),
    'Ángulo exterior = suma de los dos interiores no adyacentes.',
    '\\('+a+'°+'+b+'°='+ext+'°\\)','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_05']=function(){
  var q='¿Cuánto mide cada ángulo interior de un triángulo equilátero?';
  return Q(q,mc('60°',['45°','72°','90°','120°']),
    'Tres ángulos iguales que suman 180°.','\\(180°\\div 3=60°\\)','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_06']=function(){
  var a=ri(75,105),b=ri(75,105),c=ri(70,100);
  var d=360-a-b-c;while(d<=10||d>=350){a=ri(80,100);b=ri(80,100);c=ri(80,100);d=360-a-b-c;}
  var q='En un cuadrilátero los ángulos miden \\('+a+'°\\), \\('+b+'°\\), \\('+c+'°\\). El cuarto ángulo:';
  return Q(q,mc(d+'°',[d+20+'°',d-20+'°',180-a+'°','90°']),
    'Suma de ángulos de un cuadrilátero = 360°.',
    '\\(360°-'+a+'°-'+b+'°-'+c+'°='+d+'°\\)','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_07']=function(){
  var n=pick([5,6,7,8,10]);
  var s=(n-2)*180,ai=s/n;
  var q='La suma de los ángulos interiores de un polígono de \\('+n+'\\) lados es:';
  return Q(q,mc(s+'°',[s+180+'°',s-180+'°',n*180+'°',(n-1)*180+'°']),
    'Fórmula: \\((n-2)\\times180°\\)','\\(('+n+'-2)\\times180°='+s+'°\\). Ángulo interior: \\('+r1(ai)+'°\\)','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_08']=function(){
  var a=ri(40,140);
  var tipo=pick(['alternos internos','correspondientes']);
  var q='Dos rectas paralelas cortadas por una transversal. Un ángulo mide \\('+a+'°\\). El ángulo '+tipo+' mide:';
  return Q(q,mc(a+'°',[180-a+'°',90+'°',a+10+'°',a-10+'°']),
    'Ángulos '+tipo+' son iguales cuando las rectas son paralelas.',
    'Ángulos '+tipo+' son congruentes: \\('+a+'°\\)','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_09']=function(){
  var t=pt(),a=t[0],b=t[1],c=t[2];
  var q='Triángulo rectángulo con catetos \\('+a+'\\) y \\('+b+'\\). La hipotenusa es:';
  return Q(q,mc(String(c),[c+1+'',c-1+'',c+2+'',a+b+''].map(String)),
    '\\(c=\\sqrt{a^2+b^2}\\)','\\(c=\\sqrt{'+a+'^2+'+b+'^2}=\\sqrt{'+(a*a+b*b)+'}='+c+'\\)','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_10']=function(){
  var t=pt(),a=t[0],b=t[1],c=t[2];
  var q='Triángulo rectángulo con hipotenusa \\('+c+'\\) y cateto \\('+b+'\\). El otro cateto:';
  return Q(q,mc(String(a),[String(a+1),String(a-1),String(c-b),String(b-a)]),
    '\\(a=\\sqrt{c^2-b^2}\\)','\\(a=\\sqrt{'+c+'^2-'+b+'^2}=\\sqrt{'+(c*c-b*b)+'}='+a+'\\)','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_11']=function(){
  var a=ri(3,9),b=ri(3,9),c=ri(3,9);
  while(a+b<=c||a+c<=b||b+c<=a)c=ri(3,9);
  var p=a+b+c;
  var q='Triángulo con lados \\('+a+'\\), \\('+b+'\\) y \\('+c+'\\) cm. Perímetro:';
  return Q(q,mc(p+' cm',[p+3+' cm',p-2+' cm',p+b+' cm',a*b+' cm']),
    'Suma los tres lados.','\\(P='+a+'+'+b+'+'+c+'='+p+'\\) cm','Geometría Básica');
};

MM_GENERATORS['paes_g_bas_12']=function(){
  var n=pick([4,5,6,8]),l=ri(3,10),p=n*l;
  var q='Polígono regular de \\('+n+'\\) lados, cada uno de \\('+l+'\\) cm. Perímetro:';
  return Q(q,mc(p+' cm',[p+l+' cm',p-l+' cm',(n+1)*l+' cm',(n-1)*l+' cm']),
    '\\(P=n\\times l\\)','\\(P='+n+'\\times'+l+'='+p+'\\) cm','Geometría Básica');
};

/* ════════════════════════════════════════════════════════
   2. TRIGONOMETRÍA  paes_g_tri_01 … paes_g_tri_12
════════════════════════════════════════════════════════ */

MM_GENERATORS['paes_g_tri_01']=function(){
  var t=pt(),op=t[0],adj=t[1],hip=t[2];
  var q='Triángulo rectángulo: cateto opuesto \\('+op+'\\), hipotenusa \\('+hip+'\\). \\(\\sin\\theta=\\)';
  var cor=r2(op/hip);
  return Q(q,mc(String(cor),[r2(adj/hip)+'',r2(op/adj)+'',r2(adj/op)+'',(r2(op/hip)+0.1+'')]),'\\(\\sin=\\text{op}/\\text{hip}\\)',
    '\\(\\sin\\theta='+op+'/'+hip+'='+cor+'\\)','Trigonometría');
};

MM_GENERATORS['paes_g_tri_02']=function(){
  var t=pt(),op=t[0],adj=t[1],hip=t[2];
  var q='Triángulo rectángulo: cateto adyacente \\('+adj+'\\), hipotenusa \\('+hip+'\\). \\(\\cos\\theta=\\)';
  var cor=r2(adj/hip);
  return Q(q,mc(String(cor),[r2(op/hip)+'',r2(adj/op)+'',r2(op/adj)+'',(r2(adj/hip)+0.1+'')]),'\\(\\cos=\\text{adj}/\\text{hip}\\)',
    '\\(\\cos\\theta='+adj+'/'+hip+'='+cor+'\\)','Trigonometría');
};

MM_GENERATORS['paes_g_tri_03']=function(){
  var t=pt(),op=t[0],adj=t[1];
  var q='Triángulo rectángulo: cateto opuesto \\('+op+'\\), adyacente \\('+adj+'\\). \\(\\tan\\theta=\\)';
  var cor=r2(op/adj);
  return Q(q,mc(String(cor),[r2(adj/op)+'',r2(op/(op+adj))+'',(cor+1)+'',r2(adj/(op+adj))+'']),
    '\\(\\tan=\\text{op}/\\text{adj}\\)','\\(\\tan\\theta='+op+'/'+adj+'='+cor+'\\)','Trigonometría');
};

MM_GENERATORS['paes_g_tri_04']=function(){
  var data=[
    {ang:30,val:'\\(\\dfrac{1}{2}\\)',fn:'\\(\\sin\\)',w:['\\(\\dfrac{\\sqrt{3}}{2}\\)','\\(\\dfrac{\\sqrt{2}}{2}\\)','\\(\\dfrac{\\sqrt{3}}{3}\\)']},
    {ang:45,val:'\\(\\dfrac{\\sqrt{2}}{2}\\)',fn:'\\(\\sin\\)',w:['\\(\\dfrac{1}{2}\\)','\\(\\dfrac{\\sqrt{3}}{2}\\)','1']},
    {ang:60,val:'\\(\\dfrac{\\sqrt{3}}{2}\\)',fn:'\\(\\sin\\)',w:['\\(\\dfrac{1}{2}\\)','\\(\\dfrac{\\sqrt{2}}{2}\\)','\\(\\dfrac{\\sqrt{3}}{3}\\)']},
  ];
  var d=pick(data);
  var q='¿Cuánto vale '+d.fn+'('+d.ang+'°)?';
  return Q(q,mc(d.val,d.w),'Memoriza la tabla de ángulos notables.',
    d.fn+'('+d.ang+'°)='+d.val,'Trigonometría');
};

MM_GENERATORS['paes_g_tri_05']=function(){
  var data=[
    {ang:30,val:'\\(\\dfrac{\\sqrt{3}}{2}\\)',fn:'\\(\\cos\\)',w:['\\(\\dfrac{1}{2}\\)','\\(\\dfrac{\\sqrt{2}}{2}\\)','\\(\\dfrac{\\sqrt{3}}{3}\\)']},
    {ang:45,val:'\\(\\dfrac{\\sqrt{2}}{2}\\)',fn:'\\(\\cos\\)',w:['\\(1\\)','\\(\\dfrac{1}{2}\\)','\\(\\dfrac{\\sqrt{3}}{2}\\)']},
    {ang:60,val:'\\(\\dfrac{1}{2}\\)',fn:'\\(\\cos\\)',w:['\\(\\dfrac{\\sqrt{3}}{2}\\)','\\(\\dfrac{\\sqrt{2}}{2}\\)','0']},
  ];
  var d=pick(data);
  var q='¿Cuánto vale '+d.fn+'('+d.ang+'°)?';
  return Q(q,mc(d.val,d.w),'Memoriza la tabla de ángulos notables.',
    d.fn+'('+d.ang+'°)='+d.val,'Trigonometría');
};

MM_GENERATORS['paes_g_tri_06']=function(){
  var data=[
    {ang:30,val:'\\(\\dfrac{\\sqrt{3}}{3}\\)',fn:'\\(\\tan\\)',w:['\\(1\\)','\\(\\sqrt{3}\\)','\\(\\dfrac{1}{2}\\)']},
    {ang:45,val:'\\(1\\)',fn:'\\(\\tan\\)',w:['\\(\\dfrac{\\sqrt{2}}{2}\\)','\\(\\sqrt{3}\\)','\\(\\dfrac{1}{2}\\)']},
    {ang:60,val:'\\(\\sqrt{3}\\)',fn:'\\(\\tan\\)',w:['\\(1\\)','\\(\\dfrac{\\sqrt{3}}{3}\\)','\\(2\\)']},
  ];
  var d=pick(data);
  var q='¿Cuánto vale '+d.fn+'('+d.ang+'°)?';
  return Q(q,mc(d.val,d.w),'\\(\\tan\\theta=\\sin\\theta/\\cos\\theta\\)',
    d.fn+'('+d.ang+'°)='+d.val,'Trigonometría');
};

MM_GENERATORS['paes_g_tri_07']=function(){
  var q='Si \\(\\sin\\theta=0{,}6\\), ¿cuánto vale \\(\\cos\\theta\\)? (primer cuadrante)';
  // sin²+cos²=1 => cos=0.8
  var cor='0,8';
  return Q(q,mc(cor,['0,4','0,36','0,64','1,6']),
    '\\(\\sin^2\\theta+\\cos^2\\theta=1\\)',
    '\\(\\cos^2\\theta=1-0{,}36=0{,}64\\Rightarrow\\cos\\theta=0{,}8\\)','Trigonometría');
};

MM_GENERATORS['paes_g_tri_08']=function(){
  var t=pt(),adj=t[1],hip=t[2];
  // cos(θ)=adj/hip => side = hip*cos(θ); here find side given angle 30/45/60
  var ang=pick([30,45,60]);
  var cosV=ang===30?Math.sqrt(3)/2:ang===45?Math.sqrt(2)/2:0.5;
  var hipV=ri(4,12)*2;
  var adjV=r1(hipV*cosV);
  var q='En un triángulo rectángulo con \\(\\theta='+ang+'°\\) e hipotenusa \\('+hipV+'\\), el cateto adyacente mide:';
  var cor=String(adjV);
  return Q(q,mc(cor,[String(r1(hipV*Math.sin(ang*PI/180))),String(adjV+1),String(adjV-1),String(hipV*2)]),
    '\\(\\text{adj}=\\text{hip}\\times\\cos\\theta\\)',
    '\\(\\text{adj}='+hipV+'\\times\\cos('+ang+'°)='+hipV+'\\times'+r2(cosV)+'='+adjV+'\\)','Trigonometría');
};

MM_GENERATORS['paes_g_tri_09']=function(){
  var dist=ri(3,20),ang=pick([30,45,60]);
  var tanV=ang===30?1/Math.sqrt(3):ang===45?1:Math.sqrt(3);
  var alt=r1(dist*tanV);
  var q='Un observador está a \\('+dist+'\\) m de la base de un árbol. El ángulo de elevación es \\('+ang+'°\\). ¿Cuál es la altura del árbol?';
  var cor=alt+' m';
  return Q(q,mc(cor,[r1(dist/tanV)+' m',r1(dist*Math.sin(ang*PI/180))+' m',r1(dist/Math.cos(ang*PI/180))+' m',dist+' m']),
    '\\(h=d\\times\\tan\\theta\\)','\\(h='+dist+'\\times\\tan('+ang+'°)='+dist+'\\times'+r2(tanV)+'='+alt+'\\) m','Trigonometría');
};

MM_GENERATORS['paes_g_tri_10']=function(){
  // 30-60-90: sides k, k√3, 2k
  var k=ri(2,8);
  var q='En un triángulo 30-60-90°, el cateto menor mide \\('+k+'\\). La hipotenusa mide:';
  var hip=2*k;
  return Q(q,mc(String(hip),[String(hip+k),String(hip-k),String(k),'\\('+k+'\\sqrt{3}\\)']),
    'En el triángulo 30-60-90°: hipotenusa = 2 × cateto menor.',
    'Lados en proporción \\(1:\\sqrt{3}:2\\). Hipotenusa=\\(2\\times '+k+'='+hip+'\\)','Trigonometría');
};

MM_GENERATORS['paes_g_tri_11']=function(){
  // 45-45-90: sides k, k, k√2
  var k=ri(2,8);
  var q='En un triángulo isósceles rectángulo (45-45-90°), cada cateto mide \\('+k+'\\). La hipotenusa mide:';
  var cor='\\('+k+'\\sqrt{2}\\)';
  return Q(q,mc(cor,['\\('+2*k+'\\)','\\('+k+'\\sqrt{3}\\)','\\('+(k+1)+'\\sqrt{2}\\)','\\('+k+'^2\\)']),
    'En 45-45-90°: hipotenusa = cateto × √2.',
    'Lados \\(k:k:k\\sqrt{2}\\). Hip=\\('+k+'\\sqrt{2}\\)','Trigonometría');
};

MM_GENERATORS['paes_g_tri_12']=function(){
  // Identidad fundamental
  var q='¿Cuál es la identidad trigonométrica fundamental?';
  var cor='\\(\\sin^2\\theta+\\cos^2\\theta=1\\)';
  return Q(q,mc(cor,['\\(\\sin\\theta+\\cos\\theta=1\\)','\\(\\tan^2\\theta+1=\\cos^2\\theta\\)','\\(\\sin^2\\theta-\\cos^2\\theta=1\\)','\\(\\sin\\theta\\cdot\\cos\\theta=1\\)']),
    'Se deriva del teorema de Pitágoras en el triángulo rectángulo.',
    '\\(\\left(\\dfrac{\\text{op}}{\\text{hip}}\\right)^2+\\left(\\dfrac{\\text{adj}}{\\text{hip}}\\right)^2=\\dfrac{\\text{op}^2+\\text{adj}^2}{\\text{hip}^2}=1\\)','Trigonometría');
};

/* ════════════════════════════════════════════════════════
   3. ÁREAS  paes_g_are_01 … paes_g_are_12
════════════════════════════════════════════════════════ */

MM_GENERATORS['paes_g_are_01']=function(){
  var l=ri(2,15),w=ri(2,15),A=l*w;
  var q='Rectángulo de \\('+l+'\\) cm × \\('+w+'\\) cm. Área:';
  return Q(q,mc(A+' cm²',[2*(l+w)+' cm²',(A+l)+' cm²',(A-w)+' cm²',l*l+' cm²']),
    '\\(A=b\\times h\\)','\\(A='+l+'\\times'+w+'='+A+'\\) cm²','Áreas');
};

MM_GENERATORS['paes_g_are_02']=function(){
  var l=ri(2,12),A=l*l;
  var q='Cuadrado de lado \\('+l+'\\) cm. Área:';
  return Q(q,mc(A+' cm²',[4*l+' cm²',(A+l)+' cm²',(A-l)+' cm²',2*A+' cm²']),
    '\\(A=l^2\\)','\\(A='+l+'^2='+A+'\\) cm²','Áreas');
};

MM_GENERATORS['paes_g_are_03']=function(){
  var b=ri(4,16),h=ri(3,12),A=b*h/2;
  var q='Triángulo con base \\('+b+'\\) cm y altura \\('+h+'\\) cm. Área:';
  return Q(q,mc(A+' cm²',[b*h+' cm²',(A+h)+' cm²',(b+h)+' cm²',(A*2-h)+' cm²']),
    '\\(A=\\dfrac{b\\times h}{2}\\)','\\(A=\\dfrac{'+b+'\\times'+h+'}{2}='+A+'\\) cm²','Áreas');
};

MM_GENERATORS['paes_g_are_04']=function(){
  var r=ri(2,10),A=r*r;
  var q='Círculo de radio \\('+r+'\\) cm. Área:';
  var cor='\\('+A+'\\pi\\) cm²';
  return Q(q,mc(cor,['\\('+2*r+'\\pi\\) cm²','\\('+r+'\\pi\\) cm²','\\('+(A+r)+'\\pi\\) cm²','\\('+(A-1)+'\\pi\\) cm²']),
    '\\(A=\\pi r^2\\)','\\(A=\\pi\\cdot'+r+'^2='+A+'\\pi\\) cm²','Áreas');
};

MM_GENERATORS['paes_g_are_05']=function(){
  var r=ri(2,10),C=2*r;
  var q='Círculo de radio \\('+r+'\\) cm. Circunferencia (perímetro):';
  var cor='\\('+C+'\\pi\\) cm';
  return Q(q,mc(cor,['\\('+r+'\\pi\\) cm','\\('+r*r+'\\pi\\) cm','\\('+(C+2)+'\\pi\\) cm','\\('+r+'\\pi^2\\) cm']),
    '\\(C=2\\pi r\\)','\\(C=2\\pi\\cdot'+r+'='+C+'\\pi\\) cm','Áreas');
};

MM_GENERATORS['paes_g_are_06']=function(){
  var a=ri(4,12),b=ri(2,a-1),h=ri(3,8),A=(a+b)*h/2;
  var q='Trapecio con bases \\('+a+'\\) y \\('+b+'\\) cm, altura \\('+h+'\\) cm. Área:';
  return Q(q,mc(A+' cm²',[A+h+' cm²',A-b+' cm²',(a+b)*h+' cm²',(a-b)*h/2+' cm²']),
    '\\(A=\\dfrac{(a+b)\\cdot h}{2}\\)','\\(A=\\dfrac{('+a+'+'+b+')\\cdot '+h+'}{2}='+A+'\\) cm²','Áreas');
};

MM_GENERATORS['paes_g_are_07']=function(){
  var b=ri(4,14),h=ri(3,10),A=b*h;
  var q='Paralelogramo con base \\('+b+'\\) cm y altura \\('+h+'\\) cm. Área:';
  return Q(q,mc(A+' cm²',[A+b+' cm²',A/2+' cm²',2*(b+h)+' cm²',(A-h)+' cm²']),
    '\\(A=b\\times h\\) (usando la altura perpendicular)','\\(A='+b+'\\times'+h+'='+A+'\\) cm²','Áreas');
};

MM_GENERATORS['paes_g_are_08']=function(){
  var r=ri(3,8),theta=pick([90,120,180,60]);
  var A=r2(theta/360*r*r);
  var q='Sector circular con radio \\('+r+'\\) y ángulo central \\('+theta+'°\\). Área:';
  var cor='\\('+A+'\\pi\\) cm²';
  return Q(q,mc(cor,['\\('+(A*2)+'\\pi\\) cm²','\\('+(r*r)+'\\pi\\) cm²','\\('+r+'\\pi\\) cm²','\\('+(A-1)+'\\pi\\) cm²']),
    '\\(A=\\dfrac{\\theta}{360°}\\cdot\\pi r^2\\)',
    '\\(A=\\dfrac{'+theta+'}{360}\\cdot'+r+'^2\\cdot\\pi='+A+'\\pi\\) cm²','Áreas');
};

MM_GENERATORS['paes_g_are_09']=function(){
  var R=ri(5,10),r=ri(2,R-1),A=R*R-r*r;
  var q='Corona circular: radio exterior \\('+R+'\\) cm, radio interior \\('+r+'\\) cm. Área:';
  var cor='\\('+A+'\\pi\\) cm²';
  return Q(q,mc(cor,['\\('+(R*R+r*r)+'\\pi\\) cm²','\\('+(R-r)*(R-r)+'\\pi\\) cm²','\\('+(R+r)+'\\pi\\) cm²','\\('+(R*R)+'\\pi\\) cm²']),
    '\\(A=\\pi(R^2-r^2)\\)','\\(A=('+R+'^2-'+r+'^2)\\pi='+A+'\\pi\\) cm²','Áreas');
};

MM_GENERATORS['paes_g_are_10']=function(){
  var k=ri(2,5),A1=ri(4,16),A2=k*k*A1;
  var q='Dos figuras semejantes con razón de semejanza \\('+k+':1\\). Si el área de la menor es \\('+A1+'\\) cm², el área de la mayor es:';
  return Q(q,mc(A2+' cm²',[k*A1+' cm²',(A2+k)+' cm²',(A2-A1)+' cm²',(k*k+1)*A1+' cm²']),
    'Las áreas escalan con el cuadrado de la razón: \\(k^2\\).',
    '\\(A_2='+k+'^2\\times '+A1+'='+A2+'\\) cm²','Áreas');
};

MM_GENERATORS['paes_g_are_11']=function(){
  var d1=ri(4,14)*2,d2=ri(3,10)*2,A=d1*d2/2;
  var q='Rombo con diagonales \\(d_1='+d1+'\\) cm y \\(d_2='+d2+'\\) cm. Área:';
  return Q(q,mc(A+' cm²',[d1*d2+' cm²',2*(d1+d2)+' cm²',(A+d1)+' cm²',(A-d2)+' cm²']),
    '\\(A=\\dfrac{d_1\\times d_2}{2}\\)','\\(A=\\dfrac{'+d1+'\\times'+d2+'}{2}='+A+'\\) cm²','Áreas');
};

MM_GENERATORS['paes_g_are_12']=function(){
  // Area of regular hexagon = (3√3/2)a²
  var a=ri(2,8);
  var A=r1(3*Math.sqrt(3)/2*a*a);
  var q='Hexágono regular de lado \\('+a+'\\) cm. ¿Cuál es su área aproximada?';
  var cor=A+' cm²';
  return Q(q,mc(cor,[r1(A*1.2)+' cm²',r1(A*0.8)+' cm²',6*a+' cm²',a*a+' cm²']),
    '\\(A_{\\text{hex}}=\\dfrac{3\\sqrt{3}}{2}a^2\\)',
    '\\(A=\\dfrac{3\\sqrt{3}}{2}\\times '+a+'^2\\approx '+A+'\\) cm²','Áreas');
};

/* ════════════════════════════════════════════════════════
   4. VOLÚMENES  paes_g_vol_01 … paes_g_vol_12
════════════════════════════════════════════════════════ */

MM_GENERATORS['paes_g_vol_01']=function(){
  var l=ri(2,8),V=l*l*l;
  var q='Cubo de arista \\('+l+'\\) cm. Volumen:';
  return Q(q,mc(V+' cm³',[6*l*l+' cm³',(V+l)+' cm³',l*l+' cm³',(V*2)+' cm³']),
    '\\(V=l^3\\)','\\(V='+l+'^3='+V+'\\) cm³','Volúmenes');
};

MM_GENERATORS['paes_g_vol_02']=function(){
  var a=ri(2,8),b=ri(2,8),c=ri(2,8),V=a*b*c;
  var q='Paralelepípedo de \\('+a+'×'+b+'×'+c+'\\) cm. Volumen:';
  return Q(q,mc(V+' cm³',[2*(a*b+b*c+a*c)+' cm³',(V+a)+' cm³',a*b+b*c+' cm³',(V-c)+' cm³']),
    '\\(V=a\\times b\\times c\\)','\\(V='+a+'\\times'+b+'\\times'+c+'='+V+'\\) cm³','Volúmenes');
};

MM_GENERATORS['paes_g_vol_03']=function(){
  var r=ri(2,7),h=ri(2,10),V=r*r*h;
  var q='Cilindro de radio \\('+r+'\\) cm y altura \\('+h+'\\) cm. Volumen:';
  var cor='\\('+V+'\\pi\\) cm³';
  return Q(q,mc(cor,['\\('+2*r*h+'\\pi\\) cm³','\\('+r*h+'\\pi\\) cm³','\\('+(V+r)+'\\pi\\) cm³','\\('+r*r+'\\pi\\) cm³']),
    '\\(V=\\pi r^2 h\\)','\\(V=\\pi\\cdot'+r+'^2\\cdot'+h+'='+V+'\\pi\\) cm³','Volúmenes');
};

MM_GENERATORS['paes_g_vol_04']=function(){
  var r=ri(2,6),V=r2(4/3*r*r*r);
  var q='Esfera de radio \\('+r+'\\) cm. Volumen:';
  var cor='\\(\\dfrac{'+4*r*r*r+'}{3}\\pi\\) cm³';
  var rr=r*r*r;
  return Q(q,mc(cor,['\\(4\\pi\\cdot '+r+'^2\\) cm³','\\(\\dfrac{2}{3}\\pi\\cdot '+r+'^3\\) cm³','\\('+rr+'\\pi\\) cm³','\\(\\dfrac{'+(4*rr+1)+'}{3}\\pi\\) cm³']),
    '\\(V=\\dfrac{4}{3}\\pi r^3\\)','\\(V=\\dfrac{4}{3}\\pi\\cdot '+r+'^3=\\dfrac{'+4*rr+'}{3}\\pi\\) cm³','Volúmenes');
};

MM_GENERATORS['paes_g_vol_05']=function(){
  var r=ri(2,6),h=ri(3,9),V=r*r*h;
  var q='Cono de radio \\('+r+'\\) cm y altura \\('+h+'\\) cm. Volumen:';
  var cor='\\(\\dfrac{'+V+'}{3}\\pi\\) cm³';
  return Q(q,mc(cor,['\\('+V+'\\pi\\) cm³','\\(\\dfrac{'+2*V+'}{3}\\pi\\) cm³','\\('+r*h+'\\pi\\) cm³','\\(\\dfrac{'+(V+1)+'}{3}\\pi\\) cm³']),
    '\\(V=\\dfrac{1}{3}\\pi r^2 h\\)','\\(V=\\dfrac{1}{3}\\pi\\cdot'+r+'^2\\cdot'+h+'=\\dfrac{'+V+'}{3}\\pi\\) cm³','Volúmenes');
};

MM_GENERATORS['paes_g_vol_06']=function(){
  var l=ri(3,8),h=ri(3,10),V=l*l*h/3;
  var q='Pirámide de base cuadrada, lado \\('+l+'\\) cm y altura \\('+h+'\\) cm. Volumen:';
  return Q(q,mc(V+' cm³',[l*l*h+' cm³',(V+l)+' cm³',l*h+' cm³',(V*2)+' cm³']),
    '\\(V=\\dfrac{1}{3}B\\cdot h\\) donde \\(B=l^2\\)',
    '\\(V=\\dfrac{1}{3}\\cdot'+l+'^2\\cdot'+h+'='+V+'\\) cm³','Volúmenes');
};

MM_GENERATORS['paes_g_vol_07']=function(){
  var l=ri(2,7),S=6*l*l;
  var q='Superficie total de un cubo de arista \\('+l+'\\) cm:';
  return Q(q,mc(S+' cm²',[l*l+' cm²',4*l*l+' cm²',(S+l*l)+' cm²',l*l*l+' cm³']),
    'El cubo tiene 6 caras cuadradas.','\\(S=6\\times'+l+'^2='+S+'\\) cm²','Volúmenes');
};

MM_GENERATORS['paes_g_vol_08']=function(){
  var r=ri(2,7),h=ri(3,10),S=2*r*h;
  var q='Superficie lateral de un cilindro de radio \\('+r+'\\) cm y altura \\('+h+'\\) cm:';
  var cor='\\('+S+'\\pi\\) cm²';
  return Q(q,mc(cor,['\\('+r*r+'\\pi\\) cm²','\\('+r*h+'\\pi\\) cm²','\\('+(S+2*r)+' \\pi\\) cm²','\\('+2*r*r+'\\pi\\) cm²']),
    '\\(S_{\\text{lat}}=2\\pi r h\\)','\\(S=2\\pi\\cdot'+r+'\\cdot'+h+'='+S+'\\pi\\) cm²','Volúmenes');
};

MM_GENERATORS['paes_g_vol_09']=function(){
  // Prisma triangular: base triángulo rectángulo
  var a=ri(3,8),b=ri(3,8),h=ri(4,10);
  var V=a*b*h/2;
  var q='Prisma triangular. La base es un triángulo rectángulo con catetos \\('+a+'\\) y \\('+b+'\\) cm. Altura del prisma: \\('+h+'\\) cm. Volumen:';
  return Q(q,mc(V+' cm³',[a*b*h+' cm³',(V+h)+' cm³',a*b/2+' cm³',(V+a)+' cm³']),
    '\\(V=A_{\\text{base}}\\times h\\), \\(A_{\\text{base}}=\\dfrac{ab}{2}\\)',
    '\\(V=\\dfrac{'+a+'\\times'+b+'}{2}\\times'+h+'='+V+'\\) cm³','Volúmenes');
};

MM_GENERATORS['paes_g_vol_10']=function(){
  var k=ri(2,4),V1=ri(10,50),V2=k*k*k*V1;
  var q='Dos sólidos semejantes con razón \\('+k+':1\\). Si el menor tiene volumen \\('+V1+'\\) cm³, el mayor tiene:';
  return Q(q,mc(V2+' cm³',[k*V1+' cm³',k*k*V1+' cm³',(V2+V1)+' cm³',V1*k+k+' cm³']),
    'Los volúmenes escalan con el cubo de la razón: \\(k^3\\).',
    '\\(V_2='+k+'^3\\times '+V1+'='+V2+'\\) cm³','Volúmenes');
};

MM_GENERATORS['paes_g_vol_11']=function(){
  var a=ri(2,5),c=ri(3,8),b=ri(3,8),n=Math.floor(a*b*c/(1));
  var q='¿Cuántos cubos unitarios (arista 1 cm) caben exactamente en una caja de \\('+a+'\\times'+b+'\\times'+c+'\\) cm?';
  var V=a*b*c;
  return Q(q,mc(String(V),[String(V+a),String(V-b),String(a*b+b*c),String(2*(a*b+b*c+a*c))]),
    'El número de cubos unitarios es el volumen de la caja.','\\(V='+a+'\\times'+b+'\\times'+c+'='+V+'\\)','Volúmenes');
};

MM_GENERATORS['paes_g_vol_12']=function(){
  var r=ri(3,7),h=ri(4,10);
  var Vcil=r2(PI*r*r*h);
  var Vcon=r2(PI*r*r*h/3);
  var q='Un cilindro y un cono tienen el mismo radio \\('+r+'\\) cm y la misma altura \\('+h+'\\) cm. La razón \\(V_{\\text{cono}}/V_{\\text{cilindro}}\\) es:';
  var cor='\\(\\dfrac{1}{3}\\)';
  return Q(q,mc(cor,['\\(\\dfrac{1}{2}\\)','\\(3\\)','\\(\\dfrac{2}{3}\\)','\\(\\dfrac{1}{4}\\)']),
    'Compara las fórmulas: \\(V_{\\text{cono}}=\\frac{1}{3}\\pi r^2h\\), \\(V_{\\text{cil}}=\\pi r^2h\\)',
    '\\(\\dfrac{V_{\\text{cono}}}{V_{\\text{cil}}}=\\dfrac{\\frac{1}{3}\\pi r^2h}{\\pi r^2h}=\\dfrac{1}{3}\\)','Volúmenes');
};

/* ════════════════════════════════════════════════════════
   5. GEOMETRÍA ANALÍTICA  paes_g_ana_01 … paes_g_ana_12
════════════════════════════════════════════════════════ */

MM_GENERATORS['paes_g_ana_01']=function(){
  var x1=ri(-4,4),y1=ri(-4,4),x2=ri(-4,4),y2=ri(-4,4);
  while(x1===x2&&y1===y2){x2=ri(-4,4);y2=ri(-4,4);}
  var d=r2(Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)));
  var q='Distancia entre \\(A('+x1+','+y1+')\\) y \\(B('+x2+','+y2+')\\):';
  return Q(q,mc(String(d),[r2(d+1)+'',r2(d-1)+'',r2(Math.abs(x2-x1)+Math.abs(y2-y1))+'',r2(d*2)+'']),
    '\\(d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\)',
    '\\(d=\\sqrt{('+x2+'-'+x1+')^2+('+y2+'-'+y1+')^2}=\\sqrt{'+(x2-x1)*(x2-x1)+'+'+(y2-y1)*(y2-y1)+'}='+d+'\\)','Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_02']=function(){
  var x1=ri(-5,5),y1=ri(-5,5),x2=ri(-5,5),y2=ri(-5,5);
  var mx=r2((x1+x2)/2),my=r2((y1+y2)/2);
  var q='Punto medio entre \\(('+x1+','+y1+')\\) y \\(('+x2+','+y2+')\\):';
  var cor='\\(('+mx+',\\ '+my+')\\)';
  return Q(q,mc(cor,['\\(('+(mx+1)+',\\ '+my+')\\)','\\(('+mx+',\\ '+(my+1)+')\\)','\\(('+x1+'+'+x2+',\\ '+y1+'+'+y2+')\\)','\\(('+(x2-x1)/2+',\\ '+(y2-y1)/2+')\\)']),
    '\\(M=\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)\\)',
    '\\(M=\\left(\\dfrac{'+x1+'+'+x2+'}{2},\\dfrac{'+y1+'+'+y2+'}{2}\\right)=('+mx+','+my+')\\)','Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_03']=function(){
  var m=ri(-3,3)||1,b=ri(-5,5),x0=ri(-3,3);
  var y0=m*x0+b;
  var q='¿El punto \\(('+x0+','+y0+')\\) pertenece a la recta \\(y='+m+'x'+(b>=0?'+':'')+b+'\\)?';
  return Q(q,mc('Sí',['No','Solo si x=0','Solo si y=0','No se puede determinar']),
    'Sustituye el punto en la ecuación y verifica.',
    '\\(y='+m+'('+x0+')+('+b+')='+y0+'\\ ✓\\) — sí pertenece','Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_04']=function(){
  var h=ri(-3,3),k=ri(-3,3),r=ri(2,6);
  var q='La ecuación \\((x'+(h>=0?'-':'+')+Math.abs(h)+')^2+(y'+(k>=0?'-':'+')+Math.abs(k)+')^2='+r*r+'\\) tiene centro y radio:';
  var cor='Centro \\(('+h+','+k+')\\), radio \\('+r+'\\)';
  return Q(q,mc(cor,['Centro \\((-'+h+',-'+k+')\\), radio \\('+r+'\\)','Centro \\(('+h+','+k+')\\), radio \\('+r*r+'\\)','Centro \\((0,0)\\), radio \\('+r+'\\)','Centro \\(('+h+','+k+')\\), radio \\('+(r+1)+'\\)']),
    'Forma estándar: \\((x-h)^2+(y-k)^2=r^2\\)',
    'La ecuación está en forma estándar: centro=('+h+','+k+'), r²='+r*r+', r='+r,'Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_05']=function(){
  var h=ri(-2,2),k=ri(-2,2),r=ri(2,5);
  var q='Escribe la ecuación de la circunferencia con centro \\(('+h+','+k+')\\) y radio \\('+r+'\\):';
  var cor='\\((x'+(h>=0?'-':'+')+Math.abs(h)+')^2+(y'+(k>=0?'-':'+')+Math.abs(k)+')^2='+r*r+'\\)';
  var w=['\\((x'+(h>=0?'+':'-')+Math.abs(h)+')^2+(y'+(k>=0?'+':'-')+Math.abs(k)+')^2='+r*r+'\\)',
         '\\((x-'+h+')^2+(y-'+k+')^2='+r+'\\)',
         '\\(x^2+y^2='+r*r+'\\)',
         '\\((x+'+Math.abs(h)+')^2+(y+'+Math.abs(k)+')^2='+r+'\\)'];
  return Q(q,mc(cor,w),'\\((x-h)^2+(y-k)^2=r^2\\)',
    'Sustituye h='+h+', k='+k+', r²='+r*r,'Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_06']=function(){
  var x1=ri(-4,4),y1=ri(-4,4),dx=ri(1,4),dy=ri(1,4);
  var x2=x1+dx,y2=y1+dy;
  var g=gcd(Math.abs(dy),Math.abs(dx));
  var mn=dy/g,md=dx/g;
  var mStr=md===1?String(mn):mn+'/'+md;
  var q='Pendiente de la recta que pasa por \\(('+x1+','+y1+')\\) y \\(('+x2+','+y2+')\\):';
  var cor='\\('+mStr+'\\)';
  return Q(q,mc(cor,['\\('+(mn+1)+'/'+md+'\\)','\\('+md+'/'+mn+'\\)','\\('+(mn-1)+'\\)','\\('+dx+'/'+dy+'\\)']),
    '\\(m=\\dfrac{y_2-y_1}{x_2-x_1}\\)',
    '\\(m=\\dfrac{'+y2+'-'+y1+'}{'+x2+'-'+x1+'}=\\dfrac{'+dy+'}{'+dx+'}='+mStr+'\\)','Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_07']=function(){
  var h=ri(-3,3),k=ri(-3,3),r=ri(2,5);
  var px=h+r+ri(1,3);
  var d=r2(Math.sqrt(Math.pow(px-h,2)+Math.pow(k-k,2)));
  var pos=d>r?'fuera':d<r?'dentro':'sobre';
  var q='¿El punto \\(('+px+','+k+')\\) está dentro, sobre o fuera de la circunferencia \\((x-'+h+')^2+(y-'+k+')^2='+r*r+'\\)?';
  return Q(q,mc('Fuera',['Dentro','Sobre la circunferencia','No se puede determinar','En el centro']),
    'Calcula la distancia del punto al centro y compara con el radio.',
    'd=\\(|'+px+'-'+h+'|='+d+'>'+ r+'\\) → fuera','Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_08']=function(){
  var x1=ri(-3,3),y1=ri(-3,3),x2=ri(-3,3),y2=ri(-3,3);
  while(x1===x2&&y1===y2){x2=ri(-3,3);}
  var mx=r2((x1+x2)/2),my=r2((y1+y2)/2);
  var q='El punto medio del segmento entre \\(('+x1+','+y1+')\\) y \\(('+x2+','+y2+')\\) es:';
  var cor='\\(('+mx+',\\ '+my+')\\)';
  return Q(q,mc(cor,['\\(('+(mx+1)+',\\ '+my+')\\)','\\(('+x1+',\\ '+y2+')\\)','\\(('+x2+',\\ '+y1+')\\)','\\(('+(x1-x2)+',\\ '+(y1-y2)+')\\)']),
    '\\(M=\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)\\)',
    '\\(M=(\\dfrac{'+x1+'+'+x2+'}{2},\\dfrac{'+y1+'+'+y2+'}{2})=('+mx+','+my+')\\)','Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_09']=function(){
  var b=ri(1,8),c=ri(1,8);
  // x-intercept of y=bx-c: x=c/b
  var g=gcd(c,b),xn=c/g,xd=b/g;
  var xStr=xd===1?String(xn):xn+'/'+xd;
  var q='¿Dónde corta la recta \\(y='+b+'x-'+c+'\\) al eje \\(x\\)?';
  var cor='\\(('+xStr+',\\ 0)\\)';
  return Q(q,mc(cor,['\\((0,\\ -'+c+')\\)','\\(('+c+',\\ 0)\\)','\\((0,\\ '+b+')\\)','\\((-'+xStr+',\\ 0)\\)']),
    'Hace y=0 y despeja x.',
    '\\(0='+b+'x-'+c+'\\Rightarrow x='+c+'/'+b+'='+xStr+'\\)','Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_10']=function(){
  // Area of triangle with vertices at origin, (a,0), (0,b)
  var a=ri(2,8),b=ri(2,8),A=a*b/2;
  var q='¿Cuál es el área del triángulo con vértices \\((0,0)\\), \\(('+a+',0)\\) y \\((0,'+b+')\\)?';
  return Q(q,mc(A+' u²',[a*b+' u²',(A+b)+' u²',a+b+' u²',(A-1)+' u²']),
    '\\(A=\\dfrac{1}{2}\\times base\\times altura=\\dfrac{1}{2}\\times'+a+'\\times'+b+'\\)',
    '\\(A=\\dfrac{'+a+'\\times'+b+'}{2}='+A+'\\) u²','Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_11']=function(){
  // Distance from origin to point (a,b)
  var a=pick([3,4,5,6,8]),b=a===3?4:a===4?3:a===5?12:a===6?8:a===8?15:4;
  var d=Math.round(Math.sqrt(a*a+b*b));
  var q='Distancia desde el origen \\((0,0)\\) al punto \\(('+a+','+b+')\\):';
  return Q(q,mc(String(d),[String(d+1),String(d-1),String(a+b),String(a*b)]),
    '\\(d=\\sqrt{a^2+b^2}\\)','\\(d=\\sqrt{'+a+'^2+'+b+'^2}=\\sqrt{'+(a*a+b*b)+'}='+d+'\\)','Geometría Analítica');
};

MM_GENERATORS['paes_g_ana_12']=function(){
  var x1=0,y1=0,x2=ri(2,6),y2=0,x3=ri(0,x2),y3=ri(2,6);
  var A=Math.abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2;
  var q='Área del triángulo con vértices \\(('+x1+','+y1+')\\), \\(('+x2+','+y2+')\\), \\(('+x3+','+y3+')\\):';
  return Q(q,mc(A+' u²',[A+x2+' u²',A-1+' u²',x2*y3+' u²',A*2+' u²']),
    'Fórmula del determinante: \\(A=\\dfrac{1}{2}|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)|\\)',
    '\\(A=\\dfrac{1}{2}|'+x1+'('+y2+'-'+y3+')+'+x2+'('+y3+'-'+y1+')+'+x3+'('+y1+'-'+y2+')|='+A+'\\)','Geometría Analítica');
};

/* ════════════════════════════════════════════════════════
   6. SEMEJANZA Y PROPORCIONES  paes_g_sem_01 … paes_g_sem_12
════════════════════════════════════════════════════════ */

MM_GENERATORS['paes_g_sem_01']=function(){
  var k=ri(2,5),l1=ri(3,8),l2=k*l1;
  var q='Dos triángulos semejantes. El lado correspondiente del mayor mide \\('+l2+'\\) y del menor \\('+l1+'\\). La razón de semejanza (mayor:menor) es:';
  var cor=String(k)+':1';
  return Q(q,mc(cor,[(k+1)+':1','1:'+k,k+':2',k*l1+':1']),
    'Razón = lado mayor / lado menor.','Razón = \\('+l2+'/'+l1+'='+k+'\\)','Semejanza');
};

MM_GENERATORS['paes_g_sem_02']=function(){
  var k=ri(2,4),a=ri(3,8),b=ri(3,8),c=ri(3,8);
  var q='Dos triángulos semejantes con razón \\('+k+':1\\). El menor tiene lados \\('+a+'\\), \\('+b+'\\) y \\('+c+'\\). El mayor tiene lado correspondiente al \\('+a+'\\):';
  var cor=String(k*a);
  return Q(q,mc(cor,[k*a+k+'',k*a-1+'',a+k+'',k*b+''].map(String)),
    'Multiplica cada lado por la razón k.','\\('+k+'\\times '+a+'='+k*a+'\\)','Semejanza');
};

MM_GENERATORS['paes_g_sem_03']=function(){
  var k=ri(2,4),P1=ri(10,30),P2=k*P1;
  var q='Dos figuras semejantes con razón \\('+k+':1\\). El perímetro de la menor es \\('+P1+'\\). El de la mayor:';
  return Q(q,mc(String(P2),[String(k*k*P1),String(P2+k),String(P1+k),String(P2-P1)]),
    'Los perímetros escalan con la misma razón k.','\\(P_2='+k+'\\times '+P1+'='+P2+'\\)','Semejanza');
};

MM_GENERATORS['paes_g_sem_04']=function(){
  var k=ri(2,4),A1=ri(4,16),A2=k*k*A1;
  var q='Razón de semejanza \\('+k+':1\\). Área de la figura menor: \\('+A1+'\\) cm². Área de la mayor:';
  return Q(q,mc(A2+' cm²',[k*A1+' cm²',(A2+A1)+' cm²',(A2-k)+' cm²',(k*k+1)*A1+' cm²']),
    'Las áreas escalan con \\(k^2\\).','\\(A_2='+k+'^2\\times '+A1+'='+A2+'\\) cm²','Semejanza');
};

MM_GENERATORS['paes_g_sem_05']=function(){
  var k=ri(2,3),V1=ri(4,20),V2=k*k*k*V1;
  var q='Razón de semejanza \\('+k+':1\\). Volumen del menor: \\('+V1+'\\) cm³. Volumen del mayor:';
  return Q(q,mc(V2+' cm³',[k*V1+' cm³',k*k*V1+' cm³',(V2+V1)+' cm³',V2-k+' cm³']),
    'Los volúmenes escalan con \\(k^3\\).','\\(V_2='+k+'^3\\times '+V1+'='+V2+'\\) cm³','Semejanza');
};

MM_GENERATORS['paes_g_sem_06']=function(){
  var dist=ri(10,50),esc=ri(2,5)*10000;
  var real=dist*esc/100000;
  var q='En un mapa de escala \\(1:'+esc+'\\), una distancia mide \\('+dist+'\\) cm. La distancia real es:';
  var cor=r1(real)+' km';
  return Q(q,mc(cor,[r1(real*10)+' km',r1(real/10)+' km',dist+' km',r1(real+10)+' km']),
    'Real = mapa × denominador de la escala.',
    '\\('+dist+'\\text{ cm}\\times '+esc+'='+dist*esc+'\\text{ cm}='+r1(real)+'\\text{ km}\\)','Semejanza');
};

MM_GENERATORS['paes_g_sem_07']=function(){
  // Tales: paralela divide lados proporcionalmente
  var a=ri(2,6),b=ri(2,6),c=ri(2,6);
  var d=a*c/b;
  if(d!==Math.round(d)){d=r2(d);}
  var q='Por el teorema de Tales, una paralela divide los lados de un triángulo en \\('+a+'\\) y \\('+b+'\\) en un lado. El otro lado está dividido en \\('+c+'\\) y \\(x\\). Halla \\(x\\):';
  var cor=String(d);
  return Q(q,mc(cor,[r2(b*c/a)+'',r2(d+1)+'',String(a+b+c),r2(d-1)+'']),'\\(\\dfrac{a}{b}=\\dfrac{c}{x}\\Rightarrow x=\\dfrac{bc}{a}\\)',
    '\\(x=\\dfrac{'+b+'\\times '+c+'}{'+a+'}='+d+'\\)','Semejanza');
};

MM_GENERATORS['paes_g_sem_08']=function(){
  // height in right triangle: h²=p·q (p,q projections on hypotenuse)
  var p=ri(2,6),q=ri(2,6),h=r2(Math.sqrt(p*q));
  var q2='En un triángulo rectángulo, la altura desde el ángulo recto divide la hipotenusa en segmentos \\('+p+'\\) y \\('+q+'\\). La altura mide:';
  var cor=h+' cm';
  return Q(q2,mc(cor,[r2(h+1)+' cm',r2(h-0.5)+' cm',r2(p+q)+' cm',r2(p*q)+' cm']),
    '\\(h^2=p\\cdot q\\Rightarrow h=\\sqrt{pq}\\)',
    '\\(h=\\sqrt{'+p+'\\times '+q+'}=\\sqrt{'+(p*q)+'}\\approx '+h+'\\) cm','Semejanza');
};

MM_GENERATORS['paes_g_sem_09']=function(){
  // cateto²= projection × hypotenuse
  var p=ri(2,5),hyp=ri(6,12);
  while(p>=hyp)p=ri(2,5);
  var cat=r2(Math.sqrt(p*hyp));
  var q='En un triángulo rectángulo, un cateto corresponde a la proyección \\('+p+'\\) sobre la hipotenusa \\('+hyp+'\\). El cateto mide:';
  var cor=cat+' cm';
  return Q(q,mc(cor,[r2(cat+1)+' cm',r2(p+hyp)+' cm',r2(cat-1)+' cm',r2(p*hyp)+' cm']),
    '\\(\\text{cateto}^2=\\text{proyección}\\times\\text{hipotenusa}\\)',
    '\\(c=\\sqrt{'+p+'\\times '+hyp+'}=\\sqrt{'+(p*hyp)+'}\\approx '+cat+'\\)','Semejanza');
};

MM_GENERATORS['paes_g_sem_10']=function(){
  // Media geométrica entre a y b
  var a=ri(2,6),b=ri(4,16);
  while(b===a)b=ri(4,16);
  var mg=r2(Math.sqrt(a*b));
  var q='La media geométrica entre \\('+a+'\\) y \\('+b+'\\) es:';
  var cor=mg+'';
  return Q(q,mc(cor,[r2((a+b)/2)+'',r2(a*b)+'',r2(mg+1)+'',r2(mg-1)+'']),
    '\\(MG=\\sqrt{a\\cdot b}\\)',
    '\\(MG=\\sqrt{'+a+'\\times '+b+'}=\\sqrt{'+(a*b)+'}\\approx '+mg+'\\)','Semejanza');
};

MM_GENERATORS['paes_g_sem_11']=function(){
  var ang1=ri(30,70),ang2=ri(20,60);
  while(ang1+ang2>=180)ang2=ri(20,50);
  var q='Dos triángulos comparten dos ángulos iguales (\\('+ang1+'°\\) y \\('+ang2+'°\\)). ¿Son semejantes?';
  return Q(q,mc('Sí, por el criterio AA',['No, se necesitan los lados','Sí, solo si son equiláteros','Solo si son rectángulos','No se puede determinar']),
    'El criterio AA (Ángulo-Ángulo) garantiza semejanza.',
    'Si dos ángulos son iguales, el tercero también lo es (pues suman 180°). Criterio AA ⟹ semejantes.','Semejanza');
};

MM_GENERATORS['paes_g_sem_12']=function(){
  var k=ri(2,5),l1=ri(4,10),l2=k*l1;
  var A1=l1*l1,A2=l2*l2;
  var q='Los lados de dos cuadrados son \\('+l1+'\\) y \\('+l2+'\\) cm. La razón de sus áreas (mayor:menor) es:';
  var cor=k*k+':1';
  return Q(q,mc(cor,[k+':1',(k*k+1)+':1',k*k+':'+k,(k+1)+':'+(k-1)]),
    'Las áreas escalan con el cuadrado de la razón lineal.',
    'Razón lineal \\('+k+'\\), razón de áreas \\('+k+'^2='+k*k+'\\). Entonces \\('+k*k+':1\\)','Semejanza');
};

/* ── Register topic arrays ── */
if(!window.MM_TOPIC_GENERATORS) window.MM_TOPIC_GENERATORS={};
var T=window.MM_TOPIC_GENERATORS;
T['paes_g_basica']=['paes_g_bas_01','paes_g_bas_02','paes_g_bas_03','paes_g_bas_04','paes_g_bas_05','paes_g_bas_06','paes_g_bas_07','paes_g_bas_08','paes_g_bas_09','paes_g_bas_10','paes_g_bas_11','paes_g_bas_12'];
T['paes_g_trig']=['paes_g_tri_01','paes_g_tri_02','paes_g_tri_03','paes_g_tri_04','paes_g_tri_05','paes_g_tri_06','paes_g_tri_07','paes_g_tri_08','paes_g_tri_09','paes_g_tri_10','paes_g_tri_11','paes_g_tri_12'];
T['paes_g_areas']=['paes_g_are_01','paes_g_are_02','paes_g_are_03','paes_g_are_04','paes_g_are_05','paes_g_are_06','paes_g_are_07','paes_g_are_08','paes_g_are_09','paes_g_are_10','paes_g_are_11','paes_g_are_12'];
T['paes_g_vol']=['paes_g_vol_01','paes_g_vol_02','paes_g_vol_03','paes_g_vol_04','paes_g_vol_05','paes_g_vol_06','paes_g_vol_07','paes_g_vol_08','paes_g_vol_09','paes_g_vol_10','paes_g_vol_11','paes_g_vol_12'];
T['paes_g_anal']=['paes_g_ana_01','paes_g_ana_02','paes_g_ana_03','paes_g_ana_04','paes_g_ana_05','paes_g_ana_06','paes_g_ana_07','paes_g_ana_08','paes_g_ana_09','paes_g_ana_10','paes_g_ana_11','paes_g_ana_12'];
T['paes_g_sem']=['paes_g_sem_01','paes_g_sem_02','paes_g_sem_03','paes_g_sem_04','paes_g_sem_05','paes_g_sem_06','paes_g_sem_07','paes_g_sem_08','paes_g_sem_09','paes_g_sem_10','paes_g_sem_11','paes_g_sem_12'];

})();
