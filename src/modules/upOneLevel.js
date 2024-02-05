import path from "path";

export const upOneLevel = (currentDirectory) => {
  let newDirectory = path.join(currentDirectory, "..");
  return newDirectory;
};
