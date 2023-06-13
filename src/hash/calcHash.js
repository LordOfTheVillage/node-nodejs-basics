import fs from "fs"
import crypto from "crypto"
import path from "path"
import { fileURLToPath } from "url"

const calculateHash = async () => {
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const folder = "files"
  const fileName = "fileToCalculateHashFor.txt"
  const filePath = path.join(currentPath, folder, fileName)
  
  const fileData = await fs.promises.readFile(filePath)
  const hash = crypto.createHash("sha256")
  hash.update(fileData)
  const hashHex = hash.digest("hex")
  console.log(hashHex)
}

await calculateHash()
