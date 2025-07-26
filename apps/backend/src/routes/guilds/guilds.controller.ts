import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { Request } from "express";

import { AuthGuard } from "src/guards/auth";

import { GuildsService } from "./guilds.service";
import { ROUTE, ROUTES } from "./guilds.routes";

import Api from "api";
import Hash from "api/hash.api";
import { useCache } from "api/cache.api";

import { ICardGuild, IGuild } from "types/guild.type";

import { MODELS } from "database";
import { ConfigDto } from "./data";

const { Auth } = MODELS;

@Injectable()
@Controller(ROUTE)
@UseGuards(AuthGuard)
export class GuildsController {
  public constructor(
    private readonly service: GuildsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @Patch(ROUTES.PATCH_CONFIG)
  @HttpCode(HttpStatus.OK)
  public async patchConfig(
    @Req() req: Request,
    @Param("id") guildId: string,
    @Body() configDto: ConfigDto
  ) {
    const { successed } = Hash.parse(req);

    if (!successed) {
      throw new HttpException(Api.createError("Hash parse error", null), HttpStatus.FORBIDDEN);
    }

    return await this.service.patchConfig(guildId, configDto);
  }

  @Post(ROUTES.POST)
  @HttpCode(HttpStatus.CREATED)
  public async post(
    @Req() req: Request,
    @Param("id") guildId: string
  ) {
    const { successed } = Hash.parse(req);

    if (!successed) {
      throw new HttpException(Api.createError("Hash parse error", null), HttpStatus.FORBIDDEN);
    }

    return await this.service.post(guildId);
  }

  @Get(ROUTES.GET_ALL)
  @HttpCode(HttpStatus.OK)
  public async getAll(@Req() req: Request, @Query("cache") cache?: string) {
    const { successed, id } = Hash.parse(req);
    const { access_token: token } = (await Auth.findOne({id})).toObject()

    if (!successed) {
      throw new HttpException(Api.createError("Hash parse error", null), HttpStatus.FORBIDDEN);
    }

    const cacheManager = useCache<ICardGuild[]>(this.cacheManager, cache);

    return cacheManager({
      getFunction: this.service.getAll,
      data: [token],
      key: "guilds-all-" + token
    });
  }

  @Get(ROUTES.GET_ONE)
  @HttpCode(HttpStatus.OK)
  public async getOne(
    @Req() req: Request,
    @Query("cache") cache?: string,
    @Param("id") guildId?: string
  ) {
    const { successed, id } = Hash.parse(req);
    const { access_token: token } = (await Auth.findOne({id})).toObject()

    if (!guildId) {
      throw new HttpException(Api.createError("'guildId' is not defined", null), HttpStatus.BAD_REQUEST);
    }

    if (!successed) {
      throw new HttpException(Api.createError("Hash parse error", null), HttpStatus.FORBIDDEN);
    }

    const cacheManager = useCache<IGuild>(this.cacheManager, cache);

    return cacheManager({
      getFunction: this.service.getOne,
      data: [guildId, token],
      key: "guild-" + guildId + token
    });
  }
}
