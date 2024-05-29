import { ReactElement, useContext } from "react";
import { Sidebar } from "../misc/Sidebar";
import { Appbar } from "../misc/Appbar";
import styles from '../misc/index.module.scss';
import { GuildContext } from "@/src/utils/contexts/guildContext";

export const DashboardLayout = ({ children }: { children: ReactElement }) =>
{
    const { guild } = useContext(GuildContext);

    return (
        <>
            <Sidebar guild={guild}/>
            <div className={styles.layout}>
                <Appbar guild={guild}/>
                {/* guild?.name */}
                <>{children}</>
            </div>
        </>
    );
};