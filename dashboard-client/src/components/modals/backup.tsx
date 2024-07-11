import { FC } from "react";
import { useRouter } from "next/router";
import { User } from "types/index"
import { t } from "utils/helpers";

import main from './index.module.scss';
import styles from './backup.module.scss';

import { ClickOnBackgroundHandler } from 'handlers/modal/click-on-background-handler.directive'
import { SaveHandler } from "handlers/modal/backup/save-handler.directive";

import { Backup } from "types/backups/backup";
import { BackupItem } from '../backups/backup';

type Props = {
    user: User
    setModalVisible: (boolean: boolean) => void
    backups: Backup[]
}

export const BackupModal: FC<Props> = ({ backups, user, setModalVisible }) =>
{
    const router = useRouter();
    const l = router.locale || 'ru'

    return (
        <div id={main.background} onClick={(e)=> ClickOnBackgroundHandler(e, setModalVisible, main.background)}>
            <div className={`${main.modal} ${styles.modal}`}>
                <div className={`${styles.component} ${styles.header}`}>
                    <button className={`${styles.btn} ${styles.import}`}>
                        <button type="submit" className={`${styles.btn} ${styles.file_input}`}>{t('Импорт', l)}</button>
                        <input type="file" name="import" className={styles.input} accept=".json"/>
                    </button>
                    <button className={`${styles.btn} ${styles.export}`} type="submit">{t('Экспорт', l)}</button>
                </div>

                <div className={`${styles.component} ${styles.main}`}>
                    <div className={styles.backup_container}>
                        <span>Backups:</span>
                        <div id={styles.user_backups}>
                            {backups.map((backup) =>
                                <BackupItem backupName={backup.backupName}/>
                            )}
                        </div>
                    </div>

                    <input
                        className={main.text_input}
                        maxLength={24}
                        minLength={4}
                        type="text"
                        placeholder={t('Название', l)}
                        id={styles.backup_name}
                    />
                </div>

                <div className={`${styles.component} ${styles.footer}`}>
                    <input className={styles.btn} type="submit" value={t('Сохранить', l)}
                        onClick={(e) => SaveHandler(e, user.id, styles.backup_name)}
                    />
                    <button className={styles.btn}
                        onClick={() => setModalVisible(false)}
                    >{t('Закрыть', l)}</button>
                </div>
            </div>
        </div>
    );
};