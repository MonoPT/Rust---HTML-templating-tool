import { ref, createStore, getStore } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        ;this.shadow.innerHTML = `
    <div class='reactivity-show-f3288a20-dee0-427e-bb6d-1943d727979c' id="modal"  >
        <div class="left">
            <wc-login-form></wc-login-form>
        </div>
        <div class="rigth">

        </div>
    </div>

    <div class='reactivity-show-6c75155b-c6b4-4b1e-9a63-704bd6881006' id="logged"  >
        <div class="left">
            <h1>Olá  <span style='all: unset' class='reactive-el-967f799d-877d-4d04-8804-82d1da50a8f5' dynproperty='value'>{  user  }</span> </h1>
            <button class=' reactive-event-9f4fdf69-5dc2-410d-9a70-e8f797e968f4'  >Logout</button>

            <br>
            <br>
            <form action="">
                <input class='reactivity-model-26e2c849-edb1-4e48-82e2-b449bddf71f7' type="text"  >
                 <span style='all: unset' class='reactive-el-967f799d-877d-4d04-8804-82d1da50a8f5' dynproperty='value'>{  user  }</span> 

                <br><br>
                <input class='reactivity-model-93acd635-2b84-49ce-83c7-6ae8c602de43' type="text"  >
                 <span style='all: unset' class='reactive-el-9f7202ec-0b11-4546-98fc-8378d91a5291' dynproperty='value'>{  inputText  }</span> 

                <br><br>
                <textarea class='reactivity-model-1c94b7b2-37aa-41a3-857c-d6a5e15d5d2e'  ></textarea>
                 <span style='all: unset' class='reactive-el-365a84bb-0733-41e4-b74b-d0435ec5de6a' dynproperty='value'>{  input  }</span> 

                <br><br>
                <select class='reactivity-model-745887a7-2335-43e1-b9c0-c8db465e37cb' name="" id=""  >
                    <option value="opcao 1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                 <span style='all: unset' class='reactive-el-e2be0a69-6eb1-4465-b8b4-486b2f608c9e' dynproperty='value'>{  option  }</span> 

            </form>
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

        ; var user = getStore("userName", '967f799d-877d-4d04-8804-82d1da50a8f5', document_fragment_RL_M_) ;
 var input = ref("teste de texarea", '365a84bb-0733-41e4-b74b-d0435ec5de6a', document_fragment_RL_M_) ;
 var inputText = ref(null, '9f7202ec-0b11-4546-98fc-8378d91a5291', document_fragment_RL_M_) ;
 var option = ref('3', 'e2be0a69-6eb1-4465-b8b4-486b2f608c9e', document_fragment_RL_M_) ;
var logout = function () { return user.value = ""; };
setInterval(function () {
    input.value = input.value.toUpperCase();
}, 5000);
;
            if(document.contains(document.querySelector('.reactive-el-e2be0a69-6eb1-4465-b8b4-486b2f608c9e')) && !document.querySelector('.reactive-el-e2be0a69-6eb1-4465-b8b4-486b2f608c9e').hasAttribute('DynVarTracked')) {
                document.querySelector('.reactive-el-e2be0a69-6eb1-4465-b8b4-486b2f608c9e').textContent =  option 
            }
        ;
            if(document.contains(document.querySelector('.reactive-el-365a84bb-0733-41e4-b74b-d0435ec5de6a')) && !document.querySelector('.reactive-el-365a84bb-0733-41e4-b74b-d0435ec5de6a').hasAttribute('DynVarTracked')) {
                document.querySelector('.reactive-el-365a84bb-0733-41e4-b74b-d0435ec5de6a').textContent =  input 
            }
        ;
            if(document.contains(document.querySelector('.reactive-el-9f7202ec-0b11-4546-98fc-8378d91a5291')) && !document.querySelector('.reactive-el-9f7202ec-0b11-4546-98fc-8378d91a5291').hasAttribute('DynVarTracked')) {
                document.querySelector('.reactive-el-9f7202ec-0b11-4546-98fc-8378d91a5291').textContent =  inputText 
            }
        ;
            if(document.contains(document.querySelector('.reactive-el-967f799d-877d-4d04-8804-82d1da50a8f5')) && !document.querySelector('.reactive-el-967f799d-877d-4d04-8804-82d1da50a8f5').hasAttribute('DynVarTracked')) {
                document.querySelector('.reactive-el-967f799d-877d-4d04-8804-82d1da50a8f5').textContent =  user 
            }
        ;
            if(document.contains(document.querySelector('.reactive-el-967f799d-877d-4d04-8804-82d1da50a8f5')) && !document.querySelector('.reactive-el-967f799d-877d-4d04-8804-82d1da50a8f5').hasAttribute('DynVarTracked')) {
                document.querySelector('.reactive-el-967f799d-877d-4d04-8804-82d1da50a8f5').textContent =  user 
            }
        if(document.contains(document.querySelector('.reactive-event-9f4fdf69-5dc2-410d-9a70-e8f797e968f4'))) { document.querySelector('.reactive-event-9f4fdf69-5dc2-410d-9a70-e8f797e968f4').addEventListener('click', function() { logout(); } ) }
            if (document.contains(document.querySelector('.reactivity-show-6c75155b-c6b4-4b1e-9a63-704bd6881006'))) {
                document.querySelector('.reactivity-show-6c75155b-c6b4-4b1e-9a63-704bd6881006').reactivity_update_visibility = function() {
                    if(user.value.length > 0) {
                        document.querySelector('.reactivity-show-6c75155b-c6b4-4b1e-9a63-704bd6881006').style.removeProperty('display')
                    } else {
                        document.querySelector('.reactivity-show-6c75155b-c6b4-4b1e-9a63-704bd6881006').style.display = 'none'
                    }
                }
        
                
                if (typeof user === 'object' && user.isProxy) {
                    user.reactive_update_html_element(document.querySelector('.reactivity-show-6c75155b-c6b4-4b1e-9a63-704bd6881006'))
                }
            
                if (typeof value === 'object' && value.isProxy) {
                    value.reactive_update_html_element(document.querySelector('.reactivity-show-6c75155b-c6b4-4b1e-9a63-704bd6881006'))
                }
            
                if (typeof length === 'object' && length.isProxy) {
                    length.reactive_update_html_element(document.querySelector('.reactivity-show-6c75155b-c6b4-4b1e-9a63-704bd6881006'))
                }
            
            }

            document.querySelector('.reactivity-show-6c75155b-c6b4-4b1e-9a63-704bd6881006').reactivity_update_visibility();
        
            if (document.contains(document.querySelector('.reactivity-show-f3288a20-dee0-427e-bb6d-1943d727979c'))) {
                document.querySelector('.reactivity-show-f3288a20-dee0-427e-bb6d-1943d727979c').reactivity_update_visibility = function() {
                    if(user.value.length === 0) {
                        document.querySelector('.reactivity-show-f3288a20-dee0-427e-bb6d-1943d727979c').style.removeProperty('display')
                    } else {
                        document.querySelector('.reactivity-show-f3288a20-dee0-427e-bb6d-1943d727979c').style.display = 'none'
                    }
                }
        
                
                if (typeof user === 'object' && user.isProxy) {
                    user.reactive_update_html_element(document.querySelector('.reactivity-show-f3288a20-dee0-427e-bb6d-1943d727979c'))
                }
            
                if (typeof value === 'object' && value.isProxy) {
                    value.reactive_update_html_element(document.querySelector('.reactivity-show-f3288a20-dee0-427e-bb6d-1943d727979c'))
                }
            
                if (typeof length === 'object' && length.isProxy) {
                    length.reactive_update_html_element(document.querySelector('.reactivity-show-f3288a20-dee0-427e-bb6d-1943d727979c'))
                }
            
            }

            document.querySelector('.reactivity-show-f3288a20-dee0-427e-bb6d-1943d727979c').reactivity_update_visibility();
        
            if(document.contains(document.querySelector('.reactivity-model-745887a7-2335-43e1-b9c0-c8db465e37cb'))) {
                let el = document.querySelector('.reactivity-model-745887a7-2335-43e1-b9c0-c8db465e37cb');

                if(['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {

                    if (typeof option === 'object' && option.isProxy) {
                        if (option.value?.length > 0) el.value = option.value;

                        option.value = el.value; 
                        option.reactivity_register_model('reactivity-model-745887a7-2335-43e1-b9c0-c8db465e37cb', document_fragment_RL_M_)
                    } else {
                        
                        option = el.value;
                    }

                    el.addEventListener('input', () => {
                        if (typeof option === 'object' && option.isProxy) {
                            
                            option.value = el.value; 
                        } else {
                            option = el.value;
                        }
                    })
                }


        
            }
        
            if(document.contains(document.querySelector('.reactivity-model-1c94b7b2-37aa-41a3-857c-d6a5e15d5d2e'))) {
                let el = document.querySelector('.reactivity-model-1c94b7b2-37aa-41a3-857c-d6a5e15d5d2e');

                if(['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {

                    if (typeof input === 'object' && input.isProxy) {
                        if (input.value?.length > 0) el.value = input.value;

                        input.value = el.value; 
                        input.reactivity_register_model('reactivity-model-1c94b7b2-37aa-41a3-857c-d6a5e15d5d2e', document_fragment_RL_M_)
                    } else {
                        
                        input = el.value;
                    }

                    el.addEventListener('input', () => {
                        if (typeof input === 'object' && input.isProxy) {
                            
                            input.value = el.value; 
                        } else {
                            input = el.value;
                        }
                    })
                }


        
            }
        
            if(document.contains(document.querySelector('.reactivity-model-93acd635-2b84-49ce-83c7-6ae8c602de43'))) {
                let el = document.querySelector('.reactivity-model-93acd635-2b84-49ce-83c7-6ae8c602de43');

                if(['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {

                    if (typeof inputText === 'object' && inputText.isProxy) {
                        if (inputText.value?.length > 0) el.value = inputText.value;

                        inputText.value = el.value; 
                        inputText.reactivity_register_model('reactivity-model-93acd635-2b84-49ce-83c7-6ae8c602de43', document_fragment_RL_M_)
                    } else {
                        
                        inputText = el.value;
                    }

                    el.addEventListener('input', () => {
                        if (typeof inputText === 'object' && inputText.isProxy) {
                            
                            inputText.value = el.value; 
                        } else {
                            inputText = el.value;
                        }
                    })
                }


        
            }
        
            if(document.contains(document.querySelector('.reactivity-model-26e2c849-edb1-4e48-82e2-b449bddf71f7'))) {
                let el = document.querySelector('.reactivity-model-26e2c849-edb1-4e48-82e2-b449bddf71f7');

                if(['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {

                    if (typeof user === 'object' && user.isProxy) {
                        if (user.value?.length > 0) el.value = user.value;

                        user.value = el.value; 
                        user.reactivity_register_model('reactivity-model-26e2c849-edb1-4e48-82e2-b449bddf71f7', document_fragment_RL_M_)
                    } else {
                        
                        user = el.value;
                    }

                    el.addEventListener('input', () => {
                        if (typeof user === 'object' && user.isProxy) {
                            
                            user.value = el.value; 
                        } else {
                            user = el.value;
                        }
                    })
                }


        
            }
        ;
    }
}

customElements.define('wc-modal', MyCustomElement);