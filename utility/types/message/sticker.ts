import { User } from '../index';

export type StickerItem = {
    id: string
    name: string
    format_type: number;
}

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