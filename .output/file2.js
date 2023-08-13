import { ref } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        ;this.shadow.innerHTML = `
    <div id="form-container">
        <div class="wrapper">
            <h1>Bem-vindo de volta</h1>
            <p>Lorem ipsdudm doloddddddddddr sit amet consectetur adipisicing elit. Obcaecati sint fugit reprehenderit.</p>
            <form action="">
                <span>Enderddedddddço de E-mail</span>
                <input type="text" placeholder="">

                <span>Palavra-passe</span>
                <input type="password" name="" id="" placeholder="">

                <div class=' group rememberCheckBox reactive-event-f4086142-5fb1-4d5a-8e6a-b9e4fecd140f'    >
                    <input type="checkbox" style="pointer-events: none;"><span>Manter sessão iniciada</span>
                </div>
                <div class="btn-container">
                    <button>Loddddasdn</button>
                </div>
            </form>
        </div>
    </div>
<style>form {
  padding-top: 1rem;
}
form span {
  display: block;
  margin-top: 1.5rem;
  padding-block: 0.2rem;
  font-size: 1rem;
  color: #757575;
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
  width: max-content;
}
form .group {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  padding-top: 2rem;
  width: max-content;
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
        let document = this.shadow; /*Scopes document object to component */

        ;var toggleRememberCheckbox = function () {
    var checkbox = document.querySelector(".rememberCheckBox input[type='checkbox']");
    checkbox.checked = !checkbox.checked;
};
if(document.contains(document.querySelector('.reactive-event-f4086142-5fb1-4d5a-8e6a-b9e4fecd140f'))) { document.querySelector('.reactive-event-f4086142-5fb1-4d5a-8e6a-b9e4fecd140f').addEventListener('click', function() { toggleRememberCheckbox(); } ) };
    }
}

customElements.define('wc-file2', MyCustomElement);