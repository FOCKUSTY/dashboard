import { saveBackupServer } from "api/backup-api.service";
import { getMessageData } from "api/message-api.service";
import { FormEvent } from "react";

import styles from 'pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import WS from 'components/webhook/oneWebhook.module.scss';
import FS from 'components/embed/field/index.module.scss';
import ES from 'components/embed/index.module.scss';

const enableChars = 'abcdefghijklmnopqrstuvwxyz';

export const SaveHandler = async (e: FormEvent, userId: string, nameId: string) =>
{
    const document = e.currentTarget.ownerDocument;     
    const name: any = document.getElementById(nameId);
    const value: string = name?.value

    if(!name || !name?.value)
        return;

    if(value.length < 4)
    {
        name.value = '';
        name.placeholder = 'Символов должно быть больше 4-х';

        return;
    };

    for(const char of value)
    {
        if(enableChars.indexOf(char.toLowerCase()) === -1)
        {
            name.value = '';
            name.placeholder = 'Содержание недопустимых символов';
    
            return;
        };
    };

    const message = getMessageData({document, mainStyles: styles, webhookStyles: WS, embedStyles: ES, fieldStyles: FS});

    await saveBackupServer(message, name.value, userId);
};