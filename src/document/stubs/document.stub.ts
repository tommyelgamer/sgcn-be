import { Document } from '../../entities/document.entity';

export const documents: Document[] = [
  {
    id: 1,
    title: 'Documento con URL',
    championshipId: 1,
    publishdate: new Date().toISOString(),
    attachment: {
      id: 1,
      url: 'http://localhost:3000',
    },
  },
  {
    id: 2,
    title: 'Documento con File',
    championshipId: 1,
    publishdate: new Date().toISOString(),
    attachment: {
      id: 2,
      fileId: 1,
    },
  },
];

export const documentWithURL: Document = documents[0];
export const documentWithFile: Document = documents[1];
