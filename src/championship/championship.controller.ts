import { Body, Controller, Get, ParseIntPipe, Patch } from '@nestjs/common';
import { ChampionshipService } from './championship.service';
import { UpdateChampionshipFeaturesDto } from './dto/update-championship-feature.dto';
import { ChampionshipDecorator } from 'src/decorators/championship.decorator';

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
    return this.championshipService.getChampionshipById(championshipId);
  }

  @Patch(':championshipCode')
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
