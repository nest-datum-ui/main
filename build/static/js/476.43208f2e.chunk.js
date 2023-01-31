"use strict";(self.webpackChunkmain=self.webpackChunkmain||[]).push([[476],{5476:function(e,n,t){t.r(n),t.d(n,{default:function(){return x}});var a=t(885),r=t(5987),i=t(2791),c=t(6030),o=t(7235),d=t(9154),s=t(4924),l=t(708),u=t(7487),f=t(1091),v=t(9885),p=t(3200),h=t(184),g=["disabled","label","value","defaultValue"],m=function(e){var n=e.disabled,t=e.label,m=e.value,x=e.defaultValue,b=((0,r.Z)(e,g),i.useState((function(){return(0,u.Z)(m)?m:(0,u.Z)(x)?x:""}))),Z=(0,a.Z)(b,1)[0],j=(0,c.v9)((0,l.Z)(["api","form","".concat(s.mu,"/").concat(Z),"loader"])),z=(0,c.v9)((0,l.Z)(["api","form","".concat(s.mu,"/").concat(Z),"systemId"])),H=(0,c.v9)((0,l.Z)(["api","form","".concat(s.mu,"/").concat(Z),"path"])),k=(0,c.v9)((0,l.Z)(["api","form","".concat(s.mu,"/").concat(Z),"size"]));return i.useEffect((function(){Z&&!z&&(0,o.y)((function(){return"".concat(s.mu,"/").concat(Z)}),{entityId:Z})()}),[Z,z]),i.useEffect((function(){return function(){(0,d.z)("".concat(s.mu,"/").concat(Z))()}}),[Z]),(0,h.jsxs)(i.Fragment,{children:[(0,h.jsx)(f.Z,{disableElevation:!0,variant:"contained",color:"primary",disabled:n,startIcon:(0,h.jsx)(v.Z,{}),children:t}),(0,h.jsx)(p.Z,{loader:j||!z,path:H,size:k})]})};(m=i.memo(m)).defaultProps={label:"Select file",onChange:function(){}};var x=m},3200:function(e,n,t){t.d(n,{Z:function(){return b}});var a=t(1413),r=t(2791),i=t(7487),c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!(0,i.Z)(e))return!1;var n=e.split(".");return"png"===n[n.length-1]||"jpeg"===n[n.length-1]||"jpg"===n[n.length-1]||"svg"===n[n.length-1]||"gif"===n[n.length-1]||0===e.indexOf("data:image/png;base64")||0===e.indexOf("data:image/jpeg;base64")||0===e.indexOf("data:image/jpg;base64")||0===e.indexOf("data:image/svg;base64")||0===e.indexOf("data:image/png;base64")},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return c(e)},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!(0,i.Z)(e))return!1;var n=e.split(".");return"pdf"===n[n.length-1]||0===e.indexOf("data:application/pdf;base64")},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(!(0,i.Z)(e))return!1;var n=e.split(".");return"ejs"===n[n.length-1]||0===e.indexOf("data:application/octet-stream;base64")||0===e.indexOf("data:application/ejs;base64")},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return 0!==e.indexOf("https://")&&0!==e.indexOf("http://")||e.includes("https://files.cidiator.com")?"https://files.cidiator.com"+e+(n?"?accessToken=".concat(localStorage.getItem("".concat("https://dev.cidiator.com","_accessToken"))):""):e},u=t(6015),f=t(4565),v=t(9885),p=t(1814),h=t(5070),g=t(1251),m=t(184),x=function(e){var n=e.loader,t=e.path,i=e.name,c=e.size,x=r.useMemo((function(){return o(t)}),[t]),b=r.useMemo((function(){return d(t)}),[t]),Z=r.useMemo((function(){return s(t)}),[t]);return(0,m.jsxs)(r.Fragment,{children:[(0,m.jsx)(g.Z,{visible:n}),(0,m.jsx)(u.Z,{maxWidth:"240px",sx:(0,a.Z)((0,a.Z)({position:"relative",display:n?"none":"block"},x?{backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundImage:"url('".concat(l(t,!0),"')")}:{}),{},{"&:after":{content:'""',display:"block",paddingBottom:x?"100%":"0px"},"& > a":{display:"block",width:"100%","& > svg":{width:"100%",height:"100%"}}}),children:function(){switch(!0){case b:return(0,m.jsx)("a",{href:l(t,!0),target:"_blank",rel:"noreferrer",children:(0,m.jsx)(p.Z,{color:"primary"})});case Z:return(0,m.jsx)("a",{href:l(t,!0),target:"_blank",rel:"noreferrer",children:(0,m.jsx)(h.Z,{color:"primary"})});case!x:return(0,m.jsx)("a",{href:l(t,!0),target:"_blank",rel:"noreferrer",children:(0,m.jsx)(v.Z,{})});default:return(0,m.jsx)(r.Fragment,{})}}()}),(0,m.jsx)(f.Z,{component:"div",variant:"body2",sx:{wordWrap:"anywhere",paddingLeft:"6px",paddingTop:"2px"},children:(0,m.jsx)("b",{children:i?i.length>80?"".concat((i||"").substring(0,80),"..."):i:(t||"").length>80?"".concat((t||"").substring(0,80),"..."):t})}),"number"===typeof c&&(0,m.jsxs)(f.Z,{component:"div",variant:"caption",sx:{paddingLeft:"6px",paddingBottom:"2px"},children:["Size: ",c]})]})};(x=r.memo(x)).defaultProps={};var b=x},9885:function(e,n,t){var a=t(4836);n.Z=void 0;var r=a(t(5649)),i=t(184),c=(0,r.default)((0,i.jsx)("path",{d:"M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"}),"InsertDriveFile");n.Z=c},1814:function(e,n,t){var a=t(4836);n.Z=void 0;var r=a(t(5649)),i=t(184),c=(0,r.default)((0,i.jsx)("path",{d:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"}),"PictureAsPdf");n.Z=c},5070:function(e,n,t){var a=t(4836);n.Z=void 0;var r=a(t(5649)),i=t(184),c=(0,r.default)((0,i.jsx)("path",{d:"M21 5v6.5H9.33V5H21zm-6.33 14v-6.5H9.33V19h5.34zm1-6.5V19H21v-6.5h-5.33zM8.33 19V5H3v14h5.33z"}),"ViewQuilt");n.Z=c}}]);
//# sourceMappingURL=476.43208f2e.chunk.js.map