import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type Guild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
};

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

export type FullGuild = {
    id: string;
    name: string;
    icon: string;
    description: string;
    splash: string;
    discovery_splash: string;
    features: string[];
    banner: string;
    owner_id: string;
    application_id: string;
    region: string;
    afk_channel_id: string;
    afk_timeout: number;
    system_channel_id: string;
    system_channel_flags: number;
    widget_enabled: number;
    widget_channel_id: string;
    verification_level: number;
    roles: Role[];
    default_message_notifications: number;
    mfa_level: number;
    explicit_content_filter: number;
    max_presences: string;
    max_members: number;
    max_video_channel_users: number;
    max_stage_video_channel_users: number;
    vanity_url_code?: string;
    premium_tier: number;
    premium_subscription_count: number;
    rules_channel_id?: string;
    preferred_locale: string;
    safety_alerts_channel_id?: string;
    public_updates_channel_id?: string;
    premium_progress_bar_enabled?: boolean;
    latest_onboarding_question_id?: string;
    nsfw: boolean;
    nsfw_level: number;
    emojis: Emoji[];
    stickers: Sticker[];
    incidents_data: string;
    inventory_settings: string;
    embed_enabled: string;
    embed_channel_id: string;
}

export type User = {
    id: string,
    username: string,
    avatar?: string,
    discriminator: string,
    public_flags: number,
    flags: number,
    banner?: string,
    accent_color: number,
    global_name?: string,
    banner_color: string,
    locale: string,
    verified: boolean
}

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

export type NextPageWithLayout<T> = NextPage<T> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout<T> = AppProps & {
    Component: NextPageWithLayout<T>;
};