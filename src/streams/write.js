import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const write = async () => {
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const fileName = "fileToWrite.txt"
  const folder = "files"
  const filePath = path.join(currentPath, folder, fileName)

  const writeStream = fs.createWriteStream(filePath, "utf8")

  process.stdin.pipe(writeStream)

  return new Promise((resolve, reject) => {
    writeStream.on("finish", resolve)
    writeStream.on("error", reject)
  })
}

await write()
