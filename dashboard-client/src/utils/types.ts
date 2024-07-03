import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { ComponentData, PollData, ColorResolvable } from 'discord.js'

export type Embed = {
    author?: { name?: string, iconURL?: string, url?: string }
    color: ColorResolvable | null
    description?: string
    footer: { text: string; iconURL?: string | undefined; } | undefined
    thumbnail?: string
    image?: string
    timestamp?: string
    title?: string
    url?: string
    fields: { name: string, value: string, inline?: boolean }[]
}

export type Fields = {
    "1": string[]
    "2": string[]
    "3": string[]
    "4": string[]
    "5": string[]
    "6": string[]
    "7": string[]
    "8": string[]
    "9": string[]
    "10": string[]
}

export type sendWebhookMessageType = {
    content?: string;
    embeds?: Embed[];
    components?: ComponentData[];
    poll?: PollData;

    name?: string;
    avatar_url?: string;
};

export type NextPageWithLayout<T> = NextPage<T> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout<T> = AppProps & {
    Component: NextPageWithLayout<T>;
};