import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {sendInfoMessage, sendMessageWarning} from "../utils/utils.js";

export const calcHash = async (currentDirectory, lineArgument, readLineObject) => {
    try {
        const hashSum = crypto.createHash('sha256');
        fs.readFile(path.resolve(currentDirectory, lineArgument), (err, data)=>{
            if (err) {
                sendMessageWarning('Invalid input\n')
                readLineObject.prompt();
            } else {
                hashSum.update(data);
                sendInfoMessage(`File hash - ${hashSum.digest('hex')}`);
                readLineObject.prompt();
            }
        })
    }
    catch (error) {
        sendMessageWarning('Operation failed\n')
        readLineObject.prompt();
    }
};
