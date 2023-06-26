import fs from "fs";
import path from "path";
import stream from "stream";
import zlib from "zlib";

export const compress = async (currentDirectory, firstArgument, secondArgument) => {
    try {
        const brotli = zlib.createBrotliCompress();

        const readStream = await fs.createReadStream(path.resolve(currentDirectory, firstArgument));

        readStream.on('error', (error)=>{
            throw Error("Operation failed");
        })

        console.log(secondArgument, `${path.basename(firstArgument)}.br`)
        const writeStream = await fs.createWriteStream(path.resolve(currentDirectory, secondArgument, `${path.basename(firstArgument)}.br`), {flags: 'wx'});

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
