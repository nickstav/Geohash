(this.webpackJsonpgeohash=this.webpackJsonpgeohash||[]).push([[0],{10:function(t,e,n){t.exports=n(17)},16:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(8),o=n.n(i),s=n(1),u=n(2),l=n(4),c=n(3);function h(){return r.a.createElement("div",{id:"intro"},r.a.createElement("h2",null,"Welcome to the world of Geohashing!"),r.a.createElement("p",null,"Please select an option from the menu above"),r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Geohash",target:"_blank",rel:"noopener noreferrer"},"(what is Geohashing?)"))}function d(t){return t.isDesktop?r.a.createElement("div",{id:"topBar"},r.a.createElement("h1",null,"GEOHASH")):r.a.createElement("div",{id:"topBar"},r.a.createElement("h1",null,"GEOHASH"),r.a.createElement("button",{className:"menu",onClick:t.toggleMenu}))}var p=window.L;var g=window.L,m=function(t){Object(l.a)(n,t);var e=Object(c.a)(n);function n(t,a){var r;return Object(s.a)(this,n),(r=e.call(this,t)).map=null,r.marker=null,r.label=null,r.polygon=null,r.initialZoomLevel=8,r}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=this.props,e=t.latitude,n=t.longitude,a=t.maxLatitude,r=t.maxLongitude,i=t.minLatitude,o=t.minLongitude,s=t.showResults;this.map=function(t,e){var n=p.map("mapDiv").setView([t,e],1);return p.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(n),n}(e,n),this.marker=function(t,e,n){var a=p.marker([e,n]);return a.addTo(t),a}(this.map,e,n),this.label=this.writeLabel(),this.polygon=g.polygon([[a,o],[a,r],[i,r],[i,o]]),s?(this.polygon.addTo(this.map),this.map.fitBounds(this.polygon.getBounds()),this.marker.bindPopup(this.label).openPopup()):this.map.setZoom(this.initialZoomLevel)}},{key:"componentDidUpdate",value:function(){var t=this.props,e=t.latitude,n=t.longitude,a=t.maxLatitude,r=t.maxLongitude,i=t.minLatitude,o=t.minLongitude,s=t.showResults;this.marker.setLatLng([e,n]),this.polygon.setLatLngs([[a,o],[a,r],[i,r],[i,o]]),this.label=this.writeLabel(),s&&(this.polygon.addTo(this.map),this.map.fitBounds(this.polygon.getBounds()),this.marker.bindPopup(this.label).openPopup())}},{key:"writeLabel",value:function(){var t=this.props,e=t.label,n=t.latitude,a=t.longitude;return"userString"===e?"estimated location: ".concat(n.toFixed(2),"\xb0, \n                ").concat(a.toFixed(2),"\xb0"):null!==e?"Geohash string for current location: <b>".concat(e,"</b>"):null===e?"Getting string... (try pressing submit again)":"Error getting label"}},{key:"render",value:function(){return r.a.createElement("div",{id:"mapHolder"},r.a.createElement("div",{id:"mapFrame"},r.a.createElement("div",{id:"mapDiv"})))}}]),n}(r.a.Component),f=n(9);function v(t){var e=function(t){var e,n="",a=Object(f.a)(t);try{for(a.s();!(e=a.n()).done;){var r=e.value,i=b(r);if(null===i)return alert('Error: "'.concat(r,'" is not a valid character for Geohashing.')),null;n+=i}}catch(o){a.e(o)}finally{a.f()}return function(t){for(var e="",n="",a=0;a<t.length;a++)0===a||a%2===0?n+=t[a]:e+=t[a];return{latitude:e,longitude:n}}(n)}(t);if(null===e)return null;var n=L(e.latitude,[-90,0,90]),a=L(e.longitude,[-180,0,180]);return{minLatitude:n.min,maxLatitude:n.max,averageLatitude:n.average,minLongitude:a.min,maxLongitude:a.max,averageLongitude:a.average}}function b(t){var e="0123456789bcdefghjkmnpqrstuvwxyz".indexOf(t);return-1===e?null:function(t){var e=t.toString(2);for(;e.length<5;)e="0"+e;return e}(e)}function L(t,e){for(var n=0;n<t.length;n++){"0"===t[n]?e.pop():e.shift();var a=(e[0]+e[1])/2;e.splice(1,0,a)}return{min:e[0],max:e[2],average:e[1]}}function y(){var t,e=new URLSearchParams(window.location.search);return(t=e).has("string")?t.get("string"):(t.toString().length>1&&alert('Error: URL parameter could not be found. Please ensure url path is of the form "?string=..."'),"")}var E=function(t){Object(l.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(s.a)(this,n),(a=e.call(this,t)).updateString=function(t){a.setState({string:t.target.value})},a.getGeohash=function(){if(a.state.string.length>0&&a.state.string.length<2||a.state.string.length>12)alert("Error: Please enter a string of length 2-12 characters");else{var t=v(a.state.string);null!==t&&(a.setState({showMap:!0,coords:t}),function(t){var e=new URLSearchParams(window.location.search);e.set("string",t),window.history.replaceState(null,null,"?"+e.toString())}(a.state.string))}},a.state={string:a.props.string,coords:null,showMap:!1},a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.props.string.length>0&&this.getGeohash()}},{key:"renderMap",value:function(){if(this.state.showMap)return r.a.createElement(m,{latitude:this.state.coords.averageLatitude,longitude:this.state.coords.averageLongitude,minLatitude:this.state.coords.minLatitude,maxLatitude:this.state.coords.maxLatitude,minLongitude:this.state.coords.minLongitude,maxLongitude:this.state.coords.maxLongitude,label:"userString",showResults:!0})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"options"},r.a.createElement("h2",null,"Find a location"),r.a.createElement("p",null,"Enter a 2-12 character string using the Geohash alphabet:"),r.a.createElement("p",{className:"instructions"},"The Geohash alphabet [32ghs] uses all digits 0-9 and almost all ",r.a.createElement("b",null,"lower case")," letters except a, i, l and o."),r.a.createElement("div",{id:"textInputWrapper"},r.a.createElement("input",{value:this.state.string,type:"text",size:"12",onChange:this.updateString,fontSize:"50"})),r.a.createElement("div",{id:"buttonWrapper"},r.a.createElement("input",{type:"button",value:"Submit",onClick:this.getGeohash}))),this.renderMap())}}]),n}(r.a.Component),w=n(5),k=n.n(w),S=n(6);function x(){return O.apply(this,arguments)}function O(){return(O=Object(S.a)(k.a.mark((function t(){var e;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!navigator.geolocation){t.next=8;break}return console.log("geolocation available"),t.next=4,M();case 4:return e=t.sent,t.abrupt("return",{latitude:e.coords.latitude,longitude:e.coords.longitude});case 8:return console.log("geolocation not available"),t.abrupt("return",null);case 10:case 12:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function M(){try{return new Promise((function(t,e){navigator.geolocation.getCurrentPosition(t,e)}))}catch(t){console.error(t)}}function j(t,e){var n=5*t,a=45/Math.pow(2,Math.floor(n/2)),r=90/Math.pow(2,Math.round(n/2));return"lat"===e?a:"long"===e?r:void 0}function F(t,e){if(null===t)return null;var n=e,a=G(t.latitude,[-90,0,90],n);return function(t){for(var e=[],n=[],a=t.join(""),r=0;r<a.length;r+=5){var i=a.substring(r,r+5);e.push(i)}for(var o=0;o<e.length;o++){var s=parseInt(e[o],2);n.push(s)}return function(t){for(var e="",n=0;n<t.length;n++)e+="0123456789bcdefghjkmnpqrstuvwxyz".charAt(t[n]);return e}(n)}(function(t,e){for(var n=Math.min(t.length,e.length),a=[],r=0;r<n;r++)a.push(t[r],e[r]);(t.length+e.length)%2!==0&&a.push(t[t.length-1]);return a}(G(t.longitude,[-180,0,180],n),a))}function G(t,e,n){for(var a=[],r=function(t,e){if(-90===e[0])return Math.floor(t/2);if(-180===e[0])return Math.round(t/2)}(5*n,e),i=0;i<r;i++){t<e[1]?(a.push("0"),e.pop()):t>e[1]&&(a.push("1"),e.shift());var o=(e[0]+e[1])/2;e.splice(1,0,o)}return a}var D=function(t){Object(l.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(s.a)(this,n),(a=e.call(this,t)).setCharacterLength=function(t){a.setState({stringLength:t.target.value})},a.getString=function(){null===a.state.UserLocation?alert("User location not found - please wait a few seconds and try again (if the problem persists, check that your location can be shared"):a.setState({string:F(a.state.userLocation,a.state.stringLength),latAccuracy:j(a.state.stringLength,"lat"),longAccuracy:j(a.state.stringLength,"long"),requestSubmitted:!0})},a.state={stringLength:6,string:null,userLocation:null,latAccuracy:0,longAccuracy:0,requestSubmitted:!1},a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=Object(S.a)(k.a.mark((function t(){var e;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x();case 2:e=t.sent,this.setState({userLocation:e});case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"renderMap",value:function(){return null===this.state.userLocation||null===this.state.string?r.a.createElement("div",{id:"loadingState"},r.a.createElement("p",{className:"loadingText"},"Finding location...")):r.a.createElement(m,{latitude:this.state.userLocation.latitude,longitude:this.state.userLocation.longitude,minLatitude:this.state.userLocation.latitude-this.state.latAccuracy,maxLatitude:this.state.userLocation.latitude+this.state.latAccuracy,minLongitude:this.state.userLocation.longitude-this.state.longAccuracy,maxLongitude:this.state.userLocation.longitude+this.state.longAccuracy,label:this.state.string,showResults:this.state.requestSubmitted})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"options"},r.a.createElement("h2",null,"Get your location"),r.a.createElement("p",null,'Select the accuracy (i.e. string length) and click "submit" to Geohash your current location'),r.a.createElement("div",{id:"stringLength"},r.a.createElement("label",{className:"stringLength"},r.a.createElement("input",{type:"range",className:"slider",min:"2",max:"12",step:"1",defaultValue:"6",onInput:this.setCharacterLength}),"String length: ",this.state.stringLength," characters")),r.a.createElement("div",{id:"buttonWrapper"},r.a.createElement("input",{type:"button",value:"Submit",onClick:this.getString}))),this.renderMap())}}]),n}(r.a.Component);function A(){return!!window.matchMedia("(min-width: 768px)").matches}var C=function(t){Object(l.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(s.a)(this,n),(a=e.call(this,t)).updateDimensions=function(){a.setState({isDesktop:A()})},a.changeFunction=function(t){a.setState({function:t.target.value,menuOpen:!a.state.menuOpen,appStarted:!0})},a.toggleMenu=function(){a.setState({menuOpen:!a.state.menuOpen})},a.state={isDesktop:A(),urlQuery:y(),function:"",menuOpen:!1,appStarted:!1},a}return Object(u.a)(n,[{key:"checkForURLQuery",value:function(){""!==this.state.urlQuery&&this.setState({function:"userInput",appStarted:!0})}},{key:"componentDidMount",value:function(){this.checkForURLQuery(),window.addEventListener("resize",this.updateDimensions)}},{key:"switchAppFunction",value:function(){return"userInput"===this.state.function?r.a.createElement(E,{string:this.state.urlQuery}):"userLocation"===this.state.function?r.a.createElement(D,null):void 0}},{key:"renderMenu",value:function(){if(this.state.menuOpen||this.state.isDesktop)return r.a.createElement("div",{id:"appOptions",onChange:this.changeFunction},r.a.createElement("label",null,"Enter a custom Geohash string",r.a.createElement("br",null),r.a.createElement("input",{type:"radio",value:"userInput",name:"selectFunction"})),r.a.createElement("label",null,"Find your current location",r.a.createElement("br",null),r.a.createElement("input",{type:"radio",value:"userLocation",name:"selectFunction"})))}},{key:"renderSplash",value:function(){if(!this.state.appStarted)return r.a.createElement(h,null)}},{key:"render",value:function(){return r.a.createElement("div",{id:"wrapper"},r.a.createElement(d,{isDesktop:this.state.isDesktop,toggleMenu:this.toggleMenu}),this.renderMenu(),this.renderSplash(),r.a.createElement("div",{id:"userInterface"},this.switchAppFunction()))}}]),n}(r.a.Component);n(16);o.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.0c57c8eb.chunk.js.map