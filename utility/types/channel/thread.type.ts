import { GuildMember } from "../guild/member.type"

export type ThreadMetadata = {
    archived: boolean
    auto_archive_duration: number
    archive_timestamp: Date
    locked: boolean
    invitable?: boolean
    create_timestamp?: Date
}

export type ThreadMember = {
    id?: string
    user_id: string
    join_timestamp: Date
    flags: number
    member: GuildMember
};