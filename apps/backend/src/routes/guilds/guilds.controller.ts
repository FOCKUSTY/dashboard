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
import { APIGuild } from "discord.js";

import { AuthGuard } from "src/guards/auth";

import { GuildsService } from "./guilds.service";
import { ROUTE, ROUTES } from "./guilds.routes";

import Api from "api";
import Hash from "api/hash.api";
import { useCache } from "api/cache.api";

import { ICardGuild } from "types/guild.type";

import { MODELS } from "database";

const { Auth } = MODELS;

@Injectable()
@Controller(ROUTE)
@UseGuards(AuthGuard)
export class GuildsController {
  public constructor(
    private readonly service: GuildsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @Get(ROUTES.GET_ALL)
  public async getAll(@Req() req: Request, @Query("cache") cache?: string) {
    const { successed, id } = Hash.parse(req);
    const { access_token: token } = (await Auth.findOne({id})).toObject()

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
  public async getOne(
    @Req() req: Request,
    @Query("cache") cache?: string,
    @Param("id") guildId?: string
  ) {
    const { successed, id } = Hash.parse(req);
    const { access_token: token } = (await Auth.findOne({id})).toObject()

    if (!guildId) {
      return Api.createError("'guildId' is not defined", null);
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
