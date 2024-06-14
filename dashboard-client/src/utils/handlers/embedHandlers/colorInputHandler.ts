import { getHexSymbol } from "../../helpers";
import { FormEvent } from "react";

export const ColorInputHandler = (event: FormEvent<HTMLTextAreaElement|HTMLInputElement>, id: string) =>
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

export const textareaColorInputHandler = (e: FormEvent<HTMLTextAreaElement|HTMLInputElement>, id: string, styles: any) =>
{
    const document = e.currentTarget.ownerDocument;
    const main = document.getElementsByClassName(id)[0];
    const value: string[] = e.currentTarget.value.split('');
    const color: any = main.querySelector(`#${styles.input_body_color}`);
    const line: any = main.querySelector(`#${styles.container_left}`);
    
    value[0] = '#';

    for(let char of value)
        if(!getHexSymbol(char))
            value[value.indexOf(char)] = '';
    
    const v = value.join('');
    e.currentTarget.value = v;
    
    if(v.length !== 7)
        return;

    line.style.background = v;
    color.value = v;
};

export const colorInputHandler = (e: FormEvent, valueId: string, id: string, styles: any) =>
{
    const document = e.currentTarget.ownerDocument;
    const target: any = e.currentTarget;
    const main = document.getElementsByClassName(id)[0];
    
    if(!main)
        return;

    const value: any = main.querySelector(`#${valueId}`);
    const line: any = main.querySelector(`#${styles.container_left}`);
    
    value.value = target.value;
    line.style.background = target.value;
};