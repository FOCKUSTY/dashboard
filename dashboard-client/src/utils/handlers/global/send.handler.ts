import { FormEvent } from "react";

import styles from 'pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import WS from 'components/webhook/oneWebhook.module.scss';
import ES from 'components/embed/index.module.scss';
import FS from 'components/embed/field/index.module.scss';

import { Webhook } from "types/guild/webhook.type";
import { sendWebhookMessage } from "@/src/utils/api/webhook.api";
import { getMessageData } from "@/src/utils/api/message.api";

export const SendHandler = async (webhook: Webhook, e: FormEvent) =>
{
    const document = e.currentTarget.ownerDocument; 
    const message = getMessageData({document, mainStyles: styles, webhookStyles: WS, embedStyles: ES, fieldStyles: FS});

    await sendWebhookMessage(webhook.id, webhook.token, message);
};