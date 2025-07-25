import { APIPartialGuild } from "discord.js";

import Api from "api";
import DiscordApi from "api/discord.api";

import type { AllPartial } from "types/utility.types";
import type { IResponse } from "types/response.type";
import type { ICardGuild, IGuild } from "types/guild.type";
import { Settings } from "types/settings";

import { MODELS } from "database";

const { Guild } = MODELS;

const createError = Api.createError;
const unknownError = Api.createUnknownError("guilds");

export class GuildsService {
  public async patchConfig(id: string, config: AllPartial<IGuild["config"]>): Promise<IResponse<IGuild>> {
    try {
      const guild = await Guild.findOneAndUpdate({
        id
      }, {
        config
      }, {
        returnDocument: "after"
      });

      return {
        data: guild,
        error: null,
        successed: true
      }
    } catch (error) {
      return unknownError.execute(1003, null, error);
    }
  }

  public async post(id: string, token: string): Promise<IResponse<IGuild>> {
    try {
      const guildData = await DiscordApi.fetchUserGuild(id, token);
      const membersData = await DiscordApi.fetchGuildMembers(id, token);

      if (!guildData.successed) {
        return createError(guildData.error, null);
      }
      if (!membersData.successed) {
        return createError(membersData.error, null);
      }

      const guild = await Guild.create(<IGuild>{
        id: guildData.data.id,
        name: guildData.data.name,
        owner_id: guildData.data.owner_id,
        created_at: new Date().toISOString(),
        icon_url: DiscordApi.fetchGuildIcon(guildData.data),
        members: membersData.data.map(member => member.id),
        settings: Settings.CONSTANTS.raw.default.guild.toString()
      });

      return {
        successed: true,
        data: guild,
        error: null
      }
    } catch (error) {
      return unknownError.execute(1002, null, error);
    }
  }

  public async getAll(token: string): Promise<IResponse<ICardGuild[]>> {
    try {
      const {
        successed,
        data: guilds,
        error
      } = await DiscordApi.fetchUserGuilds(token);

      if (!successed) {
        return createError(error, null);
      }

      const {
        successed: botSuccessed,
        data: botGuilds,
        error: botError
      } = await DiscordApi.fetchBotGuilds();

      if (!botSuccessed) {
        return createError(botError, null);
      };

      return {
        data: DiscordApi.findAvailableUserGuilds({
          user: guilds as unknown as ((APIPartialGuild & { permissions: string })[]),
          bot: botGuilds.map(({id}) => id)
        }).map((guild) => {
          return {
            id: guild.id,
            name: guild.name,
            icon_url: DiscordApi.fetchGuildIcon(guild),
            banner_url: DiscordApi.fetchBanner(guild)
          }
        }),
        error: null,
        successed: true
      };
    } catch (error) {
      return unknownError.execute(1001, null, error);
    }
  }

  public async getOne(
    guildId: string
  ): Promise<IResponse<IGuild>> {
    try {
      const guild = await Guild.findOne({id: guildId})

      if (!guild) return createError("guild not found", null);

      return {
        successed: true,
        data: guild.toObject(),
        error: null
      }
    } catch (error) {
      return unknownError.execute(1001, null, error);
    }
  }
}
