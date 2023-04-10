import { ERoleName } from 'src/enum/role.enum';

export interface UpdateUserDto {
  username?: string;
  role?: ERoleName;
}
