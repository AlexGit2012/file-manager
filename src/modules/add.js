import {sendInfoMessage, sendMessageWarning} from "../utils/utils.js";
import fs from "fs";
import path from "path";

export const add = (currentDirectory, lineArgument, readLineObject) => {
    const writableStream = fs.createWriteStream(path.join(currentDirectory, lineArgument), {flags: 'wx'});
    sendInfoMessage('File successfully created!')
    writableStream.end();
    writableStream.on('error', ()=>{
        throw Error("Operation failed");
    })
}
