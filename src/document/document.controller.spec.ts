import { Test, TestingModule } from '@nestjs/testing';
import { Document } from '../entities/document.entity';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { RequestWithUserAndChampionship } from 'src/dto/request-with-user-and-championship';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Readable } from 'stream';
import { DocumentServiceMock } from './document.service.mock';
import { documentWithFile, documentWithURL } from './stubs/document.stub';
import { RequestWithChampionship } from 'src/championship/dto/request-with-championship';

const moduleMocker = new ModuleMocker(global);

describe('DocumentController', () => {
  let documentController: DocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
    })
      .useMocker((token) => {
        if (token === DocumentService) {
          return DocumentServiceMock;
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    documentController = module.get<DocumentController>(DocumentController);
  });

  it('should be defined', () => {
    expect(documentController).toBeDefined();
  });

  describe('create', () => {
    it('Should return a document with url defined', async () => {
      const req = {
        user: {
          id: 1,
          championshipId: 1,
          username: 'test_user',
          role: 'SYS_ADMIN',
        },
        championship: {
          id: 1,
          code: 'vf2023',
          shortname: 'Vela Fest 2023',
          longname: '2023 Rio de la Plata Vela Fest!!!',
        },
      } as RequestWithUserAndChampionship;

      const createDocumentDto: CreateDocumentDto = {
        title: 'Test Document',
        url: 'http://localhost:3000',
      };

      const document = await documentController.create(req, createDocumentDto);

      expect(document).toStrictEqual(documentWithURL);
    });

    it('Should return a document with url defined', async () => {
      const req = {
        user: {
          id: 1,
          championshipId: 1,
          username: 'test_user',
          role: 'SYS_ADMIN',
        },
        championship: {
          id: 1,
          code: 'vf2023',
          shortname: 'Vela Fest 2023',
          longname: '2023 Rio de la Plata Vela Fest!!!',
        },
      } as RequestWithUserAndChampionship;

      const createDocumentDto: CreateDocumentDto = {
        title: 'Test Document',
      };

      const documentFile: Express.Multer.File = {
        fieldname: '',
        originalname: 'test file',
        encoding: '',
        mimetype: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
        path: '',
        buffer: undefined,
      };

      const document = await documentController.create(
        req,
        createDocumentDto,
        documentFile,
      );

      expect(document).toStrictEqual(documentWithFile);
    });
  });

  describe('findAll', () => {
    it('Should return all documents', async () => {
      const req = {
        championship: {
          id: 1,
          code: 'vf2023',
        },
      } as RequestWithChampionship;

      const documents = await documentController.findAll();
    });
  });
});
