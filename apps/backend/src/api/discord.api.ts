import { APIGuild, APIPartialGuild, GuildMember, PermissionFlagsBits } from "discord.js";

import { IResponse } from "types/response.type";

import Env from "./env";

import { createUnknownError } from "./create-error";

const { env } = new Env();

const unknownError = createUnknownError("discord-api");

export class DiscordApi {
  private static readonly _token = env.DISCORD_TOKEN;

  public static readonly url = env.DISCORD_API_URL;
  public static readonly cdn = "https://cdn.discordapp.com" as const;

  public static getBotAuth() {
    return { Authorization: "Bot " + this._token };
  }

  public static getUserAuth(token: string) {
    return { Authorization: "Bearer " + token };
  }

  public static fetchBanner(data: { id: string; banner?: string }) {
    return data.banner ? `${this.cdn}/banners/${data.id}/${data.banner}` : null;
  }

  public static fetchGuildIcon(guild: { id: string; icon?: string }) {
    return guild.icon ? `${this.cdn}/icons/${guild.id}/${guild.icon}.png` : null;
  }

  public static fetchUserAvatar(user: { id: string; avatar?: string }) {
    return user.avatar ? `${this.cdn}/avatars/${user.id}/${user.avatar}.webp` : null;
  }

  public static async fetchGuildMembers(id: string) {
    try {
      const data = await (
        await fetch(`${this.url}/guilds/${id}/members`, {
          method: "GET",
          headers: this.getBotAuth()
        })
      ).json();

      return {
        data,
        error: null,
        successed: true
      };
    } catch (error) {
      return unknownError.execute(1002, null, error);
    }
  };

  public static async fetchUserGuilds(
    token: string
  ): Promise<IResponse<APIPartialGuild[], APIPartialGuild[]>> {
    try {
      const data = await (
        await fetch(`${this.url}/users/@me/guilds?limit=20`, {
          method: "GET",
          headers: this.getUserAuth(token)
        })
      ).json();

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
    id: string
  ): Promise<IResponse<APIGuild>> {
    try {
      const data = await (
        await fetch(`${this.url}/guilds/${id}`, {
          method: "GET",
          headers: this.getBotAuth()
        })
      ).json();

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
      const data = await (
        await fetch(`${this.url}/users/@me/guilds?limit=20`, {
          method: "GET",
          headers: this.getBotAuth()
        })
      ).json();

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
