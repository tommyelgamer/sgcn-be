import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Championship } from '../entities/championship.entity';
import { Repository } from 'typeorm';
import { UpdateChampionshipFeaturesDto } from './dto/update-championship-feature.dto';
import { ChampionshipFeatures } from 'src/entities/championshipfeatures.entity';

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectRepository(Championship)
    private readonly championshipRepository: Repository<Championship>,
    @InjectRepository(ChampionshipFeatures)
    private readonly championshipFeaturesRepository: Repository<ChampionshipFeatures>,
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

    await this.championshipFeaturesRepository.update(
      {
        id: championship.championshipFeaturesId,
      },
      updateChampionshipFeaturesDto,
    );

    return championshipId;
  }
}
