import { FormEvent } from "react";
import WS from '../../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss'
import { getMessage } from "../../api";

export const linkHandler = async (e: FormEvent, guildId: string) =>
{
    const document = e.currentTarget.ownerDocument;
    const link: any = document.getElementById(WS.input_message_id);
    
    const content: string = link.value;
    
    if(content.indexOf(`https://discord.com/channels/${guildId}`) === -1)
        return link.value = 'Не найдено сообщения';

    const [ channelId, messageId ] = content.replace(`https://discord.com/channels/${guildId}/`, '').split('/');
    const message = await getMessage(channelId, messageId);

    // Доделаю, обещаю
};