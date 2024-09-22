import styles from './index.module.scss';

import Image from 'next/image'
import React from 'react';

import type { Guild } from 'types/guild.types';

import PseudoRandom from 'service/pseudo-random.service';
import Utils from 'api/utils.api';

const utils = new Utils();

type Props = {
    guild: Guild
};

class Component extends React.Component<Props> {
    private readonly history: number[] = [];

    private readonly random: PseudoRandom = new PseudoRandom({
        name: 'guild.component',
        min: 1, max: 3,
        n: 1, m: 1,
        historyArray: this.history
    });
    
    constructor(props: Props) {
        super(props);
    };

    public readonly render = (): React.ReactNode => {
        return (
            <div className={styles.container}>
                <Image
                    src={utils.getIcon(this.props.guild)}
                    height={55} width={55}
                    className={`${styles.image} ${styles[`image-${this.random.execute()}`]}`}
                    alt={this.props.guild.name}
                />
                <p className={styles[`guildname-${this.random.execute()}`]}>{this.props.guild.name}</p>
            </div>
        );
    };
};

export default Component;