import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Championship } from '../entities/championship.entity';
import { ChampionshipMiddleware } from './middleware/championship.middleware';
import { ChampionshipService } from './championship.service';
import { ChampionshipController } from './championship.controller';
import { ChampionshipFeatures } from 'src/entities/championshipfeatures.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Championship, ChampionshipFeatures])],
  providers: [ChampionshipService, ChampionshipMiddleware],
  controllers: [ChampionshipController],
  exports: [ChampionshipMiddleware, ChampionshipService],
})
export class ChampionshipModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChampionshipMiddleware).forRoutes(ChampionshipController);
  }
}
