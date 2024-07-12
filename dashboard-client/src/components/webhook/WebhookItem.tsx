import { useRouter } from "next/router";
import { FC } from "react";

import { SendHandler } from '@/src/utils/handlers/global/send.handler';
import { NameInputHandler } from "@/src/utils/handlers/webhook/name-input.handler";
import { URLInputHandler } from "@/src/utils/handlers/webhook/url-input.handler";

import { Webhook } from "types/guild/webhook.type";
import { t } from "utils/helpers";

import webhooksStyles from 'pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import styles from './oneWebhook.module.scss';

type Props = {
    webhook: Webhook
};

export const WebhookItem: FC<Props> = ({ webhook }) =>
{
    const router = useRouter();
    const l = router.locale || 'ru'
    const avatarsrc = webhook.avatar
        ? `https://cdn.discordapp.com/avatars/${webhook.id}/${webhook.avatar}`
        : '/TheVoidAvatarSite.png';

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <img src={avatarsrc} id={styles.avatar} alt={webhook.name} />
                
                <div className={styles.name_container}>
                    <p>{t('Название', l)}:</p>
                    <textarea maxLength={32} name="name" id={styles.name} onInput={NameInputHandler} defaultValue={webhook.name}></textarea>
                </div>

                <div className={styles.name_container}>
                    <p>{t('URL аватара', l)}</p>
                    <textarea name="avatar_url" id={styles.avatar_url} onInput={URLInputHandler}></textarea>
                </div>

            </div>
            
            <input
                className={webhooksStyles.btn}
                id={webhooksStyles.send}
                type="button"
                value={`${t('Отправить', l)}`}
                onClick={(e) => {SendHandler(webhook, e)}}
            />
        </div>
    );
};