import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Championship } from '../entities/championship.entity';
import { Repository } from 'typeorm';
import { UpdateChampionshipFeaturesDto } from './dto/update-championship-feature.dto';

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectRepository(Championship)
    private readonly championshipRepository: Repository<Championship>,
  ) {}

  async getAllChampionships(): Promise<Championship[]> {
    return this.championshipRepository.find({
      where: {
        isActive: true,
      },
      cache: true,
    });
  }

  async getChampionshipById(championshipId: number) {
    return this.championshipRepository.findOne({
      where: {
        isActive: true,
        id: championshipId,
      },
      relations: {
        championshipFeatures: true,
      },
    });
  }

  async getChampionshipByCode(championshipCode: string): Promise<Championship> {
    return this.championshipRepository.findOneOrFail({
      where: {
        isActive: true,
        code: championshipCode,
      },
      cache: true,
    });
  }

  async updateChampionshipFeatures(
    championshipId: number,
    updateChampionshipFeaturesDto: UpdateChampionshipFeaturesDto,
  ) {
    const championship = await this.championshipRepository.findOne({
      where: {
        isActive: true,
        id: championshipId,
      },
      relations: {
        championshipFeatures: true,
      },
    });

    if (!championship) throw new NotFoundException('Championship not found');

    championship.championshipFeatures.audienceIsEnabled =
      updateChampionshipFeaturesDto.audienceIsEnabled ||
      championship.championshipFeatures.audienceIsEnabled;
    championship.championshipFeatures.declarationsIsEnabled =
      updateChampionshipFeaturesDto.declarationsIsEnabled ||
      championship.championshipFeatures.declarationsIsEnabled;
    championship.championshipFeatures.equipmentchangeIsEnabled =
      updateChampionshipFeaturesDto.equipmentchangeIsEnabled ||
      championship.championshipFeatures.equipmentchangeIsEnabled;
    championship.championshipFeatures.resultreviewIsEnabled =
      updateChampionshipFeaturesDto.resultreviewIsEnabled ||
      championship.championshipFeatures.resultreviewIsEnabled;
    championship.championshipFeatures.rule42IsEnabled =
      updateChampionshipFeaturesDto.rule42IsEnabled ||
      championship.championshipFeatures.rule42IsEnabled;

    await this.championshipRepository.update(
      {
        id: championshipId,
      },
      championship,
    );

    return championshipId;
  }
}
