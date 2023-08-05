mod utils {
    pub mod regex;
    pub mod io;
    pub mod transpile;
}

use regex::Regex;

use grass;

use utils::regex::{match_tag, handle_refs, handle_template_refs, handle_events, handle_visibility};
use utils::io::{read_file_as_string, create_and_save_file};
use utils::transpile::transpile_typescript;

/* */
fn main() -> Result<(), Box<grass::Error>> {
    
    //Read file as string
    let file = read_file_as_string("./teste.html");
    let component_template = read_file_as_string("./templates/component.js");

    let mut template = match_tag("template", &file);
    let mut javascript = transpile_typescript(&match_tag("script", &file));
    let style = grass::from_string(
        match_tag("style", &file).to_owned(),
        &grass::Options::default()
    )?;

    // handle reacticity
    let js_vars = handle_refs(&mut javascript);
    
    handle_template_refs(&mut template, &js_vars);

    handle_events(&mut template, &mut javascript);

    handle_visibility(&mut template, &mut javascript);





    

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

    // Create the file and open it for writing
    match create_and_save_file("./web/src/component.js", &replaced_text) {
        Ok(()) => {
            println!("File generated sucessfully");
        },
        Err(err) => {
            println!("An Error has ocurred: {}", err);
        }
    }
    

    Ok(())
}
