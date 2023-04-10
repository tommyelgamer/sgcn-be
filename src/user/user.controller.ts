import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import PermissionGuard from 'src/authentication/guards/permission.guard';
import EPermission from 'src/enum/permission/permission.type';
import { UserService } from './user.service';
import { ChampionshipDecorator } from 'src/decorators/championship.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  async createUser(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = await this.userService.createUser(
      championshipId,
      createUserDto,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userToReturn } = user;
    return userToReturn;
  }

  @Patch(':id')
  @UseGuards(PermissionGuard(EPermission.UpdateUser))
  async editUser(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(championshipId, id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(EPermission.DeleteUser))
  async deleteUser(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<number> {
    return this.userService.removeUser(championshipId, id);
  }
}
