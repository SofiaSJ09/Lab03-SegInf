import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true }, // 👈 conversión implícita activada
  }));

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.listen(3001);
  console.log('Risk Calculator API running on http://localhost:3001');
}
bootstrap();
