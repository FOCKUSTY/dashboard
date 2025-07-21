import Api from "api";
import DiscordApi from "api/discord.api";
import { APIGuild } from "discord.js";

import { IResponse } from "types/response.type";

const createError = Api.createError;
const unknownError = Api.createUnknownError("guilds");

export class GuildsService {
  // Вынести в отдельный тип
  public async getAll(token: string): Promise<IResponse<{id: string, icon_url: string, name: string, banner_url: string|null}[]>> {
    try {
      const { successed, data: guilds, error } = await DiscordApi.fetchUserGuilds(token);
  
      if (!successed) {
        return createError(error, null);
      };

      return {
        data: guilds.map(guild => {
          return {
            id: guild.id,
            name: guild.name,
            icon_url: DiscordApi.fetchGuildIcon(guild),
            banner_url: DiscordApi.fetchBanner(guild)
          }
        }),
        error: null,
        successed: true
      }
    } catch (error) {
      return unknownError.execute(1001, null, error);      
    }
  };

  public async getOne(guildId: string, userId: string): Promise<IResponse<APIGuild>> {
    try {
      // DiscordApi.fetchUserGuild(id)
    } catch (error) {
      return unknownError.execute(1002, null, error);
    }
  }
}