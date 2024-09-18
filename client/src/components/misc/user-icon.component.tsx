import styles from './index.module.scss'

import React from 'react';

import type { User } from 'types/user.types';

import Utils from 'api/utils.api'

type Props = {
    user?: User;
};

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    };

    private readonly UserIcon = () => {
        return (
            <div className={styles.user_avatar}>
                <img src={new Utils().getAvatar(this.props.user)} alt="user avatar" />
            </div>
        );
    };

    public readonly render = (): React.ReactNode => {
        return this.UserIcon();
    };
};

export default Component;