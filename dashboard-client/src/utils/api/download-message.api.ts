import { Message } from "types/message/message.type";
import { DownloadCreateHandler } from "handlers/global/create.handler";

import ES from 'components/embed/index.module.scss';
import FS from 'components/embed/field/index.module.scss';
import WIS from 'components/webhook/oneWebhook.module.scss';
import WS from 'pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';

export const DownloadMessage = async (document: Document, message: Message, setEmbed: (value: any) => void) =>
{
    const content: any = document.getElementById(WS.content);
    const avatarURL: any = document.getElementById(WIS.avatar_url);
    const name: any = document.getElementById(WIS.name);
    const ChatInput = document.getElementById('ChatInput');

    if(!content) return;
    if(!avatarURL) return;
    if(!name) return;
    if(!ChatInput) return;

    const embeds = message.embeds;

    if(embeds.length != 0)
    {
        await DownloadCreateHandler(embeds, setEmbed);

        setTimeout(() => {
            for(let i = 0; i < embeds.length; i++)
            {
                const embed = ChatInput.querySelector(`.embed_${i}`);
            
                console.log(embed);

                // Я доделаю, обещаю
            };
        }, 100);

    };
};