import{k as m,w as p,j as s,F as h,B as f}from"./index-ih0eSx80.js";import{F as d}from"./index-TYhW_pDc.js";import{u as x}from"./useUpdateOneBusiness-pno-eXXt.js";const R=({portal:o})=>{const{business:e,onFetch:r}=m(),{onClose:u}=p(),{updateOneBusiness:t}=x();if(!e)return s.jsx(s.Fragment,{});const{routeName:a,shoppingMeta:n={}}=e;return s.jsx(s.Fragment,{children:s.jsx(h,{initialValues:{purchaseRequestTopInfo:n.purchaseRequestTopInfo||""},enableReinitialize:!0,onSubmit:()=>{},children:({values:i,isValid:c})=>s.jsxs("form",{className:"w-full",children:[s.jsx(d,{name:"purchaseRequestTopInfo",className:"mt-6",classNameContainer:"max-h-[50vh]"}),o.getPortal(s.jsx(f,{label:"Guardar",isBusy:t.status.isBusy,disabled:!c,onClick:()=>{const{purchaseRequestTopInfo:l}=i;t.fetch({update:{shoppingMeta:{...n,purchaseRequestTopInfo:l}},routeName:a},{onAfterSuccess:()=>{r({routeName:a}),u()}})},variant:"primary",className:"w-full"}))]})})})};export{R as Component};