"use strict";(self.webpackChunkmain=self.webpackChunkmain||[]).push([[554],{554:function(t,e,n){n.r(e),n.d(e,{default:function(){return tt}});var i=n(2791),r=n(7689),s=n(6015),a=n(1413),o=n(885),c=n(142),d=n(166),l=n(1713),x=n(184),h=function(){var t=(0,r.TH)().pathname,e=t.substring(1),n=[0===e.indexOf("registry/serv"),0===e.indexOf("registry/settings")],s=i.useState((function(){return"/registry"===t?0:n.indexOf(!0)})),h=(0,o.Z)(s,2),p=h[0],j=h[1],m=i.useCallback((function(t,e){j(e)}),[j]);return i.useEffect((function(){"/registry"===t&&j(0)}),[t,j]),(0,x.jsx)(i.Fragment,{children:(0,x.jsxs)(c.Z,{variant:"scrollable",value:p>=0?p:0,onChange:m,children:[(0,x.jsx)(d.Z,(0,a.Z)({label:"Services"},0===e.indexOf("registry/serv")||"/registry"===t?{sx:{textTransform:"initial",pointerEvents:"none"}}:{component:l.Z,to:"serv",sx:{textTransform:"initial"}})),(0,x.jsx)(d.Z,(0,a.Z)({label:"Settings"},0===e.indexOf("registry/settings")?{sx:{textTransform:"initial",pointerEvents:"none"}}:{component:l.Z,to:"settings",sx:{textTransform:"initial"}}))]})})};(h=i.memo(h)).defaultProps={};var p=h,j=function(t){t.children;return(0,x.jsxs)(i.Fragment,{children:[(0,x.jsx)(s.Z,{pr:2,children:(0,x.jsx)(p,{})}),(0,x.jsx)(r.j3,{})]})};(j=i.memo(j)).defaultProps={};var m=j,u=n(148),Z=n(4565),v=n(6030),g=n(3441),y=n(4307),f=n(2772),b=n(2606),k=n(708),S=n(9827),A=n(9773),P=n(807),w=n(4390),C=n(1251),M=n(3438),T=n(6386),F=n(5953),E=n(3783),L=n(4244),D=n(3811),N=n(5172),O=n(5678),W=function(t){var e=(0,t.dataProvider)(),n=i.useState((function(){return!1})),r=(0,o.Z)(n,2),a=r[0],c=r[1],d=i.useCallback((function(t){return c((function(t){return!t}))}),[c]);return(0,x.jsxs)(i.Fragment,{children:[(0,x.jsxs)(P.Z,{children:[(0,x.jsx)(w.Z,{sx:{minWidth:"100%"},children:(0,x.jsx)(Z.Z,{component:"div",variant:"h6",children:e.name})}),(0,x.jsx)(w.Z,{sx:{minWidth:"max-content"},children:(0,x.jsxs)(F.ZP,{container:!0,alignItems:"center",justifyContent:"space-between",spacing:2,children:[(0,x.jsx)(F.ZP,{item:!0,xs:!0,children:(0,x.jsx)(Z.Z,{component:"div",variant:"h6",children:"Replicas data:"})}),(0,x.jsx)(F.ZP,{item:!0,xs:!1,children:(0,x.jsx)(D.Z,{onClick:d,children:a?(0,x.jsx)(O.Z,{}):(0,x.jsx)(N.Z,{})})})]})})]}),(0,x.jsx)(P.Z,{children:(0,x.jsx)(w.Z,{style:{paddingBottom:0,paddingTop:0},colSpan:6,children:(0,x.jsx)(L.Z,{in:a,timeout:"auto",unmountOnExit:!0,children:(0,x.jsx)(s.Z,{pl:2,children:(0,x.jsxs)(E.Z,{children:[(0,x.jsx)(S.Z,{children:(0,x.jsxs)(P.Z,{children:[(0,x.jsx)(w.Z,{children:(0,x.jsx)(Z.Z,{component:"div",variant:"caption",color:"textSecondary",children:"ID"})}),(0,x.jsx)(w.Z,{children:(0,x.jsx)(Z.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Host"})}),(0,x.jsx)(w.Z,{children:(0,x.jsx)(Z.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Database master host"})}),(0,x.jsx)(w.Z,{children:(0,x.jsx)(Z.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Load"})}),(0,x.jsx)(w.Z,{children:(0,x.jsx)(Z.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Story"})})]})}),(0,x.jsx)(A.Z,{children:(e.replicas||[]).map((function(t,e){return(0,x.jsxs)(P.Z,{children:[(0,x.jsx)(w.Z,{children:(0,x.jsx)(Z.Z,{component:"div",variant:"body2",children:t.id})}),(0,x.jsx)(w.Z,{children:(0,x.jsxs)(Z.Z,{component:"div",variant:"body2",children:[t.host,":",t.port]})}),(0,x.jsx)(w.Z,{children:(0,x.jsx)(Z.Z,{component:"div",variant:"body2",children:t.mysqlMasterHost&&t.mysqlMasterPort?"".concat(t.mysqlMasterHost,":").concat(t.mysqlMasterPort):"-"})}),(0,x.jsx)(w.Z,{children:(0,x.jsx)(Z.Z,{component:"div",variant:"body2",children:t.load})}),(0,x.jsxs)(w.Z,{children:[t.createdAt?(0,x.jsxs)(s.Z,{pb:1,children:[(0,x.jsx)(Z.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Created at:"}),(0,x.jsx)(Z.Z,{component:"div",variant:"body2",children:(0,x.jsx)("b",{children:(0,T.Z)(new Date(t.createdAt),"dd MMMM, hh:mm")})})]}):(0,x.jsx)(i.Fragment,{}),t.updatedAt?(0,x.jsxs)(s.Z,{children:[(0,x.jsx)(Z.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Updated at:"}),(0,x.jsx)(Z.Z,{component:"div",variant:"body2",children:(0,x.jsx)("b",{children:(0,T.Z)(new Date(t.updatedAt),"dd MMMM, hh:mm")})})]}):(0,x.jsx)(i.Fragment,{})]})]},e)}))})]})})})})})]})};(W=i.memo(W)).defaultProps={};var H=W,q=function(t){var e,n,r,a=t.withAccessToken,o=t.storeName,c=t.url,d=t.path,l=(0,g.Ds)().enqueueSnackbar,h=(0,v.v9)((0,k.Z)(["loader","unmount","visible"])),p=(0,v.v9)((0,k.Z)(["api","list",o,"loader"])),j=null!==(e=(0,v.v9)((0,k.Z)(["api","list",o,"total"])))&&void 0!==e?e:0,m=null!==(n=(0,v.v9)((0,k.Z)(["api","list",o,"page"])))&&void 0!==n?n:1,u=null!==(r=(0,v.v9)((0,k.Z)(["api","list",o,"limit"])))&&void 0!==r?r:20,T=(0,v.v9)((0,k.Z)(["api","list",o,"data"])),F=i.useCallback((function(t,e){(0,f.P)(o,"loader",!0)(),(0,f.P)(o,"page",e)()}),[o]),E=i.useCallback((function(t){(0,f.P)(o,"loader",!0)(),(0,f.P)(o,"limit",t.target.value)()}),[o]);return i.useEffect((function(){h||(0,y.i)({id:o,url:c,path:d,withAccessToken:a,page:m,limit:u})(l)}),[o,a,c,d,h,m,u,l]),i.useEffect((function(){return function(){(0,b.K)(o)()}}),[o]),(0,x.jsxs)(i.Fragment,{children:[(0,x.jsx)(C.Z,{visible:!Array.isArray(T)}),Array.isArray(T)?T.length>0?(0,x.jsxs)(M.Z,{withChangeLimit:!0,total:j,page:m,limit:u,length:T.length,onChange:F,onLimit:E,children:[(0,x.jsx)(S.Z,{children:(0,x.jsxs)(P.Z,{children:[(0,x.jsx)(w.Z,{children:(0,x.jsx)(Z.Z,{component:"div",variant:"caption",color:"textSecondary",children:"Name"})}),(0,x.jsx)(w.Z,{})]})}),p||h?(0,x.jsxs)("tbody",{children:[(0,x.jsx)("tr",{children:(0,x.jsx)("td",{style:{position:"absolute",width:"100%"},children:(0,x.jsx)(C.Z,{visible:!0})})}),(0,x.jsx)("tr",{children:(0,x.jsx)("td",{style:{height:"160px",minHeight:"160px",maxHeight:"160px",paddingTop:"48px",paddingBottom:"48px"}})})]}):(0,x.jsx)(A.Z,{children:T.map((function(t,e){return(0,x.jsx)(H,{dataProvider:function(){return t}},e)}))})]}):(0,x.jsx)(s.Z,{py:6,display:"flex",justifyContent:"center",children:(0,x.jsx)(Z.Z,{variant:"subtitle2",color:"secondary",children:"No entries created."})}):(0,x.jsx)(i.Fragment,{})]})};(q=i.memo(q)).defaultProps={withAccessToken:!0,storeName:"registryServList",url:"https://api.cidiator.com/registry",path:"serv"};var I=q,R=function(){return i.useEffect((function(){(0,u.Q)("app",[{key:"/",text:"..."},{key:"registry",text:"Registry"},{key:"/registry/serv",text:"Services"}])()}),[]),(0,x.jsxs)(i.Fragment,{children:[(0,x.jsx)(s.Z,{pt:1,pb:2,children:(0,x.jsx)(Z.Z,{component:"div",variant:"h5",children:"Services list"})}),(0,x.jsx)(I,{})]})};(R=i.memo(R)).defaultProps={};var z=R,K=n(1091),Q=n(2419),U=n(4487),B=n(4994),G=n(2426),J=function(){return i.useEffect((function(){(0,u.Q)("app",[{key:"/",text:"..."},{key:"registry",text:"Registry"},{key:"/registry/settings",text:"Settings"}])()}),[]),(0,x.jsxs)(i.Fragment,{children:[(0,x.jsx)(s.Z,{pt:1,pb:2,children:(0,x.jsx)(Z.Z,{component:"div",variant:"h5",children:"Settings list"})}),(0,x.jsx)(s.Z,{py:2,children:(0,x.jsx)(K.Z,{disableElevation:!0,variant:"contained",color:"secondary",size:"small",startIcon:(0,x.jsx)(Q.Z,{}),component:l.Z,to:"/registry/settings/0",children:"Create"})}),(0,x.jsx)(U.Z,{storeName:"registrySettingsList"}),(0,x.jsx)(B.Z,{withAccessToken:!0,storeName:"registrySettingsList",url:"https://api.cidiator.com/registry",path:"setting"}),(0,x.jsx)(G.Z,{withAccessToken:!0,storeName:"registrySettingsList",url:"https://api.cidiator.com/registry",path:"setting"})]})};(J=i.memo(J)).defaultProps={};var V=J,X=n(4267),Y=function(){var t=(0,r.UO)().entityId,e=(0,v.v9)((0,k.Z)(["api","form",t,"isDeleted"]));return i.useEffect((function(){(0,u.Q)("app",[{key:"/",text:"..."},{key:"registry",text:"Registry"},{key:"/registry/settings",text:"Settings"},{key:"/registry/settings/".concat(t),text:"0"===t?"Create new setting":(0,x.jsx)("span",{style:{textDecoration:e?"line-through":"initial"},children:t})}])()}),[t,e]),(0,x.jsxs)(i.Fragment,{children:[(0,x.jsx)(s.Z,{py:2,children:(0,x.jsx)(Z.Z,{component:"div",variant:"h5",children:"0"===t?"Add setting":(0,x.jsxs)(i.Fragment,{children:["Edit setting ",(0,x.jsx)("b",{style:{textDecoration:e?"line-through":"initial"},children:t})]})})}),(0,x.jsx)(X.Z,{withAccessToken:!0,storeName:"registrySettingsList",url:"https://api.cidiator.com/registry",path:"setting"}),(0,x.jsx)(G.Z,{withAccessToken:!0,storeName:"registrySettingsList",url:"https://api.cidiator.com/registry",path:"setting"})]})};(Y=i.memo(Y)).defaultProps={};var $=Y,_=function(){return(0,x.jsx)(i.Fragment,{children:(0,x.jsx)(r.Z5,{children:(0,x.jsxs)(r.AW,{path:"",element:(0,x.jsx)(m,{}),children:[(0,x.jsx)(r.AW,{index:!0,element:(0,x.jsx)(z,{})}),(0,x.jsx)(r.AW,{path:"serv",element:(0,x.jsx)(z,{})}),(0,x.jsx)(r.AW,{path:"settings",element:(0,x.jsx)(V,{})}),(0,x.jsx)(r.AW,{path:"settings/:entityId",element:(0,x.jsx)($,{})})]})})})};(_=i.memo(_)).defaultProps={};var tt=_},5172:function(t,e,n){var i=n(4836);e.Z=void 0;var r=i(n(5649)),s=n(184),a=(0,r.default)((0,s.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");e.Z=a},5678:function(t,e,n){var i=n(4836);e.Z=void 0;var r=i(n(5649)),s=n(184),a=(0,r.default)((0,s.jsx)("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");e.Z=a}}]);
//# sourceMappingURL=554.afc7c02e.chunk.js.map