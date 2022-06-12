import {isExists, sendMessageWarning} from "../utils/utils.js";
import path from "path";
import fs from "fs";

export const cat = async (currentDirectory, lineArgument, readLineObject) => {
    try {
        const resolvedPath = (path.resolve(currentDirectory, lineArgument));
        const readStream = await fs.createReadStream(resolvedPath, {encoding: 'utf-8'});
        readStream.on('error', ()=>{
            throw Error("Operation failed");
        })
        readStream.on('data', async (data) => {
            await process.stdout.write(`\x1b[32m ${data} \x1b[0m\n`);
        })
        readStream.on('end', async () => {
            readLineObject.prompt();
        })
    } catch (error) {
        throw Error("Operation failed");
    }
}