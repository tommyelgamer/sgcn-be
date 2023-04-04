import { IntersectionType } from '@nestjs/swagger';
import { RequestWithUser } from '../authentication/dto/request-with-user.dto';
import { RequestWithChampionship } from '../championship/dto/request-with-championship';

export class RequestWithUserAndChampionship extends IntersectionType(
  RequestWithChampionship,
  RequestWithUser,
) {}
