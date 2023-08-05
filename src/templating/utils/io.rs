use std::fs::{self, File};
use std::io::Write;
use std::path::Path;

//Save string as file
pub fn create_and_save_file(file_path: &str, content: &str) -> Result<(), Box<dyn std::error::Error>> {
    // Extract the directory path from the file_path
    let dir_path = Path::new(file_path).parent().ok_or("Invalid file path")?;

    // Create the folder if it doesn't exist
    if !dir_path.exists() {
        std::fs::create_dir_all(dir_path)?;
    }

    // Create the file and open it for writing
    let mut file = File::create(file_path)?;

    // Write the string content to the file
    file.write_all(content.as_bytes())?;

    Ok(())
}

//Read file as string
pub fn read_file_as_string(path: &str) -> String {
    let file_path = path;

    let mut string_file = String::new();

    match fs::read_to_string(file_path) {
        Ok(contents) => {
            string_file = contents;
        }
        Err(_e) => ()
    }

    string_file
}
