import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const rename = async () => {
  const errorContent = "FS operation failed"
  const notfoundCode = "ENOENT"
  const oldFileName = "wrongFilename.txt"
  const newFileName = "properFilename.md"
  const folder = "files"
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const oldFilePath = path.join(currentPath, folder, oldFileName)
  const newFilePath = path.join(currentPath, folder, newFileName)

  try {
    await fs.promises.access(oldFilePath)
    await fs.promises.access(newFilePath)

    throw new Error(errorContent)
  } catch (err) {
    if (err.code === notfoundCode) {
      await fs.promises.rename(oldFilePath, newFilePath)
    } else {
      throw err
    }
  }
}

await rename()
