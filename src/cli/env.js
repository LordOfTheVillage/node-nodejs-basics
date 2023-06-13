const parseEnv = () => {
  const prefix = "RSS_"
  const separator = "; "
  const envs = process.env
  const prefixEnvs = Object.keys(envs)
    .filter((key) => key.startsWith(prefix))
    .reduce((array, key) => {
      array.push(`${key}=${envs[key]}`)
      return array
    }, [])
    .join(separator)
  console.log(prefixEnvs)
}

parseEnv()
