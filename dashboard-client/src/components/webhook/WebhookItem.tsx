import Image from 'next/image'
import { FC } from "react";
import { Webhook } from "../../utils/types"
import styles from './oneWebhook.module.scss';

type Props = {
    webhook: Webhook
};

export const WebhookItem: FC<Props> = ({ webhook }) =>
{
    const avatarsrc = webhook.avatar
        ? `https://cdn.discordapp.com/avatars/${webhook.id}/${webhook.avatar}`
        : '/TheVoidAvatarSite.png';

    return (
        <div className={styles.container}>
            <Image
            src={`${avatarsrc}`}
            height={55} width={55} className={styles.avatar} alt={webhook.name}
            />
            <p className={styles.name}>{webhook.name} - {webhook.id}</p>
        </div>
    );
};