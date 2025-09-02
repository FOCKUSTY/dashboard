import type { Request } from "express";

import type { GuildCreateDto } from "./dto/guild-create.dto";
import type { GuildUpdateDto } from "./dto/guild-update.dto";

import { Public } from "decorators/public.decorator";
import { AuthGuard } from "guards/auth/auth.guard";

import {
  Controller as NestController,
  Injectable,
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  UseGuards,
  HttpStatus,
  Req,
  HttpException
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { ROUTE, ROUTES } from "./guilds.routes";
import { Service } from "./guilds.service"

import Hash from "services/hash.service";

import { MODELS } from "database";
import HttpError from "errors/http.errors";
import { ConfigDto } from "./dto/config.dto";

const { Auth } = MODELS;

@Injectable()
@NestController(ROUTE)
@UseGuards(AuthGuard)
export class Controller {
  public constructor(
    private readonly service: Service
  ) {}

  @ApiOperation({
    summary: "Getting an array of guilds"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Getted"
  })
  @Get(ROUTES.GET)
  @Public()
  public async get(
    @Req() req: Request
  ) {
    const { successed, id } = Hash.parse(req);
    const auth = await Auth.findOne({id})

    if (!successed || !auth) { throw HttpError.hash(); }

    return this.service.get(auth.access_token);
  }

  @ApiOperation({
    summary: "Getting a guilds by id"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Getted"
  })
  @Get(ROUTES.GET_ONE)
  @Public()
  public async getOne(
    @Req() req: Request,
    @Param("id") guildId: string
  ) {
    const { successed, id } = Hash.parse(req);
    const auth = await Auth.findOne({id})

    if (!successed || !auth) { throw HttpError.hash(); }

    return this.service.getOne(guildId);
  }

  @ApiOperation({
    summary: "Getting a guild webhooks by id"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Getted"
  })
  @Get(ROUTES.GET_WEBHOOKS)
  @Public()
    public async getWebhooks(
    @Req() req: Request,
    @Param("id") guildId: string
  ) {
    const { successed, id } = Hash.parse(req);
    const auth = await Auth.findOne({id})

    if (!successed || !auth) { throw HttpError.hash(); }

    return this.service.getWebhooks(guildId);
  }

  @ApiOperation({
    summary: "Getting a guild roles by id"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Getted"
  })
  @Get(ROUTES.GET_ROLES)
  @Public()
    public async getRoles(
    @Req() req: Request,
    @Param("id") guildId: string
  ) {
    const { successed, id } = Hash.parse(req);
    const auth = await Auth.findOne({id})

    if (!successed || !auth) { throw HttpError.hash(); }

    return this.service.getRoles(guildId);
  }

  @ApiOperation({
    summary: "Creaing a guilds"
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Created"
  })
  @Post(ROUTES.POST)
  public post(
    @Req() req: Request,
    @Param("id") guildId: string
  ) {
    const { successed } = Hash.parse(req);

    if (!successed) { throw HttpError.hash(); }

    return this.service.post(guildId);
  }

  @ApiOperation({
    summary: "Updating a guilds"
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
    @Body() data: GuildUpdateDto 
  ) {
    // УСИЛИТЬ ВАЛИДАЦИЮ
    const { successed } = Hash.parse(req);

    if (!successed) { throw HttpError.hash(); }

    return this.service.put(id, data);
  }

  @ApiOperation({
    summary: "Updating a guilds"
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated"
  })
  @Patch(ROUTES.PATCH_CONFIG)
  public async patchConfig(
    @Req() req: Request,
    @Param("id") guildId: string,
    @Body() configDto: ConfigDto
  ) {
    const { successed } = Hash.parse(req);

    if (!successed) { HttpError.hash() };

    return this.service.patchConfig(guildId, configDto);
  }
  
  @ApiOperation({
    summary: "Deleting a guilds"
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
  ) {
    // УСИЛИТЬ ВАЛИДАЦИЮ
    const { successed } = Hash.parse(req);

    if (!successed) { HttpError.hash() };

    return this.service.delete(id);
  }
}