import os from "os"
import path from "path"
import { fileURLToPath } from "url"
import { Worker, isMainThread } from "worker_threads"

const currentPath = path.dirname(fileURLToPath(import.meta.url))
const workerScriptFileName = "worker.js"
const workerScriptPath = path.join(currentPath, workerScriptFileName)
const numCores = os.cpus().length

const performCalculations = async () => {
  if (isMainThread) {
    const startValue = 10
    const workerPromises = []

    for (let i = 0; i < numCores; i++) {
      const worker = new Worker(workerScriptPath, {
        workerData: i + startValue,
      })
      const promise = new Promise((resolve, reject) => {
        worker.on("message", resolve)
        worker.on("error", reject)
        worker.on("exit", (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`))
          }
        })
      })
      workerPromises.push(promise)
    }

    const results = await Promise.all(workerPromises)
    console.log(results)
  }
}

await performCalculations()
