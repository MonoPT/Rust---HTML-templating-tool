import { ref } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        ;this.shadow.innerHTML = `
    <div id="modal">
        <div class="left">
            <wc-login-form></wc-login-form>
        </div>
        <div class="rigth">

        </div>
    </div>
<style>#modal {
  display: flex;
  flex-direction: row;
  min-width: 100px;
  min-height: 100px;
  width: 80vw;
  height: 90vh;
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
}
#modal .left, #modal .rigth {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
}
#modal .rigth {
  background: rgba(214, 117, 255, 0.5), url("https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  border-radius: 0 0.5rem 0.5rem 0;
  background-image: linear-gradient(rgba(214, 117, 255, 0.8), rgba(214, 117, 255, 0.9)), url("https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>`;
    }

    connectedCallback() {
        let document = this.shadow; /*Scopes document object to component */

        ;;
    }
}

customElements.define('wc-modal', MyCustomElement);