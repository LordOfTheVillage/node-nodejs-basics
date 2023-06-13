import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const read = async () => {
  const errorContent = "FS operation failed"
  const notfoundCode = "ENOENT"
  const encoding = "utf8"
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const folder = "files"
  const fileName = "fileToRead.txt"
  const filePath = path.join(currentPath, folder, fileName)

  try {
    await fs.promises.access(filePath)

    const fileContent = await fs.promises.readFile(filePath, encoding)
    console.log(fileContent)
  } catch (err) {
    if (err.code === notfoundCode) {
      throw new Error(errorContent)
    } else {
      throw err
    }
  }
}

await read()
