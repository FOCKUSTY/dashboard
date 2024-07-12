import { AvatarDecorationData, User } from "../index"

export type GuildMember = {
    user?: User
    nick?: string
    avatar?: string
    roles: any[]
    joined_at: Date
    premium_since?: Date
    deaf: boolean
    mute: boolean
    flags: number
    pending?: boolean
    permissions?: string
    communication_disabled_until?: Date
    avatar_decoration_data: AvatarDecorationData
}