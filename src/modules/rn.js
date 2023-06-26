import {isExists, sendMessageWarning} from "../utils/utils.js";
import fs from "fs";
import stream from 'stream';
import path from "path";

export const rn = (currentDirectory, firstLineArgument, secondLineArgument, readLineObject) => {
    try {
        isExists(path.resolve(currentDirectory, firstLineArgument)).then(isFileExists => {
            if (isFileExists) {
                const readStream = fs.createReadStream(path.resolve(currentDirectory, firstLineArgument));
                const writeStream = fs.createWriteStream(path.resolve(currentDirectory, secondLineArgument));
                stream.pipeline(readStream, writeStream, (error) => {
                    fs.unlinkSync(path.resolve(currentDirectory, firstLineArgument));
                });
            } else {
                sendMessageWarning('Invalid input\n');
                readLineObject.prompt();
            }
        })
    }
    catch (error) {
        sendMessageWarning('Operation failed');
        readLineObject.prompt();
    }
}
