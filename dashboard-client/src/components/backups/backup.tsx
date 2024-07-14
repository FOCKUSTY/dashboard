import { useRouter } from "next/router";
import { FC } from "react";

import {
    RiDeleteBin6Line,
    RiDeviceRecoverLine,
    RiDownload2Line
} from "react-icons/ri";

import styles from './index.module.scss'

type Props = {
    backupName: string;
};

export const BackupItem: FC<Props> = ({ backupName }) =>
{
    const router = useRouter();
    const l = router.locale || 'ru';

    return (
        <div className={styles.container}>
            <span className={styles.name}>{backupName}</span>
            
            <div className={styles.buttons}>
                <RiDeleteBin6Line className={styles.icon} size={20}
                    onClick={(e) => {

                    }}
                />

                <RiDeviceRecoverLine className={styles.icon} size={20}
                    onClick={(e) => {

                    }}
                />

                <RiDownload2Line className={styles.icon} size={20}
                    onClick={(e) => {

                    }}
                />
            </div>
        </div>
    );
};