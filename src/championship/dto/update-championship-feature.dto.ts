import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateChampionshipFeaturesDto {
  @IsOptional()
  @IsBoolean()
  audienceIsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  resultreviewIsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  equipmentchangeIsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  rule42IsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  declarationsIsEnabled?: boolean;
}
