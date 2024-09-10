import { FormEvent } from "react";
import styles from '../../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import webhookStyles from '../../../components/webhook/oneWebhook.module.scss'

export const inputURLHandler = async(e: FormEvent) =>
{
    const document = e.currentTarget.ownerDocument;

    const textAreaUrl: any = document.getElementById(webhookStyles.avatar_url);
    const imgInMsg: any = document.getElementById(styles.msg_avatar)
    const image: any = document.getElementById(webhookStyles.avatar);

    const url = textAreaUrl.value;
    
    imgInMsg.src = url || '/TheVoidAvatarSite.png';
    image.src = url || '/TheVoidAvatarSite.png';
};