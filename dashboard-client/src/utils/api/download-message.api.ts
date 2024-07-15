import { Message } from "types/message/message.type";
import { DownloadCreateHandler } from "handlers/global/create.handler";

import ES from 'components/embed/index.module.scss';
import EPS from 'components/embed/embedPreview.module.scss';
import FS from 'components/embed/field/index.module.scss';
import FPS from 'components/embed/field/fieldPreview.module.scss';
import WIS from 'components/webhook/oneWebhook.module.scss';
import WS from 'pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';

const embedContent = {
    authorName: {
        inputId: ES.textarea_author_nickname,
        previewId: EPS.author_nickname
    },
    authorIconUrl: {
        inputId: ES.textarea_author_icon_url,
        previewId: EPS.author_image
    },
    authorUrl: {
        inputId: ES.textarea_author_url,
        previewId: undefined
    },

    title: {
        inputId: ES.textarea_body_title,
        previewId: EPS.body_title
    },
    description: {
        inputId: ES.textarea_body_description,
        previewId: EPS.body_content
    },
    url: {
        inputId: ES.textarea_body_url,
        previewId: undefined
    },
    color: {
        inputId: ES.input_body_color,
        previewId: undefined
    },

    image: {
        inputId: ES.images_image_urls,
        previewId: EPS.image
    },
    thumbnail: {
        inputId: ES.images_thumbnail_url,
        previewId: EPS.thumbnail_image
    },

    footerText: {
        inputId: ES.footer_content,
        previewId: EPS.footer_content
    },
    footerIconUrl: {
        inputId: ES.textarea_footer_icon_url,
        previewId: EPS.footer_icon
    },
};

const fieldContent = {
    name: {
        inputId: FS.textarea_field_name,
        previewId: FPS.field_name_content
    },
    value: {
        inputId: FS.textarea_field_value,
        previewId: FPS.field_value_content
    },
    inline: {
        inputId: FS.inline,
        previewId: undefined
    }
};

export const DownloadMessage = async (document: Document, message: Message, setEmbed: (value: any) => void, setField: (value: any) => void) =>
{
    const content: any = document.getElementById(WS.content);
    const avatarURL: any = document.getElementById(WIS.avatar_url);
    const name: any = document.getElementById(WIS.name);

    const ChatInput = document.getElementById('ChatInput');
    const ChatPreview = document.getElementById('ChatPreview');

    if(!content) return;
    if(!avatarURL) return;
    if(!name) return;

    if(!ChatInput) return;
    if(!ChatPreview) return;

    const embeds = message.embeds;

    if(embeds.length != 0)
    {
        await DownloadCreateHandler(embeds, setEmbed, setField);

        setTimeout(() => {
            for(let index = 0; index < embeds.length; index++)
            {
                const embedPreviewElement: any = ChatPreview.querySelector(`.embed_${index}`);
                const embedElement: any = ChatInput.querySelector(`.embed_${index}`);
                const embed = embeds[index];

                if(!embedElement)
                    continue;

                embedElement.querySelector(`#${ES.textarea_author_nickname}`).value = embed.author?.name || '';
                embedElement.querySelector(`#${ES.textarea_author_icon_url}`).value = embed.author?.icon_url || '';
                embedElement.querySelector(`#${ES.textarea_author_url}`).value = embed.author?.url || '';
    
                embedElement.querySelector(`#${ES.textarea_body_title}`).value = embed.title || '';
                embedElement.querySelector(`#${ES.textarea_body_description}`).value = embed.description || '';
                embedElement.querySelector(`#${ES.textarea_body_url}`).value = embed.url || '';
                embedElement.querySelector(`#${ES.input_body_color}`).value = embed.color || '';
    
                embedElement.querySelector(`#${ES.images_image_urls}`).value = embed.image || '';
                embedElement.querySelector(`#${ES.images_thumbnail_url}`).value = embed.thumbnail || '';
    
                embedElement.querySelector(`#${ES.footer_content}`).value = embed.footer?.text || '';
                embedElement.querySelector(`#${ES.textarea_footer_icon_url}`).value = embed.footer?.icon_url || '';

                if(embed.fields && embed.fields.length != 0)
                    for(let i = 0; i < embed.fields.length; i++)
                    {
                        const fieldElement: any = embedElement.querySelector(`.field_${i}`);
                        const field = embed.fields[i];

                        fieldElement.querySelector(`#${FS.textarea_field_name}`).value = field.name || '';
                        fieldElement.querySelector(`#${FS.textarea_field_value}`).value = field.value || '';
                        fieldElement.querySelector(`#${FS.inline}`).checked = field.inline || '';
                    };
            };
        }, 200);

    };
};