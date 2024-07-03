import axios from "axios";
import { DISCORD_API_URL } from "../../utils/constants";
import { Message } from "../../utils/types";

export async function getMessageService(channelId: string, messageId: string) {
    return (await axios.get<Message>(`${DISCORD_API_URL}/channels/${channelId}/messages/${messageId}`)).data;
};