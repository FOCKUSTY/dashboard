import styles from './index.module.scss';

import { useRouter } from 'next/router';

import React, { FC } from 'react';
import { RiMenu3Line } from 'react-icons/ri'

import type { FullGuild } from '../../types/guild.types';

import Locale from '../../service/locale.service';

type Props = {
    guild?: FullGuild;
};

const Appbar: FC<Props> = ({ guild }) => {
    const router = useRouter()
    const t = new Locale(router.locale || 'ru').translate; 

    return (
        <div className={styles.appbar}>
            <div className={styles.menu} onClick={() =>
                router.push('/menu')}
            >
                <RiMenu3Line size={65}/>
                <p>{t('Меню')}</p>
            </div>

            <div>
                <p>{guild?.name || 'Error, guild is not defined'}</p>
            </div>
        </div>
    );
};

export default Appbar;