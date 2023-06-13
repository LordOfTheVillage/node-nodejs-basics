const parseArgs = () => {
  const flagIndex = "--"
  const separator = ", "
  const args = process.argv.slice(2)
  const flags = args.filter((arg) => arg.startsWith(flagIndex))
  const result = flags
    .map((flag) => {
      const flagName = flag.slice(2)
      const valueIndex = args.indexOf(flag) + 1
      return `${flagName} is ${args[valueIndex]}`
    })
    .join(separator)
  console.log(result)
}

parseArgs()
