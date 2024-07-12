import { DashboardLayout } from "components/layouts/dashboard";
import { ReactElement, useContext, useEffect } from "react";
import { GetServerSidePropsContext } from "next";

import { FullGuild } from "types/guild/guild.type";
import { GuildContext } from "utils/contexts/guild.context";
import { NextPageWithLayout } from "utils/types";
import { User } from "types/index";

import { getGuild } from "@/src/utils/api/guild.api";
import { getUser } from "@/src/utils/api/user.api";

type Props = {
    guild: FullGuild;
    user: User;
};

const SettingsPage: NextPageWithLayout<Props> = ({ guild, user }) =>
{
    const { setGuild } = useContext(GuildContext);
    
    useEffect(() => {
        setGuild(guild);
    }, []);

    return (
        <div className="page">
            <p>{guild?.name}'s settings page</p>
        </div>
    );
};

SettingsPage.getLayout = (page: ReactElement) =>
{
    return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps (ctx: GetServerSidePropsContext)
{
    const guild = (await getGuild(ctx)).props;
    const user = (await getUser(ctx)).props;

    return { props: { guild: guild?.guild!, user: user.user } };
};

export default SettingsPage;