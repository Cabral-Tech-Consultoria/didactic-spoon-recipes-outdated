declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string
      FOOD_API_ADDRESS: string
      TRANSLATION_API_ADDRESS: string
      AWS_USER_POOL_ID: string
      AWS_CLIENT_ID: string
      AWS_POLL_REGION: string
    }
  }
}
export {}