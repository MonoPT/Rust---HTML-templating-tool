import { ref } from "./reactive-framework.ts";

class MyCustomElement extends HTMLElement {
    constructor() {
        super();

        /*Shadow dom aberto*/
        this.shadow = this.attachShadow({ mode: 'open' });

        ;this.shadow.innerHTML = `
    <h3 class=' reactive-event-ca12beb8-b4c8-4324-9c93-1f68b9b2c505'  >Isto é  título  <span style='all: unset' class='reactive-el-b6b3be4e-af0c-44e3-876c-5a9a4360e37c' dynproperty='value'>{  teste2  }</span> </h3>
    <h1>Teste</h1>
    <h2>Subteste</h2>
    <span>Ok funciona <div class="a">asd <span style="all: unset"> this should be inline </span> asd</div></span>
    <div class='purple reactivity-show-3d491e7f-890d-41bb-bdb8-c8d4db7040ff' id="div-parent"   class="purple">
        <h1>Isto é <div class="bold">um</div> título  <span style='all: unset' class='reactive-el-63caface-5081-4f1b-9c69-4ef5ac03172f' dynproperty='val '>{  teste.val  }</span> </h1>
    </div>
    <button class=' reactive-event-7a4f0bb9-a563-4b13-9ceb-7116c17c4509'  >Count:  <span style='all: unset' class='reactive-el-5daa47dc-947d-4138-8fb4-03657d137157' dynproperty='count '>{  count.count  }</span> </button>
    <div class=' over reactive-event-a6bc1abe-a5b3-4250-917c-cab6cc0b18dc'    >number of hovers:  <span style='all: unset' class='reactive-el-ab65b994-529f-4a16-ae3f-b0b0526c92e4' dynproperty='value'>{  hover  }</span> </div>
    <div class='teste reactivity-show-f3ad0c49-aeff-480f-bbfb-d7b33debce0e' class="teste"  >asd</div>
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
 var teste2 = ref("valor 1", 'b6b3be4e-af0c-44e3-876c-5a9a4360e37c', this) ;
 var teste = ref({
    val: 1,
    "teste": 123
}, '63caface-5081-4f1b-9c69-4ef5ac03172f', this) ;
 var count = ref({ count: 0 }, '5daa47dc-947d-4138-8fb4-03657d137157', this) ;
 var hover = ref(0, 'ab65b994-529f-4a16-ae3f-b0b0526c92e4', this) ;
function hoverF(n) {
    hover.value += 1;
}
count.onNextUpdate(function () {
    console.log("current count: " + count.count);
});
var a = 1;
setInterval(function () {
    teste.val += 1;
}, 1000);
if(document.contains(document.querySelector('.reactive-event-a6bc1abe-a5b3-4250-917c-cab6cc0b18dc'))) { document.querySelector('.reactive-event-a6bc1abe-a5b3-4250-917c-cab6cc0b18dc').addEventListener('pointermove', function() { hoverF(1); } ) }if(document.contains(document.querySelector('.reactive-event-7a4f0bb9-a563-4b13-9ceb-7116c17c4509'))) { document.querySelector('.reactive-event-7a4f0bb9-a563-4b13-9ceb-7116c17c4509').addEventListener('click', function() { count.count += 1; } ) }if(document.contains(document.querySelector('.reactive-event-ca12beb8-b4c8-4324-9c93-1f68b9b2c505'))) { document.querySelector('.reactive-event-ca12beb8-b4c8-4324-9c93-1f68b9b2c505').addEventListener('pointerdown', function() { run; } ) }
            if (document.contains(document.querySelector('.reactivity-show-f3ad0c49-aeff-480f-bbfb-d7b33debce0e'))) {
                document.querySelector('.reactivity-show-f3ad0c49-aeff-480f-bbfb-d7b33debce0e').reactivity_update_visibility = function() {
                    if(hover.value > count.count) {
                        document.querySelector('.reactivity-show-f3ad0c49-aeff-480f-bbfb-d7b33debce0e').style.removeProperty('display')
                    } else {
                        document.querySelector('.reactivity-show-f3ad0c49-aeff-480f-bbfb-d7b33debce0e').style.display = 'none'
                    }
                }
        
                
                if (typeof hover === 'object' && hover.isProxy) {
                    hover.reactive_update_html_element(document.querySelector('.reactivity-show-f3ad0c49-aeff-480f-bbfb-d7b33debce0e'))
                }
            
                if (typeof value === 'object' && value.isProxy) {
                    value.reactive_update_html_element(document.querySelector('.reactivity-show-f3ad0c49-aeff-480f-bbfb-d7b33debce0e'))
                }
            
                if (typeof count === 'object' && count.isProxy) {
                    count.reactive_update_html_element(document.querySelector('.reactivity-show-f3ad0c49-aeff-480f-bbfb-d7b33debce0e'))
                }
            
                if (typeof count === 'object' && count.isProxy) {
                    count.reactive_update_html_element(document.querySelector('.reactivity-show-f3ad0c49-aeff-480f-bbfb-d7b33debce0e'))
                }
            
            }

            document.querySelector('.reactivity-show-f3ad0c49-aeff-480f-bbfb-d7b33debce0e').reactivity_update_visibility();
        
            if (document.contains(document.querySelector('.reactivity-show-3d491e7f-890d-41bb-bdb8-c8d4db7040ff'))) {
                document.querySelector('.reactivity-show-3d491e7f-890d-41bb-bdb8-c8d4db7040ff').reactivity_update_visibility = function() {
                    if(1 + 1 === 2) {
                        document.querySelector('.reactivity-show-3d491e7f-890d-41bb-bdb8-c8d4db7040ff').style.removeProperty('display')
                    } else {
                        document.querySelector('.reactivity-show-3d491e7f-890d-41bb-bdb8-c8d4db7040ff').style.display = 'none'
                    }
                }
        
                
            }

            document.querySelector('.reactivity-show-3d491e7f-890d-41bb-bdb8-c8d4db7040ff').reactivity_update_visibility();
        ;
    }
}

customElements.define('my-custom-element', MyCustomElement);