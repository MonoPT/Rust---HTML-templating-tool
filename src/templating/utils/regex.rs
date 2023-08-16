use std::ops::Index;

use regex::Regex;
use uuid::Uuid;



// Function that gets content inside a html tag
pub fn match_tag(tag_name: &str, string_file: &str) -> String {
    let re = Regex::new(&format!(r"(?s)<{}>(.*?)</{}>", tag_name, tag_name)).unwrap();

    let mut template = String::new();

    if let Some(captured) = re.captures(string_file) {
        template = captured.get(1).unwrap().as_str().to_string();
    }

    template
}

fn regex_find_attribute_in_tag(attribute: &str) ->regex::Regex {
    Regex::new(&format!(r#"<(\w+).*?{}="([^"]*)".*?>"#, attribute)).unwrap()
}

#[derive(Debug, Clone)]
struct Refs {
    start_index: usize,
    end_index: usize,
    value: String,
    uuid: Uuid,
    var_name: String,
    var_type: String,
}

#[derive(Debug, Clone)]
pub struct Variables {
    pub var_name: String,
    pub var_uuid: Uuid,
}

// locate all ref() in js
fn find_refs(string: &str, ref_to_find: &str) -> Vec<Refs> {
    let mut refs: Vec<Refs> = vec![];

    let padrao = &format!(r"\b(let|cons|var)\s+(\w+)\s*=\s*{}\(([^)]+)\)", ref_to_find);

    let regex = Regex::new(padrao).unwrap();

    for mat in regex.captures_iter(string) {
        let indice_inicial = mat.get(0).unwrap().start();
        let indice_final = mat.get(0).unwrap().end();
        let qualquer_var = mat.get(2).unwrap().as_str();
        let qualquer_valor = mat.get(3).unwrap().as_str();
        let tipo = mat.get(1).unwrap().as_str();

        refs.push(Refs { 
            start_index: indice_inicial, 
            end_index: indice_final,
            value: qualquer_valor.to_string(),
            uuid: Uuid::new_v4(),
            var_name: qualquer_var.to_string(),
            var_type: tipo.to_string()
        })
    }

    refs
}


pub fn handle_refs(string: &mut String, ref_to_find: &str) -> Vec<Variables> {
    let mut vars: Vec<Variables> = vec![];

    let mut refs = find_refs(string, &ref_to_find);
    refs.reverse();

    for item in refs.clone() {
        vars.push(Variables { var_name: item.var_name.clone(), var_uuid: item.uuid.clone()});

        let prefix = &string[..item.start_index];
        let suffix = &string[item.end_index..];
         
        let new_var = format!("{} {} = {}({}, '{}', document_fragment_RL_M_)", item.var_type, item.var_name, ref_to_find, item.value, item.uuid);

        //if ref_to_find == "ref" {
        //    let new_var = format!("{} {} = {}({}, '{}', this)", item.var_type, item.var_name, ref_to_find, item.value, item.uuid);
        //}
        



        *string = format!("{} {} {}", prefix, new_var, suffix);
    }

    vars
}

// Make js values reactive
#[derive(Debug, Clone)]
struct TemplateRefs {
    value: String,
    start: usize,
    end: usize
}

pub fn handle_template_refs(string: &mut String, javascript: &mut String,vars: &Vec<Variables>) {
    let padrao = r"\{\{([^}]+)\}\}";
    let regex = Regex::new(padrao).unwrap();

    let mut html_refs: Vec<TemplateRefs> = vec![];

    // Find all
    for captura in regex.captures_iter(string) {
        let valor = &captura[1];
        let inicio = captura.get(0).unwrap().start();
        let fim = captura.get(0).unwrap().end();
        
        html_refs.push(TemplateRefs { value: valor.to_string(), start: inicio, end: fim })
    }

    // Replace all
    html_refs.reverse();

    for item in html_refs.clone() {

        let prefix = &string[..item.start];
        let suffix = &string[item.end..];

        let mut var: Vec<&str> = item.value.split(".").collect();

        let current_var_name = var.index(0).clone();

        var.remove(0);

        let mut dyn_prop = var.join(".");

        let mut id: String = Uuid::new_v4().to_string();

        for var in vars {
            let s1 = String::from(&var.var_name);
            let s2 = String::from(current_var_name);

            if s1.trim() == s2.trim() {
                id = var.var_uuid.to_string();
                break;
            }
        }

        if dyn_prop.is_empty() {
            dyn_prop = "value".to_string();
        }
        
        let new_val = format!("<span style='all: unset' class='reactive-el-{}' dynproperty='{}'>{}</span>", id, dyn_prop, format!("{} {} {}", "{", &item.value, "}"));

        *string = format!("{} {} {}", prefix, new_val, suffix);

        let expression_evaluator_fallback = format!("
            if(document.contains(document.querySelector('.reactive-el-{}')) && !document.querySelector('.reactive-el-{}').hasAttribute('DynVarTracked')) {{
                document.querySelector('.reactive-el-{}').textContent = {}
            }}
        ",id, id,id, &item.value);

        *javascript = format!("{};{}", javascript, expression_evaluator_fallback);
    }
    
}

// handle events
#[derive(Debug, Clone)]
struct EventMatch {
    start: usize,
    end: usize
}

#[derive(Debug, Clone)]
struct EventList {
    event_handler: String,
    event_function: String
}

fn get_slice(text: &str, start_index: usize, end_index: usize) -> Option<&str> {
    if start_index <= end_index && end_index <= text.len() {
        Some(&text[start_index..end_index])
    } else {
        None
    }
}

pub fn handle_events(template_string: &mut String, script_string: &mut String) {
    let mut events: Vec<EventMatch> = vec![];

    let re = Regex::new(r#"<(\w+).*?@([^=]+)="([^"]*)".*?>"#).unwrap();
    for mat in re.find_iter(template_string) {        
        events.push(EventMatch { start: mat.start(), end: mat.end() })
    }

    events.reverse();

    for event in events {
        let mut events: Vec<EventList> = vec![];

        let slice = get_slice(template_string, event.start, event.end).unwrap_or_default();

        let re = Regex::new(r#"\@(\w+)="([^"]+)""#).unwrap();

        let mut tag = String::from(slice);

        // Iterar sobre as capturas encontradas
        for captura in re.captures_iter(slice) {
            // Obter os grupos capturados
            let evento = &captura[1];
            let corpo = &captura[2];

            events.push(EventList { event_handler: evento.to_string(), event_function: corpo.to_string() });

            let resultado = re.replace_all(slice, " ");

            tag = format!("{}", resultado);

        
            //////// Gerar eventos, colocar classes, verificar se classe já existe
        }

        let mut classes = String::new();

        let re = Regex::new(r#"class="([^"]+)""#).unwrap();

        for capture in re.captures_iter(&tag) {
            classes += &format!(" {}", &capture[1]);
        }

        let tag = re.replace_all(&tag, " ");

        let event_id = format!(" reactive-event-{}", Uuid::new_v4());
        classes += &event_id;

        let re = Regex::new(r"\s").unwrap();
        let tag = re.replace(&tag, format!(" class='{}' ", classes));

        let prefix = &template_string[..event.start];
        let suffix = &template_string[event.end..];

        *template_string = format!("{}{}{}",prefix, tag, suffix);

        for event in events {
            *script_string += &format!("if(document.contains(document.querySelector('.{}'))) {{ document.querySelector('.{}').addEventListener('{}', function() {{ {}; }} ) }}", event_id.trim(), event_id.trim(), event.event_handler, event.event_function);
        }
    }

    
}

// Handle conditional rendering
pub fn handle_visibility(template_string: &mut String, script_string: &mut String) {
    let mut visibility: Vec<EventMatch> = vec![];
    
    let re = regex_find_attribute_in_tag("v-show");
    for mat in re.find_iter(template_string) {        
        visibility.push(EventMatch { start: mat.start(), end: mat.end() });
    } 

    visibility.reverse();


    for v in visibility {
        let original_tag = get_slice(&template_string, v.start, v.end).unwrap();
        let mut expression = String::new();

        let re = Regex::new(r#"v-show="([^"]+)""#).unwrap();
        if let Some(captura) = re.find(original_tag) {
            let f = &captura.as_str().trim()[8..];
            expression += &f[0..f.len() - 1];
        }

        let id = format!("reactivity-show-{}", Uuid::new_v4());

        let tag = re.replace(original_tag, " ");

        let mut classes = String::new();

        let re = Regex::new(r#"class="([^"]+)""#).unwrap();

        for capture in re.captures_iter(&tag) {
            classes += &format!(" {}", &capture[1]);
        }

        classes += &format!(" {}", &id);

        let re = Regex::new(r"\s").unwrap();
        let tag = re.replace(&tag, format!(" class='{}' ", classes.trim()));

        let prefix = &template_string[..v.start];
        let suffix = &template_string[v.end..];

        *template_string = format!("{}{}{}",prefix, tag, suffix);

        let mut variables_to_watch = String::new();

        let variables = find_variables_in_js(&expression);
        for var_name in variables {
            variables_to_watch += &format!("
                if (typeof {} === 'object' && {}.isProxy) {{
                    {}.reactive_update_html_element(document.querySelector('.{}'))
                }}
            ", var_name, var_name, var_name, id);
        }

        *script_string += &format!("
            if (document.contains(document.querySelector('.{}'))) {{
                document.querySelector('.{}').reactivity_update_visibility = function() {{
                    if({}) {{
                        document.querySelector('.{}').style.removeProperty('display')
                    }} else {{
                        document.querySelector('.{}').style.display = 'none'
                    }}
                }}
        
                {}
            }}

            document.querySelector('.{}').reactivity_update_visibility();
        ", id, id, expression, id, id, variables_to_watch, id);
    }
}

fn find_variables_in_js(input: &str) -> Vec<String> {
    // Define a expressão regular para encontrar as variáveis
    let regex = Regex::new(r#"\b([a-zA-Z_]\w*)\b"#).unwrap();

    // Itera sobre todas as capturas encontradas
    let mut variables = Vec::new();
    for capture in regex.captures_iter(input) {
        if let Some(variable) = capture.get(1) {
            variables.push(variable.as_str().to_string());
        }
    }

    variables
}

// Handle v-model

pub fn handle_model(template_string: &mut String, script_string: &mut String) {
    let mut visibility: Vec<EventMatch> = vec![];
    
    let re = regex_find_attribute_in_tag("v-model");
    for mat in re.find_iter(template_string) {        
        visibility.push(EventMatch { start: mat.start(), end: mat.end() });
    } 

    visibility.reverse();

    

    for v in visibility {
        let original_tag = get_slice(&template_string, v.start, v.end).unwrap();
        let mut expression = String::new();
        let mut var = String::new();

        let re = Regex::new(r#"v-model="([^"]+)""#).unwrap();
        if let Some(captura) = re.captures(original_tag) {
            if let Some(f) = captura.get(0) {
                let s = &f.as_str().trim();
                var = s[9..s.len() - 1].to_string();
            }

            if let Some(f) = captura.get(1) {
                let f = &f.as_str().trim();
                expression += &f[0..f.len() - 1];
            }
        }

        let id_n = Uuid::new_v4();
        let id = format!("reactivity-model-{}", id_n);

        let tag = re.replace(original_tag, " ");

        let mut classes = String::new();

        let re = Regex::new(r#"class="([^"]+)""#).unwrap();

        for capture in re.captures_iter(&tag) {
            classes += &format!(" {}", &capture[1]);
        }

        classes += &format!(" {}", &id);

        let re = Regex::new(r"\s").unwrap();
        let tag = re.replace(&tag, format!(" class='{}' ", classes.trim()));

        let prefix = &template_string[..v.start];
        let suffix = &template_string[v.end..];

        *template_string = format!("{}{}{}",prefix, tag, suffix);

        
        *script_string += &format!("
            if(document.contains(document.querySelector('.{}'))) {{
                let el = document.querySelector('.{}');

                if(['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {{

                    if (typeof {} === 'object' && {}.isProxy) {{
                        if ({}.value?.length > 0) el.value = {}.value;

                        {}.value = el.value; 
                        {}.reactivity_register_model('{}', document_fragment_RL_M_)
                    }} else {{
                        
                        {} = el.value;
                    }}

                    el.addEventListener('input', () => {{
                        if (typeof {} === 'object' && {}.isProxy) {{
                            
                            {}.value = el.value; 
                        }} else {{
                            {} = el.value;
                        }}
                    }})
                }}


        
            }}
        ", id, id, var, var, var, var, var, var, id, var, var, var, var, var);
    }
}