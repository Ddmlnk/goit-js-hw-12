import{a as E,S as M,i as n}from"./assets/vendor-C1DvvBV_.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const $="33585643-9c58632f9e2f8de5398e8abd3",B="https://pixabay.com/api/",f=15;async function m(t,r=1){return(await E.get(B,{params:{key:$,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:f,page:r}})).data}const g=document.querySelector(".gallery"),p=document.querySelector(".loader"),y=document.querySelector(".load-more"),R=new M(".gallery a",{captionsData:"alt",captionDelay:250});function h(t){const r=t.map(({webformatURL:a,largeImageURL:l,tags:e,likes:o,views:i,comments:P,downloads:q})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${l}">
            <img
              class="gallery-image"
              src="${a}"
              alt="${e}"
              loading="lazy"
            />
          </a>
          <ul class="info">
            <li class="info-item"><b>Likes</b><span>${o}</span></li>
            <li class="info-item"><b>Views</b><span>${i}</span></li>
            <li class="info-item"><b>Comments</b><span>${P}</span></li>
            <li class="info-item"><b>Downloads</b><span>${q}</span></li>
          </ul>
        </li>`).join("");g.insertAdjacentHTML("beforeend",r),R.refresh()}function O(){g.innerHTML=""}function L(){p.classList.add("is-active")}function b(){p.classList.remove("is-active")}function w(){y.classList.remove("is-hidden")}function d(){y.classList.add("is-hidden")}const S=document.querySelector(".form"),x=document.querySelector(".gallery"),A=document.querySelector(".load-more");let c="",s=1,u=0;S.addEventListener("submit",_);A.addEventListener("click",D);async function _(t){t.preventDefault();const r=S.elements["search-text"].value.trim();if(!r){n.warning({message:"Please enter a search query",position:"topRight"});return}c=r,s=1,u=0,O(),d(),L();try{const a=await m(c,s);if(a.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}u=a.totalHits,h(a.hits),v()}catch{n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{b()}}async function D(){d(),L(),s+=1;try{const t=await m(c,s);h(t.hits),H(),v()}catch{s-=1,w(),n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{b()}}function v(){const t=Math.ceil(u/f);s>=t?(d(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):w()}function H(){const t=x.querySelector(".gallery-item");if(!t)return;const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
