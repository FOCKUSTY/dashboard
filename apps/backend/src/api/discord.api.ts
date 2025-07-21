import { APIPartialGuild } from "discord.js";
import Env from "./env";
import { createUnknownError } from "./create-error";
import { IResponse } from "types/response.type";

const { env } = new Env();

const unknownError = createUnknownError("discord-api");

export class DiscordApi {
  private static readonly _token = env.DISCORD_TOKEN;
  
  public static readonly url = env.DISCORD_API_URL;
  public static readonly cdn = "https://cdn.discordapp.com" as const;

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
      return {
        data: await (await fetch(`${this.url}/users/@me/guilds?limit=20`, {
          method: "GET",
          headers: this.getUserAuth(token)
        })).json(),
        error: null,
        successed: true
      };
    } catch (error) {
      return unknownError.execute(1, <const>[], error);
    }
  }

  public static async fetchBotGuilds(): Promise<IResponse<APIPartialGuild[], APIPartialGuild[]>> {
    try {
      return {
        data: await (await fetch(`${this.url}/users/@me/guilds?limit=20`, {
          method: "GET",
          headers: this.getBotAuth()
        })).json(),
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
