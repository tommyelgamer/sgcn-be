import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ChampionshipService } from './championship.service';
import { UpdateChampionshipFeaturesDto } from './dto/update-championship-feature.dto';
import { ChampionshipDecorator } from 'src/decorators/championship.decorator';
import PermissionGuard from 'src/authentication/guards/permission.guard';
import EPermission from 'src/enum/permission/permission.type';

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Get()
  async getAllChampionships() {
    return this.championshipService.getAllChampionships();
  }

  @Get(':championshipCode')
  async getChampionshipDataByCode(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
  ) {
    const championship = await this.championshipService.getChampionshipById(
      championshipId,
    );
    return championship;
  }

  @Patch(':championshipCode')
  @UseGuards(PermissionGuard(EPermission.UpdateChampionshipFeatures))
  async updateChampionshipFeatures(
    @ChampionshipDecorator('id', ParseIntPipe) id: number,
    @Body() updateChampionshipFeaturesDto: UpdateChampionshipFeaturesDto,
  ) {
    return this.championshipService.updateChampionshipFeatures(
      id,
      updateChampionshipFeaturesDto,
    );
  }
}
