import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import PermissionGuard from 'src/authentication/guards/permission.guard';
import { ChampionshipDecorator } from 'src/decorators/championship.decorator';
import EPermission from 'src/enum/permission/permission.type';
import { CreateAudienceDto } from './dto/audience/create-audience.dto';
import { AudienceService } from './audience.service';

@Controller(':championshipCode/request/audience')
export class AudienceController {
  constructor(private readonly audienceService: AudienceService) {}

  @Post()
  async createAudience(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Body() createAudienceDto: CreateAudienceDto,
  ) {
    return this.audienceService.createAudience(
      championshipId,
      createAudienceDto,
    );
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
