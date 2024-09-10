import Image from 'next/image'
import { FC } from "react";
import { Guild } from "../../utils/types"
import styles from './index.module.scss';
import { pseudoRandomNumber } from '../../utils/random'

type Props = {
    guild: Guild
};

export const GuildMenuItem: FC<Props> = ({guild}) =>
{
    const iconsrc = guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}` : '/TheVoidAvatarSite.png';
    const randomImage = pseudoRandomNumber(1, 3, 0, 0, undefined, undefined, undefined, false, false, true);
    const randomText = pseudoRandomNumber(1, 3, 0, 0, undefined, undefined, undefined, false, false, true);

    return (
        <div className={styles.container}>
            <Image
            src={`${iconsrc}`}
            height={55} width={55} className={`${styles.image} ${styles[`image-${randomImage}`]}`} alt={guild.name}
            />
            <p className={styles[`guildname-${randomText}`]}>{guild.name}</p>
        </div>
    );
};