import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
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
