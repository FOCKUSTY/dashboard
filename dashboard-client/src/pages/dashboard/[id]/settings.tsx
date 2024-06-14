import { GuildContext } from "../../../utils/contexts/guildContext";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { FullGuild, NextPageWithLayout, User } from "../../../utils/types";
import { ReactElement, useContext, useEffect } from "react";
import { getGuild, getUser } from "@/src/utils/api";
import { GetServerSidePropsContext } from "next";

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