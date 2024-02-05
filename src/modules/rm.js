import { isExists, sendInfoMessage } from "../utils/utils.js";
import fs from "fs/promises";
import path from "path";

export const rm = async (currentDirectory, firstLineArgument) => {
  await isExists(path.resolve(currentDirectory, firstLineArgument))
    .then((isFileExists) => {
      if (isFileExists && firstLineArgument) {
        return fs.unlink(path.resolve(currentDirectory, firstLineArgument));
      } else throw new Error("Invalid input");
    })
    .then(() => {
      sendInfoMessage("File successfully removed!");
    });
};
