(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{45:function(e,t,a){e.exports=a(94)},50:function(e,t,a){},94:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(22),l=a.n(s),i=(a(50),a(19)),o=a(10),c=a(31),m=a(24),d=a(12),u=a(13),f=a(16),p=a(14),E=a(17),h=a(8),v=a(20),b=a.n(v),g=a(15),O=a(27),N=a.n(O),y=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(f.a)(this,Object(p.a)(t).call(this,e))).onChange=function(e){a.setState(Object(m.a)({},e.target.name,e.target.value))},a.onChangeFile=function(e){var t=Object.keys(e.target.files).map(function(t){return delete e.target.files[t].lastModified,e.target.files[t]});a.setState({files:[].concat(Object(c.a)(a.state.files),Object(c.a)(t))})},a.onSubmit=function(e){e.preventDefault();var t={files:a.state.files,sendTo:a.state.sendTo,sendFrom:a.state.sendFrom};if(!a.checkErrors(t)){for(var n=new FormData,r=0;r<a.state.files.length;r++)n.append("files",a.state.files[r]);n.append("sendTo",a.state.sendTo),n.append("sendFrom",a.state.sendFrom),a.props.sendFileAction(n)}},a.checkErrors=function(e){var t=[];return e.files.length<=0&&t.push("You must attach a file"),0!==e.sendTo.length&&0!==e.sendFrom.length&&" "!==e.sendTo&&" "!==e.sendFrom||t.push("Input fields cannot be blank"),t.length>0&&(a.setState({errors:t}),!0)},a.removeItem=function(e){var t=[].concat(a.state.files);t.splice(e,1),a.setState({files:t})},a.state={files:[],sendTo:"",sendFrom:"",id:"",errors:[]},a}return Object(E.a)(t,e),Object(u.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.files&&(!0===e.files.status&&this.setState({files:[],sendTo:"",sendFrom:"",errors:[],id:""}),this.setState({id:e.files.id}))}},{key:"render",value:function(){var e=this,t=this.props.files,a=t.status,n=t.loading,s=t.id;return console.log(this.props.files),r.a.createElement("div",{className:"form-container"},r.a.createElement("div",{className:"added-items-container padding-sides"},(this.state.errors||[]).map(function(e,t){return r.a.createElement("div",{className:"error-message",key:t},e)}),(this.state.files||[]).map(function(t,a){return r.a.createElement("div",{className:"flex-space",key:a},r.a.createElement("span",null,t.name),r.a.createElement("button",{className:"item-remove",onClick:function(){e.removeItem({i:a})}},r.a.createElement(h.e,{color:"#ff4757",size:20})))})),r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"input-file-container flex-center"},r.a.createElement("div",{className:"relative"},a?r.a.createElement("div",{className:"input-file-content"},r.a.createElement(h.c,{color:"#fff",size:40}),r.a.createElement("span",null,"Your files successfully send.")):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"input-file-content"},r.a.createElement(h.c,{color:"#fff",size:40}),r.a.createElement("span",null,"Upload Files...")),r.a.createElement("input",{type:"file",className:"input-file",onChange:this.onChangeFile,multiple:!0})))),r.a.createElement("div",{className:"padding-sides margin-t-xl"},!a&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"input-row"},r.a.createElement("label",null,r.a.createElement("p",null,"SEND TO"),r.a.createElement("input",{type:"email",name:"sendTo",className:"main-input",onChange:this.onChange,value:this.state.sendTo}))),r.a.createElement("div",{className:"input-row"},r.a.createElement("label",null,r.a.createElement("p",null,"SEND FROM"),r.a.createElement("input",{type:"email",name:"sendFrom",className:"main-input",onChange:this.onChange,value:this.state.sendFrom}))),r.a.createElement("button",{className:"form-btn",disabled:n},n?r.a.createElement(N.a,{type:"Oval",color:"#fff",height:"30",width:"30"}):"SEND")))),a&&r.a.createElement(i.b,{to:"/download/".concat(s)},"Transfer to Download page"))}}]),t}(n.Component),F=Object(g.b)(function(e){return{files:e.files}},{sendFileAction:function(e){return function(t){t({type:"GET_LOADING"}),b.a.post("/api/upload",e).then(function(e,a){if(!e||a)return t({type:"GET_ERROR",payload:"Something went wrong"});t({type:"SEND_FILE",payload:e.data})}).catch(function(e){return t({type:"GET_ERROR",payload:e.response.data})})}}})(y),w=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(f.a)(this,Object(p.a)(t).call(this,e))).onSubmit=function(e){e.preventDefault()},a.state={downloadLink:""},a}return Object(E.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){console.log("asfasf");var e=this.props.match.params.confirmID;this.props.receiveFilesAction(e,this.props.history),this.setState({downloadLink:"/api/download/files/".concat(e)})}},{key:"render",value:function(){var e=this.props.receivedFiles.receivedFiles,t=e.files,a=e.sendFrom;return r.a.createElement("div",{className:"form-container"},r.a.createElement("div",{className:"added-items-container padding-sides"}),r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"download-header"},r.a.createElement("div",{className:"flex-center"},r.a.createElement(h.b,{color:"#fff",size:40})),r.a.createElement("p",{className:"sender"},a,r.a.createElement("br",null)," sent you some files")),r.a.createElement("div",{className:"padding-sides"},r.a.createElement("div",{className:"received-files"},t&&t.files.map(function(e,t){return r.a.createElement("div",{className:"flex-space",key:t},r.a.createElement("span",null,e.filename),r.a.createElement("button",{className:"item-remove"},r.a.createElement(h.a,{color:"#353b48",size:20})))})),r.a.createElement("div",{className:"input-row"}),r.a.createElement("a",{className:"form-btn",href:this.state.downloadLink},"DOWNLOAD ALL"))))}}]),t}(n.Component),j=Object(g.b)(function(e){return{receivedFiles:e.receivedFiles,errors:e.errors}},{receiveFilesAction:function(e,t){return function(t){b.a.get("/api/download/".concat(e)).then(function(e){return console.log("result dispatch"),t({type:"RECEIVED_FILES",payload:e.data})}).catch(function(e){return console.log("error"),t({type:"GET_ERROR",payload:e.response.data})})}}})(Object(o.e)(w)),S=function(e){function t(){return Object(d.a)(this,t),Object(f.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",{className:"logo inlineflex-center"},r.a.createElement(h.d,{size:50,color:"#fff"}),r.a.createElement("span",null,"SHARE")),r.a.createElement("p",{className:"desc-title"},"Share your files."),r.a.createElement("p",{className:"desc-subtitle"},"Secure. fast. free."))}}]),t}(n.Component);var k=function(){return r.a.createElement(i.a,null,r.a.createElement("div",{className:"container flex-container"},r.a.createElement("div",{className:"inner-container"},r.a.createElement(o.a,{path:"/",component:S}),r.a.createElement(o.a,{exact:!0,path:"/",component:F}),r.a.createElement(o.a,{path:"/download/:confirmID",component:j}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var D=a(9),T=a(11),R={status:!1,loading:!1,id:""},C={errors:[]},I={receivedFiles:[]},L=Object(D.combineReducers)({files:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_LOADING":return Object(T.a)({},e,{loading:!0});case"SEND_FILE":return Object(T.a)({},e,{status:t.payload.success,id:t.payload.id,loading:!1});default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERROR":return Object(T.a)({},e,{errors:t.payload});default:return e}},receivedFiles:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RECEIVED_FILES":return Object(T.a)({},e,{receivedFiles:t.payload});default:return e}}}),_=a(43),x=a(44),A=Object(D.createStore)(L,{},Object(x.composeWithDevTools)(Object(D.applyMiddleware)(_.a)));l.a.render(r.a.createElement(g.a,{store:A},r.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[45,1,2]]]);
//# sourceMappingURL=main.abc0774d.chunk.js.map