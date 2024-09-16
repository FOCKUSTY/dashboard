import Image from 'next/image'
import { FC } from "react";

import type { Webhook } from "types/webhook.types"

import Utils from 'api/utils.api';
import styles from './profile.module.scss';

type Props = {
    webhook: Webhook
};

export const WebhookMenuItem: FC<Props> = ({ webhook }) =>
{
    const avatarsrc = new Utils().getAvatar(webhook);

    return (
        <div className={styles.container}>
            <Image
                src={`${avatarsrc}`}
                height={55} width={55} className={styles.avatar} alt={webhook.name}
            />
            <p className={styles.name}>{webhook.name}</p>
        </div>
    );
};