function A1(h, I, D, V, n) {
  var P = 110832;
  var A = 17.32 * (P/3000);

  var R = []

  for(let i = 0; i < n; i++) {
    if (i !== 0) V = R[i-1][1];
    if ((i+1)*h > D) I = 0;

    var Ev = V + h*I*A;
    if (Ev < 0) Ev = 0;

    R.push([(i+1)*h, Ev])
  }

  return R;
}

function A2(h, I, D, V, C, Qs, n) {
  var P = 110832;

  var A = 17.32 * (P/3000);
  var As = 8.66 * 8.66;
  var Vs = 3.5 * As;

  var tk = 1 - (P/140000);
  var Cs = 0.9;

  var R = [];

  for(let i = 0; i < n; i++) {
    if (i !== 0) V = R[i-1][1];
    if (i !== 0) C = R[i-1][2];
    if ((i+1)*h > D) I = 0;

    var Ev = V + h * (C*I*A - Qs);
    if (Ev < 0) Ev = 0;

    var M = (h*V)/(Vs*tk);
    var Ec = (C + M*Cs) / (1 + M);

    R.push([(i+1)*h, Ev, Ec]);
  }

  return R; 
}

function B(h, I, D, V, C, Qm, n, T) {
  var P = 110832;

  var A = 17.32 * (P/3000);
  var As = 8.66 * 8.66;
  var Vs = 3.5 * As;

  var tk = 1 - (P/140000);
  var Cs = 0.9;
  
  var Ha = 4;
  var Hi = 1;
  var Hs = 3.5;

  var R = []

  for(let i = 0; i < n; i++) {
    if (i !== 0) V = R[i-1][1];
    if (i !== 0) C = R[i-1][2];
    if ((i+1)*h > D) I = 0;

    var dH = Hs - (V/As);
    var Qs = Qm * Math.sqrt((Ha - dH) / (Ha - Hi));

    var Ev = V + h * (C*I*A - Qs);
    if (Ev < 0) Ev = 0;

    var M = (h*V)/(Vs*tk);
    var Ec = (C + M*Cs) / (1 + M);
    
    if (T === 0) R.push([(i+1)*h, Ev, Ec, Ev/As]);
    if (T === 1) R.push([(i+1)*h, Ev, Ec]);
  }

  return R;
}

function C(h, I, D, V, C, Qm, n) {
  var P = 110832;

  var A = 17.32 * (P/3000);
  var As = 8.66 * 8.66;
  var Vs = 3.5 * As;

  var tk = 1 - (P/140000);
  var Cs = 0.9;
  
  var Ha = 4;
  var Hi = 1;
  var Hs = 3.5;

  var R = [];

  for(let i = 0; i < n; i++) {
    if (i !== 0) V = R[i-1][0];
    if (i !== 0) C = R[i-1][1];
    if ((i+1)*h > D) I = 0;

    var dH = Hs - (V/As);
    var Qs = Qm * Math.sqrt((Ha - dH) / (Ha - Hi));

    var q1v = h * (C*I*A - Qs);
    var q2v = h * (C*I*A + q1v - Qs);
    var Rv = V + 0.5 * (q1v + q2v);
    if (Rv < 0) Rv = 0;

    var q1c = (h*V/Vs*tk) * (Cs - C);
    var q2c = (h*V/Vs*tk) * (Cs - q1c - C);
    var Rc = C + 0.5 * (q1c + q2c);

    R.push([Rv, Rc]);
  }

  return R; 
}