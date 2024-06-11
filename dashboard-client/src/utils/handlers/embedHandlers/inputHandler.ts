import { FormEvent } from "react";

type InputHandlerType =
{
    event: FormEvent<HTMLTextAreaElement|HTMLInputElement>,
    previewId: string,
    id: string,
    type: 'content'|'url'|'author_url',
    linkId?: string;
};

type AnswerType =
{
    preview: any
    target: EventTarget & (HTMLTextAreaElement | HTMLInputElement)
    value?: string
    linkId?: string
    content?: string
};

const Answer: any =
{
    'content': (data: AnswerType) => data.preview.textContent = data.target.value,
    'url': (data: AnswerType) => data.preview.src = data.target.value,
    'author_url': (data: AnswerType) => data.preview.innerHTML = data.value!.length !== 0
        ? `<a href='${data.value}' id='${data.linkId!}'>${data.content}</a>`
        : data.content
}

export const InputHandler = (data: InputHandlerType) =>
{
    const target = data.event.currentTarget;
    const document = target.ownerDocument;
    const ChatPreview = document.getElementById('ChatPreview');
    const embed = ChatPreview?.getElementsByClassName(`${data.id}`)[0];
    const preview: any = embed?.querySelector(`#${data.previewId}`);
    const content = preview.textContent;
    const value = target.value;

    Answer[data.type](preview, target, value, data.linkId, content);
};

export const inputHandlerCount = (e: FormEvent, countId: string, textId: string, max: number|string, id: string) =>
{
    const document = e.currentTarget.ownerDocument;

    const main: any = document.getElementById(id);
    const count: any = main.querySelector(`#${countId}`);
    const text: any = main.querySelector(`#${textId}`);

    count.textContent = `${text.value.length}/${max}`;
};
