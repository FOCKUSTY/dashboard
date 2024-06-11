import { sendWebhookMessage } from "./api";
import { Webhook } from "./types";
import { FormEvent } from "react";
import styles from '../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import webhookStyles from '../components/webhook/oneWebhook.module.scss'

export const inputNameHandler = async(e: FormEvent) =>
{
    const document = e.currentTarget.ownerDocument;
    const textAreaName: any = document.getElementById(webhookStyles.name);
    const nameInMsg: any = document.getElementById(styles.name)
    const name: any = textAreaName?.value;

    nameInMsg.textContent = name;
};

export const inputURLHandler = async(e: FormEvent) =>
{
    const document = e.currentTarget.ownerDocument;

    const textAreaUrl: any = document.getElementById(webhookStyles.avatar_url);
    const imgInMsg: any = document.getElementById(styles.msg_avatar)
    const image: any = document.getElementById(webhookStyles.avatar);

    const url = textAreaUrl.value;
    
    imgInMsg.src = url || '/TheVoidAvatarSite.png';
    image.src = url || '/TheVoidAvatarSite.png';
}

export const sendHandler = async (webhook: Webhook, e: FormEvent) =>
{
    const document = e.currentTarget.ownerDocument;
    
    const textAreaContent: any = document.getElementById(styles.content);
    const textAreaUrl: any = document.getElementById(webhookStyles.avatar_url);
    const textAreaName: any = document.getElementById(webhookStyles.name);
    
    const content = textAreaContent?.value;
    const avatar_url = textAreaUrl?.value;
    const name = textAreaName?.value;
    
    await sendWebhookMessage(webhook.id, webhook.token, {
        content: content,
        avatar_url: avatar_url,
        name: name
    });
};