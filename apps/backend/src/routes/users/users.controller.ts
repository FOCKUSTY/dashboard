import {
  Controller,
  Get,
  Injectable,
  UseGuards,
  Inject,
  Req,
  Query,
  Param,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
  Delete
} from "@nestjs/common";

import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { Request } from "express";
import { Cache } from "cache-manager";

import { AuthGuard } from "src/guards/auth";
import Api from "api";

import { ROUTE, ROUTES } from "./users.routes";
import { Service } from "./users.service";

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
    private readonly service: Service,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @Get(ROUTES.GET)
  @HttpCode(HttpStatus.OK)
  public async get(
    @Req() req: Request,
    @Param("id") id: string,
    @Query("cache") cache?: string
  ): Promise<IResponse<IUser>> {
    const { successed, profile_id } = Hash.parse(req);

    if (!successed) {
      throw new HttpException(Api.createError("Hash parse error", null), HttpStatus.FORBIDDEN);
    }

    const cacheManager = useCache<IUser>(this.cacheManager, cache);

    return cacheManager<[string]>({
      getFunction: this.service.getUser,
      key: `user-${id}`,
      data: [id === "@me" ? profile_id : id]
    });
  }

  @Put(ROUTES.PUT)
  public async put(
    @Req() req: Request,
    @Param("id") id: string
  ): Promise<IResponse<UpdateWriteOpResult, UpdateWriteOpResult | null>> {
    const { successed, profile_id } = Hash.parse(req);

    if (!successed) {
      throw new HttpException(Api.createError("Hash parse error", null), HttpStatus.FORBIDDEN);
    }
    if (profile_id !== id) {
      throw new HttpException(Api.createError("Access denied", null), HttpStatus.FORBIDDEN);
    }

    return this.service.updateUser(id, Helpers.parse(req.body, "user"));
  }

  @Delete(ROUTES.DELETE)
  public async delete(
    @Req() req: Request,
    @Param("id") id: string
  ) {
    const { successed, profile_id } = Hash.parse(req);

    if (!successed) {
      throw new HttpException(Api.createError("Hash parse error", null), HttpStatus.FORBIDDEN);
    }
    if (profile_id !== id) {
      throw new HttpException(Api.createError("Access denied", null), HttpStatus.FORBIDDEN);
    }

    return this.service.deleteUser(id);
  }
}
