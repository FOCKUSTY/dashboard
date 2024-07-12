import axios from "axios";
import { User } from '../../database/schemas'
import { DISCORD_API_URL } from "../../utils/constants";
import { PartialGuild } from "types/guild/guild.type";
import { Webhook } from "types/guild/webhook.type";

export function getBotGuildsServices()
{
    const TOKEN = process.env.DISCORD_BOT_TOKEN;

    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${TOKEN}` }
    })
};

export async function getUserGuildsService(id: string)
{
    const user = await User.findById(id);

    if(!user)
        throw new Error('No user found');

    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accessToken}` }
    });
};

export const getMutualGuildsService = async (id: string) =>
{
    const { data: botGuilds } = await getBotGuildsServices();
    const { data: userGuilds } = await getUserGuildsService(id);

    const adminUserGuilds = userGuilds.filter(
        ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
    );

    const guilds = adminUserGuilds.filter(
        (guild) => botGuilds.some(
            (botGuild) => botGuild.id === guild.id));

    const userGuildsWITHNOTBOT: PartialGuild[] = [];

    adminUserGuilds.map((userGuild) =>
        (guilds.find((guild) => userGuild.id === guild.id)) ?? userGuildsWITHNOTBOT.push(userGuild));
    
    return [guilds, userGuildsWITHNOTBOT];
};

export const getGuildService = (id: string) =>
{
    const TOKEN = process.env.DISCORD_BOT_TOKEN;

    return axios.get<PartialGuild>(`${DISCORD_API_URL}/guilds/${id}`, { headers: { Authorization: `Bot ${TOKEN}` }});;
};

export const getGuildWebhooksService = (id: string) =>
{
    const TOKEN = process.env.DISCORD_BOT_TOKEN;

    return axios.get<Webhook>(`${DISCORD_API_URL}/guilds/${id}/webhooks`, { headers: { Authorization: `Bot ${TOKEN}` }});
};