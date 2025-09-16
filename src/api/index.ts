import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express'; // @nestjs/platform-express의 ExpressAdapter 사용
import { AppModule } from '../app.module.js';
import * as serverless from 'serverless-http';
import express from 'express';

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  await app.init();
  return serverless(expressApp);
}

export const handler = async (req: any, res: any) => {
  const server = await bootstrap();
  return server(req, res);
};

//ExpressAdapter를 사용하면 NestFactory가 Express를 올바르게 인식 → 타입 오류 제거
// Serverless 환경에서도 바로 사용할 수 있음
