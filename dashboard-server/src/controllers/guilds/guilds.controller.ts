import { Response, Request } from "express"
import { getGuildService, getGuildWebhooksService, getMutualGuildsService, getUserGuildsService } from "../../services/guilds/guilds.service"
import { User } from "../../database/schemas/user.schema";

export async function getGuildsController(req: Request, res: Response)
{
    const user = req.user as User;
    
    try
    {
        const guilds = await getMutualGuildsService(user.id);
        
        res.send({guilds});
    }
    catch (err)
    {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};

export const getGuildWebhooks = async (req: Request, res: Response) =>
{
    const { guildId: id } = req.params;

    try
    {
        const { data: webhooks } = await getGuildWebhooksService(id);
        
        webhooks
            ? res.send(webhooks)
            : res.sendStatus(403);
    }
    catch (err)
    {
        console.error(err);

        res.status(400).send({msg: 'Error'});
    };
};

export const getGuildPermissionsController = async (req: Request, res: Response) =>
{
    const user = req.user as User;
    const { guildId: id } = req.params;

    try
    {
        const guilds = await getMutualGuildsService(user.id);

        const validGuilds = guilds[0];
        const userGuilds = guilds[1];

        const valid = validGuilds.some((guild) => guild.id === id) ? true : userGuilds.some((guild) => guild.id === id);

        return valid ? res.sendStatus(200) : res.sendStatus(403);
    }
    catch (err)
    {
        console.error(err);

        res.status(400).send({msg: 'Error'});
    };
};

export const checkGuild = async (req: Request) =>
{
    const user = req.user as User;
    const { guildId: id } = req.params;

    try
    {
        const guilds = await getMutualGuildsService(user.id);

        const validGuilds = guilds[0];
        const userGuilds = guilds[1];

        const valid = validGuilds.some((guild) => guild.id === id) ? true : userGuilds.some((guild) => guild.id === id);

        return valid ? true : false;
    }
    catch (err)
    {
        console.error(err);

        return false;
    };
}

export const getGuildController = async (req: Request, res: Response) =>
{
    const { guildId: id } = req.params;

    try
    {
        const { data: guild } = await getGuildService(id);
        const valid = await checkGuild(req);

        valid ? res.send(guild) : res.status(400).send({msg: 'Guild not found'});
    }
    catch (err)
    {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};