import{j as e,F as i,a as o,N as a,B as l}from"./index-bc8c4064.js";const m=()=>{const s={layout:"horizontal",columns:1,rowGap:18,fields:[{key:"username",label:"User Name"},{key:"password",label:"Password",widgetProps:{type:"password"}},{key:"friends",label:"Friends",widget:"form-list",fullWidth:!0,listItemProps:{widget:"select",options:["Tom","Jerry"],required:!0,fullWidth:!0}}]};return e.jsx(i,{initialValues:{username:"Nate",friends:["Tom"]},onSubmit:async t=>{await new Promise(r=>setTimeout(r,500)),alert(JSON.stringify(t,null,2))},children:e.jsxs(o,{style:{width:600},children:[e.jsx(a,{meta:s}),e.jsx(l,{color:"primary",type:"submit",variant:"contained",style:{marginTop:18},children:"Log in"})]})})};export{m as default};
