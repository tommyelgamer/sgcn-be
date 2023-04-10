import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateAudienceDto } from './dto/audience/create-audience.dto';
import { UpdateAudienceStatusDto } from './dto/audience/update-audience-status.dto';

@Injectable()
export class AudienceService {
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
    throw new NotImplementedException();
  }

  async updateAudienceStatus(
    championshipId: number,
    updateAudienceStatus: UpdateAudienceStatusDto,
  ) {
    throw new NotImplementedException();
  }
}
