import { cache } from "react";

import { Api } from "api";

import { APIRole, APIWebhook } from "discord.js";

export const fetchRoles = (async (
  token: string,
  id: string
): Promise<APIRole[] | null> => {
  try {
    const roles = await fetch(Api.url + "/guilds/" + id + "/roles", {
      method: "GET",
      headers: { authentication: token },
      next: {
        revalidate: 1,
      },
      cache: "force-cache"
    });

    return (await roles.json()).data;
  } catch (error) {
    console.error(error);
    return null;
  }
});

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