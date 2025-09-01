import type { APIGuild, APIPartialGuild, GuildMember } from "discord.js";
import type { ICardGuild, IGuild } from "types/guild.type";
import type { IResponse } from "types/promise/response.types";

import type { GuildCreateDto } from "./dto/guild-create.dto";
import type { GuildUpdateDto } from "./dto/guild-update.dto";

import DiscordService from "services/discord.service";
import Services from "services/index";

import { Injectable } from "@nestjs/common";

import { Settings } from "types/settings";
import { MODELS } from "@thevoid/database/database";

const { Guild } = MODELS;

const createError = Services.createError;
const unknownError = Services.createUnknownError("guilds");

@Injectable()
export class Service {
  public static createGuild(guild: APIGuild, members: GuildMember[]) {
    return Guild.create(<IGuild>{
      id: guild.id,
      name: guild.name,
      owner_id: guild.owner_id,
      created_at: new Date().toISOString(),
      icon_url: DiscordService.fetchGuildIcon(guild) || "",
      members: members.map(({id}) => id),
      settings: Settings.CONSTANTS.raw.default.guild.toString()
    });
  }

  public async get(token: string): IResponse<ICardGuild[]> {
    try {
      const {
        successed,
        data: guilds,
        error
      } = await DiscordService.fetchUserGuilds(token);

      if (!successed) {
        return createError(error, null);
      }

      const {
        successed: botSuccessed,
        data: botGuilds,
        error: botError
      } = await DiscordService.fetchBotGuilds();

      if (!botSuccessed) {
        return createError(botError, null);
      };

      const availableGuilds = DiscordService.findAvailableUserGuilds({
        user: guilds as unknown as ((APIPartialGuild & { permissions: string })[]),
        bot: botGuilds.map(({id}) => id)
      }).map((guild) => ({
        id: guild.id,
        name: guild.name,
        icon_url: DiscordService.fetchGuildIcon(guild),
        banner_url: DiscordService.fetchBanner(guild)
      }));

      return {
        data: availableGuilds,
        successed: true,
        error: null
      }
    } catch (error) {
      return unknownError.execute(1001, null, error);
    }
  }

  public async getOne(id: string): IResponse<IGuild> {
    try {
      const guild = await Guild.findOne({id: id});

      if (!guild) {
        const guildData = await DiscordService.fetchUserGuild(id);
        const membersData = await DiscordService.fetchGuildMembers(id);

        if (!guildData.successed || !membersData.successed) {
          return createError((guildData.error ?? membersData.error) || "some error", null);
        }

        const guild = (await Service.createGuild(guildData.data, membersData.data)).toObject();

        return {
          successed: true,
          data: guild,
          error: null
        }
      };

      return {
        successed: true,
        data: guild.toObject(),
        error: null
      }
    } catch (error) {
      return unknownError.execute(1001, null, error);
    }
  }

  public getWebhooks(id: string) {
    return DiscordService.fetchGuildWebhooks(id);
  }

  public async post(id: string): IResponse<IGuild> {
    try {
      const guildData = await DiscordService.fetchUserGuild(id);
      const membersData = await DiscordService.fetchGuildMembers(id);

      if (!guildData.successed) {
        return createError(guildData.error, null);
      }
      if (!membersData.successed) {
        return createError(membersData.error, null);
      }

      const guild = await Service.createGuild(guildData.data, membersData.data);

      return {
        successed: true,
        data: guild,
        error: null
      }
    } catch (error) {
      return unknownError.execute(1002, null, error);
    }
  }

  public async put(id: string, data: GuildUpdateDto): IResponse<IGuild> {
    return {
      successed: false,
      data: null,
      error: "method not implemented."
    };
  };
  
  public async patch(id: string, data: GuildUpdateDto): IResponse<IGuild> {
    return {
      successed: false,
      data: null,
      error: "method not implemented."
    };
  }

  public async delete(id: string): IResponse<string> {
    return {
      successed: false,
      data: null,
      error: "method not implemented."
    };
  }
}