type id_type= {id: string, scope: ShadowRoot};


export function ref(value: any, id?: string, scope?: HTMLElement) {
  const target = handle_values(value)

  if (!id) {
    id = generateUuid();
  }

  const ids: id_type[] = [];
  const models: id_type[] = [];

  if (id && scope) {
    ids.push({
      id,
      scope: scope.shadowRoot as ShadowRoot
    });
  }
  
  const onUpdateFunctions: Function[] = [];

  const HtmlElementsToUpdate = new Set();
  
  
  const handler = {
    //@ts-ignore
    get: function(target, prop, receiver) {
      if (prop === "isProxy") return true;

      if (typeof target[prop] === 'object' && target[prop] !== null) {
        return new Proxy(target[prop], this);
      }

      //@ts-ignore
      return Reflect.get(...arguments);
    },

    //@ts-ignore
    set: function(obj, prop, value) {
      //@ts-ignore
      let r = Reflect.set(...arguments)
      UpdateValuesOnScreen(ids, target, onUpdateFunctions, HtmlElementsToUpdate, models)
            
      return r
    }
  };

  
  let proxy = new Proxy(target, handler)


  ///Add callbacks to when this variable is updated
  proxy.onUpdate = function(code: Function){
    onUpdateFunctions.push(code)

    code()

    return proxy;
  }

  proxy.onNextUpdate = function(code: Function){
    onUpdateFunctions.push(code)

    return proxy;
  }

  proxy.reactive_update_html_element = function(Element: HTMLElement) {
    HtmlElementsToUpdate.add(Element);
  }

  proxy.add_element_id_to_update = function(id: string, scope: HTMLElement) {
    ids.push({
      id,
      scope: scope.shadowRoot as ShadowRoot
    });
  }

  proxy.reactivity_register_model = function(id: string, scope: HTMLElement) {
    models.push({
      id,
      scope: scope.shadowRoot as ShadowRoot
    });
  }

  proxy.force_update = () => UpdateValuesOnScreen(ids, target, onUpdateFunctions, HtmlElementsToUpdate, models);

  UpdateValuesOnScreen(ids, target, onUpdateFunctions, HtmlElementsToUpdate, models);

  return proxy
}

function UpdateValuesOnScreen(ids: id_type[], value: any, onUpdateFunctions: Function[], HtmlElementsToUpdate: any, models: id_type[]) {
  let elements: Element[] = [];

  ids.forEach(element => {
    let document = element.scope;
    
    let els = Array.from(document.querySelectorAll(`.reactive-el-${element.id}`));
    elements = [...elements, ...els];
  });  


  elements.forEach(element => {
    let property = element.getAttribute('dynproperty')?.trim() as string

    try {
      let ev = eval(`JSON.parse('${JSON.stringify(value)}').${property}`);

      if (typeof value[property] === "object") element.textContent = JSON.stringify(ev)
      else element.textContent = `${ev}`
    } catch (e) {
      console.error(e)
      if(Object.keys(value).length === 1 && Object.keys(value)[0] === "value") {
        if(typeof value.value !== "object") {
          element.textContent = value.value
          return;
        } 
        element.textContent = JSON.stringify(value.value)
        
        return;
      }

      element.textContent = JSON.stringify(value)      
    } finally {
      //Handle conditional visibility
      (HtmlElementsToUpdate as HTMLElement[]).forEach(element => {
        
        ids.forEach(id => {
          let document = id.scope;
          
          if(document.contains(element)) {
            //@ts-ignore
            element.reactivity_update_visibility();
          }
        });
      });

      //Marked as being tracked by library
      (async () => {
        elements.forEach(element => {
          element.setAttribute("DynVarTracked", "true");
        });
      })();
      
    }


    //Update models on screen
    (async () => {
      models.forEach(model => {
        let document = model.scope;
        
        let el = document.querySelector(`.${model.id}`) as HTMLInputElement;

        if(el && document.contains(el) && el.value !== value.value) {
          el.value = value.value;
        }

      });
    })();

    
    
    
  });

  OnUpdate(onUpdateFunctions)
}

function OnUpdate(onUpdateFunctions: Function[]) {
  onUpdateFunctions.forEach(element => {
    element();
  });
}


function handle_values(value: any) {
  if(typeof value !== "object" || value === null) {
    return {
      value
    }
  }
  return value
  
}

///Stores
const stores: {storeID: String, proxy: any}[] = [];

export function createStore(id: String, v: any) {
  if (!v.isProxy) {
    try {
      v = ref(v)
    } catch (e){
      throw new Error(e as string);
    }    
  }

  stores.push({
    storeID: id,
    proxy: v
  });

  return v;
}

export function getStore(id: String, elementID: string, scope: HTMLElement) {
  //Get store with id and add ElementID to ids to be watched when changing value
  let store = stores.filter((s) => {
    return s.storeID === id
  })[0]

  if (store) {
    store.proxy.add_element_id_to_update(elementID, scope);
    store.proxy.force_update();
    return store.proxy;
  }
  
  console.error(`Could not find registered store with identifier ${id}`);

  return null;
}

///UUID
const generateUuid = () => {
  return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
  ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;

      return value.toString(16);
  });
};



