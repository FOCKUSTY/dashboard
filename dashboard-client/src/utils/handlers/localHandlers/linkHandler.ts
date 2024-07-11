import WS from '../../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss'
<<<<<<< Updated upstream
import { getMessage } from "../../api";
import { FormEvent } from "react";
import { t } from '../../../utils/helpers';
=======
import { getMessage } from "api/message";
>>>>>>> Stashed changes

export const linkHandler = async (e: FormEvent, l: string) =>
{
    const document = e.currentTarget.ownerDocument;
    const link: any = document.getElementById(WS.input_message_id);
    const content: string = link.value.replace(`https://discord.com/channels/`, '');
    
    const clear = () =>
    {
        link.value = '';
        link.placeholder = t('Сообщение не найдено', l);
    
        return false;
    };

    if(link.value.indexOf(`https://discord.com/channels/`) === -1)
        return clear();

    const [ _guildId, channelId, messageId ] = content.split('/');
    
   const message = await getMessage(channelId, messageId);
    
    if(!message)
        return clear();

    // Обещаю, доделаю
};