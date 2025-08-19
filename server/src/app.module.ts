import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RisksModule } from './risks/risks.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isProd = process.env.NODE_ENV === 'production';
        return {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          // Si tus entidades están registradas en sus módulos con forFeature, esto basta:
          autoLoadEntities: true,
          // Si prefieres ir a la segura, añade también el patrón de entidades compiladas:
          entities: [__dirname + '/**/*.entity{.js,.ts}'],
          // Para arrancar rápido. En producción, cámbialo a false y usa migraciones.
          synchronize: true,
          ssl: isProd ? { rejectUnauthorized: false } : undefined,
        };
      },
    }),
    RisksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
