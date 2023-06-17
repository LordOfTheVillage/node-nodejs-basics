import { spawn } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const spawnChildProcess = async (args) => {
  const currentPath = path.dirname(fileURLToPath(import.meta.url))
  const fileName = "script.js"
  const folder = "files"
  const filePath = path.join(currentPath, folder, fileName)
  const child = spawn("node", [filePath, ...args], { stdio: "pipe" })

  child.stdout.on("data", (data) => {
    process.stdout.write(data.toString())
  })

  process.stdin.pipe(child.stdin)

  process.stdin.on("end", () => {
    child.stdin.end()
  })
}

const argumentsToPass = ["someArgument1", "someArgument2"]
spawnChildProcess(argumentsToPass)
