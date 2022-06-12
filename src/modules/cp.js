import {isExists, sendMessageWarning} from "../utils/utils.js";
import fs from "fs";
import stream from 'stream';
import path from "path";

export const cp = (currentDirectory, firstLineArgument, secondLineArgument, readLineObject) => {
    try {
        isExists(path.resolve(currentDirectory, firstLineArgument)).then((isFileExists) => {
            if (isFileExists) {
                const dir = path.dirname(path.resolve(currentDirectory, secondLineArgument));
                isExists(dir).then(isDestinationExists => {
                    if (isDestinationExists) {
                        const readStream = fs.createReadStream(path.resolve(currentDirectory, firstLineArgument));
                        const writeStream = fs.createWriteStream(path.resolve(currentDirectory, secondLineArgument, firstLineArgument));
                        stream.pipeline(readStream, writeStream, () => {});
                    } else {
                        sendMessageWarning('Invalid input');
                        readLineObject.prompt();
                    }
                })
            } else {
                sendMessageWarning('Invalid input');
                readLineObject.prompt();
            }
        })
    }
    catch (error) {
        sendMessageWarning('Operation failed');
        readLineObject.prompt();
    }
}
