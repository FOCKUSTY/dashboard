import { GuildContext } from "../../../utils/contexts/guildContext";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { NextPageWithLayout } from "../../../utils/types";
import { ReactElement, useContext, useEffect } from "react";
import { fetchWebhooks, getGuild, getUser } from "@/src/utils/api";
import { GetServerSidePropsContext } from "next";
import { WebhookMenuItem } from "@/src/components/webhook/WebhookMenuItem";
import { useRouter } from "next/router";
import { FullGuild } from "types/guild/guild";
import { User } from "types/index";
import { Webhook } from "types/guild/webhook";

type Props = {
    guild: FullGuild;
    user: User;
    webhooks: Webhook[];
};

const WebhooksPage: NextPageWithLayout<Props> = ({ guild, user, webhooks }) =>
{
    const router = useRouter();
    const { setGuild } = useContext(GuildContext);
    
    useEffect(() => {
        setGuild(guild);
    }, []);

    return (
        <div className="page">
            <p>{guild?.name}'s webhooks page</p>
            {webhooks.map((webhook: Webhook) => 
                <div key={webhook.id} onClick={() => { router.push(`/dashboard/${guild.id}/webhooks/${webhook.id}`) }}>
                    <WebhookMenuItem webhook={webhook} />
                </div>
            )}
        </div>
    );
};

WebhooksPage.getLayout = (page: ReactElement) =>
{
    return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps (ctx: GetServerSidePropsContext)
{
    const guild = (await getGuild(ctx)).props;
    const user = (await getUser(ctx)).props;
    const webhooks = (await fetchWebhooks(ctx))?.props;

    return {
        props: {
            guild: guild?.guild!,
            user: user.user,
            webhooks: webhooks?.webhooks!
        }
    };
};

export default WebhooksPage;