import styles from '../styles/home.module.scss';

import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";

import Link from "next/link";

import { FaDiscord } from 'react-icons/fa'
import { IoLanguageSharp } from "react-icons/io5";

import type { User } from "../types/user.types";

import Info from '../components/home/info.component';

import Locale from '../service/locale.service'
import Service from '../service/homepage.service';

import Utils from '../api/utils.api';
import UserApi from "../api/user.api";

const utils = new Utils();

type Props = {
    user?: User
};
 
const Home: NextPage<Props> = ({ user }) => {
    const router = useRouter();

    const t = new Locale(router.locale || 'ru').translate;

    const avatarsrc = utils.getAvatar(user!);

    return (
        <div className={`page ${styles.page}`}>
            <div className={styles.background}></div>
            <div className={styles.human_container}><img alt='human' className={styles.human} src="/human.png"/></div>
            <img alt='comet' className={styles.comet} src="/comet.png"/>
            <img alt='comet' className={styles.comet_two} src="/comet.png"/>
            
            <div className={styles.contain}>
                <div className={styles.dropdown}>
                    <div>
                        <button className={styles.dropbtn}>
                            <IoLanguageSharp size={20} color='#fff'/>
                            <span>Language ({t('Язык')})</span>
                        </button>
                    </div>
                    <div className={styles.dropdown_content}>
                        <Link href='/' locale="en">English ({t('Английский')})</Link>
                        <Link href='/' locale="ru">Русский ({t('Русский')})</Link>
                        <Link href='/' locale="fe">Пверiйснö ({t('Ферийский')})</Link>
                    </div>
                </div>

                <div className={`aligned-center ${styles.aligned_center}`}>
                    <div className={styles.container}>
                        <div className={styles.inner_container}>
                            <h1 className={styles.inner_text}>The Void</h1>

                            <div className={styles.inner_buttons}>
                                <button id={styles.discord_login} className={`${styles.button}`} onClick={new Service().invite}>
                                    <FaDiscord id={styles.discord_logo} className={styles.inner} size={50}></FaDiscord>
                                    <span className={styles.inner}>{t('Добавить в')} Discord</span>
                                </button>

                                <Info
                                    avatarsrc={avatarsrc}
                                    router={router}
                                    styles={styles}
                                    t={t}
                                    type='documentation'
                                    user={user}
                                />
                            </div>
                        </div>

                        <Info
                            avatarsrc={avatarsrc}
                            router={router}
                            styles={styles}
                            t={t}
                            type='login'
                            user={user}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export const getServerSideProps = async(ctx: GetServerSidePropsContext) => {
    return {
        props: {
            user: await new UserApi().fetchUser(ctx)
        }
    };
};

export default Home;