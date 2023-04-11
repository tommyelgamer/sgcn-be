import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChampionshipDecorator } from 'src/decorators/championship.decorator';
import { CreateResultReviewDto } from './dto/result-review/create-result-review.dto';
import { ResultReviewService } from './result-review.service';
import { UpdateResultReviewStatusDto } from './dto/result-review/update-result-review-status.dto';
import PermissionGuard from 'src/authentication/guards/permission.guard';
import EPermission from 'src/enum/permission/permission.type';

@Controller(':championshipCode/request/resultreview')
export class ResultReviewController {
  constructor(private readonly resultReviewService: ResultReviewService) {}

  @Get()
  async getAllResultReview(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
  ) {
    return this.resultReviewService.getAllResultReview(championshipId);
  }

  @Get(':id')
  async getResultReviewById(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.resultReviewService.getResultReviewById(championshipId, id);
  }

  @Post()
  async createResultReview(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Body() createResultReviewDto: CreateResultReviewDto,
  ) {
    return this.resultReviewService.createResultReview(
      championshipId,
      createResultReviewDto,
    );
  }

  @Patch(':id')
  @UseGuards(PermissionGuard(EPermission.UpdateResultReviewStatus))
  async updateResultReview(
    @ChampionshipDecorator('id', ParseIntPipe) championshipId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResultReviewDto: UpdateResultReviewStatusDto,
  ) {
    return this.resultReviewService.updateResultReviewStatus(
      championshipId,
      id,
      updateResultReviewDto,
    );
  }
}
