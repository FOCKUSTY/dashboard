import Image from "next/image";
import { MdSpaceDashboard } from "react-icons/md";
import { FaWrench } from "react-icons/fa";
import { PiWebhooksLogoBold } from "react-icons/pi";
import styles from './index.module.scss'
import { useRouter } from "next/router";
import { Guild } from "../../utils/types";
import { FC } from "react";
import { getIcon } from "@/src/utils/helpers";

const routes =
[
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
]

type Props = {
    guild?: Guild;
};

export const Sidebar: FC<Props> = ({ guild }) =>
{
    const router = useRouter();

    return (
        <div className={styles.sidebar}>
            <Image className={styles.avatar} src={getIcon(guild)} height={80} width={80} alt="guild_avatar"/>
            
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