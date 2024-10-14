import axios from "axios";

import User from '../../database/schemas/User'
import Api from '../../api/api';

import type { PartialGuild, Webhook } from "../../utils/types";

const api = new Api();

class Service {
    constructor() {};

    public readonly getGuildWebhooks = (id: string) => {
        return axios.get<Webhook>(`${api.discord_url}/guilds/${id}/webhooks`, { headers: api.getBotAuth() });
    };

    public readonly getUserGuild = (id: string) => {
        return axios.get<PartialGuild>(`${api.discord_url}/guilds/${id}`, { headers: api.getBotAuth() });;
    };
    
    public readonly getUserGuilds = async (id: string) => {
        const user = await User.findById(id);
    
        if(!user)
            throw new Error('No user found');
    
        return axios.get<PartialGuild[]>(`${api.discord_url}/users/@me/guilds`, { headers: api.getUserAuth(user.accessToken)});
    };

    public readonly getBotGuilds = () => {
        return axios.get<PartialGuild[]>(`${api.discord_url}/users/@me/guilds`, { headers: api.getBotAuth() });
    };

    public readonly getMutualGuilds = async (id: string) => {
        const { data: botGuilds } = await this.getBotGuilds();
        const { data: userGuilds } = await this.getUserGuilds(id);

        const guildsWithoutBot: PartialGuild[] = [];

        const adminUserGuilds = userGuilds.filter(({permissions}) => (parseInt(permissions) & 0x8) === 0x8);
        const guilds = adminUserGuilds.filter(g => botGuilds.some(botGuild => botGuild.id === g.id));
    
        adminUserGuilds.map((userGuild) => (guilds.find((g) =>
            userGuild.id === g.id)) ?? guildsWithoutBot.push(userGuild));
        
        return [ guilds, guildsWithoutBot ];
    };
};

export default Service;