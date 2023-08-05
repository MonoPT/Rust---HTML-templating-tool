import { ref } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        /*--ShadowDom--*/
    }

    connectedCallback() {
        let document = this.shadow; /*Scopes document object to component */

        /*--Component Script--*/
    }
}

customElements.define('my-custom-element', MyCustomElement);