import styles from './index.module.scss';

import { useRouter } from 'next/router';

import React, { FC } from 'react';
import { RiMenu3Line } from 'react-icons/ri'

import type { FullGuild } from 'types/guild.types';

import Locale from 'service/locale.service';

type Props = {
    guild?: FullGuild;
};

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    };

    private readonly Appbar = () => {
        const router = useRouter();
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
                    <p>{this.props.guild?.name}</p>
                </div>
            </div>
        );
    };

    public readonly render = (): React.ReactNode => {
        return this.Appbar(); 
    };
};

export default Component;