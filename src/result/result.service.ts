import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { Result } from '../entities/result.entity';
import { File } from '../entities/file.entity';
import { Attachment } from '../entities/attachment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async create(
    championshipId: number,
    createResultDto: CreateResultDto,
    uploadedFile?: { filename: string; mimetype: string; filedata: Buffer },
  ) {
    if (
      (createResultDto.url && uploadedFile) ||
      (!createResultDto.url && !uploadedFile)
    )
      throw new BadRequestException('Only one of URL or File must be defined');

    const resultToInsert = new Result();
    resultToInsert.class = createResultDto.sailingClass;
    resultToInsert.publishdate = new Date().toISOString();
    resultToInsert.isHidden = false;
    resultToInsert.championshipId = championshipId;

    const resultAttachment = new Attachment();

    if (createResultDto.url) {
      resultAttachment.url = createResultDto.url;
    }

    if (uploadedFile) {
      const resultFile = new File();

      resultFile.fileName = uploadedFile.filename;
      resultFile.mimetype = uploadedFile.mimetype;
      resultFile.data = uploadedFile.filedata;

      resultAttachment.file = resultFile;
    }

    resultToInsert.attachment = resultAttachment;

    return this.resultRepository.save(resultToInsert);
  }

  findAll(championshipId: number): Promise<Result[]> {
    return this.resultRepository.find({
      where: {
        championshipId: championshipId,
      },
      relations: {
        attachment: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
