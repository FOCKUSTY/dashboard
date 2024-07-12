import { FC } from 'react';
import { useRouter } from 'next/router';

import { RiMenu3Line } from 'react-icons/ri'

import { t } from 'utils/helpers';
import { FullGuild } from 'types/guild/guild.type';

import styles from './index.module.scss'

type Props = {
    guild?: FullGuild;
};

export const Appbar: FC<Props> = ({ guild }) =>
{
    const router = useRouter();
    const l: string = router.locale || 'ru'; 

    return (
        <div className={styles.appbar}>
            <div className={styles.menu} onClick={() => router.push('/menu')}>
                <RiMenu3Line size={65}/>
                <p>{t('Меню', l)}</p>
            </div>
            <div>
                <p>{guild?.name}</p>
            </div>
        </div>
    );
};