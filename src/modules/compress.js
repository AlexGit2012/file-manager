import fs from "fs";
import path from "path";
import stream from "stream";
import zlib from "zlib";
import { sendInfoMessage } from "../utils/utils.js";

export const compress = async (
  currentDirectory,
  firstArgument,
  secondArgument = ""
) => {
  try {
    return new Promise((resolve) => {
      const brotli = zlib.createBrotliCompress();

      const readStream = fs.createReadStream(
        path.resolve(currentDirectory, firstArgument)
      );

      readStream.on("error", () => {
        throw Error("Operation failed");
      });

      console.log(secondArgument, `${path.basename(firstArgument)}.br`);
      const writeStream = fs.createWriteStream(
        path.resolve(
          currentDirectory,
          secondArgument,
          `${path.basename(firstArgument)}.br`
        ),
        { flags: "wx" }
      );

      writeStream.on("error", () => {
        throw Error("Operation failed");
      });

      stream.pipeline(readStream, brotli, writeStream, (error) => {
        if (error) {
          throw Error("Operation failed");
        }
        sendInfoMessage("File compressed!");
        resolve();
      });
    });
  } catch (error) {
    throw Error("Operation failed");
  }
};
