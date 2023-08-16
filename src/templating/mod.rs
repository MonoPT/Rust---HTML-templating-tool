mod utils {
    pub mod regex;
    pub mod io;
    pub mod transpile;
}

use regex::Regex;

use grass;

use utils::regex::{match_tag, handle_refs, handle_template_refs, handle_events, handle_visibility, handle_model};
use utils::io::{read_file_as_string, create_and_save_file};
use utils::transpile::transpile_typescript;

pub fn generate_component(input: &str, output: &str, component_name: &str) -> Result<(), Box<grass::Error>> {
    
    //Read file as string
    let file = input;
    let component_template = read_file_as_string("./templates/component.js");

    //if file.is_empty() {
    //    return Ok(());
    //}

    let mut template = match_tag("template", &file);
    println!("{}", template);

    let mut javascript = transpile_typescript(&match_tag("script", &file));
    let style = grass::from_string(
        match_tag("style", &file).to_owned(),
        &grass::Options::default()
    )?;

    
    

    //let mut javascript = transpile_typescript(&match_tag("script", &file));

    
    // handle reacticity
    let mut js_vars = handle_refs(&mut javascript, "ref");
    let mut js_vars_stores = handle_refs(&mut javascript, "getStore");

    js_vars.append(&mut js_vars_stores);
    
    handle_template_refs(&mut template, &mut javascript, &js_vars);

    handle_events(&mut template, &mut javascript);

    handle_visibility(&mut template, &mut javascript);

    handle_model(&mut template, &mut javascript);
    

    //
    //Recreate js web component
    //

    // add styles to template
    template += &format!("<style>{}</style>", style);

    // add html and css to template
    let pattern = Regex::new(r"/\*--ShadowDom--\*/").unwrap();
    let replaced_text = pattern.replace(&component_template, format!(";this.shadow.innerHTML = `{}`;", template));

    // add js to template
    let pattern = Regex::new(r"/\*--Component Script--\*/").unwrap();
    let replaced_text = pattern.replace(&replaced_text, format!(";{};", javascript));

    let pattern = Regex::new(r"/\*--component register name--\*/").unwrap();
    let replaced_text = pattern.replace(&replaced_text, format!("{}", component_name));

    // Create the file and open it for writing
    match create_and_save_file(output, &replaced_text) {
        Ok(()) => (),
        Err(err) => {
            println!("An Error has ocurred: {}", err);
        }
    }
    

    Ok(())
}