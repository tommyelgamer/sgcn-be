import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResultDto {
  @IsNotEmpty()
  @IsString()
  sailingClass: string;

  @IsOptional()
  @IsString()
  url?: string;
}
