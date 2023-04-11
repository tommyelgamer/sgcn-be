import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
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
import { UpdateAudienceStatusDto } from './dto/audience/update-audience-status.dto';

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
  async getAllMinimalAudience(
    @ChampionshipDecorator('id') championshipId: number,
  ) {
    return this.audienceService.getAllMinimalAudience(championshipId);
  }

  @Get(':id')
  @UseGuards(PermissionGuard(EPermission.GetFullAudienceData))
  async getFullAudienceById() {
    throw new NotImplementedException();
  }

  @Patch(':id')
  @UseGuards(PermissionGuard(EPermission.UpdateAudienceStatus))
  async updateAudienceStatus(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAudienceStatusDto: UpdateAudienceStatusDto,
  ) {
    return this.audienceService.updateAudienceStatus(
      championshipId,
      id,
      updateAudienceStatusDto,
    );
  }
}
