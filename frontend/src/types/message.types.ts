import type { Role } from "./guild.types";
import type { User } from "./user.types";

export type Sticker = {
    id: string;
    pack_id?: string;
    name: string;
    description: string;
    tags: string;
    asset?: string;
    type: number;
    format_type: number;
    available?: boolean;
    guild_id?: string;
    user?: User;
    sort_value: number;
};

export type Emoji = {
    id: string;
    name: string;
    roles?: Role[];
    user: User;
    require_colons: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
};