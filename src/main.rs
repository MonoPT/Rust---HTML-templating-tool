mod templating;
use templating::generate_component;

use std::env;
use std::path::Path;

use std::sync::{Arc, Mutex};

use notify::{Watcher, RecursiveMode, Result, Event};

fn main() -> Result<()> {
    //let folder_watch = "./components";

    let files_being_edited: Arc<Mutex<Vec<String>>> = Arc::new(Mutex::new(vec![]));
        
    let mut folder_watch = "./components".to_string();

    if let Some(arg1) = env::args().nth(1) {
        folder_watch = arg1;
    }

    let f = folder_watch.clone();
    let mut output_folder = "./.output".to_string();

    if let Some(arg2) = env::args().nth(2) {
        output_folder = arg2;
    }

    // Automatically select the best implementation for your platform.
    let mut watcher = notify::recommended_watcher(move |res| {
        //let files_being_edited_clone = files_being_edited.clone();
        match res {
           Ok(event) => {
            
            watch_changes(event, &f, files_being_edited.clone(), output_folder.clone())
           },
           Err(e) => println!("watch error: {:?}", e),
        }
    })?;

    // Add a path to be watched. All files and directories at that path and
    // below will be monitored for changes.
    watcher.watch(Path::new(&folder_watch), RecursiveMode::Recursive)?;

    loop {}
}


fn watch_changes(event: Event, folder: &str, files_being_edited: Arc<Mutex<Vec<String>>>, output_folder: String) {
    let mut current_path = std::env::current_dir().unwrap().as_path().to_str().unwrap().to_string();
    current_path += folder;

    match event.clone().kind {
        notify::event::EventKind::Modify(_) => {},
        _ => return,
    }

    for path in event.clone().paths {
        let f_path = path.as_path().to_str().unwrap();

        let n = current_path.len() + 2;
        let file_path = &f_path[n..];
        
        let mut fs = files_being_edited.lock().unwrap();

        match fs.iter().find(|f| *f == file_path) {
            None => {
                fs.push(file_path.to_string());

                let name = Path::new(&file_path).with_extension("");
                let name_str = name.to_string_lossy().to_string();
                let split_parts: Vec<_> = name_str.split('\\').map(String::from).collect();

                let output_path = &format!("{}", split_parts.join("-")); //find output name

                match generate_component(&format!("{}/{}", folder, file_path), &format!("{}/{}.js",output_folder, output_path), &format!("WC-{}", output_path)) {
                    _ => {
                        
                        let pos = fs.iter().position(|f| *f == file_path).unwrap_or_default();

                        fs.remove(pos);

                    }
                }
            },
            Some(_) => ()
        }
    }
}