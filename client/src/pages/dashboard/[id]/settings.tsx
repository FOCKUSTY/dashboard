import type { GetServerSidePropsContext } from "next";
import type { ReactElement } from "react";

import { DashboardLayout } from "ui/layouts/dashboard.ui";

import type { User } from "types/user.types";
import type { NextPageWithLayout } from "types/next.types";
import type { FullGuild } from "types/guild.types";

import GuildApi from "api/guild.api";
import UserApi from "api/user.api";

import GuildContext from "contexts/guild.context";

type Props = {
    guild: FullGuild;
    user: User;
};

const SettingsPage: NextPageWithLayout<Props> = ({ guild, user }) => {
    new GuildContext().setContext(guild);

    return (
        <div className="page">
            <p>{guild?.name}'s settings page</p>
        </div>
    );
};

SettingsPage.getLayout = (page: ReactElement) => {
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

export default SettingsPage;