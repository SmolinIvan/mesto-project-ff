(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),document.addEventListener("click",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),document.removeEventListener("click",r)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup_is-opened"))&&t(document.querySelector(".popup_is-opened"))}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-29",headers:{authorization:"2e254f23-30e8-4665-ac00-f8c493e23e7d","Content-Type":"application/json"}};function c(){return fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return e.json()}))}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function a(e,t,n,r,o,c,a,u){var l=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0);l.querySelector(".card__title").textContent=e,l.querySelector(".card__image").setAttribute("src",t),l.querySelector(".card__like-counter").textContent=u.length;var s,d=l.querySelector(".card__image"),f=l.querySelector(".card__like-button"),p=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return i(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,a=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){u=!0,c=e},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw c}}}}(u);try{for(p.s();!(s=p.n()).done;)if(-1!=s.value._id.indexOf(a)){f.classList.add("card__like-button_is-active");break}}catch(e){p.e(e)}finally{p.f()}return d.addEventListener("click",(function(){return o(t,e)})),f.addEventListener("click",(function(){n(f,l,c,a)})),l.querySelector(".card__delete-button").addEventListener("click",(function(){r(l,c,a)})),l}function u(e,t,n,r){c().then((function(c){var i;c.find((function(e){return e._id==n})).likes.find((function(e){return e._id==r}))?((i=n,fetch("".concat(o.baseUrl,"/cards/likes/").concat(i),{method:"DELETE",headers:o.headers}).then((function(e){return e.json()}))).then((function(e){return t.querySelector(".card__like-counter").textContent=e.likes.length})),e.classList.remove("card__like-button_is-active")):(function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then((function(e){return e.json()}))}(n).then((function(e){return t.querySelector(".card__like-counter").textContent=e.likes.length})),e.classList.add("card__like-button_is-active"))}))}function l(e,t,n){c().then((function(e){var r;e.find((function(e){return e._owner==n})),r=t,fetch("".concat(o.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:o.headers}).then((function(e){return e.json()}))})),e.remove()}function s(e){var t=e.formSelector,n=e.formInput,r=e.inputErrorClass,o=e.errorClass,c=e.buttonSelector,i=e.buttonInactiveClass,a=document.querySelector(t),u=a.querySelector(c);a.addEventListener("submit",(function(e){e.preventDefault()}));var l=Array.from(a.querySelectorAll(n));l.forEach((function(e){e.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity("Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы"):t.setCustomValidity(""),t.validity.valid?d(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.name,"-error"));t.classList.add(r),c.classList.add(o),c.textContent=n}(e,t,t.validationMessage,n,r)}(a,e,r,o),f(l,u,i)}))})),f(l,u)}function d(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""}function f(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n),t.disabled=!1):t.classList.add(n)}function p(e,t){t.formSelector;var n=t.formInput,r=t.buttonSelector,o=t.buttonInactiveClass,c=t.inputErrorClass,i=t.errorClass,a=e.querySelector(r);a.classList.add(o),a.disabled=!0,Array.from(e.querySelectorAll(n)).forEach((function(t){d(e,t,c,i)}))}function m(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return v(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){a=!0,c=e},f:function(){try{i||null==n.return||n.return()}finally{if(a)throw c}}}}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var y,_=document.querySelector(".places__list"),h=document.querySelector(".popup_type_edit"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".popup_type_new-card"),q=document.querySelector(".profile__add-button"),L=document.forms["edit-profile"],k=document.forms["new-place"],E={formSelector:".popup_is-opened",formInput:".popup__input",buttonSelector:".popup__button",buttonInactiveClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},g=m(document.querySelectorAll(".popup"));try{for(g.s();!(y=g.n()).done;){var C=y.value;C.addEventListener("click",r),C.classList.add("popup_is-animated")}}catch(e){g.e(e)}finally{g.f()}function A(t,n){var r=document.querySelector(".popup__image"),o=document.querySelector(".popup__caption"),c=document.querySelector(".popup_type_image");r.src=t,o.textContent=n,e(c)}L.addEventListener("submit",(function(e){e.preventDefault();var n=L.elements.name,r=L.elements.description;document.querySelector(".profile__title").textContent=n.value,document.querySelector(".profile__description").textContent=r.value,t(h),L.reset()})),k.addEventListener("submit",(function(e){e.preventDefault();var n=document.querySelector(".popup_is-opened"),r=k.elements["place-name"],c=k.elements.link;(function(e,t){return fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return e.json()}))})(r.value,c.value).then((function(e){var o=a(r.value,c.value,u,l,A,e._id,e.owner._id,[]);_.prepend(o),t(b),p(n,E)}))})),S.addEventListener("click",(function(){L.elements.name.value=document.querySelector(".profile__title").textContent,L.elements.description.value=document.querySelector(".profile__description").textContent,e(h);var t=document.querySelector(".popup_is-opened");s(E),p(t,E)})),q.addEventListener("click",(function(){k.elements["place-name"].value="",k.elements.link.value="",e(b);var t=document.querySelector(".popup_is-opened");s(E),p(t,E)}));var w=[c(),fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return e.json()}))];Promise.all(w).then((function(e){var t,n=e[0],r=e[1],o=m(n);try{for(o.s();!(t=o.n()).done;){var c=t.value,i=c.likes,s=a(c.name,c.link,u,l,A,c._id,r._id,i);c.owner._id!=r._id&&s.querySelector(".card__delete-button").remove(),_.append(s)}}catch(e){o.e(e)}finally{o.f()}L.tex=r.name,L.elements.description.value=r.about}))})();