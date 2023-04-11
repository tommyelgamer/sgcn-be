import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ChampionshipDecorator } from 'src/decorators/championship.decorator';
import { CreateResultReviewDto } from './dto/result-review/create-result-review.dto';
import { ResultReviewService } from './result-review.service';
import { UpdateResultReviewDto } from './dto/result-review/update-result-review.dto';

@Controller(':championshipCode/request/resultreview')
export class ResultReviewController {
  constructor(private readonly resultReviewService: ResultReviewService) {}

  @Get()
  async getAllResultReview(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
  ) {
    throw new NotImplementedException();
  }

  @Get(':id')
  async getResultReviewById(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    throw new NotImplementedException();
  }

  @Post()
  async createResultReview(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Body() createResultReviewDto: CreateResultReviewDto,
  ) {
    throw new NotImplementedException();
  }

  @Patch(':id')
  async updateResultReview(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResultReviewDto: UpdateResultReviewDto,
  ) {
    throw new NotImplementedException();
  }
}
