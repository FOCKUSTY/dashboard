import { Role } from './role.type'
import { Sticker } from '../message/sticker.type';
import { Emoji } from '../message/emoji.type';

export type PartialGuild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
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