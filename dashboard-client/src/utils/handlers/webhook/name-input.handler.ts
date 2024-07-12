import { FormEvent } from "react";
import styles from '../../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import webhookStyles from '../../../components/webhook/oneWebhook.module.scss'

export const NameInputHandler = async(e: FormEvent) =>
{
    const document = e.currentTarget.ownerDocument;
    const textAreaName: any = document.getElementById(webhookStyles.name);
    const nameInMsg: any = document.getElementById(styles.name)
    const name: any = textAreaName?.value;

    nameInMsg.textContent = name;
};