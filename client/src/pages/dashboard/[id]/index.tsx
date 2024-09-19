import styles from './index.module.scss';

import type { GetServerSidePropsContext } from "next";
import type { ReactElement } from "react";
import { useRouter } from "next/router";

import { DashboardLayout } from "ui/layouts/dashboard.ui";

import type { User } from "types/user.types";
import type { NextPageWithLayout } from "types/next.types";
import type { FullGuild } from "types/guild.types";

import Locale from 'service/locale.service';
import GuildContext from "contexts/guild.context";

import GuildApi from "api/guild.api";
import UserApi from "api/user.api";

type Props = {
    guild: FullGuild;
    user: User;
};

const DashboardPage: NextPageWithLayout<Props> = ({ guild, user }) => {
    const router = useRouter();
    const t = new Locale(router.locale || 'ru').translate;
    
    new GuildContext().setContext(guild);

    return (
        <div className="page">
            <p className={styles.paragraph}>{t('Панель управления')} {guild.name}</p>
        </div>
    );
};

DashboardPage.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = async(ctx: GetServerSidePropsContext) => {
    const guild = (await new GuildApi().fetchGuild(ctx)).props;
    const user = (await new UserApi().fetchUser(ctx)).props;

    return {
        props: {
            guild: guild?.guild!,
            user: user.user
        }
    };
};

export default DashboardPage;