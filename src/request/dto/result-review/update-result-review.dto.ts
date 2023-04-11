import { IsEnum, IsOptional, IsString } from 'class-validator';

enum EResultReviewStatus {
  PENDING = 'PENDING',
  AWARDED = 'AWARDED',
  DENIED = 'DENIED',
}

export class UpdateResultReviewDto {
  @IsEnum(EResultReviewStatus)
  status: EResultReviewStatus;

  @IsOptional()
  @IsString()
  comment?: string;
}
