(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,a){e.exports=a(66)},39:function(e,t,a){},40:function(e,t,a){e.exports=a.p+"static/media/kk.3c8db120.jpg"},66:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(29),o=a.n(c),l=a(9),s=a(10),i=a(12),m=a(11),u=a(13),d=a(30),p=(a(39),a(40),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).item=a.props.item,a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e={backgroundImage:"url(".concat(this.item.image,")"),backgroundRepeat:"no-repeat",backgroundSize:"auto 100%",height:"83%"};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"col-md-3 item"},r.a.createElement("div",{style:e,className:"bgimage"}),r.a.createElement("div",{className:"info-box"},r.a.createElement("p",{className:"name"},this.item.name),r.a.createElement("p",{className:"price"},"V-bucks: ",this.item.price.toFixed(0)),r.a.createElement("p",{className:"last-seen"},"Last seen: ",this.item.available))),r.a.createElement("div",{className:"col-md-1 col-md-offset-1"}))}}]),t}(n.Component)),h=function(e){return r.a.createElement("div",{className:"container"},e.itemList)},g=a(14),f=a(7),v=a.n(f),b=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={name:"",rarity:["Uncommon"],lastSeen:"",price:["-1"],success:"",error:""},a.handleSubmit=function(e){e.preventDefault(),v.a.post("http://localhost:3001/api/items",{name:a.state.name,rarity:a.state.rarity[0],lastSeen:a.state.lastSeen,price:a.state.price[0]}).then(function(e){a.setState({success:"Success! "+e.name+" added!",error:""})}).catch(function(e){console.log("Error: ",e.response.data),a.setState({success:"",error:e.response.data.error})})},a.handleChange=function(e){if(e.preventDefault(),"rarity"===e.target.id||"price"===e.target.id){var t=[e.target.value];a.setState(Object(g.a)({},e.target.id,t))}else if("lastSeen"===e.target.id){var n=a.formatDate(e.target.value);a.setState(Object(g.a)({},e.target.id,n))}else a.setState(Object(g.a)({},e.target.id,e.target.value));console.log(a.state)},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"formatDate",value:function(e){var t=e.split("."),a=t[0],n=t[1],r=t[2]+"-"+n+"-"+a;return console.log(r),new Date(r)}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"text-muted"},"Name"),r.a.createElement("input",{type:"text",placeholder:"Enter name",id:"name",onChange:this.handleChange,className:"form-control"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"text-muted"},"Last seen"),r.a.createElement("input",{type:"text",placeholder:"Date last seen",value:this.state.lastSeen,id:"lastSeen",onChange:this.handleChange,className:"form-control"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Price"),r.a.createElement("select",{value:this.state.price,onChange:this.handleChange,multiple:!0,className:"form-control",id:"price"},r.a.createElement("option",{value:"-1"},"Battlepass or bundle pack"),r.a.createElement("option",{value:"800"},"800"),r.a.createElement("option",{value:"1200"},"1200"),r.a.createElement("option",{value:"1500"},"1500"),r.a.createElement("option",{value:"2000"},"2000"))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Price"),r.a.createElement("select",{value:this.state.rarity,onChange:this.handleChange,multiple:!0,className:"form-control",id:"rarity"},r.a.createElement("option",{value:"Uncommon"},"Uncommon"),r.a.createElement("option",{value:"Rare"},"Rare"),r.a.createElement("option",{value:"Epic"},"Epic"),r.a.createElement("option",{value:"Legendary"},"Legendary"))),r.a.createElement("button",{type:"submit",className:"btn btn-outline-primary"},"Add Item")),r.a.createElement("div",{className:"info-box"},this.state.error&&r.a.createElement("div",{className:"alert alert-danger",role:"alert"},this.state.error),this.state.success&&r.a.createElement("div",{className:"alert alert-success",role:"alert"},this.state.success)))}}]),t}(n.Component),E=a(8),y=a(33),N=function(e){var t=e.component,a=Object(d.a)(e,["component"]);return r.a.createElement(E.a,Object.assign({},a,{render:function(e){return function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];var c=Object.assign.apply(Object,[{}].concat(a));return r.a.createElement(e,c)}(t,e,a)}}))},j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).resetHandler=function(e){console.log("Test");var t=[];a.state.items.map(function(e){var a=e._id;v.a.put("http://localhost:3001/api/items/"+a,{image:"https://image.fnbr.co/outfit/5ab17f395f957f27504aa54c/png.png"}).then(function(e){console.log(e.data),t.push(e.data)}).catch(function(e){console.log("Something went wrong when saving image: ",e)})}),a.setState({items:t})},a.buttonHandler=function(e){var t=0;a.state.items.map(function(e){t+=200,setTimeout(function(){var t=e._id,a=e.name;v.a.get("https://fnbr.co/api/images?search="+a,{headers:{"x-api-key":"024011f1-bc2b-41da-9c08-84c7350f10a1"}}).then(function(e){if(e.data.data.length>0){console.log("Success: "+e.data.data[0].images.png);var a=e.data.data[0].images.png;v.a.put("http://localhost:3001/api/items/"+t,{image:a}).then(function(e){console.log(e.data)}).catch(function(e){console.log("Something went wrong when saving image: ",e)})}else console.log("Could not find outfit")}).catch(function(e){console.log("Error: ",e)})},2*t+1e3)})},a.state={items:[]},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e,t=this;e=function(e){t.setState({items:e})},v.a.get("http://localhost:3001/api/items").then(function(t){e(t.data)}).catch(function(e){console.log(e)})}},{key:"render",value:function(){console.log(this.state.items);var e={backgroundColor:"#ff0000"},t=this.state.items,a=t.length?r.a.createElement("div",{className:"row"},t.map(function(t,a){return r.a.createElement(r.a.Fragment,{key:t.id},r.a.createElement(p,{styleting:e,item:t}))})):r.a.createElement("p",null,"Ingen data..");return r.a.createElement("div",null,r.a.createElement("button",{onClick:this.buttonHandler},"Fetch images"),r.a.createElement("button",{onClick:this.resetHandler},"Reset images"),r.a.createElement(y.a,null,r.a.createElement(N,{path:"/home",component:h,itemList:a}),r.a.createElement(N,{path:"/add-item",component:b})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[34,1,2]]]);
//# sourceMappingURL=main.25dc2a74.chunk.js.map