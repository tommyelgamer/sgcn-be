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
  comment?: string;

  @IsOptional()
  @Type(() => AudienceResolution)
  resolution?: AudienceResolution;
}
