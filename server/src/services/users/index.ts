import axios from "axios";

import User from '../../database/schemas/User'
import Api from "../../api/api";

import type { PartialUser } from "../../utils/types";

class Service {
    public readonly getUser = async (id: string) => {
        const user = await User.findById(id);
    
        if(!user)
            throw new Error('No user found');
        
        return (await axios.get<PartialUser[]>(`${new Api().discord_url}/users/@me`, { headers: new Api().getUserAuth(user.accessToken)})).data;
    };
};

export default Service;