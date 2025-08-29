import type { UserUpdateDto } from "./dto/user-update.dto";
import type { Request } from "express";
import type { IUser } from "@thevoid/database/types/user.type";
import type { DeleteResult } from "mongoose";

import { AuthGuard } from "guards/auth/auth.guard";

import {
  Controller as NestController,
  Injectable,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  HttpStatus,
  Req
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { ROUTE, ROUTES } from "./users.routes";
import { Service } from "./users.service"

import Hash from "services/hash.service";
import HttpError from "errors/http.errors";

import { Helpers } from "@thevoid/database/database";
import { IResponse } from "types/promise";

@Injectable()
@NestController(ROUTE)
@UseGuards(AuthGuard)
export class Controller {
  public constructor(
    private readonly service: Service
  ) {}

  @ApiOperation({
    summary: "Getting an user"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Getted"
  })
  @Get(ROUTES.GET)
  public get(
    @Req() req: Request,
    @Param("id") id: string
  ) {
    const { successed, profile_id } = Hash.parse(req);

    if (!successed) throw HttpError.hash();

    return this.service.get(id === "@me" ? profile_id : id);
  }

  @ApiOperation({
    summary: "Updating a user"
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated"
  })
  @Put(ROUTES.PUT)
  public put(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() data: UserUpdateDto
  ) {
    const { successed, profile_id } = Hash.parse(req);
    
    if (!successed) throw HttpError.hash();
    if (profile_id !== id) throw new HttpError("Access denied", HttpStatus.FORBIDDEN);
    if (!data) throw new HttpError("Bad request", HttpStatus.BAD_REQUEST)

    return this.service.put(id, Helpers.parse(data as IUser, "user"));
  }

  @ApiOperation({
    summary: "Deleting a user"
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Deleted"
  })
  @Delete(ROUTES.DELETE)
  public delete(
    @Req() req: Request,
    @Param("id") id: string
  ): Promise<IResponse<DeleteResult, DeleteResult | null>> {
    const { successed, profile_id } = Hash.parse(req);

    if (!successed) throw HttpError.hash();
    if (profile_id !== id) throw new HttpError("Access denied", HttpStatus.FORBIDDEN);

    return this.service.delete(id);
  }
}