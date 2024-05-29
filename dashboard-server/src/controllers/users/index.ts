import { Response, Request } from "express"
import { getUserService } from "../../services/users"
import { User } from "../../database/schemas/User";

export async function getUserController(req: Request, res: Response)
{
    const u = req.user as User;
    
    try
    {
        const user = await getUserService(u.id);
        
        res.send(user);
    }
    catch (err)
    {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};