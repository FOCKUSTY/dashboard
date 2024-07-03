import { Attachments } from "./attachments";
import { EmbedObject } from "./embed";
import { Role } from "../guild/role";
import { User } from "../index";
import { Poll } from "./poll";

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