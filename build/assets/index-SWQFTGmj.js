import{H as h,j as e,r as u,J as p,n as o}from"./index-ih0eSx80.js";const F=({children:t,...r})=>{const a=h(r);return e.jsx(e.Fragment,{children:t(a)})},k=u.forwardRef((t,r)=>{const{noUseFormik:a,...c}=t;if(a){const{className:i,label:l,value:n,onChange:s,...d}=c;return e.jsx(p,{label:l,className:o("w-fit",i),labelPosition:"right",children:e.jsx("input",{ref:r,type:"checkbox",checked:!!n,onChange:m=>s==null?void 0:s(m),className:o("block w-5 h-5 rounded-md"),...d})})}return e.jsx(F,{...c,children:({error:i,field:l})=>{const{className:n,label:s,...d}=c,{value:m="",...x}=l;return e.jsx(p,{label:s,error:i,className:o("w-fit",n),labelPosition:"right",children:e.jsx("input",{ref:r,type:"checkbox",className:o("block w-5 h-5 rounded-md"),...d,value:m,...x})})}})});export{k as F};