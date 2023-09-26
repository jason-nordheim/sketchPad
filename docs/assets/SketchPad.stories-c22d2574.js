import{r as d}from"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";var D={exports:{}},m={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var I=d,z=Symbol.for("react.element"),V=Symbol.for("react.fragment"),W=Object.prototype.hasOwnProperty,B=I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Y={key:!0,ref:!0,__self:!0,__source:!0};function M(t,o,s){var e,c={},a=null,i=null;s!==void 0&&(a=""+s),o.key!==void 0&&(a=""+o.key),o.ref!==void 0&&(i=o.ref);for(e in o)W.call(o,e)&&!Y.hasOwnProperty(e)&&(c[e]=o[e]);if(t&&t.defaultProps)for(e in o=t.defaultProps,o)c[e]===void 0&&(c[e]=o[e]);return{$$typeof:z,type:t,key:a,ref:i,props:c,_owner:B.current}}m.Fragment=V;m.jsx=M;m.jsxs=M;D.exports=m;var u=D.exports;const $=(t,o,s="black")=>{t.strokeStyle=s,t.lineWidth=2,t.lineJoin="round",t.lineCap="round",t.beginPath();const[e,c]=o[0];t.moveTo(e,c);for(let a=1;a<o.length;a++){const[i,l]=o[a];t.lineTo(i,l)}t.stroke()},F=(t,o,s="black")=>{if(o&&o.length)for(let e=0;e<o.length;e++)$(t,o[e],s)},h=(t,o)=>{if(t.type==="mousedown"||t.type==="mousemove"){const{clientX:s,clientY:e}=t,c=Math.round(s),a=Math.round(e);return[c,a]}else if(t instanceof TouchEvent){t.preventDefault();const s=t.touches[0],e=o==null?void 0:o.getBoundingClientRect();if(e){const c=Math.round(s.clientX),a=Math.round(s.clientY-e.top);return[c,a]}}throw new Error("Unsupported event provided")},X=t=>{document&&t&&t.toBlob(async o=>{if(o){const s=window.URL.createObjectURL(o),e=document.createElement("a");e.style.display="none",e.download="sketch.png",e.href=s,document.body.appendChild(e),e.click(),window.URL.revokeObjectURL(s),document.body.removeChild(e)}})},A=t=>{const o=JSON.stringify(t),s=`data:text/plan;charset=utf-8,${encodeURIComponent(o)}`,e=document.createElement("a");e.style.display="none",e.download="paths.json",e.href=s,document.body.appendChild(e),e.click(),window.URL.revokeObjectURL(s),document.body.removeChild(e)},G={size:400,styles:{backgroundColor:"white",boxShadow:"0px 0px 10px 2px black"},scale:[1,1]},g=t=>{const{size:o,styles:s,scale:e,showUndo:c,showExportToPng:a,showExportJson:i}={...t,...G},l=d.useRef(null),[p,w]=d.useState([]),[k,_]=d.useState(!1),[y,E]=d.useState(!0),x=d.useCallback(()=>{var r;const n=(r=l.current)==null?void 0:r.getContext("2d");if(!n)throw new Error("No context found");return n},[l]);d.useEffect(()=>{l.current&&x().scale(e[0],e[1])},[x,e]);const P=()=>{const n=x();n.clearRect(0,0,o,o),p.length>0?E(!1):E(!0),F(n,p)},S=n=>{w(r=>[...r,[n]]),_(!0)},C=n=>{const r=p.length-1;w(b=>{const v=b[r];return v.push(n),b[r]=v,b}),P()},O=n=>{const r=h(n,l.current);S(r)},J=n=>{const r=h(n,l.current);S(r)},L=n=>{if(k){const r=h(n,l.current);C(r)}},N=n=>{if(k){const r=h(n,l.current);C(r)}},U=()=>{_(!1)},q=()=>{w(n=>(n.pop(),n)),P()};return u.jsxs("div",{id:"sketch-pad-wrapper",children:[u.jsx("canvas",{height:o,width:o,style:s,ref:l,onMouseDown:n=>O(n),onTouchStart:n=>J(n),onMouseMove:n=>L(n),onTouchMove:n=>N(n),onMouseUp:()=>U(),onTouchEnd:()=>U()}),u.jsxs("div",{id:"sketch-pad-controls",children:[c&&u.jsx("button",{onClick:q,disabled:y,children:"Undo"}),a&&u.jsx("button",{disabled:y,onClick:()=>X(l.current),children:"Download PNG"}),i&&u.jsx("button",{disabled:y,onClick:()=>A(p),children:"Download Paths"})]})]})};try{g.displayName="SketchPad",g.__docgenInfo={description:"",displayName:"SketchPad",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number"}},styles:{defaultValue:null,description:"",name:"styles",required:!1,type:{name:"CSSProperties"}},scale:{defaultValue:null,description:"",name:"scale",required:!1,type:{name:"[number, number]"}},showUndo:{defaultValue:null,description:"",name:"showUndo",required:!1,type:{name:"boolean"}},showExportToPng:{defaultValue:null,description:"",name:"showExportToPng",required:!1,type:{name:"boolean"}},showExportJson:{defaultValue:null,description:"",name:"showExportJson",required:!1,type:{name:"boolean"}}}}}catch{}const Q={title:"SketchPad",component:g,tags:["autodocs"]},f={args:{scale:[1,1],showExportJson:!0,showExportToPng:!0,showUndo:!0,size:400,styles:{backgroundColor:"white"}}};var T,j,R;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    scale: [1, 1],
    showExportJson: true,
    showExportToPng: true,
    showUndo: true,
    size: 400,
    styles: {
      backgroundColor: "white"
    }
  }
}`,...(R=(j=f.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};const Z=["WhiteSketchPad"];export{f as WhiteSketchPad,Z as __namedExportsOrder,Q as default};
//# sourceMappingURL=SketchPad.stories-c22d2574.js.map
