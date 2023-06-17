import { Transform } from "stream"

const reverseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const reversedChunk = chunk.toString().split("").reverse().join("")
    this.push(reversedChunk)
    callback()
  },
})

const transform = async () => {
  process.stdin.pipe(reverseTransform).pipe(process.stdout)
}

await transform()
