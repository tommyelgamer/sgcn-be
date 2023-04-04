import { CreateDocumentDto } from './dto/create-document.dto';
import {
  documents,
  documentWithFile,
  documentWithURL,
} from './stubs/document.stub';
import { Document } from '../entities/document.entity';

export const DocumentServiceMock = {
  findAll: jest.fn().mockResolvedValue(documents),
  create: jest.fn(
    (
      championshipId: number,
      createDocumentDto: CreateDocumentDto,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      file?: {
        filename: string;
        filedata: string;
      },
    ): Document => {
      if (createDocumentDto.url) {
        return documentWithURL;
      } else {
        return documentWithFile;
      }
    },
  ),
};
