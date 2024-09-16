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