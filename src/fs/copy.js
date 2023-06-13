import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const copy = async () => {
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const sourceDirName = "files"
  const targetDirName = "files_copy"
  const errorContent = "FS operation failed"
  const notfoundCode = "ENOENT"
  const sourceDir = path.join(currentPath, sourceDirName)
  const targetDir = path.join(currentPath, targetDirName)

  try {
    const sourceDirStats = await fs.promises.stat(sourceDir)
    if (!sourceDirStats.isDirectory()) {
      throw new Error(errorContent)
    }

    const targetDirStats = await fs.promises.stat(targetDir)
    if (targetDirStats.isDirectory()) {
      throw new Error(errorContent)
    }
  } catch (err) {
    if (err.code !== notfoundCode) {
      throw err
    }
  }

  await fs.promises.mkdir(targetDir)
  const files = await fs.promises.readdir(sourceDir)

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file)
    const targetPath = path.join(targetDir, file)

    await fs.promises.copyFile(sourcePath, targetPath)
  }
}

await copy()
