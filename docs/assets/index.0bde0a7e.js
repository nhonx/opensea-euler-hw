var e=Object.defineProperty,t=Object.defineProperties,l=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,o=(t,l,a)=>l in t?e(t,l,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[l]=a,s=(e,t)=>{for(var l in t||(t={}))r.call(t,l)&&o(e,l,t[l]);if(a)for(var l of a(t))n.call(t,l)&&o(e,l,t[l]);return e},c=(e,a)=>t(e,l(a));"undefined"!=typeof require&&require;import{R as i,a as m,l as d,b as u}from"./vendor.5e469b5f.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const l of e)if("childList"===l.type)for(const e of l.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const p=i.createContext(),E=i.createContext(),g="StartLoadMedia",f="StartReloadMedia",v="LoadMediaSuccessful",y="ReloadMediaSuccessful",N="LoadMediaFailed",h="UpdateSortFilter",b="SetCollectionList",L="FilterByCollection",C=({children:e})=>{let t={};const{state:l,dispatch:a}=i.useContext(p),{sortBy:r,sortDirection:n,collection:o}=l.sortFilter;return t.loadPage=(e,t=!1)=>{a(t?{type:f}:{type:g}),console.log("load page "+e);const l=((e,t,l,a)=>{let r="https://api.opensea.io/api/v1/assets?limit=20&offset="+20*(e-1);if(t||a)return r+(t&&l?`&order_by=${t}&order_direction=${l}`:"")+(a?`&collection=${a}`:"");return r})(e,r,n,o);m.get(l,{}).then((({data:l})=>{l.assets.length>0?a(t?{type:y,pageNum:1,mediaList:l.assets}:{type:v,pageNum:e,mediaList:l.assets}):a({type:N,error:{msg:"No media found."}})})).catch((e=>{console.log("Error",e),a({type:N,error:{msg:"No media found."}})}))},t.loadCollections=()=>{console.log("load collection ");m.get("https://api.opensea.io/api/v1/collections?offset=0&limit=300",{}).then((({data:e})=>{let t=e.collections.map((e=>({slug:e.slug,name:e.name})));e.collections.length>0&&a({type:b,collections:t})})).catch((e=>{console.log("Error",e)}))},t.updateSortFilter=(e,t,l,r,n)=>{a({type:h,sortBy:e,sortDirection:t,filterBy:l,filterValue:r,collection:n})},t.filterByCollection=e=>{let t=[...l.collections];0==t.filter((t=>t.slug===e.slug)).length&&t.push(e),a({type:L,collection:e.slug,collections:t})},i.createElement(E.Provider,{value:t},e)},B=(e,t)=>{switch(t.type){case g:return console.log("Start fetch..."),c(s({},e),{isLoading:!0});case f:return console.log("Start fetch..."),c(s({},e),{isLoading:!0,mediaList:[]});case y:return console.log("End fetch...Reload state"),c(s({},e),{isLoading:!1,currentPage:t.pageNum,mediaList:t.mediaList});case v:{if(console.log("End fetch...Assign state"),t.pageNum===e.currentPage)return console.log("End fetch...Dup state"),c(s({},e),{isLoading:!1});let l=e.mediaList.concat(t.mediaList);return c(s({},e),{isLoading:!1,currentPage:t.pageNum,mediaList:l})}case N:return console.log("End fetch...Error"),c(s({},e),{error:t.error,isLoading:!1});case h:return c(s({},e),{sortFilter:c(s({},e.sortFilter),{sortBy:t.sortBy,sortDirection:t.sortDirection,collection:t.collection})});case b:return c(s({},e),{collections:t.collections});case L:return c(s({},e),{collections:t.collections,sortFilter:c(s({},e.sortFilter),{collection:t.collection})});default:throw new Error}},D=({src:e,thumb:t,mediaType:l})=>{switch(l){case"IMAGE":return i.createElement("img",{src:e});case"VIDEO":return i.createElement("video",{preload:"none",poster:t,controls:!0},i.createElement("source",{src:e,type:"video/mp4"}))}return null},S=(e,t)=>e.length>t?e.substr(0,t)+"...":e,w=({media:e})=>{const{filterByCollection:t}=i.useContext(E),l=e.description?S(e.description,36):"",a=e.name?S(e.name,12):"Unnamed",r=`https://opensea.io/collection/${e.collection.slug}`;return i.createElement("div",{className:"media-card"},i.createElement("div",{className:"media-desc"},i.createElement("div",{className:"desc"},i.createElement("div",{className:"assets-title"},i.createElement("p",{className:"collection-name"},i.createElement("span",{className:"collection-filter",onClick:()=>{return l={slug:e.collection.slug,name:e.collection.name},console.log(l),void t(l);var l}},e.collection.name),i.createElement("a",{href:r,target:"_blank"},i.createElement("i",{className:"fa fas fa-external-link "}))),i.createElement("span",null,i.createElement("b",null,i.createElement("a",{href:e.permalink,target:"_blank"},a)))),i.createElement("div",{className:"caption"},i.createElement("p",null,l||"  ")))),i.createElement("div",{className:"thumb"},i.createElement(D,{src:e.image_url||"https://via.placeholder.com/200",thumb:e.image_thumbnail_url,alt:e.description,mediaType:"IMAGE"})),i.createElement("div",{className:"metadata"},i.createElement("span",null,"Sales: ",i.createElement("strong",null,e.num_sales))))},F=({mediaList:e})=>{const t=i.useRef(),{state:l,dispatch:a}=i.useContext(p),{loadPage:r}=i.useContext(E),n=()=>{0==l.isLoading&&(a({type:"StartLoadMedia"}),setTimeout((()=>{r(l.currentPage+1)}),300))};i.useEffect((()=>{r(1)}),[]),i.useEffect((()=>{console.log("filter",l.sortFilter),r(1,!0)}),[l.sortFilter]);return i.useEffect((()=>{const e=e=>{((e=0)=>{if(!t.current)return!1;const l=t.current.getBoundingClientRect().bottom-20;return l+e>=0&&l-e<=window.innerHeight})()&&n()};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)}),[n]),i.createElement("div",{className:"media-card-list"},e.map((e=>i.createElement(w,{key:e.id,media:e}))),i.createElement("div",{className:"msg "+(l.isLoading||e&&e.length>0?"is-hidden":"")},"No assets found."),i.createElement("div",{className:"media-card last-anchor",ref:t}))},P=()=>{const{state:e}=i.useContext(p),{updateSortFilter:t,loadCollections:l}=i.useContext(E),[a,r]=i.useState({sortBy:e.sortFilter.sortBy,sortDir:e.sortFilter.sortDirection,filterBy:"authorName",filterValue:"",collection:e.sortFilter.collection});i.useEffect((()=>{l()}),[]),i.useEffect((()=>{e.sortBy===a.sortBy&&e.sortDirection===a.sortDir&&e.filterValue===a.filterValue||d.exports.debounce((()=>{t(a.sortBy,a.sortDir,a.filterBy,a.filterValue,a.collection)}),300)()}),[a]);const n=e=>{console.log(e.target.name);let t=s({},a);t[e.target.name]=e.target.value,r(t)};return i.createElement("div",{className:"box filter-sort"},i.createElement("div",{className:"field is-grouped"},i.createElement("div",{className:"field is-horizontal"},i.createElement("div",{className:"field-label is-normal"},i.createElement("label",{className:"label"},"Sort by")),i.createElement("div",{className:"field-body"},i.createElement("div",{className:"field"},i.createElement("div",{className:"control"},i.createElement("div",{className:"select is-fullwidth"},i.createElement("select",{name:"sortBy",value:a.sortBy,onChange:n},i.createElement("option",{value:""},"Default"),i.createElement("option",{value:"sale_date"},"Last Sale Date"),i.createElement("option",{value:"sale_price"},"Price"),i.createElement("option",{value:"sale_count"},"Sale Count"))))),i.createElement("div",{className:"field"},i.createElement("div",{className:"control"},i.createElement("div",{className:"select is-fullwidth"},i.createElement("select",{name:"sortDir",value:a.sortDir,onChange:n},i.createElement("option",{value:"desc"},"Descending"),i.createElement("option",{value:"asc"},"Ascending"))))))),i.createElement("div",{className:"field is-horizontal"},i.createElement("div",{className:"field-label is-normal"},i.createElement("label",{className:"label"},"Collections")),i.createElement("div",{className:"field-body"},i.createElement("div",{className:"field"},i.createElement("div",{className:"control"},i.createElement("div",{className:"select is-fullwidth"},i.createElement("select",{name:"collection",value:e.sortFilter.collection,onChange:n},i.createElement("option",{value:""},"All"),e.collections.map((e=>i.createElement("option",{key:e.slug,value:e.slug},e.name)))))))))))},x=()=>i.createElement("nav",{className:"nav"},i.createElement("div",{className:"container"},i.createElement("div",{className:"nav-left"},i.createElement("a",{className:"nav-item"}," ",i.createElement("b",null,"NHONDINH")," ")),i.createElement("label",{htmlFor:"menu-toggle",className:"nav-toggle"},i.createElement("span",null)," ",i.createElement("span",null)," ",i.createElement("span",null)),i.createElement("input",{type:"checkbox",id:"menu-toggle",className:"is-hidden"}),i.createElement("div",{className:"nav-right nav-menu"},i.createElement("a",{className:"nav-item"}," Help ")," ",i.createElement("a",{className:"nav-item"}," About ")))),O={mediaList:[],isLoading:!0,currentPage:0,error:null,collections:[],sortFilter:{sortBy:"",sortDirection:"desc",collection:""}},_=()=>{const[e,t]=i.useReducer(B,O);return console.log(e),i.createElement(p.Provider,{value:{state:e,dispatch:t}},i.createElement(C,null,i.createElement(x,null),i.createElement("div",{className:"container media-container"},i.createElement(P,null),i.createElement(F,{mediaList:e.mediaList}),i.createElement("div",{className:"loading "+(e.isLoading?"":"is-hidden")},i.createElement("img",{src:"https://miro.medium.com/max/1600/0*ptDX0HfJCYpo9Pcs.gif"})))))};u.render(i.createElement(i.StrictMode,null,i.createElement(_,null)),document.getElementById("root"));