import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const remove = async () => {
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const errorContent = "FS operation failed"
  const notfoundCode = "ENOENT"
  const folder = "files"
  const fileName = "fileToRemove.txt"
  const filePath = path.join(currentPath, folder, fileName)

  try {
    await fs.promises.access(filePath)
    await fs.promises.unlink(filePath)
  } catch (err) {
    if (err.code === notfoundCode) {
      throw new Error(errorContent)
    } else {
      throw err
    }
  }
}

await remove()
