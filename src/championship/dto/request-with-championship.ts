import { Request } from 'express';

export class RequestWithChampionship extends Request {
  championship: {
    id: number;
    code: string;
    longname: string;
    shortname: string;
  };
}
