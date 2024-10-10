import { FormEvent } from "react";
import Utils from "../../../api/utils.api";

const utils = new Utils();

class Handler {
    private getHexColorValue(value: string[]) {
        value[0] = '#';
    
        for(let char of value)
            if(!utils.getHexSymbol(char))
                value[value.indexOf(char)] = '';
        
        const v = value.join('');

        return v;
    };

    public readonly colorInput = (event: FormEvent<HTMLTextAreaElement|HTMLInputElement>, id: string) => {
        const document = event.currentTarget.ownerDocument;
        const chatPreview = document.getElementById('ChatPreview');
        
        const embed: any = chatPreview?.getElementsByClassName(`${id}`)[0];
        const value: string[] = event.currentTarget.value.split('');
        
        const colorValue = this.getHexColorValue(value);
    
        if(colorValue.length === 7) embed.style.borderLeft = `4px solid ${colorValue}`;
    };

    public readonly colorTextInput = (event: FormEvent<HTMLTextAreaElement|HTMLInputElement>, id: string, styles: any) => {
        const document = event.currentTarget.ownerDocument;
        const main = document.getElementsByClassName(id)[0];
        
        const value: string[] = event.currentTarget.value.split('');

        const color: any = main.querySelector(`#${styles.input_body_color}`);
        const line: any = main.querySelector(`#${styles.container_left}`);
        
        const colorValue = this.getHexColorValue(value);

        event.currentTarget.value = colorValue;
        
        if(colorValue.length !== 7) return;
    
        line.style.background = colorValue;
        color.value = colorValue;
    };

    public readonly inputColor = (event: FormEvent, valueId: string, id: string, styles: any) => {
        const document = event.currentTarget.ownerDocument;
        const target: any = event.currentTarget;
        const main = document.getElementsByClassName(id)[0];
        
        if(!main)
            return;
    
        const value: any = main.querySelector(`#${valueId}`);
        const line: any = main.querySelector(`#${styles.container_left}`);
        
        value.value = target.value;
        line.style.background = target.value;
    };
};

export default Handler;