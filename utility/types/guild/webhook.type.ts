import { User } from "../index";

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