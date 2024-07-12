import { FormEvent } from "react";

export const FieldInputHandler = (event: FormEvent<HTMLTextAreaElement|HTMLInputElement>, previewId: string, embedId: string, fieldId: string) =>
{
    const document = event.currentTarget.ownerDocument;
    const ChatPreview = document.getElementById('ChatPreview');
    const embed = ChatPreview?.getElementsByClassName(`${embedId}`)[0];
    const field = embed?.getElementsByClassName(`${fieldId}`)[0];
    const preview: any = field?.querySelector(`#${previewId}`);

    preview.textContent = event.currentTarget.value;
};