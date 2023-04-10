import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateResultDto {
  @IsNotEmpty()
  @IsBoolean()
  setHidden: boolean;
}
