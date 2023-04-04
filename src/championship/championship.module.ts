import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Championship } from '../entities/championship.entity';
import { ChampionshipMiddleware } from './middleware/championship.middleware';
import { ChampionshipService } from './championship.service';
import { ChampionshipController } from './championship.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Championship])],
  providers: [ChampionshipService, ChampionshipMiddleware],
  controllers: [ChampionshipController],
  exports: [ChampionshipMiddleware, ChampionshipService],
})
export class ChampionshipModule {}
