"use server";

import { ICardGuild } from "types/guild.type";
import { IGuild } from "types/discord.types";

import { Api } from "api";
import { cache } from "react";

export const fetchGuild = cache(async (
  token: string,
  id: string
): Promise<IGuild | null> => {
  try {
    const guild = await fetch(Api.url + "/guilds/" + id, {
      method: "GET",
      headers: { authentication: token },
      next: {
        revalidate: 1200,
      },
      cache: "force-cache"
    });

    return (await guild.json()).data;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const fetchGuilds = cache(async (token: string): Promise<ICardGuild[] | null> => {
  try {
    const guilds = await fetch(Api.url + "/guilds", {
      method: "GET",
      headers: { authentication: token },
      next: {
        revalidate: 300,
      },
      cache: "force-cache"
    });

    return (await guilds.json()).data;
  } catch (error) {
    console.error(error);
    return null;
  }
});
