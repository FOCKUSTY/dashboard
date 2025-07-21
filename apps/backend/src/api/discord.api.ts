import { APIPartialGuild } from "discord.js";

import { IResponse } from "types/response.type";

import Env from "./env";

import { createUnknownError } from "./create-error";
import { useRawCache } from "./cache.api";

const { env } = new Env();

const unknownError = createUnknownError("discord-api");
const cache = new Map<string, { date: number, data: APIPartialGuild[] }>();

export class DiscordApi {
  private static readonly _token = env.DISCORD_TOKEN;
  
  public static readonly url = env.DISCORD_API_URL;
  public static readonly cdn = "https://cdn.discordapp.com" as const;
  public static readonly cache = useRawCache<APIPartialGuild[]>(cache);

  public static getBotAuth() {
    return { Authorization: 'Bot ' + this._token };
  }

  public static getUserAuth(token: string) {
    return { Authorization: 'Bearer ' + token };  
  }

  public static fetchUserAvatar(user: { id: string, avatar: string}) {
    return `${this.cdn}/avatar/${user.id}/${user.avatar}.webp`;
  }

  public static async fetchUserGuilds(token: string): Promise<IResponse<APIPartialGuild[], APIPartialGuild[]>> {
    try {
      const data = await this.cache({
        getFunction: async () => {
          return await (await fetch(`${this.url}/users/@me/guilds?limit=20`, {
            method: "GET",
            headers: this.getUserAuth(token)
          })).json()
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
      return unknownError.execute(1, <const>[], error);
    }
  }

  public static async fetchBotGuilds(): Promise<IResponse<APIPartialGuild[], APIPartialGuild[]>> {
    try {
      const data = await this.cache({
        getFunction: async () => {
          return await (await fetch(`${this.url}/users/@me/guilds?limit=20`, {
            method: "GET",
            headers: this.getBotAuth()
          })).json()
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
      return unknownError.execute(1, <const>[], error);
    }
  }

  private static intersectionService<T>(first: T[], second: T[], type: "intersection"|"division") {
    return first.filter(element => type === "intersection"
      ? second.includes(element)
      : !second.includes(element)
    );
  }

  public static findGuildsIntersection(guilds: {user: string[], bot: string[]}) {
    return this.intersectionService(guilds.bot, guilds.user, "intersection");
  }
  
  public static findGuildsDivision(guilds: {user: string[], bot: string[]}) {
    return this.intersectionService(guilds.bot, guilds.user, "division");
  }
};

export default DiscordApi;
