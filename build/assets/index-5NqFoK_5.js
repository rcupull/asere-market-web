import{b as h,g as I,w as j,V as B,v as b,r as y,f as O,j as s,F as U,t as v,B as E,x as F,y as A}from"./index-ih0eSx80.js";import{u as C,F as M}from"./useAddManyImages-wVxDWdmU.js";import{M as S}from"./index-gmqFlRPh.js";import{u as P}from"./useAddOneBusiness-fln7KMR9.js";import"./description-8TzrVJh3.js";const k=()=>{const e=h();return{updateOneUser:{data:e[0],status:e[1],fetch:({userId:a,update:r},n={})=>{e[2]({method:"put",url:I({path:"/user/:userId",urlParams:{userId:a}}),data:r},n)},reset:e[3]}}},R=({userId:e,callAfarResources:a})=>{const{onClose:r}=j(),{getOneUser:n}=B(),{onCallAfar:m}=b();y.useEffect(()=>{n.fetch({userId:e})},[]);const{addOneBusiness:u}=P(),{updateOneUser:c}=k(),{addManyImages:f}=C(),t=n.data,i=O(),p=s.jsx(U,{initialValues:{profileImages:t!=null&&t.profileImage?[t==null?void 0:t.profileImage]:[]},enableReinitialize:!0,validate:()=>{},onSubmit:()=>{},children:({values:g,isValid:x})=>s.jsxs("form",{children:[s.jsx(M,{id:"profileImages",name:"profileImages",label:"Imagen del perfil",getImageSrc:v}),i.getPortal(s.jsx(E,{label:"Guardar",isBusy:u.status.isBusy,disabled:!x,onClick:()=>{const{profileImages:l}=g,d=o=>{c.fetch({userId:e,update:{profileImage:o}},{onAfterSuccess:()=>{r(),a&&m(a)}})};l.length?f.fetch({images:l,userId:e},{onAfterSuccess:o=>{d(o[0])}}):d(void 0)},variant:"primary",className:"w-full"}))]})});return s.jsx(S,{title:"Editar perfil",content:p,badge:s.jsx(F,{variant:"info"}),primaryBtn:s.jsx("div",{ref:i.ref}),secondaryBtn:s.jsx(A,{})})};export{R as ProfileUpdate};
