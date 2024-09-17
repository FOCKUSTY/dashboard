import { FC } from "react";
import type { Webhook as WebhookType } from "types/webhook.types";
import styles from './index.module.scss';
import webhooksStyles from '../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import { sendHandler } from 'utils/handlers/global/sendHandler';
import { useRouter } from "next/router";
import { t } from "utils/helpers";
import { inputNameHandler } from "utils/handlers/local/nameInputHandler";
import { inputURLHandler } from "utils/handlers/local/urlInputHandler";

type Props = {
    webhook: WebhookType
};

export const Webhook: FC<Props> = ({ webhook }) => {
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