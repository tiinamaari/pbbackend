(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(43)},41:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(10),o=n.n(a),r=n(0),i=n.n(r),u=n(15),l=n(11),c=n(12),s=n(14),m=n(13),f=n(16),d=function(e){return i.a.createElement("div",null,"Rajaa hakua:",i.a.createElement("input",{value:e.value,onChange:e.onChange}))},p=function(e){return i.a.createElement("form",null,i.a.createElement("div",null,"Nimi:",i.a.createElement("input",{value:e.param.state.newName,onChange:e.param.handleNameChange})),i.a.createElement("div",null,"Numero:",i.a.createElement("input",{value:e.param.state.newNumber,onChange:e.param.handleNumberChange})),i.a.createElement("div",null,i.a.createElement("button",{type:"submit",onClick:e.param.addPerson},"Lis\xe4\xe4")))},h=n(2),v=n.n(h),b="/api/persons",E={getAll:function(){return v.a.get(b).then(function(e){return e.data})},create:function(e){return v.a.post(b,e).then(function(e){return e.data})},update:function(e,t){return v.a.put("".concat(b,"/").concat(e),t).then(function(e){return e.data})},remove:function(e,t){return v.a.delete("".concat(b,"/").concat(e),t).then(function(e){return e.data})}},g=function(e){var t=e.message;return null===t?null:i.a.createElement("div",{className:"notification"},t)},w=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(m.a)(t).call(this,e))).handleNameChange=function(e){n.setState({newName:e.target.value})},n.handleNumberChange=function(e){n.setState({newNumber:e.target.value})},n.handleFilter=function(e){n.setState({filter:e.target.value})},n.addPerson=function(e){e.preventDefault();var t={name:n.state.newName,number:n.state.newNumber};if(n.state.persons.map(function(e){return e.name}).includes(t.name)){var a=n.state.persons.find(function(e){return e.name===t.name}),o=Object(u.a)({},a,{number:t.number});console.log(o),window.confirm("".concat(a.name," on jo luettelossa, korvataanko vanha numero uudella?"))&&(console.log("korvataan"),E.update(o.id,o).then(function(e){var t=n.state.persons.filter(function(t){return t.id!==e.id});n.setState({persons:t.concat(e),newName:"",newNumber:"",notification:"Henkil\xf6n ".concat(e.name," puhelinnumero p\xe4ivitettiin onnistuneesti!")}),n.notificationTimeOut()}))}else E.create(t).then(function(e){var t=n.state.persons.concat(e);n.setState({persons:t,newName:"",newNumber:"",notification:"".concat(e.name," lis\xe4ttiin onnistuneesti!")}),n.notificationTimeOut()})},n.removePerson=function(e){return function(){window.confirm("Poistetaanko ".concat(e.name,"?"))&&(console.log("poistetaan",e.id),E.remove(e.id,e).then(function(t){var a=n.state.persons.filter(function(t){return t!==e});n.setState({persons:a,notification:"".concat(e.name," on poistettu!")}),n.notificationTimeOut()}))}},n.notificationTimeOut=function(){setTimeout(function(){n.setState({notification:null})},3e3)},n.state={persons:[],newName:"",newNumber:"",filter:"",notification:null},n}return Object(f.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("did mount"),E.getAll().then(function(t){e.setState({persons:t})})}},{key:"render",value:function(){var e=this;console.log("render");var t=""===this.state.filter?this.state.persons:this.state.persons.filter(function(t){return t.name.indexOf(e.state.filter)>-1});return i.a.createElement("div",null,i.a.createElement("h2",null,"Puhelinluettelo"),i.a.createElement(p,{param:this}),i.a.createElement(g,{message:this.state.notification}),i.a.createElement("h2",null,"Numerot"),i.a.createElement(d,{value:this.state.filter,onChange:this.handleFilter}),i.a.createElement("table",null,t.map(function(t){return i.a.createElement("tr",null,i.a.createElement("td",null,t.name),i.a.createElement("td",null,t.number),i.a.createElement("td",null,i.a.createElement("button",{onClick:e.removePerson(t)},"Poista")))})))}}]),t}(i.a.Component);n(41);o.a.render(i.a.createElement(w,null),document.getElementById("root"))}},[[17,2,1]]]);
//# sourceMappingURL=main.2963e442.chunk.js.map