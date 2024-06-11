import { FormEvent } from "react";
import { getHexSymbol } from "./helpers";
import EPS from '../components/embed/embedPreview.module.scss';

export const InputHandler = (event: FormEvent<HTMLTextAreaElement|HTMLInputElement>, previewId: string, id: string) =>
{
    const document = event.currentTarget.ownerDocument;
    const ChatPreview = document.getElementById('ChatPreview');
    const embed = ChatPreview?.getElementsByClassName(`${id}`)[0];
    const preview: any = embed?.querySelector(`#${previewId}`);

    preview.textContent = event.currentTarget.value;
};

export const InputColorHandler = (event: FormEvent<HTMLTextAreaElement|HTMLInputElement>, id: string) =>
{
    const document = event.currentTarget.ownerDocument;
    const ChatPreview = document.getElementById('ChatPreview');
    const embed: any = ChatPreview?.getElementsByClassName(`${id}`)[0];
    const value: string[] = event.currentTarget.value.split('');
    
    value[0] = '#';

    for(let char of value)
        if(!getHexSymbol(char))
            value[value.indexOf(char)] = '';
    
    const v = value.join('');

    if(v.length === 7)
        embed.style.borderLeft = `4px solid ${v}`;
};

export const InputUrlHandler = (event: FormEvent<HTMLTextAreaElement|HTMLInputElement>, previewId: string, id: string) =>
{
    const document = event.currentTarget.ownerDocument;
    const ChatPreview = document.getElementById('ChatPreview');
    const embed = ChatPreview?.getElementsByClassName(`${id}`)[0];
    const preview: any = embed?.querySelector(`#${previewId}`);

    preview.src = event.currentTarget.value;
};

export const InputAuthorUrlHandler = (event: FormEvent<HTMLTextAreaElement|HTMLInputElement>, previewId: string, id: string, linkId: string) =>
{
    const document = event.currentTarget.ownerDocument;
    const ChatPreview = document.getElementById('ChatPreview');
    const embed = ChatPreview?.getElementsByClassName(`${id}`)[0];
    const preview: any = embed?.querySelector(`#${previewId}`);
    const content = preview.textContent;
    const value = event.currentTarget.value;

    if(value.length !== 0)
        preview.innerHTML = `<a href='${value}' id='${linkId}'>${content}</a>`;
    else
        preview.innerHTML = content;
}