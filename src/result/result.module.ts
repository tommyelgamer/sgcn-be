import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from '../entities/result.entity';
import { ChampionshipMiddleware } from '../championship/middleware/championship.middleware';
import { ChampionshipModule } from 'src/championship/championship.module';

@Module({
  imports: [TypeOrmModule.forFeature([Result]), ChampionshipModule],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChampionshipMiddleware).forRoutes(ResultController);
  }
}
