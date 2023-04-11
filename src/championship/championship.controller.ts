import { Body, Controller, ParseIntPipe, Patch } from '@nestjs/common';
import { ChampionshipService } from './championship.service';
import { UpdateChampionshipFeaturesDto } from './dto/update-championship-feature.dto';
import { ChampionshipDecorator } from 'src/decorators/championship.decorator';

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

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
