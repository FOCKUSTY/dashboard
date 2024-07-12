import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";

import { GuildMenuItem } from "components/guilds/GuildMenuItem";
import { PartialGuild } from "types/guild/guild.type";
import { fetchMutialGuilds } from "@/src/utils/api/guild.api";
import { t } from 'utils/helpers'

import styles from './index.module.scss';
import config from '@/config.json';

type Props = {
    guilds: PartialGuild[][];
}

const MenuPage: NextPage<Props> = ({guilds}) =>
{
    const router = useRouter();
    const l: string = router.locale || 'ru';
    
    const handlerInvites = (guildId: string) =>
        window.location.href =`https://discordapp.com/api/oauth2/authorize?client_id=1122199797449904179&guild_id=${guildId}&redirect_url=${encodeURIComponent(`${config.server_url}/api/auth/${guildId}/discord`)}&response_type=code`;

    const validGuilds = guilds[0];
    const userGuilds = guilds[1];

    const addUserGuilds = () =>
    {
        if(userGuilds.length != 0)
            return (
                <div className={styles.container}>
                    <h1 className={styles.title}>{t('Пригласите в гильдию', l)}</h1>
                    {userGuilds.map((guild) =>
                        <div key={guild.id} onClick={() => { handlerInvites(guild.id) } }>
                            <GuildMenuItem guild={guild}/>
                        </div>
                    )}
                </div>
            );
    }

    const page =
    (
        <div className={`page ${styles.page}`}>
            <div className={styles.background}></div>

            <div className={`aligned-center ${styles.aligned_center}`}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{t('Выберите гильдию', l)}</h1>
                    {validGuilds.map((guild) =>
                        <div key={guild.id} onClick={()=> router.push(`/dashboard/${guild.id}`)}>
                            <GuildMenuItem guild={guild}/>
                        </div>
                    )}
                </div>
                {addUserGuilds()}
            </div>
        </div>
    );

    return page;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
{
    return fetchMutialGuilds(context);
};

export default MenuPage;