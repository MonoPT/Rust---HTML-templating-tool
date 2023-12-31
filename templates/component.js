import { ref, createStore, getStore } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        /*--ShadowDom--*/
    }

    connectedCallback() {
        const document = this.shadow; /*Scopes document object to component */
        const document_fragment_RL_M_ = this;

        /*--Component Script--*/
    }
}

customElements.define('/*--component register name--*/', MyCustomElement);