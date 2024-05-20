interface EnvConfig {
  PORT: string | undefined
  NODE_ENV: string | undefined
  MONGO_URI: string | undefined
}

const _envConfig: EnvConfig = {
  PORT: process.env.port,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI
}

export const envConfig = {
  get(key: keyof EnvConfig) {
    const value = _envConfig[key]

    if (!value) {
      console.error(`No environment variable found with key ${key}.`)
    }
    return value
  }
}
