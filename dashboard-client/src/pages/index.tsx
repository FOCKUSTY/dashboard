import Image from 'next/image'
import type { GetServerSidePropsContext, NextPage } from "next";
import { IoLanguageSharp } from "react-icons/io5";
import { FaDiscord, FaServer } from 'react-icons/fa'
import { CiLogin } from 'react-icons/ci';
import { AiFillFileText } from "react-icons/ai";
import styles from '../utils/styles/home.module.scss';
import { useRouter } from "next/router";
import Link from "next/link";
import { t } from '../utils/helpers'
import config from '../../config.json'
import { getUser } from "../utils/api";
import { User } from "../utils/types";

type Props = {
    user?: User
};
 
const Home: NextPage<Props> = ({ user }) =>
{
    const router = useRouter();
    const l: string = router.locale || 'ru';

    const handlerLogin = () =>
        window.location.href = `${config.server_url}/api/auth/discord`;

    const handlerInvites = () =>
        window.location.href =`https://discordapp.com/api/oauth2/authorize?client_id=1122199797449904179&redirect_url=${encodeURIComponent(`${config.server_url}/api/auth/discord/redirect`)}&response_type=code`;

    const avatarsrc = user?.avatar
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        : '/TheVoidAvatarSite.png';

    const info = user?.username
        ? {
            documentaion: (<button id={styles.documentation} className={`${styles.button}`} onClick={()=>{router.push('/menu')}}>
            <FaServer className={styles.inner} id={styles.documentaion_logo} size={50} color="#999"></FaServer>
            <span className={styles.inner}>{t('Серверы', l)}</span>
        </button>),

            login: (<div className={styles.dropdown_avatar}>
                <button id={styles.avatar} className={`${styles.dropbtn_avatar} ${styles.button}`}>
                <Image id={styles.user} height={70} width={70} src={avatarsrc} alt="user avatar"/>
            </button>
            <div className={styles.dropdown_avatar_content}>
                <span className={styles.dropdown_avatar_text}>
                    <Image id={styles.user} height={30} width={30} src={avatarsrc} alt="user avatar"/>
                    {user?.global_name ? user.global_name : user?.username}
                </span>
                <button className={styles.dropdown_button} onClick={handlerLogin}>{t('Другой аккаунт', l)}</button>
                <button className={styles.dropdown_button} onClick={()=>{router.push('/documentation')}}>{t('Подробнее', l)}</button>
            </div>
            </div>)
    }

        : {
            documentaion: (<button id={styles.documentation} className={`${styles.button}`} onClick={()=>{router.push('/documentation')}}>
            <AiFillFileText size={40} id={styles.documentaion_logo}/>
            <span className={styles.inner}>{t('Подробнее', l)}</span>
        </button>),

            login: (<button id={styles.login} className={styles.button} onClick={handlerLogin}>
                <CiLogin id={styles.login_logo} className={styles.inner} size={30}></CiLogin>
                <span className={styles.inner}>{t('Войти', l)}</span>
            </button>)
    };

    return (
        <div className={`page ${styles.page}`}>
            <div className={styles.background}></div>
            <div className={styles.human_container}><img className={styles.human} src="/human.png"/></div>
            <img className={styles.comet} src="/comet.png"/>
            <img className={styles.comet_two} src="/comet.png"/>
            

            <div className={styles.contain}>
                <div className={styles.dropdown}>
                    <div>
                        <button className={styles.dropbtn}>
                            <IoLanguageSharp size={20} color='#fff'/>
                            <span>Language ({t('Язык', l)})</span>
                        </button>
                    </div>
                    <div className={styles.dropdown_content}>
                        <Link href='/' locale="en">English ({t('Английский', l)})</Link>
                        <Link href='/' locale="ru">Русский ({t('Русский', l)})</Link>
                        <Link href='/' locale="fe">Пверiйснö ({t('Ферийский', l)})</Link>
                    </div>
                </div>

                <div className={`aligned-center ${styles.aligned_center}`}>
                    <div className={styles.container}>
                        <div className={styles.inner_container}>
                            <h1 className={styles.inner_text}>The Void</h1>

                            <div className={styles.inner_buttons}>
                                <button id={styles.discord_login} className={`${styles.button}`} onClick={handlerInvites}>
                                    <FaDiscord id={styles.discord_logo} className={styles.inner} size={50}></FaDiscord>
                                    <span className={styles.inner}>{t('Добавить в Discord', l)}</span>
                                </button>

                                {info.documentaion}
                            </div>
                        </div>

                        {info.login}
                    </div>
                </div>
            </div>
        </div>
    )
};

export async function getServerSideProps (ctx: GetServerSidePropsContext)
{
    return getUser(ctx);
};

export default Home;