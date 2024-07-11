import { GetServerSidePropsContext } from "next"
import { validateCookies } from "./helpers";
import { Embed, sendWebhookMessageType } from "./types";
import { PartialGuild } from 'types/guild/guild';
import { Webhook } from 'types/guild/webhook';
import { Message } from 'types/message/message';
import config from '../../config.json';
import axios from "axios";
import { ColorResolvable } from "discord.js";
import { Backup } from "types/backups/backup";

const API_URL: string = `${config.server_url}/api`;

export const getEmbeds = (embedElements: any[], ES: any, FS: any): Embed[] =>
{
    const embeds = [];

    if(embedElements.length != 0)
        for(const embedElement of embedElements)
        {
            const author: { name?: string, iconURL?: string, url?: string } =
            {
                name: embedElement.querySelector(`#${ES.textarea_author_nickname}`)?.value,
                iconURL: embedElement.querySelector(`#${ES.textarea_author_icon_url}`)?.value,
                url: embedElement.querySelector(`#${ES.textarea_author_url}`)?.value
            };

            const title: string | undefined = embedElement.querySelector(`#${ES.textarea_body_title}`)?.value;
            const description: string | undefined = embedElement.querySelector(`#${ES.textarea_body_description}`)?.value
            const url: string | undefined = embedElement.querySelector(`#${ES.textarea_body_url}`)?.value;
            const color: ColorResolvable | null = embedElement.querySelector(`#${ES.input_body_color}`)?.value;

            const image: string | undefined = embedElement.querySelector(`#${ES.images_image_urls}`)?.value
            const thumbnail: string | undefined = embedElement.querySelector(`#${ES.images_thumbnail_url}`)?.value

            const footer: { text: string, iconURL?: string } =
            {
                text: embedElement.querySelector(`#${ES.footer_content}`)?.value,
                iconURL: embedElement.querySelector(`#${ES.textarea_footer_icon_url}`)?.value
            };

            const timestamp: string | undefined = embedElement.querySelector(`#${ES.footer_time}`)?.value
            const fieldElements = embedElement.getElementsByClassName(FS.container);

            const embed: Embed = {
                author: author.name ? author : undefined,
                color: color,
                description: description,
                footer: footer,
                thumbnail: thumbnail,
                image: image,
                timestamp: timestamp,
                title: title,
                url: url,
                fields: []
            };

            if(fieldElements.length !== 0)
                for(const fieldElement of fieldElements)
                {
                    const name: string | undefined = fieldElement.querySelector(`#${FS.textarea_field_name}`)?.value;
                    const value: string | undefined = fieldElement.querySelector(`#${FS.textarea_field_value}`)?.value;
                    const inline: boolean = fieldElement.querySelector(`#${FS.inline}`)?.checked;

                    if(!name || !value)
                        continue;

                    embed.fields.push({ name: name, value: value, inline: inline });
                };

            embeds.push(embed);
        };

    return embeds;
};

export const getMessageData = (data: {document: Document, mainStyles: any, webhookStyles: any, embedStyles: any, fieldStyles: any}) =>
{
    const
        textAreaContent: any = data.document.getElementById(data.mainStyles.content),
        textAreaUrl: any = data.document.getElementById(data.webhookStyles.avatar_url),
        textAreaName: any = data.document.getElementById(data.webhookStyles.name),
        embedElements: any = data.document.getElementsByClassName(data.embedStyles.container);

    const
        embeds = getEmbeds(embedElements, data.embedStyles, data.fieldStyles),
        content = textAreaContent?.value,
        avatar_url = textAreaUrl?.value,
        name = textAreaName?.value;

    return {
        embeds, content, avatar_url, name
    };
};

export const saveBackupServer = async (message: sendWebhookMessageType, backupName: string, userId: string) =>
{
    try
    {
        const { data } = await axios.post(`${API_URL}/backups/${userId}`, { message: message, name: backupName });

        return data;
    }
    catch (err)
    {
        console.error(err);

        return;
    };
};

