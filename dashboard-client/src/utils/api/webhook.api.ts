import { sendWebhookMessageType } from '../types';
import { GetServerSidePropsContext } from "next"
import { Webhook } from 'types/guild/webhook.type';
import { validateCookies } from "../helpers";
import { API_URL } from './api';
import axios from "axios";

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