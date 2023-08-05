import { ref } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        ;this.shadow.innerHTML = `
    <h3 class=' reactive-event-7cca6e48-cb09-474c-8b10-74fc09d9e97b'  >Isto é  título  <span style='all: unset' class='reactive-el-5bdae1c5-c6aa-4141-9a63-53e2609be1c9' dynproperty='value'>{  teste2  }</span> </h3>
    <h1>Teste</h1>
    <h2>Subteste</h2>
    <span>Ok funciona <div class="a">asd <span style="all: unset"> this should be inline </span> asd</div></span>
    <div class='purple reactivity-show-ae3988d4-8175-45d2-a2df-5851ac12d3d0' id="div-parent"   class="purple">
        <h1>Isto é <div class="bold">um</div> título  <span style='all: unset' class='reactive-el-a95631b3-7fc6-45ab-829a-6ad3b4d6f2e1' dynproperty='val '>{  teste.val  }</span> </h1>
    </div>
    <button class=' reactive-event-e6cf732c-b3da-4c5b-9392-ecd8ce361f86'  >Count:  <span style='all: unset' class='reactive-el-f6d05dd9-a9d3-4b68-b307-d492e6fd4585' dynproperty='count '>{  count.count  }</span> </button>
    <div class=' over reactive-event-50023f0e-3da8-42b0-bc56-560a103179dc'    >number of hovers:  <span style='all: unset' class='reactive-el-06d65369-64ef-4a49-ac02-4c51112b1d58' dynproperty='value'>{  hover  }</span> </div>
    <div class='teste reactivity-show-6780d81a-252a-4a50-a574-45d8814e3f2c' class="teste"  >asd</div>
<style>h1 {
  color: red;
}

span {
  display: block;
}

#div-parent {
  display: block;
  padding: 20px;
  background: pink;
}
#div-parent h1 {
  color: blue;
}
#div-parent h1 .bold {
  font-weight: bolder;
  display: inline-block;
}
</style>`;
    }

    connectedCallback() {
        let document = this.shadow; /*Scopes document object to component */

        ;var text = "typed val";
 var teste2 = ref("valor 1", '5bdae1c5-c6aa-4141-9a63-53e2609be1c9', this) ;
 var teste = ref({
    val: 1,
    "teste": 123
}, 'a95631b3-7fc6-45ab-829a-6ad3b4d6f2e1', this) ;
 var count = ref({ count: 0 }, 'f6d05dd9-a9d3-4b68-b307-d492e6fd4585', this) ;
 var hover = ref(0, '06d65369-64ef-4a49-ac02-4c51112b1d58', this) ;
function hoverF(n) {
    hover.value += 1;
}
count.onNextUpdate(function () {
    console.log("current count: " + count.count);
});
var change_text = function () { return teste2.value = "clicked"; };
var a = 1;
setInterval(function () {
    teste.val += 1;
}, 1000);
if(document.contains(document.querySelector('.reactive-event-50023f0e-3da8-42b0-bc56-560a103179dc'))) { document.querySelector('.reactive-event-50023f0e-3da8-42b0-bc56-560a103179dc').addEventListener('pointermove', function() { hoverF(1); } ) }if(document.contains(document.querySelector('.reactive-event-e6cf732c-b3da-4c5b-9392-ecd8ce361f86'))) { document.querySelector('.reactive-event-e6cf732c-b3da-4c5b-9392-ecd8ce361f86').addEventListener('click', function() { count.count += 1; } ) }if(document.contains(document.querySelector('.reactive-event-7cca6e48-cb09-474c-8b10-74fc09d9e97b'))) { document.querySelector('.reactive-event-7cca6e48-cb09-474c-8b10-74fc09d9e97b').addEventListener('pointerup', function() { change_text(); } ) }
            if (document.contains(document.querySelector('.reactivity-show-6780d81a-252a-4a50-a574-45d8814e3f2c'))) {
                document.querySelector('.reactivity-show-6780d81a-252a-4a50-a574-45d8814e3f2c').reactivity_update_visibility = function() {
                    if(hover.value > count.count) {
                        document.querySelector('.reactivity-show-6780d81a-252a-4a50-a574-45d8814e3f2c').style.removeProperty('display')
                    } else {
                        document.querySelector('.reactivity-show-6780d81a-252a-4a50-a574-45d8814e3f2c').style.display = 'none'
                    }
                }
        
                
                if (typeof hover === 'object' && hover.isProxy) {
                    hover.reactive_update_html_element(document.querySelector('.reactivity-show-6780d81a-252a-4a50-a574-45d8814e3f2c'))
                }
            
                if (typeof value === 'object' && value.isProxy) {
                    value.reactive_update_html_element(document.querySelector('.reactivity-show-6780d81a-252a-4a50-a574-45d8814e3f2c'))
                }
            
                if (typeof count === 'object' && count.isProxy) {
                    count.reactive_update_html_element(document.querySelector('.reactivity-show-6780d81a-252a-4a50-a574-45d8814e3f2c'))
                }
            
                if (typeof count === 'object' && count.isProxy) {
                    count.reactive_update_html_element(document.querySelector('.reactivity-show-6780d81a-252a-4a50-a574-45d8814e3f2c'))
                }
            
            }

            document.querySelector('.reactivity-show-6780d81a-252a-4a50-a574-45d8814e3f2c').reactivity_update_visibility();
        
            if (document.contains(document.querySelector('.reactivity-show-ae3988d4-8175-45d2-a2df-5851ac12d3d0'))) {
                document.querySelector('.reactivity-show-ae3988d4-8175-45d2-a2df-5851ac12d3d0').reactivity_update_visibility = function() {
                    if(1 + 1 === 2) {
                        document.querySelector('.reactivity-show-ae3988d4-8175-45d2-a2df-5851ac12d3d0').style.removeProperty('display')
                    } else {
                        document.querySelector('.reactivity-show-ae3988d4-8175-45d2-a2df-5851ac12d3d0').style.display = 'none'
                    }
                }
        
                
            }

            document.querySelector('.reactivity-show-ae3988d4-8175-45d2-a2df-5851ac12d3d0').reactivity_update_visibility();
        ;
    }
}

customElements.define('my-custom-element', MyCustomElement);