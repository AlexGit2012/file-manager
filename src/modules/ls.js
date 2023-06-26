import fs from "fs";
import {sendInfoMessage} from "../utils/utils.js";

export const ls = (currentDirectory, readLineObject) => {
    fs.readdir(currentDirectory, {withFileTypes: true}, (err, files) => {
        if (err) {
            throw Error("Operation failed");
        } else {
            const sortedDirArr = [];
            const sortedFilesArr = [];
            files.forEach(file => {
                file.isFile() ? sortedFilesArr.push(file) : sortedDirArr.push(file);
            });
            const resultList = [...sortedDirArr, ...sortedFilesArr];
            if (resultList.length) {
                resultList.forEach(file => {
                    process.stdout.write(`${file.isFile() ? 'file' : 'Directory'} - \x1b[${file.isFile() ? '12' : '36'}m ${file.name} \x1b[0m\n`);
                })
                process.stdout.write('\n')
            } else {
                sendInfoMessage('List is empty.')
            }

            readLineObject.prompt();
        }
    });
}