import { IsString } from 'class-validator';
import { ERoleName } from 'src/enum/role.enum';

export class UpdateUserDto {
  @IsString()
  username?: string;

  @IsString()
  role?: ERoleName;
}
