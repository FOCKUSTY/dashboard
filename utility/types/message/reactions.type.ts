import { Emoji } from './emoji.type';

export type DefaultReaction = {
    emoji_id: string
    emoji_name: string;
};

export type ReactionsObject = {
    count: number
    count_details: object
    me: boolean
    me_burst: boolean
    emoji: Emoji
    burst_colors: any[]
};