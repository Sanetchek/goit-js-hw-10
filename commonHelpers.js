import"./assets/styles-235f2952.js";import{f as y,i as b}from"./assets/vendor-77e16229.js";let i=null,u=null;const s=document.querySelector("#datetime-picker"),a=document.querySelector("[data-start]"),C=Date.now(),p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){i=e[0],i.getTime()<C?(b.show({title:"Error",message:"Please choose a date in the future",color:"#ef4040",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",backgroundColor:"#ef4040",image:"/goit-js-hw-10/img/oct.svg",imageWidth:24}),a.setAttribute("disabled",!0)):a.removeAttribute("disabled")}};function d(e){const f=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),h=Math.floor(e%864e5%36e5/6e4),g=Math.floor(e%864e5%36e5%6e4/1e3);return{days:f,hours:m,minutes:h,seconds:g}}function r(e){return String(e).padStart(2,"0")}function l(e){const t=document.querySelector("[data-days]"),o=document.querySelector("[data-hours]"),n=document.querySelector("[data-minutes]"),c=document.querySelector("[data-seconds]");t.textContent=r(e.days),o.textContent=r(e.hours),n.textContent=r(e.minutes),c.textContent=r(e.seconds)}function S(e,t){e.setAttribute("disabled",!0),t.setAttribute("disabled",!0)}function T(e){e.removeAttribute("disabled")}function v(e){S(s,e.currentTarget);let t=i.getTime()-Date.now();const o=d(t);l(o),u=setInterval(()=>{if(t<=999){clearInterval(u),T(s);return}t-=1e3;const n=d(t);l(n)},1e3)}y(s,p);a.addEventListener("click",v);
//# sourceMappingURL=commonHelpers.js.map
