import { FormEvent } from "react";

import styles from 'pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import WS from 'components/webhook/oneWebhook.module.scss'

class Handler {
    public readonly nameInput = (e: FormEvent) => {
        const document = e.currentTarget.ownerDocument;
        
        const textarea: any = document.getElementById(WS.name);
        const name: any = document.getElementById(styles.name);
    
        name.textContent = textarea?.value;
    };
};

export default Handler;