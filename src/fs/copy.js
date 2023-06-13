import fs from "fs"
import path from "path"

const copy = async () => {
  const sourceDir = "src/fs/files"
  const targetDir = "src/fs/files_copy"
  const errorContent = "FS operation failed"
  const notfoundCode = "ENOENT"

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
