import { Message } from "types/message/message.type";
import { API_URL } from "./api";
import axios from "axios";
import { ColorResolvable } from "discord.js";
import { Embed } from "../types";

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

export const getEmbeds = (embedElements: any[], ES: any, FS: any): Embed[] =>
{
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

            if(fieldElements.length !== 0)
                for(const fieldElement of fieldElements)
                {
                    const name: string | undefined = fieldElement.querySelector(`#${FS.textarea_field_name}`)?.value;
                    const value: string | undefined = fieldElement.querySelector(`#${FS.textarea_field_value}`)?.value;
                    const inline: boolean = fieldElement.querySelector(`#${FS.inline}`)?.checked;

                    if(!name || !value)
                        continue;

                    embed.fields.push({ name: name, value: value, inline: inline });
                };

            embeds.push(embed);
        };

    return embeds;
};

export const getMessageData = (data: {document: Document, mainStyles: any, webhookStyles: any, embedStyles: any, fieldStyles: any}) =>
{
    const
        textAreaContent: any = data.document.getElementById(data.mainStyles.content),
        textAreaUrl: any = data.document.getElementById(data.webhookStyles.avatar_url),
        textAreaName: any = data.document.getElementById(data.webhookStyles.name),
        embedElements: any = data.document.getElementsByClassName(data.embedStyles.container);

    const
        embeds = getEmbeds(embedElements, data.embedStyles, data.fieldStyles),
        content = textAreaContent?.value,
        avatar_url = textAreaUrl?.value,
        name = textAreaName?.value;

    return {
        embeds, content, avatar_url, name
    };
};