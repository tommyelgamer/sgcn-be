import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultReview } from 'src/entities/requests/resultreview.entity';
import { Repository } from 'typeorm';
import { CreateResultReviewDto } from './dto/result-review/create-result-review.dto';
import { UpdateResultReviewDto } from './dto/result-review/update-result-review.dto';

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
    throw new NotImplementedException();
  }

  async updateResultReviewStatus(
    championshipId: number,
    id: number,
    updateResultReviewDto: UpdateResultReviewDto,
  ) {
    throw new NotImplementedException();
  }
}
