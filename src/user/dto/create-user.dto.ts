import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ERoleName } from 'src/enum/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ERoleName)
  role: ERoleName;
}
