import { FC } from "react";
import { Webhook } from "../../utils/types"
import styles from './oneWebhook.module.scss';
import webhooksStyles from '../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import { inputNameHandler, inputURLHandler, sendHandler } from '@/src/utils/webhookApi';
import { useRouter } from "next/router";
import { t } from "@/src/utils/helpers";

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
                <textarea maxLength={32} name="name" id={styles.name} onInput={inputNameHandler} defaultValue={webhook.name}></textarea>
            </div>

            <div className={styles.name_container}>
                <p>{t('URL аватара', l)}</p>
                <textarea name="avatar_url" id={styles.avatar_url} onInput={inputURLHandler}></textarea>
            </div>

            </div>
            <input className={webhooksStyles.btn} id={webhooksStyles.send} type="button" value={`${t('Отправить', l)}`} onClick={(e) => {sendHandler(webhook, e)}} />
        </div>
    );
};