!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var o=n(1);window.addEventListener("online",o.checkDB);var r,a=[];function c(){var e=a.reduce((function(e,t){return e+parseInt(t.value)}),0);document.querySelector("#total").textContent=e}function u(){var e=document.querySelector("#tbody");e.innerHTML="",a.forEach((function(t){var n=document.createElement("tr");n.innerHTML="\n      <td>".concat(t.name,"</td>\n      <td>").concat(t.value,"</td>\n    "),e.appendChild(n)}))}function i(){var e=a.slice().reverse(),t=0,n=e.map((function(e){var t=new Date(e.date);return"".concat(t.getMonth()+1,"/").concat(t.getDate(),"/").concat(t.getFullYear())})),o=e.map((function(e){return t+=parseInt(e.value)}));r&&r.destroy();var c=document.getElementById("myChart").getContext("2d");r=new Chart(c,{type:"line",data:{labels:n,datasets:[{label:"Total Over Time",fill:!0,backgroundColor:"#6666ff",data:o}]}})}function l(e){var t=document.querySelector("#t-name"),n=document.querySelector("#t-amount"),r=document.querySelector(".form .error");if(""!==t.value&&""!==n.value){r.textContent="";var l={name:t.value,value:n.value,date:(new Date).toISOString()};e||(l.value*=-1),a.unshift(l),i(),u(),c(),fetch("/api/transaction",{method:"POST",body:JSON.stringify(l),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.errors?r.textContent="Missing Information":(t.value="",n.value="")})).catch((function(e){o.saveRecord(l),t.value="",n.value=""}))}else r.textContent="Missing Information"}fetch("/api/transaction").then((function(e){return e.json()})).then((function(e){a=e,c(),u(),i()})),document.querySelector("#add-btn").onclick=function(){l(!0)},document.querySelector("#sub-btn").onclick=function(){l(!1)}},function(e,t){var n,o=indexedDB.open("budget",1);function r(){var e=n.transaction(["pending"],"readwrite").objectStore("pending").getAll();e.onsuccess=function(){e.result.length>0&&fetch("/api/transaction/bulk",{method:"POST",body:JSON.stringify(e.result),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(){n.transaction(["pending"],"readwrite").objectStore("pending").clear()}))}}o.onupgradeneeded=function(e){e.target.result.createObjectStore("pending",{autoincrement:!0})},o.onsuccess=function(e){n=e.target.result,navigator.onLine&&r()},o.onerror=function(e){console.log(e.target.errorCode)},e.exports={checkDB:r,saveRecord:function(e){n.transaction(["pending"],"readwrite").objectStore("pending").add(e)}}}]);