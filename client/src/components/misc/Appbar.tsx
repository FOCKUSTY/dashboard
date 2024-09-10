import { useRouter } from 'next/router';
import styles from './index.module.scss'
import { RiMenu3Line } from 'react-icons/ri'
import { FullGuild } from '../../utils/types';
import { FC } from 'react';
import { t } from '../../utils/helpers';

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