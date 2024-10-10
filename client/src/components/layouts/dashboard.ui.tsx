import styles from '../misc/index.module.scss';

import { ReactElement } from "react";

import Sidebar from "../misc/sidebar.ui";
import Appbar from "../misc/appbar.ui";

import GuildContext from "../../contexts/guild.context";

export const DashboardLayout = ({ children }: { children: ReactElement }) => {
    const { guild } = new GuildContext().getContext();

    return (
        <>
            <Sidebar guild={guild}/>
            <div className={styles.layout}>
                <Appbar guild={guild}/>
                <>{children}</>
            </div>
        </>
    );
};