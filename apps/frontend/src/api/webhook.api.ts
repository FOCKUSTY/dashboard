import type { WebhookMessage, Webhook } from "../types/webhook.types";
import type { GetServerSidePropsContext } from "next";

import axios from 'axios';
import Api from "./api";

const api = new Api();

class WebhookApi {
    private readonly _id?: string;
    private readonly _token?: string;

    constructor(id?: string, token?: string) {
        this._id = id;
        this._token = token;
    };

    public readonly send = async (data: WebhookMessage, id?: string, token?: string) => {
        if(!(this._id || id) || !(this._token || token))
            return;

        try {
            const { data: output } = await axios.post<Webhook>(`${api.url}/webhooks/${this._id||id}/${this._token||token}`, data);
    
            return output;
        } catch (err) {
            return console.error(err);
        };
    };

    public readonly getWebhooks = async(ctx: GetServerSidePropsContext) => {
        const headers = api.validateCookies(ctx);
    
        if(!headers)
            return { redirect: { destination: '/' } };
    
        try {
            const { data: webhooks } = await axios.get<Webhook[]>(`${api.url}/guilds/${ctx.query.id}/webhooks`, { headers: headers });
    
            return { props: { webhooks } };
        } catch (err) {
            console.error(err);
        };
    };

    public readonly getWebhook = async(ctx: GetServerSidePropsContext) => {
        const headers = api.validateCookies(ctx);
    
        if(!headers)
            return { redirect: { destination: '/' } };
    
        try {
            const { data: webhooks } = await axios.get<Webhook[]>(`${api.url}/guilds/${ctx.query.id}/webhooks`, { headers: headers });
            const webhook = webhooks.find(w => w.id === ctx.query.webhookId);
    
            return { props: { webhook } };
        } catch (err) {
            return console.error(err);
        };
    };
};

export default WebhookApi;