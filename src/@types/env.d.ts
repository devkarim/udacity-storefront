declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: 'dev' | 'prod' | 'test';
      PORT: number;
      POSTGRES_HOST: string;
      POSTGRES_DB: string;
      POSTGRES_DB_TEST: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      SALT_ROUNDS: number;
      BCRYPT_SECRET: string;
    }
  }
}
