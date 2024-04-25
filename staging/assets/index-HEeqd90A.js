import{r as u,aL as ne,aj as U,ak as re,X as j,Y as V,W as v,a1 as P,aq as ge,aM as he,aN as we,a5 as q,a6 as W,aO as Oe,an as H,a7 as ke,a8 as Re,aP as Ne,a9 as F,al as J,aQ as Se,am as ye,aR as De,aS as Le,aT as Ie,aU as D,at as k,au as Ee,ai as Z,aV as $e,aW as Pe,H as Te,aX as T,j as R,J as Ce,n as C,aY as Ue,av as je,aK as X,aJ as Ve,aZ as Fe}from"./index-OtumRKpY.js";import{T as Me,e as Ae}from"./form-gCruAkS1.js";import{C as Be}from"./CheckIcon-5k25d-5i.js";function ae(e,a){let[o,n]=u.useState(e),i=ne(e);return U(()=>n(i.current),[i,n,...a]),o}var Qe=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Qe||{}),We=(e=>(e[e.Single=0]="Single",e[e.Multi=1]="Multi",e))(We||{}),ze=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(ze||{}),qe=(e=>(e[e.OpenListbox=0]="OpenListbox",e[e.CloseListbox=1]="CloseListbox",e[e.GoToOption=2]="GoToOption",e[e.Search=3]="Search",e[e.ClearSearch=4]="ClearSearch",e[e.RegisterOption=5]="RegisterOption",e[e.UnregisterOption=6]="UnregisterOption",e[e.RegisterLabel=7]="RegisterLabel",e))(qe||{});function Y(e,a=o=>o){let o=e.activeOptionIndex!==null?e.options[e.activeOptionIndex]:null,n=Pe(a(e.options.slice()),c=>c.dataRef.current.domRef.current),i=o?n.indexOf(o):null;return i===-1&&(i=null),{options:n,activeOptionIndex:i}}let He={1(e){return e.dataRef.current.disabled||e.listboxState===1?e:{...e,activeOptionIndex:null,listboxState:1}},0(e){if(e.dataRef.current.disabled||e.listboxState===0)return e;let a=e.activeOptionIndex,{isSelected:o}=e.dataRef.current,n=e.options.findIndex(i=>o(i.dataRef.current.value));return n!==-1&&(a=n),{...e,listboxState:0,activeOptionIndex:a}},2(e,a){var o;if(e.dataRef.current.disabled||e.listboxState===1)return e;let n=Y(e),i=$e(a,{resolveItems:()=>n.options,resolveActiveIndex:()=>n.activeOptionIndex,resolveId:c=>c.id,resolveDisabled:c=>c.dataRef.current.disabled});return{...e,...n,searchQuery:"",activeOptionIndex:i,activationTrigger:(o=a.trigger)!=null?o:1}},3:(e,a)=>{if(e.dataRef.current.disabled||e.listboxState===1)return e;let o=e.searchQuery!==""?0:1,n=e.searchQuery+a.value.toLowerCase(),i=(e.activeOptionIndex!==null?e.options.slice(e.activeOptionIndex+o).concat(e.options.slice(0,e.activeOptionIndex+o)):e.options).find(t=>{var s;return!t.dataRef.current.disabled&&((s=t.dataRef.current.textValue)==null?void 0:s.startsWith(n))}),c=i?e.options.indexOf(i):-1;return c===-1||c===e.activeOptionIndex?{...e,searchQuery:n}:{...e,searchQuery:n,activeOptionIndex:c,activationTrigger:1}},4(e){return e.dataRef.current.disabled||e.listboxState===1||e.searchQuery===""?e:{...e,searchQuery:""}},5:(e,a)=>{let o={id:a.id,dataRef:a.dataRef},n=Y(e,i=>[...i,o]);return e.activeOptionIndex===null&&e.dataRef.current.isSelected(a.dataRef.current.value)&&(n.activeOptionIndex=n.options.indexOf(o)),{...e,...n}},6:(e,a)=>{let o=Y(e,n=>{let i=n.findIndex(c=>c.id===a.id);return i!==-1&&n.splice(i,1),n});return{...e,...o,activationTrigger:1}},7:(e,a)=>({...e,labelId:a.id})},_=u.createContext(null);_.displayName="ListboxActionsContext";function M(e){let a=u.useContext(_);if(a===null){let o=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,M),o}return a}let ee=u.createContext(null);ee.displayName="ListboxDataContext";function A(e){let a=u.useContext(ee);if(a===null){let o=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,A),o}return a}function Je(e,a){return P(a.type,He,e,a)}let Ke=u.Fragment;function Ge(e,a){let{value:o,defaultValue:n,form:i,name:c,onChange:t,by:s=(d,p)=>d===p,disabled:x=!1,horizontal:m=!1,multiple:w=!1,...g}=e;const L=m?"horizontal":"vertical";let y=V(a),[O=w?[]:void 0,f]=Me(o,t,n),[l,r]=u.useReducer(Je,{dataRef:u.createRef(),listboxState:1,options:[],searchQuery:"",labelId:null,activeOptionIndex:null,activationTrigger:1}),b=u.useRef({static:!1,hold:!1}),I=u.useRef(null),$=u.useRef(null),K=u.useRef(null),N=v(typeof s=="string"?(d,p)=>{let S=s;return(d==null?void 0:d[S])===(p==null?void 0:p[S])}:s),E=u.useCallback(d=>P(h.mode,{1:()=>O.some(p=>N(p,d)),0:()=>N(O,d)}),[O]),h=u.useMemo(()=>({...l,value:O,disabled:x,mode:w?1:0,orientation:L,compare:N,isSelected:E,optionsPropsRef:b,labelRef:I,buttonRef:$,optionsRef:K}),[O,x,w,l]);U(()=>{l.dataRef.current=h},[h]),ge([h.buttonRef,h.optionsRef],(d,p)=>{var S;r({type:1}),he(p,we.Loose)||(d.preventDefault(),(S=h.buttonRef.current)==null||S.focus())},h.listboxState===0);let oe=u.useMemo(()=>({open:h.listboxState===0,disabled:x,value:O}),[h,x,O]),ie=v(d=>{let p=h.options.find(S=>S.id===d);p&&G(p.dataRef.current.value)}),se=v(()=>{if(h.activeOptionIndex!==null){let{dataRef:d,id:p}=h.options[h.activeOptionIndex];G(d.current.value),r({type:2,focus:D.Specific,id:p})}}),le=v(()=>r({type:0})),ue=v(()=>r({type:1})),ce=v((d,p,S)=>d===D.Specific?r({type:2,focus:D.Specific,id:p,trigger:S}):r({type:2,focus:d,trigger:S})),de=v((d,p)=>(r({type:5,id:d,dataRef:p}),()=>r({type:6,id:d}))),me=v(d=>(r({type:7,id:d}),()=>r({type:7,id:null}))),G=v(d=>P(h.mode,{0(){return f==null?void 0:f(d)},1(){let p=h.value.slice(),S=p.findIndex(Q=>N(Q,d));return S===-1?p.push(d):p.splice(S,1),f==null?void 0:f(p)}})),pe=v(d=>r({type:3,value:d})),fe=v(()=>r({type:4})),be=u.useMemo(()=>({onChange:G,registerOption:de,registerLabel:me,goToOption:ce,closeListbox:ue,openListbox:le,selectActiveOption:se,selectOption:ie,search:pe,clearSearch:fe}),[]),xe={ref:y},B=u.useRef(null),ve=q();return u.useEffect(()=>{B.current&&n!==void 0&&ve.addEventListener(B.current,"reset",()=>{f==null||f(n)})},[B,f]),W.createElement(_.Provider,{value:be},W.createElement(ee.Provider,{value:h},W.createElement(Oe,{value:P(h.listboxState,{0:H.Open,1:H.Closed})},c!=null&&O!=null&&Ae({[c]:O}).map(([d,p],S)=>W.createElement(ke,{features:Re.Hidden,ref:S===0?Q=>{var te;B.current=(te=Q==null?void 0:Q.closest("form"))!=null?te:null}:void 0,...Ne({key:d,as:"input",type:"hidden",hidden:!0,readOnly:!0,form:i,name:d,value:p})})),F({ourProps:xe,theirProps:g,slot:oe,defaultTag:Ke,name:"Listbox"}))))}let Xe="button";function Ye(e,a){var o;let n=J(),{id:i=`headlessui-listbox-button-${n}`,...c}=e,t=A("Listbox.Button"),s=M("Listbox.Button"),x=V(t.buttonRef,a),m=q(),w=v(l=>{switch(l.key){case k.Space:case k.Enter:case k.ArrowDown:l.preventDefault(),s.openListbox(),m.nextFrame(()=>{t.value||s.goToOption(D.First)});break;case k.ArrowUp:l.preventDefault(),s.openListbox(),m.nextFrame(()=>{t.value||s.goToOption(D.Last)});break}}),g=v(l=>{switch(l.key){case k.Space:l.preventDefault();break}}),L=v(l=>{if(Ee(l.currentTarget))return l.preventDefault();t.listboxState===0?(s.closeListbox(),m.nextFrame(()=>{var r;return(r=t.buttonRef.current)==null?void 0:r.focus({preventScroll:!0})})):(l.preventDefault(),s.openListbox())}),y=ae(()=>{if(t.labelId)return[t.labelId,i].join(" ")},[t.labelId,i]),O=u.useMemo(()=>({open:t.listboxState===0,disabled:t.disabled,value:t.value}),[t]),f={ref:x,id:i,type:Se(e,t.buttonRef),"aria-haspopup":"listbox","aria-controls":(o=t.optionsRef.current)==null?void 0:o.id,"aria-expanded":t.listboxState===0,"aria-labelledby":y,disabled:t.disabled,onKeyDown:w,onKeyUp:g,onClick:L};return F({ourProps:f,theirProps:c,slot:O,defaultTag:Xe,name:"Listbox.Button"})}let Ze="label";function _e(e,a){let o=J(),{id:n=`headlessui-listbox-label-${o}`,...i}=e,c=A("Listbox.Label"),t=M("Listbox.Label"),s=V(c.labelRef,a);U(()=>t.registerLabel(n),[n]);let x=v(()=>{var w;return(w=c.buttonRef.current)==null?void 0:w.focus({preventScroll:!0})}),m=u.useMemo(()=>({open:c.listboxState===0,disabled:c.disabled}),[c]);return F({ourProps:{ref:s,id:n,onClick:x},theirProps:i,slot:m,defaultTag:Ze,name:"Listbox.Label"})}let et="ul",tt=re.RenderStrategy|re.Static;function rt(e,a){var o;let n=J(),{id:i=`headlessui-listbox-options-${n}`,...c}=e,t=A("Listbox.Options"),s=M("Listbox.Options"),x=V(t.optionsRef,a),m=q(),w=q(),g=ye(),L=g!==null?(g&H.Open)===H.Open:t.listboxState===0;u.useEffect(()=>{var r;let b=t.optionsRef.current;b&&t.listboxState===0&&b!==((r=De(b))==null?void 0:r.activeElement)&&b.focus({preventScroll:!0})},[t.listboxState,t.optionsRef]);let y=v(r=>{switch(w.dispose(),r.key){case k.Space:if(t.searchQuery!=="")return r.preventDefault(),r.stopPropagation(),s.search(r.key);case k.Enter:if(r.preventDefault(),r.stopPropagation(),t.activeOptionIndex!==null){let{dataRef:b}=t.options[t.activeOptionIndex];s.onChange(b.current.value)}t.mode===0&&(s.closeListbox(),Z().nextFrame(()=>{var b;return(b=t.buttonRef.current)==null?void 0:b.focus({preventScroll:!0})}));break;case P(t.orientation,{vertical:k.ArrowDown,horizontal:k.ArrowRight}):return r.preventDefault(),r.stopPropagation(),s.goToOption(D.Next);case P(t.orientation,{vertical:k.ArrowUp,horizontal:k.ArrowLeft}):return r.preventDefault(),r.stopPropagation(),s.goToOption(D.Previous);case k.Home:case k.PageUp:return r.preventDefault(),r.stopPropagation(),s.goToOption(D.First);case k.End:case k.PageDown:return r.preventDefault(),r.stopPropagation(),s.goToOption(D.Last);case k.Escape:return r.preventDefault(),r.stopPropagation(),s.closeListbox(),m.nextFrame(()=>{var b;return(b=t.buttonRef.current)==null?void 0:b.focus({preventScroll:!0})});case k.Tab:r.preventDefault(),r.stopPropagation();break;default:r.key.length===1&&(s.search(r.key),w.setTimeout(()=>s.clearSearch(),350));break}}),O=ae(()=>{var r;return(r=t.buttonRef.current)==null?void 0:r.id},[t.buttonRef.current]),f=u.useMemo(()=>({open:t.listboxState===0}),[t]),l={"aria-activedescendant":t.activeOptionIndex===null||(o=t.options[t.activeOptionIndex])==null?void 0:o.id,"aria-multiselectable":t.mode===1?!0:void 0,"aria-labelledby":O,"aria-orientation":t.orientation,id:i,onKeyDown:y,role:"listbox",tabIndex:0,ref:x};return F({ourProps:l,theirProps:c,slot:f,defaultTag:et,features:tt,visible:L,name:"Listbox.Options"})}let nt="li";function at(e,a){let o=J(),{id:n=`headlessui-listbox-option-${o}`,disabled:i=!1,value:c,...t}=e,s=A("Listbox.Option"),x=M("Listbox.Option"),m=s.activeOptionIndex!==null?s.options[s.activeOptionIndex].id===n:!1,w=s.isSelected(c),g=u.useRef(null),L=Le(g),y=ne({disabled:i,value:c,domRef:g,get textValue(){return L()}}),O=V(a,g);U(()=>{if(s.listboxState!==0||!m||s.activationTrigger===0)return;let N=Z();return N.requestAnimationFrame(()=>{var E,h;(h=(E=g.current)==null?void 0:E.scrollIntoView)==null||h.call(E,{block:"nearest"})}),N.dispose},[g,m,s.listboxState,s.activationTrigger,s.activeOptionIndex]),U(()=>x.registerOption(n,y),[y,n]);let f=v(N=>{if(i)return N.preventDefault();x.onChange(c),s.mode===0&&(x.closeListbox(),Z().nextFrame(()=>{var E;return(E=s.buttonRef.current)==null?void 0:E.focus({preventScroll:!0})}))}),l=v(()=>{if(i)return x.goToOption(D.Nothing);x.goToOption(D.Specific,n)}),r=Ie(),b=v(N=>r.update(N)),I=v(N=>{r.wasMoved(N)&&(i||m||x.goToOption(D.Specific,n,0))}),$=v(N=>{r.wasMoved(N)&&(i||m&&x.goToOption(D.Nothing))}),K=u.useMemo(()=>({active:m,selected:w,disabled:i}),[m,w,i]);return F({ourProps:{id:n,ref:O,role:"option",tabIndex:i===!0?void 0:-1,"aria-disabled":i===!0?!0:void 0,"aria-selected":w,disabled:void 0,onClick:f,onFocus:l,onPointerEnter:b,onMouseEnter:b,onPointerMove:I,onMouseMove:I,onPointerLeave:$,onMouseLeave:$},theirProps:t,slot:K,defaultTag:nt,name:"Listbox.Option"})}let ot=j(Ge),it=j(Ye),st=j(_e),lt=j(rt),ut=j(at),z=Object.assign(ot,{Button:it,Label:st,Options:lt,Option:ut});function ct({title:e,titleId:a,...o},n){return u.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":a},o),e?u.createElement("title",{id:a},e):null,u.createElement("path",{fillRule:"evenodd",d:"M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z",clipRule:"evenodd"}))}const dt=u.forwardRef(ct),mt=dt,xt=e=>{const{items:a,renderOption:o,renderValue:n,label:i,className:c,optionToValue:t,multi:s,disabled:x}=e,[m,w]=u.useState(),{field:g,error:L}=Te(e),{value:y=s?[]:null}=g;u.useEffect(()=>{let f=y;t&&(T(y)?f=y.map(l=>a.find(r=>t(r)===l)):f=a.find(l=>t(l)===y)),w(f)},[JSON.stringify([y])]);const O=f=>{if(T(f)){const l=Fe(f);w(l),g.onChange({target:{name:g.name,value:t?l.map(t):l}})}else{const l=f;w(l),g.onChange({target:{name:g.name,value:t?t(l):l}})}};return R.jsxDEV(Ce,{label:i,error:L,className:c,children:R.jsxDEV(z,{disabled:x,children:({open:f})=>R.jsxDEV("div",{className:C("relative"),children:R.jsxDEV(Ue,{as:"div",className:"relative",offset:4,floatingAs:u.Fragment,portal:!0,adaptiveWidth:!0,autoPlacement:{allowedPlacements:["bottom","top"]},children:[R.jsxDEV(z.Button,{name:g.name,onBlur:g.onBlur,className:C("relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6",{"ring-1 rounded-md ring-red-500 focus:ring-red-500":!!L,"!cursor-not-allowed !bg-gray-200":x}),children:[R.jsxDEV("div",{className:"flex items-center h-6",children:m&&(T(m)?m.map((l,r)=>R.jsxDEV(u.Fragment,{children:n(l)},r,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:107,columnNumber:29},void 0)):n(m))},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:103,columnNumber:19},void 0),R.jsxDEV("span",{className:"pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2",children:R.jsxDEV(mt,{className:"h-5 w-5 text-gray-400","aria-hidden":"true"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:112,columnNumber:21},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:111,columnNumber:19},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:92,columnNumber:17},void 0),R.jsxDEV(je,{show:f,as:u.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:R.jsxDEV(z.Options,{className:"absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",children:a.map((l,r)=>{const b=T(m)?m.find(I=>X(I,l)):X(m,l);return R.jsxDEV(z.Option,{className:({active:I})=>C("text-gray-900 relative select-none cursor-pointer",{"bg-indigo-600 text-white":I}),onClick:I=>{T(m)?(I.preventDefault(),O(b?Ve(m,m.findIndex($=>X($,l))):[...m,l])):O(b?void 0:l)},value:null,children:()=>R.jsxDEV("div",{className:C("p-2",{"bg-gray-200":b}),children:[R.jsxDEV("div",{className:"flex items-center ml-3 truncate",children:o(l)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:160,columnNumber:31},void 0),b&&R.jsxDEV("span",{className:C("bg-inherit absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"),children:R.jsxDEV(Be,{className:"h-5 w-5","aria-hidden":"true"},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:170,columnNumber:35},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:165,columnNumber:33},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:155,columnNumber:29},void 0)},r,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:130,columnNumber:25},void 0)})},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:123,columnNumber:19},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:116,columnNumber:17},void 0)]},void 0,!0,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:81,columnNumber:15},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:80,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:77,columnNumber:7},void 0)},void 0,!1,{fileName:"/Users/mac/Documents/work/asere-market/asere-market-web/src/components/field-select/index.tsx",lineNumber:76,columnNumber:5},void 0)};export{xt as F};