import { ref } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        ;this.shadow.innerHTML = `<style></style>`;
    }

    connectedCallback() {
        let document = this.shadow; /*Scopes document object to component */

        ;;
    }
}

customElements.define('wc-teste', MyCustomElement);