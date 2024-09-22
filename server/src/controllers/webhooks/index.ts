import type { Response, Request } from "express"
import Service from "../../services/webhooks"

const service = new Service();

class Controller {
    public readonly postWebhook = async (req: Request, res: Response) => {
        try {
            const data = await service.postWebhook(req.params.webhookId, req.params.webhookToken, req.body);

            res.send(data);
        }
        catch (err) {
            console.error(err);
            res.status(400).send({msg: 'Error'});
        };
    };

    public readonly getWebhook = async (req: Request, res: Response) =>  {
        try {
            const webhook = await service.getWebhook(req.params.webhookId, req.params.webhookToken);
            
            res.send(webhook);
        }
        catch (err) {
            console.error(err);
            res.status(400).send({msg: 'Error'});
        };
    };
};

export default Controller;