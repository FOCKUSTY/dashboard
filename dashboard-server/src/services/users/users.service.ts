import axios from "axios";
import { User } from '../../database/schemas'
import { DISCORD_API_URL } from "../../utils/constants";
import { PartialUser } from "types/index";

export async function getUserService(id: string) {
    const user = await User.findById(id);

    if(!user)
        throw new Error('No user found');
    
    return (await axios.get<PartialUser[]>(`${DISCORD_API_URL}/users/@me`, {
        headers: { Authorization: `Bearer ${user.accessToken}` }
    })).data;
}