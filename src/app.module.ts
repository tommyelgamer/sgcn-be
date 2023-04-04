import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DocumentModule } from './document/document.module';
import { Attachment } from './entities/attachment.entity';
import { Championship } from './entities/championship.entity';
import { CompetitorEntry } from './entities/competitorentry.entity';
import { Document } from './entities/document.entity';
import { File } from './entities/file.entity';
import { Audience } from './entities/requests/audience.entity';
import { EquipmentChange } from './entities/requests/equipmentchange.entity';
import { ResultReview } from './entities/requests/resultreview.entity';
import { Result } from './entities/result.entity';
import { SailingClass } from './entities/sailingclass.entity';
import { User } from './entities/user.entity';
import { Image } from './entities/image.entity';
import { Request } from './entities/requests/request.entity';

import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ChampionshipModule } from './championship/championship.module';

import { envVarsValidationSchema } from './env-vars.schema';
import { ChampionshipFeatures } from './entities/championshipfeatures.entity';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envVarsValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [
          File,
          Attachment,
          Document,
          Result,
          Image,
          Championship,
          SailingClass,
          CompetitorEntry,
          User,
          Request,
          Audience,
          ResultReview,
          EquipmentChange,
          ChampionshipFeatures,
        ],
        synchronize: configService.get<boolean>('POSTGRES_SYNCHRONIZE'),
      }),
    }),
    DocumentModule,
    UserModule,
    AuthenticationModule,
    ChampionshipModule,
    ResultModule,
  ],
})
export class AppModule {}
