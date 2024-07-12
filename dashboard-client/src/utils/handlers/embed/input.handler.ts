import { FormEvent } from "react";

type InputHandlerType = {
    event: FormEvent<HTMLTextAreaElement|HTMLInputElement>,
    previewId: string,
    id: string,
    type: 'content'|'url'|'author_url',
    linkId?: string;
};

type AnswerType = {
    preview: any
    target: any
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
};

export const InputHandler = (data: InputHandlerType) =>
{
    const target = data.event.currentTarget;
    const document = target.ownerDocument;
    const ChatPreview = document.getElementById('ChatPreview');
    const embed = ChatPreview?.getElementsByClassName(`${data.id}`)[0];
    const preview: any = embed?.querySelector(`#${data.previewId}`);
    const content = preview.textContent;
    const value = target.value;

    Answer[data.type]({
        preview: preview,
        target: target,
        value: value,
        linkId: data.linkId,
        content: content
    });
};

export const Counter = (e: FormEvent, countId: string, textId: string, max: number|string, id: string) =>
{
    const document = e.currentTarget.ownerDocument;

    const main: any = document.getElementsByClassName(id)[0];
    const count: any = main.querySelector(`#${countId}`);
    const text: any = main.querySelector(`#${textId}`);

    count.textContent = `${text.value.length}/${max}`;
};
