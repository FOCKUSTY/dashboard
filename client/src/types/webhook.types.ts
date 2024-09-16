import type { ComponentData, PollData } from "discord.js";
import type { Embed } from "./embed.types";
import type { User } from "./user.types";

export type Webhook = {
    id: string;
    type: number;
    guild_id?: string;
    channel_id?: string;
    user?: User;
    name: string;
    avatar: string;
    token: string;
    application_id: string;
    source_guild?: any;
    source_channel: any;
    url: string;
};

export type WebhookMessage = {
    avatar_url?: string;
    name?: string;
    
    content?: string;

    embeds?: Embed[];
    components?: ComponentData[];
    poll?: PollData;
};