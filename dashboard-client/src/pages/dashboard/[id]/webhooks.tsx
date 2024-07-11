import { ReactElement, useContext, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import { DashboardLayout } from "components/layouts/dashboard";
import { WebhookMenuItem } from "components/webhook/WebhookMenuItem";

import { FullGuild } from "types/guild/guild";
import { User } from "types/index";
import { Webhook } from "types/guild/webhook";
<<<<<<< Updated upstream
import styles from './webhooks.module.scss';
=======
import { NextPageWithLayout } from "utils/types";

import { GuildContext } from "utils/contexts/guildContext";

import { getGuild } from "api/guild";
import { getUser } from "api/user";
import { fetchWebhooks } from "api/webhook";
>>>>>>> Stashed changes

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
        <div className={`${styles.page} page`}>

            <div className={styles.title}>
                <p>{guild?.name}'s webhooks page</p>
            </div>

            <div className={styles.container}>
                <div className={styles.webhooks}>
                    {webhooks.map((webhook: Webhook) => 
                        <div key={webhook.id} onClick={() => { router.push(`/dashboard/${guild.id}/webhooks/${webhook.id}`) }}>
                            <WebhookMenuItem webhook={webhook} />
                        </div>
                    )}
                </div>                
            </div>
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