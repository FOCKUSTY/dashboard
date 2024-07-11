import { ReactElement, useContext, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import { NextPageWithLayout } from "utils/types";
import { FullGuild } from "types/guild/guild";
import { User } from "types/index";

import { DashboardLayout } from "components/layouts/dashboard";
import { GuildContext } from "utils/contexts/guild.context";
import { t } from 'utils/helpers';

import { getGuild } from "@/src/utils/api/guild-api.service";
import { getUser } from "@/src/utils/api/user-api.service";

import styles from './index.module.scss';

type Props = {
    guild: FullGuild;
    user: User;
};

const DashboardPage: NextPageWithLayout<Props> = ({ guild, user }) =>
{
    const router = useRouter();
    const l: string = router.locale || 'ru'; 
    
    const { setGuild } = useContext(GuildContext);
    
    useEffect(() => {
        setGuild(guild);
    }, []);

    return (
        <div className="page">
            <p className={styles.paragraph}>{t('Панель управления :guildname:', l, guild.name)}</p>
        </div>
    );
};

DashboardPage.getLayout = (page: ReactElement) =>
{
    return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps (ctx: GetServerSidePropsContext)
{
    const guild = (await getGuild(ctx)).props;
    const user = (await getUser(ctx)).props;

    return {
        props: {
            guild: guild?.guild!,
            user: user.user
        }
    };
};

export default DashboardPage;