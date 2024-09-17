import { FormEvent } from "react";

type InputHandlerType = {
    event: FormEvent<HTMLTextAreaElement|HTMLInputElement>,
    previewId: string,
    id: string,
    type: 'content'|'url'|'author_url',
    linkId?: string;
};

type AnswerType = {
    preview: any;
    target: any;
    value?: string;
    linkId?: string;
    content?: string;
};

class Answer {
    private readonly _type: 'content'|'url'|'author_url';

    constructor(type: 'content'|'url'|'author_url') {
        this._type = type;
    };

    public readonly execute = (data: AnswerType) => {
        switch (this._type) {
            case 'content':
                return data.preview.textContent = data.target.value;
        
            case 'url':
                return data.preview.src = data.target.value;

            case 'author_url':
                return data.preview.innerHTML = data.value!.length !== 0
                    ? `<a href='${data.value}' id='${data.linkId!}'>${data.content}</a>`
                    : data.content!

            default:
                return;
        }
    };
};

class Handler {
    public readonly input = (data: InputHandlerType) => {
        const target = data.event.currentTarget;
        const document = target.ownerDocument;
        const ChatPreview = document.getElementById('ChatPreview');
        const embed = ChatPreview?.getElementsByClassName(`${data.id}`)[0];
        const preview: any = embed?.querySelector(`#${data.previewId}`);
        const content = preview.textContent;
        const value = target.value;

        new Answer(data.type).execute({
            preview: preview,
            target: target,
            value: value,
            linkId: data.linkId,
            content: content
        });
    };

    public readonly count = (e: FormEvent, countId: string, textId: string, max: number|string, id: string) => {
        const document = e.currentTarget.ownerDocument;
        const main: any = document.getElementsByClassName(id)[0];

        const count: any = main.querySelector(`#${countId}`);
        const text: any = main.querySelector(`#${textId}`);
    
        count.textContent = `${text.value.length}/${max}`;
    };
};

export default Handler;