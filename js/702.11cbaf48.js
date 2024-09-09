"use strict";(self["webpackChunkbomb_calorimetry_v2"]=self["webpackChunkbomb_calorimetry_v2"]||[]).push([[702],{2125:function(e,t,a){a.r(t),a.d(t,{default:function(){return I}});var l=a(9014),r=a(6463),i=a(5215),n=a(5776),s=a(2367),o=a(8107),m=a(7546),u=a(4045),d=a(7071),p=a(4316),h=a(7504),g=a(1149),x=a(5693),w=a(9232),y=a(8960),f=a(3553),_=a(4207);const c={key:0},W=(0,l._)("strong",null,"Warning!",-1),b={key:1},T=(0,l._)("strong",null,"Warning!",-1),k=(0,l._)("h2",null,"Run the simulation",-1),C=(0,l._)("h3",{id:"sample_name"},null,-1),v=(0,l._)("div",{id:"graph",style:{width:"550px",height:"300px"}},null,-1),S={style:{width:"50%"}},D={key:2},M=(0,l._)("td",null,"Molecular Weight",-1);function U(e,t,a,U,V,$){return(0,l.wg)(),(0,l.j4)(m.K,{class:"fill-height"},{default:(0,l.w5)((()=>[(0,l.Wm)(g.tj,{class:"text-center fill-height"},{default:(0,l.w5)((()=>[V.exp.sampleWgt<.2||V.exp.sampleWgt>2||V.exp.itWater<24||V.exp.itWater>30?((0,l.wg)(),(0,l.j4)(i.w,{key:0,border:"start",variant:"tonal",color:"red"},{default:(0,l.w5)((()=>[V.exp.sampleWgt<.2||V.exp.sampleWgt>2?((0,l.wg)(),(0,l.iD)("div",c,[W,(0,l.Uk)(" Sample weight must be between 0.2 and 2 grams. ")])):(0,l.kq)("",!0),V.exp.itWater<24||V.exp.itWater>30?((0,l.wg)(),(0,l.iD)("div",b,[T,(0,l.Uk)(" Water temperatuer be between 24 and 30 °C. ")])):(0,l.kq)("",!0)])),_:1})):(0,l.kq)("",!0),k,C,(0,l.Wm)(u.o,{align:"center",justify:"center",style:{"margin-top":"20px"}},{default:(0,l.w5)((()=>[v,(0,l.Wm)(x.Y,null,{default:(0,l.w5)((()=>[(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(V.tableData,(a=>((0,l.wg)(),(0,l.iD)("tr",{key:a.name},[(0,l._)("td",null,(0,r.zw)(a.name),1),(0,l._)("td",S,["Sample Weight"===a.name?((0,l.wg)(),(0,l.j4)(w.h,{key:0,modelValue:V.exp.sampleWgt,"onUpdate:modelValue":t[0]||(t[0]=e=>V.exp.sampleWgt=e),"hide-details":"","single-line":"",type:"number",disabled:0!=V.ran||e.$store.getters.getSample<0},{append:(0,l.w5)((()=>[(0,l.Uk)("g")])),_:1},8,["modelValue","disabled"])):"Water Temp"===a.name?((0,l.wg)(),(0,l.j4)(w.h,{key:1,modelValue:V.exp.itWater,"onUpdate:modelValue":t[1]||(t[1]=e=>V.exp.itWater=e),"hide-details":"","single-line":"",type:"number",disabled:0!=V.ran||e.$store.getters.getSample<0},{append:(0,l.w5)((()=>[(0,l.Uk)("°C")])),_:1},8,["modelValue","disabled"])):((0,l.wg)(),(0,l.iD)("span",D,(0,r.zw)(a.value+(()=>a.name.includes("Temp")?" °C":" g")()),1))])])))),128))])])),_:1})])),_:1}),(0,l.Wm)(u.o,{align:"center",justify:"center"},{default:(0,l.w5)((()=>[(0,l.Wm)(d.C),(0,l.Wm)(n.T,{color:"red",onClick:$.experiment,disabled:0!=V.ran||e.$store.getters.getSample<0||V.exp.sampleWgt<.2||V.exp.sampleWgt>2||V.exp.itWater<24||V.exp.itWater>30},{default:(0,l.w5)((()=>[(0,l.Uk)("Ignite")])),_:1},8,["onClick","disabled"]),(0,l.Wm)(d.C),(0,l.Wm)(n.T,{color:"green",onClick:$.extrapolate,disabled:1!=V.ran||e.$store.getters.getSample<0},{default:(0,l.w5)((()=>[(0,l.Uk)("Extrapolate")])),_:1},8,["onClick","disabled"]),(0,l.Wm)(d.C),(0,l.Wm)(o.B,{modelValue:V.dialog,"onUpdate:modelValue":t[4]||(t[4]=e=>V.dialog=e),fullscreen:"",scrim:!1,transition:"dialog-bottom-transition"},{activator:(0,l.w5)((({props:t})=>[(0,l.Wm)(n.T,(0,l.dG)(t,{color:"blue",disabled:V.ran<1||e.$store.getters.getSample<0}),{default:(0,l.w5)((()=>[(0,l.Uk)("View Results")])),_:2},1040,["disabled"])])),default:(0,l.w5)((()=>[(0,l.Wm)(s._,null,{default:(0,l.w5)((()=>[(0,l.Wm)(f.i,{dark:"",color:"primary"},{default:(0,l.w5)((()=>[(0,l.Wm)(n.T,{icon:"",dark:"",onClick:t[2]||(t[2]=e=>V.dialog=!1)},{default:(0,l.w5)((()=>[(0,l.Wm)(h.t,null,{default:(0,l.w5)((()=>[(0,l.Uk)("mdi-close")])),_:1})])),_:1}),(0,l.Wm)(_.q,null,{default:(0,l.w5)((()=>[(0,l.Uk)("Test Results")])),_:1})])),_:1}),(0,l.Wm)(u.o,{style:{margin:"10px 20%"}},{default:(0,l.w5)((()=>[(0,l.Wm)(y.z,{modelValue:V.data,"onUpdate:modelValue":t[3]||(t[3]=e=>V.data=e),"auto-grow":"",readonly:""},null,8,["modelValue"]),(0,l.Wm)(p.D,{fluid:""},{default:(0,l.w5)((()=>[(0,l._)("h2",null,(0,r.zw)(V.samples[e.$store.getters.getSample].sName),1),(0,l._)("h3",null,(0,r.zw)(V.samples[e.$store.getters.getSample].sFormula),1),(0,l.Wm)(x.Y,null,{default:(0,l.w5)((()=>[(0,l._)("tbody",null,[(0,l._)("tr",null,[M,(0,l._)("td",null,(0,r.zw)(V.samples[e.$store.getters.getSample].sM+" g/mol"),1)]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(V.tableData,(e=>((0,l.wg)(),(0,l.iD)("tr",{key:e.name},[(0,l._)("td",null,(0,r.zw)(e.name),1),(0,l._)("td",null,(0,r.zw)(e.value+(()=>e.name.includes("Temp")?" °C":" g")()),1)])))),128))])])),_:1}),(0,l._)("h4",null,"T initial: "+(0,r.zw)($.numberOrString(V.T.Ti))+"°C",1),(0,l._)("h4",null,"T final: "+(0,r.zw)($.numberOrString(V.T.Tf))+"°C",1)])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,l.Wm)(d.C)])),_:1})])),_:1})])),_:1})}a(6353);var V=a(8620),$=a(3678),z=a(9873),j=a.n(z);let N=null;var Y={data(){return{samples:V.L,output:{},exp:{},data:"",ran:0,tableData:[],dialog:!1,T:{Ti:"?",Tf:"?"}}},mounted(){const e=this.$store.getters.getSample,t=document.getElementById("sample_name");t.textContent=e>=0?V.L[e].sName:"No Sample Selected";const a=this.$store.getters.getCalorimeterCode,l=Number(a[0]),r=Number(a[1]),i=Number(a[2]),n=Number(a[3]);this.exp=new $.K(e,l,r,i,n),this.tableData=[{name:"Sample Weight",value:Math.round(1e3*this.exp.sampleWgt)/1e3},{name:"Water Temp",value:Math.round(1e3*this.exp.tWater)/1e3},{name:"Room Temp",value:Math.round(1e3*this.exp.tRoom)/1e3},{name:"Wire Before",value:Math.round(1e3*this.exp.wireWgt)/1e3},{name:"Wire After",value:"?"}],N=document.getElementById("graph"),j().newPlot(N,[{x:[],y:[]}],{margin:{t:0},xaxis:{title:"Time (min)"},yaxis:{title:"Temperature (°C)"}})},methods:{experiment(){const e=this.$store.getters.getSample;if(e>=0){let e=this.exp.experiment();this.data=this.exp.output,this.output=e,j().react(N,[{x:this.exp.g_X,y:this.exp.g_Y,mode:"markers"}],{margin:{t:0},xaxis:{title:"Time (min)"},yaxis:{title:"Temperature (°C)"}}),this.tableData[4].value=Math.round(1e3*this.exp.wireAfter)/1e3,this.ran=1}this.tableData[0].value=Math.round(1e3*this.exp.sampleWgt)/1e3,this.tableData[1].value=Math.round(1e3*this.exp.itWater)/1e3},extrapolate(){let e=[],t=[],a=[],l=[],r=this.output.aint,i=this.output.aslope,n=this.output.bint,s=this.output.bslope,o=0,m=1;for(1==m;m<20;m++)o=r+i*(.125+m/2),e.push(.5*m),t.push(o);for(m=10,10==m;m<36;m++)o=n+s*(.125+m/2),a.push(.5*m),l.push(o);let u=7,d=r+i*(.125+u),p=n+s*(.125+u);this.T.Ti=d,this.T.Tf=p;let h={type:"line",x0:u,y0:d,x1:u,y1:p,line:{color:"grey",width:1.5,dash:"dot"}},g={margin:{t:0},hovermode:"x",xaxis:{title:"Time (min)",spikemode:"across"},yaxis:{title:"Temperature (°C)"},shapes:[h],annotations:[{x:u,y:d,xref:"x",yref:"y",text:"T initial = "+Math.round(1e3*d)/1e3,showarrow:!0,arrowhead:7,ax:10,ay:20},{x:u,y:p,xref:"x",yref:"y",text:"T final = "+Math.round(1e3*p)/1e3,showarrow:!0,arrowhead:7,ax:-10,ay:-20}]},x=[{x:this.exp.g_X,y:this.exp.g_Y,name:"Data",mode:"markers"},{x:e,y:t,name:"",mode:"lines",line:{dash:"dash"}},{x:a,y:l,name:"",mode:"lines",line:{dash:"dash"}}];j().react(N,x,g);const w=this;N.on("plotly_click",(function(e){const t=e.points[0].x,a=r+i*(.125+t),l=n+s*(.125+t);h.x0=t,h.x1=t,h.y0=a,h.y1=l,w.T.Ti=a,w.T.Tf=l,g.shapes=[h],g.annotations=[{x:t,y:a,xref:"x",yref:"y",text:"T initial = "+Math.round(1e3*a)/1e3,showarrow:!0,arrowhead:7,ax:10,ay:20},{x:t,y:l,xref:"x",yref:"y",text:"T final = "+Math.round(1e3*l)/1e3,showarrow:!0,arrowhead:7,ax:-10,ay:-20}],j().relayout(N,g)})),this.ran=2},numberOrString(e){return"string"===typeof e||e instanceof String?e:Math.round(1e3*e)/1e3}}},R=a(9128);const q=(0,R.Z)(Y,[["render",U]]);var B=q,K=(0,l.aZ)({__name:"Calorimetry_old",setup(e){return(e,t)=>((0,l.wg)(),(0,l.j4)(B))}});const E=K;var I=E}}]);
//# sourceMappingURL=702.11cbaf48.js.map