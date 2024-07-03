import { Response, Request } from "express";
import { getMessageService } from "../../services/messages";

export async function getMessageController(req: Request, res: Response)
{
    try
    {
        const message = await getMessageService(req.params.channelId, req.params.messageId);
        
        res.send(message);
    }
    catch (err)
    {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};