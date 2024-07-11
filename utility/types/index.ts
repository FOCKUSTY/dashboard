import { FullGuild } from './guild/guild.type';

export type TagObject = {
    id: string
    name: string
    moderated: boolean
    emoji_id: string
    emoji_name: string
}

export type AvatarDecorationData = {
    asset: string
    sku_id: string
}

export type User = {
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

export type TeamMember = {
    membership_state: number
    team_id: string
    user: User
    role: string
};

export type TeamObject = {
    icon: string;
    id: string;
    member: TeamMember[];
    name: string;
    owner_user_id: string;
};

export type ParamsObject = {
    scopes: string[]
    permissons: string
}

export enum ApplicationIntegrationTypes {
    GUILD_INSTALL = 0,
    USER_INSTALL = 1
}

export type Application = {
    id: string
    name: string
    icon: string
    description: string
    rpc_origins?: string[]
    bot_public: boolean
    bot_require_code_grant: boolean
    bot: User
    terms_of_service_url: string
    privacy_policy_url: string
    owner?: User
    summary: string
    verify_key: string
    team: TeamObject
    guild_id?: string
    guild?: FullGuild
    primary_sku_id?: string
    slug?: string
    cover_image?: string
    flags?: number
    approximate_guild_count?: number
    redirect_uris?: string[]
    interactions_endpoint_url?: string
    role_connections_verification_url?: string
    tags?: string[]
    instal_params?: ParamsObject
    integration_types_config?: ApplicationIntegrationTypes
    custom_install_url?: string
};