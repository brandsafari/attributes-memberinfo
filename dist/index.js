(()=>{var i=class{constructor({email:o,name:e,acceptCommunications:r}){this.email=o,this.name=e,this.acceptCommunications=r}};function l(){return new Promise((t,o)=>{let e=document.createElement("iframe");e.src="/user-account",e.width="0",e.height="0",e.style.display="none",document.body.appendChild(e),e.addEventListener("load",()=>{let r=e.contentWindow,c=r.document.getElementById("wf-user-account-email"),n=r.document.getElementById("wf-user-account-name"),u=r.document.getElementById("wf-user-account-accept-communications"),a=setInterval(async()=>{if(console.log("check"),!c.value||!n.value)return;let d=new i({email:c.value,name:n.value,acceptCommunications:u.checked});clearInterval(a),t(d)},10);setTimeout(()=>{clearInterval(a),o("Could not get user data")},1200)})})}function m(){return f("wf_loggedin")==="true"}function f(t){let o=t+"=",r=decodeURIComponent(document.cookie).split(";");for(let c=0;c<r.length;c++){let n=r[c];for(;n.charAt(0)===" ";)n=n.substring(1);if(n.indexOf(o)===0)return n.substring(o.length,n.length)}return null}var g=Array.from(document.querySelectorAll("[brs-memberinfo=email]")),h=Array.from(document.querySelectorAll("[brs-memberinfo=name]")),s="brsUserData";window.Webflow||(window.Webflow=[]);window.Webflow.push(async()=>{if(console.log("Login script runs"),window.location.href.includes("/user-account"))return;if(!m()){localStorage.removeItem(s);return}let t,o=localStorage.getItem(s);if(o)t=new i(JSON.parse(o));else try{t=await l(),localStorage.setItem(s,JSON.stringify(t))}catch(e){console.log(e)}console.log(t),g.forEach(e=>e.innerText=t.email),h.forEach(e=>e.innerText=t.name)});})();