import { GetServerSidePropsContext } from "next"
import axios from "axios";
import { validateCookies } from "../helpers";
import { Guild, Webhook, sendWebhookMessageType } from "../types";
import config from '../../../config.json'

const API_URL: string = `${config.server_url}/api`;

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
        const { data: guilds } = await axios.get<Guild[]>(`${API_URL}/guilds`, { headers });

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
        const { data: guild } = await axios.get<Guild>(`${API_URL}/guilds/${ctx.query.id}`, { headers: headers });

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