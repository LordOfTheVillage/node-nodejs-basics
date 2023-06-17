import fs from "fs"
import zlib from "zlib"
import path from "path"
import { fileURLToPath } from "url"

const decompress = async () => {
  const inputFile = "archive.gz"
  const outputFile = "fileToCompress.txt"
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const folder = "files"
  const inputFilePath = path.join(currentPath, folder, inputFile)
  const outputFilePath = path.join(currentPath, folder, outputFile)

  const readStream = fs.createReadStream(inputFilePath)
  const writeStream = fs.createWriteStream(outputFilePath)
  const gunzipStream = zlib.createGunzip()

  readStream.pipe(gunzipStream).pipe(writeStream)

  return new Promise((resolve, reject) => {
    writeStream.on("finish", resolve)
    writeStream.on("error", reject)
  })
}

await decompress()
