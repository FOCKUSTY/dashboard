import axios from "axios";
import { DISCORD_API_URL } from "../../utils/constants";
import { Webhook } from "../../utils/types";

export async function getWebhookService(webhookId: string, webhookToken: string) {
    return (await axios.get<Webhook>(`${DISCORD_API_URL}/webhooks/${webhookId}/${webhookToken}`)).data;
}