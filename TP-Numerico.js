function A1(h, I, D, V, n) {
  var P = 110832;
  var A = 17.32 * (P/3000);
  
  var R = []

  for(let i = 0; i < n; i++) {
    if (i !== 0) V = R[i-1][1];
    if ((i+1)*h > D) I = 0;

    var Ev = V + h*I*A;
    
    R.push([(i+1)*h, Ev])
  }

  return R;
}

function A2(h, I, D, V, C, Qs, n) {
  var P = 110832;

  var A = 17.32 * (P/3000);
  var Vs = 3.5 * A;

  var tk = 1 - (P/140000);
  var Cs = 0.9;

  var R = [];

  for(let i = 0; i < n; i++) {
    if (i !== 0) V = R[i-1][1];
    if (i !== 0) C = R[i-1][2];
    if ((i+1)*h > D) I = 0;

    var Ev = V + h * (C*I*A - Qs);
    var Ec = (C + (h*V/Vs*tk)*Cs) / (1 + (h*V/Vs*tk));

    R.push([(i+1)*h, Ev, Ec]);
  }

  return R; 
}

function B(h, I, D, V, C, Qm, n, T) {
  var P = 110832;

  var A = 17.32 * (P/3000);
  var Vs = 3.5 * A;

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

    var dH = Hs - (V/A);
    var Qs = Qm * Math.sqrt((Ha - dH) / (Ha - Hi));

    var Ev = V + h * (C*I*A - Qs);
    var Ec = (C + (h*V/Vs*tk)*Cs) / (1 + (h*V/Vs*tk));
    
    if (T === 0) R.push([(i+1)*h, Ev, Ec, Ev/A]);
    if (T === 1) R.push([(i+1)*h, Ev, Ec]);
  }

  return R;
}

function C(h, I, D, V, C, Qm, n) {
  var P = 110832;

  var A = 17.32 * (P/3000);
  var Vs = 3.5 * A;

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

    var dH = Hs - (V/A);
    var Qs = Qm * Math.sqrt((Ha - dH) / (Ha - Hi));

    var q1v = h * (C*I*A - Qs);
    var q2v = h * (C*I*A + q1v - Qs);
    var Rv = V + 0.5 * (q1v + q2v);

    var q1c = (h*V/Vs*tk) * (Cs - C);
    var q2c = (h*V/Vs*tk) * (Cs - q1c - C);
    var Rc = C + 0.5 * (q1c + q2c);

    R.push([Rv, Rc]);
  }

  return R; 
}