extern crate notify;
use notify::{RecommendedWatcher, RecursiveMode, Watcher, Config, Event};

use std::sync::{Arc, Mutex};
use std::sync::mpsc::channel;
use std::{thread, env};
use std::time::{Duration, SystemTime};
use std::path::{Path, PathBuf};

mod templating;
use templating::generate_component;

use std::fs;



static supported_ext: [&'static str; 2] = ["html", "vue"];


#[tokio::main]
async fn main() {
    // Defina o diretório que deseja monitorar
    let mut path_to_watch = "./components".to_string();
    let mut output_folder = "./.output".to_string();

    if let Some(arg1) = env::args().nth(1) {
        path_to_watch = arg1;
    }

    if let Some(arg2) = env::args().nth(2) {
        output_folder = arg2;
    }

    let config = Config::default()
        .with_poll_interval(Duration::from_secs(3))
        .with_compare_contents(true);

    
    // Crie um novo watcher (observador)
    let (tx, rx) = channel();
    let mut watcher: RecommendedWatcher = Watcher::new(tx, config).unwrap();

    // Registre o diretório para monitoramento recursivo
    watcher.watch(Path::new(&path_to_watch), RecursiveMode::Recursive).unwrap();

    println!("Aguardando alterações na pasta...");

    let modified_files: Arc<Mutex<Vec<(String, SystemTime)>>> = Arc::new(Mutex::new(vec![]));

    // Loop para receber eventos de notificação
    loop {
        match rx.recv() {
            Ok(event) => {
                match event {
                    Err(_) => {}
                    Ok(event) => {
                        
                        if let Some(file_path) = event.paths.get(0).map(PathBuf::as_path) {
                            let file_path = String::from(Path::new(file_path).to_str().unwrap());
                            
                            let mut modified_files = modified_files.lock().unwrap();

                            let mut can_handle_file = true;
                            let cooldown = 1;

                            if let Some(v) = modified_files.iter().find(|e| e.0 == file_path) {
                                can_handle_file = false;


                                let i = modified_files.iter().position(|s| s.0 == file_path).unwrap();
                                let t = v.1;

                                match SystemTime::now().duration_since(t) {
                                    Ok(d) => {
                                        if d.as_secs() > cooldown {
                                            modified_files.remove(i); 
                                        }
                                    },
                                    Err(_) => ()
                                }

                            } 

                            if !can_handle_file {continue;} 

                            let now = SystemTime::now();
                            

                            modified_files.push((file_path.clone(), now));

                            process_event(event, &path_to_watch, &output_folder);

                        };
                    } 
                }
            }
            Err(e) => println!("Erro ao receber evento: {:?}", e),
        }
    }
}

// Função para processar o evento do arquivo
fn process_event(event: Event, component_folder: &str, output_folder: &str) {
    match event.kind {
        notify::EventKind::Modify(_) => (),
        _ => return
    }

    let current_path = std::env::current_dir().unwrap().as_path().to_str().unwrap().to_string();
    let path = event.paths.first().unwrap().to_str().unwrap().to_string();

    let component_path = Path::new(&path[format!("{}{}", current_path, component_folder).len() + 2..]);
    let ext = component_path.extension();
    let component_path = component_path.with_extension("");

    match ext { // Check if ext is supported
        Some(ext) => {
            if !supported_ext.contains(&ext.to_str().unwrap()) {
                return;
            }
        }
        _ => return
    }

    println!("{}", component_path.to_str().unwrap());
    
    let input_file = format!("{}/{}.{}", component_folder, component_path.to_str().unwrap(), ext.unwrap().to_str().unwrap());

    let temp: Vec<&str> = component_path.to_str().unwrap().split("\\").collect();

    let component_name = String::from("wc-") + &temp.join("-");

    let temp: String = format!("{}/{}.js", output_folder, component_path.to_str().unwrap());

    let output_path = Path::new(&temp);

    thread::sleep(Duration::from_millis(100));

    // Read the entire contents of the file into the buffer
    match fs::read_to_string(input_file) {
        Err(e) => println!("Error reading file: {}", e),
        Ok(content) => {
            generate_component(&content, output_path.to_str().unwrap(), &component_name);
        }
    }
}