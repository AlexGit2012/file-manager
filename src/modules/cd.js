import {isExists} from "../utils/utils.js";
import path from "path";

export const cd = async (lineArgument, currentDirectory, readLineObject) => {
    try {
        let newDirectory = currentDirectory
        const resolvedPath = (path.resolve(currentDirectory, lineArgument));
        await isExists(resolvedPath).then(isPathExists => {
            if (isPathExists && lineArgument.trim()) {
                newDirectory = resolvedPath;
                readLineObject.setPrompt(`You are currently in ${resolvedPath}\n`);
                readLineObject.prompt();
            } else {
                throw Error("Operation failed");
            }
        })
        return newDirectory;
    }
    catch (error) {
        throw Error("Operation failed");
    }
}
