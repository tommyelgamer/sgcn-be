import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChampionshipMiddleware } from 'src/championship/middleware/championship.middleware';
import { AudienceController } from './audience.controller';
import { ChampionshipModule } from 'src/championship/championship.module';

@Module({
  imports: [ChampionshipModule],
  controllers: [AudienceController],
})
export class RequestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChampionshipMiddleware).forRoutes(AudienceController);
  }
}
