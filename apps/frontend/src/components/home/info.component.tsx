import { NextRouter } from "next/router";
import React from "react";

import { CiLogin } from "react-icons/ci";
import { AiFillFileText } from "react-icons/ai";
import { FaServer } from "react-icons/fa";
import Image from 'next/image'

import { User } from "../../types/user.types";

import Service from '../../service/homepage.service';

type Props = {
    t: (text: string, variable?: string) => string|undefined;
    styles: any;
    router: NextRouter;
    user?: User;
    avatarsrc: string;
    type: 'documentation'|'login';
};

class Component extends React.Component<Props> {
    private readonly _service: Service;

    constructor(props: Props) {
        super(props);
        this._service = new Service();
    };

    private readonly InfoComponent = () => {
        const {
            styles,
            router,
            user,
            avatarsrc,
            type,
            t
        } = this.props;
        
        return type === 'documentation'
            ? (
                <button id={styles.documentation} className={`${styles.button}`} onClick={()=>{router.push('/menu')}}>
                    <FaServer className={styles.inner} id={styles.documentaion_logo} size={50} color="#999"></FaServer>
                    <span className={styles.inner}>{t('Серверы')}</span>
                </button>
            )
            : (
                <div className={styles.dropdown_avatar}>
                    <button id={styles.avatar} className={`${styles.dropbtn_avatar} ${styles.button}`}>
                        <Image id={styles.user} height={70} width={70} src={avatarsrc} alt="user avatar"/>
                    </button>

                    <div className={styles.dropdown_avatar_content}>
                        <span className={styles.dropdown_avatar_text}>
                            <Image id={styles.user} height={30} width={30} src={avatarsrc} alt="user avatar"/>
                            {user?.global_name ? user.global_name : user?.username}
                        </span>
                        
                        <button className={styles.dropdown_button} onClick={this._service.login}>{t('Другой аккаунт')}</button>
                        <button className={styles.dropdown_button} onClick={()=>{router.push('/documentation')}}>{t('Подробнее')}</button>
                    </div>
                </div>
            );
    };

    private readonly LoginComponent = () => {
        const {
            styles,
            router,
            type,
            t
        } = this.props;

        return type === 'documentation'
            ? (
                <button id={styles.documentation} className={`${styles.button}`} onClick={()=>{router.push('/documentation')}}>
                    <AiFillFileText size={40} id={styles.documentaion_logo}/>
                    <span className={styles.inner}>{t('Подробнее')}</span>
                </button>
            )
            : (
                <button id={styles.login} className={styles.button} onClick={this._service.login}>
                    <CiLogin id={styles.login_logo} className={styles.inner} size={30}></CiLogin>
                    <span className={styles.inner}>{t('Войти')}</span>
                </button>
            );
    };

    public render(): React.ReactNode {
        return this.props.user?.username
            ? this.InfoComponent()
            : this.LoginComponent();
    }
};

export default Component;