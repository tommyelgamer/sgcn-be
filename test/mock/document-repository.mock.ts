import { Document } from '../../src/entities/document.entity';

const documents: Document[] = [
  {
    id: 1,
    title: 'Mock Document 1',
    publishdate: new Date().toISOString(),
    championshipId: 1,
    attachment: {
      id: 1,
      url: 'http://localhost:3000',
    },
  },
  {
    id: 2,
    title: 'Mock Document 2',
    publishdate: new Date().toISOString(),
    championshipId: 1,
    attachment: {
      id: 2,
      url: 'http://localhost:3000',
    },
  },
  {
    id: 3,
    title: 'Mock Document 3',
    publishdate: new Date().toISOString(),
    championshipId: 1,
    attachment: {
      id: 3,
      fileId: 1,
    },
  },
  {
    id: 4,
    title: 'Mock Document 4',
    publishdate: new Date().toISOString(),
    championshipId: 1,
    attachment: {
      id: 4,
      fileId: 1,
    },
  },
  {
    id: 5,
    title: 'Mock Document 5',
    publishdate: new Date().toISOString(),
    championshipId: 1,
    attachment: {
      id: 5,
      url: 'http://localhost:3000',
    },
  },
];

export const DocumentRepositoryMock = {
  find: jest.fn(() => documents),
};
