import type { APIGuild } from "discord.js";

export type GuildEntity = Pick<APIGuild, "id"|"name"|"owner_id"|"icon"> & {};