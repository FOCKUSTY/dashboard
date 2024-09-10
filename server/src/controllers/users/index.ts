import type { Response, Request } from "express"
import type { User } from "../../database/schemas/User";

import Service from "../../services/users"

const service = new Service();

class Controller {
    public readonly getUser = async (req: Request, res: Response) => {
        const u = req.user as User;
    
        try {
            const user = await service.getUser(u.id);
            
            return res.send(user);
        }
        catch (err) {
            console.error(err);
            res.status(400).send({msg: 'Error'});
        };
    };
};

export default Controller;