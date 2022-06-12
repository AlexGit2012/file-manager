import path from "path";

export const upOneLevel = (readLineObject, currentDirectory) => {
    let newDirectory = path.join(currentDirectory, '..');
    readLineObject.setPrompt(`You are currently in ${newDirectory}\n`);
    return newDirectory
}
