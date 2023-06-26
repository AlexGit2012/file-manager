import fs from "fs";
import path from "path";
import stream from "stream";
import zlib from "zlib";

export const decompress = async (currentDirectory, firstArgument, secondArgument) => {
    try {
        const brotli = zlib.createBrotliDecompress();

        const readStream = await fs.createReadStream(path.resolve(currentDirectory, firstArgument));

        readStream.on('error', (error)=>{
            throw Error("Operation failed1");
        })

        const decompressedFileName = firstArgument.replace('.br', '');
        const writeStream = await fs.createWriteStream(path.resolve(currentDirectory, secondArgument, path.basename(decompressedFileName)), {flags: 'wx'});

        writeStream.on('error', (error)=>{
            throw Error("Operation failed2");
        })

        stream.pipeline(
            readStream,
            brotli,
            writeStream,
            (error)=>{
                if (error) {
                    throw Error("Operation failed3");
                }
            }
        );
    }
    catch (error) {
        throw Error("Operation failed4");
    }
}
