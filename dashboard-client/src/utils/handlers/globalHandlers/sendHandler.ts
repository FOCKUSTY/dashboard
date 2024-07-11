import { FormEvent } from "react";
<<<<<<< Updated upstream
import styles from 'pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import WS from 'components/webhook/oneWebhook.module.scss';
import ES from 'components/embed/index.module.scss';
import FS from 'components/embed/field/index.module.scss';
import { getMessageData, sendWebhookMessage } from "api";
import { Webhook } from "types/guild/webhook";
=======
import styles from '../../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import WS from '../../../components/webhook/oneWebhook.module.scss';
import ES from '../../../components/embed/index.module.scss';
import FS from '../../../components/embed/field/index.module.scss';
import { ColorResolvable } from "discord.js";
import { Webhook } from "types/guild/webhook";
import { Embed } from "../../types";
import { sendWebhookMessage } from "api/webhook";
>>>>>>> Stashed changes

export const sendHandler = async (webhook: Webhook, e: FormEvent) =>
{
    const document = e.currentTarget.ownerDocument; 
    const message = getMessageData({document, mainStyles: styles, webhookStyles: WS, embedStyles: ES, fieldStyles: FS});

    // await sendWebhookMessage(webhook.id, webhook.token, message);
};