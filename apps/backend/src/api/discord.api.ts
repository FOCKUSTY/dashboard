import { APIGuild, APIPartialGuild, PermissionFlagsBits } from "discord.js";

import { IResponse } from "types/response.type";

import Env from "./env";

import { createUnknownError } from "./create-error";
import { useRawCache } from "./cache.api";

const { env } = new Env();

const unknownError = createUnknownError("discord-api");
const guildsCache = new Map<
  string,
  { date: number; data: APIPartialGuild[] }
>();
const guildCache = new Map<string, { date: number; data: APIGuild }>();

export class DiscordApi {
  private static readonly _token = env.DISCORD_TOKEN;

  public static readonly url = env.DISCORD_API_URL;
  public static readonly cdn = "https://cdn.discordapp.com" as const;
  public static readonly guildsCache =
    useRawCache<APIPartialGuild[]>(guildsCache);
  public static readonly guildCache = useRawCache<APIGuild>(guildCache);

  public static getBotAuth() {
    return { Authorization: "Bot " + this._token };
  }

  public static getUserAuth(token: string) {
    return { Authorization: "Bearer " + token };
  }

  public static fetchBanner(data: { id: string; banner?: string }) {
    return data.banner ? `${this.cdn}/banners/${data.id}/${data.banner}` : null;
  }

  public static fetchGuildIcon(guild: { id: string; icon: string }) {
    return `${this.cdn}/icons/${guild.id}/${guild.icon}.png`;
  }

  public static fetchUserAvatar(user: { id: string; avatar: string }) {
    return `${this.cdn}/avatar/${user.id}/${user.avatar}.webp`;
  }

  public static async fetchUserGuilds(
    token: string
  ): Promise<IResponse<APIPartialGuild[], APIPartialGuild[]>> {
    try {
      const data = await this.guildsCache({
        getFunction: async () => {
          return await (
            await fetch(`${this.url}/users/@me/guilds?limit=20`, {
              method: "GET",
              headers: this.getUserAuth(token)
            })
          ).json();
        },
        data: [],
        key: "discord-api-guilds-user-" + token
      });

      return {
        data,
        error: null,
        successed: true
      };
    } catch (error) {
      return unknownError.execute(1001, <const>[], error);
    }
  }

  public static async fetchUserGuild(
    id: string,
    token: string
  ): Promise<IResponse<APIGuild>> {
    try {
      const data = await this.guildCache({
        getFunction: async () => {
          return await (
            await fetch(`${this.url}/guilds/${id}`, {
              method: "GET",
              headers: this.getUserAuth(token)
            })
          ).json();
        },
        data: [],
        key: "discord-api-guild-user-" + id + token
      });

      return {
        data,
        error: null,
        successed: true
      };
    } catch (error) {
      return unknownError.execute(1002, null, error);
    }
  }

  public static async fetchBotGuilds(): Promise<
    IResponse<APIPartialGuild[], APIPartialGuild[]>
  > {
    try {
      const data = await this.guildsCache({
        getFunction: async () => {
          return await (
            await fetch(`${this.url}/users/@me/guilds?limit=20`, {
              method: "GET",
              headers: this.getBotAuth()
            })
          ).json();
        },
        data: [],
        key: "discord-api-guilds-bot-" + this._token
      });

      return {
        data,
        error: null,
        successed: true
      };
    } catch (error) {
      return unknownError.execute(1003, <const>[], error);
    }
  }

  public static findAvailableUserGuilds<T extends APIPartialGuild & { permissions: string }>(guilds: { user: T[], bot: string[]}) {
    return guilds.user
      .filter(({permissions}) => (BigInt(permissions) & PermissionFlagsBits.Administrator) === PermissionFlagsBits.Administrator)
      .filter(guild => guilds.bot.includes(guild.id));
  }
}

export default DiscordApi;
