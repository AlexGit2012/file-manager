import readline from "readline";
import os from "os";
import { sendMessageWarning } from "./utils/utils.js";
import { upOneLevel } from "./modules/upOneLevel.js";
import { cd } from "./modules/cd.js";
import { ls } from "./modules/ls.js";
import { cat } from "./modules/cat.js";
import { add } from "./modules/add.js";
import { rn } from "./modules/rn.js";
import { cp } from "./modules/cp.js";
import { mv } from "./modules/mv.js";
import { rm } from "./modules/rm.js";
import { sendInfoMessage } from "./utils/utils.js";
import { calcHash } from "./modules/calcHash.js";
import { compress } from "./modules/compress.js";
import { decompress } from "./modules/decompress.js";

export const fileManager = async () => {
  const argv = process.argv.slice(2);
  const username = argv[0]?.replace("--username=", "") || "Guest";
  let currentDirectory = os.homedir();

  const rlInterface = {
    input: process.stdin,
    output: process.stdout,
  };
  const rl = readline.createInterface(rlInterface);

  try {
    process.stdout.write(`Welcome to the File Manager, ${username}!\n\n`);

    rl.setPrompt(`\nYou are currently in ${currentDirectory}\n`);
    rl.prompt();

    process.on("uncaughtException", (error) => {
      sendMessageWarning(error.message + "\n");
      rl.prompt();
    });

    rl.on("SIGINT", () => {
      process.stdout.write(`Thank you for using File Manager, ${username}!\n`);
      process.exit();
    });

    rl.on("line", async (userInput) => {
      try {
        const lineArgs = userInput.split(" ");
        const command = lineArgs[0];
        switch (command) {
          case "up": {
            currentDirectory = upOneLevel(currentDirectory);
            rl.setPrompt(`You are currently in ${currentDirectory}\n`);
            break;
          }
          case "cd": {
            const newDirectory = await cd(lineArgs[1], currentDirectory);
            currentDirectory = newDirectory;
            rl.setPrompt(`You are currently in ${currentDirectory}\n`);
            break;
          }
          case "ls": {
            await ls(currentDirectory);
            break;
          }
          case "cat": {
            await cat(currentDirectory, lineArgs[1]);
            break;
          }
          case "add": {
            add(currentDirectory, lineArgs[1]);
            break;
          }
          case "rn": {
            await rn(currentDirectory, lineArgs[1], lineArgs[2]);
            break;
          }
          case "cp": {
            await cp(currentDirectory, lineArgs[1], lineArgs[2]);
            break;
          }
          case "mv": {
            await mv(currentDirectory, lineArgs[1], lineArgs[2]);
            break;
          }
          case "rm": {
            await rm(currentDirectory, lineArgs[1], rl);
            break;
          }
          case "os": {
            const osCommand = lineArgs[1] ? lineArgs[1].slice(2) : "";
            switch (osCommand) {
              case "EOL": {
                sendInfoMessage(`System EOL - ${JSON.stringify(os.EOL)}`);
                break;
              }
              case "cpus": {
                sendInfoMessage(
                  `System cpus - ${os.cpus().length}\nDetailed info:\n${os
                    .cpus()
                    .reduce((acc, cpu) => {
                      acc += JSON.stringify(cpu) + "\n";
                      return acc;
                    }, "")}`
                );
                break;
              }
              case "homedir": {
                sendInfoMessage(`Homedir - ${os.homedir()}`);
                break;
              }
              case "username": {
                sendInfoMessage(`Current username - ${os.userInfo().username}`);
                break;
              }
              case "architecture": {
                sendInfoMessage(`Architecture - ${os.arch()}`);
                break;
              }
              default: {
                sendMessageWarning("Invalid input");
                break;
              }
            }
            break;
          }
          case "hash": {
            await calcHash(currentDirectory, lineArgs[1]);
            break;
          }
          case "compress": {
            await compress(currentDirectory, lineArgs[1], lineArgs[2]);
            break;
          }
          case "decompress": {
            await decompress(currentDirectory, lineArgs[1], lineArgs[2]);
            break;
          }
          case ".exit": {
            rl.emit("SIGINT");
            break;
          }
          default: {
            sendMessageWarning("Invalid input");
            break;
          }
        }
        rl.prompt();
      } catch (error) {
        sendMessageWarning(error.message);
        rl.prompt();
      }
    });
  } catch (error) {
    sendMessageWarning(error.message);
    rl.prompt();
  }
};

fileManager();
