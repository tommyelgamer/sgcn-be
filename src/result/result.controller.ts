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
  ParseIntPipe,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import { ChampionshipDecorator } from 'src/decorators/championship.decorator';
import { Readable } from 'stream';

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
  async findAll(@ChampionshipDecorator('id') championshipId: number) {
    return this.resultService.findAll(championshipId);
  }

  @Get(':id')
  async findOne(
    @ChampionshipDecorator('id') championshipId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.resultService.findOne(championshipId, id);
  }

  @Get('download/:id')
  async downloadFile(
    @ChampionshipDecorator('id') championshipId: number,
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const document = await this.resultService.getResultFileById(
      championshipId,
      id,
    );

    const stream = Readable.from(document.attachment.file.data);

    response.set({
      'Content-Disposition': `inline; filename="${document.attachment.file.fileName}"`,
      'Content-Type': document.attachment.file.mimetype,
    });

    return new StreamableFile(stream);
  }

  @Delete(':id')
  async remove(
    @ChampionshipDecorator('id') championshipId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.resultService.remove(championshipId, id);
  }
}
