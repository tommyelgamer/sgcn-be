import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { AudienceResolution } from 'src/entities/requests/audience.entity';

enum Statuses {
  'PENDING' = 'PENDING',
  'SCHEDULED' = 'SCHEDULED',
  'PROCCESSED' = 'PROCCESSED',
  'RETIRED' = 'RETIRED',
}

export class UpdateAudienceStatusDto {
  @IsEnum(Statuses)
  status: string;

  @IsOptional()
  @IsString()
  scheduleTime?: string;

  @IsOptional()
  @IsString()
  place?: string;

  @IsOptional()
  @Type(() => AudienceResolution)
  resolution?: AudienceResolution;
}
