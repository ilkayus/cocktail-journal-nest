import { Secret } from '@nestjs/jwt';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: Secret;
    }
  }
}

export {};
