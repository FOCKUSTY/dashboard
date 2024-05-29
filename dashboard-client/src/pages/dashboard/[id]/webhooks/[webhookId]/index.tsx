import { GetServerSidePropsContext } from "next";
import { DashboardLayout } from "../../../../../components/layouts/dashboard";
import { FullGuild, NextPageWithLayout, User, Webhook } from "../../../../../utils/types";
import { ReactElement, useContext, useEffect } from "react";
import { getWebhook, getGuild, getUser, sendWebhookMessage } from "../../../../../utils/api";
import { GuildContext } from "@/src/utils/contexts/guildContext";
import { useRouter } from "next/router";
import { WebhookItem } from "@/src/components/webhook/WebhookItem";
import { t } from '../../../../../utils/helpers';
import styles from './index.module.scss';

type Props = {
    guild: FullGuild;
    user: User;
    webhook: Webhook;
};

const WebhookPage: NextPageWithLayout<Props> = ({ guild, user, webhook }) =>
{
    const router = useRouter();
    const l = router.locale || 'ru';
    const { setGuild } = useContext(GuildContext);
    
    useEffect(() => {
        setGuild(guild);
    }, []);

/*     sendWebhookMessage(webhook.id, webhook.token, {content: 'Hello, World !', name: "new_webhook", avatar_url: webhook.avatar
        ? `https://cdn.discordapp.com/avatars/${webhook.id}/${webhook.avatar}`
        : undefined}); */

    return (
        <div className="page">
            <WebhookItem webhook={webhook}/>
        </div>
    );
};

WebhookPage.getLayout = (page: ReactElement) =>
{
    return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps (ctx: GetServerSidePropsContext)
{
    const guild = (await getGuild(ctx)).props;
    const user = (await getUser(ctx)).props;
    const webhook = (await getWebhook(ctx))?.props;

    return {
        props: {
            guild: guild?.guild!,
            user: user.user,
            webhook: webhook?.webhook!
        }
    };
};

export default WebhookPage;