import fs from "fs";
import path from "path";
import stream from "stream";
import zlib from "zlib";
import { sendInfoMessage } from "../utils/utils.js";

export const decompress = async (
  currentDirectory,
  firstArgument,
  secondArgument = ""
) => {
  try {
    new Promise((resolve) => {
      const brotli = zlib.createBrotliDecompress();

      const readStream = fs.createReadStream(
        path.resolve(currentDirectory, firstArgument)
      );

      readStream.on("error", () => {
        throw Error("Operation failed");
      });

      const decompressedFileName = firstArgument.replace(".br", "");
      const writeStream = fs.createWriteStream(
        path.resolve(
          currentDirectory,
          secondArgument,
          path.basename(decompressedFileName)
        ),
        { flags: "wx" }
      );

      writeStream.on("error", (error) => {
        throw Error("Operation failed");
      });

      stream.pipeline(readStream, brotli, writeStream, (error) => {
        if (error) {
          throw Error("Operation failed");
        }
      });
      sendInfoMessage("File decompressed!");
      resolve();
    });
  } catch (error) {
    throw Error("Operation failed4");
  }
};
