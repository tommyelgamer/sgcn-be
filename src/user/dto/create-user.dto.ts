import { ERoleName } from 'src/enum/role.enum';

export interface CreateUserDto {
  username: string;
  password: string;
  role: ERoleName;
}
