import styles from './index.module.scss'
import { FC } from 'react';
import { getAvatar } from 'utils/helpers'
import { User } from 'types/index';

type Props = {
    user?: User;
};

export const UserIcon: FC<Props> = ({ user }) =>
{
    return (
        <div className={styles.user_avatar}>
            <img src={getAvatar(user)} alt="user avatar" />
        </div>
    );
};