import path from "path";
import fs from "fs";

export const cat = async (currentDirectory, lineArgument) => {
  try {
    const resolvedPath = path.resolve(currentDirectory, lineArgument);
    return new Promise((resolve) => {
      fs.createReadStream(resolvedPath, { encoding: "utf-8" })
        .on("data", async (data) => {
          process.stdout.write(`\x1b[32m ${data} \x1b[0m\n`);
        })
        .on("error", async () => {
          throw new Error("Invalid input");
        })
        .on("end", async () => {
          resolve();
        });
    });
  } catch (error) {
    throw Error("Operation failed");
  }
};
