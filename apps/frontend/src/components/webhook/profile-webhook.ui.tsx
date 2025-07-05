import styles from './profile.module.scss';

import React from 'react';
import Image from 'next/image'

import type { Webhook } from "../../types/webhook.types"

import Utils from '../../api/utils.api';

type Props = {
    webhook: Webhook;
};

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    };

    private readonly Webhook = () => {
        const avatarsrc = new Utils().getAvatar(this.props.webhook);

        return (
            <div className={styles.container}>
                <Image
                    src={`${avatarsrc}`}
                    height={55} width={55} className={styles.avatar} alt={this.props.webhook.name}
                />
                <p className={styles.name}>{this.props.webhook.name}</p>
            </div>
        );
    };

    public readonly render = (): React.ReactNode => {
        return this.Webhook();
    };
};

export default Component;