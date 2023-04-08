import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { Result } from '../entities/result.entity';
import { File } from '../entities/file.entity';
import { Attachment } from '../entities/attachment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

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
    hideLastResult = true,
  ) {
    if (
      (createResultDto.url && uploadedFile) ||
      (!createResultDto.url && !uploadedFile)
    )
      throw new BadRequestException('Only one of URL or File must be defined');

    const resultToInsert = new Result();
    resultToInsert.sailingClass = createResultDto.sailingClass;
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

    try {
      if (hideLastResult) {
        const resultToHide = await this.findLastResultBySailingClass(
          championshipId,
          createResultDto.sailingClass,
        );

        if (resultToHide) {
          resultToHide.isHidden = true;
          await this.update(championshipId, resultToHide.id, resultToHide);
        }
      }
    } catch (err) {
      throw err;
    } finally {
      return this.resultRepository.save(resultToInsert);
    }
  }

  async findAll(
    championshipId: number,
    includeHiddenResults = false,
  ): Promise<Result[]> {
    // if (includeHiddenResults) {
    //   return this.resultRepository.find({
    //     where: {
    //       championshipId: championshipId,
    //     },
    //     relations: {
    //       attachment: true,
    //     },
    //   });
    // }
    return this.resultRepository.find({
      where: {
        championshipId: championshipId,
        isHidden: includeHiddenResults ? In([true, false]) : false,
      },
      relations: {
        attachment: true,
      },
    });
  }

  async findOne(championshipId: number, id: number): Promise<Result> {
    return this.resultRepository.findOne({
      where: {
        id: id,
        championshipId: championshipId,
      },
      relations: {
        attachment: true,
      },
    });
  }

  async findLastResultBySailingClass(
    championshipId: number,
    sailingClass: string,
  ): Promise<Result> {
    return this.resultRepository.findOne({
      where: {
        sailingClass,
        championshipId,
      },
      relations: {
        attachment: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async update(
    championshipId: number,
    id: number,
    updatedResult: Partial<Result>,
  ) {
    return this.resultRepository.save({ id, championshipId, ...updatedResult });
  }

  async remove(championshipId: number, id: number): Promise<Result> {
    const resultToRemove = await this.resultRepository.findOneOrFail({
      where: {
        id,
        championshipId,
      },
    });
    return this.resultRepository.remove(resultToRemove)[0];
  }
}
