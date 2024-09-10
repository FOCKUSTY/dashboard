import axios from "axios";
import Color from "color";
import Api from "../../api/api";

import { WebhookClient } from "discord.js";
import type { Webhook } from "../../utils/types";

class Service {
    public readonly getWebhook = async (id: string, token: string) => {
        return (await axios.get<Webhook>(`${new Api().discord_url}/webhooks/${id}/${token}`)).data;
    };

    public readonly postWebhook = async(id: string, token: string, body: any) => {
        const webhookData = await this.getWebhook(id, token);
        const avatarsrc = `https://cdn.discordapp.com/avatars/${webhookData.id}/${webhookData.avatar}`;
    
        const embeds = [];

        if(body.embeds.length != 0)
            for(const embed of body.embeds)
            {
                embed.color = Color(embed.color).rgbNumber();
                embeds.push(embed);
            };

        const data: any = {
            avatarURL: body.avatar_url || avatarsrc,
            username: body.name || webhookData.name,
            content: body.content || null,
            components: body.components || null,
            embeds: embeds,
            poll: body.poll || null
        };

        const webhook = new WebhookClient({id, token});
        const sendedMessageData = await webhook.send(data);

        return sendedMessageData;
    };
};

export default Service;