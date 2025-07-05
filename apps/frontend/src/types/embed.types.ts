import type { ColorResolvable } from "discord.js"

export type Author = {
    name?: string;
    iconURL?: string;
    url?: string;
};

export type Footer = {
    text: string;
    iconURL?: string | undefined;
};

export type Field = {
    name: string;
    value: string;
    inline?: boolean;
};

export type Fields = {
    "1": string[];
    "2": string[];
    "3": string[];
    "4": string[];
    "5": string[];
    "6": string[];
    "7": string[];
    "8": string[];
    "9": string[];
    "10": string[];
};

export type Embed = {
    author?: Author;
    title?: string;
    url?: string;
    
    description?: string;
    color: ColorResolvable | null;
    thumbnail?: string;
    fields: Field[];
    
    image?: string;
    footer?: Footer;
    timestamp?: string;
};