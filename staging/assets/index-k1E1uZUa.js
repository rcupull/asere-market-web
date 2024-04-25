import{a6 as h,r as n,ak as V,X as y,Y as I,b0 as K,W as E,aO as Q,a1 as S,an as P,a9 as R,al as O,b1 as A,aQ as W,am as H,aR as G,at as D,au as Y,H as U,k as M,j as u,J as _,I as Z,n as J,B as X}from"./index-OtumRKpY.js";import{P as q}from"./index-QVyCw3xz.js";import{u as z,R as ee,a as te}from"./index-zX2RDtHZ.js";import{F as se}from"./index-2t3GpseM.js";var T;let ne=(T=h.startTransition)!=null?T:function(e){e()};var re=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(re||{}),ae=(e=>(e[e.ToggleDisclosure=0]="ToggleDisclosure",e[e.CloseDisclosure=1]="CloseDisclosure",e[e.SetButtonId=2]="SetButtonId",e[e.SetPanelId=3]="SetPanelId",e[e.LinkPanel=4]="LinkPanel",e[e.UnlinkPanel=5]="UnlinkPanel",e))(ae||{});let oe={0:e=>({...e,disclosureState:S(e.disclosureState,{0:1,1:0})}),1:e=>e.disclosureState===1?e:{...e,disclosureState:1},4(e){return e.linkedPanel===!0?e:{...e,linkedPanel:!0}},5(e){return e.linkedPanel===!1?e:{...e,linkedPanel:!1}},2(e,s){return e.buttonId===s.buttonId?e:{...e,buttonId:s.buttonId}},3(e,s){return e.panelId===s.panelId?e:{...e,panelId:s.panelId}}},B=n.createContext(null);B.displayName="DisclosureContext";function j(e){let s=n.useContext(B);if(s===null){let r=new Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,j),r}return s}let $=n.createContext(null);$.displayName="DisclosureAPIContext";function L(e){let s=n.useContext($);if(s===null){let r=new Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,L),r}return s}let F=n.createContext(null);F.displayName="DisclosurePanelContext";function le(){return n.useContext(F)}function ie(e,s){return S(s.type,oe,e,s)}let ue=n.Fragment;function ce(e,s){let{defaultOpen:r=!1,...a}=e,c=n.useRef(null),t=I(s,K(k=>{c.current=k},e.as===void 0||e.as===n.Fragment)),l=n.useRef(null),d=n.useRef(null),m=n.useReducer(ie,{disclosureState:r?0:1,linkedPanel:!1,buttonRef:d,panelRef:l,buttonId:null,panelId:null}),[{disclosureState:o,buttonId:i},p]=m,b=E(k=>{p({type:1});let v=G(c);if(!v||!i)return;let f=k?k instanceof HTMLElement?k:k.current instanceof HTMLElement?k.current:v.getElementById(i):v.getElementById(i);f==null||f.focus()}),N=n.useMemo(()=>({close:b}),[b]),x=n.useMemo(()=>({open:o===0,close:b}),[o,b]),g={ref:t};return h.createElement(B.Provider,{value:m},h.createElement($.Provider,{value:N},h.createElement(Q,{value:S(o,{0:P.Open,1:P.Closed})},R({ourProps:g,theirProps:a,slot:x,defaultTag:ue,name:"Disclosure"}))))}let me="button";function de(e,s){let r=O(),{id:a=`headlessui-disclosure-button-${r}`,...c}=e,[t,l]=j("Disclosure.Button"),d=le(),m=d===null?!1:d===t.panelId,o=n.useRef(null),i=I(o,s,m?null:t.buttonRef),p=A();n.useEffect(()=>{if(!m)return l({type:2,buttonId:a}),()=>{l({type:2,buttonId:null})}},[a,l,m]);let b=E(f=>{var w;if(m){if(t.disclosureState===1)return;switch(f.key){case D.Space:case D.Enter:f.preventDefault(),f.stopPropagation(),l({type:0}),(w=t.buttonRef.current)==null||w.focus();break}}else switch(f.key){case D.Space:case D.Enter:f.preventDefault(),f.stopPropagation(),l({type:0});break}}),N=E(f=>{switch(f.key){case D.Space:f.preventDefault();break}}),x=E(f=>{var w;Y(f.currentTarget)||e.disabled||(m?(l({type:0}),(w=t.buttonRef.current)==null||w.focus()):l({type:0}))}),g=n.useMemo(()=>({open:t.disclosureState===0}),[t]),k=W(e,o),v=m?{ref:i,type:k,onKeyDown:b,onClick:x}:{ref:i,id:a,type:k,"aria-expanded":t.disclosureState===0,"aria-controls":t.linkedPanel?t.panelId:void 0,onKeyDown:b,onKeyUp:N,onClick:x};return R({mergeRefs:p,ourProps:v,theirProps:c,slot:g,defaultTag:me,name:"Disclosure.Button"})}let pe="div",fe=V.RenderStrategy|V.Static;function be(e,s){let r=O(),{id:a=`headlessui-disclosure-panel-${r}`,...c}=e,[t,l]=j("Disclosure.Panel"),{close:d}=L("Disclosure.Panel"),m=A(),o=I(s,t.panelRef,x=>{ne(()=>l({type:x?4:5}))});n.useEffect(()=>(l({type:3,panelId:a}),()=>{l({type:3,panelId:null})}),[a,l]);let i=H(),p=i!==null?(i&P.Open)===P.Open:t.disclosureState===0,b=n.useMemo(()=>({open:t.disclosureState===0,close:d}),[t,d]),N={ref:o,id:a};return h.createElement(F.Provider,{value:t.panelId},R({mergeRefs:m,ourProps:N,theirProps:c,slot:b,defaultTag:pe,features:fe,visible:p,name:"Disclosure.Panel"}))}let ke=y(ce),ge=y(de),xe=y(be),C=Object.assign(ke,{Button:ge,Panel:xe});function Ne({title:e,titleId:s,...r},a){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":s},r),e?n.createElement("title",{id:s},e):null,n.createElement("path",{fillRule:"evenodd",d:"M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"}))}const ve=n.forwardRef(Ne),we=ve,ye=e=>{const{className:s,label:r}=e,[a,c]=n.useState(),{field:t,error:l}=U(e),{value:d,onChange:m,name:o,onBlur:i}=t,{business:p}=M(),b=z();if(n.useEffect(()=>{c(d)},[d]),!p)return u.jsxDEV(u.Fragment,{},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-post-categories-buttons/index.tsx",lineNumber:36,columnNumber:12},void 0);const N=p==null?void 0:p.postCategories,x=u.jsxDEV(Z,{title:"Editar las categorías",className:"text-green-600 font-bold ml-2",onClick:g=>{g.preventDefault(),g.stopPropagation(),b.open()}},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-post-categories-buttons/index.tsx",lineNumber:42,columnNumber:5},void 0);return u.jsxDEV(_,{label:u.jsxDEV("div",{className:"flex items-center",children:[r,x]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-post-categories-buttons/index.tsx",lineNumber:56,columnNumber:9},void 0),error:l,className:s,children:u.jsxDEV(q,{postCategories:N,onChange:g=>{i({target:{name:o}}),c(g),m({target:{name:o,value:g}})},value:a,type:"wrapped"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-post-categories-buttons/index.tsx",lineNumber:64,columnNumber:7},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-post-categories-buttons/index.tsx",lineNumber:54,columnNumber:5},void 0)},Ie=({children:e,header:s,className:r})=>u.jsxDEV("div",{className:r,children:u.jsxDEV(C,{children:({open:a})=>u.jsxDEV(u.Fragment,{children:[u.jsxDEV(C.Button,{className:"flex w-full items-center border border-gray-200 p-2 rounded-sm",children:[s,u.jsxDEV(we,{className:J("w-6 h-6 ml-auto text-gray-400",{"rotate-90 transform":a})},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/accordion/index.tsx",lineNumber:20,columnNumber:15},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/accordion/index.tsx",lineNumber:17,columnNumber:13},void 0),u.jsxDEV(C.Panel,{className:"border border-gray-200 p-2 rounded-sm",children:e},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/accordion/index.tsx",lineNumber:26,columnNumber:13},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/accordion/index.tsx",lineNumber:16,columnNumber:11},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/accordion/index.tsx",lineNumber:14,columnNumber:7},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/accordion/index.tsx",lineNumber:13,columnNumber:5},void 0),De=e=>{const{label:s,className:r,optionToValue:a,renderOption:c,items:t,isBusy:l,multi:d,containerClassName:m,disabledOption:o}=e,{field:i,error:p}=U(e);return u.jsxDEV(_,{label:s,error:p,className:r,children:u.jsxDEV(ee,{items:t,optionToValue:a,renderOption:c,disabledOption:o,isBusy:l,multi:d,onBlur:()=>{i.onBlur({target:{name:i.name}})},onChange:b=>{i.onChange({target:{value:b,name:i.name}})},value:i.value||null,className:m},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-radio-group/index.tsx",lineNumber:31,columnNumber:7},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-radio-group/index.tsx",lineNumber:30,columnNumber:5},void 0)},Se=e=>{const{label:s,...r}=e,{field:a}=U(e),c=te(),{business:t,status:l,onFetch:d}=M(),m=()=>{const o=[{value:"none"}];return(t==null?void 0:t.shoppingStrategy)==="whatsAppWithOwner_pickUpProduct"&&o.push({value:"whatsApp_xsLink_lgQR"}),(t==null?void 0:t.shoppingStrategy)==="addToCart_whatsAppWithOwner_pickUpProduct"&&o.push({value:"shoppingCart"}),o};return u.jsxDEV(De,{label:u.jsxDEV("div",{className:"flex items-center justify-start flex-wrap",children:[s,u.jsxDEV(X,{variant:"link",label:"Configuración del negocio",onClick:o=>{o.preventDefault(),t&&c.open({onAfterSuccess:()=>d({routeName:t.routeName})})}},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-post-shopping-method-select/index.tsx",lineNumber:53,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-post-shopping-method-select/index.tsx",lineNumber:51,columnNumber:9},void 0),isBusy:l.isBusy,renderOption:({checked:o,item:i})=>{const p={none:"Ninguna",whatsApp_xsLink_lgQR:"Contactar por whatsapp para los detalles de la compra",shoppingCart:"Agregar al carrito"};return u.jsxDEV(se,{noUseFormik:!0,value:o,label:p[i.value]},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-post-shopping-method-select/index.tsx",lineNumber:74,columnNumber:16},void 0)},optionToValue:({value:o})=>o,items:m(),...a,...r},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-post-shopping-method-select/index.tsx",lineNumber:49,columnNumber:5},void 0)},Re=e=>{const{field:s,initialValues:r}=e,{name:a,onChange:c,value:t}=s;return n.useEffect(()=>{!t&&a&&r&&(c==null||c({target:{name:a,value:r}}))},[]),{getFieldName:l=>`${a}.${l.toString()}`,value:t}};export{Ie as A,Se as F,ye as a,De as b,Re as u};