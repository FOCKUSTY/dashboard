import { GetServerSidePropsContext } from "next";
import { DashboardLayout } from "../../../../../components/layouts/dashboard";
import { FullGuild, NextPageWithLayout, User, Webhook } from "../../../../../utils/types";
import { FormEvent, ReactElement, useContext, useEffect, useState } from "react";
import { getWebhook, getGuild, getUser } from "../../../../../utils/api";
import { GuildContext } from "@/src/utils/contexts/guildContext";
import { EmbedsContext } from '../../../../../utils/contexts/embedsContext';
import { useRouter } from "next/router";
import { WebhookItem } from "@/src/components/webhook/WebhookItem";
import { t } from '../../../../../utils/helpers';
import styles from './index.module.scss';
import { EmbedItem } from "@/src/components/embed/EmbedItem";
import { EmbedPreviewItem } from "@/src/components/embed/EmbedPreviewItem";

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
    const { setEmbeds } = useContext(EmbedsContext);

    const [ embeds, setEmbed ] = useState<string[]>([]);
    const [ count, setCount ] = useState(1);

    useEffect(() => {
        setGuild(guild);
    }, []);

    const avatarsrc = webhook.avatar
        ? `https://cdn.discordapp.com/avatars/${webhook.id}/${webhook.avatar}`
        : '/TheVoidAvatarSite.png';

    const inputHandler = (e: FormEvent) =>
    {
        const document = e.currentTarget.ownerDocument;
        const textArea: any = document.getElementById(styles.content);
        const paragraph: any = document.getElementById(styles.msg_content_paragraph);
        
        paragraph.textContent = textArea.value;
    };

    const createEmbedHandler = () =>
    {
        setCount(count+1);

        if(embeds.length === 10)
            return;

        setEmbed([...embeds, `${count}`]);
    };

    return (
        <div className="page">
            <div className={styles.outer_container}>
            <WebhookItem webhook={webhook}/>
            <div className={styles.container}>
                <div className={styles.left_container} id="ChatInput">
                    <textarea
                        maxLength={2000}
                        name="content"
                        id={styles.content}
                        onInput={inputHandler}
                        defaultValue={`${t('Привет', l)}!`}
                    ></textarea>
                    <div id={styles.embed_container}>
                        <EmbedsContext.Provider value={{ embeds: embeds, setEmbeds }}>
                            {embeds.map(embed =>
                                <EmbedItem
                                    id={`${embeds.indexOf(embed)}`}
                                    key={embed}
                                    setEmbed={setEmbed}
                                />
                            )}
                            <button
                                id={styles.embed_createbtn}
                                className={styles.btn}
                                onClick={createEmbedHandler}
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