import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChampionshipMiddleware } from '../championship/middleware/championship.middleware';
import { AudienceController } from './audience.controller';
import { ChampionshipModule } from '../championship/championship.module';
import { AudienceService } from './audience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audience } from '../entities/requests/audience.entity';

@Module({
  imports: [ChampionshipModule, TypeOrmModule.forFeature([Audience])],
  controllers: [AudienceController],
  providers: [AudienceService],
})
export class RequestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChampionshipMiddleware).forRoutes(AudienceController);
  }
}
