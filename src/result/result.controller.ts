import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  NotImplementedException,
  ParseIntPipe,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import { ChampionshipDecorator } from 'src/decorators/championship.decorator';

@Controller(':championshipCode/result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthenticationGuard)
  async create(
    @ChampionshipDecorator('id') championshipId: number,
    @Body() createResultDto: CreateResultDto,
    @UploadedFile() resultFile: Express.Multer.File,
  ) {
    if (resultFile) {
      const resultWithFile = await this.resultService.create(
        championshipId,
        createResultDto,
        {
          filename: resultFile.originalname,
          mimetype: resultFile.mimetype,
          filedata: resultFile.buffer,
        },
      );

      resultWithFile.attachment.file = undefined;
      return resultWithFile;
    } else {
      return this.resultService.create(championshipId, createResultDto);
    }
  }

  @Get()
  findAll(@ChampionshipDecorator('id') championshipId: number) {
    return this.resultService.findAll(championshipId);
  }

  @Get(':id')
  findOne(
    @ChampionshipDecorator('id') championshipId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.resultService.findOne(championshipId, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
  }
}
