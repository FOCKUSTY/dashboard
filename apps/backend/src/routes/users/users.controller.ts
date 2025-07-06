import {
  Controller,
  Get,
  Injectable,
  UseGuards,
  Inject,
  Req,
  Query
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
  public async getMe(@Req() req: Request, @Query("cache") cache?: string): Promise<IResponse<IUser>> {
    const { successed, profile_id } = Hash.parse(req);
    const cacheManager = useCache<IUser>(
      this.cacheManager,
      cache
    );

    if (!successed)
      return { successed: false, data: null, error: "Hash parse error" };

    const user = cacheManager<[Partial<IUser> | string]>({
      getFunction: this.service.getUser,
      key: `user-${profile_id}`,
      data: [profile_id]
    });

    return user;
  }
}
