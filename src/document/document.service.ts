import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from '../entities/attachment.entity';
import { File } from '../entities/file.entity';
import { Document } from '../entities/document.entity';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async create(
    championshipId: number,
    createDocumentDto: CreateDocumentDto,
    uploadedFile?: { filename: string; mimetype: string; filedata: Buffer },
  ): Promise<Document> {
    if (
      (createDocumentDto.url && uploadedFile) ||
      (!createDocumentDto.url && !uploadedFile)
    )
      throw new BadRequestException('Only one of URL or File must be defined');

    const docToInsert = new Document();
    docToInsert.title = createDocumentDto.title;
    docToInsert.publishdate = new Date().toISOString();
    docToInsert.championshipId = championshipId;

    const docAttachment = new Attachment();

    if (createDocumentDto.url) {
      docAttachment.url = createDocumentDto.url;
    }

    if (uploadedFile) {
      const docFile = new File();

      docFile.fileName = uploadedFile.filename;
      docFile.mimetype = uploadedFile.mimetype;
      docFile.data = uploadedFile.filedata;

      docAttachment.file = docFile;
    }

    docToInsert.attachment = docAttachment;

    return this.documentRepository.save(docToInsert);
  }

  async findAll(championshipId: number): Promise<Document[]> {
    return this.documentRepository.find({
      where: {
        championshipId: championshipId,
      },
      relations: {
        attachment: true,
      },
    });
  }

  async findOne(championshipId: number, id: number): Promise<Document> {
    return this.documentRepository.findOne({
      where: {
        championshipId: championshipId,
        id: id,
      },
      relations: {
        attachment: true,
      },
    });
  }

  async remove(championshipId: number, id: number): Promise<Document> {
    const document = await this.documentRepository.findOneOrFail({
      where: {
        championshipId: championshipId,
        id: id,
      },
    });
    return this.documentRepository.remove(document);
  }

  async getDocumentFileById(
    championshipId: number,
    id: number,
  ): Promise<Document> {
    return this.documentRepository.findOneOrFail({
      where: {
        id: id,
        championshipId: championshipId,
      },
      relations: {
        attachment: {
          file: true,
        },
      },
    });
  }
}
