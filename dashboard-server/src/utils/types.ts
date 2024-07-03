import { ComponentData, EmbedData, PollData } from "discord.js";

export type sendWebhookMessageType = {
    content?: string;
    embed?: EmbedData[];
    components?: ComponentData[];
    poll?: PollData;

    name?: string;
    avatar_url?: string;
};