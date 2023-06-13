const parseEnv = () => {
  const prefix = "RSS_"
  const args = process.argv
    .filter((a) => a.startsWith(prefix))
    .join("; ")
    .trim()
  console.log(args)
}

parseEnv()
