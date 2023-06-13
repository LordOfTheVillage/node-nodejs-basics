import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const create = async () => {
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const folder = "files"
  const fileName = "fresh.txt"
  const fileContent = "I am fresh and young"
  const errorContent = "FS operation failed"
  const notfoundCode = "ENOENT"
  const filePath = path.join(currentPath, folder, fileName)

  try {
    await fs.promises.access(filePath)
    throw new Error(errorContent)
  } catch (err) {
    if (err.code === notfoundCode) {
      await fs.promises.writeFile(filePath, fileContent)
    } else {
      throw err
    }
  }
}

await create()
