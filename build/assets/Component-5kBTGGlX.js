import{k as b,w as f,M as p,r as B,j as e,F as x,t as y,B as j}from"./index-ih0eSx80.js";import{u as h,F}from"./useAddManyImages-wVxDWdmU.js";import{u as M}from"./useUpdateOneBusiness-pno-eXXt.js";const C=({portal:c})=>{const{business:a,onFetch:g}=b(),{onClose:l}=f(),{userPlan:n}=p(),{bannerImages:t,routeName:s}=a||{},{updateOneBusiness:r}=M(),{addManyImages:m}=h(),u=B.useMemo(()=>({bannerImages:t||[]}),[t]);return s?e.jsx(x,{initialValues:u,onSubmit:()=>{},enableReinitialize:!0,children:({values:i,isValid:d})=>e.jsxs("form",{children:[e.jsx(F,{id:"bannerImages",name:"bannerImages",className:"mt-6",getImageSrc:y,multi:!0,max:n==null?void 0:n.maxImagesByBusinessBanner,enabledImageHref:!0}),c.getPortal(e.jsx(j,{label:"Guardar",isBusy:r.status.isBusy||m.status.isBusy,disabled:!d||u.bannerImages===i.bannerImages,onClick:()=>{if(!a)return;const{bannerImages:o}=i;o.length&&m.fetch({images:o,routeName:s,userId:a.createdBy},{onAfterSuccess:I=>{r.fetch({update:{bannerImages:I},routeName:s},{onAfterSuccess:()=>{g({routeName:s}),l()}})}})},variant:"primary",className:"w-full"}))]})}):e.jsx(e.Fragment,{})};export{C as Component};