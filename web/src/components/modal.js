import { ref, createStore, getStore } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        ;this.shadow.innerHTML = `
    <div class='reactivity-show-9c3d31aa-2e7f-43f8-9cb0-3b170493ce9e' id="modal"  >
        <div class="left">
            <wc-login-form></wc-login-form>
        </div>
        <div class="rigth">

        </div>
    </div>

    <div class='reactivity-show-36f1e9e4-e0ea-4a88-9fd9-329f8069c831' id="logged"  >
        <div class="left">
            <h1>Olá  <span style='all: unset' class='reactive-el-fd867d60-324c-410a-a62d-f8ee251990fc' dynproperty='value'>{  user  }</span> </h1>
            <button class=' reactive-event-121f879e-6e12-49e2-93c6-7b2342d654a1'  >Logout</button>
        </div>
        
    </div>
<style>#modal, #logged {
  display: flex;
  flex-direction: row;
  min-width: 100px;
  min-height: 100px;
  width: 80vw;
  height: 90vh;
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
}
#modal .left, #modal .rigth, #logged .left, #logged .rigth {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
}
#modal .rigth, #logged .rigth {
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
        const document = this.shadow; /*Scopes document object to component */
        const document_fragment_RL_M_ = this;

        ; var user = getStore("userName", 'fd867d60-324c-410a-a62d-f8ee251990fc', document_fragment_RL_M_) ;
var logout = function () { return user.value = ""; };
if(document.contains(document.querySelector('.reactive-event-121f879e-6e12-49e2-93c6-7b2342d654a1'))) { document.querySelector('.reactive-event-121f879e-6e12-49e2-93c6-7b2342d654a1').addEventListener('click', function() { logout(); } ) }
            if (document.contains(document.querySelector('.reactivity-show-36f1e9e4-e0ea-4a88-9fd9-329f8069c831'))) {
                document.querySelector('.reactivity-show-36f1e9e4-e0ea-4a88-9fd9-329f8069c831').reactivity_update_visibility = function() {
                    if(user.value.length > 0) {
                        document.querySelector('.reactivity-show-36f1e9e4-e0ea-4a88-9fd9-329f8069c831').style.removeProperty('display')
                    } else {
                        document.querySelector('.reactivity-show-36f1e9e4-e0ea-4a88-9fd9-329f8069c831').style.display = 'none'
                    }
                }
        
                
                if (typeof user === 'object' && user.isProxy) {
                    user.reactive_update_html_element(document.querySelector('.reactivity-show-36f1e9e4-e0ea-4a88-9fd9-329f8069c831'))
                }
            
                if (typeof value === 'object' && value.isProxy) {
                    value.reactive_update_html_element(document.querySelector('.reactivity-show-36f1e9e4-e0ea-4a88-9fd9-329f8069c831'))
                }
            
                if (typeof length === 'object' && length.isProxy) {
                    length.reactive_update_html_element(document.querySelector('.reactivity-show-36f1e9e4-e0ea-4a88-9fd9-329f8069c831'))
                }
            
            }

            document.querySelector('.reactivity-show-36f1e9e4-e0ea-4a88-9fd9-329f8069c831').reactivity_update_visibility();
        
            if (document.contains(document.querySelector('.reactivity-show-9c3d31aa-2e7f-43f8-9cb0-3b170493ce9e'))) {
                document.querySelector('.reactivity-show-9c3d31aa-2e7f-43f8-9cb0-3b170493ce9e').reactivity_update_visibility = function() {
                    if(user.value.length === 0) {
                        document.querySelector('.reactivity-show-9c3d31aa-2e7f-43f8-9cb0-3b170493ce9e').style.removeProperty('display')
                    } else {
                        document.querySelector('.reactivity-show-9c3d31aa-2e7f-43f8-9cb0-3b170493ce9e').style.display = 'none'
                    }
                }
        
                
                if (typeof user === 'object' && user.isProxy) {
                    user.reactive_update_html_element(document.querySelector('.reactivity-show-9c3d31aa-2e7f-43f8-9cb0-3b170493ce9e'))
                }
            
                if (typeof value === 'object' && value.isProxy) {
                    value.reactive_update_html_element(document.querySelector('.reactivity-show-9c3d31aa-2e7f-43f8-9cb0-3b170493ce9e'))
                }
            
                if (typeof length === 'object' && length.isProxy) {
                    length.reactive_update_html_element(document.querySelector('.reactivity-show-9c3d31aa-2e7f-43f8-9cb0-3b170493ce9e'))
                }
            
            }

            document.querySelector('.reactivity-show-9c3d31aa-2e7f-43f8-9cb0-3b170493ce9e').reactivity_update_visibility();
        ;
    }
}

customElements.define('wc-modal', MyCustomElement);