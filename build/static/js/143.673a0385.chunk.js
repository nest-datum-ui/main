"use strict";(self.webpackChunkmain=self.webpackChunkmain||[]).push([[143,823],{143:function(e,t,n){n.r(t),n.d(t,{default:function(){return yn}});var r=n(2791),i=n(7689),a=n(6015),o=n(1413),s=n(885),l=n(142),u=n(166),c=n(6582),d=n(1091),f=n(7161),p=n(184),m=function(){var e=(0,i.TH)().pathname,t=e.substring(1),n=[0===t.indexOf("cv/report"),0===t.indexOf("cv/settings")],m=r.useState((function(){return"/cv"===e?0:n.indexOf(!0)})),v=(0,s.Z)(m,2),x=v[0],h=v[1],Z=r.useCallback((function(e,t){h(t)}),[h]);return r.useEffect((function(){"/cv"===e&&h(0)}),[e,h]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsxs)(l.Z,{variant:"scrollable",value:x>=0?x:0,onChange:Z,children:[(0,p.jsx)(u.Z,(0,o.Z)({label:"Reports"},0===t.indexOf("cv/report")||"/cv"===e?{sx:{textTransform:"initial",pointerEvents:"none"}}:{component:f.Z,to:"report",sx:{textTransform:"initial"}})),(0,p.jsx)(u.Z,(0,o.Z)({label:"Settings"},0===t.indexOf("cv/settings")?{sx:{textTransform:"initial",pointerEvents:"none"}}:{component:f.Z,to:"settings",sx:{textTransform:"initial"}}))]}),(0,p.jsx)(a.Z,{py:0===x?2:0,children:x<=0?(0,p.jsxs)(c.Z,{disableElevation:!0,variant:"outlined",color:"primary",size:"small",children:[(0,p.jsx)(d.Z,(0,o.Z)((0,o.Z)({},0!==t.indexOf("cv/report/options")&&0!==t.indexOf("cv/report/statuses")&&0!==t.indexOf("cv/report/routes")?{variant:"contained",sx:{pointerEvents:"none"}}:{component:f.Z,to:"/cv/report"}),{},{children:"Data"})),(0,p.jsx)(d.Z,(0,o.Z)((0,o.Z)({},0===t.indexOf("cv/report/statuses")?{variant:"contained",sx:{pointerEvents:"none"}}:{component:f.Z,to:"/cv/report/statuses"}),{},{children:"Statuses"}))]}):(0,p.jsx)(r.Fragment,{})})]})};(m=r.memo(m)).defaultProps={};var v=m,x=function(e){e.children;return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(a.Z,{pr:2,children:(0,p.jsx)(v,{})}),(0,p.jsx)(i.j3,{})]})};(x=r.memo(x)).defaultProps={};var h=x,Z=n(6030),j=n(8954),g="https://api.cidiator.com/cv/report",b="https://api.cidiator.com/cv/report-status",k="https://api.cidiator.com/cv/setting",C=n(708),y=n(9571),I=n(2882),D=n(6166),F=function(){var e=(0,Z.v9)((0,C.Z)(["dialog",g,"entityId"])),t=(0,Z.v9)((0,C.Z)(["api","form",g,"loader"])),n=(0,Z.v9)((0,C.Z)(["api","list",g,"loader"])),i=r.useCallback((function(t){return(0,j.R)(g,e)()}),[e]);return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(I.Z,{id:g,loader:!0===t||!0===n,maxWidth:"xs",title:"Delete report?",actions:(0,p.jsx)(D.Z,{loader:!0===t||!0===n,onClick:i,children:"OK"}),children:(0,p.jsx)(y.Z,{children:"Are you sure you want to delete the current report? This operation is irreversible and may compromise data integrity."})})})};(F=r.memo(F)).defaultProps={};var S=F,P=n(2606),A=n(2772),w=n(3495),N=n(3135),E=n(9300),T=n(2100),O=n(2650),z=n(7642),V=n(6498),H=n(8686),R=n(891),W=n(4432),L=n(6601),M=n(5951),q=n(4565),B=n(4390),Q=n(4486),U=n(3343),K=n(1419),Y=n(4096),_=n(44),G=n(3895),J=n(2810),X=n(2507),$=n(2379),ee=n(7533),te=n(3858),ne=n(5953),re=n(3811),ie=n(9823),ae=n(5987),oe=n(5405),se=n(2123),le=["value","defaultValue","children"],ue=function(e){var t,n,i,a=e.value,s=e.defaultValue,l=(e.children,(0,ae.Z)(e,le)),u=null!==a&&void 0!==a?a:s,c=(0,Z.v9)((0,C.Z)(["loader","unmount","visible"])),d=(0,Z.v9)((0,C.Z)(["api","list",b,"loader"])),f=null!==(t=(0,Z.v9)((0,C.Z)(["api","list",b,"total"])))&&void 0!==t?t:0,m=null!==(n=(0,Z.v9)((0,C.Z)(["api","list",b,"page"])))&&void 0!==n?n:1,v=null!==(i=(0,Z.v9)((0,C.Z)(["api","list",b,"limit"])))&&void 0!==i?i:20,x=(0,Z.v9)((0,C.Z)(["api","list",b,"query"]))||"",h=(0,Z.v9)((0,C.Z)(["api","list",b,"data"])),j=!(0,M.Z)(h)||d||c,g=r.useCallback((function(e,t){return(0,N.T)(b,t)}),[]),k=r.useCallback((function(e){return(0,E.I)(b,e)}),[]),y=r.useCallback((function(){}),[]);return r.useEffect((function(){c||(0,w.i)(b,{page:m,limit:v,query:x})()}),[c,m,v,x]),r.useEffect((function(){return function(){return(0,P.K)(b)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(se.Z,{visible:j}),!j&&(0,p.jsx)(oe.Z,(0,o.Z)((0,o.Z)({},l),{},{value:a,defaultValue:s,total:f,page:m,limit:v,onChangePage:g,onLimit:k,onSearch:y,children:h.map((function(e){return(0,o.Z)((0,o.Z)({},e),{},{active:!!u.find((function(t){return t.value===e.id}))})}))}))]})};(ue=r.memo(ue)).defaultProps={name:"reportStatusId",multiple:!1,onChange:function(){}};var ce=ue,de=function(e){var t=e.onChange,n=e.onInput,a=(0,i.TH)().search,o=r.useState((function(){return(0,J.Z)()})),l=(0,s.Z)(o,1)[0],u=(0,Z.v9)((0,C.Z)(["api","list",b,"data","length"]))>0?(0,ee.Z)(a,b,"reportStatusId"):[],c=r.useCallback((function(e){(0,X.V)(e,(0,te.Z)("reportStatusId")),t(e),n(e)}),[t,n]),d=r.useCallback((function(e){(0,$.h)((0,te.Z)("reportStatusId")),t(e),n(e)}),[t,n]);return(0,p.jsx)(r.Fragment,{children:(0,p.jsxs)(ne.ZP,{container:!0,alignItems:"center",children:[(0,p.jsx)(ne.ZP,{item:!0,xs:!1,children:(0,p.jsx)(re.Z,{size:"small",color:"error",onClick:d,children:(0,p.jsx)(ie.Z,{fontSize:"small"})})}),(0,p.jsx)(ne.ZP,{item:!0,xs:!0,children:(0,p.jsx)(ce,{label:"Status",name:l,onChange:c,value:u})})]})})};(de=r.memo(de)).defaultProps={onChange:function(){},onInput:function(){}};var fe=de,pe=n(2982),me=n(7060),ve=n(807),xe=n(5473),he=n(2898),Ze=n(8061),je=n(9949),ge=n(7562),be=n(7235),ke=n(9154),Ce=n(789),ye=["children"],Ie=function(e){var t=e.children,n=(0,ae.Z)(e,ye),i=(0,Z.v9)((0,C.Z)(["loader","unmount","visible"])),a=(0,Z.v9)((0,C.Z)(["api","form","".concat(b,"/").concat(t),"name"]));return r.useEffect((function(){i||(0,be.y)((function(){return"".concat(b,"/").concat(t)}),{entityId:t,withLoop:!0})()}),[i,t]),r.useEffect((function(){return function(){(0,ke.z)("".concat(b,"/").concat(t))(),(0,Ce.B)("".concat(b,"/").concat(t))}}),[t]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(q.Z,(0,o.Z)((0,o.Z)({component:"div"},n),{},{children:null!==a&&void 0!==a?a:t}))})};(Ie=r.memo(Ie)).defaultProps={};var De=Ie,Fe=n(8947),Se=function(e){var t=e.bulkDeletion,n=e.id,i=e.fileId,a=e.reportStatusId,o=e.userId,s=e.isDeleted,l=e.isNotDelete,u=e.createdAt,c=e.updatedAt,d=e.onClose,f=e.onDrop,m=e.onRestore,v=e.onMenu,x=e.onCheck,h=e.storePath,j=(0,Z.v9)((0,me.Z)([].concat((0,pe.Z)(h),["selected"]),n));return(0,p.jsx)(r.Fragment,{children:(0,p.jsxs)(ve.Z,{children:[t&&(0,M.Z)(h)&&(0,p.jsx)(B.Z,{padding:"checkbox",sx:{minWidth:"1%"},children:(0,p.jsx)(xe.Z,{checked:j,onChange:x})}),(0,p.jsx)(B.Z,{sx:{minWidth:"21%"},children:(0,p.jsx)(Ze.Z,{to:"/cv/report/".concat(n),isDeleted:s,children:n})}),(0,p.jsx)(B.Z,{sx:{minWidth:"17%"},children:(0,p.jsx)(q.Z,{component:"div",children:i})}),(0,p.jsx)(B.Z,{sx:{minWidth:"20%"},children:(0,p.jsx)(De,{children:a})}),(0,p.jsx)(B.Z,{sx:{minWidth:"10%"},children:(0,p.jsx)(ge.Z,{children:o})}),(0,p.jsx)(B.Z,{sx:{width:"20%"},children:(0,p.jsx)(je.Z,{createdAt:u,updatedAt:c})}),(0,p.jsxs)(B.Z,{sx:{width:"1%"},children:[(0,p.jsx)(re.Z,{onClick:v,children:(0,p.jsx)(he.Z,{})}),(0,p.jsx)(Fe.Z,{id:n,isDeleted:s,isNotDelete:l,onClose:d,onDrop:f,onRestore:m})]})]},n)})};(Se=r.memo(Se)).defaultProps={bulkDeletion:!1,onCheck:function(){}};var Pe=Se,Ae=function(){var e,t,n,a,o,s=(0,i.TH)().search,l=(0,L.Z)("query",s),u=(0,L.Z)("select",s),c=(0,L.Z)("filter",s),d=(0,L.Z)("sort",s),f=(0,Z.v9)((0,C.Z)(["loader","unmount","visible"])),m=(0,Z.v9)((0,C.Z)(["api","list",g,"loader"])),v=null!==(e=(0,Z.v9)((0,C.Z)(["api","list",g,"total"])))&&void 0!==e?e:0,x=null!==(t=(0,Z.v9)((0,C.Z)(["api","list",g,"page"])))&&void 0!==t?t:1,h=null!==(n=(0,Z.v9)((0,C.Z)(["api","list",g,"limit"])))&&void 0!==n?n:20,j=(0,Z.v9)((0,C.Z)(["api","list",g,"data"])),b=r.useMemo((function(){return["api","list",g]}),[]),k=!(0,M.Z)(j)||f||m,y=r.useCallback((function(e,t){return(0,N.T)(g,t)}),[]),I=r.useCallback((function(e){return(0,E.I)(g,e)}),[]),D=r.useCallback((function(e){return(0,T.a)(g,"id",e)}),[]),F=r.useCallback((function(e){return(0,T.a)(g,"createdAt",e)}),[]),S=r.useCallback((function(e){return function(t){return(0,O.Y)(g,e)}}),[]),J=r.useCallback((function(e){return function(t){return(0,z.d)(g,e)}}),[]),X=r.useCallback((function(e){return(0,R.V)(g,e)}),[]),$=r.useCallback((function(e){return(0,V.A)(g,e)}),[]),ee=r.useCallback((function(){return(0,H.D)(g)}),[]),te=r.useCallback((function(){return(0,A.P)(g,"loader",!0)()}),[]),ne=r.useCallback((function(e){return function(t){return(0,W.n)(e,t.target)()}}),[]);return r.useEffect((function(){f||(0,w.i)(g,{page:x,limit:h,query:l,select:u,filter:c,sort:d})()}),[f,x,h,l,u,c,d]),r.useEffect((function(){return function(){return(0,P.K)(g)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsxs)(_.Z,{bulkDeletion:!0,toolbarComponent:(0,p.jsx)(G.Z,{to:"/cv/report/0"}),storePath:b,loader:k,length:null!==(a=(j||[]).length)&&void 0!==a?a:0,onBulk:$,onDrop:ee,onLoader:te,children:[(0,p.jsx)(K.Z,{onInput:te}),(0,p.jsx)(Y.Z,{onInput:te}),(0,p.jsx)(fe,{onInput:te})]}),!k&&(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(Q.Z,{bulkDeletion:!0,withChangeLimit:!0,loader:m,total:v,page:x,limit:h,length:null!==(o=(j||[]).length)&&void 0!==o?o:0,onChange:y,onLimit:I,headRowCells:[(0,p.jsx)(U.Z,{name:"id",onChange:D,children:(0,p.jsx)(q.Z,{component:"div",variant:"caption",color:"textSecondary",children:"ID"})},"id"),(0,p.jsx)(B.Z,{children:(0,p.jsx)(q.Z,{component:"div",variant:"caption",color:"textSecondary",children:"File"})},"fileId"),(0,p.jsx)(B.Z,{children:(0,p.jsx)(q.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Status"})},"reportStatusId"),(0,p.jsx)(B.Z,{children:(0,p.jsx)(q.Z,{component:"div",variant:"caption",color:"textSecondary",children:"User"})},"userId"),(0,p.jsx)(U.Z,{name:"createdAt",onChange:F,children:(0,p.jsx)(q.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Story"})},"createdAt")],children:(0,M.Z)(j)&&j.map((function(e){return(0,p.jsx)(Pe,{bulkDeletion:!0,id:e.id,fileId:e.fileId,reportStatusId:e.reportStatusId,userId:e.userId,createdAt:e.createdAt,updatedAt:e.updatedAt,isDeleted:e.isDeleted,isNotDelete:e.isNotDelete,onDrop:S(e.id),onRestore:J(e.id),onMenu:ne(e.id),onCheck:X(e.id),storePath:b},e.id)}))})})]})};(Ae=r.memo(Ae)).defaultProps={};var we=Ae,Ne=n(8185),Ee=n(148),Te=function(){(0,Ee.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/report",text:"Reports"}])()},Oe=function(){return r.useEffect((function(){return Te()}),[]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{pb:2,children:(0,p.jsx)(Ne.Z,{children:"Report list"})})})};(Oe=r.memo(Oe)).defaultProps={};var ze=Oe,Ve=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(ze,{}),(0,p.jsx)(we,{}),(0,p.jsx)(S,{})]})};(Ve=r.memo(Ve)).defaultProps={};var He=Ve,Re=n(2399),We=n(996),Le=n(3979),Me=n(3990),qe=n(2735),Be=n(6369),Qe=n(4598),Ue=n(9465),Ke=n(2619),Ye=n(7823),_e=["storeFormName"],Ge=function(e){var t=e.storeFormName,n=(0,ae.Z)(e,_e),i=(0,Z.v9)((0,C.Z)(["api","form",t,"fileId"]))||"",s=r.useCallback((function(e){return(0,Ke.F)(t,"fileId",e.target.value)()}),[t]);return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{py:2,children:(0,p.jsx)(Ye.default,(0,o.Z)({name:"fileId",label:"File id",value:i,onChange:s},n))})})};(Ge=r.memo(Ge)).defaultProps={};var Je=Ge,Xe=n(7232),$e=["children"],et=function(e){e.children;var t,n,i,a=(0,ae.Z)(e,$e),s=(0,Z.v9)((0,C.Z)(["loader","unmount","visible"])),l=(0,Z.v9)((0,C.Z)(["api","list",b,"loader"])),u=null!==(t=(0,Z.v9)((0,C.Z)(["api","list",b,"total"])))&&void 0!==t?t:0,c=null!==(n=(0,Z.v9)((0,C.Z)(["api","list",b,"page"])))&&void 0!==n?n:1,d=null!==(i=(0,Z.v9)((0,C.Z)(["api","list",b,"limit"])))&&void 0!==i?i:20,f=(0,Z.v9)((0,C.Z)(["api","list",b,"query"])),m=(0,Z.v9)((0,C.Z)(["api","list",b,"data"])),v=!(0,M.Z)(m)||l||s,x=r.useCallback((function(e,t){return(0,N.T)(b,t)}),[]),h=r.useCallback((function(e){return(0,E.I)(b,e)}),[]),j=r.useCallback((function(){}),[]);return r.useEffect((function(){s||(0,w.i)(b,{page:c,limit:d,query:f})()}),[s,c,d,f]),r.useEffect((function(){return function(){return(0,P.K)(b)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(se.Z,{visible:v}),!v&&(0,p.jsx)(Xe.Z,(0,o.Z)((0,o.Z)({},a),{},{total:u,page:c,limit:d,onChangePage:x,onLimit:h,onSearch:j,children:m}))]})};(et=r.memo(et)).defaultProps={name:"reportStatusId",multiple:!1,onChange:function(){}};var tt=et,nt=["storeFormName"],rt=function(e){var t=e.storeFormName,n=(0,ae.Z)(e,nt),i=(0,Z.v9)((0,C.Z)(["api","form",t,"loader"])),s=(0,Z.v9)((0,C.Z)(["api","form",t,"reportStatusId"]))||"",l=(0,Z.v9)((0,C.Z)(["api","form",t,"errors","reportStatusId"])),u=r.useCallback((function(e){return(0,Ke.F)(t,"reportStatusId",e.target.value)()}),[t]);return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{py:2,maxWidth:"240px",children:(0,p.jsx)(tt,(0,o.Z)({disabled:i,name:"reportStatusId",label:"Report status",value:s,onChange:u,error:l},n))})})};(rt=r.memo(rt)).defaultProps={storeFormName:b};var it=rt,at=n(4165),ot=n(5861),st=n(6001),lt=n(5312),ut=n(2674),ct=n(175),dt=function(){var e=(0,ot.Z)((0,at.Z)().mark((function e(t,n){var r,i,a,o,s;return(0,at.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,(0,Ke.F)(g,"loader",!0)();case 3:if(r=(((0,st.Z)().getState().api||{}).form||{})[g]||{},i=r.id,a=r.fileId,o=r.reportStatusId,s={},i&&!(0,ct.Z)(i)&&(s.id="The value is in the wrong format."),a&&!(0,ct.Z)(a)&&(s.fileId="The value is in the wrong format."),o&&!(0,ct.Z)(o)&&(s.reportStatusId="The value is in the wrong format."),!(Object.keys(s).length>0)){e.next=15;break}return e.next=11,(0,Ke.F)(g,"errors",s)();case 11:return e.next=13,(0,Ke.F)(g,"loader",!1)();case 13:e.next=16;break;case 15:(0,Le.Z)(n)?(0,ut.L)(g,n)():(0,lt.Y)(g)();case 16:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ft=dt,pt=function(){var e=(0,i.UO)().entityId,t=(0,Z.v9)((0,C.Z)(["loader","unmount","visible"])),n=(0,Z.v9)((0,C.Z)(["api","form",g,"loader"])),a=(0,Z.v9)((0,C.Z)(["api","form",g],(function(e){return Object.keys(e||{}).length}))),o=(0,Z.v9)((0,C.Z)(["api","form",g,"contentId"])),s=(0,Z.v9)((0,C.Z)(["api","form",g,"isNotDelete"])),l=(0,Z.v9)((0,C.Z)(["api","form",g,"isDeleted"])),u=r.useCallback((function(t){return ft(t,e)}),[e]),c=r.useCallback((function(t){return(0,Re.n)(g,{entityId:e})()}),[e]),d=r.useCallback((function(t){return(0,Re.n)(We.m5,{entityId:e})()}),[e]);return r.useEffect((function(){t||(0,be.y)(g,e)()}),[t,e]),r.useEffect((function(){return function(){return(0,ke.z)(g)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsxs)(Me.Z,{onSubmit:u,onDrop:c,loader:n||(0,Le.Z)(e)&&a<6,isDeleted:l,isNotDelete:s,showDropButton:!s&&(0,Le.Z)(e),children:[(0,p.jsx)(Ue.Z,{storeFormName:g}),(0,p.jsx)(Je,{storeFormName:g}),(0,p.jsx)(it,{storeFormName:g}),(0,Le.Z)(e)&&(0,p.jsx)(qe.Z,{contentId:o,onAdd:d})]}),(0,p.jsx)(Be.Z,{contentId:o}),(0,p.jsx)(Qe.Z,{})]})};(pt=r.memo(pt)).defaultProps={};var mt=pt,vt=function(e,t){(0,Ee.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/report",text:"Reports"},{key:"/cv/report/".concat(e),text:"0"===e?"Create new report":(0,p.jsx)("span",{style:{textDecoration:t?"line-through":"initial"},children:e})}])()},xt=function(){var e=(0,i.UO)().entityId,t=(0,Z.v9)((0,C.Z)(["api","form",g,"isDeleted"]));return r.useEffect((function(){return vt(e,t)}),[e,t]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{pb:2,children:(0,p.jsx)(Ne.Z,{entityId:e,isDeleted:t,defaultContent:"Create new report",children:"Edit report"})})})};(xt=r.memo(xt)).defaultProps={};var ht=xt,Zt=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(ht,{}),(0,p.jsx)(S,{}),(0,p.jsx)(mt,{})]})};(Zt=r.memo(Zt)).defaultProps={};var jt=Zt,gt=n(2481),bt=function(){var e=(0,Z.v9)((0,C.Z)(["dialog",b,"entityId"])),t=(0,Z.v9)((0,C.Z)(["api","form",b,"loader"])),n=(0,Z.v9)((0,C.Z)(["api","list",b,"loader"])),i=r.useCallback((function(t){return(0,j.R)(b,e)()}),[e]);return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(gt.Z,{loader:!0===t||!0===n,maxWidth:"xs",id:b,onHandle:i})})};(bt=r.memo(bt)).defaultProps={};var kt=bt,Ct=n(6236),yt=n(461),It=function(){var e,t,n,a,o=(0,i.TH)().search,s=(0,L.Z)("query",o),l=(0,L.Z)("select",o),u=(0,L.Z)("filter",o),c=(0,L.Z)("sort",o),d=(0,Z.v9)((0,C.Z)(["loader","unmount","visible"])),f=(0,Z.v9)((0,C.Z)(["api","list",b,"loader"])),m=null!==(e=(0,Z.v9)((0,C.Z)(["api","list",b,"total"])))&&void 0!==e?e:0,v=null!==(t=(0,Z.v9)((0,C.Z)(["api","list",b,"page"])))&&void 0!==t?t:1,x=null!==(n=(0,Z.v9)((0,C.Z)(["api","list",b,"limit"])))&&void 0!==n?n:20,h=(0,Z.v9)((0,C.Z)(["api","list",b,"data"])),j=r.useMemo((function(){return["api","list",b]}),[]),g=!(0,M.Z)(h)||d||f,k=r.useCallback((function(e,t){return(0,N.T)(b,t)}),[]),y=r.useCallback((function(e){return(0,E.I)(b,e)}),[]),I=r.useCallback((function(e){return(0,T.a)(b,"id",e)}),[]),D=r.useCallback((function(e){return(0,T.a)(b,"createdAt",e)}),[]),F=r.useCallback((function(e){return function(t){return(0,O.Y)(b,e)}}),[]),S=r.useCallback((function(e){return function(t){return(0,z.d)(b,e)}}),[]),q=r.useCallback((function(e){return(0,R.V)(b,e)}),[]),B=r.useCallback((function(e){return(0,V.A)(b,e)}),[]),Q=r.useCallback((function(){return(0,H.D)(b)}),[]),U=r.useCallback((function(){return(0,A.P)(b,"loader",!0)()}),[]),J=r.useCallback((function(e){return function(t){return(0,W.n)(e,t.target)()}}),[]);return r.useEffect((function(){d||(0,w.i)(b,{page:v,limit:x,query:s,select:l,filter:u,sort:c})()}),[d,v,x,s,l,u,c]),r.useEffect((function(){return function(){return(0,P.K)(b)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsxs)(_.Z,{bulkDeletion:!0,toolbarComponent:(0,p.jsx)(G.Z,{to:"/cv/report/statuses/0"}),storePath:j,loader:g,length:null!==(a=(h||[]).length)&&void 0!==a?a:0,onBulk:B,onDrop:Q,onLoader:U,children:[(0,p.jsx)(K.Z,{onInput:U}),(0,p.jsx)(Y.Z,{onInput:U})]}),(0,p.jsx)(Ct.Z,{bulkDeletion:!0,loader:g,total:m,page:v,limit:x,onChangePage:k,onLimit:y,onSortId:I,onSortCreatedAt:D,children:(0,M.Z)(h)&&h.map((function(e){return(0,p.jsx)(yt.Z,{bulkDeletion:!0,id:e.id,to:"/cv/report/statuses/".concat(e.id),name:e.name,description:e.description,createdAt:e.createdAt,updatedAt:e.updatedAt,isDeleted:e.isDeleted,isNotDelete:e.isNotDelete,onDrop:F(e.id),onRestore:S(e.id),onMenu:J(e.id),onCheck:q(e.id),storePath:j},e.id)}))})]})};(It=r.memo(It)).defaultProps={};var Dt=It,Ft=n(795),St=function(){(0,Ee.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/report",text:"Reports"},{key:"/cv/report/statuses",text:"Statuses"}])()},Pt=function(){return r.useEffect((function(){return St()}),[]),(0,p.jsx)(r.Fragment,{children:(0,p.jsxs)(a.Z,{pb:2,children:[(0,p.jsx)(Ne.Z,{children:"Statuses"}),(0,p.jsx)(Ft.Z,{children:"Statuses"})]})})};(Pt=r.memo(Pt)).defaultProps={};var At=Pt,wt=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(At,{}),(0,p.jsx)(Dt,{}),(0,p.jsx)(kt,{})]})};(wt=r.memo(wt)).defaultProps={};var Nt=wt,Et=n(2111),Tt=n(7514),Ot=n(2394),zt=n(6749),Vt=n(934),Ht=n(2069),Rt=n(4327),Wt=function(){var e=(0,ot.Z)((0,at.Z)().mark((function e(t,n){var r,i,a,o,s,l;return(0,at.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,(0,Ke.F)(b,"loader",!0)();case 3:if(r=(((0,st.Z)().getState().api||{}).form||{})[b]||{},i=r.id,a=r.name,o=r.description,s=r.isNotDelete,l={},i&&!(0,ct.Z)(i)&&(l.id="The value is in the wrong format."),!(0,Ht.Z)(a)&&(l.name="The value is in the wrong format."),o&&!(0,Rt.Z)(o)&&(l.description="The value is in the wrong format."),(0,Vt.Z)(s)&&!(0,zt.Z)(s)&&(l.isNotDelete="The value is in the wrong format."),!(Object.keys(l).length>0)){e.next=16;break}return e.next=12,(0,Ke.F)(b,"errors",l)();case 12:return e.next=14,(0,Ke.F)(b,"loader",!1)();case 14:e.next=17;break;case 16:(0,Le.Z)(n)?(0,ut.L)(b,n)():(0,lt.Y)(b)();case 17:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Lt=Wt,Mt=function(){var e=(0,i.UO)().entityId,t=(0,Z.v9)((0,C.Z)(["loader","unmount","visible"])),n=(0,Z.v9)((0,C.Z)(["api","form",b,"loader"])),a=(0,Z.v9)((0,C.Z)(["api","form",b],(function(e){return Object.keys(e||{}).length}))),o=(0,Z.v9)((0,C.Z)(["api","form",b,"isNotDelete"])),s=(0,Z.v9)((0,C.Z)(["api","form",b,"isDeleted"])),l=r.useCallback((function(t){return Lt(t,e)}),[e]),u=r.useCallback((function(t){return(0,Re.n)(b,{entityId:e})()}),[e]);return r.useEffect((function(){t||(0,be.y)(b,e)()}),[t,e]),r.useEffect((function(){return function(){return(0,ke.z)(b)()}}),[]),(0,p.jsx)(r.Fragment,{children:(0,p.jsxs)(Me.Z,{onSubmit:l,onDrop:u,loader:n||(0,Le.Z)(e)&&a<6,isDeleted:s,isNotDelete:o,showDropButton:!o&&(0,Le.Z)(e),children:[(0,p.jsx)(Ue.Z,{storeFormName:b}),(0,p.jsx)(Et.Z,{storeFormName:b}),(0,p.jsx)(Tt.Z,{storeFormName:b}),(0,p.jsx)(Ot.Z,{storeFormName:b})]})})};(Mt=r.memo(Mt)).defaultProps={};var qt=Mt,Bt=function(e,t){(0,Ee.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/report",text:"Reports"},{key:"/cv/report/statuses",text:"Statuses"},{key:"/cv/report/statuses/".concat(e),text:"0"===e?"Create new status":(0,p.jsx)("span",{style:{textDecoration:t?"line-through":"initial"},children:e})}])()},Qt=function(){var e=(0,i.UO)().entityId,t=(0,Z.v9)((0,C.Z)(["api","form",b,"isDeleted"]));return r.useEffect((function(){return Bt(e,t)}),[e,t]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{pb:2,children:(0,p.jsx)(Ne.Z,{entityId:e,isDeleted:t,defaultContent:"Add status",children:"Edit status"})})})};(Qt=r.memo(Qt)).defaultProps={};var Ut=Qt,Kt=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(Ut,{}),(0,p.jsx)(kt,{}),(0,p.jsx)(qt,{})]})};(Kt=r.memo(Kt)).defaultProps={};var Yt=Kt,_t=n(2426),Gt=function(){var e=(0,Z.v9)((0,C.Z)(["dialog",k,"entityId"])),t=(0,Z.v9)((0,C.Z)(["api","form",k,"loader"])),n=(0,Z.v9)((0,C.Z)(["api","list",k,"loader"])),i=r.useCallback((function(t){return(0,j.R)(k,e)()}),[e]);return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(_t.Z,{loader:!0===t||!0===n,maxWidth:"xs",id:k,onHandle:i})})};(Gt=r.memo(Gt)).defaultProps={};var Jt=Gt,Xt=n(2218),$t=n(3417),en=function(){var e,t,n,a,o=(0,i.TH)().search,s=(0,L.Z)("query",o),l=(0,L.Z)("select",o),u=(0,L.Z)("filter",o),c=(0,L.Z)("sort",o),d=(0,Z.v9)((0,C.Z)(["loader","unmount","visible"])),f=(0,Z.v9)((0,C.Z)(["api","list",k,"loader"])),m=null!==(e=(0,Z.v9)((0,C.Z)(["api","list",k,"total"])))&&void 0!==e?e:0,v=null!==(t=(0,Z.v9)((0,C.Z)(["api","list",k,"page"])))&&void 0!==t?t:1,x=null!==(n=(0,Z.v9)((0,C.Z)(["api","list",k,"limit"])))&&void 0!==n?n:20,h=(0,Z.v9)((0,C.Z)(["api","list",k,"data"])),j=r.useMemo((function(){return["api","list",k]}),[]),g=!(0,M.Z)(h)||d||f,b=r.useCallback((function(e,t){return(0,N.T)(k,t)}),[]),y=r.useCallback((function(e){return(0,E.I)(k,e)}),[]),I=r.useCallback((function(e){return(0,T.a)(k,"id",e)}),[]),D=r.useCallback((function(e){return(0,T.a)(k,"createdAt",e)}),[]),F=r.useCallback((function(e){return function(t){return(0,O.Y)(k,e)}}),[]),S=r.useCallback((function(e){return function(t){return(0,z.d)(k,e)}}),[]),q=r.useCallback((function(e){return(0,R.V)(k,e)}),[]),B=r.useCallback((function(e){return(0,V.A)(k,e)}),[]),Q=r.useCallback((function(){return(0,H.D)(k)}),[]),U=r.useCallback((function(){return(0,A.P)(k,"loader",!0)()}),[]),J=r.useCallback((function(e){return function(t){return(0,W.n)(e,t.target)()}}),[]);return r.useEffect((function(){d||(0,w.i)(k,{page:v,limit:x,query:s,select:l,filter:u,sort:c})()}),[d,v,x,s,l,u,c]),r.useEffect((function(){return function(){return(0,P.K)(k)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsxs)(_.Z,{bulkDeletion:!0,toolbarComponent:(0,p.jsx)(G.Z,{to:"/cv/settings/0"}),storePath:j,loader:g,length:null!==(a=(h||[]).length)&&void 0!==a?a:0,onBulk:B,onDrop:Q,onLoader:U,children:[(0,p.jsx)(K.Z,{onInput:U}),(0,p.jsx)(Y.Z,{onInput:U})]}),(0,p.jsx)(Xt.Z,{bulkDeletion:!0,loader:g,total:m,page:v,limit:x,onChangePage:b,onLimit:y,onSortId:I,onSortCreatedAt:D,children:(0,M.Z)(h)&&h.map((function(e){var t;return(0,p.jsx)($t.Z,{bulkDeletion:!0,id:e.id,to:"/cv/settings/".concat(e.id),name:e.name,description:e.description,dataTypeId:e.dataTypeId,value:null!==(t=e.value)&&void 0!==t?t:e.defaultValue,regex:e.regex,isRequired:e.isRequired,isDeleted:e.isDeleted,isNotDelete:e.isNotDelete,createdAt:e.createdAt,updatedAt:e.updatedAt,onDrop:F(e.id),onRestore:S(e.id),onMenu:J(e.id),onCheck:q(e.id),storePath:j},e.id)}))})]})};(en=r.memo(en)).defaultProps={};var tn=en,nn=function(){(0,Ee.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/settings",text:"Settings"}])()},rn=function(){return r.useEffect((function(){return nn()}),[]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{pt:1,pb:2,children:(0,p.jsx)(Ne.Z,{children:"Settings list"})})})};(rn=r.memo(rn)).defaultProps={};var an=rn,on=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(an,{}),(0,p.jsx)(tn,{}),(0,p.jsx)(Jt,{})]})};(on=r.memo(on)).defaultProps={};var sn=on,ln=n(7497),un=n(6586),cn=n(6205),dn=n(3588),fn=n(7836),pn=n(1403),mn=function(){var e=(0,ot.Z)((0,at.Z)().mark((function e(t,n){var r,i,a,o,s,l,u,c,d;return(0,at.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,(0,Ke.F)(k,"loader",!0)();case 3:if(r=(((0,st.Z)().getState().api||{}).form||{})[k]||{},i=r.id,a=r.name,o=r.description,s=r.dataTypeId,l=r.regex,u=r.isRequired,c=r.isNotDelete,d={},i&&!(0,ct.Z)(i)&&(d.id="The value is in the wrong format."),!(0,Ht.Z)(a)&&(d.name="The value is in the wrong format."),o&&!(0,Rt.Z)(o)&&(d.description="The value is in the wrong format."),!(0,pn.Z)(s)&&(d.dataTypeId="The value is in the wrong format."),l&&!(0,fn.Z)(l)&&(d.regex="The value is in the wrong format."),(0,Vt.Z)(u)&&!(0,zt.Z)(u)&&(d.isRequired="The value is in the wrong format."),(0,Vt.Z)(c)&&!(0,zt.Z)(c)&&(d.isNotDelete="The value is in the wrong format."),!(Object.keys(d).length>0)){e.next=19;break}return e.next=15,(0,Ke.F)(k,"errors",d)();case 15:return e.next=17,(0,Ke.F)(k,"loader",!1)();case 17:e.next=20;break;case 19:(0,Le.Z)(n)?(0,ut.L)(k,n)():(0,lt.Y)(k)();case 20:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),vn=mn,xn=function(){var e=(0,i.UO)().entityId,t=(0,Z.v9)((0,C.Z)(["loader","unmount","visible"])),n=(0,Z.v9)((0,C.Z)(["api","form",k,"loader"])),a=(0,Z.v9)((0,C.Z)(["api","form",k],(function(e){return Object.keys(e||{}).length}))),o=(0,Z.v9)((0,C.Z)(["api","form",k,"isNotDelete"])),s=(0,Z.v9)((0,C.Z)(["api","form",k,"isDeleted"])),l=r.useCallback((function(t){return vn(t,e)}),[e]),u=r.useCallback((function(t){return(0,Re.n)(k,{entityId:e})()}),[e]);return r.useEffect((function(){t||(0,be.y)(k,e)()}),[t,e]),r.useEffect((function(){return function(){return(0,ke.z)(k)()}}),[]),(0,p.jsx)(r.Fragment,{children:(0,p.jsxs)(Me.Z,{onSubmit:l,onDrop:u,loader:n||(0,Le.Z)(e)&&a<6,isDeleted:s,isNotDelete:o,showDropButton:!o&&(0,Le.Z)(e),children:[(0,p.jsx)(Ue.Z,{storeFormName:k}),(0,p.jsx)(Et.Z,{storeFormName:k}),(0,p.jsx)(Tt.Z,{storeFormName:k}),(0,p.jsx)(ln.Z,{storeFormName:k}),(0,p.jsx)(un.Z,{storeFormName:k}),(0,p.jsx)(cn.Z,{storeFormName:k}),(0,p.jsx)(dn.Z,{storeFormName:k}),(0,p.jsx)(Ot.Z,{storeFormName:k})]})})};(xn=r.memo(xn)).defaultProps={};var hn=xn,Zn=function(e,t){(0,Ee.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/settings",text:"Settings"},{key:"/cv/settings/".concat(e),text:"0"===e?"Create new setting":(0,p.jsx)("span",{style:{textDecoration:t?"line-through":"initial"},children:e})}])()},jn=function(){var e=(0,i.UO)().entityId,t=(0,Z.v9)((0,C.Z)(["api","form",k,"isDeleted"]));return r.useEffect((function(){return Zn(e,t)}),[e,t]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{pt:1,pb:2,children:(0,p.jsx)(Ne.Z,{entityId:e,isDeleted:t,defaultContent:"Add setting",children:"Edit setting"})})})};(jn=r.memo(jn)).defaultProps={};var gn=jn,bn=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(gn,{}),(0,p.jsx)(Jt,{}),(0,p.jsx)(hn,{})]})};(bn=r.memo(bn)).defaultProps={};var kn=bn,Cn=function(){return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(i.Z5,{children:(0,p.jsxs)(i.AW,{path:"",element:(0,p.jsx)(h,{}),children:[(0,p.jsx)(i.AW,{index:!0,element:(0,p.jsx)(He,{})}),(0,p.jsx)(i.AW,{path:":entityId",element:(0,p.jsx)(jt,{})}),(0,p.jsx)(i.AW,{path:"report",element:(0,p.jsx)(He,{})}),(0,p.jsx)(i.AW,{path:"report/:entityId",element:(0,p.jsx)(jt,{})}),(0,p.jsx)(i.AW,{path:"report/statuses",element:(0,p.jsx)(Nt,{})}),(0,p.jsx)(i.AW,{path:"report/statuses/:entityId",element:(0,p.jsx)(Yt,{})}),(0,p.jsx)(i.AW,{path:"settings",element:(0,p.jsx)(sn,{})}),(0,p.jsx)(i.AW,{path:"settings/:entityId",element:(0,p.jsx)(kn,{})})]})})})};(Cn=r.memo(Cn)).defaultProps={};var yn=Cn},7823:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var r=n(885),i=n(5987),a=n(2791),o=n(6030),s=n(7235),l=n(9154),u=n(4924),c=n(708),d=n(7487),f=n(1091),p=n(9885),m=n(1413),v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!(0,d.Z)(e))return!1;var t=e.split(".");return"png"===t[t.length-1]||"jpeg"===t[t.length-1]||"jpg"===t[t.length-1]||"svg"===t[t.length-1]||"gif"===t[t.length-1]||0===e.indexOf("data:image/png;base64")||0===e.indexOf("data:image/jpeg;base64")||0===e.indexOf("data:image/jpg;base64")||0===e.indexOf("data:image/svg;base64")||0===e.indexOf("data:image/png;base64")},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return v(e)},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!(0,d.Z)(e))return!1;var t=e.split(".");return"pdf"===t[t.length-1]||0===e.indexOf("data:application/pdf;base64")},Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!(0,d.Z)(e))return!1;var t=e.split(".");return"ejs"===t[t.length-1]||0===e.indexOf("data:application/octet-stream;base64")||0===e.indexOf("data:application/ejs;base64")},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return 0!==e.indexOf("https://")&&0!==e.indexOf("http://")||e.includes("https://files.cidiator.com")?"https://files.cidiator.com"+e+(t?"?accessToken=".concat(localStorage.getItem("".concat("https://dev.cidiator.com","_accessToken"))):""):e},g=n(6015),b=n(4565),k=n(1814),C=n(5070),y=n(1251),I=n(184),D=function(e){var t=e.loader,n=e.path,r=e.name,i=e.size,o=a.useMemo((function(){return x(n)}),[n]),s=a.useMemo((function(){return h(n)}),[n]),l=a.useMemo((function(){return Z(n)}),[n]);return(0,I.jsxs)(a.Fragment,{children:[(0,I.jsx)(y.Z,{visible:t}),(0,I.jsxs)(g.Z,{sx:{display:t?"none":"block"},children:[(0,I.jsx)(g.Z,{maxWidth:"240px",sx:(0,m.Z)((0,m.Z)({position:"relative"},o?{backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundImage:"url('".concat(j(n,!0),"')")}:{}),{},{"&:after":{content:'""',display:"block",paddingBottom:o?"100%":"0px"}}),children:function(){switch(!0){case s:return(0,I.jsx)("a",{href:j(n,!0),target:"_blank",rel:"noreferrer",children:(0,I.jsx)(k.Z,{color:"primary",style:{fontSize:"900%"}})});case l:return(0,I.jsx)("a",{href:j(n,!0),target:"_blank",rel:"noreferrer",children:(0,I.jsx)(C.Z,{color:"primary",style:{fontSize:"900%"}})});case!o:return(0,I.jsx)("a",{href:j(n,!0),target:"_blank",rel:"noreferrer",children:(0,I.jsx)(p.Z,{style:{fontSize:"900%"}})});default:return(0,I.jsx)(a.Fragment,{})}}()}),(0,I.jsx)(b.Z,{component:"div",variant:"body2",sx:{wordWrap:"anywhere",paddingLeft:"6px",paddingTop:"2px"},children:(0,I.jsx)("b",{children:r?r.length>80?"".concat((r||"").substring(0,80),"..."):r:(n||"").length>80?"".concat((n||"").substring(0,80),"..."):n})}),"number"===typeof i&&(0,I.jsxs)(b.Z,{component:"div",variant:"caption",sx:{paddingLeft:"6px",paddingBottom:"2px"},children:["Size: ",i]})]})]})};(D=a.memo(D)).defaultProps={};var F=D,S=["disabled","label","value","defaultValue"],P=function(e){var t=e.disabled,n=e.label,m=e.value,v=e.defaultValue,x=((0,i.Z)(e,S),a.useState((function(){return(0,d.Z)(m)?m:(0,d.Z)(v)?v:""}))),h=(0,r.Z)(x,1)[0],Z=(0,o.v9)((0,c.Z)(["api","form","".concat(u.mu,"/").concat(h),"loader"])),j=(0,o.v9)((0,c.Z)(["api","form","".concat(u.mu,"/").concat(h),"systemId"])),g=(0,o.v9)((0,c.Z)(["api","form","".concat(u.mu,"/").concat(h),"path"])),b=(0,o.v9)((0,c.Z)(["api","form","".concat(u.mu,"/").concat(h),"size"]));return a.useEffect((function(){h&&!j&&(0,s.y)((function(){return"".concat(u.mu,"/").concat(h)}),{entityId:h})()}),[h,j]),a.useEffect((function(){return function(){(0,l.z)("".concat(u.mu,"/").concat(h))()}}),[h]),(0,I.jsxs)(a.Fragment,{children:[(0,I.jsx)(f.Z,{disableElevation:!0,variant:"contained",color:"primary",disabled:t,startIcon:(0,I.jsx)(p.Z,{}),children:n}),(0,I.jsx)(F,{loader:Z||!j,path:g,size:b})]})};(P=a.memo(P)).defaultProps={label:"Select file",onChange:function(){}};var A=P},9885:function(e,t,n){var r=n(4836);t.Z=void 0;var i=r(n(5649)),a=n(184),o=(0,i.default)((0,a.jsx)("path",{d:"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"}),"InsertDriveFile");t.Z=o},1814:function(e,t,n){var r=n(4836);t.Z=void 0;var i=r(n(5649)),a=n(184),o=(0,i.default)((0,a.jsx)("path",{d:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"}),"PictureAsPdf");t.Z=o},5070:function(e,t,n){var r=n(4836);t.Z=void 0;var i=r(n(5649)),a=n(184),o=(0,i.default)((0,a.jsx)("path",{d:"M21 5v6.5H9.33V5H21zm-6.33 14v-6.5H9.33V19h5.34zm1-6.5V19H21v-6.5h-5.33zM8.33 19V5H3v14h5.33z"}),"ViewQuilt");t.Z=o}}]);
//# sourceMappingURL=143.673a0385.chunk.js.map