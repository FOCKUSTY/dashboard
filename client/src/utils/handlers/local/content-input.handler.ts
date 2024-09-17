import { FormEvent } from "react";
import WS from 'pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss'

class Handler {
    public readonly contentInput = (e: FormEvent) => {
        const document = e.currentTarget.ownerDocument;
        const textArea: any = document.getElementById(WS.content);
        const paragraph: any = document.getElementById(WS.msg_content_paragraph);
        
        paragraph.textContent = textArea.value;
    };
};

export default Handler;