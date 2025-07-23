"use server";

import { IGuild } from "types/discord.types";
import { Api } from "api";

export const fetchGuild = async (
  token: string,
  id: string
): Promise<IGuild | null> => {
  try {
    const guild = await fetch(Api.url + "/guilds/" + id, {
      method: "GET",
      headers: { authentication: token }
    });

    return (await guild.json()).data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// НЕ ЗАБЫТЬ ЗАМЕНИТЬ
export const fetchGuilds = async (token: string): Promise<{id: string, name: string, icon_url: string, banner_url: null}[] | null> => {
  try {
    const guilds = await fetch(Api.url + "/guilds", {
      method: "GET",
      headers: { authentication: token }
    });

    return (await guilds.json()).data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
