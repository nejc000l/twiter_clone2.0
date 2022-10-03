export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
    NEXT_PUBLIC_SANITY_DATASET: string;
    NEXT_PUBLIC_SANITY_PROJECT_ID: any;
    NEXT_PUBLIC_SANITY_URL: string;
    SANITY_API_TOKEN : any;
    TWITTER_CLIENT_ID: any,
    TWITTER_CLIENT_SEC: any
    }
  }
}