"use strict";(self.webpackChunkmain=self.webpackChunkmain||[]).push([[312,476],{2210:function(e,t,n){n.d(t,{Z:function(){return S}});var r=n(885),i=n(2791),a=n(6030),o=n(7689),s=n(2810),u=n(2507),l=n(2379),c=n(4410),d=n(708),f=n(7533),p=n(3858),m=n(5953),v=n(3811),x=n(9823),Z=n(1413),h=n(5987),j=n(2606),g=n(4307),I=n(3135),b=n(9300),k=n(5405),D=n(2123),C=n(5951),y=n(184),w=["value","defaultValue","children"],F=function(e){var t,n,r,o=e.value,s=e.defaultValue,u=(e.children,(0,h.Z)(e,w)),l=null!==o&&void 0!==o?o:s,f=(0,a.v9)((0,d.Z)(["loader","unmount","visible"])),p=(0,a.v9)((0,d.Z)(["api","list",c.I6,"loader"])),m=null!==(t=(0,a.v9)((0,d.Z)(["api","list",c.I6,"total"])))&&void 0!==t?t:0,v=null!==(n=(0,a.v9)((0,d.Z)(["api","list",c.I6,"page"])))&&void 0!==n?n:1,x=null!==(r=(0,a.v9)((0,d.Z)(["api","list",c.I6,"limit"])))&&void 0!==r?r:20,F=(0,a.v9)((0,d.Z)(["api","list",c.I6,"query"]))||"",B=(0,a.v9)((0,d.Z)(["api","list",c.I6,"data"])),P=!(0,C.Z)(B)||p||f,S=i.useCallback((function(e,t){return(0,I.T)(c.I6,t)}),[]),_=i.useCallback((function(e){return(0,b.I)(c.I6,e)}),[]),A=i.useCallback((function(){}),[]);return i.useEffect((function(){f||(0,g.i)(c.I6,{page:v,limit:x,query:F})()}),[f,v,x,F]),i.useEffect((function(){return function(){return(0,j.K)(c.I6)()}}),[]),(0,y.jsxs)(i.Fragment,{children:[(0,y.jsx)(D.Z,{visible:P}),!P&&(0,y.jsx)(k.Z,(0,Z.Z)((0,Z.Z)({},u),{},{value:o,defaultValue:s,total:m,page:v,limit:x,onChangePage:S,onLimit:_,onSearch:A,children:B.map((function(e){return(0,Z.Z)((0,Z.Z)({},e),{},{active:!!l.find((function(t){return t.value===e.id}))})}))}))]})};(F=i.memo(F)).defaultProps={name:"reportStatusId",multiple:!1,onChange:function(){}};var B=F,P=function(e){var t=e.onChange,n=e.onInput,Z=(0,o.TH)().search,h=i.useState((function(){return(0,s.Z)()})),j=(0,r.Z)(h,1)[0],g=(0,a.v9)((0,d.Z)(["api","list",c.I6,"data","length"]))>0?(0,f.Z)(Z,c.I6,"reportStatusId"):[],I=i.useCallback((function(e){(0,u.V)(e,(0,p.Z)("reportStatusId")),t(e),n(e)}),[t,n]),b=i.useCallback((function(e){(0,l.h)((0,p.Z)("reportStatusId")),t(e),n(e)}),[t,n]);return(0,y.jsx)(i.Fragment,{children:(0,y.jsxs)(m.ZP,{container:!0,alignItems:"center",children:[(0,y.jsx)(m.ZP,{item:!0,xs:!1,children:(0,y.jsx)(v.Z,{size:"small",color:"error",onClick:b,children:(0,y.jsx)(x.Z,{fontSize:"small"})})}),(0,y.jsx)(m.ZP,{item:!0,xs:!0,children:(0,y.jsx)(B,{label:"Status",name:j,onChange:I,value:g})})]})})};(P=i.memo(P)).defaultProps={onChange:function(){},onInput:function(){}};var S=P},6179:function(e,t,n){n.d(t,{Z:function(){return x}});var r=n(1413),i=n(5987),a=n(2791),o=n(6030),s=n(7235),u=n(9154),l=n(789),c=n(4410),d=n(708),f=n(4565),p=n(184),m=["children"],v=function(e){var t=e.children,n=(0,i.Z)(e,m),v=(0,o.v9)((0,d.Z)(["loader","unmount","visible"])),x=(0,o.v9)((0,d.Z)(["api","form","".concat(c.I6,"/").concat(t),"name"]));return a.useEffect((function(){v||(0,s.y)((function(){return"".concat(c.I6,"/").concat(t)}),{entityId:t,withLoop:!0})()}),[v,t]),a.useEffect((function(){return function(){(0,u.z)("".concat(c.I6,"/").concat(t))(),(0,l.B)("".concat(c.I6,"/").concat(t))}}),[t]),(0,p.jsx)(a.Fragment,{children:(0,p.jsx)(f.Z,(0,r.Z)((0,r.Z)({component:"div"},n),{},{children:null!==x&&void 0!==x?x:t}))})};(v=a.memo(v)).defaultProps={};var x=v},4410:function(e,t,n){n.d(t,{DB:function(){return r},I6:function(){return i},XB:function(){return o},mJ:function(){return s},rT:function(){return u},w_:function(){return a}});var r="https://api.cidiator.com/cv/report",i="https://api.cidiator.com/cv/report-status",a="https://api.cidiator.com/cv/setting",o="/cv/report/0",s="/cv/report/statuses/0",u="/cv/settings/0"},312:function(e,t,n){n.r(t),n.d(t,{default:function(){return un}});var r=n(2791),i=n(7689),a=n(6015),o=n(1413),s=n(885),u=n(142),l=n(166),c=n(6582),d=n(1091),f=n(7161),p=n(184),m=function(){var e=(0,i.TH)().pathname,t=e.substring(1),n=[0===t.indexOf("cv/report"),0===t.indexOf("cv/settings")],m=r.useState((function(){return"/cv"===e?0:n.indexOf(!0)})),v=(0,s.Z)(m,2),x=v[0],Z=v[1],h=r.useCallback((function(e,t){Z(t)}),[Z]);return r.useEffect((function(){"/cv"===e&&Z(0)}),[e,Z]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsxs)(u.Z,{variant:"scrollable",value:x>=0?x:0,onChange:h,children:[(0,p.jsx)(l.Z,(0,o.Z)({label:"Reports"},0===t.indexOf("cv/report")||"/cv"===e?{sx:{textTransform:"initial",pointerEvents:"none"}}:{component:f.Z,to:"report",sx:{textTransform:"initial"}})),(0,p.jsx)(l.Z,(0,o.Z)({label:"Settings"},0===t.indexOf("cv/settings")?{sx:{textTransform:"initial",pointerEvents:"none"}}:{component:f.Z,to:"settings",sx:{textTransform:"initial"}}))]}),(0,p.jsx)(a.Z,{py:0===x?2:0,children:x<=0?(0,p.jsxs)(c.Z,{disableElevation:!0,variant:"outlined",color:"primary",size:"small",children:[(0,p.jsx)(d.Z,(0,o.Z)((0,o.Z)({},0!==t.indexOf("cv/report/options")&&0!==t.indexOf("cv/report/statuses")&&0!==t.indexOf("cv/report/routes")?{variant:"contained",sx:{pointerEvents:"none"}}:{component:f.Z,to:"/cv/report"}),{},{children:"Data"})),(0,p.jsx)(d.Z,(0,o.Z)((0,o.Z)({},0===t.indexOf("cv/report/statuses")?{variant:"contained",sx:{pointerEvents:"none"}}:{component:f.Z,to:"/cv/report/statuses"}),{},{children:"Statuses"}))]}):(0,p.jsx)(r.Fragment,{})})]})};(m=r.memo(m)).defaultProps={};var v=m,x=function(e){e.children;return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(a.Z,{pr:2,children:(0,p.jsx)(v,{})}),(0,p.jsx)(i.j3,{})]})};(x=r.memo(x)).defaultProps={};var Z=x,h=n(6030),j=n(8954),g=n(4410),I=n(708),b=n(9571),k=n(2882),D=n(6166),C=function(){var e=(0,h.v9)((0,I.Z)(["dialog",g.DB,"entityId"])),t=(0,h.v9)((0,I.Z)(["api","form",g.DB,"loader"])),n=(0,h.v9)((0,I.Z)(["api","list",g.DB,"loader"])),i=r.useCallback((function(t){return(0,j.R)(g.DB,e)()}),[e]);return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(k.Z,{id:g.DB,loader:!0===t||!0===n,maxWidth:"xs",title:"Delete report?",actions:(0,p.jsx)(D.Z,{loader:!0===t||!0===n,onClick:i,children:"OK"}),children:(0,p.jsx)(b.Z,{children:"Are you sure you want to delete the current report? This operation is irreversible and may compromise data integrity."})})})};(C=r.memo(C)).defaultProps={};var y=C,w=n(2606),F=n(2772),B=n(4307),P=n(3135),S=n(9300),_=n(2100),A=n(2650),T=n(7642),E=n(6498),N=n(8686),O=n(891),V=n(4432),z=n(6601),H=n(5951),R=n(4565),W=n(4390),L=n(3438),M=n(3343),q=n(1419),Q=n(4096),U=n(44),K=n(3895),Y=n(2210),J=n(2982),X=n(7060),G=n(807),$=n(3811),ee=n(5473),te=n(2898),ne=n(8061),re=n(9949),ie=n(7562),ae=n(6179),oe=n(4068),se=n(8947),ue=function(e){var t=e.bulkDeletion,n=e.id,i=e.fileId,a=e.reportStatusId,o=e.userId,s=e.isDeleted,u=e.isNotDelete,l=e.createdAt,c=e.updatedAt,d=e.onClose,f=e.onDrop,m=e.onRestore,v=e.onMenu,x=e.onCheck,Z=e.storePath,j=(0,h.v9)((0,X.Z)([].concat((0,J.Z)(Z),["selected"]),n));return(0,p.jsx)(r.Fragment,{children:(0,p.jsxs)(G.Z,{children:[t&&(0,H.Z)(Z)&&(0,p.jsx)(W.Z,{padding:"checkbox",sx:{minWidth:"1%"},children:(0,p.jsx)(ee.Z,{checked:j,onChange:x})}),(0,p.jsx)(W.Z,{sx:{minWidth:"23%"},children:(0,p.jsx)(ne.Z,{to:"/cv/report/".concat(n),isDeleted:s,children:n})}),(0,p.jsx)(W.Z,{sx:{minWidth:"12%"},children:(0,p.jsx)(oe.Z,{children:i})}),(0,p.jsx)(W.Z,{sx:{minWidth:"23%"},children:(0,p.jsx)(ae.Z,{children:a})}),(0,p.jsx)(W.Z,{sx:{minWidth:"10%"},children:(0,p.jsx)(ie.Z,{children:o})}),(0,p.jsx)(W.Z,{sx:{width:"20%"},children:(0,p.jsx)(re.Z,{createdAt:l,updatedAt:c})}),(0,p.jsxs)(W.Z,{sx:{width:"1%"},children:[(0,p.jsx)($.Z,{onClick:v,children:(0,p.jsx)(te.Z,{})}),(0,p.jsx)(se.Z,{id:n,isDeleted:s,isNotDelete:u,onClose:d,onDrop:f,onRestore:m})]})]},n)})};(ue=r.memo(ue)).defaultProps={bulkDeletion:!1,onCheck:function(){}};var le=ue,ce=function(){var e,t,n,a,o,s=(0,i.TH)().search,u=(0,z.Z)("query",s),l=(0,z.Z)("select",s),c=(0,z.Z)("filter",s),d=(0,z.Z)("sort",s),f=(0,h.v9)((0,I.Z)(["loader","unmount","visible"])),m=(0,h.v9)((0,I.Z)(["api","list",g.DB,"loader"])),v=null!==(e=(0,h.v9)((0,I.Z)(["api","list",g.DB,"total"])))&&void 0!==e?e:0,x=null!==(t=(0,h.v9)((0,I.Z)(["api","list",g.DB,"page"])))&&void 0!==t?t:1,Z=null!==(n=(0,h.v9)((0,I.Z)(["api","list",g.DB,"limit"])))&&void 0!==n?n:20,j=(0,h.v9)((0,I.Z)(["api","list",g.DB,"data"])),b=r.useMemo((function(){return["api","list",g.DB]}),[]),k=!(0,H.Z)(j)||f||m,D=r.useCallback((function(e,t){return(0,P.T)(g.DB,t)}),[]),C=r.useCallback((function(e){return(0,S.I)(g.DB,e)}),[]),y=r.useCallback((function(e){return(0,_.a)(g.DB,"id",e)}),[]),J=r.useCallback((function(e){return(0,_.a)(g.DB,"createdAt",e)}),[]),X=r.useCallback((function(e){return function(t){return(0,A.Y)(g.DB,e)}}),[]),G=r.useCallback((function(e){return function(t){return(0,T.d)(g.DB,e)}}),[]),$=r.useCallback((function(e){return(0,O.V)(g.DB,e)}),[]),ee=r.useCallback((function(e){return(0,E.A)(g.DB,e)}),[]),te=r.useCallback((function(){return(0,N.D)(g.DB)}),[]),ne=r.useCallback((function(){return(0,F.P)(g.DB,"loader",!0)()}),[]),re=r.useCallback((function(e){return function(t){return(0,V.n)(e,t.target)()}}),[]);return r.useEffect((function(){f||(0,B.i)(g.DB,{page:x,limit:Z,query:u,select:l,filter:c,sort:d})()}),[f,x,Z,u,l,c,d]),r.useEffect((function(){return function(){return(0,w.K)(g.DB)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsxs)(U.Z,{bulkDeletion:!0,toolbarComponent:(0,p.jsx)(K.Z,{to:g.XB}),storePath:b,loader:k,length:null!==(a=(j||[]).length)&&void 0!==a?a:0,onBulk:ee,onDrop:te,onLoader:ne,children:[(0,p.jsx)(q.Z,{onInput:ne}),(0,p.jsx)(Q.Z,{onInput:ne}),(0,p.jsx)(Y.Z,{onInput:ne})]}),!k&&(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(L.Z,{bulkDeletion:!0,withChangeLimit:!0,loader:m,total:v,page:x,limit:Z,length:null!==(o=(j||[]).length)&&void 0!==o?o:0,onChange:D,onLimit:C,headRowCells:[(0,p.jsx)(M.Z,{name:"id",onChange:y,children:(0,p.jsx)(R.Z,{component:"div",variant:"caption",color:"textSecondary",children:"ID"})},"id"),(0,p.jsx)(W.Z,{children:(0,p.jsx)(R.Z,{component:"div",variant:"caption",color:"textSecondary",children:"File"})},"fileId"),(0,p.jsx)(W.Z,{children:(0,p.jsx)(R.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Status"})},"reportStatusId"),(0,p.jsx)(W.Z,{children:(0,p.jsx)(R.Z,{component:"div",variant:"caption",color:"textSecondary",children:"User"})},"userId"),(0,p.jsx)(M.Z,{name:"createdAt",onChange:J,children:(0,p.jsx)(R.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Story"})},"createdAt")],children:(0,H.Z)(j)&&j.map((function(e){return(0,p.jsx)(le,{bulkDeletion:!0,id:e.id,fileId:e.fileId,reportStatusId:e.reportStatusId,userId:e.userId,createdAt:e.createdAt,updatedAt:e.updatedAt,isDeleted:e.isDeleted,isNotDelete:e.isNotDelete,onDrop:X(e.id),onRestore:G(e.id),onMenu:re(e.id),onCheck:$(e.id),storePath:b},e.id)}))})})]})};(ce=r.memo(ce)).defaultProps={};var de=ce,fe=n(8185),pe=n(148),me=function(){(0,pe.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/report",text:"Reports"}])()},ve=function(){return r.useEffect((function(){return me()}),[]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{pb:2,children:(0,p.jsx)(fe.Z,{children:"Report list"})})})};(ve=r.memo(ve)).defaultProps={};var xe=ve,Ze=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(xe,{}),(0,p.jsx)(de,{}),(0,p.jsx)(y,{})]})};(Ze=r.memo(Ze)).defaultProps={};var he=Ze,je=n(7235),ge=n(9154),Ie=n(2399),be=n(996),ke=n(3979),De=n(3990),Ce=n(2735),ye=n(6369),we=n(4598),Fe=n(9465),Be=n(5987),Pe=n(2619),Se=n(5476),_e=["storeFormName"],Ae=function(e){var t=e.storeFormName,n=(0,Be.Z)(e,_e),i=(0,h.v9)((0,I.Z)(["api","form",t,"fileId"]))||"",s=r.useCallback((function(e){return(0,Pe.F)(t,"fileId",e.target.value)()}),[t]);return(0,p.jsx)(r.Fragment,{children:i&&(0,p.jsx)(a.Z,{py:2,children:(0,p.jsx)(Se.default,(0,o.Z)({name:"fileId",label:"File",value:i,onChange:s},n))})})};(Ae=r.memo(Ae)).defaultProps={};var Te=Ae,Ee=n(7232),Ne=n(2123),Oe=["children"],Ve=function(e){e.children;var t,n,i,a=(0,Be.Z)(e,Oe),s=(0,h.v9)((0,I.Z)(["loader","unmount","visible"])),u=(0,h.v9)((0,I.Z)(["api","list",g.I6,"loader"])),l=null!==(t=(0,h.v9)((0,I.Z)(["api","list",g.I6,"total"])))&&void 0!==t?t:0,c=null!==(n=(0,h.v9)((0,I.Z)(["api","list",g.I6,"page"])))&&void 0!==n?n:1,d=null!==(i=(0,h.v9)((0,I.Z)(["api","list",g.I6,"limit"])))&&void 0!==i?i:20,f=(0,h.v9)((0,I.Z)(["api","list",g.I6,"query"])),m=(0,h.v9)((0,I.Z)(["api","list",g.I6,"data"])),v=!(0,H.Z)(m)||u||s,x=r.useCallback((function(e,t){return(0,P.T)(g.I6,t)}),[]),Z=r.useCallback((function(e){return(0,S.I)(g.I6,e)}),[]),j=r.useCallback((function(){}),[]);return r.useEffect((function(){s||(0,B.i)(g.I6,{page:c,limit:d,query:f})()}),[s,c,d,f]),r.useEffect((function(){return function(){return(0,w.K)(g.I6)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(Ne.Z,{visible:v}),!v&&(0,p.jsx)(Ee.Z,(0,o.Z)((0,o.Z)({},a),{},{total:l,page:c,limit:d,onChangePage:x,onLimit:Z,onSearch:j,children:m}))]})};(Ve=r.memo(Ve)).defaultProps={name:"reportStatusId",multiple:!1,onChange:function(){}};var ze=Ve,He=["storeFormName"],Re=function(e){var t=e.storeFormName,n=(0,Be.Z)(e,He),i=(0,h.v9)((0,I.Z)(["api","form",t,"loader"])),s=(0,h.v9)((0,I.Z)(["api","form",t,"reportStatusId"]))||"",u=(0,h.v9)((0,I.Z)(["api","form",t,"errors","reportStatusId"])),l=r.useCallback((function(e){return(0,Pe.F)(t,"reportStatusId",e.target.value)()}),[t]);return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{py:2,maxWidth:"240px",children:(0,p.jsx)(ze,(0,o.Z)({disabled:i,name:"reportStatusId",label:"Report status",value:s,onChange:l,error:u},n))})})};(Re=r.memo(Re)).defaultProps={storeFormName:g.I6};var We=Re,Le=n(4165),Me=n(5861),qe=n(5078),Qe=n(5312),Ue=n(2674),Ke=n(175),Ye=function(){var e=(0,Me.Z)((0,Le.Z)().mark((function e(t,n){var r,i,a,o,s;return(0,Le.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,(0,Pe.F)(g.DB,"loader",!0)();case 3:if(r=(((0,qe.Z)().getState().api||{}).form||{})[g.DB]||{},i=r.id,a=r.fileId,o=r.reportStatusId,s={},i&&!(0,Ke.Z)(i)&&(s.id="The value is in the wrong format."),a&&!(0,Ke.Z)(a)&&(s.fileId="The value is in the wrong format."),o&&!(0,Ke.Z)(o)&&(s.reportStatusId="The value is in the wrong format."),!(Object.keys(s).length>0)){e.next=15;break}return e.next=11,(0,Pe.F)(g.DB,"errors",s)();case 11:return e.next=13,(0,Pe.F)(g.DB,"loader",!1)();case 13:e.next=16;break;case 15:(0,ke.Z)(n)?(0,Ue.L)(g.DB,n)():(0,Qe.Y)(g.DB)();case 16:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Je=Ye,Xe=function(){var e=(0,i.UO)().entityId,t=(0,h.v9)((0,I.Z)(["loader","unmount","visible"])),n=(0,h.v9)((0,I.Z)(["api","form",g.DB,"loader"])),a=(0,h.v9)((0,I.Z)(["api","form",g.DB],(function(e){return Object.keys(e||{}).length}))),o=(0,h.v9)((0,I.Z)(["api","form",g.DB,"contentId"])),s=(0,h.v9)((0,I.Z)(["api","form",g.DB,"isNotDelete"])),u=(0,h.v9)((0,I.Z)(["api","form",g.DB,"isDeleted"])),l=r.useCallback((function(t){return Je(t,e)}),[e]),c=r.useCallback((function(t){return(0,Ie.n)(g.DB,{entityId:e})()}),[e]),d=r.useCallback((function(t){return(0,Ie.n)(be.m5,{entityId:e})()}),[e]);return r.useEffect((function(){t||(0,je.y)(g.DB,e)()}),[t,e]),r.useEffect((function(){return function(){return(0,ge.z)(g.DB)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsxs)(De.Z,{onSubmit:l,onDrop:c,loader:n||(0,ke.Z)(e)&&a<6,isDeleted:u,isNotDelete:s,showDropButton:!s&&(0,ke.Z)(e),children:[(0,p.jsx)(Fe.Z,{storeFormName:g.DB}),(0,p.jsx)(Te,{storeFormName:g.DB,label:"CV file"}),(0,p.jsx)(We,{storeFormName:g.DB}),(0,ke.Z)(e)&&(0,p.jsx)(Ce.Z,{contentId:o,onAdd:d})]}),(0,p.jsx)(ye.Z,{contentId:o}),(0,p.jsx)(we.Z,{})]})};(Xe=r.memo(Xe)).defaultProps={};var Ge=Xe,$e=function(e,t){(0,pe.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/report",text:"Reports"},{key:"/cv/report/".concat(e),text:"0"===e?"Create new report":(0,p.jsx)("span",{style:{textDecoration:t?"line-through":"initial"},children:e})}])()},et=function(){var e=(0,i.UO)().entityId,t=(0,h.v9)((0,I.Z)(["api","form",g.DB,"isDeleted"]));return r.useEffect((function(){return $e(e,t)}),[e,t]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{pb:2,children:(0,p.jsx)(fe.Z,{entityId:e,isDeleted:t,defaultContent:"Create new report",children:"Edit report"})})})};(et=r.memo(et)).defaultProps={};var tt=et,nt=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(tt,{}),(0,p.jsx)(y,{}),(0,p.jsx)(Ge,{})]})};(nt=r.memo(nt)).defaultProps={};var rt=nt,it=n(2481),at=function(){var e=(0,h.v9)((0,I.Z)(["dialog",g.I6,"entityId"])),t=(0,h.v9)((0,I.Z)(["api","form",g.I6,"loader"])),n=(0,h.v9)((0,I.Z)(["api","list",g.I6,"loader"])),i=r.useCallback((function(t){return(0,j.R)(g.I6,e)()}),[e]);return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(it.Z,{loader:!0===t||!0===n,maxWidth:"xs",id:g.I6,onHandle:i})})};(at=r.memo(at)).defaultProps={};var ot=at,st=n(6236),ut=n(461),lt=function(){var e,t,n,a,o=(0,i.TH)().search,s=(0,z.Z)("query",o),u=(0,z.Z)("select",o),l=(0,z.Z)("filter",o),c=(0,z.Z)("sort",o),d=(0,h.v9)((0,I.Z)(["loader","unmount","visible"])),f=(0,h.v9)((0,I.Z)(["api","list",g.I6,"loader"])),m=null!==(e=(0,h.v9)((0,I.Z)(["api","list",g.I6,"total"])))&&void 0!==e?e:0,v=null!==(t=(0,h.v9)((0,I.Z)(["api","list",g.I6,"page"])))&&void 0!==t?t:1,x=null!==(n=(0,h.v9)((0,I.Z)(["api","list",g.I6,"limit"])))&&void 0!==n?n:20,Z=(0,h.v9)((0,I.Z)(["api","list",g.I6,"data"])),j=r.useMemo((function(){return["api","list",g.I6]}),[]),b=!(0,H.Z)(Z)||d||f,k=r.useCallback((function(e,t){return(0,P.T)(g.I6,t)}),[]),D=r.useCallback((function(e){return(0,S.I)(g.I6,e)}),[]),C=r.useCallback((function(e){return(0,_.a)(g.I6,"id",e)}),[]),y=r.useCallback((function(e){return(0,_.a)(g.I6,"createdAt",e)}),[]),R=r.useCallback((function(e){return function(t){return(0,A.Y)(g.I6,e)}}),[]),W=r.useCallback((function(e){return function(t){return(0,T.d)(g.I6,e)}}),[]),L=r.useCallback((function(e){return(0,O.V)(g.I6,e)}),[]),M=r.useCallback((function(e){return(0,E.A)(g.I6,e)}),[]),Y=r.useCallback((function(){return(0,N.D)(g.I6)}),[]),J=r.useCallback((function(){return(0,F.P)(g.I6,"loader",!0)()}),[]),X=r.useCallback((function(e){return function(t){return(0,V.n)(e,t.target)()}}),[]);return r.useEffect((function(){d||(0,B.i)(g.I6,{page:v,limit:x,query:s,select:u,filter:l,sort:c})()}),[d,v,x,s,u,l,c]),r.useEffect((function(){return function(){return(0,w.K)(g.I6)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsxs)(U.Z,{bulkDeletion:!0,toolbarComponent:(0,p.jsx)(K.Z,{to:g.mJ}),storePath:j,loader:b,length:null!==(a=(Z||[]).length)&&void 0!==a?a:0,onBulk:M,onDrop:Y,onLoader:J,children:[(0,p.jsx)(q.Z,{onInput:J}),(0,p.jsx)(Q.Z,{onInput:J})]}),(0,p.jsx)(st.Z,{bulkDeletion:!0,loader:b,total:m,page:v,limit:x,onChangePage:k,onLimit:D,onSortId:C,onSortCreatedAt:y,children:(0,H.Z)(Z)&&Z.map((function(e){return(0,p.jsx)(ut.Z,{bulkDeletion:!0,id:e.id,to:"/cv/report/statuses/".concat(e.id),name:e.name,description:e.description,createdAt:e.createdAt,updatedAt:e.updatedAt,isDeleted:e.isDeleted,isNotDelete:e.isNotDelete,onDrop:R(e.id),onRestore:W(e.id),onMenu:X(e.id),onCheck:L(e.id),storePath:j},e.id)}))})]})};(lt=r.memo(lt)).defaultProps={};var ct=lt,dt=n(795),ft=function(){(0,pe.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/report",text:"Reports"},{key:"/cv/report/statuses",text:"Statuses"}])()},pt=function(){return r.useEffect((function(){return ft()}),[]),(0,p.jsx)(r.Fragment,{children:(0,p.jsxs)(a.Z,{pb:2,children:[(0,p.jsx)(fe.Z,{children:"Statuses"}),(0,p.jsx)(dt.Z,{children:"Statuses"})]})})};(pt=r.memo(pt)).defaultProps={};var mt=pt,vt=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(mt,{}),(0,p.jsx)(ct,{}),(0,p.jsx)(ot,{})]})};(vt=r.memo(vt)).defaultProps={};var xt=vt,Zt=n(2111),ht=n(7514),jt=n(2394),gt=n(6749),It=n(934),bt=n(2069),kt=n(4327),Dt=function(){var e=(0,Me.Z)((0,Le.Z)().mark((function e(t,n){var r,i,a,o,s,u;return(0,Le.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,(0,Pe.F)(g.I6,"loader",!0)();case 3:if(r=(((0,qe.Z)().getState().api||{}).form||{})[g.I6]||{},i=r.id,a=r.name,o=r.description,s=r.isNotDelete,u={},i&&!(0,Ke.Z)(i)&&(u.id="The value is in the wrong format."),!(0,bt.Z)(a)&&(u.name="The value is in the wrong format."),o&&!(0,kt.Z)(o)&&(u.description="The value is in the wrong format."),(0,It.Z)(s)&&!(0,gt.Z)(s)&&(u.isNotDelete="The value is in the wrong format."),!(Object.keys(u).length>0)){e.next=16;break}return e.next=12,(0,Pe.F)(g.I6,"errors",u)();case 12:return e.next=14,(0,Pe.F)(g.I6,"loader",!1)();case 14:e.next=17;break;case 16:(0,ke.Z)(n)?(0,Ue.L)(g.I6,n)():(0,Qe.Y)(g.I6)();case 17:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ct=Dt,yt=function(){var e=(0,i.UO)().entityId,t=(0,h.v9)((0,I.Z)(["loader","unmount","visible"])),n=(0,h.v9)((0,I.Z)(["api","form",g.I6,"loader"])),a=(0,h.v9)((0,I.Z)(["api","form",g.I6],(function(e){return Object.keys(e||{}).length}))),o=(0,h.v9)((0,I.Z)(["api","form",g.I6,"isNotDelete"])),s=(0,h.v9)((0,I.Z)(["api","form",g.I6,"isDeleted"])),u=r.useCallback((function(t){return Ct(t,e)}),[e]),l=r.useCallback((function(t){return(0,Ie.n)(g.I6,{entityId:e})()}),[e]);return r.useEffect((function(){t||(0,je.y)(g.I6,e)()}),[t,e]),r.useEffect((function(){return function(){return(0,ge.z)(g.I6)()}}),[]),(0,p.jsx)(r.Fragment,{children:(0,p.jsxs)(De.Z,{onSubmit:u,onDrop:l,loader:n||(0,ke.Z)(e)&&a<6,isDeleted:s,isNotDelete:o,showDropButton:!o&&(0,ke.Z)(e),children:[(0,p.jsx)(Fe.Z,{storeFormName:g.I6}),(0,p.jsx)(Zt.Z,{storeFormName:g.I6}),(0,p.jsx)(ht.Z,{storeFormName:g.I6}),(0,p.jsx)(jt.Z,{storeFormName:g.I6})]})})};(yt=r.memo(yt)).defaultProps={};var wt=yt,Ft=function(e,t){(0,pe.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/report",text:"Reports"},{key:"/cv/report/statuses",text:"Statuses"},{key:"/cv/report/statuses/".concat(e),text:"0"===e?"Create new status":(0,p.jsx)("span",{style:{textDecoration:t?"line-through":"initial"},children:e})}])()},Bt=function(){var e=(0,i.UO)().entityId,t=(0,h.v9)((0,I.Z)(["api","form",g.I6,"isDeleted"]));return r.useEffect((function(){return Ft(e,t)}),[e,t]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{pb:2,children:(0,p.jsx)(fe.Z,{entityId:e,isDeleted:t,defaultContent:"Add status",children:"Edit status"})})})};(Bt=r.memo(Bt)).defaultProps={};var Pt=Bt,St=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(Pt,{}),(0,p.jsx)(ot,{}),(0,p.jsx)(wt,{})]})};(St=r.memo(St)).defaultProps={};var _t=St,At=n(2426),Tt=function(){var e=(0,h.v9)((0,I.Z)(["dialog",g.w_,"entityId"])),t=(0,h.v9)((0,I.Z)(["api","form",g.w_,"loader"])),n=(0,h.v9)((0,I.Z)(["api","list",g.w_,"loader"])),i=r.useCallback((function(t){return(0,j.R)(g.w_,e)()}),[e]);return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(At.Z,{loader:!0===t||!0===n,maxWidth:"xs",id:g.w_,onHandle:i})})};(Tt=r.memo(Tt)).defaultProps={};var Et=Tt,Nt=n(2218),Ot=n(3417),Vt=function(){var e,t,n,a,o=(0,i.TH)().search,s=(0,z.Z)("query",o),u=(0,z.Z)("select",o),l=(0,z.Z)("filter",o),c=(0,z.Z)("sort",o),d=(0,h.v9)((0,I.Z)(["loader","unmount","visible"])),f=(0,h.v9)((0,I.Z)(["api","list",g.w_,"loader"])),m=null!==(e=(0,h.v9)((0,I.Z)(["api","list",g.w_,"total"])))&&void 0!==e?e:0,v=null!==(t=(0,h.v9)((0,I.Z)(["api","list",g.w_,"page"])))&&void 0!==t?t:1,x=null!==(n=(0,h.v9)((0,I.Z)(["api","list",g.w_,"limit"])))&&void 0!==n?n:20,Z=(0,h.v9)((0,I.Z)(["api","list",g.w_,"data"])),j=r.useMemo((function(){return["api","list",g.w_]}),[]),b=!(0,H.Z)(Z)||d||f,k=r.useCallback((function(e,t){return(0,P.T)(g.w_,t)}),[]),D=r.useCallback((function(e){return(0,S.I)(g.w_,e)}),[]),C=r.useCallback((function(e){return(0,_.a)(g.w_,"id",e)}),[]),y=r.useCallback((function(e){return(0,_.a)(g.w_,"createdAt",e)}),[]),R=r.useCallback((function(e){return function(t){return(0,A.Y)(g.w_,e)}}),[]),W=r.useCallback((function(e){return function(t){return(0,T.d)(g.w_,e)}}),[]),L=r.useCallback((function(e){return(0,O.V)(g.w_,e)}),[]),M=r.useCallback((function(e){return(0,E.A)(g.w_,e)}),[]),Y=r.useCallback((function(){return(0,N.D)(g.w_)}),[]),J=r.useCallback((function(){return(0,F.P)(g.w_,"loader",!0)()}),[]),X=r.useCallback((function(e){return function(t){return(0,V.n)(e,t.target)()}}),[]);return r.useEffect((function(){d||(0,B.i)(g.w_,{page:v,limit:x,query:s,select:u,filter:l,sort:c})()}),[d,v,x,s,u,l,c]),r.useEffect((function(){return function(){return(0,w.K)(g.w_)()}}),[]),(0,p.jsxs)(r.Fragment,{children:[(0,p.jsxs)(U.Z,{bulkDeletion:!0,toolbarComponent:(0,p.jsx)(K.Z,{to:g.rT}),storePath:j,loader:b,length:null!==(a=(Z||[]).length)&&void 0!==a?a:0,onBulk:M,onDrop:Y,onLoader:J,children:[(0,p.jsx)(q.Z,{onInput:J}),(0,p.jsx)(Q.Z,{onInput:J})]}),(0,p.jsx)(Nt.Z,{bulkDeletion:!0,loader:b,total:m,page:v,limit:x,onChangePage:k,onLimit:D,onSortId:C,onSortCreatedAt:y,children:(0,H.Z)(Z)&&Z.map((function(e){var t;return(0,p.jsx)(Ot.Z,{bulkDeletion:!0,id:e.id,to:"/cv/settings/".concat(e.id),name:e.name,description:e.description,dataTypeId:e.dataTypeId,value:null!==(t=e.value)&&void 0!==t?t:e.defaultValue,regex:e.regex,isRequired:e.isRequired,isDeleted:e.isDeleted,isNotDelete:e.isNotDelete,createdAt:e.createdAt,updatedAt:e.updatedAt,onDrop:R(e.id),onRestore:W(e.id),onMenu:X(e.id),onCheck:L(e.id),storePath:j},e.id)}))})]})};(Vt=r.memo(Vt)).defaultProps={};var zt=Vt,Ht=function(){(0,pe.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/settings",text:"Settings"}])()},Rt=function(){return r.useEffect((function(){return Ht()}),[]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{pt:1,pb:2,children:(0,p.jsx)(fe.Z,{children:"Settings list"})})})};(Rt=r.memo(Rt)).defaultProps={};var Wt=Rt,Lt=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(Wt,{}),(0,p.jsx)(zt,{}),(0,p.jsx)(Et,{})]})};(Lt=r.memo(Lt)).defaultProps={};var Mt=Lt,qt=n(7497),Qt=n(6586),Ut=n(6205),Kt=n(3588),Yt=n(7836),Jt=n(1403),Xt=function(){var e=(0,Me.Z)((0,Le.Z)().mark((function e(t,n){var r,i,a,o,s,u,l,c,d;return(0,Le.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,(0,Pe.F)(g.w_,"loader",!0)();case 3:if(r=(((0,qe.Z)().getState().api||{}).form||{})[g.w_]||{},i=r.id,a=r.name,o=r.description,s=r.dataTypeId,u=r.regex,l=r.isRequired,c=r.isNotDelete,d={},i&&!(0,Ke.Z)(i)&&(d.id="The value is in the wrong format."),!(0,bt.Z)(a)&&(d.name="The value is in the wrong format."),o&&!(0,kt.Z)(o)&&(d.description="The value is in the wrong format."),!(0,Jt.Z)(s)&&(d.dataTypeId="The value is in the wrong format."),u&&!(0,Yt.Z)(u)&&(d.regex="The value is in the wrong format."),(0,It.Z)(l)&&!(0,gt.Z)(l)&&(d.isRequired="The value is in the wrong format."),(0,It.Z)(c)&&!(0,gt.Z)(c)&&(d.isNotDelete="The value is in the wrong format."),!(Object.keys(d).length>0)){e.next=19;break}return e.next=15,(0,Pe.F)(g.w_,"errors",d)();case 15:return e.next=17,(0,Pe.F)(g.w_,"loader",!1)();case 17:e.next=20;break;case 19:(0,ke.Z)(n)?(0,Ue.L)(g.w_,n)():(0,Qe.Y)(g.w_)();case 20:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Gt=Xt,$t=function(){var e=(0,i.UO)().entityId,t=(0,h.v9)((0,I.Z)(["loader","unmount","visible"])),n=(0,h.v9)((0,I.Z)(["api","form",g.w_,"loader"])),a=(0,h.v9)((0,I.Z)(["api","form",g.w_],(function(e){return Object.keys(e||{}).length}))),o=(0,h.v9)((0,I.Z)(["api","form",g.w_,"isNotDelete"])),s=(0,h.v9)((0,I.Z)(["api","form",g.w_,"isDeleted"])),u=r.useCallback((function(t){return Gt(t,e)}),[e]),l=r.useCallback((function(t){return(0,Ie.n)(g.w_,{entityId:e})()}),[e]);return r.useEffect((function(){t||(0,je.y)(g.w_,e)()}),[t,e]),r.useEffect((function(){return function(){return(0,ge.z)(g.w_)()}}),[]),(0,p.jsx)(r.Fragment,{children:(0,p.jsxs)(De.Z,{onSubmit:u,onDrop:l,loader:n||(0,ke.Z)(e)&&a<6,isDeleted:s,isNotDelete:o,showDropButton:!o&&(0,ke.Z)(e),children:[(0,p.jsx)(Fe.Z,{storeFormName:g.w_}),(0,p.jsx)(Zt.Z,{storeFormName:g.w_}),(0,p.jsx)(ht.Z,{storeFormName:g.w_}),(0,p.jsx)(qt.Z,{storeFormName:g.w_}),(0,p.jsx)(Qt.Z,{storeFormName:g.w_}),(0,p.jsx)(Ut.Z,{storeFormName:g.w_}),(0,p.jsx)(Kt.Z,{storeFormName:g.w_}),(0,p.jsx)(jt.Z,{storeFormName:g.w_})]})})};($t=r.memo($t)).defaultProps={};var en=$t,tn=function(e,t){(0,pe.Q)("app",[{key:"/",text:"..."},{key:"cv",text:"CV"},{key:"/cv/settings",text:"Settings"},{key:"/cv/settings/".concat(e),text:"0"===e?"Create new setting":(0,p.jsx)("span",{style:{textDecoration:t?"line-through":"initial"},children:e})}])()},nn=function(){var e=(0,i.UO)().entityId,t=(0,h.v9)((0,I.Z)(["api","form",g.w_,"isDeleted"]));return r.useEffect((function(){return tn(e,t)}),[e,t]),(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(a.Z,{pt:1,pb:2,children:(0,p.jsx)(fe.Z,{entityId:e,isDeleted:t,defaultContent:"Add setting",children:"Edit setting"})})})};(nn=r.memo(nn)).defaultProps={};var rn=nn,an=function(){return(0,p.jsxs)(r.Fragment,{children:[(0,p.jsx)(rn,{}),(0,p.jsx)(Et,{}),(0,p.jsx)(en,{})]})};(an=r.memo(an)).defaultProps={};var on=an,sn=function(){return(0,p.jsx)(r.Fragment,{children:(0,p.jsx)(i.Z5,{children:(0,p.jsxs)(i.AW,{path:"",element:(0,p.jsx)(Z,{}),children:[(0,p.jsx)(i.AW,{index:!0,element:(0,p.jsx)(he,{})}),(0,p.jsx)(i.AW,{path:":entityId",element:(0,p.jsx)(rt,{})}),(0,p.jsx)(i.AW,{path:"report",element:(0,p.jsx)(he,{})}),(0,p.jsx)(i.AW,{path:"report/:entityId",element:(0,p.jsx)(rt,{})}),(0,p.jsx)(i.AW,{path:"report/statuses",element:(0,p.jsx)(xt,{})}),(0,p.jsx)(i.AW,{path:"report/statuses/:entityId",element:(0,p.jsx)(_t,{})}),(0,p.jsx)(i.AW,{path:"settings",element:(0,p.jsx)(Mt,{})}),(0,p.jsx)(i.AW,{path:"settings/:entityId",element:(0,p.jsx)(on,{})})]})})})};(sn=r.memo(sn)).defaultProps={};var un=sn},5476:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var r=n(885),i=n(5987),a=n(2791),o=n(6030),s=n(7235),u=n(9154),l=n(4924),c=n(708),d=n(7487),f=n(1091),p=n(9885),m=n(3536),v=n(184),x=["disabled","label","value","defaultValue"],Z=function(e){var t=e.disabled,n=e.label,Z=e.value,h=e.defaultValue,j=((0,i.Z)(e,x),a.useState((function(){return(0,d.Z)(Z)?Z:(0,d.Z)(h)?h:""}))),g=(0,r.Z)(j,1)[0],I=(0,o.v9)((0,c.Z)(["api","form","".concat(l.mu,"/").concat(g),"loader"])),b=(0,o.v9)((0,c.Z)(["api","form","".concat(l.mu,"/").concat(g),"systemId"])),k=(0,o.v9)((0,c.Z)(["api","form","".concat(l.mu,"/").concat(g),"path"])),D=(0,o.v9)((0,c.Z)(["api","form","".concat(l.mu,"/").concat(g),"size"]));return console.log("valueMemo",Z,h,g),a.useEffect((function(){g&&!b&&(0,s.y)((function(){return"".concat(l.mu,"/").concat(g)}),{entityId:g})()}),[g,b]),a.useEffect((function(){return function(){(0,u.z)("".concat(l.mu,"/").concat(g))()}}),[g]),(0,v.jsxs)(a.Fragment,{children:[(0,v.jsx)(f.Z,{disableElevation:!0,variant:"contained",color:"primary",disabled:t,startIcon:(0,v.jsx)(p.Z,{}),children:n}),(0,v.jsx)(m.Z,{loader:I||!b,path:k,size:D})]})};(Z=a.memo(Z)).defaultProps={label:"Select file",onChange:function(){}};var h=Z},4068:function(e,t,n){n.d(t,{Z:function(){return v}});var r=n(5987),i=n(2791),a=n(6030),o=n(7235),s=n(9154),u=n(789),l=n(4924),c=n(708),d=n(6475),f=n(184),p=["children"],m=function(e){var t=e.children,n=((0,r.Z)(e,p),(0,a.v9)((0,c.Z)(["loader","unmount","visible"]))),m=(0,a.v9)((0,c.Z)(["api","form","".concat(l.mu,"/").concat(t),"loader"])),v=(0,a.v9)((0,c.Z)(["api","form","".concat(l.mu,"/").concat(t),"name"])),x=(0,a.v9)((0,c.Z)(["api","form","".concat(l.mu,"/").concat(t),"path"])),Z=(0,a.v9)((0,c.Z)(["api","form","".concat(l.mu,"/").concat(t),"size"]));return i.useEffect((function(){n||(0,o.y)((function(){return"".concat(l.mu,"/").concat(t)}),{entityId:t,withLoop:!0})()}),[n,t]),i.useEffect((function(){return function(){(0,s.z)("".concat(l.mu,"/").concat(t))(),(0,u.B)("".concat(l.mu,"/").concat(t))}}),[t]),(0,f.jsx)(i.Fragment,{children:(0,f.jsx)(d.Z,{loader:m,name:v,path:x,size:Z})})};(m=i.memo(m)).defaultProps={};var v=m},6475:function(e,t,n){n.d(t,{Z:function(){return I}});var r=n(1413),i=n(2791),a=n(6030),o=n(708),s=n(7487),u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!(0,s.Z)(e))return!1;var t=e.split(".");return"png"===t[t.length-1]||"jpeg"===t[t.length-1]||"jpg"===t[t.length-1]||"svg"===t[t.length-1]||"gif"===t[t.length-1]||0===e.indexOf("data:image/png;base64")||0===e.indexOf("data:image/jpeg;base64")||0===e.indexOf("data:image/jpg;base64")||0===e.indexOf("data:image/svg;base64")||0===e.indexOf("data:image/png;base64")},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return u(e)},c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!(0,s.Z)(e))return!1;var t=e.split(".");return"pdf"===t[t.length-1]||0===e.indexOf("data:application/pdf;base64")},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!(0,s.Z)(e))return!1;var t=e.split(".");return"ejs"===t[t.length-1]||0===e.indexOf("data:application/octet-stream;base64")||0===e.indexOf("data:application/ejs;base64")},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return 0!==e.indexOf("https://")&&0!==e.indexOf("http://")||e.includes("https://files.cidiator.com")?"https://files.cidiator.com"+e+(t?"?accessToken=".concat(n||localStorage.getItem("".concat("https://dev.cidiator.com","_accessToken"))):""):e},p=n(6015),m=n(4565),v=n(9885),x=n(1814),Z=n(5070),h=n(1251),j=n(184),g=function(e){var t=e.loader,n=e.path,s=e.name,u=e.size,g=(0,a.v9)((0,o.Z)(["auth","accessToken"])),I=i.useMemo((function(){return l(n)}),[n]),b=i.useMemo((function(){return c(n)}),[n]),k=i.useMemo((function(){return d(n)}),[n]);return(0,j.jsxs)(i.Fragment,{children:[(0,j.jsx)(h.Z,{visible:t}),(0,j.jsx)(p.Z,{maxWidth:"240px",sx:(0,r.Z)((0,r.Z)({position:"relative",display:t?"none":"block"},I?{backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundImage:"url('".concat(f(n,!0,g),"')")}:{}),{},{"&:after":{content:'""',display:"block",paddingBottom:I?"100%":"0px"},"& > a":{display:"block",width:"100%","& > svg":{width:"100%",height:"100%"}}}),children:function(){switch(!0){case b:return(0,j.jsx)("a",{href:f(n,!0),target:"_blank",rel:"noreferrer",children:(0,j.jsx)(x.Z,{color:"primary"})});case k:return(0,j.jsx)("a",{href:f(n,!0),target:"_blank",rel:"noreferrer",children:(0,j.jsx)(Z.Z,{color:"primary"})});case!I:return(0,j.jsx)("a",{href:f(n,!0),target:"_blank",rel:"noreferrer",children:(0,j.jsx)(v.Z,{})});default:return(0,j.jsx)(i.Fragment,{})}}()}),(0,j.jsx)(m.Z,{component:"div",variant:"body2",sx:{wordWrap:"anywhere",paddingLeft:"6px",paddingTop:"2px"},children:(0,j.jsx)("b",{children:s?s.length>80?"".concat((s||"").substring(0,80),"..."):s:(n||"").length>80?"".concat((n||"").substring(0,80),"..."):n})}),"number"===typeof u&&(0,j.jsxs)(m.Z,{component:"div",variant:"caption",sx:{paddingLeft:"6px",paddingBottom:"2px"},children:["Size: ",u]})]})};(g=i.memo(g)).defaultProps={};var I=g},3536:function(e,t,n){var r=n(6475);t.Z=r.Z},9885:function(e,t,n){var r=n(4836);t.Z=void 0;var i=r(n(5649)),a=n(184),o=(0,i.default)((0,a.jsx)("path",{d:"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"}),"InsertDriveFile");t.Z=o},1814:function(e,t,n){var r=n(4836);t.Z=void 0;var i=r(n(5649)),a=n(184),o=(0,i.default)((0,a.jsx)("path",{d:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"}),"PictureAsPdf");t.Z=o},5070:function(e,t,n){var r=n(4836);t.Z=void 0;var i=r(n(5649)),a=n(184),o=(0,i.default)((0,a.jsx)("path",{d:"M21 5v6.5H9.33V5H21zm-6.33 14v-6.5H9.33V19h5.34zm1-6.5V19H21v-6.5h-5.33zM8.33 19V5H3v14h5.33z"}),"ViewQuilt");t.Z=o}}]);
//# sourceMappingURL=312.dd9e40eb.chunk.js.map