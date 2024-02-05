import {
  isExists,
  sendInfoMessage,
  sendMessageWarning,
} from "../utils/utils.js";
import fs from "fs";
import stream from "stream";
import path from "path";

export const cp = async (
  currentDirectory,
  firstLineArgument,
  secondLineArgument = ""
) => {
  try {
    await Promise.all([
      isExists(path.resolve(currentDirectory, firstLineArgument)),
      isExists(path.resolve(currentDirectory, secondLineArgument)),
      isExists(
        path.resolve(
          currentDirectory,
          secondLineArgument,
          firstLineArgument.split("/").at(-1)
        )
      ),
    ]).then(async (filesPathsStatus) => {
      if (filesPathsStatus[0] && filesPathsStatus[1]) {
        if (filesPathsStatus[2]) throw new Error();
        const readStream = fs.createReadStream(
          path.resolve(currentDirectory, firstLineArgument)
        );
        const writeStream = fs.createWriteStream(
          path.resolve(
            currentDirectory,
            secondLineArgument,
            path.basename(firstLineArgument)
          )
        );
        stream.pipeline(readStream, writeStream, () => {});
        sendInfoMessage("File successfully copied!");
      } else throw new Error("Invalid input");
    });
  } catch (error) {
    sendMessageWarning("Operation failed");
  }
};
