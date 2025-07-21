import { Controller, Inject, Injectable, UseGuards } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { AuthGuard } from "src/guards/auth";

import { ROUTE, ROUTES } from "./guilds.routes";
import { GuildsService } from "./guilds.service";

@Injectable()
@Controller(ROUTE)
@UseGuards(AuthGuard)
export class GuildsController {
  public constructor(
    private readonly service: GuildsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}


}