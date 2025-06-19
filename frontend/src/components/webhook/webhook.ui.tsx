import styles from './index.module.scss';
import WS from '../../pages/dashboard/[id]/webhooks/[webhookId]/index.module.scss';

import { NextRouter, useRouter } from "next/router";

import React from 'react';
import type { Webhook as WebhookType } from "../../types/webhook.types";

import SendHandler from '../../utils/handlers/global/send.handler';
import nameInputHandler from "../../utils/handlers/local/name-input.handler";
import urlInputHandler from "../../utils/handlers/local/url-input.handler";

import Locale from '../../service/locale.service';
import Utils from '../../api/utils.api';

const utils = new Utils();

type Props = {
    webhook: WebhookType;
    router: NextRouter;
};

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    };

    private readonly Webhook = () => {
        const router = this.props.router;
        const avatarsrc = utils.getAvatar(this.props.webhook);
    
        const t = new Locale(router.locale || 'ru').translate;
    
        return (
            <div className={styles.container}>
                <div className={styles.inner}>
                    <img id={styles.avatar} src={avatarsrc} alt={this.props.webhook.name} />
                    
                    <div className={styles.name_container}>
                        <p>{t('Название')}:</p>
                        <textarea
                            id={styles.name}
                            name="name"
                            maxLength={32}
                            defaultValue={this.props.webhook.name}
                            onInput={new nameInputHandler().handler}
                        ></textarea>
                    </div>
    
                    <div className={styles.name_container}>
                        <p>{t('URL аватара')}</p>
                        <textarea
                            id={styles.avatar_url}
                            name="avatar_url"
                            onInput={new urlInputHandler().handler}
                        ></textarea>
                    </div>
                </div>
                
                <input
                    id={WS.send}
                    className={WS.btn}
                    type="button"
                    value={`${t('Отправить')}`}
                    onClick={(e) =>
                        new SendHandler().handler(this.props.webhook, e)}
                />
            </div>
        );
    };

    public readonly render = (): React.ReactNode => {
        return this.Webhook();
    };
};

export default Component;