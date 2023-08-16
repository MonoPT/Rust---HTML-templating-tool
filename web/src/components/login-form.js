import { ref, createStore, getStore } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        ;this.shadow.innerHTML = `
    <div id="form-container">
        <div class="wrapper">
            <h1>Bem-vindo de volta.  <span style='all: unset' class='reactive-el-fb264552-ddaa-44fe-9387-e4dbf8d1c52c' dynproperty='value'>{  2 * 5  }</span> </h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sint fugit reprehenderit.</p>
            <form action="" onsubmit="event.preventDefault()">
                <span>Endereço de E-mail</span>
                <input type="text" placeholder="">

                <span>Palavra-passe</span>
                <input type="password" name="" id="" placeholder="">

                <div class="group-flex">
                    <div class=' group rememberCheckBox reactive-event-b94cdaba-9080-4efc-b174-ef830c75ed55'    >
                        <input type="checkbox" style="pointer-events: none;"><span>Manter sessão iniciada</span>
                    </div>
                    <div class="btn-container">
                        <button class=' reactive-event-1f853d6a-abbe-44b6-902d-d3b6759fb10f'  >Login</button>
                    </div>
                    
                </div>
            </form>
            
        </div>
    </div>
<style>@charset "UTF-8";
form {
  padding-top: 1rem;
}
form span {
  display: block;
  margin-top: 1.5rem;
  padding-block: 0.2rem;
  font-size: 1rem;
  color: #757575;
}
form .group-flex {
  display: flex;
  align-items: center;
  padding-top: 2rem;
  place-content: flex-end;
}
form input[type=text], form input[type=password] {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  border: none;
  border-bottom: 2px solid rgb(233, 233, 233);
  transition: 0.2s;
}
form input[type=text]::after, form input[type=text]::before, form input[type=text]:focus, form input[type=password]::after, form input[type=password]::before, form input[type=password]:focus {
  outline: none;
}
form input[type=text]:focus, form input[type=text]:not(:placeholder-shown), form input[type=password]:focus, form input[type=password]:not(:placeholder-shown) {
  border-color: rgb(214, 117, 255);
  transition: 0.2s;
}
form .btn-container {
  display: inline-block;
  margin-left: 2rem;
}
form .btn-container button {
  appearance: none;
  all: unset;
  cursor: pointer;
  background: rgb(214, 117, 255);
  color: #fff;
  padding-inline: 1rem;
  padding-block: 0.45rem;
  display: block;
  border-radius: 1200px;
  width: max-content;
  transition: 0.2s;
  font-size: 1.2rem;
}
form .btn-container button::after {
  content: "🡢";
  display: inline-block;
  padding-left: 2rem;
}
form .btn-container button:hover {
  background-color: rgb(226, 157, 255);
}
form .group {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
}
form .group.rememberCheckBox {
  cursor: pointer;
}
form .group span {
  all: unset;
  font-size: 0.85rem;
}
form .group input[type=checkbox] {
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: black;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid transparent;
  border-radius: 0.15em;
  background-color: #e3e3e3;
  transform: translateY(-0.075em);
  cursor: pointer;
  margin-right: 0.6rem;
  position: relative;
}
form .group input[type=checkbox]:checked::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: rgb(148, 48, 191);
  transition: 0.2s;
  border-radius: 0.15em;
  animation: grow 0.15s;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}
@keyframes grow {
  0% {
    scale: 0;
  }
  100% {
    scale: 1;
  }
}

h1, p {
  margin-block: 0.6rem;
}

h1 {
  color: rgb(148, 48, 191);
  font-weight: 600;
  font-size: 2.5rem;
}

p {
  font-size: 1rem;
}

#form-container {
  display: grid;
  width: 100%;
  height: 100%;
  place-content: center left;
}
#form-container .wrapper {
  padding-inline: 4rem;
}
</style>`;
    }

    connectedCallback() {
        const document = this.shadow; /*Scopes document object to component */
        const document_fragment_RL_M_ = this;

        ;var toggleRememberCheckbox = function () {
    var checkbox = document.querySelector(".rememberCheckBox input[type='checkbox']");
    checkbox.checked = !checkbox.checked;
};
var fakeLogin = function () {
    nome.value = "User";
};
 var nome = getStore("userName", '7d15a346-ab82-44b6-9b2d-f7d07d9b3a3c', document_fragment_RL_M_) ;
;
            if(document.contains(document.querySelector('.reactive-el-fb264552-ddaa-44fe-9387-e4dbf8d1c52c')) && !document.querySelector('.reactive-el-fb264552-ddaa-44fe-9387-e4dbf8d1c52c').hasAttribute('DynVarTracked')) {
                document.querySelector('.reactive-el-fb264552-ddaa-44fe-9387-e4dbf8d1c52c').textContent =  2 * 5 
            }
        if(document.contains(document.querySelector('.reactive-event-1f853d6a-abbe-44b6-902d-d3b6759fb10f'))) { document.querySelector('.reactive-event-1f853d6a-abbe-44b6-902d-d3b6759fb10f').addEventListener('click', function() { fakeLogin(); } ) }if(document.contains(document.querySelector('.reactive-event-b94cdaba-9080-4efc-b174-ef830c75ed55'))) { document.querySelector('.reactive-event-b94cdaba-9080-4efc-b174-ef830c75ed55').addEventListener('click', function() { toggleRememberCheckbox(); } ) };
    }
}

customElements.define('wc-login-form', MyCustomElement);