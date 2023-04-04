import { Request } from 'express';

export class RequestWithUser extends Request {
  user: {
    id: number;
    championshipId: number;
    username: string;
    role: string;
  };
}
