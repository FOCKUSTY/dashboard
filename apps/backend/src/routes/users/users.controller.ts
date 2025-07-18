import {
  Controller,
  Get,
  Injectable,
  UseGuards,
  Inject,
  Req,
  Query,
  Param,
  Put
} from "@nestjs/common";

import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { Request } from "express";
import { Cache } from "cache-manager";

import { AuthGuard } from "src/guards/auth";
import Api from "api";

import { ROUTE, ROUTES } from "./users.routes";
import { UsersService } from "./users.service";

import { IUser } from "types/user.type";
import { IResponse } from "types/response.type";
import { Helpers } from "@thevoid/database/database";
import { UpdateWriteOpResult } from "mongoose";

const { hash: Hash, useCache } = Api;

@Injectable()
@Controller(ROUTE)
@UseGuards(AuthGuard)
export class UsersController {
  public constructor(
    private readonly service: UsersService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @Get(ROUTES.GET_ME)
  public async getMe(
    @Req() req: Request,
    @Query("cache") cache?: string
  ): Promise<IResponse<IUser>> {
    const { successed, profile_id } = Hash.parse(req);

    if (!successed) {
      return Api.createError("Hash parse error", null);
    }

    const cacheManager = useCache<IUser>(this.cacheManager, cache);

    return cacheManager<[Partial<IUser> | string]>({
      getFunction: this.service.getUser,
      key: `user-${profile_id}`,
      data: [profile_id]
    });
  }

  @Get(ROUTES.GET)
  public async get(
    @Req() req: Request,
    @Param("id") id: string,
    @Query("cache") cache?: string
  ): Promise<IResponse<IUser>> {
    const { successed } = Hash.parse(req);

    if (!successed) {
      return Api.createError("Hash parse error", null);
    }

    const cacheManager = useCache<IUser>(this.cacheManager, cache);

    return cacheManager<[string]>({
      getFunction: this.service.getUser,
      key: `user-${id}`,
      data: [id]
    });
  }

  @Put(ROUTES.PUT)
  public async put(
    @Req() req: Request,
    @Param("id") id: string
  ): Promise<IResponse<UpdateWriteOpResult, UpdateWriteOpResult | null>> {
    const { successed, profile_id } = Hash.parse(req);

    if (!successed) {
      return Api.createError("Hash parse error", null);
    }
    if (profile_id !== id) {
      return Api.createError("Access denied", null);
    }

    return this.service.updateUser(id, Helpers.parse(req.body, "user"));
  }
}
