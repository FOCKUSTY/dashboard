import styles from './index.module.scss'

import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";

import { Guild } from "types/guild.types";

import Locale from 'service/locale.service';
import GuildComponent from "ui/guilds/guild.component";

import GuildApi from "api/guild.api";
import Api from 'api/api';

const guildApi = new GuildApi();
const api = new Api();

type Props = {
    guilds: Guild[][];
}

const MenuPage: NextPage<Props> = ({ guilds }) => {
    const router = useRouter();
    const t = new Locale(router.locale || 'ru').translate;
    
    const handlerInvites = (guildId: string) =>
        window.location.href =`https://discordapp.com/api/oauth2/authorize?client_id=1122199797449904179&guild_id=${guildId}&redirect_url=${encodeURIComponent(`${api.url}/api/auth/${guildId}/discord`)}&response_type=code`;

    const [ validGuilds, userGuilds ] = guilds;

    const addUserGuilds = () => {
        if(userGuilds.length != 0) {
            return (
                <div className={styles.container}>
                    <h1 className={styles.title}>{t('Пригласите в гильдию')}</h1>
                    {userGuilds.map((guild) =>
                        <div key={guild.id} onClick={() => { handlerInvites(guild.id) } }>
                            <GuildComponent guild={guild}/>
                        </div>
                    )}
                </div>
            );
        }
    };

    return (
        <div className={`page ${styles.page}`}>
            <div className={styles.background}></div>

            <div className={`aligned-center ${styles.aligned_center}`}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{t('Выберите гильдию')}</h1>
                    {validGuilds.map((guild) =>
                        <div key={guild.id} onClick={()=> router.push(`/dashboard/${guild.id}`)}>
                            <GuildComponent guild={guild}/>
                        </div>
                    )}
                </div>

                {addUserGuilds()}
            </div>
        </div>
    );;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
{
    return guildApi.getMutialGuilds(context);
};

export default MenuPage;