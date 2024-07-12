import { TagObject, User } from '../index';
import { Overwrite } from '../message/message.type';
import { DefaultReaction } from '../message/reactions.type';
import { ThreadMember, ThreadMetadata } from './thread.type'

export type ChannelMention = {
    id: string;
    guild_id: string;
    type: number;
    name: string;
};

export type Channel = {
    id: string
    type: number
    guild_id?: string
    position?: number
    permission_overwrites?: Overwrite
    name?: string
    topic?: string
    nsfw?: boolean
    last_message_id?: string
    bitrate?: number
    user_limit?: number
    rate_limit_per_user?: number
    recipients?: User[]
    icon?: string
    owner_id?: string
    application_id?: string
    managed?: boolean
    parent_id?: string
    last_pin_timestamp?: Date
    rtc_region?: string
    video_quality_mode?: number
    message_count?: number
    member_count?: number
    thread_metadata?: ThreadMetadata
    member?: ThreadMember
    default_auto_archive_duration?: number
    permissions?: string
    flags?: number
    total_message_sent?: number
    available_tags?: TagObject[]
    applied_tags?: any[]
    default_reaction_emoji?: DefaultReaction
    default_thread_rate_limit_per_user?: number
    default_sort_order?: number
    default_forum_layout?: number
};