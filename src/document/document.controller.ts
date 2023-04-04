import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  ParseIntPipe,
  UseInterceptors,
  StreamableFile,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import { RequestWithChampionship } from '../championship/dto/request-with-championship';
import { RequestWithUserAndChampionship } from '../dto/request-with-user-and-championship';

import { Document } from '../entities/document.entity';
import { Readable } from 'stream';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { ChampionshipDecorator } from '../decorators/championship.decorator';

@Controller(':championshipCode/document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthenticationGuard)
  async create(
    @ChampionshipDecorator('id') championshipId: number,
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const documentWithFile = await this.documentService.create(
        championshipId,
        createDocumentDto,
        {
          filename: file.originalname,
          mimetype: file.mimetype,
          filedata: file.buffer,
        },
      );

      documentWithFile.attachment.file = undefined;
      return documentWithFile;
    } else {
      return this.documentService.create(championshipId, createDocumentDto);
    }
  }

  @Get()
  async findAll(
    @ChampionshipDecorator('id') championshipId: number,
  ): Promise<Document[]> {
    return this.documentService.findAll(championshipId);
  }

  @Get(':id')
  async findOne(
    @ChampionshipDecorator('id') championshipId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Document> {
    return this.documentService.findOne(championshipId, id);
  }

  @Get('download/:id')
  async downloadFile(
    @ChampionshipDecorator('id') championshipId: number,
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const document = await this.documentService.getDocumentFileById(
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
  ): Promise<Document> {
    return this.documentService.remove(championshipId, id);
  }
}
