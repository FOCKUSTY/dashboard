import { GetServerSidePropsContext } from "next";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { NextPageWithLayout } from "../../../utils/types";
import { ReactElement, useContext, useEffect } from "react";
import { getGuild, getUser } from "../../../utils/api";
import { GuildContext } from "@/src/utils/contexts/guildContext";
import { t } from '../../../utils/helpers';
import styles from './index.module.scss';
import { useRouter } from "next/router";
import { FullGuild } from "types/guild/guild";
import { User } from "types/index";

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