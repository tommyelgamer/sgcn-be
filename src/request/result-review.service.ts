import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultReview } from 'src/entities/requests/resultreview.entity';
import { Repository } from 'typeorm';
import { CreateResultReviewDto } from './dto/result-review/create-result-review.dto';
import { UpdateResultReviewStatusDto } from './dto/result-review/update-result-review-status.dto';

@Injectable()
export class ResultReviewService {
  constructor(
    @InjectRepository(ResultReview)
    private readonly audienceRepository: Repository<ResultReview>,
  ) {}

  async getAllResultReview(championshipId: number) {
    return this.audienceRepository.find({
      where: {
        championshipId,
      },
    });
  }

  async getResultReviewById(championshipId: number, id: number) {
    return this.audienceRepository.findOne({
      where: {
        championshipId,
        id,
      },
    });
  }

  async createResultReview(
    championshipId: number,
    createResultReviewDto: CreateResultReviewDto,
  ) {
    const resultReview: ResultReview = {
      championshipId: championshipId,
      ...createResultReviewDto,
      status: [
        {
          status: 'PENDING',
          date: new Date().toISOString(),
        },
      ],
    };
    return this.audienceRepository.save(resultReview);
  }

  async updateResultReviewStatus(
    championshipId: number,
    id: number,
    updateResultReviewDto: UpdateResultReviewStatusDto,
  ) {
    const resultReviewToUpdate = await this.audienceRepository.findOne({
      where: {
        championshipId,
        id,
      },
    });

    if (!resultReviewToUpdate)
      throw new NotFoundException('Result review not found');

    resultReviewToUpdate.status.unshift({
      ...updateResultReviewDto,
      date: new Date().toISOString(),
    });

    await this.audienceRepository.update(
      {
        championshipId,
        id,
      },
      resultReviewToUpdate,
    );

    return id;
  }
}
