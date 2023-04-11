import { Injectable, NotImplementedException } from '@nestjs/common';
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
    throw new NotImplementedException();
  }

  async getResultReviewById(championshipId: number, id: number) {
    throw new NotImplementedException();
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
    throw new NotImplementedException();
  }
}
