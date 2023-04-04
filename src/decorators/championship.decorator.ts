import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ChampionshipDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const championship = request.championship;

    return data ? championship?.[data] : championship;
  },
);
