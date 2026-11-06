let FS = `precision highp float;
uniform vec2 R;
uniform float T;
float S,K,X,A,Y,Z;
mat2 r(float a){return mat2(cos(a),sin(a),-sin(a),cos(a));}
float L(vec2 p){
  vec2 q=vec2(abs(p.x),p.y),b=abs(p-vec2(2.69,-2.76))-vec2(.5,1.24)*K;
  float o=max(max(.57-q.x,-3.14-q.y),.694*q.x+.72*q.y-3.276);
  return min(max(o,-o-S),p.x>0.?length(max(b,0.))+min(max(b.x,b.y),0.):9.);
}
float l(vec2 p,vec2 d,float g){return smoothstep(X,0.,abs(p.x*d.y-p.y*d.x))*step(abs(dot(p,d)),g);}
float M(vec3 p){
  p.xz*=r(A);p.yz*=r(Y);
  vec2 w=vec2(L(p.xy),abs(p.z)-Z);
  return min(max(w.x,w.y),0.)+length(max(w,0.));
}
vec3 V;float g;
float H(vec3 o,vec3 d){float z=0.,e;for(int i=0;i<99;i++){e=M(o+d*z);g+=.01/(1.+e*e*30.);if(e<.001||z>60.)break;z+=e*.8;}return z;}
float D(vec3 p){float s=1.,z=.05,h;for(int i=0;i<40;i++){h=M(p+V*z);s=min(s,8.*h/z);z+=clamp(h,.02,.5);if(h<.001||z>20.)break;}return clamp(s,0.,1.);}
float N(vec3 p,vec3 d){
  vec2 k=vec2(.002,0);
  vec3 n=normalize(vec3(M(p+k.xyy)-M(p-k.xyy),M(p+k.yxy)-M(p-k.yxy),M(p+k.yyx)-M(p-k.yyx)));
  float a=0.;for(float i=1.;i<6.;i++)a+=(i*.1-M(p+n*i*.1))/i;
  return (.1+.9*max(dot(n,V),0.)*D(p+n*.01))*clamp(1.-a,0.,1.)+pow(1.-abs(dot(n,d)),4.)*.5+pow(max(dot(n,-V.zyx),0.),8.)*.4;
}
void main(){
  vec2 v=(gl_FragCoord.xy-.5*R)/min(R.x*.8,R.y),u=v*12.-vec2(0,1);
  float t=T,c=0.,s=t-16.,h=sin(clamp((s-1.)/13.,0.,1.)*3.1416);
  X=18./min(R.x*.8,R.y);S=1.;K=1.;
  if(t>16.&&t<32.){
    float w=smoothstep(0.,3.,s)*smoothstep(16.,13.,s);
    A=6.2832*smoothstep(1.,14.,s);Y=sin(A)*.3;Z=.6*w;
    vec3 o=vec3(0,-1,-16.8-Z-h*h*8.),d=normalize(vec3(v,1.4)),p;
    V=normalize(vec3(sin(t*.5),1.,-.6));
    float z=H(o,d),f=(-4.8-o.y)/d.y,q;
    if(f>0.&&f<z){
      p=o+d*f;d=reflect(d,vec3(0,1,0));q=H(p,d);
      c=w*exp(-f*.04)*(.04*D(p)+pow(max(dot(d,V),0.),30.)*.25*D(p)+(q<60.?N(p+d*q,d)*.3:0.));
    }else if(z<60.)c=mix(1.,N(o+d*z,d),w);
    c=mix(smoothstep(X,0.,L(u)),c+g*.3*w,smoothstep(0.,1.,s)*smoothstep(16.,15.,s));
  }else if(t<32.){
    S=K=smoothstep(8.5,12.,t);
    vec2 q=vec2(abs(u.x),u.y)-vec2(.57,-3.14);
    float g=smoothstep(3.5,7.5,t)*25.,f=smoothstep(5.5,8.5,t)*25.,a=atan(q.y,q.x);
    c=(l(q,vec2(0,1),g)+l(q,vec2(1,0),g)+l(q-vec2(0,7.14),vec2(.72,-.694),g)
      +(l(q-1.,vec2(0,1),f)+l(q-1.,vec2(1,0),f)+l(q-vec2(0,5.75),vec2(.72,-.694),f))*.6
      +smoothstep(X,0.,abs(length(q)-7.14))*step(0.,a)*step(a,smoothstep(4.5,8.5,t)*1.6)
      +smoothstep(X,0.,abs(max(abs(q.x-.25),abs(q.y-.25))-.25))*step(4.5,t)
    )*.45*(1.-smoothstep(12.,14.,t));
    c=max(c,smoothstep(X,0.,length(u-vec2(2.69,-2.76))-.04)*smoothstep(0.,.5,t));
    c=max(c,smoothstep(X,0.,L(u))*smoothstep(7.5,8.5,t));
  }else c=smoothstep(X,0.,L(u));
  c+=(fract(sin(dot(gl_FragCoord.xy+t,vec2(12.9,78.2)))*43758.)-.5)*.06;
  gl_FragColor=vec4(vec3(c*smoothstep(42.,38.,t)),1);
}`;

