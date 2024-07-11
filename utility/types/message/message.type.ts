import { Attachments } from "./attachments.type";
import { EmbedObject } from "./embed.type";
import { Channel, ChannelMention } from '../channel/channel.type';
import { Role, RoleSubscriptionData } from "../guild/role.type";
import { Application, ApplicationIntegrationTypes, User } from "../index";
import { Poll } from "./poll.type";
import { ReactionsObject } from './reactions.type';
import { GuildMember } from "../guild/member.type";
import { Sticker, StickerItem } from "./sticker.type";

export type Overwrite = {
    id: string
    type: number
    allow: string
    deny: string
}

export type AllowedMentions = {
    parse: any[];
    roles: Role[];
    users: User[];
    replied_user: boolean;
};

export type MessageReference = {
    message_id?: string;
    channel_id?: string;
    guild_id?: string;
    fail_if_not_exists?: boolean;
};

enum MessageActivityTypes {
    JOIN = 1,
    SPECTATE = 2,
    LISTEN = 3,
    JOIN_REQUEST = 5
}

export type MessageActivity = {
    type: MessageActivityTypes;
    party_id?: string;
};

export enum InteractionType {
    PING = 1,
    APPLICATION_COMMAND = 2,
    MESSAGE_COMPONENT = 3,
    APPLICATION_COMMAND_AUTOCOMPLETE = 4,
    MODAL_SUBMIT = 5
};

export type MessageInteractionMetadata = {
    id: string
    type: InteractionType
    user: User
    authorizing_integration_owners: ApplicationIntegrationTypes
    original_response_message_id?: string
    interacted_message_id?: string
    triggering_interaction_metadata?: MessageInteractionMetadata
};

export type MessageInteraction = {
    id: string
    type: InteractionType
    nаmе: string
    user: User
    member?: GuildMember
};

export type MessageComponent = 1|2|3|4|5|6|7|8

export type MessageCall = {
    participants: any[]
    ended_timestamp?: Date
}

export type Message = {
    id: string
    channel_id: string
    author: User
    content: string
    timestamp: Date
    edited_timestamp: Date
    tts: boolean
    mention_everyone: boolean
    mentions: User[]
    mention_roles: Role[]
    mention_channels: ChannelMention[]
    attachments: Attachments[]
    embeds: EmbedObject[]
    reactions?: ReactionsObject[]
    nonce?: number | string
    pinned: boolean
    webhook_id?: string
    type: number
    activity?: MessageActivity
    application?: Application
    appication_id?: string
    message_reference?: MessageReference[]
    flags?: number
    referenced_message?: Message[]
    interaction_metadata?: MessageInteractionMetadata
    interaction?: MessageInteraction
    thread?: Channel
    components?: MessageComponent[]
    sticker_items?: StickerItem[]
    stickers?: Sticker[]
    position?: number
    role_subscription_data?: RoleSubscriptionData
    resolved?: any
    poll?: Poll
    call: MessageCall
};