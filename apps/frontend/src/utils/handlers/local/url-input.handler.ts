import styles from '../../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import WS from '../../../components/webhook/profile.module.scss';

import { FormEvent } from "react";

class Handler {
    public readonly handler = (e: FormEvent) => {
        const document = e.currentTarget.ownerDocument;

        const url: string = (document.getElementById(WS.avatar_url) as HTMLInputElement)?.value;

        const image: any = document.getElementById(styles.msg_avatar);
        const preview: any = document.getElementById(WS.avatar);
    
        image.src = url || '/TheVoidAvatarSite.png';
        preview.src = url || '/TheVoidAvatarSite.png';
    };
};

export default Handler;