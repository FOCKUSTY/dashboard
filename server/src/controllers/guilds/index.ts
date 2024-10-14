import type { Response, Request } from "express"
import type { User } from "../../database/schemas/User";

import Service from "../../services/guilds"

const service = new Service();

class Controller {
    private async getValid(user: User, guildId: string) {
        const [ guilds, guildsWithoutBot ] = await service.getMutualGuilds(user.id);
    
        const valid = guilds.some((guild) =>
            guild.id === guildId)
                ? true
                : guildsWithoutBot.some((guild) => guild.id === guildId);

        return valid;
    };

    private readonly checkGuild = async (req: Request) => {
        const user = req.user as User;
        const { guildId: id } = req.params;
    
        try {
            const valid = await this.getValid(user, id);
    
            return valid
                ? true
                : false;
        }
        catch (err) {
            console.error(err);
    
            return false;
        };
    };

    public readonly getGuilds = async (req: Request, res: Response) => {
        const user = req.user as User;
        
        try {
            const guilds = await service.getMutualGuilds(user.id);
            
            return res.send(guilds);
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({msg: 'Error'});
        };
    };

    public readonly getGuildWebhooks = async (req: Request, res: Response) => {
        const { guildId: id } = req.params;
    
        try {
            const { data: webhooks } = await service.getGuildWebhooks(id);
            
            return webhooks
                ? res.send(webhooks)
                : res.sendStatus(403);
        }
        catch (err) {
            console.error(err);
            return res.status(400).send({msg: 'Error'});
        };
    };

    public readonly getGuildPermissions = async (req: Request, res: Response) => {
        const user = req.user as User;
        const { guildId: id } = req.params;
    
        try {
            const valid = await this.getValid(user, id);

            return valid
                ? res.sendStatus(200)
                : res.sendStatus(403);
        }
        catch (err) {
            console.error(err);
    
            res.status(400).send({msg: 'Error'});
        };
    };

    public readonly getGuild = async (req: Request, res: Response) => {
        const { guildId: id } = req.params;
    
        try {
            const { data: guild } = await service.getUserGuild(id);
            const valid = await this.checkGuild(req);
    
            return valid
                ? res.send(guild)
                : res.status(403).send({msg: 'Guild not found.'});
        }
        catch (err) {
            console.error(err);
            res.status(400).send({msg: 'Error'});
        };
    };
};

export default Controller;