import { ComponentData, EmbedData, PollData } from "discord.js";

export type Message = {
    content?: string;
    nonce?: number | string;
    tts?: boolean;
    embeds?: EmbedObject[];
    allowed_mentions?: AllowedMentions;
    message_reference?: MessageReference;
    components?: any;
    sticker_ids?: string[];
    files?: any;
    payload_json?: string;
    attachments?: Attachments[];
    flags?: number;
    enforce_nonce?: boolean;
    poll?: Poll;
};

export type PartialGuild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
};

export type sendWebhookMessageType = {
    content?: string;
    embed?: EmbedData[];
    components?: ComponentData[];
    poll?: PollData;

    name?: string;
    avatar_url?: string;
};

export type PartialUser = {
    id: string;
    username: string;
    avatar?: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner?: string;
    accent_color: number;
    global_name?: string;
    banner_color: string;
    locale: string;
    verified: boolean;
};

export type Webhook = {
    id: string;
    type: number;
    guild_id?: string;
    channel_id?: string;
    user?: PartialUser;
    name: string;
    avatar: string;
    token: string;
    application_id: string;
    source_guild?: any;
    source_channel: any;
    url: string;
};

export type EmbedObject = {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    provider?: EmbedProvider;
    author?: EmbedAuthor;
    fields?: EmbedField[];
};

export type EmbedFooter = {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

export type EmbedField = {
    name: string;
    value: string;
    inline?: boolean;
};

export type EmbedAuthor = {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

export type EmbedImage = {
    url: string;
    proxy_url?: string;
    height?: number;
    weight?: number;
};

export type EmbedThumbnail = {
    url: string;
    proxy_url?: string;
    height?: number;
    weight?: number;
};

export type EmbedProvider = {
    name: string;
    url: string;
};

export type EmbedVideo = {
    url?: string;
    proxy_url?: string;
    height?: number;
    weight?: number;
};

export type AllowedMentions = {
    parse: any[];
    roles: Role[];
    users: User[];
    replied_user: boolean;
};

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

export type MessageReference = {
    message_id?: string;
    channel_id?: string;
    guild_id?: string;
    fail_if_not_exists?: boolean;
};

export type Attachments = {
    id: string;
    filename: string;
    title?: string;
    description?: string;
    content_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number;
    width?: number;
    ephemeral?: boolean;
    duration_secs?: number;
    waveform?: string;
    flags?: number;
};

export type Poll = {
    question: PollMedia;
    answers: PollAnswer[];
    duration: number;
    allow_multiselect: boolean;
    layout_type?: number;
};

export type PollAnswer = {
    answer_id: number;
    poll_media: PollMedia;
};

export type PollMedia = {
    text: string;
    emoji?: Emoji;
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