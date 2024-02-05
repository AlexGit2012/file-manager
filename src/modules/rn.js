import {
  isExists,
  sendMessageWarning,
  sendInfoMessage,
} from "../utils/utils.js";
import fs from "fs";
import stream from "stream";
import path from "path";

export const rn = async (
  currentDirectory,
  firstLineArgument,
  secondLineArgument
) => {
  try {
    await isExists(path.resolve(currentDirectory, firstLineArgument)).then(
      (isFileExists) => {
        if (isFileExists) {
          const readStream = fs.createReadStream(
            path.resolve(currentDirectory, firstLineArgument)
          );
          const writeStream = fs.createWriteStream(
            path.resolve(currentDirectory, secondLineArgument)
          );
          stream.pipeline(readStream, writeStream, (error) => {
            fs.unlinkSync(path.resolve(currentDirectory, firstLineArgument));
          });
          sendInfoMessage("File successfully renamed!");
        } else {
          sendMessageWarning("Invalid input\n");
        }
      }
    );
  } catch (error) {
    sendMessageWarning("Operation failed");
  }
};
