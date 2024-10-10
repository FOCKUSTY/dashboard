import styles from './index.module.scss'

import { useRouter } from "next/router";
import Image from "next/image";

import React from "react";

import { MdSpaceDashboard } from "react-icons/md";
import { PiWebhooksLogoBold } from "react-icons/pi";
import { FaWrench } from "react-icons/fa";

import type { FullGuild } from "../../types/guild.types";

import Utils from "../../api/utils.api";

const utils = new Utils();

const routes = [
    {
        name: 'dashboard',
        icon: <MdSpaceDashboard size={40}/>,
        getPath: (id: string) => `/dashboard/${id}`
    },
    {
        name: 'webhooks',
        icon: <PiWebhooksLogoBold size={40}/>,
        getPath: (id: string) => `/dashboard/${id}/webhooks`
    }
];

type Props = {
    guild?: FullGuild;
};

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    };

    private readonly Sidebar = () => {
        const router = useRouter();
    
        return (
            <div className={styles.sidebar}>
                <Image className={styles.avatar} src={utils.getIcon(this.props.guild)} height={80} width={80} alt="guild_avatar"/>
                
                <div className={styles.icons}>
                    {routes.map((route) => <div onClick={()=>router.push(route.getPath(router.query?.id!.toString()))}
                    key={route.name}>
                        {route.icon}
                    </div>)}
                </div>
        
                <div className={styles.settings}>
                    <FaWrench key={'settings'} size={40} onClick={()=>router.push(`/dashboard/${router.query?.id!.toString()}/settings`)}/>
                </div>
            </div>
        );
    };

    public readonly render = (): React.ReactNode => {
        return this.Sidebar(); 
    };
};

export default Component;