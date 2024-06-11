import { FormEvent } from "react";
import styles from '../../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import webhookStyles from '../../../components/webhook/oneWebhook.module.scss'
import { Webhook } from "../../types";
import { sendWebhookMessage } from "../../api";

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