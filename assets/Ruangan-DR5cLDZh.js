import{a as x,j as m,c as sa}from"./index-DoqhxR9r.js";import{h as la,e as Ur,u as ca,a as ua,b as da,c as fa,d as ha,f as pa,E as ma,B as va,i as ga,T as wa,g as Te,j as ln,D as Vn,V as oe,k as He,P as rn,O as Wt,R as ya,M as cn,I as xa,S as $t,l as dr,Q as fr,m as kt,n as Ft,o as ba,p as Ea,q as Dr,H as Qe,F as pt,r as Nt,L as ct,s as on,t as _a,v as Sa,w as hr,x as Nn,y as zt,W as Ma,z as Kn,A as Pr,U as pr,C as mr,G as Xt,J as Aa,K as Ia,N as Ta,X as Lr,Y as bt,Z as jr,_ as qn,$ as _n,a0 as Sn,a1 as Ca,a2 as Ra,a3 as Qn,a4 as Yt,a5 as Oa,a6 as Ua,a7 as Da,a8 as Pa,a9 as La,aa as zn,ab as ja,ac as ka,ad as vr,ae as Fa,af as En,ag as Ba,ah as Mn,ai as Na,aj as za,ak as Ha,al as Ga,am as Wa,an as Hn,ao as Za,ap as $a,aq as Ya,ar as kr,as as Ht,at as Fe,au as Fr,av as Xa,aw as Va,ax as gr,ay as Ka,az as wr,aA as qa,aB as Qa,aC as yr,aD as Ja}from"./Demo-DF5hqDT1.js";function xr(a,e){let r;return(...t)=>{window.clearTimeout(r),r=window.setTimeout(()=>a(...t),e)}}function ei({debounce:a,scroll:e,polyfill:r,offsetSize:t}={debounce:0,scroll:!1,offsetSize:!1}){const o=r||(typeof window>"u"?class{}:window.ResizeObserver);if(!o)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");const[s,u]=x.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),l=x.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:s,orientationHandler:null}),d=a?typeof a=="number"?a:a.scroll:null,h=a?typeof a=="number"?a:a.resize:null,v=x.useRef(!1);x.useEffect(()=>(v.current=!0,()=>{v.current=!1}));const[g,b,U]=x.useMemo(()=>{const S=()=>{if(!l.current.element)return;const{left:z,top:I,width:L,height:N,bottom:M,right:$,x:E,y:_}=l.current.element.getBoundingClientRect(),P={left:z,top:I,width:L,height:N,bottom:M,right:$,x:E,y:_};l.current.element instanceof HTMLElement&&t&&(P.height=l.current.element.offsetHeight,P.width=l.current.element.offsetWidth),Object.freeze(P),v.current&&!ai(l.current.lastBounds,P)&&u(l.current.lastBounds=P)};return[S,h?xr(S,h):S,d?xr(S,d):S]},[u,t,d,h]);function D(){l.current.scrollContainers&&(l.current.scrollContainers.forEach(S=>S.removeEventListener("scroll",U,!0)),l.current.scrollContainers=null),l.current.resizeObserver&&(l.current.resizeObserver.disconnect(),l.current.resizeObserver=null),l.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",l.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",l.current.orientationHandler))}function H(){l.current.element&&(l.current.resizeObserver=new o(U),l.current.resizeObserver.observe(l.current.element),e&&l.current.scrollContainers&&l.current.scrollContainers.forEach(S=>S.addEventListener("scroll",U,{capture:!0,passive:!0})),l.current.orientationHandler=()=>{U()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",l.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",l.current.orientationHandler))}const A=S=>{!S||S===l.current.element||(D(),l.current.element=S,l.current.scrollContainers=Br(S),H())};return ni(U,!!e),ti(b),x.useEffect(()=>{D(),H()},[e,U,b]),x.useEffect(()=>D,[]),[A,s,g]}function ti(a){x.useEffect(()=>{const e=a;return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[a])}function ni(a,e){x.useEffect(()=>{if(e){const r=a;return window.addEventListener("scroll",r,{capture:!0,passive:!0}),()=>{window.removeEventListener("scroll",r,!0)}}},[a,e])}function Br(a){const e=[];if(!a||a===document.body)return e;const{overflow:r,overflowX:t,overflowY:o}=window.getComputedStyle(a);return[r,t,o].some(s=>s==="auto"||s==="scroll")&&e.push(a),[...e,...Br(a.parentElement)]}const ri=["x","y","top","bottom","left","right","width","height"],ai=(a,e)=>ri.every(r=>a[r]===e[r]);function ii({ref:a,children:e,fallback:r,resize:t,style:o,gl:s,events:u=pa,eventSource:l,eventPrefix:d,shadows:h,linear:v,flat:g,legacy:b,orthographic:U,frameloop:D,dpr:H,performance:A,raycaster:S,camera:z,scene:I,onPointerMissed:L,onCreated:N,...M}){x.useMemo(()=>Ur(wa),[]);const $=ca(),[E,_]=ei({scroll:!0,debounce:{scroll:50,resize:0},...t}),P=x.useRef(null),X=x.useRef(null);x.useImperativeHandle(a,()=>P.current);const te=ua(L),ee=x.useCallback(he=>te.current==null?void 0:te.current(he),[te]),[W,J]=x.useState(!1),[q,de]=x.useState(!1);if(W)throw W;if(q)throw q;const ce=x.useRef(null),[Ee,re]=da(),we=x.useRef(null),se=()=>l?ga(l)?l.current:l:X.current;x.useInsertionEffect(()=>()=>{const he=ce.current;ce.current=null,he?.unmount()},[]),fa(()=>{const he=P.current;_.width>0&&_.height>0&&he&&(ce.current||(ce.current=ha(he)),ce.current.configure({gl:s,scene:I,events:u,shadows:h,linear:v,flat:g,legacy:b,orthographic:U,frameloop:D,dpr:H,performance:A,raycaster:S,camera:z,size:_,onPointerMissed:ee,onCreated:ye=>{var ae;we.current=ye,ye.events.connect==null||ye.events.connect((ae=se())!=null?ae:X.current),d&&ye.setEvents({compute:(je,_e)=>{const mt=je[d+"X"],Ce=je[d+"Y"];_e.pointer.set(mt/_e.size.width*2-1,-(Ce/_e.size.height)*2+1),_e.raycaster.setFromCamera(_e.pointer,_e.camera)}}),N?.(ye)}}).catch(de),ce.current.ready.status==="fulfilled"?ce.current.render(m.jsx($,{children:m.jsx(ma,{set:de,children:m.jsx(x.Suspense,{fallback:m.jsx(va,{set:J}),children:e??null})})})):ce.current.ready.status==="pending"&&re(ce.current.ready))}),x.useEffect(()=>{var he;const ye=(he=we.current)==null?void 0:he.get(),ae=se();ye&&ae&&ye.events.connected!==ae&&(ye.events.connect==null||ye.events.connect(ae))}),x.useEffect(()=>{const he=P.current;return()=>{var ye;he.isConnected||(ye=ce.current)==null||ye.unmount()}},[]);const fe=l?"none":"auto";return m.jsxs("div",{ref:X,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:fe,...o},...M,children:[m.jsx("div",{ref:E,style:{width:"100%",height:"100%"},children:m.jsx("canvas",{ref:P,style:{display:"block"},children:r})}),Ee]})}function oi(a){return m.jsx(la,{children:m.jsx(ii,{...a})})}function ut(){return ut=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)({}).hasOwnProperty.call(r,t)&&(a[t]=r[t])}return a},ut.apply(null,arguments)}const un=new oe,Jn=new oe,si=new oe,br=new He;function li(a,e,r){const t=un.setFromMatrixPosition(a.matrixWorld);t.project(e);const o=r.width/2,s=r.height/2;return[t.x*o+o,-(t.y*s)+s]}function ci(a,e){const r=un.setFromMatrixPosition(a.matrixWorld),t=Jn.setFromMatrixPosition(e.matrixWorld),o=r.sub(t),s=e.getWorldDirection(si);return o.angleTo(s)>Math.PI/2}function ui(a,e,r,t){const o=un.setFromMatrixPosition(a.matrixWorld),s=o.clone();s.project(e),br.set(s.x,s.y),r.setFromCamera(br,e);const u=r.intersectObjects(t,!0);if(u.length){const l=u[0].distance;return o.distanceTo(r.ray.origin)<l}return!0}function di(a,e){if(e instanceof Wt)return e.zoom;if(e instanceof rn){const r=un.setFromMatrixPosition(a.matrixWorld),t=Jn.setFromMatrixPosition(e.matrixWorld),o=e.fov*Math.PI/180,s=r.distanceTo(t);return 1/(2*Math.tan(o/2)*s)}else return 1}function fi(a,e,r){if(e instanceof rn||e instanceof Wt){const t=un.setFromMatrixPosition(a.matrixWorld),o=Jn.setFromMatrixPosition(e.matrixWorld),s=t.distanceTo(o),u=(r[1]-r[0])/(e.far-e.near),l=r[1]-u*e.far;return Math.round(u*s+l)}}const Gn=a=>Math.abs(a)<1e-10?0:a;function Nr(a,e,r=""){let t="matrix3d(";for(let o=0;o!==16;o++)t+=Gn(e[o]*a.elements[o])+(o!==15?",":")");return r+t}const hi=(a=>e=>Nr(e,a))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),pi=(a=>(e,r)=>Nr(e,a(r),"translate(-50%,-50%)"))(a=>[1/a,1/a,1/a,1,-1/a,-1/a,-1/a,-1,1/a,1/a,1/a,1,1,1,1,1]);function mi(a){return a&&typeof a=="object"&&"current"in a}const zr=x.forwardRef(({children:a,eps:e=.001,style:r,className:t,prepend:o,center:s,fullscreen:u,portal:l,distanceFactor:d,sprite:h=!1,transform:v=!1,occlude:g,onOcclude:b,castShadow:U,receiveShadow:D,material:H,geometry:A,zIndexRange:S=[16777271,0],calculatePosition:z=li,as:I="div",wrapperClass:L,pointerEvents:N="auto",...M},$)=>{const{gl:E,camera:_,scene:P,size:X,raycaster:te,events:ee,viewport:W}=Te(),[J]=x.useState(()=>document.createElement(I)),q=x.useRef(null),de=x.useRef(null),ce=x.useRef(0),Ee=x.useRef([0,0]),re=x.useRef(null),we=x.useRef(null),se=l?.current||ee.connected||E.domElement.parentNode,fe=x.useRef(null),he=x.useRef(!1),ye=x.useMemo(()=>g&&g!=="blending"||Array.isArray(g)&&g.length&&mi(g[0]),[g]);x.useLayoutEffect(()=>{const Ce=E.domElement;g&&g==="blending"?(Ce.style.zIndex=`${Math.floor(S[0]/2)}`,Ce.style.position="absolute",Ce.style.pointerEvents="none"):(Ce.style.zIndex=null,Ce.style.position=null,Ce.style.pointerEvents=null)},[g]),x.useLayoutEffect(()=>{if(de.current){const Ce=q.current=sa.createRoot(J);if(P.updateMatrixWorld(),v)J.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const pe=z(de.current,_,X);J.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${pe[0]}px,${pe[1]}px,0);transform-origin:0 0;`}return se&&(o?se.prepend(J):se.appendChild(J)),()=>{se&&se.removeChild(J),Ce.unmount()}}},[se,v]),x.useLayoutEffect(()=>{L&&(J.className=L)},[L]);const ae=x.useMemo(()=>v?{position:"absolute",top:0,left:0,width:X.width,height:X.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:s?"translate3d(-50%,-50%,0)":"none",...u&&{top:-X.height/2,left:-X.width/2,width:X.width,height:X.height},...r},[r,s,u,X,v]),je=x.useMemo(()=>({position:"absolute",pointerEvents:N}),[N]);x.useLayoutEffect(()=>{if(he.current=!1,v){var Ce;(Ce=q.current)==null||Ce.render(x.createElement("div",{ref:re,style:ae},x.createElement("div",{ref:we,style:je},x.createElement("div",{ref:$,className:t,style:r,children:a}))))}else{var pe;(pe=q.current)==null||pe.render(x.createElement("div",{ref:$,style:ae,className:t,children:a}))}});const _e=x.useRef(!0);ln(Ce=>{if(de.current){_.updateMatrixWorld(),de.current.updateWorldMatrix(!0,!1);const pe=v?Ee.current:z(de.current,_,X);if(v||Math.abs(ce.current-_.zoom)>e||Math.abs(Ee.current[0]-pe[0])>e||Math.abs(Ee.current[1]-pe[1])>e){const We=ci(de.current,_);let Be=!1;ye&&(Array.isArray(g)?Be=g.map(Ze=>Ze.current):g!=="blending"&&(Be=[P]));const Je=_e.current;if(Be){const Ze=ui(de.current,_,te,Be);_e.current=Ze&&!We}else _e.current=!We;Je!==_e.current&&(b?b(!_e.current):J.style.display=_e.current?"block":"none");const dt=Math.floor(S[0]/2),Vt=g?ye?[S[0],dt]:[dt-1,0]:S;if(J.style.zIndex=`${fi(de.current,_,Vt)}`,v){const[Ze,_t]=[X.width/2,X.height/2],vt=_.projectionMatrix.elements[5]*_t,{isOrthographicCamera:Ot,top:Kt,left:Ut,bottom:gt,right:ft}=_,St=hi(_.matrixWorldInverse),qt=Ot?`scale(${vt})translate(${Gn(-(ft+Ut)/2)}px,${Gn((Kt+gt)/2)}px)`:`translateZ(${vt}px)`;let $e=de.current.matrixWorld;h&&($e=_.matrixWorldInverse.clone().transpose().copyPosition($e).scale(de.current.scale),$e.elements[3]=$e.elements[7]=$e.elements[11]=0,$e.elements[15]=1),J.style.width=X.width+"px",J.style.height=X.height+"px",J.style.perspective=Ot?"":`${vt}px`,re.current&&we.current&&(re.current.style.transform=`${qt}${St}translate(${Ze}px,${_t}px)`,we.current.style.transform=pi($e,1/((d||10)/400)))}else{const Ze=d===void 0?1:di(de.current,_)*d;J.style.transform=`translate3d(${pe[0]}px,${pe[1]}px,0) scale(${Ze})`}Ee.current=pe,ce.current=_.zoom}}if(!ye&&fe.current&&!he.current)if(v){if(re.current){const pe=re.current.children[0];if(pe!=null&&pe.clientWidth&&pe!=null&&pe.clientHeight){const{isOrthographicCamera:We}=_;if(We||A)M.scale&&(Array.isArray(M.scale)?M.scale instanceof oe?fe.current.scale.copy(M.scale.clone().divideScalar(1)):fe.current.scale.set(1/M.scale[0],1/M.scale[1],1/M.scale[2]):fe.current.scale.setScalar(1/M.scale));else{const Be=(d||10)/400,Je=pe.clientWidth*Be,dt=pe.clientHeight*Be;fe.current.scale.set(Je,dt,1)}he.current=!0}}}else{const pe=J.children[0];if(pe!=null&&pe.clientWidth&&pe!=null&&pe.clientHeight){const We=1/W.factor,Be=pe.clientWidth*We,Je=pe.clientHeight*We;fe.current.scale.set(Be,Je,1),he.current=!0}fe.current.lookAt(Ce.camera.position)}});const mt=x.useMemo(()=>({vertexShader:v?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[v]);return x.createElement("group",ut({},M,{ref:de}),g&&!ye&&x.createElement("mesh",{castShadow:U,receiveShadow:D,ref:fe},A||x.createElement("planeGeometry",null),H||x.createElement("shaderMaterial",{side:Vn,vertexShader:mt.vertexShader,fragmentShader:mt.fragmentShader})))}),An=parseInt(ya.replace(/\D+/g,"")),Hr=An>=125?"uv1":"uv2";var qe=Uint8Array,Et=Uint16Array,Wn=Uint32Array,Gr=new qe([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Wr=new qe([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),vi=new qe([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Zr=function(a,e){for(var r=new Et(31),t=0;t<31;++t)r[t]=e+=1<<a[t-1];for(var o=new Wn(r[30]),t=1;t<30;++t)for(var s=r[t];s<r[t+1];++s)o[s]=s-r[t]<<5|t;return[r,o]},$r=Zr(Gr,2),Yr=$r[0],gi=$r[1];Yr[28]=258,gi[258]=28;var wi=Zr(Wr,0),yi=wi[0],Zn=new Et(32768);for(var Me=0;Me<32768;++Me){var yt=(Me&43690)>>>1|(Me&21845)<<1;yt=(yt&52428)>>>2|(yt&13107)<<2,yt=(yt&61680)>>>4|(yt&3855)<<4,Zn[Me]=((yt&65280)>>>8|(yt&255)<<8)>>>1}var an=(function(a,e,r){for(var t=a.length,o=0,s=new Et(e);o<t;++o)++s[a[o]-1];var u=new Et(e);for(o=0;o<e;++o)u[o]=u[o-1]+s[o-1]<<1;var l;if(r){l=new Et(1<<e);var d=15-e;for(o=0;o<t;++o)if(a[o])for(var h=o<<4|a[o],v=e-a[o],g=u[a[o]-1]++<<v,b=g|(1<<v)-1;g<=b;++g)l[Zn[g]>>>d]=h}else for(l=new Et(t),o=0;o<t;++o)a[o]&&(l[o]=Zn[u[a[o]-1]++]>>>15-a[o]);return l}),dn=new qe(288);for(var Me=0;Me<144;++Me)dn[Me]=8;for(var Me=144;Me<256;++Me)dn[Me]=9;for(var Me=256;Me<280;++Me)dn[Me]=7;for(var Me=280;Me<288;++Me)dn[Me]=8;var Xr=new qe(32);for(var Me=0;Me<32;++Me)Xr[Me]=5;var xi=an(dn,9,1),bi=an(Xr,5,1),Rn=function(a){for(var e=a[0],r=1;r<a.length;++r)a[r]>e&&(e=a[r]);return e},nt=function(a,e,r){var t=e/8|0;return(a[t]|a[t+1]<<8)>>(e&7)&r},On=function(a,e){var r=e/8|0;return(a[r]|a[r+1]<<8|a[r+2]<<16)>>(e&7)},Ei=function(a){return(a/8|0)+(a&7&&1)},_i=function(a,e,r){(r==null||r>a.length)&&(r=a.length);var t=new(a instanceof Et?Et:a instanceof Wn?Wn:qe)(r-e);return t.set(a.subarray(e,r)),t},Si=function(a,e,r){var t=a.length;if(!t||r&&!r.l&&t<5)return e||new qe(0);var o=!e||r,s=!r||r.i;r||(r={}),e||(e=new qe(t*3));var u=function(ae){var je=e.length;if(ae>je){var _e=new qe(Math.max(je*2,ae));_e.set(e),e=_e}},l=r.f||0,d=r.p||0,h=r.b||0,v=r.l,g=r.d,b=r.m,U=r.n,D=t*8;do{if(!v){r.f=l=nt(a,d,1);var H=nt(a,d+1,3);if(d+=3,H)if(H==1)v=xi,g=bi,b=9,U=5;else if(H==2){var I=nt(a,d,31)+257,L=nt(a,d+10,15)+4,N=I+nt(a,d+5,31)+1;d+=14;for(var M=new qe(N),$=new qe(19),E=0;E<L;++E)$[vi[E]]=nt(a,d+E*3,7);d+=L*3;for(var _=Rn($),P=(1<<_)-1,X=an($,_,1),E=0;E<N;){var te=X[nt(a,d,P)];d+=te&15;var A=te>>>4;if(A<16)M[E++]=A;else{var ee=0,W=0;for(A==16?(W=3+nt(a,d,3),d+=2,ee=M[E-1]):A==17?(W=3+nt(a,d,7),d+=3):A==18&&(W=11+nt(a,d,127),d+=7);W--;)M[E++]=ee}}var J=M.subarray(0,I),q=M.subarray(I);b=Rn(J),U=Rn(q),v=an(J,b,1),g=an(q,U,1)}else throw"invalid block type";else{var A=Ei(d)+4,S=a[A-4]|a[A-3]<<8,z=A+S;if(z>t){if(s)throw"unexpected EOF";break}o&&u(h+S),e.set(a.subarray(A,z),h),r.b=h+=S,r.p=d=z*8;continue}if(d>D){if(s)throw"unexpected EOF";break}}o&&u(h+131072);for(var de=(1<<b)-1,ce=(1<<U)-1,Ee=d;;Ee=d){var ee=v[On(a,d)&de],re=ee>>>4;if(d+=ee&15,d>D){if(s)throw"unexpected EOF";break}if(!ee)throw"invalid length/literal";if(re<256)e[h++]=re;else if(re==256){Ee=d,v=null;break}else{var we=re-254;if(re>264){var E=re-257,se=Gr[E];we=nt(a,d,(1<<se)-1)+Yr[E],d+=se}var fe=g[On(a,d)&ce],he=fe>>>4;if(!fe)throw"invalid distance";d+=fe&15;var q=yi[he];if(he>3){var se=Wr[he];q+=On(a,d)&(1<<se)-1,d+=se}if(d>D){if(s)throw"unexpected EOF";break}o&&u(h+131072);for(var ye=h+we;h<ye;h+=4)e[h]=e[h-q],e[h+1]=e[h+1-q],e[h+2]=e[h+2-q],e[h+3]=e[h+3-q];h=ye}}r.l=v,r.p=Ee,r.b=h,v&&(l=1,r.m=b,r.d=g,r.n=U)}while(!l);return h==e.length?e:_i(e,0,h)},Mi=new qe(0),Ai=function(a){if((a[0]&15)!=8||a[0]>>>4>7||(a[0]<<8|a[1])%31)throw"invalid zlib data";if(a[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function mn(a,e){return Si((Ai(a),a.subarray(2,-4)),e)}var Ii=typeof TextDecoder<"u"&&new TextDecoder,Ti=0;try{Ii.decode(Mi,{stream:!0}),Ti=1}catch{}const Ci=a=>a&&a.isCubeTexture;class Ri extends cn{constructor(e,r){var t,o;const s=Ci(e),l=((o=s?(t=e.image[0])==null?void 0:t.width:e.image.width)!=null?o:1024)/4,d=Math.floor(Math.log2(l)),h=Math.pow(2,d),v=3*Math.max(h,112),g=4*h,b=[s?"#define ENVMAP_TYPE_CUBE":"",`#define CUBEUV_TEXEL_WIDTH ${1/v}`,`#define CUBEUV_TEXEL_HEIGHT ${1/g}`,`#define CUBEUV_MAX_MIP ${d}.0`],U=`
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,D=b.join(`
`)+`
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${An>=154?"colorspace_fragment":"encodings_fragment"}>
        }
        `,H={map:{value:e},height:{value:r?.height||15},radius:{value:r?.radius||100}},A=new xa(1,16),S=new $t({uniforms:H,fragmentShader:D,vertexShader:U,side:Vn});super(A,S)}set radius(e){this.material.uniforms.radius.value=e}get radius(){return this.material.uniforms.radius.value}set height(e){this.material.uniforms.height.value=e}get height(){return this.material.uniforms.height.value}}var Oi=Object.defineProperty,Ui=(a,e,r)=>e in a?Oi(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r,Di=(a,e,r)=>(Ui(a,e+"",r),r);class Pi{constructor(){Di(this,"_listeners")}addEventListener(e,r){this._listeners===void 0&&(this._listeners={});const t=this._listeners;t[e]===void 0&&(t[e]=[]),t[e].indexOf(r)===-1&&t[e].push(r)}hasEventListener(e,r){if(this._listeners===void 0)return!1;const t=this._listeners;return t[e]!==void 0&&t[e].indexOf(r)!==-1}removeEventListener(e,r){if(this._listeners===void 0)return;const o=this._listeners[e];if(o!==void 0){const s=o.indexOf(r);s!==-1&&o.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const o=t.slice(0);for(let s=0,u=o.length;s<u;s++)o[s].call(this,e);e.target=null}}}var Li=Object.defineProperty,ji=(a,e,r)=>e in a?Li(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r,K=(a,e,r)=>(ji(a,typeof e!="symbol"?e+"":e,r),r);const vn=new ba,Er=new Ea,ki=Math.cos(70*(Math.PI/180)),_r=(a,e)=>(a%e+e)%e;let Fi=class extends Pi{constructor(e,r){super(),K(this,"object"),K(this,"domElement"),K(this,"enabled",!0),K(this,"target",new oe),K(this,"minDistance",0),K(this,"maxDistance",1/0),K(this,"minZoom",0),K(this,"maxZoom",1/0),K(this,"minPolarAngle",0),K(this,"maxPolarAngle",Math.PI),K(this,"minAzimuthAngle",-1/0),K(this,"maxAzimuthAngle",1/0),K(this,"enableDamping",!1),K(this,"dampingFactor",.05),K(this,"enableZoom",!0),K(this,"zoomSpeed",1),K(this,"enableRotate",!0),K(this,"rotateSpeed",1),K(this,"enablePan",!0),K(this,"panSpeed",1),K(this,"screenSpacePanning",!0),K(this,"keyPanSpeed",7),K(this,"zoomToCursor",!1),K(this,"autoRotate",!1),K(this,"autoRotateSpeed",2),K(this,"reverseOrbit",!1),K(this,"reverseHorizontalOrbit",!1),K(this,"reverseVerticalOrbit",!1),K(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),K(this,"mouseButtons",{LEFT:kt.ROTATE,MIDDLE:kt.DOLLY,RIGHT:kt.PAN}),K(this,"touches",{ONE:Ft.ROTATE,TWO:Ft.DOLLY_PAN}),K(this,"target0"),K(this,"position0"),K(this,"zoom0"),K(this,"_domElementKeyEvents",null),K(this,"getPolarAngle"),K(this,"getAzimuthalAngle"),K(this,"setPolarAngle"),K(this,"setAzimuthalAngle"),K(this,"getDistance"),K(this,"getZoomScale"),K(this,"listenToKeyEvents"),K(this,"stopListenToKeyEvents"),K(this,"saveState"),K(this,"reset"),K(this,"update"),K(this,"connect"),K(this,"dispose"),K(this,"dollyIn"),K(this,"dollyOut"),K(this,"getScale"),K(this,"setScale"),this.object=e,this.domElement=r,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>v.phi,this.getAzimuthalAngle=()=>v.theta,this.setPolarAngle=f=>{let C=_r(f,2*Math.PI),Z=v.phi;Z<0&&(Z+=2*Math.PI),C<0&&(C+=2*Math.PI);let ue=Math.abs(C-Z);2*Math.PI-ue<ue&&(C<Z?C+=2*Math.PI:Z+=2*Math.PI),g.phi=C-Z,t.update()},this.setAzimuthalAngle=f=>{let C=_r(f,2*Math.PI),Z=v.theta;Z<0&&(Z+=2*Math.PI),C<0&&(C+=2*Math.PI);let ue=Math.abs(C-Z);2*Math.PI-ue<ue&&(C<Z?C+=2*Math.PI:Z+=2*Math.PI),g.theta=C-Z,t.update()},this.getDistance=()=>t.object.position.distanceTo(t.target),this.listenToKeyEvents=f=>{f.addEventListener("keydown",Dt),this._domElementKeyEvents=f},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",Dt),this._domElementKeyEvents=null},this.saveState=()=>{t.target0.copy(t.target),t.position0.copy(t.object.position),t.zoom0=t.object.zoom},this.reset=()=>{t.target.copy(t.target0),t.object.position.copy(t.position0),t.object.zoom=t.zoom0,t.object.updateProjectionMatrix(),t.dispatchEvent(o),t.update(),d=l.NONE},this.update=(()=>{const f=new oe,C=new oe(0,1,0),Z=new fr().setFromUnitVectors(e.up,C),ue=Z.clone().invert(),O=new oe,Ne=new fr,rt=2*Math.PI;return function(){const hn=t.object.position;Z.setFromUnitVectors(e.up,C),ue.copy(Z).invert(),f.copy(hn).sub(t.target),f.applyQuaternion(Z),v.setFromVector3(f),t.autoRotate&&d===l.NONE&&W(te()),t.enableDamping?(v.theta+=g.theta*t.dampingFactor,v.phi+=g.phi*t.dampingFactor):(v.theta+=g.theta,v.phi+=g.phi);let et=t.minAzimuthAngle,tt=t.maxAzimuthAngle;isFinite(et)&&isFinite(tt)&&(et<-Math.PI?et+=rt:et>Math.PI&&(et-=rt),tt<-Math.PI?tt+=rt:tt>Math.PI&&(tt-=rt),et<=tt?v.theta=Math.max(et,Math.min(tt,v.theta)):v.theta=v.theta>(et+tt)/2?Math.max(et,v.theta):Math.min(tt,v.theta)),v.phi=Math.max(t.minPolarAngle,Math.min(t.maxPolarAngle,v.phi)),v.makeSafe(),t.enableDamping===!0?t.target.addScaledVector(U,t.dampingFactor):t.target.add(U),t.zoomToCursor&&_||t.object.isOrthographicCamera?v.radius=fe(v.radius):v.radius=fe(v.radius*b),f.setFromSpherical(v),f.applyQuaternion(ue),hn.copy(t.target).add(f),t.object.matrixAutoUpdate||t.object.updateMatrix(),t.object.lookAt(t.target),t.enableDamping===!0?(g.theta*=1-t.dampingFactor,g.phi*=1-t.dampingFactor,U.multiplyScalar(1-t.dampingFactor)):(g.set(0,0,0),U.set(0,0,0));let At=!1;if(t.zoomToCursor&&_){let It=null;if(t.object instanceof rn&&t.object.isPerspectiveCamera){const Tt=f.length();It=fe(Tt*b);const jt=Tt-It;t.object.position.addScaledVector($,jt),t.object.updateMatrixWorld()}else if(t.object.isOrthographicCamera){const Tt=new oe(E.x,E.y,0);Tt.unproject(t.object),t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/b)),t.object.updateProjectionMatrix(),At=!0;const jt=new oe(E.x,E.y,0);jt.unproject(t.object),t.object.position.sub(jt).add(Tt),t.object.updateMatrixWorld(),It=f.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),t.zoomToCursor=!1;It!==null&&(t.screenSpacePanning?t.target.set(0,0,-1).transformDirection(t.object.matrix).multiplyScalar(It).add(t.object.position):(vn.origin.copy(t.object.position),vn.direction.set(0,0,-1).transformDirection(t.object.matrix),Math.abs(t.object.up.dot(vn.direction))<ki?e.lookAt(t.target):(Er.setFromNormalAndCoplanarPoint(t.object.up,t.target),vn.intersectPlane(Er,t.target))))}else t.object instanceof Wt&&t.object.isOrthographicCamera&&(At=b!==1,At&&(t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/b)),t.object.updateProjectionMatrix()));return b=1,_=!1,At||O.distanceToSquared(t.object.position)>h||8*(1-Ne.dot(t.object.quaternion))>h?(t.dispatchEvent(o),O.copy(t.object.position),Ne.copy(t.object.quaternion),At=!1,!0):!1}})(),this.connect=f=>{t.domElement=f,t.domElement.style.touchAction="none",t.domElement.addEventListener("contextmenu",fn),t.domElement.addEventListener("pointerdown",Ut),t.domElement.addEventListener("pointercancel",ft),t.domElement.addEventListener("wheel",$e)},this.dispose=()=>{var f,C,Z,ue,O,Ne;t.domElement&&(t.domElement.style.touchAction="auto"),(f=t.domElement)==null||f.removeEventListener("contextmenu",fn),(C=t.domElement)==null||C.removeEventListener("pointerdown",Ut),(Z=t.domElement)==null||Z.removeEventListener("pointercancel",ft),(ue=t.domElement)==null||ue.removeEventListener("wheel",$e),(O=t.domElement)==null||O.ownerDocument.removeEventListener("pointermove",gt),(Ne=t.domElement)==null||Ne.ownerDocument.removeEventListener("pointerup",ft),t._domElementKeyEvents!==null&&t._domElementKeyEvents.removeEventListener("keydown",Dt)};const t=this,o={type:"change"},s={type:"start"},u={type:"end"},l={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let d=l.NONE;const h=1e-6,v=new dr,g=new dr;let b=1;const U=new oe,D=new He,H=new He,A=new He,S=new He,z=new He,I=new He,L=new He,N=new He,M=new He,$=new oe,E=new He;let _=!1;const P=[],X={};function te(){return 2*Math.PI/60/60*t.autoRotateSpeed}function ee(){return Math.pow(.95,t.zoomSpeed)}function W(f){t.reverseOrbit||t.reverseHorizontalOrbit?g.theta+=f:g.theta-=f}function J(f){t.reverseOrbit||t.reverseVerticalOrbit?g.phi+=f:g.phi-=f}const q=(()=>{const f=new oe;return function(Z,ue){f.setFromMatrixColumn(ue,0),f.multiplyScalar(-Z),U.add(f)}})(),de=(()=>{const f=new oe;return function(Z,ue){t.screenSpacePanning===!0?f.setFromMatrixColumn(ue,1):(f.setFromMatrixColumn(ue,0),f.crossVectors(t.object.up,f)),f.multiplyScalar(Z),U.add(f)}})(),ce=(()=>{const f=new oe;return function(Z,ue){const O=t.domElement;if(O&&t.object instanceof rn&&t.object.isPerspectiveCamera){const Ne=t.object.position;f.copy(Ne).sub(t.target);let rt=f.length();rt*=Math.tan(t.object.fov/2*Math.PI/180),q(2*Z*rt/O.clientHeight,t.object.matrix),de(2*ue*rt/O.clientHeight,t.object.matrix)}else O&&t.object instanceof Wt&&t.object.isOrthographicCamera?(q(Z*(t.object.right-t.object.left)/t.object.zoom/O.clientWidth,t.object.matrix),de(ue*(t.object.top-t.object.bottom)/t.object.zoom/O.clientHeight,t.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),t.enablePan=!1)}})();function Ee(f){t.object instanceof rn&&t.object.isPerspectiveCamera||t.object instanceof Wt&&t.object.isOrthographicCamera?b=f:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function re(f){Ee(b/f)}function we(f){Ee(b*f)}function se(f){if(!t.zoomToCursor||!t.domElement)return;_=!0;const C=t.domElement.getBoundingClientRect(),Z=f.clientX-C.left,ue=f.clientY-C.top,O=C.width,Ne=C.height;E.x=Z/O*2-1,E.y=-(ue/Ne)*2+1,$.set(E.x,E.y,1).unproject(t.object).sub(t.object.position).normalize()}function fe(f){return Math.max(t.minDistance,Math.min(t.maxDistance,f))}function he(f){D.set(f.clientX,f.clientY)}function ye(f){se(f),L.set(f.clientX,f.clientY)}function ae(f){S.set(f.clientX,f.clientY)}function je(f){H.set(f.clientX,f.clientY),A.subVectors(H,D).multiplyScalar(t.rotateSpeed);const C=t.domElement;C&&(W(2*Math.PI*A.x/C.clientHeight),J(2*Math.PI*A.y/C.clientHeight)),D.copy(H),t.update()}function _e(f){N.set(f.clientX,f.clientY),M.subVectors(N,L),M.y>0?re(ee()):M.y<0&&we(ee()),L.copy(N),t.update()}function mt(f){z.set(f.clientX,f.clientY),I.subVectors(z,S).multiplyScalar(t.panSpeed),ce(I.x,I.y),S.copy(z),t.update()}function Ce(f){se(f),f.deltaY<0?we(ee()):f.deltaY>0&&re(ee()),t.update()}function pe(f){let C=!1;switch(f.code){case t.keys.UP:ce(0,t.keyPanSpeed),C=!0;break;case t.keys.BOTTOM:ce(0,-t.keyPanSpeed),C=!0;break;case t.keys.LEFT:ce(t.keyPanSpeed,0),C=!0;break;case t.keys.RIGHT:ce(-t.keyPanSpeed,0),C=!0;break}C&&(f.preventDefault(),t.update())}function We(){if(P.length==1)D.set(P[0].pageX,P[0].pageY);else{const f=.5*(P[0].pageX+P[1].pageX),C=.5*(P[0].pageY+P[1].pageY);D.set(f,C)}}function Be(){if(P.length==1)S.set(P[0].pageX,P[0].pageY);else{const f=.5*(P[0].pageX+P[1].pageX),C=.5*(P[0].pageY+P[1].pageY);S.set(f,C)}}function Je(){const f=P[0].pageX-P[1].pageX,C=P[0].pageY-P[1].pageY,Z=Math.sqrt(f*f+C*C);L.set(0,Z)}function dt(){t.enableZoom&&Je(),t.enablePan&&Be()}function Vt(){t.enableZoom&&Je(),t.enableRotate&&We()}function Ze(f){if(P.length==1)H.set(f.pageX,f.pageY);else{const Z=Lt(f),ue=.5*(f.pageX+Z.x),O=.5*(f.pageY+Z.y);H.set(ue,O)}A.subVectors(H,D).multiplyScalar(t.rotateSpeed);const C=t.domElement;C&&(W(2*Math.PI*A.x/C.clientHeight),J(2*Math.PI*A.y/C.clientHeight)),D.copy(H)}function _t(f){if(P.length==1)z.set(f.pageX,f.pageY);else{const C=Lt(f),Z=.5*(f.pageX+C.x),ue=.5*(f.pageY+C.y);z.set(Z,ue)}I.subVectors(z,S).multiplyScalar(t.panSpeed),ce(I.x,I.y),S.copy(z)}function vt(f){const C=Lt(f),Z=f.pageX-C.x,ue=f.pageY-C.y,O=Math.sqrt(Z*Z+ue*ue);N.set(0,O),M.set(0,Math.pow(N.y/L.y,t.zoomSpeed)),re(M.y),L.copy(N)}function Ot(f){t.enableZoom&&vt(f),t.enablePan&&_t(f)}function Kt(f){t.enableZoom&&vt(f),t.enableRotate&&Ze(f)}function Ut(f){var C,Z;t.enabled!==!1&&(P.length===0&&((C=t.domElement)==null||C.ownerDocument.addEventListener("pointermove",gt),(Z=t.domElement)==null||Z.ownerDocument.addEventListener("pointerup",ft)),Cn(f),f.pointerType==="touch"?Pt(f):St(f))}function gt(f){t.enabled!==!1&&(f.pointerType==="touch"?Tn(f):qt(f))}function ft(f){var C,Z,ue;Mt(f),P.length===0&&((C=t.domElement)==null||C.releasePointerCapture(f.pointerId),(Z=t.domElement)==null||Z.ownerDocument.removeEventListener("pointermove",gt),(ue=t.domElement)==null||ue.ownerDocument.removeEventListener("pointerup",ft)),t.dispatchEvent(u),d=l.NONE}function St(f){let C;switch(f.button){case 0:C=t.mouseButtons.LEFT;break;case 1:C=t.mouseButtons.MIDDLE;break;case 2:C=t.mouseButtons.RIGHT;break;default:C=-1}switch(C){case kt.DOLLY:if(t.enableZoom===!1)return;ye(f),d=l.DOLLY;break;case kt.ROTATE:if(f.ctrlKey||f.metaKey||f.shiftKey){if(t.enablePan===!1)return;ae(f),d=l.PAN}else{if(t.enableRotate===!1)return;he(f),d=l.ROTATE}break;case kt.PAN:if(f.ctrlKey||f.metaKey||f.shiftKey){if(t.enableRotate===!1)return;he(f),d=l.ROTATE}else{if(t.enablePan===!1)return;ae(f),d=l.PAN}break;default:d=l.NONE}d!==l.NONE&&t.dispatchEvent(s)}function qt(f){if(t.enabled!==!1)switch(d){case l.ROTATE:if(t.enableRotate===!1)return;je(f);break;case l.DOLLY:if(t.enableZoom===!1)return;_e(f);break;case l.PAN:if(t.enablePan===!1)return;mt(f);break}}function $e(f){t.enabled===!1||t.enableZoom===!1||d!==l.NONE&&d!==l.ROTATE||(f.preventDefault(),t.dispatchEvent(s),Ce(f),t.dispatchEvent(u))}function Dt(f){t.enabled===!1||t.enablePan===!1||pe(f)}function Pt(f){switch(Ue(f),P.length){case 1:switch(t.touches.ONE){case Ft.ROTATE:if(t.enableRotate===!1)return;We(),d=l.TOUCH_ROTATE;break;case Ft.PAN:if(t.enablePan===!1)return;Be(),d=l.TOUCH_PAN;break;default:d=l.NONE}break;case 2:switch(t.touches.TWO){case Ft.DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;dt(),d=l.TOUCH_DOLLY_PAN;break;case Ft.DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;Vt(),d=l.TOUCH_DOLLY_ROTATE;break;default:d=l.NONE}break;default:d=l.NONE}d!==l.NONE&&t.dispatchEvent(s)}function Tn(f){switch(Ue(f),d){case l.TOUCH_ROTATE:if(t.enableRotate===!1)return;Ze(f),t.update();break;case l.TOUCH_PAN:if(t.enablePan===!1)return;_t(f),t.update();break;case l.TOUCH_DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Ot(f),t.update();break;case l.TOUCH_DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;Kt(f),t.update();break;default:d=l.NONE}}function fn(f){t.enabled!==!1&&f.preventDefault()}function Cn(f){P.push(f)}function Mt(f){delete X[f.pointerId];for(let C=0;C<P.length;C++)if(P[C].pointerId==f.pointerId){P.splice(C,1);return}}function Ue(f){let C=X[f.pointerId];C===void 0&&(C=new He,X[f.pointerId]=C),C.set(f.pageX,f.pageY)}function Lt(f){const C=f.pointerId===P[0].pointerId?P[1]:P[0];return X[C.pointerId]}this.dollyIn=(f=ee())=>{we(f),t.update()},this.dollyOut=(f=ee())=>{re(f),t.update()},this.getScale=()=>b,this.setScale=f=>{Ee(f),t.update()},this.getZoomScale=()=>ee(),r!==void 0&&this.connect(r),this.update()}};const Bi={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},Ni={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `};class zi extends Dr{constructor(e){super(e),this.type=Qe}parse(e){const u=function(E,_){switch(E){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(_||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(_||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(_||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(_||""))}},g=function(E,_,P){_=_||1024;let te=E.pos,ee=-1,W=0,J="",q=String.fromCharCode.apply(null,new Uint16Array(E.subarray(te,te+128)));for(;0>(ee=q.indexOf(`
`))&&W<_&&te<E.byteLength;)J+=q,W+=q.length,te+=128,q+=String.fromCharCode.apply(null,new Uint16Array(E.subarray(te,te+128)));return-1<ee?(E.pos+=W+ee+1,J+q.slice(0,ee)):!1},b=function(E){const _=/^#\?(\S+)/,P=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,X=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,te=/^\s*FORMAT=(\S+)\s*$/,ee=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,W={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let J,q;for((E.pos>=E.byteLength||!(J=g(E)))&&u(1,"no header found"),(q=J.match(_))||u(3,"bad initial token"),W.valid|=1,W.programtype=q[1],W.string+=J+`
`;J=g(E),J!==!1;){if(W.string+=J+`
`,J.charAt(0)==="#"){W.comments+=J+`
`;continue}if((q=J.match(P))&&(W.gamma=parseFloat(q[1])),(q=J.match(X))&&(W.exposure=parseFloat(q[1])),(q=J.match(te))&&(W.valid|=2,W.format=q[1]),(q=J.match(ee))&&(W.valid|=4,W.height=parseInt(q[1],10),W.width=parseInt(q[2],10)),W.valid&2&&W.valid&4)break}return W.valid&2||u(3,"missing format specifier"),W.valid&4||u(3,"missing image size specifier"),W},U=function(E,_,P){const X=_;if(X<8||X>32767||E[0]!==2||E[1]!==2||E[2]&128)return new Uint8Array(E);X!==(E[2]<<8|E[3])&&u(3,"wrong scanline width");const te=new Uint8Array(4*_*P);te.length||u(4,"unable to allocate buffer space");let ee=0,W=0;const J=4*X,q=new Uint8Array(4),de=new Uint8Array(J);let ce=P;for(;ce>0&&W<E.byteLength;){W+4>E.byteLength&&u(1),q[0]=E[W++],q[1]=E[W++],q[2]=E[W++],q[3]=E[W++],(q[0]!=2||q[1]!=2||(q[2]<<8|q[3])!=X)&&u(3,"bad rgbe scanline format");let Ee=0,re;for(;Ee<J&&W<E.byteLength;){re=E[W++];const se=re>128;if(se&&(re-=128),(re===0||Ee+re>J)&&u(3,"bad scanline data"),se){const fe=E[W++];for(let he=0;he<re;he++)de[Ee++]=fe}else de.set(E.subarray(W,W+re),Ee),Ee+=re,W+=re}const we=X;for(let se=0;se<we;se++){let fe=0;te[ee]=de[se+fe],fe+=X,te[ee+1]=de[se+fe],fe+=X,te[ee+2]=de[se+fe],fe+=X,te[ee+3]=de[se+fe],ee+=4}ce--}return te},D=function(E,_,P,X){const te=E[_+3],ee=Math.pow(2,te-128)/255;P[X+0]=E[_+0]*ee,P[X+1]=E[_+1]*ee,P[X+2]=E[_+2]*ee,P[X+3]=1},H=function(E,_,P,X){const te=E[_+3],ee=Math.pow(2,te-128)/255;P[X+0]=Nt.toHalfFloat(Math.min(E[_+0]*ee,65504)),P[X+1]=Nt.toHalfFloat(Math.min(E[_+1]*ee,65504)),P[X+2]=Nt.toHalfFloat(Math.min(E[_+2]*ee,65504)),P[X+3]=Nt.toHalfFloat(1)},A=new Uint8Array(e);A.pos=0;const S=b(A),z=S.width,I=S.height,L=U(A.subarray(A.pos),z,I);let N,M,$;switch(this.type){case pt:$=L.length/4;const E=new Float32Array($*4);for(let P=0;P<$;P++)D(L,P*4,E,P*4);N=E,M=pt;break;case Qe:$=L.length/4;const _=new Uint16Array($*4);for(let P=0;P<$;P++)H(L,P*4,_,P*4);N=_,M=Qe;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:z,height:I,data:N,header:S.string,gamma:S.gamma,exposure:S.exposure,type:M}}setDataType(e){return this.type=e,this}load(e,r,t,o){function s(u,l){switch(u.type){case pt:case Qe:"colorSpace"in u?u.colorSpace="srgb-linear":u.encoding=3e3,u.minFilter=ct,u.magFilter=ct,u.generateMipmaps=!1,u.flipY=!0;break}r&&r(u,l)}return super.load(e,s,t,o)}}const tn=An>=152;class Hi extends Dr{constructor(e){super(e),this.type=Qe}parse(e){const _=Math.pow(2.7182818,2.2);function P(n,i){for(var c=0,p=0;p<65536;++p)(p==0||n[p>>3]&1<<(p&7))&&(i[c++]=p);for(var w=c-1;c<65536;)i[c++]=0;return w}function X(n){for(var i=0;i<16384;i++)n[i]={},n[i].len=0,n[i].lit=0,n[i].p=null}const te={l:0,c:0,lc:0};function ee(n,i,c,p,w){for(;c<n;)i=i<<8|Lt(p,w),c+=8;c-=n,te.l=i>>c&(1<<n)-1,te.c=i,te.lc=c}const W=new Array(59);function J(n){for(var i=0;i<=58;++i)W[i]=0;for(var i=0;i<65537;++i)W[n[i]]+=1;for(var c=0,i=58;i>0;--i){var p=c+W[i]>>1;W[i]=c,c=p}for(var i=0;i<65537;++i){var w=n[i];w>0&&(n[i]=w|W[w]++<<6)}}function q(n,i,c,p,w,y,R){for(var T=c,F=0,k=0;w<=y;w++){if(T.value-c.value>p)return!1;ee(6,F,k,n,T);var B=te.l;if(F=te.c,k=te.lc,R[w]=B,B==63){if(T.value-c.value>p)throw"Something wrong with hufUnpackEncTable";ee(8,F,k,n,T);var j=te.l+6;if(F=te.c,k=te.lc,w+j>y+1)throw"Something wrong with hufUnpackEncTable";for(;j--;)R[w++]=0;w--}else if(B>=59){var j=B-59+2;if(w+j>y+1)throw"Something wrong with hufUnpackEncTable";for(;j--;)R[w++]=0;w--}}J(R)}function de(n){return n&63}function ce(n){return n>>6}function Ee(n,i,c,p){for(;i<=c;i++){var w=ce(n[i]),y=de(n[i]);if(w>>y)throw"Invalid table entry";if(y>14){var R=p[w>>y-14];if(R.len)throw"Invalid table entry";if(R.lit++,R.p){var T=R.p;R.p=new Array(R.lit);for(var F=0;F<R.lit-1;++F)R.p[F]=T[F]}else R.p=new Array(1);R.p[R.lit-1]=i}else if(y)for(var k=0,F=1<<14-y;F>0;F--){var R=p[(w<<14-y)+k];if(R.len||R.p)throw"Invalid table entry";R.len=y,R.lit=i,k++}}return!0}const re={c:0,lc:0};function we(n,i,c,p){n=n<<8|Lt(c,p),i+=8,re.c=n,re.lc=i}const se={c:0,lc:0};function fe(n,i,c,p,w,y,R,T,F,k){if(n==i){p<8&&(we(c,p,w,R),c=re.c,p=re.lc),p-=8;var B=c>>p,B=new Uint8Array([B])[0];if(F.value+B>k)return!1;for(var j=T[F.value-1];B-- >0;)T[F.value++]=j}else if(F.value<k)T[F.value++]=n;else return!1;se.c=c,se.lc=p}function he(n){return n&65535}function ye(n){var i=he(n);return i>32767?i-65536:i}const ae={a:0,b:0};function je(n,i){var c=ye(n),p=ye(i),w=p,y=c+(w&1)+(w>>1),R=y,T=y-w;ae.a=R,ae.b=T}function _e(n,i){var c=he(n),p=he(i),w=c-(p>>1)&65535,y=p+w-32768&65535;ae.a=y,ae.b=w}function mt(n,i,c,p,w,y,R){for(var T=R<16384,F=c>w?w:c,k=1,B;k<=F;)k<<=1;for(k>>=1,B=k,k>>=1;k>=1;){for(var j=0,Ie=j+y*(w-B),Y=y*k,V=y*B,ne=p*k,ie=p*B,ve,xe,Re,ze;j<=Ie;j+=V){for(var be=j,at=j+p*(c-B);be<=at;be+=ie){var Se=be+ne,Oe=be+Y,ht=Oe+ne;T?(je(n[be+i],n[Oe+i]),ve=ae.a,Re=ae.b,je(n[Se+i],n[ht+i]),xe=ae.a,ze=ae.b,je(ve,xe),n[be+i]=ae.a,n[Se+i]=ae.b,je(Re,ze),n[Oe+i]=ae.a,n[ht+i]=ae.b):(_e(n[be+i],n[Oe+i]),ve=ae.a,Re=ae.b,_e(n[Se+i],n[ht+i]),xe=ae.a,ze=ae.b,_e(ve,xe),n[be+i]=ae.a,n[Se+i]=ae.b,_e(Re,ze),n[Oe+i]=ae.a,n[ht+i]=ae.b)}if(c&k){var Oe=be+Y;T?je(n[be+i],n[Oe+i]):_e(n[be+i],n[Oe+i]),ve=ae.a,n[Oe+i]=ae.b,n[be+i]=ve}}if(w&k)for(var be=j,at=j+p*(c-B);be<=at;be+=ie){var Se=be+ne;T?je(n[be+i],n[Se+i]):_e(n[be+i],n[Se+i]),ve=ae.a,n[Se+i]=ae.b,n[be+i]=ve}B=k,k>>=1}return j}function Ce(n,i,c,p,w,y,R,T,F,k){for(var B=0,j=0,Ie=T,Y=Math.trunc(w.value+(y+7)/8);w.value<Y;)for(we(B,j,c,w),B=re.c,j=re.lc;j>=14;){var V=B>>j-14&16383,ne=i[V];if(ne.len)j-=ne.len,fe(ne.lit,R,B,j,c,p,w,F,k,Ie),B=se.c,j=se.lc;else{if(!ne.p)throw"hufDecode issues";var ie;for(ie=0;ie<ne.lit;ie++){for(var ve=de(n[ne.p[ie]]);j<ve&&w.value<Y;)we(B,j,c,w),B=re.c,j=re.lc;if(j>=ve&&ce(n[ne.p[ie]])==(B>>j-ve&(1<<ve)-1)){j-=ve,fe(ne.p[ie],R,B,j,c,p,w,F,k,Ie),B=se.c,j=se.lc;break}}if(ie==ne.lit)throw"hufDecode issues"}}var xe=8-y&7;for(B>>=xe,j-=xe;j>0;){var ne=i[B<<14-j&16383];if(ne.len)j-=ne.len,fe(ne.lit,R,B,j,c,p,w,F,k,Ie),B=se.c,j=se.lc;else throw"hufDecode issues"}return!0}function pe(n,i,c,p,w,y){var R={value:0},T=c.value,F=Ue(i,c),k=Ue(i,c);c.value+=4;var B=Ue(i,c);if(c.value+=4,F<0||F>=65537||k<0||k>=65537)throw"Something wrong with HUF_ENCSIZE";var j=new Array(65537),Ie=new Array(16384);X(Ie);var Y=p-(c.value-T);if(q(n,i,c,Y,F,k,j),B>8*(p-(c.value-T)))throw"Something wrong with hufUncompress";Ee(j,F,k,Ie),Ce(j,Ie,n,i,c,B,k,y,w,R)}function We(n,i,c){for(var p=0;p<c;++p)i[p]=n[i[p]]}function Be(n){for(var i=1;i<n.length;i++){var c=n[i-1]+n[i]-128;n[i]=c}}function Je(n,i){for(var c=0,p=Math.floor((n.length+1)/2),w=0,y=n.length-1;!(w>y||(i[w++]=n[c++],w>y));)i[w++]=n[p++]}function dt(n){for(var i=n.byteLength,c=new Array,p=0,w=new DataView(n);i>0;){var y=w.getInt8(p++);if(y<0){var R=-y;i-=R+1;for(var T=0;T<R;T++)c.push(w.getUint8(p++))}else{var R=y;i-=2;for(var F=w.getUint8(p++),T=0;T<R+1;T++)c.push(F)}}return c}function Vt(n,i,c,p,w,y){var Se=new DataView(y.buffer),R=c[n.idx[0]].width,T=c[n.idx[0]].height,F=3,k=Math.floor(R/8),B=Math.ceil(R/8),j=Math.ceil(T/8),Ie=R-(B-1)*8,Y=T-(j-1)*8,V={value:0},ne=new Array(F),ie=new Array(F),ve=new Array(F),xe=new Array(F),Re=new Array(F);for(let ge=0;ge<F;++ge)Re[ge]=i[n.idx[ge]],ne[ge]=ge<1?0:ne[ge-1]+B*j,ie[ge]=new Float32Array(64),ve[ge]=new Uint16Array(64),xe[ge]=new Uint16Array(B*64);for(let ge=0;ge<j;++ge){var ze=8;ge==j-1&&(ze=Y);var be=8;for(let Ae=0;Ae<B;++Ae){Ae==B-1&&(be=Ie);for(let me=0;me<F;++me)ve[me].fill(0),ve[me][0]=w[ne[me]++],Ze(V,p,ve[me]),_t(ve[me],ie[me]),vt(ie[me]);Ot(ie);for(let me=0;me<F;++me)Kt(ie[me],xe[me],Ae*64)}let ke=0;for(let Ae=0;Ae<F;++Ae){const me=c[n.idx[Ae]].type;for(let Xe=8*ge;Xe<8*ge+ze;++Xe){ke=Re[Ae][Xe];for(let Ct=0;Ct<k;++Ct){const Ge=Ct*64+(Xe&7)*8;Se.setUint16(ke+0*me,xe[Ae][Ge+0],!0),Se.setUint16(ke+2*me,xe[Ae][Ge+1],!0),Se.setUint16(ke+4*me,xe[Ae][Ge+2],!0),Se.setUint16(ke+6*me,xe[Ae][Ge+3],!0),Se.setUint16(ke+8*me,xe[Ae][Ge+4],!0),Se.setUint16(ke+10*me,xe[Ae][Ge+5],!0),Se.setUint16(ke+12*me,xe[Ae][Ge+6],!0),Se.setUint16(ke+14*me,xe[Ae][Ge+7],!0),ke+=16*me}}if(k!=B)for(let Xe=8*ge;Xe<8*ge+ze;++Xe){const Ct=Re[Ae][Xe]+8*k*2*me,Ge=k*64+(Xe&7)*8;for(let wt=0;wt<be;++wt)Se.setUint16(Ct+wt*2*me,xe[Ae][Ge+wt],!0)}}}for(var at=new Uint16Array(R),Se=new DataView(y.buffer),Oe=0;Oe<F;++Oe){c[n.idx[Oe]].decoded=!0;var ht=c[n.idx[Oe]].type;if(c[Oe].type==2)for(var en=0;en<T;++en){const ge=Re[Oe][en];for(var Ye=0;Ye<R;++Ye)at[Ye]=Se.getUint16(ge+Ye*2*ht,!0);for(var Ye=0;Ye<R;++Ye)Se.setFloat32(ge+Ye*2*ht,O(at[Ye]),!0)}}}function Ze(n,i,c){for(var p,w=1;w<64;)p=i[n.value],p==65280?w=64:p>>8==255?w+=p&255:(c[w]=p,w++),n.value++}function _t(n,i){i[0]=O(n[0]),i[1]=O(n[1]),i[2]=O(n[5]),i[3]=O(n[6]),i[4]=O(n[14]),i[5]=O(n[15]),i[6]=O(n[27]),i[7]=O(n[28]),i[8]=O(n[2]),i[9]=O(n[4]),i[10]=O(n[7]),i[11]=O(n[13]),i[12]=O(n[16]),i[13]=O(n[26]),i[14]=O(n[29]),i[15]=O(n[42]),i[16]=O(n[3]),i[17]=O(n[8]),i[18]=O(n[12]),i[19]=O(n[17]),i[20]=O(n[25]),i[21]=O(n[30]),i[22]=O(n[41]),i[23]=O(n[43]),i[24]=O(n[9]),i[25]=O(n[11]),i[26]=O(n[18]),i[27]=O(n[24]),i[28]=O(n[31]),i[29]=O(n[40]),i[30]=O(n[44]),i[31]=O(n[53]),i[32]=O(n[10]),i[33]=O(n[19]),i[34]=O(n[23]),i[35]=O(n[32]),i[36]=O(n[39]),i[37]=O(n[45]),i[38]=O(n[52]),i[39]=O(n[54]),i[40]=O(n[20]),i[41]=O(n[22]),i[42]=O(n[33]),i[43]=O(n[38]),i[44]=O(n[46]),i[45]=O(n[51]),i[46]=O(n[55]),i[47]=O(n[60]),i[48]=O(n[21]),i[49]=O(n[34]),i[50]=O(n[37]),i[51]=O(n[47]),i[52]=O(n[50]),i[53]=O(n[56]),i[54]=O(n[59]),i[55]=O(n[61]),i[56]=O(n[35]),i[57]=O(n[36]),i[58]=O(n[48]),i[59]=O(n[49]),i[60]=O(n[57]),i[61]=O(n[58]),i[62]=O(n[62]),i[63]=O(n[63])}function vt(n){const i=.5*Math.cos(.7853975),c=.5*Math.cos(3.14159/16),p=.5*Math.cos(3.14159/8),w=.5*Math.cos(3*3.14159/16),y=.5*Math.cos(5*3.14159/16),R=.5*Math.cos(3*3.14159/8),T=.5*Math.cos(7*3.14159/16);for(var F=new Array(4),k=new Array(4),B=new Array(4),j=new Array(4),Ie=0;Ie<8;++Ie){var Y=Ie*8;F[0]=p*n[Y+2],F[1]=R*n[Y+2],F[2]=p*n[Y+6],F[3]=R*n[Y+6],k[0]=c*n[Y+1]+w*n[Y+3]+y*n[Y+5]+T*n[Y+7],k[1]=w*n[Y+1]-T*n[Y+3]-c*n[Y+5]-y*n[Y+7],k[2]=y*n[Y+1]-c*n[Y+3]+T*n[Y+5]+w*n[Y+7],k[3]=T*n[Y+1]-y*n[Y+3]+w*n[Y+5]-c*n[Y+7],B[0]=i*(n[Y+0]+n[Y+4]),B[3]=i*(n[Y+0]-n[Y+4]),B[1]=F[0]+F[3],B[2]=F[1]-F[2],j[0]=B[0]+B[1],j[1]=B[3]+B[2],j[2]=B[3]-B[2],j[3]=B[0]-B[1],n[Y+0]=j[0]+k[0],n[Y+1]=j[1]+k[1],n[Y+2]=j[2]+k[2],n[Y+3]=j[3]+k[3],n[Y+4]=j[3]-k[3],n[Y+5]=j[2]-k[2],n[Y+6]=j[1]-k[1],n[Y+7]=j[0]-k[0]}for(var V=0;V<8;++V)F[0]=p*n[16+V],F[1]=R*n[16+V],F[2]=p*n[48+V],F[3]=R*n[48+V],k[0]=c*n[8+V]+w*n[24+V]+y*n[40+V]+T*n[56+V],k[1]=w*n[8+V]-T*n[24+V]-c*n[40+V]-y*n[56+V],k[2]=y*n[8+V]-c*n[24+V]+T*n[40+V]+w*n[56+V],k[3]=T*n[8+V]-y*n[24+V]+w*n[40+V]-c*n[56+V],B[0]=i*(n[V]+n[32+V]),B[3]=i*(n[V]-n[32+V]),B[1]=F[0]+F[3],B[2]=F[1]-F[2],j[0]=B[0]+B[1],j[1]=B[3]+B[2],j[2]=B[3]-B[2],j[3]=B[0]-B[1],n[0+V]=j[0]+k[0],n[8+V]=j[1]+k[1],n[16+V]=j[2]+k[2],n[24+V]=j[3]+k[3],n[32+V]=j[3]-k[3],n[40+V]=j[2]-k[2],n[48+V]=j[1]-k[1],n[56+V]=j[0]-k[0]}function Ot(n){for(var i=0;i<64;++i){var c=n[0][i],p=n[1][i],w=n[2][i];n[0][i]=c+1.5747*w,n[1][i]=c-.1873*p-.4682*w,n[2][i]=c+1.8556*p}}function Kt(n,i,c){for(var p=0;p<64;++p)i[c+p]=Nt.toHalfFloat(Ut(n[p]))}function Ut(n){return n<=1?Math.sign(n)*Math.pow(Math.abs(n),2.2):Math.sign(n)*Math.pow(_,Math.abs(n)-1)}function gt(n){return new DataView(n.array.buffer,n.offset.value,n.size)}function ft(n){var i=n.viewer.buffer.slice(n.offset.value,n.offset.value+n.size),c=new Uint8Array(dt(i)),p=new Uint8Array(c.length);return Be(c),Je(c,p),new DataView(p.buffer)}function St(n){var i=n.array.slice(n.offset.value,n.offset.value+n.size),c=mn(i),p=new Uint8Array(c.length);return Be(c),Je(c,p),new DataView(p.buffer)}function qt(n){for(var i=n.viewer,c={value:n.offset.value},p=new Uint16Array(n.width*n.scanlineBlockSize*(n.channels*n.type)),w=new Uint8Array(8192),y=0,R=new Array(n.channels),T=0;T<n.channels;T++)R[T]={},R[T].start=y,R[T].end=R[T].start,R[T].nx=n.width,R[T].ny=n.lines,R[T].size=n.type,y+=R[T].nx*R[T].ny*R[T].size;var F=Ne(i,c),k=Ne(i,c);if(k>=8192)throw"Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";if(F<=k)for(var T=0;T<k-F+1;T++)w[T+F]=f(i,c);var B=new Uint16Array(65536),j=P(w,B),Ie=Ue(i,c);pe(n.array,i,c,Ie,p,y);for(var T=0;T<n.channels;++T)for(var Y=R[T],V=0;V<R[T].size;++V)mt(p,Y.start+V,Y.nx,Y.size,Y.ny,Y.nx*Y.size,j);We(B,p,y);for(var ne=0,ie=new Uint8Array(p.buffer.byteLength),ve=0;ve<n.lines;ve++)for(var xe=0;xe<n.channels;xe++){var Y=R[xe],Re=Y.nx*Y.size,ze=new Uint8Array(p.buffer,Y.end*2,Re*2);ie.set(ze,ne),ne+=Re*2,Y.end+=Re}return new DataView(ie.buffer)}function $e(n){var i=n.array.slice(n.offset.value,n.offset.value+n.size),c=mn(i);const p=n.lines*n.channels*n.width,w=n.type==1?new Uint16Array(p):new Uint32Array(p);let y=0,R=0;const T=new Array(4);for(let F=0;F<n.lines;F++)for(let k=0;k<n.channels;k++){let B=0;switch(n.type){case 1:T[0]=y,T[1]=T[0]+n.width,y=T[1]+n.width;for(let j=0;j<n.width;++j){const Ie=c[T[0]++]<<8|c[T[1]++];B+=Ie,w[R]=B,R++}break;case 2:T[0]=y,T[1]=T[0]+n.width,T[2]=T[1]+n.width,y=T[2]+n.width;for(let j=0;j<n.width;++j){const Ie=c[T[0]++]<<24|c[T[1]++]<<16|c[T[2]++]<<8;B+=Ie,w[R]=B,R++}break}}return new DataView(w.buffer)}function Dt(n){var i=n.viewer,c={value:n.offset.value},p=new Uint8Array(n.width*n.lines*(n.channels*n.type*2)),w={version:C(i,c),unknownUncompressedSize:C(i,c),unknownCompressedSize:C(i,c),acCompressedSize:C(i,c),dcCompressedSize:C(i,c),rleCompressedSize:C(i,c),rleUncompressedSize:C(i,c),rleRawSize:C(i,c),totalAcUncompressedCount:C(i,c),totalDcUncompressedCount:C(i,c),acCompression:C(i,c)};if(w.version<2)throw"EXRLoader.parse: "+Jt.compression+" version "+w.version+" is unsupported";for(var y=new Array,R=Ne(i,c)-2;R>0;){var T=Pt(i.buffer,c),F=f(i,c),k=F>>2&3,B=(F>>4)-1,j=new Int8Array([B])[0],Ie=f(i,c);y.push({name:T,index:j,type:Ie,compression:k}),R-=T.length+3}for(var Y=Jt.channels,V=new Array(n.channels),ne=0;ne<n.channels;++ne){var ie=V[ne]={},ve=Y[ne];ie.name=ve.name,ie.compression=0,ie.decoded=!1,ie.type=ve.pixelType,ie.pLinear=ve.pLinear,ie.width=n.width,ie.height=n.lines}for(var xe={idx:new Array(3)},Re=0;Re<n.channels;++Re)for(var ie=V[Re],ne=0;ne<y.length;++ne){var ze=y[ne];ie.name==ze.name&&(ie.compression=ze.compression,ze.index>=0&&(xe.idx[ze.index]=Re),ie.offset=Re)}if(w.acCompressedSize>0)switch(w.acCompression){case 0:var Se=new Uint16Array(w.totalAcUncompressedCount);pe(n.array,i,c,w.acCompressedSize,Se,w.totalAcUncompressedCount);break;case 1:var be=n.array.slice(c.value,c.value+w.totalAcUncompressedCount),at=mn(be),Se=new Uint16Array(at.buffer);c.value+=w.totalAcUncompressedCount;break}if(w.dcCompressedSize>0){var Oe={array:n.array,offset:c,size:w.dcCompressedSize},ht=new Uint16Array(St(Oe).buffer);c.value+=w.dcCompressedSize}if(w.rleRawSize>0){var be=n.array.slice(c.value,c.value+w.rleCompressedSize),at=mn(be),en=dt(at.buffer);c.value+=w.rleCompressedSize}for(var Ye=0,ge=new Array(V.length),ne=0;ne<ge.length;++ne)ge[ne]=new Array;for(var ke=0;ke<n.lines;++ke)for(var Ae=0;Ae<V.length;++Ae)ge[Ae].push(Ye),Ye+=V[Ae].width*n.type*2;Vt(xe,ge,V,Se,ht,p);for(var ne=0;ne<V.length;++ne){var ie=V[ne];if(!ie.decoded)switch(ie.compression){case 2:for(var me=0,Xe=0,ke=0;ke<n.lines;++ke){for(var Ct=ge[ne][me],Ge=0;Ge<ie.width;++Ge){for(var wt=0;wt<2*ie.type;++wt)p[Ct++]=en[Xe+wt*ie.width*ie.height];Xe++}me++}break;default:throw"EXRLoader.parse: unsupported channel compression"}}return new DataView(p.buffer)}function Pt(n,i){for(var c=new Uint8Array(n),p=0;c[i.value+p]!=0;)p+=1;var w=new TextDecoder().decode(c.slice(i.value,i.value+p));return i.value=i.value+p+1,w}function Tn(n,i,c){var p=new TextDecoder().decode(new Uint8Array(n).slice(i.value,i.value+c));return i.value=i.value+c,p}function fn(n,i){var c=Mt(n,i),p=Ue(n,i);return[c,p]}function Cn(n,i){var c=Ue(n,i),p=Ue(n,i);return[c,p]}function Mt(n,i){var c=n.getInt32(i.value,!0);return i.value=i.value+4,c}function Ue(n,i){var c=n.getUint32(i.value,!0);return i.value=i.value+4,c}function Lt(n,i){var c=n[i.value];return i.value=i.value+1,c}function f(n,i){var c=n.getUint8(i.value);return i.value=i.value+1,c}const C=function(n,i){let c;return"getBigInt64"in DataView.prototype?c=Number(n.getBigInt64(i.value,!0)):c=n.getUint32(i.value+4,!0)+Number(n.getUint32(i.value,!0)<<32),i.value+=8,c};function Z(n,i){var c=n.getFloat32(i.value,!0);return i.value+=4,c}function ue(n,i){return Nt.toHalfFloat(Z(n,i))}function O(n){var i=(n&31744)>>10,c=n&1023;return(n>>15?-1:1)*(i?i===31?c?NaN:1/0:Math.pow(2,i-15)*(1+c/1024):6103515625e-14*(c/1024))}function Ne(n,i){var c=n.getUint16(i.value,!0);return i.value+=2,c}function rt(n,i){return O(Ne(n,i))}function cr(n,i,c,p){for(var w=c.value,y=[];c.value<w+p-1;){var R=Pt(i,c),T=Mt(n,c),F=f(n,c);c.value+=3;var k=Mt(n,c),B=Mt(n,c);y.push({name:R,pixelType:T,pLinear:F,xSampling:k,ySampling:B})}return c.value+=1,y}function hn(n,i){var c=Z(n,i),p=Z(n,i),w=Z(n,i),y=Z(n,i),R=Z(n,i),T=Z(n,i),F=Z(n,i),k=Z(n,i);return{redX:c,redY:p,greenX:w,greenY:y,blueX:R,blueY:T,whiteX:F,whiteY:k}}function et(n,i){var c=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],p=f(n,i);return c[p]}function tt(n,i){var c=Ue(n,i),p=Ue(n,i),w=Ue(n,i),y=Ue(n,i);return{xMin:c,yMin:p,xMax:w,yMax:y}}function At(n,i){var c=["INCREASING_Y"],p=f(n,i);return c[p]}function It(n,i){var c=Z(n,i),p=Z(n,i);return[c,p]}function Tt(n,i){var c=Z(n,i),p=Z(n,i),w=Z(n,i);return[c,p,w]}function jt(n,i,c,p,w){if(p==="string"||p==="stringvector"||p==="iccProfile")return Tn(i,c,w);if(p==="chlist")return cr(n,i,c,w);if(p==="chromaticities")return hn(n,c);if(p==="compression")return et(n,c);if(p==="box2i")return tt(n,c);if(p==="lineOrder")return At(n,c);if(p==="float")return Z(n,c);if(p==="v2f")return It(n,c);if(p==="v3f")return Tt(n,c);if(p==="int")return Mt(n,c);if(p==="rational")return fn(n,c);if(p==="timecode")return Cn(n,c);if(p==="preview")return c.value+=w,"skipped";c.value+=w}function ra(n,i,c){const p={};if(n.getUint32(0,!0)!=20000630)throw"THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";p.version=n.getUint8(4);const w=n.getUint8(5);p.spec={singleTile:!!(w&2),longName:!!(w&4),deepFormat:!!(w&8),multiPart:!!(w&16)},c.value=8;for(var y=!0;y;){var R=Pt(i,c);if(R==0)y=!1;else{var T=Pt(i,c),F=Ue(n,c),k=jt(n,i,c,T,F);k===void 0?console.warn(`EXRLoader.parse: skipped unknown header attribute type '${T}'.`):p[R]=k}}if((w&-5)!=0)throw console.error("EXRHeader:",p),"THREE.EXRLoader: provided file is currently unsupported.";return p}function aa(n,i,c,p,w){const y={size:0,viewer:i,array:c,offset:p,width:n.dataWindow.xMax-n.dataWindow.xMin+1,height:n.dataWindow.yMax-n.dataWindow.yMin+1,channels:n.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:n.channels[0].pixelType,uncompress:null,getter:null,format:null,[tn?"colorSpace":"encoding"]:null};switch(n.compression){case"NO_COMPRESSION":y.lines=1,y.uncompress=gt;break;case"RLE_COMPRESSION":y.lines=1,y.uncompress=ft;break;case"ZIPS_COMPRESSION":y.lines=1,y.uncompress=St;break;case"ZIP_COMPRESSION":y.lines=16,y.uncompress=St;break;case"PIZ_COMPRESSION":y.lines=32,y.uncompress=qt;break;case"PXR24_COMPRESSION":y.lines=16,y.uncompress=$e;break;case"DWAA_COMPRESSION":y.lines=32,y.uncompress=Dt;break;case"DWAB_COMPRESSION":y.lines=256,y.uncompress=Dt;break;default:throw"EXRLoader.parse: "+n.compression+" is unsupported"}if(y.scanlineBlockSize=y.lines,y.type==1)switch(w){case pt:y.getter=rt,y.inputSize=2;break;case Qe:y.getter=Ne,y.inputSize=2;break}else if(y.type==2)switch(w){case pt:y.getter=Z,y.inputSize=4;break;case Qe:y.getter=ue,y.inputSize=4}else throw"EXRLoader.parse: unsupported pixelType "+y.type+" for "+n.compression+".";y.blockCount=(n.dataWindow.yMax+1)/y.scanlineBlockSize;for(var R=0;R<y.blockCount;R++)C(i,p);y.outputChannels=y.channels==3?4:y.channels;const T=y.width*y.height*y.outputChannels;switch(w){case pt:y.byteArray=new Float32Array(T),y.channels<y.outputChannels&&y.byteArray.fill(1,0,T);break;case Qe:y.byteArray=new Uint16Array(T),y.channels<y.outputChannels&&y.byteArray.fill(15360,0,T);break;default:console.error("THREE.EXRLoader: unsupported type: ",w);break}return y.bytesPerLine=y.width*y.inputSize*y.channels,y.outputChannels==4?y.format=on:y.format=_a,tn?y.colorSpace="srgb-linear":y.encoding=3e3,y}const pn=new DataView(e),ia=new Uint8Array(e),Qt={value:0},Jt=ra(pn,e,Qt),le=aa(Jt,pn,ia,Qt,this.type),ur={value:0},oa={R:0,G:1,B:2,A:3,Y:0};for(let n=0;n<le.height/le.scanlineBlockSize;n++){const i=Ue(pn,Qt);le.size=Ue(pn,Qt),le.lines=i+le.scanlineBlockSize>le.height?le.height-i:le.scanlineBlockSize;const p=le.size<le.lines*le.bytesPerLine?le.uncompress(le):gt(le);Qt.value+=le.size;for(let w=0;w<le.scanlineBlockSize;w++){const y=w+n*le.scanlineBlockSize;if(y>=le.height)break;for(let R=0;R<le.channels;R++){const T=oa[Jt.channels[R].name];for(let F=0;F<le.width;F++){ur.value=(w*(le.channels*le.width)+R*le.width+F)*le.inputSize;const k=(le.height-1-y)*(le.width*le.outputChannels)+F*le.outputChannels+T;le.byteArray[k]=le.getter(p,ur)}}}}return{header:Jt,width:le.width,height:le.height,data:le.byteArray,format:le.format,[tn?"colorSpace":"encoding"]:le[tn?"colorSpace":"encoding"],type:this.type}}setDataType(e){return this.type=e,this}load(e,r,t,o){function s(u,l){tn?u.colorSpace=l.colorSpace:u.encoding=l.encoding,u.minFilter=ct,u.magFilter=ct,u.generateMipmaps=!1,u.flipY=!1,r&&r(u,l)}return super.load(e,s,t,o)}}const Sr=new Kn,gn=new oe;class er extends Sa{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],r=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],t=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(t),this.setAttribute("position",new hr(e,3)),this.setAttribute("uv",new hr(r,2))}applyMatrix4(e){const r=this.attributes.instanceStart,t=this.attributes.instanceEnd;return r!==void 0&&(r.applyMatrix4(e),t.applyMatrix4(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let r;e instanceof Float32Array?r=e:Array.isArray(e)&&(r=new Float32Array(e));const t=new Nn(r,6,1);return this.setAttribute("instanceStart",new zt(t,3,0)),this.setAttribute("instanceEnd",new zt(t,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,r=3){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const o=new Nn(t,r*2,1);return this.setAttribute("instanceColorStart",new zt(o,r,0)),this.setAttribute("instanceColorEnd",new zt(o,r,r)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Ma(e.geometry)),this}fromLineSegments(e){const r=e.geometry;return this.setPositions(r.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kn);const e=this.attributes.instanceStart,r=this.attributes.instanceEnd;e!==void 0&&r!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Sr.setFromBufferAttribute(r),this.boundingBox.union(Sr))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pr),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,r=this.attributes.instanceEnd;if(e!==void 0&&r!==void 0){const t=this.boundingSphere.center;this.boundingBox.getCenter(t);let o=0;for(let s=0,u=e.count;s<u;s++)gn.fromBufferAttribute(e,s),o=Math.max(o,t.distanceToSquared(gn)),gn.fromBufferAttribute(r,s),o=Math.max(o,t.distanceToSquared(gn));this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class Vr extends er{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const r=e.length-3,t=new Float32Array(2*r);for(let o=0;o<r;o+=3)t[2*o]=e[o],t[2*o+1]=e[o+1],t[2*o+2]=e[o+2],t[2*o+3]=e[o+3],t[2*o+4]=e[o+4],t[2*o+5]=e[o+5];return super.setPositions(t),this}setColors(e,r=3){const t=e.length-r,o=new Float32Array(2*t);if(r===3)for(let s=0;s<t;s+=r)o[2*s]=e[s],o[2*s+1]=e[s+1],o[2*s+2]=e[s+2],o[2*s+3]=e[s+3],o[2*s+4]=e[s+4],o[2*s+5]=e[s+5];else for(let s=0;s<t;s+=r)o[2*s]=e[s],o[2*s+1]=e[s+1],o[2*s+2]=e[s+2],o[2*s+3]=e[s+3],o[2*s+4]=e[s+4],o[2*s+5]=e[s+5],o[2*s+6]=e[s+6],o[2*s+7]=e[s+7];return super.setColors(o,r),this}fromLine(e){const r=e.geometry;return this.setPositions(r.attributes.position.array),this}}class tr extends $t{constructor(e){super({type:"LineMaterial",uniforms:pr.clone(pr.merge([mr.common,mr.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new He(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${An>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(r){this.uniforms.diffuse.value=r}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(r){r===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(r){this.uniforms.linewidth.value=r}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(r){!!r!="USE_DASH"in this.defines&&(this.needsUpdate=!0),r===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(r){this.uniforms.dashScale.value=r}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(r){this.uniforms.dashSize.value=r}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(r){this.uniforms.dashOffset.value=r}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(r){this.uniforms.gapSize.value=r}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(r){this.uniforms.opacity.value=r}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(r){this.uniforms.resolution.value.copy(r)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(r){!!r!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),r===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const Un=new Xt,Mr=new oe,Ar=new oe,De=new Xt,Pe=new Xt,it=new Xt,Dn=new oe,Pn=new Ia,Le=new Aa,Ir=new oe,wn=new Kn,yn=new Pr,ot=new Xt;let lt,Rt;function Tr(a,e,r){return ot.set(0,0,-e,1).applyMatrix4(a.projectionMatrix),ot.multiplyScalar(1/ot.w),ot.x=Rt/r.width,ot.y=Rt/r.height,ot.applyMatrix4(a.projectionMatrixInverse),ot.multiplyScalar(1/ot.w),Math.abs(Math.max(ot.x,ot.y))}function Gi(a,e){const r=a.matrixWorld,t=a.geometry,o=t.attributes.instanceStart,s=t.attributes.instanceEnd,u=Math.min(t.instanceCount,o.count);for(let l=0,d=u;l<d;l++){Le.start.fromBufferAttribute(o,l),Le.end.fromBufferAttribute(s,l),Le.applyMatrix4(r);const h=new oe,v=new oe;lt.distanceSqToSegment(Le.start,Le.end,v,h),v.distanceTo(h)<Rt*.5&&e.push({point:v,pointOnLine:h,distance:lt.origin.distanceTo(v),object:a,face:null,faceIndex:l,uv:null,[Hr]:null})}}function Wi(a,e,r){const t=e.projectionMatrix,s=a.material.resolution,u=a.matrixWorld,l=a.geometry,d=l.attributes.instanceStart,h=l.attributes.instanceEnd,v=Math.min(l.instanceCount,d.count),g=-e.near;lt.at(1,it),it.w=1,it.applyMatrix4(e.matrixWorldInverse),it.applyMatrix4(t),it.multiplyScalar(1/it.w),it.x*=s.x/2,it.y*=s.y/2,it.z=0,Dn.copy(it),Pn.multiplyMatrices(e.matrixWorldInverse,u);for(let b=0,U=v;b<U;b++){if(De.fromBufferAttribute(d,b),Pe.fromBufferAttribute(h,b),De.w=1,Pe.w=1,De.applyMatrix4(Pn),Pe.applyMatrix4(Pn),De.z>g&&Pe.z>g)continue;if(De.z>g){const I=De.z-Pe.z,L=(De.z-g)/I;De.lerp(Pe,L)}else if(Pe.z>g){const I=Pe.z-De.z,L=(Pe.z-g)/I;Pe.lerp(De,L)}De.applyMatrix4(t),Pe.applyMatrix4(t),De.multiplyScalar(1/De.w),Pe.multiplyScalar(1/Pe.w),De.x*=s.x/2,De.y*=s.y/2,Pe.x*=s.x/2,Pe.y*=s.y/2,Le.start.copy(De),Le.start.z=0,Le.end.copy(Pe),Le.end.z=0;const H=Le.closestPointToPointParameter(Dn,!0);Le.at(H,Ir);const A=Ta.lerp(De.z,Pe.z,H),S=A>=-1&&A<=1,z=Dn.distanceTo(Ir)<Rt*.5;if(S&&z){Le.start.fromBufferAttribute(d,b),Le.end.fromBufferAttribute(h,b),Le.start.applyMatrix4(u),Le.end.applyMatrix4(u);const I=new oe,L=new oe;lt.distanceSqToSegment(Le.start,Le.end,L,I),r.push({point:L,pointOnLine:I,distance:lt.origin.distanceTo(L),object:a,face:null,faceIndex:b,uv:null,[Hr]:null})}}}class Kr extends cn{constructor(e=new er,r=new tr({color:Math.random()*16777215})){super(e,r),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,r=e.attributes.instanceStart,t=e.attributes.instanceEnd,o=new Float32Array(2*r.count);for(let u=0,l=0,d=r.count;u<d;u++,l+=2)Mr.fromBufferAttribute(r,u),Ar.fromBufferAttribute(t,u),o[l]=l===0?0:o[l-1],o[l+1]=o[l]+Mr.distanceTo(Ar);const s=new Nn(o,2,1);return e.setAttribute("instanceDistanceStart",new zt(s,1,0)),e.setAttribute("instanceDistanceEnd",new zt(s,1,1)),this}raycast(e,r){const t=this.material.worldUnits,o=e.camera;o===null&&!t&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;lt=e.ray;const u=this.matrixWorld,l=this.geometry,d=this.material;Rt=d.linewidth+s,l.boundingSphere===null&&l.computeBoundingSphere(),yn.copy(l.boundingSphere).applyMatrix4(u);let h;if(t)h=Rt*.5;else{const g=Math.max(o.near,yn.distanceToPoint(lt.origin));h=Tr(o,g,d.resolution)}if(yn.radius+=h,lt.intersectsSphere(yn)===!1)return;l.boundingBox===null&&l.computeBoundingBox(),wn.copy(l.boundingBox).applyMatrix4(u);let v;if(t)v=Rt*.5;else{const g=Math.max(o.near,wn.distanceToPoint(lt.origin));v=Tr(o,g,d.resolution)}wn.expandByScalar(v),lt.intersectsBox(wn)!==!1&&(t?Gi(this,r):Wi(this,o,r))}onBeforeRender(e){const r=this.material.uniforms;r&&r.resolution&&(e.getViewport(Un),this.material.uniforms.resolution.value.set(Un.z,Un.w))}}class Zi extends Kr{constructor(e=new Vr,r=new tr({color:Math.random()*16777215})){super(e,r),this.isLine2=!0,this.type="Line2"}}const Ln=x.forwardRef(function({points:e,color:r=16777215,vertexColors:t,linewidth:o,lineWidth:s,segments:u,dashed:l,...d},h){var v,g;const b=Te(S=>S.size),U=x.useMemo(()=>u?new Kr:new Zi,[u]),[D]=x.useState(()=>new tr),H=(t==null||(v=t[0])==null?void 0:v.length)===4?4:3,A=x.useMemo(()=>{const S=u?new er:new Vr,z=e.map(I=>{const L=Array.isArray(I);return I instanceof oe||I instanceof Xt?[I.x,I.y,I.z]:I instanceof He?[I.x,I.y,0]:L&&I.length===3?[I[0],I[1],I[2]]:L&&I.length===2?[I[0],I[1],0]:I});if(S.setPositions(z.flat()),t){r=16777215;const I=t.map(L=>L instanceof Lr?L.toArray():L);S.setColors(I.flat(),H)}return S},[e,u,t,H]);return x.useLayoutEffect(()=>{U.computeLineDistances()},[e,U]),x.useLayoutEffect(()=>{l?D.defines.USE_DASH="":delete D.defines.USE_DASH,D.needsUpdate=!0},[l,D]),x.useEffect(()=>()=>{A.dispose(),D.dispose()},[A]),x.createElement("primitive",ut({object:U,ref:h},d),x.createElement("primitive",{object:A,attach:"geometry"}),x.createElement("primitive",ut({object:D,attach:"material",color:r,vertexColors:!!t,resolution:[b.width,b.height],linewidth:(g=o??s)!==null&&g!==void 0?g:1,dashed:l,transparent:H===4},d)))}),$i=x.forwardRef(({makeDefault:a,camera:e,regress:r,domElement:t,enableDamping:o=!0,keyEvents:s=!1,onChange:u,onStart:l,onEnd:d,...h},v)=>{const g=Te(M=>M.invalidate),b=Te(M=>M.camera),U=Te(M=>M.gl),D=Te(M=>M.events),H=Te(M=>M.setEvents),A=Te(M=>M.set),S=Te(M=>M.get),z=Te(M=>M.performance),I=e||b,L=t||D.connected||U.domElement,N=x.useMemo(()=>new Fi(I),[I]);return ln(()=>{N.enabled&&N.update()},-1),x.useEffect(()=>(s&&N.connect(s===!0?L:s),N.connect(L),()=>{N.dispose()}),[s,L,r,N,g]),x.useEffect(()=>{const M=_=>{g(),r&&z.regress(),u&&u(_)},$=_=>{l&&l(_)},E=_=>{d&&d(_)};return N.addEventListener("change",M),N.addEventListener("start",$),N.addEventListener("end",E),()=>{N.removeEventListener("start",$),N.removeEventListener("end",E),N.removeEventListener("change",M)}},[u,l,d,N,g,H]),x.useEffect(()=>{if(a){const M=S().controls;return A({controls:N}),()=>A({controls:M})}},[a,N]),x.createElement("primitive",ut({ref:v,object:N,enableDamping:o},h))}),qr=(a,e,r)=>{let t;switch(a){case zn:t=new Uint8ClampedArray(e*r*4);break;case Qe:t=new Uint16Array(e*r*4);break;case La:t=new Uint32Array(e*r*4);break;case Pa:t=new Int8Array(e*r*4);break;case Da:t=new Int16Array(e*r*4);break;case Ua:t=new Int32Array(e*r*4);break;case pt:t=new Float32Array(e*r*4);break;default:throw new Error("Unsupported data type")}return t};let xn;const Yi=(a,e,r,t)=>{if(xn!==void 0)return xn;const o=new _n(1,1,t);e.setRenderTarget(o);const s=new cn(new qn,new Oa({color:16777215}));e.render(s,r),e.setRenderTarget(null);const u=qr(a,o.width,o.height);return e.readRenderTargetPixels(o,0,0,o.width,o.height,u),o.dispose(),s.geometry.dispose(),s.material.dispose(),xn=u[0]!==0,xn};class nr{_renderer;_rendererIsDisposable=!1;_material;_scene;_camera;_quad;_renderTarget;_width;_height;_type;_colorSpace;_supportsReadPixels=!0;constructor(e){this._width=e.width,this._height=e.height,this._type=e.type,this._colorSpace=e.colorSpace;const r={format:on,depthBuffer:!1,stencilBuffer:!1,type:this._type,colorSpace:this._colorSpace,anisotropy:e.renderTargetOptions?.anisotropy!==void 0?e.renderTargetOptions?.anisotropy:1,generateMipmaps:e.renderTargetOptions?.generateMipmaps!==void 0?e.renderTargetOptions?.generateMipmaps:!1,magFilter:e.renderTargetOptions?.magFilter!==void 0?e.renderTargetOptions?.magFilter:ct,minFilter:e.renderTargetOptions?.minFilter!==void 0?e.renderTargetOptions?.minFilter:ct,samples:e.renderTargetOptions?.samples!==void 0?e.renderTargetOptions?.samples:void 0,wrapS:e.renderTargetOptions?.wrapS!==void 0?e.renderTargetOptions?.wrapS:bt,wrapT:e.renderTargetOptions?.wrapT!==void 0?e.renderTargetOptions?.wrapT:bt};if(this._material=e.material,e.renderer?this._renderer=e.renderer:(this._renderer=nr.instantiateRenderer(),this._rendererIsDisposable=!0),this._scene=new jr,this._camera=new Wt,this._camera.position.set(0,0,10),this._camera.left=-.5,this._camera.right=.5,this._camera.top=.5,this._camera.bottom=-.5,this._camera.updateProjectionMatrix(),!Yi(this._type,this._renderer,this._camera,r)){let t;this._type===Qe&&(t=this._renderer.extensions.has("EXT_color_buffer_float")?pt:void 0),t!==void 0?(console.warn(`This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${pt}`),this._type=t):(this._supportsReadPixels=!1,console.warn("This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown"))}this._quad=new cn(new qn,this._material),this._quad.geometry.computeBoundingBox(),this._scene.add(this._quad),this._renderTarget=new _n(this.width,this.height,r),this._renderTarget.texture.mapping=e.renderTargetOptions?.mapping!==void 0?e.renderTargetOptions?.mapping:Sn}static instantiateRenderer(){const e=new Ca;return e.setSize(128,128),e}render=()=>{this._renderer.setRenderTarget(this._renderTarget);try{this._renderer.render(this._scene,this._camera)}catch(e){throw this._renderer.setRenderTarget(null),e}this._renderer.setRenderTarget(null)};toArray(){if(!this._supportsReadPixels)throw new Error("Can't read pixels in this browser");const e=qr(this._type,this._width,this._height);return this._renderer.readRenderTargetPixels(this._renderTarget,0,0,this._width,this._height,e),e}toDataTexture(e){const r=new Ra(this.toArray(),this.width,this.height,on,this._type,e?.mapping||Sn,e?.wrapS||bt,e?.wrapT||bt,e?.magFilter||ct,e?.minFilter||ct,e?.anisotropy||1,Qn);return r.generateMipmaps=e?.generateMipmaps!==void 0?e?.generateMipmaps:!1,r}disposeOnDemandRenderer(){this._renderer.setRenderTarget(null),this._rendererIsDisposable&&(this._renderer.dispose(),this._renderer.forceContextLoss())}dispose(e){this.disposeOnDemandRenderer(),e&&this.renderTarget.dispose(),this.material instanceof $t&&Object.values(this.material.uniforms).forEach(r=>{r.value instanceof Yt&&r.value.dispose()}),Object.values(this.material).forEach(r=>{r instanceof Yt&&r.dispose()}),this.material.dispose(),this._quad.geometry.dispose()}get width(){return this._width}set width(e){this._width=e,this._renderTarget.setSize(this._width,this._height)}get height(){return this._height}set height(e){this._height=e,this._renderTarget.setSize(this._width,this._height)}get renderer(){return this._renderer}get renderTarget(){return this._renderTarget}set renderTarget(e){this._renderTarget=e,this._width=e.width,this._height=e.height}get material(){return this._material}get type(){return this._type}get colorSpace(){return this._colorSpace}}const Xi="urn:iso:std:iso:ts:21496:-1\0",Vi=128,Ki=8,qi=4,Qi=a=>{const e=new DataView(a.buffer,a.byteOffset,a.byteLength);let r=0;const t=()=>{const I=e.getUint16(r);return r+=2,I},o=()=>{const I=e.getUint32(r);return r+=4,I},s=()=>{const I=e.getInt32(r);return r+=4,I},u=t();if(u!==0)throw new Error(`Unsupported ISO 21496-1 minimum_version ${u}`);t();const l=e.getUint8(r++);if(l&qi)throw new Error("ISO 21496-1 metadata with HDR base image is not supported");const d=l&Vi?3:1,h=l&Ki?o():void 0,v=I=>{const L=I?s():o(),N=h??o();if(N===0)throw new Error("Invalid ISO 21496-1 fraction with zero denominator");return L/N},g=v(!1),b=v(!1);if(g>b)throw new Error("ISO 21496-1 metadata with HDR base image is not supported");const U=[],D=[],H=[],A=[],S=[];for(let I=0;I<d;I++)U.push(v(!0)),D.push(v(!0)),H.push(v(!1)),A.push(v(!0)),S.push(v(!0));const z=I=>d===3?I:[I[0],I[0],I[0]];return{gainMapMin:z(U),gainMapMax:z(D),gamma:z(H),offsetSdr:z(A),offsetHdr:z(S),hdrCapacityMin:g,hdrCapacityMax:b}};class Qr extends Error{}class Jr extends Error{}const Cr=Array.from(Xi,a=>a.charCodeAt(0)),Ji=a=>{const e=new DataView(a.buffer,a.byteOffset,a.byteLength),r=4+Cr.length;for(let t=0;t+r<a.length;t++){if(a[t]!==255||a[t+1]!==226||!Cr.every((s,u)=>a[t+4+u]===s))continue;const o=Math.min(a.length,t+2+e.getUint16(t+2));if(!(o-(t+r)<=4))try{return Qi(a.subarray(t+r,o))}catch{return}}},nn=(a,e,r)=>{const t=new RegExp(`${e}="([^"]*)"`,"i").exec(a);if(t)return t[1];const o=new RegExp(`<${e}[^>]*>([\\s\\S]*?)</${e}>`,"i").exec(a);if(o){const s=o[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);return s&&s.length===3?s.map(u=>u.replace(/<\/?rdf:li>/g,"")):o[1].trim()}if(r!==void 0)return r;throw new Error(`Can't find ${e} in gainmap metadata`)},eo=a=>{let e;typeof TextDecoder<"u"?e=new TextDecoder().decode(a):e=a.toString();let r=e.indexOf("<x:xmpmeta");for(;r!==-1;){const t=e.indexOf("x:xmpmeta>",r),o=e.slice(r,t+10);try{const s=nn(o,"hdrgm:GainMapMin","0"),u=nn(o,"hdrgm:GainMapMax"),l=nn(o,"hdrgm:Gamma","1"),d=nn(o,"hdrgm:OffsetSDR","0.015625"),h=nn(o,"hdrgm:OffsetHDR","0.015625"),v=/hdrgm:HDRCapacityMin="([^"]*)"/.exec(o),g=v?v[1]:"0",b=/hdrgm:HDRCapacityMax="([^"]*)"/.exec(o);if(!b)throw new Error("Incomplete gainmap metadata");const U=b[1];return{gainMapMin:Array.isArray(s)?s.map(D=>parseFloat(D)):[parseFloat(s),parseFloat(s),parseFloat(s)],gainMapMax:Array.isArray(u)?u.map(D=>parseFloat(D)):[parseFloat(u),parseFloat(u),parseFloat(u)],gamma:Array.isArray(l)?l.map(D=>parseFloat(D)):[parseFloat(l),parseFloat(l),parseFloat(l)],offsetSdr:Array.isArray(d)?d.map(D=>parseFloat(D)):[parseFloat(d),parseFloat(d),parseFloat(d)],offsetHdr:Array.isArray(h)?h.map(D=>parseFloat(D)):[parseFloat(h),parseFloat(h),parseFloat(h)],hdrCapacityMin:parseFloat(g),hdrCapacityMax:parseFloat(U)}}catch{}r=e.indexOf("<x:xmpmeta",t)}};class to{options;constructor(e){this.options={debug:e&&e.debug!==void 0?e.debug:!1,extractFII:e&&e.extractFII!==void 0?e.extractFII:!0,extractNonFII:e&&e.extractNonFII!==void 0?e.extractNonFII:!0}}extract(e){return new Promise((r,t)=>{const o=this.options.debug,s=new DataView(e.buffer);if(s.getUint16(0)!==65496){t(new Error("Not a valid jpeg"));return}const u=s.byteLength;let l=2,d=0,h;for(;l<u;){if(++d>250){t(new Error(`Found no marker after ${d} loops 😵`));return}if(s.getUint8(l)!==255){t(new Error(`Not a valid marker at offset 0x${l.toString(16)}, found: 0x${s.getUint8(l).toString(16)}`));return}if(h=s.getUint8(l+1),o&&console.log(`Marker: ${h.toString(16)}`),h===226){o&&console.log("Found APP2 marker (0xffe2)");const v=l+4;if(s.getUint32(v)===1297106432){const g=v+4;let b;if(s.getUint16(g)===18761)b=!1;else if(s.getUint16(g)===19789)b=!0;else{t(new Error("No valid endianness marker found in TIFF header"));return}if(s.getUint16(g+2,!b)!==42){t(new Error("Not valid TIFF data! (no 0x002A marker)"));return}const U=s.getUint32(g+4,!b);if(U<8){t(new Error("Not valid TIFF data! (First offset less than 8)"));return}const D=g+U,H=s.getUint16(D,!b),A=D+2;let S=0;for(let N=A;N<A+12*H;N+=12)s.getUint16(N,!b)===45057&&(S=s.getUint32(N+8,!b));const I=D+2+H*12+4,L=[];for(let N=I;N<I+S*16;N+=16){const M={MPType:s.getUint32(N,!b),size:s.getUint32(N+4,!b),dataOffset:s.getUint32(N+8,!b),dependantImages:s.getUint32(N+12,!b),start:-1,end:-1,isFII:!1};M.dataOffset?(M.start=g+M.dataOffset,M.isFII=!1):(M.start=0,M.isFII=!0),M.end=M.start+M.size,L.push(M)}if(this.options.extractNonFII&&L.length){const N=new Blob([s]),M=[];for(const $ of L){if($.isFII&&!this.options.extractFII)continue;const E=N.slice($.start,$.end+1,"image/jpeg");M.push(E)}r(M)}}}l+=2+s.getUint16(l+2)}})}}const no=async a=>{const e=Ji(a)??eo(a);if(!e)throw new Jr("Gain map XMP metadata not found");const t=await new to({extractFII:!0,extractNonFII:!0}).extract(a);if(t.length!==2)throw new Qr("Gain map recovery image not found");return{sdr:new Uint8Array(await t[0].arrayBuffer()),gainMap:new Uint8Array(await t[1].arrayBuffer()),metadata:e}},Rr=a=>new Promise((e,r)=>{const t=document.createElement("img");t.onload=()=>{e(t)},t.onerror=o=>{r(o)},t.src=URL.createObjectURL(a)}),ro=async(a,e,r)=>{const t=e?new Blob([e],{type:"image/jpeg"}):void 0,o=new Blob([a],{type:"image/jpeg"});let s,u,l=!1;if(typeof createImageBitmap>"u"){const d=await Promise.all([t?Rr(t):Promise.resolve(void 0),Rr(o)]);u=d[0],s=d[1],l=r==="flipY"}else{const d=await Promise.all([t?createImageBitmap(t,{imageOrientation:r||"flipY"}):Promise.resolve(void 0),createImageBitmap(o,{imageOrientation:r||"flipY"})]);u=d[0],s=d[1]}return{sdrImage:s,gainMapImage:u,needsFlip:l}},ao=(a,e,r)=>{const t=new Yt(e||new ImageData(2,2),Sn,bt,bt,ct,vr,on,zn,1,Qn);t.flipY=r,t.needsUpdate=!0;const o=new Yt(a,Sn,bt,bt,ct,vr,on,zn,1,Fa);return o.flipY=r,o.needsUpdate=!0,{gainMap:t,sdr:o}};class io extends ja{_renderer;_renderTargetOptions;_internalLoadingManager;_config;constructor(e,r){super(r),this._config=e,e.renderer&&(this._renderer=e.renderer),this._internalLoadingManager=new ka}setRenderer(e){return this._renderer=e,this}setRenderTargetOptions(e){return this._renderTargetOptions=e,this}prepareQuadRenderer(){this._renderer||console.warn("WARNING: A Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.");const e=this._config.createMaterial({gainMapMax:[1,1,1],gainMapMin:[0,0,0],gamma:[1,1,1],offsetHdr:[1,1,1],offsetSdr:[1,1,1],hdrCapacityMax:1,hdrCapacityMin:0,maxDisplayBoost:1,gainMap:new Yt,sdr:new Yt});return this._config.createQuadRenderer({width:16,height:16,type:Qe,colorSpace:Qn,material:e,renderer:this._renderer,renderTargetOptions:this._renderTargetOptions})}processImages(e,r,t){return ro(e,r,t)}createTextures(e,r,t){return ao(e,r,t)}updateQuadRenderer(e,r,t,o,s){e.width=r.width,e.height=r.height,e.material.gainMap=t,e.material.sdr=o,e.material.gainMapMin=s.gainMapMin,e.material.gainMapMax=s.gainMapMax,e.material.offsetHdr=s.offsetHdr,e.material.offsetSdr=s.offsetSdr,e.material.gamma=s.gamma,e.material.hdrCapacityMin=s.hdrCapacityMin,e.material.hdrCapacityMax=s.hdrCapacityMax,e.material.maxDisplayBoost=Math.pow(2,s.hdrCapacityMax),e.material.needsUpdate=!0}}const oo=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,so=`
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`;class lo extends $t{_maxDisplayBoost;_hdrCapacityMin;_hdrCapacityMax;constructor({gamma:e,offsetHdr:r,offsetSdr:t,gainMapMin:o,gainMapMax:s,maxDisplayBoost:u,hdrCapacityMin:l,hdrCapacityMax:d,sdr:h,gainMap:v}){super({name:"GainMapDecoderMaterial",vertexShader:oo,fragmentShader:so,uniforms:{sdr:{value:h},gainMap:{value:v},gamma:{value:new oe(1/e[0],1/e[1],1/e[2])},offsetHdr:{value:new oe().fromArray(r)},offsetSdr:{value:new oe().fromArray(t)},gainMapMin:{value:new oe().fromArray(o)},gainMapMax:{value:new oe().fromArray(s)},weightFactor:{value:(Math.log2(u)-l)/(d-l)}},blending:Ba,depthTest:!1,depthWrite:!1}),this._maxDisplayBoost=u,this._hdrCapacityMin=l,this._hdrCapacityMax=d,this.needsUpdate=!0,this.uniformsNeedUpdate=!0}get sdr(){return this.uniforms.sdr.value}set sdr(e){this.uniforms.sdr.value=e}get gainMap(){return this.uniforms.gainMap.value}set gainMap(e){this.uniforms.gainMap.value=e}get offsetHdr(){return this.uniforms.offsetHdr.value.toArray()}set offsetHdr(e){this.uniforms.offsetHdr.value.fromArray(e)}get offsetSdr(){return this.uniforms.offsetSdr.value.toArray()}set offsetSdr(e){this.uniforms.offsetSdr.value.fromArray(e)}get gainMapMin(){return this.uniforms.gainMapMin.value.toArray()}set gainMapMin(e){this.uniforms.gainMapMin.value.fromArray(e)}get gainMapMax(){return this.uniforms.gainMapMax.value.toArray()}set gainMapMax(e){this.uniforms.gainMapMax.value.fromArray(e)}get gamma(){const e=this.uniforms.gamma.value;return[1/e.x,1/e.y,1/e.z]}set gamma(e){const r=this.uniforms.gamma.value;r.x=1/e[0],r.y=1/e[1],r.z=1/e[2]}get hdrCapacityMin(){return this._hdrCapacityMin}set hdrCapacityMin(e){this._hdrCapacityMin=e,this.calculateWeight()}get hdrCapacityMax(){return this._hdrCapacityMax}set hdrCapacityMax(e){this._hdrCapacityMax=e,this.calculateWeight()}get maxDisplayBoost(){return this._maxDisplayBoost}set maxDisplayBoost(e){this._maxDisplayBoost=Math.max(1,Math.min(65504,e)),this.calculateWeight()}calculateWeight(){const e=(Math.log2(this._maxDisplayBoost)-this._hdrCapacityMin)/(this._hdrCapacityMax-this._hdrCapacityMin);this.uniforms.weightFactor.value=Math.max(0,Math.min(1,e))}}class ea extends io{constructor(e,r){super({renderer:e,createMaterial:t=>new lo(t),createQuadRenderer:t=>new nr(t)},r)}async render(e,r,t,o){const{sdrImage:s,gainMapImage:u,needsFlip:l}=await this.processImages(t,o,"flipY"),{gainMap:d,sdr:h}=this.createTextures(s,u,l);this.updateQuadRenderer(e,s,d,h,r),e.render()}}class co extends ea{load([e,r,t],o,s,u){const l=this.prepareQuadRenderer();let d,h,v;const g=async()=>{if(d&&h&&v){try{await this.render(l,v,d,h)}catch(_){this.manager.itemError(e),this.manager.itemError(r),this.manager.itemError(t),typeof u=="function"&&u(_),l.disposeOnDemandRenderer();return}typeof o=="function"&&o(l),this.manager.itemEnd(e),this.manager.itemEnd(r),this.manager.itemEnd(t),l.disposeOnDemandRenderer()}};let b=!0,U=0,D=0,H=!0,A=0,S=0,z=!0,I=0,L=0;const N=()=>{if(typeof s=="function"){const _=U+A+I,P=D+S+L,X=b&&H&&z;s(new ProgressEvent("progress",{lengthComputable:X,loaded:P,total:_}))}};this.manager.itemStart(e),this.manager.itemStart(r),this.manager.itemStart(t);const M=new En(this._internalLoadingManager);M.setResponseType("arraybuffer"),M.setRequestHeader(this.requestHeader),M.setPath(this.path),M.setWithCredentials(this.withCredentials),M.load(e,async _=>{if(typeof _=="string")throw new Error("Invalid sdr buffer");d=_,await g()},_=>{b=_.lengthComputable,D=_.loaded,U=_.total,N()},_=>{this.manager.itemError(e),typeof u=="function"&&u(_)});const $=new En(this._internalLoadingManager);$.setResponseType("arraybuffer"),$.setRequestHeader(this.requestHeader),$.setPath(this.path),$.setWithCredentials(this.withCredentials),$.load(r,async _=>{if(typeof _=="string")throw new Error("Invalid gainmap buffer");h=_,await g()},_=>{H=_.lengthComputable,S=_.loaded,A=_.total,N()},_=>{this.manager.itemError(r),typeof u=="function"&&u(_)});const E=new En(this._internalLoadingManager);return E.setRequestHeader(this.requestHeader),E.setPath(this.path),E.setWithCredentials(this.withCredentials),E.load(t,async _=>{if(typeof _!="string")throw new Error("Invalid metadata string");v=JSON.parse(_),await g()},_=>{z=_.lengthComputable,L=_.loaded,I=_.total,N()},_=>{this.manager.itemError(t),typeof u=="function"&&u(_)}),l}}class uo extends ea{load(e,r,t,o){const s=this.prepareQuadRenderer(),u=new En(this._internalLoadingManager);return u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),u.setPath(this.path),u.setWithCredentials(this.withCredentials),this.manager.itemStart(e),u.load(e,async l=>{if(typeof l=="string")throw new Error("Invalid buffer, received [string], was expecting [ArrayBuffer]");const d=new Uint8Array(l);let h,v,g;try{const b=await no(d);h=b.sdr,v=b.gainMap,g=b.metadata}catch(b){if(b instanceof Jr||b instanceof Qr)console.warn(`Failure to reconstruct an HDR image from ${e}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`),g={gainMapMin:[0,0,0],gainMapMax:[1,1,1],gamma:[1,1,1],hdrCapacityMin:0,hdrCapacityMax:1,offsetHdr:[0,0,0],offsetSdr:[0,0,0]},h=d;else throw b}try{await this.render(s,g,h.buffer,v?.buffer)}catch(b){this.manager.itemError(e),typeof o=="function"&&o(b),s.disposeOnDemandRenderer();return}typeof r=="function"&&r(s),this.manager.itemEnd(e),s.disposeOnDemandRenderer()},t,l=>{this.manager.itemError(e),typeof o=="function"&&o(l)}),s}}const sn={apartment:"lebombo_1k.hdr",city:"potsdamer_platz_1k.hdr",dawn:"kiara_1_dawn_1k.hdr",forest:"forest_slope_1k.hdr",lobby:"st_fagans_interior_1k.hdr",night:"dikhololo_night_1k.hdr",park:"rooitou_park_1k.hdr",studio:"studio_small_03_1k.hdr",sunset:"venice_sunset_1k.hdr",warehouse:"empty_warehouse_01_1k.hdr"},ta="https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/",Zt=a=>Array.isArray(a),rr=["/px.png","/nx.png","/py.png","/ny.png","/pz.png","/nz.png"];function In({files:a=rr,path:e="",preset:r=void 0,colorSpace:t=void 0,extensions:o}={}){r&&(ar(r),a=sn[r],e=ta);const s=Zt(a),{extension:u,isCubemap:l}=ir(a),d=or(u);if(!d)throw new Error("useEnvironment: Unrecognized file extension: "+a);const h=Te(U=>U.gl);x.useLayoutEffect(()=>{if(u!=="webp"&&u!=="jpg"&&u!=="jpeg")return;function U(){Mn.clear(d,s?[a]:a)}h.domElement.addEventListener("webglcontextlost",U,{once:!0})},[a,h.domElement]);const v=Mn(d,s?[a]:a,U=>{(u==="webp"||u==="jpg"||u==="jpeg")&&U.setRenderer(h),U.setPath==null||U.setPath(e),o&&o(U)});let g=s?v[0]:v;if(u==="jpg"||u==="jpeg"||u==="webp"){var b;g=(b=g.renderTarget)==null?void 0:b.texture}return g.mapping=l?Na:za,g.colorSpace=t??(l?"srgb":"srgb-linear"),g}const fo={files:rr,path:"",preset:void 0,extensions:void 0};In.preload=a=>{const e={...fo,...a};let{files:r,path:t=""}=e;const{preset:o,extensions:s}=e;o&&(ar(o),r=sn[o],t=ta);const{extension:u}=ir(r);if(u==="webp"||u==="jpg"||u==="jpeg")throw new Error("useEnvironment: Preloading gainmaps is not supported");const l=or(u);if(!l)throw new Error("useEnvironment: Unrecognized file extension: "+r);Mn.preload(l,Zt(r)?[r]:r,d=>{d.setPath==null||d.setPath(t),s&&s(d)})};const ho={files:rr,preset:void 0};In.clear=a=>{const e={...ho,...a};let{files:r}=e;const{preset:t}=e;t&&(ar(t),r=sn[t]);const{extension:o}=ir(r),s=or(o);if(!s)throw new Error("useEnvironment: Unrecognized file extension: "+r);Mn.clear(s,Zt(r)?[r]:r)};function ar(a){if(!(a in sn))throw new Error("Preset must be one of: "+Object.keys(sn).join(", "))}function ir(a){var e;const r=Zt(a)&&a.length===6,t=Zt(a)&&a.length===3&&a.some(u=>u.endsWith("json")),o=Zt(a)?a[0]:a;return{extension:r?"cube":t?"webp":o.startsWith("data:application/exr")?"exr":o.startsWith("data:application/hdr")?"hdr":o.startsWith("data:image/jpeg")?"jpg":(e=o.split(".").pop())==null||(e=e.split("?"))==null||(e=e.shift())==null?void 0:e.toLowerCase(),isCubemap:r,isGainmap:t}}function or(a){return a==="cube"?Ha:a==="hdr"?zi:a==="exr"?Hi:a==="jpg"||a==="jpeg"?uo:a==="webp"?co:null}const po=a=>a.current&&a.current.isScene,mo=a=>po(a)?a.current:a;function sr(a,e,r,t,o={}){var s,u,l,d;o={backgroundBlurriness:0,backgroundIntensity:1,backgroundRotation:[0,0,0],environmentIntensity:1,environmentRotation:[0,0,0],...o};const h=mo(e||r),v=h.background,g=h.environment,b={backgroundBlurriness:h.backgroundBlurriness,backgroundIntensity:h.backgroundIntensity,backgroundRotation:(s=(u=h.backgroundRotation)==null||u.clone==null?void 0:u.clone())!==null&&s!==void 0?s:[0,0,0],environmentIntensity:h.environmentIntensity,environmentRotation:(l=(d=h.environmentRotation)==null||d.clone==null?void 0:d.clone())!==null&&l!==void 0?l:[0,0,0]};return a!=="only"&&(h.environment=t),a&&(h.background=t),Hn(h,o),()=>{a!=="only"&&(h.environment=g),a&&(h.background=v),Hn(h,b)}}function lr({scene:a,background:e=!1,map:r,...t}){const o=Te(s=>s.scene);return x.useLayoutEffect(()=>{if(r)return sr(e,a,o,r,t)}),null}function na({background:a=!1,scene:e,blur:r,backgroundBlurriness:t,backgroundIntensity:o,backgroundRotation:s,environmentIntensity:u,environmentRotation:l,...d}){const h=In(d),v=Te(g=>g.scene);return x.useLayoutEffect(()=>sr(a,e,v,h,{backgroundBlurriness:r??t,backgroundIntensity:o,backgroundRotation:s,environmentIntensity:u,environmentRotation:l})),x.useEffect(()=>()=>{h.dispose()},[h]),null}function vo({children:a,near:e=.1,far:r=1e3,resolution:t=256,frames:o=1,map:s,background:u=!1,blur:l,backgroundBlurriness:d,backgroundIntensity:h,backgroundRotation:v,environmentIntensity:g,environmentRotation:b,scene:U,files:D,path:H,preset:A=void 0,extensions:S}){const z=Te(E=>E.gl),I=Te(E=>E.scene),L=x.useRef(null),[N]=x.useState(()=>new jr),M=x.useMemo(()=>{const E=new Ga(t);return E.texture.type=Qe,E},[t]);x.useEffect(()=>()=>{M.dispose()},[M]),x.useLayoutEffect(()=>{if(o===1){const E=z.autoClear;z.autoClear=!0,L.current.update(z,N),z.autoClear=E}return sr(u,U,I,M.texture,{backgroundBlurriness:l??d,backgroundIntensity:h,backgroundRotation:v,environmentIntensity:g,environmentRotation:b})},[a,N,M.texture,U,I,u,o,z]);let $=1;return ln(()=>{if(o===1/0||$<o){const E=z.autoClear;z.autoClear=!0,L.current.update(z,N),z.autoClear=E,$++}}),x.createElement(x.Fragment,null,Wa(x.createElement(x.Fragment,null,a,x.createElement("cubeCamera",{ref:L,args:[e,r,M]}),D||A?x.createElement(na,{background:!0,files:D,preset:A,path:H,extensions:S}):s?x.createElement(lr,{background:!0,map:s,extensions:S}):null),N))}function go(a){var e,r,t,o;const s=In(a),u=a.map||s;x.useMemo(()=>Ur({GroundProjectedEnvImpl:Ri}),[]),x.useEffect(()=>()=>{s.dispose()},[s]);const l=x.useMemo(()=>[u],[u]),d=(e=a.ground)==null?void 0:e.height,h=(r=a.ground)==null?void 0:r.radius,v=(t=(o=a.ground)==null?void 0:o.scale)!==null&&t!==void 0?t:1e3;return x.createElement(x.Fragment,null,x.createElement(lr,ut({},a,{map:u})),x.createElement("groundProjectedEnvImpl",{args:l,scale:v,height:d,radius:h}))}function wo(a){return a.ground?x.createElement(go,a):a.map?x.createElement(lr,a):a.children?x.createElement(vo,a):x.createElement(na,a)}const yo=x.forwardRef(({scale:a=10,frames:e=1/0,opacity:r=1,width:t=1,height:o=1,blur:s=1,near:u=0,far:l=10,resolution:d=512,smooth:h=!0,color:v="#000000",depthWrite:g=!1,renderOrder:b,...U},D)=>{const H=x.useRef(null),A=Te(W=>W.scene),S=Te(W=>W.gl),z=x.useRef(null);t=t*(Array.isArray(a)?a[0]:a||1),o=o*(Array.isArray(a)?a[1]:a||1);const[I,L,N,M,$,E,_]=x.useMemo(()=>{const W=new _n(d,d),J=new _n(d,d);J.texture.generateMipmaps=W.texture.generateMipmaps=!1;const q=new qn(t,o).rotateX(Math.PI/2),de=new cn(q),ce=new Za;ce.depthTest=ce.depthWrite=!1,ce.onBeforeCompile=we=>{we.uniforms={...we.uniforms,ucolor:{value:new Lr(v)}},we.fragmentShader=we.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),we.fragmentShader=we.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};const Ee=new $t(Bi),re=new $t(Ni);return re.depthTest=Ee.depthTest=!1,[W,q,ce,de,Ee,re,J]},[d,t,o,a,v]),P=W=>{M.visible=!0,M.material=$,$.uniforms.tDiffuse.value=I.texture,$.uniforms.h.value=W*1/256,S.setRenderTarget(_),S.render(M,z.current),M.material=E,E.uniforms.tDiffuse.value=_.texture,E.uniforms.v.value=W*1/256,S.setRenderTarget(I),S.render(M,z.current),M.visible=!1};let X=0,te,ee;return ln(()=>{z.current&&(e===1/0||X<e)&&(X++,te=A.background,ee=A.overrideMaterial,H.current.visible=!1,A.background=null,A.overrideMaterial=N,S.setRenderTarget(I),S.render(A,z.current),P(s),h&&P(s*.4),S.setRenderTarget(null),H.current.visible=!0,A.overrideMaterial=ee,A.background=te)}),x.useImperativeHandle(D,()=>H.current,[]),x.createElement("group",ut({"rotation-x":Math.PI/2},U,{ref:H}),x.createElement("mesh",{renderOrder:b,geometry:L,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},x.createElement("meshBasicMaterial",{transparent:!0,map:I.texture,opacity:r,depthWrite:g})),x.createElement("orthographicCamera",{ref:z,args:[-t/2,t/2,o/2,-o/2,u,l]}))}),jn=x.forwardRef(({light:a,args:e,map:r,toneMapped:t=!1,color:o="white",form:s="rect",intensity:u=1,scale:l=1,target:d=[0,0,0],children:h,...v},g)=>{const b=x.useRef(null);return x.useImperativeHandle(g,()=>b.current,[]),x.useLayoutEffect(()=>{!h&&!v.material&&(Hn(b.current.material,{color:o}),b.current.material.color.multiplyScalar(u))},[o,u,h,v.material]),x.useLayoutEffect(()=>{v.rotation||b.current.quaternion.identity(),d&&!v.rotation&&(typeof d=="boolean"?b.current.lookAt(0,0,0):b.current.lookAt(Array.isArray(d)?new oe(...d):d))},[d,v.rotation]),l=Array.isArray(l)&&l.length===2?[l[0],l[1],1]:l,x.createElement("mesh",ut({ref:b,scale:l},v),s==="circle"?x.createElement("ringGeometry",{args:e||[0,.5,64]}):s==="ring"?x.createElement("ringGeometry",{args:e||[.25,.5,64]}):s==="rect"||s==="plane"?x.createElement("planeGeometry",{args:e||[1,1]}):s==="box"?x.createElement("boxGeometry",{args:e||[1,1,1]}):x.createElement(s,{args:e}),h||x.createElement("meshBasicMaterial",{toneMapped:t,map:r,side:Vn}),a&&x.createElement("pointLight",ut({castShadow:!0},a)))}),kn=(a,e={})=>kr(x.useMemo(()=>new Ht({color:a,roughness:.6,...e}),[a])),Fn=({x0:a,x1:e,y0:r,y1:t,z:o,n:s,mr:u,mk:l,buka:d})=>{const h=(e-a)/s;return m.jsx(m.Fragment,{children:Array.from({length:s},(v,g)=>{const b=g%2===0,U=b?a+g*h:a+(g+1)*h,D=b?.004:-h+.004,H=b?h-.004:-.004;return m.jsxs(Xa,{posisi:[U,0,o],ry:d?b?-1.3:1.3:0,children:[m.jsx(Fr,{x0:D,x1:H,y0:r,y1:t,t:.025,d:.025,m:u}),m.jsx("mesh",{position:[(D+H)/2,(r+t)/2,0],material:l,renderOrder:2,children:m.jsx("boxGeometry",{args:[Math.max(.02,h-.05),Math.max(.02,t-r-.05),.008]})}),m.jsx(Fe,{p:[b?h-.05:-h+.05,(r+t)/2,.025],s:[.015,Math.min(.25,(t-r)*.4),.015],m:u})]},g)})})},Bn=({w:a,y0:e,y1:r,d:t,rak:o,mr:s,mDalam:u})=>{const l=r-e;return m.jsxs("group",{children:[m.jsx(Fe,{p:[0,(e+r)/2,-t+.01],s:[a,l,.02],m:u}),[-1,1].map(d=>m.jsx(Fe,{p:[d*(a/2-.01),(e+r)/2,-t/2],s:[.02,l,t],m:u},d)),m.jsx(Fe,{p:[0,e+.01,-t/2],s:[a,.02,t],m:u}),m.jsx(Fe,{p:[0,r-.01,-t/2],s:[a,.02,t],m:u}),Array.from({length:o},(d,h)=>m.jsx(Fe,{p:[0,e+(h+1)*l/(o+1),-t/2],s:[a-.04,.015,t-.03],m:u},h)),m.jsx(Fr,{x0:-a/2,x1:a/2,y0:e,y1:r,t:.03,d:.03,z:-.015,m:s})]})},xo=({w:a,h:e,v:r,buka:t})=>{const o=$a(r.rangka),s=Ya(r.kaca),u=kn("#e8e6e1",{roughness:.8}),l=kn("#2f3236",{roughness:.35,metalness:.1}),d=kn("#d9c9a8",{roughness:1}),h=kr(x.useMemo(()=>new Ht({color:"#4fa3c7",transparent:!0,opacity:.35,depthWrite:!1}),[])),v=H=>Math.max(1,Math.round(H/.45));if(r.bentuk==="perabot-aquarium"){const A=Math.min(.5,Math.max(.3,a*.4)),S=.75,z=[[0,S+e/2,A/2,a,e,.008],[0,S+e/2,-A/2,a,e,.008],[a/2,S+e/2,0,.008,e,A],[-a/2,S+e/2,0,.008,e,A]];return m.jsxs("group",{position:[0,0,A/2+.05],children:[[-1,1].flatMap(I=>[-1,1].map(L=>m.jsx(Fe,{p:[I*(a/2-.02),.75/2,L*(A/2-.02)],s:[.04,.75,.04],m:o},`${I}${L}`))),m.jsx(Fe,{p:[0,.75-.02,0],s:[a,.04,A],m:o}),z.map(([I,L,N,M,$,E],_)=>m.jsx("mesh",{position:[I,L,N],material:s,renderOrder:2,children:m.jsx("boxGeometry",{args:[M,$,E]})},_)),m.jsx("mesh",{position:[0,S+e*.85/2,0],material:h,renderOrder:1,children:m.jsx("boxGeometry",{args:[a-.02,e*.85,A-.02]})}),m.jsx(Fe,{p:[0,S+.02,0],s:[a-.02,.04,A-.02],m:d}),[S,S+e].map(I=>m.jsxs("group",{children:[m.jsx(Fe,{p:[0,I,A/2],s:[a+.02,.025,.02],m:o}),m.jsx(Fe,{p:[0,I,-A/2],s:[a+.02,.025,.02],m:o}),m.jsx(Fe,{p:[a/2,I,0],s:[.02,.025,A],m:o}),m.jsx(Fe,{p:[-a/2,I,0],s:[.02,.025,A],m:o})]},I))]})}if(r.bentuk==="perabot-kitchen"){const A=Math.min(.88,e),S=1.5,z=Math.min(e,2.3);return m.jsxs("group",{position:[0,0,.6],children:[m.jsx(Bn,{w:a,y0:.08,y1:A,d:.6,rak:1,mr:o,mDalam:u}),m.jsx(Fe,{p:[0,.04,-.6/2],s:[a-.04,.08,.6-.06],m:o}),m.jsx(Fn,{x0:-a/2+.02,x1:a/2-.02,y0:.1,y1:A-.02,z:.005,n:v(a),mr:o,mk:s,buka:t}),m.jsx(Fe,{p:[0,A+.02,-.6/2+.01],s:[a+.02,.04,.6+.02],m:l}),z-S>.2&&m.jsxs("group",{position:[0,0,-.6+.36],children:[m.jsx(Bn,{w:a,y0:S,y1:z,d:.36,rak:1,mr:o,mDalam:u}),m.jsx(Fn,{x0:-a/2+.02,x1:a/2-.02,y0:S+.02,y1:z-.02,z:.005,n:v(a),mr:o,mk:s,buka:t})]})]})}const g=r.bentuk==="perabot-rak",b=g?.35:.55,U=g?Math.max(1,Math.round(e/.22)-1):Math.max(1,Math.round(e/.45)-1),D=g?Math.max(2,v(a)):Math.max(2,Math.round(a/.5));return m.jsxs("group",{position:[0,0,b],children:[m.jsx(Bn,{w:a,y0:.06,y1:e,d:b,rak:U,mr:o,mDalam:u}),m.jsx(Fe,{p:[0,.03,-b/2],s:[a-.04,.06,b-.06],m:o}),m.jsx(Fn,{x0:-a/2+.02,x1:a/2-.02,y0:.08,y1:e-.02,z:.005,n:D,mr:o,mk:s,buka:t})]})},Q=.3,st=3,$n=Q+st,Gt=-3.6,bn=3.6,Yn=1.6,xt=-3.2,Xn=3,G={pintu:{x:0},jendela:{x:-2.35,ambang:.9},partisi:{x:2.6,z:-1.5},railing:{x:-2.2,z:Xn-.15},perabot:{x:2.6,z:xt+.1}},Ve=(a,e,r)=>Math.min(r,Math.max(e,a)),bo=(a,e)=>{const r=e.lebar/100,t=e.tinggi/100;switch(a){case"pintu":return{w:Ve(r,.7,2.6),h:Ve(t,1.8,2.85)};case"jendela":return{w:Ve(r,.4,2),h:Ve(t,.4,1.8)};case"kanopi":return{w:Ve(r,1.5,3.4),h:Ve(t,1,2.5)};case"partisi":return{w:Ve(r,.6,1.8),h:Ve(t,1.8,2.9)};case"railing":return{w:Ve(r,1,2.8),h:Ve(t,.9,1.2)};case"perabot":return{w:Ve(r,.4,1.8),h:Ve(t,.25,2.3)}}},Eo=(a,e)=>{const{model:r,warna:t,kaca:o}=Ja(a,e);return{bentuk:r?.bentuk??"jendela-mati",rangka:t?.hex??"#c4c8cc",kaca:{warna:o?.warnaHex??"#cfe8de",opasitas:o?.opasitas??.25,buram:!!o?.buram}}},_o=({lubang:a,m:e})=>{const r=[Gt,Yn,...a.flatMap(o=>[o.x0,o.x1])].filter(o=>o>=Gt&&o<=Yn).sort((o,s)=>o-s),t=[];for(let o=0;o<r.length-1;o++){const s=r[o],u=r[o+1];if(u-s<.001)continue;const l=(s+u)/2,d=a.find(v=>l>v.x0&&l<v.x1);(d?[[Q,d.y0],[d.y1,$n]]:[[Q,$n]]).forEach(([v,g],b)=>{g-v<.001||t.push(m.jsx("mesh",{position:[l,(v+g)/2,0],material:e,castShadow:!0,receiveShadow:!0,children:m.jsx("boxGeometry",{args:[u-s,g-v,.2]})},`${o}-${b}`))})}return m.jsx("group",{children:t})},Ke=({dari:a,ke:e,label:r,geser:t,tampil:o})=>{const s=new oe(...a).add(new oe(...t)),u=new oe(...e).add(new oe(...t)),l=s.clone().add(u).multiplyScalar(.5),d=new oe(...t).normalize().multiplyScalar(.08);return m.jsxs("group",{visible:o,children:[m.jsx(Ln,{points:[s,u],color:"#f2c230",lineWidth:2.5}),m.jsx(Ln,{points:[s.clone().sub(d),s.clone().add(d)],color:"#f2c230",lineWidth:2.5}),m.jsx(Ln,{points:[u.clone().sub(d),u.clone().add(d)],color:"#f2c230",lineWidth:2.5}),m.jsx(zr,{position:l,center:!0,zIndexRange:[20,0],style:{display:o?void 0:"none"},children:m.jsx("span",{className:"label-ukuran",children:r})})]})},Bt=({slot:a,nama:e,aktif:r,disorot:t,onPilih:o,onSorot:s,labelPos:u,children:l})=>m.jsxs("group",{onClick:d=>{d.stopPropagation(),o(a)},onPointerOver:d=>{d.stopPropagation(),s(a)},onPointerOut:()=>s(null),children:[l,m.jsx(zr,{position:u,center:!0,zIndexRange:[30,0],style:{pointerEvents:"none",display:t&&!r?void 0:"none"},children:m.jsxs("span",{className:"label-slot",children:[e,m.jsx("small",{children:"Click to configure"})]})})]}),Or={depan:{pos:[3.2,4.4,11],target:[0,1.4,0]},atas:{pos:[.01,12.5,5.5],target:[0,.4,0]},dalam:{pos:[1.2,1.75,-2.7],target:[-.6,1.4,0]},pintu:{pos:[.9,2.1,5.4],target:[0,1.35,0]},jendela:{pos:[-3.3,2.1,4.3],target:[-2.35,1.75,0]},kanopi:{pos:[3.6,4.6,7.2],target:[0,2.3,1.2]},partisi:{pos:[3.1,3,3.4],target:[2.6,1.4,-1.5]},railing:{pos:[-.8,2.1,6.3],target:[-2.2,.8,2.85]},perabot:{pos:[2.3,2,.4],target:[2.6,1,-2.7]}},So=({slotAktif:a,sudut:e})=>{const r=Te(h=>h.controls),t=Te(h=>h.camera),o=Te(h=>h.size),s=Te(h=>h.invalidate),u=x.useRef(null),l=x.useRef(!0),d=h=>{const v=new oe(...h.target),g=new oe(...h.pos),b=o.width/Math.max(1,o.height);b<1&&g.sub(v).multiplyScalar(Math.min(1.9,1/b)*.9).add(v),u.current={pos:g,target:v,sampai:performance.now()+2600},s()};return x.useEffect(()=>{r&&(l.current&&(l.current=!1,!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches&&!a&&t.position.set(11,10,20)),d(a?Or[a]:Or[e.nama]))},[r,a,e.kali]),x.useEffect(()=>{if(!r)return;const h=()=>u.current=null;return r.addEventListener("start",h),()=>r.removeEventListener("start",h)},[r]),ln((h,v)=>{const g=u.current;if(!g||!r)return;const b=1-Math.exp(-3.2*Math.min(v,.05));t.position.lerp(g.pos,b),r.target.lerp(g.target,b),r.update(),s(),(t.position.distanceTo(g.pos)<.01&&r.target.distanceTo(g.target)<.01||performance.now()>g.sampai)&&(u.current=null)}),null},Mo=({produkPerSlot:a,konfigurasi:e,slugAktif:r,onPilih:t,buka:o,malam:s})=>{const[u,l]=x.useState(null);x.useEffect(()=>(document.body.style.cursor=u?"pointer":"",()=>{document.body.style.cursor=""}),[u]);const d=x.useMemo(()=>new Ht({color:"#f4f3ef",roughness:.9}),[]),h=x.useMemo(()=>new Ht({color:"#ebe8e1",roughness:.95}),[]),v=x.useMemo(()=>new Ht({color:"#a7aea9",roughness:.85}),[]),g=x.useMemo(()=>new Ht({color:"#c7b597",roughness:.75}),[]);x.useEffect(()=>()=>[d,h,v,g].forEach(E=>E.dispose()),[d,h,v,g]);const b=E=>{const _=a[E];if(!_)return null;const P=yr(_,e[_.slug]??{});return{p:_,k:P,u:bo(E,P),v:Eo(_,yr(_,P))}},U=b("pintu"),D=b("jendela"),H=b("kanopi"),A=b("partisi"),S=b("railing"),z=b("perabot"),I=[];if(U&&I.push({x0:G.pintu.x-U.u.w/2,x1:G.pintu.x+U.u.w/2,y0:Q,y1:Q+U.u.h}),D){const E=Q+G.jendela.ambang;I.push({x0:G.jendela.x-D.u.w/2,x1:G.jendela.x+D.u.w/2,y0:E,y1:E+D.u.h})}const L=E=>!!r&&a[E]?.slug===r,N=E=>{const _=a[E];_&&t(_.slug)},M=E=>`${Math.round(E*100)} cm`,$=E=>{const _=b(E);return _?_.k:null};return m.jsxs(m.Fragment,{children:[m.jsx("color",{attach:"background",args:[s?"#1b2226":"#cdd3d0"]}),m.jsx("fog",{attach:"fog",args:[s?"#1b2226":"#cdd3d0",20,38]}),m.jsx("hemisphereLight",{args:s?["#7d8fa8","#1b2226",.35]:["#ffffff","#9aa29e",.75]}),s&&m.jsxs(m.Fragment,{children:[m.jsx("pointLight",{position:[-.5,2.7,-1.6],intensity:9,distance:7,color:"#ffc97a",decay:1.4,castShadow:!0}),m.jsxs("mesh",{position:[-.5,2.85,-1.6],children:[m.jsx("sphereGeometry",{args:[.09,16,16]}),m.jsx("meshStandardMaterial",{color:"#fff2d0",emissive:"#ffc97a",emissiveIntensity:4})]})]}),m.jsx("directionalLight",{position:[5,9,7],intensity:s?.35:1.6,color:s?"#9fb3d1":"#ffffff",castShadow:!0,"shadow-mapSize":[2048,2048],"shadow-camera-left":-8,"shadow-camera-right":8,"shadow-camera-top":8,"shadow-camera-bottom":-8,"shadow-bias":-4e-4}),m.jsxs(wo,{resolution:128,frames:1,children:[m.jsx(jn,{intensity:2,position:[0,5,5],scale:[10,4,1]}),m.jsx(jn,{intensity:1,position:[-6,3,0],"rotation-y":Math.PI/2,scale:[8,3,1]}),m.jsx(jn,{intensity:.6,color:"#cfe8de",position:[6,2,-2],"rotation-y":-Math.PI/2,scale:[8,3,1]})]}),m.jsxs("mesh",{"rotation-x":-Math.PI/2,position:[0,0,0],receiveShadow:!0,children:[m.jsx("planeGeometry",{args:[60,60]}),m.jsx("meshStandardMaterial",{color:"#bcc3be",roughness:1})]}),m.jsx("mesh",{position:[0,Q/2,(xt+0)/2],material:g,receiveShadow:!0,children:m.jsx("boxGeometry",{args:[bn-Gt,Q,-xt]})}),m.jsx("mesh",{position:[0,Q/2,Xn/2],material:v,receiveShadow:!0,children:m.jsx("boxGeometry",{args:[bn-Gt,Q,Xn]})}),m.jsx(_o,{lubang:I,m:d}),m.jsx("mesh",{position:[0,Q+st/2,xt],material:h,receiveShadow:!0,castShadow:!0,children:m.jsx("boxGeometry",{args:[bn-Gt,st,.2]})}),m.jsx("mesh",{position:[Gt,Q+st/2,xt/2],material:h,receiveShadow:!0,castShadow:!0,children:m.jsx("boxGeometry",{args:[.2,st,-xt]})}),m.jsx("mesh",{position:[bn,Q+st/2,xt/2],material:h,receiveShadow:!0,castShadow:!0,children:m.jsx("boxGeometry",{args:[.2,st,-xt]})}),m.jsxs("mesh",{position:[Yn+.02,Q+st/2,0],children:[m.jsx("boxGeometry",{args:[.04,st,.21]}),m.jsx("meshStandardMaterial",{color:"#9aa29e"})]}),U&&m.jsx(Bt,{slot:"pintu",nama:U.p.nama,aktif:L("pintu"),disorot:u==="pintu",onPilih:N,onSorot:l,labelPos:[G.pintu.x,Q+U.u.h+.35,.3],children:m.jsx("group",{position:[G.pintu.x,Q,0],children:m.jsx(gr,{w:U.u.w,h:U.u.h,v:U.v,buka:!!o.pintu})})}),D&&m.jsx(Bt,{slot:"jendela",nama:D.p.nama,aktif:L("jendela"),disorot:u==="jendela",onPilih:N,onSorot:l,labelPos:[G.jendela.x,Q+G.jendela.ambang+D.u.h+.3,.3],children:m.jsx("group",{position:[G.jendela.x,Q+G.jendela.ambang,0],children:m.jsx(gr,{w:D.u.w,h:D.u.h,v:D.v,buka:!!o.jendela})})}),H&&m.jsx(Bt,{slot:"kanopi",nama:H.p.nama,aktif:L("kanopi"),disorot:u==="kanopi",onPilih:N,onSorot:l,labelPos:[G.pintu.x,$n+.4,H.u.h/2],children:m.jsx("group",{position:[G.pintu.x,Q,0],children:m.jsx(Ka,{w:H.u.w,panjang:H.u.h,v:H.v,tinggiDinding:st,nyala:s&&wr(H.p,H.k)})})}),A&&!L("perabot")&&m.jsx(Bt,{slot:"partisi",nama:A.p.nama,aktif:L("partisi"),disorot:u==="partisi",onPilih:N,onSorot:l,labelPos:[G.partisi.x,Q+A.u.h+.3,G.partisi.z],children:m.jsx("group",{position:[G.partisi.x,Q,G.partisi.z],children:m.jsx(qa,{w:A.u.w,h:A.u.h,v:A.v,buka:!!o.partisi})})}),S&&m.jsx(Bt,{slot:"railing",nama:S.p.nama,aktif:L("railing"),disorot:u==="railing",onPilih:N,onSorot:l,labelPos:[G.railing.x,Q+S.u.h+.35,G.railing.z],children:m.jsx("group",{position:[G.railing.x,Q,G.railing.z],children:m.jsx(Qa,{panjang:S.u.w,h:S.u.h,v:S.v,nyala:s&&wr(S.p,S.k)})})}),U&&m.jsxs(m.Fragment,{children:[m.jsx(Ke,{tampil:L("pintu"),dari:[G.pintu.x-U.u.w/2,Q+U.u.h,.15],ke:[G.pintu.x+U.u.w/2,Q+U.u.h,.15],geser:[0,.18,0],label:M($("pintu").lebar/100)}),m.jsx(Ke,{tampil:L("pintu"),dari:[G.pintu.x+U.u.w/2,Q,.15],ke:[G.pintu.x+U.u.w/2,Q+U.u.h,.15],geser:[.2,0,0],label:M($("pintu").tinggi/100)})]}),D&&m.jsxs(m.Fragment,{children:[m.jsx(Ke,{tampil:L("jendela"),dari:[G.jendela.x-D.u.w/2,Q+G.jendela.ambang+D.u.h,.15],ke:[G.jendela.x+D.u.w/2,Q+G.jendela.ambang+D.u.h,.15],geser:[0,.18,0],label:M($("jendela").lebar/100)}),m.jsx(Ke,{tampil:L("jendela"),dari:[G.jendela.x-D.u.w/2,Q+G.jendela.ambang,.15],ke:[G.jendela.x-D.u.w/2,Q+G.jendela.ambang+D.u.h,.15],geser:[-.2,0,0],label:M($("jendela").tinggi/100)})]}),H&&m.jsxs(m.Fragment,{children:[m.jsx(Ke,{tampil:L("kanopi"),dari:[G.pintu.x-H.u.w/2,Q+.02,H.u.h+.1],ke:[G.pintu.x+H.u.w/2,Q+.02,H.u.h+.1],geser:[0,0,.15],label:M($("kanopi").lebar/100)}),m.jsx(Ke,{tampil:L("kanopi"),dari:[G.pintu.x+H.u.w/2,Q+.02,.1],ke:[G.pintu.x+H.u.w/2,Q+.02,H.u.h+.1],geser:[.25,0,0],label:M($("kanopi").tinggi/100)})]}),A&&m.jsxs(m.Fragment,{children:[m.jsx(Ke,{tampil:L("partisi"),dari:[G.partisi.x-A.u.w/2,Q+A.u.h,G.partisi.z],ke:[G.partisi.x+A.u.w/2,Q+A.u.h,G.partisi.z],geser:[0,.15,0],label:M($("partisi").lebar/100)}),m.jsx(Ke,{tampil:L("partisi"),dari:[G.partisi.x-A.u.w/2,Q,G.partisi.z],ke:[G.partisi.x-A.u.w/2,Q+A.u.h,G.partisi.z],geser:[-.18,0,0],label:M($("partisi").tinggi/100)})]}),S&&m.jsxs(m.Fragment,{children:[m.jsx(Ke,{tampil:L("railing"),dari:[G.railing.x-S.u.w/2,Q+.01,G.railing.z],ke:[G.railing.x+S.u.w/2,Q+.01,G.railing.z],geser:[0,0,.12],label:M($("railing").lebar/100)}),m.jsx(Ke,{tampil:L("railing"),dari:[G.railing.x+S.u.w/2,Q,G.railing.z],ke:[G.railing.x+S.u.w/2,Q+S.u.h,G.railing.z],geser:[.18,0,0],label:M($("railing").tinggi/100)})]}),z&&m.jsx(Bt,{slot:"perabot",nama:z.p.nama,aktif:L("perabot"),disorot:u==="perabot",onPilih:N,onSorot:l,labelPos:[G.perabot.x,Q+Math.max(z.u.h,1)+.4,G.perabot.z+.4],children:m.jsx("group",{position:[G.perabot.x,Q,G.perabot.z],children:m.jsx(xo,{w:z.u.w,h:z.u.h,v:z.v,buka:!!o.perabot})})}),z&&m.jsxs(m.Fragment,{children:[m.jsx(Ke,{tampil:L("perabot"),dari:[G.perabot.x-z.u.w/2,Q+.01,G.perabot.z+.7],ke:[G.perabot.x+z.u.w/2,Q+.01,G.perabot.z+.7],geser:[0,0,.1],label:`${$("perabot")?.lebar} cm`}),m.jsx(Ke,{tampil:L("perabot"),dari:[G.perabot.x-z.u.w/2,Q,G.perabot.z+.7],ke:[G.perabot.x-z.u.w/2,Q+z.u.h+(z.v.bentuk==="perabot-aquarium"?.75:0),G.perabot.z+.7],geser:[-.15,0,0],label:`${$("perabot")?.tinggi} cm`})]}),m.jsx(yo,{position:[0,.005,0],opacity:s?.15:.35,scale:20,blur:2.4,far:4})]})};function Co(a){return m.jsxs(oi,{shadows:{type:Va},frameloop:"demand",dpr:[1,2],camera:{position:[3.2,4.4,11],fov:38},gl:{antialias:!0,preserveDrawingBuffer:!0},onCreated:({gl:e})=>a.onKanvas?.(e.domElement),"aria-label":"3D room with a door, window, canopy, glass partition and railing",children:[m.jsx(x.Suspense,{fallback:null,children:m.jsx(Mo,{...a})}),m.jsx($i,{target:[0,1.4,0],enablePan:!1,minDistance:1.5,maxDistance:20,minPolarAngle:.05,maxPolarAngle:1.5,enableDamping:!0,makeDefault:!0}),m.jsx(So,{slotAktif:Object.keys(a.produkPerSlot).find(e=>a.produkPerSlot[e]?.slug===a.slugAktif)??null,sudut:a.sudut})]})}export{Co as default};
