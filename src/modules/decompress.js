import fs from "fs";
import path from "path";
import stream from "stream";
import zlib from "zlib";

export const decompress = async (currentDirectory, firstArgument, secondArgument) => {
    try {
        const brotli = zlib.createBrotliDecompress();

        const readStream = await fs.createReadStream(path.resolve(currentDirectory, firstArgument));

        readStream.on('error', (error)=>{
            throw Error("Operation failed");
        })

        const decompressedFileName = firstArgument.slice(0, -3);
        const writeStream = await fs.createWriteStream(path.resolve(currentDirectory, secondArgument, decompressedFileName), {flags: 'wx'});

        writeStream.on('error', (error)=>{
            throw Error("Operation failed");
        })

        stream.pipeline(
            readStream,
            brotli,
            writeStream,
            (error)=>{
                if (error) {
                    throw Error("Operation failed");
                }
            }
        );
    }
    catch (error) {
        throw Error("Operation failed");
    }
}
