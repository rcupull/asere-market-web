import{b as p,g as f,v as x,w as h,f as j,r as B,j as s,x as b,y as A,F as g,B as y}from"./index-ih0eSx80.js";import{F}from"./index-Z1FoIn4o.js";import{M as P}from"./index-gmqFlRPh.js";import"./form-Ycfp73ce.js";import"./CheckIcon-GmkBleVb.js";import"./description-8TzrVJh3.js";const U=()=>{const t=p();return{updateAdminUserPlan:{data:t[0],status:t[1],fetch:({userId:e,planId:r,update:n},o={})=>{t[2]({method:"put",url:f({path:"/admin/users/:userId/plans/:planId",urlParams:{userId:e,planId:r}}),data:n},o)},reset:t[3]}}},N=({userPlan:t,userId:e,callAfarResources:r})=>{const{onCallAfar:n}=x(),{onClose:o}=h(),l=j(),{updateAdminUserPlan:i}=U(),u=B.useMemo(()=>({status:t.status}),[t]),d=s.jsx(g,{initialValues:u,enableReinitialize:!0,onSubmit:()=>{},children:({values:c,isValid:m})=>s.jsxs("form",{className:"w-full h-40",children:[s.jsx(F,{items:[{status:"current"},{status:"validatingPurchase"},{status:"historical"}],renderOption:({status:a})=>a,renderValue:({status:a})=>a,optionToValue:({status:a})=>a,label:"Estado",name:"status",className:"w-full"}),l.getPortal(s.jsx(y,{label:"Guardar",isBusy:i.status.isBusy,disabled:!m,onClick:()=>{const{status:a}=c;i.fetch({userId:e,planId:t._id,update:{status:a}},{onAfterSuccess:()=>{o(),n(r)}})},variant:"primary",className:"w-full"}))]})});return s.jsx(P,{title:"Actualizar plan",content:d,badge:s.jsx(b,{variant:"info"}),primaryBtn:s.jsx("div",{ref:l.ref}),secondaryBtn:s.jsx(A,{})})};export{N as UpdateUserPlan};
