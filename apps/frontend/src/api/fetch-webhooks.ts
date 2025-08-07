import { cache } from "react";

import { Api } from "api";

import { APIWebhook } from "discord.js";

export const fetchWebhooks = cache(async (
  token: string,
  id: string
): Promise<APIWebhook[] | null> => {
  try {
    const webhooks = await fetch(Api.url + "/guilds/" + id + "/webhooks", {
      method: "GET",
      headers: { authentication: token },
      next: {
        revalidate: 1200,
      },
      cache: "force-cache"
    });

    return (await webhooks.json()).data;
  } catch (error) {
    console.error(error);
    return null;
  }
});