import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
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

  async getAudienceById(championshipId: number, id: number) {
    return this.audienceRepository.findOne({
      where: {
        championshipId,
        id,
      },
    });
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
    id: number,
    updateAudienceStatus: UpdateAudienceStatusDto,
  ) {
    const audience = await this.getAudienceById(championshipId, id);
    if (!audience) throw new NotFoundException('Audience not found');
    audience.status.unshift({
      date: new Date().toISOString(),
      ...updateAudienceStatus,
    });

    await this.audienceRepository.update(
      {
        id: id,
        championshipId: championshipId,
      },
      {
        ...audience,
      },
    );

    return id;
  }
}
