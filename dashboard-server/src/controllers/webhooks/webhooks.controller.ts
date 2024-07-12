import { Response, Request } from "express"
import { getWebhookService } from "../../services/webhooks/webhooks.service"
import { WebhookClient } from "discord.js";
import Color from 'color';

export async function postWebhookController(req: Request, res: Response)
{
    try
    {
        const webhookData = await getWebhookService(req.params.webhookId, req.params.webhookToken);
        const avatarsrc = `https://cdn.discordapp.com/avatars/${webhookData.id}/${webhookData.avatar}`;

        const embeds = [];

        if(req.body.embeds.length != 0)
            for(const embed of req.body.embeds)
            {
                embed.color = Color(embed.color).rgbNumber();
                embeds.push(embed);
            };

        const data: any = {
            avatarURL: req.body.avatar_url || avatarsrc,
            username: req.body.name || webhookData.name,
            content: req.body.content || null,
            components: req.body.components || null,
            embeds: embeds,
            poll: req.body.poll || null
        };

        const webhook = new WebhookClient({id: req.params.webhookId, token: req.params.webhookToken});
        const sendedMessageData = await webhook.send(data);

        res.send(sendedMessageData);
    }
    catch (err)
    {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};

export async function getWebhookController(req: Request, res: Response)
{
    try
    {
        const webhook = await getWebhookService(req.params.webhookId, req.params.webhookToken);
        
        res.send(webhook);
    }
    catch (err)
    {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};