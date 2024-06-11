import { ComponentData, EmbedData, PollData } from "discord.js";

export type PartialGuild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
};

export type sendWebhookMessageType = {
    content?: string;
    embed?: EmbedData[];
    components?: ComponentData[];
    poll?: PollData;

    name?: string;
    avatar_url?: string;
};

export type PartialUser = {
    id: string;
    username: string;
    avatar?: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner?: string;
    accent_color: number;
    global_name?: string;
    banner_color: string;
    locale: string;
    verified: boolean;
};

export type Webhook = {
    id: string;
    type: number;
    guild_id?: string;
    channel_id?: string;
    user?: PartialUser;
    name: string;
    avatar: string;
    token: string;
    application_id: string;
    source_guild?: any;
    source_channel: any;
    url: string;
};