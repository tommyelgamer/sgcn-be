import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ChampionshipService } from '../championship.service';

@Injectable()
export class ChampionshipMiddleware implements NestMiddleware {
  constructor(private readonly championshipService: ChampionshipService) {}

  async use(req: any, res: any, next: () => void) {
    const { championshipCode } = req.params;
    if (!championshipCode) {
      throw new BadRequestException(
        'Championship Code param was not specified',
      );
    }

    const championship = await this.championshipService.getChampionshipByCode(
      championshipCode,
    );

    req.championship = {};
    req.championship.id = championship.id;
    req.championship.code = championship.code;
    req.championship.longname = championship.longname;
    req.championship.shortname = championship.shortname;

    next();
  }
}
