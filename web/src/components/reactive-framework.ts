export function ref(value: any, id: string, scope: HTMLElement) {
  const target = handle_values(value)

  if (!id) {
    id = generateUuid();
  }

  const ids: string[] = [];

  ids.push(id);

  
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
      UpdateValuesOnScreen(ids, target, onUpdateFunctions, scope, HtmlElementsToUpdate)
            
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

  UpdateValuesOnScreen(ids, target, onUpdateFunctions, scope, HtmlElementsToUpdate);

  return proxy
}

function UpdateValuesOnScreen(ids: string[], value: any, onUpdateFunctions: Function[], scope: HTMLElement, HtmlElementsToUpdate: any) {
  let document = scope.shadowRoot as ShadowRoot;

  let id = "";

  ids.forEach(currentID => {
    if (id != ids[0]) {
      id += `, .reactive-el-${currentID}`;
    } else {
      id += `.reactive-el-${currentID}`
    }    
  });


  let elements = document.querySelectorAll(`.reactive-el-${id}`)
  
  elements.forEach(element => {
    let property = element.getAttribute('dynproperty')?.trim() as string

    try {
      let ev = eval(`JSON.parse('${JSON.stringify(value)}').${property}`);

      if (typeof value[property] === "object") element.textContent = JSON.stringify(ev)
      else element.textContent = `${ev}`
    } catch {
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
      (HtmlElementsToUpdate as HTMLElement[]).forEach(element => {
        if(document.contains(element)) {
          //@ts-ignore
          element.reactivity_update_visibility();
        }
      });
    }
    
    
  });

  OnUpdate(onUpdateFunctions)
}

function OnUpdate(onUpdateFunctions: Function[]) {
  onUpdateFunctions.forEach(element => {
    element();
  });
}


function handle_values(value: any) {
  if(typeof value !== "object") {
    return {
      value
    }
  }
  return value
  
}


export const generateUuid = () => {
  return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
  ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;

      return value.toString(16);
  });
};



