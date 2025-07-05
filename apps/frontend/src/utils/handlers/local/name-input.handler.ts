import styles from '../../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';
import WS from '../../../components/webhook/profile.module.scss';

import { FormEvent } from "react";

class Handler {
    public readonly handler = (e: FormEvent) => {
        const document = e.currentTarget.ownerDocument;
        
        const textarea: any = document.getElementById(WS.name);
        const name: any = document.getElementById(styles.name);
    
        name.textContent = textarea?.value;
    };
};

export default Handler;