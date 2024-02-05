import { isExists } from "../utils/utils.js";
import path from "path";

export const cd = async (lineArgument, currentDirectory) => {
  try {
    let newDirectory = currentDirectory;
    const resolvedPath = path.resolve(currentDirectory, lineArgument);
    await isExists(resolvedPath).then((isPathExists) => {
      if (isPathExists && lineArgument.trim()) {
        newDirectory = resolvedPath;
      } else {
        throw Error("Operation failed");
      }
    });
    return newDirectory;
  } catch (error) {
    throw Error(
      error?.message === "Operation failed"
        ? "Operation failed"
        : "Invalid input"
    );
  }
};
