import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import PermissionGuard from 'src/authentication/guards/permission.guard';
import EPermission from 'src/enum/permission/permission.type';
import { UserService } from './user.service';
import { ChampionshipDecorator } from 'src/decorators/championship.decorator';

@Controller(':championshipCode/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(PermissionGuard(EPermission.GetChampionshipUsers))
  async getChampionshipUsers(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
  ) {
    return this.userService.getChampionshipUsers(championshipId);
  }

  @Post()
  @UseGuards(PermissionGuard(EPermission.CreateUser))
  async createUser() {
    throw new NotImplementedException();
  }

  @Patch()
  @UseGuards(PermissionGuard(EPermission.UpdateUser))
  async editUser() {
    throw new NotImplementedException();
  }

  @Delete()
  @UseGuards(PermissionGuard(EPermission.DeleteUser))
  async deleteUser() {
    throw new NotImplementedException();
  }
}
