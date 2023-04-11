import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EResultReviewStatus } from 'src/entities/requests/resultreview.entity';

export class UpdateResultReviewStatusDto {
  @IsEnum(EResultReviewStatus)
  status: EResultReviewStatus;

  @IsOptional()
  @IsString()
  comment?: string;
}
