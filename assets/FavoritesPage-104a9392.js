import{d as f,o as c,c as F,a as l,t as k,b as S,e as d,w as y,W as b,C as x,p as D,f as N,_ as W,u as w,r as m,g as B,h as p,D as I,i as J,j as O,F as V,k as $}from"./index-9be7bdfa.js";const E=s=>(D("data-v-be8156db"),s=s(),N(),s),P={class:"favorite-section"},j={class:"favorite-section__header header"},G={class:"header__name ellipsis"},H=E(()=>l("i",{class:"fa fa-star"},null,-1)),L=f({__name:"FavoriteCity",props:{item:null},emits:["removeFromFavorites"],setup(s){return(r,n)=>(c(),F("section",P,[l("div",j,[l("h4",G,k(s.item.city.name),1),l("button",{class:"favorite-section__btn",onClick:n[0]||(n[0]=a=>r.$emit("removeFromFavorites",s.item.city.id))},[H,S(" Удалить из Избранного ")])]),d(x,{list:s.item.list},{item:y(({item:a})=>[d(b,{item:a},null,8,["item"])]),_:1},8,["list"])]))}});const M=W(L,[["__scopeId","data-v-be8156db"]]),T=f({__name:"FavoritesPage",setup(s){const{favoritesStorage:r,removeFavorite:n}=w(),a=m([]),i=m([]),h=async e=>{const t=o=>$(o);return Promise.allSettled(e.map(t)).then(o=>o.forEach(v=>{if(v.status==="fulfilled"){const _=v.value;a.value.push(_.data),i.value.push(_.data)}}))},C=e=>{n(e),i.value=i.value.filter(t=>t.city.id!==e),a.value=a.value.filter(t=>t.city.id!==e)},u=()=>{a.value=JSON.parse(JSON.stringify(i.value)).map(e=>(e.list=J(e.list.map(t=>(t.dt_txt=t.dt_txt.split(" ")[1],t))),e))},g=()=>{a.value=JSON.parse(JSON.stringify(i.value))};return B(()=>{r.value&&h(r.value).then(u)}),(e,t)=>(c(),p(I,{onClickDay:u,onClickWeek:g},{default:y(()=>[(c(!0),F(V,null,O(a.value,o=>(c(),p(M,{key:o.city.id,item:o,onRemoveFromFavorites:C},null,8,["item"]))),128))]),_:1}))}});export{T as default};