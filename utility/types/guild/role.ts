export type Role = {
    id: string;
    name: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon?: string;
    unicode_emoji?: string;
    flags: number;
};