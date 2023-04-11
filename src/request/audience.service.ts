import {
  BadRequestException,
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
    return this.audienceRepository.find({
      where: {
        championshipId,
      },
      select: {
        id: true,
        requester: {
          category: true,
          sailNumber: true,
        },
        participants: true,
        witnesses: true,
        championshipId: true,
        status: {
          status: true,
          date: true,
          place: true,
          scheduleTime: true,
        },
      },
    });
  }

  async getFullAudienceById(championshipId: number, id: number) {
    return this.audienceRepository.findOne({
      where: {
        championshipId,
        id,
      },
    });
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
    switch (updateAudienceStatus.status) {
      case 'PENDING':
      case 'RETIRED':
        if (
          updateAudienceStatus.scheduleTime &&
          updateAudienceStatus.place &&
          updateAudienceStatus.resolution
        )
          throw new BadRequestException(
            'Only status can be specified on the body when status is PENDING or RETIRED',
          );
        break;

      case 'SCHEDULED':
        if (
          updateAudienceStatus.resolution &&
          !updateAudienceStatus.scheduleTime &&
          !updateAudienceStatus.place
        )
          throw new BadRequestException(
            'When status is SCHEDULED. resolution cannot be specified, and scheduleTime and place must be',
          );
        break;

      case 'PROCCESSED':
        if (
          !updateAudienceStatus.resolution &&
          updateAudienceStatus.scheduleTime &&
          updateAudienceStatus.place
        )
          throw new BadRequestException(
            'When status is PROCCESSED. resolution must be specified, but scheduleTime and place cannot be',
          );
        break;

      default:
        break;
    }

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
