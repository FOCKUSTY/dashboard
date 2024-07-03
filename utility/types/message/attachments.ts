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