"use strict";let menu=document.querySelector(".menu"),dataFromServer=document.querySelector("#dataFromServer"),btnSend=document.querySelector("#sendRequest"),btnFetch=document.querySelector("#sendFetch"),btnReset=document.querySelector("#reset"),urlUsers="https://jsonplaceholder.typicode.com/users",urlPosts="https://jsonplaceholder.typicode.com/posts",urlComments="https://jsonplaceholder.typicode.com/comments";function xhr(e,t){return new Promise((o,s)=>{let n=new XMLHttpRequest;n.open(e,t),n.responseType="json",n.setRequestHeader("Content-type","application/json"),n.send(),console.log(n),n.onload=(()=>o(n)),n.oneerror=s})}function usersLoad(e={}){console.log(e),200!==e.status?console.log(`Error ${e.status}: ${e.statusText}`):(console.log(`Done, load ${e.response.length} elements`),createUsers(e.response),xhr("GET",urlPosts).then(e=>postsLoad(e)).then(()=>console.log("PROMISE ETO TEMA")))}function postsLoad(e={}){200!==e.status?console.log(`Error ${e.status}: ${e.statusText}`):(console.log(`Done, load ${e.response.length} elements`),createPosts(e.response),xhr("GET",urlComments).then(e=>commentsLoad(e)))}function commentsLoad(e={}){200!==e.status?console.log(`Error ${e.status}: ${e.statusText}`):(console.log(`Done, load ${e.response.length} elements`),createComments(e.response))}function createUsers(e){console.log(e),e.forEach(e=>{let t=document.createElement("li"),o=document.createElement("ul");o.classList.add("submenu"),t.classList.add("menu__item"),t.setAttribute("data-id",e.id),t.innerText=e.name,t.append(o),dataFromServer.append(t)})}function createPosts(e){console.log(e),e.forEach(e=>{let t=document.querySelector(`[data-id="${e.userId}"]`).querySelector("ul"),o=document.createElement("li");o.setAttribute("data-post-id",e.id),o.innerText=e.title,t.append(o);let s=document.createElement("ul");s.classList.add("submenu"),o.append(s)})}function createComments(e){console.log(e),e.forEach(e=>{let t=document.querySelector(`[data-post-id="${e.postId}"]`).querySelector("ul"),o=document.createElement("li");o.innerText=`${e.name} / ${e.body}`,t.append(o)})}function clearAll(e){for(;e.firstChild;)e.firstChild.remove()}btnFetch.addEventListener("click",()=>{clearAll(dataFromServer),fetch(urlUsers).then(e=>e.json()).then(e=>createUsers(e)).then(()=>fetch(urlPosts)).then(e=>e.json()).then(e=>createPosts(e)).then(()=>fetch(urlComments)).then(e=>e.json()).then(e=>createComments(e))}),btnReset.addEventListener("click",()=>{clearAll(dataFromServer)}),btnSend.addEventListener("click",()=>{clearAll(dataFromServer),xhr("GET",urlUsers).then(e=>usersLoad(e))}),menu.addEventListener("click",e=>{let{target:t}=e,o=t.querySelector(".submenu"),s=menu.querySelectorAll(".submenu.open");if("menu__item"===o.parentElement.classList.value)for(let e=0;e<s.length;e++)o!==s[e]&&s[e].classList.remove("open");o&&o.classList.toggle("open")});