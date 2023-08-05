#[path = "./io.rs"]
mod io;

use std::fs::{self, File};
use std::io::{Write, Read};
use std::process::{Command, Stdio};

use io::read_file_as_string;

use uuid::Uuid;
use dotenv::dotenv;

// Transpile the ts to js using the tsc
pub fn transpile_typescript(typescript_code: &str) -> String {
    dotenv().ok();

    // Create the .temp folder if it doesn't exist
    if let Err(err) = fs::create_dir(".temp") {
        if err.kind() != std::io::ErrorKind::AlreadyExists {
            eprintln!("Error creating .temp folder: {:?}", err);
            return typescript_code.to_string();
        }
    }

    // Generate a temporary TypeScript file path inside the .temp folder
    let id = Uuid::new_v4();
    let temp_file_path = &format!(".temp/{}.ts", id);
    let transpiled_file_path = &format!(".temp/{}.js", id);

    // Write the TypeScript code to the temporary file
    let mut temp_file = File::create(temp_file_path).expect("Failed to create temp file");
    temp_file
        .write_all(typescript_code.as_bytes())
        .expect("Failed to write to temp file");

    // Create the command and set up the stdin to pass the TypeScript code as a string
    let tsc_path = std::env::var("TSC_PATH").expect("TSC_PATH not set in .env");
    let mut child = Command::new(tsc_path)
        .arg("--esModuleInterop") // Add any additional arguments you want to pass to the TypeScript compiler
        .arg("--removeComments")
        .arg("--pretty")
        .arg(temp_file_path)
        .stdout(Stdio::piped()) // Set up stdout to capture the output
        .stderr(Stdio::piped()) // Set up stderr to capture the error output
        .spawn()
        .expect("Failed to start tsc command");

    // Wait for the tsc process to finish and check if it executed successfully
    let status = child.wait().expect("Failed to wait for tsc process");

    // Read the captured stdout and stderr into variables
    let mut stdout_buffer = Vec::new();
    let mut stderr_buffer = Vec::new();
    child.stdout.expect("Failed to capture stdout").read_to_end(&mut stdout_buffer).unwrap();
    child.stderr.expect("Failed to capture stderr").read_to_end(&mut stderr_buffer).unwrap();

    if !status.success() {
        println!("Error occurred while compiling TypeScript:");
        println!("stdout: {}", String::from_utf8_lossy(&stdout_buffer));
        println!("stderr: {}", String::from_utf8_lossy(&stderr_buffer));
    }

    // Remove the temporary file after the TypeScript compilation is done
    if let Err(err) = fs::remove_file(temp_file_path) {
        eprintln!("Error removing ts temp file: {:?}", err);
    }

    let output = read_file_as_string(transpiled_file_path);

    if let Err(err) = fs::remove_file(transpiled_file_path) {
        eprintln!("Error removing js temp file: {:?}", err);
    }


    output
}