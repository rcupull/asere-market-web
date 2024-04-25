import{d as n,_ as i,u as o,j as s,N as a,R as r,a as e}from"./index-ih0eSx80.js";const u=n(()=>i(()=>import("./index-vyS5JNmp.js"),__vite__mapDeps([0,1,2])).then(t=>({default:t.Business}))),_=n(()=>i(()=>import("./index-ATam0Un8.js"),__vite__mapDeps([3,1,2])).then(t=>({default:t.Settings}))),x=()=>{const{isUser:t}=o();return t?s.jsxs(r,{children:[s.jsx(e,{path:"/",element:s.jsx(a,{to:"/dashboard/business"})}),s.jsx(e,{path:"business/*",element:s.jsx(u,{})}),s.jsx(e,{path:"/settings",element:s.jsx(_,{})})]}):s.jsx(a,{to:"/"})};export{x as Dashboard};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-vyS5JNmp.js","assets/index-ih0eSx80.js","assets/index-l_Ec27-V.css","assets/index-ATam0Un8.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