export const sendWebhookMessage = async (id: string, token: string, sendMessageData: sendWebhookMessageType) =>
{
    try
    {
        const { data } = await axios.post<Webhook>(`${API_URL}/webhooks/${id}/${token}`, sendMessageData);

        return data;
    }
    catch (err)
    {
        console.error(err);

        return;
    };
};

export const fetchMutialGuilds = async (context: GetServerSidePropsContext) =>
{
    const headers = validateCookies(context);

    if(!headers)
        return { redirect: { destination: '/' } };

    try
    {
        const { data: guilds } = await axios.get<PartialGuild[]>(`${API_URL}/guilds`, { headers });

        return { props: guilds };
    }
    catch (err)
    {
        console.error(err);

        return { redirect: { destination: '/' } };
    };
};

export const getUser = async (ctx: GetServerSidePropsContext) =>
{
    const headers = validateCookies(ctx);

    if(!headers)
        return { props: { user: null } };

    try
    {
        const res = await fetch(`${API_URL}/users/${ctx.query.id}`, { headers: headers });

        const user = await res.json();

        return { props: { user } };
    }
    catch (err)
    {
        console.error(err);
        
        return { props: { user: null } };
    };
}

export const getGuild = async (ctx: GetServerSidePropsContext) =>
{
    const headers = validateCookies(ctx);

    if(!headers)
        return { redirect: { destination: '/' } };

    try
    {
        const status = (await fetch(`${API_URL}/guilds/${ctx.query.id}`, { headers: headers })).status;

        if(status != 200)
            return { redirect: { destination: '/' } };
        
        const res = await fetch(`${API_URL}/guilds/${ctx.query.id}`, { headers: headers });
        const guild = await res.json();

        return { props: { guild } };
    }
    catch (err)
    {
        console.error(err);
        
        return { redirect: { destination: '/' } };  
    };
};

export const fetchGuild = async (ctx: GetServerSidePropsContext) =>
{
    const headers = validateCookies(ctx);

    if(!headers)
        return { redirect: { destination: '/' } };

    try
    {
        const { data: guild } = await axios.get<PartialGuild>(`${API_URL}/guilds/${ctx.query.id}`, { headers: headers });

        return { props: { guild } };
    }
    catch (err)
    {
        console.error(err);

        return { redirect: { destination: '/' } };
    };
};

export const getWebhook = async(ctx: GetServerSidePropsContext) =>
{
    const headers = validateCookies(ctx);

    if(!headers)
        return { redirect: { destination: '/' } };

    try
    {
        const { data: webhooks } = await axios.get<Webhook[]>(`${API_URL}/guilds/${ctx.query.id}/webhooks`, { headers: headers });
        const webhook = webhooks.find((webhook) => webhook.id === ctx.query.webhookId);

        return { props: { webhook } };
    }
    catch (err)
    {
        console.error(err);
    };
};

export const getMessage = async(channelId: string, messageId: string): Promise<Message | false> =>
{
    try
    {
        const { data: message } = await axios.get<Message>(`${API_URL}/channels/${channelId}/${messageId}`);

        return message;
    }
    catch (err)
    {
        console.error(err);
        
        return false;
    };
};

export const getBackups = async(ctx: GetServerSidePropsContext, userId: string) =>
{
    const headers = validateCookies(ctx);

    if(!headers)
        return { redirect: { destination: '/' } };

    try
    {
        const { data: backups } = await axios.get<Backup[]>(`${API_URL}/backups/${userId}`, { headers: headers });

        return { props: { backups } };
    }
    catch (err)
    {
        console.error(err);
    };
}

export const fetchWebhooks = async(ctx: GetServerSidePropsContext) =>
{
    const headers = validateCookies(ctx);

    if(!headers)
        return { redirect: { destination: '/' } };

    try
    {
        const { data: webhooks } = await axios.get<Webhook[]>(`${API_URL}/guilds/${ctx.query.id}/webhooks`, { headers: headers });

        return { props: { webhooks } };
    }
    catch (err)
    {
        console.error(err);
    };
};

export const fetchValidGuild = async (id: string, headers: HeadersInit) =>
{
    const respone = await fetch(`${API_URL}/guilds/${id}/permissions`, {
        headers: headers
    });

    return respone;
};