import { parentPort, workerData } from "worker_threads"

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2)

const sendResult = () => {
  const n = workerData
  const result = { status: "resolved", data: null }

  try {
    const computedResult = nthFibonacci(n)
    result.data = computedResult
  } catch (error) {
    result.status = "error"
  }

  parentPort.postMessage(result)
}

sendResult()
