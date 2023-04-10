import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ChampionshipMiddleware } from 'src/championship/middleware/championship.middleware';
import { ChampionshipModule } from 'src/championship/championship.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ChampionshipModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChampionshipMiddleware).forRoutes(UserController);
  }
}
