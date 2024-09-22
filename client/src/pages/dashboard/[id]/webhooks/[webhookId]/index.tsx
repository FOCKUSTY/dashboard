import styles from './index.module.scss';

import { ReactElement, useState } from "react";
import type { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Image from 'next/image';

import type { Webhook as WebhookType } from "types/webhook.types";
import type { Fields } from "types/embed.types";
import type { FullGuild } from "types/guild.types";
import type { NextPageWithLayout } from "types/next.types";
import type { User } from "types/user.types";

import Locale from 'service/locale.service';

import Utils from "api/utils.api";
import GuildApi from "api/guild.api";
import WebhookApi from "api/webhook.api";
import UserApi from "api/user.api";

import GuildContext from "contexts/guild.context";
import EmbedsContext from 'contexts/embed.context';

import CreateHandler from "utils/handlers/global/create.handler";
import ContentInputHandler from "utils/handlers/local/content-input.handler";

import Webhook from "ui/webhook/webhook.ui";
import Embed from "ui/embed/embed.component";
import EmbedPreview from "ui/embed/embed-preview.component";
import { DashboardLayout } from "ui/layouts/dashboard.ui";

type Props = {
    guild: FullGuild;
    user: User;
    webhook: WebhookType;
};

const WebhookPage: NextPageWithLayout<Props> = ({ guild, user, webhook }) => {
    const embedsContext = new EmbedsContext();

    const router = useRouter();
    const t = new Locale(router.locale || 'ru').translate;

    new GuildContext().setContext(guild);
    
    const embedContext = embedsContext.context;
    const setEmbeds = embedsContext.setContext;

    const [ _fields, setField ] = useState<Fields>({
        "1": [], "2": [], "3": [], "4": [], "5": [], "6": [],
        "7": [], "8": [], "9": [], "10": []
    });

    const [ embeds, setEmbed ] = useState<string[]>([]);
    const [ count, setCount ] = useState(1);

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
                            onInput={new ContentInputHandler().handler}
                            defaultValue={`${t('Привет')}!`}
                        ></textarea>

                        <div id={styles.embed_container}>
                            <embedContext.Provider value={{ embeds: embeds, setEmbeds }}>
                                {embeds.map(embed =>
                                    <Embed
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
                                    onClick={() => new CreateHandler().handler({
                                        count: count,
                                        attacments: embeds,
                                        maxAttacments: 10,
                                        setAttachment: setEmbed,
                                        setCount: setCount,
                                        fields: _fields
                                    })}
                                >{t('Создать embed')}</button>
                            </embedContext.Provider>
                        </div>
                    </div>

                    <div className={styles.right_container} id="ChatPreview">
                        <div className={styles.chat}>
                            <div id={styles.message}>
                                <div>
                                    <Image id={styles.msg_avatar} src={avatarsrc} alt={webhook.name} />
                                    <span id={styles.name}>{webhook.name}</span>

                                    <div id={styles.msg_content}>
                                        <p id={styles.msg_content_paragraph}>{t('Привет')}!</p>
                                    </div>

                                    <div className={styles.embeds}>
                                        {embeds.map(embed =>
                                            <EmbedPreview
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

WebhookPage.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = async(ctx: GetServerSidePropsContext) => {
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