let G = c.getContext('webgl'), P = G.createProgram(), Q = 44100, N = Q * 42, W = Math, U, t0;

[[35633, 'attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}'], [35632, FS]].map(([k, s]) => {
  let h = G.createShader(k);
  G.shaderSource(h, s);
  G.compileShader(h);
  G.attachShader(P, h);
});
G.linkProgram(P);
G.useProgram(P);
G.bindBuffer(34962, G.createBuffer());
G.bufferData(34962, new Float32Array([-1, -1, 3, -1, -1, 3]), 35044);
G.enableVertexAttribArray(0);
G.vertexAttribPointer(0, 2, 5126, 0, 0, 0);

let sm = (a, b, x) => (x = W.min(W.max((x - a) / (b - a), 0), 1)) * x * (3 - 2 * x);

let frame = () => {
  let t = U.currentTime - t0, n = W.min(11, (t - 34) / .35 + 1 | 0);
  c.width = innerWidth;
  c.height = innerHeight;
  G.viewport(0, 0, c.width, c.height);
  G.uniform2f(G.getUniformLocation(P, 'R'), c.width, c.height);
  G.uniform1f(G.getUniformLocation(P, 'T'), t);
  G.drawArrays(4, 0, 3);
  d.style.opacity = sm(42, 38, t);
  d.textContent = t > 34 && t < 42 ? ('deadquiet42'.slice(0, n) + (t * 2 % 1 < .5 ? '_' : '\xa0')).padEnd(12, '\xa0') : '';
  if (t > 42 && document.fullscreenElement) document.exitFullscreen();
  requestAnimationFrame(frame);
};

onclick = () => {
  if (U) return;
  U = new AudioContext;
  let b = U.createBuffer(2, N, Q), L = b.getChannelData(0), R = b.getChannelData(1), i, t, T = 2 * W.PI, x, y, z, k, e;
  let hh = n => W.abs(W.sin(n * 127.1) * 43758.5 % 1),
    F = [73.42, 73.42, 110, 110, 174.61, 174.61, 220, 329.63, 36.71], ph = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    D = Q * .51 | 0, j, v, n, f, s, hz = 0, lp = 0;
  for (i = 0; i < N; i++) {
    t = i / Q;
    z = W.random() - .5;
    if (i % 6 == 0) hz = z;
    x = y = 0;
    e = [sm(2.5, 5.5, t) * .11, sm(2.5, 5.5, t) * .11, sm(6, 11, t) * .12, sm(6, 11, t) * .12, sm(9, 14, t) * .09, sm(9, 14, t) * .09, sm(12, 17, t) * .07, sm(30, 36, t) * .06, sm(16, 20, t) * sm(33, 29, t) * .1];
    for (j = 0; j < 9; j++) {
      ph[j] += (F[j] * (1 + .004 * W.sin(t * 4.1) + .0015 * W.sin(t * 31)) + (j & 1) * .4 * sm(3.5, 7, t)) / Q;
      v = W.tanh((1.2 + 2 * sm(14, 24, t) * sm(36, 28, t)) * W.sin(T * ph[j])) * e[j];
      j > 7 ? (x += v, y += v) : j & 1 ? y += v : x += v;
    }
    lp += (z - lp) * .04;
    x += lp * .12 * sm(1, 4, t);
    y -= lp * .12 * sm(1, 4, t);
    s = t * 12; n = s | 0; e = s % 1 / 12;
    if (t > 3.5 && t < 9 && hh(n) < .35) k = W.sin(T * (1500 + hh(n + 7) * 2500) * e) * W.exp(-e * 400) * .2, n & 1 ? x += k : y += k;
    s = t / .34; n = s | 0; e = s % 1 * .34;
    if (t > 7 && t < 35 && hh(n) < (t > 16 && t < 32 ? .2 : .12)) {
      f = [293.66, 349.23, 392, 440, 523.25, 587.33][hh(n + 1) * 6 | 0] * (hh(n + 3) < .3 ? .5 : 1);
      k = W.sin(T * f * e + 1.5 * W.sin(T * f * 3.01 * e) * W.exp(-e * 8)) * W.exp(-e * 6) * .1;
      hh(n + 2) < .5 ? x += k : y += k;
    }
    if (t > 34 && t < 37.85) e = (t - 34) % .35, x += k = hz * W.exp(-e * 300) * .4, y += k;
    if (i > D) x += R[i - D] * .45, y += L[i - D] * .45;
    L[i] = W.tanh(x) * sm(42, 38, t);
    R[i] = W.tanh(y) * sm(42, 38, t);
  }
  x = U.createBufferSource();
  x.buffer = b;
  x.connect(U.destination);
  x.start();
  t0 = U.currentTime;
  document.body.requestFullscreen?.();
  frame();
};
