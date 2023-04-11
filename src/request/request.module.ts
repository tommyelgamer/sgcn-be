import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChampionshipMiddleware } from '../championship/middleware/championship.middleware';
import { AudienceController } from './audience.controller';
import { ChampionshipModule } from '../championship/championship.module';
import { AudienceService } from './audience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audience } from '../entities/requests/audience.entity';
import { ResultReviewController } from './result-review.controller';
import { ResultReviewService } from './result-review.service';
import { ResultReview } from 'src/entities/requests/resultreview.entity';

@Module({
  imports: [
    ChampionshipModule,
    TypeOrmModule.forFeature([Audience, ResultReview]),
  ],
  controllers: [AudienceController, ResultReviewController],
  providers: [AudienceService, ResultReviewService],
})
export class RequestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChampionshipMiddleware).forRoutes(AudienceController);
    consumer.apply(ChampionshipMiddleware).forRoutes(ResultReviewController);
  }
}
