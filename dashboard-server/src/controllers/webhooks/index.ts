import { Response, Request } from "express"
import { getWebhookService } from "../../services/webhooks"

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