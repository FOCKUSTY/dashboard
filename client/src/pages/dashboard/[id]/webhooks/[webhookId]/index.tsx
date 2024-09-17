import { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

import type { Webhook as WebhookType } from "types/webhook.types";
import type { Fields } from "types/embed.types";
import type { FullGuild } from "types/guild.types";
import type { NextPageWithLayout } from "types/next.types";
import type { User } from "types/user.types";

import Utils from "api/utils.api";
import GuildApi from "api/guild.api";
import WebhookApi from "api/webhook.api";
import UserApi from "api/user.api";

import { GuildContext } from "utils/contexts/guild.context";
import { EmbedsContext } from 'utils/contexts/embed.context';

import { Webhook } from "ui/webhook/webhook.ui";
import { EmbedItem } from "ui/embed/EmbedItem";
import { EmbedPreviewItem } from "ui/embed/EmbedPreviewItem";
import { DashboardLayout } from "ui/layouts/dashboard";

import { createHandler } from "utils/handlers/global/createHandler";
import { contentInputHandler } from "utils/handlers/local/contentInputHandler";

import { t } from 'utils/helpers';

import styles from './index.module.scss';

type Props = {
    guild: FullGuild;
    user: User;
    webhook: WebhookType;
};

const WebhookPage: NextPageWithLayout<Props> = ({ guild, user, webhook }) =>
{
    const router = useRouter();
    const l = router.locale || 'ru';

    const { setGuild } = useContext(GuildContext);
    const { setEmbeds } = useContext(EmbedsContext);

    const [ _fields, setField ] = useState<Fields>({
        "1": [], "2": [], "3": [], "4": [], "5": [], "6": [],
        "7": [], "8": [], "9": [], "10": []
    });

    const [ embeds, setEmbed ] = useState<string[]>([]);
    const [ count, setCount ] = useState(1);

    useEffect(() => {
        setGuild(guild);
    }, []);

    const avatarsrc = new Utils().getAvatar(webhook);

    return (
        <div className="page">
            <div className={styles.outer_container}>
                <Webhook webhook={webhook}/>
                <div className={styles.container}>
                    <div className={styles.left_container} id="ChatInput">
                        <textarea
                            maxLength={2000}
                            name="content"
                            id={styles.content}
                            onInput={contentInputHandler}
                            defaultValue={`${t('Привет', l)}!`}
                        ></textarea>
                        <div id={styles.embed_container}>
                            <EmbedsContext.Provider value={{ embeds: embeds, setEmbeds }}>
                                {embeds.map(embed =>
                                    <EmbedItem
                                        id={`${embeds.indexOf(embed)}`}
                                        key={embed}
                                        setEmbed={setEmbed}
                                        _fields={_fields}
                                        setField={setField}
                                    />
                                )}
                                <button
                                    id={styles.embed_createbtn}
                                    className={styles.btn}
                                    onClick={() => createHandler({
                                        count: count,
                                        attacments: embeds,
                                        maxAttacments: 10,
                                        setAttachment: setEmbed,
                                        setCount: setCount,
                                        fields: _fields
                                    })}
                                >{t('Создать embed', l)}</button>
                            </EmbedsContext.Provider>
                        </div>
                    </div>

                    <div className={styles.right_container} id="ChatPreview">
                        <div className={styles.chat}>
                            <div id={styles.message}>
                                <div>
                                    <img id={styles.msg_avatar} src={avatarsrc} alt={webhook.name} />
                                    <span id={styles.name}>{webhook.name}</span>

                                    <div id={styles.msg_content}>
                                        <p id={styles.msg_content_paragraph}>{t('Привет', l)}!</p>
                                    </div>

                                    <div className={styles.embeds}>
                                        {embeds.map(embed =>
                                            <EmbedPreviewItem
                                                id={`${embeds.indexOf(embed)}`}
                                                key={embed}
                                                _fields={_fields}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

WebhookPage.getLayout = (page: ReactElement) =>
{
    return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps (ctx: GetServerSidePropsContext)
{
    const guild = (await new GuildApi().fetchGuild(ctx)).props;
    const user = (await new UserApi().fetchUser(ctx)).props;
    const webhook = (await new WebhookApi().getWebhook(ctx))?.props;

    return {
        props: {
            guild: guild?.guild!,
            user: user.user,
            webhook: webhook?.webhook!
        }
    };
};

export default WebhookPage;