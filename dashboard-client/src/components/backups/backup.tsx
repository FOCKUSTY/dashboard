import { useRouter } from "next/router";
import { FC } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiOutlineClipboardCopy, HiOutlineDownload } from "react-icons/hi";

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
                <RiDeleteBin6Fill className={styles.icon} size={20}/>
                <HiOutlineClipboardCopy className={styles.icon} size={20}/>
                <HiOutlineDownload className={styles.icon} size={20}/>
            </div>
        </div>
    );
};