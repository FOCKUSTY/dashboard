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
  HttpStatus
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { ROUTE, ROUTES } from "./guilds.routes";
import { Service } from "./guilds.service"

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
  public get() {
    return this.service.get()
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
  public getOne(
    @Param("id") id: string
  ) {
    return this.service.getOne(id);
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
    @Body() data: GuildCreateDto 
  ) {
    return this.service.post(data);
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
    @Param("id") id: string,
    @Body() data: GuildUpdateDto 
  ) {
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
  @Patch(ROUTES.PUT)
  public patch(
    @Param("id") id: string,
    @Body() data: GuildUpdateDto 
  ) {
    return this.service.patch(id, data);
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
    @Param("id") id: string
  ) {
    return this.service.delete(id);
  }
}