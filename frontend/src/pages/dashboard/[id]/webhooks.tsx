import type { GetServerSidePropsContext } from "next";
import type { ReactElement} from "react";
import { useRouter } from "next/router";

import { DashboardLayout } from "../../../components/layouts/dashboard.ui";

import type { User } from "../../../types/user.types";
import type { NextPageWithLayout } from "../../../types/next.types";
import type { FullGuild } from "../../../types/guild.types";
import type { Webhook as WebhookType } from "../../../types/webhook.types";

import WebhookApi from "../../../api/webhook.api";
import GuildApi from "../../../api/guild.api";
import UserApi from "../../../api/user.api";
import GuildContext from "../../../contexts/guild.context";

import Webhook from "../../../components/webhook/profile-webhook.ui";

type Props = {
    guild: FullGuild;
    user: User;
    webhooks: WebhookType[];
};

const WebhooksPage: NextPageWithLayout<Props> = ({ guild, user, webhooks }) => {
    const router = useRouter();
    new GuildContext().setContext(guild);

    return (
        <div className="page">
            <p>{guild?.name}&#39;s webhooks page</p>

            {webhooks.map((webhook: WebhookType) => 
                <div key={webhook.id} onClick={() =>
                    router.push(`/dashboard/${guild.id}/webhooks/${webhook.id}`)}
                >
                    <Webhook webhook={webhook} />
                </div>
            )}
        </div>
    );
};

WebhooksPage.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = async(ctx: GetServerSidePropsContext) => {
    const guild = (await new GuildApi().fetchGuild(ctx)).props;
    const user = (await new UserApi().fetchUser(ctx));
    const webhooks = (await new WebhookApi().getWebhooks(ctx))?.props;

    return {
        props: {
            user: user,
            guild: guild?.guild!,
            webhooks: webhooks?.webhooks!
        }
    };
};

export default WebhooksPage;