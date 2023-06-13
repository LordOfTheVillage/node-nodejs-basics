import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const read = async () => {
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const fileName = "fileToRead.txt"
  const folder = "files"
  const filePath = path.join(currentPath, folder, fileName)

  const stream = fs.createReadStream(filePath, "utf8")

  stream.on("data", (chunk) => {
    process.stdout.write(chunk)
  })

  return new Promise((resolve, reject) => {
    stream.on("end", resolve)
    stream.on("error", reject)
  })
}

await read()
