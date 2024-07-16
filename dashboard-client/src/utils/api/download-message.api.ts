import { Message } from "types/message/message.type";
import { DownloadCreateHandler } from "handlers/global/create.handler";

import ES from 'components/embed/index.module.scss';
import EPS from 'components/embed/embedPreview.module.scss';
import FS from 'components/embed/field/index.module.scss';
import FPS from 'components/embed/field/fieldPreview.module.scss';
import WIS from 'components/webhook/oneWebhook.module.scss';
import WS from 'pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import { CheckboxChecker } from "../handlers/field/checkbox-input.handler";

const embedContent: any = {
    author: {
        name: {
            inputId: ES.textarea_author_nickname,
            previewId: EPS.author_nickname
        },
        icon_url: {
            inputId: ES.textarea_author_icon_url,
            previewId: EPS.author_image
        },
        author_url: {
            inputId: ES.textarea_author_url,
            previewId: undefined
        },
    },

    main: {
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
    },

    footer: {
        text: {
            inputId: ES.footer_content,
            previewId: EPS.footer_content
        },
        icon_url: {
            inputId: ES.textarea_footer_icon_url,
            previewId: EPS.footer_icon
        },
    }
};

const fieldContent: any = {
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
                const embed: any = embeds[index];

                if(!embedElement)
                    continue;

                for(const key in embedContent)
                {
                    const value: any = embedContent[key];

                    valueCicle: for(const name in value)
                    {
                        const v: {
                            inputId: string,
                            previewId: string
                        } = value[name];

                        if(!v.previewId || !v.inputId)
                            continue valueCicle;

                        const embedValue = embed[name];

                        embedElement.querySelector(`#${v.inputId}`).value = embedValue?.url
                            ? embedValue.url
                            : embedValue || '';

                        if(embedValue?.url)
                            embedPreviewElement.querySelector(`#${v.previewId}`).src = embedValue?.url;
                        else
                            embedPreviewElement.querySelector(`#${v.previewId}`).textContent = embedValue || undefined;
                    };
                };

                if(embed.fields && embed.fields.length != 0)
                    for(let i = 0; i < embed.fields.length; i++)
                    {
                        const fieldElement: any = embedElement.querySelector(`.field_${i}`);
                        const fieldPreviewElement: any = embedPreviewElement.querySelector(`.field_${i}`);
                        const field = embed.fields[i];

                        fieldContentCicle: for(const name in fieldContent)
                        {
                            const value: {
                                inputId: string,
                                previewId: string
                            } = fieldContent[name];

                            if(`${name}` === 'inline')
                                fieldElement.querySelector(`#${value.inputId}`).checked = field[name];

                            if(!value.inputId || !value.previewId)
                                continue fieldContentCicle;

                            fieldElement.querySelector(`#${value.inputId}`).value = field[name];
                            fieldPreviewElement.querySelector(`#${value.previewId}`).textContent = field[name];
                        };

                    };
                };

                CheckboxChecker(document, FPS, FS);
            }, 200);

    };
};