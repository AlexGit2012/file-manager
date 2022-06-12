import {isExists, sendMessageWarning} from "../utils/utils.js";
import fs from "fs";
import stream from 'stream';
import path from "path";

export const rm = (currentDirectory, firstLineArgument, readLineObject) => {
    try {
        isExists(path.resolve(currentDirectory, firstLineArgument)).then((isFileExists) => {
            if (isFileExists && firstLineArgument) {
                fs.unlink(path.resolve(currentDirectory, firstLineArgument), ()=>{});
            } else {
                sendMessageWarning('Invalid input\n');
                readLineObject.prompt();
            }
        })
    }
    catch (error) {
        sendMessageWarning('Operation failed\n');
        readLineObject.prompt();
    }
}
