import {
  Controller,
  Get,
  NotImplementedException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import PermissionGuard from 'src/authentication/guards/permission.guard';
import EPermission from 'src/enum/permission/permission.type';

@Controller(':championshipCode/audience')
export class AudienceController {
  @Post()
  async createAudience() {
    throw new NotImplementedException();
  }

  @Get()
  async getAllMinimalAudience() {
    throw new NotImplementedException();
  }

  @Get(':id')
  @UseGuards(PermissionGuard(EPermission.GetFullAudienceData))
  async getFullAudienceById() {
    throw new NotImplementedException();
  }

  @Patch(':id')
  @UseGuards(PermissionGuard(EPermission.UpdateAudienceStatus))
  async updateAudienceStatus() {
    throw new NotImplementedException();
  }
}
