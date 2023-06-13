import fs from "fs"

const create = async () => {
  const filePath = "src/fs/files/fresh.txt"
  const fileContent = "I am fresh and young"
  const errorContent = "FS operation failed"
  const notfoundCode = "ENOENT"

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
