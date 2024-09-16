import { FormEvent } from "react";
import styles from '../../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import WS from '../../../components/webhook/oneWebhook.module.scss';
import ES from '../../../components/embed/index.module.scss';
import FS from '../../../components/embed/field/index.module.scss';
import { Embed, Webhook } from "../../types";
import { sendWebhookMessage } from "../../../api/api";
import { ColorResolvable } from "discord.js";

export const sendHandler = async (webhook: Webhook, e: FormEvent) =>
{
    const document = e.currentTarget.ownerDocument;
    
    const textAreaContent: any = document.getElementById(styles.content);
    const textAreaUrl: any = document.getElementById(WS.avatar_url);
    const textAreaName: any = document.getElementById(WS.name);
    const embedElements: any = document.getElementsByClassName(ES.container);

    const embeds = [];

    if(embedElements.length != 0)
        for(const embedElement of embedElements)
        {
            const author: { name?: string, iconURL?: string, url?: string } =
            {
                name: embedElement.querySelector(`#${ES.textarea_author_nickname}`)?.value,
                iconURL: embedElement.querySelector(`#${ES.textarea_author_icon_url}`)?.value,
                url: embedElement.querySelector(`#${ES.textarea_author_url}`)?.value
            };

            const title: string | undefined = embedElement.querySelector(`#${ES.textarea_body_title}`)?.value;
            const description: string | undefined = embedElement.querySelector(`#${ES.textarea_body_description}`)?.value
            const url: string | undefined = embedElement.querySelector(`#${ES.textarea_body_url}`)?.value;
            const color: ColorResolvable | null = embedElement.querySelector(`#${ES.input_body_color}`)?.value;

            const image: string | undefined = embedElement.querySelector(`#${ES.images_image_urls}`)?.value
            const thumbnail: string | undefined = embedElement.querySelector(`#${ES.images_thumbnail_url}`)?.value

            const footer: { text: string, iconURL?: string } =
            {
                text: embedElement.querySelector(`#${ES.footer_content}`)?.value,
                iconURL: embedElement.querySelector(`#${ES.textarea_footer_icon_url}`)?.value
            };

            const timestamp: string | undefined = embedElement.querySelector(`#${ES.footer_time}`)?.value
            const fieldElements = embedElement.getElementsByClassName(FS.container);

            const embed: Embed = {
                author: author.name ? author : undefined,
                color: color,
                description: description,
                footer: footer,
                thumbnail: thumbnail,
                image: image,
                timestamp: timestamp,
                title: title,
                url: url,
                fields: []
            };

            if(fieldElements.length != 0)
                for(const fieldElement of fieldElements)
                {
                    const name: string | undefined = fieldElement.querySelector(`#${FS.textarea_field_name}`)?.value;
                    const value: string | undefined = fieldElement.querySelector(`#${FS.textarea_field_value}`)?.value;
                    const inline: boolean = fieldElement.querySelector(`#${FS.inline}`)?.checked;

                    if(!name || !value)
                        continue;

                    console.log(fieldElement.querySelector(`#${FS.inline}`)?.checked)

                    embed.fields.push({ name: name, value: value, inline: inline });
                };

            embeds.push(embed);
        }

    const content = textAreaContent?.value;
    const avatar_url = textAreaUrl?.value;
    const name = textAreaName?.value;

    await sendWebhookMessage(webhook.id, webhook.token, {
        content: content,
        avatar_url: avatar_url,
        name: name,
        embeds: embeds
    });
};