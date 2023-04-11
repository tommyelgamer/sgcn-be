import { Type } from 'class-transformer';
import { IsString, ValidateNested, IsOptional } from 'class-validator';

class AudienceParticipant {
  @IsString()
  category: string;

  @IsString()
  sailNumber: string;
}

export class CreateResultReviewDto {
  @ValidateNested({ each: true })
  @Type(() => AudienceParticipant)
  requester: AudienceParticipant;

  @IsString()
  raceNumber: string;

  @IsString()
  actualResult: string;

  @IsString()
  requestedResult: string;

  @IsString()
  @IsOptional()
  request?: string;
}
