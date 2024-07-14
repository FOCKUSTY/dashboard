import { ReactElement, useContext, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import { EmbedItem } from "components/embed/EmbedItem";
import { EmbedPreviewItem } from "components/embed/EmbedPreviewItem";
import { DashboardLayout } from "components/layouts/dashboard";
import { WebhookItem } from "components/webhook/WebhookItem";
import { BackupModal } from "components/modals/backup";

import { CreateHandler } from "handlers/global/create.handler";
import { ContentInputHandler } from "handlers/webhook/content-input.handler";
import { LinkHandler } from "handlers/local/link.handler";

import { GuildContext } from "utils/contexts/guild.context";
import { EmbedsContext } from 'utils/contexts/embed.context';
import { Fields, NextPageWithLayout } from "utils/types";
import { t } from 'utils/helpers';

import { Webhook } from "types/guild/webhook.type";
import { FullGuild } from "types/guild/guild.type";
import { Backup } from "types/backups/backups.type";
import { User } from "types/index";

import { getGuild } from "api/guild.api";
import { getUser } from "api/user.api";
import { getWebhook } from "api/webhook.api";
import { getBackups } from "api/backup.api";

import styles from './index.module.scss';

type Props = {
    guild: FullGuild;
    user: User;
    webhook: Webhook;
    backups: Backup[];
};

const WebhookPage: NextPageWithLayout<Props> = ({ guild, user, webhook, backups }) =>
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
    const [ modalVisibled, setModalVisible ] = useState<boolean>(false);

    useEffect(() => {
        setGuild(guild);
    }, []);

    const avatarsrc = webhook.avatar
        ? `https://cdn.discordapp.com/avatars/${webhook.id}/${webhook.avatar}`
        : '/TheVoidAvatarSite.png';

    return (
        <div className="page">
            { modalVisibled ? <BackupModal backups={backups} setModalVisible={setModalVisible} user={user}/> : undefined }

            <div className={styles.outer_container}>
                <WebhookItem webhook={webhook}/>
                <div className={styles.container}>
                    <div className={styles.left_container} id="ChatInput">
                        <textarea
                            maxLength={2000}
                            name="content"
                            id={styles.content}
                            onInput={ContentInputHandler}
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
                            </EmbedsContext.Provider>
                        </div>

                        <div>
                            <button
                                id={styles.embed_createbtn}
                                className={styles.btn}
                                onClick={(event) => CreateHandler({
                                    count: count,
                                    attacments: embeds,
                                    maxAttacments: 10,
                                    setAttachment: setEmbed,
                                    setCount: setCount,
                                    fields: _fields,
                                    event: event
                                })}
                            >{t('Создать embed', l)}</button>
                            <button className={styles.btn} id={styles.btn_backups}
                                onClick={() => setModalVisible(true)}
                            >backups</button>
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
                
                <div className={styles.container} id={styles.input_outer_container}>
                    <div id={styles.input_container}>
                        <span>{t('Вставьте ссылку на сообщение', l)}</span>
                    </div>

                    <div id={styles.input_container}>
                        <input id={styles.input_message_id} type="text" placeholder="https://discord.com/channels/{guildId}/{channelId}/{messageId}"/>
                        <input
                            id={styles.submit_message_id}
                            type="submit"
                            value={t('Загрузить', l)}
                            className={styles.btn}
                            onClick={(e) => LinkHandler(e, l, setEmbed)}
                        />
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
    const guild = (await getGuild(ctx)).props;
    const user = (await getUser(ctx)).props;
    const webhook = (await getWebhook(ctx))?.props;
    const backups = (await getBackups(ctx, user.user.id))?.props;

    return {
        props: {
            guild: guild?.guild!,
            user: user.user,
            webhook: webhook?.webhook!,
            backups: backups?.backups!
        }
    };
};

export default WebhookPage;