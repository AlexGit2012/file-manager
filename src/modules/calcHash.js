import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { sendInfoMessage, sendMessageWarning } from "../utils/utils.js";

export const calcHash = async (currentDirectory, lineArgument) => {
  try {
    const hashSum = crypto.createHash("sha256");
    await fs
      .readFile(path.resolve(currentDirectory, lineArgument))
      .then((data) => {
        hashSum.update(data);
        sendInfoMessage(`File hash - ${hashSum.digest("hex")}`);
      });
  } catch (error) {
    sendMessageWarning("Operation failed\n");
  }
};
