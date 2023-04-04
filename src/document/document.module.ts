import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';

import { Document } from '../entities/document.entity';
import { ChampionshipMiddleware } from '../championship/middleware/championship.middleware';
import { ChampionshipModule } from '../championship/championship.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), ChampionshipModule],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChampionshipMiddleware).forRoutes(DocumentController);
  }
}
