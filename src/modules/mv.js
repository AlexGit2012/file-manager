import { isExists, sendInfoMessage } from "../utils/utils.js";
import fs from "fs";
import path from "path";
import stream from "stream";

export const mv = async (
  currentDirectory,
  firstLineArgument,
  secondLineArgument = ""
) => {
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
  ]).then((filesPathsStatus) => {
    if (filesPathsStatus[0] && filesPathsStatus[1]) {
      if (filesPathsStatus[2]) throw new Error("Operation failed");
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
      stream.pipeline(readStream, writeStream, () => {
        fs.unlink(path.resolve(currentDirectory, firstLineArgument), () => {});
      });
      sendInfoMessage("File successfully moved!");
    } else throw new Error("Invalid input");
  });
};
