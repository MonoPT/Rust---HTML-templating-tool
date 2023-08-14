import { ref, createStore, getStore } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        ;this.shadow.innerHTML = `
    <h1>Nome carregado de store:  <span style='all: unset' class='reactive-el-28b01e9a-0377-4e15-a665-104deefb734c' dynproperty='value'>{  store  }</span> </h1>
<style></style>`;
    }

    connectedCallback() {
        const document = this.shadow; /*Scopes document object to component */
        const document_fragment_RL_M_ = this;

        ; var store = getStore("userName", '28b01e9a-0377-4e15-a665-104deefb734c', document_fragment_RL_M_) ;
;
    }
}

customElements.define('wc-teste', MyCustomElement);