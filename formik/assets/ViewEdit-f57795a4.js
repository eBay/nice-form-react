import{r as l,j as e,B as n,F as c,a as u,N as h}from"./index-bc8c4064.js";import{d as b}from"./dayjs.min-a8b1139c.js";const g={name:{first:"Nate",last:"Wang"},email:"myemail@gmail.com",gender:"Male",dateOfBirth:b("2100-01-01"),phone:"15988888888",city:"Shanghai",address:"No.1000 Some Road, Zhangjiang Park, Pudong New District"},x=()=>{const[i,s]=l.useState(!0),[r,o]=l.useState(g),d=l.useCallback((t,{setSubmitting:a})=>{console.log("Submit: ",t),setTimeout(()=>{a(!1),o(t),s(!0)},1500)},[]),m=t=>{const a={form:t,columns:2,disabled:t.isSubmitting,viewMode:i,initialValues:r,rowGap:20,columnGap:20,fields:[{key:"name.first",name:["name","first"],label:"First Name",required:!0,tooltip:"hahahah"},{key:"name.last",label:"Last Name",fullWidth:!0,widget:"text",required:!0},{key:"gender",label:"Gender",widget:"radio-group",options:["Male","Female"]},{key:"email",label:"Email"},{key:"phone",label:"Phone"},{key:"address",label:"Address",colSpan:2,clear:"left"},{key:"city",label:"City"},{key:"zipCode",label:"Zip Code"},{key:"submit-button",clear:"left",render:()=>e.jsxs(e.Fragment,{children:[e.jsx(n,{type:"submit",variant:"contained",disabled:t.isSubmitting,children:"Submit"}),e.jsx(n,{onClick:()=>s(!0),style:{marginLeft:10},disabled:t.isSubmitting,children:"Cancel"})]})}]};return console.log(a),a};return e.jsxs("div",{children:[e.jsxs("h1",{style:{fontSize:"16px",marginTop:"50px",color:"#888"},children:["Personal Information",i&&e.jsx(n,{onClick:()=>s(!i),style:{float:"right",transform:"translateY(-10px)"},children:"Edit"})]}),e.jsx(c,{initialValues:r,onSubmit:d,children:t=>e.jsx(u,{children:e.jsx(h,{meta:m(t)})})})]})};export{x as default};
