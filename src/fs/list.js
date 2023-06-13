import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const list = async () => {
  const errorContent = "FS operation failed"
  const notfoundCode = "ENOENT"
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const folder = "files"
  const folderPath = path.join(currentPath, folder)

  try {
    await fs.promises.access(folderPath)
    const filenames = await fs.promises.readdir(folderPath)
    console.log(filenames)
  } catch (err) {
    if (err.code === notfoundCode) {
      throw new Error(errorContent)
    } else {
      throw err
    }
  }
}

await list()
