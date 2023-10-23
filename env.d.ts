declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FOOD_API_KEY: string;
      TRANSLATION_API_KEY: string;
      TRANSLATION_API_ADDRESS: string;
    }
  }
}export {}