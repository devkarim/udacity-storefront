declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: 'dev' | 'test' | 'prod';
      PORT: string;
      POSTGRES_HOST: string;
      POSTGRES_DB: string;
      POSTGRES_DB_TEST: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;

      SALT_ROUNDS: string;
      BCRYPT_SECRET: string;
      JWT_SECRET: string;
    }
  }
}

export {};
