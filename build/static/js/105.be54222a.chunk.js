"use strict";(self.webpackChunkmain=self.webpackChunkmain||[]).push([[105],{2481:function(e,t,n){n.d(t,{Z:function(){return y}});var r=n(1413),i=n(4165),a=n(5861),s=n(5987),o=n(2791),l=n(6030),c=n(393),d=n(7054),u=n(3960),h=n(708),x=n(9571),p=n(1091),Z=n(872),m=n(9923),f=n(184),j=["id","storeName","withAccessToken","url","path"],v=function(e){var t=e.id,n=e.storeName,v=e.withAccessToken,y=e.url,g=e.path,b=(0,s.Z)(e,j),k=(0,c.Ds)().enqueueSnackbar,w=(0,l.v9)((0,h.Z)(["dialog",t,"entityId"])),A=(0,l.v9)((0,h.Z)(["api","form",n,"loader"])),C=(0,l.v9)((0,h.Z)(["api","list",n,"loader"])),D=o.useCallback(function(){var e=(0,a.Z)((0,i.Z)().mark((function e(r){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.R)({entityId:w,storeName:n,withAccessToken:v,url:y,path:g})(k);case 2:return e.next=4,(0,u.Q)(t)();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[t,n,v,y,g,w,k]),I=!0===A||!0===C;return(0,f.jsx)(o.Fragment,{children:(0,f.jsx)(m.Z,(0,r.Z)((0,r.Z)({},b),{},{loader:I,maxWidth:"xs",id:t,title:"Delete status?",actions:(0,f.jsx)(o.Fragment,{children:(0,f.jsx)(p.Z,{disabled:I,disableElevation:!0,variant:"contained",startIcon:(0,f.jsx)(Z.Z,{}),onClick:D,children:"OK"})}),children:(0,f.jsx)(x.Z,{children:"Are you sure you want to delete the current status? This operation is irreversible and may compromise data integrity."})}))})};(v=o.memo(v)).defaultProps={id:"statusDrop"};var y=v},2830:function(e,t,n){n.d(t,{Z:function(){return g}});var r=n(1413),i=n(885),a=n(2791),s=n(7689),o=n(2772),l=n(6601),c=n(6015),d=n(5953),u=n(1091),h=n(4565),x=n(9823),p=n(2885),Z=n(1131),m=n(6192),f=n(1419),j=n(4096),v=n(184),y=function(e){var t=e.storeName,n=(0,s.s0)(),y=(0,s.TH)(),g=a.useState((function(){return!1})),b=(0,i.Z)(g,2),k=b[0],w=b[1],A=a.useMemo((function(){return(0,l.Z)("filter",y.search,!0)}),[y]),C=a.useMemo((function(){return(0,l.Z)("query",window.location.search)}),[]),D=a.useCallback((function(e){if(e!==((0,l.Z)("query",window.location.search)||"")){(0,o.P)(t,"loader",!0)();var r="",i=(0,l.Z)("sort",window.location.search,!0);e.length>0&&(r="?query=".concat(e)),i&&"object"===typeof i&&Object.keys(i).length>0&&(r+=r?"&sort=".concat(JSON.stringify(i)):"?sort=".concat(JSON.stringify(i))),n(r)}}),[n,t]),I=a.useCallback((function(e){w((function(e){return!e}))}),[w]),N=a.useCallback((function(e){(0,o.P)(t,"loader",!0)();var r="",i=(0,l.Z)("query",window.location.search)||"",a=(0,l.Z)("sort",window.location.search,!0);i.length>0&&(r="?query=".concat(i)),a&&"object"===typeof a&&Object.keys(a).length>0&&(r+=r?"&sort=".concat(JSON.stringify(a)):"?sort=".concat(JSON.stringify(a))),n(r)}),[n,t]);return(0,v.jsxs)(a.Fragment,{children:[(0,v.jsx)(m.Z,{onSearch:D,defaultValue:C}),(0,v.jsxs)(d.ZP,{container:!0,spacing:3,alignItems:"center",justifyContent:"flex-end",sx:{paddingTop:"24px"},children:[k&&"object"===typeof A&&Object.keys(A).length>0?(0,v.jsx)(d.ZP,{item:!0,xs:!1,children:(0,v.jsx)(u.Z,{disableElevation:!0,color:"error",startIcon:(0,v.jsx)(x.Z,{}),onClick:N,children:"Clear"})}):(0,v.jsx)(a.Fragment,{}),(0,v.jsx)(d.ZP,{item:!0,xs:!1,children:(0,v.jsxs)(u.Z,{disableElevation:!0,color:"primary",onClick:I,startIcon:(0,v.jsxs)(a.Fragment,{children:[(0,v.jsx)(p.Z,{sx:{display:k?"block":"none"}}),(0,v.jsx)(Z.Z,{sx:{display:k?"none":"block"}})]}),children:[(0,v.jsx)(h.Z,{sx:{display:k?"block":"none"},children:"Collapse"}),(0,v.jsx)(h.Z,{sx:{display:k?"none":"block"},children:"Filters"})]})})]}),(0,v.jsx)(c.Z,{pb:k?2:0,sx:(0,r.Z)({position:"relative",overflow:"hidden"},k?{height:"initial",opacity:"1"}:{height:"0px",opacity:"0.01"}),children:(0,v.jsxs)(d.ZP,{container:!0,spacing:3,children:[(0,v.jsx)(d.ZP,{item:!0,xs:12,sm:6,md:4,lg:3,xl:2,children:(0,v.jsx)(f.Z,{storeName:t})}),(0,v.jsx)(d.ZP,{item:!0,xs:12,sm:6,md:4,lg:3,xl:2,children:(0,v.jsx)(j.Z,{storeName:t})})]})})]})};(y=a.memo(y)).defaultProps={};var g=y},2714:function(e,t,n){n.d(t,{Z:function(){return T}});var r=n(2791),i=n(6030),a=n(7689),s=n(393),o=n(2619),l=n(5308),c=n(9154),d=n(2399),u=n(708),h=n(6015),x=n(5953),p=n(1091),Z=n(3329),m=n(7247),f=n(9698),j=n(43),v=n(1251),y=n(4165),g=n(5861),b=n(4047),k=n(2674),w=n(775),A=n(3158),C=n(4188),D=n(7064),I=function(){var e=(0,g.Z)((0,y.Z)().mark((function e(t){var n,r,i,a,s,l,c,d,u,h,x,p,Z,m;return(0,y.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.entityId,r=t.url,i=t.path,a=t.withAccessToken,s=void 0!==a&&a,l=t.enqueueSnackbar,c=t.navigate,e.prev=1,e.next=4,(0,o.F)(n,"loader",!0)();case 4:if(d=(0,w.Z)().getState().api.form[n],u=d.id,h=d.name,x=d.description,p=d.isNotDelete,Z={},(0,A.Z)(u,!0)||(Z.id="\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043e \u0432 \u043d\u0435\u0432\u0435\u0440\u043d\u043e\u043c \u0444\u043e\u0440\u043c\u0430\u0442\u0435."),(0,A.Z)(h)?(0,C.Z)(h)||(Z.name="\u041d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c."):Z.name="\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043e \u0432 \u043d\u0435\u0432\u0435\u0440\u043d\u043e\u043c \u0444\u043e\u0440\u043c\u0430\u0442\u0435.",(0,A.Z)(x,!0)||(Z.description="\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043e \u0432 \u043d\u0435\u0432\u0435\u0440\u043d\u043e\u043c \u0444\u043e\u0440\u043c\u0430\u0442\u0435."),(0,D.Z)(p,!0)||(Z.isNotDelete="\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043e \u0432 \u043d\u0435\u0432\u0435\u0440\u043d\u043e\u043c \u0444\u043e\u0440\u043c\u0430\u0442\u0435."),!(Object.keys(Z).length>0)){e.next=16;break}return e.next=13,(0,o.F)(n,"errors",Z)();case 13:return e.next=15,(0,o.F)(n,"loader",!1)();case 15:throw new Error("\u041f\u0440\u043e\u0432\u0435\u0440\u0442\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u0444\u043e\u0440\u043c\u044b.");case 16:"0"===n?(0,b.Y)({entityId:n,url:r,path:i,withAccessToken:s})(l,c):(0,k.L)({entityId:n,url:r,path:i,withAccessToken:s})(l),e.next=23;break;case 19:e.prev=19,e.t0=e.catch(1),m=e.t0.response&&e.t0.response.data?e.t0.response.data.message||(e.t0.response.data.error?e.t0.response.data.error.text:e.t0.message):e.t0.message,l(m,{variant:"error"});case 23:case"end":return e.stop()}}),e,null,[[1,19]])})));return function(t){return e.apply(this,arguments)}}(),N=I,F=n(184),S=function(e){var t=e.withAccessToken,n=e.url,y=e.path,g=(0,s.Ds)().enqueueSnackbar,b=(0,a.UO)().entityId,k=(0,a.s0)(),w=(0,i.v9)((0,u.Z)(["api","form",b,"loader"])),A=(0,i.v9)((0,u.Z)(["api","form",b,"id"])),C=(0,i.v9)((0,u.Z)(["api","form",b,"name"])),D=(0,i.v9)((0,u.Z)(["api","form",b,"description"])),I=(0,i.v9)((0,u.Z)(["api","form",b,"isNotDelete"])),S=(0,i.v9)((0,u.Z)(["api","form",b,"isDeleted"])),T=(0,i.v9)((0,u.Z)(["api","form",b,"errors","id"])),P=(0,i.v9)((0,u.Z)(["api","form",b,"errors","name"])),q=(0,i.v9)((0,u.Z)(["api","form",b,"errors","description"])),E=(0,i.v9)((0,u.Z)(["api","form",b,"errors","isNotDelete"])),O=r.useCallback((function(e){e.preventDefault(),N({entityId:b,url:n,path:y,withAccessToken:t,enqueueSnackbar:g,navigate:k})}),[n,y,t,b,g,k]),M=r.useCallback((function(e){(0,o.F)(b,"id",e.target.value)()}),[b]),U=r.useCallback((function(e){(0,o.F)(b,"name",e.target.value)()}),[b]),H=r.useCallback((function(e){(0,o.F)(b,"description",e.target.value)()}),[b]),J=r.useCallback((function(e,t){(0,o.F)(b,"isNotDelete",t)()}),[b]),L=r.useCallback((function(e){(0,d.n)("statusDrop",{entityId:b})()}),[b]);return r.useEffect((function(){b&&"0"!==b&&n&&(0,l.y)({entityId:b,url:n,path:y,withAccessToken:t})(g,k)}),[n,y,t,b,g,k]),r.useEffect((function(){return function(){(0,c.z)(b)()}}),[b]),(0,F.jsxs)(r.Fragment,{children:[(0,F.jsx)(v.Z,{visible:"undefined"===typeof w}),(0,F.jsxs)("form",{onSubmit:O,style:{display:"undefined"===typeof w?"none":"initial"},children:[(0,F.jsx)(h.Z,{py:2,children:(0,F.jsx)(f.default,{disabled:w,name:"id",label:"id",helperText:"Unique identificator",placeholder:"For example: test-entity-id",value:A||"",onChange:M,error:T})}),(0,F.jsx)(h.Z,{py:2,children:(0,F.jsx)(f.default,{disabled:w,required:!0,name:"name",label:"Name",placeholder:"For example: Test status",value:C||"",onChange:U,error:P})}),(0,F.jsx)(h.Z,{py:2,children:(0,F.jsx)(f.default,{disabled:w,multiline:!0,rows:3,name:"description",label:"Description",value:D||"",onChange:H,error:q})}),(0,F.jsx)(h.Z,{py:2,children:(0,F.jsx)(j.default,{disabled:w,name:"isNotDelete",label:"Make entry undeletable",value:!!I,onChange:J,error:E})}),(0,F.jsxs)(x.ZP,{container:!0,spacing:3,alignItems:"center",justifyContent:"flex-end",children:[(0,F.jsx)(x.ZP,{item:!0,xs:!1,children:(0,F.jsx)(p.Z,{disableElevation:!0,disabled:w,type:"submit",variant:"contained",color:"secondary",startIcon:w?(0,F.jsx)(v.Z,{visible:!0,wrapper:{sx:{padding:"0px"}},sx:{minWidth:"24px",maxWidth:"24px",minHeight:"24px",maxHeight:"24px"}}):(0,F.jsx)(Z.Z,{}),children:"Save"})}),!I&&b&&"string"===typeof b&&"0"!==b?(0,F.jsx)(x.ZP,{item:!0,xs:!1,children:(0,F.jsx)(p.Z,{disableElevation:!0,disabled:w,variant:"contained",color:"error",startIcon:(0,F.jsx)(m.Z,{}),onClick:L,children:S?"Delete permanently":"Delete"})}):(0,F.jsx)(r.Fragment,{})]})]})]})};(S=r.memo(S)).defaultProps={};var T=S},6376:function(e,t,n){n.d(t,{Z:function(){return x}});var r=n(1413),i=n(2982),a=n(885),s=n(5987),o=n(2791),l=n(5702),c=n(7232),d=n(184),u=["name","children","value","defaultValue","onChange"],h=function(e){var t=e.name,n=e.children,h=e.value,x=e.defaultValue,p=e.onChange,Z=(0,s.Z)(e,u),m=o.useState((function(){return Array.isArray(h)?h:Array.isArray(x)?x:[]})),f=(0,a.Z)(m,2),j=f[0],v=f[1],y=(h||[]).length,g=(j||[]).length,b=o.useCallback((function(e,t){v((function(n){var r=(n=Array.isArray(n)?n:[]).findIndex((function(e){return e.value===t.props.value}));return r>=0?n.splice(r,1):n.push({value:t.props.value,text:t.props.children}),p(e,(0,i.Z)(n)),n}))}),[v,p]);return o.useEffect((function(){Array.isArray(h)&&y!==g&&Array.isArray(n)&&n.length>0&&v(h)}),[h,y,g,n]),(0,d.jsx)(o.Fragment,{children:(0,d.jsx)(c.Z,(0,r.Z)((0,r.Z)((0,r.Z)({multiple:!0,size:"small",onChange:b,name:t,renderValue:function(){return j.map((function(e,t){return(0,d.jsxs)(o.Fragment,{children:[e.text,j.length-1>t?",":""]},e.value)}))},shrink:j.length>0},h?{value:j}:x?{defaultValue:j}:{defaultValue:[]}),Z),{},{children:n&&Array.isArray(n)?n.map((function(e,t){var n=j.findIndex((function(t){return t.value===e.id}));return(0,d.jsx)(l.Z,{value:e.id,sx:{backgroundColor:n>=0?"#EFEFEF":"inherit"},children:e.name},e.id)})):[]}))})};(h=o.memo(h)).defaultProps={onChange:function(){}};var x=h},4754:function(e,t,n){n.d(t,{Z:function(){return z}});var r=n(1413),i=n(885),a=n(2791),s=n(6030),o=n(393),l=n(4307),c=n(2772),d=n(2606),u=n(2399),h=n(708),x=n(6015),p=n(9827),Z=n(9773),m=n(807),f=n(4390),j=n(4565),v=n(1091),y=n(3811),g=n(2419),b=n(9823),k=n(1251),w=n(4486),A=n(5987),C=n(9923),D=n(184),I=["storeName","withAccessToken","url","path","relationId","entityId","children"],N=function(e){var t=e.storeName,n=(e.withAccessToken,e.url,e.path,e.relationId,e.entityId,e.children),i=(0,A.Z)(e,I),o=(0,s.v9)((0,h.Z)(["api","form",t,"loader"])),l=(0,s.v9)((0,h.Z)(["api","list",t,"loader"])),c=!0===o||!0===l;return(0,D.jsx)(a.Fragment,{children:(0,D.jsx)(C.Z,(0,r.Z)((0,r.Z)({},i),{},{loader:c,disableActions:!0,maxWidth:"xs",id:"".concat(t,"Item"),title:"Associate the current entity with another model?",children:n}))})};(N=a.memo(N)).defaultProps={};var F=N,S=n(4165),T=n(5861),P=n(9571),q=n(872),E=n(2982),O=n(7054),M=n(3960),U=n(775),H=function(){var e=(0,T.Z)((0,S.Z)().mark((function e(t){var n,r,i,a,s,o,l,d;return(0,S.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.enqueueSnackbar,r=t.storeName,i=t.withAccessToken,a=t.url,s=t.path,o=t.relationId,e.next=3,(0,O.R)({storeName:r,withAccessToken:i,url:a,path:s,entityId:o,allowInsecureDeletion:!0})(n);case 3:return e.next=5,(0,M.Q)("".concat(r,"Drop"))();case 5:if(l=(0,E.Z)(((0,U.Z)().getState().api.list[r]||{}).data||[]),!((d=l.findIndex((function(e){return e.id===o})))>-1)){e.next=11;break}return l.splice(d,1),e.next=11,(0,c.P)(r,"data",(0,E.Z)(l))();case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=H,L=["storeName","withAccessToken","url","path"],W=function(e){var t=e.storeName,n=e.withAccessToken,i=e.url,l=e.path,c=(0,A.Z)(e,L),d=(0,o.Ds)().enqueueSnackbar,u="".concat(t,"Drop"),x=(0,s.v9)((0,h.Z)(["api","form",t,"loader"])),p=(0,s.v9)((0,h.Z)(["api","list",t,"loader"])),Z=(0,s.v9)((0,h.Z)(["dialog",u,"relationId"])),m=a.useCallback(function(){var e=(0,T.Z)((0,S.Z)().mark((function e(r){return(0,S.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:J({enqueueSnackbar:d,storeName:t,withAccessToken:n,url:i,path:l,relationId:Z});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[t,n,i,l,Z,d]),f=!0===x||!0===p;return(0,D.jsx)(a.Fragment,{children:(0,D.jsx)(C.Z,(0,r.Z)((0,r.Z)({},c),{},{loader:f,maxWidth:"xs",id:u,title:"Delete relation?",actions:(0,D.jsx)(a.Fragment,{children:(0,D.jsx)(v.Z,{disabled:f,disableElevation:!0,variant:"contained",startIcon:(0,D.jsx)(q.Z,{}),onClick:m,children:"OK"})}),children:(0,D.jsx)(P.Z,{children:"Are you sure you want to delete the current relation? This operation is irreversible and may compromise data integrity."})}))})};(W=a.memo(W)).defaultProps={};var R=W,V=function(e){var t,n,A,C=e.withAccessToken,I=e.storeName,N=e.url,S=e.path,T=e.filterOptions,P=e.relationOptions,q=e.columns,E=e.title,O=e.description,M=e.children,U=(0,o.Ds)().enqueueSnackbar,H=a.useState((function(){return T})),J=(0,i.Z)(H,1)[0],L=a.useState((function(){return P})),W=(0,i.Z)(L,1)[0],V=(0,s.v9)((0,h.Z)(["loader","unmount","visible"])),z=(0,s.v9)((0,h.Z)(["api","list",I,"loader"])),Q=null!==(t=(0,s.v9)((0,h.Z)(["api","list",I,"total"])))&&void 0!==t?t:0,K=null!==(n=(0,s.v9)((0,h.Z)(["api","list",I,"page"])))&&void 0!==n?n:1,B=null!==(A=(0,s.v9)((0,h.Z)(["api","list",I,"limit"])))&&void 0!==A?A:20,Y=(0,s.v9)((0,h.Z)(["api","list",I,"data"])),G=a.useCallback((function(e,t){(0,c.P)(I,"loader",!0)(),(0,c.P)(I,"page",t)()}),[I]),X=a.useCallback((function(e){(0,c.P)(I,"loader",!0)(),(0,c.P)(I,"limit",e.target.value)()}),[I]),$=a.useMemo((function(){return"function"===typeof q?q():["id"]}),[q]),_=a.useCallback((function(e){(0,u.n)("".concat(I,"Item"),{relationId:"0"})()}),[I]),ee=a.useCallback((function(e){return function(t){(0,u.n)("".concat(I,"Drop"),{relationId:e})()}}),[I]);return a.useEffect((function(){if(!V){var e=W();(0,l.i)((0,r.Z)({id:I,url:N,path:S,withAccessToken:C,page:K,limit:B,filter:J()},Object.keys(e||{}).length>0?{relations:e}:{}))(U)}}),[I,C,N,S,J,W,V,K,B,U]),a.useEffect((function(){return function(){(0,d.K)(I)()}}),[I]),(0,D.jsxs)(a.Fragment,{children:[(0,D.jsx)(k.Z,{visible:!Array.isArray(Y)}),Array.isArray(Y)?(0,D.jsxs)(a.Fragment,{children:[E?(0,D.jsx)(j.Z,{component:"div",variant:"h6",children:E}):(0,D.jsx)(a.Fragment,{}),O?(0,D.jsx)(j.Z,{component:"div",variant:"caption",color:"textSecondary",children:O}):(0,D.jsx)(a.Fragment,{}),(0,D.jsx)(x.Z,{py:2,children:(0,D.jsx)(v.Z,{disableElevation:!0,variant:"contained",color:"secondary",size:"small",startIcon:(0,D.jsx)(g.Z,{}),onClick:_,children:"Add new relation"})}),M?(0,D.jsx)(F,{withAccessToken:C,storeName:I,url:N,path:S,children:M}):(0,D.jsx)(a.Fragment,{}),(0,D.jsx)(R,{withAccessToken:C,storeName:I,url:N,path:S})]}):(0,D.jsx)(a.Fragment,{}),Array.isArray(Y)?Y.length>0?(0,D.jsx)(x.Z,{pb:3,children:(0,D.jsxs)(w.Z,{withChangeLimit:!0,total:Q,page:K,limit:B,length:Y.length,onChange:G,onLimit:X,children:[(0,D.jsx)(p.Z,{children:(0,D.jsxs)(m.Z,{children:[Array.isArray($)?$.map((function(e){var t=(0,i.Z)(e,4),n=t[0],a=t[1],s=t[2];t[3];return(0,D.jsx)(f.Z,(0,r.Z)((0,r.Z)({},s?{width:s}:{}),{},{children:(0,D.jsx)(j.Z,{component:"div",variant:"caption",color:"textSecondary",children:a})}),n)})):(0,D.jsx)(a.Fragment,{}),(0,D.jsx)(f.Z,{style:{verticalAlign:"top"}})]})}),z||V?(0,D.jsxs)("tbody",{children:[(0,D.jsx)("tr",{children:(0,D.jsx)("td",{style:{position:"absolute",width:"100%"},children:(0,D.jsx)(k.Z,{visible:!0})})}),(0,D.jsx)("tr",{children:(0,D.jsx)("td",{style:{height:"160px",minHeight:"160px",maxHeight:"160px",paddingTop:"48px",paddingBottom:"48px"}})})]}):(0,D.jsx)(Z.Z,{children:Y.map((function(e,t){return(0,D.jsxs)(m.Z,{children:[Array.isArray($)?$.map((function(t,n){var a=(0,i.Z)(t,4),s=a[0],o=(a[1],a[2]),l=a[3];return(0,D.jsx)(f.Z,(0,r.Z)((0,r.Z)({},o?{width:o}:{}),{},{style:{verticalAlign:"top"},children:"function"===typeof l?l(s,e,n,Y):(0,D.jsx)(j.Z,{component:"div",color:e.isDeleted?"textSecondary":"inherit",sx:{textDecoration:e.isDeleted?"line-through":"inherit"},children:(e[s]||"").split("\n").map((function(e,t){return(0,D.jsx)(x.Z,{pb:1,children:e},t)}))})}),s)})):(0,D.jsx)(a.Fragment,{}),(0,D.jsx)(f.Z,{width:"1%",style:{verticalAlign:"top"},children:(0,D.jsx)(y.Z,{onClick:ee(e.id),children:(0,D.jsx)(b.Z,{color:"error"})})})]},e.id||t)}))})]})}):(0,D.jsx)(x.Z,{py:6,display:"flex",justifyContent:"center",children:(0,D.jsx)(j.Z,{variant:"subtitle2",color:"secondary",children:"No entries created."})}):(0,D.jsx)(a.Fragment,{})]})};(V=a.memo(V)).defaultProps={withAccessToken:!0,filterOptions:function(){return{}},relationOptions:function(){return{}},columns:function(){return["id"]}};var z=V},5789:function(e,t,n){n.d(t,{Z:function(){return z}});var r=n(1413),i=n(2791),a=n(6030),s=n(7689),o=n(393),l=n(6386),c=n(4307),d=n(2772),u=n(2606),h=n(4432),x=n(708),p=n(6601),Z=n(6015),m=n(9827),f=n(9773),j=n(807),v=n(4390),y=n(4565),g=n(3811),b=n(2898),k=n(1251),w=n(1713),A=n(5987),C=n(1895),D=n(2399),I=n(9320),N=n(5702),F=n(5514),S=n(4346),T=n(7247),P=n(1286),q=n(6120),E=n(3939),O=n(6153),M=n(184),U=["storeName","entityId","url","path","withAccessToken","isDeleted","isNotDelete"],H=function(e){var t=e.storeName,n=e.entityId,a=e.url,s=e.path,l=e.withAccessToken,c=e.isDeleted,d=e.isNotDelete,u=(0,A.Z)(e,U),h=(0,o.Ds)().enqueueSnackbar,x=i.useCallback((function(e){(0,C.Q)()()}),[]),p=i.useCallback((function(e){(0,D.n)("statusDrop",{entityId:n})(),(0,C.Q)()()}),[n]),Z=i.useCallback((function(e){(0,I.U)({storeName:t,entityId:n,url:a,path:s,withAccessToken:l})(h),(0,C.Q)()()}),[t,n,a,s,l,h]);return(0,M.jsx)(i.Fragment,{children:(0,M.jsxs)(O.Z,(0,r.Z)((0,r.Z)({},u),{},{children:[(0,M.jsxs)(N.Z,{component:w.Z,to:n,onClick:x,children:[(0,M.jsx)(F.Z,{children:(0,M.jsx)(P.Z,{})}),(0,M.jsx)(S.Z,{children:"Edit"})]}),(0,M.jsxs)(N.Z,{disabled:!0,children:[(0,M.jsx)(F.Z,{children:(0,M.jsx)(q.Z,{})}),(0,M.jsx)(S.Z,{children:"Copy"})]}),c&&(0,M.jsxs)(N.Z,{onClick:Z,children:[(0,M.jsx)(F.Z,{children:(0,M.jsx)(E.Z,{})}),(0,M.jsx)(S.Z,{children:"Restore"})]}),!d&&(0,M.jsxs)(N.Z,{onClick:p,children:[(0,M.jsx)(F.Z,{children:(0,M.jsx)(T.Z,{color:c?"error":"inherit"})}),(0,M.jsx)(S.Z,{children:c?"Delete permanently":"Delete"})]})]}))})};(H=i.memo(H)).defaultProps={};var J=H,L=n(4486),W=n(3343),R=n(9042),V=function(e){var t,n,A,C=e.withAccessToken,D=e.storeName,I=e.url,N=e.path,F=(0,o.Ds)().enqueueSnackbar,S=(0,s.TH)(),T=(0,s.s0)(),P=(0,a.v9)((0,x.Z)(["loader","unmount","visible"])),q=(0,a.v9)((0,x.Z)(["api","list",D,"loader"])),E=null!==(t=(0,a.v9)((0,x.Z)(["api","list",D,"total"])))&&void 0!==t?t:0,O=null!==(n=(0,a.v9)((0,x.Z)(["api","list",D,"page"])))&&void 0!==n?n:1,U=null!==(A=(0,a.v9)((0,x.Z)(["api","list",D,"limit"])))&&void 0!==A?A:20,H=(0,a.v9)((0,x.Z)(["api","list",D,"data"])),V=(0,p.Z)("query",S.search),z=(0,p.Z)("select",S.search),Q=(0,p.Z)("filter",S.search),K=(0,p.Z)("sort",S.search),B=i.useCallback((function(e,t){(0,d.P)(D,"loader",!0)(),(0,d.P)(D,"page",t)()}),[D]),Y=i.useCallback((function(e){(0,d.P)(D,"loader",!0)(),(0,d.P)(D,"limit",e.target.value)()}),[D]),G=i.useCallback((function(e){return function(t){(0,h.n)("menu-statuses-context-".concat(e),t.target)()}}),[]),X=i.useCallback((function(e){(0,d.P)("ssoUserList","loader",!0)(),T((0,W.z)("id",e))}),[T]),$=i.useCallback((function(e){(0,d.P)("ssoUserList","loader",!0)(),T((0,W.z)("createdAt",e))}),[T]);return i.useEffect((function(){!P&&I&&(0,c.i)((0,r.Z)((0,r.Z)((0,r.Z)({id:D,url:I,path:N,withAccessToken:C,page:O,limit:U,query:V},z?{select:JSON.parse(decodeURI(z))}:{}),Q?{filter:JSON.parse(decodeURI(Q))}:{}),K?{sort:JSON.parse(decodeURI(K))}:{}))(F)}),[P,F,O,U,V,z,Q,K,D,I,N,C]),i.useEffect((function(){return function(){(0,u.K)(D)()}}),[D]),(0,M.jsxs)(i.Fragment,{children:[(0,M.jsx)(k.Z,{visible:!Array.isArray(H)||P}),Array.isArray(H)&&!P?H.length>0?(0,M.jsxs)(L.Z,{withChangeLimit:!0,total:E,page:O,limit:U,length:H.length,onChange:B,onLimit:Y,children:[(0,M.jsx)(m.Z,{children:(0,M.jsxs)(j.Z,{children:[(0,M.jsx)(W.Z,{name:"id",onChange:X,children:(0,M.jsx)(y.Z,{component:"div",variant:"caption",color:"textSecondary",children:"ID"})}),(0,M.jsx)(v.Z,{children:(0,M.jsx)(y.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Main"})}),(0,M.jsx)(W.Z,{name:"createdAt",onChange:$,children:(0,M.jsx)(y.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Story"})})]})}),q?(0,M.jsxs)("tbody",{children:[(0,M.jsx)("tr",{children:(0,M.jsx)("td",{style:{position:"absolute",width:"100%"},children:(0,M.jsx)(k.Z,{visible:!0})})}),(0,M.jsx)("tr",{children:(0,M.jsx)("td",{style:{height:"160px",minHeight:"160px",maxHeight:"160px",paddingTop:"48px",paddingBottom:"48px"}})})]}):(0,M.jsx)(f.Z,{children:H.map((function(e,t){return(0,M.jsxs)(j.Z,{children:[(0,M.jsx)(v.Z,{sx:{minWidth:"33%"},children:(0,M.jsx)(y.Z,{component:w.Z,to:e.id,color:e.isDeleted?"textSecondary":"secondary",sx:{textDecoration:e.isDeleted?"line-through":"initial"},children:e.id})}),(0,M.jsxs)(v.Z,{sx:{minWidth:"33%"},children:[(0,M.jsx)(y.Z,{component:w.Z,to:e.id,variant:"h6",color:e.isDeleted?"textSecondary":"secondary",sx:{textDecoration:e.isDeleted?"line-through":"initial"},children:e.name}),(0,M.jsx)(y.Z,{component:"div",variant:"subtitle1",color:"textSecondary",sx:{textDecoration:e.isDeleted?"line-through":"initial"},children:e.description})]}),(0,M.jsxs)(v.Z,{sx:{width:"33%"},children:[(0,R.Z)(e.createdAt)?(0,M.jsxs)(Z.Z,{pb:1,children:[(0,M.jsx)(y.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Created at:"}),(0,M.jsx)(y.Z,{component:"div",children:(0,M.jsx)("b",{children:(0,l.Z)(new Date(e.createdAt),"dd MMMM, hh:mm")})})]}):(0,M.jsx)(i.Fragment,{}),(0,R.Z)(e.updatedAt)?(0,M.jsxs)(Z.Z,{children:[(0,M.jsx)(y.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Updated at:"}),(0,M.jsx)(y.Z,{component:"div",children:(0,M.jsx)("b",{children:(0,l.Z)(new Date(e.updatedAt),"dd MMMM, hh:mm")})})]}):(0,M.jsx)(i.Fragment,{})]}),(0,M.jsxs)(v.Z,{sx:{width:"1%"},children:[(0,M.jsx)(g.Z,{onClick:G(e.id),children:(0,M.jsx)(b.Z,{})}),(0,M.jsx)(J,{id:"menu-statuses-context-".concat(e.id),entityId:e.id,withAccessToken:C,storeName:D,url:I,path:N,isDeleted:e.isDeleted,isNotDelete:e.isNotDelete})]})]},e.id)}))})]}):(0,M.jsx)(Z.Z,{py:6,display:"flex",justifyContent:"center",children:(0,M.jsx)(y.Z,{variant:"subtitle2",color:"secondary",children:"No entries created."})}):(0,M.jsx)(i.Fragment,{})]})};(V=i.memo(V)).defaultProps={};var z=V}}]);
//# sourceMappingURL=105.be54222a.chunk.js.map