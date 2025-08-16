import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Validación y conversión como ya tenías
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Detecta si estamos en despliegue (Render u otro)
  const isProd =
    process.env.NODE_ENV === 'production' ||
    process.env.RENDER === 'true' ||
    !!process.env.PORT; // Render inyecta PORT

  if (isProd) {
    // 🔐 CORS en producción: usa la URL del frontend (Vercel) desde env
    // Ejemplo FRONTEND_ORIGIN=https://tu-app.vercel.app
    const frontendOrigin = process.env.FRONTEND_ORIGIN;
    app.enableCors({
      origin: frontendOrigin
        ? [frontendOrigin]
        : [/^http:\/\/localhost:\d+$/, /\.vercel\.app$/], // fallback seguro
    });

    // (Opcional) Prefijo /api sólo si lo indicas por env (no rompe tu local)
    // En Render, puedes setear: API_PREFIX=api
    if (process.env.API_PREFIX) {
      app.setGlobalPrefix(process.env.API_PREFIX);
    }

    const port = parseInt(process.env.PORT || '3001', 10);
    await app.listen(port, '0.0.0.0');
    console.log(
      `Risk Calculator API running on http://0.0.0.0:${port}${process.env.API_PREFIX ? `/${process.env.API_PREFIX}` : ''
      }`,
    );
  } else {
    // 🧪 Modo local EXACTO como lo tenías
    app.enableCors({
      origin: 'http://localhost:5173',
    });

    await app.listen(3001);
    console.log('Risk Calculator API running on http://localhost:3001');
  }
}

bootstrap();
