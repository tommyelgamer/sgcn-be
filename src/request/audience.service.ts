import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateAudienceDto } from './dto/audience/create-audience.dto';
import { UpdateAudienceStatusDto } from './dto/audience/update-audience-status.dto';
import { Repository } from 'typeorm';
import { Audience } from 'src/entities/requests/audience.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AudienceService {
  constructor(
    @InjectRepository(Audience)
    private readonly audienceRepository: Repository<Audience>,
  ) {}

  async getAllMinimalAudience(championshipId: number) {
    throw new NotImplementedException();
  }

  async getFullAudienceById(championshipId: number, id: number) {
    throw new NotImplementedException();
  }

  async createAudience(
    championshipId: number,
    createAudienceDto: CreateAudienceDto,
  ) {
    const audience: Audience = {
      championshipId: championshipId,
      ...createAudienceDto,
      status: [
        {
          status: 'PENDING',
          date: new Date().toISOString(),
        },
      ],
    };

    return this.audienceRepository.save(audience);
  }

  async updateAudienceStatus(
    championshipId: number,
    updateAudienceStatus: UpdateAudienceStatusDto,
  ) {
    throw new NotImplementedException();
  }
}
