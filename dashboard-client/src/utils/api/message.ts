import { Message } from "types/message/message";
import { API_URL } from "./index";
import axios from "axios";

export const getMessage = async(channelId: string, messageId: string) =>
{
    try
    {
        const { data: message } = await axios.get<Message>(`${API_URL}/channels/${channelId}/${messageId}`);

        return message;
    }
    catch (err)
    {
        console.error(err);
    };
};