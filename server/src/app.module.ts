import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RisksModule } from './risks/risks.module';
import { AppDataSource } from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    RisksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
