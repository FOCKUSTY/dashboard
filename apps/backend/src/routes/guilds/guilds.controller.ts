import {
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { Request } from "express";

import { AuthGuard } from "src/guards/auth";
import Hash from "api/hash.api";

import { GuildsService } from "./guilds.service";
import { ROUTE, ROUTES } from "./guilds.routes";
import Api from "api";
import { useCache } from "api/cache.api";
import { ICardGuild } from "types/guild.type";
import { APIGuild } from "discord.js";

@Injectable()
@Controller(ROUTE)
@UseGuards(AuthGuard)
export class GuildsController {
  public constructor(
    private readonly service: GuildsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @Get(ROUTES.GET_ALL)
  public getAll(@Req() req: Request, @Query("cache") cache?: string) {
    const { successed, token } = Hash.parse(req);

    if (!successed) {
      return Api.createError("Hash parse error", null);
    }

    const cacheManager = useCache<ICardGuild[]>(this.cacheManager, cache);

    return cacheManager({
      getFunction: this.service.getAll,
      data: [token],
      key: "guilds-all-" + token
    });
  }

  /**
   * ПЕРЕДЕЛАТЬ
   *
   * использовать IGuild вместо APIGuild
   */

  @Get(ROUTES.GET_ONE)
  public getOne(
    @Req() req: Request,
    @Query("cache") cache?: string,
    @Param("id") id?: string
  ) {
    const { successed, token } = Hash.parse(req);

    if (!id) {
      return Api.createError("'id' is not defined", null);
    }

    if (!successed) {
      return Api.createError("Hash parse error", null);
    }

    const cacheManager = useCache<APIGuild>(this.cacheManager, cache);

    return cacheManager({
      getFunction: this.service.getOne,
      data: [id, token],
      key: "guild-" + token
    });
  }
}
