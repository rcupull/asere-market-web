import{b as a,u as p,g as d,d as c,_ as i,w as m,f as l,j as o,y as _}from"./index-ih0eSx80.js";const h=()=>{const t=a(),{authData:s}=p(),e=(s==null?void 0:s.user._id)||"<unknow user>";return{updateOnePost:{data:t[0],status:t[1],fetch:({postId:n,...r},u={})=>{t[2]({method:"put",url:d({path:"/posts/:postId",urlParams:{postId:n,userId:e}}),data:r},u)},reset:t[3]}}},P=c(()=>i(()=>import("./Component-IEYdtyxD.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])).then(t=>({default:t.Component}))),x=()=>{const{pushModal:t}=m();return{open:s=>{t("Emergent",{useProps:()=>{const e=l();return{title:"Formulario de publicación",content:o.jsx(P,{portal:e,options:s}),secondaryBtn:o.jsx(_,{}),primaryBtn:o.jsx("div",{ref:e.ref})}}},{emergent:!0})}}};export{x as a,h as u};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Component-IEYdtyxD.js","assets/index-ih0eSx80.js","assets/index-l_Ec27-V.css","assets/index-SWQFTGmj.js","assets/index-LTXxtrN8.js","assets/index-b7vcoc-g.js","assets/index-ezD7gpb8.js","assets/radio-group-R5jNLVFN.js","assets/description-8TzrVJh3.js","assets/label-5zIu1i7p.js","assets/form-Ycfp73ce.js","assets/useUpdateOneBusiness-pno-eXXt.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
