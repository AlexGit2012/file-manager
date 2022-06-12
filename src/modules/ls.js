import fs from "fs";

export const ls = (currentDirectory, readLineObject) => {
    fs.readdir(currentDirectory, (err, files) => {
        if (err) {
            throw Error("Operation failed");
        } else {
            files.forEach(file => {
                process.stdout.write(`\x1b[36m ${file} \x1b[0m\n`);
            });
            readLineObject.prompt();
        }
    });
}