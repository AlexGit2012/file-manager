import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import { stat } from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);

export const getCurrentDirectory = () => path.dirname(__filename);

export const getCurrentFileDestination = () => fileURLToPath(import.meta.url);

export const isExists = async (filePath) => {
    try {
        await stat(filePath);
        return true;
    } catch (error) {
        return false;
    }
};

export const sendMessageWarning = (message) => {
    process.stdout.write(`\x1b[31m \n${message}\n \x1b[0m\n`);
}

export const sendInfoMessage = (message) => {
    process.stdout.write(`\x1b[34m \n${message}\n \x1b[0m\n`);
}
