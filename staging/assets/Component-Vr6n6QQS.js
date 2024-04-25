import{r as i,X as T,al as A,Y as V,W as x,aQ as $,a5 as G,a6 as f,a7 as L,a8 as O,aP as R,a9 as E,au as I,at as D,j as a,n as U,H as M,J as H,k as K,w as W,F as Y,i as z,B as J}from"./index-OtumRKpY.js";import{F as Q}from"./index-xoRzmofe.js";import{T as X,p as Z}from"./form-gCruAkS1.js";import{G as q,w as _}from"./description-xrSyH_28.js";import{B as ee,F as se}from"./label-IraI5jSS.js";import{u as ae}from"./useUpdateOneBusiness-b6-hFlS_.js";let v=i.createContext(null);v.displayName="GroupContext";let te=i.Fragment;function re(m){var e;let[s,t]=i.useState(null),[r,n]=se(),[u,l]=_(),d=i.useMemo(()=>({switch:s,setSwitch:t,labelledby:r,describedby:u}),[s,t,r,u]),p={},k=m;return f.createElement(l,{name:"Switch.Description"},f.createElement(n,{name:"Switch.Label",props:{htmlFor:(e=d.switch)==null?void 0:e.id,onClick(c){s&&(c.currentTarget.tagName==="LABEL"&&c.preventDefault(),s.click(),s.focus({preventScroll:!0}))}}},f.createElement(v.Provider,{value:d},E({ourProps:p,theirProps:k,defaultTag:te,name:"Switch.Group"}))))}let ne="button";function oe(m,e){let s=A(),{id:t=`headlessui-switch-${s}`,checked:r,defaultChecked:n=!1,onChange:u,name:l,value:d,form:p,...k}=m,c=i.useContext(v),N=i.useRef(null),y=V(N,e,c===null?null:c.setSwitch),[b,g]=X(r,u,n),h=x(()=>g==null?void 0:g(!b)),C=x(o=>{if(I(o.currentTarget))return o.preventDefault();o.preventDefault(),h()}),B=x(o=>{o.key===D.Space?(o.preventDefault(),h()):o.key===D.Enter&&Z(o.currentTarget)}),F=x(o=>o.preventDefault()),j=i.useMemo(()=>({checked:b}),[b]),S={id:t,ref:y,role:"switch",type:$(m,N),tabIndex:0,"aria-checked":b,"aria-labelledby":c==null?void 0:c.labelledby,"aria-describedby":c==null?void 0:c.describedby,onClick:C,onKeyUp:B,onKeyPress:F},P=G();return i.useEffect(()=>{var o;let w=(o=N.current)==null?void 0:o.closest("form");w&&n!==void 0&&P.addEventListener(w,"reset",()=>{g(n)})},[N,g]),f.createElement(f.Fragment,null,l!=null&&b&&f.createElement(L,{features:O.Hidden,...R({as:"input",type:"checkbox",hidden:!0,readOnly:!0,form:p,checked:b,name:l,value:d})}),E({ourProps:S,theirProps:k,slot:j,defaultTag:ne,name:"Switch"}))}let le=T(oe),me=re,ue=Object.assign(le,{Group:me,Label:ee,Description:q});const ie=({className:m,value:e,onChange:s,interaction:t="both"})=>{const[r,n]=i.useState(!1);i.useEffect(()=>{n(!!e)},[e]);const u=l=>{t==="onlyActivate"&&!l||t==="onlyDeactivate"&&l||(n(l),s==null||s(l))};return a.jsxDEV(ue,{checked:r,onChange:u,className:U("bg-gray-200 relative inline-flex h-6 w-11 items-center rounded-full",{"!bg-blue-600":r},m),children:a.jsxDEV("span",{className:U("translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition",{"!translate-x-6":r})},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/toggle-button/index.tsx",lineNumber:45,columnNumber:7},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/toggle-button/index.tsx",lineNumber:34,columnNumber:5},void 0)},ce=m=>{const{label:e,className:s}=m,{field:t,error:r}=M(m),{value:n}=t;return a.jsxDEV(H,{label:e,error:r,className:s,children:a.jsxDEV(ie,{value:n,onChange:u=>{t.onChange({target:{name:t.name,value:u}})}},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-toggle-button/index.tsx",lineNumber:23,columnNumber:7},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-toggle-button/index.tsx",lineNumber:22,columnNumber:5},void 0)},ge=({portal:m})=>{var u,l,d;const{business:e,onFetch:s}=K(),{onClose:t}=W(),{updateOneBusiness:r}=ae();if(!e)return a.jsxDEV(a.Fragment,{},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/pages/@modals/useBusinessUpdateAboutUs/Component.tsx",lineNumber:29,columnNumber:12},void 0);const{routeName:n}=e;return a.jsxDEV(a.Fragment,{children:a.jsxDEV(Y,{initialValues:{visible:((u=e==null?void 0:e.aboutUsPage)==null?void 0:u.visible)||!1,title:((l=e==null?void 0:e.aboutUsPage)==null?void 0:l.title)||"",description:((d=e==null?void 0:e.aboutUsPage)==null?void 0:d.description)||""},enableReinitialize:!0,onSubmit:()=>{},children:({values:p,isValid:k})=>a.jsxDEV("form",{className:"w-full",children:[a.jsxDEV(ce,{label:"Visible",name:"visible"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/pages/@modals/useBusinessUpdateAboutUs/Component.tsx",lineNumber:48,columnNumber:15},void 0),a.jsxDEV(z,{label:"Título de la página",name:"title",className:"mt-6"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/pages/@modals/useBusinessUpdateAboutUs/Component.tsx",lineNumber:50,columnNumber:15},void 0),a.jsxDEV(Q,{label:"Descripción",name:"description",className:"mt-6",classNameContainer:"max-h-[50vh]"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/pages/@modals/useBusinessUpdateAboutUs/Component.tsx",lineNumber:52,columnNumber:15},void 0),m.getPortal(a.jsxDEV(J,{label:"Guardar",isBusy:r.status.isBusy,disabled:!k,onClick:()=>{r.fetch({update:{aboutUsPage:p},routeName:n},{onAfterSuccess:()=>{s({routeName:n}),t()}})},variant:"primary",className:"w-full"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/pages/@modals/useBusinessUpdateAboutUs/Component.tsx",lineNumber:60,columnNumber:17},void 0))]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/pages/@modals/useBusinessUpdateAboutUs/Component.tsx",lineNumber:47,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/pages/@modals/useBusinessUpdateAboutUs/Component.tsx",lineNumber:36,columnNumber:7},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/pages/@modals/useBusinessUpdateAboutUs/Component.tsx",lineNumber:35,columnNumber:5},void 0)};export{ge as Component};