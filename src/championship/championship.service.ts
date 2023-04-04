import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Championship } from '../entities/championship.entity';
import { Repository } from 'typeorm';

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

  async getChampionshipByCode(championshipCode: string): Promise<Championship> {
    return this.championshipRepository.findOneOrFail({
      where: {
        isActive: true,
        code: championshipCode,
      },
      cache: true,
    });
  }
}
