import{a6 as k,r as n,ak as O,X as w,Y as E,b0 as Q,W as I,aO as V,a1 as D,an as S,a9 as B,al as U,b1 as M,aQ as W,am as H,aR as G,at as y,au as Y,H as j,k as _,j as i,J as L,I as Z,n as J,B as X}from"./index-ih0eSx80.js";import{P as q}from"./index-b7vcoc-g.js";import{u as z,R as ee,a as te}from"./index-ezD7gpb8.js";import{F as ae}from"./index-SWQFTGmj.js";var A;let ne=(A=k.startTransition)!=null?A:function(e){e()};var se=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(se||{}),re=(e=>(e[e.ToggleDisclosure=0]="ToggleDisclosure",e[e.CloseDisclosure=1]="CloseDisclosure",e[e.SetButtonId=2]="SetButtonId",e[e.SetPanelId=3]="SetPanelId",e[e.LinkPanel=4]="LinkPanel",e[e.UnlinkPanel=5]="UnlinkPanel",e))(re||{});let le={0:e=>({...e,disclosureState:D(e.disclosureState,{0:1,1:0})}),1:e=>e.disclosureState===1?e:{...e,disclosureState:1},4(e){return e.linkedPanel===!0?e:{...e,linkedPanel:!0}},5(e){return e.linkedPanel===!1?e:{...e,linkedPanel:!1}},2(e,a){return e.buttonId===a.buttonId?e:{...e,buttonId:a.buttonId}},3(e,a){return e.panelId===a.panelId?e:{...e,panelId:a.panelId}}},$=n.createContext(null);$.displayName="DisclosureContext";function F(e){let a=n.useContext($);if(a===null){let s=new Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(s,F),s}return a}let T=n.createContext(null);T.displayName="DisclosureAPIContext";function K(e){let a=n.useContext(T);if(a===null){let s=new Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(s,K),s}return a}let N=n.createContext(null);N.displayName="DisclosurePanelContext";function oe(){return n.useContext(N)}function ue(e,a){return D(a.type,le,e,a)}let ie=n.Fragment;function ce(e,a){let{defaultOpen:s=!1,...r}=e,c=n.useRef(null),t=E(a,Q(h=>{c.current=h},e.as===void 0||e.as===n.Fragment)),o=n.useRef(null),p=n.useRef(null),d=n.useReducer(ue,{disclosureState:s?0:1,linkedPanel:!1,buttonRef:p,panelRef:o,buttonId:null,panelId:null}),[{disclosureState:l,buttonId:u},f]=d,g=I(h=>{f({type:1});let C=G(c);if(!C||!u)return;let m=h?h instanceof HTMLElement?h:h.current instanceof HTMLElement?h.current:C.getElementById(u):C.getElementById(u);m==null||m.focus()}),x=n.useMemo(()=>({close:g}),[g]),P=n.useMemo(()=>({open:l===0,close:g}),[l,g]),v={ref:t};return k.createElement($.Provider,{value:d},k.createElement(T.Provider,{value:x},k.createElement(V,{value:D(l,{0:S.Open,1:S.Closed})},B({ourProps:v,theirProps:r,slot:P,defaultTag:ie,name:"Disclosure"}))))}let de="button";function pe(e,a){let s=U(),{id:r=`headlessui-disclosure-button-${s}`,...c}=e,[t,o]=F("Disclosure.Button"),p=oe(),d=p===null?!1:p===t.panelId,l=n.useRef(null),u=E(l,a,d?null:t.buttonRef),f=M();n.useEffect(()=>{if(!d)return o({type:2,buttonId:r}),()=>{o({type:2,buttonId:null})}},[r,o,d]);let g=I(m=>{var b;if(d){if(t.disclosureState===1)return;switch(m.key){case y.Space:case y.Enter:m.preventDefault(),m.stopPropagation(),o({type:0}),(b=t.buttonRef.current)==null||b.focus();break}}else switch(m.key){case y.Space:case y.Enter:m.preventDefault(),m.stopPropagation(),o({type:0});break}}),x=I(m=>{switch(m.key){case y.Space:m.preventDefault();break}}),P=I(m=>{var b;Y(m.currentTarget)||e.disabled||(d?(o({type:0}),(b=t.buttonRef.current)==null||b.focus()):o({type:0}))}),v=n.useMemo(()=>({open:t.disclosureState===0}),[t]),h=W(e,l),C=d?{ref:u,type:h,onKeyDown:g,onClick:P}:{ref:u,id:r,type:h,"aria-expanded":t.disclosureState===0,"aria-controls":t.linkedPanel?t.panelId:void 0,onKeyDown:g,onKeyUp:x,onClick:P};return B({mergeRefs:f,ourProps:C,theirProps:c,slot:v,defaultTag:de,name:"Disclosure.Button"})}let fe="div",me=O.RenderStrategy|O.Static;function ge(e,a){let s=U(),{id:r=`headlessui-disclosure-panel-${s}`,...c}=e,[t,o]=F("Disclosure.Panel"),{close:p}=K("Disclosure.Panel"),d=M(),l=E(a,t.panelRef,P=>{ne(()=>o({type:P?4:5}))});n.useEffect(()=>(o({type:3,panelId:r}),()=>{o({type:3,panelId:null})}),[r,o]);let u=H(),f=u!==null?(u&S.Open)===S.Open:t.disclosureState===0,g=n.useMemo(()=>({open:t.disclosureState===0,close:p}),[t,p]),x={ref:l,id:r};return k.createElement(N.Provider,{value:t.panelId},B({mergeRefs:d,ourProps:x,theirProps:c,slot:g,defaultTag:fe,features:me,visible:f,name:"Disclosure.Panel"}))}let he=w(ce),ve=w(pe),Pe=w(ge),R=Object.assign(he,{Button:ve,Panel:Pe});function xe({title:e,titleId:a,...s},r){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":a},s),e?n.createElement("title",{id:a},e):null,n.createElement("path",{fillRule:"evenodd",d:"M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"}))}const Ce=n.forwardRef(xe),be=Ce,we=e=>{const{className:a,label:s}=e,[r,c]=n.useState(),{field:t,error:o}=j(e),{value:p,onChange:d,name:l,onBlur:u}=t,{business:f}=_(),g=z();if(n.useEffect(()=>{c(p)},[p]),!f)return i.jsx(i.Fragment,{});const x=f==null?void 0:f.postCategories,P=i.jsx(Z,{title:"Editar las categorías",className:"text-green-600 font-bold ml-2",onClick:v=>{v.preventDefault(),v.stopPropagation(),g.open()}});return i.jsx(L,{label:i.jsxs("div",{className:"flex items-center",children:[s,P]}),error:o,className:a,children:i.jsx(q,{postCategories:x,onChange:v=>{u({target:{name:l}}),c(v),d({target:{name:l,value:v}})},value:r,type:"wrapped"})})},Ee=({children:e,header:a,className:s})=>i.jsx("div",{className:s,children:i.jsx(R,{children:({open:r})=>i.jsxs(i.Fragment,{children:[i.jsxs(R.Button,{className:"flex w-full items-center border border-gray-200 p-2 rounded-sm",children:[a,i.jsx(be,{className:J("w-6 h-6 ml-auto text-gray-400",{"rotate-90 transform":r})})]}),i.jsx(R.Panel,{className:"border border-gray-200 p-2 rounded-sm",children:e})]})})}),ye=e=>{const{label:a,className:s,optionToValue:r,renderOption:c,items:t,isBusy:o,multi:p,containerClassName:d,disabledOption:l}=e,{field:u,error:f}=j(e);return i.jsx(L,{label:a,error:f,className:s,children:i.jsx(ee,{items:t,optionToValue:r,renderOption:c,disabledOption:l,isBusy:o,multi:p,onBlur:()=>{u.onBlur({target:{name:u.name}})},onChange:g=>{u.onChange({target:{value:g,name:u.name}})},value:u.value||null,className:d})})},De=e=>{const{label:a,...s}=e,{field:r}=j(e),c=te(),{business:t,status:o,onFetch:p}=_(),d=()=>{const l=[{value:"none"}];return(t==null?void 0:t.shoppingStrategy)==="whatsAppWithOwner_pickUpProduct"&&l.push({value:"whatsApp_xsLink_lgQR"}),(t==null?void 0:t.shoppingStrategy)==="addToCart_whatsAppWithOwner_pickUpProduct"&&l.push({value:"shoppingCart"}),l};return i.jsx(ye,{label:i.jsxs("div",{className:"flex items-center justify-start flex-wrap",children:[a,i.jsx(X,{variant:"link",label:"Configuración del negocio",onClick:l=>{l.preventDefault(),t&&c.open({onAfterSuccess:()=>p({routeName:t.routeName})})}})]}),isBusy:o.isBusy,renderOption:({checked:l,item:u})=>{const f={none:"Ninguna",whatsApp_xsLink_lgQR:"Contactar por whatsapp para los detalles de la compra",shoppingCart:"Agregar al carrito"};return i.jsx(ae,{noUseFormik:!0,value:l,label:f[u.value]})},optionToValue:({value:l})=>l,items:d(),...r,...s})},Be=e=>{const{field:a,initialValues:s}=e,{name:r,onChange:c,value:t}=a;return n.useEffect(()=>{!t&&r&&s&&(c==null||c({target:{name:r,value:s}}))},[]),{getFieldName:o=>`${r}.${o.toString()}`,value:t}};export{Ee as A,De as F,we as a,ye as b,Be as u};