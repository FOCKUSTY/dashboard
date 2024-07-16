import { FormEvent } from "react";

import { DownloadMessage } from "api/download-message.api";
import { getMessage } from "api/message.api";
import { t } from '../../helpers';

import WS from '../../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';

export const LinkHandler = async (e: FormEvent, l: string, setEmbeds: (value: any[]) => void, setField: (value: any) => void) =>
{
    const document = e.currentTarget.ownerDocument;
    const link: any = document.getElementById(WS.input_message_id);
    const content: string = link.value.indexOf(`https://discord.com/channels/`) !== -1
        ? link.value.replace(`https://discord.com/channels/`, '')
        : link.value.replace(`https://ptb.discord.com/channels/`, '');
    
    const clear = () =>
    {
        link.value = '';
        link.placeholder = t('Сообщение не найдено', l);
    
        return false;
    };

    if(link.value.indexOf(`https://discord.com/channels/`) === -1 && link.value.indexOf(`https://ptb.discord.com/channels/`) === -1)
        return clear();

    const [ _guildId, channelId, messageId ] = content.split('/');
    
    const message = await getMessage(channelId, messageId);
    
    if(!message)
        return clear();

    DownloadMessage(document, message, setEmbeds, setField);
};