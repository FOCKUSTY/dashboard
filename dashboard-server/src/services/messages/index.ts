import axios from "axios";
import { DISCORD_API_URL } from "../../utils/constants";
import { Message } from "types/message/message";

export async function getMessageService(channelId: string, messageId: string) {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;

    return (await axios.get<Message>(`${DISCORD_API_URL}/channels/${channelId}/messages/${messageId}`,{
        headers: { Authorization: `Bot ${TOKEN}` }
    })).data;
};