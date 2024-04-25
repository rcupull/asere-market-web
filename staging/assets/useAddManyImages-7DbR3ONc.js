import{r as l,w as J,H as q,j as s,J as W,n as U,p as A,a_ as _,aF as $,a$ as z,K,aZ as Z,G as k,aJ as Q,b as X,g as Y}from"./index-OtumRKpY.js";function ee({title:a,titleId:c,...b},o){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:o,"aria-labelledby":c},b),a?l.createElement("title",{id:c},a):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"}))}const re=l.forwardRef(ee),se=re,R=a=>{const c=URL.createObjectURL(a);return new Promise(b=>{const o=new globalThis.Image;o.src=c,o.onload=()=>{b({height:o.height,width:o.width})}})},te=l.forwardRef((a,c)=>{var G,T;const{className:b,label:o,multi:V,max:x,getImageSrc:g,enabledImageHref:u,...d}=a,{pushModal:v}=J(),{field:i,error:M}=q(a),{value:F}=i,[p,D]=l.useState([]),[m,j]=l.useState([void 0]),[t,N]=l.useState(0),w=e=>K(x)&&x<=E(e).length,I=e=>w(e)?e:[...e,void 0],L=e=>e.src instanceof File?URL.createObjectURL(e.src):typeof e.src=="string"&&(g==null?void 0:g(e.src))||"",h=l.useMemo(()=>{const e=m[t];if(e)return e},[t,m]);l.useEffect(()=>{if(F!==p){const e=F||[];D(e);const r=I(e);j(r),N(0)}},[F,x]);const E=e=>Z(e,r=>!!(r!=null&&r.src)),O=async(e,r)=>{let n=[...m];switch(r){case"add":{if(!e)return;e instanceof File?n=k(n,{src:e,...await R(e)},t):n=k(n,e,t),n=I(n),N(n.length-1);break}case"remove":{n=Q(n,t),N(t?t-1:0);break}case"change":{if(!e)return;e instanceof File?n=k(n,{...n[t],src:e,...await R(e)},t):n=k(n,{...n[t],...e},t);break}}j(n);const f=E(n);D(f),i.onChange({target:{name:i.name,value:f}})},B=async e=>{let r=[...m];r.pop();const n=async(S,P,C)=>{const y=P[C];y instanceof File?S.push({src:y,...await R(y)}):S.push(y),C<P.length-1&&await n(S,P,C+1)};await n(r,e,0),r=I(r),N(r.length-1),j(r);const f=E(r);D(f),i.onChange({target:{name:i.name,value:f}})},H=e=>{let r=[...m];const n=r[t];if(n){r=k(r,{...n,href:e},t),j(r);const f=E(r);D(f),i.onChange({target:{name:i.name,value:f}})}};return s.jsxDEV(W,{label:o,error:M,className:b,children:[V&&s.jsxDEV("div",{className:"flex items-center justify-start gap-2 mb-1",children:[m==null?void 0:m.map((e,r)=>{const n=r===t;return s.jsxDEV("div",{className:U("h-8 w-10 cursor-pointer",{"border-gray-700 border-2 rounded-md p-0.5":n}),onClick:()=>N(r),children:e?s.jsxDEV("img",{src:L(e),className:"h-full w-full"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:264,columnNumber:21},void 0):s.jsxDEV("div",{className:"relative h-full w-full text-gray-500",children:[s.jsxDEV(A,{className:"h-full w-full"},r,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:267,columnNumber:23},void 0),s.jsxDEV(se,{className:"h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 font-bold"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:268,columnNumber:23},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:266,columnNumber:21},void 0)},r,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:256,columnNumber:17},void 0)}),w(p)&&s.jsxDEV("div",{className:"border-2 border-gray-300 rounded-md h-8 w-10 flex items-center justify-center",children:s.jsxDEV(_,{},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:277,columnNumber:17},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:276,columnNumber:15},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:251,columnNumber:11},void 0),s.jsxDEV("div",{className:U("relative h-48",{"ring-1 rounded-md ring-red-500 focus:ring-red-500":!!M}),onDragOver:e=>{e.preventDefault()},onDrop:e=>{if(e.preventDefault(),w(p))return;const r=Array.from(e.dataTransfer.files);B(r)},children:h?s.jsxDEV(s.Fragment,{children:[s.jsxDEV("img",{src:L(h),width:h.width,height:h.height,className:"object-contain w-full h-full border-2 p-2 border-dashed border-gray-300"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:301,columnNumber:15},void 0),s.jsxDEV($,{className:"!absolute top-1 right-0",onClick:e=>{e.preventDefault(),O(null,"remove")}},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:308,columnNumber:15},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:300,columnNumber:13},void 0):s.jsxDEV("div",{className:"flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",children:s.jsxDEV("div",{className:"text-center",children:[s.jsxDEV(A,{className:"mx-auto h-12 w-12 text-gray-300"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:319,columnNumber:17},void 0),s.jsxDEV("div",{className:"mt-4 flex text-sm leading-6 text-gray-600",children:[s.jsxDEV("label",{htmlFor:i.name,className:U("relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500",{"!cursor-not-allowed":w(p)}),children:[s.jsxDEV("span",{children:"Suba una imagen"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:330,columnNumber:21},void 0),s.jsxDEV("input",{ref:c,type:"file",className:"sr-only",accept:"image/*",disabled:w(p),...d,...i,value:"",onChange:e=>{var r;O((r=e.target.files)==null?void 0:r[0],t===m.length-1?"add":"change")}},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:331,columnNumber:21},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:321,columnNumber:19},void 0),s.jsxDEV("p",{className:"px-1",children:",arrastre y suelte"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:348,columnNumber:19},void 0),s.jsxDEV("p",{className:U("relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500",{"!cursor-not-allowed":w(p)}),onClick:()=>{w(p)||v("CatalogsSearchImage",{onSelected:e=>B(e),multi:!0},{emergent:!0})},children:"o busque en nuestros catálogos"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:349,columnNumber:19},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:320,columnNumber:17},void 0),s.jsxDEV("p",{className:"text-xs leading-5 text-gray-600",children:"PNG, JPG, GIF up to 10MB"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:372,columnNumber:17},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:318,columnNumber:15},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:317,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:282,columnNumber:9},void 0),h&&u&&s.jsxDEV("div",{className:"flex items-center mt-2",children:[s.jsxDEV(z,{placeholder:"Escriba la url promocional de esta imagen del banner (opcional). Ejemplo: https://example.com",value:((G=m[t])==null?void 0:G.href)||"",onChange:e=>{e.preventDefault(),H(e.target.value)}},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:380,columnNumber:13},void 0),s.jsxDEV("a",{href:((T=m[t])==null?void 0:T.href)||"",className:"text-nowrap ml-2 hyperlink",target:"_blank",rel:"noreferrer",children:"Ir al link"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:388,columnNumber:13},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:379,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-input-images/index.tsx",lineNumber:249,columnNumber:7},void 0)}),ae=()=>{const a=X();return{addManyImages:{data:a[0],status:a[1],fetch:({images:c,userId:b,postId:o,routeName:V},x={})=>{const g=c.map(u=>new Promise(d=>{if(u.src instanceof File){const v=new FormData;v.append("image",u.src),a[2]({method:"post",url:Y({path:"/images",query:{userId:b,routeName:V,postId:o}}),data:v,headers:{"Content-Type":"multipart/form-data"}},{onAfterSuccess:i=>{d({...u,src:i.imageSrc})}})}else d(u)}));Promise.all(g).then(u=>{const{onAfterSuccess:d}=x||{};d==null||d(u)})},reset:a[3]}}};export{te as F,ae as u};
